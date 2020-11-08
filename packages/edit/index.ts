import editHook from './src/hook'
import VXETable from '../v-x-e-table'

export const Edit = {
  install () {
    VXETable.hooks.add('$tableEdit', editHook)
  }
}

export default Edit
