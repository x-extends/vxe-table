# vxe-table

[![npm version](https://img.shields.io/npm/v/vxe-table.svg?style=flat-square)](https://www.npmjs.org/package/vxe-table)
[![npm build](https://travis-ci.org/xuliangzhan/vxe-table.svg?branch=master)](https://travis-ci.org/xuliangzhan/vxe-table)
[![npm downloads](https://img.shields.io/npm/dm/vxe-table.svg?style=flat-square)](http://npm-stat.com/charts.html?package=vxe-table)
[![gzip size: JS](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/index.min.js?compression=gzip&label=gzip%20size:%20JS)](https://unpkg.com/vxe-table/lib/index.min.js)
[![gzip size: CSS](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/index.css?compression=gzip&label=gzip%20size:%20CSS&color=green)](https://unpkg.com/vxe-table/lib/index.css)  
[![issues](https://img.shields.io/github/issues/xuliangzhan/vxe-table.svg)](https://github.com/xuliangzhan/vxe-table/issues)
[![issues closed](https://img.shields.io/github/issues-closed/xuliangzhan/vxe-table.svg)](https://github.com/xuliangzhan/vxe-table/issues?q=is%3Aissue+is%3Aclosed)
[![pull requests](https://img.shields.io/github/issues-pr/xuliangzhan/vxe-table.svg)](https://github.com/xuliangzhan/vxe-table/pulls)
[![pull requests closed](https://img.shields.io/github/issues-pr-closed/xuliangzhan/vxe-table.svg)](https://github.com/xuliangzhan/vxe-table/pulls?q=is%3Apr+is%3Aclosed)
[![npm license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/xuliangzhan/vxe-table/blob/master/LICENSE)

A simple and practical Vue table components, Compatible with any component library.  
一个简单实用的 Vue 表组件，与任意组件库兼容。

* Design concept 设计理念
  * 精简的 API（简洁、高效）
  * 模块化表格（功能模块解耦，支持按需加载）
  * 更加灵活的自定义配置项，更高的可扩展性（兼容任意组件库，不污染全局样式及变量）
  * 强大的功能的同时兼具性能（支持横向、纵向虚拟滚动）

* Plan 计划
  * [x] v1 100% 实现表格的一切实用的功能
  * [x] v2 &nbsp;95% 性能优化，同时兼具功能与性能
  * [ ] v3 &nbsp;&nbsp;0% 实现重构，渲染性能大幅提升，基于 Vue3 并使用 typescript 开发

🐬 如果有更好的建议、优化点或 Bug 都欢迎提 [Issues](https://github.com/xuliangzhan/vxe-table/issues)

## Browser Support

![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png)
--- | --- | --- | --- | --- | --- |
11+ ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

## Features

* [x] Basic table （基础功能）
* [x] Dynamic Grid （配置式表格）
* [x] Size （尺寸）
* [x] Striped （斑马线条纹）
* [x] Table with border （带边框）
* [x] Cell style （单元格样式）
* [x] Column resizable （列宽拖动）
* [x] Fluid-height table with fixed header （流体高度）
* [x] Resize height and width （响应式宽高）
* [x] Table with fixed header （固定表头）
* [x] Table with fixed column （固定列）
* [x] Table with fixed columns and header （固定表头和列）
* [x] Grouping table head （表头分组）
* [x] Table sequence （序号)
* [x] Highlight row and column （高亮行、列)
* [x] Radio （单选)
* [x] Checkbox （多选）
* [x] Sorting （排序）
* [x] Filter （筛选）
* [x] Rowspan and colspan （合并行或列）
* [x] Footer summary （表尾合计）
* [x] Export CSV （导出 CSV）
* [x] Show/hide columns （显示/隐藏列）
* [x] Loading （加载中）
* [x] Format content （格式化内容）
* [x] Custom column template （自定义模板）
* [x] Context menu（快捷菜单）
* [x] Virtual Scroller（虚拟滚动）
* [x] Expandable row （展开行）
* [x] Pager（分页）
* [x] Toolbar（工具栏）
* [x] Save the operational state of the column（保存列的操作状态）
* [x] Tree table （树形表格)
* [x] Editable CRUD（增删改查)
* [x] Editable validate（数据校验）
* [x] DataProxy（数据代理）
* [x] Keyboard navigation（全键盘操作）

## Modules

All modules support loading on demand.（所有的模块都支持按需加载）

* ![Table](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/table/src/table.min.js?compression=gzip&label=Table)![style](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/table/style/style.css?compression=gzip&label=style&color=green) (核心)
  * Modules （内置模块）
    * ![Cell](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/cell/src/cell.min.js?compression=gzip&label=Cell)![style](https://img.shields.io/badge/style-none-blue.svg) （单元格）
    * ![Header](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/header/src/header.min.js?compression=gzip&label=Header)![style](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/header/style/style.css?compression=gzip&label=style&color=green) （表头）
    * ![Body](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/body/src/body.min.js?compression=gzip&label=Body)![style](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/body/style/style.css?compression=gzip&label=style&color=green) （表主体）
    * ![Footer](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/footer/src/footer.min.js?compression=gzip&label=Footer)![style](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/footer/style/style.css?compression=gzip&label=style&color=green) （表尾）
    * ![Icon](https://img.shields.io/badge/Icon-none-blue.svg)![style](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/icon/style/style.css?compression=gzip&label=style&color=green) （图标）
    * ![Filter](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/filter/src/filter.min.js?compression=gzip&label=Filter)![style](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/filter/style/style.css?compression=gzip&label=style&color=green) （筛选）
    * ![Loading](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/loading/src/loading.min.js?compression=gzip&label=Loading)![style](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/loading/style/style.css?compression=gzip&label=style&color=green) （加载中）
    * ![Tooltip](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/tooltip/src/tooltip.min.js?compression=gzip&label=Tooltip)![style](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/tooltip/style/style.css?compression=gzip&label=style&color=green) （提示信息）
    * ![Menu](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/menu/src/menu.min.js?compression=gzip&label=Menu)![style](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/menu/style/style.css?compression=gzip&label=style&color=green) （快捷菜单）
    * ![Export](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/export/src/export.min.js?compression=gzip&label=Export)![style](https://img.shields.io/badge/style-none-blue.svg) （导出）
    * ![Resize](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/resize/src/resize.min.js?compression=gzip&label=Resize)![style](https://img.shields.io/badge/style-none-blue.svg) （响应式）
  * Component （增强组件）
    * ![Column](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/column/src/column.min.js?compression=gzip&label=Column)![style](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/column/style/style.css?compression=gzip&label=style&color=green) （静态列）
    * ![Grid](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/grid/src/grid.min.js?compression=gzip&label=Grid)![style](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/grid/style/style.css?compression=gzip&label=style&color=green) （动态表格）
    * ![Pager](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/pager/src/pager.min.js?compression=gzip&label=Pager)![style](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/pager/style/style.css?compression=gzip&label=style&color=green) （分页 ）
    * ![Toolbar](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/toolbar/src/toolbar.min.js?compression=gzip&label=Toolbar)![style](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/toolbar/style/style.css?compression=gzip&label=style&color=green) （工具栏）
    * ![Checkbox](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/checkbox/src/checkbox.min.js?compression=gzip&label=Checkbox)![style](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/checkbox/style/style.css?compression=gzip&label=style&color=green) （复选框）
    * ![Radio](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/radio/src/radio.min.js?compression=gzip&label=Radio) ![style](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/radio/style/style.css?compression=gzip&label=style&color=green)（单选框）
    * ![Input](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/input/src/input.min.js?compression=gzip&label=Input)![style](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/input/style/style.css?compression=gzip&label=style&color=green) （输入框）
    * ![Message](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/message/src/message.min.js?compression=gzip&label=Message)![style](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/message/style/style.css?compression=gzip&label=style&color=green) （消息提示框）
    * ![Button](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/button/src/button.min.js?compression=gzip&label=Button)![style](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/button/style/style.css?compression=gzip&label=style&color=green) （按钮）
  * Plugins（插件）
    * [![vxe-table-plugin-element](http://img.badgesize.io/https://unpkg.com/vxe-table-plugin-element/dist/index.min.js?compression=gzip&label=vxe%20table%20plugin%20element)](https://www.npmjs.org/package/vxe-table-plugin-element)![style](http://img.badgesize.io/https://unpkg.com/vxe-table-plugin-element/dist/style.min.css?compression=gzip&label=style&color=green) （[element-ui](https://www.npmjs.com/package/element-ui) 适配插件）
    * [![vxe-table-plugin-iview](http://img.badgesize.io/https://unpkg.com/vxe-table-plugin-iview/dist/index.min.js?compression=gzip&label=vxe%20table%20plugin%20iview)](https://www.npmjs.org/package/vxe-table-plugin-iview)![style](http://img.badgesize.io/https://unpkg.com/vxe-table-plugin-iview/dist/style.min.css?compression=gzip&label=style&color=green) （[iview](https://www.npmjs.com/package/iview) 适配插件）
    * [![vxe-table-plugin-antd](http://img.badgesize.io/https://unpkg.com/vxe-table-plugin-antd/dist/index.min.js?compression=gzip&label=vxe%20table%20plugin%20antd)](https://www.npmjs.org/package/vxe-table-plugin-antd)![style](http://img.badgesize.io/https://unpkg.com/vxe-table-plugin-antd/dist/style.min.css?compression=gzip&label=style&color=green) （[ant-design-vue](https://www.npmjs.com/package/ant-design-vue) 适配插件）

## Docs

[To view the example](https://xuliangzhan.github.io/vxe-table/#/table/base/basic) [查看演示](https://xuliangzhan_admin.gitee.io/vxe-table/#/table/base/basic)  
[To view the document](https://xuliangzhan.github.io/vxe-table/#/table/api) [查看文档](https://xuliangzhan_admin.gitee.io/vxe-table/#/table/api)  

## Installing

require: Vue 2.6+

```shell
npm install xe-utils vxe-table
```

Get on [unpkg](https://unpkg.com/vxe-table/) and [cdnjs](https://cdn.jsdelivr.net/npm/vxe-table/)

```HTML
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/vxe-table/lib/index.css">
<!-- 引入脚本 -->
<script src="https://unpkg.com/xe-utils"></script>
<script src="https://unpkg.com/vxe-table"></script>
```

```javascript
import Vue from 'vue'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'

Vue.use(VXETable)
```

## Import on demand

By using the [babel-plugin-import](https://www.npmjs.com/package/babel-plugin-import), you can load modules on demand and reduce the size of files. First installation, then update .babelrc or babel.config.js file  
借助插件 [babel-plugin-import](https://www.npmjs.com/package/babel-plugin-import) 可以实现按需加载模块，减少文件体积。然后在文件 .babelrc 或者 babel.config.js 中配置

```shell
npm install babel-plugin-import -D
```

```javascript
{
  "plugins": [
    [
      "import",
      {
        "libraryName": "vxe-table",
        "style": true
      }
    ]
  ]
}
```

Now you can import modules like (The minimal lib is ≈ 120KB, gzip ≈ 40KB)  
最后这样按需引入模块，就可以减小体积了（最小的包大约是 ≈ 120KB, gzip ≈ 40KB）

```javascript
import {
  VXETable,
  Icon,
  Table,
  Header,
  Body,
  Column,
  Cell,
} from 'vxe-table'
import zhCNLocat from 'vxe-table/lib/locale/lang/zh-CN'

Vue.use(Icon)
Vue.use(Table)
Vue.use(Header)
Vue.use(Body)
Vue.use(Column)
Vue.use(Cell)

// The on-demand mode is not internationalized by default and needs to be imported by itself
// 按需加载的方式默认是不带国际化的，需要自行导入
VXETable.setup({
  i18n: (key, value) => VXETable.t(zhCNLocat, key)
})
```

## Internationalization

```shell
npm install vxe-i18n
```

```javascript
import Vue from 'vue'
import VueI18n from 'vxe-i18n'
import VXETable from 'vxe-table'
import zhCNLocat from 'vxe-table/lib/locale/lang/zh_CN'
import enLocat from 'vxe-table/lib/locale/lang/en'

const messages = {
  zh_CN: {
    ...zhCNLocat
  },
  en: {
    ...enLocat
  }
}

const i18n = new VueI18n({
  locale: 'zh_CN',
  messages,
})

Vue.use(VXETable, {
  i18n: (key, value) => i18n.t(key, value)
})

new Vue({ i18n }).$mount('#app')
```

## Example

```html
<template>
  <div>
    <vxe-table :data.sync="tableData">
      <vxe-table-column type="index" title="Number" width="80"></vxe-table-column>
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
        {
          id: 10001,
          name: 'Test1',
          role: 'Developer',
          sex: 'Man',
          address: 'Address abc123'
        }
      ]
    }
  }
}
</script>
```

## Donation

If the project is very helpful to you, you can buy the author a cup of coffee.  
如果这个项目对您有帮助，请作者喝杯咖啡吧。☕

![pay](https://github.com/xuliangzhan/vxe-table/blob/master/public/donation/pay.jpg?raw=true)

## License

MIT License, 2019-present, Xu Liangzhan
