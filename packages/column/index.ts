import { App } from 'vue'
import VxeTableColumnComponent from '../table/src/column'
import { dynamicApp } from '../dynamics'

export const VxeColumn = Object.assign(VxeTableColumnComponent, {
  install (app: App) {
    app.component(VxeTableColumnComponent.name, VxeTableColumnComponent)
    // 兼容旧用法
    app.component('VxeTableColumn', VxeTableColumnComponent)
  }
})

export const Column = VxeColumn

dynamicApp.component(VxeTableColumnComponent.name, VxeTableColumnComponent)
// 兼容旧用法
dynamicApp.component('VxeTableColumn', VxeTableColumnComponent)

export default VxeColumn
