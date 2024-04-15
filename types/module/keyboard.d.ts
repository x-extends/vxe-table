import { VXEComponent } from '../component'
import { VxeTableDataRow } from '../table'

/* eslint-disable no-use-before-define */

/**
 * 表格模块 - 键盘导航
 */
export const VxeTableKeyboardModule: VXEComponent<{ [key: string]: any }>
/**
 * 表格模块 - 键盘导航
 */
export const Keyboard: VXEComponent<{ [key: string]: any }>

export interface TableKeyboardMethods<D = VxeTableDataRow> {}

export interface TableKeyboardPrivateMethods<D = VxeTableDataRow> {
  moveTabSelected(args: any, isLeft: any, evnt: any): void
  moveCurrentRow(isUpArrow: any, isDwArrow: any, evnt: any): void
  moveSelected(args: any, isLeftArrow: any, isUpArrow: any, isRightArrow: any, isDwArrow: any, evnt: any): void
  triggerHeaderCellMousedownEvent(evnt: any, params: any): void
  triggerCellMousedownEvent(evnt: any, params: any): void
 }

declare module '../grid' {
  export interface VxeGridMethods<D = VxeTableDataRow> extends TableKeyboardMethods<D> { }
}

declare module '../table' {
  export interface VxeTableMethods<D = VxeTableDataRow> extends TableKeyboardMethods<D> { }
  export interface VxeTablePrivateMethods<D = VxeTableDataRow> extends TableKeyboardPrivateMethods<D> { }
}
