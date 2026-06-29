import { useState } from "react";
import { Flyout } from "../components/Flyout";
import { TextField } from "../components/TextField";
import { useToast } from "../components/Toast";
import { useFlyout } from "./FlyoutProvider";
import { X } from "../components/icons";
import type { PaymentMethod } from "../data/profile";

function brandOf(number: string): string {
  const n = number.replace(/\D/g, "");
  if (/^4/.test(n)) return "Visa";
  if (/^3[47]/.test(n)) return "Amex";
  if (/^5/.test(n)) return "Mastercard";
  if (/^6/.test(n)) return "Discover";
  return "Card";
}

/** Group raw digits into 4-character blocks (3-character middle block for Amex). */
function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 19);
  if (/^3[47]/.test(digits)) {
    // Amex 4-6-5 grouping
    const a = digits.slice(0, 4);
    const b = digits.slice(4, 10);
    const c = digits.slice(10, 15);
    return [a, b, c].filter(Boolean).join(" ");
  }
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

/** Mask expiry as MM/YY as the user types. */
function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export function PaymentMethodsFlyout({ open }: { open: boolean }) {
  const { close, payments, setPayments } = useFlyout();
  const { toast } = useToast();
  const [cards, setCards] = useState<PaymentMethod[]>(payments);
  const [adding, setAdding] = useState(false);
  const [number, setNumber] = useState("");
  const [expiry, setExpiry] = useState("");

  const makePrimary = (id: string) =>
    setCards((prev) => prev.map((c) => ({ ...c, primary: c.id === id })));

  const remove = (id: string) =>
    setCards((prev) => {
      const next = prev.filter((c) => c.id !== id);
      // Ensure one card stays primary.
      if (next.length && !next.some((c) => c.primary)) next[0].primary = true;
      return next;
    });

  const digits = number.replace(/\D/g, "");
  const liveBrand = digits.length >= 2 ? brandOf(number) : null;
  const isAmex = /^3[47]/.test(digits);
  const validLength = isAmex ? digits.length === 15 : digits.length >= 13;
  const [mm, yy] = expiry.split("/");
  const validExpiry =
    /^\d{2}$/.test(mm ?? "") &&
    /^\d{2}$/.test(yy ?? "") &&
    Number(mm) >= 1 &&
    Number(mm) <= 12;
  const canAdd = validLength && validExpiry;

  const addCard = () => {
    if (!canAdd) return;
    const last4 = digits.slice(-4);
    const expiryClean = expiry.trim();
    const card: PaymentMethod = {
      id: `pm-${last4}-${expiryClean.replace("/", "")}`,
      brand: brandOf(number),
      last4,
      expiry: expiryClean,
      primary: cards.length === 0,
    };
    setCards((prev) => [...prev, card]);
    setNumber("");
    setExpiry("");
    setAdding(false);
  };

  const onNumberChange = (v: string) => setNumber(formatCardNumber(v));
  const onExpiryChange = (v: string) => setExpiry(formatExpiry(v));

  const save = () => {
    setPayments(cards);
    close();
    toast("Payment methods updated");
  };

  return (
    <Flyout
      open={open}
      title="Payment methods"
      onClose={close}
      heading="Manage your cards"
      description="Cards on file are used for Encore experiences, valet and service payments."
      footer={
        <div className="flyout__actions">
          <button className="btn btn--primary" onClick={save}>
            Save changes
          </button>
          <button className="btn btn--ghost" onClick={close}>
            Cancel
          </button>
        </div>
      }
    >
      <ul className="paylist paylist--flyout">
        {cards.map((c) => (
          <li key={c.id} className="payrow payrow--manage">
            <span className="payrow__brand">{c.brand}</span>
            <div className="payrow__text">
              <span className="payrow__num">•••• {c.last4}</span>
              <span className="payrow__exp">Expires {c.expiry}</span>
            </div>
            {c.primary ? (
              <span className="chip">Primary</span>
            ) : (
              <button
                type="button"
                className="link-arrow payrow__set"
                onClick={() => makePrimary(c.id)}
              >
                Make primary
              </button>
            )}
            <button
              type="button"
              className="payrow__remove"
              aria-label={`Remove card ending ${c.last4}`}
              onClick={() => remove(c.id)}
            >
              <X width={14} height={14} />
            </button>
          </li>
        ))}
        {cards.length === 0 && (
          <li className="dealerlist__empty">No cards saved yet.</li>
        )}
      </ul>

      {adding ? (
        <div className="fly__block paycard-form">
          <div className="paycard-form__numwrap">
            <TextField
              label="Card number"
              value={number}
              onChange={onNumberChange}
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder={isAmex ? "1234 567890 12345" : "1234 5678 9012 3456"}
            />
            {liveBrand && (
              <span className="paycard-form__brand">{liveBrand}</span>
            )}
          </div>
          <TextField
            label="Expiry (MM/YY)"
            value={expiry}
            onChange={onExpiryChange}
            inputMode="numeric"
            autoComplete="cc-exp"
            placeholder="08/27"
          />
          <div className="flyout__actions flyout__actions--inline">
            <button
              className="btn btn--primary"
              disabled={!canAdd}
              onClick={addCard}
            >
              Add card
            </button>
            <button className="btn btn--ghost" onClick={() => setAdding(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="fly__more"
          onClick={() => setAdding(true)}
        >
          + Add a card
        </button>
      )}
    </Flyout>
  );
}
