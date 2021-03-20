import { App } from 'vue'
import VxeCheckboxComponent from './src/checkbox'
import { dynamicApp } from '../dynamics'

export const Checkbox = Object.assign(VxeCheckboxComponent, {
  install (app: App) {
    dynamicApp.component(VxeCheckboxComponent.name, VxeCheckboxComponent)
    app.component(VxeCheckboxComponent.name, VxeCheckboxComponent)
  }
})

export default Checkbox
