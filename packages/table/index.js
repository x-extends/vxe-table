import VxeTable from './src/table'
import VXETable from '../v-x-e-table'

VxeTable.install = function (Vue) {
  VXETable.Vue = Vue
  VXETable.Table = VxeTable
  if (!Vue.prototype.$vxe) {
    Vue.prototype.$vxe = { t: VXETable.t }
  } else {
    Vue.prototype.$vxe.t = VXETable.t
  }
  Vue.component(VxeTable.name, VxeTable)
}

export const Table = VxeTable
export default VxeTable
