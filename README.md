# vxe-table

[![npm version](https://img.shields.io/npm/v/vxe-table.svg?style=flat-square)](https://www.npmjs.org/package/vxe-table)
[![npm downloads](https://img.shields.io/npm/dm/vxe-table.svg?style=flat-square)](http://npm-stat.com/charts.html?package=vxe-table)
[![gzip size: JS](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/index.umd.min.js?compression=gzip&label=gzip%20size:%20JS)](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/index.umd.min.js?compression=gzip&label=gzip%20size:%20JS)
[![gzip size: CSS](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/index.css?compression=gzip&label=gzip%20size:%20CSS)](http://img.badgesize.io/https://unpkg.com/vxe-table/lib/index.css?compression=gzip&label=gzip%20size:%20CSS)
[![npm license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/xuliangzhan/vxe-table/blob/master/LICENSE)

A very powerful Vue table component.

## Features

* [vxe-table 功能点](#table-表格)
  * [基础](https://jsrun.net/VrXKp/play)
  * [尺寸](https://jsrun.net/PmXKp/play)
  * [斑马线条纹](https://jsrun.net/zrXKp/play)
  * [带边框](https://jsrun.net/QrXKp/play)
  * [单元格样式](https://jsrun.net/EmXKp/play)
  * 列宽拖动
  * 流体高度
  * [固定表头](https://jsrun.net/JrXKp/play)
  * [固定列](https://jsrun.net/TrXKp/play)
  * [固定表头和列](https://jsrun.net/8rXKp/play)
  * [表头分组](https://jsrun.net/7rXKp/play)
  * [序号](https://jsrun.net/xrXKp/play)
  * [单选](https://jsrun.net/9rXKp/play)
  * [多选](https://jsrun.net/erXKp/play)
  * [排序](https://jsrun.net/QrXKp/play)
  * [筛选](https://jsrun.net/drXKp/play)
  * 合并行或列
  * 表尾汇总
  * 导出 CVS
  * 快捷菜单
  * [自定义列](https://jsrun.net/PrXKp/play)
  * 加载中
  * 展开行
  * 滚动渲染
  * [自定义模板与格式化内容](https://jsrun.net/FrXKp/play)
  * 树形
  * 可编辑
  * 可编辑 - 增/删/改/查/还原
  * 可编辑 - 校验
  * 可编辑 - 键盘导航
  * 可编辑 - Excel

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

// Case 1. 引入默认的样式
import 'vxe-table/lib/index.css'

// Case 2. 自定义表格颜色（复制 style/variable.scss 到自己的项目中，修改颜色变量，然后引入）
// @import 'assets/style/vxe-table/variable.scss';
// @import 'vxe-table/style/table.scss';

// Case 3. 重写主题样式（复制 style/table.scss 到项目中自行修改）
// @import 'assets/style/vxe-table/variable.scss';
// @import 'assets/style/vxe-table/table.scss';

Vue.use(VXETable)
```

## API

### Table

```html
<vxe-table :data.sync="tableData">
  <vxe-table-column type="selection" width="60"></vxe-table-column>
  <vxe-table-column prop="name" label="Name"></vxe-table-column>
  <vxe-table-column prop="address" label="Address"></vxe-table-column>
</vxe-table>
```

#### Table Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|-----|------|-----|
| data | 显示的数据 | Array | — | — |
| customs | 初始化绑定动态列 | Array | — | — |
| height | 初始化完整表格数据 | String | — | — |
| stripe | 是否带有斑马纹 | Boolean | — | false |
| border | 是否带有纵向边框 | Boolean | — | false |
| size | 表格的尺寸 | String | medium / small / mini | — |
| fit | 列的宽度是否自撑开 | Boolean | — | true |
| loading | 表格是否加载中 | Boolean | — | false |
| show-header | 是否显示表头 | Boolean | — | true |
| highlight-current-row | 是否要高亮当前选中行 | Boolean | — | false |
| highlight-hover-row | 鼠标移到行是否要高亮显示 | Boolean | — | true |
| row-class-name | 给行附加 className，也可以是函数 Function({row, rowIndex}) | String/Function | — | — |
| cell-class-name | 给单元格附加 className，也可以是函数 Function({row, rowIndex, column, columnIndex}) | String/Function | — | — |
| header-row-class-name | 给表头的行附加 className，也可以是函数 Function({row, rowIndex}) | String/Function | — | — |
| header-cell-class-name | 给表头的单元格附加 className，也可以是函数 Function({row, rowIndex, column, columnIndex}) | String/Function | — | — |
| row-key | 行数据的 Key | String | — | — |
| auto-width | 自动计算列宽（如果关闭，需要手动调用 computeWidth 方法） | Boolean | — | true |
| optimized | 性能优化的配置项 | Object/Boolean | — | {animat: true, overflow: 'title'} |

#### Table Events

| 事件名 | 说明 | 参数 |
|------|------|-----|
| select-all | 只对 type=selection 有效，当手动勾选全选时触发的事件 | selection,checked |
| select-change | 只对 type=selection/radio 有效，当手动勾选时触发的事件 | row,selection,checked |
| cell-click | 当某个单元格被点击时会触发该事件 | {row,rowIndex,column,columnIndex,cell},event |
| cell-dblclick | 当某个单元格被双击时会触发该事件 | {row,rowIndex,column,columnIndex,cell},event |

#### Table Methods

| 方法名 | 描述 | 参数 |
|------|------|-----|
| reload | 初始化数据 | data |
| clearSelection | 用于多选表格，清空用户的选择 | — |
| clearSelectRow | 用于单选表格，清空用户的选择 | — |
| clearSort | 用于清空排序条件，数据会恢复成未排序的状态 | — |
| clearFilter | 用于清空筛选条件，数据会恢复成未筛选的状态 | — |
| computeWidth | 重新计算并更新列宽 | — |

### Table-column

```html
<vxe-table-column prop="name" label="Name"></vxe-table-column>
```

#### Table-column Attributes 参数

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|-----|------|-----|
| type | 列的类型 | String | index / selection / radio | — |
| prop | 列属性 | String | — | — |
| label | 列标题 | String | — | — |
| width | 列宽度 | String | — | — |
| min-width | 最小列宽度，把剩余宽度按比例分配 | String | — | — |
| fixed | 将列固定在左侧或者右侧 | String | — | left |
| align | 列对其方式 | String | — | left |
| header-align | 表头对齐方式 | String | — | — |
| ellipsis | 当内容过长时显示为省略号 | Boolean | — | false |
| show-overflow-title | 当内容过长显示为省略号并用原生的 title 显示完整内容 | Boolean | — | false |
| show-overflow-tooltip | 当内容过长显示为省略号并用 tooltip 显示完整内容 | Boolean | — | false |
| formatter | 格式化显示内容 Function({cellValue, row, rowIndex, column, columnIndex}) | Function | — | — |
| index-method | 只对 type=index 有效，自定义索引方法 Function({row, rowIndex, column, columnIndex}) | Function | — | — |
| sortable | 是否允许列排序 | Boolean | — | — |
| sortBy | 只对 sortable 有效，自定义排序的属性 | String/Array | — | — |
| filters | 配置筛选条件数组 | Array | — | — |
| filter-multiple | 只对 filters 有效，筛选是否允许多选 | Boolean | — | true |
| filter-method | 只对 filters 有效，自定义筛选方法 Function({value, row, column}) | Function | — | — |
| column-key | 列的 key | [String, Number] | — | — |

#### Table-column Scoped Slot

| name | 说明 |
|------|------|
| — | 自定义显示内容，参数为 { row, rowIndex, column, columnIndex } |
| header | 自定义表头的内容，参数为 { column, columnIndex } |

## Example

```html
<template>
  <div>
    <vxe-table :data.sync="tableData">
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
          checked: false,
          name: 'test1',
          role: 'developer',
          sex: 'Man',
          date: '2019-05-01',
          time: 1556677810888,
          region: 'ShenZhen',
          address: 'address abc123'
        }
      ]
    }
  }
}
</script>
```

## License

Copyright (c) 2017-present, Xu Liangzhan