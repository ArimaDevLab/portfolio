import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { site } from "@/site.config";

export const metadata: Metadata = {
  title: `お問い合わせ | ${site.name}`,
  description: "kintoneのカスタマイズ・プラグイン開発、アプリの診断・見直し、外部サービスとの連携などのご相談はこちらから。",
};

export default function ContactPage() {
  return (
    <main>
      <section className="page-head">
        <div className="section-inner">
          <p className="eyebrow">CONTACT</p>
          <h1>お問い合わせ</h1>
          <p className="lead">{site.contact.body}</p>
        </div>
      </section>
      <section className="section">
        <div className="section-inner contact-layout">
          <ContactForm endpoint={site.contactFormEndpoint} email={site.email} />
          <aside className="contact-aside">
            <h2>ご相談の前に</h2>
            <ul>
              <li>まとまっていない段階のご相談でもかまいません。困っていることをそのまま書いてください。</li>
              <li>通常、2営業日以内にメールでお返事します。</li>
              <li>いただいた内容は、ご相談へのお返事にのみ使います。</li>
            </ul>
            <p>
              メールでのご連絡も受け付けています。
              <br />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </aside>
        </div>
      </section>
    </main>
  );
}
