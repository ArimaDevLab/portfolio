"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export type GridWork = {
  slug: string;
  title: string;
  summary: string;
  cover: string;
  tags: string[];
  link?: string;
  demo?: string;
  still?: string;
  highlights: string[];
  status?: string;
};

const PANEL_W = 380;
const GAP = 18;
const STATUS = ["販売準備中", "試作", "無料サンプル", "製作中"];

/**
 * プロダクトのカード一覧。マウスで乗せると、まわりが暗くなり、カードの横に詳細のパネルが出る。
 * タッチ操作の端末や、動きを減らす設定のときは、ふつうのカードのまま。
 */
export default function WorkGrid({ works }: { works: GridWork[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [pos, setPos] = useState<{ left: number; top: number; side: "right" | "left" } | null>(null);
  const [enabled, setEnabled] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const m = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1000px) and (prefers-reduced-motion: no-preference)");
    const on = () => setEnabled(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);

  const place = useCallback((i: number) => {
    const el = cards.current[i];
    if (!el) return;
    const r = el.getBoundingClientRect();
    const ph = panel.current?.offsetHeight ?? 420;
    const right = r.right + GAP + PANEL_W <= window.innerWidth - 12;
    const left = right ? r.right + GAP : Math.max(12, r.left - GAP - PANEL_W);
    const top = Math.min(Math.max(76, r.top), window.innerHeight - ph - 16);
    setPos({ left, top, side: right ? "right" : "left" });
  }, []);

  const open = (i: number) => {
    if (!enabled) return;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => { setActive(i); place(i); }, active === null ? 260 : 60);
  };
  const close = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setActive(null), 80);
  };

  // パネルの高さが決まってから位置を合わせ直す。スクロールしたら閉じる
  useEffect(() => {
    if (active === null) return;
    const id = requestAnimationFrame(() => place(active));
    const onScroll = () => setActive(null);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { cancelAnimationFrame(id); window.removeEventListener("scroll", onScroll); };
  }, [active, place]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const w = active !== null ? works[active] : null;
  const status = w?.status ?? w?.tags.find((t) => STATUS.includes(t));

  return (
    <>
      <ul className={`work-list${active !== null ? " is-peeking" : ""}`}>
        {works.map((wk, i) => {
          const body = (
            <>
              <div className="thumb">
                <Image src={wk.cover} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw" priority={i < 3} />
                {wk.demo && <span className="demo-badge">デモ動画あり</span>}
              </div>
              <div className="card-body">
                {wk.tags.length > 0 && (
                  <ul className="card-tags">
                    {wk.tags.map((t, k) => <li key={t} className={k === 1 && wk.status ? `st-${STATUS.indexOf(wk.status)}` : undefined}>{t}</li>)}
                  </ul>
                )}
                <h3>
                  {wk.title}
                  {wk.link && <span className="ext" aria-hidden="true" />}
                </h3>
                <p>{wk.summary}</p>
              </div>
            </>
          );
          const common = {
            className: `card${active === i ? " is-lit" : ""}`,
            ref: (el: HTMLElement | null) => { cards.current[i] = el; },
            onMouseEnter: () => open(i),
            onMouseLeave: close,
          };
          return (
            <li key={wk.slug} data-reveal>
              {wk.link ? (
                <a {...common} ref={common.ref as React.Ref<HTMLAnchorElement>} href={wk.link} target="_blank" rel="noopener noreferrer" aria-label={`${wk.title}（新しいタブで開きます）`}>{body}</a>
              ) : (
                <Link {...common} ref={common.ref as React.Ref<HTMLAnchorElement>} href={`/works/${wk.slug}`}>{body}</Link>
              )}
            </li>
          );
        })}
      </ul>

      {/* まわりを暗くする幕と、横に出る詳細のパネル（どちらも飾り。中身はカードと詳細ページにある） */}
      <div className={`peek-dim${w ? " on" : ""}`} aria-hidden="true" />
      <div
        ref={panel}
        className={`peek${w && pos ? " on" : ""}${pos ? ` from-${pos.side}` : ""}`}
        style={pos ? { left: pos.left, top: pos.top, width: PANEL_W } : { width: PANEL_W }}
        aria-hidden="true"
      >
        {w && (
          <>
            {(w.demo || (w.still && w.still !== w.cover)) && <div className="peek-media">
              {w.demo ? (
                <video key={w.demo} autoPlay muted loop playsInline preload="auto">
                  <source src={w.demo.replace(/\.mp4$/, ".webm")} type="video/webm" />
                  <source src={w.demo} type="video/mp4" />
                </video>
              ) : (
                <Image key={w.still} src={w.still!} alt="" fill sizes={`${PANEL_W}px`} />
              )}
              {w.demo && <span className="peek-live">DEMO</span>}
            </div>}
            <div className="peek-body">
              {status && <span className="peek-status">{status}</span>}
              <p className="peek-title">{w.title}</p>
              {w.highlights.length > 0 && (
                <ul className="peek-points">
                  {w.highlights.map((h) => <li key={h}>{h}</li>)}
                </ul>
              )}
              <p className="peek-more">クリックで{w.link ? "サイトを開く" : "詳しく見る"}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
