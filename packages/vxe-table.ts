import { App } from 'vue'
import XEUtils from 'xe-utils/ctor'
import VXETable from './v-x-e-table'

import Table from './table'
import Column from './column'
import Header from './header'
import Footer from './footer'
import Grid from './grid'
import Toolbar from './toolbar'
import Pager from './pager'
import Checkbox from './checkbox'
import Radio from './radio'
import Input from './input'
import Textarea from './textarea'
import Button from './button'
import Modal from './modal'
import Tooltip from './tooltip'
import Form from './form'
import Select from './select'
import Switch from './switch'
import List from './list'
import Pulldown from './pulldown'

import Filter from './filter'
import Menu from './menu'
import Edit from './edit'
import Export from './export'
import Keyboard from './keyboard'
import Validator from './validator'

import zhCN from './locale/lang/zh-CN'

// 按需加载的组件
const components = [
  // 模块
  Column,
  Header,
  Footer,
  Grid,
  Toolbar,
  Pager,
  Checkbox,
  Radio,
  Input,
  Textarea,
  Button,
  Modal,
  Tooltip,
  Form,
  Select,
  Switch,
  List,
  Pulldown,

  // 扩展模块
  Filter,
  Menu,
  Edit,
  Export,
  Keyboard,
  Validator,
  // 核心
  Table
]

// 默认安装
function install (app: App, options: any) {
  if (XEUtils.isPlainObject(options)) {
    VXETable.setup(options)
  }
  components.forEach(component => component.install(app))
}

declare module './v-x-e-table' {
  interface VXETableInstance {
    install: typeof install;
  }
}

// 默认中文
VXETable.setup({
  i18n: (key: any, args: any) => XEUtils.template(XEUtils.get(zhCN, key), args, { tmplRE: /\{([.\w[\]\s]+)\}/g })
})

VXETable.install = install

export * from './v-x-e-table'
export * from './column'
export * from './header'
export * from './footer'
export * from './grid'
export * from './toolbar'
export * from './pager'
export * from './checkbox'
export * from './radio'
export * from './input'
export * from './textarea'
export * from './button'
export * from './modal'
export * from './tooltip'
export * from './form'
export * from './select'
export * from './switch'
export * from './list'
export * from './pulldown'

export * from './filter'
export * from './menu'
export * from './edit'
export * from './export'
export * from './keyboard'
export * from './validator'
export * from './table'

export default VXETable
