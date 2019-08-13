import VxeTable from './src/table'
import VXETable from '../v-x-e-table'

export const Table = VxeTable

VxeTable.install = function (Vue) {
  VXETable.Vue = Vue
  VXETable.Table = Table
  Vue.component(VxeTable.name, VxeTable)
}

export default VxeTable
