import { App } from 'vue'
import VxeCheckboxComponent from './src/checkbox'
import { dynamicApp } from '../dynamics'

export const VxeCheckbox = Object.assign(VxeCheckboxComponent, {
  install (app: App) {
    app.component(VxeCheckboxComponent.name, VxeCheckboxComponent)
  }
})

export const Checkbox = VxeCheckbox

dynamicApp.component(VxeCheckboxComponent.name, VxeCheckboxComponent)

export default VxeCheckbox
