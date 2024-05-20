import XEUtils from 'xe-utils'
import { VXETable } from './v-x-e-table'
import { setTheme } from './v-x-e-table/src/theme'

import { Filter } from './filter'
import { Menu } from './menu'
import { Edit } from './edit'
import { Export } from './export'
import { Keyboard } from './keyboard'
import { Validator } from './validator'
import { Custom } from './custom'

import { Icon } from './icon'
import { Column } from './column'
import { Colgroup } from './colgroup'
import { Grid } from './grid'
import { Table } from './table'
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
import { Modal } from './modal'
import { Tooltip } from './tooltip'
import { Form } from './form'
import { FormItem } from './form-item'
import { FormGather } from './form-gather'
import { Select } from './select'
import { Optgroup } from './optgroup'
import { Option } from './option'
import { Switch } from './switch'
import { List } from './list'
import { Pulldown } from './pulldown'

import zhCN from './locale/lang/zh-CN'

// 按需加载的组件
const components = [
  // 功能模块
  Filter,
  Menu,
  Edit,
  Export,
  Keyboard,
  Validator,
  Custom,

  // 可选组件
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
]

// 默认安装
export function install (Vue, options) {
  if (XEUtils.isPlainObject(options)) {
    VXETable.setConfig(options)
    if (options.theme) {
      setTheme(options)
    }
  }
  components.map(component => component.install(Vue))
}

// 默认中文
VXETable.setConfig({
  i18n: (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args)
})

export * from './v-x-e-table'

export * from './filter'
export * from './edit'
export * from './menu'
export * from './export'
export * from './keyboard'
export * from './validator'
export * from './custom'

export * from './icon'
export * from './column'
export * from './colgroup'
export * from './table'
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
