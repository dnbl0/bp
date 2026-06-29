import { useEffect, useRef, useState } from "react";
import { useFlyout } from "../../flyout/FlyoutProvider";
import { useAgent } from "../../lib/agent/useAgent";
import { useDialogFocus } from "../../lib/useDialogFocus";
import type { Section } from "../../data/dashboard";
import type { SubView } from "../../App";
import { AgentSteps } from "./AgentSteps";
import {
  Sparkles,
  Car,
  Calendar,
  MapPin,
  X,
  ArrowRight,
  ChevronRight,
  MessageCircle,
} from "../icons";

const STARTERS = [
  { icon: Car, label: "Book my service", prompt: "Book my next service" },
  { icon: Calendar, label: "Set up a lounge pass", prompt: "I need airport lounge access" },
  { icon: Sparkles, label: "Plan a weekend escape", prompt: "Plan a weekend escape for me" },
  { icon: MapPin, label: "Reserve valet parking", prompt: "Reserve valet parking for me" },
];

/** Compact clock time for a message, e.g. "2:45 pm". */
function fmtClock(ts: number): string {
  return new Date(ts)
    .toLocaleTimeString("en-AU", { hour: "numeric", minute: "2-digit" })
    .toLowerCase();
}

const COMPOSER_MAX_H = 120;
/** Treat the thread as "pinned" within this many px of the bottom. */
const PIN_THRESHOLD = 80;

