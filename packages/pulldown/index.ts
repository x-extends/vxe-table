import { App } from 'vue'
import VxePulldownComponent from './src/pulldown'
import { dynamicApp } from '../dynamics'

export const VxePulldown = Object.assign(VxePulldownComponent, {
  install: function (app: App) {
    app.component(VxePulldownComponent.name, VxePulldownComponent)
  }
})

export const Pulldown = VxePulldown

dynamicApp.component(VxePulldownComponent.name, VxePulldownComponent)

export default VxePulldown
