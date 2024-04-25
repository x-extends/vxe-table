import { VxeEvent } from '../component'
import { VxeTableDefines, VxeTableConstructor, VxeTablePrivateMethods, VxeTableDataRow } from '../table'
import { VxeGridConstructor } from '../grid'

/* eslint-disable no-use-before-define */

export interface VxeTableProMethods<D = VxeTableDataRow> {
  /**
   * 用于 mouse-config.area，用于获取鼠标选择的区域
   */
  getCellAreas(): VxeTableProDefines.MouseCellArea[]
  /**
   * 用于 mouse-config.area，用于获取区域中的活动单元格
   */
  getActiveCellArea(): VxeTableProDefines.MouseActiveCellArea | null
  /**
   * @deprecated
   */
  getCopyCellArea(): VxeTableProDefines.MouseCellArea | null
  /**
   * 用于 mouse-config.area，用于获取标记为复制粘贴的区域
   */
  getCopyCellAreas(): VxeTableProDefines.MouseCellArea[]
  /**
   * 用于 mouse-config.area，复制指定区域，返回转换后的文本
   */
  copyCellArea(): { text: string, html: string }
  /**
   * 用于 mouse-config.area，剪贴指定区域，返回转换后的文本
   */
  cutCellArea(): { text: string, html: string }
  /**
   * 用于 mouse-config.area，粘贴从表格中被复制的数据，如果不是从表格中操作，则无法粘贴
   */
  pasteCellArea(): Promise<any>
  /**
   * 用于 mouse-config.area，用于清除鼠标选择的区域，可以指定清除的区域
   */
  clearCellAreas(area?: number | VxeTableProDefines.MouseCellArea): Promise<any>
  /**
   * 用于 mouse-config.area，手动清除标记为复制粘贴的区域
   */
  clearCopyCellArea(): Promise<any>
  /**
   * 用于 mouse-config.area，选取指定区域的单元格
   * @param areaConfigs 指定区域
   */
  setCellAreas(areaConfigs: VxeTableProDefines.CellAreaConfig[], activeArea?: {
    area?: number | VxeTableProDefines.CellAreaConfig<D>
    column?: number | VxeTableDefines.ColumnInfo<D>
    row?: D | number
  }): Promise<any>
  /**
   * 用于 mouse-config.area，设置活动的区域的单元格
   * @param activeArea
   */
  setActiveCellArea(activeArea: VxeTableProDefines.ActiveCellAreaConfig): Promise<any>
  /**
   * 打开单元格查找窗口
   */
  openFind(): Promise<any>
  /**
   * 打开单元格替换窗口
   */
  openReplace(): Promise<any>
  /**
   * 手动打开查找与替换窗口
   */
  openFNR(options: {
    type?: 'find' | 'replace' | '' | null
  }): Promise<any>
  /**
   * 手动关闭查找与替换窗口
   */
  closeFNR(): Promise<any>
}
export type VxeProPluginMethods<D = VxeTableDataRow> = VxeTableProMethods<D>

export interface VxeTableProPrivateMethods<D = VxeTableDataRow> {
  handleKeyboardEvent(evnt: KeyboardEvent): void
  handleHeaderCellAreaEvent(evnt: KeyboardEvent, params: VxeTableDefines.HeaderCellClickEventParams<D>): void
  handleCellAreaEvent(evnt: MouseEvent, params: VxeTableDefines.CellClickEventParams<D>): void
  handleFilterEvent(evnt: Event, params: VxeTableDefines.FilterChangeEventParams<D>): any
  handleSortEvent(evnt: Event, params: VxeTableDefines.SortChangeEventParams<D>): any
  handleUpdateCellAreas(): any
  handleCopyCellAreaEvent(evnt: ClipboardEvent): void
  handlePasteCellAreaEvent(evnt: ClipboardEvent): void
  handleCutCellAreaEvent(evnt: ClipboardEvent): void
  triggerCellExtendMousedownEvent(evnt: MouseEvent, params: any): void
  triggerCopyCellAreaEvent(evnt: MouseEvent): void
  triggerCutCellAreaEvent(evnt: MouseEvent): void
  triggerPasteCellAreaEvent(evnt: MouseEvent): void
  triggerFNROpenEvent(evnt: MouseEvent, tab: 'find' | 'replace'): void
}
export type VxeProPluginPrivateMethods<D = VxeTableDataRow> = VxeTableProPrivateMethods<D>

