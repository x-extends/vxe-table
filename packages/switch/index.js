import VxeSwitch from './src/switch'

export const Switch = Object.assign(VxeSwitch, {
  install (Vue) {
    Vue.component(VxeSwitch.name, VxeSwitch)
  }
})

export default Switch
