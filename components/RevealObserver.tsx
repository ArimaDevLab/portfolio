"use client";

import { useEffect } from "react";

/**
 * data-reveal の付いた要素が画面に入ったら is-active を付ける。
 * 見た目(煙の中からぼんやり現れる)は globals.css 側で決めている。
 */
export default function RevealObserver() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-active"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-active");
          io.unobserve(e.target);
        }
      },
      // 画面の下から 18% ほど入ったところで出す
      { rootMargin: "0px 0px -18% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
