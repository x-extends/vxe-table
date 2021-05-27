import { VXETableComponent, RowInfo, RecordInfo } from './component'
import { ColumnOptions, ColumnInfo } from './column'
import { ColumnCellRenderParams, TableEmptyRender } from './v-x-e-table'
import { TableExportConfig, TableImportConfig, TablePrintConfig, SaveFileOptions, ReadFileOptions, ReadFileParams } from './export'
import { ColumnFilterOption } from './filter'
import { ColumnEditRule, ColumnEditValidErrMapParams } from './validator'
import { ColumnFooterRenderParams } from './footer'
import { MenuOptions, MenuFirstOption } from './menu'

/**
 * 表格
 */
export declare class Table extends VXETableComponent {
  /**
   * 唯一标识
   */
  id?: string;
  /**
   * 数据
   */
  data?: any[];
  /**
   * 表格的高度
   */
  height?: number | string;
  /**
   * 表格的最大高度
   */
  maxHeight?: number | string;
  /**
   * 所有列是否允许拖动列宽调整大小
   */
  resizable?: boolean;
  /**
   * 是否带有斑马纹
   */
  stripe?: boolean;
  /**
   * 是否带有纵向边框
   */
  border?: TableBorder;
  /**
   * 表格是否加载中
   */
  loading?: boolean;
  /**
   * 所有的列对其方式
   */
  align?: TableAlign;
  /**
   * 所有的表头列的对齐方式
   */
  headerAlign?: TableAlign;
  /**
   * 所有的表尾列的对齐方式
   */
  footerAlign?: TableAlign;
  /**
   * 是否显示表头
   */
  showHeader?: boolean;
  /**
   * 是否要高亮当前选中行
   */
  highlightCurrentRow?: boolean;
  /**
   * 鼠标移到行是否要高亮显示
   */
  highlightHoverRow?: boolean;
  /**
   * 是否要高亮当前选中列
   */
  highlightCurrentColumn?: boolean;
  /**
   * 鼠标移到列是否要高亮显示
   */
  highlightHoverColumn?: boolean;
  /**
   * 激活单元格编辑时是否高亮显示
   */
  highlightCell?: boolean;
  /**
   * 是否显示表尾
   */
  showFooter?: boolean;
  /**
   * 表尾数据获取的方法
   */
  footerMethod?: typeof TableFooterMethod;
  /**
   * 给行附加 className
   */
  rowClassName?: string | Function;
  /**
   * 给单元格附加 className
   */
  cellClassName?: string | Function;
  /**
   * 给表头的行附加 className
   */
  headerRowClassName?: string | Function;
  /**
   * 给表头的单元格附加 className
   */
  headerCellClassName?: string | Function;
  /**
   * 给表尾的行附加 className
   */
  footerRowClassName?: string | Function;
  /**
   * 给表尾的单元格附加 className
   */
  footerCellClassName?: string | Function;
  /**
   * 给单元格附加样式
   */
  cellStyle?: { [key: string]: any } | Array<string | number | boolean | { [key: string]: any }> | Function;
  /**
   * 给表头单元格附加样式
   */
  headerCellStyle?: { [key: string]: any } | Array<string | number | boolean | { [key: string]: any }> | Function;
  /**
   * 给表尾单元格附加样式
   */
  footerCellStyle?: { [key: string]: any } | Array<string | number | boolean | { [key: string]: any }> | Function;
  /**
   * 给行附加样式
   */
  rowStyle?: { [key: string]: any } | Array<string | number | boolean | { [key: string]: any }> | Function;
  /**
   * 给表头行附加样式
   */
  headerRowStyle?: { [key: string]: any } | Array<string | number | boolean | { [key: string]: any }> | Function;
  /**
   * 给表尾行附加样式
   */
  footerRowStyle?: { [key: string]: any } | Array<string | number | boolean | { [key: string]: any }> | Function;
  /**
   * 临时合并单元格
   */
  mergeCells: TableMergeConfig[];
  /**
   * 临时合并表尾
   */
  mergeFooterItems: TableMergeConfig[];
  /**
   * 自定义单元格合并方法
   */
  spanMethod?: typeof TableSpanMethod;
  /**
   * 自定义表尾合并方法
   */
  footerSpanMethod?: typeof TableFooterSpanMethod;
  /**
   * 设置所有内容过长时显示为省略号
   */
  showOverflow?: TableOverflow;
  /**
   * 设置表头所有内容过长时显示为省略号
   */
  showHeaderOverflow?: TableOverflow;
  /**
   * 设置表尾所有内容过长时显示为省略号
   */
  showFooterOverflow?: TableOverflow;

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
  syncResize?: boolean | string | number;
  // 列的默认参数
  columnConfig?: TableColumnConfig;
  // 序号配置项
  seqConfig?: TableSeqConfig;
  // 排序配置项
  sortConfig?: TableSortConfig;
  // 筛选配置项
  filterConfig?: TableFilterConfig;
  // 单选框配置
  radioConfig?: TableRadioConfig;
  // 复选框配置项
  checkboxConfig?: TableCheckboxConfig;
  checkboxOpts: TableCheckboxConfig;
  // 提示信息配置项
  tooltipConfig?: TableTooltipConfig;
  tooltipOpts: TableTooltipConfig;
  // 导出配置项
  exportConfig?: TableExportConfig;
  exportOpts: TableExportConfig;
  // 导入配置项
  importConfig?: TableImportConfig;
  importOpts: TableImportConfig;
  // 打印配置项
  printConfig?: TablePrintConfig;
  printOpts: TablePrintConfig;
  // 展开行配置项
  expandConfig?: TableExpandConfig;
  expandOpts: TableExpandConfig;
  // 树形结构配置项
  treeConfig?: TableTreeConfig;
  treeOpts: TreeOpts;
  // 快捷菜单配置项
  menuConfig?: TableMenuConfig;
  /**
   * 即将废弃，请使用 menu-config
   * @deprecated
   */
  contextMenu?: TableMenuConfig;
  // 鼠标配置项
  mouseConfig?: TableMouseConfig;
  mouseOpts: TableMouseConfig;
  // 按键配置项
  keyboardConfig?: TableKeyboardConfig;
  keyboardOpts: TableKeyboardConfig;
  clipConfig?: TableClipConfig;
  // 编辑配置项
  editConfig?: TableEditConfig;
  editOpts: TableEditConfig;
  // 校验配置项
  validConfig?: TableValidConfig;
  // 校验规则配置项
  editRules?: EditVaildRules;
  emptyText?: string;
  // 空内容渲染配置项
  emptyRender?: TableEmptyRender;
  animat?: boolean;
  delayHover?: number;
  /**
   * 横向虚拟滚动配置
   */
  scrollX?: {
    /**
     * 指定大于指定列时自动启动横向虚拟滚动，如果为 0 则总是启用，如果为 -1 则关闭
     */
    gt?: number;
    /**
     * 指定每次渲染的数据偏移量，偏移量越大渲染次数就越少，但每次渲染耗时就越久
     */
    oSize?: number;
    [key: string]: any;
  };
  /**
   * 纵向虚拟滚动配置
   */
  scrollY?: {
    /**
     * 指定大于指定行时自动启动纵向虚拟滚动，如果为 0 则总是启用，如果为 -1 则关闭
     */
    gt?: number;
    /**
     * 指定每次渲染的数据偏移量，偏移量越大渲染次数就越少，但每次渲染耗时就越久
     */
    oSize?: number;
    [key: string]: any;
  };
  // 额外的参数
  params?: any;

