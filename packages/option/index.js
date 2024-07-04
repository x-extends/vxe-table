import VxeOptionComponent from '../select/src/option'
import VxeUI from '../v-x-e-table'

export const VxeOption = Object.assign(VxeOptionComponent, {
  install (Vue) {
    Vue.component(VxeOptionComponent.name, VxeOptionComponent)
  }
})
VxeUI.component(VxeOptionComponent)

export const Option = VxeOption

export default VxeOption
