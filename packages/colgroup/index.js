import VxeTableColgroupComponent from '../table/src/group'
import VxeUI from '../v-x-e-table'

export const VxeColgroup = Object.assign(VxeTableColgroupComponent, {
  install (Vue) {
    Vue.component(VxeTableColgroupComponent.name, VxeTableColgroupComponent)
    // 兼容旧用法
    Vue.component('VxeTableColgroup', VxeTableColgroupComponent)
  }
})
VxeUI.component(VxeTableColgroupComponent)

export const Colgroup = VxeColgroup

export default VxeColgroup
