import { App } from 'vue'
import VxeButtonComponent from './src/button'

export const Button = {
  install (app: App) {
    app.component(VxeButtonComponent.name, VxeButtonComponent)
  }
}

export default Button
