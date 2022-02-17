import { App } from 'vue'
import VxeSwitchComponent from './src/switch'
import { dynamicApp } from '../dynamics'

export const Switch = Object.assign(VxeSwitchComponent, {
  install: function (app: App) {
    app.component(VxeSwitchComponent.name, VxeSwitchComponent)
  }
})

dynamicApp.component(VxeSwitchComponent.name, VxeSwitchComponent)

export default Switch
