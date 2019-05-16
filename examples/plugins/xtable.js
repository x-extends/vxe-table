import Vue from 'vue'
import VXETable from '../../src'
import VXETablePluginElement from 'vxe-table-plugin-element'
import VXETablePluginIView from 'vxe-table-plugin-iview'
import 'vxe-table-plugin-element/dist/style.css'
import 'vxe-table-plugin-iview/dist/style.css'

Vue.use(VXETable, {
  scrollX: {
    gt: 60,
    oSize: 6,
    rSize: 16,
    vSize: 0
  },
  scrollY: {
    gt: 500,
    oSize: 25,
    rSize: 70,
    vSize: 0,
    rHeight: 0
  }
}, VXETablePluginElement, VXETablePluginIView)
