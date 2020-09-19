import Table from '../table'
import VXETable from '../v-x-e-table'
import ExportPanel from './src/export-panel'
import ImportPanel from './src/import-panel'
import mixin, { handlePrint } from './src/mixin'

function print (options) {
  const opts = Object.assign({}, options, {
    type: 'html'
  })
  handlePrint(null, opts, opts.content)
}

export const Export = {
  install (Vue) {
    VXETable.reg('export')
    VXETable.print = print
    Object.assign(VXETable.types, { csv: 1, html: 1, xml: 1, txt: 1 })
    Table.mixins.push(mixin)
    Vue.component(ExportPanel.name, ExportPanel)
    Vue.component(ImportPanel.name, ImportPanel)
  }
}

export default Export
