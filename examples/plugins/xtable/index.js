import Vue from 'vue'
import i18n from '@/i18n'

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
  Edit,
  Export,
  Keyboard,
  Validator,
  Resize
} from '../../../packages/vxe-table'
import '../../../styles/index.scss'

// import VXETablePluginElement from '../../../../vxe-table-plugin-element/test.js'
// import VXETablePluginIView from '../../../../vxe-table-plugin-iview/test.js'
// import VXETablePluginAntd from '../../../../vxe-table-plugin-antd/test.js'
// import VXETablePluginExcel from '../../../../vxe-table-plugin-excel/test.js'
// import VXETablePluginRenderer from '../../../../vxe-table-plugin-renderer/test.js'
// import VXETablePluginMenus from '../../../../vxe-table-plugin-menus/test.js'
// import VXETablePluginCharts from '../../../../vxe-table-plugin-charts/test.js'
// import VXETablePluginShortcutKey from '../../../../vxe-table-plugin-shortcut-key/test.js'
import VXETablePluginElement from 'vxe-table-plugin-element'
import VXETablePluginIView from 'vxe-table-plugin-iview'
import VXETablePluginAntd from 'vxe-table-plugin-antd'
import VXETablePluginExcel from 'vxe-table-plugin-excel'
import VXETablePluginRenderer from 'vxe-table-plugin-renderer'
import VXETablePluginVirtualTree from 'vxe-table-plugin-virtual-tree'
import VXETablePluginMenus from 'vxe-table-plugin-menus'
import VXETablePluginCharts from 'vxe-table-plugin-charts'
import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx'
import VXETablePluginExportPDF from 'vxe-table-plugin-export-pdf'
// import VXETablePluginShortcutKey from 'vxe-table-plugin-shortcut-key'
import 'vxe-table-plugin-element/dist/style.css'
import 'vxe-table-plugin-iview/dist/style.css'
import 'vxe-table-plugin-antd/dist/style.css'
import 'vxe-table-plugin-excel/dist/style.css'
import 'vxe-table-plugin-virtual-tree/dist/style.css'
import 'vxe-table-plugin-renderer/dist/style.css'
import 'vxe-table-plugin-charts/dist/style.css'

// 设置默认参数
VXETable.setup({
  exportConfig: {
    types: ['csv', 'html', 'xml', 'txt']
  },
  translate: key => key && key.indexOf('app.') > -1 ? i18n.t(key) : key, // 自动翻译以 app. 开头的键值
  i18n: key => i18n.t(key)
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
Vue.use(Edit)
Vue.use(Export)
Vue.use(Keyboard)
Vue.use(Validator)
Vue.use(Resize)
// 再安装核心
Vue.use(Table)

VXETable.use(VXETablePluginElement)
VXETable.use(VXETablePluginIView)
VXETable.use(VXETablePluginAntd)
VXETable.use(VXETablePluginExcel)
VXETable.use(VXETablePluginRenderer)
VXETable.use(VXETablePluginVirtualTree)
VXETable.use(VXETablePluginMenus)
VXETable.use(VXETablePluginCharts)
VXETable.use(VXETablePluginExportXLSX)
VXETable.use(VXETablePluginExportPDF)
// VXETable.use(VXETablePluginShortcutKey, {
//   disabled: ['ArrowLeft'],
//   listener: {
//     'V' (params, evnt) {
//       console.log('粘贴')
//     },
//     'Shift + V' (params, evnt) {
//       console.log('粘贴')
//     },
//     'Ctrl + V' (params, evnt) {
//       console.log('粘贴')
//     },
//     'C' (params, evnt) {
//       console.log('粘贴')
//     }
//   },
//   setting: {
//     'table.edit.actived': 'F2',
//     'table.edit.closed': 'Esc',
//     'table.edit.leftTabMove': 'Shift + Enter',
//     'table.edit.rightTabMove': 'Enter',
//     'table.cell.upMove': 'W',
//     'table.cell.downMove': 'S',
//     'table.cell.leftMove': 'A',
//     'table.cell.rightMove': 'D',
//     'table.row.current.topMove': 'Shift + W',
//     'table.row.current.downMove': 'Shift + S',
//     'pager.prevPage': 'ArrowLeft',
//     'pager.nextPage': 'ArrowRight', // 单个按键
//     'pager.prevJump': 'Ctrl + A',
//     'pager.nextJump': 'Ctrl + D' // 组合键
//   }
// })
