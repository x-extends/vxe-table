import Vue from 'vue'
import XEUtils from 'xe-utils'
import {
  VXETable,
  Table,
  Column,
  Header,
  Footer,
  Filter,
  Grid,
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
  Edit,
  List,
  Pulldown,

  Export,
  Keyboard,
  Validator,
  Resize
} from '../../../packages/vxe-table'
import zhCNLocat from '../../../packages/locale/lang/zh-CN'

import './renderer'
import './formatter'

VXETable.setup({
  table: {
    exportConfig: {
      types: ['csv', 'html', 'xml', 'txt']
    }
  },
  i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCNLocat, key), args)
})

// 先安装依赖模块
Vue.use(Column)
Vue.use(Header)
Vue.use(Footer)
Vue.use(Filter)
Vue.use(Grid)
Vue.use(Menu)
Vue.use(Toolbar)
Vue.use(Pager)
Vue.use(Checkbox)
Vue.use(Radio)
Vue.use(Input)
Vue.use(Textarea)
Vue.use(Button)
Vue.use(Modal)
Vue.use(Tooltip)
Vue.use(Form)
Vue.use(Select)
Vue.use(Switch)
Vue.use(List)
Vue.use(Pulldown)

Vue.use(Edit)
Vue.use(Export)
Vue.use(Keyboard)
Vue.use(Validator)
Vue.use(Resize)
// 再安装核心
Vue.use(Table)

// 给 vue 实例挂载全局窗口对象
Vue.prototype.$XModal = VXETable.modal

// 给 vue 实例挂载文件对象
Vue.prototype.$XSaveFile = VXETable.saveFile

// 给 vue 实例挂载全局打印对象
Vue.prototype.$XPrint = VXETable.print
