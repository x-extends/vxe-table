import { App } from 'vue'
import VxeCheckboxComponent from './src/checkbox'
import VxeCheckboxGroupComponent from './src/group'
import { dynamicApp } from '../dynamics'

export const Checkbox = Object.assign(VxeCheckboxComponent, {
  Group: VxeCheckboxGroupComponent,
  install (app: App) {
    dynamicApp.component(VxeCheckboxComponent.name, VxeCheckboxComponent)
    dynamicApp.component(VxeCheckboxGroupComponent.name, VxeCheckboxGroupComponent)
    app.component(VxeCheckboxComponent.name, VxeCheckboxComponent)
    app.component(VxeCheckboxGroupComponent.name, VxeCheckboxGroupComponent)
  }
})

export default Checkbox
