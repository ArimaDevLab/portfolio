import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const DIR = path.join(process.cwd(), "content", "news");

/** お知らせの種類。release=リリース、news=お知らせ、note=開発メモ */
export type NewsKind = "release" | "news" | "note";
export const KIND_LABEL: Record<NewsKind, string> = { release: "リリース", news: "お知らせ", note: "開発メモ" };

export type News = {
  slug: string;
  title: string;
  date: string;
  kind: NewsKind;
  summary: string;
  /** 関係するプロダクト（content/works のファイル名） */
  work?: string;
  draft: boolean;
  html: string;
  /** 読むのにかかる目安（分） */
  minutes: number;
};

function read(file: string): News {
  const slug = file.replace(/\.md$/, "");
  const { data, content } = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
  const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? "");
  const kind = (["release", "news", "note"].includes(data.kind) ? data.kind : "news") as NewsKind;
  return {
    slug,
    title: String(data.title ?? slug),
    date,
    kind,
    summary: String(data.summary ?? ""),
    work: data.work ? String(data.work) : undefined,
    draft: Boolean(data.draft),
    html: marked.parse(content, { async: false }) as string,
    minutes: Math.max(1, Math.round(content.replace(/\s/g, "").length / 500)),
  };
}

/** 公開中のお知らせを、新しい順で返す */
export function getNews(): News[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map(read)
    .filter((n) => !n.draft)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : b.slug.localeCompare(a.slug)));
}

export function getNewsItem(slug: string): News | undefined {
  return getNews().find((n) => n.slug === slug);
}

export const fmtDate = (d: string) => d.replaceAll("-", ".");
