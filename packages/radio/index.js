import VxeRadioComponent from './src/radio'
import VxeUI from '../v-x-e-table'

export const VxeRadio = Object.assign(VxeRadioComponent, {
  install (Vue) {
    Vue.component(VxeRadioComponent.name, VxeRadioComponent)
  }
})
VxeUI.component(VxeRadioComponent)

export const Radio = VxeRadio

export default VxeRadio
