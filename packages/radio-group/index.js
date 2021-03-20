import VxeRadioGroup from '../radio/src/group'

export const RadioGroup = Object.assign(VxeRadioGroup, {
  install (Vue) {
    Vue.component(VxeRadioGroup.name, VxeRadioGroup)
  }
})

export default RadioGroup
