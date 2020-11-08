import { App } from 'vue'
import VxeToolbarComponent from './src/toolbar'

export const Toolbar = {
  install: function (app: App) {
    app.component(VxeToolbarComponent.name, VxeToolbarComponent)
  }
}

export default Toolbar
