import { App } from 'vue'
import VxeRadioGroupComponent from '../radio/src/group'
import { dynamicApp } from '../dynamics'

export const RadioGroup = Object.assign(VxeRadioGroupComponent, {
  install: function (app: App) {
    app.component(VxeRadioGroupComponent.name, VxeRadioGroupComponent)
  }
})

dynamicApp.component(VxeRadioGroupComponent.name, VxeRadioGroupComponent)

export default RadioGroup
