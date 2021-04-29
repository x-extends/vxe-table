import { RenderFunction, SetupContext, Ref, ComputedRef, ComponentPublicInstance, ComponentInternalInstance, VNode } from 'vue'
import { VXEComponent, VxeComponentBase, VxeEvent, RecordInfo, SizeType, ValueOf, VNodeStyle } from './component'
import { VxeTableProEmits, VxeTableProDefines } from './plugins/pro'
import { VxeColumnPropTypes, VxeColumnProps } from './column'
import { VxeGlobalRendererHandles } from './v-x-e-table'
import { VxeToolbarConstructor, VxeToolbarInstance } from './toolbar'
import { VxeTooltipInstance } from './tooltip'
import { VxeGridConstructor } from './grid'
import { VxeMenuPanelInstance } from './menu'

/**
 * 组件 - 表格
 * @example import { Table as VxeTable } from 'vxe-table'
 */
export const Table: VXEComponent<VxeTableProps, VxeTableEventProps>;

export type VxeTableInstance = ComponentPublicInstance<VxeTableProps, VxeTableConstructor>;

export interface VxeTableConstructor extends VxeComponentBase, VxeTableMethods {
  props: VxeTableProps;
  context: SetupContext<VxeTableEmits>;
  instance: ComponentInternalInstance;
  reactData: TableReactData;
  internalData: TableInternalData;
  getRefMaps(): TablePrivateRef;
  getComputeMaps(): TablePrivateComputed;
  renderVN: RenderFunction;

  xegrid?: VxeGridConstructor | null;
}

export interface TablePrivateRef {
  refElem: Ref<HTMLDivElement>;
  refTooltip: Ref<VxeTooltipInstance>;
  refValidTooltip: Ref<VxeTooltipInstance>;
  refTableFilter: Ref<ComponentPublicInstance>;
  refTableMenu: Ref<VxeMenuPanelInstance>;
  refTableHeader: Ref<ComponentPublicInstance>;
  refTableBody: Ref<ComponentPublicInstance>;
  refTableFooter: Ref<ComponentPublicInstance>;
  refTableLeftHeader: Ref<ComponentPublicInstance>;
  refTableLeftBody: Ref<ComponentPublicInstance>;
  refTableLeftFooter: Ref<ComponentPublicInstance>;
  refTableRightHeader: Ref<ComponentPublicInstance>;
  refTableRightBody: Ref<ComponentPublicInstance>;
  refTableRightFooter: Ref<ComponentPublicInstance>;
  refLeftContainer: Ref<HTMLDivElement>;
  refRightContainer: Ref<HTMLDivElement>;
  refCellResizeBar: Ref<HTMLDivElement>;
}
export interface VxeTablePrivateRef extends TablePrivateRef { }

export interface TablePrivateComputed {
  computeSize: ComputedRef<VxeTablePropTypes.Size>;
  computeValidOpts: ComputedRef<VxeTablePropTypes.ValidOpts>;
  computeSXOpts: ComputedRef<VxeTablePropTypes.SXOpts>;
  computeSYOpts: ComputedRef<VxeTablePropTypes.SYOpts>;
  computeResizableOpts: ComputedRef<VxeTablePropTypes.ResizableOpts>;
  computeSeqOpts: ComputedRef<VxeTablePropTypes.SeqOpts>;
  computeRadioOpts: ComputedRef<VxeTablePropTypes.RadioOpts>;
  computeCheckboxOpts: ComputedRef<VxeTablePropTypes.CheckboxOpts>;
  computeTooltipOpts: ComputedRef<VxeTablePropTypes.TooltipOpts>;
  computeEditOpts: ComputedRef<VxeTablePropTypes.EditOpts>;
  computeSortOpts: ComputedRef<VxeTablePropTypes.SortConfig>;
  computeFilterOpts: ComputedRef<VxeTablePropTypes.FilterOpts>;
  computeMouseOpts: ComputedRef<VxeTablePropTypes.MouseOpts>;
  computeAreaOpts: ComputedRef<VxeTablePropTypes.AreaOpts>;
  computeKeyboardOpts: ComputedRef<VxeTablePropTypes.KeyboardOpts>;
  computeClipOpts: ComputedRef<VxeTablePropTypes.ClipOpts>;
  computeFNROpts: ComputedRef<VxeTablePropTypes.FNROpts>;
  computeHeaderMenu: ComputedRef<VxeTableDefines.MenuFirstOption>;
  computeBodyMenu: ComputedRef<VxeTableDefines.MenuFirstOption>;
  computeFooterMenu: ComputedRef<VxeTableDefines.MenuFirstOption>;
  computeIsMenu: ComputedRef<boolean>;
  computeMenuOpts: ComputedRef<VxeTablePropTypes.MenuConfig>;
  computeExportOpts: ComputedRef<VxeTablePropTypes.ExportOpts>;
  computeImportOpts: ComputedRef<VxeTablePropTypes.ImportOpts>;
  computePrintOpts: ComputedRef<VxeTablePropTypes.PrintOpts>;
  computeExpandOpts: ComputedRef<VxeTablePropTypes.ExpandOpts>;
  computeTreeOpts: ComputedRef<VxeTablePropTypes.TreeOpts>;
  computeEmptyOpts: ComputedRef<VxeTablePropTypes.EmptyOpts>;
  computeCustomOpts: ComputedRef<VxeTablePropTypes.CustomOpts>;
  computeIsAllCheckboxDisabled: ComputedRef<boolean>;
}

export interface VxeTablePrivateComputed extends TablePrivateComputed { }

export interface TableMethods extends TablePublicMethods {
  dispatchEvent(type: ValueOf<VxeTableEmits>, params: any, evnt: Event | null): void;
}

