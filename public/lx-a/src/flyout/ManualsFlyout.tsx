import { Flyout } from "../components/Flyout";
import { useFlyout } from "./FlyoutProvider";
import {
  findModelManual,
  manualResources,
  type ManualResource,
} from "../data/manuals";
import { ArrowRight } from "../components/icons";

export function ManualsFlyout({ open }: { open: boolean }) {
  const { close, payload } = useFlyout();
  const heading = payload.vehicleName
    ? `${payload.vehicleName} manuals`
    : "Manuals & resources";

  // When opened for a specific vehicle, lead with that model's public
  // eBrochure and overview page — the same sourced links the concierge uses —
  // so the manual surfaces stay consistent end-to-end.
  const model = findModelManual(payload.vehicleName ?? "");
  const resources: ManualResource[] = model
    ? [
        {
          id: "ebrochure",
          title: `${model.model} eBrochure`,
          description:
            "Full specifications, grades and features for the range.",
          format: "PDF",
          size: "Specs & features",
          url: model.brochureUrl,
        },
        {
          id: "overview",
          title: `${model.model} model overview`,
          description:
            "Explore grades, colours and Build & Price on lexus.com.au.",
          format: "Web",
          size: "lexus.com.au",
          url: model.overviewUrl,
        },
        // Keep the genuine owner resources (warranty, service, connected); the
        // eBrochure above replaces the generic owner's-manual entry.
        ...manualResources.filter((m) => m.id !== "owners-manual"),
      ]
    : manualResources;

  return (
    <Flyout
      open={open}
      title="Manuals & resources"
      onClose={close}
      heading={heading}
      description="eBrochures, operating guides, warranty information and connected-services help — all in one place."
    >
      <ul className="manuals">
        {resources.map((m) => (
          <li key={m.id} className="manuals__item">
            <div className="manuals__text">
              <h3 className="manuals__title">{m.title}</h3>
              <p className="manuals__body">{m.description}</p>
              <p className="manuals__meta">
                {m.format} · {m.size}
              </p>
            </div>
            <a
              href={m.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow manuals__cta"
              aria-label={`Open ${m.title}`}
            >
              {m.format === "Video"
                ? "Watch"
                : m.format === "Web"
                ? "Read"
                : "Download"}{" "}
              <ArrowRight width={14} height={14} />
            </a>
          </li>
        ))}
      </ul>
    </Flyout>
  );
}
