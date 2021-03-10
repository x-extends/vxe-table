import Table from '../table'
import VXETable from '../v-x-e-table'
import ExportPanel from './src/export-panel'
import ImportPanel from './src/import-panel'
import mixin, { saveLocalFile as saveFile, readLocalFile as readFile, handlePrint } from './src/mixin'

export { saveFile, readFile }

export function print (options) {
  const opts = Object.assign({}, options, {
    type: 'html'
  })
  handlePrint(null, opts, opts.content)
}

export const Export = {
  ExportPanel,
  ImportPanel,
  install (Vue) {
    VXETable.reg('export')
    VXETable.saveFile = saveFile
    VXETable.readFile = readFile
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
