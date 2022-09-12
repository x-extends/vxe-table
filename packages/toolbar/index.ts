import { App } from 'vue'
import VxeToolbarComponent from './src/toolbar'
import { dynamicApp } from '../dynamics'

export const VxeToolbar = Object.assign(VxeToolbarComponent, {
  install: function (app: App) {
    app.component(VxeToolbarComponent.name, VxeToolbarComponent)
  }
})

export const Toolbar = VxeToolbar

dynamicApp.component(VxeToolbarComponent.name, VxeToolbarComponent)

export default VxeToolbar
