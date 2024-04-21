import VxeCheckboxGroupComponent from '../checkbox/src/group'

export const VxeCheckboxGroup = Object.assign(VxeCheckboxGroupComponent, {
  install (Vue) {
    Vue.component(VxeCheckboxGroupComponent.name, VxeCheckboxGroupComponent)
  }
})

export const CheckboxGroup = VxeCheckboxGroup

export default VxeCheckboxGroup
