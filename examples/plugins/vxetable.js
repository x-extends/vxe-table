import Vue from 'vue'
import VXETable from '../../src'
import VXETableElementPlugin from 'vxe-table-plugin-element'
import VXETableIViewPlugin from 'vxe-table-plugin-iview'
import 'vxe-table-plugin-element/dist/style.css'
import 'vxe-table-plugin-iview/dist/style.css'

Vue.use(VXETable, VXETableElementPlugin, VXETableIViewPlugin)
