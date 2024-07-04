import VxeRadioGroupComponent from '../radio/src/group'
import VxeUI from '../v-x-e-table'

export const VxeRadioGroup = Object.assign(VxeRadioGroupComponent, {
  install (Vue) {
    Vue.component(VxeRadioGroupComponent.name, VxeRadioGroupComponent)
  }
})
VxeUI.component(VxeRadioGroupComponent)

export const RadioGroup = VxeRadioGroup

export default VxeRadioGroup
