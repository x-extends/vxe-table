# vxe-table-cz

该项目fork自vxe-table，在此基础上修复了一些bug。  
vxe-table原仓库：https://github.com/x-extends/vxe-table.git  
vxe-table-cz仓库：https://github.com/WHIPLASHCZ/vxe-table-fix-checkbox

简体中文 | [繁體中文](README.zh-TW.md) | [English](README.en.md)  

[![star](https://gitee.com/xuliangzhan_admin/vxe-table/badge/star.svg?theme=gvp)](https://gitee.com/xuliangzhan_admin/vxe-table/stargazers)
[![npm version](https://img.shields.io/npm/v/vxe-table.svg?style=flat-square)](https://www.npmjs.com/package/vxe-table)
[![npm build](https://app.travis-ci.com/x-extends/vxe-table.svg?branch=master)](https://app.travis-ci.com/x-extends/vxe-table)
[![npm downloads](https://img.shields.io/npm/dt/vxe-table.svg?style=flat-square)](https://npm-stat.com/charts.html?package=vxe-table)
[![issues](https://img.shields.io/github/issues/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/issues)
[![issues closed](https://img.shields.io/github/issues-closed/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/issues?q=is%3Aissue+is%3Aclosed)
[![pull requests](https://img.shields.io/github/issues-pr/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/pulls)
[![pull requests closed](https://img.shields.io/github/issues-pr-closed/x-extends/vxe-table.svg)](https://github.com/x-extends/vxe-table/pulls?q=is%3Apr+is%3Aclosed)
[![npm license](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)

一个基于 [vue](https://www.npmjs.com/package/vue) 的 PC 端表单/表格组件，支持增删改查、虚拟树、列拖拽、懒加载、快捷菜单、数据校验、导入/导出/打印、表单渲染、自定义模板、渲染器、JSON 配置式...  

* 设计理念
  * 面向现代浏览器，高效的简洁 API 设计
  * 模块化表格、按需加载
  * 为单行编辑表格而设计，支持增删改查及更多扩展，强大的功能的同时兼具性能

* 计划
  * [x] ~~v1.0 基于 vue2.6，支持所有主流的浏览器，实现表格的一切实用的功能~~
  * [x] ~~v2.0 基于 vue2.6，支持所有主流的浏览器，同时兼具功能与性能~~
  * [x] v3.0 基于 vue2.6+，支持现代浏览器并保留兼容 IE11
  * [ ] v3.9 基于 vue2.6+，重构拆分组件，分为 [Vxe table](https://github.com/x-extends/vxe-table) 和 [Vxe UI](https://github.com/x-extends/vxe-pc-ui)，将支持表单设计器、列表你设计器、流程设计器
  * [x] v4.0 基于 vue3.2+，只支持现代浏览器，不支持 IE
  * [x] v4.7 基于 vue3.2+，重构拆分组件，分为 [Vxe table](https://github.com/x-extends/vxe-table) 和 [Vxe UI](https://github.com/x-extends/vxe-pc-ui)，将支持表单设计器、列表你设计器、流程设计器
  * [ ] 下一阶段：sticky 渲染模式、将虚拟滚动提升到极致、虚拟滚动动态行高、数据图表可视化

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

## 安装

版本：[vue](https://www.npmjs.com/package/vue) 3.x

安装vxe-table-cz：
```shell
npm install vxe-table-cz
```

安装原生vxe-table：
```shell
npm install vxe-table
```

Get on [unpkg](https://unpkg.com/vxe-table/) and [cdnjs](https://cdn.jsdelivr.net/npm/vxe-table/)

### npm

```javascript
import { createApp } from 'vue'
import VxeUITable from 'vxe-table'
import 'vxe-table/lib/style.css'

createApp(App).use(VxeUITable).mount('#app')
```

### CDN

使用第三方 CDN 方式记得锁定版本号，避免受到非兼容性更新的影响  
***不建议将第三方的 CDN 地址用于正式环境，因为该连接随时都可能会失效***  

```HTML
<!-- 引入样式 -->
<link rel="stylesheet" href="https://unpkg.com/vxe-table/lib/style.css">
<!-- 引入脚本 -->
<script src="https://unpkg.com/xe-utils"></script>
<script src="https://unpkg.com/vxe-table"></script>
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

<script lang="ts" setup>
import { ref } from 'vue'

const tableData = ref([
  { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', address: 'Shenzhen' },
  { id: 10002, name: 'Test2', role: 'Test', sex: 'Man', address: 'Guangzhou' },
  { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', address: 'Shanghai' }
])
</script>
```

## 在线文档

👉 [官网文档](https://vxetable.cn)  

## QQ 交流群

该群供大家交流問題，如果群人数已满，将会不定期剔除不活跃的。  

![qq](https://vxetable.cn/static/donation/qq1.png)
![qq](https://vxetable.cn/static/donation/qq2.png)

## 运行项目

安装依赖

```shell
npm run update
```

启动本地调试

```shell
npm run serve
```

编译打包，生成编译后的目录：es,lib

```shell
npm run lib
```

## Contributors

Thank you to everyone who contributed to this project.

[![vxe-table](https://contrib.rocks/image?repo=x-extends/vxe-table)](https://github.com/x-extends/vxe-table/graphs/contributors)

## License

[MIT](LICENSE) © 2019-present, Xu Liangzhan
