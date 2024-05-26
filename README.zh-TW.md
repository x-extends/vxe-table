# vxe-table

[简体中文](README.md) | 繁體中文 | [English](README.en.md)  

[![star](https://gitee.com/xuliangzhan_admin/vxe-table/badge/star.svg?theme=gvp)](https://gitee.com/xuliangzhan_admin/vxe-table/stargazers)
[![npm version](https://img.shields.io/npm/v/vxe-table.svg?style=flat-square)](https://www.npmjs.com/package/vxe-table)
[![npm build](https://travis-ci.com/x-extends/vxe-table.svg?branch=master)](https://travis-ci.com/x-extends/vxe-table)
[![npm downloads](https://img.shields.io/npm/dt/vxe-table.svg?style=flat-square)](https://npm-stat.com/charts.html?package=vxe-table)
[![issues](https://img.shields.io/github/issues/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/issues)
[![issues closed](https://img.shields.io/github/issues-closed/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/issues?q=is%3Aissue+is%3Aclosed)
[![pull requests](https://img.shields.io/github/issues-pr/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/pulls)
[![pull requests closed](https://img.shields.io/github/issues-pr-closed/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/pulls?q=is%3Apr+is%3Aclosed)
[![npm license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)

一個基於 [vue](https://www.npmjs.com/package/vue) 的PC端表格組件，支持增刪改查、虛擬樹、列拖拽、懶加載、快捷菜單、數據校驗、打印導出、表單渲染、自定義模板、渲染器、JSON 配置式…

* 設計理念
  * 面向現代瀏覽器，高效的簡潔 API 設計
  * 模組化表格、按需加載
  * 為單行編輯表格而設計，支持增删改查及更多擴展，强大的功能的同時兼具效能

* 計劃
  * [x] ~~v1.0 基於 vue2.6，支持所有主流的瀏覽器，實現表格的一切實用的功能~~
  * [x] ~~v2.0 基於 vue2.6，支持所有主流的瀏覽器，同時兼具功能與效能~~
  * [x] v3.0 基於 vue2.6，支持現代瀏覽器並保留相容IE11
  * [x] v4.0 基於 vue3.x，只支持現代瀏覽器，不支持IE
  * [x] v4.7 基於 vue3.x，重構組件，拆分多餘組件，只保留表格

## 瀏覽器支持

![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

## 功能點

* [x] 基礎表格
* [x] 配置式表單
* [x] 斑馬線條紋
* [x] 多種邊框
* [x] 儲存格樣式
* [x] 列寬拖動
* [x] 最小/最大高度
* [x] 自我調整寬高
* [x] 固定列
* [x] 多級表頭
* [x] 錶尾數據
* [x] 高亮行或列
* [x] 序號
* [x] 單選框
* [x] 核取方塊
* [x] 排序
* [x] 多欄位組合排序
* [x] 篩選
* [x] 儲存格合併
* [x] 合併錶尾
* [x] 導入/匯出/列印
* [x] 顯示/隱藏列
* [x] 拖拽/自定義列排序
* [x] 加載中
* [x] 格式化內容
* [x] 自定義插槽 - 範本
* [x] 快捷選單
* [x] 展開行
* [x] 工具列
* [x] 增删改查
* [x] 數據校驗
* [x] 數據代理
* [x] 鍵盤導航
* [x] 渲染器
* [x] 虛擬滾動
* [x] 虛擬合併
* [x] CSS 變量主題
* [x] (([企業版](https://vxetable.cn/pluginDocs/))) 儲存格區域選取
* [x] (([企業版](https://vxetable.cn/pluginDocs/))) 儲存格複製/粘貼
* [x] ([企業版](https://vxetable.cn/pluginDocs/)) 儲存格查找和替換
* [x] ([企業版](https://vxetable.cn/pluginDocs/)) 全鍵盤操作

## 安裝

版本：[vue](https://www.npmjs.com/package/vue) 3.x

```shell
npm install vxe-table
```

Get on [unpkg](https://unpkg.com/vxe-table/) and [cdnjs](https://cdn.jsdelivr.net/npm/vxe-table/)

### npm

```javascript
import { createApp } from 'vue'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

createApp(App).use(VXETable).mount('#app')
```

### CDN

使用第三方 CDN 方式記得鎖定版本號，避免受到非兼容性更新的影響  
***不建議將第三方的 CDN 地址用於正式環境，因爲該連接隨時都可能會失效***  

```HTML
<!-- 引入樣式 -->
<link rel="stylesheet" href="https://unpkg.com/vxe-table/lib/style.css">
<!-- 引入腳本 -->
<script src="https://unpkg.com/xe-utils"></script>
<script src="https://unpkg.com/vxe-table"></script>
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

👉 [官網檔案](https://vxetable.cn)  

## 運行項目

安裝依賴

```shell
npm install
```

啓動本地調試

```shell
npm run serve
```

編譯打包，生成編譯後的目錄：es,lib

```shell
npm run lib
```

## Contributors

Thank you to everyone who contributed to this project.

[![vxe-table](https://contrib.rocks/image?repo=x-extends/vxe-table)](https://github.com/x-extends/vxe-table/graphs/contributors)

## License

[MIT](LICENSE) © 2019-present, Xu Liangzhan
