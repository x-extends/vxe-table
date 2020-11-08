import { App } from 'vue'
import VxeCheckboxComponent from './src/checkbox'
import VxeCheckboxGroupComponent from './src/group'

export const Checkbox = {
  install (app: App) {
    app.component(VxeCheckboxComponent.name, VxeCheckboxComponent)
    app.component(VxeCheckboxGroupComponent.name, VxeCheckboxGroupComponent)
  }
}

export default Checkbox
