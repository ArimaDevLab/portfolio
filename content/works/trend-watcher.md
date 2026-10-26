---
title: "リアルタイム情報更新（Trend Watcher）"
date: 2026-10-08
summary: "Googleトレンドの急上昇ワードをサイドパネルに常に表示し、新しい話題を通知するChrome拡張。"
cover: /works/trend-watcher.png
url: "https://chromewebstore.google.com/detail/trend-watcher/kjhgnigmgpafhicbkoeffjhanlicbbgd"
tags: ["ブラウザ拡張", "通知"]
order: 8
draft: false
---

Googleトレンドの急上昇ワードを定期的に取得し、ブラウザのサイドパネルに一覧で表示するChrome拡張です。ほかのページを見ながら、いま話題になっていることを横で確認できます。Chromeウェブストアで公開しています。

![ブラウザの右側に急上昇ワードの一覧が並んでいるところ](/works/trend-watcher-panel.png)

## できること

一覧には、ワードごとに検索数の目安と関連ニュースへのリンクが並びます。新しく現れたワードや、検索数が伸びたワードはデスクトップ通知で知らせます。

![新しいトレンドを知らせるデスクトップ通知](/works/trend-watcher-alert.png)

ブラウザを前面に出していないときも、画面の隅に小さなウィンドウを常に表示しておけます。

![デスクトップの隅に小さなウィンドウで急上昇ワードを表示しているところ](/works/trend-watcher-pip.png)

## 設定

通知したくない言葉を「ミュートワード」に、追いかけたい言葉だけを「監視ワード」に登録できます。取得する間隔(最短10分)と、もとになるフィードのURLも変えられます。

![フィードURL、取得間隔、ミュートワード、監視ワードの設定画面](/works/trend-watcher-settings.png)

## 仕組み

Googleトレンドが公開しているRSSフィードを読み込んでいます。取得したトレンドと設定は端末の中にだけ保存し、外部のサーバーには送りません。表示は英語と日本語に対応しています。
