<template>
  <div>
    <h2>{{ $t('app.aside.nav.use') }}</h2>
    <p class="tip">
      方式1：如果您使用了 vite，借助插件 <a class="link" href="https://www.npmjs.com/package/vite-plugin-style-import" target="_blank">vite-plugin-style-import</a> 可以实现按需加载模块，减少文件体积。
    </p>
    <pre>
      <pre-code class="shell">
        npm install vite-plugin-style-import -D
      </pre-code>
      <div>修改文件 vite.config.ts</div>
      <pre-code class="typescript">
        import { defineConfig } from 'vite'
        import vue from '@vitejs/plugin-vue'
        import styleImport from 'vite-plugin-style-import'

        export default defineConfig({
          plugins: [
            // ...,
            styleImport({
              libs: [
                {
                  libraryName: 'vxe-table',
                  esModule: true,
                  resolveComponent: (name) => `vxe-table/es/${name}`,
                  resolveStyle: (name) => `vxe-table/es/${name}/style.css`
                }
              ]
            })
          ]
        })
      </pre-code>
      <div>最后这样按需引入模块，就可以减小体积了</div>
      <pre-code class="typescript">
        import { App, createApp } = 'vue'
        import 'xe-utils'
        import {
          // 核心
          VXETable,

          // 表格功能
          Header,
          // Footer,
          // Icon,
          // Filter,
          // Edit,
          // Menu,
          // Export,
          // Keyboard,
          // Validator,

          // 可选组件
          Column,
          // Colgroup,
          // Grid,
          // Tooltip,
          // Toolbar,
          // Pager,
          // Form,
          // FormItem,
          // FormGather,
          // Checkbox,
          // CheckboxGroup,
          // Radio,
          // RadioGroup,
          // RadioButton,
          // Switch,
          // Input,
          // Select,
          // Optgroup,
          // Option,
          // Textarea,
          // Button,
          // Modal,
          // List,
          // Pulldown,

          // 表格
          Table
        } from 'vxe-table'
        import zhCN from 'vxe-table/es/locale/lang/zh-CN'

        // 按需加载的方式默认是不带国际化的，自定义国际化需要自行解析占位符 '{0}'，例如：
        VXETable.setup({
          i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args)
        })

        function useTable (app: App) {
          // 表格功能
          app.use(Header)
          // .use(Footer)
          // .use(Icon)
          // .use(Filter)
          // .use(Edit)
          // .use(Menu)
          // .use(Export)
          // .use(Keyboard)
          // .use(Validator)

          // 可选组件
          .use(Column)
          // .use(Colgroup)
          // .use(Grid)
          // .use(Tooltip)
          // .use(Toolbar)
          // .use(Pager)
          // .use(Form)
          // .use(FormItem)
          // .use(FormGather)
          // .use(Checkbox)
          // .use(CheckboxGroup)
          // .use(Radio)
          // .use(RadioGroup)
          // .use(RadioButton)
          // .use(Switch)
          // .use(Input)
          // .use(Select)
          // .use(Optgroup)
          // .use(Option)
          // .use(Textarea)
          // .use(Button)
          // .use(Modal)
          // .use(List)
          // .use(Pulldown)

          // 安装表格
          .use(Table)

          // 给 vue 实例挂载内部对象，例如：
          // app.config.globalProperties.$XModal = VXETable.modal
          // app.config.globalProperties.$XPrint = VXETable.print
          // app.config.globalProperties.$XSaveFile = VXETable.saveFile
          // app.config.globalProperties.$XReadFile = VXETable.readFile
        }

        createApp(App).use(useTable).mount('#app')
      </pre-code>
    </pre>

    <p class="tip">
      方式2：如果您使用了 babel，借助插件 <a class="link" href="https://www.npmjs.com/package/babel-plugin-import" target="_blank">babel-plugin-import</a> 可以实现按需加载模块，减少文件体积。
    </p>
    <pre>
      <pre-code class="shell">
        npm install babel-plugin-import -D
      </pre-code>
      <div>修改文件 .babelrc 或 babel.config.js</div>
      <pre-code class="typescript">
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
      <div>最后这样按需引入模块，就可以减小体积了</div>
      <pre-code class="typescript">
        import { App, createApp } = 'vue'
        import 'xe-utils'
        import {
          // 核心
          VXETable,

          // 表格功能
          Header,
          // Footer,
          // Icon,
          // Filter,
          // Edit,
          // Menu,
          // Export,
          // Keyboard,
          // Validator,

          // 可选组件
          Column,
          // Colgroup,
          // Grid,
          // Tooltip,
          // Toolbar,
          // Pager,
          // Form,
          // FormItem,
          // FormGather,
          // Checkbox,
          // CheckboxGroup,
          // Radio,
          // RadioGroup,
          // RadioButton,
          // Switch,
          // Input,
          // Select,
          // Optgroup,
          // Option,
          // Textarea,
          // Button,
          // Modal,
          // List,
          // Pulldown,

          // 表格
          Table
        } from 'vxe-table'
        import zhCN from 'vxe-table/lib/locale/lang/zh-CN'

        // 按需加载的方式默认是不带国际化的，自定义国际化需要自行解析占位符 '{0}'，例如：
        VXETable.setup({
          i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args)
        })

        function useTable (app: App) {
          // 表格功能
          app.use(Header)
          // .use(Footer)
          // .use(Icon)
          // .use(Filter)
          // .use(Edit)
          // .use(Menu)
          // .use(Export)
          // .use(Keyboard)
          // .use(Validator)

          // 可选组件
          .use(Column)
          // .use(Colgroup)
          // .use(Grid)
          // .use(Tooltip)
          // .use(Toolbar)
          // .use(Pager)
          // .use(Form)
          // .use(FormItem)
          // .use(FormGather)
          // .use(Checkbox)
          // .use(CheckboxGroup)
          // .use(Radio)
          // .use(RadioGroup)
          // .use(RadioButton)
          // .use(Switch)
          // .use(Input)
          // .use(Select)
          // .use(Optgroup)
          // .use(Option)
          // .use(Textarea)
          // .use(Button)
          // .use(Modal)
          // .use(List)
          // .use(Pulldown)

          // 安装表格
          .use(Table)

          // 给 vue 实例挂载内部对象，例如：
          // app.config.globalProperties.$XModal = VXETable.modal
          // app.config.globalProperties.$XPrint = VXETable.print
          // app.config.globalProperties.$XSaveFile = VXETable.saveFile
          // app.config.globalProperties.$XReadFile = VXETable.readFile
        }

        createApp(App).use(useTable).mount('#app')
      </pre-code>
    </pre>
  </div>
</template>
