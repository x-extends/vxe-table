import { SizeType } from '../component'
import { VxeTableProps } from '../table'
import { VxeGridProps } from '../grid'
import { VxeToolbarProps } from '../toolbar'
import { VxeTooltipProps } from '../tooltip'
import { VxePagerProps } from '../pager'
import { VxeModalProps } from '../modal'
import { VxeFormProps } from '../form'
import { VxeListProps } from '../list'
import { VxeSwitchProps } from '../switch'
import { VxeSelectProps } from '../select'
import { VxeInputProps } from '../input'
import { VxeTextareaProps } from '../textarea'
import { VxeButtonProps } from '../button'
import { VxeCheckboxProps } from '../checkbox'
import { VxeRadioProps } from '../radio'
import { VxeRadioButtonProps } from '../radio-button'
import { VxeRadioGroupProps } from '../radio-group'

export interface VXETableSetupOptions {
  size?: SizeType
  zIndex?: number
  version?: number
  emptyCell?: string
  icon?: {
    [key: string]: string
  }
  table?: VxeTableProps
  grid?: VxeGridProps
  export?: {
    types?: {
      [key: string]: 0 | 1 | 2
    }
    [key: string]: any
  }
  tooltip?: VxeTooltipProps
  pager?: VxePagerProps
  form?: VxeFormProps
  input?: VxeInputProps
  textarea?: VxeTextareaProps
  select?: VxeSelectProps
  toolbar?: VxeToolbarProps
  button?: VxeButtonProps
  radio?: VxeRadioProps
  checkbox?: VxeCheckboxProps
  switch?: VxeSwitchProps
  modal?: VxeModalProps
  list?: VxeListProps
  translate?(key: string, args?: any): string
  i18n?(key: string, args?: any): string
  [key: string]: any
}

export interface VXETableGlobalConfig extends VXETableSetupOptions {
  size: SizeType
  zIndex: number
  version: number
  emptyCell: string
  icon: {
    [key: string]: string
  }
  table: VxeTableProps
  grid: VxeGridProps
  export: {
    types: {
      [key: string]: 0 | 1 | 2
    }
    [key: string]: any
  }
  tooltip: VxeTooltipProps
  pager: VxePagerProps
  form: VxeFormProps
  input: VxeInputProps
  textarea: VxeTextareaProps
  select: VxeSelectProps
  toolbar: VxeToolbarProps
  button: VxeButtonProps
  radio: VxeRadioProps
  radioButton: VxeRadioButtonProps
  radioGroup: VxeRadioGroupProps
  checkbox: VxeCheckboxProps
  switch: VxeSwitchProps
  modal: VxeModalProps
  list: VxeListProps
  i18n(key: string, args?: any): string
}

export type VxeGlobalSetup = (options?: VXETableSetupOptions) => VXETableGlobalConfig
