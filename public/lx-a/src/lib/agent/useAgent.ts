// ──────────────────────────────────────────────────────────────────────────
// useAgent — React controller binding the headless runtime to the panel UI.
//
// Owns the transcript, the streaming typewriter, the live step list, the
// confirm gate and a short conversational memory (so "yes" / "the other car"
// resolve against the previous turn). Rebuilds UserContext from live provider
// state on every send so the agent always reasons over current data. The
// transcript persists across reloads. UI components stay presentational.
// ──────────────────────────────────────────────────────────────────────────

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFlyout } from "../../flyout/FlyoutProvider";
import type { Section } from "../../data/dashboard";
import type { SubView } from "../../App";
import { usePersistedState } from "../usePersistedState";
import { buildUserContext, type Insight, type UserContext } from "./context";
import {
  getTool,
  type AgentProviders,
  type ToolContext,
} from "./tools";
import {
  plan,
  runTurn,
  stepFor,
  type AgentTurn,
  type Memory,
  type PlanStep,
  type RunStep,
} from "./runtime";
import { geminiEnabled, planWithGemini, type HistoryTurn } from "./gemini";

export type Msg =
  | { id: string; role: "user"; text: string; at: number }
  | { id: string; role: "agent"; text: string; streaming: boolean; at: number }
  | { id: string; role: "steps"; steps: RunStep[]; at: number };

interface PendingConfirm {
  step: RunStep;
  resolve: (ok: boolean) => void;
}

interface AgentNav {
  onNavigate: (section: Section) => void;
  onOpenVehicle: (id: string) => void;
  onOpenBenefit: (subview: SubView) => void;
}

let msgSeq = 0;
const mid = () => `m-${++msgSeq}`;
const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/** Last vehicleId an ordered step list acted on, for conversational memory. */
function lastVehicleId(steps: PlanStep[]): string | undefined {
  for (let i = steps.length - 1; i >= 0; i--) {
    const id = steps[i].args.vehicleId;
    if (typeof id === "string") return id;
  }
  return undefined;
}

