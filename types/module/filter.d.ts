import { VXEComponent } from '../component'
import { VxeTableDefines, VxeTableDataRow } from '../table'
import { VxeColumnPropTypes } from '../column'

/* eslint-disable no-use-before-define */

/**
 * 表格模块 - 筛选
 */
export const VxeTableFilterModule: VXEComponent<{ [key: string]: any }>
/**
 * 表格模块 - 筛选
 */
export const Filter: VXEComponent<{ [key: string]: any }>

export interface VxeFilterPanel {
  /**
   * 筛选所有发生改变
   * @param evnt 事件
   * @param checked 是否选中
   */
  changeAllOption(evnt: Event | null, checked: boolean): void
  /**
   * 筛选选项发生改变
   * @param evnt 事件
   * @param checked 是否选中
   * @param option 选项对象
   */
  changeOption(evnt: Event | null, checked: boolean, option: VxeTableDefines.FilterOption): void
  /**
   * 确认筛选
   */
  confirmFilter(evnt?: Event): void
  /**
   * 重置筛选
   */
  resetFilter(evnt?: Event): void
}

export interface TableFilterMethods<D = VxeTableDataRow> {
  /**
   * 手动弹出筛选
   * @param fieldOrColumn
   */
  openFilter(fieldOrColumn: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo<any>):Promise<void>
  /**
   * 用于 filters，修改筛选列表
   * 在筛选条件更新之后可以调用 updateData 函数处理表格数据
   * @param columnOrField 列对象或字段名
   * @param options 选项列表
   */
  setFilter(fieldOrColumn: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo<any>, options: VxeColumnPropTypes.Filter[]): Promise<void>
  /**
   * 手动清空筛选条件
   * 如果不传 column 则清空所有筛选条件，数据会恢复成未筛选的状态
   * @param column 字段名
   */
  clearFilter(column?: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo<any> | null): Promise<void>
  /**
   * 获取当前筛选的所有列信息
   */
  getCheckedFilters(): VxeTableDefines.FilterCheckedParams<D>[]
}

export interface TableFilterPrivateMethods<D = VxeTableDataRow> {
  checkFilterOptions(): void
  handleClearFilter(column: any): void
  triggerFilterEvent(evnt: any, column: any, params: any): void
  confirmFilterEvent(evnt: Event): void
}

declare module '../grid' {
  export interface VxeGridMethods<D = VxeTableDataRow> extends TableFilterMethods<D> { }
}

declare module '../table' {
  export interface VxeTableMethods<D = VxeTableDataRow> extends TableFilterMethods<D> { }
  export interface VxeTablePrivateMethods<D = VxeTableDataRow> extends TableFilterPrivateMethods<D> { }
  export namespace VxeTableDefines {
    export interface FilterOption {
      label: string | number
      value: any
      data: any
      resetValue: any
      checked: boolean
      _checked: boolean
    }
  }
}
