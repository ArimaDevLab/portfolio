import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWork, getWorks } from "@/lib/works";
import { site } from "@/site.config";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getWorks().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const work = getWork((await params).slug);
  if (!work) return {};
  const title = `${work.title} | ${site.name}`;
  // リンクを貼ったときのカードには、そのプロダクトの画像を出す
  return {
    title,
    description: work.summary,
    openGraph: { type: "article", siteName: site.name, title, description: work.summary, locale: "ja_JP", images: [{ url: work.cover }] },
    twitter: { card: "summary_large_image", title, description: work.summary, images: [work.cover] },
  };
}

export default async function WorkPage({ params }: Props) {
  const work = getWork((await params).slug);
  if (!work) notFound();
  return (
    <main className="work">
      <Link href="/#works" className="back">
        プロダクト一覧へ戻る
      </Link>
      <h1>{work.title}</h1>
      {work.press && (
        <a className="press-badge" href={work.press.url} target="_blank" rel="noopener noreferrer">
          <b>{work.press.name}</b>で紹介されました<span aria-hidden="true">↗</span>
        </a>
      )}
      {work.usage && <span className="usage-badge">{work.usage}</span>}
      {work.tags.length > 0 && (
        <ul className="tags">
          {work.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      )}
      {work.image ? (
        // 切り抜かずに、画像そのままの比率で見せる
        // eslint-disable-next-line @next/next/no-img-element
        <img className="work-image" src={work.image} alt={work.coverAlt ?? `${work.title}の画面`} />
      ) : (
        <div className="work-cover">
          <Image src={work.cover} alt={work.coverAlt ?? `${work.title}の画面`} fill sizes="(max-width: 900px) 100vw, 860px" priority />
        </div>
      )}
      <div className="prose" dangerouslySetInnerHTML={{ __html: work.html }} />
      {(work.url || work.guide) && (
        <div className="work-actions">
          {work.url && (
            <a className="button primary" href={work.url} target="_blank" rel="noopener noreferrer">
              サイトを開く
            </a>
          )}
          {work.guide && (
            <a className="button ghost" href={work.guide} target="_blank" rel="noopener noreferrer">
              使い方ガイド
            </a>
          )}
        </div>
      )}
    </main>
  );
}
