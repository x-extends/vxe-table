import VxeOptgroupComponent from '../select/src/optgroup'
import VxeUI from '../v-x-e-table'

export const VxeOptgroup = Object.assign(VxeOptgroupComponent, {
  install (Vue) {
    Vue.component(VxeOptgroupComponent.name, VxeOptgroupComponent)
  }
})
VxeUI.component(VxeOptgroupComponent)

export const Optgroup = VxeOptgroup

export default VxeOptgroup
