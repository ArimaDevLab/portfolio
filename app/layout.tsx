import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { site } from "@/site.config";
import { Robot } from "@/components/about/Doodles";
import "./globals.css";

// 公開しているURL（シェア画像などの絶対URLに使う。手元で動かすときは仮のURL）
// ドメインを変えたら、ここも書き換える
const siteUrl = process.env.VERCEL ? "https://arima-dev-lab.vercel.app" : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: site.title,
  description: site.description,
  // SNSやチャットにリンクを貼ったときに出るカード
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "ja_JP",
    images: [{ url: "/og-2.jpg", width: 1200, height: 630, alt: "Arima Dev Lab｜kintoneの手作業を、カスタマイズで仕組みに。" }],
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description, images: ["/og-2.jpg"] },
};
export const viewport: Viewport = { themeColor: "#ffffff" };

const nav = [
  { href: "/#service", label: "できること" },
  { href: "/#process", label: "進め方" },
  { href: "/#works", label: "プロダクト" },
  { href: "/local", label: "ローカルツール" },
  { href: "/pricing", label: "料金" },
  { href: "/about", label: "私について" },
  { href: "/news", label: "お知らせ" },
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
          href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@400;500;700;900&family=IBM+Plex+Mono:wght@400;500&family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&display=swap"
        />
      </head>
      <body>
        <header className="site-header">
          <div className="header-inner">
            <Link href="/" className="brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="" width={34} height={33} />
              <span>{site.name}</span>
            </Link>
            <nav aria-label="メインメニュー">
              {nav.map((n) => (
                <Link key={n.href} href={n.href}>
                  {n.label}
                </Link>
              ))}
            </nav>
            <span className="hd-cta">
              <span className="hd-bot" aria-hidden="true"><Robot /></span>
              <Link href="/contact" className="button primary small">
                相談する
              </Link>
            </span>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="footer-inner">
            <Link href="/" className="brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="" width={30} height={29} />
              <span>{site.name}</span>
            </Link>
            <nav aria-label="フッターメニュー">
              {[...nav, { href: "/lab", label: "作品集" }].map((n) => (
                <Link key={n.href} href={n.href}>
                  {n.label}
                </Link>
              ))}
            </nav>
            <p className="copy">© {new Date().getFullYear()} {site.name}</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
