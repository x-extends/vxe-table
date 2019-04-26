# vxe-table

A very powerful Vue table component.

## API

* [功能点](#table-表格)
  * [基础](#cell-基本列)
  * [尺寸](#cell-基本列)
  * [斑马纹](#cell-基本列)
  * [带边框](#cell-基本列)
  * 行和列样式
  * 列宽拖动
  * [固定表头](#cell-基本列)
  * [固定列](#cell-基本列)
  * [固定表头和列](#cell-基本列)
  * [表头分组](#cell-基本列)
  * [序号](#cell-基本列)
  * [单选](#cell-基本列)
  * [多选](#cell-基本列)
  * [排序](#cell-基本列)
  * [筛选](#cell-基本列)
  * 合并行或列
  * 导出 cvs
  * 右键菜单
  * [自定义列](#cell-基本列)
  * 加载中
  * 展开行
  * 树形
  * 编辑列
  * Excel 列

## Table

```html
<vxe-table :data.sync="tableData">
  <vxe-table-column type="selection" width="60"></vxe-table-column>
  <vxe-table-column prop="name" label="Name"></vxe-table-column>
  <vxe-table-column prop="address" label="Address"></vxe-table-column>
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
| select-all | 只对 type=selection 有效，当手动勾选全选时触发的事件 | selection |
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

## Table-column

```html
<vxe-table-column prop="name" label="Name"></vxe-table-column>
```

### Table-column Attributes 参数

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|-----|------|-----|
| type | 列的类型 | String | index / selection / radio | — |
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
| indexMethod | 只对 type=index 有效，自定义索引方法 Function({row, rowIndex, column, columnIndex}) | Function | — | — |
| sortable | 是否允许列排序 | Boolean | — | — |
| sortBy | 只对 sortable 有效，自定义排序的属性 | String/Array | — | — |
| filters | 配置筛选条件数组 | Array | — | — |
| filterMultiple | 只对 filters 有效，筛选是否允许多选 | Boolean | — | true |
| filterMethod | 只对 filters 有效，自定义筛选方法 | Function | — | — |

### Table-column Scoped Slot

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