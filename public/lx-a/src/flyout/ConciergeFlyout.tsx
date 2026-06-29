import { useEffect, useRef, useState } from "react";
import { Flyout } from "../components/Flyout";
import { useFlyout } from "./FlyoutProvider";
import { Phone, ArrowRight, Calendar, ChevronRight } from "../components/icons";
import { usePersistedState } from "../lib/usePersistedState";
import {
  conciergeTeam,
  conciergeTopics,
  seedConciergeThread,
  autoReplyFor,
  type ConciergeMessage,
  type ConciergeTopic,
} from "../data/concierge";

function fmtTime(ts: number): string {
  const d = new Date(ts);
  const now = new Date();
  const sameDay =
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate();
  const diffDays = Math.round((now.getTime() - ts) / (24 * 60 * 60 * 1000));
  const time = d.toLocaleTimeString("en-AU", {
    hour: "numeric",
    minute: "2-digit",
  });
  if (sameDay) return `Today · ${time}`;
  if (diffDays === 1) return `Yesterday · ${time}`;
  if (diffDays < 7) {
    return `${d.toLocaleDateString("en-AU", { weekday: "long" })} · ${time}`;
  }
  return d.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
  });
}

function isAvailable(date: Date = new Date()): boolean {
  // Concierge is on call 24/7 in the brand story, but simulate "live" between
  // 7am and 10pm AET so the indicator behaves realistically through the day.
  const h = date.getHours();
  return h >= 7 && h < 22;
}

