import VxeLoading from './src/loading'

export const Loading = Object.assign(VxeLoading, {
  install (Vue) {
    Vue.component(VxeLoading.name, VxeLoading)
  }
})

export default VxeLoading
