import { App } from 'vue'
import VxeCheckboxComponent from './src/checkbox'
import { dynamicApp } from '../dynamics'

export const Checkbox = Object.assign(VxeCheckboxComponent, {
  install (app: App) {
    app.component(VxeCheckboxComponent.name, VxeCheckboxComponent)
  }
})

dynamicApp.component(VxeCheckboxComponent.name, VxeCheckboxComponent)

export default Checkbox
