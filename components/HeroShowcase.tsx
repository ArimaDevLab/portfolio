"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Robot } from "./about/Doodles";

export type ShowItem = { key: string; name: string; title: string; screen: string; href: string; external: boolean; say: string };
type Badge = { top: string; big: string; bottom: string; accent?: boolean };

type Notice = { label: string; text: string; href: string };

type Props = {
  notice?: Notice;
  headline: string[];
  accent: string;
  lead: string;
  chips: string[];
  badges: Badge[];
  items: ShowItem[];
};

const INTERVAL = 5000;

/** 最初の画面：左に見出しと「できること」、右に傾けたノートパソコン（中で製品の画面が切り替わる）とロボット */
export default function HeroShowcase({ notice, headline, accent, lead, chips, badges, items }: Props) {
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  const [stopped, setStopped] = useState(false);
  const paused = hover || stopped;
  const [reduced, setReduced] = useState(false);
  const go = useCallback((n: number) => setI(((n % items.length) + items.length) % items.length), [items.length]);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
  }, []);
  useEffect(() => {
    if (paused || reduced || items.length < 2) return;
    const t = window.setTimeout(() => go(i + 1), INTERVAL);
    return () => window.clearTimeout(t);
  }, [i, paused, reduced, go, items.length]);

  const cur = items[i];
  const mark = (line: string) => {
    if (!accent || !line.includes(accent)) return line;
    const [a, b] = line.split(accent);
    return (<>{a}<em className="sv-mark">{accent}</em>{b}</>);
  };

  return (
    <section className="sv">
      <div className="sv-panel" aria-hidden="true" />
      <p className="sv-outline" aria-hidden="true">sh<i>i</i>kumi</p>

      <div className="sv-inner">
        <div className="sv-text">
          {notice && (
            <Link href={notice.href} className="sv-notice">
              <span className="sv-notice-label">{notice.label}</span>
              <span className="sv-notice-text">{notice.text}</span>
              <span className="sv-notice-arrow" aria-hidden="true">→</span>
            </Link>
          )}
          <h1>{headline.map((l) => <span key={l}>{mark(l)}</span>)}</h1>
          <p className="sv-lead">{lead}</p>
          <ul className="sv-chips">
            {chips.map((c, k) => <li key={c} style={{ "--k": k } as React.CSSProperties}>{c}</li>)}
          </ul>
          <div className="sv-cta">
            <Link className="button primary large arrow" href="/contact">無料で相談する</Link>
            <a className="sv-sub" href="#works">プロダクトを見る</a>
          </div>
        </div>

        {/* 札からパソコンへ伸びる配線（広い画面のみ） */}
        <svg className="sv-wire" viewBox="0 0 200 400" preserveAspectRatio="none" aria-hidden="true">
          <path id="sv-w1" d="M0 250 C 80 250, 100 120, 200 110" />
          <path id="sv-w2" d="M0 320 C 90 320, 110 230, 200 220" />
          <circle r="4"><animateMotion dur="2.4s" repeatCount="indefinite"><mpath href="#sv-w1" /></animateMotion></circle>
          <circle r="4"><animateMotion dur="2.8s" begin="-1.2s" repeatCount="indefinite"><mpath href="#sv-w2" /></animateMotion></circle>
        </svg>

        <div className="sv-visual" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          <div className="sv-laptop">
            <span className="sv-bot" aria-hidden="true">
              <span key={cur.key} className="sv-say">{cur.say}</span>
              <Robot />
            </span>
            <div className="sv-screen">
              {items.map((it, k) => (
                <Image key={it.key} src={it.screen} alt={k === i ? `${it.title}の画面` : ""} fill sizes="(max-width: 960px) 90vw, 46vw" priority={k < 2} className={k === i ? "on" : ""} />
              ))}
            </div>
            <div className="sv-base" />
          </div>

          <div className="sv-now">
            {cur.external ? (
              <a href={cur.href} target="_blank" rel="noopener noreferrer">{cur.title}<span className="sr">（新しいタブで開きます）</span></a>
            ) : (
              <Link href={cur.href}>{cur.title}</Link>
            )}
              <button type="button" className={`sv-pause${stopped ? " is-stopped" : ""}`} onClick={() => setStopped((v) => !v)} aria-pressed={stopped} aria-label={stopped ? "切り替えを再開する" : "切り替えを一時停止する"} title={stopped ? "再生" : "一時停止"}>
              <svg viewBox="0 0 24 24" aria-hidden="true">{stopped ? <path d="M8 5.5v13l11-6.5z" /> : <><rect x="6.5" y="5.5" width="4" height="13" rx="1" /><rect x="13.5" y="5.5" width="4" height="13" rx="1" /></>}</svg>
            </button>
          </div>
          <div className="sv-thumbs" role="tablist" aria-label="パソコンに映す製品を選ぶ">
            {items.map((it, k) => (
              <button key={it.key} type="button" role="tab" aria-selected={k === i} aria-label={it.name} className={k === i ? "on" : ""} onClick={() => setI(k)}>
                <Image src={it.screen} alt="" fill sizes="80px" />
                {k === i && !paused && !reduced && <span className="sv-timer" style={{ animationDuration: `${INTERVAL}ms` }} />}
              </button>
            ))}
          </div>

          <ul className="sv-badges">
            {badges.map((b) => (
              <li key={b.bottom} className={b.accent ? "accent" : ""}>
                {b.top && <small>{b.top}</small>}
                {b.big && <b>{b.big}</b>}
                <span>{b.bottom.split("\n").map((l) => <span key={l}>{l}</span>)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
