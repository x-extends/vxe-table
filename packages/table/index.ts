import { App } from 'vue'
import VxeTableComponent from './src/table'
import VXETable from '../v-x-e-table'

export const Table = {
  install: function (app: App) {
    const { globalProperties } = app.config
    if (!globalProperties.$vxe) {
      globalProperties.$vxe = { t: VXETable.t }
    } else {
      globalProperties.$vxe.t = VXETable.t
    }
    app.component(VxeTableComponent.name, VxeTableComponent)
  }
}

export default Table
