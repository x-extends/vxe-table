import ExportMethods from './src/export'
import { ExportTools } from '../tools'

ExportMethods.install = function () {
  Object.assign(ExportTools, ExportMethods)
}

export const Export = ExportMethods
export default ExportMethods
