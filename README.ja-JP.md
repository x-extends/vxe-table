# vxe-table

[简体中文](README.md) | [繁體中文](README.zh-TW.md) | [English](README.en.md) | 日本語  

[![github star](https://img.shields.io/github/stars/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table)
[![gitee star](https://gitee.com/x-extends/vxe-table/badge/star.svg?theme=gvp)](https://gitee.com/x-extends/vxe-table)
[![gitcode star](https://gitcode.com/x-extends/vxe-table/star/badge.svg)](https://gitcode.com/x-extends/vxe-table)
[![NodeJS with Webpack](https://github.com/x-extends/vxe-table/actions/workflows/webpack.yml/badge.svg)](https://github.com/x-extends/vxe-table/actions/workflows/webpack.yml)
[![npm downloads](https://img.shields.io/npm/dt/vxe-table.svg?style=flat-square)](https://npm-stat.com/charts.html?package=vxe-table)
[![issues](https://img.shields.io/github/issues/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/issues)
[![issues closed](https://img.shields.io/github/issues-closed/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/issues?q=is%3Aissue+is%3Aclosed)
[![pull requests](https://img.shields.io/github/issues-pr/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/pulls)
[![pull requests closed](https://img.shields.io/github/issues-pr-closed/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/pulls?q=is%3Apr+is%3Aclosed)
[![npm license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)

[Vxe UI](https://github.com/x-extends/vxe-pc-ui) エンドの表構成要素をベースに、コピペ、データ透視テーブル、仮想リストをサポートする高性能な企業向け表作成ソリューションです。  

## ブラウザサポート

![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
最新 ✔ | 最新 ✔ | 最新 ✔ | 最新 ✔ | 最新 ✔ |

## インストール

バージョン: [vue](https://www.npmjs.com/package/vue) 3.x

```shell
npm install vxe-table@next
```

[unpkg](https://unpkg.com/vxe-table/) および [cdnjs](https://cdn.jsdelivr.net/npm/vxe-table/) で入手可能

### NPM

```javascript
// ...
import VxeUITable from 'vxe-table'
import 'vxe-table/lib/style.css'
// ...

createApp(App).use(VxeUITable).mount('#app')
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

## ライセンス

[MIT](LICENSE) © 2019-present, Xu Liangzhan
