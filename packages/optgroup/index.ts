import { App } from 'vue'
import VxeOptgroupComponent from '../select/src/optgroup'
import { dynamicApp } from '../dynamics'

export const Optgroup = Object.assign(VxeOptgroupComponent, {
  install: function (app: App) {
    dynamicApp.component(VxeOptgroupComponent.name, VxeOptgroupComponent)
    app.component(VxeOptgroupComponent.name, VxeOptgroupComponent)
  }
})

export default Optgroup
