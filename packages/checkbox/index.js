import VxeCheckboxComponent from './src/checkbox'
import VxeUI from '../v-x-e-table'

export const VxeCheckbox = Object.assign(VxeCheckboxComponent, {
  install (Vue) {
    Vue.component(VxeCheckboxComponent.name, VxeCheckboxComponent)
  }
})
VxeUI.component(VxeCheckboxComponent)

export const Checkbox = VxeCheckbox

export default VxeCheckbox
