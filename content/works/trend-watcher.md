---
title: "リアルタイム情報更新（Trend Watcher）"
date: 2026-10-08
summary: "Googleトレンドの急上昇ワードをサイドパネルに常に表示し、新しい話題を通知するブラウザ拡張。ChromeとEdgeに対応。"
cover: /works/trend-watcher.png
url: "https://chromewebstore.google.com/detail/trend-watcher/kjhgnigmgpafhicbkoeffjhanlicbbgd"
tags: ["ブラウザ拡張", "通知"]
order: 14
press: "窓の杜"
usage: "1週間で 約75人が利用中"
edge: "https://microsoftedge.microsoft.com/addons/detail/trend-watcher/agocajbfapnbahdcgeahbnlaopfbelei"
press_url: "https://forest.watch.impress.co.jp/docs/digest/2154936.html"
draft: false
---

Googleトレンドの急上昇ワードを定期的に取得し、ブラウザのサイドパネルに一覧で表示するブラウザ拡張です。ほかのページを見ながら、いま話題になっていることを横で確認できます。ChromeウェブストアとMicrosoft Edgeアドオンで公開しています。

![ブラウザの右側に急上昇ワードの一覧が並んでいるところ](/works/trend-watcher-panel2.png)

## できること

一覧には、ワードごとに検索数の目安と関連ニュースへのリンクが並びます。新しく現れたワードや、検索数が伸びたワードはデスクトップ通知で知らせます。

![新しいトレンドを知らせるデスクトップ通知](/works/trend-watcher-alert.png)

ブラウザを前面に出していないときも、画面の隅に小さなウィンドウを常に表示しておけます。

![デスクトップの隅に小さなウィンドウで急上昇ワードを表示しているところ](/works/trend-watcher-pip2.png)

## 設定

通知したくない言葉を「ミュートワード」に、追いかけたい言葉だけを「監視ワード」に登録できます。取得する間隔(最短10分)と、もとになるフィードのURLも変えられます。

![フィードURL、取得間隔、ミュートワード、監視ワードの設定画面](/works/trend-watcher-settings2.png)

## 仕組み

Googleトレンドが公開しているRSSフィードを読み込んでいます。取得したトレンドと設定は端末の中にだけ保存し、外部のサーバーには送りません。表示は英語と日本語に対応しています。

## メディア掲載

2026年11月9日、窓の杜のダイジェストニュースで紹介されました。その日の17件のうち、記事の見出しに名前が載っています。

掲載後の2026年11月10日〜15日は、1日あたり平均で約50人に使っていただいています（Chromeウェブストアの集計）。その後も使ってくださる方は増え続けていて、11月18日時点で、1週間のユーザー数は約75人です。

窓の杜の公式Xアカウントでも紹介していただきました。

- [窓の杜の記事を読む](https://forest.watch.impress.co.jp/docs/digest/2154936.html)
- [窓の杜のXでの紹介を見る](https://x.com/madonomori/status/2119726204936995137)
