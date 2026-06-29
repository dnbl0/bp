import type { ReactNode } from "react";
import { Flyout } from "../components/Flyout";
import { useFlyout } from "./FlyoutProvider";

/**
 * Lightweight content flyout for "Learn more" entry points. Renders a title,
 * heading, description and a body slot — caller decides what goes in the body.
 */
export function InfoFlyout({
  open,
  title,
  heading,
  description,
  children,
  primaryAction,
}: {
  open: boolean;
  title: string;
  heading: string;
  description?: ReactNode;
  children: ReactNode;
  primaryAction?: { label: string; onClick: () => void };
}) {
  const { close } = useFlyout();
  return (
    <Flyout
      open={open}
      title={title}
      onClose={close}
      heading={heading}
      description={description}
      footer={
        primaryAction ? (
          <div className="flyout__actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={primaryAction.onClick}
            >
              {primaryAction.label}
            </button>
            <button type="button" className="btn btn--ghost" onClick={close}>
              Close
            </button>
          </div>
        ) : undefined
      }
    >
      {children}
    </Flyout>
  );
}
