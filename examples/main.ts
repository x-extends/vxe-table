import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'

import './assets/style/index.scss'
import './plugins'

import PreCode from './components/PreCode.vue'
import GridAPILink from './components/GridAPILink.vue'
import TableAPILink from './components/TableAPILink.vue'
import TableColumnAPILink from './components/TableColumnAPILink.vue'
import ToolbarAPILink from './components/ToolbarAPILink.vue'
import PagerAPILink from './components/PagerAPILink.vue'
import VirtualTreeAPILink from './components/VirtualTreeAPILink.vue'

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
} from '../packages/all'

const app = createApp(App)

app.component(PreCode.name, PreCode)
app.component(GridAPILink.name, GridAPILink)
app.component(TableAPILink.name, TableAPILink)
app.component(TableColumnAPILink.name, TableColumnAPILink)
app.component(ToolbarAPILink.name, ToolbarAPILink)
app.component(PagerAPILink.name, PagerAPILink)
app.component(VirtualTreeAPILink.name, VirtualTreeAPILink)

app.use(Icon)
app.use(Filter)
app.use(Menu)
app.use(Edit)
app.use(Export)
app.use(Keyboard)
app.use(Validator)
app.use(Header)
app.use(Footer)

app.use(Column)
app.use(Colgroup)
app.use(Grid)
app.use(Toolbar)
app.use(Pager)
app.use(Checkbox)
app.use(CheckboxGroup)
app.use(Radio)
app.use(RadioGroup)
app.use(RadioButton)
app.use(Input)
app.use(Textarea)
app.use(Button)
app.use(Modal)
app.use(Select)
app.use(Optgroup)
app.use(Option)
app.use(Switch)
app.use(Tooltip)
app.use(Form)
app.use(FormItem)
app.use(FormGather)
app.use(List)
app.use(Pulldown)

app.use(Table)

app.use(store)
app.use(router)
app.use(i18n)

app.config.globalProperties.$t = i18n.global.t
app.config.globalProperties.$i18n = i18n.global

app.config.globalProperties.$XModal = VXETable.modal
app.config.globalProperties.$XPrint = VXETable.print
app.config.globalProperties.$XSaveFile = VXETable.saveFile
app.config.globalProperties.$XReadFile = VXETable.readFile

app.mount('#app')
