import { VxeUI } from '@vxe-ui/core'

import { VxeColumn } from './column'
import { VxeColgroup } from './colgroup'
import { VxeGrid } from './grid'
import { VxeTable } from './table'
import { VxeToolbar } from './toolbar'

import zhCN from './locale/lang/zh-CN'

import type { VxeGlobalConfig } from '../types'

const components = [
  VxeColumn,
  VxeColgroup,
  VxeGrid,
  VxeTable,
  VxeToolbar
]

// 默认安装
export function install (app: any, options?: VxeGlobalConfig) {
  VxeUI.setConfig(options)
  components.forEach(component => component.install(app))
}

// 保留兼容老版本
if (!VxeUI.hasLanguage('zh-CN')) {
  const defaultLanguage = 'zh-CN'
  VxeUI.setI18n(defaultLanguage, zhCN)
  VxeUI.setLanguage(defaultLanguage)
}
VxeUI.setTheme('light')

export * from './ui'

// Components
export * from './table'
export * from './column'
export * from './colgroup'
export * from './grid'
export * from './toolbar'