  // methods
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
  loadData(data: RecordInfo[]): Promise<any>;
  /**
   * 加载数据并恢复到初始状态
   * @param data 数据
   */
  reloadData(data: RecordInfo[]): Promise<any>;
  /**
   * 局部加载行数据并恢复到初始状态
   * @param rows 行对象
   * @param record 新数据
   * @param field 指定字段名
   */
  reloadRow(rows: RowInfo | RowInfo[], record?: RecordInfo, field?: string): Promise<any>;
  /**
   * 加载列配置
   * @param columns 列对象
   */
  loadColumn(columns: ColumnOptions[]): Promise<any>;
  /**
   * 加载列配置并恢复到初始状态
   * @param columns 列对象
   */
  reloadColumn(columns: ColumnOptions[]): Promise<any>;
  /**
   * 根据 tr 元素获取对应的 row 信息
   * @param tr 行节点元素
   */
  getRowNode(trElem: HTMLElement): {
    rowid: string;
    item: RowInfo;
    items: RowInfo[];
    index: number;
    parent?: RowInfo;
  };
  /**
   * 根据 th/td 元素获取对应的 column 信息
   * @param cell 单元格节点元素
   */
  getColumnNode(cellElem: HTMLElement): {
    colid: string;
    item: ColumnInfo;
    items: ColumnInfo[];
    index: number;
    parent?: ColumnInfo;
  };
  /**
   * 根据 row 获取相对于 data 中的索引
   * @param row 行对象
   */
  getRowIndex(row: RowInfo): number;
  /**
   * 根据 row 获取相对于当前数据中的索引
   * @param row 行对象
   */
  getVTRowIndex(row: RowInfo): number;
  /**
   * 根据 row 获取渲染中的虚拟索引
   * @param row 行对象
   */
  getVMRowIndex(row: RowInfo): number;
  /**
   * 根据 column 获取相对于 columns 中的索引
   * @param column 列对象
   */
  getColumnIndex(column: ColumnInfo): number;
  /**
   * 根据 column 获取相对于当前表格列中的索引
   * @param column 列对象
   */
  getVTColumnIndex(column: ColumnInfo): number;
  /**
   * 根据 column 获取渲染中的虚拟索引
   * @param column 列对象
   */
  getVMColumnIndex(column: ColumnInfo): number;
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
  createRow(records: any | any[]): Promise<any | any[]>;
  /**
   * 只对 keep-source 开启有效，还原指定行 row 或者整个表格的数据
   * @param rows 指定行
   * @param field 字段名
   */
  revertData(rows?: RowInfo | RowInfo[], field?: string): Promise<any>;
  /**
   * 手动清空单元格内容，如果不传参数，则清空整个表格内容，如果传了行则清空指定行内容，如果传了指定字段，则清空该字段内容
   * @param rows 指定行
   * @param field 字段名
   */
  clearData(rows?: RowInfo | RowInfo[], field?: string): Promise<any>;
  /**
   * 用于 edit-config，判断行是否为新增的临时数据
   * @param row 指定行
   */
  isInsertByRow(row: RowInfo): boolean;
  /**
   * 只对 keep-source 开启有效，判断行数据是否发生改变
   * @param row 指定行
   */
  isUpdateByRow(row: any, field?: string): boolean;
  /**
   * 获取表格的可视列，也可以指定索引获取列
   * @param columnIndex 列索引
   */
  getColumns(columnIndex?: number): ColumnInfo | ColumnInfo[];
  /**
   * 根据列的唯一主键获取列
   * @param colid 列主键
   */
  getColumnById(colid: string): ColumnInfo;
  /**
   * 根据列的字段名获取列
   * @param field 字段名
   */
  getColumnByField(field: string): ColumnInfo;
  /**
   * 获取当前表格的列
   * 收集到的全量列、全量表头列、处理条件之后的全量表头列、当前渲染中的表头列
   */
  getTableColumn(): {
    collectColumn: ColumnInfo[];
    fullColumn: ColumnInfo[];
    visibleColumn: ColumnInfo[];
    tableColumn: ColumnInfo[];
  };
  /**
   * 获取数据，和 data 的行为一致，也可以指定索引获取数据
   */
  getData(rowIndex?: number): RowInfo[];
  /**
   * 用于 type=checkbox，获取已选中的行数据
   */
  getCheckboxRecords(isFull?: boolean): RowInfo[];
  /**
   * 根据行的唯一主键获取行
   * @param rowid 行主键
   */
  getRowById(rowid: string | number): RowInfo;
  /**
   * 获取当前表格的数据
   * 完整的全量表体数据、处理条件之后的全量表体数据、当前渲染中的表体数据、当前渲染中的表尾数据
   */
  getTableData(): {
    fullData: RowInfo[];
    visibleData: RowInfo[];
    tableData: RowInfo[];
    footerData: any[][];
  };
  /**
   * 隐藏指定列
   * @param column 列对象
   */
  hideColumn(column: ColumnInfo): Promise<any>;
  /**
   * 显示指定列
   * @param column 列对象
   */
  showColumn(column: ColumnInfo): Promise<any>;
  /**
   * 手动重置列的显示隐藏、列宽拖动的状态；如果为 true 则重置所有状态
   * 如果已关联工具栏，则会同步更新
   * @param options 可选参数
   */
  resetColumn(options: boolean | { visible?: boolean, resizable?: boolean }): Promise<any>;
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
   * 重新计算表格，如果传 true 则进行完整计算
   * 对于某些特殊场景可能会用到，比如隐藏的表格、重新计算列宽...等
   */
  recalculate(refull?: boolean): Promise<any>;
  /**
   * 打开 tooltip 提示
   * @param target 目标元素
   * @param content 内容
   */
  openTooltip (target: HTMLElement, content: string | number): Promise<any>;
  /**
   * 手动关闭 tooltip 提示
   */
  closeTooltip(): Promise<any>;
  /**
   * 用于 type=checkbox，设置行为选中状态，第二个参数为选中与否
   * @param rows 指定行
   * @param checked 是否选中
   */
  setCheckboxRow(rows: RowInfo | RowInfo[], checked: boolean): Promise<any>;
  /**
   * 用于 type=checkbox，判断列头复选框是否被选中
   */
  isAllCheckboxChecked(): boolean;
  /**
   * 用于 type=checkbox，判断列头复选框是否被半选
   */
  isAllCheckboxIndeterminate(): boolean;
  /**
   * 用于 type=checkbox，判断复选行数据是否勾选
   * @param row 指定行
   */
  isCheckedByCheckboxRow(row: RowInfo): boolean;
  /**
   * 用于 type=checkbox，切换某一行的选中状态
   * @param row 指定行
   */
  toggleCheckboxRow(row: RowInfo): Promise<any>;
  /**
   * 用于 type=checkbox，设置所有行的选中状态
   * @param checked 是否选中
   */
  setAllCheckboxRow(checked: boolean): Promise<any>;
  /**
   * 用于 radio-config.reserve，获取已保留选中的行数据
   */
  getRadioReserveRecord(isFull?: boolean): RowInfo[];
  /**
   * 用于 radio-config.reserve，手动清空用户保留选中的行数据
   */
  clearRadioReserve(): Promise<any>;
  /**
   * 用于 checkbox-config.reserve，获取已保留选中的行数据
   */
  getCheckboxReserveRecords(isFull?: boolean): RowInfo[];
  /**
   * 用于 type=checkbox，获取半选状态的行数据
   */
  getCheckboxIndeterminateRecords(isFull?: boolean): RowInfo[]
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
  setCurrentRow(row: RowInfo): Promise<any>;
  /**
   * 用于 type=radio，判断单选行数据是否勾选
   * @param row 指定行
   */
  isCheckedByRadioRow(row: RowInfo): boolean;
  /**
   * 用于 type=radio，设置某一行为选中状态
   * @param row 指定行
   */
  setRadioRow(row: RowInfo): Promise<any>;
  /**
   * 手动清除临时合并的单元格
   */
  clearMergeCells(): Promise<any>;
  /**
   * 手动清除临时合并的表尾
   */
  clearMergeFooterItems(): Promise<any>;
  /**
   * 用于 highlight-current-row，手动清空当前高亮的状态
   */
  clearCurrentRow(): Promise<any>;
  /**
   * 用于 type=radio，手动清空用户的选择
   */
  clearRadioRow(): Promise<any>;
  /**
   * 获取临时合并的单元格
   */
  getMergeCells(): MergeItem[];
  /**
   * 获取临时合并的表尾
   */
  getMergeFooterItems(): MergeItem[];
  /**
   * 用于 highlight-current-column，获取当前列
   */
  getCurrentColumn(): ColumnInfo | null;
  /**
   * 用于 highlight-current-row，获取当前行的行数据
   */
  getCurrentRecord(): RowInfo;
  /**
   * 用于 type=radio，获取当已选中的行数据
   */
  getRadioRecord(isFull?: boolean): RowInfo;
  /**
   * 用于 highlight-current-column，设置某列行为高亮状态
   * @param column 列对象
   */
  setCurrentColumn(column: ColumnInfo): Promise<any>;
  /**
   * 用于 highlight-current-column，手动清空当前高亮的状态
   */
  clearCurrentColumn(): Promise<any>;
  /**
   * 手动对表格进行排序
   * @param sortConfs 字段名、多列排序
   * @param order 排序方式
   */
  sort(sortConfs: string | TableSortConfs | TableSortConfs[], order?: TableSortOrder): Promise<any>;
  /**
   * 手动清空排序条件，数据会恢复成未排序的状态
   */
   clearSort(fieldOrColumn?: string | ColumnInfo | null): Promise<any>;
  /**
   * 获取当前排序的 column 信息
   */
  getSortColumn(): ColumnInfo;
  /**
   * 手动关闭筛选面板
   */
  closeFilter(): Promise<any>;
  /**
   * 判断指定列是否为筛选状态，如果为空则判断所有列
   * @param column 列对象
   */
  isFilter(column: ColumnInfo): boolean;
  /**
   * 用于 expand-config.lazy，用于懒加载展开行，判断展开行是否懒加载完成
   * @param row 指定行
   */
  isRowExpandLoaded(row: RowInfo): boolean;
  /**
   * 用于 expand-config.lazy，手动清空懒加载展开行的状态，数据会恢复成未展开的状态，当再次展开时会重新加载
   */
  clearRowExpandLoaded(row: any): Promise<any>;
  /**
   * 用于懒加载展开行，重新加载展开行的内容
   * @param rows 指定行
   */
  reloadExpandContent(rows: RowInfo | RowInfo[]): Promise<any>;
  /**
   * 用于 type=expand，切换展开行的状态
   * @param row 指定行
   */
  toggleRowExpand(row: RowInfo): Promise<any>;
  /**
   * 用于 expand-config，设置所有行的展开与否
   * 如果是关闭所有行，可以使用 clearRowExpand 快速清除
   * @param checked 是否选中
   */
  setAllRowExpand(checked: boolean): Promise<any>;
  /**
   * 用于 expand-config，设置展开行，二个参数设置这一行展开与否
   * @param rows 指定行
   * @param checked 是否选中
   */
  setRowExpand(rows: RowInfo | RowInfo[], checked: boolean): Promise<any>;
  /**
   * 用于 expand-config，判断行是否为展开状态
   * @param row 指定行
   */
  isExpandByRow(row: RowInfo): boolean;
  /**
   * 用于 type=expand，手动清空展开行状态，数据会恢复成未展开的状态
   */
  clearRowExpand(): Promise<any>;
  /**
   * 用于 expand-config，用于展开行，获取已展开的行数据
   */
  getRowExpandRecords(): RowInfo[];
  /**
   * 用于 tree-config，用于树表格，获取已展开的节点
   * 注意，即使父节点被收起，只要该节点还处于展开状态都能获取到
   */
  getTreeExpandRecords(): RowInfo[];
  /**
   * 用于 tree-config.lazy，用于懒加载树表格，判断树节点是否懒加载完成
   */
  isTreeExpandLoaded(row: RowInfo): boolean;
  /**
   * 用于 tree-config.lazy，手动清空懒加载树节点的状态，数据会恢复成未展开的状态，当再次展开时会重新加载
   */
  clearTreeExpandLoaded(row: any): Promise<any>;
  /**
   * 用于懒加载树表格，重新加载子节点
   * @param rows 指定行
   */
  reloadTreeChilds(rows: RowInfo | RowInfo[]): Promise<any>;
  /**
   * 用于 tree-config，切换展开树形节点的状态
   * @param row 指定行
   */
  toggleTreeExpand(row: RowInfo): Promise<any>;
  /**
   * 用于 tree-config，设置所有树节点的展开与否
   * 如果是关闭所有树节点，可以使用 clearTreeExpand 快速清除
   * @param checked 是否选中
   */
  setAllTreeExpand(checked: boolean): Promise<any>;
  /**
   * 用于 tree-config，设置展开树形节点，二个参数设置这一行展开与否
   * @param rows 指定行
   * @param checked 是否选中
   */
  setTreeExpand(rows: RowInfo | RowInfo, checked: boolean): Promise<any>;
  /**
   * 用于 tree-config，判断行是否为树形节点展开状态
   * @param row 指定行
   */
  isTreeExpandByRow(row: RowInfo): boolean;
  /**
   * 用于 tree-config，手动清空树形节点的展开状态，数据会恢复成未展开的状态
   */
  clearTreeExpand(): Promise<any>;
  /**
   * 获取表格的滚动状态
   */
  getScroll(): {
    virtualX: boolean;
    virtualY: boolean;
    scrollTop: number;
    scrollLeft: number;
  };
  /**
   * 如果有滚动条，则滚动到对应的位置
   * @param scrollLeft 左边距离
   * @param scrollTop 顶部距离
   */
  scrollTo(scrollLeft: number, scrollTop?: number): Promise<any>;
  /**
   * 如果有滚动条，则滚动到对应的行
   * @param row 指定行
   * @param column 列对象
   */
  scrollToRow(row: RowInfo, column?: ColumnInfo): Promise<any>;
  /**
   * 如果有滚动条，则滚动到对应的列
   * @param column 列对象
   */
  scrollToColumn(column: ColumnInfo): Promise<any>;
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
   * @param params 插槽对象
   */
  updateStatus(
    params: {
      row: RowInfo;
      column: ColumnInfo;
    }
  ): Promise<any>;
  /**
   * 用于 filters，修改筛选列表
   * 在筛选条件更新之后可以调用 updateData 函数处理表格数据
   * @param column 列对象
   * @param options 选项列表
   */
  setFilter(column: ColumnInfo, options: ColumnFilterOption[]): Promise<any>;
  /**
   * 手动清空筛选条件
   * 如果不传 column 则清空所有筛选条件，数据会恢复成未筛选的状态
   * @param column 字段名
   */
  clearFilter(column?: ColumnInfo): Promise<any>;
  /**
   * 手动关闭快捷菜单
   */
  closeMenu(): Promise<any>;
  /**
   * 用于 mouse-config.selected，获取选中的单元格信息
   */
  getSelectedCell(): {
    row: RowInfo;
    column: ColumnInfo;
  };
  /**
   * 用于 mouse-config.area，用于获取鼠标选择的区域
   */
  getCellAreas(): MouseCellArea[];
  /**
   * 用于 mouse-config.area，复制指定区域，返回转换后的文本
   */
  copyCellArea(): { text: string, html: string };
  /**
   * 用于 mouse-config.area，剪贴指定区域，返回转换后的文本
   */
  cutCellArea(): { text: string, html: string };
  /**
   * 用于 mouse-config.area，粘贴从表格中被复制的数据，如果不是从表格中操作，则无法粘贴
   */
  pasteCellArea(): Promise<any>;
  /**
   * 手动清除单元格选中状态
   */
  clearSelected(): Promise<any>;
  /**
   * 往表格插入临时数据，从第一行新增一行或多行新数据
   * @param records 新数据
   */
  insert(records: RecordInfo | RecordInfo[]): Promise<{ row: RowInfo, rows: RowInfo[] }>;
  /**
   * 往表格插入临时数据，从指定位置插入一行或多行；第二个参数：row 指定位置、null从第一行插入、-1 从最后插入
   * @param records 新数据
   * @param row 指定行
   */
  insertAt(records: RecordInfo | RecordInfo[], row: RowInfo | -1 | null): Promise<{ row: RowInfo, rows: RowInfo[] }>;
  /**
   * 删除指定行数据，指定 row 或 [row, ...] 删除多条数据，如果为空则删除所有数据
   * @param rows 指定行
   */
  remove(rows?: RowInfo | RowInfo[]): Promise<{ row: RowInfo, rows: RowInfo[] }>;
  /**
   * 删除复选框选中的行数据
   */
  removeCheckboxRow(): Promise<{ row: RowInfo, rows: RowInfo[] }>;
  /**
   * 删除单选框选中的行数据
   */
  removeRadioRow(): Promise<{ row: RowInfo, rows: RowInfo[] }>;
  /**
   * 删除当前行选中的行数据
   */
  removeCurrentRow(): Promise<{ row: RowInfo, rows: RowInfo[] }>;
  /**
   * 取消单元格的临时合并状态，如果为数组，则取消多个合并
   */
  removeMergeCells(merges: TableMergeConfig | TableMergeConfig[]): Promise<MergeItem[]>;
  /**
   * 取消表尾的临时合并状态，如果为数组，则取消多个合并
   */
  removeMergeFooterItems(merges: TableMergeConfig | TableMergeConfig[]): Promise<MergeItem[]>;
  /**
   * 获取表格数据集
   * 获取新增、删除、更改的数据
   */
  getRecordset(): {
    insertRecords: RowInfo[];
    removeRecords: RowInfo[];
    updateRecords: RowInfo[];
  };
  /**
   * 用于 edit-config，获取新增的临时数据
   */
  getInsertRecords(): RowInfo[];
  /**
   * 获取已删除的数据
   */
  getRemoveRecords(): RowInfo[];
  /**
   * 用于 edit-config，获取已修改的数据
   */
  getUpdateRecords(): RowInfo[];
  /**
   * 手动清除单元格激活状态
   */
  clearActived(): Promise<any>;
  /**
   * 用于 mouse-config.area，用于清除鼠标选择的区域
   */
  clearCellAreas(): Promise<any>;
  /**
   * 用于 edit-config，获取已激活的行数据
   */
  getActiveRecord(): {
    row: RowInfo;
    rowIndex: number;
    $rowIndex: number;
    column: ColumnInfo;
    columnIndex: number;
    $columnIndex: number;
    cell: HTMLElement;
  };
  /**
   * 用于 edit-config，判断行是否为激活编辑状态
   * @param row 指定行
   */
  isActiveByRow(row: RowInfo): boolean;
  /**
   * 用于 edit-config，激活行编辑并激活第一个单元格
   * @param row 指定行
   */
  setActiveRow(row: RowInfo): Promise<any>;
  /**
   * 用于 edit-config，激活单元格编辑
   * @param row 指定行
   * @param field 字段名
   */
  setActiveCell(row: RowInfo, field: string): Promise<any>;
  /**
   * 用于 mouse-config.mouse-config，选中某个单元格
   * @param row 指定行
   * @param field 字段名
   */
  setSelectCell(row: RowInfo, field: string): Promise<any>;
  /**
   * 用于 mouse-config.area，选取指定区域的单元格
   * @param areaConfigs 指定区域
   */
  setCellAreas(areaConfigs: CellAreaConfig[], activeArea?: {
    area?: MouseCellArea;
    column: ColumnInfo;
    row: RowInfo;
  }): Promise<any>;
  /**
   * 用于 mouse-config.area，设置活动的区域的单元格
   * @param activeArea
   */
  setActiveCellArea(activeArea: {
    area: MouseCellArea;
    column: ColumnInfo;
    row: RowInfo;
  }): Promise<any>;
  /**
   * 临时合并单元格，如果为数组则合并多个
   */
  setMergeCells(merges: TableMergeConfig | TableMergeConfig[]): Promise<any>;
  /**
   * 临时合并表尾，如果为数组则合并多个
   */
  setMergeFooterItems(merges: TableMergeConfig | TableMergeConfig[]): Promise<any>;
  /**
   * 手动清除校验
   */
  clearValidate(): Promise<any>;
  /**
   * 完整校验，和 validate 的区别就是默认校验当前表格数据并且给有效数据中的每一行进行校验
   * @param rows 指定行
   * @param callback 回调函数
   */
  fullValidate(rows?: boolean | RowInfo | RowInfo[] | ((errMap?: ColumnEditValidErrMapParams) => void), callback?: (errMap: ColumnEditValidErrMapParams) => void): Promise<ColumnEditValidErrMapParams>;
  /**
   * 快速校验，如果存在记录不通过的记录，则返回不再继续校验（异步校验除外）；如果第一个参数为 true 则校验当前表格数据，如果指定 row 或 rows 则校验指定一行或多行，如果不指定数据，则默认只校验临时变动的数据，例如新增或修改。该回调函数会在校验结束后被调用 callback(errMap)。若不传入回调函数，则会返回一个 promise
   * @param rows 指定行
   * @param callback 回调函数
   */
  validate(rows?: boolean | RowInfo | RowInfo[] | ((errMap?: ColumnEditValidErrMapParams) => void), callback?: (errMap?: ColumnEditValidErrMapParams) => void): Promise<ColumnEditValidErrMapParams>;
  /**
   * 打开高级导出
   * @param options 参数
   */
  openExport(options?: TableExportConfig): Promise<any>;
  /**
   * 将表格数据导出
   * @param options 参数
   */
  exportData(options?: TableExportConfig): Promise<any>;
  /**
   * 打开高级导入
   * @param options 参数
   */
  openImport(options?: TableImportConfig): Promise<any>;
  /**
   * 将数据导入表格
   * @param options 参数
   */
  importData(options?: TableImportConfig): Promise<any>;
  /**
   * 保存文件到本地
   * @param options 
   */
  saveFile(options: SaveFileOptions): Promise<any>;
  /**
   * 读取本地文件
   * @param options 参数
   */
  readFile(options?: ReadFileOptions): Promise<ReadFileParams>;
  /**
   * 打印表格数据
   * @param options 参数
   */
  print(options?: TablePrintConfig): Promise<any>;
  /**
   * 打开高级打印
   * @param options 参数
   */
  openPrint(options?: TablePrintConfig): Promise<any>;
  /**
   * 用于 mouse-config.area，打开单元格查找功能
   */
  openFind(): Promise<any>;
  /**
   * 用于 mouse-config.area，打开单元格替换功能
   */
  openReplace(): Promise<any>;
  /**
   * 连接工具栏
   * @param toolbar 工具栏组件实例
   */
  connect(toolbar: any): Promise<any>;
  /**
   * 使表格获取焦点
   */
  focus(): Promise<any>;
  /**
   * 使表格失去焦点
   */
  blur(): Promise<any>;
  [key: string]: any;
}

