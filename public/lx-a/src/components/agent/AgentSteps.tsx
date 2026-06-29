import type { RunStep } from "../../lib/agent/runtime";
import { AgentResultCard } from "./AgentResultCard";
import { Check, X } from "../icons";

/**
 * The agent's visible "work" — an ordered list of tool steps that tick from
 * pending → running → done, with an inline confirm gate on consequential
 * steps and the result card rendered beneath each completed step.
 */
export function AgentSteps({
  steps,
  pendingId,
  onConfirm,
}: {
  steps: RunStep[];
  /** Id of the step currently awaiting confirmation, if any. */
  pendingId: string | null;
  onConfirm: (ok: boolean) => void;
}) {
  if (!steps.length) return null;
  return (
    <ul className="agent-steps" aria-label="Agent steps">
      {steps.map((s) => (
        <li
          key={s.id}
          className={`agent-step is-${s.status}`}
          aria-label={`${s.label} — ${s.status}`}
          aria-busy={s.status === "running" || undefined}
        >
          <span className="agent-step__bullet" aria-hidden="true">
            {s.status === "done" ? (
              <Check width={12} height={12} />
            ) : s.status === "skipped" || s.status === "error" ? (
              <X width={12} height={12} />
            ) : s.status === "running" ? (
              <span className="agent-step__spin" />
            ) : (
              <span className="agent-step__dot" />
            )}
          </span>
          <div className="agent-step__main">
            <span className="agent-step__label">{s.label}</span>

            {s.status === "error" && s.result?.summary && (
              <p className="agent-step__error">{s.result.summary}</p>
            )}

            {s.status === "awaiting-confirm" && s.id === pendingId && (
              <div className="agent-confirm">
                <p className="agent-confirm__q">{s.confirm ?? "Go ahead?"}</p>
                <div className="agent-confirm__actions">
                  <button
                    type="button"
                    className="btn btn--primary btn--sm"
                    onClick={() => onConfirm(true)}
                  >
                    Confirm
                  </button>
                  <button
                    type="button"
                    className="btn btn--ghost btn--sm"
                    onClick={() => onConfirm(false)}
                  >
                    Not now
                  </button>
                </div>
              </div>
            )}

            {s.result?.card && <AgentResultCard card={s.result.card} />}
          </div>
        </li>
      ))}
    </ul>
  );
}
