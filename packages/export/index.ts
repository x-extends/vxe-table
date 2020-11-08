import { App } from 'vue'
import VXETable from '../v-x-e-table'
import ExportPanelComponent from './src/export-panel'
import ImportPanelComponent from './src/import-panel'
import exportHook from './src/hook'
import { saveLocalFile, readLocalFile, handlePrint } from './src/util'

import { SaveFileFunction, ReadFileFunction, PrintFunction } from '../../types/vxe-table'

const print: PrintFunction = (options) => {
  const opts = Object.assign({}, options, {
    type: 'html'
  })
  handlePrint(null, opts, opts.content)
}

declare module '../v-x-e-table' {
  interface VXETableInstance {
    print: PrintFunction;
    readFile: ReadFileFunction;
    saveFile: SaveFileFunction;
  }
}

export const Export = {
  install (app: App) {
    VXETable.saveFile = saveLocalFile
    VXETable.readFile = readLocalFile
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
    VXETable.hooks.add('$tableExport', exportHook)
    app.component(ExportPanelComponent.name, ExportPanelComponent)
    app.component(ImportPanelComponent.name, ImportPanelComponent)
  }
}

export default Export
