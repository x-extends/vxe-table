import VxeTable from './src/table'
import VXETable from '../v-x-e-table'

VxeTable.install = function (Vue) {
  if (window.VXETableMixin) {
    VxeTable.mixins.push(window.VXETableMixin)
    delete window.VXETableMixin
  }
  VXETable.Vue = Vue
  VXETable.Table = VxeTable
  Vue.component(VxeTable.name, VxeTable)
}

export const Table = VxeTable
export default VxeTable
