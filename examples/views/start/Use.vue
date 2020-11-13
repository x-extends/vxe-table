<template>
  <div>
    <h2>{{ $t('app.aside.nav.use') }}</h2>
    <p class="tip">
      使用 npm 的方式安装，它能更好地和 <a class="link" href="https://webpack.js.org/">webpack</a> 打包工具配合使用。<br>
      依赖库： <a class="link" href="https://www.npmjs.com/package/xe-utils">xe-utils 3.x</a>&nbsp;&nbsp;<a class="link" href="https://cn.vuejs.org/v2/guide/components-slots.html#%E5%8A%A8%E6%80%81%E6%8F%92%E6%A7%BD%E5%90%8D" style="font-size: 20px;font-weight: 700;">vue 3.x</a><br>
    </p>
    <pre>
      <pre-code class="shell">
        npm install xe-utils vxe-table@next
      </pre-code>
      <pre-code class="javascript">
        import { createApp } = 'vue'
        import 'xe-utils'
        import VXETable from 'vxe-table'
        import 'vxe-table/lib/style.css'

        const app = createApp(App)

        app.use(VXETable)

        // 给 vue 实例挂载内部对象，例如：
        app.config.globalProperties.$XModal = VXETable.modal
        app.config.globalProperties.$XPrint = VXETable.print
        app.config.globalProperties.$XSaveFile = VXETable.saveFile
        app.config.globalProperties.$XReadFile = VXETable.readFile

        app.mount('#app')
      </pre-code>
    </pre>
    <h2>Import on demand 按需引入</h2>
    <p class="tip">借助插件 <a class="link" href="https://www.npmjs.com/package/babel-plugin-import" target="_blank">babel-plugin-import</a> 可以实现按需加载模块，减少文件体积。修改 .babelrc 或 babel.config.js 配置文件</p>
    <pre>
      <pre-code class="shell">
        npm install babel-plugin-import -D
      </pre-code>
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
    <pre>
      <pre-code class="javascript">
        import { createApp } = 'vue'
        import 'xe-utils'
        import {
          VXETable,
          Table,
          Column,
          Header,
          Footer,
          Filter,
          Edit,
          Menu,
          Export,
          Keyboard,
          Validator,

          Grid,
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
          List
        } from 'vxe-table'

        const app = createApp(App)

        // 按需加载的方式默认是不带国际化的，需要自行导入
        VXETable.setup({
          i18n: (key, args) => i18n.t(key, args)
        })

        // 表格模块
        app.use(Icon)
        app.use(Header)
        app.use(Footer)
        app.use(Filter)
        app.use(Edit)
        app.use(Menu)
        app.use(Export)
        app.use(Keyboard)
        app.use(Validator)

        // 可选组件
        app.use(Column)
        app.use(Grid)
        app.use(Tooltip)
        app.use(Toolbar)
        app.use(Pager)
        app.use(Form)
        app.use(Checkbox)
        app.use(Radio)
        app.use(Switch)
        app.use(Input)
        app.use(Select)
        app.use(Button)
        app.use(Modal)
        app.use(List)

        // 安装表格
        app.use(Table)

        // 给 vue 实例挂载内部对象，例如：
        app.config.globalProperties.$XModal = VXETable.modal
        app.config.globalProperties.$XPrint = VXETable.print
        app.config.globalProperties.$XSaveFile = VXETable.saveFile
        app.config.globalProperties.$XReadFile = VXETable.readFile

        app.mount('#app')
      </pre-code>
    </pre>
  </div>
</template>
