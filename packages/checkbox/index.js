import VxeCheckboxComponent from './src/checkbox'

export const VxeCheckbox = Object.assign(VxeCheckboxComponent, {
  install (Vue) {
    Vue.component(VxeCheckboxComponent.name, VxeCheckboxComponent)
  }
})

export const Checkbox = VxeCheckbox

export default VxeCheckbox
