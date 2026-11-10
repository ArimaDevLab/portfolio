"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export type Sticker = { slug: string; title: string; summary: string; cover: string; link?: string };

// 机の上に散らかしたような位置と傾き（左上からの割合）
const SPOTS = [
  { x: 2, y: 4, r: -6 }, { x: 27, y: 0, r: 4 }, { x: 52, y: 6, r: -3 }, { x: 76, y: 2, r: 6 },
  { x: 8, y: 50, r: 5 }, { x: 34, y: 54, r: -5 }, { x: 60, y: 48, r: 3 }, { x: 82, y: 56, r: -4 },
];

/** 趣味でつくったものを、つかんで動かせるステッカーにして並べる（広い画面のみ。狭い画面はふつうの並び） */
export default function StickerBoard({ items }: { items: Sticker[] }) {
  const drag = useRef<{ el: HTMLElement; sx: number; sy: number; ox: number; oy: number; moved: boolean } | null>(null);
  const z = useRef(10);

  const down = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || window.innerWidth < 900) return;
    const el = e.currentTarget;
    const ox = Number(el.dataset.ox ?? 0), oy = Number(el.dataset.oy ?? 0);
    drag.current = { el, sx: e.clientX, sy: e.clientY, ox, oy, moved: false };
    el.style.zIndex = String(++z.current);
    el.classList.add("grab");
  };
  const move = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.sx, dy = e.clientY - d.sy;
    if (!d.moved && Math.hypot(dx, dy) > 5) { d.moved = true; d.el.setPointerCapture(e.pointerId); }
    if (!d.moved) return;
    d.el.style.setProperty("--dx", `${d.ox + dx}px`);
    d.el.style.setProperty("--dy", `${d.oy + dy}px`);
  };
  const up = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    d.el.classList.remove("grab");
    if (d.moved) {
      d.el.dataset.ox = String(d.ox + e.clientX - d.sx);
      d.el.dataset.oy = String(d.oy + e.clientY - d.sy);
      d.el.dataset.dragged = "1";
    }
    drag.current = null;
  };
  // 動かしたあとのクリックでは、ページを開かない
  const click = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    if (el.dataset.dragged) { e.preventDefault(); delete el.dataset.dragged; }
  };

  return (
    <div className="board" onPointerMove={move} onPointerUp={up} onPointerCancel={up}>
      {items.map((w, i) => {
        const s = SPOTS[i % SPOTS.length];
        const style = { "--x": `${s.x}%`, "--y": `${s.y}%`, "--r": `${s.r}deg` } as React.CSSProperties;
        const inner = (
          <>
            <span className="tape" aria-hidden="true" />
            <span className="polaroid-img"><Image src={w.cover} alt="" fill sizes="(max-width: 900px) 45vw, 240px" draggable={false} /></span>
            <span className="polaroid-title">{w.title}</span>
            <span className="polaroid-sum">{w.summary}</span>
          </>
        );
        const common = { className: "polaroid", style, onPointerDown: down, onClick: click, draggable: false };
        return w.link ? (
          <a key={w.slug} {...common} href={w.link} target="_blank" rel="noopener noreferrer">{inner}</a>
        ) : (
          <Link key={w.slug} {...common} href={`/works/${w.slug}`}>{inner}</Link>
        );
      })}
      <p className="board-hint" aria-hidden="true">つかんで動かせます</p>
    </div>
  );
}
