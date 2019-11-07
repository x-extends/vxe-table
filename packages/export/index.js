import Table from '../table'
import VXETable from '../v-x-e-table'
import ExportPanel from './src/export-panel'
import ImportPanel from './src/import-panel'
import mixin from './src/mixin'

export const Export = {
  install (Vue) {
    VXETable.reg('export')
    Object.assign(VXETable.types, { csv: 1, html: 1, xml: 1, txt: 1 })
    Table.mixins.push(mixin)
    Vue.component(ExportPanel.name, ExportPanel)
    Vue.component(ImportPanel.name, ImportPanel)
  }
}

export default Export
