import * as VxeTableExport from './packages/components'
import './styles/all.scss'

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VxeTableExport)
}

export * from './packages/components'
export default VxeTableExport
