import { VxeEvent } from '../component'
import { VxeTableDefines, VxeTableConstructor, VxeTablePrivateMethods } from '../table'
import { VxeGridConstructor, VxeGridPrivateMethods } from '../grid'

export interface VxeTableProMethods {
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
export interface VxeProPluginMethods extends VxeTableProMethods { }

export interface VxeTableProPrivateMethods {
  handleKeyboardEvent(evnt: KeyboardEvent): void;
  handleHeaderCellAreaEvent(evnt: KeyboardEvent, params: VxeTableDefines.HeaderCellClickEventParams): void;
  handleCellAreaEvent(evnt: MouseEvent, params: VxeTableDefines.CellClickEventParams): void;
  handleUpdateCellAreas(): void;
  handleCopyCellAreaEvent(evnt: ClipboardEvent): void;
  handlePasteCellAreaEvent(evnt: ClipboardEvent): void;
  handleCutCellAreaEvent(evnt: ClipboardEvent): void;
  triggerCellExtendMousedownEvent(evnt: MouseEvent, params: any): void;
  triggerCopyCellAreaEvent(evnt: MouseEvent): void;
  triggerCutCellAreaEvent(evnt: MouseEvent): void;
  triggerPasteCellAreaEvent(evnt: MouseEvent): void;
  triggerFNROpenEvent(evnt: MouseEvent, tab: 'find' | 'replace'): void;
}
export interface VxeProPluginPrivateMethods extends VxeTableProPrivateMethods { }

declare module '../table' {
  interface VxeTableMethods extends VxeTableProMethods { }
  interface VxeTablePrivateMethods extends VxeTableProPrivateMethods { }
}

export interface VXETableProClipboard {
  text?: string;
  html?: string;
  [key: string]: any;
}

declare module '../vxe-table' {
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
    startColumn: VxeTableDefines.ColumnInfo | number;
    endColumn: VxeTableDefines.ColumnInfo | number;
    startRow: any;
    endRow: any;
  }

  export interface ActiveCellAreaConfig {
    area: VxeTableProDefines.MouseCellArea;
    column: VxeTableDefines.ColumnInfo | number;
    row: any;
  }

  export type ExtendCellAreaDirection = 'up' | 'down' | 'left' | 'right'

  export interface ExtendCellAreaCalcBaseParams {
    rows: any[];
    cols: VxeTableDefines.ColumnInfo[];
    targetValues: any[][];
    targetRows: any[];
    targetCols: VxeTableDefines.ColumnInfo[];
    extendRows: any[];
    extendCols: VxeTableDefines.ColumnInfo[];
    direction: ExtendCellAreaDirection;
    $table: VxeTableConstructor & VxeTablePrivateMethods;
    $grid: VxeGridConstructor | null | undefined;
  }

  interface EventParams extends VxeEvent {
    $table: VxeTableConstructor & VxeTablePrivateMethods;
    $grid: VxeGridConstructor | null | undefined;
  }

  type FnrTab = 'find' | 'replace';

  export interface OpenFnrParams {
    tab: FnrTab;
  }
  export interface OpenFnrEventParams extends EventParams, OpenFnrParams { }

  export interface FnrChangeParams extends OpenFnrParams { }
  export interface FnrChangeEventParams extends EventParams, FnrChangeParams { }

  export interface FnrFindParams {
    findValue: string;
    row: any;
    column: VxeTableDefines.ColumnInfo;
  }
  export interface FnrFindEventParams extends FnrFindParams { }

  export interface FindAndReplaceResult {
    row: any
    _rowIndex: number
    column: VxeTableDefines.ColumnInfo
    _columnIndex: number
  }

  export interface FnrFindAllParams {
    findValue: string;
    result: FindAndReplaceResult[]
  }
  export interface FnrFindAllEventParams extends FnrFindAllParams { }

  export interface FnrReplaceParams {
    findValue: string;
    replaceValue: string;
    row: any;
    column: VxeTableDefines.ColumnInfo;
  }
  export interface FnrReplaceEventParams extends FnrReplaceParams { }

  export interface FnrReplaceAllParams {
    findValue: string;
    replaceValue: string;
    result: FindAndReplaceResult[]
  }
  export interface FnrReplaceAllEventParams extends FnrReplaceAllParams { }

