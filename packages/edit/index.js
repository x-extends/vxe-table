import Table from '../table'
import Methods from './src/methods'
import VXETable from '../v-x-e-table'

export const Edit = {
  install () {
    VXETable._edit = 1
    Object.assign(Table.methods, Methods)
  }
}

export default Edit
