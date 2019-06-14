# vxe-table

[![npm version](https://img.shields.io/npm/v/vxe-table.svg?style=flat-square)](https://www.npmjs.org/package/vxe-table)
[![npm downloads](https://img.shields.io/npm/dm/vxe-table.svg?style=flat-square)](http://npm-stat.com/charts.html?package=vxe-table)
[![gzip size: JS](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/index.umd.min.js?compression=gzip&label=gzip%20size:%20JS)](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/index.min.js?compression=gzip&label=gzip%20size:%20JS)
[![gzip size: CSS](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/index.css?compression=gzip&label=gzip%20size:%20CSS)](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/index.css?compression=gzip&label=gzip%20size:%20CSS)
[![npm license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/xuliangzhan/vxe-table/blob/master/LICENSE)

A powerful, flexible, configurable, extensible Vue Table component.

* vxe-table 的设计理念
  * 精简的 API（简洁、高效、通用）
  * 模块化表格（功能模块拆分，全部都可以按需加载）
  * 更加灵活的自定义配置项，更高的可扩展性（兼容任意组件库，不污染全局样式及变量）
  * 强大的功能的同时兼具性能（支持虚拟滚动渲染）

😉 如果有更好的建议、优化点或 Bug 都欢迎提 [Issues](https://github.com/xuliangzhan/vxe-table/issues)

## Browser Support

![IE](https://raw.github.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) | ![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png)
--- | --- | --- | --- | --- | --- |
11+ ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 8+ ✔ |

## Features

* Basics table （基础）
* Size （尺寸）
* Striped （斑马线条纹）
* Table with border （带边框）
* Cell style （单元格样式）
* Column resizable （列宽拖动）
* Fluid-height table with fixed header （流体高度）
* Resize height and width （响应式宽高）
* Table with fixed header （固定表头）
* Table with fixed column （固定列）
* Table with fixed columns and header （固定表头和列）
* Grouping table head （表头分组）
* Table sequence （序号)
* Radio （单选)
* Checkbox （多选）
* Sorting （排序）
* Filter （筛选）
* Rowspan and colspan （合并行或列）
* Footer summary （表尾合计）
* Export CSV （导出 CSV）
* Show/hide columns （显示/隐藏列）
* Loading （加载中）
* Format content （格式化内容）
* Custom column template （自定义模板）
* Context menu（快捷菜单）
* Virtual Scroller（虚拟滚动）
* Expandable row （展开行）
* Pager（分页）
* Toolbar（工具栏）
* Tree table （树形表格)
* Editable CRUD（增删改查)
* Editable validate（数据校验）
* DataProxy（数据代理）
* Keyboard navigation（全键盘操作）
* Excel（Excel 表格）

## Modules

All modules are allowed to load on demand. （所有模块都允许按需加载）

* table (主要核心)
  * components （高级组件）
    * gird （扩展）
    * excel （Excel）
  * modules （功能模块）
    * table-column （列与单元格）
    * table-header （表头）
    * table-body （表内容）
    * table-footer （表尾）
    * table-filter （筛选）
    * context-menu （快捷菜单）
    * pager （分页 ）
    * toolbar （工具栏）
  * more （更多功能）
    * checkbox （复选框）
    * radio （单选框）
    * input （输入框）
    * message-box （消息提示框）
    * button （按钮）
  * plugins（适配插件）
    * [vxe-table-plugin-element](https://www.npmjs.com/package/vxe-table-plugin-element) For integration [element-ui](https://www.npmjs.com/package/element-ui) components.
    * [vxe-table-plugin-iview](https://www.npmjs.com/package/vxe-table-plugin-iview) For integration [iview](https://www.npmjs.com/package/iview) components.
    * [vxe-table-plugin-antd](https://www.npmjs.com/package/vxe-table-plugin-antd) For integration [ant-design-vue](https://www.npmjs.com/package/ant-design-vue) components.

## Docs

[To view the example](https://xuliangzhan.github.io/vxe-table/) [查看演示](https://xuliangzhan_admin.gitee.io/vxe-table/)  
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

Vue.use(VXETable, {
  size: 'small',
  tooltipConfig: {
    zIndex: 3000
  }
})
```

## On demand （按需引入）

借助插件 [babel-plugin-import](https://www.npmjs.com/package/babel-plugin-import) 可以实现按需加载组件，减少文件体积。然后在文件 .babelrc 中配置

```javascript
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

最后这样按需引入组件，就可以减小体积了

```javascript
import {
  VXETable,
  Table,
  TableColumn,
  TableHeader,
  TableBody
} from 'vxe-table'
import zhCNLocat from 'vxe-table/lib/locale/lang/zh-CN'

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(TableHeader)
Vue.use(TableBody)

// 按需加载的方式默认是不带国际化的，需要自行导入
VXETable.setup({
  i18n: (key, value) => VXETable.t(zhCNLocat, key)
})
```

## Theme

Case 1. Use the default theme style.  
使用默认的主题样式

```javascript
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
```

Case 2. Modify the table theme color.  
修改表格主题颜色

```scss
// 引入变量
@import 'vxe-table/src/style/variable.scss';
// 局部覆盖
$vxe-font-color: #606266;
$vxe-table-header-background-color: #f8f8f9;
$vxe-table-border-color: #e8eaec;
$vxe-table-background-color: #ffffff;
// 引入样式
@import 'vxe-table/src/style/default.scss';
```

Case 3. If you need to completely rewrite the theme style, Copy the vxe-table/src/style directory into the project and modify it yourself.  
如果需要完全重写主题样式，只需复制 vxe-table/src/style 目录到项目中自行修改就行（例如复制到 /assets）

```scss
@import 'assets/style/index.scss';
```

## I18n

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
    <vxe-table ref="xTable" :data.sync="tableData">
      <vxe-table-column type="index" label="Number" width="80"></vxe-table-column>
      <vxe-table-column prop="name" label="Name"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="address" label="Address"></vxe-table-column>
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
          name: 'test1',
          role: 'developer',
          sex: 'Man',
          address: 'address abc123'
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

Copyright (c) 2019-present, Xu Liangzhan
