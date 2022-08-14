import editHook from './src/hook'
import { VXETable } from '../v-x-e-table'

export const VxeModuleEdit = {
  install (): void {
    VXETable.hooks.add('$tableEdit', editHook)
  }
}

export const Edit = VxeModuleEdit

export default VxeModuleEdit
