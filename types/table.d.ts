import { VXETableModule } from './component';
import { ColumnConfig } from './column'

/**
 * 核心模块
 */
export declare class Table extends VXETableModule {
  // 数据
  data?: any[];
  // 表格的高度
  height?: number | string;
  // 表格的最大高度
  maxHeight?: number | string;
  // 所有列是否允许拖动列宽调整大小
  resizable?: boolean;
  // 是否带有斑马纹
  stripe?: boolean;
  // 是否带有纵向边框
  border?: boolean | string;
  // 列的宽度是否自撑开（可能会被废弃的参数，不要使用）
  fit?: boolean;
  // 表格是否加载中
  loading?: boolean;
  // 所有的列对其方式
  align?: string;
  // 所有的表头列的对齐方式
  headerAlign?: string;
  // 所有的表尾列的对齐方式
  footerAlign?: string;
  // 是否显示表头
  showHeader?: boolean;
  // 是否要高亮当前选中行
  highlightCurrentRow?: boolean;
  // 鼠标移到行是否要高亮显示
  highlightHoverRow?: boolean;
  // 是否要高亮当前选中列
  highlightCurrentColumn?: boolean;
  // 鼠标移到列是否要高亮显示
  highlightHoverColumn?: boolean;
  // 激活单元格编辑时是否高亮显示
  highlightCell?: boolean;
  // 是否显示表尾合计
  showFooter?: boolean;
  // 表尾合计的计算方法
  footerMethod?: Function;
  // 给行附加 className
  rowClassName?: string | Function;
  // 给单元格附加 className
  cellClassName?: string | Function;
  // 给表头的行附加 className
  headerRowClassName?: string | Function;
  // 给表头的单元格附加 className
  headerCellClassName?: string | Function;
  // 给表尾的行附加 className
  footerRowClassName?: string | Function;
  // 给表尾的单元格附加 className
  footerCellClassName?: string | Function;
  // 给单元格附加样式
  cellStyle?: any | Function;
  // 给表头单元格附加样式
  headerCellStyle?: any | Function;
  // 给表尾单元格附加样式
  footerCellStyle?: any | Function;
  // 给行附加样式
  rowStyle?: any | Function;
  // 给表头行附加样式
  headerRowStyle?: any | Function;
  // 给表尾行附加样式
  footerRowStyle?: any | Function;
  // 合并行或列
  spanMethod?: Function;
  // 表尾合并行或列
  footerSpanMethod?: Function;
  // 设置所有内容过长时显示为省略号
  showOverflow?: boolean | string;
  // 设置表头所有内容过长时显示为省略号
  showHeaderOverflow?: boolean | string;
  // 设置表尾所有内容过长时显示为省略号
  showFooterOverflow?: boolean | string;
  // 所有列宽度
  columnWidth?: number | string;
  // 所有列最小宽度，把剩余宽度按比例分配
  columnMinWidth?: number | string;

  /** 高级属性 */
  // 主键配置
  columnKey?: boolean;
  rowKey?: boolean;
  rowId?: string;
  zIndex?: number;
  keepSource?: boolean;
  // 是否自动监听父容器变化去更新响应式表格宽高
  autoResize?: boolean;
  // 是否自动根据状态属性去更新响应式表格宽高
  syncResize?: boolean | string;
  // 序号配置项
  seqConfig?: any;
  // 排序配置项
  sortConfig?: any;
  // 筛选配置项
  filterConfig?: any;
  // 单选框配置
  radioConfig?: any;
  // 复选框配置项
  checkboxConfig?: any;
  // tooltip 配置项
  tooltipConfig?: any;
  // 导出配置项
  exportConfig?: boolean | any;
  // 导入配置项
  importConfig?: boolean | any;
  // 打印配置项
  printConfig?: any;
  // 展开行配置项
  expandConfig?: any;
  // 树形结构配置项
  treeConfig?: boolean | any;
  // 快捷菜单配置项
  contextMenu?: boolean | any;
  // 鼠标配置项
  mouseConfig?: any;
  // 按键配置项
  keyboardConfig?: any;
  // 编辑配置项
  editConfig?: boolean | any;
  // 校验配置项
  validConfig?: any;
  // 校验规则配置项
  editRules?: any;
  // 空内容渲染配置项
  emptyRender?: boolean | any;
  // 优化配置项
  optimization?: any;
  // 额外的参数
  params?: any;

