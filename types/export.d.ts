import { VXEComponent } from './component'
import { VxeTablePropTypes, VxeTableDefines, VxeTableConstructor, VxeTableMethods, VxeTablePrivateMethods } from './table'
import { VxeGridConstructor } from './grid'

/**
 * 表格扩展 - 导出、导入、打印
 */
export const Export: VXEComponent<{}>;

export interface TableExportMethods {
  /**
   * 打开高级导出
   * @param options 参数
   */
  openExport(options?: VxeTablePropTypes.ExportConfig): void;
  /**
   * 将表格数据导出
   * @param options 参数
   */
  exportData(options?: VxeTablePropTypes.ExportConfig): Promise<any>;
  /**
   * 打开高级导入
   * @param options 参数
   */
  openImport(options?: VxeTablePropTypes.ImportConfig): void;
  /**
   * 将数据导入表格
   * @param options 参数
   */
  importData(options?: VxeTablePropTypes.ImportConfig): Promise<any>;
  /**
   * 将一个文件的数据导入表格
   * @param file 文件流
   * @param options 参数
   */
  importByFile(file: File, options: VxeTablePropTypes.ImportConfig): Promise<any>;
  /**
   * 保存文件到本地
   * @param options
   */
  saveFile: SaveFileFunction;
  /**
   * 读取本地文件
   * @param options 参数
   */
  readFile: ReadFileFunction;
  /**
   * 打印表格数据
   * @param options 参数
   */
  print: PrintFunction;
  /**
   * 打开高级打印
   * @param options 参数
   */
  openPrint(options?: VxeTablePropTypes.PrintConfig): void;
}

export interface TableExportPrivateMethods { }

declare module './grid' {
  interface VxeGridMethods extends TableExportMethods { }
}

declare module './table' {
  interface VxeTableMethods extends TableExportMethods { }
  interface VxeTablePrivateMethods extends TableExportPrivateMethods { }
  namespace VxeTableDefines {
    interface ExtortSheetMethodParams {
      $table: VxeTableConstructor;
      $grid?: VxeGridConstructor;
      options: VxeTablePropTypes.ExportHandleOptions;
      datas: any[];
      columns: VxeTableDefines.ColumnInfo[];
      colgroups: VxeTableDefines.ColumnInfo[][];
    }
  }
  namespace VxeTablePropTypes {
    /**
     * 导入参数
     */
    export interface ImportConfig {
      /**
       * 可选文件类型列表
       */
      types?: string[];
      /**
       * 导入数据的方式
       */
      mode?: string;
      modes?: string[];
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
      importMethod?(params: {
        $table: VxeTableConstructor;
        $grid: VxeGridConstructor;
        file: File;
        options: ImportHandleOptions;
      }): Promise<any>;
      beforeImportMethod?(params: {
        $table: VxeTableConstructor;
        options: any;
      }): void;
      afterImportMethod?(params: {
        $table: VxeTableConstructor;
        options: any;
        status: boolean;
      }): void;
    }
    export interface ImportOpts extends ImportConfig {
      modes: string[];
    }
    export interface ImportHandleOptions extends ImportConfig {
      data: any[];
      columns: VxeTableDefines.ColumnInfo[];
      colgroups: VxeTableDefines.ColumnInfo[][];
    }

    interface ExportOrPrintColumnOption {
      colid?: number;
      type?: string;
      field?: string;
    }

    /**
     * 导出参数
     */
    export interface ExportConfig {
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
      isMerge?: boolean;
      isColgroup?: boolean;
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
      columns?: VxeTableDefines.ColumnInfo[] | ExportOrPrintColumnOption[];
      /**
       * 列过滤方法
       */
      columnFilterMethod?(params: { column: VxeTableDefines.ColumnInfo, $columnIndex: number }): boolean;
      /**
       * 数据过滤方法
       */
      dataFilterMethod?(params: { row: any, $rowIndex: number }): boolean;
      /**
       * 表尾过滤方法
       */
      footerFilterMethod?(params: { items: any[], $rowIndex: number }): boolean;
      /**
       * 是否服务端导出
       */
      remote?: boolean;
      /**
       * 只对 remote=html,xlsx 有效，是否使用样式
       */
      useStyle?: boolean;
      sheetMethod?(params: VxeTableDefines.ExtortSheetMethodParams): void;
      /**
       * 只对 remote=true 有效，用于自定义导出逻辑
       */
      exportMethod?(params: {
        $table: VxeTableConstructor;
        $grid?: VxeGridConstructor;
        options: ExportHandleOptions;
      }): Promise<any>;
      beforeExportMethod?(params: {
        options: ExportHandleOptions;
      }): void;
      afterExportMethod?(params: {
        options: ExportHandleOptions;
      }): void;
    }
    export interface ExportOpts extends ExportConfig { }
    export interface ExportHandleOptions extends ExportConfig {
      data: any[];
      columns: VxeTableDefines.ColumnInfo[];
      colgroups: VxeTableDefines.ColumnInfo[][];
    }

    /**
     * 打印参数
     */
    export interface PrintConfig {
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
      columns?: VxeTableDefines.ColumnInfo[] | ExportOrPrintColumnOption[];
      /**
       * 打印样式
       */
      style?: string;
      /**
       * 自定义打印内容
       */
      content?: string;
      /**
       * 列过滤方法
       */
      columnFilterMethod?(params: { column: VxeTableDefines.ColumnInfo, $columnIndex: number }): boolean;
      /**
       * 数据过滤方法
       */
      dataFilterMethod?(params: { row: any, $rowIndex: number }): boolean;
      /**
       * 表尾过滤方法
       */
      footerFilterMethod?(params: { items: any[], $rowIndex: number }): boolean;
      /**
       * 打印之前的方法，可以通过返回自定义打印的内容
       */
      beforePrintMethod?(params: {
        $table: VxeTableConstructor | null;
        content: string;
        options: PrintHandleOptions;
      }): string;
    }
    export interface PrintOpts extends PrintConfig { }
    export interface PrintHandleOptions extends PrintConfig { }
  }
}

export type SaveFileFunction = (options: {
  filename: string;
  type: string;
  content: string | Blob;
}) => Promise<any>;

export type ReadFileFunction = (options?: {
  multiple?: boolean;
  types?: string[];
  message?: boolean;
}) => Promise<{
  status: boolean;
  files: FileList;
  file: File;
}>;

export type PrintFunction = (options?: VxeTablePropTypes.PrintConfig) => any;
