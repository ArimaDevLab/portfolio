import type { Metadata } from "next";
import Link from "next/link";
import RevealObserver from "@/components/RevealObserver";
import ProductShowcase from "@/components/ProductShowcase";
import SectionHead from "@/components/SectionHead";
import { buildCategories, countItems } from "@/lib/categories";
import { getWork } from "@/lib/works";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: `作品集 | ${site.name}`,
  description: "ブラウザ拡張・配信ツール・ゲームなど、仕事の外で作ったものをまとめました。",
};

export default function LabPage() {
  const categories = buildCategories(site.labCategories);
  const total = countItems(categories);
  const pressItem = categories.flatMap((c) => c.items).find((i) => i.press);
  const src = pressItem ? getWork(pressItem.slug) : undefined;
  const press = pressItem && src?.press ? {
    name: src.press.name, work: pressItem.name, href: pressItem.href, usage: pressItem.usage,
    article: "2026年11月9日のダイジェストニュースで、記事の見出しに",
  } : undefined;

  return (
    <main>
      <RevealObserver />
      <section className="lab-hero">
        <div className="section-inner">
          <SectionHead eyebrow="LAB" title="作品集" lead="ブラウザ拡張、配信ツール、子どもと遊べるゲームなど、仕事の外で作ったものです。どれも無料で公開しています。" />
        </div>
      </section>
      <section className="section works lab-body">
        <div className="section-inner">
          <ProductShowcase categories={categories} total={total} press={press} />
          <Link href="/#works" className="text-link lab-back">kintone・ローカルツールのプロダクトを見る</Link>
        </div>
      </section>
    </main>
  );
}
