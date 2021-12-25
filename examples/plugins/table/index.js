import Vue from 'vue'
import i18n from '@/i18n'

import 'xe-utils'
import {
  VXETable,

  Icon,
  Filter,
  Menu,
  Edit,
  Export,
  Keyboard,
  Validator,
  Header,
  Footer,

  Column,
  Colgroup,
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
  Pulldown,

  Table
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
Vue.use(Icon)
  .use(Filter)
  .use(Menu)
  .use(Edit)
  .use(Export)
  .use(Keyboard)
  .use(Validator)
  .use(Header)
  .use(Footer)

  // 可选组件
  .use(Column)
  .use(Colgroup)
  .use(Grid)
  .use(Toolbar)
  .use(Pager)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(Radio)
  .use(RadioGroup)
  .use(RadioButton)
  .use(Input)
  .use(Textarea)
  .use(Button)
  .use(Modal)
  .use(Tooltip)
  .use(Form)
  .use(FormItem)
  .use(FormGather)
  .use(Select)
  .use(Optgroup)
  .use(Option)
  .use(Switch)
  .use(List)
  .use(Pulldown)

  // 再安装核心
  .use(Table)

// 给 vue 实例挂载窗口对象
Vue.prototype.$XModal = VXETable.modal

// 给 vue 实例挂载文件对象
Vue.prototype.$XSaveFile = VXETable.saveFile
Vue.prototype.$XReadFile = VXETable.readFile

// 给 vue 实例挂载打印对象
Vue.prototype.$XPrint = VXETable.print
