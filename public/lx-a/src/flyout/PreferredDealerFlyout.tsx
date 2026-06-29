import { useState } from "react";
import { Flyout } from "../components/Flyout";
import { MapPin } from "../components/icons";
import { Radio } from "../components/Radio";
import { useToast } from "../components/Toast";
import { useFlyout } from "./FlyoutProvider";
import { dealersByProximity } from "../data/service";

export function PreferredDealerFlyout({ open }: { open: boolean }) {
  const { close, preferredDealerId, setPreferredDealerId } = useFlyout();
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(preferredDealerId);

  const filtered = dealersByProximity.filter(
    (d) =>
      !query ||
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.address.toLowerCase().includes(query.toLowerCase())
  );

  // Surface the currently saved preferred dealer at the top of the list when
  // not actively filtering, so the user can see what they have today.
  const list = (() => {
    if (query) return filtered;
    const preferred = filtered.find((d) => d.id === preferredDealerId);
    if (!preferred) return filtered;
    return [preferred, ...filtered.filter((d) => d.id !== preferredDealerId)];
  })();
  const nearestId = dealersByProximity[0]?.id;

  const confirm = () => {
    setPreferredDealerId(selected);
    close();
    const name = dealersByProximity.find((d) => d.id === selected)?.name;
    toast("Preferred dealer updated", {
      description: name ? `${name} is now your preferred dealer.` : undefined,
    });
  };

  return (
    <Flyout
      open={open}
      title="Preferred dealer"
      onClose={close}
      heading="Who's your preferred dealer?"
      description="Get access to easier and faster servicing when you have a preferred dealer."
      footer={
        <div className="flyout__actions">
          <button className="btn btn--primary" onClick={confirm}>
            Save preferred dealer
          </button>
          <button className="btn btn--ghost" onClick={close}>
            Cancel
          </button>
        </div>
      }
    >
      <label className="field">
        <span className="field__label">Suburb or postcode</span>
        <input
          className="field__input"
          placeholder="Start typing"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      <button className="link-arrow fly__loc" onClick={() => setQuery("")}>
        <MapPin width={14} height={14} /> Use current location
      </button>

      <div className="radiolist">
        {list.map((d) => {
          const tags: string[] = [];
          if (d.id === preferredDealerId) tags.push("Current");
          if (d.id === nearestId) tags.push("Nearest");
          return (
            <Radio
              key={d.id}
              name="preferred-dealer"
              value={d.id}
              checked={selected === d.id}
              onChange={setSelected}
              label={
                <span className="dealerlabel">
                  {d.name}
                  {tags.map((t) => (
                    <span key={t} className="dealerlabel__tag">
                      {t}
                    </span>
                  ))}
                </span>
              }
              description={`${d.address} · ${d.distance} away`}
            />
          );
        })}
        {list.length === 0 && (
          <p className="dealerlist__empty">No dealers match “{query}”.</p>
        )}
      </div>
    </Flyout>
  );
}
