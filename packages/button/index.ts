import { App } from 'vue'
import VxeButtonComponent from './src/button'
import { dynamicApp } from '../dynamics'

export const Button = Object.assign(VxeButtonComponent, {
  install (app: App) {
    app.component(VxeButtonComponent.name, VxeButtonComponent)
  }
})

dynamicApp.component(VxeButtonComponent.name, VxeButtonComponent)

export default Button
