# vxe-table

[![npm version](https://img.shields.io/npm/v/vxe-table.svg?style=flat-square)](https://www.npmjs.org/package/vxe-table)
[![npm downloads](https://img.shields.io/npm/dm/vxe-table.svg?style=flat-square)](http://npm-stat.com/charts.html?package=vxe-table)
[![gzip size: JS](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/index.umd.min.js?compression=gzip&label=gzip%20size:%20JS)](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/index.umd.min.js?compression=gzip&label=gzip%20size:%20JS)
[![gzip size: CSS](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/index.css?compression=gzip&label=gzip%20size:%20CSS)](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/index.css?compression=gzip&label=gzip%20size:%20CSS)
[![npm license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/xuliangzhan/vxe-table/blob/master/LICENSE)

A very powerful Vue table component.

## Features

* 基础
* 尺寸
* 斑马线条纹
* 带边框
* 单元格样式
* 列宽拖动
* 流体高度
* 固定表头
* 固定列
* 固定表头和列
* 表头分组
* 序号
* 单选
* 多选
* 排序
* 筛选
* 合并行或列
* 表尾合计
* 导出 CSV
* 显示/隐藏列
* 加载中
* 格式化内容
* 自定义模板
* 快捷菜单
* 滚动渲染
* 展开行
* 树形表格
* 可编辑表格
* 数据校验
* 全键盘操作
* Excel 表格

## Docs

[查看演示 Example](https://xuliangzhan.github.io/vxe-table/)  
[查看文档 API](https://xuliangzhan.github.io/vxe-table/#/table/api)

## Installing

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

// 默认安装 Table,TableColumn,Grid,Excel,Pagination,Checkbox
Vue.use(VXETable)
```

## Global config

```javascript
import Vue from 'vue'
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'

Vue.use(VXETable, {
  // 默认尺寸
  size: 'small',
  // 自定义图标配置
  iconMap: {
    sortAsc: 'vxe-sort--asc-icon',
    sortDesc: 'vxe-sort--desc-icon',
    filter: 'vxe-filter--icon',
    edit: 'vxe-edit--icon'
  },
  // 优化配置项
  optimized: {
    scrollX: {
      gt: 60,
      oSize: 5,
      rSize: 16
    },
    scrollY: {
      gt: 500,
      oSize: 20,
      rSize: 80
    }
  }
})
```

## Theme

Case 1. 默认的样式

```javascript
import VXETable from 'vxe-table'
import 'vxe-table/lib/index.css'
```

Case 2. 自定义表格颜色（修改局部颜色变量）

```scss
// 引入变量
@import 'vxe-table/src/style/variable.scss';
// 局部覆盖
$vxe-font-color: #606266;
$vxe-table-header-background-color: #f8f8f9;
$vxe-table-border-color: #e8eaec;
$vxe-table-background-color: #ffffff;
// 引入样式
@import 'vxe-table/src/style/table.scss';
```

Case 3. 重写主题样式（复制 src/style/variable.scss 和 src/style/table.scss 到项目中自行修改）

## I18n

```javascript
import Vue from 'vue'
import VueI18n from 'vxe-i18n'
import VXETable from 'vxe-table'
import zhCNLocat from 'vxe-table/lib/locale/lang/zh_CN'
import enLocat from 'vxe-table/lib/locale/lang/zh_CN'

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

## Plugins

* [vxe-table-plugin-element](https://github.com/xuliangzhan/vxe-table-plugin-element) 用于集成 element-ui 简化渲染配置
* [vxe-table-plugin-iview](https://github.com/xuliangzhan/vxe-table-plugin-iview) 用于集成 iview 简化渲染配置

## Example

```html
<template>
  <div>
    <vxe-table ref="xTable" :data.sync="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
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

## License

Copyright (c) 2019-present, Xu Liangzhan