export interface TablePublicMethods {
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
  reloadRow(rows: any | any[], record?: any, field?: string): Promise<any>;
  /**
   * 用于树结构，给行数据加载子节点
   * @param row 行对象
   * @param children 子节点
   */
  loadChildren(row: any, children: any[]): Promise<any[]>;
  /**
   * 加载列配置
   * @param columns 列对象
   */
  loadColumn(columns: VxeTableDefines.ColumnOptions[]): Promise<any>;
  /**
   * 加载列配置并恢复到初始状态
   * @param columns 列对象
   */
  reloadColumn(columns: VxeTableDefines.ColumnOptions[]): Promise<any>;
  /**
   * 根据 tr 元素获取对应的 row 信息
   * @param tr 行节点元素
   */
  getRowNode(trElem: HTMLElement): {
    rowid: string;
    item: any;
    items: any[];
    index: number;
    parent?: any;
  } | null;
  /**
   * 根据 th/td 元素获取对应的 column 信息
   * @param cell 单元格节点元素
   */
  getColumnNode(cellElem: HTMLElement): {
    colid: string;
    item: VxeTableDefines.ColumnInfo;
    items: VxeTableDefines.ColumnInfo[];
    index: number;
    parent?: VxeTableDefines.ColumnInfo;
  } | null;
  /**
   * 根据 row 获取相对于 data 中的索引
   * @param row 行对象
   */
  getRowIndex(row: any): number;
  /**
   * 根据 row 获取相对于当前数据中的索引
   * @param row 行对象
   */
  getVTRowIndex(row: any): number;
  /**
   * 根据 row 获取渲染中的虚拟索引
   * @param row 行对象
   */
  getVMRowIndex(row: any): number;
  /**
   * 根据 column 获取相对于 columns 中的索引
   * @param column 列对象
   */
  getColumnIndex(column: VxeTableDefines.ColumnInfo): number;
  /**
   * 根据 column 获取相对于当前表格列中的索引
   * @param column 列对象
   */
  getVTColumnIndex(column: VxeTableDefines.ColumnInfo): number;
  /**
   * 根据 column 获取渲染中的虚拟索引
   * @param column 列对象
   */
  getVMColumnIndex(column: VxeTableDefines.ColumnInfo): number;
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
  revertData(rows?: any | any[], field?: string): Promise<any>;
  /**
   * 手动清空单元格内容，如果不传参数，则清空整个表格内容，如果传了行则清空指定行内容，如果传了指定字段，则清空该字段内容
   * @param rows 指定行
   * @param field 字段名
   */
  clearData(rows?: any | any[], field?: string): Promise<any>;
  /**
   * 用于 edit-config，判断行是否为新增的临时数据
   * @param row 指定行
   */
  isInsertByRow(row: any): boolean;
  /**
   * 只对 keep-source 开启有效，判断行数据是否发生改变
   * @param row 指定行
   * @param field 指定字段
   */
  isUpdateByRow(row: any, field?: string): boolean;
  /**
   * 获取表格的可视列，也可以指定索引获取列
   * @param columnIndex 列索引
   */
  getColumns(): VxeTableDefines.ColumnInfo[];
  getColumns(columnIndex?: number): VxeTableDefines.ColumnInfo;
  /**
   * 根据列的唯一主键获取列
   * @param colid 列主键
   */
  getColumnById(colid: string): VxeTableDefines.ColumnInfo | null;
  /**
   * 根据列的字段名获取列
   * @param field 字段名
   */
  getColumnByField(field: string): VxeTableDefines.ColumnInfo | null;
  /**
   * 获取当前表格的列
   * 收集到的全量列、全量表头列、处理条件之后的全量表头列、当前渲染中的表头列
   */
  getTableColumn(): {
    collectColumn: VxeTableDefines.ColumnInfo[];
    fullColumn: VxeTableDefines.ColumnInfo[];
    visibleColumn: VxeTableDefines.ColumnInfo[];
    tableColumn: VxeTableDefines.ColumnInfo[];
  };
  /**
   * 获取数据，和 data 的行为一致，也可以指定索引获取数据
   */
  getData(): any[];
  getData(rowIndex: number): any;
  /**
   * 用于 type=checkbox，获取已选中的行数据
   */
  getCheckboxRecords(): any[];
  /**
   * 根据行的唯一主键获取行
   * @param rowid 行主键
   */
  getRowById(rowid: string | number): any | null;
  /**
   * 根据行获取行的唯一主键
   * @param row 行对象
   */
  getRowid(row: any): string;
  /**
   * 获取当前表格的数据
   * 完整的全量表体数据、处理条件之后的全量表体数据、当前渲染中的表体数据、当前渲染中的表尾数据
   */
  getTableData(): {
    fullData: any[];
    visibleData: any[];
    tableData: any[];
    footerData: any[][];
  };
  /**
   * 隐藏指定列
   * @param columnOrField 列对象或字段名
   */
  hideColumn(fieldOrColumn: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo): Promise<any>;
  /**
   * 显示指定列
   * @param columnOrField 列对象或字段名
   */
  showColumn(fieldOrColumn: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo): Promise<any>;
  /**
   * 手动重置列的显示隐藏、列宽拖动的状态；如果为 true 则重置所有状态
   * 如果已关联工具栏，则会同步更新
   * @param options 可选参数
   */
  resetColumn(options?: boolean | { visible?: boolean, resizable?: boolean }): Promise<any>;
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
  openTooltip(target: HTMLElement, content: string | number): Promise<any>;
  /**
   * 关闭 tooltip 提示
   */
  closeTooltip(): Promise<any>;
  /**
   * 用于 type=checkbox，设置行为选中状态，第二个参数为选中与否
   * @param rows 指定行
   * @param checked 是否选中
   */
  setCheckboxRow(rows: any | any[], checked: boolean): Promise<any>;
  /**
   * 用于 type=checkbox，判断复选行是否被全部选中
   */
  isAllCheckboxChecked(): boolean;
  /**
   * 用于 type=checkbox，判断复选框是否半选
   */
  isCheckboxIndeterminate(): boolean;
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
   * 用于 type=checkbox，获取半选状态的行数据
   */
  getCheckboxIndeterminateRecords(): any[]
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
  getMergeCells(): VxeTableDefines.MergeInfo[];
  /**
   * 获取临时合并的表尾
   */
  getMergeFooterItems(): VxeTableDefines.MergeInfo[];
  /**
   * 用于 highlight-current-column，获取当前列
   */
  getCurrentColumn(): VxeTableDefines.ColumnInfo | null;
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
   * @param columnOrField 列对象或字段名
   */
  setCurrentColumn(fieldOrColumn: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo): Promise<any>;
  /**
   * 用于 highlight-current-column，手动清空当前高亮的状态
   */
  clearCurrentColumn(): Promise<any>;
  /**
   * 手动对表格进行排序
   * @param sortConfs 字段名、多列排序
   * @param order 排序方式
   */
  sort(field: string, order?: VxeTablePropTypes.SortOrder): Promise<any>;
  sort(sortConfs: VxeTableDefines.SortConfs, order?: VxeTablePropTypes.SortOrder): Promise<any>;
  sort(sortConfs: VxeTableDefines.SortConfs[], order?: VxeTablePropTypes.SortOrder): Promise<any>;
  /**
   * 手动清空排序条件，数据会恢复成未排序的状态
   * @param columnOrField 列对象或字段名
   */
  clearSort(fieldOrColumn?: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo | null): Promise<any>;
  /**
   * 判断指定列是否为排序状态，如果为空则判断所有列
   * @param columnOrField 列对象或字段名
   */
  isSort(fieldOrColumn: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo): boolean;
  /**
   * 获取当前排序的列信息
   */
  getSortColumns(): VxeTableDefines.SortCheckedParams[];
  /**
   * 手动关闭筛选面板
   */
  closeFilter(): Promise<any>;
  /**
   * 判断指定列是否为筛选状态，如果为空则判断所有列
   * @param columnOrField 列对象或字段名
   */
  isFilter(fieldOrColumn: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo): boolean;
  /**
   * 用于 expand-config.lazy，用于懒加载展开行，判断展开行是否懒加载完成
   * @param row 指定行
   */
  isRowExpandLoaded(row: any): boolean;
  /**
   * 用于 expand-config.lazy，手动清空懒加载展开行的状态，数据会恢复成未展开的状态，当再次展开时会重新加载
   */
  clearRowExpandLoaded(row: any): Promise<any>;
  /**
   * 用于懒加载展开行，重新加载展开行的内容
   * @param rows 指定行
   */
  reloadExpandContent(rows: any | any[]): Promise<any>;
  /**
   * 用于 type=expand，切换展开行的状态
   * @param row 指定行
   */
  toggleRowExpand(row: any): Promise<any>;
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
  setRowExpand(rows: any | any[], checked: boolean): Promise<any>;
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
   * 用于 type=expand，手动清空用户保留行的展开状态
   */
  clearRowExpandReserve(): Promise<any>;
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
  isTreeExpandLoaded(row: any): boolean;
  /**
   * 用于 tree-config.lazy，手动清空懒加载树节点的状态，数据会恢复成未展开的状态，当再次展开时会重新加载
   */
  clearTreeExpandLoaded(row: any): Promise<any>;
  /**
   * 用于懒加载树表格，重新加载子节点
   * @param rows 指定行
   */
  reloadTreeChilds(rows: any | any[]): Promise<any>;
  /**
   * 用于 tree-config，切换展开树形节点的状态
   * @param row 指定行
   */
  toggleTreeExpand(row: any): Promise<any>;
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
  setTreeExpand(rows: any | any[], checked: boolean): Promise<any>;
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
   * 用于 tree-config.reserve，手动清空用户保留树节点的展开状态
   */
  clearTreeExpandReserve(): Promise<any>;
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
  scrollTo(scrollLeft: number | null, scrollTop?: number | null): Promise<any>;
  /**
   * 如果有滚动条，则滚动到对应的行
   * @param row 指定行
   * @param columnOrField 列对象或字段名
   */
  scrollToRow(row: any, fieldOrColumn?: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo): Promise<any>;
  /**
   * 如果有滚动条，则滚动到对应的列
   * @param columnOrField 列对象或字段名
   */
  scrollToColumn(fieldOrColumn: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo): Promise<any>;
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
      row: any;
      column: VxeTableDefines.ColumnInfo;
    },
    cellValue?: any
  ): Promise<any>;
  /**
   * 取消单元格的临时合并状态，如果为数组，则取消多个合并
   */
  removeMergeCells(merges: VxeTableDefines.MergeOptions | VxeTableDefines.MergeOptions[]): Promise<VxeTableDefines.MergeInfo[]>;
  /**
   * 取消表尾的临时合并状态，如果为数组，则取消多个合并
   */
  removeMergeFooterItems(merges: VxeTableDefines.MergeOptions | VxeTableDefines.MergeOptions[]): Promise<VxeTableDefines.MergeInfo[]>;
  /**
   * 临时合并单元格，如果为数组则合并多个
   */
  setMergeCells(merges: VxeTableDefines.MergeOptions | VxeTableDefines.MergeOptions[]): Promise<any>;
  /**
   * 临时合并表尾，如果为数组则合并多个
   */
  setMergeFooterItems(merges: VxeTableDefines.MergeOptions | VxeTableDefines.MergeOptions[]): Promise<any>;
  /**
   * 连接工具栏
   * @param toolbar 工具栏组件实例
   */
  connect(toolbar: VxeToolbarConstructor | VxeToolbarInstance): Promise<any>;
  /**
   * 使表格获取焦点
   */
  focus(): Promise<any>;
  /**
   * 使表格失去焦点
   */
  blur(): Promise<any>;
}

export interface VxeTableMethods extends TableMethods { }

export interface TablePrivateMethods {
  updateAfterDataIndex(): void;
  callSlot(slotFunc: Function | string | null, params: any): VNode[];
  getParentElem(): Element;
  getParentHeight(): number;
  getExcludeHeight(): number;
  defineField(record: any): any;
  handleTableData(force?: boolean): Promise<any>;
  updateCache(isSource?: boolean): void;
  saveCustomResizable(isReset?: boolean): void;
  saveCustomVisible(): void;
  analyColumnWidth(): void;
  checkSelectionStatus(): void;
  handleSelectRow(params: any, value: any): void;
  handleCustom(): Promise<any>;
  preventEvent(evnt: any, type: any, args?: any, next?: any, end?: any): any;
  triggerHeaderHelpEvent(evnt: MouseEvent, params: VxeTableDefines.CellRenderHeaderParams): void;
  triggerHeaderTooltipEvent(evnt: MouseEvent, params: VxeTableDefines.CellRenderHeaderParams): void;
  triggerBodyTooltipEvent(evnt: MouseEvent, params: VxeTableDefines.CellRenderBodyParams): void;
  triggerFooterTooltipEvent(evnt: MouseEvent, params: VxeTableDefines.CellRenderFooterParams): void;
  handleTargetLeaveEvent(evnt: MouseEvent): void;
  triggerHeaderCellClickEvent(evnt: MouseEvent, params: VxeTableDefines.CellRenderHeaderParams): void;
  triggerHeaderCellDblclickEvent(evnt: MouseEvent, params: VxeTableDefines.CellRenderHeaderParams): void;
  triggerCellClickEvent(evnt: MouseEvent, params: VxeTableDefines.CellRenderBodyParams): void;
  triggerCellDblclickEvent(evnt: MouseEvent, params: VxeTableDefines.CellRenderBodyParams): void;
  handleToggleCheckRowEvent(evnt: Event | null, params: { row: any }): void;
  triggerCheckRowEvent(evnt: Event, params: { row: any }, value: boolean): void;
  triggerCheckAllEvent(evnt: MouseEvent | null, value: boolean): void;
  triggerRadioRowEvent(evnt: Event, params: { row: any }): void;
  triggerCurrentRowEvent(evnt: Event, params: VxeTableDefines.CurrentChangeParams): void;
  triggerRowExpandEvent(evnt: Event, params: VxeTableDefines.CellRenderBodyParams): void;
  triggerTreeExpandEvent(evnt: Event, params: VxeTableDefines.CellRenderBodyParams): void;
  triggerSortEvent(evnt: Event, column: VxeTableDefines.ColumnInfo, order: VxeTablePropTypes.SortOrder): void;
  triggerScrollXEvent(evnt: Event): void;
  triggerScrollYEvent(evnt: Event): void;
  scrollToTreeRow(row: any): Promise<any>;
  updateScrollXSpace(): void;
  updateScrollYSpace(): void;
  updateScrollXData(): void;
  updateScrollYData(): void;
  checkScrolling(): void;
  updateZindex(): void;
  updateCellAreas(): void;
  triggerHoverEvent(evnt: any, params: any): void;
  setHoverRow(row: any): void;
  clearHoverRow(): void;
  getCell(row: any, column: VxeTableDefines.ColumnInfo): HTMLTableDataCellElement | null;
  getCellLabel(row: any, column: VxeTableDefines.ColumnInfo): any;
  findRowIndexOf(list: any[], row: any): number;
  eqRow(row1: any, row2: any): boolean;
}

