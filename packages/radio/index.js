import VxeRadioComponent from './src/radio'

export const VxeRadio = Object.assign(VxeRadioComponent, {
  install (Vue) {
    Vue.component(VxeRadioComponent.name, VxeRadioComponent)
  }
})

export const Radio = VxeRadio

export default VxeRadio
