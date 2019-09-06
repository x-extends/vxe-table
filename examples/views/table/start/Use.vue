<template>
  <div>
    <h2>Import 完整引入</h2>
    <pre>
      <code class="shell">
        npm install xe-utils vxe-table
      </code>
      <code class="javascript">
        import Vue from 'vue'
        import 'xe-utils'
        import VXETable from 'vxe-table'
        import 'vxe-table/lib/index.css'

        Vue.use(VXETable)
      </code>
    </pre>
    <h2>Import on demand 按需引入</h2>
    <p class="tip"><a class="link" href="https://github.com/xuliangzhan/vxe-table-demo" target="_blank">安装指南</a><br>借助插件 <a class="link" href="https://www.npmjs.com/package/babel-plugin-import" target="_blank">babel-plugin-import</a> 可以实现按需加载模块，减少文件体积。然后在文件 .babelrc 中配置</p>
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
    <p class="tip">最后这样按需引入模块，就可以减小体积了</p>
    <pre>
      <code class="javascript">
        import Vue from 'vue'
        import 'xe-utils'
        import {
          VXETable,
          Icon,
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
          Modal,
          Export,
          Keyboard,
          Resize
        } from 'vxe-table'
        import zhCNLocat from 'vxe-table/lib/locale/lang/zh-CN'

        Vue.use(Icon)
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
        Vue.use(Modal)
        Vue.use(Export)
        Vue.use(Keyboard)
        Vue.use(Resize)

        // 按需加载的方式默认是不带国际化的，需要自行导入
        VXETable.setup({
          i18n: (key, value) => VXETable.t(zhCNLocat, key)
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
