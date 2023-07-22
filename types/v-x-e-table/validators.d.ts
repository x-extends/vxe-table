import { VxeTableDefines, VxeTableDataRow } from '../table'
import { VxeFormDefines } from '../form'

/* eslint-disable no-use-before-define */

export namespace VxeGlobalValidatorsHandles {
  export interface ValidatorsOptions<D = VxeTableDataRow> {
    itemValidatorMethod?: ItemValidatorMethod
    cellValidatorMethod?: CellValidatorMethod<D>
  }

  export type ItemValidatorMethod = (params: ItemValidatorParams, ...args: any[]) => void | Error | Promise<any>
  export type CellValidatorMethod<D = VxeTableDataRow> = (params: CellValidatorParams<D>, ...args: any[]) => void | Error | Promise<any>
  export interface ItemValidatorParams extends VxeFormDefines.RuleValidatorParams {}
  export interface CellValidatorParams<D = VxeTableDataRow> extends VxeTableDefines.RuleValidatorParams<D> {}
}

/**
 * 全局快捷菜单
 */
export interface VxeGlobalValidators {
  mixin(options: {
    [code: string]: VxeGlobalValidatorsHandles.ValidatorsOptions<any>
  }): VxeGlobalValidators
  has(code: string): boolean
  get(code: string): VxeGlobalValidatorsHandles.ValidatorsOptions<any>
  add(code: string, callback: VxeGlobalValidatorsHandles.ValidatorsOptions<any>): VxeGlobalValidators
  delete(code: string): void
  forEach(callback: (options: VxeGlobalValidatorsHandles.ValidatorsOptions<any>, code: string) => void): void
}