export interface VxeTablePrivateMethods extends TablePrivateMethods { }

export interface TableReactData {
  // 低性能的静态列
  staticColumns: any[];
  // 渲染的列分组
  tableGroupColumn: any[];
  // 可视区渲染的列
  tableColumn: any[];
  // 渲染中的数据
  tableData: any[];
  // 是否启用了横向 X 可视渲染方式加载
  scrollXLoad: boolean;
  // 是否启用了纵向 Y 可视渲染方式加载
  scrollYLoad: boolean;
  // 是否存在纵向滚动条
  overflowY: boolean;
  // 是否存在横向滚动条
  overflowX: boolean;
  // 纵向滚动条的宽度
  scrollbarWidth: number;
  // 横向滚动条的高度
  scrollbarHeight: number;
  // 行高
  rowHeight: number;
  // 表格父容器的高度
  parentHeight: number;
  // 是否使用分组表头
  isGroup: boolean;
  isAllOverflow: boolean;
  // 复选框属性，是否全选
  isAllSelected: boolean;
  // 复选框属性，有选中且非全选状态
  isIndeterminate: boolean;
  // 复选框属性，已选中的行
  selection: any[];
  // 当前行
  currentRow: any;
  // 单选框属性，选中列
  currentColumn: any;
  // 单选框属性，选中行
  selectRow: any;
  // 表尾合计数据
  footerTableData: any[];
  // 展开列信息
  expandColumn: any;
  hasFixedColumn: boolean;
  // 树节点列信息
  treeNodeColumn: any;
  // 已展开的行
  rowExpandeds: any[];
  // 懒加载中的展开行的列表
  expandLazyLoadeds: any[];
  // 已展开树节点
  treeExpandeds: any[];
  // 懒加载中的树节点的列表
  treeLazyLoadeds: any[];
  // 树节点不确定状态的列表
  treeIndeterminates: any[];
  // 合并单元格的对象集
  mergeList: VxeTableDefines.MergeItem[];
  // 合并表尾数据的对象集
  mergeFooterList: VxeTableDefines.MergeItem[];
  // 初始化标识
  initStore: {
    filter: boolean;
    import: boolean;
    export: boolean;
  },
  // 当前选中的筛选列
  filterStore: {
    isAllSelected: boolean;
    isIndeterminate: boolean;
    style: any;
    options: any[];
    column: any;
    multiple: boolean;
    visible: boolean;
    maxHeight: number | null;
    [key: string]: any;
  },
  // 存放列相关的信息
  columnStore: {
    leftList: VxeTableDefines.ColumnInfo[];
    centerList: VxeTableDefines.ColumnInfo[];
    rightList: VxeTableDefines.ColumnInfo[];
    resizeList: VxeTableDefines.ColumnInfo[];
    pxList: VxeTableDefines.ColumnInfo[];
    pxMinList: VxeTableDefines.ColumnInfo[];
    scaleList: VxeTableDefines.ColumnInfo[];
    scaleMinList: VxeTableDefines.ColumnInfo[];
    autoList: VxeTableDefines.ColumnInfo[];
  },
  // 存放快捷菜单的信息
  ctxMenuStore: {
    selected: any;
    visible: boolean;
    showChild: boolean;
    selectChild: any;
    list: any[][];
    style: any;
    [key: string]: any;
  },
  // 存放可编辑相关信息
  editStore: {
    indexs: {
      columns: any[];
    },
    titles: {
      columns: any[];
    },
    // 选中源
    selected: {
      row: any;
      column: any;
      [key: string]: any;
    },
    // 已复制源
    copyed: {
      cut: boolean;
      rows: any[];
      columns: any[];
      [key: string]: any;
    },
    // 激活
    actived: {
      row: any;
      column: any;
      [key: string]: any;
    },
    insertList: any[];
    removeList: any[];
  },
  // 存放数据校验相关信息
  validStore: {
    visible: boolean;
    row: any;
    column: any;
    content: any;
    rule: any;
    isArrow: boolean;
  },
  // 导入相关信息
  importStore: {
    inited: boolean;
    file: any;
    type: any;
    modeList: any[];
    typeList: any[];
    filename: any;
    visible: boolean;
  },
  importParams: {
    mode: any;
    types: any;
    message: boolean;
  },
  // 导出相关信息
  exportStore: {
    inited: boolean;
    name: any;
    modeList: any[];
    typeList: any[];
    columns: any[];
    isPrint: boolean;
    hasFooter: boolean;
    hasMerge: boolean;
    hasColgroup: boolean;
    visible: boolean;
  },
  exportParams: {
    filename: any;
    sheetName: any;
    mode: any;
    type: any;
    isColgroup: boolean;
    isMerge: boolean;
    useStyle: boolean;
    original: boolean;
    message: boolean;
    isHeader: boolean;
    isFooter: boolean;
  }
}

export interface TableInternalData {
  tZindex: number;
  elemStore: any;
  // 存放横向 X 虚拟滚动相关的信息
  scrollXStore: {
    offsetSize: number;
    visibleSize: number;
    startIndex: number;
    endIndex: number;
  };
  // 存放纵向 Y 虚拟滚动相关信息
  scrollYStore: {
    adaptive?: boolean;
    rowHeight: number;
    offsetSize: number;
    visibleSize: number;
    startIndex: number;
    endIndex: number;
  };
  // 存放 tooltip 相关信息
  tooltipStore: any;
  // 表格宽度
  tableWidth: number;
  // 表格高度
  tableHeight: number;
  // 表头高度
  headerHeight: number;
  // 表尾高度
  footerHeight: number;
  customHeight: number;
  customMaxHeight: number;
  // 当前 hover 行
  hoverRow: any;
  // 最后滚动位置
  lastScrollLeft: number;
  lastScrollTop: number;
  lastScrollTime: number;
  // 单选框属性，已选中保留的行
  radioReserveRow: any;
  // 复选框属性，已选中保留的行
  checkboxReserveRowMap: any;
  // 行数据，已展开保留的行
  rowExpandedReserveRowMap: any;
  // 树结构数据，已展开保留的行
  treeExpandedReserveRowMap: any;
  // 完整数据、条件处理后
  tableFullData: any[];
  afterFullData: any[];
  tableSynchData: any[];
  tableSourceData: any[];
  // 收集的列配置（带分组）
  collectColumn: VxeTableDefines.ColumnInfo[],
  // 完整所有列（不带分组）
  tableFullColumn: VxeTableDefines.ColumnInfo[];
  // 渲染所有列
  visibleColumn: VxeTableDefines.ColumnInfo[];
  // 缓存数据集
  fullAllDataRowIdData: {
    [key: string]: {
      row: any;
      rowid: string;
      index: number;
      $index: number;
      _index: number;
      items: any[];
      parent: any;
      treeLoaded?: boolean;
      expandLoaded?: boolean;
      formatData?: {
        [key: string]: {
          value: any;
          label: any;
        }
      };
    }
  };
  fullDataRowIdData: {
    [key: string]: {
      row: any;
      rowid: string;
      index: number;
      $index: number;
      _index: number;
      items: any[];
      parent: any;
    }
  };
  fullColumnIdData: {
    [key: string]: {
      column: VxeTableDefines.ColumnInfo;
      colid: string;
      index: number;
      $index: number;
      _index: number;
      items: VxeTableDefines.ColumnInfo[];
      parent: VxeTableDefines.ColumnInfo;
    }
  };
  fullColumnFieldData: {
    [key: string]: {
      column: VxeTableDefines.ColumnInfo;
      colid: string;
      index: number;
      items: VxeTableDefines.ColumnInfo[];
      parent: VxeTableDefines.ColumnInfo;
    }
  };

  // 特殊标识
  inited: boolean;
  tooltipActive: boolean;
  tooltipTimeout: any;
  initStatus: boolean;
  isActivated: boolean;

  // 内部属性
  _lastResizeTime?: any;
  _isResize?: boolean;
  _keyCtx?: any;
  _lastCallTime?: any;
  _importResolve?: Function | null;
  _importReject?: Function | null;
  _currFilterParams?: any;
  _currMenuParams?: any;
}