export function useAgent({ onNavigate, onOpenVehicle, onOpenBenefit }: AgentNav) {
  const flyout = useFlyout();
  const [messages, setMessages] = usePersistedState<Msg[]>(
    "lexus.agent.thread",
    []
  );
  const [followups, setFollowups] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [pendingConfirm, setPendingConfirm] = useState<PendingConfirm | null>(
    null
  );
  // Set true when the panel closes or the member hits Stop mid-run, so streams
  // and the run loop stop touching state.
  const cancelled = useRef(false);
  // Short carry-over between messages (last offer + last vehicle touched).
  const memory = useRef<Memory>({});

  // Heal a transcript restored from storage: drop a stuck streaming caret and
  // any empty agent bubble left behind by an interrupted reload.
  useEffect(() => {
    setMessages((prev) => {
      if (!prev.some((m) => m.role === "agent" && (m.streaming || !m.text)))
        return prev;
      return prev
        .filter((m) => !(m.role === "agent" && !m.text))
        .map((m) =>
          m.role === "agent" && m.streaming ? { ...m, streaming: false } : m
        );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // A fresh snapshot of everything the agent knows, on demand.
  const snapshot = useCallback(
    (): UserContext =>
      buildUserContext({
        bookings: flyout.bookings,
        interests: flyout.interests,
        personal: flyout.personal,
        preferredDealerId: flyout.preferredDealerId,
        pendingVehicles: flyout.pendingVehicles,
        regoOverrides: flyout.regoOverrides,
      }),
    [flyout]
  );

  // The action bridge handed to tools — real app mutations.
  const providers: AgentProviders = useMemo(
    () => ({
      addBooking: flyout.addBooking,
      removeBooking: flyout.removeBooking,
      openFlyout: (kind, payload) => flyout.open(kind, payload ?? {}),
      setInterests: flyout.setInterests,
      navigate: onNavigate,
      openVehicle: onOpenVehicle,
      openBenefit: onOpenBenefit,
    }),
    [flyout, onNavigate, onOpenVehicle, onOpenBenefit]
  );

  const patch = (id: string, next: Partial<Msg>) =>
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? ({ ...m, ...next } as Msg) : m))
    );

  const push = (m: Msg) => setMessages((prev) => [...prev, m]);

  // Typewriter — fills an agent message progressively.
  const stream = async (id: string, full: string) => {
    const step = full.length > 90 ? 9 : 16;
    for (let i = 1; i <= full.length; i += 2) {
      if (cancelled.current) {
        patch(id, { text: full, streaming: false });
        return;
      }
      patch(id, { text: full.slice(0, i) });
      await wait(step);
    }
    patch(id, { text: full, streaming: false });
  };

  const executeTurn = useCallback(
    async (turn: AgentTurn) => {
      cancelled.current = false;
      setBusy(true);
      setFollowups([]);
      // Remember what this turn offered / touched for the next message.
      memory.current.offer = turn.offer;
      memory.current.lastToolIds = turn.steps.map((s) => s.toolId);
      const vid = lastVehicleId(turn.steps);
      if (vid) memory.current.vehicleId = vid;

      const ctx = snapshot();
      const tctx: ToolContext = { ctx, providers };

      const sayId = mid();
      push({ id: sayId, role: "agent", text: "", streaming: true, at: Date.now() });
      await stream(sayId, turn.say);

      if (turn.steps.length && !cancelled.current) {
        const stepsId = mid();
        push({ id: stepsId, role: "steps", steps: [], at: Date.now() });

        const final = await runTurn(turn.steps, tctx, {
          onUpdate: (steps) => patch(stepsId, { steps }),
          isCancelled: () => cancelled.current,
          confirm: (step) =>
            new Promise<boolean>((resolve) =>
              setPendingConfirm({ step, resolve })
            ).finally(() => setPendingConfirm(null)),
        });

        // Closing line drawn from the last meaningful result.
        const last = [...final].reverse().find((s) => s.result?.summary);
        const ranAny = final.some((s) => s.status === "done");
        const skipped = final.length > 0 && final.every((s) => s.status === "skipped");
        if (!cancelled.current && (last || skipped)) {
          const closeId = mid();
          push({ id: closeId, role: "agent", text: "", streaming: true, at: Date.now() });
          await stream(
            closeId,
            skipped
              ? "No problem — I've left that as is. Anything else?"
              : ranAny && last
                ? last.result!.summary
                : "Done."
          );
        }
        // A completed consequential action clears the standing offer.
        if (ranAny) memory.current.offer = undefined;
      }

      if (!cancelled.current) {
        setFollowups(turn.followups);
      }
      setBusy(false);
    },
    [providers, snapshot, setMessages]
  );

  const send = useCallback(
    (text: string) => {
      const clean = text.trim();
      if (!clean || busy) return;
      cancelled.current = false;
      push({ id: mid(), role: "user", text: clean, at: Date.now() });

      const ctx = snapshot();
      // Recent transcript for the LLM (prior turns; the new message is sent
      // separately). Steps messages carry no prose, so they're skipped.
      const history: HistoryTurn[] = [];
      for (const m of messages.slice(-10)) {
        if (m.role === "user") history.push({ role: "user", text: m.text });
        else if (m.role === "agent" && m.text)
          history.push({ role: "model", text: m.text });
      }

      setBusy(true);
      void (async () => {
        // Gemini chooses tools + lead-in when enabled; deterministic planner
        // is the fallback (no key, error, timeout, or mid-flight Stop).
        let turn: AgentTurn | null = null;
        if (geminiEnabled()) {
          turn = await planWithGemini(clean, ctx, history.slice(-8));
        }
        if (cancelled.current) {
          setBusy(false);
          return;
        }
        await executeTurn(turn ?? plan(clean, ctx, memory.current));
      })();
    },
    [busy, executeTurn, snapshot, messages, setMessages]
  );

  // One-tap run of a specific tool (insight CTAs / suggestion chips).
  const runSuggestion = useCallback(
    (toolId: string, args: Record<string, unknown>, echo: string, confirm?: string) => {
      if (busy) return;
      const tool = getTool(toolId);
      if (!tool) return;
      push({ id: mid(), role: "user", text: echo, at: Date.now() });
      const stepPlan: PlanStep = stepFor(toolId, args, {
        confirm:
          confirm ??
          (tool.consequential
            ? `Go ahead and ${tool.label.toLowerCase()}?`
            : undefined),
      });
      void executeTurn({
        say: "On it.",
        steps: [stepPlan],
        followups: [],
      });
    },
    [busy, executeTurn, setMessages]
  );

  const runInsight = useCallback(
    (insight: Insight) => {
      if (!insight.suggest) return;
      runSuggestion(
        insight.suggest.toolId,
        insight.suggest.args ?? {},
        insight.suggest.label
      );
    },
    [runSuggestion]
  );

  const resolveConfirm = useCallback(
    (ok: boolean) => {
      pendingConfirm?.resolve(ok);
    },
    [pendingConfirm]
  );

  /** Interrupt the current turn — stop streaming, skip remaining steps. */
  const stop = useCallback(() => {
    cancelled.current = true;
    pendingConfirm?.resolve(false);
    setPendingConfirm(null);
    setMessages((prev) =>
      prev.map((m) =>
        m.role === "agent" && m.streaming ? { ...m, streaming: false } : m
      )
    );
    setBusy(false);
  }, [pendingConfirm, setMessages]);

  const reset = useCallback(() => {
    cancelled.current = true;
    memory.current = {};
    setMessages([]);
    setFollowups([]);
    setPendingConfirm(null);
    setBusy(false);
  }, [setMessages]);

  const markClosed = useCallback(() => {
    cancelled.current = true;
    setBusy(false);
  }, []);

  return {
    messages,
    followups,
    busy,
    pendingConfirm,
    send,
    runSuggestion,
    runInsight,
    resolveConfirm,
    stop,
    reset,
    markClosed,
    snapshot,
  };
}
