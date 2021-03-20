import { App } from 'vue'
import VxeRadioButtonComponent from '../radio/src/button'
import { dynamicApp } from '../dynamics'

export const RadioButton = Object.assign(VxeRadioButtonComponent, {
  install: function (app: App) {
    dynamicApp.component(VxeRadioButtonComponent.name, VxeRadioButtonComponent)
    app.component(VxeRadioButtonComponent.name, VxeRadioButtonComponent)
  }
})

export default RadioButton
