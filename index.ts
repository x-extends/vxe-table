import * as VxeUITableExport from './packages/components'
import './styles/all.scss'

if (typeof window !== 'undefined' && (window as any).Vue) {
  // 兼容旧版本
  if (!(window as any).VXETable) {
    (window as any).VXETable = VxeUITableExport
  }
}

export * from './packages/components'
export default VxeUITableExport
