import Vue from 'vue'
import i18n from '@/i18n'

import 'xe-utils'
import {
  VXETable,

  Filter,
  Menu,
  Edit,
  Export,
  Keyboard,
  Validator,
  Custom,

  Icon,
  Column,
  Colgroup,
  Table,
  Grid,
  Toolbar,
  Pager,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  RadioButton,
  Input,
  Textarea,
  Button,
  ButtonGroup,
  Modal,
  Tooltip,
  Form,
  FormItem,
  FormGather,
  Select,
  Optgroup,
  Option,
  Switch,
  List,
  Pulldown
} from '../../../packages/all'

import './renderer'
import './formatter'

// 设置默认参数
VXETable.setup({
  table: {
    exportConfig: {
      types: ['csv', 'html', 'xml', 'txt']
    }
  },
  translate: (key, args) => key && key.indexOf('app.') > -1 ? i18n.t(key, args) : key, // 自动翻译以 app. 开头的键值
  i18n: (key, args) => i18n.t(key, args)
})

// 功能模块
Vue.use(Filter)
Vue.use(Menu)
Vue.use(Edit)
Vue.use(Export)
Vue.use(Keyboard)
Vue.use(Validator)
Vue.use(Custom)

// 可选组件
Vue.use(Icon)
Vue.use(Column)
Vue.use(Colgroup)
Vue.use(Table)
Vue.use(Grid)
Vue.use(Toolbar)
Vue.use(Pager)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Input)
Vue.use(Textarea)
Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Modal)
Vue.use(Tooltip)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(FormGather)
Vue.use(Select)
Vue.use(Optgroup)
Vue.use(Option)
Vue.use(Switch)
Vue.use(List)
Vue.use(Pulldown)

// 给 vue 实例挂载窗口对象
Vue.prototype.$XModal = VXETable.modal

// 给 vue 实例挂载文件对象
Vue.prototype.$XSaveFile = VXETable.saveFile
Vue.prototype.$XReadFile = VXETable.readFile

// 给 vue 实例挂载打印对象
Vue.prototype.$XPrint = VXETable.print
