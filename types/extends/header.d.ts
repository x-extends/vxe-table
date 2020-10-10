import { VXETableModule } from '../component'
import { ColumnInfo } from '../column'
import { TableRenderParams } from './renderer'

/**
 * 表头
 */
export declare class Header extends VXETableModule {}

export interface ColumnHeaderSlotParams extends ColumnHeaderRenderParams {}

/**
 * 表头渲染参数
 */
export interface ColumnHeaderRenderParams extends TableRenderParams {
  /**
   * 列对象
   */
  column: ColumnInfo;
  /**
   * 相对于 columns 中的索引
   */
  columnIndex: number;
  /**
   * 相对于可视区渲染中的列索引
   */
  $columnIndex: number;
  /**
   * 相对于表头行数据的索引
   */
  $rowIndex: number;
}
