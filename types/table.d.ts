import { VXETableModule, RowInfo, RecordInfo } from './component'
import { ColumnOptions, ColumnInfo } from './column'
import { ColumnCellRenderParams, EmptyRender } from './extends/renderer'
import { ExportOptons, ImportOptons, PrintOptons, ReadFileOptions } from './extends/export'
import { ColumnFilterOption } from './extends/filter'
import { ColumnEditRule, ColumnEditValidErrMapParams } from './extends/validator'
import { ColumnFooterRenderParams } from './extends/footer'
import { MenuOptions, MenuFirstOption } from './extends/menu'

/**
 * 表格
 */
export declare class Table extends VXETableModule {
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
  border?: boolean | 'default' | 'full' | 'outer' | 'inner' | 'none';
  fit?: boolean;
  /**
   * 表格是否加载中
   */
  loading?: boolean;
  /**
   * 所有的列对其方式
   */
  align?: 'left' | 'center' | 'right';
  /**
   * 所有的表头列的对齐方式
   */
  headerAlign?: 'left' | 'center' | 'right';
  /**
   * 所有的表尾列的对齐方式
   */
  footerAlign?: 'left' | 'center' | 'right';
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
  footerMethod?(params: { columns: ColumnInfo[], data: any[] }): Array<string | number>[];
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
  mergeCells: MergeOptions[];
  /**
   * 临时合并表尾
   */
  mergeFooterItems: MergeOptions[];
  /**
   * 自定义单元格合并方法
   */
  spanMethod?(params: ColumnCellRenderParams): { rowspan: number, colspan: number };
  /**
   * 自定义表尾合并方法
   */
  footerSpanMethod?(params: ColumnFooterRenderParams): { rowspan: number, colspan: number };
  /**
   * 设置所有内容过长时显示为省略号
   */
  showOverflow?: boolean | 'ellipsis' | 'title' | 'tooltip';
  /**
   * 设置表头所有内容过长时显示为省略号
   */
  showHeaderOverflow?: boolean | 'ellipsis' | 'title' | 'tooltip';
  /**
   * 设置表尾所有内容过长时显示为省略号
   */
  showFooterOverflow?: boolean | 'ellipsis' | 'title' | 'tooltip';

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
  // 列的默认参数
  columnConfig?: ColumnDefaultConfig;
  // 序号配置项
  seqConfig?: SeqConfig;
  // 排序配置项
  sortConfig?: SortConfig;
  // 筛选配置项
  filterConfig?: FilterConfig;
  // 单选框配置
  radioConfig?: RadioConfig;
  // 复选框配置项
  checkboxConfig?: CheckboxConfig;
  checkboxOpts: CheckboxConfig;
  // 提示信息配置项
  tooltipConfig?: TooltipConfig;
  tooltipOpts: TooltipConfig;
  // 导出配置项
  exportConfig?: boolean | ExportOptons;
  exportOpts: ExportOptons;
  // 导入配置项
  importConfig?: boolean | ImportOptons;
  importOpts: ImportOptons;
  // 打印配置项
  printConfig?: PrintOptons;
  printOpts: PrintOptons;
  // 展开行配置项
  expandConfig?: ExpandConfig;
  expandOpts: ExpandConfig;
  // 树形结构配置项
  treeConfig?: boolean | TreeConfig;
  treeOpts: TreeOpts;
  // 快捷菜单配置项
  contextMenu?: boolean | ContextMenuConfig;
  // 鼠标配置项
  mouseConfig?: MouseConfig;
  mouseOpts: MouseConfig;
  // 按键配置项
  keyboardConfig?: KeyboardConfig;
  keyboardOpts: KeyboardConfig;
  // 编辑配置项
  editConfig?: boolean | EditConfig;
  editOpts: EditConfig;
  // 校验配置项
  validConfig?: ValidConfig;
  // 校验规则配置项
  editRules?: EditVaildRules;
  emptyText?: string;
  // 空内容渲染配置项
  emptyRender?: boolean | EmptyRender;
  animat?: boolean;
  cloak?: boolean;
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

