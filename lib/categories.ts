import type { ProductCategory } from "@/components/ProductShowcase";
import { getWork } from "@/lib/works";

type CategoryConfig = {
  key: string;
  label: string;
  lead: string;
  main?: boolean;
  more?: { href: string; label: string };
  items: readonly { slug: string; name: string; isNew?: boolean }[];
};

// カードの右上に出す状態のタグ
const STATUS = ["販売準備中", "試作", "無料サンプル", "製作中"];

/** site.config のタブ定義を、作品の中身と合わせてカードの形にする */
export function buildCategories(list: readonly CategoryConfig[]): ProductCategory[] {
  return list.map((c) => ({
    key: c.key, label: c.label, lead: c.lead, main: c.main, more: c.more,
    items: c.items.flatMap((it) => {
      const w = getWork(it.slug);
      if (!w) return [];
      const status = w.tags.find((t) => STATUS.includes(t));
      const badges = [
        ...(it.isNew ? [{ text: "NEW", hot: true }] : []),
        ...(status ? [{ text: status === "無料サンプル" ? "無料" : status }] : w.tags.includes("無料") ? [{ text: "無料" }] : []),
      ];
      return [{
        slug: w.slug, name: it.name, summary: w.summary, cover: w.cover ?? "/og-2.jpg",
        href: w.link ?? `/works/${w.slug}`, external: Boolean(w.link), badges, press: w.press?.name, usage: w.usage,
      }];
    }),
  }));
}

export const countItems = (cats: ProductCategory[]) => cats.reduce((n, c) => n + c.items.length, 0);
