import { App } from 'vue'
import VxeUIExport, { VxeUI } from 'vxe-pc-ui'

import { VxeColumn } from './column'
import { VxeColgroup } from './colgroup'
import { VxeGrid } from './grid'
import { VxeTable } from './table'
import { VxeToolbar } from './toolbar'

import type { VxeGlobalConfig } from '../types'

const components = [
  VxeColumn,
  VxeColgroup,
  VxeGrid,
  VxeTable,
  VxeToolbar
]

// 默认安装
export function install (app: App, options?: VxeGlobalConfig) {
  VxeUI.setConfig(options)
  components.forEach(component => component.install(app))
}

export const modal = VxeUIExport.drawer
export const drawer = VxeUIExport.drawer

export * from './ui'

// Components
export * from './table'
export * from './column'
export * from './colgroup'
export * from './grid'
export * from './toolbar'
