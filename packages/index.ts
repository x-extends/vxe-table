import * as VxeTableExport from './components'

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

export * from './components'
export default VxeTableExport
