import { VXEComponent } from '../component'
import { VxeTableDefines, VxeTableDataRow } from '../table'
import { VxeColumnPropTypes } from '../column'

/* eslint-disable no-use-before-define */

/**
 * 表格模块 - 自定义列
 */
export const VxeTableCustomModule: VXEComponent<{ [key: string]: any }>
/**
 * 表格模块 - 自定义列
 */
export const Custom: VXEComponent<{ [key: string]: any }>

export interface VxeCustomPanel {
}

export interface TableCustomMethods<D = VxeTableDataRow> {
  /**
   * 打开自定义面板
   */
  openCustom(): Promise<void>
  /**
   * 处理自定义面板
   */
  closeCustom(): Promise<void>
}

export interface TableCustomPrivateMethods<D = VxeTableDataRow> {
  checkCustomStatus(): void
  emitCustomEvent(type: string, evnt: Event): void
  triggerCustomEvent(evnt: MouseEvent): void
  customOpenEvent (evnt: Event): void
  customColseEvent (evnt: Event): void
}

declare module '../grid' {
  export interface VxeGridMethods<D = VxeTableDataRow> extends TableCustomMethods<D> { }
}

declare module '../table' {
  export interface VxeTableMethods<D = VxeTableDataRow> extends TableCustomMethods<D> { }
  export interface VxeTablePrivateMethods<D = VxeTableDataRow> extends TableCustomPrivateMethods<D> { }
}
