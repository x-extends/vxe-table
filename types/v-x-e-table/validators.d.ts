import { CellRuleValidatorParams } from '../module/validator'
import { FormRuleValidatorParams } from '../form'

/* eslint-disable no-use-before-define */

export namespace VxeGlobalValidatorsHandles {
  export interface ValidatorsOptions {
    itemValidatorMethod?: ItemValidatorMethod
    cellValidatorMethod?: CellValidatorMethod
  }

  export type ItemValidatorMethod = (params: ItemValidatorParams, ...args: any[]) => void | Error | Promise<any>
  export type CellValidatorMethod = (params: CellValidatorParams, ...args: any[]) => void | Error | Promise<any>
  export type ItemValidatorParams = FormRuleValidatorParams
  export type CellValidatorParams = CellRuleValidatorParams
}

/**
 * 全局快捷菜单
 */
export interface VxeGlobalValidators {
  mixin(options: {
    [code: string]: VxeGlobalValidatorsHandles.ValidatorsOptions
  }): VxeGlobalValidators
  has(code: string): boolean
  get(code: string): VxeGlobalValidatorsHandles.ValidatorsOptions
  add(code: string, callback: VxeGlobalValidatorsHandles.ValidatorsOptions): VxeGlobalValidators
  delete(code: string): void
  forEach(callback: (options: VxeGlobalValidatorsHandles.ValidatorsOptions, code: string) => void): void
}
