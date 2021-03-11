<template>
  <div>
    <h2>{{ $t('app.aside.nav.use') }}</h2>
    <p class="tip">
      使用 npm 的方式安装，借助插件 <a class="link" href="https://www.npmjs.com/package/babel-plugin-import" target="_blank">babel-plugin-import</a> 可以实现按需加载模块，减少文件体积。
    </p>
    <pre>
      <pre-code class="shell">
        npm install babel-plugin-import -D
      </pre-code>
      <div>修改文件 .babelrc 或 babel.config.js</div>
      <pre-code class="javascript">
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
      </pre-code>
    </pre>
    <p class="tip">最后这样按需引入模块，就可以减小体积了</p>
    <div>修改文件 src/plugins/table.js</div>
    <pre>
      <pre-code class="javascript">
        import Vue from 'vue'
        import XEUtils from 'xe-utils'
        import {
          VXETable,
          Table,
          Column,
          Header,
          // Footer,

          // Icon
          // Filter,
          // Edit,
          // Menu,
          // Export,
          // Keyboard,
          // Validator,

          // Grid,
          // Toolbar,
          // Pager,
          // Checkbox,
          // Radio,
          // Input,
          // Textarea,
          // Button,
          // Modal,
          // Tooltip,
          // Form,
          // Select,
          // Switch,
          // List
        } from 'vxe-table'

        // 按需加载的方式默认是不带国际化的，需要自行导入
        VXETable.setup({
          i18n: (key, args) => i18n.t(key, args)
        })

        // 表格模块
        // Vue.use(Icon)
        Vue.use(Header)
        // Vue.use(Footer)
        // Vue.use(Filter)
        // Vue.use(Edit)
        // Vue.use(Menu)
        // Vue.use(Export)
        // Vue.use(Keyboard)
        // Vue.use(Validator)

        // 可选组件
        Vue.use(Column)
        // Vue.use(Grid)
        // Vue.use(Tooltip)
        // Vue.use(Toolbar)
        // Vue.use(Pager)
        // Vue.use(Form)
        // Vue.use(Checkbox)
        // Vue.use(Radio)
        // Vue.use(Switch)
        // Vue.use(Input)
        // Vue.use(Select)
        // Vue.use(Button)
        // Vue.use(Modal)
        // Vue.use(List)

        // 安装表格
        Vue.use(Table)

        // 给 vue 实例挂载内部对象，例如：
        // Vue.prototype.$XModal = VXETable.modal
        // Vue.prototype.$XPrint = VXETable.print
        // Vue.prototype.$XSaveFile = VXETable.saveFile
        // Vue.prototype.$XReadFile = VXETable.readFile
      </pre-code>
    </pre>
    <div>修改文件 main.js</div>
    <pre>
      <pre-code class="javascript">
        import 'xe-utils'
        import './plugins/table'
      </pre-code>
    </pre>
  </div>
</template>
