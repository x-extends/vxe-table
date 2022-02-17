import { App } from 'vue'
import VxeOptgroupComponent from '../select/src/optgroup'
import { dynamicApp } from '../dynamics'

export const Optgroup = Object.assign(VxeOptgroupComponent, {
  install: function (app: App) {
    app.component(VxeOptgroupComponent.name, VxeOptgroupComponent)
  }
})

dynamicApp.component(VxeOptgroupComponent.name, VxeOptgroupComponent)

export default Optgroup
