# vxe-table

一个功能更加强大、高扩展性、高性能的表格组件

## API

* xe-table 功能组件
  * **column-cell 基本列**
  * **column-group 分组列**
  * **column-index 索引列**
  * **column-radio 单选列**
  * **column-checkbox 多选列**
  * column-sort 排序列
  * column-filter 筛选列
  * column-expand 展开列
  * column-tree 树形列
  * column-edit 编辑列
  * column-excel Excel 列

## Table 表格

### xe-table Attributes

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
| *highlight-hover-row* | 鼠标移到行是否要高亮显示（如果关闭会更流畅） | Boolean | — | true |
| *row-key* | 行数据的 Key | String | — | — |
| *auto-width* | 列宽是否自动计算（如果关闭将不会自动计算列宽，需要手动调用 computeWidth 方法） | Boolean | — | true |

### xe-table Events

| 事件名 | 说明 | 参数 |
|------|------|-----|
| select-all | 当手动勾选全选 Checkbox 时触发的事件 | selection |
| cell-click | 当某个单元格被点击时会触发该事件 | {row,rowIndex,column,columnIndex,cell},event |
| cell-dblclick | 当某个单元格被双击时会触发该事件 | {row,rowIndex,column,columnIndex,cell},event |

### xe-table Methods

| 方法名 | 描述 | 参数 |
|------|------|-----|
| reload | 初始化数据 | data |

## Cell 基本列

### xe-column-cell Attributes

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
| indexMethod | 只对 type=index 有效，自定义索引方法 Function({row, rowIndex, column, columnIndex}) | Function | — | — |

## Group 分组列

### xe-column-group Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|-----|------|-----|
| label | 分组列标题 | String | — | — |

## Index 索引列

## xe-column-index Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|-----|------|-----|
| label | 列标题 | String | — | # |
| width | 列宽度 | String | — | — |
| minWidth | 最小列宽度，把剩余宽度按比例分配 | String | — | — |
| fixed | 将列固定在左侧或者右侧 | String | — | left |
| align | 列对其方式 | String | — | left |
| header-align | 表头对齐方式 | String | — | — |
| indexMethod | 只对 type=index 有效，自定义索引方法 Function({row, rowIndex, column, columnIndex}) | Function | — | — |

## Radio 单选列

### xe-column-radio Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|-----|------|-----|
| label | 列标题 | String | — | — |
| width | 列宽度 | String | — | — |
| minWidth | 最小列宽度，把剩余宽度按比例分配 | String | — | — |
| fixed | 将列固定在左侧或者右侧 | String | — | left |
| align | 列对其方式 | String | — | center |
| header-align | 表头对齐方式 | String | — | center |

### xe-column-radio Events

| 事件名 | 说明 | 参数 |
|------|------|-----|
| change | 当选择项发生变化时会触发该事件 | row |

## Checkbox 多选列

## xe-column-checkbox Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|-----|------|-----|
| prop | 列属性（如果设置了则会绑定双向同步）| String | — | — |
| width | 列宽度 | String | — | — |
| minWidth | 最小列宽度，把剩余宽度按比例分配 | String | — | — |
| fixed | 将列固定在左侧或者右侧 | String | — | left |
| align | 列对其方式 | String | — | center |
| header-align | 表头对齐方式 | String | — | center |

### xe-column-checkbox Events

| 事件名 | 说明 | 参数 |
|------|------|-----|
| change | 当选择项发生变化时会触发该事件 | selection, row |

## Sort 排序列

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|-----|------|-----|

## Filter 筛选列

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|-----|------|-----|

## Expand 展开列

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|-----|------|-----|

## Edit 编辑列

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|-----|------|-----|

## Tree 树形列

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|-----|------|-----|
