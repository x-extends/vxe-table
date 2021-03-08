import { App } from 'vue'
import VxeSwitchComponent from './src/switch'
import { dynamicApp } from '../dynamics'

export const Switch = Object.assign(VxeSwitchComponent, {
  install: function (app: App) {
    dynamicApp.component(VxeSwitchComponent.name, VxeSwitchComponent)
    app.component(VxeSwitchComponent.name, VxeSwitchComponent)
  }
})

export default Switch
