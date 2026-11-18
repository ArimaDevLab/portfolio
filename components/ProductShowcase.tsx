"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type ProductCard = {
  slug: string;
  name: string;
  summary: string;
  cover: string;
  href: string;
  external: boolean;
  badges: { text: string; hot?: boolean }[];
  press?: string;
  usage?: string;
};
export type ProductCategory = { key: string; label: string; lead: string; main?: boolean; items: ProductCard[] };
export type PressHighlight = { name: string; work: string; href: string; usage?: string; article: string };

// これより少ないタブは、スライダーにせず並べるだけ
const SLIDE_MIN = 4;

function Card({ item, no, label }: { item: ProductCard; no: number; label: string }) {
  const inner = (
    <>
      <div className="pd-pic">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.cover} alt="" loading="lazy" />
        {item.press && <span className="pd-ribbon">{item.press} 掲載</span>}
        {item.badges.length > 0 && (
          <span className="pd-badges">
            {item.badges.map((b) => <span key={b.text} className={b.hot ? "hot" : ""}>{b.text}</span>)}
          </span>
        )}
      </div>
      <div className="pd-body">
        <div className="pd-no" aria-hidden="true"><small>No.</small><b>{String(no).padStart(2, "0")}</b></div>
        <span className="pd-cat">{label}</span>
        <h3>{item.name}</h3>
        {item.usage && <p className="pd-usage"><span aria-hidden="true">▲</span>{item.usage}</p>}
        <p className="pd-sum">{item.summary}</p>
        <i className="pd-ar" aria-hidden="true">→</i>
      </div>
    </>
  );
  return item.external ? (
    <a className="pd-card" href={item.href} target="_blank" rel="noopener noreferrer">{inner}<span className="sr">（新しいタブで開きます）</span></a>
  ) : (
    <Link className="pd-card" href={item.href}>{inner}</Link>
  );
}

export default function ProductShowcase({ categories, total, press }: { categories: ProductCategory[]; total: number; press?: PressHighlight }) {
  const [tab, setTab] = useState(categories[0]?.key);
  const [all, setAll] = useState(false);
  const [pos, setPos] = useState(0);
  const track = useRef<HTMLDivElement>(null);
  const cat = categories.find((c) => c.key === tab) ?? categories[0];
  const slide = cat.items.length >= SLIDE_MIN && !all;
  // 「1日平均 約50人が利用中」→ 前置き・約・人数
  const usageNum = press?.usage?.match(/^(.*?)\s*(約)?(\d+)人/);

  useEffect(() => { setPos(0); track.current?.scrollTo({ left: 0 }); }, [tab, all]);

  const step = () => {
    const el = track.current?.querySelector<HTMLElement>(".pd-card");
    return el ? el.offsetWidth + 28 : 300;
  };
  const move = (d: number) => track.current?.scrollBy({ left: d * step(), behavior: "smooth" });

  return (
    <div className="pd">
      {press && (
        <a className="pd-press" href={press.href} data-reveal>
          <span className="pd-press-label">掲載実績</span>
          <span className="pd-press-text">
            <b>{press.work}</b>が<b>{press.name}</b>で紹介されました
            <small>{press.article}</small>
          </span>
          {usageNum && (
            <span className="pd-press-stat">
              <small>{usageNum[1] || "利用者"}</small><b>{usageNum[2]}{usageNum[3]}</b><em>人</em><small>が利用中</small>
            </span>
          )}
          <span className="pd-press-go" aria-hidden="true">→</span>
        </a>
      )}

      <div className="pd-tabs" role="tablist" aria-label="系統">
        {categories.map((c) => (
          <button key={c.key} type="button" role="tab" aria-selected={c.key === cat.key} className={c.key === cat.key ? "on" : ""}
            onClick={() => { setTab(c.key); setAll(false); }}>
            {c.label}<span>{c.items.length}</span>
          </button>
        ))}
      </div>

      <div className="pd-head">
        <p className="pd-lead">{cat.main && <b className="pd-main">本業</b>}{cat.lead}</p>
        {slide && (
          <div className="pd-nav">
            <button type="button" aria-label="前へ" onClick={() => move(-1)}>←</button>
            <button type="button" aria-label="次へ" onClick={() => move(1)}>→</button>
          </div>
        )}
      </div>

      <div ref={track} className={slide ? "pd-track" : "pd-grid"} role="tabpanel"
        onScroll={slide ? (e) => setPos(Math.round(e.currentTarget.scrollLeft / step())) : undefined}>
        {cat.items.map((it, i) => <Card key={it.slug} item={it} no={i + 1} label={cat.label} />)}
      </div>

      {cat.items.length >= SLIDE_MIN && (
        <div className="pd-foot">
          {slide ? (
            <div className="pd-dots" aria-hidden="true">
              {cat.items.map((it, i) => <i key={it.slug} className={i === Math.min(pos, cat.items.length - 1) ? "on" : ""} />)}
            </div>
          ) : <span />}
          <button type="button" className="pd-more" onClick={() => setAll((v) => !v)}>
            {all ? "スライドで見る" : `${cat.label}をすべて見る`}<span aria-hidden="true">{all ? "↑" : "→"}</span>
          </button>
        </div>
      )}
    </div>
  );
}
