import VxeTableComponent from './src/table'
import VxeTableBodyComponent from './src/body'
import VXETable from '../v-x-e-table'

export const VxeTable = Object.assign(VxeTableComponent, {
  install (Vue) {
    if (typeof window !== 'undefined' && window.VXETableMixin) {
      VxeTableComponent.mixins.push(window.VXETableMixin)
      delete window.VXETableMixin
    }
    if (typeof window !== 'undefined' && window.VxeTableExtendCellArea && window.VxeTableExtendCellArea.init) {
      window.VxeTableExtendCellArea.init(VXETable)
      delete window.VxeTableExtendCellArea
    } else if (typeof window !== 'undefined' && window.VXETablePro && window.VXETablePro.init) {
      window.VXETablePro.init(VXETable)
      delete window.VXETablePro
    }
    VXETable.Vue = Vue
    VXETable.Table = VxeTableComponent
    VXETable.TableComponent = VxeTableComponent
    if (!Vue.prototype.$vxe) {
      Vue.prototype.$vxe = { t: VXETable.t, _t: VXETable._t }
    } else {
      Vue.prototype.$vxe.t = VXETable.t
      Vue.prototype.$vxe._t = VXETable._t
    }
    Vue.component(VxeTableComponent.name, VxeTableComponent)
    Vue.component(VxeTableBodyComponent.name, VxeTableBodyComponent)
  }
})

export const Table = VxeTable

export default VxeTable
