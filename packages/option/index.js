import VxeOptionComponent from '../select/src/option'

export const VxeOption = Object.assign(VxeOptionComponent, {
  install (Vue) {
    Vue.component(VxeOptionComponent.name, VxeOptionComponent)
  }
})

export const Option = VxeOption

export default VxeOption
