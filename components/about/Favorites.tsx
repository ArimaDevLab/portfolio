"use client";

import { useEffect, useRef, useState } from "react";
import { Baseball, Cake, Dango, Dumbbell, Laptop } from "./Doodles";

const pop = (el: HTMLElement | null, cls: string, ms = 700) => {
  if (!el) return;
  el.classList.remove(cls);
  void el.offsetWidth; // アニメーションを最初から
  el.classList.add(cls);
  window.setTimeout(() => el.classList.remove(cls), ms);
};

const TERM: { p?: string; t: string; c?: string }[] = [
  { p: "PS C:\\dev>", t: "claude" },
  { t: "> 仕様書どおりに実装して、テストも通して", c: "u" },
  { t: "✓ テスト すべて成功", c: "ok" },
  { p: "PS C:\\dev>", t: "gemini" },
  { t: "> この画面の文言、もっと短くできる？", c: "u" },
  { p: "PS C:\\dev>", t: "git push" },
  { t: "✓ 公開しました", c: "ok" },
];

function Terminal() {
  const [lines, setLines] = useState<{ p?: string; t: string; c?: string }[]>([]);
  const [cur, setCur] = useState("");
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setLines(TERM); return; }
    let li = 0, ci = 0, t = 0, alive = true, started = false;
    const step = () => {
      if (!alive) return;
      if (li >= TERM.length) { t = window.setTimeout(() => { setLines([]); li = 0; ci = 0; setIdx(0); step(); }, 2600); return; }
      const L = TERM[li];
      const typed = !L.c || L.c === "u";
      if (typed && ci < L.t.length) { ci++; setCur(L.t.slice(0, ci)); t = window.setTimeout(step, L.c === "u" ? 55 : 110); return; }
      setLines((ls) => [...ls, L].slice(-6));
      setCur("");
      li++; ci = 0; setIdx(li % TERM.length);
      t = window.setTimeout(step, L.c === "ok" ? 900 : 450);
    };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) { started = true; step(); } }, { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => { alive = false; window.clearTimeout(t); io.disconnect(); };
  }, []);

  const next = TERM[idx];
  return (
    <div className="term" ref={ref} aria-label="ターミナルでClaudeやGemini、Gitを使っている様子">
      {lines.map((l, i) => (
        <p key={i} className={l.c ?? ""}>{l.p && <span className="pr">{l.p} </span>}{l.t}</p>
      ))}
      <p className={next?.c === "u" ? "u" : ""}>
        {next?.p && <span className="pr">{next.p} </span>}{cur}<span className="term-caret" />
      </p>
    </div>
  );
}

export default function Favorites() {
  const [reps, setReps] = useState(0);
  const [hr, setHr] = useState(0);
  const sweets = useRef<HTMLDivElement>(null);
  const gym = useRef<HTMLDivElement>(null);
  const ball = useRef<HTMLDivElement>(null);

  return (
    <div className="fav-grid">
      <button type="button" className="fav-card fav-sweets" onClick={() => pop(sweets.current, "is-pop", 900)}>
        <span className="fav-label">LIKE</span>
        <span className="fav-title">スイーツ</span>
        <div className="fav-art" ref={sweets}>
          <Cake />
          <Dango />
          <span className="fav-say">いただきます！</span>
        </div>
        <span className="fav-text">ケーキも和菓子も好きです。</span>
        <span className="fav-hint">クリックしてみてください</span>
      </button>

      <button type="button" className="fav-card fav-gym" onClick={() => { setReps((n) => n + 1); pop(gym.current, "is-lift", 650); }}>
        <span className="fav-label">HOBBY</span>
        <span className="fav-title">筋トレ</span>
        <div className="fav-art" ref={gym}>
          <Dumbbell />
          <span className="fav-count" aria-live="polite">{reps === 0 ? "" : reps >= 10 ? `${reps} 回！ナイスバルク` : `${reps} 回`}</span>
        </div>
        <span className="fav-text">最近は筋トレにハマっています。</span>
        <span className="fav-hint">クリックで1回</span>
      </button>

      <button type="button" className="fav-card fav-ball" onClick={() => { setHr((n) => n + 1); pop(ball.current, "is-hit", 1300); }}>
        <span className="fav-label">HOBBY</span>
        <span className="fav-title">野球観戦</span>
        <div className="fav-art" ref={ball}>
          <Baseball />
          <span className="fav-say">カキーン！</span>
          {hr > 0 && <span className="fav-count">ホームラン {hr} 本</span>}
        </div>
        <span className="fav-text">野球観戦にもハマっています。</span>
        <span className="fav-hint">クリックで打つ</span>
      </button>

      <div className="fav-card fav-tools">
        <div className="fav-tools-text">
          <span className="fav-label">TOOLS</span>
          <span className="fav-title">仕事道具は、安いPCだけ</span>
          <span className="fav-text">高いマシンはなくても、AIとターミナルがあればつくれます。ふだん使っているのはこのあたりです。</span>
          <ul className="tool-chips">
            {["Claude", "Gemini", "Git", "PowerShell"].map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>
        <Laptop><Terminal /></Laptop>
      </div>
    </div>
  );
}
