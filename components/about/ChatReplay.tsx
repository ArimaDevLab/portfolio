"use client";

import { useEffect, useRef, useState } from "react";

type Msg = { who: "me" | "ai" | "sys"; text: string; chip?: string };

const MSGS: Msg[] = [
  { who: "me", text: "kintoneの住所をきれいにするプラグインをつくりたい。仕様書はこれ。", chip: "📄 仕様書.md" },
  { who: "ai", text: "仕様書を読みました。実装の前に、テストを先に書きます。", chip: "✕ テスト：まだ全部失敗（想定どおり）" },
  { who: "ai", text: "実装しました。", chip: "✓ テスト：すべて成功" },
  { who: "me", text: "郵便番号がない住所だと、建物名が消える。ここは仕様と違うよ。" },
  { who: "ai", text: "直しました。その場合のテストも足してあります。", chip: "✓ テスト：すべて成功" },
  { who: "me", text: "確認OK。公開しよう。" },
  { who: "sys", text: "公開しました 🚀" },
];

/** 人とAIのやりとりを、画面に入ったら1つずつ流す */
export default function ChatReplay() {
  const box = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState<"me" | "ai" | null>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(MSGS.length); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started || shown >= MSGS.length) { setTyping(null); return; }
    const next = MSGS[shown];
    const who = next.who === "sys" ? null : next.who;
    setTyping(who);
    const wait = next.who === "ai" ? 1300 : next.who === "sys" ? 700 : 900;
    const t = window.setTimeout(() => { setTyping(null); setShown((n) => n + 1); }, wait);
    return () => window.clearTimeout(t);
  }, [started, shown]);

  const replay = () => { setShown(0); setStarted(true); };
  const done = shown >= MSGS.length;

  return (
    <div className="chat" ref={box}>
      <div className="chat-head">
        <span className="chat-dot" /><span className="chat-dot" /><span className="chat-dot" />
        <span className="chat-title">開発のやりとり（イメージ）</span>
      </div>
      <ol className="chat-log" aria-live="off">
        {MSGS.slice(0, shown).map((m, i) => (
          <li key={i} className={`msg ${m.who}`}>
            {m.who !== "sys" && <span className="msg-who">{m.who === "me" ? "私" : "AI"}</span>}
            <div className="msg-bubble">
              <p>{m.text}</p>
              {m.chip && <span className={`msg-chip${m.chip.startsWith("✓") ? " ok" : m.chip.startsWith("✕") ? " ng" : ""}`}>{m.chip}</span>}
            </div>
          </li>
        ))}
        {typing && (
          <li className={`msg ${typing} is-typing`} aria-hidden="true">
            <span className="msg-who">{typing === "me" ? "私" : "AI"}</span>
            <div className="msg-bubble"><span className="dots"><i /><i /><i /></span></div>
          </li>
        )}
      </ol>
      {done && (
        <>
          <div className="chat-confetti" aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <i key={i} style={{ "--n": i } as React.CSSProperties} />)}</div>
          <button type="button" className="chat-replay" onClick={replay}>もう一度見る ↻</button>
        </>
      )}
    </div>
  );
}
