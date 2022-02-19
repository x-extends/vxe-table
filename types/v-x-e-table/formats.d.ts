import { VxeTableDefines } from '../table'

export namespace VxeGlobalFormatsHandles {
  export type FormatsCallback = (params: FormatsParams, ...args: any[]) => string | number
  export interface FormatsParams {
    cellValue: any
    row: any,
    column: VxeTableDefines.ColumnInfo
  }
}

/**
 * 全局格式化
 */
export interface VxeGlobalFormats {
  mixin(options: {
    [name: string]: VxeGlobalFormatsHandles.FormatsCallback
  }): VxeGlobalFormats
  has(name: string): boolean
  get(name: string): VxeGlobalFormatsHandles.FormatsCallback
  add(name: string, callback: VxeGlobalFormatsHandles.FormatsCallback): VxeGlobalFormats
  delete(name: string): void
  forEach(callback: (callback: VxeGlobalFormatsHandles.FormatsCallback, name: string) => void): void
}
