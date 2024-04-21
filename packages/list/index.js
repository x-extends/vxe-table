import VxeListComponent from './src/list'

export const VxeList = Object.assign(VxeListComponent, {
  install (Vue) {
    Vue.component(VxeListComponent.name, VxeListComponent)
  }
})

export const List = VxeList

export default VxeList
