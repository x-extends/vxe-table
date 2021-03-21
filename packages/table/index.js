import VxeTable from './src/table'
import VXETable from '../v-x-e-table'

VxeTable.install = function (Vue) {
  if (typeof window !== 'undefined' && window.VXETableMixin) {
    VxeTable.mixins.push(window.VXETableMixin)
    delete window.VXETableMixin
  }
  VXETable.Vue = Vue
  VXETable.Table = VxeTable
  VXETable.TableComponent = VxeTable
  if (!Vue.prototype.$vxe) {
    Vue.prototype.$vxe = { t: VXETable.t, _t: VXETable._t }
  } else {
    Vue.prototype.$vxe.t = VXETable.t
    Vue.prototype.$vxe._t = VXETable._t
  }
  Vue.component(VxeTable.name, VxeTable)
}

export const Table = VxeTable
export default VxeTable
