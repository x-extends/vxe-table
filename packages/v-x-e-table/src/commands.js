import VXEStore from './store'

export const commands = new VXEStore()

if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
  Object.assign(commands, { _name: 'Commands' })
}
