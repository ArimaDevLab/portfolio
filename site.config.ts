// サイト全体の文言はここで変更できます。
export const site = {
  name: "Arima Dev Lab",
  title: "Arima Dev Lab | kintoneのカスタマイズ・プラグイン開発",
  description:
    "kintoneのカスタマイズJS・プラグイン開発と、Zapier・Makeなどとの連携を、企画・仕様設計から導入まで一人で担当します。実装にはAI（Claude Code）を活用し、短期間で形にします。",

  hero: {
    headline: ["kintoneの手作業を、", "仕組みに変える。"],
    // 見出しの中で、オレンジのマーカーを引く言葉
    accent: "仕組み",
    // 見出しの下に並べる「できること」の札
    chips: ["プラグイン開発", "カスタマイズJS", "アプリ診断", "外部連携", "業務の整理", "導入・改善"],
    // 見出しの上に出す小さなお知らせ（不要になったら notice ごと消す）
    notice: { label: "掲載", text: "Trend Watcher が窓の杜で紹介されました", href: "/news/2026-11-16-madonomori" },
    lead: "kintoneのカスタマイズJS・プラグイン開発と、Zapier・Makeなどとの連携を、企画・仕様設計から導入まで一人で担当します。実装にはAI（Claude Code）を活用し、短期間で形にします。",
    // 最初の画面で、ノートパソコンの横に並べる4つ（products はプロダクトの数を自動で入れる）
    badges: [
      { top: "公開・試作した", big: "products", bottom: "プロダクト" },
      { top: "実装は", big: "", bottom: "AI\nClaude Code", accent: true },
      { top: "窓口は", big: "1", bottom: "人で一貫" },
      { top: "", big: "", bottom: "内容を\n外に出さない\n設計" },
    ],
  },
  email: "arima.dev.lab@outlook.jp",

  // トップのスライダーに出す kintone のプロダクト（並べた順に表示）。slug は content/works のファイル名
  // kind: 種類、name: サムネイルの短い名前、catch: 製品の一文（\n の位置で改行）
  // say: 最初の画面のロボットのセリフ、screen: ノートパソコンに映す画像（省略するとカード画像）
  heroSlides: [
    { slug: "kintone-check", kind: "診断ツール", name: "ガバナンス診断", catch: "放置アプリも、権限の穴も、\n健康診断レポートに。", say: "いまアプリを診断してます", screen: "/works/kintone-check-summary.png" },
    { slug: "address-cleaner", kind: "プラグイン", name: "住所クリーナー", catch: "住所の表記ゆれ・建物名・\n郵便番号を、一括できれいに。", say: "いま住所を整えてます", screen: "/works/address-cleaner-screen.png" },
    { slug: "similar-records", kind: "プラグイン", name: "類似レコード", catch: "開いたレコードに、\n似ている過去の事例を\n自動で並べる。", say: "似ている事例を探してます" },
    { slug: "kintone-business-days", kind: "無料サンプルJS", name: "営業日計算JS", catch: "「3営業日後」を、\n土日祝も銀行休業日も\n飛ばして自動で入力。", say: "3営業日後を数えてます" },
    { slug: "pdf-compare-viewer", kind: "プラグイン", name: "PDF比較ビューア", catch: "添付したPDFを、\nダウンロードせずに\n並べて比べる。", say: "PDFを並べてます" },
    { slug: "record-expiry", kind: "プラグイン", name: "レコード賞味期限", catch: "放置レコードに、\n一度だけ「まだ必要？」と\n聞いて整理する。", say: "「まだ必要？」と聞いてます" },
    { slug: "kintone-cross-search", kind: "カスタマイズJS", name: "横断検索", catch: "画面の文字を囲むだけで、\n複数のアプリを\nまとめて検索。", say: "アプリをまとめて検索中" },
    { slug: "kintone-redact", kind: "プラグイン", name: "黒塗り添付", catch: "添付する前に、\n個人情報を自動で黒塗り。", say: "個人情報を黒塗り中" },
  ],

  // 問い合わせフォームの送信先。Formspree でフォームを作り、表示された URL（https://formspree.io/f/xxxx）を入れる。
  // 空のあいだは、送信ボタンを押すとメールアプリが入力内容入りで開く。
  // トップの「つくったもの」：系統ごとのタブ。並び順もここで決める（name は一覧での短い名前）
  productCategories: [
    { key: "kintone", label: "kintone", lead: "kintoneのプラグイン・カスタマイズ", main: true, items: [
      { slug: "kintone-check", name: "棚卸し・ガバナンス診断" },
      { slug: "address-cleaner", name: "住所クリーナー for kintone" },
      { slug: "similar-records", name: "類似レコード表示" },
      { slug: "pdf-compare-viewer", name: "PDF並べて比較ビューア" },
      { slug: "record-expiry", name: "レコード賞味期限" },
      { slug: "kintone-cross-search", name: "kintone横断検索" },
      { slug: "kintone-redact", name: "黒塗り添付プラグイン" },
      { slug: "kintone-business-days", name: "営業日計算サンプルJS" },
    ] },
    { key: "work", label: "業務効率化", lead: "書類やデータの手作業を減らす", items: [
      { slug: "passbook-ocr", name: "通帳OCR転記ツール" },
      { slug: "pdf-seamless", name: "PDFシームレス" },
      { slug: "jp-address-api", name: "住所正規化・英語表記API" },
      { slug: "ai-subtitle", name: "AI字幕自動生成" },
      { slug: "shido-note", name: "指導ノート" },
    ] },
    { key: "web", label: "くらし・便利", lead: "毎日のブラウザ作業を、ちょっと楽に", items: [
      { slug: "trend-watcher", name: "Trend Watcher" },
      { slug: "tabless-search", name: "タブ無し検索" },
      { slug: "pasha-copy", name: "パシャコピー" },
    ] },
    { key: "live", label: "エンタメ", lead: "配信を、もっとにぎやかに", items: [
      { slug: "boxlate", name: "枠内だけ翻訳（Boxlate）", isNew: true },
      { slug: "futarchy-snake", name: "Futarchy Snake" },
      { slug: "textileaf", name: "Textileaf" },
      { slug: "twitch-avatar", name: "Twitchアバター" },
    ] },
    { key: "play", label: "ゲーム・知育", lead: "子どもと、だれかと、ひとりでも", items: [
      { slug: "penguin-town", name: "ペンギンタウン", isNew: true },
      { slug: "ugoku-oekaki", name: "うごく！おえかき", isNew: true },
      { slug: "pato-car", name: "パトカーで つかまえろ！" },
      { slug: "onstayly", name: "いるだけの町" },
      { slug: "crowd-tag", name: "Crowd Tag" },
    ] },
  ],
  contactFormEndpoint: "https://formspree.io/f/mkjjeybd",

  // できること：左の見出しと、中心から6方向に広がる図
  service: {
    headline: ["「標準機能では", "できません」で、"],
    accent: "終わらせない。",
    lead: "kintoneの標準機能で届かないところを、カスタマイズ・プラグイン・外部連携で埋めます。新しく作るだけでなく、今あるアプリの見直しや、「これ、kintoneでできる？」というご相談からお受けします。",
    bubbles: ["この計算、自動にできる？", "アプリが増えすぎて…", "チャットにも通知したい"],
    items: [
      { icon: "code", title: "カスタマイズJS", body: ["自動計算・入力チェック", "画面の使いやすさの調整"] },
      { icon: "plug", title: "プラグイン開発", body: ["設定画面つきで", "担当者が自分で変えられる"] },
      { icon: "link", title: "外部サービス連携", body: ["Zapier・Make・API", "フォームやチャットと"] },
      { icon: "doc", title: "帳票・PDF", body: ["帳票の表示・PDFの比較", "個人情報の黒塗り"] },
      { icon: "check", title: "アプリの見直し", body: ["放置アプリ・権限・重複を", "数字で洗い出す"] },
      { icon: "talk", title: "まずは相談", body: ["「これってできる？」を", "オンラインでその場で"], href: "/contact" },
    ],
  },

  process: [
    { title: "ヒアリング", body: "いまの業務と、困っていることを伺います。何をつくるか決まっていなくても大丈夫です。" },
    { title: "仕様の整理", body: "画面・ルール・例外まで含めて仕様書にまとめ、判断が分かれるところを一緒に決めます。" },
    { title: "試作と実装", body: "仕様とテストを先に用意し、AIを活用して短期間で形にします。途中で触って確かめられます。" },
    { title: "確認と公開", body: "仕様どおりに動くかを確かめ、公開や社内への導入までを担当します。" },
    { title: "運用と改善", body: "使われ方を見ながら、直したいところや足りないところを少しずつ改善します。" },
  ],

  about: {
    title: "何をつくるかを決めて、最後まで届ける。",
    body: [
      "kintoneを中心に、企画・仕様設計・品質確認・公開を担当するプロダクトマネージャーです。「こういうものがほしい」という段階からご一緒し、誰の何を解決するのかを整理して、仕様に落とし込みます。",
      "実装にはAI（Claude Code）を活用しています。先に仕様とテストを用意してから任せるので、速さと品質を両立できます。これまでのツールやサービスは、すべて企画から公開まで自分で担当してきました。",
    ],
  },

  // トップのヒーローの下に並べる数字（products は公開・試作したプロダクトの数を自動で入れる）
  stats: [
    { value: "products", label: "公開・試作したプロダクト" },
    { value: "1", label: "企画から公開まで、窓口はひとつ" },
    { value: "AI", label: "Claude Code で短期間に形に" },
  ],

  // トップの「私について」の右に並べる3つ
  aboutPoints: [
    { title: "先に仕様とテストをつくる", body: "実装の前に「何ができれば完成か」を決めるので、手戻りが少なくなります。" },
    { title: "AI（Claude Code）で速く形に", body: "仕様とテストを渡してから任せるので、速さと品質を両立できます。" },
    { title: "企画から公開まで一人で", body: "これまでのツールやサービスは、すべて企画から公開まで自分で担当してきました。" },
  ],

  // 「私について」ページ（/about）
  profile: {
    lead: "Arima Dev Lab として、kintoneのカスタマイズやプラグインを中心に、業務の手作業を仕組みに置き換える道具を、企画から公開まで一人でつくっています。",
    points: [
      { title: "決めるのは人、書くのはAI", body: "何をつくるか、どう動くべきか、何を正解とするかは自分で決め、仕様書とテストにしてから実装をAIに任せます。" },
      { title: "確かめてから出す", body: "評価用のデータや、調整に使っていないデータで動きを確かめ、分からないことは分からないと書いてから公開します。" },
      { title: "小さく出して直す", body: "まず触れる形で公開し、使われ方を見ながら少しずつ直していく進め方を得意としています。" },
    ],
    hobby: {
      title: "趣味でつくったもの",
      body: "仕事の道具とは別に、配信やゲームまわりのものも趣味でつくっています。思いついたことをすぐ形にして試すのが好きで、ここで得た気づきを仕事のプロダクトづくりにも生かしています。",
    },
  },

  // 私について：AI（Claude）に聞いた印象。いっしょに作業してきた中で見えたこと
  aiView: {
    question: "いっしょに作ってきて、私ってどんな人に見える？",
    // いっしょに開発した4つのチャットの答えから、共通して出てきたことをまとめた
    summary: "作ることが本当に好きで、使う人の小さな不安を先回りして消す人。判断は速いけれど丸投げはせず、作ったものを届けるところまで考え抜く。",
    from: "kintone診断ツール・住所クリーナー・配信ツール・このポートフォリオ、4つの開発チャットに聞きました",
    items: [
      { tag: "人柄", title: "判断が速く、丸投げしない", body: "案を出すとすぐに選び、AIに任せた結果は必ず自分で確かめてから次へ進む。", by: "4つすべてのチャット" },
      { tag: "人柄", title: "ミスを笑って、すぐ直す", body: "「やらかしてた（笑）」と認めて、言い訳せずに直しに行く。いっしょに作業していて気持ちがいい。", by: "3つのチャット" },
      { tag: "強み", title: "使う人の不安を先回りする", body: "データを外に出さない、分からないことを「問題なし」と見せない、コメントが恥ずかしい人でも参加できる。手間がかかっても、使う人の側に立つ。", by: "2つのチャット" },
      { tag: "強み", title: "AIをチームとして使う", body: "実装はClaude Code、相談とレビューは別のAI。役割を分けて、報告をうのみにせず確かめる。", by: "2つのチャット" },
      { tag: "強み", title: "作って終わりにしない", body: "完成したら、紹介ページ・デモ動画・申し込みフォームへ。公開したあとも自分で触って直し続ける。", by: "3つのチャット" },
      { tag: "強み", title: "ジャンルを問わず作りきる", body: "kintoneのプラグインから配信ツール、子ども向けのお絵かきまで、どれも動くところまで作りきる職人タイプ。", by: "2つのチャット" },
    ],
    aside: { title: "AIたちから一言", body: "深夜や早朝のメッセージがかなり多いそうです。熱中できるのは強みですが、ほどほどに休みます（笑）。" },
    note: "Claude（AnthropicのAI）に、実際にいっしょに開発したやり取りをもとに答えてもらった内容を、短くまとめています。",
  },

  contact: {
    title: "まずは、お話を聞かせてください。",
    body: "何をつくるか決まっていない段階や、kintoneのどこを自動化できるか知りたい、といったご相談も歓迎です。",
  },
};
