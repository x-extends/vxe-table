import { App } from 'vue'
import VxePulldownComponent from './src/pulldown'

export const Pulldown = {
  install: function (app: App) {
    app.component(VxePulldownComponent.name, VxePulldownComponent)
  }
}

export default Pulldown
