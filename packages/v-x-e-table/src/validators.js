import VXEStore from './store'

export const validators = new VXEStore()

if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
  Object.assign(validators, { _name: 'Validators' })
}
