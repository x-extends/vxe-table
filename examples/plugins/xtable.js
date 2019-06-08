import Vue from 'vue'
import i18n from '../i18n'
import VXETable from '../../src'
import VXETablePluginElement from '../../../vxe-table-plugin-element/index.js'
import VXETablePluginIView from '../../../vxe-table-plugin-iview/index.js'
import VXETablePluginAntd from '../../../vxe-table-plugin-antd/index.js'
// import VXETablePluginElement from 'vxe-table-plugin-element'
// import VXETablePluginIView from 'vxe-table-plugin-iview'
import 'vxe-table-plugin-element/dist/style.css'
import 'vxe-table-plugin-iview/dist/style.css'
import 'vxe-table-plugin-antd/dist/style.css'

Vue.use(VXETable, {
  i18n: (key, value) => i18n.t(key, value)
})

VXETable.use(VXETablePluginElement)
VXETable.use(VXETablePluginIView)
VXETable.use(VXETablePluginAntd)
