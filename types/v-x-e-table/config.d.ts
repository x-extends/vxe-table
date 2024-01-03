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
import { VxeCheckboxGroupProps } from '../checkbox-group'
import { VxeRadioProps } from '../radio'
import { VxeRadioButtonProps } from '../radio-button'
import { VxeRadioGroupProps } from '../radio-group'

export interface VXETableConfigOptions {
  /**
   * 扩展插件授权码
   */
  authId?: string
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
  radioButton?: VxeRadioButtonProps
  radioGroup?: VxeRadioGroupProps
  checkbox?: VxeCheckboxProps
  checkboxGroup?: VxeCheckboxGroupProps
  switch?: VxeSwitchProps
  modal?: VxeModalProps
  list?: VxeListProps
  translate?(key: string, args?: any): string
  i18n?(key: string, args?: any): string

  /**
   * 还原旧的单元格校验模式，已废弃
   * @deprecated
   */
  cellVaildMode?: 'obsolete' | '' | null

  [key: string]: any
}

export type VxeGlobalConfigMethod = (options?: VXETableConfigOptions) => Required<VXETableConfigOptions>

/**
 * @deprecated
 */
export type VxeGlobalSetup = VxeGlobalConfigMethod
/**
 * @deprecated
 */
export type VXETableGlobalConfig = VXETableConfigOptions
/**
 * @deprecated
 */
export type VXETableSetupOptions = VXETableConfigOptions
