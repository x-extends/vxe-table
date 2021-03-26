import { App } from 'vue'
import XEUtils from 'xe-utils'
import { setup } from './v-x-e-table'

import { Icon } from './icon'
import { Filter } from './filter'
import { Menu } from './menu'
import { Edit } from './edit'
import { Export } from './export'
import { Keyboard } from './keyboard'
import { Validator } from './validator'
import { Header } from './header'
import { Footer } from './footer'

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

import { Table } from './table'

import zhCN from './locale/lang/zh-CN'

// 按需加载的组件
const components = [
  // 功能模块
  Header,
  Footer,
  Icon,
  Filter,
  Menu,
  Edit,
  Export,
  Keyboard,
  Validator,

  // 可选组件
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

  // 核心
  Table
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
export * from './footer'

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
