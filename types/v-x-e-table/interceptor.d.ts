import { number } from 'vue-i18n'
import { VxeTableDefines, VxeTablePropTypes } from '../table'
import { VxeGridConstructor } from '../grid'

export namespace VxeGlobalInterceptorHandles {
  export type InterceptorCallback = (params: any, event: Event) => any;

  export interface InterceptorParams {
    $grid?: VxeGridConstructor;
    $event: Event;
  }

  export interface InterceptorKeydownParams extends InterceptorParams { }

  export interface InterceptorExportParams extends InterceptorParams {
    options: VxeTablePropTypes.ExportConfig;
    columns: VxeTableDefines.ColumnInfo[];
    datas: any[];
  }

  export interface InterceptorImportParams extends InterceptorParams {
    file: File;
    options: VxeTablePropTypes.ExportConfig;
    columns: VxeTableDefines.ColumnInfo[];
    datas: any[];
  }

  export interface InterceptorMenuParams extends InterceptorParams {
    type: 'header' | 'body' | 'footer';
    options: VxeTableDefines.MenuFirstOption[][];
    columns: VxeTableDefines.ColumnInfo[];
    row?: any;
    rowIndex?: number;
    column?: VxeTableDefines.ColumnInfo;
    columnIndex?: number;
  }
}

/**
 * 全局事件拦截器
 */
export interface VxeGlobalInterceptor {
  mixin(options: {
    [type: string]: VxeGlobalInterceptorHandles.InterceptorCallback;
  }): VxeGlobalInterceptor;
  get(type: string): VxeGlobalInterceptorHandles.InterceptorCallback[];
  add(type: string, callback: VxeGlobalInterceptorHandles.InterceptorCallback): VxeGlobalInterceptor;
  delete(type: string, callback?: VxeGlobalInterceptorHandles.InterceptorCallback): void;
}
