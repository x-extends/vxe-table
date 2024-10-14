import * as VXETableExport from './packages/all'
import './styles/index.scss'

if (typeof window !== 'undefined' && window.Vue) {
  if (!window.VxeUITable) {
    window.VxeUITable = VXETableExport
  }
  window.Vue.use(VXETableExport)
}

export * from './packages/all'
export default VXETableExport