export namespace VxeTablePropTypes {
  export type Size = SizeType;
  export type ID = string;
  export type Data<T = any> = T[];
  export type Height = number | string;
  export type MaxHeight = number | string;
  export type Resizable = boolean;
  export type Stripe = boolean;
  export type Round = boolean;
  export type Border = boolean | 'default' | 'full' | 'outer' | 'inner' | 'none';
  export type Loading = boolean;
  export type Align = 'left' | 'center' | 'right' | null;
  export type HeaderAlign = Align;
  export type FooterAlign = Align;
  export type ShowHeader = boolean;
  export type HighlightCurrentRow = boolean;
  export type HighlightHoverRow = boolean;
  export type HighlightCurrentColumn = boolean;
  export type HighlightHoverColumn = boolean;
  export type HighlightCell = boolean;
  export type ShowFooter = boolean;

  export type FooterMethod = (params: {
    $table: VxeTableConstructor & VxeTablePrivateMethods;
    $grid: VxeGridConstructor | null;
    columns: VxeTableDefines.ColumnInfo[];
    data: any[];
  }) => Array<string | number | null>[];

  export type RowClassName = string | ((params: {
    row: any;
    rowIndex: number;
    $rowIndex: number;
    _rowIndex: number;
  }) => void | null | string | { [key: string]: boolean });

  export type CellClassName = string | ((params: {
    row: any;
    rowIndex: number;
    $rowIndex: number;
    _rowIndex: number;
    column: VxeTableDefines.ColumnInfo;
    columnIndex: number;
    $columnIndex: number;
    _columnIndex: number;
  }) => void | null | string | { [key: string]: boolean });

  export type HeaderRowClassName = string | ((params: {
    $table: VxeTableConstructor & VxeTablePrivateMethods;
    $rowIndex: number;
    fixed: VxeColumnPropTypes.Fixed;
    type: string;
  }) => void | null | string | { [key: string]: boolean });

  export type HeaderCellClassName = string | ((params: {
    $table: VxeTableConstructor & VxeTablePrivateMethods;
    $rowIndex: number;
    column: VxeTableDefines.ColumnInfo;
    fixed: VxeColumnPropTypes.Fixed;
    type: string;
  }) => void | null | string | { [key: string]: boolean });

  export type FooterRowClassName = string | ((params: {
    $table: VxeTableConstructor & VxeTablePrivateMethods;
    $rowIndex: number;
    _rowIndex: number;
    fixed: VxeColumnPropTypes.Fixed;
    type: string;
  }) => void | null | string | { [key: string]: boolean });

  export type FooterCellClassName = string | ((params: {
    $table: VxeTableConstructor & VxeTablePrivateMethods;
    $rowIndex: number;
    _rowIndex: number;
    column: VxeTableDefines.ColumnInfo;
    columnIndex: number;
    $columnIndex: number;
    _columnIndex: number;
  }) => void | null | string | { [key: string]: boolean });

  export type CellStyle = VNodeStyle | ((params: {
    row: any;
    rowIndex: number;
    $rowIndex: number;
    _rowIndex: number;
    column: VxeTableDefines.ColumnInfo;
    columnIndex: number;
    $columnIndex: number;
    _columnIndex: number;
  }) => void | null | VNodeStyle);

  export type HeaderCellStyle = VNodeStyle | ((params: {
    $table: VxeTableConstructor & VxeTablePrivateMethods;
    $rowIndex: number;
    column: VxeTableDefines.ColumnInfo;
    columnIndex: number;
    _columnIndex: number;
  }) => void | null | VNodeStyle);

  export type FooterCellStyle = VNodeStyle | ((params: {
    $rowIndex: number;
    column: VxeTableDefines.ColumnInfo;
    columnIndex: number;
    $columnIndex: number;
    _columnIndex: number;
  }) => void | null | VNodeStyle);

  export type RowStyle = VNodeStyle | ((params: {
    row: any;
    rowIndex: number;
    $rowIndex: number;
    _rowIndex: number;
  }) => void | null | VNodeStyle);

  export type HeaderRowStyle = VNodeStyle | ((params: {
    $table: & VxeTablePrivateMethods;
    $rowIndex: number;
    fixed: VxeColumnPropTypes.Fixed;
    type: string;
  }) => void | null | VNodeStyle);

  export type FooterRowStyle = VNodeStyle | ((params: {
    $table: VxeTableConstructor & VxeTablePrivateMethods;
    $rowIndex: number;
    _rowIndex: number;
    fixed: VxeColumnPropTypes.Fixed;
    type: string;
  }) => void | null | VNodeStyle);

  export type MergeCell = VxeTableDefines.MergeOptions;
  export type MergeCells = MergeCell[];
  export type MergeFooterItem = VxeTableDefines.MergeOptions;
  export type MergeFooterItems = MergeFooterItem[];

  export type SpanMethod = (params: {
    column: VxeTableDefines.ColumnInfo;
    columnIndex: number;
    $columnIndex: number;
    row: any;
    rowIndex: number;
    $rowIndex: number;
    _rowIndex: number;
    isHidden: boolean;
    fixed: VxeColumnPropTypes.Fixed;
    type: string;
    visibleData: any[];
  }) => void | { rowspan: number, colspan: number };

  export type FooterSpanMethod = (params: {
    column: VxeTableDefines.ColumnInfo;
    columnIndex: number;
    _columnIndex: number;
    $columnIndex: number;
    $rowIndex: number;
    _rowIndex: number;
    items: any[];
    data: any[][];
  }) => void | { rowspan: number, colspan: number };

  export type ShowOverflow = boolean | 'ellipsis' | 'title' | 'tooltip' | null;
  export type ShowHeaderOverflow = ShowOverflow;
  export type ShowFooterOverflow = ShowOverflow;
  export type ColumnKey = boolean;
  export type RowKey = boolean;
  export type RowId = string;
  export type KeepSource = boolean;
  export type AutoResize = boolean;
  export type SyncResize = boolean | string | number;

  /**
   * 列的默认配置
   */
  export interface ColumnConfig {
    width?: number;
    minWidth?: number;
  }
  export interface ColumnOpts extends ColumnConfig { }

  /**
   * 自定义列配置项
   */
  export interface CustomConfig {
    storage?: boolean | {
      visible?: boolean;
      resizable?: boolean;
    };
    checkMethod?(params: { column: VxeTableDefines.ColumnInfo }): boolean;
  }
  export interface CustomOpts extends CustomConfig { }

  export interface ResizableConfig {
    minWidth?: number | string | ((params: {
      $table: VxeTableConstructor & VxeTablePrivateMethods;
      column: VxeTableDefines.ColumnInfo;
      columnIndex: number;
      $columnIndex: number;
      $rowIndex: number;
      cell: HTMLTableHeaderCellElement;
    }) => number | string);
  }
  export interface ResizableOpts extends ResizableConfig { }

  /**
   * 序号配置项
   */
  export interface SeqConfig {
    startIndex?: number;
    seqMethod?(params: {
      column: VxeTableDefines.ColumnInfo;
      columnIndex: number;
      $columnIndex: number;
      row: any;
      rowIndex: number;
      $rowIndex: number;
    }): number | string;
  }
  export interface SeqOpts extends SeqConfig { }

  interface SortConfigDefaultSort {
    field: string;
    order: SortOrder;
  }

  /**
   * 排序配置项
   */
  export interface SortConfig {
    defaultSort?: SortConfigDefaultSort | SortConfigDefaultSort[];
    orders?: SortOrder[];
    sortMethod?(params: {
      $table: VxeTableConstructor & VxeTablePrivateMethods;
      data: any[];
      sortList: VxeTableDefines.SortCheckedParams[];
    }): any[];
    remote?: boolean;
    multiple?: boolean;
    trigger?: 'default' | 'cell';
    showIcon?: boolean;
    iconAsc?: string;
    iconDesc?: string;
  }
  export type SortOrder = 'asc' | 'desc' | null;
  export interface SortOpts extends SortConfig {
    orders: SortOrder[];
  }

  /**
   * 筛选配置项
   */
  export interface FilterConfig {
    filterMethod?: (params: {
      options: VxeTableDefines.FilterOption[];
      values: any[];
      cellValue: any;
      row: any;
      column: VxeTableDefines.ColumnInfo;
    }) => any;
    remote?: boolean;
    showIcon?: boolean;
    iconNone?: string;
    iconMatch?: string;
  }
  export interface FilterOpts extends FilterConfig { }

