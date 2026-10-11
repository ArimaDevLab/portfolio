import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { site } from "@/site.config";
import "./globals.css";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
};
export const viewport: Viewport = { themeColor: "#16181d" };

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
          href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@400;500;700&family=Zen+Old+Mincho:wght@500;700&display=swap"
        />
      </head>
      <body>
        <header className="site-header">
          <Link href="/" className="site-name">
            {site.name}
          </Link>
          <nav aria-label="メインメニュー">
            <Link href="/#about">私について</Link>
            <Link href="/#works">作品</Link>
            <Link href="/#service">できること</Link>
            <Link href="/#contact">相談する</Link>
          </nav>
        </header>
        {children}
        <footer className="site-footer">
          <p>開発のご相談は {" "}<a href={`mailto:${site.email}`}>{site.email}</a> まで。</p>
          <p className="copy">© {new Date().getFullYear()} {site.name}</p>
        </footer>
      </body>
    </html>
  );
}
