import Vue from 'vue'
import i18n from '@/i18n'

import XEUtils from 'xe-utils'
import {
  VXETable,

  Icon,
  Filter,
  Menu,
  Edit,
  Export,
  Keyboard,
  Validator,
  Header,
  Footer,

  Column,
  Colgroup,
  Grid,
  Toolbar,
  Pager,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  RadioButton,
  Input,
  Textarea,
  Button,
  Modal,
  Tooltip,
  Form,
  FormItem,
  FormGather,
  Select,
  Optgroup,
  Option,
  Switch,
  List,
  Pulldown,

  Table
} from '../../../packages/all'

import VXETablePluginElement from 'vxe-table-plugin-element'
import VXETablePluginIView from 'vxe-table-plugin-iview'
import VXETablePluginAntd from 'vxe-table-plugin-antd'
import VXETablePluginMenus from 'vxe-table-plugin-menus'
import VXETablePluginExportPDF from 'vxe-table-plugin-export-pdf'
import VXETablePluginRenderer from 'vxe-table-plugin-renderer'
// import VXETablePluginShortcutKey from 'vxe-table-plugin-shortcut-key'
import 'vxe-table-plugin-element/dist/style.css'
import 'vxe-table-plugin-iview/dist/style.css'
import 'vxe-table-plugin-antd/dist/style.css'
import 'vxe-table-plugin-renderer/dist/style.css'

import './renderer'
import './formatter'

// 设置默认参数
VXETable.setup({
  table: {
    exportConfig: {
      types: ['csv', 'html', 'xml', 'txt']
    }
  },
  translate: (key, args) => key && key.indexOf('app.') > -1 ? i18n.t(key, args) : key, // 自动翻译以 app. 开头的键值
  i18n: (key, args) => i18n.t(key, args)
})

// 功能模块
Vue.use(Icon)
  .use(Filter)
  .use(Menu)
  .use(Edit)
  .use(Export)
  .use(Keyboard)
  .use(Validator)
  .use(Header)
  .use(Footer)

  // 可选组件
  .use(Column)
  .use(Colgroup)
  .use(Grid)
  .use(Toolbar)
  .use(Pager)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Radio)
  .use(RadioGroup)
  .use(RadioButton)
  .use(Input)
  .use(Textarea)
  .use(Button)
  .use(Modal)
  .use(Tooltip)
  .use(Form)
  .use(FormItem)
  .use(FormGather)
  .use(Select)
  .use(Optgroup)
  .use(Option)
  .use(Switch)
  .use(List)
  .use(Pulldown)

  // 再安装核心
  .use(Table)

// 给 vue 实例挂载窗口对象
Vue.prototype.$XModal = VXETable.modal

// 给 vue 实例挂载文件对象
Vue.prototype.$XSaveFile = VXETable.saveFile
Vue.prototype.$XReadFile = VXETable.readFile

// 给 vue 实例挂载打印对象
Vue.prototype.$XPrint = VXETable.print

VXETable.use(VXETablePluginElement)
VXETable.use(VXETablePluginIView)
VXETable.use(VXETablePluginAntd)
VXETable.use(VXETablePluginMenus)
VXETable.use(VXETablePluginExportPDF)
VXETable.use(VXETablePluginRenderer)
// VXETable.use(VXETablePluginShortcutKey)

if (!XEUtils.browse().msie) {
  const exceljs = document.createElement('script')
  exceljs.src = 'https://cdn.jsdelivr.net/npm/exceljs@4.2.1/dist/exceljs.js'
  exceljs.onload = () => {
    import(/* webpackChunkName: 'export-xlsx' */ 'vxe-table-plugin-export-xlsx').then((VXETablePluginExportXLSX) => {
      VXETable.use(VXETablePluginExportXLSX.default)
    })
  }
  document.body.appendChild(exceljs)
}
