import * as VxeTableExport from './packages/components'
import './styles/all.scss'

if (typeof window !== 'undefined' && window.Vue) {
  if (window.VXETable) {
    if (!(window as any).VXETable) {
      (window as any).VXETable = VxeTableExport
    }
  }
  window.Vue.use(VxeTableExport)
}

export * from './packages/components'
export default VxeTableExport
