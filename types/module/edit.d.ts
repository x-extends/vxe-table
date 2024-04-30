import { VXEComponent } from '../component'
import { VxeTableDataRow, VxeTableDefines } from '../table'

/* eslint-disable no-use-before-define */

/**
 * 表格模块 - 可编辑
 */
export const VxeTableEditModule: VXEComponent<{ [key: string]: any }>
/**
 * 表格模块 - 可编辑
 */
export const Edit: VXEComponent<{ [key: string]: any }>

export interface TableEditMethods<D = VxeTableDataRow> {
  /**
   * 往表格插入临时数据，从第一行新增一行或多行新数据
   * @param records 新数据
   */
  insert(records: any): Promise<{ row: D, rows: D[] }>
  /**
   * 往表格指定行中插入临时数据
   * 如果 row 为空则从插入到顶部，如果为树结构，则插入到目标节点顶部
   * 如果 row 为 -1 则从插入到底部，如果为树结构，则插入到目标节点底部
   * 如果 row 为有效行则插入到该行的位置，如果为树结构，则有插入到效的目标节点该行的位置
   * @param {Object/Array} records 新的数据
   * @param {Row} row 指定行
   */
  insertAt(records: any, row: any | -1 | null): Promise<{ row: D, rows: D[] }>
  /**
   * 往表格在指定行中的下一行插入临时数据
   * 如果 row 为空则从插入到顶部，如果为树结构，则插入到目标节点顶部
   * 如果 row 为 -1 则从插入到底部，如果为树结构，则插入到目标节点底部
   * 如果 row 为有效行则插入到该行的下一行位置，如果为树结构，则有插入到效的目标节点该行的下一行位置
   * @param records records 新的数据
   * @param row row 指定行
   */
  insertNextAt(records: any, row: any | -1 | null): Promise<{ row: D, rows: D[] }>
  /**
   * 删除指定行数据，指定 row 或 [row, ...] 删除多条数据，如果为空则删除所有数据
   * @param rows 指定行
   */
  remove(rows?: any | any[]): Promise<{ row: D, rows: D[] }>
  /**
   * 删除复选框选中的行数据
   */
  removeCheckboxRow(): Promise<{ row: D, rows: D[] }>
  /**
   * 删除单选框选中的行数据
   */
  removeRadioRow(): Promise<{ row: D, rows: D[] }>
  /**
   * 删除当前行选中的行数据
   */
  removeCurrentRow(): Promise<{ row: D, rows: D[] }>
  /**
   * 获取表格数据集
   * 获取新增、删除、更改的数据
   */
  getRecordset(): {
    insertRecords: D[]
    removeRecords: D[]
    updateRecords: D[]
    pendingRecords: D[]
  }
  /**
   * 用于 edit-config，获取新增的临时数据
   */
  getInsertRecords(): D[]
  /**
   * 获取已删除的数据
   */
  getRemoveRecords(): D[]
  /**
   * 用于 edit-config，获取已修改的数据
   */
  getUpdateRecords(): D[]
  /**
   * 请使用 getEditRecord
   * @deprecated
   */
  getActiveRecord(): {
    row: D
    rowIndex: number
    $rowIndex: number
    column: VxeTableDefines.ColumnInfo<D>
    columnIndex: number
    $columnIndex: number
    cell: HTMLElement
  }
  /**
   * 用于 edit-config，获取已激活的行数据
   */
  getEditRecord(): {
    row: D
    rowIndex: number
    $rowIndex: number
    column: VxeTableDefines.ColumnInfo<D>
    columnIndex: number
    $columnIndex: number
    cell: HTMLElement
  }
  /**
   * 用于 mouse-config.selected，获取选中的单元格信息
   */
  getSelectedCell(): {
    row: D
    column: VxeTableDefines.ColumnInfo<D>
  }
  /**
   * 请使用 clearEdit()
   * @deprecated
   */
  clearActived(evnt?: Event): Promise<any>
  /**
   * 手动清除单元格激活状态
   */
  clearEdit(evnt?: Event): Promise<any>
  /**
   * 手动清除单元格选中状态
   */
  clearSelected(): Promise<any>
  /**
   * 请使用 isEditByRow
   * @deprecated
   */
  isActiveByRow(row: any): boolean
  /**
   * 用于 edit-config，判断行是否为激活编辑状态
   * @param row 指定行
   */
  isEditByRow(row: any): boolean
  /**
   * 请使用 setEditRow
   * @deprecated
   */
  setActiveRow(row: any): Promise<void>
  /**
   * 用于 edit-config，激活行编辑并默认激活第一个列，也可以指定列
   * @param row 指定行
   */
  setEditRow(row: any, fieldOrColumn?: string | VxeTableDefines.ColumnInfo<any>): Promise<void>
  /**
   * 请使用 setEditCell
   * @deprecated
   */
  setActiveCell(row: any, fieldOrColumn: string | VxeTableDefines.ColumnInfo<any>): Promise<void>
  /**
   * 用于 edit-config，激活单元格编辑
   * @param row 指定行
   * @param field 字段名
   */
  setEditCell(row: any, fieldOrColumn: string | VxeTableDefines.ColumnInfo<any>): Promise<void>
  /**
   * 用于 mouse-config.mouse-config，选中某个单元格
   * @param row 指定行
   * @param field 字段名
   */
  setSelectCell(row: any, fieldOrColumn: string | VxeTableDefines.ColumnInfo<any>): Promise<void>
}

export interface TableEditPrivateMethods<D = VxeTableDataRow> {
  handleActived(params: any, evnt?: any): Promise<any>
  handleFocus(params: any, evnt?: any): void
  handleSelected(params: any, evnt: any): Promise<any>
  addCellSelectedClass(): void
}

declare module '../grid' {
  export interface VxeGridMethods<D = VxeTableDataRow> extends TableEditMethods<D> { }
}

declare module '../table' {
  export interface VxeTableMethods<D = VxeTableDataRow> extends TableEditMethods<D> { }
  export interface VxeTablePrivateMethods<D = VxeTableDataRow> extends TableEditPrivateMethods<D> { }
}
