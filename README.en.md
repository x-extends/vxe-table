# vxe-table

[简体中文](README.md) | English

[![gitee star](https://gitee.com/xuliangzhan_admin/vxe-table/badge/star.svg?theme=dark)](https://gitee.com/xuliangzhan_admin/vxe-table/stargazers)
[![npm version](https://img.shields.io/npm/v/vxe-table.svg?style=flat-square)](https://www.npmjs.com/package/vxe-table)
[![npm build](https://travis-ci.com/x-extends/vxe-table.svg?branch=master)](https://travis-ci.com/x-extends/vxe-table)
[![npm downloads](https://img.shields.io/npm/dt/vxe-table.svg?style=flat-square)](https://npm-stat.com/charts.html?package=vxe-table)
[![gzip size: JS](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/index.min.js?compression=gzip&label=gzip%20size:%20JS)](https://unpkg.com/vxe-table/lib/index.min.js)
[![gzip size: CSS](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/index.css?compression=gzip&label=gzip%20size:%20CSS&color=green)](https://unpkg.com/vxe-table/lib/index.css)  
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
  * [x] v3.0 &nbsp;&nbsp;70% Based on vue2.6+, only H5 browser is supported, ie is not supported, rendering performance is greatly improved
  * [ ] v4.0 &nbsp;&nbsp;0% Based on vue3+, only H5 browser is supported, ie is not supported, rendering performance is greatly improved

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
* [x] Column resizable
* [x] Maximum table height
* [x] Resize height and width
* [x] Fixed column
* [x] Grouping table header
* [x] Table footer
* [x] Highlight row and column
* [x] Table sequence
* [x] Radio
* [x] Checkbox
* [x] Select
* [x] Switch
* [x] Sorting
* [x] Filter
* [x] Rowspan and colspan
* [x] Import
* [x] Export
* [x] Print
* [x] Show/Hide column
* [x] Loading
* [x] Formatted cell
* [x] Slot/template
* [x] Context menu
* [x] Expandable row
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
* [x] (pro) Cell copy/paste

## Modules

* Core
  * ![Table](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/table/src/table.min.js?compression=gzip&label=Table)![Methods](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/table/src/methods.min.js?compression=gzip&label=Methods)![Body](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/body/src/body.min.js?compression=gzip&label=Body)![Cell](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/cell/src/cell.min.js?compression=gzip&label=Cell)![style](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/table/style/style.css?compression=gzip&label=style&color=green)
* Modules
  * ![Icon](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/icon/style/style.css?compression=gzip&label=Icon&color=green)
  * ![Header](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/header/src/header.min.js?compression=gzip&label=Header)![style](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/header/style/style.css?compression=gzip&label=style&color=green)
  * ![Footer](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/footer/src/footer.min.js?compression=gzip&label=Footer)![style](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/footer/style/style.css?compression=gzip&label=style&color=green)
  * ![Filter](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/filter/src/mixin.min.js?compression=gzip&label=Filter)![Panel](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/filter/src/panel.min.js?compression=gzip&label=Panel)![style](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/filter/style/style.css?compression=gzip&label=style&color=green)
  * ![Menu](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/menu/src/mixin.min.js?compression=gzip&label=Menu)![Panel](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/menu/src/panel.min.js?compression=gzip&label=Panel)![style](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/menu/style/style.css?compression=gzip&label=style&color=green)
  * ![Export](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/export/src/mixin.min.js?compression=gzip&label=Export)![style](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/export/style/style.css?compression=gzip&label=style&color=green)
  * ![Keyboard](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/keyboard/src/mixin.min.js?compression=gzip&label=Keyboard)
* Component
  * ![Grid](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/grid/src/grid.min.js?compression=gzip&label=Grid)![style](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/grid/style/style.css?compression=gzip&label=style&color=green)
  * ![Column](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/column/src/column.min.js?compression=gzip&label=Column)
  * ![List](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/list/src/list.min.js?compression=gzip&label=List)![style](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/list/style/style.css?compression=gzip&label=style&color=green)
  * ![Form](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/form/src/form.min.js?compression=gzip&label=Form)![FormItem](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/form/src/form-item.min.js?compression=gzip&label=FormItem)![style](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/form/style/style.css?compression=gzip&label=style&color=green)
  * ![Pager](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/pager/src/pager.min.js?compression=gzip&label=Pager)![style](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/pager/style/style.css?compression=gzip&label=style&color=green)
  * ![Toolbar](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/toolbar/src/toolbar.min.js?compression=gzip&label=Toolbar)![style](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/toolbar/style/style.css?compression=gzip&label=style&color=green)
  * ![Tooltip](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/tooltip/src/tooltip.min.js?compression=gzip&label=Tooltip)![style](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/tooltip/style/style.css?compression=gzip&label=style&color=green)
  * ![Checkbox](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/checkbox/src/checkbox.min.js?compression=gzip&label=Checkbox)![style](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/checkbox/style/style.css?compression=gzip&label=style&color=green)
  * ![Radio](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/radio/src/radio.min.js?compression=gzip&label=Radio) ![style](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/radio/style/style.css?compression=gzip&label=style&color=green)
  * ![Input](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/input/src/input.min.js?compression=gzip&label=Input)![style](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/input/style/style.css?compression=gzip&label=style&color=green)
  * ![Select](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/select/src/select.min.js?compression=gzip&label=Select)![Optgroup](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/select/src/optgroup.min.js?compression=gzip&label=Optgroup)![Option](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/select/src/option.min.js?compression=gzip&label=Option)![style](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/select/style/style.css?compression=gzip&label=style&color=green)
  * ![Switch](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/switch/src/switch.min.js?compression=gzip&label=Switch) ![style](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/switch/style/style.css?compression=gzip&label=style&color=green)
  * ![Modal](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/modal/src/modal.min.js?compression=gzip&label=Modal)![style](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/modal/style/style.css?compression=gzip&label=style&color=green)
  * ![Button](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/button/src/button.min.js?compression=gzip&label=Button)![style](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/button/style/style.css?compression=gzip&label=style&color=green)
  * ![Pulldown](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/pulldown/src/pulldown.min.js?compression=gzip&label=Pulldown)![style](https://img.badgesize.io/https://unpkg.com/vxe-table/lib/pulldown/style/style.css?compression=gzip&label=style&color=green)
* Plugins
  * Strengthen
    * [![vxe-table-plugin-export-pdf](https://img.badgesize.io/https://unpkg.com/vxe-table-plugin-export-pdf/dist/index.min.js?compression=gzip&label=vxe%20table%20plugin%20export%20pdf)](https://www.npmjs.com/package/vxe-table-plugin-export-pdf)
    * [![vxe-table-plugin-export-xlsx](https://img.badgesize.io/https://unpkg.com/vxe-table-plugin-export-xlsx/dist/index.min.js?compression=gzip&label=vxe%20table%20plugin%20export%20xlsx)](https://www.npmjs.com/package/vxe-table-plugin-export-xlsx)
    * [![vxe-table-plugin-menus](https://img.badgesize.io/https://unpkg.com/vxe-table-plugin-menus/dist/index.min.js?compression=gzip&label=vxe%20table%20plugin%20menus)](https://www.npmjs.com/package/vxe-table-plugin-menus)
  * Adapter
    * [![vxe-table-plugin-element](https://img.badgesize.io/https://unpkg.com/vxe-table-plugin-element/dist/index.min.js?compression=gzip&label=vxe%20table%20plugin%20element)](https://www.npmjs.com/package/vxe-table-plugin-element)![style](https://img.badgesize.io/https://unpkg.com/vxe-table-plugin-element/dist/style.min.css?compression=gzip&label=style&color=green)
    * [![vxe-table-plugin-iview](https://img.badgesize.io/https://unpkg.com/vxe-table-plugin-iview/dist/index.min.js?compression=gzip&label=vxe%20table%20plugin%20iview)](https://www.npmjs.com/package/vxe-table-plugin-iview)![style](https://img.badgesize.io/https://unpkg.com/vxe-table-plugin-iview/dist/style.min.css?compression=gzip&label=style&color=green)
    * [![vxe-table-plugin-antd](https://img.badgesize.io/https://unpkg.com/vxe-table-plugin-antd/dist/index.min.js?compression=gzip&label=vxe%20table%20plugin%20antd)](https://www.npmjs.com/package/vxe-table-plugin-antd)![style](https://img.badgesize.io/https://unpkg.com/vxe-table-plugin-antd/dist/style.min.css?compression=gzip&label=style&color=green)

## Installing

Dependent: [vue](https://www.npmjs.com/package/vue) 2.6+, [xe-utils](https://www.npmjs.com/package/xe-utils) 2.6+

```shell
npm install xe-utils vxe-table
```

Get on [unpkg](https://unpkg.com/vxe-table/) and [cdnjs](https://cdn.jsdelivr.net/npm/vxe-table/)

### npm

```javascript
import Vue from 'vue'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'

Vue.use(VXETable)
```

### CDN

```HTML
<!-- Style -->
<link rel="stylesheet" href="https://unpkg.com/vxe-table/lib/index.css">
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
