import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactBand from "@/components/ContactBand";
import RevealObserver from "@/components/RevealObserver";
import { fmtDate, getNews, getNewsItem, KIND_LABEL } from "@/lib/news";
import { getWork } from "@/lib/works";
import { site } from "@/site.config";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getNews().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const n = getNewsItem((await params).slug);
  if (!n) return {};
  const title = `${n.title} | ${site.name}`;
  const w = n.work ? getWork(n.work) : undefined;
  const images = [{ url: w?.cover ?? "/og.jpg" }];
  return {
    title,
    description: n.summary,
    openGraph: { type: "article", siteName: site.name, title, description: n.summary, locale: "ja_JP", images },
    twitter: { card: "summary_large_image", title, description: n.summary, images: images.map((x) => x.url) },
  };
}

export default async function NewsItemPage({ params }: Props) {
  const all = getNews();
  const n = getNewsItem((await params).slug);
  if (!n) notFound();
  const i = all.findIndex((x) => x.slug === n.slug);
  const newer = all[i - 1];
  const older = all[i + 1];
  const w = n.work ? getWork(n.work) : undefined;
  return (
    <main>
      <RevealObserver />
      <article className="work news-article">
        <Link href="/news" className="back">お知らせ一覧へ戻る</Link>
        <p className="news-meta">
          <time dateTime={n.date}>{fmtDate(n.date)}</time>
          <span className={`news-kind k-${n.kind}`}>{KIND_LABEL[n.kind]}</span>
          {n.kind === "note" && <span className="news-min">{n.minutes}分で読めます</span>}
        </p>
        <h1>{n.title}</h1>
        <p className="news-lead">{n.summary}</p>
        <div className="prose" dangerouslySetInnerHTML={{ __html: n.html }} />

        {w && (
          <Link href={w.link ?? `/works/${w.slug}`} className="news-work">
            <span className="news-work-img"><Image src={w.cover} alt="" fill sizes="200px" /></span>
            <span>
              <span className="news-work-label">このお知らせのプロダクト</span>
              <span className="news-work-title">{w.title}</span>
            </span>
          </Link>
        )}

        <nav className="news-pager" aria-label="前後のお知らせ">
          {older ? <Link href={`/news/${older.slug}`} className="prev"><span>前のお知らせ</span>{older.title}</Link> : <span />}
          {newer ? <Link href={`/news/${newer.slug}`} className="next"><span>次のお知らせ</span>{newer.title}</Link> : <span />}
        </nav>
      </article>
      <ContactBand />
    </main>
  );
}
