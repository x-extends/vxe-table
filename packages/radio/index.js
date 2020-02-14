import VxeRadio from './src/radio'
import VxeRadioGroup from './src/group'

VxeRadio.install = function (Vue) {
  Vue.component(VxeRadio.name, VxeRadio)
  Vue.component(VxeRadioGroup.name, VxeRadioGroup)
}

export const Radio = VxeRadio
export default VxeRadio
