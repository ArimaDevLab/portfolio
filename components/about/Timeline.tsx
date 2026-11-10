"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Robot } from "./Doodles";

export type TLItem = { slug: string; title: string; date: string; cover: string; hobby: boolean; link?: string };

const LINES = [
  "トップの「進め方」から来ました",
  "まだまだ増えます",
  "ケーキの差し入れ待ってます",
  "いま筋トレ中…",
  "次は何をつくる？",
  "あと何回押す？",
];

/** つくったものを日付順に並べた年表。スクロールに合わせてロボットが線の上を進む */
export default function Timeline({ items }: { items: TLItem[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const [say, setSay] = useState<string | null>(null);
  const clicks = useRef(0);
  const sayTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const mid = window.innerHeight * 0.55;
      setP(Math.min(1, Math.max(0, (mid - r.top) / r.height)));
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); cancelAnimationFrame(raf); };
  }, []);

  const talk = () => {
    clicks.current++;
    if (clicks.current % 5 === 0) {
      setSay("パトカー、呼びました 🚨");
      window.dispatchEvent(new Event("about:patrol"));
    } else {
      setSay(LINES[(clicks.current - 1) % LINES.length]);
    }
    window.clearTimeout(sayTimer.current);
    sayTimer.current = window.setTimeout(() => setSay(null), 2200);
  };

  const fmt = (d: string) => { const [y, m, day] = d.split("-"); return { y, md: `${Number(m)}/${Number(day)}` }; };

  return (
    <div className="tl" ref={wrap} style={{ "--p": p } as React.CSSProperties}>
      <div className="tl-line" aria-hidden="true"><span className="tl-fill" /></div>
      <button type="button" className={`tl-robot${say ? " talking" : ""}`} onClick={talk} aria-label="ロボット（押すと話します）">
        <Robot />
        {say && <span className="tl-say">{say}</span>}
      </button>
      <ol className="tl-list">
        {items.map((w, i) => {
          const d = fmt(w.date);
          const prevYear = i > 0 ? fmt(items[i - 1].date).y : null;
          const body = (
            <>
              <span className="tl-thumb"><Image src={w.cover} alt="" fill sizes="120px" /></span>
              <span className="tl-text">
                <span className="tl-date">{d.md}<span className={`tl-kind${w.hobby ? " hobby" : ""}`}>{w.hobby ? "趣味" : "仕事"}</span></span>
                <span className="tl-title">{w.title}</span>
              </span>
            </>
          );
          return (
            <li key={w.slug} className={`tl-item ${i % 2 ? "r" : "l"}`} data-reveal>
              {d.y !== prevYear && <span className="tl-year">{d.y}</span>}
              {w.link ? (
                <a className="tl-card" href={w.link} target="_blank" rel="noopener noreferrer">{body}</a>
              ) : (
                <Link className="tl-card" href={`/works/${w.slug}`}>{body}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
