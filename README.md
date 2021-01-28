# Startlens

![startlens_admin_preview](https://user-images.githubusercontent.com/42575165/106089813-17e24880-616c-11eb-9222-f0310e935bbc.png)
![startlens_admin_preview2](https://user-images.githubusercontent.com/42575165/106089818-1add3900-616c-11eb-912e-4be1362d164d.png)
![startlens_admin_preview3](https://user-images.githubusercontent.com/42575165/106089822-1ca6fc80-616c-11eb-8a72-c499a738a3f0.png)


## サイト概要

観光事業者が観光地のスポットの写真や説明文を投稿できる管理者サイトです。またダッシュボードで閲覧されたユーザー数とその属性データを閲覧することができます。

- [バックエンドAPIレポジトリ](https://github.com/yuta252/startlens_web_backend)
- [ユーザー側フロントエンドレポジトリ](https://github.com/yuta252/startlens_frontend_user)

## 技術選定

- React.js    v16.14.0
- Redux       v7.2.2
- TypeScript  v3.9.7
- Chart.js    v2.9.4

## 機能

- Chart.jsによるデータビジュアライズ（今日、過去１週間、過去１ヶ月、過去1年の検索条件で切り替え可能）
- FileAPIを利用した画像の複数枚アップロード
- フロントエンドにおける画像のリサイズとBase64エンコーディング
- 説明文の多言語投稿機能
- GoogleMapAPIを利用した住所情報から位置情報（緯度・経度）の取得
- JWTトークンによるユーザー認証
- 投稿画像の一覧表示におけるページネーション

## 外部API

- [バックエンドAPIサーバー](https://github.com/yuta252/startlens_web_backend)

　事業者ごとに登録した画像や文章を管理処理するためのAPIサーバー
 
- [Google Map API](https://cloud.google.com/maps-platform?hl=ja)

　事業者が入力した住所情報から位置情報を取得するためのAPI
