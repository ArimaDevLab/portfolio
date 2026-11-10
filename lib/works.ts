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
  /** true にすると、トップの作品一覧ではなく「私について」ページの趣味の制作物に並ぶ */
  hobby: boolean;
  /** 指定すると、作品カードは詳細ページではなくこのURLを新しいタブで開く */
  link?: string;
  /** カードに乗せたときの横のパネルで流すデモ動画（mp4）。省略すると画像を出す */
  demo?: string;
  /** 本文の見出し（## ...）。カードに乗せたときのパネルに「主な特長」として出す */
  highlights: string[];
  /** 使う前と後（トップの BEFORE / AFTER に出す） */
  before?: string;
  after?: string;
  /** 「2,000件|約2分」のように、量と時間を | で区切った実測の数字 */
  metric?: string;
  /** AFTER の下に大きく出す一言（「別ソフト不要」など） */
  win?: string;
  /** 本文で最初に出てくる画像 */
  firstImage?: string;
  html: string;
};

// パネルの「主な特長」には出さない見出し
const SKIP_HEADINGS = /^(できること|使い方|入れ方|いまの状況|今後|気をつけること|注意|リンク)/;

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
    hobby: Boolean(data.hobby),
    link: data.link ? String(data.link) : undefined,
    demo: data.demo ? String(data.demo) : undefined,
    before: data.before ? String(data.before) : undefined,
    after: data.after ? String(data.after) : undefined,
    metric: data.metric ? String(data.metric) : undefined,
    win: data.win ? String(data.win) : undefined,
    highlights: [...content.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim()).filter((h) => !SKIP_HEADINGS.test(h)).slice(0, 3),
    firstImage: content.match(/!\[[^\]]*\]\(([^)\s]+)/)?.[1],
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

/** トップの作品一覧に出す作品 */
export function getMainWorks(): Work[] {
  return getWorks().filter((w) => !w.hobby);
}

/** 「私について」ページに出す趣味の制作物 */
export function getHobbyWorks(): Work[] {
  return getWorks().filter((w) => w.hobby);
}

export function getWork(slug: string): Work | undefined {
  return getWorks().find((w) => w.slug === slug);
}
