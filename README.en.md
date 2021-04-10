# vxe-table

[简体中文](README.md) | [繁體中文](README.zh-TW.md) | English  

[![star](https://gitee.com/xuliangzhan_admin/vxe-table/badge/star.svg?theme=gvp)](https://gitee.com/xuliangzhan_admin/vxe-table/stargazers)
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
  * Efficient and concise API design for modern browsers.
  * Modular tables, on-demand loading, extended interfaces.
  * Designed for single row table editing, supports addition, deletion, modification and query as well as more expansion, with powerful functions and performance at the same time.

* Plan
  * [x] v1.0 Based on vue2.6+, Support for all major browsers.
  * [x] v2.0 Based on vue2.6+, Support for all major browsers.
  * [x] v3.0 Support modern browser and keep IE11 compatible to improve rendering performance.
  * [x] v4.0 Based on vue3.0+, Only support modern browser, not IE.

## Browser Support

![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 8+ ✔ |

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
* [x] Multi field sorting
* [x] Filter
* [x] Merged cells
* [x] Merged footer items
* [x] Import/Export/Print
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
* [x] VxeGlobalRenderer
* [x] Virtual scroller
* [x] Virtual merger
* [x] (pro) Cell area selection
* [x] (pro) Cell copy & paste
* [x] (pro) Cell find and replace

## Installing

Version: [vue](https://www.npmjs.com/package/vue) 3.x, Dependent: [xe-utils](https://www.npmjs.com/package/xe-utils)

```shell
npm install xe-utils vxe-table@next
```

Get on [unpkg](https://unpkg.com/vxe-table/) and [cdnjs](https://cdn.jsdelivr.net/npm/vxe-table/)

### npm

```javascript
import { createApp } from 'vue'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

const app = createApp(App)
app.use(VXETable)
app.mount('#app')
```

### CDN

```HTML
<!-- Style -->
<link rel="stylesheet" href="https://unpkg.com/vxe-table@next/lib/style.css">
<!-- Script -->
<script src="https://unpkg.com/xe-utils"></script>
<script src="https://unpkg.com/vxe-table@next"></script>
<!-- It is recommended that users introduced by CDN lock the version on the link address to avoid the impact of incompatible updates -->
```

## Example

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

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const tableData = ref([
      { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', address: 'Shenzhen' },
      { id: 10002, name: 'Test2', role: 'Test', sex: 'Man', address: 'Guangzhou' },
      { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', address: 'Shanghai' }
    ])
    return {
      tableData
    }
  }
})
</script>
```

## Docs

💡 [User guide](https://github.com/xuliangzhan/vxe-table-demo)  
👉 [View example](https://x-extends.github.io/vxe-table/#/table/base/basic)  
👉 [View API](https://x-extends.github.io/vxe-table/#/table/api)

## License

[MIT](LICENSE) © 2019-present, Xu Liangzhan
