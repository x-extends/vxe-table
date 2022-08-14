import { App } from 'vue'
import VxeLoading from './src/loading'

export const Loading = Object.assign(VxeLoading, {
  install (app: App) {
    app.component(VxeLoading.name, VxeLoading)
  }
})

export default VxeLoading