export type TableBorder = boolean | 'default' | 'full' | 'outer' | 'inner' | 'none';
export type TableAlign = 'left' | 'center' | 'right' | null;
export type TableOverflow = boolean | 'ellipsis' | 'title' | 'tooltip' | null;

export interface TableFooterMethodParams {
  $table: Table;
  columns: ColumnInfo[];
  data: any[];
}
export function TableFooterMethod(params: TableFooterMethodParams): Array<string | number | null>[];

export interface TableSpanMethodParams extends ColumnCellRenderParams {}
export function TableSpanMethod(params: TableSpanMethodParams): { rowspan: number, colspan: number }

export interface TableFooterSpanMethodParams extends ColumnFooterRenderParams {}
export function TableFooterSpanMethod(params: TableFooterSpanMethodParams): { rowspan: number, colspan: number }

export interface TableOptions {
  id?: string;
  data?: any[];
  height?: number | string;
  maxHeight?: number | string;
  resizable?: boolean;
  stripe?: boolean;
  border?: TableBorder;
  loading?: boolean;
  align?: TableAlign;
  headerAlign?: TableAlign;
  footerAlign?: TableAlign;
  showHeader?: boolean;
  highlightCurrentRow?: boolean;
  highlightHoverRow?: boolean;
  highlightCurrentColumn?: boolean;
  highlightHoverColumn?: boolean;
  highlightCell?: boolean;
  showFooter?: boolean;
  footerMethod?: typeof TableFooterMethod;
  rowClassName?: string | Function;
  cellClassName?: string | Function;
  headerRowClassName?: string | Function;
  headerCellClassName?: string | Function;
  footerRowClassName?: string | Function;
  footerCellClassName?: string | Function;
  cellStyle?: { [key: string]: any } | Array<string | number | boolean | { [key: string]: any }> | Function;
  headerCellStyle?: { [key: string]: any } | Array<string | number | boolean | { [key: string]: any }> | Function;
  footerCellStyle?: { [key: string]: any } | Array<string | number | boolean | { [key: string]: any }> | Function;
  rowStyle?: { [key: string]: any } | Array<string | number | boolean | { [key: string]: any }> | Function;
  headerRowStyle?: { [key: string]: any } | Array<string | number | boolean | { [key: string]: any }> | Function;
  footerRowStyle?: { [key: string]: any } | Array<string | number | boolean | { [key: string]: any }> | Function;
  mergeCells?: TableMergeConfig[];
  mergeFooterItems?: TableMergeConfig[];
  spanMethod?: typeof TableSpanMethod;
  footerSpanMethod?: typeof TableFooterSpanMethod;
  showOverflow?: TableOverflow;
  showHeaderOverflow?: TableOverflow;
  showFooterOverflow?: TableOverflow;
  columnKey?: boolean;
  rowKey?: boolean;
  rowId?: string;
  keepSource?: boolean;
  autoResize?: boolean;
  syncResize?: boolean | string | number;
  columnConfig?: TableColumnConfig;
  customConfig?: TableCustomConfig;
  seqConfig?: TableSeqConfig;
  sortConfig?: TableSortConfig;
  filterConfig?: TableFilterConfig;
  radioConfig?: TableRadioConfig;
  checkboxConfig?: TableCheckboxConfig;
  tooltipConfig?: TableTooltipConfig;
  exportConfig?: TableExportConfig;
  importConfig?: TableImportConfig;
  printConfig?: TablePrintConfig;
  expandConfig?: TableExpandConfig;
  treeConfig?: TableTreeConfig;
  menuConfig?: TableMenuConfig;
  /**
   * 即将废弃，请使用 menu-config
   * @deprecated
   */
  contextMenu?: TableMenuConfig;
  mouseConfig?: TableMouseConfig;
  keyboardConfig?: TableKeyboardConfig;
  clipConfig?: TableClipConfig;
  editConfig?: TableEditConfig;
  validConfig?: TableValidConfig;
  editRules?: EditVaildRules;
  emptyText?: string;
  emptyRender?: TableEmptyRender;
  animat?: boolean;
  delayHover?: number;
  scrollX?: {
    gt?: number;
    oSize?: number;
    [key: string]: any;
  };
  scrollY?: {
    gt?: number;
    oSize?: number;
    [key: string]: any;
  };
  params?: any;
  [key: string]: any;
}

