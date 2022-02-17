import { App } from 'vue'
import VxeToolbarComponent from './src/toolbar'
import { dynamicApp } from '../dynamics'

export const Toolbar = Object.assign(VxeToolbarComponent, {
  install: function (app: App) {
    app.component(VxeToolbarComponent.name, VxeToolbarComponent)
  }
})

dynamicApp.component(VxeToolbarComponent.name, VxeToolbarComponent)

export default Toolbar
