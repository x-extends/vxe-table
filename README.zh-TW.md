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

一個基於 [vue](https://www.npmjs.com/package/vue) 的PC端表格組件，支持增删改查、虛擬滾動、懶加載、快捷選單、數據校驗、樹形結構、列印匯出、表單渲染、數據分頁、虛擬清單、彈窗、自定義範本、渲染器、賊靈活的配寘項、擴展接口等…

* 設計理念
  * 面向現代瀏覽器，高效的簡潔 API 設計
  * 模組化表格、按需加載、擴展介面
  * 為單行編輯表格而設計，支持增删改查及更多擴展，强大的功能的同時兼具效能

## QQ 交流群

![qq](https://gitee.com/xuliangzhan_admin/vxe-table/raw/master/public/static/donation/qq.png)

## 瀏覽器支持

![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png)
--- | --- | --- | --- | --- | --- |
11+ ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 8+ ✔ |

## 功能點

* [x] 基礎表格
* [x] 高級表格
* [x] 斑馬線條紋
* [x] 多種邊框
* [x] 儲存格樣式
* [x] 列寬拖動
* [x] 最大高度
* [x] 自我調整寬高
* [x] 固定列
* [x] 多級表頭
* [x] 錶尾數據
* [x] 高亮行或列
* [x] 序號
* [x] 單選框
* [x] 核取方塊
* [x] 下拉選項
* [x] 開關
* [x] 排序
* [x] 多欄位組合排序
* [x] 篩選
* [x] 儲存格合併
* [x] 合併錶尾
* [x] 導入/匯出/列印
* [x] 顯示/隱藏列
* [x] 加載中
* [x] 格式化內容
* [x] 自定義插槽 - 範本
* [x] 快捷選單
* [x] 展開行
* [x] 分頁
* [x] 表單
* [x] 工具列
* [x] 下拉容器
* [x] 虛擬清單
* [x] 增删改查
* [x] 樹表格
* [x] 數據校驗
* [x] 數據代理
* [x] 鍵盤導航
* [x] 彈窗
* [x] 渲染器
* [x] 虛擬滾動
* [x] 虛擬合併
* [x] (pro) 儲存格區域選取
* [x] (pro) 儲存格複製/粘貼
* [x] (pro) 儲存格查找和替換

## 安裝

版本：[vue](https://www.npmjs.com/package/vue) 2.6.x, 依賴庫：[xe-utils](https://www.npmjs.com/package/xe-utils)

```shell
npm install xe-utils vxe-table
```

Get on [unpkg](https://unpkg.com/vxe-table/) and [cdnjs](https://cdn.jsdelivr.net/npm/vxe-table/)

### npm

```javascript
import Vue from 'vue'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

Vue.use(VXETable)
```

### CDN

```HTML
<!-- 引入樣式 -->
<link rel="stylesheet" href="https://unpkg.com/vxe-table/lib/style.css">
<!-- 引入腳本 -->
<script src="https://unpkg.com/xe-utils"></script>
<script src="https://unpkg.com/vxe-table"></script>
<!-- 建議使用 CDN 管道引入的用戶在連結位址上鎖定版本，避免受到非相容性更新的影響 -->
```

## 示例

```html
<template>
  <div>
    <vxe-table :data="tableData">
      <vxe-column type="seq" title="Seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name"></vxe-column>
      <vxe-colgroup title="Group1">
        <vxe-column field="sex" title="Sex"></vxe-column>
        <vxe-column field="address" title="Address"></vxe-column>
      </vxe-colgroup>
    </vxe-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', address: 'Shenzhen' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Man', address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', address: 'Shanghai' }
      ]
    }
  }
}
</script>
```

## 檔案

💡 [使用指南](https://github.com/xuliangzhan/vxe-table-demo)  
👉 [查看演示](https://xuliangzhan_admin.gitee.io/vxe-table/#/table/base/basic) [👀備用地址](https://x-extends.github.io/vxe-table/#/table/base/basic)  
👉 [查看檔案](https://xuliangzhan_admin.gitee.io/vxe-table/#/table/api) [👀備用地址](https://x-extends.github.io/vxe-table/#/table/api)

## 運行項目

安裝依賴

```shell
npm install
```

啓動本地調試

```shell
npm run serve
```

編譯打包，生成編譯後的目錄：lib

```shell
npm run lib
```

## License

[MIT](LICENSE) © 2019-present, Xu Liangzhan
