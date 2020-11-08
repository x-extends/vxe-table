import { App } from 'vue'
import VxePagerComponent from './src/pager'

export const Pager = {
  install: function (app: App) {
    app.component(VxePagerComponent.name, VxePagerComponent)
  }
}

export default Pager
