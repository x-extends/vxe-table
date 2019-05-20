import VxePagination from './src/pagination'

VxePagination.install = function (Vue) {
  Vue.component(VxePagination.name, VxePagination)
}

export const Pagination = VxePagination
export default VxePagination
