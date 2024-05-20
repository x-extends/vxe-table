import { App } from 'vue'
import { VXETableConfigOptions, VXETableCore } from './v-x-e-table'

import { Icon } from './icon'
import { Table } from './table'
import { Column } from './column'
import { Colgroup } from './colgroup'
import { Grid } from './grid'
import { Toolbar } from './toolbar'
import { Pager } from './pager'
import { Checkbox } from './checkbox'
import { CheckboxGroup } from './checkbox-group'
import { Radio } from './radio'
import { RadioGroup } from './radio-group'
import { RadioButton } from './radio-button'
import { Input } from './input'
import { Textarea } from './textarea'
import { Button } from './button'
import { ButtonGroup } from './button-group'
import { Select } from './select'
import { Optgroup } from './optgroup'
import { Option } from './option'
import { Modal } from './modal'
import { Drawer } from './drawer'
import { Tooltip } from './tooltip'
import { Form } from './form'
import { FormGather } from './form-gather'
import { FormItem } from './form-item'
import { Switch } from './switch'
import { List } from './list'
import { Pulldown } from './pulldown'

export function install(app: App, options?: VXETableConfigOptions): void

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    VXETable: VXETableCore

    VxeIcon: typeof Icon
    VxeTable: typeof Table
    VxeColumn: typeof Column
    VxeColgroup: typeof Colgroup
    VxeGrid: typeof Grid
    VxeToolbar: typeof Toolbar
    VxePager: typeof Pager
    VxeCheckbox: typeof Checkbox
    VxeCheckboxGroup: typeof CheckboxGroup
    VxeRadio: typeof Radio
    VxeRadioGroup: typeof RadioGroup
    VxeRadioButton: typeof RadioButton
    VxeInput: typeof Input
    VxeTextarea: typeof Textarea
    VxeButton: typeof Button
    VxeButtonGroup: typeof ButtonGroup
    VxeSelect: typeof Select
    VxeOptgroup: typeof Optgroup
    VxeOption: typeof Option
    VxeModal: typeof Modal
    VxeDrawer: typeof Drawer
    VxeTooltip: typeof Tooltip
    VxeForm: typeof Form
    VxeFormGather: typeof FormGather
    VxeFormItem: typeof FormItem
    VxeSwitch: typeof Switch
    VxeList: typeof List
    VxePulldown: typeof Pulldown
  }
}

declare global {
  interface Window {
    VXETable: VXETableCore;
  }
}

// Constructor
export * from './v-x-e-table'
export * from './component'

// Component
export * from './icon'
export * from './loading'
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
export * from './select'
export * from './optgroup'
export * from './option'
export * from './modal'
export * from './drawer'
export * from './tooltip'
export * from './form'
export * from './form-gather'
export * from './form-item'
export * from './switch'
export * from './list'
export * from './pulldown'

// Table module
export * from './module'

// Table plugins
export * from './plugins'
