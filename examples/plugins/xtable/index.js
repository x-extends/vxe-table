import Vue from 'vue'
import i18n from '@/i18n'

import VXETable from '../../../packages/v-x-e-table'
import Table from '../../../packages/table'
import Column from '../../../packages/column'
import Header from '../../../packages/header'
import Body from '../../../packages/body'
import Footer from '../../../packages/footer'
import Filter from '../../../packages/filter'
import Loading from '../../../packages/loading'
import Grid from '../../../packages/grid'
import Menu from '../../../packages/menu'
import Toolbar from '../../../packages/toolbar'
import Pager from '../../../packages/pager'
import Checkbox from '../../../packages/checkbox'
import Radio from '../../../packages/radio'
import Input from '../../../packages/input'
import Button from '../../../packages/button'
import Modal from '../../../packages/modal'
import Tooltip from '../../../packages/tooltip'
import Export from '../../../packages/export'
import Keyboard from '../../../packages/keyboard'
import Resize from '../../../packages/resize'
import '../../../styles/index.scss'

import VXETablePluginElement from '../../../../vxe-table-plugin-element/index.js'
import VXETablePluginIView from '../../../../vxe-table-plugin-iview/index.js'
import VXETablePluginAntd from '../../../../vxe-table-plugin-antd/index.js'
import VXETablePluginExcel from '../../../../vxe-table-plugin-excel/index.js'
import VXETablePluginRenderer from '../../../../vxe-table-plugin-renderer/index.js'
import VXETablePluginMenus from '../../../../vxe-table-plugin-menus/index.js'
import VXETablePluginCharts from '../../../../vxe-table-plugin-charts/index.js'
// import VXETablePluginElement from 'vxe-table-plugin-element'
// import VXETablePluginIView from 'vxe-table-plugin-iview'
// import VXETablePluginAntd from 'vxe-table-plugin-antd'
// import VXETablePluginExcel from 'vxe-table-plugin-excel'
// import VXETablePluginRenderer from 'vxe-table-plugin-renderer'
// import VXETablePluginMenus from 'vxe-table-plugin-menus'
// import VXETablePluginCharts from 'vxe-table-plugin-charts'
import 'vxe-table-plugin-element/dist/style.css'
import 'vxe-table-plugin-iview/dist/style.css'
import 'vxe-table-plugin-antd/dist/style.css'
import 'vxe-table-plugin-excel/dist/style.css'
import 'vxe-table-plugin-renderer/dist/style.css'
import 'vxe-table-plugin-charts/dist/style.css'

VXETable.setup({
  translate: key => key && key.indexOf('app.') > -1 ? i18n.t(key) : key, // 自动翻译以 app. 开头的键值
  i18n: (key, value) => i18n.t(key, value)
})

Vue.use(Table)
Vue.use(Column)
Vue.use(Header)
Vue.use(Body)
Vue.use(Footer)
Vue.use(Filter)
Vue.use(Loading)
Vue.use(Grid)
Vue.use(Menu)
Vue.use(Toolbar)
Vue.use(Pager)
Vue.use(Checkbox)
Vue.use(Radio)
Vue.use(Input)
Vue.use(Button)
Vue.use(Modal)
Vue.use(Tooltip)
Vue.use(Export)
Vue.use(Keyboard)
Vue.use(Resize)

VXETable.use(VXETablePluginElement)
VXETable.use(VXETablePluginIView)
VXETable.use(VXETablePluginAntd)
VXETable.use(VXETablePluginExcel)
VXETable.use(VXETablePluginRenderer)
VXETable.use(VXETablePluginMenus)
VXETable.use(VXETablePluginCharts)

VXETable.menus.add('exportCSV', (params, event) => {
  let { $table } = params
  $table.exportCsv()
})
