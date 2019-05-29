import Vue from 'vue'
import VXETable from '../../src'
// import TableToolbar from '../../src/components/table-toolbar'
// import Grid from '../../src/components/grid'
// import Excel from '../../src/components/excel'
// import Pagination from '../../src/components/pagination'
// import Checkbox from '../../src/components/checkbox'
import Radio from '../../src/components/radio'
import Input from '../../src/components/input'
import Button from '../../src/components/button'

import VXETablePluginElement from 'vxe-table-plugin-element'
import VXETablePluginIView from 'vxe-table-plugin-iview'
import 'vxe-table-plugin-element/dist/style.css'
import 'vxe-table-plugin-iview/dist/style.css'

Vue.use(VXETable)
// Vue.use(TableToolbar)
// Vue.use(Grid)
// Vue.use(Excel)
// Vue.use(Pagination)
// Vue.use(Checkbox)
Vue.use(Radio)
Vue.use(Input)
Vue.use(Button)

VXETable.use(VXETablePluginElement)
VXETable.use(VXETablePluginIView)

// 设置默认参数
VXETable.setup({
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
})
