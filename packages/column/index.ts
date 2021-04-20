import { App } from 'vue'
import VxeTableColumnComponent from '../table/src/column'
import { dynamicApp } from '../dynamics'

export const Column = Object.assign(VxeTableColumnComponent, {
  install (app: App) {
    dynamicApp.component(VxeTableColumnComponent.name, VxeTableColumnComponent)
    app.component(VxeTableColumnComponent.name, VxeTableColumnComponent)
    // 兼容旧用法
    dynamicApp.component('VxeTableColumn', VxeTableColumnComponent)
    app.component('VxeTableColumn', VxeTableColumnComponent)
  }
})

export default Column
