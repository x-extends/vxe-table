import { VXETableModule } from './component';

/**
 * 列
 */
export declare class Column extends VXETableModule {
  // 渲染类型 index,radio,checkbox,expand,html
  type?: string;
  // 列字段名
  field?: string;
  // 列标题
  title?: string;
  // 列宽度
  width?: number | string;
  // 列最小宽度，把剩余宽度按比例分配
  minWidth?: number | string;
  // 是否允许拖动列宽调整大小
  resizable?: boolean;
  // 将列固定在左侧或者右侧
  fixed?: string;
  // 列对其方式
  align?: string;
  // 表头对齐方式
  headerAlign?: string;
  // 表尾列的对齐方式
  footerAlign?: string;
  // 当内容过长时显示为省略号
  showOverflow?: boolean | string;
  // 当表头内容过长时显示为省略号
  showHeaderOverflow?: boolean | string;
  // 当表尾内容过长时显示为省略号
  showFooterOverflow?: boolean | string;
  // 给单元格附加 className
  className?: string | Function;
  // 给表头单元格附加 className
  headerClassName?: string | Function;
  // 给表尾单元格附加 className
  footerClassName?: string | Function;
  // 格式化显示内容
  formatter?: Function | any[] | string;
  // 自定义索引方法
  indexMethod?: Function;
  // 是否允许排序
  sortable?: boolean;
  // 是否服务端排序
  remoteSort?: boolean;
  // 自定义排序的属性
  sortBy?: string | string[];
  // 自定义排序方法
  sortMethod?: Function;
  // 配置筛选条件数组
  filters?: any[];
  // 筛选是否允许多选
  filterMultiple?: boolean;
  // 自定义筛选方法
  filterMethod?: Function;
  // 筛选模板配置项
  filterRender?: any;
  // 指定为树节点
  treeNode?: boolean;
  // 是否可视
  visible?: boolean;
  // 单元格渲染配置项
  cellRender?: any;
  // 单元格编辑渲染配置项
  editRender?: any;
  // 内容渲染配置项
  contentRender?: any;
  // 额外的参数
  params?: any;
}