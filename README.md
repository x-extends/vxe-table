# vxe-table

[![github star](https://img.shields.io/github/stars/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/stargazers)
[![npm version](https://img.shields.io/npm/v/vxe-table.svg?style=flat-square)](https://www.npmjs.com/package/vxe-table)
[![NodeJS with Webpack](https://github.com/x-extends/vxe-table/actions/workflows/webpack.yml/badge.svg)](https://github.com/x-extends/vxe-table/actions/workflows/webpack.yml)
[![npm downloads](https://img.shields.io/npm/dt/vxe-table.svg?style=flat-square)](https://npm-stat.com/charts.html?package=vxe-table)
[![issues](https://img.shields.io/github/issues/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/issues)
[![issues closed](https://img.shields.io/github/issues-closed/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/issues?q=is%3Aissue+is%3Aclosed)
[![pull requests](https://img.shields.io/github/issues-pr/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/pulls)
[![pull requests closed](https://img.shields.io/github/issues-pr-closed/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/pulls?q=is%3Apr+is%3Aclosed)
[![npm license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)

一个基于 [Vxe UI](https://github.com/x-extends/vxe-pc-ui) 的 PC 端表格组件，支持增删改查的可编辑表格，支持 Excel 复制粘贴、数据透视表、虚拟列表高性能的表格解决方案

## 浏览器支持

![Edge](https://raw.github.com/alrra/browser-logos/master/src/edge/edge_48x48.png) | ![Chrome](https://raw.github.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/src/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/src/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
80+ ✔ | 80+ ✔ | 90+ ✔ | 75+ ✔ | 10+ ✔ |

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

## Contributors

Thank you to everyone who contributed to this project.

[![vxe-table](https://contrib.rocks/image?repo=x-extends/vxe-table)](https://github.com/x-extends/vxe-table/graphs/contributors)

## License

[MIT](LICENSE) © 2019-present, Xu Liangzhan
