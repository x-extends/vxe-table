import * as VxeTableExport from './packages/components'
import './styles/all.scss'

// 自动安装
if (typeof window !== 'undefined') {
  if ((window as any).Vue) {
    // 兼容老版本
    if (!window.VXETable) {
      (window as any).VXETable = VxeTableExport
    }
    window.Vue.use(VxeTableExport)
  }
}

export * from './packages/components'
export default VxeTableExport