/**
 * 列的默认配置
 */
export interface TableColumnConfig {
  width?: number;
  minWidth?: number;
}
export interface ColumnDefaultConfig extends TableColumnConfig {}

/**
 * 自定义列配置项
 */
export interface TableCustomConfig {
  storage?: boolean | {
    visible?: boolean;
    resizable?: boolean;
  };
  checkMethod?(params: { column: ColumnInfo }): boolean;
}
export interface CustomConfig extends TableCustomConfig {}

/**
 * 序号配置项
 */
export interface TableSeqConfig {
  startIndex?: number;
  seqMethod?(params: ColumnCellRenderParams): number;
}
export interface SeqConfig extends TableSeqConfig {}

export interface TableSortConfs {
  field: string;
  order?: TableSortOrder;
}

export type TableSortOrder = 'asc' | 'desc' | null;

/**
 * 排序配置项
 */
export interface TableSortConfig {
  defaultSort?: {
    field: string;
    order: TableSortOrder;
  };
  orders?: TableSortOrder[];
  sortMethod?(params: { data: any[], column: ColumnInfo, property: string, order: string }): any[];
  remote?: boolean;
  trigger?: 'default' | 'cell';
  showIcon: boolean;
  iconAsc?: string;
  iconDesc?: string;
}
export interface SortConfig extends TableSortConfig {}

