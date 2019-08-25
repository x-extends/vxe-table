import Table from '../table'
import GlobalConfig from '../conf'
import Methods from './src/methods'

export const Export = {
  install () {
    GlobalConfig._export = 1
    Object.assign(Table.methods, Methods)
  }
}

export default Export
