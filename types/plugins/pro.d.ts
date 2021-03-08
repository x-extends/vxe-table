import { VxeTableDefines } from '../table'

export interface VxeProPluginMethods {
  /**
   * 用于 mouse-config.area，用于获取鼠标选择的区域
   */
  getCellAreas(): VxeTableProDefines.MouseCellArea[];
  /**
   * 用于 mouse-config.area，用于获取区域中的活动单元格
   */
  getActiveCellArea(): VxeTableProDefines.MouseActiveCellArea | null;
  /**
   * 用于 mouse-config.area，用于获取标记为复制粘贴的区域
   */
  getCopyCellArea(): VxeTableProDefines.MouseCellArea | null;
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
   * @param areaConfigs 指定区域
   */
  setCellAreas(areaConfigs: VxeTableProDefines.CellAreaConfig[], activeArea?: {
    area?: VxeTableProDefines.CellAreaConfig;
    column: VxeTableDefines.ColumnInfo;
    row: any;
  }): Promise<any>;
  /**
   * 用于 mouse-config.area，设置活动的区域的单元格
   * @param activeArea
   */
  setActiveCellArea(activeArea: VxeTableProDefines.ActiveCellAreaConfig): Promise<any>;
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
  handleKeyboardEvent(evnt: KeyboardEvent): void;
  handleHeaderCellAreaEvent(evnt: KeyboardEvent, params: VxeTableDefines.HeaderCellClickEventParams): void;
  handleCellAreaEvent(evnt: MouseEvent, params: VxeTableDefines.CellClickEventParams): void;
  handleUpdateCellAreas(): void;
  handleCopyCellAreaEvent(evnt: ClipboardEvent): void;
  handlePasteCellAreaEvent(evnt: ClipboardEvent): void;
  handleCutCellAreaEvent(evnt: ClipboardEvent): void;
  triggerCellExtendMousedownEvent(evnt: MouseEvent, params: any): void;
}

declare module '../table' {
  interface VxeTableMethods extends VxeProPluginMethods { }
  interface VxeTablePrivateMethods extends VxeProPluginPrivateMethods { }
}

export interface VXETableProClipboard {
  text?: string;
  html?: string;
  [key: string]: any;
}

declare module '../v-x-e-table' {
  interface VXETableConfig {
    clipboard?: VXETableProClipboard;
  }
}

export namespace VxeTableProDefines {
  export interface CellAreaParams {
    cols: VxeTableDefines.ColumnInfo[];
    rows: any;
  }

  export interface FNRTab {
    value: string;
    label: string;
  }
  
  export interface FNRSearch {
    seq: number;
    row: number;
    col: number;
    isActived: boolean;
    value: string;
  }

  export interface MouseActiveCellArea {
    el?: HTMLElement | null;
    type: CELL_AREA_TYPE;
    area: MouseCellArea;
    row: any;
    column: VxeTableDefines.ColumnInfo;
    top: number;
    left: number;
    width: number;
    height: number;
  }
  
  export interface MouseCellArea {
    el?: HTMLElement | null;
    leftEl?: HTMLElement | null;
    rightEl?: HTMLElement | null;
    type: CELL_AREA_TYPE;
    rows: any[];
    cols: VxeTableDefines.ColumnInfo[];
    top: number;
    left: number;
    width: number;
    height: number;
  }

  export type CELL_AREA_TYPE = 'main' | 'copy' | 'extend' | 'multi' | 'active'
  
  export interface CellAreaConfig {
    type?: CELL_AREA_TYPE;
    startColumn: VxeTableDefines.ColumnInfo;
    endColumn: VxeTableDefines.ColumnInfo;
    startRow: any;
    endRow: any;
  }

  export interface ActiveCellAreaConfig {
    area: VxeTableProDefines.MouseCellArea;
    column: VxeTableDefines.ColumnInfo;
    row: any;
  }
}
