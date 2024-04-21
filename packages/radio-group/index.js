import VxeRadioGroupComponent from '../radio/src/group'

export const VxeRadioGroup = Object.assign(VxeRadioGroupComponent, {
  install (Vue) {
    Vue.component(VxeRadioGroupComponent.name, VxeRadioGroupComponent)
  }
})

export const RadioGroup = VxeRadioGroup

export default VxeRadioGroup
