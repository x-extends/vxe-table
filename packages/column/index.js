import VxeTableColumnComponent from '../table/src/column'
import VxeUI from '../v-x-e-table'

export const VxeColumn = Object.assign(VxeTableColumnComponent, {
  install (Vue) {
    Vue.component(VxeTableColumnComponent.name, VxeTableColumnComponent)
    // 兼容旧用法
    Vue.component('VxeTableColumn', VxeTableColumnComponent)
  }
})
VxeUI.component(VxeTableColumnComponent)

export const Column = VxeColumn

export default VxeColumn