  export interface CellAreaCopyParams {
    status: boolean;
    targetAreas: VxeTableProDefines.CellAreaParams[];
    cellValues: string[][];
  }
  export interface CellAreaCopyEventParams extends EventParams, CellAreaCopyParams { }
}

export type VxeTableProEmits = [
  'change-fnr', // 废弃

  'open-fnr',
  'fnr-change',
  'fnr-find',
  'fnr-find-all',
  'fnr-replace',
  'fnr-replace-all',
  'cell-area-copy',
  'cell-area-cut',
  'cell-area-paste',
  'cell-area-merge',
  'clear-cell-area-merge',
  'header-cell-area-selection',
  'cell-area-selection-start',
  'cell-area-selection-end',
  'cell-area-extension-start',
  'cell-area-extension-end',
]

declare module '../table' {
  interface VxeTableEventProps {
    onOpenFnr?: VxeTableEvents.OpenFnr;
    onFnrChange?: VxeTableEvents.FnrChange;
    onFnrFind?: VxeTableEvents.FnrFind;
    onFnrFindAll?: VxeTableEvents.FnrFindAll;
    onFnrReplace?: VxeTableEvents.FnrReplace;
    onFnrReplaceAll?: VxeTableEvents.FnrReplaceAll;
    onCellAreaCopy?: VxeTableEvents.CellAreaCopy;
  }
  interface VxeTableListeners {
    openFnr?: VxeTableEvents.OpenFnr;
    fnrChange?: VxeTableEvents.FnrChange;
    fnrFind?: VxeTableEvents.FnrFind;
    fnrFindAll?: VxeTableEvents.FnrFindAll;
    fnrReplace?: VxeTableEvents.FnrReplace;
    fnrReplaceAll?: VxeTableEvents.FnrReplaceAll;
    cellAreaCopy?: VxeTableEvents.CellAreaCopy;
  }
  namespace VxeTableEvents {
    export type OpenFnr = (params: VxeTableProDefines.OpenFnrParams) => void;
    export type FnrChange = (params: VxeTableProDefines.FnrChangeParams) => void;
    export type FnrFind = (params: VxeTableProDefines.FnrFindParams) => void;
    export type FnrFindAll = (params: VxeTableProDefines.FnrFindAllParams) => void;
    export type FnrReplace = (params: VxeTableProDefines.FnrReplaceParams) => void;
    export type FnrReplaceAll = (params: VxeTableProDefines.FnrReplaceAllParams) => void;
    export type CellAreaCopy = (params: VxeTableProDefines.CellAreaCopyParams) => void;
  }
}

declare module '../grid' {
  interface VxeGridEventProps {
    onOpenFnr?: VxeGridEvents.OpenFnr;
    onFnrChange?: VxeGridEvents.FnrChange;
    onFnrFind?: VxeGridEvents.FnrFind;
    onFnrFindAll?: VxeGridEvents.FnrFindAll;
    onFnrReplace?: VxeGridEvents.FnrReplace;
    onFnrReplaceAll?: VxeGridEvents.FnrReplaceAll;
    onCellAreaCopy?: VxeGridEvents.CellAreaCopy;
  }
  interface VxeGridListeners {
    openFnr?: VxeGridEvents.OpenFnr;
    changeFnr?: VxeGridEvents.FnrChange;
    fnrFind?: VxeGridEvents.FnrFind;
    fnrFindAll?: VxeGridEvents.FnrFindAll;
    fnrReplace?: VxeGridEvents.FnrReplace;
    fnrReplaceAll?: VxeGridEvents.FnrReplaceAll;
    cellAreaCopy?: VxeGridEvents.CellAreaCopy;
  }
  namespace VxeGridEvents {
    export type OpenFnr = (params: VxeTableProDefines.OpenFnrParams) => void;
    export type FnrChange = (params: VxeTableProDefines.FnrChangeParams) => void;
    export type FnrFind = (params: VxeTableProDefines.FnrFindParams) => void;
    export type FnrFindAll = (params: VxeTableProDefines.FnrFindAllParams) => void;
    export type FnrReplace = (params: VxeTableProDefines.FnrReplaceParams) => void;
    export type FnrReplaceAll = (params: VxeTableProDefines.FnrReplaceAllParams) => void;
    export type CellAreaCopy = (params: VxeTableProDefines.CellAreaCopyParams) => void;
  }
}