/**
 * 筛选配置项
 */
export interface TableFilterConfig {
  remote?: boolean;
  showIcon?: string;
  iconNone?: string;
  iconMatch?: string;
}
export interface FilterConfig extends TableFilterConfig {}

/**
 * 单选框配置
 */
export interface TableRadioConfig {
  reserve?: boolean;
  labelField?: string;
  checkRowKey?: string | number;
  checkMethod?(params: { row: RowInfo }): boolean;
  trigger?: 'default' | 'cell' | 'row';
  highlight?: boolean;
}
export interface RadioConfig extends TableRadioConfig {}

/**
 * 复选框配置项
 */
export interface TableCheckboxConfig {
  reserve?: boolean;
  labelField?: string;
  checkField?: string;
  halfField?: string;
  showHeader?: boolean;
  checkAll?: boolean;
  checkRowKeys?: string[] | number[];
  checkStrictly?: boolean;
  strict?: boolean;
  checkMethod?(params: { row: RowInfo }): boolean;
  trigger?: 'default' | 'cell' | 'row';
  highlight?: boolean;
  range?: boolean;
}
export interface CheckboxConfig extends TableCheckboxConfig {}

/**
 * 提示信息配置项
 */
export interface TableTooltipConfig {
  enabled?: boolean;
  theme?: 'dark' | 'light';
  enterable?: boolean;
  leaveDelay?: number;
  contentMethod?(params: { items: any[], row: RowInfo, rowIndex: number, $rowIndex: number, column: ColumnInfo, columnIndex: number, $columnIndex: number, type: 'header' | 'body' | 'footer', cell: HTMLElement, $event: any }): string | null | void;
}
export interface TooltipConfig extends TableTooltipConfig {}

