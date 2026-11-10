import type { Metadata } from "next";
import ContactBand from "@/components/ContactBand";
import RevealObserver from "@/components/RevealObserver";
import NewsList from "@/components/NewsList";
import { getNews, KIND_LABEL } from "@/lib/news";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: `お知らせ | ${site.name}`,
  description: "Arima Dev Lab のリリース情報、お知らせ、kintone の開発で分かったことをまとめた開発メモです。",
};

export default function NewsPage() {
  const items = getNews().map((n) => ({ slug: n.slug, title: n.title, date: n.date, kind: n.kind, label: KIND_LABEL[n.kind], summary: n.summary, minutes: n.minutes }));
  return (
    <main>
      <RevealObserver />
      <section className="page-head">
        <div className="section-inner">
          <p className="eyebrow">NEWS</p>
          <h1>お知らせ</h1>
          <p className="lead">新しいプロダクトの公開や、kintone の開発で分かったことのメモをまとめています。</p>
        </div>
      </section>
      <section className="section news-page">
        <div className="section-inner">
          <NewsList items={items} />
        </div>
      </section>
      <ContactBand />
    </main>
  );
}
