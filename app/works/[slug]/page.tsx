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
  return { title: `${work.title} | ${site.name}`, description: work.summary };
}

export default async function WorkPage({ params }: Props) {
  const work = getWork((await params).slug);
  if (!work) notFound();
  return (
    <main className="work">
      <Link href="/#works" className="back">
        作品一覧へ戻る
      </Link>
      <h1>{work.title}</h1>
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
        <img className="work-image" src={work.image} alt={`${work.title}の画面`} />
      ) : (
        <div className="work-cover">
          <Image src={work.cover} alt={`${work.title}の画面`} fill sizes="(max-width: 900px) 100vw, 860px" priority />
        </div>
      )}
      <div className="prose" dangerouslySetInnerHTML={{ __html: work.html }} />
      {work.url && (
        <a className="button primary" href={work.url} target="_blank" rel="noopener noreferrer">
          サイトを開く
        </a>
      )}
    </main>
  );
}
