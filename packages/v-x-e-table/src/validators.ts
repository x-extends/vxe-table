import VXEStore from './store'

import { VxeGlobalValidators } from '../../../types/v-x-e-table'

export const validators = new VXEStore() as VxeGlobalValidators

if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
  Object.assign(validators, { _name: 'Validators' })
}
