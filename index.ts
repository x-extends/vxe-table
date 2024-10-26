import * as VXETableExport from './packages/all'
import './styles/index.scss'

if (typeof window !== 'undefined' && (window as any).Vue) {
  if (!(window as any).VxeUITable) {
    (window as any).VxeUITable = VXETableExport
  }
}

export * from './packages/all'
export default VXETableExport
