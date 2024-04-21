import VxeSwitchComponent from './src/switch'

export const VxeSwitch = Object.assign(VxeSwitchComponent, {
  install (Vue) {
    Vue.component(VxeSwitchComponent.name, VxeSwitchComponent)
  }
})

export const Switch = VxeSwitch

export default VxeSwitch
