import keyboardHook from './src/hook'
import { VXETable } from '../v-x-e-table'

export const VxeTableKeyboardModule = {
  install () {
    VXETable.hooks.add('$tableKeyboard', keyboardHook)
  }
}

export const Keyboard = VxeTableKeyboardModule

export default VxeTableKeyboardModule
