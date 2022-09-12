import { App } from 'vue'
import VxeRadioGroupComponent from '../radio/src/group'
import { dynamicApp } from '../dynamics'

export const VxeRadioGroup = Object.assign(VxeRadioGroupComponent, {
  install: function (app: App) {
    app.component(VxeRadioGroupComponent.name, VxeRadioGroupComponent)
  }
})

export const RadioGroup = VxeRadioGroup

dynamicApp.component(VxeRadioGroupComponent.name, VxeRadioGroupComponent)

export default VxeRadioGroup