declare module '../table' {
  export interface VxeTableMethods<D = VxeTableDataRow> extends VxeTableProMethods<D> { }
  export interface VxeTablePrivateMethods<D = VxeTableDataRow> extends VxeTableProPrivateMethods<D> { }
}

declare module '../grid' {
  export interface VxeGridMethods<D = VxeTableDataRow> extends VxeTableProMethods<D> { }
  export interface VxeGridPrivateMethods<D = VxeTableDataRow> extends VxeTableProPrivateMethods<D> { }
}

export namespace VxeTableProDefines {
  export interface CellAreaParams<D = VxeTableDataRow> {
    cols: VxeTableDefines.ColumnInfo<D>[]
    rows: D[]
  }

  export interface FNRTab {
    value: string
    label: string
  }

  export interface FNRSearch {
    seq: number
    row: number
    col: number
    isActived: boolean
    value: string
  }

  export interface MouseActiveCellArea<D = VxeTableDataRow> {
    el?: HTMLElement | null
    type: CELL_AREA_TYPE
    area: MouseCellArea<D>
    row: any
    column: VxeTableDefines.ColumnInfo<D>
    top: number
    left: number
    width: number
    height: number
  }

  export interface MouseCellArea<D = VxeTableDataRow> {
    el?: HTMLElement | null
    leftEl?: HTMLElement | null
    rightEl?: HTMLElement | null
    type: CELL_AREA_TYPE
    rows: D[]
    cols: VxeTableDefines.ColumnInfo<D>[]
    top: number
    left: number
    width: number
    height: number
  }

  export type CELL_AREA_TYPE = 'main' | 'copy' | 'extend' | 'multi' | 'active'

  export interface CellAreaConfig<D = VxeTableDataRow> {
    type?: CELL_AREA_TYPE
    startColumn: VxeTableDefines.ColumnInfo<D> | number
    endColumn: VxeTableDefines.ColumnInfo<D> | number
    startRow: D | number
    endRow: D | number
  }

  export interface ActiveCellAreaConfig<D = VxeTableDataRow> {
    area: VxeTableProDefines.MouseCellArea<D> | number
    column: VxeTableDefines.ColumnInfo<D> | number
    row: D | number
  }

  export type ExtendCellAreaDirection = 'up' | 'down' | 'left' | 'right'

  export interface ExtendCellAreaCalcBaseParams<D = VxeTableDataRow> {
    rows: D[]
    cols: VxeTableDefines.ColumnInfo<D>[]
    targetValues: any[][]
    targetRows: any[]
    targetCols: VxeTableDefines.ColumnInfo<D>[]
    extendRows: any[]
    extendCols: VxeTableDefines.ColumnInfo<D>[]
    direction: ExtendCellAreaDirection
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    $grid: VxeGridConstructor<D> | null | undefined
  }

  interface EventParams<D = VxeTableDataRow> extends VxeEvent {
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    $grid: VxeGridConstructor<D> | null | undefined
  }

  type FnrTab = 'find' | 'replace'

  export interface OpenFnrParams<D = VxeTableDataRow> {
    tab: FnrTab
  }
  export interface OpenFnrEventParams<D = VxeTableDataRow> extends EventParams<D>, OpenFnrParams { }

  export type FnrChangeParams<D = VxeTableDataRow> = OpenFnrParams<D>
  export interface FnrChangeEventParams<D = VxeTableDataRow> extends EventParams<D>, FnrChangeParams { }

  export interface FnrFindParams<D = VxeTableDataRow> {
    findValue: string
    row: D
    column: VxeTableDefines.ColumnInfo<D>
  }
  export type FnrFindEventParams<D = VxeTableDataRow> = FnrFindParams<D>

  export interface FindAndReplaceResult<D = VxeTableDataRow> {
    row: D
    _rowIndex: number
    column: VxeTableDefines.ColumnInfo<D>
    _columnIndex: number
  }

  export interface FnrFindAllParams<D = VxeTableDataRow> {
    findValue: string
    result: FindAndReplaceResult<D>[]
  }
  export type FnrFindAllEventParams<D = VxeTableDataRow> = FnrFindAllParams<D>

