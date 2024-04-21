import VxeRadioButtonComponent from '../radio/src/button'

export const VxeRadioButton = Object.assign(VxeRadioButtonComponent, {
  install (Vue) {
    Vue.component(VxeRadioButtonComponent.name, VxeRadioButtonComponent)
  }
})

export const RadioButton = VxeRadioButton

export default VxeRadioButton
