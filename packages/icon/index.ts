import { App } from 'vue'
import VxeIconComponent from './src/icon'
import { dynamicApp } from '../dynamics'

export const VxeIcon = Object.assign(VxeIconComponent, {
  install (app: App) {
    app.component(VxeIconComponent.name, VxeIconComponent)
  }
})

export const Icon = VxeIcon

dynamicApp.component(VxeIcon.name, VxeIcon)

export default VxeIcon
