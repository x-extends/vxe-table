import Table from '../table'
import VXETable from '../v-x-e-table'
import Methods from './src/methods'

export const Export = {
  install () {
    VXETable._export = 1
    Object.assign(Table.methods, Methods)
  }
}

export default Export
