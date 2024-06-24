import VxeLoadingComponent from './src/loading'
import VxeUI from '../v-x-e-table'

export const VxeLoading = Object.assign(VxeLoadingComponent, {
  install (Vue) {
    Vue.component(VxeLoadingComponent.name, VxeLoadingComponent)
  }
})
VxeUI.component(VxeLoadingComponent)

export const Loading = VxeLoading

export default VxeLoading
