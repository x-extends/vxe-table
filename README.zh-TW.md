# vxe-table

[简体中文](README.md) | 繁體中文 | [English](README.en.md) | [日本語](README.ja-JP.md)  

[![star](https://gitee.com/x-extends/vxe-table/badge/star.svg?theme=gvp)](https://gitee.com/x-extends/vxe-table/stargazers)
[![npm version](https://img.shields.io/npm/v/vxe-table.svg?style=flat-square)](https://www.npmjs.com/package/vxe-table)
[![NodeJS with Webpack](https://github.com/x-extends/vxe-table/actions/workflows/webpack.yml/badge.svg)](https://github.com/x-extends/vxe-table/actions/workflows/webpack.yml)
[![npm downloads](https://img.shields.io/npm/dt/vxe-table.svg?style=flat-square)](https://npm-stat.com/charts.html?package=vxe-table)
[![issues](https://img.shields.io/github/issues/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/issues)
[![issues closed](https://img.shields.io/github/issues-closed/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/issues?q=is%3Aissue+is%3Aclosed)
[![pull requests](https://img.shields.io/github/issues-pr/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/pulls)
[![pull requests closed](https://img.shields.io/github/issues-pr-closed/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/pulls?q=is%3Apr+is%3Aclosed)
[![npm license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)

一個基於 [Vxe UI](https://github.com/x-extends/vxe-pc-ui) 的 PC 端表格元件，支援複製貼上、資料透視表、虛擬清單高效能的表格解決方案

## 在 Cloud IDE 中預覽

[https://idegithub.com/x-extends/vxe-table](https://idegithub.com/x-extends/vxe-table)

## 瀏覽器支持

![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

## 安裝

版本：[vue](https://www.npmjs.com/package/vue) 3.x

```shell
npm install vxe-table@next
```

Get on [unpkg](https://unpkg.com/vxe-table/) and [cdnjs](https://cdn.jsdelivr.net/npm/vxe-table/)

### NPM

```javascript
// ...
import VxeUITable from 'vxe-table'
import 'vxe-table/lib/style.css'
// ...

createApp(App).use(VxeUITable).mount('#app')
```

### CDN

使用第三方 CDN 方式記得鎖定版本號，避免受到非兼容性更新的影響  
***不建議將第三方的 CDN 地址用於正式環境，因爲該連接隨時都可能會失效***  

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

## 示例

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

## 線上檔案

👉 [組件文檔](https://vxeui.com)  
👉 [表格文檔](https://vxetable.cn)  

## 運行項目

安裝依賴

```shell
npm run update
```

啓動本地調試

```shell
npm run serve
```

編譯打包，生成編譯後的目錄：es,lib

```shell
npm run lib
```

## License

[MIT](LICENSE) © 2019-present, Xu Liangzhan
