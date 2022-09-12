import keyboardHook from './src/hook'
import { VXETable } from '../v-x-e-table'

export const VxeModuleKeyboard = {
  install () {
    VXETable.hooks.add('$tableKeyboard', keyboardHook)
  }
}

export const Keyboard = VxeModuleKeyboard

export default VxeModuleKeyboard
