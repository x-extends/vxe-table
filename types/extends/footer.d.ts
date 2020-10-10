import { VXETableModule } from '../component'
import { ColumnInfo } from '../column'
import { TableRenderParams } from './renderer'

/**
 * 表尾
 */
export declare class Footer extends VXETableModule {}

export interface ColumnFooterSlotParams extends ColumnFooterRenderParams {}

/**
 * 表尾渲染参数
 */
export interface ColumnFooterRenderParams extends TableRenderParams {
  /**
     * 列对象
     */
    column: ColumnInfo;
    /**
     * 相对于 columns 中的索引
     */
    columnIndex: number;
    /**
     * 相对于当前表格列中的索引
     */
    _columnIndex: number;
    /**
     * 相对于可视区渲染中的列索引
     */
    $columnIndex: number;
    /**
     * 相对于表尾行数据的索引
     */
    $rowIndex: number;
    /**
     * 表尾项列表
     */
    items: any[];
    /**
     * 表尾数据集
     */
    data: any[][];
  }
