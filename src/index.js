import XEUtils from 'xe-utils'
import Table from './components/table'
import TableColumn from './components/table-column'
import Toolbar from './components/toolbar'
import Grid from './components/grid'
import Excel from './components/excel'
import Pager from './components/pager'
import Checkbox from './components/checkbox'
import Radio from './components/radio'
import Input from './components/input'
import Button from './components/button'
import Alert from './components/alert'
import Tooltip from './components/tooltip'
import GlobalConfig from './conf'
import Interceptor from './interceptor'
import Renderer from './renderer'

import './style/index.scss'

const installedPlugins = []

const components = [
  Table,
  TableColumn,
  Toolbar,
  Grid,
  Excel,
  Pager,
  Checkbox,
  Radio,
  Input,
  Button,
  Alert,
  Tooltip
]

var AlertController = null

function MessageBox (options) {
  return new Promise((resolve, reject) => {
    let $alert = new AlertController({
      el: document.createElement('div'),
      propsData: options
    })
    $alert._handleCustom = function (type) {
      $alert.$destroy()
      if (type === 'confirm') {
        resolve(type)
      } else {
        reject(type)
      }
    }
    setTimeout(() => $alert.open())
  })
}

['alert', 'confirm'].forEach(type => {
  MessageBox[type] = function (message, title, options) {
    let opts = { message, type }
    if (XEUtils.isString(message)) {
      if (title) {
        opts.title = title
      }
    } else {
      opts = message
    }
    return MessageBox(Object.assign({}, opts, options))
  }
})

/**
 * 全局参数设置
 */
function setup (options = {}) {
  let { iconMap } = GlobalConfig
  if (options.iconMap) {
    Object.assign(iconMap, options.iconMap)
  }
  Object.assign(GlobalConfig, options, {
    iconMap
  })
}

/**
 * 默认安装
 */
function install (Vue, options) {
  if (XEUtils.isPlainObject(options)) {
    setup(options)
  }
  AlertController = Vue.extend(Alert)
  Vue.prototype.$XTool = MessageBox
  components.map(component => Vue.component(component.name, component))
}

function use (Plugin, options) {
  if (Plugin && Plugin.install) {
    if (installedPlugins.indexOf(Plugin) === -1) {
      Plugin.install({ setup, interceptor: Interceptor, renderer: Renderer, MessageBox }, options)
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
  interceptor: Interceptor,
  renderer: Renderer,
  Table,
  TableColumn,
  Toolbar,
  Grid,
  Excel,
  Pager,
  Checkbox,
  Radio,
  Input,
  Button,
  Alert,
  MessageBox
}