  export interface FnrReplaceParams<D = VxeTableDataRow> {
    findValue: string
    replaceValue: string
    row: any
    column: VxeTableDefines.ColumnInfo<D>
  }
  export type FnrReplaceEventParams<D = VxeTableDataRow> = FnrReplaceParams<D>

  export interface FnrReplaceAllParams<D = VxeTableDataRow> {
    findValue: string
    replaceValue: string
    result: FindAndReplaceResult<D>[]
  }
  export type FnrReplaceAllEventParams<D = VxeTableDataRow> = FnrReplaceAllParams<D>

  export interface CellAreaCopyParams<D = VxeTableDataRow> {
    status: boolean
    invalid: boolean
    targetAreas: VxeTableProDefines.CellAreaParams<D>[]
    cellValues: string[][]
  }
  export interface CellAreaCopyEventParams<D = VxeTableDataRow> extends EventParams<D>, CellAreaCopyParams<D> { }

  export interface CellAreaCutParams<D = VxeTableDataRow> {
    status: boolean
    invalid: boolean
    targetAreas: VxeTableProDefines.CellAreaParams<D>[]
    cellValues: string[][]
  }
  export interface CellAreaCutEventParams<D = VxeTableDataRow> extends EventParams<D>, CellAreaCutParams<D> { }

  export interface CellAreaPasteParams<D = VxeTableDataRow> {
    status: boolean
    invalid: boolean
    targetAreas: VxeTableProDefines.CellAreaParams<D>[]
  }
  export interface CellAreaPasteEventParams<D = VxeTableDataRow> extends EventParams<D>, CellAreaPasteParams<D> { }

  export interface CellAreaMergeParams<D = VxeTableDataRow> {
    status: boolean
    targetAreas: VxeTableProDefines.CellAreaParams<D>[]
  }
  export interface CellAreaMergeEventParams<D = VxeTableDataRow> extends EventParams<D>, CellAreaMergeParams<D> { }

  export interface ClearCellAreaMergeParams<D = VxeTableDataRow> {
    mergeCells: VxeTableDefines.MergeInfo[]
  }
  export interface ClearCellAreaMergeEventParams<D = VxeTableDataRow> extends EventParams<D>, ClearCellAreaMergeParams<D> { }

  export interface HeaderCellAreaSelectionParams<D = VxeTableDataRow> {
    targetRows: D[]
    targetCols: VxeTableDefines.ColumnInfo<D>[]
    column: VxeTableDefines.ColumnInfo<D>
    _columnIndex: number
  }
  export interface HeaderCellAreaSelectionEventParams<D = VxeTableDataRow> extends EventParams<D>, HeaderCellAreaSelectionParams<D> { }

  export interface CellAreaSelectionInvalidParams<D = VxeTableDataRow> {
    row: D
    column: VxeTableDefines.ColumnInfo<D>
  }
  export interface CellAreaSelectionInvalidEventParams<D = VxeTableDataRow> extends EventParams<D>, CellAreaSelectionInvalidParams<D> { }

  export interface CellAreaSelectionStartParams<D = VxeTableDataRow> {
    row: D
    _rowIndex: number
    $rowIndex: number
    column: VxeTableDefines.ColumnInfo<D>
    _columnIndex: number
    $columnIndex: number
    cell: HTMLElement
  }
  export interface CellAreaSelectionStartEventParams<D = VxeTableDataRow> extends EventParams<D>, CellAreaSelectionStartParams<D> { }

  export interface CellAreaSelectionDragParams<D = VxeTableDataRow> {
    rows: D[]
    cols: VxeTableDefines.ColumnInfo<D>[]
  }
  export interface CellAreaSelectionDragEventParams<D = VxeTableDataRow> extends EventParams<D>, CellAreaSelectionDragParams<D> { }

  export interface CellAreaSelectionEndParams<D = VxeTableDataRow> {
    rows: D[]
    cols: VxeTableDefines.ColumnInfo<D>[]
  }
  export interface CellAreaSelectionEndEventParams<D = VxeTableDataRow> extends EventParams<D>, CellAreaSelectionEndParams<D> { }

  export type CellAreaExtensionStartParams<D = VxeTableDataRow> = CellAreaSelectionStartParams<D>
  export interface CellAreaExtensionStartEventParams<D = VxeTableDataRow> extends EventParams<D>, CellAreaExtensionStartParams<D> { }

