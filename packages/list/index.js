import VxeList from './src/list'

export const List = Object.assign(VxeList, {
  install (Vue) {
    Vue.component(VxeList.name, VxeList)
  }
})

export default List
