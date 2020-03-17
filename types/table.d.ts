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

  clearAll(): Promise<any>;
  syncData(): Promise<any>;
  updateData(): Promise<any>;
  loadData(data: any[]): Promise<any>;
  reloadData(data: any[]): Promise<any>;
  reloadRow(rows: any, record?: any, field?: string): Promise<any>;
  loadColumn(columns: any[]): Promise<any>;
  reloadColumn(columns: any[]): Promise<any>;
  getRowNode(tr: any): { item: any, items: any[], index: number, parent: any };
  getColumnNode(cell: any): { item: ColumnConfig, items: ColumnConfig[], index: number, parent: ColumnConfig };
  getRowIndex(row: any): number;
  _getRowIndex(row: any): number;
  $getRowIndex(row: any): number;
  getColumnIndex(column: ColumnConfig): number;
  $getColumnIndex(column: ColumnConfig): number;
  createData(records: any[]): Promise<any[]>;
  createRow(records: any): Promise<any>;
  revertData(rows: any, field: string):  Promise<any>;
  clearData(): Promise<any>;
  isInsertByRow(row: any): boolean;
  isUpdateByRow(row: any): boolean;
  getColumns(): ColumnConfig[];
  getColumnById(): ColumnConfig;
  getColumnByField(): ColumnConfig;
  getTableColumn(): { collectColumn: ColumnConfig[], fullColumn: ColumnConfig[], visibleColumn: ColumnConfig[], tableColumn: ColumnConfig[] };
  getData(): any;
  getCheckboxRecords(): any[];
  getRowById(rowid: string | number): any;
  getTableData(): { fullData: any[], visibleData: any[], tableData: any[], footerData: any[] };
  hideColumn(column: ColumnConfig): Promise<any>;
  showColumn(column: ColumnConfig): Promise<any>;
  resetColumn(options: any): Promise<any>;
  refreshColumn(): Promise<any>;
  refreshScroll(): Promise<any>;
  recalculate(): Promise<any>;
  clostTooltip(): Promise<any>;
  setCheckboxRow(rows: any, checked: boolean): Promise<any>;
  isCheckedByCheckboxRow(row: any): boolean;
  toggleCheckboxRow(row: any): Promise<any>;
  setAllCheckboxRow(checked: boolean): Promise<any>;
  checkSelectionStatus(): Promise<any>;
  getRadioReserveRecord(): any[];
  clearRadioReserve(): Promise<any>;
  getCheckboxReserveRecords(): any[];
  clearCheckboxReserve(): Promise<any>;
  toggleAllCheckboxRow(): Promise<any>;
  clearCheckboxRow(): Promise<any>;
  setCurrentRow(row: any): Promise<any>;
  isCheckedByRadioRow(row: any): boolean;
  setRadioRow(row: any): Promise<any>;
  clearCurrentRow(): Promise<any>;
  clearRadioRow(): Promise<any>;
  getCurrentRecord(): any;
  getRadioRecord(): any;
  setHoverRow(row: any): Promise<any>;
  clearHoverRow(): Promise<any>;
  setCurrentColumn(column: ColumnConfig): Promise<any>;
  clearCurrentColumn(): Promise<any>;
  sort(field: string, order?: string): Promise<any>;
  clearSort(): Promise<any>;
  getSortColumn(): ColumnConfig;
  closeFilter(): Promise<any>;
  isFilter(column: ColumnConfig): boolean;
  isRowExpandLoaded(row: any): boolean;
  clearRowExpandLoaded(): Promise<any>;
  reloadExpandContent(rows: any[]): Promise<any>;
  toggleRowExpansion(row: any): Promise<any>;
  setAllRowExpansion(checked: boolean): Promise<any>;
  setRowExpansion(rows: any, checked: boolean): Promise<any>;
  isExpandByRow(row: any): boolean;
  clearRowExpand(): Promise<any>;
  getRowExpandRecords(): any[];
  getTreeExpandRecords(): any[];
  getTreeStatus(): any;
  isTreeExpandLoaded(): boolean;
  clearTreeExpandLoaded(): Promise<any>;
  reloadTreeChilds(rows: any[]): Promise<any>;
  toggleTreeExpansion(row: any): Promise<any>;
  setAllTreeExpansion(checked: boolean): Promise<any>;
  setTreeExpansion(rows: any, checked: boolean): Promise<any>;
  isTreeExpandByRow(row: any): boolean;
  clearTreeExpand(): Promise<any>;
  getTableScroll(): any;
  scrollTo(scrollLeft: number, scrollTop?: number): Promise<any>;
  scrollToRow(row: any): Promise<any>;
  scrollToColumn(column: ColumnConfig): Promise<any>;
  scrollToTreeRow(row: any): Promise<any>;
  clearScroll(): Promise<any>;
  updateFooter(): Promise<any>;
  updateStatus(scope: any): Promise<any>;
  setFilter(column: ColumnConfig, options: any[]): Promise<any>;
  clearFilter(): Promise<any>;
  closeMenu(): Promise<any>;
  getSelectedCell(): { row: any, colum: any };
  clearSelected(): Promise<any>;
  insert(records: any): Promise<{ row: any, rows: any[] }>;
  insertAt(records: any, row: any): Promise<{ row: any, rows: any[] }>;
  remove(rows?: any): Promise<{ row: any, rows: any[] }>;
  removeCheckboxRow(): Promise<{ row: any, rows: any[] }>;
  removeRadioRow(): Promise<{ row: any, rows: any[] }>;
  removeCurrentRow(): Promise<{ row: any, rows: any[] }>;
  getRecordset(): { insertRecords: any[], removeRecords: any[], updateRecords: any[] };
  getInsertRecords(): any[];
  getRemoveRecords(): any[];
  getUpdateRecords(): any[];
  clearActived(): Promise<any>;
  getActiveRecord(): { row: any, rowIndex: number, $rowIndex: number, column: ColumnConfig, columnIndex: number, $columnIndex: number, cell: HTMLElement };
  isActiveByRow(row: any): boolean;
  setActiveRow(row: any): Promise<any>;
  setActiveCell(row: any, field: string): Promise<any>;
  setSelectCell(row: any, field: string): Promise<any>;
  clearValidate(): Promise<any>;
  fullValidate(rows?: any, callback?: Function): Promise<any>;
  validate(rows?: any, callback?: Function): Promise<any>;
  openExport(options: any): Promise<any>;
  exportData(options: any): Promise<any>;
  openImport(options: any): Promise<any>;
  importData(options: any): Promise<any>;
  readFile(options: any): Promise<any>;
  importByFile(options: any): Promise<any>;
  print(options: any): Promise<any>;
}