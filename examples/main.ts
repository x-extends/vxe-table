import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'

import './style/index.scss'
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

  VxeTableFilterModule,
  VxeTableMenuModule,
  VxeTableEditModule,
  VxeTableExportModule,
  VxeTableKeyboardModule,
  VxeTableValidatorModule,
  VxeTableCustomModule,

  VxeIcon,
  VxeColumn,
  VxeColgroup,
  VxeTable,
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
  VxeButtonGroup,
  VxeModal,
  VxeDrawer,
  VxeTooltip,
  VxeForm,
  VxeFormItem,
  VxeFormGather,
  VxeSelect,
  VxeOptgroup,
  VxeOption,
  VxeSwitch,
  VxeList,
  VxePulldown
} from '../packages/all'

const app = createApp(App)

app.component(PreCode.name, PreCode)
app.component(GridAPILink.name, GridAPILink)
app.component(TableAPILink.name, TableAPILink)
app.component(TableColumnAPILink.name, TableColumnAPILink)
app.component(ToolbarAPILink.name, ToolbarAPILink)
app.component(PagerAPILink.name, PagerAPILink)
app.component(VirtualTreeAPILink.name, VirtualTreeAPILink)

app.use(VxeTableFilterModule)
app.use(VxeTableMenuModule)
app.use(VxeTableEditModule)
app.use(VxeTableExportModule)
app.use(VxeTableKeyboardModule)
app.use(VxeTableValidatorModule)
app.use(VxeTableCustomModule)

app.use(VxeIcon)
app.use(VxeColumn)
app.use(VxeColgroup)
app.use(VxeTable)
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
app.use(VxeButtonGroup)
app.use(VxeModal)
app.use(VxeDrawer)
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
