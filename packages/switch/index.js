import VxeSwitchComponent from './src/switch'
import VxeUI from '../v-x-e-table'

export const VxeSwitch = Object.assign(VxeSwitchComponent, {
  install (Vue) {
    Vue.component(VxeSwitchComponent.name, VxeSwitchComponent)
  }
})
VxeUI.component(VxeSwitchComponent)

export const Switch = VxeSwitch

export default VxeSwitch
