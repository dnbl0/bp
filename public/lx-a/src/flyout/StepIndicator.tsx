/**
 * Linear-flow progress indicator for multi-step flyouts.
 * Renders `Step N of M — Label` with a thin segmented track.
 */
export function StepIndicator({
  current,
  steps,
}: {
  current: number;
  steps: readonly string[];
}) {
  return (
    <div className="stepind" aria-label={`Step ${current + 1} of ${steps.length}`}>
      <p className="stepind__label">
        Step {current + 1} of {steps.length} · {steps[current]}
      </p>
      <div className="stepind__track" role="presentation">
        {steps.map((_, i) => (
          <span
            key={i}
            className={`stepind__seg${i <= current ? " is-done" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
