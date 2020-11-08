import { App } from 'vue'
import VxeSwitchComponent from './src/switch'

export const Switch = {
  install: function (app: App) {
    app.component(VxeSwitchComponent.name, VxeSwitchComponent)
  }
}

export default Switch
