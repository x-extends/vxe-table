import { VXETableModule } from './module';

/**
 * 列模块
 */
export declare class Column extends VXETableModule {
  // 渲染类型 index,radio,selection,expand
  type: string;
  // 列属性
  field: string;
  // 列标题
  title: string;
  // 列宽度
  width: number | string;
  // 列最小宽度，把剩余宽度按比例分配
  minWidth: number | string;
  // 是否允许拖动列宽调整大小
  resizable: boolean;
  // 将列固定在左侧或者右侧
  fixed: string;
  // 列对其方式
  align: string;
  // 表头对齐方式
  headerAlign: string;
  // 当内容过长时显示为省略号
  showOverflow: boolean | string;
  // 当表头内容过长时显示为省略号
  showHeaderOverflow: boolean | string;
  // 格式化显示内容
  formatter: Function | Array<any> | string;
  // 自定义索引方法
  indexMethod: Function;
  // 是否允许排序
  sortable: boolean;
  // 是否服务端排序
  remoteSort: boolean;
  // 自定义排序的属性
  sortBy: string | Array<string>;
  // 自定义排序方法
  sortMethod: Function;
  // 配置筛选条件数组
  filters: Array<object>;
  // 筛选是否允许多选
  filterMultiple: boolean;
  // 自定义筛选方法
  filterMethod: Function;
  // 筛选模板配置项
  filterRender: object;
  // 指定为树节点
  treeNode: boolean;
  // 单元格渲染配置项
  cellRender: object;
  // 单元格编辑渲染配置项
  editRender: object;
  // 额外的参数
  params: object;
}