# vxe-table

[![star](https://gitee.com/x-extends/vxe-table/badge/star.svg?theme=gvp)](https://gitee.com/x-extends/vxe-table/stargazers)
[![npm version](https://img.shields.io/npm/v/vxe-table.svg?style=flat-square)](https://www.npmjs.com/package/vxe-table)
[![NodeJS with Webpack](https://github.com/x-extends/vxe-table/actions/workflows/webpack.yml/badge.svg)](https://github.com/x-extends/vxe-table/actions/workflows/webpack.yml)
[![npm downloads](https://img.shields.io/npm/dt/vxe-table.svg?style=flat-square)](https://npm-stat.com/charts.html?package=vxe-table)
[![issues](https://img.shields.io/github/issues/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/issues)
[![issues closed](https://img.shields.io/github/issues-closed/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/issues?q=is%3Aissue+is%3Aclosed)
[![pull requests](https://img.shields.io/github/issues-pr/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/pulls)
[![pull requests closed](https://img.shields.io/github/issues-pr-closed/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/pulls?q=is%3Apr+is%3Aclosed)
[![npm license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)

一个基于 [vue](https://www.npmjs.com/package/vue) 的 PC 端表单/表格组件，支持增删改查、虚拟树、拖拽排序、懒加载、快捷菜单、数据校验、导入/导出/打印、表单渲染、自定义模板、渲染器、JSON 配置式...  

## 浏览器支持

![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
80+ ✔ | 80+ ✔ | 90+ ✔ | 75+ ✔ | 10+ ✔ |

## 功能点

* [x] 基础表格
* [x] 配置式表格
* [x] 斑马线条纹
* [x] 多种边框
* [x] 单元格样式
* [x] 列宽拖动
* [x] 列拖拽排序
* [x] 行拖拽排序
* [x] 最小/最大高度
* [x] 自适应宽高
* [x] 固定列
* [x] 多级表头
* [x] 表尾数据
* [x] 高亮行或列
* [x] 序号
* [x] 单选框
* [x] 复选框
* [x] 排序
* [x] 多字段排序
* [x] 筛选
* [x] 合并单元格
* [x] 合并表尾
* [x] 导入/导出/打印
* [x] 显示/隐藏列
* [x] 拖拽/自定义列排序
* [x] 加载中
* [x] 格式化内容
* [x] 自定义插槽 - 模板
* [x] 快捷菜单
* [x] 展开行
* [x] 工具栏
* [x] 虚拟树
* [x] 增删改查
* [x] 数据校验
* [x] 数据代理
* [x] 键盘导航
* [x] 渲染器
* [x] 虚拟滚动
* [x] 虚拟合并
* [x] CSS 变量主题
* [x] ([企业版](https://vxetable.cn/pluginDocs/)) 单元格区域选取
* [x] ([企业版](https://vxetable.cn/pluginDocs/)) 单元格复制/粘贴
* [x] ([企业版](https://vxetable.cn/pluginDocs/)) 单元格查找和替换
* [x] ([企业版](https://vxetable.cn/pluginDocs/)) 全键盘操作
* [x] ([企业版](https://vxetable.cn/pluginDocs/)) 集成图表

## 安装

版本：[vue](https://www.npmjs.com/package/vue) 2.x

```shell
npm install vxe-table@3
```

Get on [unpkg](https://unpkg.com/vxe-table/) and [cdnjs](https://cdn.jsdelivr.net/npm/vxe-table/)

### NPM

```shell
npm install vxe-table@3 vxe-pc-ui@3
```

### 只使用表格

```javascript
import Vue from 'vue'
// ...
import VxeTable from 'vxe-table'
import 'vxe-table/lib/style.css'
// ...

Vue.use(VxeTable)
```

### 使用表格与 UI 库

```javascript
import Vue from 'vue'
// ...
import VxeTable from 'vxe-table'
import 'vxe-table/lib/style.css'
// ...

import VxeUI from 'vxe-pc-ui'
import 'vxe-pc-ui/lib/style.css'
// ...

Vue.use(VxeUI)
Vue.use(VxeTable)
```

### CDN

使用第三方 CDN 方式记得锁定版本号，避免受到非兼容性更新的影响  
***不建议将第三方的 CDN 地址用于正式环境，因为该连接随时都可能会失效***  

```HTML
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <!-- style -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vxe-pc-ui@3/lib/style.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/vxe-table@3/lib/style.css">
  <!-- vue -->
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script>
  <!-- table -->
  <script src="https://cdn.jsdelivr.net/npm/xe-utils"></script>
  <script src="https://cdn.jsdelivr.net/npm/vxe-pc-ui@3"></script>
  <script src="https://cdn.jsdelivr.net/npm/vxe-table@3"></script>
</head>
<body>
  <div id="app">
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
  </div>
  <script>
    (function () {
      var App = {
        data() {
          return {
            tableData: [
              { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', address: 'Shenzhen' },
              { id: 10002, name: 'Test2', role: 'Test', sex: 'Man', address: 'Guangzhou' },
              { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', address: 'Shanghai' }
            ]
          }
        }
      }
      new Vue(App).$mount('#app')
    })()
  </script>
</body>
</html>
```

## 示例

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

<script>
export default {
  data() {
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

## 在线文档

👉 [组件文档](https://vxeui.com)  
👉 [表格文档](https://vxetable.cn)  

## Contributors

Thank you to everyone who contributed to this project.

[![vxe-table](https://contrib.rocks/image?repo=x-extends/vxe-table)](https://github.com/x-extends/vxe-table/graphs/contributors)

## License

[MIT](LICENSE) © 2019-present, Xu Liangzhan