/**
 * 展开行配置项
 */
export interface TableExpandConfig {
  labelField?: string;
  expandAll?: boolean;
  expandRowKeys?: string[] | number[];
  accordion?: boolean;
  trigger?: 'default' | 'cell' | 'row';
  lazy?: boolean;
  loadMethod?(params: { row: RowInfo, rowIndex: number, $rowIndex: number }): Promise<any>;
  toggleMethod?(params: { expanded: boolean, row: RowInfo, column: ColumnInfo, columnIndex: number, $columnIndex: number }): boolean;
  visibleMethod?(params: { expanded: boolean, row: RowInfo, column: ColumnInfo, columnIndex: number, $columnIndex: number }): boolean;
  showIcon?: boolean;
  iconOpen?: string;
  iconClose?: string;
  iconLoaded?: string;
}
export interface ExpandConfig extends TableExpandConfig {}

/**
 * 树形结构配置项
 */
export interface TableTreeConfig {
  children?: string;
  indent?: number;
  line?: boolean;
  expandAll?: boolean;
  expandRowKeys?: string[] | number[];
  accordion?: boolean;
  trigger?: 'default' | 'cell' | 'row';
  lazy?: boolean;
  hasChild?: string;
  loadMethod?(params: { row: RowInfo }): Promise<any[]>;
  toggleMethod?(params: { expanded: boolean, row: RowInfo, column: ColumnInfo, columnIndex: number, $columnIndex: number }): boolean;
  showIcon?: boolean;
  iconOpen?: string;
  iconClose?: string;
  iconLoaded?: string;
}
export interface TreeConfig extends TableTreeConfig {}

