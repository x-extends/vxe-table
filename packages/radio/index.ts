import { App } from 'vue'
import VxeRadioConstructor from './src/radio'
import VxeRadioButtonComponent from './src/button'
import VxeRadioGroupComponent from './src/group'
import { dynamicApp } from '../dynamics'

export const Radio = Object.assign(VxeRadioConstructor, {
  Button: VxeRadioButtonComponent,
  Group: VxeRadioGroupComponent,
  install: function (app: App) {
    dynamicApp.component(VxeRadioConstructor.name, VxeRadioConstructor)
    dynamicApp.component(VxeRadioButtonComponent.name, VxeRadioButtonComponent)
    dynamicApp.component(VxeRadioGroupComponent.name, VxeRadioGroupComponent)
    app.component(VxeRadioConstructor.name, VxeRadioConstructor)
    app.component(VxeRadioButtonComponent.name, VxeRadioButtonComponent)
    app.component(VxeRadioGroupComponent.name, VxeRadioGroupComponent)
  }
})

export default Radio
