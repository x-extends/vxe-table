import { VxeTableConstructor, VxeTableDefines, VxeTablePropTypes, VxeTablePrivateMethods } from '../table'
import { VxeGridConstructor, VxeGridPrivateMethods } from '../grid'

export namespace VxeGlobalInterceptorHandles {
  export type HookType = 'created' | 'mounted' | 'activated' | 'beforeUnmount' | 'unmounted'
  export type EventType = 'event.clearActived' | 'event.clearFilter' | 'event.clearAreas' | 'event.showMenu' | 'event.keydown' | 'event.export' | 'event.import'
  export type Type = HookType | EventType

  export type InterceptorCallback = (params: any) => any

  interface InterceptorParams {
    $grid?: VxeGridConstructor & VxeGridPrivateMethods
    $table: VxeTableConstructor & VxeTablePrivateMethods
    $event: Event
  }

  export interface InterceptorKeydownParams extends InterceptorParams { }
  export interface InterceptorClearFilterParams extends InterceptorParams { }
  export interface InterceptorClearActivedParams extends InterceptorParams { }
  export interface InterceptorClearAreasParams extends InterceptorParams { }

  export interface InterceptorExportParams extends InterceptorParams {
    options: VxeTablePropTypes.ExportHandleOptions
    columns: VxeTableDefines.ColumnInfo[]
    colgroups: VxeTableDefines.ColumnInfo[][]
    datas: any[]
  }

  export interface InterceptorImportParams extends InterceptorParams {
    file: File
    options: VxeTablePropTypes.ExportHandleOptions
    columns: VxeTableDefines.ColumnInfo[]
    datas: any[]
  }

  export interface InterceptorShowMenuParams extends InterceptorParams {
    type: 'header' | 'body' | 'footer'
    options: VxeTableDefines.MenuFirstOption[][]
    columns: VxeTableDefines.ColumnInfo[]
    row?: any
    rowIndex?: number
    column?: VxeTableDefines.ColumnInfo
    columnIndex?: number
  }
}

/**
 * 全局事件拦截器
 */
export interface VxeGlobalInterceptor {
  mixin(options: {
    [type: string]: VxeGlobalInterceptorHandles.InterceptorCallback
  }): VxeGlobalInterceptor
  get(type: VxeGlobalInterceptorHandles.Type): VxeGlobalInterceptorHandles.InterceptorCallback[]
  add(type: VxeGlobalInterceptorHandles.Type, callback: VxeGlobalInterceptorHandles.InterceptorCallback): VxeGlobalInterceptor
  delete(type: VxeGlobalInterceptorHandles.Type, callback?: VxeGlobalInterceptorHandles.InterceptorCallback): void
}
