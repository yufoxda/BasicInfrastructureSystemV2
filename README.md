# v2
- comunity:discord connector
  - discordという言葉を使いたくなかった
  - api:公開API
  - control:コントローラー
  - operate:操作用インターフェース
- meber:menber connector
  - コントローラとインターフェース省いた。
- frontend:dashboard
  - frontendに対するbackendにしたかったが、backendが２つに分かれてた...
- share:全体で共有するものを入れる
  - 本来はDBのスキーマを入れるところだが、
    - db　コントローラーがある。
    - dbとbackendのapi schema, frontendのschemaが別でも良い＆その差を吸収する設計
    - honoのRPCを使うのでフロントに型を持っていける
  - なので使わないかも

コードを見ればわかるので見てください；；

```bash
cd comunity
npm i
npm run dev
```
localhost:xxxx/uiを開いて
post:roleを実行。

コンソールにログが出ます。

upisの設計通りに呼び出されてるとわかるはずです。
処理グループでフォルダ分けされています。
どういう構造かは分かりますね？

フロントエンドは公開APIを叩く感じで。ご自由に。