export interface TreeOpts {
  children: string;
  indent: number;
  line?: boolean;
  expandAll?: boolean;
  expandRowKeys?: string[] | number[];
  accordion?: boolean;
  trigger?: 'default' | 'cell' | 'row';
  lazy?: boolean;
  hasChild: string;
  loadMethod?(params: { row: RowInfo }): Promise<any[]>;
  toggleMethod?(params: { expanded: boolean, row: RowInfo, column: ColumnInfo, columnIndex: number, $columnIndex: number }): boolean;
  showIcon: boolean;
  iconOpen: string;
  iconClose: string;
  iconLoaded: string;
}

/**
 * 快捷菜单配置项
 */
export interface TableMenuConfig {
  header?: MenuOptions;
  body?: MenuOptions;
  footer?: MenuOptions;
  trigger?: 'default' | 'cell';
  visibleMethod?(params: { type: string, options: MenuFirstOption[], columns: ColumnInfo[], row?: RowInfo, rowIndex?: number, column?: ColumnInfo, columnIndex?: number }): boolean;
  className?: string;
}
export interface TableContextMenu extends TableMenuConfig {}
export interface ContextMenuConfig extends TableContextMenu {}

/**
 * 鼠标配置项
 */
export interface TableMouseConfig {
  selected?: boolean;
  /**
   * 如果功能被支持，则开启单元格区域选取功能，非连续的区域，按住 Ctrl 键，用鼠标逐一选取
   */
  area?: boolean;
}
export interface MouseConfig extends TableMouseConfig {}

