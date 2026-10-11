import Image from "next/image";
import Link from "next/link";
import RevealObserver from "@/components/RevealObserver";
import SmokeCanvas from "@/components/SmokeCanvas";
import { getWorks } from "@/lib/works";
import { site } from "@/site.config";

export default function Home() {
  const works = getWorks();
  return (
    <main className="home">
      <RevealObserver />
      <SmokeCanvas />

      <section className="hero">
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
            <a className="button" href="#contact">
              開発を相談する
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="section about">
        <h2 className="section-title" data-reveal>
          私について
        </h2>
        <div className="about-body">
          <h3 data-reveal>{site.about.title}</h3>
          {site.about.body.map((p) => (
            <p key={p} data-reveal>
              {p}
            </p>
          ))}
        </div>
      </section>

      <section id="works" className="section works">
        <h2 className="section-title is-right" data-reveal>
          作品
        </h2>
        <ul className="work-list">
          {works.map((w, i) => (
            <li key={w.slug} data-reveal>
              <Link href={`/works/${w.slug}`} className="card">
                <div className="thumb">
                  <Image
                    src={w.cover}
                    alt=""
                    fill
                    sizes="(max-width: 760px) 100vw, 50vw"
                    priority={i < 2}
                  />
                </div>
                {w.tags.length > 0 && <p className="card-tags">{w.tags.join(" / ")}</p>}
                <h3>{w.title}</h3>
                <p>{w.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section id="service" className="section service">
        <h2 className="section-title" data-reveal>
          できること
        </h2>
        <ol className="service-list">
          {site.services.map((s) => (
            <li key={s.title} data-reveal>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="contact" className="section contact">
        <h2 data-reveal>{site.contact.title}</h2>
        <p data-reveal>{site.contact.body}</p>
        <a className="button primary" href={`mailto:${site.email}`} data-reveal>
          メールで相談する
        </a>
      </section>
    </main>
  );
}
