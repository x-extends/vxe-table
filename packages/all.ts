import { App } from 'vue'
import XEUtils from 'xe-utils'
import { setConfig } from './v-x-e-table'
import { setTheme } from './v-x-e-table/src/theme'

import { VxeTableFilterModule } from './filter'
import { VxeTableMenuModule } from './menu'
import { VxeTableEditModule } from './edit'
import { VxeTableExportModule } from './export'
import { VxeTableKeyboardModule } from './keyboard'
import { VxeTableValidatorModule } from './validator'
import { VxeTableCustomModule } from './custom'

import { VxeIcon } from './icon'
import { VxeColumn } from './column'
import { VxeColgroup } from './colgroup'
import { VxeGrid } from './grid'
import { VxeToolbar } from './toolbar'
import { VxePager } from './pager'
import { VxeCheckbox } from './checkbox'
import { VxeCheckboxGroup } from './checkbox-group'
import { VxeRadio } from './radio'
import { VxeRadioGroup } from './radio-group'
import { VxeRadioButton } from './radio-button'
import { VxeInput } from './input'
import { VxeTextarea } from './textarea'
import { VxeButton } from './button'
import { VxeButtonGroup } from './button-group'
import { VxeModal } from './modal'
import { VxeDrawer } from './drawer'
import { VxeTooltip } from './tooltip'
import { VxeForm } from './form'
import { VxeFormItem } from './form-item'
import { VxeFormGather } from './form-gather'
import { VxeSelect } from './select'
import { VxeOptgroup } from './optgroup'
import { VxeOption } from './option'
import { VxeSwitch } from './switch'
import { VxeList } from './list'
import { VxePulldown } from './pulldown'
import { VxeTable } from './table'

import zhCN from './locale/lang/zh-CN'

// 按需加载的组件
const components = [
  // 功能模块
  VxeTableFilterModule,
  VxeTableMenuModule,
  VxeTableEditModule,
  VxeTableExportModule,
  VxeTableKeyboardModule,
  VxeTableValidatorModule,
  VxeTableCustomModule,

  // 可选组件
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
  VxePulldown,

  // 核心
  VxeTable
]

// 默认中文
setConfig({
  i18n: (key: string, args: any) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args)
})

// 默认安装
export function install (app: App, options: any) {
  if (XEUtils.isPlainObject(options)) {
    setConfig(options)
    if ((options as any).theme) {
      setTheme((options as any).theme)
    }
  }
  components.forEach(component => component.install(app))
}

export * from './v-x-e-table'

// Table module
export * from './filter'
export * from './menu'
export * from './edit'
export * from './export'
export * from './keyboard'
export * from './validator'
export * from './custom'

// Components
export * from './icon'
export * from './table'
export * from './column'
export * from './colgroup'
export * from './grid'
export * from './toolbar'
export * from './pager'
export * from './checkbox'
export * from './checkbox-group'
export * from './radio'
export * from './radio-group'
export * from './radio-button'
export * from './input'
export * from './textarea'
export * from './button'
export * from './button-group'
export * from './modal'
export * from './drawer'
export * from './tooltip'
export * from './form'
export * from './form-item'
export * from './form-gather'
export * from './select'
export * from './optgroup'
export * from './option'
export * from './switch'
export * from './list'
export * from './pulldown'