export function ConciergeFlyout({ open }: { open: boolean }) {
  const { close } = useFlyout();
  const [thread, setThread] = usePersistedState<ConciergeMessage[]>(
    "lexus.concierge.thread",
    seedConciergeThread
  );
  const [callbacks, setCallbacks] = usePersistedState<
    { id: string; at: number; window: string }[]
  >("lexus.concierge.callbacks", []);

  const [message, setMessage] = useState("");
  const [topic, setTopic] = useState<string | undefined>();
  const [typing, setTyping] = useState(false);
  const [showCallback, setShowCallback] = useState(false);
  const [callbackWhen, setCallbackWhen] = useState("Today, between 4–6pm");
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const replyTimer = useRef<number | null>(null);

  const live = isAvailable();
  const sortedThread = [...thread].sort((a, b) => a.at - b.at);
  const lastConcierge = [...sortedThread]
    .reverse()
    .find((m) => m.from === "concierge");

  // The start screen stays calm until the member sends their first message.
  const hasConversation = sortedThread.some((m) => m.from === "you");
  const greeting = sortedThread.find((m) => m.from === "concierge");
  const notes = sortedThread
    .filter((m) => m.from === "concierge" && m.id !== greeting?.id)
    .slice(0, 1);
  const starters = conciergeTopics.filter((t) => t.example);

  // Scroll to bottom whenever the active thread updates.
  useEffect(() => {
    if (!open || !hasConversation) return;
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [open, hasConversation, sortedThread.length, typing]);

  // Clean up any pending auto-reply on unmount.
  useEffect(() => {
    return () => {
      if (replyTimer.current) window.clearTimeout(replyTimer.current);
    };
  }, []);

  const useStarter = (t: ConciergeTopic) => {
    setTopic(t.id);
    if (t.example) setMessage(t.example);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const send = () => {
    const body = message.trim();
    if (!body) return;
    const at = Date.now();
    const mine: ConciergeMessage = {
      id: `you-${at}`,
      from: "you",
      body,
      at,
      topic,
    };
    setThread((prev) => [...prev, mine]);
    setMessage("");
    setTyping(true);

    replyTimer.current = window.setTimeout(() => {
      const reply: ConciergeMessage = {
        id: `c-${Date.now()}`,
        from: "concierge",
        body: autoReplyFor(body, topic),
        at: Date.now(),
        topic,
      };
      setThread((prev) => [...prev, reply]);
      setTopic(undefined);
      setTyping(false);
    }, 1800);
  };

  const requestCallback = () => {
    const id = `cb-${Date.now()}`;
    const at = Date.now();
    setCallbacks((prev) => [...prev, { id, at, window: callbackWhen }]);
    setThread((prev) => [
      ...prev,
      {
        id: `cb-msg-${at}`,
        from: "concierge",
        body: `A callback is booked for ${callbackWhen.toLowerCase()}. I'll ring you on the mobile on file.`,
        at,
      },
    ]);
    setShowCallback(false);
  };

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <Flyout open={open} title="Concierge" onClose={close}>
      <header className="concierge2__head">
        <span className="concierge2__avatar" aria-hidden="true">
          {conciergeTeam.initials}
          <span
            className={`concierge2__status${live ? " is-live" : ""}`}
            aria-hidden="true"
          />
        </span>
        <div className="concierge2__about">
          <p className="concierge2__name">{conciergeTeam.name}</p>
          <p className="concierge2__role">{conciergeTeam.role}</p>
          <p className="concierge2__hours">
            <span className={`dot${live ? " is-live" : ""}`} />
            {live
              ? `Available now · replies in ~${conciergeTeam.responseSlaMinutes} min`
              : "Away until 7am — leave a message"}
          </p>
        </div>
      </header>

      {hasConversation ? (
        <>
          <div className="concierge2__thread" ref={bodyRef}>
            {sortedThread.map((m, i) => {
              const prev = sortedThread[i - 1];
              const showAuthor = !prev || prev.from !== m.from;
              return (
                <div
                  key={m.id}
                  className={`bubble bubble--${m.from}${
                    showAuthor ? " bubble--first" : ""
                  }`}
                >
                  {showAuthor && (
                    <span className="bubble__author">
                      {m.from === "you" ? "You" : conciergeTeam.name}
                    </span>
                  )}
                  <p className="bubble__body">{m.body}</p>
                  <span className="bubble__time">{fmtTime(m.at)}</span>
                </div>
              );
            })}
            {typing && (
              <div className="bubble bubble--concierge bubble--first bubble--typing">
                <span className="bubble__author">{conciergeTeam.name}</span>
                <span className="typing" aria-label="Concierge is typing">
                  <span />
                  <span />
                  <span />
                </span>
              </div>
            )}
          </div>

          {callbacks.length > 0 && lastConcierge && (
            <p className="concierge2__cbnote">
              <Calendar width={12} height={12} /> Callback booked for{" "}
              {callbacks[callbacks.length - 1].window.toLowerCase()}.
            </p>
          )}
        </>
      ) : (
        <div className="concierge2__welcome">
          {greeting && (
            <p className="concierge2__greeting">{greeting.body}</p>
          )}

          {notes.map((n) => (
            <div key={n.id} className="concierge2__note">
              <Calendar width={15} height={15} aria-hidden="true" />
              <p>{n.body}</p>
            </div>
          ))}

          <p className="concierge2__sectionhead">Popular requests</p>
          <ul className="concierge2__starters">
            {starters.map((t) => (
              <li key={t.id}>
                <button
                  type="button"
                  className="starter"
                  onClick={() => useStarter(t)}
                >
                  <span className="starter__label">{t.label}</span>
                  <ChevronRight
                    className="starter__arrow"
                    width={16}
                    height={16}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="concierge2__composer">
        <label className="sr-only" htmlFor="concierge-input">
          Message
        </label>
        <textarea
          id="concierge-input"
          ref={inputRef}
          className="field__input field__textarea concierge2__input"
          rows={2}
          placeholder={
            topic
              ? `Tell us about your ${conciergeTopics
                  .find((t) => t.id === topic)
                  ?.label.toLowerCase()}…`
              : "Ask us anything — we'll come back within minutes."
          }
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={onKey}
        />
        <button
          type="button"
          className="btn btn--primary concierge2__send"
          onClick={send}
          disabled={message.trim().length < 2}
          aria-label="Send message"
        >
          Send <ArrowRight width={14} height={14} />
        </button>
      </div>

      <div className="concierge2__contact">
        <span className="concierge2__contactlabel">Prefer to talk?</span>
        <a className="concierge2__contactlink" href={`tel:+61${1800023009}`}>
          <Phone width={13} height={13} /> 1800 023 009
        </a>
        <span className="concierge2__contactsep" aria-hidden="true">
          ·
        </span>
        <button
          type="button"
          className="concierge2__contactlink"
          onClick={() => setShowCallback((v) => !v)}
          aria-expanded={showCallback}
        >
          <Calendar width={13} height={13} /> Request a callback
        </button>
      </div>

      {showCallback && (
        <div className="concierge2__callback">
          <label className="field">
            <span className="field__label">When suits you?</span>
            <select
              className="field__input"
              value={callbackWhen}
              onChange={(e) => setCallbackWhen(e.target.value)}
            >
              <option>Today, between 4–6pm</option>
              <option>Today, after 7pm</option>
              <option>Tomorrow morning</option>
              <option>Tomorrow afternoon</option>
              <option>This weekend</option>
            </select>
          </label>
          <div className="flyout__actions flyout__actions--inline">
            <button
              type="button"
              className="btn btn--primary"
              onClick={requestCallback}
            >
              Book callback
            </button>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setShowCallback(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </Flyout>
  );
}
