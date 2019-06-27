import XEUtils from 'xe-utils'
import Table from './packages/table'
import Column from './packages/column'
import Header from './packages/header'
import Body from './packages/body'
import Footer from './packages/footer'
import Filter from './packages/filter'
import Loading from './packages/loading'
import Grid from './packages/grid'
// import Excel from './packages/excel'
import Menu from './packages/menu'
import Toolbar from './packages/toolbar'
import Pager from './packages/pager'
import Checkbox from './packages/checkbox'
import Radio from './packages/radio'
import Input from './packages/input'
import Button from './packages/button'
import Message from './packages/message'
import Tooltip from './packages/tooltip'

import Export from './packages/export'
import Resize from './packages/resize'
import VXETable from './packages/v-x-e-table'
import zhCNLocat from './locale/lang/zh-CN'

// 默认主题
import './styles/index.scss'

// 按需加载的组件
export const components = [
  Table,
  Column,
  Header,
  Body,
  Footer,
  Filter,
  Loading,
  Grid,
  // Excel,
  Menu,
  Toolbar,
  Pager,
  Checkbox,
  Radio,
  Input,
  Button,
  Message,
  Tooltip,

  Export,
  Resize
]

// 默认安装
function install (Vue, options) {
  if (XEUtils.isPlainObject(options)) {
    VXETable.setup(options)
  }
  components.map(component => Vue.use(component))
}

// 默认中文
VXETable.setup({
  i18n: (key, value) => XEUtils.get(zhCNLocat, key)
})

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

VXETable.install = install

export * from './packages/table'
export * from './packages/column'
export * from './packages/header'
export * from './packages/body'
export * from './packages/footer'
export * from './packages/filter'
export * from './packages/loading'
export * from './packages/grid'
// export * from './packages/excel'
export * from './packages/menu'
export * from './packages/toolbar'
export * from './packages/pager'
export * from './packages/checkbox'
export * from './packages/radio'
export * from './packages/input'
export * from './packages/button'
export * from './packages/message'
export * from './packages/tooltip'
export * from './packages/export'
export * from './packages/resize'
export * from './packages/v-x-e-table'
export default VXETable
