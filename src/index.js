import Table from './table/table'
import TableColumn from './table/column'

/**
 * 引入样式方式：
 * 1.使用默认的主题样式：
 * import 'vxe-table/lib/index.scss'
 *
 * 2.如果自定义的主题颜色：
 * import '通过复制一份 variable.scss，自行修改变量即可'
 * import 'vxe-table/style/table.scss'
 *
 * 3.如果需要完全定制样式，则参考 table.scss 自行重写即可；
 */
if (process.env.NODE_ENV !== 'development') {
  require('../style/index.scss')
}

const components = [
  Table,
  TableColumn
]

const install = function (Vue) {
  if (!install.installed) {
    components.map(component => Vue.component(component.name, component))
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
