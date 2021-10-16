# express-todo-app-ddd

Express, TypeScriptでシンプルなオニオンアーキテクチャを説明するリポジトリ

Trelloのようなタスク管理アプリケーションを想定している

## ドメインオブジェクト

- Board(ボード)
- Task(タスク)
- Label(ユーザ)
- User(ユーザ)

## 追加予定のドメインオブジェクト

- Team(チーム)
- BillingPlan(課金プラン)

## 追加予定のユースケース

- ユーザが複数のボードに所属していて自分が担当しているタスクの合計値を取得するユースケース(Read Model Updaterの出番)
