import { App } from 'vue'
import VxeRadioConstructor from './src/radio'
import VxeRadioButtonComponent from './src/button'
import VxeRadioGroupComponent from './src/group'

export const Radio = {
  install: function (app: App) {
    app.component(VxeRadioConstructor.name, VxeRadioConstructor)
    app.component(VxeRadioButtonComponent.name, VxeRadioButtonComponent)
    app.component(VxeRadioGroupComponent.name, VxeRadioGroupComponent)
  }
}

export default Radio
