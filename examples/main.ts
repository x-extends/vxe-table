import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'

import {
  VXETable,
  Table,
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

  Filter,
  Menu,
  Edit,
  Export,
  Keyboard,
  Validator
} from '../packages/vxe-table'

import 'font-awesome/css/font-awesome.css'
import './assets/style/index.scss'
import './plugins'

import PreCode from './components/PreCode.vue'
import GridAPILink from './components/GridAPILink.vue'
import TableAPILink from './components/TableAPILink.vue'
import TableColumnAPILink from './components/TableColumnAPILink.vue'
import ToolbarAPILink from './components/ToolbarAPILink.vue'
import PagerAPILink from './components/PagerAPILink.vue'
import VirtualTreeAPILink from './components/VirtualTreeAPILink.vue'

import EditDownTable from './plugins/table/renderer/components/EditDownTable.vue'
import EditPopupModal from './plugins/table/renderer/components/EditPopupModal.vue'
import EditDownModal from './plugins/table/renderer/components/EditDownModal.vue'
import FilterInput from './plugins/table/renderer/components/FilterInput.vue'
import FilterContent from './plugins/table/renderer/components/FilterContent.vue'
import FilterComplex from './plugins/table/renderer/components/FilterComplex.vue'
import FilterExcel from './plugins/table/renderer/components/FilterExcel.vue'

const app = createApp(App)

app.component(PreCode.name, PreCode)
app.component(GridAPILink.name, GridAPILink)
app.component(TableAPILink.name, TableAPILink)
app.component(TableColumnAPILink.name, TableColumnAPILink)
app.component(ToolbarAPILink.name, ToolbarAPILink)
app.component(PagerAPILink.name, PagerAPILink)
app.component(VirtualTreeAPILink.name, VirtualTreeAPILink)

app.component(EditDownTable.name, EditDownTable)
app.component(EditPopupModal.name, EditPopupModal)
app.component(EditDownModal.name, EditDownModal)
app.component(FilterInput.name, FilterInput)
app.component(FilterContent.name, FilterContent)
app.component(FilterComplex.name, FilterComplex)
app.component(FilterExcel.name, FilterExcel)

app.use(Column)
app.use(Header)
app.use(Footer)
app.use(Grid)
app.use(Toolbar)
app.use(Pager)
app.use(Checkbox)
app.use(Radio)
app.use(Input)
app.use(Textarea)
app.use(Button)
app.use(Modal)
app.use(Select)
app.use(Switch)
app.use(Tooltip)
app.use(Form)
app.use(List)
app.use(Pulldown)
app.use(Filter)
app.use(Menu)
app.use(Edit)
app.use(Export)
app.use(Keyboard)
app.use(Validator)
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
