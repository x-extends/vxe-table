import ExportMethods from './src/export'
import VXETable from '../v-x-e-table'
import ExportPanel from './src/export-panel'
import ImportPanel from './src/import-panel'
import { ExportTools } from '../tools'

ExportMethods.install = function (Vue) {
  VXETable._export = 1
  Object.assign(VXETable.types, { csv: 1, html: 1, xml: 1, txt: 1 })
  Object.assign(ExportTools, ExportMethods)
  Vue.component(ExportPanel.name, ExportPanel)
  Vue.component(ImportPanel.name, ImportPanel)
}

export const Export = ExportMethods
export default ExportMethods
