import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactBand from "@/components/ContactBand";
import RevealObserver from "@/components/RevealObserver";
import SectionHead from "@/components/SectionHead";
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
        <div className="section-inner profile-head">
          <Image
            className="profile-photo"
            src="/profile.jpg"
            alt={`${site.name} 代表のプロフィール写真`}
            width={240}
            height={240}
            priority
          />
          <div>
            <p className="eyebrow">ABOUT</p>
            <h1>私について</h1>
            <p className="lead">{site.profile.lead}</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-inner style-inner">
          <div data-reveal>
            <p className="eyebrow">STYLE</p>
            <h2 className="about-h2">仕事の進め方</h2>
          </div>
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
          <SectionHead eyebrow="HOBBY" title={site.profile.hobby.title} lead={site.profile.hobby.body} />
          <ul className="work-list">
            {hobby.map((w) => (
              <li key={w.slug} data-reveal>
                {(() => {
                  const body = (<>
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
                    <h3>
                      {w.title}
                      {w.link && <span className="ext" aria-hidden="true" />}
                    </h3>
                    <p>{w.summary}</p>
                  </div>
                </>);
                  return w.link ? (
                    <a href={w.link} className="card" target="_blank" rel="noopener noreferrer" aria-label={`${w.title}（新しいタブで開きます）`}>{body}</a>
                  ) : (
                    <Link href={`/works/${w.slug}`} className="card">{body}</Link>
                  );
                })()}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ContactBand />
    </main>
  );
}
