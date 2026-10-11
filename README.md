# ポートフォリオサイト

Next.js 製。Vercel にそのままデプロイできます。作品は Markdown ファイルを追加して push するだけで増やせます。

## 最初にやること

1. `site.config.ts` を開き、名前・見出し・紹介文・メールアドレスを自分のものに変える
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

一覧は `date` の新しい順に並びます。新しい作品は自動で先頭に来ます。

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
| `draft` | `true` にすると非公開 |

`---` より下は Markdown で自由に書けます。画像は `![説明](/works/ファイル名.png)` と書いた位置に入ります。

## 煙の調整

`components/SmokeCanvas.tsx` にまとまっています。

- 濃さ: `const a = 0.11 * ...` の数字
- 立ちのぼる位置: `const src = w * ...` の数字(0 が左端、1 が右端)
- 粒子数: `target = cssW < 640 ? 46 : 84`
- ヒーローを過ぎて薄くなる速さ: `cssH * 0.7` の数字

## スクロールで出てくる演出

要素に `data-reveal` を付けると、画面に入ったときに煙の中からにじむように現れます。ぼかしの強さや速さは `app/globals.css` の「スクロールで出てくる演出」の部分で変えられます。

煙はページ全体の背景に固定してあり、スクロールすると勢いよく立ちのぼります。`components/SmokeCanvas.tsx` の `boost` がその勢いで、下へ進んだときに残す薄さは `Math.max(0.3, ...)` の数字です。

「私について」「できること」「相談」の文章は `site.config.ts` にあります。
