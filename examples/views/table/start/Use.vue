<template>
  <div>
    <h2>Import 完整引入</h2>
    <p class="tip">
      <a class="link" href="https://github.com/xuliangzhan/vxe-table-demo" target="_blank">安装指南</a><br>
      推荐使用 npm 的方式安装，它能更好地和 <a class="link" href="https://webpack.js.org/">webpack</a> 打包工具配合使用。<br>
      依赖库： <a class="link" href="https://www.npmjs.com/package/xe-utils">xe-utils2.4+</a>&nbsp;&nbsp;<a class="link" href="https://cn.vuejs.org/v2/guide/components-slots.html#%E5%8A%A8%E6%80%81%E6%8F%92%E6%A7%BD%E5%90%8D" style="font-size: 20px;font-weight: 700;">vue2.6+</a><br>
      （注：使用 <a class="link" href="https://www.npmjs.com/package/vxe-table">vxe-table</a> 之前必须熟悉 <a href="https://cn.vuejs.org/">vue</a> 相关用法，否则不建议使用）
    </p>
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

        // 给 vue 实例挂载全局窗口对象
        Vue.prototype.$XModal = VXETable.modal
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
    <div>src/plugins/utils.js</div>
    <pre>
      <code class="javascript">
        import 'xe-utils'
      </code>
    </pre>
    <div>src/plugins/table.js</div>
    <pre>
      <code class="javascript">
        import Vue from 'vue'
        import XEUtils from 'xe-utils'
        import {
          VXETable,
          Table,
          Column,
          Header,
          Footer,
          Filter,
          Loading,
          Grid,
          Excel,
          Menu,
          Toolbar,
          Pager,
          Checkbox,
          Radio,
          Input,
          Textarea,
          Button,
          Modal,
          Tooltip,
          Form,
          Select,
          Switch,
          List,
          Export,
          Resize
        } from 'vxe-table'
        import zhCNLocat from 'vxe-table/lib/locale/lang/zh-CN'

        // 按需加载的方式默认是不带国际化的，需要自行导入
        VXETable.setup({
          i18n: (key, value) => XEUtils.get(zhCNLocat, key)
        })

        // 先安装依赖模块
        Vue.use(Icon)
        Vue.use(Column)
        Vue.use(Header)
        Vue.use(Footer)
        Vue.use(Filter)
        Vue.use(Tooltip)
        Vue.use(Grid)
        Vue.use(Menu)
        Vue.use(Toolbar)
        Vue.use(Pager)
        Vue.use(Form)
        Vue.use(Checkbox)
        Vue.use(Radio)
        Vue.use(Switch)
        Vue.use(Input)
        Vue.use(Select)
        Vue.use(Button)
        Vue.use(Modal)
        Vue.use(Edit)
        Vue.use(Export)
        Vue.use(Keyboard)
        Vue.use(Validator)
        Vue.use(Resize)
        // 再安装核心库
        Vue.use(Table)

        // 给 vue 实例挂载全局窗口对象
        Vue.prototype.$XModal = VXETable.modal
      </code>
    </pre>
    <div>main.js</div>
    <pre>
      <code class="javascript">
        import './plugins/utils'
        import './plugins/table'
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
