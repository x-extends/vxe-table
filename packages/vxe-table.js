const XEUtils = require('xe-utils/methods/xe-utils')
const Table = require('./table')
const Column = require('./column')
const Header = require('./header')
const Body = require('./body')
const Footer = require('./footer')
const Filter = require('./filter')
const Loading = require('./loading')
const Grid = require('./grid')
const Menu = require('./menu')
const Toolbar = require('./toolbar')
const Pager = require('./pager')
const Checkbox = require('./checkbox')
const Radio = require('./radio')
const Input = require('./input')
const Button = require('./button')
const Modal = require('./modal')
const Tooltip = require('./tooltip')

const Export = require('./export')
const Keyboard = require('./keyboard')
const Resize = require('./resize')
const VXETable = require('./v-x-e-table')
const zhCNLocat = require('./locale/lang/zh-CN')

// 按需加载的组件
const components = [
  Table,
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

  Export,
  Keyboard,
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

module.exports = {
  Table,
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
  Export,
  Keyboard,
  Resize,
  VXETable
}
module.exports.default = VXETable
