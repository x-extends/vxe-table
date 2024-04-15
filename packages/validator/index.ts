import validatorHook from './src/hook'
import { VXETable } from '../v-x-e-table'

export const VxeTableValidatorModule = {
  install (): void {
    VXETable.hooks.add('$tableValidator', validatorHook)
  }
}

export const Validator = VxeTableValidatorModule

export default VxeTableValidatorModule
