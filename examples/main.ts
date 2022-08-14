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

  VxeModuleFilter,
  VxeModuleMenu,
  VxeModuleEdit,
  VxeModuleExport,
  VxeModuleKeyboard,
  VxeModuleValidator,

  VxeIcon,
  VxeColumn,
  VxeColgroup,
  VxeGrid,
  VxeToolbar,
  VxePager,
  VxeCheckbox,
  VxeCheckboxGroup,
  VxeRadio,
  VxeRadioGroup,
  VxeRadioButton,
  VxeInput,
  VxeTextarea,
  VxeButton,
  VxeModal,
  VxeTooltip,
  VxeForm,
  VxeFormItem,
  VxeFormGather,
  VxeSelect,
  VxeOptgroup,
  VxeOption,
  VxeSwitch,
  VxeList,
  VxePulldown,

  VxeTable
} from '../packages/all'

const app = createApp(App)

app.component(PreCode.name, PreCode)
app.component(GridAPILink.name, GridAPILink)
app.component(TableAPILink.name, TableAPILink)
app.component(TableColumnAPILink.name, TableColumnAPILink)
app.component(ToolbarAPILink.name, ToolbarAPILink)
app.component(PagerAPILink.name, PagerAPILink)
app.component(VirtualTreeAPILink.name, VirtualTreeAPILink)

app.use(VxeModuleFilter)
app.use(VxeModuleMenu)
app.use(VxeModuleEdit)
app.use(VxeModuleExport)
app.use(VxeModuleKeyboard)
app.use(VxeModuleValidator)

app.use(VxeIcon)
app.use(VxeColumn)
app.use(VxeColgroup)
app.use(VxeGrid)
app.use(VxeToolbar)
app.use(VxePager)
app.use(VxeCheckbox)
app.use(VxeCheckboxGroup)
app.use(VxeRadio)
app.use(VxeRadioGroup)
app.use(VxeRadioButton)
app.use(VxeInput)
app.use(VxeTextarea)
app.use(VxeButton)
app.use(VxeModal)
app.use(VxeSelect)
app.use(VxeOptgroup)
app.use(VxeOption)
app.use(VxeSwitch)
app.use(VxeTooltip)
app.use(VxeForm)
app.use(VxeFormItem)
app.use(VxeFormGather)
app.use(VxeList)
app.use(VxePulldown)
app.use(VxeTable)

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
