import validatorHook from './src/hook'
import { VXETable } from '../v-x-e-table'

export const VxeModuleValidator = {
  install (): void {
    VXETable.hooks.add('$tableValidator', validatorHook)
  }
}

export const Validator = VxeModuleValidator

export default VxeModuleValidator
