import VxeCheckbox from './src/checkbox'
import VxeCheckboxGroup from './src/group'

export const Checkbox = Object.assign(VxeCheckbox, {
  Group: VxeCheckboxGroup,
  install (Vue) {
    Vue.component(VxeCheckbox.name, VxeCheckbox)
    Vue.component(VxeCheckboxGroup.name, VxeCheckboxGroup)
  }
})

export default VxeCheckbox
