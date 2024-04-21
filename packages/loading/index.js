import VxeLoadingComponent from './src/loading'

export const VxeLoading = Object.assign(VxeLoadingComponent, {
  install (Vue) {
    Vue.component(VxeLoadingComponent.name, VxeLoadingComponent)
  }
})

export const Loading = VxeLoading

export default VxeLoading
