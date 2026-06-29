import type { ReactNode } from "react";
import { Check } from "../components/icons";

/**
 * Shared confirmation panel used at the end of flyout flows
 * (Book a service, Valet parking, Airport lounge). Matches a single
 * pattern: green tick mark, title, supporting copy, optional meta,
 * single Done action.
 */
export function Confirmation({
  title,
  description,
  meta,
  onDone,
}: {
  title: string;
  description: ReactNode;
  meta?: ReactNode;
  onDone: () => void;
}) {
  return (
    <div className="fly__success">
      <span className="fly__tick">
        <Check width={26} height={26} />
      </span>
      <h3 className="fly__h">{title}</h3>
      <p className="fly__sub">{description}</p>
      {meta && <p className="fly__remaining">{meta}</p>}
      <button className="btn btn--ghost fly__block" onClick={onDone}>
        Done
      </button>
    </div>
  );
}
