import { App } from 'vue'
import VxeRadioButtonComponent from '../radio/src/button'
import { dynamicApp } from '../dynamics'

export const VxeRadioButton = Object.assign(VxeRadioButtonComponent, {
  install: function (app: App) {
    app.component(VxeRadioButtonComponent.name, VxeRadioButtonComponent)
  }
})

export const RadioButton = VxeRadioButton

dynamicApp.component(VxeRadioButtonComponent.name, VxeRadioButtonComponent)

export default VxeRadioButton
