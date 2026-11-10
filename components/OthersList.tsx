"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export type OtherTool = {
  slug: string;
  title: string;
  tag: string;
  summary: string;
  image: string;
  highlights: string[];
  icon: React.ReactNode;
};

const W = 320;

/** 「そのほかのツール」の一覧。マウスを乗せると、その行の横に画像と説明の小さなカードが出る */
export default function OthersList({ tools }: { tools: OtherTool[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [pos, setPos] = useState<{ left: number; top: number; side: "right" | "left" } | null>(null);
  const [enabled, setEnabled] = useState(false);
  const rows = useRef<(HTMLAnchorElement | null)[]>([]);
  const card = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const m = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 900px)");
    const on = () => setEnabled(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);

  const place = useCallback((i: number) => {
    const el = rows.current[i];
    if (!el) return;
    const r = el.getBoundingClientRect();
    const h = card.current?.offsetHeight ?? 300;
    const right = r.right + 14 + W <= window.innerWidth - 12;
    const left = right ? r.right + 14 : Math.max(12, r.left - 14 - W);
    const top = Math.min(Math.max(76, r.top + r.height / 2 - h / 2), window.innerHeight - h - 12);
    setPos({ left, top, side: right ? "right" : "left" });
  }, []);

  const open = (i: number) => {
    if (!enabled) return;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => { setActive(i); place(i); }, active === null ? 180 : 40);
  };
  const close = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setActive(null), 80);
  };

  useEffect(() => {
    if (active === null) return;
    const id = requestAnimationFrame(() => place(active));
    const off = () => setActive(null);
    window.addEventListener("scroll", off, { passive: true });
    return () => { cancelAnimationFrame(id); window.removeEventListener("scroll", off); };
  }, [active, place]);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const t = active !== null ? tools[active] : null;

  return (
    <>
      <ul className="others-list">
        {tools.map((w, i) => (
          <li key={w.slug}>
            <Link
              href={`/works/${w.slug}`}
              ref={(el) => { rows.current[i] = el; }}
              className={active === i ? "is-lit" : undefined}
              onMouseEnter={() => open(i)}
              onMouseLeave={close}
            >
              <span className="others-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">{w.icon}</svg>
              </span>
              <span className="others-text">
                <span className="others-name">{w.title}</span>
                <span className="others-tag">{w.tag}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div
        ref={card}
        className={`tool-peek${t && pos ? " on" : ""}${pos ? ` from-${pos.side}` : ""}`}
        style={pos ? { left: pos.left, top: pos.top, width: W } : { width: W }}
        aria-hidden="true"
      >
        {t && (
          <>
            <div className="tool-peek-img">
              <Image key={t.image} src={t.image} alt="" fill sizes={`${W}px`} />
            </div>
            <div className="tool-peek-body">
              <p className="tool-peek-summary">{t.summary}</p>
              {t.highlights.length > 0 && (
                <ul className="peek-points">
                  {t.highlights.slice(0, 2).map((h) => <li key={h}>{h}</li>)}
                </ul>
              )}
              <p className="peek-more">クリックで詳しく見る</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
