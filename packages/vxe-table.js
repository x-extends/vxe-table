import XEUtils from 'xe-utils'
import Table from './table'
import Column from './column'
import Header from './header'
import Body from './body'
import Footer from './footer'
import Filter from './filter'
import Loading from './loading'
import Grid from './grid'
import Excel from './excel'
import Menu from './menu'
import Toolbar from './toolbar'
import Pager from './pager'
import Checkbox from './checkbox'
import Radio from './radio'
import Input from './input'
import Button from './button'
import Modal from './modal'
import Tooltip from './tooltip'

import Export from './export'
import Resize from './resize'
import VXETable from './v-x-e-table'
import zhCN from './locale/lang/zh-CN'

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
  Excel,
  Menu,
  Toolbar,
  Pager,
  Checkbox,
  Radio,
  Input,
  Button,
  Modal,
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
  i18n: key => XEUtils.get(zhCN, key)
})

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

VXETable.install = install

export * from './table'
export * from './column'
export * from './header'
export * from './body'
export * from './footer'
export * from './filter'
export * from './loading'
export * from './grid'
export * from './excel'
export * from './menu'
export * from './toolbar'
export * from './pager'
export * from './checkbox'
export * from './radio'
export * from './input'
export * from './button'
export * from './modal'
export * from './tooltip'
export * from './export'
export * from './resize'
export * from './v-x-e-table'
export default VXETable
