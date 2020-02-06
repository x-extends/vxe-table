import VxeCheckbox from './src/checkbox'
import VxeCheckboxGroup from './src/group'

VxeCheckbox.install = function (Vue) {
  Vue.component(VxeCheckbox.name, VxeCheckbox)
  Vue.component(VxeCheckboxGroup.name, VxeCheckboxGroup)
}

export const Checkbox = VxeCheckbox
export default VxeCheckbox
