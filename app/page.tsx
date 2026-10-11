import Image from "next/image";
import Link from "next/link";
import SmokeCanvas from "@/components/SmokeCanvas";
import { getWorks } from "@/lib/works";
import { site } from "@/site.config";

export default function Home() {
  const works = getWorks();
  return (
    <main>
      <section className="hero">
        <SmokeCanvas />
        <div className="hero-body">
          <h1>
            {site.headline.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h1>
          <p className="lead">{site.lead}</p>
          <div className="actions">
            <a className="button primary" href="#works">
              作品を見る
            </a>
            <a className="button" href={`mailto:${site.email}`}>
              開発を相談する
            </a>
          </div>
        </div>
      </section>

      <section id="works" className="works">
        <div className="works-head">
          <h2>作品</h2>
          <p>{works.length}件</p>
        </div>
        <ul className="grid">
          {works.map((w, i) => (
            <li key={w.slug}>
              <Link href={`/works/${w.slug}`} className="card">
                <div className="thumb">
                  <Image
                    src={w.cover}
                    alt=""
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 25vw"
                    priority={i < 4}
                  />
                </div>
                <h3>{w.title}</h3>
                <p>{w.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
