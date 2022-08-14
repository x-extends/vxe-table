import { App } from 'vue'
import VxeLoadingComponent from './src/loading'

export const VxeLoading = Object.assign(VxeLoadingComponent, {
  install (app: App) {
    app.component(VxeLoadingComponent.name, VxeLoadingComponent)
  }
})

export const Loading = VxeLoading

export default VxeLoading
