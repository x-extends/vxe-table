import Vue from 'vue'
import VXETable from '../../src'
import VXETableElementPlugin from 'vxe-table-plugin-element'
import VXETableIViewPlugin from 'vxe-table-plugin-iview'
import 'vxe-table-plugin-element/dist/style.css'
import 'vxe-table-plugin-iview/dist/style.css'

Vue.use(VXETable, {
  size: null,
  contextMenu: null,
  optimized: {
    scrollY: {
      gt: 500,
      oSize: 20,
      rSize: 100
    }
  }
})

VXETable.setup(VXETableElementPlugin)
VXETable.setup(VXETableIViewPlugin)
