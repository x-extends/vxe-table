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

[查看文档](https://xuliangzhan.github.io/vxe-table/)  
[查看 API](https://xuliangzhan.github.io/vxe-table/#/table/api)

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

## API

### Table

```html
<vxe-table :data.sync="tableData">
  <vxe-table-column type="selection" width="60"></vxe-table-column>
  <vxe-table-column prop="name" label="Name"></vxe-table-column>
  <vxe-table-column prop="address" label="Address"></vxe-table-column>
</vxe-table>
```

#### Table Attributes 参数

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|-----|------|-----|
| data | 显示的数据 | Array | — | — |
| customs | 初始化绑定动态列 | Array | — | — |
| height | 表格的高度 | Number | — | — |
| maxHeight | 表格的最大高度 | Number | — | — |
| resizable | 是否允许拖动列宽调整大小 | Boolean | — | false |
| stripe | 是否带有斑马纹 | Boolean | — | false |
| border | 是否带有纵向边框 | Boolean | — | false |
| size | 表格的尺寸 | String | medium,small,mini | — |
| fit | 列的宽度是否自撑开 | Boolean | — | true |
| loading | 表格是否加载中 | Boolean | — | false |
| show-header | 是否显示表头 | Boolean | — | true |
| highlight-current-row | 是否要高亮当前选中行 | Boolean | — | false |
| highlight-hover-row | 鼠标移到行是否要高亮显示 | Boolean | — | false |
| row-class-name | 给行附加 className，也可以是函数 Function({seq, row, rowIndex}) | String,Function | — | — |
| cell-class-name | 给单元格附加 className，也可以是函数 Function({seq, row, rowIndex, column, columnIndex}) | String,Function | — | — |
| header-row-class-name | 给表头的行附加 className，也可以是函数 Function({headIndex}) | String,Function | — | — |
| header-cell-class-name | 给表头的单元格附加 className，也可以是函数 Function({headIndex, column, columnIndex}) | String,Function | — | — |
| footer-row-class-name | 给表尾的行附加 className，也可以是函数 Function({footIndex}) | String,Function | — | — |
| footer-cell-class-name | 给表尾的单元格附加 className，也可以是函数 Function({footIndex, column, columnIndex}) | String,Function | — | — |
| show-footer | 是否显示表尾合计 | Boolean | — | — |
| footer-method | 表尾合计的计算方法 Function({columns, data}) | Function | — | — |
| span-method | 合并行或列，该函数 Function({seq, row, rowIndex, column, columnIndex, data}) 返回计算后的值 | Object | — | { rowspan: 1, colspan: 1} |
| tooltipTheme | 列 tooltip 的主题，可选值为 dark 或 light | String | — | dark |
| show-all-overflow | 设置所有内容过长时显示为省略号（如果是固定列建议设置该值） | Boolean,String | ellipsis,title,tooltip | — |
| show-header-all-overflow | 设置表头所有内容过长时显示为省略号 | Boolean,String | ellipsis,title,tooltip | — |
| row-key | 行数据的 Key | String | — | — |
| auto-resize | 是否自动根据父容器大小调整表格宽度 | Boolean | — | false |
| auto-width | 是否自动计算列宽（如果关闭了需要手动调用 recalculate 函数） | Boolean | — | true |
| expand-config | 展开行配置项 | Object | — | [options](#expand-config-展开行配置项说明) |
| tree-config | 树形结构配置项 | Object | — | [options](#tree-config-树形结构配置项说明) |
| context-menu | 快捷菜单配置项 | Object | — | [{header, body, footer}](#context-menu-快捷菜单配置项说明配合-context-menu-link-事件使用) |
| mouse-config | 鼠标配置项 | Object | — | [options](#mouse-config-鼠标相关配置项说明) |
| Keyboard-config | 按键配置项 | Object | — | [options](#Keyboard-config-键盘相关配置项说明) |
| edit-config | 可编辑配置项 | Object | — | [options](#edit-config-可编辑配置项说明) |
| edit-rules | 校验规则配置项 | Object | — | [options](#edit-rules-校验规则配置项说明) |
| optimized | 优化配置项 | Object,Boolean | — | [options](#optimized-优化配置项说明) |

##### context-menu 快捷菜单配置项说明（配合 context-menu-link 事件使用）

| 属性 | 描述 | 类型 | 可选值 | 默认值 |
|------|------|-----|-----|-----|
| disabled | 是否禁用表格头部右键 | Boolean | — | — |
| options | 表格头部菜单配置 | Array | — | { code, name, prefixIcon, suffixIcon, disabled } |
| visibleMethod | 该函数 Function({row, rowIndex, column, columnIndex}, event) 的返回值用来决定是否允许显示右键菜单 | Function | — | — |

###### context-menu 快捷键说明

| 属性 | 描述 |
|------|------|
| Arrow Up ↑ | 移动到上一个菜单选项 |
| Arrow Down ↓ | 移动到下一个菜单选项 |
| Arrow Down → | 打开右侧的二级菜单 |
| Enter | 选中当前菜单选项 |
| Spacebar | 选中当前菜单选项 |

##### optimized 优化配置项说明

| 属性 | 描述 | 类型 | 可选值 | 默认值 |
|------|------|-----|-----|-----|
| animat | 表格动画效果开关（关闭后视觉效果更快） | Boolean | — | true |
| scrollX | 横向 X 滚动渲染配置 | Object | — | [{gt: 60, oSize: 5, rSize: 16}](#scrollXY-滚动渲染配置项说明) |
| scrollY | 纵向 Y 滚动渲染配置 | Object | — | [{gt: 500, oSize: 30, rSize: 100}](#scrollXY-滚动渲染配置项说明) |

###### scrollXY 滚动渲染配置项说明

| 属性 | 描述 | 类型 |
|------|------|-----|
| gt | 指定大于多少范围时自动启动滚动渲染 | Number |
| oSize | 超过指定阈值重新渲染 | Number |
| rSize | 每次渲染条数 | Number |
| vSize | 指定可视区域条数，默认自动计算 | Number |
| rHeight | 指定行高，默认自动计算 | Number |

##### expand-config 展开行配置项说明

| 属性 | 描述 | 类型 | 可选值 | 默认值 |
|------|------|-----|-----|-----|
| key | 行数据中的唯一主键 | String | — | — |
| expandAll | 默认展开所有行 | Boolean | — | false |
| expandRowKeys | 设置 key 数组，默认展开指定行 | Array | — | — |

##### tree-config 树形结构配置项说明

| 属性 | 描述 | 类型 | 可选值 | 默认值 |
|------|------|-----|-----|-----|
| key | 树节点数据中的唯一主键 | String | — | — |
| children | 树子节点的属性 | String | — | children |
| indent | 树节点的缩进 | Number | — | 16 |
| expandAll | 默认展开所有节点 | Boolean | — | false |
| expandRowKeys | 设置 key 数组，默认展开指定节点 | Array | — | — |

##### mouse-config 鼠标相关配置项说明

| 属性 | 描述 | 类型 | 可选值 | 默认值 |
|------|------|-----|-----|-----|
| selected | 开启左键选中功能 | Boolean | — | false |
| checked | 开启鼠标移动单元格批量选中功能 | Boolean | — | false |

##### keyboard-config 键盘相关配置项说明

| 属性 | 描述 | 类型 | 可选值 | 默认值 |
|------|------|-----|-----|-----|
| isArrow | 开启方向键功能 | Boolean | — | false |
| isTab | 开启 Tab 键功能 | Boolean | — | false |
| isCut | 开启复制粘贴功能 | Boolean | — | false |
| isEdit | 开启任意键进入编辑（功能键除外） | Boolean | — | false |
| editMethod | 只对 isEdit=true 有效，用于重写选中编辑处理逻辑，该函数 Function({seq, row, rowIndex, column, columnIndex, cell}, event) 可以返回 false 来阻止默认行为 | Function | — | — |

###### keyboard-config 快捷键说明

| 属性 | 描述 |
|------|------|
| Arrow Up ↑ | 移动到当前活动单元格上面的单元格 |
| Arrow Down ↓ | 移动到当前活动单元格下面的单元格 |
| Arrow Left ← | 移动到当前活动单元格左边的单元格 |
| Arrow Right → | 移动到当前活动单元格右边的单元格 |
| Tab | 移动到当前选中或活动单元格的右侧单元格，如果到最后一列且存在下一行，则从下一行开始移动 |
| Enter | 取消编辑并移动到当前活动单元格下面的单元格 |
| Delete | 清空内容 |
| Backspace | 清空内容并激活选中单元格为编辑状态 |
| F2 | 激活单元格编辑 |
| Esc | 取消单元格编辑 |
| Ctrl + C | 复制选中的单元格内容 |
| Ctrl + X | 剪贴选中的单元格内容 |
| Ctrl + V | 粘贴选中的单元格内容 |
| Ctrl + A | 选中所有单元格 |

##### edit-config 可编辑配置项说明

| 属性 | 描述 | 类型 | 可选值 | 默认值 |
|------|------|-----|-----|-----|
| key | 数据中的唯一主键 | String | — | — |
| trigger | 触发方式 | String | manual（手动触发方式，只能用于 mode=row）,click（点击触发编辑）,dblclick（双击触发编辑） | click |
| mode | 编辑模式 | String | cell（单元格编辑模式）,row（行编辑模式） | cell |
| showIcon | 是否显示列头编辑图标 | Boolean | — | true |
| showStatus | 是否显示单元格值的修改状态 | Boolean | — | false |
| autoClear | 当点击非编辑列之后，是否自动清除单元格的激活状态 | Boolean | — | true |

##### edit-rules 校验规则配置项说明

| 属性 | 描述 | 类型 | 可选值 | 默认值 |
|------|------|-----|-----|-----|
| required | 是否必填 | Boolean | — | — |
| min  | 校验值最小长度（如果 type=number 则比较值大小） | Number | — | — |
| max  | 校验值最大长度（如果 type=number 则比较值大小） | Number | — | — |
| type | 类型校验 | String | number,string | string |
| pattern | 正则校验 | RegExp | — | — |
| validator  | 自定义校验方法 | Function(rule, value, callback) | — | — |
| trigger  | 触发校验方式 | String | blur,change | change |

### Table-column

```html
<vxe-table-column prop="name" label="Name"></vxe-table-column>
```

#### Table-column Attributes 参数

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|-----|------|-----|
| type | 列的类型 | String | index,selection,radio,expand | — |
| prop | 列属性 | String | — | — |
| label | 列标题 | String | — | — |
| width | 列宽度 | String | — | — |
| min-width | 最小列宽度，把剩余宽度按比例分配 | String | — | — |
| fixed | 将列固定在左侧或者右侧 | String | — | left |
| align | 列对其方式 | String | — | left |
| header-align | 表头对齐方式 | String | — | — |
| show-overflow | 当内容过长时显示为省略号 | String,Boolean | ellipsis,title,tooltip | — |
| show-header-overflow | 当表头内容过长时显示为省略号 | String,Boolean | ellipsis,title,tooltip | — |
| formatter | 格式化显示内容 Function({cellValue, seq, row, rowIndex, column, columnIndex}) | Function | — | — |
| index-method | 只对 type=index 有效，自定义索引方法 Function({seq, row, rowIndex, column, columnIndex}) | Function | — | — |
| sortable | 是否允许列排序，如果是服务端排序需要设置为custom | Boolean | — | — |
| sortBy | 只对 sortable 有效，自定义排序的属性 | String,Array | — | — |
| filters | 配置筛选条件数组 | Array | — | — |
| filter-multiple | 只对 filters 有效，筛选是否允许多选 | Boolean | — | true |
| filter-method | 只对 filters 有效，自定义筛选方法 Function({value, row, column})，如果是服务端排序需要设置为custom | String,Function | — | — |
| tree-node | 指定为树节点 | Boolean | — | false |
| column-key | 列的 key | String,Number | — | — |
| edit-render | 列编辑配置项 | Object,Boolean | — | [options](#edit-render-配置项说明) |

##### edit-render 配置项说明

| 属性 | 描述 | 类型 | 可选值 | 默认值 |
|------|------|-----|-----|-----|
| type | 渲染类型 | String | default（组件触发后可视）,visible（组件一直可视） | default |
| name | 支持渲染的组件 | String | input,textarea | input |
| autofocus | 如果是自定义渲染可以指定聚焦的 class | String | — | — |

#### Table-column Scoped Slot

| name | 说明 |
|------|------|
| — | 自定义显示内容，参数为 { row, rowIndex, column, columnIndex, fixed, isHidden } |
| header | 自定义表头的内容，参数为 { column, columnIndex, fixed, isHidden } |
| edit | 自定义可编辑组件模板，参数为 { column, columnIndex, fixed, isHidden } |

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