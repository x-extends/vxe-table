import XEUtils from 'xe-utils/methods/xe-utils'
import VXETable from './v-x-e-table'
import Table from './table'
import Column from './column'
import Header from './header'
import Body from './body'
import Footer from './footer'
import Filter from './filter'
import Loading from './loading'
import Grid from './grid'
import Menu from './menu'
import Toolbar from './toolbar'
import Pager from './pager'
import Checkbox from './checkbox'
import Radio from './radio'
import Input from './input'
import Button from './button'
import Modal from './modal'
import Tooltip from './tooltip'

import Edit from './edit'
import Export from './export'
import Keyboard from './keyboard'
import Validator from './validator'
import Resize from './resize'
import zhCNLocat from './locale/lang/zh-CN'

// 按需加载的组件
export const components = [
  // 模块
  Column,
  Header,
  Body,
  Footer,
  Filter,
  Loading,
  Grid,
  Menu,
  Toolbar,
  Pager,
  Checkbox,
  Radio,
  Input,
  Button,
  Modal,
  Tooltip,
  Edit,
  Export,
  Keyboard,
  Validator,
  Resize,
  // 核心
  Table
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

export * from './v-x-e-table'
export * from './column'
export * from './header'
export * from './body'
export * from './footer'
export * from './filter'
export * from './loading'
export * from './grid'
export * from './menu'
export * from './toolbar'
export * from './pager'
export * from './checkbox'
export * from './radio'
export * from './input'
export * from './button'
export * from './modal'
export * from './tooltip'
export * from './edit'
export * from './export'
export * from './keyboard'
export * from './validator'
export * from './resize'
export * from './table'
export default VXETable
