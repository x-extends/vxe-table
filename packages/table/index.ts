import { App } from 'vue'
import { VxeUI } from '../ui'
import VxeTableComponent from './src/table'
import { useCellView } from './src/use'

import type { TableHandleExport } from '../../types'

export const VxeTable = Object.assign({}, VxeTableComponent, {
  install (app: App) {
    app.component(VxeTableComponent.name as string, VxeTableComponent)
  }
})

const tableHandle: TableHandleExport = {
  useCellView
}

if (VxeUI.dynamicApp) {
  VxeUI.dynamicApp.component(VxeTableComponent.name as string, VxeTableComponent)
}

VxeUI.component(VxeTableComponent)
VxeUI.tableHandle = tableHandle

export const Table = VxeTable
export default VxeTable
