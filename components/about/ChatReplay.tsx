"use client";

import { useEffect, useRef, useState } from "react";

type Stat = { label: string; value: string; tone?: "ok" | "warn" | "ng" };
type Msg = { who: "me" | "ai" | "sys"; text: string; chips?: string[]; stats?: Stat[] };

// 住所クリーナー for kintone の開発での、実際のやりとりをもとに短くまとめたもの
const MSGS: Msg[] = [
  { who: "me", text: "kintone のプロキシ経由で、1回にどこまで送れるか測って。時間切れと、送る・受け取る大きさの上限も。" },
  {
    who: "ai",
    text: "測りました。時間切れは60秒です。55秒までは成功し、65秒と90秒はどちらも60.1秒で GAIA_PR03 になりました。受け取りは9MBまで成功、11MBは GAIA_PR01 で、公式の10MBの上限どおりです。",
    stats: [
      { label: "時間切れ", value: "60秒" },
      { label: "送る", value: "5MBまで成功" },
      { label: "受け取る", value: "10MBが上限" },
    ],
  },
  { who: "ai", text: "1回に送る件数を、10件から20件に上げる案です。50件にすると、都道府県を省いた住所が多いときに約26秒かかり、毎回20秒で切れて送り直しが増えます。" },
  { who: "me", text: "20件でいこう。PR03 は時間切れとして同じ住所を送り直し。PR01 は5秒待って、3回続いたら止めて画面で案内して。" },
  { who: "ai", text: "実装しました。本番に近い条件で、全国のばらばらな住所2,000件を流します。", chips: ["▶ 2,000件で試験"] },
  {
    who: "ai",
    text: "正規化に91秒、反映に22秒で、合わせて約2分です。APIには20件ずつちょうど100回届き、送り直しは0回でした。",
    stats: [
      { label: "変更あり", value: "1,989件", tone: "ok" },
      { label: "要確認", value: "11件", tone: "warn" },
      { label: "エラー", value: "0件", tone: "ok" },
    ],
  },
  { who: "ai", text: "もう1点。設定画面の「接続テスト」は、kintone の仕様で設定画面からはプロキシが使えず、75秒待ってエラーを出すだけでした。開発用のメモに残してあります。", chips: ["📝 CLAUDE.md に記録"] },
  { who: "me", text: "接続テストのボタンはやめよう。保存のあとに「レコード画面の『住所を正規化』で確かめてください」と案内する形で。試験用のキーも止めておいて。" },
  { who: "sys", text: "仕様に反映して、公開の準備へ 🚀" },
];

/** 人とAIのやりとりを、画面に入ったら1つずつ流す */
export default function ChatReplay() {
  const box = useRef<HTMLDivElement>(null);
  const log = useRef<HTMLOListElement>(null);
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
    setTyping(next.who === "sys" ? null : next.who);
    // 長い報告ほど、少し長く「入力中」を見せる
    const wait = next.who === "sys" ? 700 : Math.min(2600, 700 + next.text.length * (next.who === "ai" ? 14 : 10));
    const t = window.setTimeout(() => { setTyping(null); setShown((n) => n + 1); }, wait);
    return () => window.clearTimeout(t);
  }, [started, shown]);

  // 新しい発言が来たら、窓の中だけを下までスクロールする（ページは動かさない）
  useEffect(() => {
    const el = log.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [shown, typing]);

  const replay = () => { setShown(0); setStarted(true); };
  const done = shown >= MSGS.length;

  return (
    <div className="chat" ref={box}>
      <div className="chat-head">
        <span className="chat-dot" /><span className="chat-dot" /><span className="chat-dot" />
        <span className="chat-title">住所クリーナー for kintone の開発より（実際のやりとりを短くまとめたもの）</span>
      </div>
      <ol className="chat-log" ref={log} aria-live="off">
        {MSGS.slice(0, shown).map((m, i) => (
          <li key={i} className={`msg ${m.who}`}>
            {m.who !== "sys" && <span className="msg-who">{m.who === "me" ? "私" : "AI"}</span>}
            <div className="msg-bubble">
              <p>{m.text}</p>
              {m.stats && (
                <dl className="msg-stats">
                  {m.stats.map((s) => (
                    <div key={s.label} className={s.tone ?? ""}>
                      <dt>{s.label}</dt>
                      <dd>{s.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {m.chips?.map((c) => <span key={c} className="msg-chip">{c}</span>)}
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
