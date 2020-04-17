# 環境構築

1. nodeがinstall済み

```bash
node --version
# v12.5.0以降（最新すぎると動かなくなる場合がある、その場合は敢えて古めのバージョンを入れてみてください。）
```

2. yarnをinstall

```bash
npm install -g yarn
yarn --version
# 1.12.3
```

3. node_modulesを集める

```bash
cd prct
yarn install
```

4. 起動

```bash
yarn start
# localhost:4200を開く
```

5. ユニットテスト

```bash
yarn test
# or
yarn test --code-coverage
```

6. e2eテスト(Selenium)

```bash
# javajdkが必要
yarn e2e
```

7. デプロイ

```bash
yarn build
```

# 注意

fontとiconはCDNを使用していますので、オフラインだと画面が崩れます。
