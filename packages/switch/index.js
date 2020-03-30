import VxeSwitch from './src/switch'

VxeSwitch.install = function (Vue) {
  Vue.component(VxeSwitch.name, VxeSwitch)
}

export const Switch = VxeSwitch
export default VxeSwitch
