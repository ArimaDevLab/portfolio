import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { site } from "@/site.config";
import "./globals.css";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
};
export const viewport: Viewport = { themeColor: "#ffffff" };

const nav = [
  { href: "/#service", label: "できること" },
  { href: "/#process", label: "進め方" },
  { href: "/#works", label: "作品" },
  { href: "/#about", label: "私について" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        {/* JSが動くときだけ「スクロールで出てくる」演出を有効にする */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@400;500;700;900&family=IBM+Plex+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>
        <header className="site-header">
          <div className="header-inner">
            <Link href="/" className="brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icon.png" alt="" width={32} height={32} />
              <span>{site.name}</span>
            </Link>
            <nav aria-label="メインメニュー">
              {nav.map((n) => (
                <Link key={n.href} href={n.href}>
                  {n.label}
                </Link>
              ))}
            </nav>
            <Link href="/#contact" className="button primary small">
              相談する
            </Link>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="footer-inner">
            <div className="footer-brand">
              <Link href="/" className="brand">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icon.png" alt="" width={32} height={32} />
                <span>{site.name}</span>
              </Link>
              <p>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>
            </div>
            <nav aria-label="フッターメニュー">
              {nav.map((n) => (
                <Link key={n.href} href={n.href}>
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
          <p className="copy">© {new Date().getFullYear()} {site.name}</p>
        </footer>
      </body>
    </html>
  );
}
