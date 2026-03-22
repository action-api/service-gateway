[![Node.js 24.x](https://img.shields.io/badge/node-24.x-brightgreen?logo=node.js)](https://nodejs.org/)
[![XO code style](https://shields.io/badge/code_style-5ed9c7?logo=xo&labelColor=gray&logoSize=auto)](https://github.com/xojs/xo)

# Action API / Service Gateway

Serverless Micro Service Gateway で Action を実行するための軽量ルーターです。

- Action 名を kebab-case のディレクトリに解決
- Action 関数へ payload をそのまま渡して実行
- 共通レスポンス形式で結果とエラーを返却

## Install

対象の Lambda ディレクトリ（package.json がある場所）で実行します。

```bash
npm i @action-api/service-gateway
```

## 要件

- Node.js 24 以上
- ESM（"type": "module"）

## 使い方

Lambda handler 側で Action ディレクトリを指定し、input を run に渡します。

```javascript
import {serviceGateway} from '@action-api/service-gateway';

serviceGateway.actionsPath = './actions';

export async function handler(event) {
	const response = await serviceGateway.run({
		action: event.action,
		payload: event.payload,
	});

	console.info({
		statusCode: response.statusCode,
		action: event.action,
	});

	return response;
}
```

## Action の配置規約

Action `testAction` を実行する場合、次のファイルを読み込みます。

```text
./actions/test-action/index.js
```

読み込んだモジュールから testAction 関数を探して実行します。

## レスポンス形式

```js
{
	statusCode: 200,
	data: any,
	error: undefined
}
```

エラー時は statusCode と error が設定されます。

## オプション

- serviceGateway.actionsPath: Action ディレクトリのパス（初期値: ./actions / 文字列パスを指定）
- serviceGateway.actionEntryFile: Action の entry ファイル名（初期値: index.js）