  export interface CellAreaExtensionDragParams<D = VxeTableDataRow> {
    rows: D[]
    cols: VxeTableDefines.ColumnInfo<D>[]
    targetRows: D[]
    targetCols: VxeTableDefines.ColumnInfo<D>[]
  }
  export interface CellAreaExtensionDragEventParams<D = VxeTableDataRow> extends EventParams<D>, CellAreaExtensionDragParams<D> { }

  export interface CellAreaExtensionEndParams<D = VxeTableDataRow> {
    rows: D[]
    cols: VxeTableDefines.ColumnInfo<D>[]
    targetRows: D[]
    targetCols: VxeTableDefines.ColumnInfo<D>[]
  }
  export interface CellAreaExtensionEndEventParams<D = VxeTableDataRow> extends EventParams<D>, CellAreaExtensionEndParams<D> { }

  export interface CellAreaSelectionAllStartParams {
  }
  export interface CellAreaSelectionAllStartEventParams<D = VxeTableDataRow> extends EventParams<D>, CellAreaSelectionAllStartParams { }

  export interface CellAreaSelectionAllEndParams<D = VxeTableDataRow> {
    rows: D[]
    cols: VxeTableDefines.ColumnInfo<D>[]
  }
  export interface CellAreaSelectionAllEndEventParams<D = VxeTableDataRow> extends EventParams<D>, CellAreaSelectionAllEndParams<D> { }

  export interface CellAreaArrowsStartParams<D = VxeTableDataRow> {
    rows: D[]
    cols: VxeTableDefines.ColumnInfo<D>[]
    isLeft: boolean
    isUp: boolean
    isRight: boolean
    isDown: boolean
  }
  export interface CellAreaArrowsStartEventParams<D = VxeTableDataRow> extends EventParams<D>, CellAreaArrowsStartParams<D> { }

  export interface CellAreaArrowsEndParams<D = VxeTableDataRow> extends CellAreaArrowsStartParams<D> {
    targetRows: D[]
    targetCols: VxeTableDefines.ColumnInfo<D>[]
  }
  export interface CellAreaArrowsEndEventParams<D = VxeTableDataRow> extends EventParams<D>, CellAreaArrowsEndParams<D> { }

  export interface ActiveCellChangeStartParams<D = VxeTableDataRow> {
    activeArea: VxeTableProDefines.MouseActiveCellArea
    row: D
    column: VxeTableDefines.ColumnInfo<D>
    isTab: boolean
    isEnter: boolean
    isLeft: boolean
    isUp: boolean
    isRight: boolean
    isDown: boolean
  }
  export interface ActiveCellChangeStartEventParams<D = VxeTableDataRow> extends EventParams<D>, ActiveCellChangeStartParams<D> { }

  export interface ActiveCellChangeEndParams<D = VxeTableDataRow> extends ActiveCellChangeStartParams<D> {
    beforeActiveArea: VxeTableProDefines.MouseActiveCellArea
  }
  export interface ActiveCellChangeEndEventParams<D = VxeTableDataRow> extends EventParams<D>, ActiveCellChangeEndParams<D> { }
}

export type VxeTableProEmits = [
  'change-fnr', // 废弃

  'open-fnr',
  'show-fnr',
  'hide-fnr',
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
  'cell-area-selection-invalid',
  'cell-area-selection-start',
  'cell-area-selection-drag',
  'cell-area-selection-end',
  'cell-area-extension-start',
  'cell-area-extension-drag',
  'cell-area-extension-end',
  'cell-area-selection-all-start',
  'cell-area-selection-all-end',
  'cell-area-arrows-start',
  'cell-area-arrows-end',
  'active-cell-change-start',
  'active-cell-change-end'
]

