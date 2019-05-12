import Vue from 'vue'
import VXETable from '../../src'
import VXETablePluginElement from 'vxe-table-plugin-element'
import VXETablePluginIView from 'vxe-table-plugin-iview'
import 'vxe-table-plugin-element/dist/style.css'
import 'vxe-table-plugin-iview/dist/style.css'

Vue.use(VXETable, VXETablePluginElement, VXETablePluginIView)
