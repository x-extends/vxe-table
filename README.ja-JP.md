# vxe-table

[简体中文](README.md) | [繁體中文](README.zh-TW.md) | [English](README.en.md) | 日本語  

[![star](https://gitee.com/x-extends/vxe-table/badge/star.svg?theme=gvp)](https://gitee.com/x-extends/vxe-table/stargazers)
[![npm version](https://img.shields.io/npm/v/vxe-table.svg?style=flat-square)](https://www.npmjs.com/package/vxe-table)
[![NodeJS with Webpack](https://github.com/x-extends/vxe-table/actions/workflows/webpack.yml/badge.svg)](https://github.com/x-extends/vxe-table/actions/workflows/webpack.yml)
[![npm downloads](https://img.shields.io/npm/dt/vxe-table.svg?style=flat-square)](https://npm-stat.com/charts.html?package=vxe-table)
[![issues](https://img.shields.io/github/issues/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/issues)
[![issues closed](https://img.shields.io/github/issues-closed/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/issues?q=is%3Aissue+is%3Aclosed)
[![pull requests](https://img.shields.io/github/issues-pr/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/pulls)
[![pull requests closed](https://img.shields.io/github/issues-pr-closed/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/pulls?q=is%3Apr+is%3Aclosed)
[![npm license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)

[vue](https://www.npmjs.com/package/vue) ベースのPCフォームコンポーネントで、追加、削除、変更、チェック、仮想ツリー、列のドラッグアンドドロップ、遅延読み込み、ショートカットメニュー、データ検証、インポート/エクスポート/印刷、フォームレンダリング、カスタムテンプレート、レンダラー、JSON構成をサポートします...

## ブラウザサポート

![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
最新 ✔ | 最新 ✔ | 最新 ✔ | 最新 ✔ | 最新 ✔ |

## 機能

* [x] 基本テーブル
* [x] 構成グリッド
* [x] ストライプ
* [x] 境界線付きテーブル
* [x] セルスタイル
* [x] 列のサイズ変更
* [x] 列拖拽排序
* [x] 行拖拽排序
* [x] 最小/最大高さ
* [x] 高さと幅のリサイズ
* [x] 固定列
* [x] グループ化テーブルヘッダー
* [x] テーブルフッター
* [x] 行と列のハイライト
* [x] テーブルシーケンス
* [x] ラジオ
* [x] チェックボックス
* [x] ソート
* [x] 複数フィールドのソート
* [x] フィルター
* [x] セルの結合
* [x] フッター項目の結合
* [x] インポート/エクスポート/印刷
* [x] 列の表示/非表示
* [x] ドラッグアンドドロップ/カスタマイズ列の並べ替え
* [x] ローディング
* [x] フォーマットされたセル
* [x] スロット - テンプレート
* [x] コンテキストメニュー
* [x] 詳細 - 展開可能な行
* [x] ツールバー
* [x] 仮想ツリー
* [x] 編集可能なCRUD
* [x] 検証
* [x] データプロキシ
* [x] キーボードナビゲーション
* [x] VxeGlobalRenderer
* [x] 仮想スクロール
* [x] 仮想マージ
* [x] CSS変数テーマ
* [x] ([エンタープライズ](https://vxetable.cn/pluginDocs/)) セル領域選択
* [x] ([エンタープライズ](https://vxetable.cn/pluginDocs/)) セルのコピー＆ペースト
* [x] ([エンタープライズ](https://vxetable.cn/pluginDocs/)) セルの検索と置換
* [x] ([エンタープライズ](https://vxetable.cn/pluginDocs/)) フルキーボード操作
* [x] ([エンタープライズ](https://vxetable.cn/pluginDocs/)) 集成图表

## インストール

バージョン: [vue](https://www.npmjs.com/package/vue) 3.x

```shell
npm install vxe-table@next
```

[unpkg](https://unpkg.com/vxe-table/) および [cdnjs](https://cdn.jsdelivr.net/npm/vxe-table/) で入手可能

### NPM

### テーブルの使用

```javascript
// ...
import VxeTable from 'vxe-table'
import 'vxe-table/lib/style.css'
// ...

createApp(App).use(VxeTable).mount('#app')
```

### テーブルとUIの使用

```javascript
// ...
import VxeTable from 'vxe-table'
import 'vxe-table/lib/style.css'
// ...

import VxeUI from 'vxe-pc-ui'
import 'vxe-pc-ui/lib/style.css'
// ...

createApp(App).use(VxeUI).use(VxeTable).mount('#app')
```

### CDN

サードパーティのCDNを使用する場合は、バージョン番号をロックして、互換性のない更新の影響を受けないようにしてください。  
***サードパーティのCDNアドレスを正式な環境で使用することはお勧めしません。接続がいつでも失敗する可能性があるためです***  

```HTML
<!-- style -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vxe-pc-ui/lib/style.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vxe-table@next/lib/style.css">
<!-- vue -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
<!-- table -->
<script src="https://cdn.jsdelivr.net/npm/xe-utils"></script>
<script src="https://cdn.jsdelivr.net/npm/vxe-pc-ui"></script>
<script src="https://cdn.jsdelivr.net/npm/vxe-table@next"></script>
```

## 例

```html
<template>
  <div>
    <vxe-table :data="tableData">
      <vxe-column type="seq" title="Seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name"></vxe-column>
      <vxe-column field="role" title="Role"></vxe-column>
      <vxe-colgroup title="Group1">
        <vxe-column field="sex" title="Sex"></vxe-column>
        <vxe-column field="address" title="Address"></vxe-column>
      </vxe-colgroup>
    </vxe-table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const tableData = ref([
  { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', address: 'Shenzhen' },
  { id: 10002, name: 'Test2', role: 'Test', sex: 'Man', address: 'Guangzhou' },
  { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', address: 'Shanghai' }
])
</script>
```

## オンラインドキュメント

👉 [UIドキュメント](https://vxeui.com)  
👉 [テーブルドキュメント](https://vxetable.cn)  

## プロジェクトの実行

依存関係をインストールする

```shell
npm run update
```

ローカルデバッグを開始する

```shell
npm run serve
```

コンパイルパッケージング、生成されたコンパイルディレクトリ: es,lib

```shell
npm run lib
```

## 貢献者

このプロジェクトに貢献してくれたすべての人に感謝します。

[![vxe-table](https://contrib.rocks/image?repo=x-extends/vxe-table)](https://github.com/x-extends/vxe-table/graphs/contributors)

## ライセンス

[MIT](LICENSE) © 2019-present, Xu Liangzhan
