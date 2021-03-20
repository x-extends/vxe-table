import VxeRadioButton from '../radio/src/button'

export const RadioButton = Object.assign(VxeRadioButton, {
  install (Vue) {
    Vue.component(VxeRadioButton.name, VxeRadioButton)
  }
})

export default RadioButton