  /**
   * 单选框配置
   */
  export interface RadioConfig {
    reserve?: boolean;
    labelField?: string;
    checkRowKey?: string | number;
    checkMethod?(params: {
      row: any;
    }): boolean;
    trigger?: 'default' | 'cell' | 'row';
    highlight?: boolean;
  }
  export interface RadioOpts extends RadioConfig { }

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
    checkMethod?(params: {
      row: any;
    }): boolean;
    trigger?: 'default' | 'cell' | 'row';
    highlight?: boolean;
    range?: boolean;
  }
  export interface CheckboxOpts extends CheckboxConfig { }

  /**
   * 提示信息配置项
   */
  export interface TooltipConfig {
    showAll?: boolean;
    theme?: 'dark' | 'light';
    enterable?: boolean;
    leaveDelay?: number;
    leaveMethod?: (params: { $event: Event }) => boolean;
    contentMethod?(params: {
      items: any[];
      row: any;
      rowIndex: number;
      $rowIndex: number;
      _rowIndex: number;
      column: VxeTableDefines.ColumnInfo;
      columnIndex: number;
      $columnIndex: number;
      _columnIndex: number;
      type: 'header' | 'body' | 'footer';
      cell: HTMLElement;
      $event: any;
    }): string | null | void;
  }
  export interface TooltipOpts extends TooltipConfig { }

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
    reserve?: boolean;
    loadMethod?(params: {
      $table: VxeTableConstructor & VxeTablePrivateMethods;
      row: any;
      rowIndex: number;
      $rowIndex: number;
    }): Promise<void>;
    toggleMethod?(params: {
      $table: VxeTableConstructor & VxeTablePrivateMethods;
      expanded: boolean;
      row: any;
      rowIndex: number;
      $rowIndex: number;
      column: VxeTableDefines.ColumnInfo;
      columnIndex: number;
      $columnIndex: number;
    }): boolean;
    visibleMethod?(params: VxeTableDefines.CellRenderBodyParams): boolean;
    showIcon?: boolean;
    iconOpen?: string;
    iconClose?: string;
    iconLoaded?: string;
  }
  export interface ExpandOpts extends ExpandConfig { }

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
    reserve?: boolean;
    loadMethod?(params: {
      $table: VxeTableConstructor & VxeTablePrivateMethods;
      row: any;
    }): Promise<any[]>;
    toggleMethod?(params: {
      $table: VxeTableConstructor & VxeTablePrivateMethods;
      expanded: boolean;
      row: any;
      column: VxeTableDefines.ColumnInfo;
      columnIndex: number;
      $columnIndex: number;
    }): boolean;
    showIcon?: boolean;
    iconOpen?: string;
    iconClose?: string;
    iconLoaded?: string;
  }
  export interface TreeOpts extends TreeConfig {
    children: string;
    indent: number;
    hasChild: string;
    iconOpen: string;
    iconClose: string;
    iconLoaded: string;
  }

  /**
   * 快捷菜单配置项
   */
  export interface MenuConfig {
    header?: VxeTableDefines.MenuOptions;
    body?: VxeTableDefines.MenuOptions;
    footer?: VxeTableDefines.MenuOptions;
    trigger?: 'default' | 'cell';
    className?: string;
    visibleMethod?(params: {
      type: string;
      options: VxeTableDefines.MenuFirstOption[][];
      columns: VxeTableDefines.ColumnInfo[];
      row?: any;
      rowIndex?: number;
      column?: VxeTableDefines.ColumnInfo;
      columnIndex?: number;
    }): boolean;
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
    /**
     * 只对 area 启用后有效，是否开启区域扩展选取功能，开启后可以通过鼠标左键按住区域内右下角扩展按钮，将区域横向或纵向扩大（支持扩大区域并复制值）
     */
    extension?: boolean;
  }
  export interface MouseOpts extends MouseConfig { }

  /**
   * 区域配置项
   */
  export interface AreaConfig {
    /**
     * 只对 mouse-config.area 启用后有效，点击列头是否选取当前列的所有单元格
     */
    selectCellByHeader?: boolean;
    /**
     * 只对 mouse-config.extension 启用后有效，将被选取区域的值复制到扩展区域中
     */
    extendByCopy?: boolean;
    /**
     * 只对 mouse-config.extension 启用后有效，扩展区域时将自动识别数字规则进行计算
     */
    extendByCalc?: boolean;
    /**
     * 只对 extendByCalc 启用后有效，重写单元格扩展区域计算值的方法
     * @param params
     */
    extendCalcMethod?(params: VxeTableProDefines.ExtendCellAreaCalcBaseParams): any[][];
    /**
     * 只对 extendByCopy | extendByCalc 启用后有效，重写单元格扩展区域赋值的方法
     * @param params
     */
    extendSetMethod?(params: {
      cellValue: any;
      row: any;
      column: VxeTableDefines.ColumnInfo;
    } & VxeTableProDefines.ExtendCellAreaCalcBaseParams): void;
    /**
     * 只对 extendByCopy | extendByCalc 启用后有效，自定义单元格扩展区域赋值之前的方法，可以通过返回 false 阻止扩展行为
     * @param params
     */
    beforeExtendSetMethod?(params: VxeTableProDefines.ExtendCellAreaCalcBaseParams): boolean;
    /**
     * 只对 extendByCopy | extendByCalc 启用后有效，自定义单元格扩展区域赋值之后的方法
     * @param params
     */
     afterExtendSetMethod?(params: {
      extendValues: any[][];
     } & VxeTableProDefines.ExtendCellAreaCalcBaseParams): boolean;
  }
  export interface AreaOpts extends AreaConfig { }

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
     * 用于 mouse-config.area，开启合并和取消合并功能
     */
    isMerge?: boolean;
    /**
     * 用于 mouse-config.area，开启复制/剪贴/粘贴功能
     */
    isClip?: boolean;
    /**
     * 如果功能被支持，用于 mouse-config.area，开启查找和替换功能
     */
    isFNR?: boolean;
    /**
     * 用于 mouse-config.area & column.type=checkbox|radio，开启空格键切换复选框或单选框状态功能
     */
    isChecked?: boolean;
    /**
     * 用于 mouse-config.area，是否将回车键行为改成 Tab 键行为
     */
    enterToTab?: boolean;
    /**
     * 只对 isDel=true 有效，用于删除键清空单元格内容方法
     */
    delMethod?(params: {
      row: any;
      rowIndex: number;
      column: VxeTableDefines.ColumnInfo;
      columnIndex: number;
      $table: VxeTableConstructor & VxeTablePrivateMethods;
    }): void;
    /**
     * 只对 isDel=true 有效，用于重写回退键清空单元格内容并激活为编辑状态方法
     */
    backMethod?(params: {
      row: any;
      rowIndex: number;
      column: VxeTableDefines.ColumnInfo;
      columnIndex: number;
      $table: VxeTableConstructor & VxeTablePrivateMethods;
    }): void;
    /**
     * 只对 isEdit=true 有效，用于重写编辑单元格方法
     */
    editMethod?(params: {
      row: any;
      rowIndex: number;
      column: VxeTableDefines.ColumnInfo;
      columnIndex: number;
      $table: VxeTableConstructor & VxeTablePrivateMethods;
    }): boolean;
  }
  export interface KeyboardOpts extends KeyboardConfig { }

  /**
   * 复制/粘贴配置项
   */
  export interface ClipConfig {
    /**
     * 是否启用复制功能
     */
    isCopy?: boolean;
    /**
     * 是否启用剪贴功能
     */
    isCut?: boolean;
    /**
     * 是否启用粘贴功能
     */
    isPaste?: boolean;
    /**
     * 是否填充粘贴，如果启用了，当被选取的粘贴单元格与粘贴单元格的行与列数量不匹配时，会将内容强制粘贴所选的单元格
     */
    isFillPaste?: boolean;
    /**
     * 是否启用行自增，当粘贴的行数超出表格时自动插入新行
     */
    isRowIncrement?: boolean;
    /**
     * 是否启用列自增，当粘贴的列数超出表格时自动插入新列（需要注意自增的列自字段是否定义，否则将无法响应）
     */
    isColumnIncrement?: boolean;
    /**
     * 重写单元格复制取值的方法，将单元格复制到剪贴板
     */
    copyMethod?(params: {
      isCut: boolean;
      row: any;
      column: VxeTableDefines.ColumnInfo;
      cellValue: any;
      $table: VxeTableConstructor & VxeTablePrivateMethods;
    }): string;
    /**
     * 自定义单元格复制取值之前的方法，可以通过返回 false 阻止复制行为
     */
    beforeCopyMethod?(params: {
      isCut: boolean;
      targetAreas: VxeTableProDefines.CellAreaParams[];
      $table: VxeTableConstructor & VxeTablePrivateMethods;
    }): boolean;
    /**
     * 自定义单元格复制到剪贴板之后的方法
     */
    afterCopyMethod?(params: {
      isCut: boolean;
      targetAreas: VxeTableProDefines.CellAreaParams[];
      $table: VxeTableConstructor & VxeTablePrivateMethods;
    }): boolean;
    /**
     * 重写单元格剪贴值清除的方法，将剪贴单元格的值清除
     */
    cutMethod?: (params: {
      row: any,
      column: VxeTableDefines.ColumnInfo;
      cellValue: any;
      $table: VxeTableConstructor & VxeTablePrivateMethods;
    }) => void;
    /**
     * 自定义单元格剪贴值清除之前的方法，可以通过返回 false 阻止清除行为
     */
    beforeCutMethod?: (params: {
      cutAreas: VxeTableProDefines.CellAreaParams[];
      currentAreas: VxeTableProDefines.CellAreaParams[];
      $table: VxeTableConstructor & VxeTablePrivateMethods;
    }) => boolean;
    /**
     * 自定义单元格剪贴值清除之后的方法
     */
    afterCutMethod?: (params: {
      cutAreas: VxeTableProDefines.CellAreaParams[];
      currentAreas: VxeTableProDefines.CellAreaParams[];
      $table: VxeTableConstructor & VxeTablePrivateMethods;
    }) => void;
    /**
     * 重写单元格粘贴赋值的方法，从剪贴板赋值到单元格
     */
    pasteMethod?(params: {
      isCut: boolean;
      row: any,
      column: VxeTableDefines.ColumnInfo;
      cellValue: any;
      $table: VxeTableConstructor & VxeTablePrivateMethods;
    }): void;
    /**
     * 自定义单元格粘贴赋值之前的方法，可以通过返回 false 阻止复制行为
     */
    beforePasteMethod?(params: {
      currentAreas: VxeTableProDefines.CellAreaParams[];
      targetAreas: VxeTableProDefines.CellAreaParams[];
      cellValues: any[][];
      $table: VxeTableConstructor & VxeTablePrivateMethods;
    }): boolean;
    /**
     * 自定义单元格粘贴赋值之后的方法
     */
    afterPasteMethod?(params: {
      currentAreas: VxeTableProDefines.CellAreaParams[];
      targetAreas: VxeTableProDefines.CellAreaParams[];
      cellValues: any[][];
      pasteCells: string[][];
      insertRows: any[];
      insertColumns: VxeTableDefines.ColumnInfo[];
      $table: VxeTableConstructor & VxeTablePrivateMethods;
    }): boolean;
    /**
     * 只对 isRowIncrement 有效，自定义创建自增行数据的方法
     */
    createRowsMethod?(params: {
      currentAreas: VxeTableProDefines.CellAreaParams[];
      targetAreas: VxeTableProDefines.CellAreaParams[];
      cellValues: any[][];
      pasteCells: string[][];
      insertRows: any[];
      $table: VxeTableConstructor & VxeTablePrivateMethods;
    }): any[];
    /**
     * 只对 isColumnIncrement 有效，自定义创建自增列配置的方法
     */
    createColumnsMethod?(params: {
      currentAreas: VxeTableProDefines.CellAreaParams[];
      targetAreas: VxeTableProDefines.CellAreaParams[];
      cellValues: any[][];
      pasteCells: string[][];
      insertColumns: VxeTableDefines.ColumnOptions[];
      $table: VxeTableConstructor & VxeTablePrivateMethods;
    }): VxeTableDefines.ColumnOptions[];
  }
  export interface ClipOpts extends ClipConfig { }

  /**
   * 查找/替换配置项
   */
  export interface FNRConfig {
    isFind?: boolean;
    findMethod?(params: {
      cellValue: any;
      isWhole: boolean;
      isRE: boolean;
      isSensitive: boolean;
      findValue: string | null;
      findRE: RegExp | null;
    }): boolean;
    beforeFindMethod?(params: {
      findValue: string | null;
      $table: VxeTableConstructor & VxeTablePrivateMethods;
    }): boolean;
    isReplace?: boolean;
    replaceMethod?: (params: {
      row: any;
      column: VxeTableDefines.ColumnInfo;
      cellValue: any;
    }) => void;
    beforeReplaceMethod?: (params: {
      findValue: string | null;
      replaceValue: string;
      $table: VxeTableConstructor & VxeTablePrivateMethods;
    }) => boolean;
  }
  export interface FNROpts extends FNRConfig { }

  /**
   * 编辑配置项
   */
  export interface EditConfig {
    trigger?: 'manual' | 'click' | 'dblclick';
    mode?: string;
    icon?: string;
    showIcon?: boolean;
    showStatus?: boolean;
    showUpdateStatus?: boolean;
    showInsertStatus?: boolean;
    showAsterisk?: boolean;
    autoClear?: boolean;
    /**
     * 该方法的返回值用来决定该单元格是否允许编辑
     */
    activeMethod?(params: {
      row: any;
      rowIndex: number;
      column: VxeTableDefines.ColumnInfo;
      columnIndex: number;
    }): boolean;
  }
  export interface EditOpts extends EditConfig { }

  /**
   * 校验配置项
   */
  export interface ValidConfig {
    autoPos?: boolean;
    showMessage?: boolean;
    message?: string;
    maxWidth?: number;
  }
  export interface ValidOpts extends ValidConfig { }

  /**
   * 校验规则配置项
   */
  export interface EditRules {
    [field: string]: VxeTableDefines.ValidatorRule[];
  }

  export type ZIndex = number;
  export type EmptyText = string;

  export interface EmptyRender extends VxeGlobalRendererHandles.RenderOptions { }
  export interface EmptyOpts extends EmptyRender { }

  export type Fit = boolean;
  export type Animat = boolean;
  export type DelayHover = number;

  export interface ScrollX {
    gt?: number;
    oSize?: number;
    [key: string]: any;
  }
  export interface SXOpts extends ScrollX {
    gt: number;
    oSize: number;
  }

  export interface ScrollY {
    mode?: 'default' | 'wheel';
    gt?: number;
    oSize?: number;
    [key: string]: any;
  }
  export interface SYOpts extends ScrollY {
    gt: number;
    oSize: number;
  }

  export type Params = any;
}

