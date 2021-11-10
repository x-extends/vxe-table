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
  Pulldown,

  Export,
  Resize
} from '../../../packages/vxe-table'
import zhCNLocat from '../../../packages/locale/lang/zh-CN'

VXETable.setup({
  table: {
    exportConfig: {
      types: ['csv', 'html', 'xml', 'txt']
    }
  },
  i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCNLocat, key), args)
})

Vue.use(Column)
Vue.use(Header)
Vue.use(Footer)
Vue.use(Filter)
Vue.use(Loading)
Vue.use(Grid)
Vue.use(Excel)
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

Vue.use(Export)
Vue.use(Resize)
Vue.use(Table)

// 给 vue 实例挂载全局窗口对象
Vue.prototype.$XModal = VXETable.modal
