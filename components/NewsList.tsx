"use client";

import Link from "next/link";
import { useState } from "react";

type Item = { slug: string; title: string; date: string; kind: "release" | "news" | "note"; label: string; summary: string; minutes: number };

const TABS: { key: "all" | Item["kind"]; label: string }[] = [
  { key: "all", label: "すべて" },
  { key: "release", label: "リリース" },
  { key: "news", label: "お知らせ" },
  { key: "note", label: "開発メモ" },
];

/** お知らせの一覧。種類で絞り込める */
export default function NewsList({ items }: { items: Item[] }) {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("all");
  const shown = tab === "all" ? items : items.filter((n) => n.kind === tab);
  return (
    <>
      <div className="news-tabs" role="tablist" aria-label="種類で絞り込む">
        {TABS.map((t) => {
          const count = t.key === "all" ? items.length : items.filter((n) => n.kind === t.key).length;
          return (
            <button key={t.key} type="button" role="tab" aria-selected={tab === t.key} className={tab === t.key ? "on" : ""} onClick={() => setTab(t.key)}>
              {t.label}<span>{count}</span>
            </button>
          );
        })}
      </div>
      <ul className="news-list" key={tab}>
        {shown.map((n, i) => (
          <li key={n.slug} style={{ "--i": i } as React.CSSProperties}>
            <Link href={`/news/${n.slug}`} className="news-row">
              <time dateTime={n.date}>{n.date.replaceAll("-", ".")}</time>
              <span className={`news-kind k-${n.kind}`}>{n.label}</span>
              <span className="news-main">
                <span className="news-title">{n.title}</span>
                <span className="news-sum">{n.summary}</span>
              </span>
              {n.kind === "note" && <span className="news-min">{n.minutes}分で読めます</span>}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
