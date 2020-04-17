import VxeList from './src/list'

VxeList.install = function (Vue) {
  Vue.component(VxeList.name, VxeList)
}

export const List = VxeList
export default VxeList
