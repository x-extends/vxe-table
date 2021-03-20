import VxeRadio from './src/radio'

export const Radio = Object.assign(VxeRadio, {
  install (Vue) {
    Vue.component(VxeRadio.name, VxeRadio)
  }
})

export default Radio
