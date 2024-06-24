import VxeListComponent from './src/list'
import VxeUI from '../v-x-e-table'

export const VxeList = Object.assign(VxeListComponent, {
  install (Vue) {
    Vue.component(VxeListComponent.name, VxeListComponent)
  }
})
VxeUI.component(VxeListComponent)

export const List = VxeList

export default VxeList