  // computed
  vSize: string;

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
  _getRowIndex(row: RowInfo): number;
  /**
   * 根据 row 获取渲染中的虚拟索引
   * @param row 行对象
   */
  $getRowIndex(row: RowInfo): number;
  /**
   * 根据 column 获取相对于 columns 中的索引
   * @param column 列对象
   */
  getColumnIndex(column: ColumnInfo): number;
  /**
   * 根据 column 获取相对于当前表格列中的索引
   * @param column 列对象
   */
  _getColumnIndex(column: ColumnInfo): number;
  /**
   * 根据 column 获取渲染中的虚拟索引
   * @param column 列对象
   */
  $getColumnIndex(column: ColumnInfo): number;
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
  isUpdateByRow(row: RowInfo): boolean;
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
  getCheckboxRecords(): RowInfo[];
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
   * 手动关闭 tooltip 提示
   */
  clostTooltip(): Promise<any>;
  /**
   * 用于 type=checkbox，设置行为选中状态，第二个参数为选中与否
   * @param rows 指定行
   * @param checked 是否选中
   */
  setCheckboxRow(rows: RowInfo | RowInfo[], checked: boolean): Promise<any>;
  /**
   * 用于 type=checkbox，判断复选行是否被全部选中
   */
  isAllCheckboxChecked(): boolean;
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
  getRadioReserveRecord(): RowInfo[];
  /**
   * 用于 radio-config.reserve，手动清空用户保留选中的行数据
   */
  clearRadioReserve(): Promise<any>;
  /**
   * 用于 checkbox-config.reserve，获取已保留选中的行数据
   */
  getCheckboxReserveRecords(): RowInfo[];
  /**
   * 用于 type=checkbox，获取半选状态的行数据
   */
  getCheckboxIndeterminateRecords(): RowInfo[]
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
  getRadioRecord(): RowInfo;
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
  clearRowExpandLoaded(): Promise<any>;
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
  clearTreeExpandLoaded(): Promise<any>;
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
  insertAt(records: RecordInfo | RecordInfo[], row: RowInfo | number | null): Promise<{ row: RowInfo, rows: RowInfo[] }>;
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
  removeMergeCells(merges: MergeOptions | MergeOptions[]): Promise<MergeItem[]>;
  /**
   * 取消表尾的临时合并状态，如果为数组，则取消多个合并
   */
  removeMergeFooterItems(merges: MergeOptions | MergeOptions[]): Promise<MergeItem[]>;
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
   * 用于 edit-config，激活行编辑，如果是 mode=cell 则默认激活第一个单元格
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
   * @param areas 指定区域
   */
  setCellAreas(areas: CellAreaOptions): Promise<any>;
  /**
   * 临时合并单元格，如果为数组则合并多个
   */
  setMergeCells(merges: MergeOptions | MergeOptions[]): Promise<any>;
  /**
   * 临时合并表尾，如果为数组则合并多个
   */
  setMergeFooterItems(merges: MergeOptions | MergeOptions[]): Promise<any>;
  /**
   * 用于 mouse-config.area，设置活动的区域的单元格
   * @param activeArea
   */
  setActiveCellArea(activeArea: ActiveCellAreaOptions): Promise<any>;
  /**
   * 手动清除校验
   */
  clearValidate(): Promise<any>;
  /**
   * 完整校验，和 validate 的区别就是会给有效数据中的每一行进行校验
   * @param rows 指定行
   * @param callback 回调函数
   */
  fullValidate(rows?: boolean | RowInfo | RowInfo[], callback?: (errMap: ColumnEditValidErrMapParams) => void): Promise<ColumnEditValidErrMapParams>;
  /**
   * 快速校验，如果存在记录不通过的记录，则返回不再继续校验（异步校验除外）；如果第一个参数为 true 则校验当前表格数据，如果指定 row 或 rows 则校验指定一行或多行，如果不指定数据，则默认只校验临时变动的数据，例如新增或修改。该回调函数会在校验结束后被调用 callback(errMap)。若不传入回调函数，则会返回一个 promise
   * @param rows 指定行
   * @param callback 回调函数
   */
  validate(rows?: boolean | RowInfo | RowInfo[], callback?: (errMap?: ColumnEditValidErrMapParams) => void): Promise<ColumnEditValidErrMapParams>;
  /**
   * 打开高级导出
   * @param options 参数
   */
  openExport(options: ExportOptons): Promise<any>;
  /**
   * 将表格数据导出
   * @param options 参数
   */
  exportData(options: ExportOptons): Promise<any>;
  /**
   * 打开高级导入
   * @param options 参数
   */
  openImport(options: ImportOptons): Promise<any>;
  /**
   * 将数据导入表格
   * @param options 参数
   */
  importData(options: ImportOptons): Promise<any>;
  /**
   * 读取本地文件
   * @param options 参数
   */
  readFile(options: ReadFileOptions): Promise<any>;
  /**
   * 打印配置项
   * @param options 参数
   */
  print(options: PrintOptons): Promise<any>;
  /**
   * 用于 mouse-config.area，打开单元格查找功能
   */
  openFind(): Promise<any>;
  /**
   * 用于 mouse-config.area，打开单元格替换功能
   */
  openReplace(): Promise<any>;
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

/**
 * 列的默认配置
 */
export interface ColumnDefaultConfig {
  width?: number;
  minWidth?: number;
}

/**
 * 序号配置项
 */
export interface SeqConfig {
  startIndex?: number;
  seqMethod?(params: ColumnCellRenderParams): number;
}

/**
 * 排序配置项
 */
export interface SortConfig {
  defaultSort?: {
    field: string;
    order: 'asc' | 'desc' | null;
  };
  orders?: ('asc' | 'desc' | null)[];
  sortMethod?(params: { data: any[], column: ColumnInfo, property: string, order: string }): any[];
  remote?: boolean;
  trigger?: 'default' | 'cell';
  showIcon: boolean;
  iconAsc?: string;
  iconDesc?: string;
}

/**
 * 筛选配置项
 */
export interface FilterConfig {
  remote?: boolean;
  showIcon?: string;
  iconNone?: string;
  iconMatch?: string;
}

/**
 * 单选框配置
 */
export interface RadioConfig {
  reserve?: boolean;
  labelField?: string;
  checkRowKey?: string | number;
  checkMethod?(params: { row: RowInfo }): boolean;
  trigger?: 'default' | 'cell' | 'row';
  highlight?: boolean;
}

/**
 * 复选框配置项
 */
export interface CheckboxConfig {
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

/**
 * 提示信息配置项
 */
export interface TooltipConfig {
  enabled?: boolean;
  theme?: 'dark' | 'light';
  enterable?: boolean;
  leaveDelay?: number;
  contentMethod?(params: { items: any[], row: RowInfo, rowIndex: number, $rowIndex: number, column: ColumnInfo, columnIndex: number, $columnIndex: number, type: 'header' | 'body' | 'footer', cell: HTMLElement, $event: any }): string | null | void;
}

/**
 * 展开行配置项
 */
export interface ExpandConfig {
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

/**
 * 树形结构配置项
 */
export interface TreeConfig {
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
export interface ContextMenuConfig {
  header?: MenuOptions;
  body?: MenuOptions;
  footer?: MenuOptions;
  trigger?: 'default' | 'cell';
  visibleMethod?(params: { type: string, options: MenuFirstOption[], columns: ColumnInfo[], row?: RowInfo, rowIndex?: number, column?: ColumnInfo, columnIndex?: number }): boolean;
  className?: string;
}

/**
 * 鼠标配置项
 */
export interface MouseConfig {
  selected?: boolean;
  /**
   * 如果功能被支持，则开启单元格区域选取功能，非连续的区域，按住 Ctrl 键，用鼠标逐一选取
   */
  area?: boolean;
}

export interface MouseCellArea {
  main: boolean;
  rows: RowInfo[];
  cols: ColumnInfo[];
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface CellAreaOptions {
  main: boolean;
  startColumn: ColumnInfo;
  endColumn: ColumnInfo;
  startRow: RowInfo;
  endRow: RowInfo;
  [key: string]: any;
}

export interface MergeOptions {
  row: RowInfo | number;
  col: ColumnInfo | number;
  rowspan: number;
  colspan: number;
}

export interface MergeItem {
  row: number;
  col: number;
  rowspan: number;
  colspan: number;
  [key: string]: any;
}

export interface ActiveCellAreaOptions {
  column: ColumnInfo;
  row: RowInfo;
  [key: string]: any;
}

/**
 * 按键配置项
 */
export interface KeyboardConfig {
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

/**
 * 编辑配置项
 */
export interface EditConfig {
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

/**
 * 校验配置项
 */
export interface ValidConfig {
  autoPos?: boolean;
  message?: string;
  maxWidth?: number;
}

/**
 * 校验规则配置项
 */
export interface EditVaildRules {
  [field: string]: ColumnEditRule[];
}
