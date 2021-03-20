import VxeOptgroup from '../select/src/optgroup'

export const Optgroup = Object.assign(VxeOptgroup, {
  install (Vue) {
    Vue.component(VxeOptgroup.name, VxeOptgroup)
  }
})

export default Optgroup
