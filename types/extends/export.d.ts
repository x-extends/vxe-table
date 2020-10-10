import { VXETableModule, RowInfo } from '../component'
import { Table } from '../table'
import { Grid } from '../grid'
import { ColumnInfo } from '../column'
import { GridRenderParams } from './renderer'

/**
 * 导出
 */
export declare class Export extends VXETableModule {}

/**
 * 导出参数
 */
export interface ExportOptons {
  /**
   * 文件名
   */
  filename?: string;
  /**
   * 表名
   */
  sheetName?: string;
  /**
   * 文件类型
   */
  type?: string;
  /**
   * 可选文件类型列表
   */
  types?: string[];
  /**
   * 输出数据的方式
   */
  mode?: string;
  /**
   * 输出数据的方式列表
   */
  modes?: string[];
  /**
   * 是否为源数据
   */
  original?: boolean;
  /**
   * 是否显示内置的消息提示
   */
  message?: boolean;
  /**
   * 是否需要表头
   */
  isHeader?: boolean;
  /**
   * 是否需要表尾
   */
  isFooter?: boolean;
  /**
   * 是否马上下载，如果设置为 false 则通过返回结果为内容的 Promise
   */
  download?: boolean;
  /**
   * 自定义数据
   */
  data?: any[];
  /**
   * 自定义列
   */
  columns?: ColumnInfo[];
  /**
   * 列过滤方法
   */
  columnFilterMethod?(params: { column: ColumnInfo, $columnIndex: number }): boolean;
  /**
   * 数据过滤方法
   */
  dataFilterMethod?(params: { row: RowInfo, $rowIndex: number }): boolean;
  /**
   * 表尾过滤方法
   */
  footerFilterMethod?(params: { items: any[], $rowIndex: number }): boolean;
  /**
   * 是否服务端导出
   */
  remote?: boolean;
  /**
   * 只对 remote=true 有效，用于自定义导出逻辑
   */
  exportMethod?(params: { $table: Table, $grid?: Grid, options: ExportOptons }): Promise<any>;

  [name: string]: any;
}

/**
 * 导入参数
 */
export interface ImportOptons {
  /**
   * 可选文件类型列表
   */
  types?: string[];
  /**
   * 导入数据的方式
   */
  mode?: string;
  /**
   * 是否显示内置的消息提示
   */
  message?: boolean;
  /**
   * 是否服务端导出
   */
  remote?: boolean;
  /**
   * 只对 remote=true 有效，用于自定义导入逻辑
   */
  importMethod?(params: { $table: Table, $grid: Grid, file: File, options: ExportOptons }): Promise<any>;

  [name: string]: any;
}

/**
 * 打印参数
 */
export interface PrintOptons {
  /**
   * 表名
   */
  sheetName?: string;
  /**
   * 输出数据的方式
   */
  mode?: string;
  /**
   * 输出数据的方式列表
   */
  modes?: string[];
  /**
   * 是否为源数据
   */
  original?: boolean;
  /**
   * 是否需要表头
   */
  isHeader?: boolean;
  /**
   * 是否需要表尾
   */
  isFooter?: boolean;
  /**
   * 自定义数据
   */
  data?: any[];
  /**
   * 自定义列
   */
  columns?: ColumnInfo[];
  /**
   * 自定义打印内容
   */
  content?: string;
  /**
   * 列过滤方法
   */
  columnFilterMethod?(params: { column: ColumnInfo, $columnIndex: number }): boolean;
  /**
   * 数据过滤方法
   */
  dataFilterMethod?(params: { row: RowInfo, $rowIndex: number }): boolean;
  /**
   * 表尾过滤方法
   */
  footerFilterMethod?(params: { items: any[], $rowIndex: number }): boolean;
  /**
   * 打印之前的方法，可以通过返回自定义打印的内容
   */
  beforePrintMethod?(params: { content: string, options: PrintOptons }): string;

  [name: string]: any;
}

export interface ReadFileOptions {
  multiple?: boolean;
  types?: string[];
  message?: boolean;
}

export interface ColumnExportCellRenderParams extends GridRenderParams {
  row: RowInfo;
  column: ColumnInfo;
}

export interface ColumnExportFooterRenderParams extends GridRenderParams {
  items: any[];
  _columnIndex: number;
  column: ColumnInfo;
}
