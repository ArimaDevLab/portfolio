"use client";

import { useEffect, useRef } from "react";

/**
 * ページ全体の背景に固定した煙。Canvas 2D のみ(ライブラリなし)。
 * ヒーローでははっきり見え、下へ進むと薄く残る。
 * スクロールすると勢いよく立ちのぼり、止まると静まる。
 * 色はスクロール位置で変わる(下の SMOKE_COLORS で指定)。
 *
 * 軽さの工夫
 * - 表示サイズの半分以下(最大11万画素)で描いてCSSで拡大(煙はもともとぼけているので差が出ない)
 * - 煙の「ひとかたまり」は最初に1回だけ描いた画像を使い回す
 * - 粒子は最大 84 個(スマホ幅は 46 個)。重い端末では自動でさらに減らす
 * - タブ非表示の間は描画を止める
 * - 「視差効果を減らす」設定の端末では静止画1枚だけ描く
 */

const MAX_SCALE = 0.5;
const MAX_PIXELS = 110_000;
const SPRITE = 128;

/**
 * 煙の色。画面の中央がそのセクションに来たとき、この色になる。
 * セクションの間はなめらかに混ざる。id はページ内の section の id。
 */
const SMOKE_COLORS: { id: string; color: [number, number, number] }[] = [
  { id: "top", color: [216, 212, 204] }, // ヒーロー: 白灰
  { id: "about", color: [232, 196, 92] }, // 私について: 黄
  { id: "works", color: [168, 134, 232] }, // 作品: 紫
  { id: "service", color: [88, 160, 236] }, // できること: 青
  { id: "contact", color: [128, 214, 180] }, // 相談: 青磁
];

type P = {
  x: number;
  y: number;
  age: number;
  life: number;
  rot: number;
  spin: number;
  off: number; // 流れの中心からのずれ(-1〜1)
  rise: number;
};

