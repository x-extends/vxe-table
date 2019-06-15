import Vue from 'vue'
import i18n from '../i18n'

import VXETable from '../../packages/v-x-e-table'
import Table from '../../packages/table'
import TableColumn from '../../packages/table-column'
import TableHeader from '../../packages/table-header'
import TableBody from '../../packages/table-body'
import TableFooter from '../../packages/table-footer'
import TableFilter from '../../packages/table-filter'
import TableLoading from '../../packages/table-loading'
import Grid from '../../packages/grid'
import Excel from '../../packages/excel'
import ContextMenu from '../../packages/context-menu'
import Toolbar from '../../packages/toolbar'
import Pager from '../../packages/pager'
import Checkbox from '../../packages/checkbox'
import Radio from '../../packages/radio'
import Input from '../../packages/input'
import Button from '../../packages/button'
import MessageBox from '../../packages/message-box'
import Tooltip from '../../packages/tooltip'
import '../../styles/index.scss'

// import VXETablePluginElement from '../../../vxe-table-plugin-element/index.js'
// import VXETablePluginIView from '../../../vxe-table-plugin-iview/index.js'
// import VXETablePluginAntd from '../../../vxe-table-plugin-antd/index.js'
import VXETablePluginElement from 'vxe-table-plugin-element'
import VXETablePluginIView from 'vxe-table-plugin-iview'
import VXETablePluginAntd from 'vxe-table-plugin-antd'
import 'vxe-table-plugin-element/dist/style.css'
import 'vxe-table-plugin-iview/dist/style.css'
import 'vxe-table-plugin-antd/dist/style.css'

VXETable.setup({
  i18n: (key, value) => i18n.t(key, value)
})

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(TableHeader)
Vue.use(TableBody)
Vue.use(TableFooter)
Vue.use(TableFilter)
Vue.use(TableLoading)
Vue.use(Grid)
Vue.use(Excel)
Vue.use(ContextMenu)
Vue.use(Toolbar)
Vue.use(Pager)
Vue.use(Checkbox)
Vue.use(Radio)
Vue.use(Input)
Vue.use(Button)
Vue.use(MessageBox)
Vue.use(Tooltip)

VXETable.use(VXETablePluginElement)
VXETable.use(VXETablePluginIView)
VXETable.use(VXETablePluginAntd)