export type VxeTableProps<D = any> = {
  size?: VxeTablePropTypes.Size;
  id?: VxeTablePropTypes.ID;
  data?: VxeTablePropTypes.Data<D>;
  height?: VxeTablePropTypes.Height;
  maxHeight?: VxeTablePropTypes.MaxHeight;
  resizable?: VxeTablePropTypes.Resizable;
  stripe?: VxeTablePropTypes.Stripe;
  round?: VxeTablePropTypes.Round;
  border?: VxeTablePropTypes.Border;
  loading?: VxeTablePropTypes.Loading;
  align?: VxeTablePropTypes.Align;
  headerAlign?: VxeTablePropTypes.HeaderAlign;
  footerAlign?: VxeTablePropTypes.FooterAlign;
  showHeader?: VxeTablePropTypes.ShowHeader;
  highlightCurrentRow?: VxeTablePropTypes.HighlightCurrentRow;
  highlightHoverRow?: VxeTablePropTypes.HighlightHoverRow;
  highlightCurrentColumn?: VxeTablePropTypes.HighlightCurrentColumn;
  highlightHoverColumn?: VxeTablePropTypes.HighlightHoverColumn;
  highlightCell?: VxeTablePropTypes.HighlightCell;
  showFooter?: VxeTablePropTypes.ShowFooter;
  footerMethod?: VxeTablePropTypes.FooterMethod;
  rowClassName?: VxeTablePropTypes.RowClassName;
  cellClassName?: VxeTablePropTypes.CellClassName;
  headerRowClassName?: VxeTablePropTypes.HeaderRowClassName;
  headerCellClassName?: VxeTablePropTypes.HeaderCellClassName;
  footerRowClassName?: VxeTablePropTypes.FooterRowClassName;
  footerCellClassName?: VxeTablePropTypes.FooterCellClassName;
  cellStyle?: VxeTablePropTypes.CellStyle;
  headerCellStyle?: VxeTablePropTypes.HeaderCellStyle;
  footerCellStyle?: VxeTablePropTypes.FooterCellStyle;
  rowStyle?: VxeTablePropTypes.RowStyle;
  headerRowStyle?: VxeTablePropTypes.HeaderRowStyle;
  footerRowStyle?: VxeTablePropTypes.FooterRowStyle;
  mergeCells?: VxeTablePropTypes.MergeCells;
  mergeFooterItems?: VxeTablePropTypes.MergeFooterItems;
  spanMethod?: VxeTablePropTypes.SpanMethod;
  footerSpanMethod?: VxeTablePropTypes.FooterSpanMethod;
  showOverflow?: VxeTablePropTypes.ShowOverflow;
  showHeaderOverflow?: VxeTablePropTypes.ShowHeaderOverflow;
  showFooterOverflow?: VxeTablePropTypes.ShowFooterOverflow;
  columnKey?: VxeTablePropTypes.ColumnKey;
  rowKey?: VxeTablePropTypes.RowKey;
  rowId?: VxeTablePropTypes.RowId;
  keepSource?: VxeTablePropTypes.KeepSource;
  autoResize?: VxeTablePropTypes.AutoResize;
  syncResize?: VxeTablePropTypes.SyncResize;
  columnConfig?: VxeTablePropTypes.ColumnConfig;
  customConfig?: VxeTablePropTypes.CustomConfig;
  resizableConfig?: VxeTablePropTypes.ResizableConfig;
  seqConfig?: VxeTablePropTypes.SeqConfig;
  sortConfig?: VxeTablePropTypes.SortConfig;
  filterConfig?: VxeTablePropTypes.FilterConfig;
  radioConfig?: VxeTablePropTypes.RadioConfig;
  checkboxConfig?: VxeTablePropTypes.CheckboxConfig;
  tooltipConfig?: VxeTablePropTypes.TooltipConfig;
  exportConfig?: VxeTablePropTypes.ExportConfig;
  importConfig?: VxeTablePropTypes.ImportConfig;
  printConfig?: VxeTablePropTypes.PrintConfig;
  expandConfig?: VxeTablePropTypes.ExpandConfig;
  treeConfig?: VxeTablePropTypes.TreeConfig;
  menuConfig?: VxeTablePropTypes.MenuConfig;
  mouseConfig?: VxeTablePropTypes.MouseConfig;
  areaConfig?: VxeTablePropTypes.AreaConfig;
  fnrConfig?: VxeTablePropTypes.FNRConfig;
  keyboardConfig?: VxeTablePropTypes.KeyboardConfig;
  clipConfig?: VxeTablePropTypes.ClipConfig;
  editConfig?: VxeTablePropTypes.EditConfig;
  validConfig?: VxeTablePropTypes.ValidConfig;
  editRules?: VxeTablePropTypes.EditRules;
  emptyText?: VxeTablePropTypes.EmptyText;
  emptyRender?: VxeTablePropTypes.EmptyRender;
  fit?: VxeTablePropTypes.Fit;
  animat?: VxeTablePropTypes.Animat;
  delayHover?: VxeTablePropTypes.DelayHover;
  scrollX?: VxeTablePropTypes.ScrollX;
  scrollY?: VxeTablePropTypes.ScrollY;
  params?: VxeTablePropTypes.Params;
}

export type VxeTableEmits = [
  'update:data',
  'keydown',
  'paste',
  'copy',
  'cut',
  'current-change',
  'radio-change',
  'checkbox-change',
  'checkbox-all',
  'checkbox-range-start',
  'checkbox-range-change',
  'checkbox-range-end',
  'cell-click',
  'cell-dblclick',
  'cell-menu',
  'cell-mouseenter',
  'cell-mouseleave',
  'header-cell-click',
  'header-cell-dblclick',
  'header-cell-menu',
  'footer-cell-click',
  'footer-cell-dblclick',
  'footer-cell-menu',
  'sort-change',
  'filter-change',
  'resizable-change',
  'toggle-row-expand',
  'toggle-tree-expand',
  'menu-click',
  'edit-closed',
  'edit-actived',
  'edit-disabled',
  'valid-error',
  'scroll',
  'custom',

  ...VxeTableProEmits
]

export namespace VxeTableDefines {
  export interface SortConfs {
    field: string;
    order?: VxeTablePropTypes.SortOrder;
  }

  export interface MergeOptions {
    row: any | number;
    col: VxeTableDefines.ColumnInfo | number;
    rowspan: number;
    colspan: number;
  }

