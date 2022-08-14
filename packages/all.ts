import { App } from 'vue'
import XEUtils from 'xe-utils'
import { setup } from './v-x-e-table'

import { VxeModuleFilter } from './filter'
import { VxeModuleMenu } from './menu'
import { VxeModuleEdit } from './edit'
import { VxeModuleExport } from './export'
import { VxeModuleKeyboard } from './keyboard'
import { VxeModuleValidator } from './validator'

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
import { VxeModal } from './modal'
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
  VxeModuleFilter,
  VxeModuleMenu,
  VxeModuleEdit,
  VxeModuleExport,
  VxeModuleKeyboard,
  VxeModuleValidator,

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

  // 核心
  VxeTable
]

// 默认中文
setup({
  i18n: (key: string, args: any) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args)
})

// 默认安装
export function install (app: App, options: any) {
  if (XEUtils.isPlainObject(options)) {
    setup(options)
  }
  components.forEach(component => component.install(app))
}

export * from './v-x-e-table'

export * from './icon'
export * from './filter'
export * from './edit'
export * from './export'
export * from './keyboard'
export * from './validator'
export * from './header'

export * from './column'
export * from './colgroup'
export * from './grid'
export * from './menu'
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
export * from './modal'
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

export * from './table'
