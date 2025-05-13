import Vue, { VueConstructor } from 'vue'
import { VxeUI } from '../ui'
import VxeTableComponent from './src/table'
import './render'

let isReg = false

export const VxeTable = Object.assign({}, VxeTableComponent, {
  install (app: VueConstructor) {
    if (typeof window !== 'undefined') {
      if ((window as any).VxeTableExtendCellArea && (window as any).VxeTableExtendCellArea.use) {
        (window as any).VxeTableExtendCellArea.use(VxeUI)
      } else if ((window as any).VXETableMixin) {
        VxeTableComponent.mixins.push((window as any).VXETableMixin)
        delete (window as any).VXETableMixin
      }
      if ((window as any).VxeTableExtendPivotTable && (window as any).VxeTableExtendPivotTable.use) {
        (window as any).VxeTableExtendPivotTable.use(VxeUI)
      }
    }
    // 兼容老版本
    if (typeof window !== 'undefined' && (window as any).VxeTableExtendCellArea && (window as any).VxeTableExtendCellArea.init) {
      (window as any).VxeTableExtendCellArea.init(VxeUI)
      delete (window as any).VxeTableExtendCellArea
      delete (window as any).VXETablePro
    } else if (typeof window !== 'undefined' && (window as any).VXETablePro && (window as any).VXETablePro.init) {
      (window as any).VXETablePro.init(VxeUI)
      delete (window as any).VXETablePro
    }
    if (!Vue.prototype.$vxe) {
      Vue.prototype.$vxe = { t: VxeUI.t, _t: VxeUI._t }
    } else {
      Vue.prototype.$vxe.t = VxeUI.t
      Vue.prototype.$vxe._t = VxeUI._t
    }
    if (!isReg) {
      isReg = true
      if (VxeUI.dynamicApp) {
        VxeUI.dynamicApp.component(VxeTableComponent.name as string, VxeTableComponent)
      }
    }
    app.component(VxeTableComponent.name as string, VxeTableComponent)
  }
})

VxeUI.component(VxeTableComponent)

export const Table = VxeTable
export default VxeTable
