import * as VxeTableExport from './packages/components'
import './styles/all.scss'

if (typeof window !== 'undefined' && (window as any).Vue) {
  if (!(window as any).VXETable) {
    (window as any).VXETable = VxeTableExport
  }
}

export * from './packages/components'
export default VxeTableExport
