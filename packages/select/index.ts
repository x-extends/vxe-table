import { App } from 'vue'
import VxeSelectComponent from './src/select'
import VxeOptionComponent from './src/option'
import VxeOptgroupComponent from './src/optgroup'

export const Select = {
  install: function (app: App) {
    app.component(VxeSelectComponent.name, VxeSelectComponent)
    app.component(VxeOptionComponent.name, VxeOptionComponent)
    app.component(VxeOptgroupComponent.name, VxeOptgroupComponent)
  }
}

export default Select
