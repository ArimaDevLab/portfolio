"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Baseball, Cake, Dango, Dumbbell } from "./Doodles";

const WORDS = ["企画する", "仕様を書く", "AIに任せる", "確かめる", "公開する", "ケーキを食べる"];

export default function AboutHero({ lead, name }: { lead: string; name: string }) {
  const [text, setText] = useState(WORDS[0]);
  const card = useRef<HTMLDivElement>(null);

  // 「私は ___ 人です」の空欄を、1文字ずつ消して打ち直す
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let w = 0, i = WORDS[0].length, phase: "hold" | "del" | "type" = "hold", t = 0;
    const tick = () => {
      if (phase === "hold") { phase = "del"; t = window.setTimeout(tick, 45); return; }
      if (phase === "del") {
        i--;
        setText(WORDS[w].slice(0, i));
        if (i <= 0) { w = (w + 1) % WORDS.length; phase = "type"; t = window.setTimeout(tick, 260); return; }
        t = window.setTimeout(tick, 45);
        return;
      }
      i++;
      setText(WORDS[w].slice(0, i));
      if (i >= WORDS[w].length) { phase = "hold"; t = window.setTimeout(tick, 1800); return; }
      t = window.setTimeout(tick, 95);
    };
    t = window.setTimeout(tick, 2000);
    return () => window.clearTimeout(t);
  }, []);

  // 写真をマウスの位置に合わせて少し傾ける
  const onMove = (e: React.PointerEvent) => {
    const el = card.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-y * 14).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * 16).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${((x + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${((y + 0.5) * 100).toFixed(1)}%`);
  };
  const onLeave = () => {
    const el = card.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <section className="ab-hero">
      <div className="ab-hero-inner">
        <div className="ab-hero-text">
          <p className="eyebrow">ABOUT</p>
          <h1>
            <span className="ab-h-line">私は</span>
            <span className="ab-h-line">
              <span className="ab-type" aria-hidden="true">{text}</span>
              <span className="ab-caret" aria-hidden="true" />
              <span className="sr">企画する・仕様を書く・AIに任せる・確かめる・公開する</span>
            </span>
            <span className="ab-h-line">人です。</span>
          </h1>
          <p className="ab-name">{name}</p>
          <p className="ab-lead">{lead}</p>
          <p className="ab-scroll" aria-hidden="true"><span />SCROLL</p>
        </div>
        <div className="ab-hero-visual" onPointerMove={onMove} onPointerLeave={onLeave}>
          <div className="ab-photo" ref={card}>
            <Image src="/profile.jpg" alt={`${name} 代表のプロフィール写真`} width={420} height={420} priority />
            <span className="ab-photo-shine" aria-hidden="true" />
          </div>
          <span className="ab-sticker s1"><Cake /></span>
          <span className="ab-sticker s2"><Dango /></span>
          <span className="ab-sticker s3"><Dumbbell /></span>
          <span className="ab-sticker s4"><Baseball /></span>
          <span className="ab-bubble" aria-hidden="true">kintone<br />つくってます</span>
        </div>
      </div>
    </section>
  );
}
