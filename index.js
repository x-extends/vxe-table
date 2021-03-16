import * as VXETableExport from './packages/all'
import './styles/index.scss'

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VXETableExport)
}

export * from './packages/all'
export default VXETableExport
