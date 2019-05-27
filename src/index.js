import XEUtils from 'xe-utils'
import Table from './components/table'
import TableColumn from './components/table-column'
import TableToolbar from './components/table-toolbar'
import Grid from './components/grid'
import Excel from './components/excel'
import Pagination from './components/pagination'
import Checkbox from './components/checkbox'
import Radio from './components/radio'
import Input from './components/input'
import Button from './components/button'
import GlobalConfig from './conf'
import EventInterceptor from './interceptor'

import './style/index.scss'

const installedPlugins = []

const components = [
  Table,
  TableColumn,
  TableToolbar,
  Grid,
  Excel,
  Pagination,
  Checkbox
]

function setup (options = {}) {
  let { renderMap, iconMap } = GlobalConfig
  if (options.renderMap) {
    Object.assign(renderMap, options.renderMap)
  }
  if (options.iconMap) {
    Object.assign(iconMap, options.iconMap)
  }
  Object.assign(GlobalConfig, options, {
    renderMap,
    iconMap
  })
}

function install (Vue, options) {
  if (XEUtils.isPlainObject(options)) {
    setup(options)
  }
  components.map(component => Vue.component(component.name, component))
}

function use (Plugin, options) {
  if (Plugin && Plugin.install) {
    if (installedPlugins.indexOf(Plugin) === -1) {
      Plugin.install(GlobalConfig, EventInterceptor, options)
      installedPlugins.push(Plugin)
    }
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  use,
  setup,
  Table,
  TableColumn,
  TableToolbar,
  Grid,
  Excel,
  Pagination,
  Checkbox,
  Radio,
  Input,
  Button
}