  /**
   * 手动清除表格所有条件，还原到初始状态  
   * 对于增删改查的场景中可能会用到，比如在数据保存之后清除表格缓存
   */
  clearAll(): Promise<any>;
  /**
   * 同步 data 数据；如果用了该方法，那么组件将不再记录增删改的状态，只能自行实现对应逻辑  
   * 对于某些特殊的场景，比如深层树节点元素发生变动时可能会用到
   */
  syncData(): Promise<any>;
  /**
   * 手动处理数据  
   * 对于手动更改了排序、筛选...等条件后需要重新处理数据时可能会用到
   */
  updateData(): Promise<any>;
  /**
   * 加载数据
   * @param data 数据
   */
  loadData(data: any[]): Promise<any>;
  /**
   * 加载数据并恢复到初始状态
   * @param data 数据
   */
  reloadData(data: any[]): Promise<any>;
  /**
   * 局部加载行数据并恢复到初始状态
   * @param rows 行对象
   * @param record 新数据
   * @param field 指定字段名
   */
  reloadRow(rows: any, record?: any, field?: string): Promise<any>;
  /**
   * 加载列配置
   * @param columns 列对象
   */
  loadColumn(columns: any[]): Promise<any>;
  /**
   * 加载列配置并恢复到初始状态
   * @param columns 列对象
   */
  reloadColumn(columns: any[]): Promise<any>;
  /**
   * 根据 tr 元素获取对应的 row 信息
   * @param tr 行节点元素
   */
  getRowNode(tr: any): { item: any, items: any[], index: number, parent: any };
  /**
   * 根据 th/td 元素获取对应的 column 信息
   * @param cell 单元格节点元素
   */
  getColumnNode(cell: any): { item: ColumnConfig, items: ColumnConfig[], index: number, parent: ColumnConfig };
  /**
   * 根据 row 获取相对于 data 中的索引
   * @param row 行对象
   */
  getRowIndex(row: any): number;
  /**
   * 根据 row 获取相对于当前数据中的索引
   * @param row 行对象
   */
  _getRowIndex(row: any): number;
  /**
   * 根据 row 获取渲染中的虚拟索引
   * @param row 行对象
   */
  $getRowIndex(row: any): number;
  /**
   * 根据 column 获取相对于 columns 中的索引
   * @param column 列对象
   */
  getColumnIndex(column: ColumnConfig): number;
  /**
   * 根据 column 获取渲染中的虚拟索引
   * @param column 列对象
   */
  $getColumnIndex(column: ColumnConfig): number;
  /**
   * 创建 data 对象  
   * 对于某些特殊场景可能会用到，会自动对数据的字段名进行检测，如果不存在就自动定义
   * @param records 数据
   */
  createData(records: any[]): Promise<any[]>;
  /**
   * 创建 Row|Rows 对象  
   * 对于某些特殊场景需要对数据进行手动插入时可能会用到
   * @param records 数据
   */
  createRow(records: any): Promise<any>;
  /**
   * 只对 keep-source 开启有效，还原指定行 row 或者整个表格的数据
   * @param rows 指定行
   * @param field 字段名
   */
  revertData(rows: any, field?: string):  Promise<any>;
  /**
   * 手动清空单元格内容，如果不传参数，则清空整个表格内容，如果传了行则清空指定行内容，如果传了指定字段，则清空该字段内容
   * @param rows 指定行
   * @param field 字段名
   */
  clearData(rows: any, field?: string): Promise<any>;
  /**
   * 用于 edit-config，判断行是否为新增的临时数据
   * @param row 指定行
   */
  isInsertByRow(row: any): boolean;
  /**
   * 只对 keep-source 开启有效，判断行数据是否发生改变
   * @param row 指定行
   */
  isUpdateByRow(row: any): boolean;
  /**
   * 获取表格的可视列，也可以指定索引获取列
   * @param columnIndex 列索引
   */
  getColumns(columnIndex?: number): ColumnConfig | ColumnConfig[];
  /**
   * 根据列的唯一主键获取列
   * @param colid 列主键
   */
  getColumnById(colid: string): ColumnConfig;
  /**
   * 根据列的字段名获取列
   * @param field 字段名
   */
  getColumnByField(field: string): ColumnConfig;
  /**
   * 获取当前表格的列  
   * 收集到的全量列、全量表头列、处理条件之后的全量表头列、当前渲染中的表头列
   */
  getTableColumn(): { collectColumn: ColumnConfig[], fullColumn: ColumnConfig[], visibleColumn: ColumnConfig[], tableColumn: ColumnConfig[] };
  /**
   * 获取数据，和 data 的行为一致，也可以指定索引获取数据
   */
  getData(rowIndex?: number): any;
  /**
   * 用于 type=checkbox，获取已选中的行数据
   */
  getCheckboxRecords(): any[];
  /**
   * 根据行的唯一主键获取行
   * @param rowid 行主键
   */
  getRowById(rowid: string | number): any;
  /**
   * 获取当前表格的数据  
   * 完整的全量表体数据、处理条件之后的全量表体数据、当前渲染中的表体数据、当前渲染中的表尾数据
   */
  getTableData(): { fullData: any[], visibleData: any[], tableData: any[], footerData: any[] };
  /**
   * 隐藏指定列
   * @param column 列对象
   */
  hideColumn(column: ColumnConfig): Promise<any>;
  /**
   * 显示指定列
   * @param column 列对象
   */
  showColumn(column: ColumnConfig): Promise<any>;
  /**
   * 手动重置列的显示隐藏、列宽拖动的状态；如果为 true 则重置所有状态  
   * 如果已关联工具栏，则会同步更新
   * @param options 可选参数
   */
  resetColumn(options: { visible?: boolean, resizable?: boolean }): Promise<any>;
  /**
   * 刷新列配置  
   * 对于动态修改属性、显示/隐藏列等场景下可能会用到
   */
  refreshColumn(): Promise<any>;
  /**
   * 刷新滚动操作，手动同步滚动相关位置  
   * 对于某些特殊的操作，比如滚动条错位、固定列不同步
   */
  refreshScroll(): Promise<any>;
  /**
   * 重新计算表格  
   * 对于某些特殊场景可能会用到，比如隐藏的表格、重新计算列宽...等
   */
  recalculate(): Promise<any>;
  /**
   * 手动关闭 tooltip 提示
   */
  clostTooltip(): Promise<any>;
  /**
   * 用于 type=checkbox，设置行为选中状态，第二个参数为选中与否
   * @param rows 指定行
   * @param checked 是否选中
   */
  setCheckboxRow(rows: any, checked: boolean): Promise<any>;
  /**
   * 用于 type=checkbox，判断复选行数据是否勾选
   * @param row 指定行
   */
  isCheckedByCheckboxRow(row: any): boolean;
  /**
   * 用于 type=checkbox，切换某一行的选中状态
   * @param row 指定行
   */
  toggleCheckboxRow(row: any): Promise<any>;
  /**
   * 用于 type=checkbox，设置所有行的选中状态
   * @param checked 是否选中
   */
  setAllCheckboxRow(checked: boolean): Promise<any>;
  /**
   * 用于 radio-config.reserve，获取已保留选中的行数据
   */
  getRadioReserveRecord(): any[];
  /**
   * 用于 radio-config.reserve，手动清空用户保留选中的行数据
   */
  clearRadioReserve(): Promise<any>;
  /**
   * 用于 checkbox-config.reserve，获取已保留选中的行数据
   */
  getCheckboxReserveRecords(): any[];
  /**
   * 用于 checkbox-config.reserve，手动清空用户保留选中的行数据
   */
  clearCheckboxReserve(): Promise<any>;
  /**
   * 用于 type=checkbox，切换所有行的选中状态
   */
  toggleAllCheckboxRow(): Promise<any>;
  /**
   * 用于 type=checkbox，手动清空用户的选择
   */
  clearCheckboxRow(): Promise<any>;
  /**
   * 用于 highlight-current-row，设置某一行为高亮状态
   * @param row 指定行
   */
  setCurrentRow(row: any): Promise<any>;
  /**
   * 用于 type=radio，判断单选行数据是否勾选
   * @param row 指定行
   */
  isCheckedByRadioRow(row: any): boolean;
  /**
   * 用于 type=radio，设置某一行为选中状态
   * @param row 指定行
   */
  setRadioRow(row: any): Promise<any>;
  /**
   * 用于 highlight-current-row，手动清空当前高亮的状态
   */
  clearCurrentRow(): Promise<any>;
  /**
   * 用于 type=radio，手动清空用户的选择
   */
  clearRadioRow(): Promise<any>;
  /**
   * 用于 highlight-current-row，获取当前行的行数据
   */
  getCurrentRecord(): any;
  /**
   * 用于 type=radio，获取当已选中的行数据
   */
  getRadioRecord(): any;
  /**
   * 用于 highlight-current-column，设置某列行为高亮状态
   * @param column 列对象
   */
  setCurrentColumn(column: ColumnConfig): Promise<any>;
  /**
   * 用于 highlight-current-column，手动清空当前高亮的状态
   */
  clearCurrentColumn(): Promise<any>;
  /**
   * 手动对表格进行排序
   * @param field 字段名
   * @param order 排序方式
   */
  sort(field: string, order?: 'desc' | 'asc'): Promise<any>;
  /**
   * 手动清空排序条件，数据会恢复成未排序的状态
   */
  clearSort(): Promise<any>;
  /**
   * 获取当前排序的 column 信息
   */
  getSortColumn(): ColumnConfig;
  /**
   * 手动关闭筛选面板
   */
  closeFilter(): Promise<any>;
  /**
   * 判断指定列是否为筛选状态，如果为空则判断所有列
   * @param column 列对象
   */
  isFilter(column: ColumnConfig): boolean;
  /**
   * 用于 expand-config.lazy，用于懒加载展开行，判断展开行是否懒加载完成
   * @param row 指定行
   */
  isRowExpandLoaded(row: any): boolean;
  /**
   * 用于 expand-config.lazy，手动清空懒加载展开行的状态，数据会恢复成未展开的状态，当再次展开时会重新加载
   */
  clearRowExpandLoaded(): Promise<any>;
  /**
   * 用于懒加载展开行，重新加载展开行的内容
   * @param rows 指定行
   */
  reloadExpandContent(rows: any[]): Promise<any>;
  /**
   * 用于 type=expand，切换展开行的状态
   * @param row 指定行
   */
  toggleRowExpansion(row: any): Promise<any>;
  /**
   * 用于 expand-config，设置所有行的展开与否  
   * 如果是关闭所有行，可以使用 clearRowExpand 快速清除
   * @param checked 是否选中
   */
  setAllRowExpansion(checked: boolean): Promise<any>;
  /**
   * 用于 expand-config，设置展开行，二个参数设置这一行展开与否
   * @param rows 指定行
   * @param checked 是否选中
   */
  setRowExpansion(rows: any, checked: boolean): Promise<any>;
  /**
   * 用于 expand-config，判断行是否为展开状态
   * @param row 指定行
   */
  isExpandByRow(row: any): boolean;
  /**
   * 用于 type=expand，手动清空展开行状态，数据会恢复成未展开的状态
   */
  clearRowExpand(): Promise<any>;
  /**
   * 用于 expand-config，用于展开行，获取已展开的行数据
   */
  getRowExpandRecords(): any[];
  /**
   * 用于 tree-config，用于树表格，获取已展开的节点  
   * 注意，即使父节点被收起，只要该节点还处于展开状态都能获取到
   */
  getTreeExpandRecords(): any[];
  /**
   * 用于 tree-config.lazy，用于懒加载树表格，判断树节点是否懒加载完成
   */
  isTreeExpandLoaded(): boolean;
  /**
   * 用于 tree-config.lazy，手动清空懒加载树节点的状态，数据会恢复成未展开的状态，当再次展开时会重新加载
   */
  clearTreeExpandLoaded(): Promise<any>;
  /**
   * 用于懒加载树表格，重新加载子节点
   * @param rows 指定行
   */
  reloadTreeChilds(rows: any[]): Promise<any>;
  /**
   * 用于 tree-config，切换展开树形节点的状态
   * @param row 指定行
   */
  toggleTreeExpansion(row: any): Promise<any>;
  /**
   * 用于 tree-config，设置所有树节点的展开与否  
   * 如果是关闭所有树节点，可以使用 clearTreeExpand 快速清除
   * @param checked 是否选中
   */
  setAllTreeExpansion(checked: boolean): Promise<any>;
  /**
   * 用于 tree-config，设置展开树形节点，二个参数设置这一行展开与否
   * @param rows 指定行
   * @param checked 是否选中
   */
  setTreeExpansion(rows: any, checked: boolean): Promise<any>;
  /**
   * 用于 tree-config，判断行是否为树形节点展开状态
   * @param row 指定行
   */
  isTreeExpandByRow(row: any): boolean;
  /**
   * 用于 tree-config，手动清空树形节点的展开状态，数据会恢复成未展开的状态
   */
  clearTreeExpand(): Promise<any>;
  /**
   * 获取表格的滚动状态
   */
  getScroll(): any;
  /**
   * 如果有滚动条，则滚动到对应的位置
   * @param scrollLeft 左边距离
   * @param scrollTop 顶部距离
   */
  scrollTo(scrollLeft: number, scrollTop?: number): Promise<any>;
  /**
   * 如果有滚动条，则滚动到对应的行
   * @param row 指定行
   */
  scrollToRow(row: any): Promise<any>;
  /**
   * 如果有滚动条，则滚动到对应的列
   * @param column 列对象
   */
  scrollToColumn(column: ColumnConfig): Promise<any>;
  /**
   * 手动清除滚动相关信息，还原到初始状态
   */
  clearScroll(): Promise<any>;
  /**
   * 手动更新表尾
   */
  updateFooter(): Promise<any>;
  /**
   * 更新单元格状态
   * @param scope 插槽对象
   */
  updateStatus(scope: any): Promise<any>;
  /**
   * 用于 filters，修改筛选列表  
   * 在筛选条件更新之后可以调用 updateData 函数处理表格数据
   * @param column 列对象
   * @param options 选项列表
   */
  setFilter(column: ColumnConfig, options: any[]): Promise<any>;
  /**
   * 手动清空筛选条件  
   * 如果不传 field 则清空所有筛选条件，数据会恢复成未筛选的状态
   * @param field 字段名
   */
  clearFilter(field?: string): Promise<any>;
  /**
   * 手动关闭快捷菜单
   */
  closeMenu(): Promise<any>;
  /**
   * 用于 mouse-config.selected，获取选中的单元格信息
   */
  getSelectedCell(): { row: any, colum: any };
  /**
   * 手动清除单元格选中状态
   */
  clearSelected(): Promise<any>;
  /**
   * 往表格插入临时数据，从第一行新增一行或多行新数据
   * @param records 新数据
   */
  insert(records: any): Promise<{ row: any, rows: any[] }>;
  /**
   * 往表格插入临时数据，从指定位置插入一行或多行；第二个参数：row 指定位置、null从第一行插入、-1 从最后插入
   * @param records 新数据
   * @param row 指定行
   */
  insertAt(records: any, row: any): Promise<{ row: any, rows: any[] }>;
  /**
   * 删除指定行数据，指定 row 或 [row, ...] 删除多条数据，如果为空则删除所有数据
   * @param rows 指定行
   */
  remove(rows?: any): Promise<{ row: any, rows: any[] }>;
  /**
   * 删除复选框选中的行数据
   */
  removeCheckboxRow(): Promise<{ row: any, rows: any[] }>;
  /**
   * 删除单选框选中的行数据
   */
  removeRadioRow(): Promise<{ row: any, rows: any[] }>;
  /**
   * 删除当前行选中的行数据
   */
  removeCurrentRow(): Promise<{ row: any, rows: any[] }>;
  /**
   * 获取表格数据集  
   * 获取新增、删除、更改的数据
   */
  getRecordset(): { insertRecords: any[], removeRecords: any[], updateRecords: any[] };
  /**
   * 用于 edit-config，获取新增的临时数据
   */
  getInsertRecords(): any[];
  /**
   * 获取已删除的数据
   */
  getRemoveRecords(): any[];
  /**
   * 用于 edit-config，获取已修改的数据
   */
  getUpdateRecords(): any[];
  /**
   * 手动清除单元格激活状态
   */
  clearActived(): Promise<any>;
  /**
   * 用于 edit-config，获取已激活的行数据
   */
  getActiveRecord(): { row: any, rowIndex: number, $rowIndex: number, column: ColumnConfig, columnIndex: number, $columnIndex: number, cell: HTMLElement };
  /**
   * 用于 edit-config，判断行是否为激活编辑状态
   * @param row 指定行
   */
  isActiveByRow(row: any): boolean;
  /**
   * 用于 edit-config，激活行编辑，如果是 mode=cell 则默认激活第一个单元格
   * @param row 指定行
   */
  setActiveRow(row: any): Promise<any>;
  /**
   * 用于 edit-config，激活单元格编辑
   * @param row 指定行
   * @param field 字段名
   */
  setActiveCell(row: any, field: string): Promise<any>;
  /**
   * 用于 mouse-config.mouse-config，选中某个单元格
   * @param row 指定行
   * @param field 字段名
   */
  setSelectCell(row: any, field: string): Promise<any>;
  /**
   * 手动清除校验
   */
  clearValidate(): Promise<any>;
  /**
   * 表格完整校验函数，和 validate 的区别就是会对全量数据的所有规则进行完整校验
   * @param rows 指定行
   * @param callback 回调函数
   */
  fullValidate(rows?: any, callback?: Function): Promise<any>;
  /**
   * 表格校验函数，如果指定 row 或 rows 则校验指定一行或多行，否则校验整个表格。该回调函数会在校验结束后被调用，并传入两个参数：（是否校验成功，最近一列未通过校验的字段）。若不传入回调函数，则会返回一个 promise
   * @param rows 指定行
   * @param callback 回调函数
   */
  validate(rows?: any, callback?: Function): Promise<any>;
  /**
   * 打开高级导出
   * @param options 参数
   */
  openExport(options: any): Promise<any>;
  /**
   * 将表格数据导出
   * @param options 参数
   */
  exportData(options: any): Promise<any>;
  /**
   * 打开高级导入
   * @param options 参数
   */
  openImport(options: any): Promise<any>;
  /**
   * 将数据导入表格
   * @param options 参数
   */
  importData(options: any): Promise<any>;
  /**
   * 读取本地文件
   * @param options 参数
   */
  readFile(options: any): Promise<any>;
  /**
   * 打印配置项
   * @param options 参数
   */
  print(options: any): Promise<any>;
}