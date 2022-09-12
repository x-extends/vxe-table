import { App } from 'vue'
import VxeTableColgroupComponent from '../table/src/group'
import { dynamicApp } from '../dynamics'

export const VxeColgroup = Object.assign(VxeTableColgroupComponent, {
  install (app: App) {
    app.component(VxeTableColgroupComponent.name, VxeTableColgroupComponent)
    // 兼容旧用法
    app.component('VxeTableColgroup', VxeTableColgroupComponent)
  }
})

export const Colgroup = VxeColgroup

dynamicApp.component(VxeTableColgroupComponent.name, VxeTableColgroupComponent)
// 兼容旧用法
dynamicApp.component('VxeTableColgroup', VxeTableColgroupComponent)

export default VxeColgroup
