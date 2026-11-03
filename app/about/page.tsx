import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import RevealObserver from "@/components/RevealObserver";
import { getHobbyWorks } from "@/lib/works";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: `私について | ${site.name}`,
  description: site.profile.lead,
};

export default function AboutPage() {
  const hobby = getHobbyWorks();
  return (
    <main>
      <RevealObserver />

      <section className="page-head">
        <div className="section-inner">
          <h1>私について</h1>
          <p className="lead">{site.profile.lead}</p>
        </div>
      </section>

      <section className="section">
        <div className="section-inner about-inner">
          <h2 className="about-h2" data-reveal>
            仕事の進め方
          </h2>
          <div data-reveal>
            <h3 className="about-h3">{site.about.title}</h3>
            {site.about.body.map((p) => (
              <p key={p} className="about-p">
                {p}
              </p>
            ))}
            <ul className="profile-points">
              {site.profile.points.map((pt) => (
                <li key={pt.title}>
                  <h4>{pt.title}</h4>
                  <p>{pt.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="hobby" className="section hobby">
        <div className="section-inner">
          <div className="section-head" data-reveal>
            <h2>{site.profile.hobby.title}</h2>
            <p>{site.profile.hobby.body}</p>
          </div>
          <ul className="work-list">
            {hobby.map((w) => (
              <li key={w.slug} data-reveal>
                <Link href={`/works/${w.slug}`} className="card">
                  <div className="thumb">
                    <Image src={w.cover} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw" />
                  </div>
                  <div className="card-body">
                    {w.tags.length > 0 && (
                      <ul className="card-tags">
                        {w.tags.map((t) => (
                          <li key={t}>{t}</li>
                        ))}
                      </ul>
                    )}
                    <h3>{w.title}</h3>
                    <p>{w.summary}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="contact">
        <div className="contact-inner" data-reveal>
          <h2>{site.contact.title}</h2>
          <p>{site.contact.body}</p>
          <a className="button light" href={`mailto:${site.email}`}>
            メールで相談する
          </a>
          <p className="contact-mail">{site.email}</p>
        </div>
      </section>
    </main>
  );
}
