import XEUtils from 'xe-utils'
import Table from './packages/table'
import TableColumn from './packages/table-column'
import TableHeader from './packages/table-header'
import TableBody from './packages/table-body'
import TableFooter from './packages/table-footer'
import TableFilter from './packages/table-filter'
import Grid from './packages/grid'
import Excel from './packages/excel'
import ContextMenu from './packages/context-menu'
import Toolbar from './packages/toolbar'
import Pager from './packages/pager'
import Checkbox from './packages/checkbox'
import Radio from './packages/radio'
import Input from './packages/input'
import Button from './packages/button'
import MessageBox from './packages/message-box'
import Tooltip from './packages/tooltip'
import VXETable from './packages/v-x-e-table'
import zhCNLocat from './locale/lang/zh-CN'

// 默认主题
import './styles/index.scss'

// 按需加载的组件
export const components = [
  Table,
  TableColumn,
  TableHeader,
  TableBody,
  TableFooter,
  TableFilter,
  Grid,
  Excel,
  ContextMenu,
  Toolbar,
  Pager,
  Checkbox,
  Radio,
  Input,
  Button,
  MessageBox,
  Tooltip
]

// 默认安装
function install (Vue, options) {
  if (XEUtils.isPlainObject(options)) {
    VXETable.setup(options)
  }
  components.map(component => Vue.use(component))
}

// UMD 默认中文
VXETable.setup({
  i18n: (key, value) => XEUtils.get(zhCNLocat, key)
})

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

VXETable.install = install

export * from './packages/table'
export * from './packages/table-column'
export * from './packages/table-header'
export * from './packages/table-body'
export * from './packages/table-footer'
export * from './packages/table-filter'
export * from './packages/grid'
export * from './packages/excel'
export * from './packages/context-menu'
export * from './packages/toolbar'
export * from './packages/pager'
export * from './packages/checkbox'
export * from './packages/radio'
export * from './packages/input'
export * from './packages/button'
export * from './packages/message-box'
export * from './packages/tooltip'
export default VXETable
