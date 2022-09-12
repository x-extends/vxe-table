import { App } from 'vue'
import VxeOptionComponent from '../select/src/option'
import { dynamicApp } from '../dynamics'

export const VxeOption = Object.assign(VxeOptionComponent, {
  install: function (app: App) {
    app.component(VxeOptionComponent.name, VxeOptionComponent)
  }
})

export const Option = VxeOption

dynamicApp.component(VxeOptionComponent.name, VxeOptionComponent)

export default VxeOption
