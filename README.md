# express-todo-app-ddd

Express, TypeScriptでシンプルなオニオンアーキテクチャを説明するリポジトリ

## 環境構築

```bash
$ git clone git@github.com:Katsukiniwa/express-toto-app-ddd.git
$ docker compose up --build -d             # コンテナを立ち上げ
$ docker compose exec app bash             # appコンテナに入る
$ npm run prisma:migrate                   # マイグレーションを実行
$ npm run prisma:seed                      # シードデータの流し込み
$ npm run dev                              # アプリケーションサーバの立ち上げ
$ curl -H "accept: application/json" \
     -H "Content-Type: application/json" \
     -XGET http://localhost:8080/boards/1  # idが1のボードを取得
```

## 参考にしたリポジトリ・記事

[ddd-forum](https://github.com/stemmlerjs/ddd-forum)

Trelloのようなタスク管理アプリケーションを想定している

## ドメインオブジェクト

- [x] Board(ボード)
- [x] Task(タスク)
- [x] Label(ユーザ)
- [x] User(ユーザ)

## 追加予定のドメインオブジェクト

- [ ] Team(チーム)
  - [ ] チームはボードを複数持てる
  - [ ] チームにはオーナーが存在する
  - [ ] ユーザは複数のチームに所属できる
- [ ] BillingPlan(課金プラン)
  - [ ] individual(個人), enterprise(企業)の2つを用意
  - [ ] enterpriseのみボード数無制限

## 追加予定のユースケース・実装の変更

- [ ] ユーザが複数のボードに所属していて自分が担当しているタスクの合計値を取得するユースケース(Read Model Updaterの出番)
- [ ] タスクに進行状況(todo/doing/done)を追加する(要ドメインモデリング)
- [ ] エンティティの識別子を遅延生成のautoincrement(RDB依存)から早期生成のulidに変更する(なぜ遅延生成が面倒か？)
- [ ] 早期生成に切り替えた場合のFactoryパターンの導入(識別子の生成ロジックの凝集度を高める)
- [ ] 認証・ロギング・エラーハンドリング・TimeZoneなどの横断的関心事(Cross Cutting Concern)の具体的な実装