export function AgentPanel({
  onNavigate,
  onOpenVehicle,
  onOpenBenefit,
}: {
  onNavigate: (section: Section) => void;
  onOpenVehicle: (id: string) => void;
  onOpenBenefit: (subview: SubView) => void;
}) {
  const flyout = useFlyout();
  const open = flyout.activeKind === "concierge";
  const agent = useAgent({ onNavigate, onOpenVehicle, onOpenBenefit });
  const [draft, setDraft] = useState("");
  const [showJump, setShowJump] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const nearBottomRef = useRef(true);

  const ctx = agent.snapshot();
  const empty = agent.messages.length === 0;
  // Pre-first-token gap (mostly the Gemini round-trip): busy with nothing back
  // for this turn yet — the last message is still the user's.
  const last = agent.messages[agent.messages.length - 1];
  const thinking = agent.busy && last?.role === "user";

  // Modal a11y: Esc, focus trap, initial focus (composer), focus restore.
  useDialogFocus({ open, onClose: flyout.close, containerRef: panelRef, initialFocusRef: inputRef });

  // Stop in-flight streams the moment the panel closes; reset scroll on open.
  useEffect(() => {
    if (!open) {
      agent.markClosed();
    } else {
      nearBottomRef.current = true;
      setShowJump(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const scrollToBottom = (smooth = false) => {
    const el = bodyRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: smooth ? "smooth" : "auto" });
    setShowJump(false);
  };

  const onBodyScroll = () => {
    const el = bodyRef.current;
    if (!el) return;
    const near = el.scrollHeight - el.scrollTop - el.clientHeight < PIN_THRESHOLD;
    nearBottomRef.current = near;
    if (near) setShowJump(false);
  };

  // Pin to latest only when the user is already at the bottom; otherwise nudge
  // with a "new message" pill instead of yanking them down.
  useEffect(() => {
    if (nearBottomRef.current) scrollToBottom();
    else if (!empty) setShowJump(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agent.messages, agent.followups, agent.pendingConfirm, agent.busy, open]);

  // Auto-grow the composer up to a cap, then scroll internally.
  const autoGrow = () => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, COMPOSER_MAX_H)}px`;
  };
  useEffect(autoGrow, [draft]);

  const submit = () => {
    const text = draft.trim();
    if (!text) return;
    nearBottomRef.current = true;
    agent.send(text);
    setDraft("");
    requestAnimationFrame(() => {
      if (inputRef.current) inputRef.current.style.height = "auto";
    });
  };

  return (
    <>
      <div
        className={`scrim agent-scrim${open ? " is-open" : ""}`}
        onClick={flyout.close}
        aria-hidden="true"
      />
      <aside
        ref={panelRef}
        className={`agent-panel${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Lexus Concierge assistant"
        aria-hidden={!open}
      >
        <header className="agent-head">
          <span className="agent-head__avatar" aria-hidden="true">
            <Sparkles width={18} height={18} />
          </span>
          <div className="agent-head__id">
            <p className="agent-head__name">Lexus Concierge</p>
            <p className="agent-head__sub">
              {agent.busy ? "Working on it…" : `Your Lexus concierge`}
            </p>
          </div>
          {!empty && (
            <button
              type="button"
              className="agent-head__action"
              aria-label="Start a new chat"
              onClick={agent.reset}
            >
              New chat
            </button>
          )}
          <button
            type="button"
            className="agent-head__close"
            aria-label="Close assistant"
            onClick={flyout.close}
          >
            <X width={18} height={18} />
          </button>
        </header>

        <div className="agent-body" ref={bodyRef} onScroll={onBodyScroll}>
          {empty ? (
            <div className="agent-welcome">
              <span className="agent-welcome__orb" aria-hidden="true">
                <Sparkles width={24} height={24} />
              </span>
              <h2 className="agent-welcome__hi">
                {ctx.greeting}, {ctx.member.firstName}.
              </h2>
              <p className="agent-welcome__lead">
                I'm Encore AI. I know your vehicles, benefits and bookings —
                how can I help?
              </p>

              <div className="agent-starters">
                {STARTERS.map((s) => (
                  <button
                    key={s.label}
                    type="button"
                    className="agent-starter"
                    onClick={() => agent.send(s.prompt)}
                  >
                    <span className="agent-starter__icon" aria-hidden="true">
                      <s.icon width={16} height={16} />
                    </span>
                    <span className="agent-starter__label">{s.label}</span>
                    <ChevronRight
                      className="agent-starter__arrow"
                      width={16}
                      height={16}
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="agent-thread" role="log" aria-live="polite">
              {agent.messages.map((m) => {
                if (m.role === "user") {
                  return (
                    <div key={m.id} className="agent-msg agent-msg--user">
                      <span className="agent-msg__bubbletext">{m.text}</span>
                      <time className="agent-msg__time">{fmtClock(m.at)}</time>
                    </div>
                  );
                }
                if (m.role === "agent") {
                  return (
                    <div
                      key={m.id}
                      className="agent-msg agent-msg--agent"
                      aria-busy={m.streaming || undefined}
                    >
                      <span className="agent-msg__avatar" aria-hidden="true">
                        <Sparkles width={13} height={13} />
                      </span>
                      <div className="agent-msg__col">
                        <p className="agent-msg__text">
                          {m.text}
                          {m.streaming && <span className="agent-caret" />}
                        </p>
                        {!m.streaming && m.text && (
                          <time className="agent-msg__time">{fmtClock(m.at)}</time>
                        )}
                      </div>
                    </div>
                  );
                }
                return (
                  <AgentSteps
                    key={m.id}
                    steps={m.steps}
                    pendingId={agent.pendingConfirm?.step.id ?? null}
                    onConfirm={agent.resolveConfirm}
                  />
                );
              })}

              {thinking && (
                <div className="agent-msg agent-msg--agent" aria-hidden="true">
                  <span className="agent-msg__avatar">
                    <Sparkles width={13} height={13} />
                  </span>
                  <span className="agent-thinking">
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
              )}
            </div>
          )}

          {showJump && (
            <button
              type="button"
              className="agent-jump"
              onClick={() => scrollToBottom(true)}
            >
              <ArrowRight width={13} height={13} /> New message
            </button>
          )}
        </div>

        <footer className="agent-foot">
          {agent.followups.length > 0 && !agent.busy && (
            <div className="agent-chips">
              {agent.followups.map((f) => (
                <button
                  key={f}
                  type="button"
                  className="agent-chip"
                  onClick={() => agent.send(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
          <div className="agent-composer">
            <textarea
              ref={inputRef}
              className="agent-composer__input"
              rows={1}
              aria-label="Message Lexus Concierge"
              placeholder="Ask Lexus Concierge anything…"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submit();
                }
              }}
            />
            {agent.busy ? (
              <button
                type="button"
                className="agent-composer__send agent-composer__stop"
                aria-label="Stop"
                onClick={agent.stop}
              >
                <span className="agent-composer__stopicon" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                className="agent-composer__send"
                aria-label="Send"
                disabled={!draft.trim()}
                onClick={submit}
              >
                <ArrowRight width={18} height={18} />
              </button>
            )}
          </div>
          <p className="agent-foot__note">
            {empty ? (
              <>Press Enter to send · Shift+Enter for a new line</>
            ) : (
              <>
                <MessageCircle width={12} height={12} /> Prefer a human? Encore
                concierge is on 1800 023 009, 24/7.
              </>
            )}
          </p>
        </footer>
      </aside>
    </>
  );
}