  export interface MergeInfo {
    row: number;
    col: number;
    rowspan: number;
    colspan: number;
  }

  export interface MergeItem extends MergeInfo {
    _row: any;
    _col: VxeTableDefines.ColumnInfo;
    _rowspan: number;
    _colspan: number;
  }

  export interface ColumnOptions extends VxeColumnProps {
    children?: ColumnOptions[];
    slots?: VxeColumnPropTypes.Slots;
  }

  /**
   * 列对象
   */
  export class ColumnInfo {
    property: string;

    type: VxeColumnPropTypes.Type;
    title: VxeColumnPropTypes.Title;
    width: VxeColumnPropTypes.Width;
    minWidth: VxeColumnPropTypes.MinWidth;
    resizable: VxeColumnPropTypes.Resizable;
    fixed: VxeColumnPropTypes.Fixed;
    align: VxeColumnPropTypes.Align;
    headerAlign: VxeColumnPropTypes.HeaderAlign;
    footerAlign: VxeColumnPropTypes.FooterAlign;
    showOverflow: VxeColumnPropTypes.ShowOverflow;
    showHeaderOverflow: VxeColumnPropTypes.ShowHeaderOverflow;
    showFooterOverflow: VxeColumnPropTypes.ShowFooterOverflow;
    className: VxeColumnPropTypes.ClassName;
    headerClassName: VxeColumnPropTypes.HeaderClassName;
    footerClassName: VxeColumnPropTypes.FooterClassName;
    formatter: VxeColumnPropTypes.Formatter;
    sortable: VxeColumnPropTypes.Sortable;
    sortBy: VxeColumnPropTypes.SortBy;
    sortType: VxeColumnPropTypes.SortType;
    filters: VxeColumnPropTypes.Filter[];
    filterMultiple: VxeColumnPropTypes.FilterMultiple;
    filterMethod: VxeColumnPropTypes.FilterMethod;
    filterRender: VxeColumnPropTypes.FilterRender;
    treeNode: VxeColumnPropTypes.TreeNode;
    visible: VxeColumnPropTypes.Visible;
    exportMethod: VxeColumnPropTypes.ExportMethod;
    footerExportMethod: VxeColumnPropTypes.FooterExportMethod;
    titleHelp: VxeColumnPropTypes.TitleHelp;
    cellType: VxeColumnPropTypes.CellType;
    cellRender: VxeColumnPropTypes.CellRender;
    editRender: VxeColumnPropTypes.EditRender;
    contentRender: VxeColumnPropTypes.ContentRender;
    params: VxeColumnPropTypes.Params;
    slots: VxeColumnPropTypes.Slots;

    id: string;
    parentId: string;
    level: number;
    rowSpan: number;
    colSpan: number;
    halfVisible: boolean;
    defaultVisible: any;
    checked: boolean;
    halfChecked: boolean;
    disabled: boolean;
    order: VxeTablePropTypes.SortOrder;
    sortTime: number;
    renderWidth: number;
    renderHeight: number;
    resizeWidth: number;
    model: {
      update: boolean;
      value: any;
    };
    children: ColumnInfo[];

    renderHeader(params: CellRenderHeaderParams): VNode[];
    renderCell(params: CellRenderCellParams): VNode[];
    renderData(params: CellRenderDataParams): VNode[];
    renderFooter(params: CellRenderFooterParams): VNode[];

    getTitle(): string;
    getKey(): string;
  }
  export interface CellRenderHeaderParams {
    $table: VxeTableConstructor & VxeTablePrivateMethods;
    $rowIndex: number;
    column: ColumnInfo;
    columnIndex: number;
    $columnIndex: number;
    _columnIndex: number;
    fixed: VxeColumnPropTypes.Fixed;
    type: string;
    isHidden: boolean;
    hasFilter: boolean;
  }
  export interface CellRenderBodyParams {
    $table: VxeTableConstructor & VxeTablePrivateMethods;
    $seq: string;
    seq: number;
    rowid: string;
    row: any;
    rowIndex: number;
    $rowIndex: number;
    _rowIndex: number;
    column: ColumnInfo;
    columnIndex: number;
    $columnIndex: number;
    _columnIndex: number;
    fixed: VxeColumnPropTypes.Fixed;
    type: string
    isHidden: boolean;
    level: number;
    visibleData: any[];
    data: any[];
    items: any[];
  }

  export interface CellRenderDataParams extends CellRenderBodyParams { }
  export interface CellRenderCellParams extends CellRenderBodyParams { }

  export interface CellRenderFooterParams {
    $table: VxeTableConstructor & VxeTablePrivateMethods;
    _rowIndex: number;
    $rowIndex: number;
    column: ColumnInfo;
    columnIndex: number;
    $columnIndex: number;
    _columnIndex: number;
    itemIndex: number;
    items: any[];
    fixed: VxeColumnPropTypes.Fixed;
    type: string;
    data: any[][];
  }

  interface TableEventParams extends VxeEvent {
    $table: VxeTableConstructor & VxeTablePrivateMethods;
  }

  interface TableBaseHeaderCellParams {
    $rowIndex: number;
    column: ColumnInfo;
    columnIndex: number;
    $columnIndex: number;
  }

  interface TableBaseCellParams {
    row: any;
    rowIndex: number;
    $rowIndex: number;
    column: ColumnInfo;
    columnIndex: number;
    $columnIndex: number;
  }

  interface TableBaseFooterCellParams {
    $rowIndex: number;
    column: ColumnInfo;
    columnIndex: number;
    $columnIndex: number;
  }

  export interface KeydownParams { }
  export interface KeydownEventParams extends TableEventParams, KeydownParams { }

  export interface PasteParams { }
  export interface PasteEventParams extends TableEventParams, PasteParams { }

  export interface CopyParams { }
  export interface CopyEventParams extends TableEventParams, CopyParams { }

  export interface CutParams { }
  export interface CutEventParams extends TableEventParams, CutParams { }

  export interface CurrentChangeParams {
    row: any;
    rowIndex: number;
    $rowIndex: number;
  }
  export interface CurrentChangeEventParams extends TableEventParams, CurrentChangeParams { }

  export interface RadioChangeParams extends TableBaseCellParams { }
  export interface RadioChangeEventParams extends TableEventParams, RadioChangeParams { }

  export interface CheckboxChangeParams {
    checked: boolean;
    records: any[];
    reserves: any[];
    indeterminates: any[];
  }
  export interface CheckboxChangeEventParams extends TableEventParams, CheckboxChangeParams { }

  export interface CheckboxAllParams extends CheckboxChangeParams { }
  export interface CheckboxAllEventParams extends TableEventParams, CheckboxAllParams { }

  export interface CheckboxRangeStartParams {
    records: any[];
    reserves: any[];
  }
  export interface CheckboxRangeStartEventParams extends TableEventParams, CheckboxRangeStartParams { }

  export interface CheckboxRangeChangeParams extends CheckboxRangeStartParams { }
  export interface CheckboxRangeChangeEventParams extends TableEventParams, CheckboxRangeChangeParams { }

  export interface CheckboxRangeEndParams extends CheckboxRangeStartParams { }

  export interface CheckboxRangeEndEventParams extends TableEventParams, CheckboxRangeEndParams { }

  export interface CellClickParams extends TableBaseCellParams {
    triggerRadio: boolean;
    triggerCheckbox: boolean;
    triggerTreeNode: boolean;
    triggerExpandNode: boolean;
  }
  export interface CellClickEventParams extends TableEventParams, CellClickParams { }

  export interface CellDblclickParams extends CellClickParams, CellClickParams { }
  export interface CellDblclickEventParams extends TableEventParams, CellDblclickParams { }

  export interface CellMenuParams extends TableBaseCellParams { }
  export interface CellMenuEventParams extends TableEventParams, CellMenuParams { }

  export interface CellMouseenterParams extends TableBaseCellParams { }
  export interface CellMouseenterEventParams extends TableEventParams, CellMouseenterParams { }

  export interface CellMouseleaveParams extends TableBaseCellParams { }
  export interface CellMouseleaveEventParams extends TableEventParams, CellMouseleaveParams { }

  export interface HeaderCellClickParams extends TableBaseHeaderCellParams {
    triggerResizable: boolean;
    triggerSort: boolean;
    triggerFilter: boolean;
  }
  export interface HeaderCellClickEventParams extends TableEventParams, HeaderCellClickParams { }

  export interface HeaderCellDblclickParams extends TableBaseHeaderCellParams { }
  export interface HeaderCellDblclickEventParams extends TableEventParams, HeaderCellDblclickParams { }

  export interface HeaderCellMenuParams extends TableBaseHeaderCellParams { }
  export interface HeaderCellMenuEventParams extends TableEventParams, HeaderCellMenuParams { }

  export interface FooterCellClickParams extends TableBaseFooterCellParams { }
  export interface FooterCellClickEventParams extends TableEventParams, FooterCellClickParams { }

  export interface FooterCellDblclickParams extends TableBaseFooterCellParams { }
  export interface FooterCellDblclickEventParams extends TableEventParams, FooterCellDblclickParams { }

  export interface FooterCellMenuParams extends TableBaseFooterCellParams { }
  export interface FooterCellMenuEventParams extends TableEventParams, FooterCellMenuParams { }

  export interface SortCheckedParams {
    column: VxeTableDefines.ColumnInfo;
    property: VxeColumnPropTypes.Field;
    order: VxeTablePropTypes.SortOrder;
  }
  export interface SortChangeParams extends SortCheckedParams {
    sortList: SortCheckedParams[];
  }
  export interface SortChangeEventParams extends TableEventParams, SortChangeParams { }

