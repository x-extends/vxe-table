import { App } from 'vue'
import VxeSelectComponent from './src/select'
import VxeOptionComponent from './src/option'
import VxeOptgroupComponent from './src/optgroup'
import { dynamicApp } from '../dynamics'

export const Select = Object.assign(VxeSelectComponent, {
  Option: VxeOptionComponent,
  Optgroup: VxeOptgroupComponent,
  install: function (app: App) {
    dynamicApp.component(VxeSelectComponent.name, VxeSelectComponent)
    dynamicApp.component(VxeOptionComponent.name, VxeOptionComponent)
    dynamicApp.component(VxeOptgroupComponent.name, VxeOptgroupComponent)
    app.component(VxeSelectComponent.name, VxeSelectComponent)
    app.component(VxeOptionComponent.name, VxeOptionComponent)
    app.component(VxeOptgroupComponent.name, VxeOptgroupComponent)
  }
})

export default Select
