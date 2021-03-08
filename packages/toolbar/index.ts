import { App } from 'vue'
import VxeToolbarComponent from './src/toolbar'
import { dynamicApp } from '../dynamics'

export const Toolbar = Object.assign(VxeToolbarComponent, {
  install: function (app: App) {
    dynamicApp.component(VxeToolbarComponent.name, VxeToolbarComponent)
    app.component(VxeToolbarComponent.name, VxeToolbarComponent)
  }
})

export default Toolbar
