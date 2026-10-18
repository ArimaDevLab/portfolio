import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

const DIR = path.join(process.cwd(), "content", "works");

export type Work = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  cover: string;
  /** 詳細ページの一番上に出す画像。省略すると cover を使う */
  image?: string;
  url?: string;
  tags: string[];
  /** 一覧での並び順(小さいほど先)。省略した作品は番号付きの後ろに日付の新しい順で並ぶ */
  order?: number;
  draft: boolean;
  html: string;
};

function read(file: string): Work {
  const slug = file.replace(/\.md$/, "");
  const { data, content } = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
  const date =
    data.date instanceof Date ? data.date.toISOString().slice(0, 10) : String(data.date ?? "");
  return {
    slug,
    title: String(data.title ?? slug),
    date,
    summary: String(data.summary ?? ""),
    cover: String(data.cover ?? `/works/${slug}.png`),
    image: data.image ? String(data.image) : undefined,
    url: data.url ? String(data.url) : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    draft: Boolean(data.draft),
    order: typeof data.order === "number" ? data.order : undefined,
    html: marked.parse(content, { async: false }) as string,
  };
}

/** 公開中の作品を、並び順(order)→ 日付の新しい順で返す */
export function getWorks(): Work[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map(read)
    .filter((w) => !w.draft)
    .sort((a, b) => {
      const ao = a.order ?? Infinity;
      const bo = b.order ?? Infinity;
      if (ao !== bo) return ao - bo;
      return a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug);
    });
}

export function getWork(slug: string): Work | undefined {
  return getWorks().find((w) => w.slug === slug);
}
