import * as VxeUITableExport from './components'

if (typeof window !== 'undefined' && (window as any).Vue) {
  // 兼容旧版本
  if (!(window as any).VXETable) {
    ;(window as any).VXETable = VxeUITableExport
  }
}

export * from './components'
export default VxeUITableExport
