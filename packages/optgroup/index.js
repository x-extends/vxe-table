import VxeOptgroupComponent from '../select/src/optgroup'

export const VxeOptgroup = Object.assign(VxeOptgroupComponent, {
  install (Vue) {
    Vue.component(VxeOptgroupComponent.name, VxeOptgroupComponent)
  }
})

export const Optgroup = VxeOptgroup

export default VxeOptgroup
