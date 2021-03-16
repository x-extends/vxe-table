import { VXETableComponent } from './component'
import { ColumnInfo } from './column'
import { TableRenderParams, RenderOptions, OptionProps, OptionGroupProps } from './v-x-e-table'

/**
 * 筛选
 */
export declare class Filter extends VXETableComponent {}

export class FilterPanel {
  /**
   * 筛选所有发生改变
   * @param evnt 事件
   * @param checked 是否选中
   */
  changeAllOption(evnt: any, checked: boolean): any;
  /**
   * 筛选选项发生改变
   * @param evnt 事件
   * @param checked 是否选中
   * @param option 选项对象
   */
  changeOption(evnt: any, checked: boolean, option: ColumnFilterParams): any;
  /**
   * 确认筛选
   */
  confirmFilter(): any;
  /**
   * 重置筛选
   */
  resetFilter(): any;
}

export interface ColumnFilterOption {
  label?: string | number;
  value?: any;
  data?: any;
  resetValue?: any;
  checked?: boolean;
}

export interface ColumnFilterParams {
  label: string | number;
  value: any;
  data: any;
  resetValue: any;
  checked: boolean;
}

/**
 * 筛选渲染参数
 */
export interface ColumnFilterRenderParams extends TableRenderParams{
  $panel: FilterPanel;
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

/**
 * 筛选渲染参数
 */
export interface ColumnFilterMethodParams {
  /**
   * 选项值
   */
  value: any;
  /**
   * 选项
   */
  option: ColumnFilterParams;
  /**
   * 行数据对象
   */
  row: any;
  /**
   * 列对象
   */
  column: ColumnInfo;
}

export interface ColumnFilterSlotParams extends ColumnFilterRenderParams {}

export interface ColumnFilterResetParams extends TableRenderParams {
  options: ColumnFilterParams[];
  column: ColumnInfo;
}

/**
 * 筛选渲染配置项
 */
export interface ColumnFilterRenderOptions extends RenderOptions {
  /**
   * 下拉选项列表（需要渲染器支持）
   */
  options?: { [key: string]: any }[];
  /**
   * 下拉选项属性参数配置（需要渲染器支持）
   */
  optionProps?: OptionProps;
  /**
   * 下拉分组选项列表（需要渲染器支持）
   */
  optionGroups?: { [key: string]: any }[];
  /**
   * 下拉分组选项属性参数配置（需要渲染器支持）
   */
  optionGroupProps?: OptionGroupProps;
  /**
   * 渲染组件的内容（需要渲染器支持）
   */
  content?: string;
}
