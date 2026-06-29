import { useState } from "react";
import { Flyout } from "../components/Flyout";
import { useToast } from "../components/Toast";
import { useFlyout } from "./FlyoutProvider";
import { allInterests } from "../data/profile";

export function EditInterestsFlyout({ open }: { open: boolean }) {
  const { close, interests, setInterests } = useFlyout();
  const { toast } = useToast();
  const [selected, setSelected] = useState<string[]>(interests);

  const toggle = (tag: string) =>
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  const save = () => {
    // Preserve the master-list order for a stable display.
    setInterests(allInterests.filter((t) => selected.includes(t)));
    close();
    toast("Interests updated", {
      description: "Your interests have been saved.",
    });
  };

  return (
    <Flyout
      open={open}
      title="Interests"
      onClose={close}
      heading="What are you into?"
      description="Pick the things you love and we'll tailor offers and experiences to match."
      footer={
        <div className="flyout__actions">
          <button className="btn btn--primary" onClick={save}>
            Save interests
          </button>
          <button className="btn btn--ghost" onClick={close}>
            Cancel
          </button>
        </div>
      }
    >
      <div className="chipselect">
        {allInterests.map((tag) => {
          const on = selected.includes(tag);
          return (
            <button
              key={tag}
              type="button"
              role="checkbox"
              aria-checked={on}
              className={`chipopt${on ? " is-on" : ""}`}
              onClick={() => toggle(tag)}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </Flyout>
  );
}
