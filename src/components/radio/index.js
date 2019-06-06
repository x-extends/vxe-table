import VxeRadio from './src/radio'

VxeRadio.install = function (Vue) {
  Vue.component(VxeRadio.name, VxeRadio)
}

export const Radio = VxeRadio
export default VxeRadio
