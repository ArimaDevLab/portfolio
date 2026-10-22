# ポートフォリオサイト

Next.js 製。Vercel にそのままデプロイできます。作品は Markdown ファイルを追加して push するだけで増やせます。

## 最初にやること

1. `site.config.ts` で名前・見出し・紹介文・メールアドレスを変えられる(ファビコンは `app/icon.png`)
2. `content/works/` の各作品の説明と `url` を書き直す(今は仮の文章です)
3. `public/works/` の画像を高解像度のもの(推奨 1600×1000px)に差し替える

## 手元で確認する

```
npm install
npm run dev
```

http://localhost:3000 を開きます。

## Vercel で公開する

1. このフォルダを GitHub のリポジトリに push する
2. https://vercel.com/new でそのリポジトリを選び、設定は変えずに Deploy を押す

以後は push するたびに自動で公開されます。

## 作品を追加する

```
npm run new-work -- my-new-app "作品タイトル"
```

1. `content/works/my-new-app.md` ができるので、説明を書く
2. `public/works/my-new-app.png` に画像を置く
3. `git add . && git commit -m "作品を追加" && git push`

一覧は `order` の小さい順に並びます。`order` のない作品は、番号付きの作品の後ろに `date` の新しい順で並びます。

### 作品ファイルの項目

| 項目 | 内容 |
| --- | --- |
| `title` | 作品名 |
| `date` | 日付。並び順に使います(画面には出ません) |
| `summary` | 一覧に出る短い説明 |
| `cover` | 一覧に出る画像のパス(8:5 に切り抜かれます) |
| `image` | 詳細ページの一番上に出す画像。切り抜かずに表示します。省略すると `cover` を使います |
| `url` | 作品のURL。入れると詳細ページに「サイトを開く」ボタンが出ます |
| `tags` | 詳細ページに出るタグ |
| `order` | 一覧での並び順(1 が先頭)。省略可 |
| `draft` | `true` にすると非公開 |

`---` より下は Markdown で自由に書けます。画像は `![説明](/works/ファイル名.png)` と書いた位置に入ります。

## 見た目と文言

- 文言(見出し、できること、進め方、私について、相談の欄)は `site.config.ts` にまとめてあります
- 色は `app/globals.css` の先頭(`--navy` がロゴの紺、`--blue` がロゴの青)で変えられます
- 要素に `data-reveal` を付けると、画面に入ったときにふわっと現れます
