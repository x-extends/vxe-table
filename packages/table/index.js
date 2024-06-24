import VxeTableComponent from './src/table'
import VxeTableBodyComponent from './src/body'
import VxeUI from '../v-x-e-table'

export const VxeTable = Object.assign(VxeTableComponent, {
  install (Vue) {
    if (typeof window !== 'undefined' && window.VXETableMixin) {
      VxeTableComponent.mixins.push(window.VXETableMixin)
      delete window.VXETableMixin
    }
    if (typeof window !== 'undefined' && window.VxeTableExtendCellArea && window.VxeTableExtendCellArea.init) {
      window.VxeTableExtendCellArea.init(VxeUI)
      delete window.VxeTableExtendCellArea
    } else if (typeof window !== 'undefined' && window.VXETablePro && window.VXETablePro.init) {
      window.VXETablePro.init(VxeUI)
      delete window.VXETablePro
    }
    VxeUI.Vue = Vue
    VxeUI.Table = VxeTableComponent
    VxeUI.TableComponent = VxeTableComponent
    if (!Vue.prototype.$vxe) {
      Vue.prototype.$vxe = { t: VxeUI.t, _t: VxeUI._t }
    } else {
      Vue.prototype.$vxe.t = VxeUI.t
      Vue.prototype.$vxe._t = VxeUI._t
    }
    Vue.component(VxeTableComponent.name, VxeTableComponent)
    Vue.component(VxeTableBodyComponent.name, VxeTableBodyComponent)
  }
})
VxeUI.component(VxeTableComponent)

export const Table = VxeTable

export default VxeTable