function makeSprite() {
  const c = document.createElement("canvas");
  c.width = c.height = SPRITE;
  const g = c.getContext("2d")!;
  // 少しずらした円を重ねて、まん丸でないかたまりにする
  const lumps = [
    [0, 0, 46, 0.5],
    [-14, -8, 34, 0.35],
    [16, -4, 30, 0.3],
    [6, 14, 32, 0.3],
    [-10, 16, 26, 0.25],
  ];
  for (const [dx, dy, r, a] of lumps) {
    const cx = SPRITE / 2 + dx;
    const cy = SPRITE / 2 + dy;
    const grad = g.createRadialGradient(cx, cy, 0, cx, cy, r);
    grad.addColorStop(0, `rgba(216,212,204,${a})`);
    grad.addColorStop(0.5, `rgba(205,203,198,${a * 0.4})`);
    grad.addColorStop(1, "rgba(200,200,198,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, SPRITE, SPRITE);
  }
  return c;
}

export default function SmokeCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sprite = makeSprite();
    let w = 0;
    let h = 0;
    let cssW = 0;
    let cssH = 0;
    let target = 0; // 粒子数の上限
    let parts: P[] = [];
    let carry = 0;
    let time = 0;
    let raf = 0;
    let last = 0;
    let inView = true;
    let opacity = 1;
    let shown = -1; // 実際に canvas へ設定済みの不透明度
    let boost = 0; // スクロールの勢い(0〜1)。煙の量・速さ・濃さに効く
    let lastY = 0;
    let tint: number[] = SMOKE_COLORS[0].color; // 煙の根元の色
    let tintTop: number[] = SMOKE_COLORS[0].color; // 煙の先の色(少し先のセクションの色)
    let slow = 0; // 遅いフレームの連続数
    let ema = 16;

    const spawn = (): P => ({
      x: 0,
      y: h * 1.02,
      age: 0,
      life: 11 + Math.random() * 5,
      rot: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.3,
      off: Math.random() * 2 - 1,
      rise: 0.085 + Math.random() * 0.02,
    });

    const step = (dt: number) => {
      time += dt;
      carry += (target / 13.5) * (1 + 2.5 * boost) * dt;
      while (carry >= 1) {
        carry -= 1;
        if (parts.length < target * (1 + 0.5 * boost)) parts.push(spawn());
      }
      const src = w * (cssW < 640 ? 0.78 : 0.72); // 右寄りの一点から立ちのぼる
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.age += dt;
        if (p.age >= p.life) {
          parts[i] = parts[parts.length - 1];
          parts.pop();
          continue;
        }
        const t = p.age / p.life;
        p.y -= h * p.rise * (1 - t * 0.35) * (1 + 1.4 * boost) * dt;
        // 全粒子が同じ波に乗るので、点の集まりではなく一本の帯としてうねる
        const wave =
          Math.sin(p.y * (7 / h) + time * 0.34) * 0.6 +
          Math.sin(p.y * (3.1 / h) + time * 0.19 + 1.7) * 0.4;
        p.x =
          src +
          wave * w * 0.07 * (0.08 + t) + // のぼるほど大きく揺れる
          p.off * w * 0.16 * Math.pow(t, 1.5) - // のぼるほどほどける
          w * 0.14 * Math.pow(t, 1.3); // わずかに左へ流れる
        p.rot += p.spin * dt;
      }
    };

    const draw = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const base = Math.sqrt(w * h);
      for (const p of parts) {
        const t = p.age / p.life;
        const fadeIn = Math.min(1, t / 0.1);
        const a = 0.11 * fadeIn * Math.pow(1 - t, 1.3);
        if (a < 0.003) continue;
        // 根元は細く、上で大きくほどける
        const s = (base * (0.1 + 0.62 * Math.pow(t, 1.6))) / SPRITE;
        const cos = Math.cos(p.rot) * s;
        const sin = Math.sin(p.rot) * s;
        // 若い粒子は縦に引きのばし、粒の列ではなく途切れない筋に見せる
        const e = 1 + 2.4 * (1 - t) * (1 - t);
        ctx.setTransform(cos, sin * e, -sin, cos * e, p.x, p.y);
        ctx.globalAlpha = a;
        ctx.drawImage(sprite, -SPRITE / 2, -SPRITE / 2);
      }
      ctx.globalAlpha = 1;

      // 描いた煙の上にだけ色をのせる(塗りつぶし1回なので負荷はほぼ増えない)
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalCompositeOperation = "source-atop";
      const g = ctx.createLinearGradient(0, h, 0, 0);
      g.addColorStop(0.1, `rgb(${tint[0]},${tint[1]},${tint[2]})`);
      g.addColorStop(0.9, `rgb(${tintTop[0]},${tintTop[1]},${tintTop[2]})`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";
    };

    // ページ上の位置 y(px)での色を、セクションごとの色から混ぜて求める
    const colorAt = (y: number): number[] => {
      let prev: { at: number; color: number[] } | null = null;
      for (const c of SMOKE_COLORS) {
        const el = document.getElementById(c.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        // ヒーローの色は画面の6割まで保ち、ほかはセクションの少し内側で色が決まりきる
        const at = c.id === "top" ? cssH * 0.6 : r.top + window.scrollY + Math.min(r.height * 0.3, cssH * 0.4);
        if (y <= at) {
          if (!prev) return c.color;
          const k = (y - prev.at) / Math.max(1, at - prev.at);
          const e = k * k * (3 - 2 * k);
          return c.color.map((v, i) => Math.round(prev!.color[i] + (v - prev!.color[i]) * e));
        }
        prev = { at, color: c.color };
      }
      return prev ? prev.color : SMOKE_COLORS[0].color;
    };

    const frame = (now: number) => {
      raf = 0;
      const ms = last ? now - last : 16;
      last = now;
      const dt = Math.min(ms, 50) / 1000;
      step(dt);
      draw();
      boost *= Math.exp(-dt * 1.3); // スクロールが止まると 2 秒ほどで静まる
      if (boost < 0.002) boost = 0;
      applyFade();

      // 重い端末では粒子を減らして 60fps を守る
      ema += (ms - ema) * 0.1;
      slow = ema > 21 ? slow + 1 : 0;
      if (slow > 45 && target > 30) {
        target = Math.max(30, Math.floor(target * 0.8));
        slow = 0;
      }
      play();
    };

    const play = () => {
      if (raf || reduce.matches || !inView || document.hidden) return;
      raf = requestAnimationFrame(frame);
    };
    const pause = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
      ema = 16;
      slow = 0;
    };

    const reset = () => {
      cssW = host.clientWidth;
      cssH = host.clientHeight;
      const scale = Math.min(MAX_SCALE, Math.sqrt(MAX_PIXELS / Math.max(1, cssW * cssH)));
      w = canvas.width = Math.max(1, Math.round(cssW * scale));
      h = canvas.height = Math.max(1, Math.round(cssH * scale));
      target = cssW < 640 ? 46 : 84;
      parts = [];
      carry = 0;
      // 開いた瞬間から煙が立っているように、先に時間を進めておく
      for (let i = 0; i < 480; i++) step(1 / 30);
      draw();
      pause();
      play();
    };

    // ヒーローを過ぎたら薄く残し、スクロールの勢いがあるあいだだけ濃くする
    const applyFade = () => {
      const mid = window.scrollY + cssH * 0.5;
      tint = colorAt(mid);
      tintTop = colorAt(mid + cssH * 0.35);
      const base = Math.max(0.3, 1 - (window.scrollY / (cssH * 0.7)) * 0.7);
      opacity = Math.min(1, base + boost * 0.3);
      if (Math.abs(opacity - shown) < 0.004) return;
      shown = opacity;
      canvas.style.opacity = opacity.toFixed(3);
    };
    const onScroll = () => {
      const y = window.scrollY;
      boost = Math.min(1, boost + (Math.abs(y - lastY) / Math.max(1, cssH)) * 1.2);
      lastY = y;
      if (reduce.matches) {
        applyFade();
        draw();
      }
      else play();
    };

    const ro = new ResizeObserver(() => {
      // スマホのアドレスバー開閉程度の高さ変化では作り直さない
      if (host.clientWidth !== cssW || Math.abs(host.clientHeight - cssH) > 120) {
        reset();
        applyFade();
      }
    });
    const io = new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      if (inView) play();
      else pause();
    });
    const onVisibility = () => (document.hidden ? pause() : play());
    const onMotion = () => reset();

    lastY = window.scrollY;
    reset();
    applyFade();
    ro.observe(host);
    io.observe(canvas);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    reduce.addEventListener("change", onMotion);

    return () => {
      pause();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      reduce.removeEventListener("change", onMotion);
    };
  }, []);

  return <canvas ref={ref} className="smoke" aria-hidden="true" />;
}
