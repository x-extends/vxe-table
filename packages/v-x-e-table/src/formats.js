import VXEStore from './store'

export const formats = new VXEStore()

if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
  Object.assign(formats, { _name: 'Formats' })
}
