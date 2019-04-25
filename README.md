# vxe-table

A very powerful Vue table component.

## Docs

[https://xuliangzhan.github.io/vxe-table/](https://xuliangzhan.github.io/vxe-table/)

## API

* [vxe-table 功能组件](#table-表格)
  * [column-cell 基本列](#cell-基本列)
  * [column-group 分组列](#group-分组列)
  * [column-index 索引列](#index-索引列)
  * [column-radio 单选列](#radio-单选列)
  * [column-checkbox 多选列](#checkbox-多选列)
  * column-expand 展开列
  * column-tree 树形列
  * column-edit 编辑列
  * column-excel Excel 列

## Table 表格

```html
<vxe-table :data.sync="tableData">
  <vxe-column-checkbox width="60"></vxe-column-checkbox>
  <vxe-column-cell prop="name" label="Name"></vxe-column-cell>
  <vxe-column-cell prop="address" label="Address"></vxe-column-cell>
</vxe-table>
```

### Table Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|-----|------|-----|
| data | 显示的数据 | Array | — | — |
| customs | 初始化绑定动态列 | Array | — | — |
| height | 初始化完整表格数据 | String | — | — |
| stripe | 是否带有斑马纹 | Boolean | — | false |
| border | 是否带有纵向边框 | Boolean | — | false |
| size | 表格的尺寸 | String | — | — |
| fit | 列的宽度是否自撑开 | Boolean | — | true |
| loading | 表格是否加载中 | Boolean | — | false |
| show-header | 是否显示表头 | Boolean | — | true |
| highlight-current-row | 是否要高亮当前选中行 | Boolean | — | false |
| highlight-hover-row | 鼠标移到行是否要高亮显示 | Boolean | — | true |
| row-key | 行数据的 Key | String | — | — |
| auto-width | 列宽是否自动计算（如果关闭将不会自动计算列宽） | Boolean | — | true |

### Table Events

| 事件名 | 说明 | 参数 |
|------|------|-----|
| select-all | 当手动勾选全选 Checkbox 时触发的事件 | selection |
| cell-click | 当某个单元格被点击时会触发该事件 | {row,rowIndex,column,columnIndex,cell},event |
| cell-dblclick | 当某个单元格被双击时会触发该事件 | {row,rowIndex,column,columnIndex,cell},event |

### Table Methods

| 方法名 | 描述 | 参数 |
|------|------|-----|
| reload | 初始化数据 | data |
| clearSelection | 用于多选表格，清空用户的选择 | — |
| clearSelectRow | 用于单选表格，清空用户的选择 | — |
| clearSort | 用于清空排序条件，数据会恢复成未排序的状态 | — |
| computeWidth | 重新计算并更新列宽 | — |

## Cell 基本列

```html
<vxe-column-cell prop="name" label="Name"></vxe-column-cell>
```

### Cell Attributes 参数

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|-----|------|-----|
| prop | 列属性 | String | — | — |
| label | 列标题 | String | — | — |
| width | 列宽度 | String | — | — |
| minWidth | 最小列宽度，把剩余宽度按比例分配 | String | — | — |
| fixed | 将列固定在左侧或者右侧 | String | — | left |
| align | 列对其方式 | String | — | left |
| header-align | 表头对齐方式 | String | — | — |
| ellipsis | 当内容过长时显示为省略号 | Boolean | — | false |
| show-overflow-title | 当内容过长显示为省略号并用原生的 title 显示完整内容 | Boolean | — | false |
| show-overflow-tooltip | 当内容过长显示为省略号并用 tooltip 显示完整内容 | Boolean | — | false |
| formatter | 格式化显示内容 Function({cellValue, row, rowIndex, column, columnIndex}) | Function | — | — |
| sortBy | 自定义排序的属性 | String/Array | — | — |
| filters | 配置筛选条件数组 | Array | — | — |
| filterMultiple | 筛选是否允许多选 | Boolean | — | true |
| filterMethod | 自定义筛选方法 | Function | — | — |

### Cell Scoped Slot

| name | 说明 |
|------|------|
| — | 自定义显示内容，参数为 { row, rowIndex, column, columnIndex } |
| header | 自定义表头的内容，参数为 { column, columnIndex } |

## Group 分组列

```html
<vxe-column-group label="Group name">
  <vxe-column-cell prop="name" label="Name"></vxe-column-cell>
  <vxe-column-cell prop="address" label="Address"></vxe-column-cell>
</vxe-column-group>
```

### Group Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|-----|------|-----|
| label | 分组列标题 | String | — | — |

### Group Scoped Slot

| name | 说明 |
|------|------|
| header | 自定义表头的内容，参数为 { column, columnIndex } |

## Index 索引列

```html
<vxe-column-index width="60"></vxe-column-index>
```

### Index Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|-----|------|-----|
| label | 列标题 | String | — | # |
| width | 列宽度 | String | — | — |
| minWidth | 最小列宽度，把剩余宽度按比例分配 | String | — | — |
| fixed | 将列固定在左侧或者右侧 | String | — | left |
| align | 列对其方式 | String | — | left |
| header-align | 表头对齐方式 | String | — | — |
| indexMethod | 只对 type=index 有效，自定义索引方法 Function({row, rowIndex, column, columnIndex}) | Function | — | — |

### Index Scoped Slot

| name | 说明 |
|------|------|
| — | 自定义显示内容，参数为 { row, rowIndex, column, columnIndex } |
| header | 自定义表头的内容，参数为 { column, columnIndex } |

## Radio 单选列

```html
<vxe-column-radio width="60"></vxe-column-radio>
```

### Radio Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|-----|------|-----|
| label | 列标题 | String | — | — |
| width | 列宽度 | String | — | — |
| minWidth | 最小列宽度，把剩余宽度按比例分配 | String | — | — |
| fixed | 将列固定在左侧或者右侧 | String | — | left |
| align | 列对其方式 | String | — | center |
| header-align | 表头对齐方式 | String | — | center |

### Events 事件

| 事件名 | 说明 | 参数 |
|------|------|-----|
| change | 当选择项发生变化时会触发该事件 | row |

## Checkbox 多选列

```html
<vxe-column-checkbox width="60"></vxe-column-checkbox>
```

## Checkbox Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|-----|------|-----|
| prop | 列属性（如果设置了则会绑定双向同步）| String | — | — |
| width | 列宽度 | String | — | — |
| minWidth | 最小列宽度，把剩余宽度按比例分配 | String | — | — |
| fixed | 将列固定在左侧或者右侧 | String | — | left |
| align | 列对其方式 | String | — | center |
| header-align | 表头对齐方式 | String | — | center |

### Checkbox Events

| 事件名 | 说明 | 参数 |
|------|------|-----|
| change | 当选择项发生变化时会触发该事件 | selection, row |

## Example

```html
<template>
  <div>
    <vxe-table :data.sync="tableData">
      <vxe-column-checkbox width="60"></vxe-column-checkbox>
      <vxe-column-cell prop="name" label="Name"></vxe-column-cell>
      <vxe-column-cell prop="sex" label="Sex"></vxe-column-cell>
      <vxe-column-cell prop="address" label="Address"></vxe-column-cell>
    </vxe-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        date: 1551322088449,
        name: 'Xu Liangzhan',
        sex: 'Man',
        address: 'Address'
      }]
    }
  }
}
</script>
```

## License

Copyright (c) 2017-present, Xu Liangzhan