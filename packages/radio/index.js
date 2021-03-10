import VxeRadio from './src/radio'
import VxeRadioButton from './src/button'
import VxeRadioGroup from './src/group'

export const Radio = Object.assign(VxeRadio, {
  Button: VxeRadioButton,
  Group: VxeRadioGroup,
  install (Vue) {
    Vue.component(VxeRadio.name, VxeRadio)
    Vue.component(VxeRadioButton.name, VxeRadioButton)
    Vue.component(VxeRadioGroup.name, VxeRadioGroup)
  }
})

export default VxeRadio
