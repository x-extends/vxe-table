import { App } from 'vue'
import VxeRadioComponent from './src/radio'
import { dynamicApp } from '../dynamics'

export const VxeRadio = Object.assign(VxeRadioComponent, {
  install: function (app: App) {
    app.component(VxeRadioComponent.name, VxeRadioComponent)
  }
})

export const Radio = VxeRadio

dynamicApp.component(VxeRadioComponent.name, VxeRadioComponent)

export default VxeRadio
