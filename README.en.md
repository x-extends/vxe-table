# vxe-table

[简体中文](README.md) | English

[![gitee star](https://gitee.com/xuliangzhan_admin/vxe-table/badge/star.svg?theme=dark)](https://gitee.com/xuliangzhan_admin/vxe-table/stargazers)
[![npm version](https://img.shields.io/npm/v/vxe-table.svg?style=flat-square)](https://www.npmjs.com/package/vxe-table)
[![npm build](https://travis-ci.com/x-extends/vxe-table.svg?branch=master)](https://travis-ci.com/x-extends/vxe-table)
[![npm downloads](https://img.shields.io/npm/dt/vxe-table.svg?style=flat-square)](https://npm-stat.com/charts.html?package=vxe-table)
[![issues](https://img.shields.io/github/issues/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/issues)
[![issues closed](https://img.shields.io/github/issues-closed/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/issues?q=is%3Aissue+is%3Aclosed)
[![pull requests](https://img.shields.io/github/issues-pr/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/pulls)
[![pull requests closed](https://img.shields.io/github/issues-pr-closed/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/pulls?q=is%3Apr+is%3Aclosed)
[![npm license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)

A [vue](https://www.npmjs.com/package/vue) based PC form component, support add, delete, change, virtual scroll, lazy load, shortcut menu, data validation, tree structure, print export, form rendering, data paging, virtual list, modal window, custom template, renderer, flexible configuration items, extension interface, etc...

* Design concept
  * Efficient and concise API design for modern browsers
  * Modular tables, on-demand loading, extended interfaces
  * Designed for single row table editing, supports addition, deletion, modification and query as well as more expansion, with powerful functions and performance at the same time

* [Donation](#donation)
  * [x] v1.0 100% Based on vue2.6+, it supports all mainstream browsers and realizes all practical functions of tables
  * [x] v2.0 &nbsp;100% Based on vue2.6+, it supports all mainstream browsers with both functions and performance

👉 If you have a better suggestion, optimization point or Bug, please feel free to ask [Issues](https://github.com/x-extends/vxe-table/issues/390)

## Browser Support

![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png)
--- | --- | --- | --- | --- | --- |
11+ ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

## Features

* [x] Basic table
* [x] Grid
* [x] Striped
* [x] Table with border
* [x] Cell style
* [x] Column resizing
* [x] Maximum table height
* [x] Resize height & width
* [x] Fixed column
* [x] Grouping table header
* [x] Table footer
* [x] Highlight row & column
* [x] Table sequence
* [x] Radio
* [x] Checkbox
* [x] Select
* [x] Switch
* [x] Sorting
* [x] Filter
* [x] Merged cells
* [x] Merged footer items
* [x] Import
* [x] Export
* [x] Print
* [x] Show/Hide column
* [x] Loading
* [x] Formatted cell
* [x] Slot - template
* [x] Context menu
* [x] Detail - Expandable row
* [x] Pager
* [x] Form
* [x] Toolbar
* [x] Pulldown
* [x] List
* [x] Editable CRUD
* [x] Tree table
* [x] Validate
* [x] Data Proxy
* [x] Keyboard navigation
* [x] Modal
* [x] Renderer
* [x] Virtual Scroller
* [x] (pro) Cell area selection
* [x] (pro) Cell copy & paste
* [x] (pro) Cell find and replace

## Installing

Dependent: [vue](https://www.npmjs.com/package/vue) 2.6+, [xe-utils](https://www.npmjs.com/package/xe-utils) 2.7+

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
<!-- Style -->
<link rel="stylesheet" href="https://unpkg.com/vxe-table/lib/style.css">
<!-- Script -->
<script src="https://unpkg.com/xe-utils"></script>
<script src="https://unpkg.com/vxe-table"></script>
<!-- It is recommended that users introduced by CDN lock the version on the link address to avoid the impact of incompatible updates -->
```

## Example

```html
<template>
  <div>
    <vxe-table :data="tableData">
      <vxe-table-column type="seq" title="Seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="address" title="Address"></vxe-table-column>
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

## Docs

[💡 User guide](https://github.com/xuliangzhan/vxe-table-demo)  
[👉 View example](https://x-extends.github.io/vxe-table/#/table/base/basic)  
[👉 View API](https://x-extends.github.io/vxe-table/#/table/api)

## Donation

If you feel that our open source software is helpful to you, please scan the QR code below to enjoy a cup of coffee.☕  

Because maintaining an open source project takes a lot of effort and time, if you are using the project, your donation will help keep the project going.  
[👉 This component is helpful to me and I would like to donate it💰](https://x-extends.github.io/vxe-table/#/donation/api)

## License

[MIT](LICENSE) © 2019-present, Xu Liangzhan
