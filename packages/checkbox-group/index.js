import VxeCheckboxGroupComponent from '../checkbox/src/group'
import VxeUI from '../v-x-e-table'

export const VxeCheckboxGroup = Object.assign(VxeCheckboxGroupComponent, {
  install (Vue) {
    Vue.component(VxeCheckboxGroupComponent.name, VxeCheckboxGroupComponent)
  }
})
VxeUI.component(VxeCheckboxGroupComponent)

export const CheckboxGroup = VxeCheckboxGroup

export default VxeCheckboxGroup
