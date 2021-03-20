import { App } from 'vue'
import VxeOptionComponent from '../select/src/option'
import { dynamicApp } from '../dynamics'

export const Option = Object.assign(VxeOptionComponent, {
  install: function (app: App) {
    dynamicApp.component(VxeOptionComponent.name, VxeOptionComponent)
    app.component(VxeOptionComponent.name, VxeOptionComponent)
  }
})

export default Option
