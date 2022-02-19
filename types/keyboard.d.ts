import { VXEComponent } from './component'
import { VxeTableMethods, VxeTablePrivateMethods } from './table'

/**
 * 表格扩展 - 键盘导航
 */
export const Keyboard: VXEComponent<{}>

export interface TableKeyboardMethods {}

export interface TableKeyboardPrivateMethods {
  moveTabSelected(args: any, isLeft: any, evnt: any): void
  moveCurrentRow(isUpArrow: any, isDwArrow: any, evnt: any): void
  moveSelected(args: any, isLeftArrow: any, isUpArrow: any, isRightArrow: any, isDwArrow: any, evnt: any): void
  triggerHeaderCellMousedownEvent(evnt: any, params: any): void
  triggerCellMousedownEvent(evnt: any, params: any): void
 }

declare module './grid' {
  interface VxeGridMethods extends TableKeyboardMethods { }
}

declare module './table' {
  interface VxeTableMethods extends TableKeyboardMethods { }
  interface VxeTablePrivateMethods extends TableKeyboardPrivateMethods { }
}
