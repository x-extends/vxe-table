import { VxeTableDefines, VxeTableDataRow } from '../table'

/* eslint-disable no-use-before-define */

export namespace VxeGlobalFormatsHandles {
  export interface FormatsOptions<D = VxeTableDataRow> {
    tableCellFormatMethod?: (params: FormatMethodParams<D>, ...args: any[]) => string | number
    /**
     * 已废弃，请使用 tableCellFormatMethod
     * @deprecated
     */
    cellFormatMethod?: (params: FormatMethodParams<D>, ...args: any[]) => string | number
  }
  export interface FormatMethodParams<D = VxeTableDataRow> {
    cellValue: any
    row: D
    column: VxeTableDefines.ColumnInfo<D>
  }
}

/**
 * 全局格式化
 */
export interface VxeGlobalFormats {
  mixin(opts: {
    [name: string]: VxeGlobalFormatsHandles.FormatsOptions<any> | ((params: VxeGlobalFormatsHandles.FormatMethodParams<any>, ...args: any[]) => string | number)
  }): VxeGlobalFormats
  has(name: string): boolean
  get(name: string): VxeGlobalFormatsHandles.FormatsOptions<any>
  add(name: string, options: VxeGlobalFormatsHandles.FormatsOptions<any> | ((params: VxeGlobalFormatsHandles.FormatMethodParams<any>, ...args: any[]) => string | number)): VxeGlobalFormats
  delete(name: string): void
  forEach(callback: (options: VxeGlobalFormatsHandles.FormatsOptions<any>, name: string) => void): void
}
