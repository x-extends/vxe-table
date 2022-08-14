import { App } from 'vue'
import VxePagerComponent from './src/pager'
import { dynamicApp } from '../dynamics'

export const VxePager = Object.assign(VxePagerComponent, {
  install: function (app: App) {
    app.component(VxePagerComponent.name, VxePagerComponent)
  }
})

export const Pager = VxePager

dynamicApp.component(VxePagerComponent.name, VxePagerComponent)

export default VxePager
