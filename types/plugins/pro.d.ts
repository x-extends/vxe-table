import { VxeTableDefines } from '../table'
import { RowInfo } from '../component'

export interface VxeProPluginMethods {
  /**
   * 用于 mouse-config.area，用于获取鼠标选择的区域
   */
  getCellAreas(): VxeTableProDefines.MouseCellArea[];
  /**
   * 用于 mouse-config.area，用于获取区域中的活动单元格
   */
  getActiveCellArea(): VxeTableProDefines.MouseActiveCellArea;
  /**
   * 用于 mouse-config.area，复制指定区域，返回转换后的文本
   */
  copyCellArea(): { text: string, html: string };
  /**
   * 用于 mouse-config.area，剪贴指定区域，返回转换后的文本
   */
  cutCellArea(): { text: string, html: string };
  /**
   * 用于 mouse-config.area，粘贴从表格中被复制的数据，如果不是从表格中操作，则无法粘贴
   */
  pasteCellArea(): Promise<any>;
  /**
   * 用于 mouse-config.area，用于清除鼠标选择的区域
   */
  clearCellAreas(): Promise<any>;
  /**
   * 用于 mouse-config.area，手动清除标记为复制粘贴的区域
   */
  clearCopyCellArea(): Promise<any>;
  /**
   * 用于 mouse-config.area，选取指定区域的单元格
   * @param areas 指定区域
   */
  setCellAreas(areas: VxeTableProDefines.CellAreaOptions): Promise<any>;
  /**
   * 用于 mouse-config.area，设置活动的区域的单元格
   * @param activeArea
   */
  setActiveCellArea(activeArea: VxeTableProDefines.ActiveCellAreaOptions): Promise<any>;
  /**
   * 用于 mouse-config.area，打开单元格查找功能
   */
  openFind(): Promise<any>;
  /**
   * 用于 mouse-config.area，打开单元格替换功能
   */
  openReplace(): Promise<any>;
}

export interface VxeProPluginPrivateMethods {
  handleKeyboardEvent(evnt: Event): void;
  handleHeaderCellAreaEvent(evnt: Event, params: any): void;
  handleCellAreaEvent(evnt: Event, params: any): void;
  handleUpdateCellAreas(): void;
  handleCopyCellAreaEvent(evnt: Event): void;
  handlePasteCellAreaEvent(evnt: Event): void;
  handleCutCellAreaEvent(evnt: Event): void;
  triggerCellExtendMousedownEvent(evnt: any, params: any): void;
}

declare module '../table' {
  interface VxeTableMethods extends VxeProPluginMethods { }
  interface VxeTablePrivateMethods extends VxeProPluginPrivateMethods { }
}

export namespace VxeTableProDefines {
  export interface MouseActiveCellArea {
    row: any;
    column: VxeTableDefines.ColumnInfo;
    top: number;
    left: number;
    width: number;
    height: number;
  }
  
  export interface MouseCellArea {
    main: boolean;
    rows: any[];
    cols: VxeTableDefines.ColumnInfo[];
    top: number;
    left: number;
    width: number;
    height: number;
  }
  
  export interface CellAreaOptions {
    main: boolean;
    startColumn: VxeTableDefines.ColumnInfo;
    endColumn: VxeTableDefines.ColumnInfo;
    startRow: any;
    endRow: any;
  }
  
  export interface ActiveCellAreaOptions {
    column: VxeTableDefines.ColumnInfo;
    row: RowInfo;
  }
}
