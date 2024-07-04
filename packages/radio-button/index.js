import VxeRadioButtonComponent from '../radio/src/button'
import VxeUI from '../v-x-e-table'

export const VxeRadioButton = Object.assign(VxeRadioButtonComponent, {
  install (Vue) {
    Vue.component(VxeRadioButtonComponent.name, VxeRadioButtonComponent)
  }
})
VxeUI.component(VxeRadioButtonComponent)

export const RadioButton = VxeRadioButton

export default VxeRadioButton
