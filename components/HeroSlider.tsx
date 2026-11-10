"use client";

import Image from "next/image";
import Link from "next/link";
import FlowDiagram from "./FlowDiagram";
import { Robot } from "./about/Doodles";
import { useCallback, useEffect, useRef, useState } from "react";

export type Slide = {
  key: string;
  kind: string;
  name: string;
  title: string;
  catch: string;
  summary: string;
  cover: string;
  href: string;
  external: boolean;
  status?: string;
};

type Props = {
  intro: { headline: string[]; lead: string };
  slides: Slide[];
  stats?: { value: string; label: string }[];
};

const INTERVAL = 6500;

export default function HeroSlider({ intro, slides, stats = [] }: Props) {
  const total = slides.length + 1; // 0 枚目は Arima Dev Lab の紹介
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const touchX = useRef<number | null>(null);
  const thumbs = useRef<HTMLDivElement>(null);

  const go = useCallback((i: number) => setIndex(((i % total) + total) % total), [total]);

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const on = () => setReduced(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);

  // 自動で次へ。マウスを乗せている間・操作中・動きを減らす設定のときは止める
  useEffect(() => {
    if (paused || reduced) return;
    const t = window.setTimeout(() => go(index + 1), INTERVAL);
    return () => window.clearTimeout(t);
  }, [index, paused, reduced, go]);

  // 選ばれたサムネイルが見える位置までサムネイルの列だけを横に動かす（ページは動かさない）
  useEffect(() => {
    const row = thumbs.current;
    const el = row?.children[index] as HTMLElement | undefined;
    if (!row || !el) return;
    const left = el.offsetLeft - (row.clientWidth - el.clientWidth) / 2;
    row.scrollTo({ left, behavior: reduced ? "auto" : "smooth" });
  }, [index, reduced]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { go(index + 1); e.preventDefault(); }
    if (e.key === "ArrowLeft") { go(index - 1); e.preventDefault(); }
  };

  return (
    <section
      className="hs"
      aria-roledescription="carousel"
      aria-label="kintone のプロダクト"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={(e) => { if ((e.target as HTMLElement).matches(":focus-visible")) setPaused(true); }}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={onKey}
    >
      <div
        className="hs-stage"
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; setPaused(true); }}
        onTouchEnd={(e) => {
          const s = touchX.current; touchX.current = null; setPaused(false);
          if (s === null) return;
          const d = e.changedTouches[0].clientX - s;
          if (Math.abs(d) > 50) go(index + (d < 0 ? 1 : -1));
        }}
      >
        {/* ほのかに揺れる光のぼかし */}
        <div className="hs-aurora" aria-hidden="true"><span /><span /><span /></div>
        <div className="hs-track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {/* 0 枚目: 紹介 */}
          <div className="hs-slide hs-intro" role="group" aria-roledescription="slide" aria-label={`1 / ${total}`} aria-hidden={index !== 0} inert={index !== 0 ? true : undefined}>
            <div className="hs-inner">
              <div className="hs-text">
                <p className="hs-kind">kintone のカスタマイズ・プラグイン開発</p>
                <h1>
                  {intro.headline.map((l) => (
                    <span key={l}>{l}</span>
                  ))}
                </h1>
                <p className="hs-lead">{intro.lead}</p>
                <div className="actions">
                  <Link className="button primary" href="/contact">相談する</Link>
                  <button type="button" className="button outline" onClick={() => go(1)}>プロダクトを見る</button>
                </div>
              </div>
              <div className="hs-flow">
                <FlowDiagram />
              </div>
            </div>
          </div>

          {slides.map((s, i) => (
            <div key={s.key} className="hs-slide" role="group" aria-roledescription="slide" aria-label={`${i + 2} / ${total}：${s.title}`} aria-hidden={index !== i + 1} inert={index !== i + 1 ? true : undefined}>
              <div className="hs-inner">
                <div className="hs-text">
                  <p className="hs-kind">
                    kintone {s.kind}
                    {s.status && <span className="hs-status">{s.status}</span>}
                  </p>
                  <p className="hs-catch">{s.catch.split("\n").map((l) => <span key={l}>{l}</span>)}</p>
                  <h2 className="hs-title">{s.title}</h2>
                  <p className="hs-lead">{s.summary}</p>
                  <div className="actions">
                    {s.external ? (
                      <a className="button primary arrow" href={s.href} target="_blank" rel="noopener noreferrer">詳しく見る<span className="sr">（新しいタブで開きます）</span></a>
                    ) : (
                      <Link className="button primary arrow" href={s.href}>詳しく見る</Link>
                    )}
                    <Link className="button outline" href="/contact">相談する</Link>
                  </div>
                </div>
                <div className="hs-visual">
                  <div className="hs-shot">
                    <Image src={s.cover} alt="" fill sizes="(max-width: 900px) 92vw, 46vw" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button type="button" className="hs-arrow prev" aria-label="前のスライド" onClick={() => go(index - 1)} />
        <button type="button" className="hs-arrow next" aria-label="次のスライド" onClick={() => go(index + 1)} />
        <div className="hs-progress" aria-hidden="true">
          <span key={`${index}-${paused}-${reduced}`} className={paused || reduced ? "" : "run"} style={{ animationDuration: `${INTERVAL}ms` }}>
            <span className="hs-bot"><Robot /></span>
          </span>
        </div>
      </div>

      {stats.length > 0 && (
        <ul className="hs-stats">
          {stats.map((st) => (
            <li key={st.label}>
              <b>{st.value}</b>
              <span>{st.label}</span>
            </li>
          ))}
        </ul>
      )}

      <nav className="hs-nav" aria-label="スライドを選ぶ">
        <button type="button" className="hs-step" aria-label="前のスライド" onClick={() => go(index - 1)}>‹</button>
        <div className="hs-thumbs" ref={thumbs}>
          <button type="button" className={`hs-thumb hs-brand${index === 0 ? " on" : ""}`} aria-current={index === 0} onClick={() => go(0)}>
            <span className="hs-thumb-img brand-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icon.png" alt="" width={44} height={44} />
            </span>
            <span className="hs-thumb-cap">Arima Dev Lab</span>
          </button>
          {slides.map((s, i) => (
            <button key={s.key} type="button" className={`hs-thumb${index === i + 1 ? " on" : ""}`} aria-current={index === i + 1} onClick={() => go(i + 1)}>
              <span className="hs-thumb-img">
                <Image src={s.cover} alt="" fill sizes="200px" />
              </span>
              <span className="hs-thumb-cap">{s.name}</span>
            </button>
          ))}
        </div>
        <button type="button" className="hs-step" aria-label="次のスライド" onClick={() => go(index + 1)}>›</button>
      </nav>
    </section>
  );
}
