import { App } from 'vue'
import VxeRadioGroupComponent from '../radio/src/group'
import { dynamicApp } from '../dynamics'

export const RadioGroup = Object.assign(VxeRadioGroupComponent, {
  install: function (app: App) {
    dynamicApp.component(VxeRadioGroupComponent.name, VxeRadioGroupComponent)
    app.component(VxeRadioGroupComponent.name, VxeRadioGroupComponent)
  }
})

export default RadioGroup
