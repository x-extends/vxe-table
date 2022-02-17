import { App } from 'vue'
import VxeRadioComponent from './src/radio'
import { dynamicApp } from '../dynamics'

export const Radio = Object.assign(VxeRadioComponent, {
  install: function (app: App) {
    app.component(VxeRadioComponent.name, VxeRadioComponent)
  }
})

dynamicApp.component(VxeRadioComponent.name, VxeRadioComponent)

export default Radio
