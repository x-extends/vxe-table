import { App } from 'vue'
import VxeSelectComponent from './src/select'
import { dynamicApp } from '../dynamics'

export const Select = Object.assign(VxeSelectComponent, {
  install: function (app: App) {
    app.component(VxeSelectComponent.name, VxeSelectComponent)
  }
})

dynamicApp.component(VxeSelectComponent.name, VxeSelectComponent)

export default Select