declare module '../table' {
  export interface VxeTableEventProps<D = VxeTableDataRow> {
    onOpenFnr?: VxeTableEvents.OpenFnr<D>
    onFnrChange?: VxeTableEvents.FnrChange<D>
    onFnrFind?: VxeTableEvents.FnrFind<D>
    onFnrFindAll?: VxeTableEvents.FnrFindAll<D>
    onFnrReplace?: VxeTableEvents.FnrReplace<D>
    onFnrReplaceAll?: VxeTableEvents.FnrReplaceAll<D>
    onCellAreaCopy?: VxeTableEvents.CellAreaCopy<D>
    onCellAreaCut?: VxeTableEvents.CellAreaCut<D>
    onCellAreaPaste?: VxeTableEvents.CellAreaPaste<D>
    onCellAreaMerge?: VxeTableEvents.CellAreaMerge<D>
    onClearCellAreaMerge?: VxeTableEvents.ClearCellAreaMerge<D>
    onHeaderCellAreaSelection?: VxeTableEvents.HeaderCellAreaSelection<D>
    onCellAreaSelectionInvalid?: VxeTableEvents.CellAreaSelectionInvalid<D>
    onCellAreaSelectionStart?: VxeTableEvents.CellAreaSelectionStart<D>
    onCellAreaSelectionDrag?: VxeTableEvents.CellAreaSelectionDrag<D>
    onCellAreaSelectionEnd?: VxeTableEvents.CellAreaSelectionEnd<D>
    onCellAreaExtensionStart?: VxeTableEvents.CellAreaExtensionStart<D>
    onCellAreaExtensionDrag?: VxeTableEvents.CellAreaExtensionDrag<D>
    onCellAreaExtensionEnd?: VxeTableEvents.CellAreaExtensionEnd<D>
    onCellAreaSelectionAllStart?: VxeTableEvents.CellAreaSelectionAllStart<D>
    onCellAreaSelectionAllEnd?: VxeTableEvents.CellAreaSelectionAllEnd<D>
    onCellAreaArrowsStart?: VxeTableEvents.CellAreaArrowsStart<D>
    onCellAreaArrowsEnd?: VxeTableEvents.CellAreaArrowsEnd<D>
    onActiveCellChangeStart?: VxeTableEvents.ActiveCellChangeStart<D>
    onActiveCellChangeEnd?: VxeTableEvents.ActiveCellChangeEnd<D>
  }
  export interface VxeTableListeners<D = VxeTableDataRow> {
    /**
     * 只对 keyboard-config.isFNR 配置时有效，在查找与替换弹框被打开时会触发该事件
     */
    openFnr?: VxeTableEvents.OpenFnr<D>
    /**
     * 只对 keyboard-config.isFNR 配置时有效，在查找与替换弹框的 Tab 页被切换时会触发该事件
     */
    fnrChange?: VxeTableEvents.FnrChange<D>
    /**
     * 只对 keyboard-config.isFNR 配置时有效，在点击查找时会触发该事件
     */
    fnrFind?: VxeTableEvents.FnrFind<D>
    /**
     * 只对 keyboard-config.isFNR 配置时有效，在点击查找所有时会触发该事件
     */
    fnrFindAll?: VxeTableEvents.FnrFindAll<D>
    /**
     * 只对 keyboard-config.isFNR 配置时有效，在点击替换时会触发该事件
     */
    fnrReplace?: VxeTableEvents.FnrReplace<D>
    /**
     * 只对 keyboard-config.isFNR 配置时有效，在点击替换所有时会触发该事件
     */
    fnrReplaceAll?: VxeTableEvents.FnrReplaceAll<D>
    cellAreaCopy?: VxeTableEvents.CellAreaCopy<D>
    cellAreaCut?: VxeTableEvents.CellAreaCut<D>
    cellAreaPaste?: VxeTableEvents.CellAreaPaste<D>
    cellAreaMerge?: VxeTableEvents.CellAreaMerge<D>
    clearCellAreaMerge?: VxeTableEvents.ClearCellAreaMerge<D>
    headerCellAreaSelection?: VxeTableEvents.HeaderCellAreaSelection<D>
    cellAreaSelectionInvalidtart?: VxeTableEvents.CellAreaSelectionInvalid<D>
    cellAreaSelectionStart?: VxeTableEvents.CellAreaSelectionStart<D>
    cellAreaSelectionDrag?: VxeTableEvents.CellAreaSelectionDrag<D>
    cellAreaSelectionEnd?: VxeTableEvents.CellAreaSelectionEnd<D>
    cellAreaExtensionStart?: VxeTableEvents.CellAreaExtensionStart<D>
    cellAreaExtensionDrag?: VxeTableEvents.CellAreaExtensionDrag<D>
    cellAreaExtensionEnd?: VxeTableEvents.CellAreaExtensionEnd<D>
    cellAreaSelectionAllStart?: VxeTableEvents.CellAreaSelectionAllStart<D>
    cellAreaSelectionAllEnd?: VxeTableEvents.CellAreaSelectionAllEnd<D>
    cellAreaArrowsStart?: VxeTableEvents.CellAreaArrowsStart<D>
    cellAreaArrowsEnd?: VxeTableEvents.CellAreaArrowsEnd<D>
    activeCellChangeStart?: VxeTableEvents.ActiveCellChangeStart<D>
    activeCellChangeEnd?: VxeTableEvents.ActiveCellChangeEnd<D>
  }
  export namespace VxeTableEvents {
    export type OpenFnr<D = any> = (params: VxeTableProDefines.OpenFnrParams<D>) => void
    export type FnrChange<D = any> = (params: VxeTableProDefines.FnrChangeParams<D>) => void
    export type FnrFind<D = any> = (params: VxeTableProDefines.FnrFindParams<D>) => void
    export type FnrFindAll<D = any> = (params: VxeTableProDefines.FnrFindAllParams<D>) => void
    export type FnrReplace<D = any> = (params: VxeTableProDefines.FnrReplaceParams<D>) => void
    export type FnrReplaceAll<D = any> = (params: VxeTableProDefines.FnrReplaceAllParams<D>) => void
    export type CellAreaCopy<D = any> = (params: VxeTableProDefines.CellAreaCopyParams<D>) => void
    export type CellAreaCut<D = any> = (params: VxeTableProDefines.CellAreaCutParams<D>) => void
    export type CellAreaPaste<D = any> = (params: VxeTableProDefines.CellAreaPasteParams<D>) => void
    export type CellAreaMerge<D = any> = (params: VxeTableProDefines.CellAreaMergeEventParams<D>) => void
    export type ClearCellAreaMerge<D = any> = (params: VxeTableProDefines.ClearCellAreaMergeEventParams<D>) => void
    export type HeaderCellAreaSelection<D = any> = (params: VxeTableProDefines.HeaderCellAreaSelectionEventParams<D>) => void
    export type CellAreaSelectionInvalid<D = any> = (params: VxeTableProDefines.CellAreaSelectionInvalidEventParams<D>) => void
    export type CellAreaSelectionStart<D = any> = (params: VxeTableProDefines.CellAreaSelectionStartEventParams<D>) => void
    export type CellAreaSelectionDrag<D = any> = (params: VxeTableProDefines.CellAreaSelectionDragEventParams<D>) => void
    export type CellAreaSelectionEnd<D = any> = (params: VxeTableProDefines.CellAreaSelectionEndEventParams<D>) => void
    export type CellAreaExtensionStart<D = any> = (params: VxeTableProDefines.CellAreaExtensionStartEventParams<D>) => void
    export type CellAreaExtensionDrag<D = any> = (params: VxeTableProDefines.CellAreaExtensionDragEventParams<D>) => void
    export type CellAreaExtensionEnd<D = any> = (params: VxeTableProDefines.CellAreaExtensionEndEventParams<D>) => void
    export type CellAreaSelectionAllStart<D = any> = (params: VxeTableProDefines.CellAreaSelectionAllStartEventParams<D>) => void
    export type CellAreaSelectionAllEnd<D = any> = (params: VxeTableProDefines.CellAreaSelectionAllEndEventParams<D>) => void
    export type CellAreaArrowsStart<D = any> = (params: VxeTableProDefines.CellAreaArrowsStartEventParams<D>) => void
    export type CellAreaArrowsEnd<D = any> = (params: VxeTableProDefines.CellAreaArrowsEndEventParams<D>) => void
    export type ActiveCellChangeStart<D = any> = (params: VxeTableProDefines.ActiveCellChangeStartEventParams<D>) => void
    export type ActiveCellChangeEnd<D = any> = (params: VxeTableProDefines.ActiveCellChangeEndEventParams<D>) => void
  }
}

