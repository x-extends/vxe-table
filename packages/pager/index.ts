import { App } from 'vue'
import VxePagerComponent from './src/pager'
import { dynamicApp } from '../dynamics'

export const Pager = Object.assign(VxePagerComponent, {
  install: function (app: App) {
    dynamicApp.component(VxePagerComponent.name, VxePagerComponent)
    app.component(VxePagerComponent.name, VxePagerComponent)
  }
})

export default Pager