  export interface FilterCheckedParams {
    column: VxeTableDefines.ColumnInfo;
    property: VxeColumnPropTypes.Field;
    values: any[];
    datas: any[];
  }
  export interface FilterChangeParams extends FilterCheckedParams {
    filterList: FilterCheckedParams[]
  }
  export interface FilterChangeEventParams extends TableEventParams, FilterChangeParams { }

  export interface ResizableChangeParams extends TableBaseHeaderCellParams { }
  export interface ResizableChangeEventParams extends TableEventParams, ResizableChangeParams { }

  export interface ToggleRowExpandParams extends TableBaseCellParams { }
  export interface ToggleRowExpandEventParams extends TableEventParams, ToggleRowExpandParams { }

  export interface ToggleTreeExpandParams extends TableBaseCellParams { }
  export interface ToggleTreeExpandEventParams extends TableEventParams, ToggleTreeExpandParams { }

  export interface MenuClickParams extends TableBaseCellParams {
    menu: VxeTableDefines.MenuFirstOption | VxeTableDefines.MenuChildOption;
    type: string;
  }
  export interface MenuClickEventParams extends TableEventParams, MenuClickParams { }

  export interface EditClosedParams extends TableBaseCellParams { }
  export interface EditClosedEventParams extends TableEventParams, EditClosedParams { }

  export interface EditActivedParams extends TableBaseCellParams { }
  export interface EditActivedEventParams extends TableEventParams, EditActivedParams { }

  export interface EditDisabledParams extends TableBaseCellParams { }
  export interface EditDisabledEventParams extends TableEventParams, EditDisabledParams { }

  export interface ValidErrorParams extends TableBaseCellParams {
    rule: any;
  }
  export interface ValidErrorEventParams extends TableEventParams, ValidErrorParams { }

  export interface ScrollParams {
    type: string;
    scrollTop: number;
    scrollLeft: number;
    isX: boolean;
    isY: boolean;
  }
  export interface ScrollEventParams extends TableEventParams, ScrollParams {
    target: HTMLDivElement;
  }

  export interface CustomParams {
    type: string;
  }
  export interface CustomEventParams extends TableEventParams, CustomParams { }
}

export interface VxeTableEventProps {
  onKeydown?: VxeTableEvents.Keydown;
  onPaste?: VxeTableEvents.Paste;
  onCopy?: VxeTableEvents.Copy;
  onCut?: VxeTableEvents.Cut;
  onCurrentChange?: VxeTableEvents.CurrentChange;
  onRadioChange?: VxeTableEvents.RadioChange;
  onCheckboxChange?: VxeTableEvents.CheckboxChange;
  onCheckboxAll?: VxeTableEvents.CheckboxAll;
  onCheckboxRangeStart?: VxeTableEvents.CheckboxRangeStart;
  onCheckboxRangeChange?: VxeTableEvents.CheckboxRangeChange;
  onCheckboxRangeEnd?: VxeTableEvents.CheckboxRangeEnd;
  onCellClick?: VxeTableEvents.CellClick;
  onCellDblclick?: VxeTableEvents.CellDblclick;
  onCellMenu?: VxeTableEvents.CellMenu;
  onCellMouseenter?: VxeTableEvents.CellMouseenter;
  onCellMouseleave?: VxeTableEvents.CellMouseleave;
  onHeaderCellClick?: VxeTableEvents.HeaderCellClick;
  onHeaderCellDblclick?: VxeTableEvents.HeaderCellDblclick;
  onHeaderCellMenu?: VxeTableEvents.HeaderCellMenu;
  onFooterCellClick?: VxeTableEvents.FooterCellClick;
  onFooterCellDblclick?: VxeTableEvents.FooterCellDblclick;
  onFooterCellMenu?: VxeTableEvents.FooterCellMenu;
  onSortChange?: VxeTableEvents.SortChange;
  onFilterChange?: VxeTableEvents.FilterChange;
  onResizableChange?: VxeTableEvents.ResizableChange;
  onToggleRowExpand?: VxeTableEvents.ToggleRowExpand;
  onToggleTreeExpand?: VxeTableEvents.ToggleTreeExpand;
  onMenuClick?: VxeTableEvents.MenuClick;
  onEditClosed?: VxeTableEvents.EditClosed;
  onEditActived?: VxeTableEvents.EditActived;
  onEditDisabled?: VxeTableEvents.EditDisabled;
  onValidError?: VxeTableEvents.ValidError;
  onScroll?: VxeTableEvents.Scroll;
  onCustom?: VxeTableEvents.Custom;
}

export interface VxeTableListeners {
  keydown?: VxeTableEvents.Keydown;
  paste?: VxeTableEvents.Paste;
  copy?: VxeTableEvents.Copy;
  cut?: VxeTableEvents.Cut;
  currentChange?: VxeTableEvents.CurrentChange;
  radioChange?: VxeTableEvents.RadioChange;
  checkboxChange?: VxeTableEvents.CheckboxChange;
  checkboxAll?: VxeTableEvents.CheckboxAll;
  checkboxRangeStart?: VxeTableEvents.CheckboxRangeStart;
  checkboxRangeChange?: VxeTableEvents.CheckboxRangeChange;
  checkboxRangeEnd?: VxeTableEvents.CheckboxRangeEnd;
  cellClick?: VxeTableEvents.CellClick;
  cellDBLClick?: VxeTableEvents.CellDblclick;
  cellMenu?: VxeTableEvents.CellMenu;
  cellMouseenter?: VxeTableEvents.CellMouseenter;
  cellMouseleave?: VxeTableEvents.CellMouseleave;
  headerCellClick?: VxeTableEvents.HeaderCellClick;
  headerCellDblclick?: VxeTableEvents.HeaderCellDblclick;
  headerCellMenu?: VxeTableEvents.HeaderCellMenu;
  footerCellClick?: VxeTableEvents.FooterCellClick;
  footerCellDblclick?: VxeTableEvents.FooterCellDblclick;
  footerCellMenu?: VxeTableEvents.FooterCellMenu;
  sortChange?: VxeTableEvents.SortChange;
  filterChange?: VxeTableEvents.FilterChange;
  resizableChange?: VxeTableEvents.ResizableChange;
  toggleRowExpand?: VxeTableEvents.ToggleRowExpand;
  toggleTreeExpand?: VxeTableEvents.ToggleTreeExpand;
  menuClick?: VxeTableEvents.MenuClick;
  editClosed?: VxeTableEvents.EditClosed;
  editActived?: VxeTableEvents.EditActived;
  editDisabled?: VxeTableEvents.EditDisabled;
  validError?: VxeTableEvents.ValidError;
  scroll?: VxeTableEvents.Scroll;
  custom?: VxeTableEvents.Custom;
}

export namespace VxeTableEvents {
  export type Keydown = (params: VxeTableDefines.KeydownEventParams) => void;
  export type Paste = (params: VxeTableDefines.PasteEventParams) => void;
  export type Copy = (params: VxeTableDefines.CopyEventParams) => void;
  export type Cut = (params: VxeTableDefines.CutEventParams) => void;
  export type CurrentChange = (params: VxeTableDefines.CurrentChangeEventParams) => void;
  export type RadioChange = (params: VxeTableDefines.RadioChangeEventParams) => void;
  export type CheckboxChange = (params: VxeTableDefines.CheckboxChangeEventParams) => void;
  export type CheckboxAll = (params: VxeTableDefines.CheckboxAllEventParams) => void;
  export type CheckboxRangeStart = (params: VxeTableDefines.CheckboxRangeStartEventParams) => void;
  export type CheckboxRangeChange = (params: VxeTableDefines.CheckboxRangeChangeEventParams) => void;
  export type CheckboxRangeEnd = (params: VxeTableDefines.CheckboxRangeEndEventParams) => void;
  export type CellClick = (params: VxeTableDefines.CellClickEventParams) => void;
  export type CellDblclick = (params: VxeTableDefines.CellDblclickEventParams) => void;
  export type CellMenu = (params: VxeTableDefines.CellMenuEventParams) => void;
  export type CellMouseenter = (params: VxeTableDefines.CellMouseenterEventParams) => void;
  export type CellMouseleave = (params: VxeTableDefines.CellMouseleaveEventParams) => void;
  export type HeaderCellClick = (params: VxeTableDefines.HeaderCellClickEventParams) => void;
  export type HeaderCellDblclick = (params: VxeTableDefines.HeaderCellDblclickEventParams) => void;
  export type HeaderCellMenu = (params: VxeTableDefines.HeaderCellMenuEventParams) => void;
  export type FooterCellClick = (params: VxeTableDefines.FooterCellClickEventParams) => void;
  export type FooterCellDblclick = (params: VxeTableDefines.FooterCellDblclickEventParams) => void;
  export type FooterCellMenu = (params: VxeTableDefines.FooterCellMenuEventParams) => void;
  export type SortChange = (params: VxeTableDefines.SortChangeEventParams) => void;
  export type FilterChange = (params: VxeTableDefines.FilterChangeEventParams) => void;
  export type ResizableChange = (params: VxeTableDefines.ResizableChangeEventParams) => void;
  export type ToggleRowExpand = (params: VxeTableDefines.ToggleRowExpandEventParams) => void;
  export type ToggleTreeExpand = (params: VxeTableDefines.ToggleTreeExpandEventParams) => void;
  export type MenuClick = (params: VxeTableDefines.MenuClickEventParams) => void;
  export type EditClosed = (params: VxeTableDefines.EditClosedEventParams) => void;
  export type EditActived = (params: VxeTableDefines.EditActivedEventParams) => void;
  export type EditDisabled = (params: VxeTableDefines.EditDisabledEventParams) => void;
  export type ValidError = (params: VxeTableDefines.ValidErrorEventParams) => void;
  export type Scroll = (params: VxeTableDefines.ScrollEventParams) => void;
  export type Custom = (params: VxeTableDefines.CustomEventParams) => void;
}