declare module '../grid' {
  export interface VxeGridEventProps<D = VxeTableDataRow> {
    onOpenFnr?: VxeGridEvents.OpenFnr<D>
    onFnrChange?: VxeGridEvents.FnrChange<D>
    onFnrFind?: VxeGridEvents.FnrFind<D>
    onFnrFindAll?: VxeGridEvents.FnrFindAll<D>
    onFnrReplace?: VxeGridEvents.FnrReplace<D>
    onFnrReplaceAll?: VxeGridEvents.FnrReplaceAll<D>
    onCellAreaCopy?: VxeGridEvents.CellAreaCopy<D>
    onCellAreaCut?: VxeGridEvents.CellAreaCut<D>
    onCellAreaPaste?: VxeGridEvents.CellAreaPaste<D>
    onCellAreaMerge?: VxeGridEvents.CellAreaMerge<D>
    onClearCellAreaMerge?: VxeGridEvents.ClearCellAreaMerge<D>
    onHeaderCellAreaSelection?: VxeGridEvents.HeaderCellAreaSelection<D>
    onCellAreaSelectionInvalid?: VxeGridEvents.CellAreaSelectionInvalid<D>
    onCellAreaSelectionStart?: VxeGridEvents.CellAreaSelectionStart<D>
    onCellAreaSelectionDrag?: VxeGridEvents.CellAreaSelectionDrag<D>
    onCellAreaSelectionEnd?: VxeGridEvents.CellAreaSelectionEnd<D>
    onCellAreaExtensionStart?: VxeGridEvents.CellAreaExtensionStart<D>
    onCellAreaExtensionDrag?: VxeGridEvents.CellAreaExtensionDrag<D>
    onCellAreaExtensionEnd?: VxeGridEvents.CellAreaExtensionEnd<D>
    onCellAreaSelectionAllStart?: VxeGridEvents.CellAreaSelectionAllStart<D>
    onCellAreaSelectionAllEnd?: VxeGridEvents.CellAreaSelectionAllEnd<D>
    onCellAreaArrowsStart?: VxeGridEvents.CellAreaArrowsStart<D>
    onCellAreaArrowsEnd?: VxeGridEvents.CellAreaArrowsEnd<D>
    onActiveCellChangeStart?: VxeGridEvents.ActiveCellChangeStart<D>
    onActiveCellChangeEnd?: VxeGridEvents.ActiveCellChangeEnd<D>
  }
  export interface VxeGridListeners<D = VxeTableDataRow> {
    /**
     * 只对 keyboard-config.isFNR 配置时有效，在查找与替换弹框被打开时会触发该事件
     */
    openFnr?: VxeGridEvents.OpenFnr<D>
    /**
     * 只对 keyboard-config.isFNR 配置时有效，在查找与替换弹框的 Tab 页被切换时会触发该事件
     */
    fnrChange?: VxeGridEvents.FnrChange<D>
    /**
     * 只对 keyboard-config.isFNR 配置时有效，在点击查找时会触发该事件
     */
    fnrFind?: VxeGridEvents.FnrFind<D>
    /**
     * 只对 keyboard-config.isFNR 配置时有效，在点击查找所有时会触发该事件
     */
    fnrFindAll?: VxeGridEvents.FnrFindAll<D>
    /**
     * 只对 keyboard-config.isFNR 配置时有效，在点击替换时会触发该事件
     */
    fnrReplace?: VxeGridEvents.FnrReplace<D>
    /**
     * 只对 keyboard-config.isFNR 配置时有效，在点击替换所有时会触发该事件
     */
    fnrReplaceAll?: VxeGridEvents.FnrReplaceAll<D>
    cellAreaCopy?: VxeGridEvents.CellAreaCopy<D>
    cellAreaCut?: VxeGridEvents.CellAreaCut<D>
    cellAreaPaste?: VxeGridEvents.CellAreaPaste<D>
    cellAreaMerge?: VxeGridEvents.CellAreaMerge<D>
    clearCellAreaMerge?: VxeGridEvents.ClearCellAreaMerge<D>
    headerCellAreaSelection?: VxeGridEvents.HeaderCellAreaSelection<D>
    cellAreaSelectionInvalid?: VxeGridEvents.CellAreaSelectionInvalid<D>
    cellAreaSelectionStart?: VxeGridEvents.CellAreaSelectionStart<D>
    cellAreaSelectionDrag?: VxeGridEvents.CellAreaSelectionDrag<D>
    cellAreaSelectionEnd?: VxeGridEvents.CellAreaSelectionEnd<D>
    cellAreaExtensionStart?: VxeGridEvents.CellAreaExtensionStart<D>
    cellAreaExtensionDrag?: VxeGridEvents.CellAreaExtensionDrag<D>
    cellAreaExtensionEnd?: VxeGridEvents.CellAreaExtensionEnd<D>
    cellAreaSelectionAllStart?: VxeGridEvents.CellAreaSelectionAllStart<D>
    cellAreaSelectionAllEnd?: VxeGridEvents.CellAreaSelectionAllEnd<D>
    cellAreaArrowsStart?: VxeGridEvents.CellAreaArrowsStart<D>
    cellAreaArrowsEnd?: VxeGridEvents.CellAreaArrowsEnd<D>
    activeCellChangeStart?: VxeGridEvents.ActiveCellChangeStart<D>
    activeCellChangeEnd?: VxeGridEvents.ActiveCellChangeEnd<D>
  }
  export namespace VxeGridEvents {
    export type OpenFnr<D = any> = (params: VxeTableProDefines.OpenFnrParams<D>) => void
    export type FnrChange<D = any> = (params: VxeTableProDefines.FnrChangeParams<D>) => void
    export type FnrFind<D = any> = (params: VxeTableProDefines.FnrFindParams<D>) => void
    export type FnrFindAll<D = any> = (params: VxeTableProDefines.FnrFindAllParams<D>) => void
    export type FnrReplace<D = any> = (params: VxeTableProDefines.FnrReplaceParams<D>) => void
    export type FnrReplaceAll<D = any> = (params: VxeTableProDefines.FnrReplaceAllParams<D>) => void
    export type CellAreaCopy<D = any> = (params: VxeTableProDefines.CellAreaCopyParams<D>) => void
    export type CellAreaCut<D = any> = (params: VxeTableProDefines.CellAreaCutParams<D>) => void
    export type CellAreaPaste<D = any> = (params: VxeTableProDefines.CellAreaPasteParams<D>) => void
    export type CellAreaMerge<D = any> = (params: VxeTableProDefines.CellAreaMergeParams<D>) => void
    export type ClearCellAreaMerge<D = any> = (params: VxeTableProDefines.ClearCellAreaMergeParams<D>) => void
    export type HeaderCellAreaSelection<D = any> = (params: VxeTableProDefines.HeaderCellAreaSelectionParams<D>) => void
    export type CellAreaSelectionInvalid<D = any> = (params: VxeTableProDefines.CellAreaSelectionInvalidEventParams<D>) => void
    export type CellAreaSelectionStart<D = any> = (params: VxeTableProDefines.CellAreaSelectionStartEventParams<D>) => void
    export type CellAreaSelectionDrag<D = any> = (params: VxeTableProDefines.CellAreaSelectionDragEventParams<D>) => void
    export type CellAreaSelectionEnd<D = any> = (params: VxeTableProDefines.CellAreaSelectionEndEventParams<D>) => void
    export type CellAreaExtensionStart<D = any> = (params: VxeTableProDefines.CellAreaExtensionStartEventParams<D>) => void
    export type CellAreaExtensionDrag<D = any> = (params: VxeTableProDefines.CellAreaExtensionDragEventParams<D>) => void
    export type CellAreaExtensionEnd<D = any> = (params: VxeTableProDefines.CellAreaExtensionEndEventParams<D>) => void
    export type CellAreaArrowsStart<D = any> = (params: VxeTableProDefines.CellAreaArrowsStartEventParams<D>) => void
    export type CellAreaSelectionAllStart<D = any> = (params: VxeTableProDefines.CellAreaSelectionAllStartEventParams<D>) => void
    export type CellAreaSelectionAllEnd<D = any> = (params: VxeTableProDefines.CellAreaSelectionAllEndEventParams<D>) => void
    export type CellAreaArrowsEnd<D = any> = (params: VxeTableProDefines.CellAreaArrowsEndEventParams<D>) => void
    export type ActiveCellChangeStart<D = any> = (params: VxeTableProDefines.ActiveCellChangeStartEventParams<D>) => void
    export type ActiveCellChangeEnd<D = any> = (params: VxeTableProDefines.ActiveCellChangeEndEventParams<D>) => void
  }
}