export interface MouseCellArea {
  main: boolean;
  rows: RowInfo[];
  cols: ColumnInfo[];
  top: number;
  left: number;
  width: number;
  height: number;
}

export type CELL_AREA_TYPE = 'main' | 'copy' | 'extend' | 'multi' | 'active'

export interface CellAreaConfig {
  type?: CELL_AREA_TYPE;
  startColumn: ColumnInfo;
  endColumn: ColumnInfo;
  startRow: RowInfo;
  endRow: RowInfo;
}

export interface TableMergeConfig {
  row: RowInfo | number;
  col: ColumnInfo | number;
  rowspan: number;
  colspan: number;
}
export interface MergeOptions extends TableMergeConfig {}

export interface MergeItem {
  row: number;
  col: number;
  rowspan: number;
  colspan: number;
  [key: string]: any;
}

/**
 * 按键配置项
 */
export interface TableKeyboardConfig {
  /**
   * 是否开启非编辑状态下，上下左右移动功能
   */
  isArrow?: boolean;
  /**
   * 是否开启删除键功能
   */
  isDel?: boolean;
  /**
   * 是否开启回车移动上下行移动
   */
  isEnter?: boolean;
  /**
   * 是否开启TAB键左右移动功能
   */
  isTab?: boolean;
  /**
   * 是否开启单元格选择编辑
   */
  isEdit?: boolean;
  /**
   * 用于 mouse-config.area，开启复制/剪贴/粘贴功能
   */
  isClip?: boolean;
  /**
   * 用于 mouse-config.area & column.type=checkbox|radio，开启空格键切换复选框或单选框状态功能
   */
  isChecked?: boolean;
  /**
   * 用于 mouse-config.area，是否将回车键行为改成 Tab 键行为
   */
  enterToTab?: boolean;
  /**
   * 只对 isEdit=true 有效，用于重写选中编辑处理逻辑，可以返回 false 来阻止默认行为
   */
  editMethod?(params: { row: RowInfo, rowIndex: number, column: ColumnInfo, columnIndex: number, cell: HTMLElement }): boolean;
}
export interface KeyboardConfig extends TableKeyboardConfig {}

/**
 * 复制粘贴配置项
 */
export interface TableClipConfig {
  getMethod?(params: {
    row: any;
    column: ColumnInfo;
  }): string;
  beforeGetMethod?(params: {
    targetAreas: any[];
  }): boolean;
  setMethod?(params: {
    row: any,
    column: ColumnInfo;
    cellValue: any;
  }): void;
  beforeSetMethod?(params: {
    currentAreas: any[];
    targetAreas: any[];
    cellValues: any[][];
  }): boolean;
}

/**
 * 编辑配置项
 */
export interface TableEditConfig {
  trigger?: 'manual' | 'click' | 'dblclick';
  mode?: string;
  showIcon?: boolean;
  showStatus?: boolean;
  autoClear?: boolean;
  /**
   * 该方法的返回值用来决定该单元格是否允许编辑
   */
  activeMethod?(params: { row: RowInfo, rowIndex: number, column: ColumnInfo, columnIndex: number }): boolean;
}
export interface EditConfig extends TableEditConfig {}

/**
 * 校验配置项
 */
export interface TableValidConfig {
  autoPos?: boolean;
  message?: string;
  maxWidth?: number;
}
export interface ValidConfig extends TableValidConfig {}

/**
 * 校验规则配置项
 */
export interface EditVaildRules {
  [field: string]: ColumnEditRule[];
}
export interface VaildRules extends EditVaildRules {}
