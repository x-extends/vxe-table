import { ColumnFixed, ColumnAlign, ColumnFormatterMethodParams, ColumnCellRenderOptions, ColumnContentRenderOptions, Column } from './column'
import { ColumnFilterOption, ColumnFilterRenderOptions, ColumnFilterMethodParams } from './filter'
import { ColumnCellRenderParams } from './v-x-e-table/renderer'
import { ColumnHeaderRenderParams } from './header'
import { ColumnFooterRenderParams } from './footer'
import { ColumnEditRenderOptions } from './edit'
import { ColumnExportCellRenderParams, ColumnExportFooterRenderParams } from './export'
import { TableOverflow } from './table'

/**
 * 组件 - 表格分组列
 */
export declare class Colgroup extends Column {}

export interface ColgroupOptions extends ColgroupProps {}

export interface ColgroupProps {
  /**
   * 渲染类型
   */
  type?: 'seq' | 'radio' | 'checkbox' | 'expand' | 'html';
  /**
   * 列字段名
   */
  field?: string;
  /**
   * 列标题
   */
  title?: string;
  /**
   * 列宽度
   */
  width?: number | string;
  /**
   * 列最小宽度，把剩余宽度按比例分配
   */
  minWidth?: number | string;
  /**
   * 是否允许拖动列宽调整大小
   */
  resizable?: boolean;
  /**
   * 将列固定在左侧或者右侧
   */
  fixed?: ColumnFixed;
  /**
   * 列对其方式
   */
  align?: ColumnAlign;
  /**
   * 表头对齐方式
   */
  headerAlign?: ColumnAlign;
  /**
   * 表尾列的对齐方式
   */
  footerAlign?: ColumnAlign;
  /**
   * 当内容过长时显示为省略号
   */
  showOverflow?: TableOverflow;
  /**
   * 当表头内容过长时显示为省略号
   */
  showHeaderOverflow?: TableOverflow;
  /**
   * 当表尾内容过长时显示为省略号
   */
  showFooterOverflow?: TableOverflow;
  /**
   * 给单元格附加 className
   */
  className?: string | ((params: ColumnCellRenderParams) => string | any[] | { [key: string]: boolean });
  /**
   * 给表头单元格附加 className
   */
  headerClassName?: string | ((params: ColumnHeaderRenderParams) => string | any[] | { [key: string]: boolean });
  /**
   * 给表尾单元格附加 className
   */
  footerClassName?: string | ((params: ColumnFooterRenderParams) => string | any[] | { [key: string]: boolean });
  /**
   * 格式化显示内容
   */
  formatter?: ((params: ColumnFormatterMethodParams) => string) | any[] | string;
  /**
   * 是否允许排序
   */
  sortable?: boolean;
  /**
   * 是否服务端排序
   */
  remoteSort?: boolean;
  /**
   * 自定义排序的属性
   */
  sortBy?: string | string[];
  /**
   * 自定义排序方法
   */
  sortMethod?(a: any, b: any): boolean;
  /**
   * 配置筛选条件数组
   */
  filters?: ColumnFilterOption[];
  /**
   * 筛选是否允许多选
   */
  filterMultiple?: boolean;
  /**
   * 自定义筛选方法
   */
  filterMethod?(params: ColumnFilterMethodParams): boolean;
  /**
   * 筛选模板配置项
   */
  filterRender?: ColumnFilterRenderOptions;
  /**
   * 指定为树节点
   */
  treeNode?: boolean;
  /**
   * 是否可视
   */
  visible?: boolean;
  /**
   * 自定义单元格数据导出方法
   */
  exportMethod?(params: ColumnExportCellRenderParams): string | number;
  /**
   * 自定义表尾单元格数据导出方法
   */
  footerExportMethod?(params: ColumnExportFooterRenderParams): string | number;
  /**
   * 单元格值类型
   */
  cellType?: string;
  /**
   * 单元格渲染配置项
   */
  cellRender?: ColumnCellRenderOptions;
  /**
   * 单元格编辑渲染配置项
   */
  editRender?: ColumnEditRenderOptions;
  /**
   * 内容渲染配置项
   */
  contentRender?: ColumnContentRenderOptions;
  /**
   * 额外的参数
   */
  params?: any;
}
