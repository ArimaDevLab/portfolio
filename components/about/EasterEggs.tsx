"use client";

import { useEffect, useState } from "react";
import { PatrolCar } from "./Doodles";

const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

/** 隠し要素：↑↑↓↓←→←→BA か、ロボットを5回押すと、パトカーが画面の下を走り抜ける */
export default function EasterEggs() {
  const [run, setRun] = useState(0);
  useEffect(() => {
    let pos = 0;
    const key = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      pos = k === KONAMI[pos] ? pos + 1 : k === KONAMI[0] ? 1 : 0;
      if (pos === KONAMI.length) { pos = 0; setRun((n) => n + 1); }
    };
    const go = () => setRun((n) => n + 1);
    window.addEventListener("keydown", key);
    window.addEventListener("about:patrol", go);
    return () => { window.removeEventListener("keydown", key); window.removeEventListener("about:patrol", go); };
  }, []);
  if (!run) return null;
  return (
    <div key={run} className="patrol-run" aria-hidden="true">
      <span className="patrol-say">ウーー！ ウーー！</span>
      <PatrolCar />
    </div>
  );
}
