<template>
  <div>
    <h3>完整引入</h3>
    <pre>
      <code class="shell">
        npm install xe-utils vxe-table
      </code>
      <code class="javascript">
        import Vue from 'vue'
        import VXETable from 'vxe-table'
        import 'vxe-table/lib/index.css'

        Vue.use(VXETable)
      </code>
    </pre>
    <h3>按需引入</h3>
    <p>借助插件 <a class="link" href="https://www.npmjs.com/package/babel-plugin-import">babel-plugin-import</a> 可以实现按需加载模块，减少文件体积。然后在文件 .babelrc 中配置</p>
    <pre>
      <code class="shell">
        npm install babel-plugin-import -D
      </code>
      <code class="javascript">
        {
          "plugins": [
            [
              "import",
              {
                "libraryName": "vxe-table",
                "style": true // 样式是否也按需加载
              }
            ]
          ]
        }
      </code>
    </pre>
    <p>最后这样按需引入模块，就可以减小体积了</p>
    <pre>
      <code class="javascript">
        import {
          VXETable,
          Table,
          Column,
          Header,
          Body,
          Footer,
          Filter,
          Loading,
          Tooltip,
          Grid,
          Excel,
          Menu,
          Toolbar,
          Pager,
          Checkbox,
          Radio,
          Input,
          Button,
          Message,
          Export,
          Resize
        } from 'vxe-table'
        import zhCNLocat from 'vxe-table/lib/locale/lang/zh-CN'

        Vue.use(Table)
        Vue.use(Column)
        Vue.use(Header)
        Vue.use(Body)
        Vue.use(Footer)
        Vue.use(Filter)
        Vue.use(Loading)
        Vue.use(Tooltip)
        Vue.use(Grid)
        Vue.use(Excel)
        Vue.use(Menu)
        Vue.use(Toolbar)
        Vue.use(Pager)
        Vue.use(Checkbox)
        Vue.use(Radio)
        Vue.use(Input)
        Vue.use(Button)
        Vue.use(Message)
        Vue.use(Export)
        Vue.use(Resize)

        // 按需加载的方式默认是不带国际化的，需要自行导入
        VXETable.setup({
          i18n: (key, value) => VXETable.t(zhCNLocat, key)
        })
      </code>
    </pre>
    <h3>局部 size 设置</h3>
    <pre>
      <code class="xml">
        每个组件都有 size 属性，默认是继承父组件，所以只要给局部的父组件设置 size，所有后代组件一律继承，该功能对于很多场景中都非常有用
      </code>
    </pre>
    <h3>全局默认参数</h3>
    <pre>
      <code class="javascript">
        import Vue from 'vue'
        import VXETable from 'vxe-table'
        import 'vxe-table/lib/index.css'

        Vue.use(VXETable, {
          size: 'small',
          version: 0,
          tooltip: {
            zIndex: 3000
          }
        })
      </code>
    </pre>
    <p>通过 setup 函数设置</p>
    <pre>
      <code class="javascript">
        import Vue from 'vue'
        import VXETable from 'vxe-table'
        import 'vxe-table/lib/index.css'

        VXETable.setup({
          // 默认表格参数
          size: 'small',
          showAllOverflow: null,
          showHeaderAllOverflow: null,
          stripe: false,
          border: false,
          resizable: false,
          fit: true,
          showHeader: true,
          // 版本号（对于某些带 Storage 数据储存的功能有用到，上升版本号可以用于重置 Storage 数据）
          version: 0,
          // 默认快捷菜单
          contextMenu: null,
          // 自定义图标配置
          iconMap: {
            sortAsc: 'vxe-icon--caret-top',
            sortDesc: 'vxe-icon--caret-bottom',
            filter: 'vxe-icon--funnel',
            edit: 'vxe-icon--edit-outline',
            tree: 'vxe-icon--caret-right',
            jumpPrev: 'vxe-icon--d-arrow-left',
            jumpNext: 'vxe-icon--d-arrow-right',
            prevPage: 'vxe-icon--arrow-left',
            nextPage: 'vxe-icon--arrow-right'
          },
          // 默认 tooltip 主题样式
          tooltip: {
            zIndex: 3000,
            theme: 'dark'
          },
          // 默认分页参数
          pager: {
            pageSize: 10,
            pagerCount: 7,
            pageSizes: [10, 15, 20, 50, 100],
            layouts: ['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total']
          },
          // 默认工具栏参数
          toolbar: {
            setting: false,
            buttons: []
          },
          // 默认消息提示框参数
          message: {
            lockView: true,
            lockScroll: true,
            mask: true,
            animat: true
          },
          // 默认优化配置项
          optimization : {
            animat: true,
            // 当列大于 40 条时自动启用横向 X 滚动渲染
            scrollX: {
              gt: 40,
              oSize: 5,
              rSize: 16
            },
            // 当数据大于 500 条时自动启用纵向 Y 滚动渲染
            scrollY: {
              gt: 500,
              oSize: 20,
              rSize: 80
            }
          }
        })
      </code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
