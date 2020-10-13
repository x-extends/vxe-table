import Table from '../table'
import VXETable from '../v-x-e-table'
import ExportPanel from './src/export-panel'
import ImportPanel from './src/import-panel'
import mixin, { saveLocalFile, handlePrint } from './src/mixin'

function print (options) {
  const opts = Object.assign({}, options, {
    type: 'html'
  })
  handlePrint(null, opts, opts.content)
}

export const Export = {
  install (Vue) {
    VXETable.reg('export')
    VXETable.saveFile = saveLocalFile
    VXETable.print = print
    VXETable.setup({
      export: {
        types: {
          csv: 0,
          html: 0,
          xml: 0,
          txt: 0
        }
      }
    })
    Table.mixins.push(mixin)
    Vue.component(ExportPanel.name, ExportPanel)
    Vue.component(ImportPanel.name, ImportPanel)
  }
}

export default Export
