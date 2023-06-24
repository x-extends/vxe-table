import { RenderFunction, SetupContext, Ref, ComputedRef, ComponentPublicInstance, ComponentInternalInstance, VNode } from 'vue'
import { VXEComponent, VxeComponentBase, VxeEvent, SizeType, ValueOf, VNodeStyle, SlotVNodeType } from './component'
import { VxeTableProEmits, VxeTableProDefines } from './plugins/pro'
import { VxeColumnPropTypes, VxeColumnProps } from './column'
import { VXETableSetupOptions, VxeGlobalRendererHandles } from './v-x-e-table'
import { VxeToolbarConstructor, VxeToolbarInstance } from './toolbar'
import { VxeTooltipInstance } from './tooltip'
import { VxeGridConstructor } from './grid'
import { VxeMenuPanelInstance } from './menu'

/* eslint-disable no-use-before-define */

/**
 * 组件 - 表格
 * @example import { VxeTable } from 'vxe-table'
 */
export const VxeTable: VXEComponent<VxeTableProps<any>, VxeTableEventProps<any>, VxeTableSlots<any>>
/**
 * 组件 - 表格
 */
export const Table: typeof VxeTable

export type VxeTableInstance<D = any> = ComponentPublicInstance<VxeTableProps<D>, VxeTableConstructor<D>>

export type VxeTableDataRow = Record<string, any>

export interface VxeTableConstructor<D = any> extends VxeComponentBase, VxeTableMethods<D> {
  props: Readonly<VxeTableProps<D>>
  context: SetupContext<VxeTableEmits>
  instance: ComponentInternalInstance
  reactData: TableReactData<D>
  internalData: TableInternalData<D>
  getRefMaps(): TablePrivateRef
  getComputeMaps(): TablePrivateComputed<D>
  renderVN: RenderFunction

  xegrid: VxeGridConstructor<D> | null
}

export interface TablePrivateRef {
  refElem: Ref<HTMLDivElement>
  refTooltip: Ref<VxeTooltipInstance>
  refValidTooltip: Ref<VxeTooltipInstance>
  refTableFilter: Ref<ComponentPublicInstance>
  refTableMenu: Ref<VxeMenuPanelInstance>
  refTableHeader: Ref<ComponentPublicInstance>
  refTableBody: Ref<ComponentPublicInstance>
  refTableFooter: Ref<ComponentPublicInstance>
  refTableLeftHeader: Ref<ComponentPublicInstance>
  refTableLeftBody: Ref<ComponentPublicInstance>
  refTableLeftFooter: Ref<ComponentPublicInstance>
  refTableRightHeader: Ref<ComponentPublicInstance>
  refTableRightBody: Ref<ComponentPublicInstance>
  refTableRightFooter: Ref<ComponentPublicInstance>
  refLeftContainer: Ref<HTMLDivElement>
  refRightContainer: Ref<HTMLDivElement>
  refCellResizeBar: Ref<HTMLDivElement>
}
export interface VxeTablePrivateRef extends TablePrivateRef { }

export interface TablePrivateComputed<D = VxeTableDataRow> {
  computeSize: ComputedRef<VxeTablePropTypes.Size>
  computeValidOpts: ComputedRef<VxeTablePropTypes.ValidOpts>
  computeSXOpts: ComputedRef<VxeTablePropTypes.SXOpts>
  computeSYOpts: ComputedRef<VxeTablePropTypes.SYOpts>
  computeColumnOpts: ComputedRef<VxeTablePropTypes.ColumnOpts>
  computeRowOpts: ComputedRef<VxeTablePropTypes.RowOpts>
  computeResizeleOpts: ComputedRef<VxeTablePropTypes.ResizeOpts>
  computeResizableOpts: ComputedRef<VxeTablePropTypes.ResizableOpts<D>>
  computeSeqOpts: ComputedRef<VxeTablePropTypes.SeqOpts<D>>
  computeRadioOpts: ComputedRef<VxeTablePropTypes.RadioOpts<D>>
  computeCheckboxOpts: ComputedRef<VxeTablePropTypes.CheckboxOpts<D>>
  computeTooltipOpts: ComputedRef<VxeTablePropTypes.TooltipOpts<D>>
  computeEditOpts: ComputedRef<VxeTablePropTypes.EditOpts<D>>
  computeSortOpts: ComputedRef<VxeTablePropTypes.SortConfig<D>>
  computeFilterOpts: ComputedRef<VxeTablePropTypes.FilterOpts<D>>
  computeMouseOpts: ComputedRef<VxeTablePropTypes.MouseOpts>
  computeAreaOpts: ComputedRef<VxeTablePropTypes.AreaOpts>
  computeKeyboardOpts: ComputedRef<VxeTablePropTypes.KeyboardOpts>
  computeClipOpts: ComputedRef<VxeTablePropTypes.ClipOpts<D>>
  computeFNROpts: ComputedRef<VxeTablePropTypes.FNROpts<D>>
  computeHeaderMenu: ComputedRef<VxeTableDefines.MenuFirstOption>
  computeBodyMenu: ComputedRef<VxeTableDefines.MenuFirstOption>
  computeFooterMenu: ComputedRef<VxeTableDefines.MenuFirstOption>
  computeIsMenu: ComputedRef<boolean>
  computeMenuOpts: ComputedRef<VxeTablePropTypes.MenuConfig<D>>
  computeExportOpts: ComputedRef<VxeTablePropTypes.ExportOpts>
  computeImportOpts: ComputedRef<VxeTablePropTypes.ImportOpts>
  computePrintOpts: ComputedRef<VxeTablePropTypes.PrintOpts>
  computeExpandOpts: ComputedRef<VxeTablePropTypes.ExpandOpts<D>>
  computeTreeOpts: ComputedRef<VxeTablePropTypes.TreeOpts<D>>
  computeEmptyOpts: ComputedRef<VxeTablePropTypes.EmptyOpts>
  computeLoadingOpts: ComputedRef<VxeTablePropTypes.LoadingOpts>
  computeCustomOpts: ComputedRef<VxeTablePropTypes.CustomOpts<D>>
  computeIsAllCheckboxDisabled: ComputedRef<boolean>
}

export type VxeTablePrivateComputed<D = VxeTableDataRow> = TablePrivateComputed<D>

export interface TableMethods<D = VxeTableDataRow> extends TablePublicMethods<D> {
  dispatchEvent(type: ValueOf<VxeTableEmits>, params: any, evnt: Event | null): void
}

export interface TablePublicMethods<DT = VxeTableDataRow> {
  /**
   * 手动清除表格所有条件，还原到初始状态
   * 对于增删改查的场景中可能会用到，比如在数据保存之后清除表格缓存
   */
  clearAll(): Promise<void>
  /**
   * 该方法已废弃！！！
   * 同步 data 数据；如果用了该方法，那么组件将不再记录增删改的状态，只能自行实现对应逻辑
   * 对于某些特殊的场景，比如深层树节点元素发生变动时可能会用到
   * @deprecated
   */
  syncData(): Promise<void>
  /**
   * 手动处理数据，用于手动排序与筛选
   * 对于手动更改了排序、筛选...等条件后需要重新处理数据时可能会用到
   */
  updateData(): Promise<void>
  /**
   * 加载数据
   * @param data 数据
   */
  loadData(data: any[]): Promise<any>
  /**
   * 加载数据并恢复到初始状态
   * @param data 数据
   */
  reloadData(data: any[]): Promise<void>
  /**
   * 局部加载行数据并恢复到初始状态
   * @param rows 行对象
   * @param record 新数据
   * @param field 指定字段名
   */
  reloadRow(rows: any | any[], record?: any, field?: string): Promise<void>
  /**
   * 用于树结构，给行数据加载子节点
   * @param row 行对象
   * @param children 子节点
   */
  loadTreeChildren(row: any, children: any[]): Promise<any[]>
  /**
   * 加载列配置
   * @param columns 列对象
   */
  loadColumn(columns: (VxeTableDefines.ColumnOptions<any> | VxeTableDefines.ColumnInfo<any>)[]): Promise<any>
  /**
   * 加载列配置并恢复到初始状态
   * @param columns 列对象
   */
  reloadColumn(columns: (VxeTableDefines.ColumnOptions<any> | VxeTableDefines.ColumnInfo<any>)[]): Promise<any>
  /**
   * 根据 tr 元素获取对应的 row 信息
   * @param tr 行节点元素
   */
  getRowNode(trElem: HTMLElement): {
    rowid: string
    item: any
    items: any[]
    index: number
    parent?: any
  } | null
  /**
   * 根据 th/td 元素获取对应的 column 信息
   * @param cell 单元格节点元素
   */
  getColumnNode(cellElem: HTMLElement): {
    colid: string
    item: VxeTableDefines.ColumnInfo<DT>
    items: VxeTableDefines.ColumnInfo<DT>[]
    index: number
    parent?: VxeTableDefines.ColumnInfo<DT>
  } | null
  /**
   * 根据 row 获取行的序号
   * @param row 行对象
   */
  getRowSeq(row: any): string | number
  /**
   * 根据 row 获取相对于 data 中的索引
   * @param row 行对象
   */
  getRowIndex(row: any): number
  /**
   * 根据 row 获取相对于当前数据中的索引
   * @param row 行对象
   */
  getVTRowIndex(row: any): number
  /**
   * 根据 row 获取渲染中的虚拟索引
   * @param row 行对象
   */
  getVMRowIndex(row: any): number
  /**
   * 根据 column 获取相对于 columns 中的索引
   * @param column 列对象
   */
  getColumnIndex(column: VxeTableDefines.ColumnInfo<any>): number
  /**
   * 根据 column 获取相对于当前表格列中的索引
   * @param column 列对象
   */
  getVTColumnIndex(column: VxeTableDefines.ColumnInfo<any>): number
  /**
   * 根据 column 获取渲染中的虚拟索引
   * @param column 列对象
   */
  getVMColumnIndex(column: VxeTableDefines.ColumnInfo<any>): number
  /**
   * 创建 data 对象
   * 对于某些特殊场景可能会用到，会自动对数据的字段名进行检测，如果不存在就自动定义
   * @param records 数据
   */
  createData(records: any[]): Promise<any[]>
  /**
   * 创建 Row|Rows 对象
   * 对于某些特殊场景需要对数据进行手动插入时可能会用到
   * @param records 数据
   */
  createRow(records: any | any[]): Promise<any | any[]>
  /**
   * 只对 keep-source 开启有效，还原指定行 row 或者整个表格的数据
   * @param rows 指定行
   * @param field 字段名
   */
  revertData(rows?: any | any[], field?: string): Promise<any>
  /**
   * 手动清空单元格内容，如果不传参数，则清空整个表格内容，如果传了行则清空指定行内容，如果传了指定字段，则清空该字段内容
   * @param rows 指定行
   * @param field 字段名
   */
  clearData(rows?: any | any[], field?: string): Promise<any>
  /**
   * 用于 edit-config，判断行是否为新增的临时数据
   * @param row 指定行
   */
  isInsertByRow(row: any): boolean
  /**
   * 删除所有新增的临时数据
   */
  removeInsertRow(): Promise<{ row: any, rows: any[] }>
  /**
   * 只对 keep-source 开启有效，判断行数据是否发生改变
   * @param row 指定行
   * @param field 指定字段
   */
  isUpdateByRow(row: any, field?: string): boolean
  /**
   * 获取表格的可视列，也可以指定索引获取列
   * @param columnIndex 列索引
   */
  getColumns(): VxeTableDefines.ColumnInfo<DT>[]
  getColumns(columnIndex?: number): VxeTableDefines.ColumnInfo<DT>
  /**
   * 根据列的唯一主键获取列
   * @param colid 列主键
   */
  getColumnById(colid: string): VxeTableDefines.ColumnInfo<DT> | null
  /**
   * 根据列的字段名获取列
   * @param field 字段名
   */
  getColumnByField(field: string): VxeTableDefines.ColumnInfo<DT> | null
  /**
   * 获取当前表格的列
   * 收集到的全量列、全量表头列、处理条件之后的全量表头列、当前渲染中的表头列
   */
  getTableColumn(): {
    collectColumn: VxeTableDefines.ColumnInfo<DT>[]
    fullColumn: VxeTableDefines.ColumnInfo<DT>[]
    visibleColumn: VxeTableDefines.ColumnInfo<DT>[]
    tableColumn: VxeTableDefines.ColumnInfo<DT>[]
  }
  /**
   * 获取数据，和 data 的行为一致，也可以指定索引获取数据
   */
  getData(): DT[]
  getData(rowIndex: number): DT
  /**
   * 用于 type=checkbox，获取已选中的行数据
   */
  getCheckboxRecords(isFull?: boolean): DT[]
  /**
   * 只对 tree-config 有效，获取行的父级
   */
  getParentRow(rowOrRowid: any): DT | null
  /**
   * 根据行的唯一主键获取行
   * @param rowid 行主键
   */
  getRowById(rowid: string | number): DT | null
  /**
   * 根据行获取行的唯一主键
   * @param row 行对象
   */
  getRowid(row: any): string
  /**
   * 获取当前表格的数据
   * 完整的全量表体数据、处理条件之后的全量表体数据、当前渲染中的表体数据、当前渲染中的表尾数据
   */
  getTableData(): {
    fullData: DT[]
    visibleData: DT[]
    tableData: DT[]
    footerData: DT[][]
  }
  /**
   * 设置指定列为固定列
   * @param columnOrField 列对象或字段名
   */
  setColumnFixed(fieldOrColumn: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo<any>, fixed: VxeColumnPropTypes.Fixed): Promise<void>
  /**
   * 取消指定的固定列
   * @param columnOrField 列对象或字段名
   */
  clearColumnFixed(fieldOrColumn: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo<any>): Promise<void>
  /**
   * 隐藏指定列
   * @param columnOrField 列对象或字段名
   */
  hideColumn(fieldOrColumn: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo<any>): Promise<void>
  /**
   * 显示指定列
   * @param columnOrField 列对象或字段名
   */
  showColumn(fieldOrColumn: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo<any>): Promise<void>
  /**
   * 设置列宽
   * @param fieldOrColumn 列对象或字段名
   * @param width 宽度 %，px
   */
  setColumnWidth(fieldOrColumn: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo<any>, width: number | string): Promise<void>
  /**
   * 获取列宽
   * @param fieldOrColumn 列对象或字段名
   */
  getColumnWidth(fieldOrColumn: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo<any>): number;
  /**
   * 手动重置列的显示隐藏、列宽拖动的状态；如果为 true 则重置所有状态
   * 如果已关联工具栏，则会同步更新
   * @param options 可选参数
   */
  resetColumn(options?: boolean | {
    visible?: boolean
    resizable?: boolean
    fixed?: boolean
    order?: boolean
  }): Promise<void>
  /**
   * 刷新列配置
   * 对于动态修改属性、显示/隐藏列等场景下可能会用到
   */
  refreshColumn(): Promise<void>
  /**
   * 刷新滚动操作，手动同步滚动相关位置
   * 对于某些特殊的操作，比如滚动条错位、固定列不同步
   */
  refreshScroll(): Promise<void>
  /**
   * 重新计算表格，如果传 true 则进行完整计算
   * 对于某些特殊场景可能会用到，比如隐藏的表格、重新计算列宽...等
   */
  recalculate(refull?: boolean): Promise<void>
  /**
   * 打开 tooltip 提示
   * @param target 目标元素
   * @param content 内容
   */
  openTooltip(target: HTMLElement, content: string | number): Promise<any>
  /**
   * 关闭 tooltip 提示
   */
  closeTooltip(): Promise<any>
  /**
   * 用于 type=checkbox，设置行为选中状态，第二个参数为选中与否
   * @param rows 指定行
   * @param checked 是否选中
   */
  setCheckboxRow(rows: any | any[], checked: boolean): Promise<any>
  /**
   * 用于 type=checkbox，判断列头复选框是否被选中
   */
  isAllCheckboxChecked(): boolean
  /**
   * 用于 type=checkbox，判断列头复选框是否被半选
   */
  isAllCheckboxIndeterminate(): boolean
  /**
   * 用于 type=checkbox，判断复选行数据是否勾选
   * @param row 指定行
   */
  isCheckedByCheckboxRow(row: any): boolean
  /**
   * 用于 type=checkbox，判断复选行数据是否半选
   * @param row 指定行
   */
  isIndeterminateByCheckboxRow(row: any): boolean
  /**
   * 用于 type=checkbox，切换某一行的选中状态
   * @param row 指定行
   */
  toggleCheckboxRow(row: any): Promise<any>
  /**
   * 用于 type=checkbox，设置所有行的选中状态
   * @param checked 是否选中
   */
  setAllCheckboxRow(checked: boolean): Promise<any>
  /**
   * 用于 radio-config.reserve，获取已保留选中的行数据
   */
  getRadioReserveRecord(isFull?: boolean): any[]
  /**
   * 用于 radio-config.reserve，手动清空用户保留选中的行数据
   */
  clearRadioReserve(): Promise<any>
  /**
   * 用于 checkbox-config.reserve，获取已保留选中的行数据
   */
  getCheckboxReserveRecords(isFull?: boolean): any[]
  /**
   * 用于 type=checkbox，获取半选状态的行数据
   */
  getCheckboxIndeterminateRecords(isFull?: boolean): any[]
  /**
   * 用于 checkbox-config.reserve，手动清空用户保留选中的行数据
   */
  clearCheckboxReserve(): Promise<any>
  /**
   * 用于 type=checkbox，切换所有行的选中状态
   */
  toggleAllCheckboxRow(): Promise<any>
  /**
   * 用于 type=checkbox，手动清空用户的选择
   */
  clearCheckboxRow(): Promise<any>
  /**
   * 用于 row-config.isCurrent，设置某一行为高亮状态
   * @param row 指定行
   */
  setCurrentRow(row: any): Promise<any>
  /**
   * 用于 type=radio，判断单选行数据是否勾选
   * @param row 指定行
   */
  isCheckedByRadioRow(row: any): boolean
  /**
   * 用于 type=radio，设置某一行为选中状态
   * @param row 指定行
   */
  setRadioRow(row: any): Promise<any>
  /**
   * 手动清除临时合并的单元格
   */
  clearMergeCells(): Promise<any>
  /**
   * 手动清除临时合并的表尾
   */
  clearMergeFooterItems(): Promise<any>
  /**
   * 用于 row-config.isCurrent，手动清空当前高亮的状态
   */
  clearCurrentRow(): Promise<any>
  /**
   * 用于 type=radio，手动清空用户的选择
   */
  clearRadioRow(): Promise<any>
  /**
   * 获取临时合并的单元格
   */
  getMergeCells(): VxeTableDefines.MergeInfo[]
  /**
   * 获取临时合并的表尾
   */
  getMergeFooterItems(): VxeTableDefines.MergeInfo[]
  /**
   * 用于 column-config.isCurrent，获取当前列
   */
  getCurrentColumn(): VxeTableDefines.ColumnInfo<DT> | null
  /**
   * 用于 row-config.isCurrent，获取当前行的行数据
   */
  getCurrentRecord(): DT | null
  /**
   * 用于 type=radio，获取当已选中的行数据
   */
  getRadioRecord(isFull?: boolean): DT | null
  /**
   * 用于 column-config.isCurrent，设置某列行为高亮状态
   * @param columnOrField 列对象或字段名
   */
  setCurrentColumn(fieldOrColumn: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo<any>): Promise<void>
  /**
   * 用于 column-config.isCurrent，手动清空当前高亮的状态
   */
  clearCurrentColumn(): Promise<void>
  /**
   * 手动对表格进行排序
   * @param sortConfs 字段名、多列排序
   * @param order 排序方式
   */
  sort(field: string, order?: VxeTablePropTypes.SortOrder): Promise<void>
  sort(sortConfs: VxeTableDefines.SortConfs, order?: VxeTablePropTypes.SortOrder): Promise<void>
  sort(sortConfs: VxeTableDefines.SortConfs[], order?: VxeTablePropTypes.SortOrder): Promise<void>
  /**
   * 手动清空排序条件，数据会恢复成未排序的状态
   * @param columnOrField 列对象或字段名
   */
  clearSort(fieldOrColumn?: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo<any> | null): Promise<void>
  /**
   * 判断指定列是否为排序状态，如果为空则判断所有列
   * @param columnOrField 列对象或字段名
   */
  isSort(fieldOrColumn: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo<any>): boolean
  /**
   * 获取当前排序的列信息
   */
  getSortColumns(): VxeTableDefines.SortCheckedParams[]
  /**
   * 手动关闭筛选面板
   */
  closeFilter(): Promise<any>
  /**
   * 已废弃，请使用 isActiveFilterByColumn
   * @deprecated
   */
  isFilter(fieldOrColumn: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo<any>): boolean
  /**
   * 判断指定列是否为筛选状态，如果为空则判断所有列
   * @param columnOrField 列对象或字段名
   */
  isActiveFilterByColumn(fieldOrColumn: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo<any>): boolean
  /**
   * 用于 expand-config.lazy，用于懒加载展开行，判断展开行是否懒加载完成
   * @param row 指定行
   */
  isRowExpandLoaded(row: any): boolean
  /**
   * 用于 expand-config.lazy，手动清空懒加载展开行的状态，数据会恢复成未展开的状态，当再次展开时会重新加载
   */
  clearRowExpandLoaded(row: any): Promise<void>
  /**
   * 重新懒加载展开行，并展开内容
   * @param row 指定行
   */
  reloadRowExpand(row: any): Promise<void>
  /**
   * @deprecated 已废弃，请使用 reloadRowExpand
   */
  reloadExpandContent(row: any): Promise<void>
  /**
   * 用于 type=expand，切换展开行的状态
   * @param row 指定行
   */
  toggleRowExpand(row: any): Promise<void>
  /**
   * 用于 expand-config，设置所有行的展开与否
   * 如果是关闭所有行，可以使用 clearRowExpand 快速清除
   * @param checked 是否选中
   */
  setAllRowExpand(checked: boolean): Promise<void>
  /**
   * 用于 expand-config，设置展开行，二个参数设置这一行展开与否
   * @param rows 指定行
   * @param checked 是否选中
   */
  setRowExpand(rows: any | any[], checked: boolean): Promise<void>
  /**
   * 用于 expand-config，判断行是否为展开状态
   * @param row 指定行
   */
  isExpandByRow(row: any): boolean
  /**
   * 用于 type=expand，手动清空展开行状态，数据会恢复成未展开的状态
   */
  clearRowExpand(): Promise<void>
  /**
   * 用于 type=expand，手动清空用户保留行的展开状态
   */
  clearRowExpandReserve(): Promise<void>
  /**
   * 用于 expand-config，用于展开行，获取已展开的行数据
   */
  getRowExpandRecords(): DT[]
  /**
   * 用于 tree-config，用于树表格，获取已展开的节点
   * 注意，即使父节点被收起，只要该节点还处于展开状态都能获取到
   */
  getTreeExpandRecords(): DT[]
  /**
   * 用于 tree-config.lazy，用于懒加载树表格，判断树节点是否懒加载完成
   */
  isTreeExpandLoaded(row: any): boolean
  /**
   * 用于 tree-config.lazy，手动清空懒加载树节点的状态，数据会恢复成未展开的状态，当再次展开时会重新加载
   */
  clearTreeExpandLoaded(row: any): Promise<any>
  /**
   * 重新懒加载树节点，并展开该节点
   * @param rows 指定行
   */
  reloadTreeExpand(row: any): Promise<any>
  /**
   * @deprecated 已废弃，请使用 reloadTreeExpand
   */
  reloadTreeChilds(row: any): Promise<any>
  /**
   * 用于 tree-config，切换展开树形节点的状态
   * @param row 指定行
   */
  toggleTreeExpand(row: any): Promise<any>
  /**
   * 用于 tree-config，设置所有树节点的展开与否
   * 如果是关闭所有树节点，可以使用 clearTreeExpand 快速清除
   * @param checked 是否选中
   */
  setAllTreeExpand(checked: boolean): Promise<void>
  /**
   * 用于 tree-config，设置展开树形节点，二个参数设置这一行展开与否
   * @param rows 指定行
   * @param checked 是否选中
   */
  setTreeExpand(rows: any | any[], checked: boolean): Promise<void>
  /**
   * 用于 tree-config，判断行是否为树形节点展开状态
   * @param row 指定行
   */
  isTreeExpandByRow(row: any): boolean
  /**
   * 用于 tree-config，手动清空树形节点的展开状态，数据会恢复成未展开的状态
   */
  clearTreeExpand(): Promise<void>
  /**
   * 用于 tree-config.reserve，手动清空用户保留树节点的展开状态
   */
  clearTreeExpandReserve(): Promise<void>
  /**
   * 获取表格的滚动状态
   */
  getScroll(): {
    virtualX: boolean
    virtualY: boolean
    scrollTop: number
    scrollLeft: number
  }
  /**
   * 如果有滚动条，则滚动到对应的位置
   * @param scrollLeft 左边距离
   * @param scrollTop 顶部距离
   */
  scrollTo(scrollLeft: number | null, scrollTop?: number | null): Promise<void>
  /**
   * 如果有滚动条，则滚动到对应的行
   * @param row 指定行
   * @param columnOrField 列对象或字段名
   */
  scrollToRow(row: any, fieldOrColumn?: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo<any>): Promise<any>
  /**
   * 如果有滚动条，则滚动到对应的列
   * @param columnOrField 列对象或字段名
   */
  scrollToColumn(fieldOrColumn: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo<any>): Promise<any>
  /**
   * 手动清除滚动相关信息，还原到初始状态
   */
  clearScroll(): Promise<any>
  /**
   * 手动更新表尾
   */
  updateFooter(): Promise<any>
  /**
   * 更新单元格状态
   * @param params 插槽对象
   */
  updateStatus(
    params: {
      row: DT
      column: VxeTableDefines.ColumnInfo<DT>
    },
    cellValue?: any
  ): Promise<any>
  /**
   * 取消单元格的临时合并状态，如果为数组，则取消多个合并
   */
  removeMergeCells(merges: VxeTableDefines.MergeOptions<any> | VxeTableDefines.MergeOptions<any>[]): Promise<VxeTableDefines.MergeInfo[]>
  /**
   * 取消表尾的临时合并状态，如果为数组，则取消多个合并
   */
  removeMergeFooterItems(merges: VxeTableDefines.MergeOptions<any> | VxeTableDefines.MergeOptions<any>[]): Promise<VxeTableDefines.MergeInfo[]>
  /**
   * 临时合并单元格，如果为数组则合并多个
   */
  setMergeCells(merges: VxeTableDefines.MergeOptions<any> | VxeTableDefines.MergeOptions<any>[]): Promise<any>
  /**
   * 临时合并表尾，如果为数组则合并多个
   */
  setMergeFooterItems(merges: VxeTableDefines.MergeOptions<any> | VxeTableDefines.MergeOptions<any>[]): Promise<any>
  /**
   * 用于 mouse-config.area，更新已选区域的单元格样式
   */
  updateCellAreas(): Promise<void>
  /**
   * 连接工具栏
   * @param toolbar 工具栏组件实例
   */
  connect(toolbar: VxeToolbarConstructor | VxeToolbarInstance): Promise<void>
  /**
   * 使表格获取焦点
   */
  focus(): Promise<void>
  /**
   * 使表格失去焦点
   */
  blur(): Promise<void>
}

export interface VxeTableMethods<D = VxeTableDataRow> extends TableMethods<D> { }

export interface TablePrivateMethods<D = VxeTableDataRow> {
  getSetupOptions(): VXETableSetupOptions
  updateAfterDataIndex(): void
  callSlot<T>(slotFunc: ((params: T) => SlotVNodeType | SlotVNodeType[]) | string | null, params: T): SlotVNodeType[]
  getParentElem(): Element | null
  getParentHeight(): number
  getExcludeHeight(): number
  defineField(records: any[]): any[]
  handleTableData(force?: boolean): Promise<any>
  cacheRowMap(isSource?: boolean): void
  saveCustomResizable(isReset?: boolean): void
  saveCustomVisible(): void
  saveCustomFixed(): void
  analyColumnWidth(): void
  checkSelectionStatus(): void
  handleSelectRow(params: any, value: any, isForce?: boolean): void
  handleCustom(): Promise<void>
  handleUpdateDataQueue(): void
  handleRefreshColumnQueue(): void
  preventEvent(evnt: any, type: any, args?: any, next?: any, end?: any): any
  triggerHeaderHelpEvent(evnt: MouseEvent, params: VxeTableDefines.CellRenderHeaderParams<any>): void
  triggerHeaderTooltipEvent(evnt: MouseEvent, params: VxeTableDefines.CellRenderHeaderParams<any>): void
  triggerBodyTooltipEvent(evnt: MouseEvent, params: VxeTableDefines.CellRenderBodyParams<any>): void
  triggerFooterTooltipEvent(evnt: MouseEvent, params: VxeTableDefines.CellRenderFooterParams<any>): void
  handleTargetLeaveEvent(evnt: MouseEvent): void
  triggerHeaderCellClickEvent(evnt: MouseEvent, params: VxeTableDefines.CellRenderHeaderParams<any>): void
  triggerHeaderCellDblclickEvent(evnt: MouseEvent, params: VxeTableDefines.CellRenderHeaderParams<any>): void
  triggerCellClickEvent(evnt: MouseEvent, params: VxeTableDefines.CellRenderBodyParams<any>): void
  triggerCellDblclickEvent(evnt: MouseEvent, params: VxeTableDefines.CellRenderBodyParams<any>): void
  handleToggleCheckRowEvent(evnt: Event | null, params: { row: any }): void
  triggerCheckRowEvent(evnt: Event, params: { row: any }, value: boolean): void
  triggerCheckAllEvent(evnt: MouseEvent | null, value: boolean): void
  triggerRadioRowEvent(evnt: Event, params: { row: any }): void
  triggerCurrentRowEvent(evnt: Event, params: {
    $table: VxeTableConstructor<any> & VxeTablePrivateMethods<any>
    row: any
    rowIndex: number
    $rowIndex: number
  }): void
  triggerRowExpandEvent(evnt: Event, params: VxeTableDefines.CellRenderBodyParams<any>): void
  triggerTreeExpandEvent(evnt: Event, params: VxeTableDefines.CellRenderBodyParams<any>): void
  triggerSortEvent(evnt: Event, column: VxeTableDefines.ColumnInfo<any>, order: VxeTablePropTypes.SortOrder): void
  triggerScrollXEvent(evnt: Event): void
  triggerScrollYEvent(evnt: Event): void
  scrollToTreeRow(row: any): Promise<any>
  updateScrollYStatus(fullData?: any[]): boolean
  updateScrollXSpace(): void
  updateScrollYSpace(): void
  updateScrollXData(): void
  updateScrollYData(): void
  checkScrolling(): void
  updateZindex(): void
  handleCheckedCheckboxRow(rows: any, value: boolean, isForce?: boolean): Promise<any>
  triggerHoverEvent(evnt: any, params: any): void
  setHoverRow(row: any): void
  clearHoverRow(): void
  getCell(row: any, column: VxeTableDefines.ColumnInfo<any>): HTMLTableDataCellElement | null
  getCellLabel(row: any, column: VxeTableDefines.ColumnInfo<any>): any
  findRowIndexOf(list: any[], row: any): number
  eqRow(row1: any, row2: any): boolean
}

export interface VxeTablePrivateMethods<D = VxeTableDataRow> extends TablePrivateMethods<D> { }

export interface TableReactData<D = VxeTableDataRow> {
  // 低性能的静态列
  staticColumns: any[]
  // 渲染的列分组
  tableGroupColumn: any[]
  // 可视区渲染的列
  tableColumn: any[]
  // 渲染中的数据
  tableData: D[]
  // 是否启用了横向 X 可视渲染方式加载
  scrollXLoad: boolean
  // 是否启用了纵向 Y 可视渲染方式加载
  scrollYLoad: boolean
  // 是否存在纵向滚动条
  overflowY: boolean
  // 是否存在横向滚动条
  overflowX: boolean
  // 纵向滚动条的宽度
  scrollbarWidth: number
  // 横向滚动条的高度
  scrollbarHeight: number
  // 行高
  rowHeight: number
  // 表格父容器的高度
  parentHeight: number
  // 是否使用分组表头
  isGroup: boolean
  isAllOverflow: boolean
  // 复选框属性，是否全选
  isAllSelected: boolean
  // 复选框属性，有选中且非全选状态
  isIndeterminate: boolean
  // 复选框属性，已选中的行
  selection: D[]
  // 当前行
  currentRow: D | null
  // 单选框属性，选中列
  currentColumn: any
  // 单选框属性，选中行
  selectRow: D | null
  // 表尾合计数据
  footerTableData: any[][]
  // 展开列信息
  expandColumn: any
  hasFixedColumn: boolean
  // 树节点列信息
  treeNodeColumn: any
  // 已展开的行
  rowExpandeds: D[]
  // 懒加载中的展开行的列表
  expandLazyLoadeds: D[]
  // 已展开树节点
  treeExpandeds: D[]
  // 懒加载中的树节点的列表
  treeLazyLoadeds: D[]
  // 树节点不确定状态的列表
  treeIndeterminates: D[]
  // 合并单元格的对象集
  mergeList: VxeTableDefines.MergeItem<D>[]
  // 合并表尾数据的对象集
  mergeFooterList: VxeTableDefines.MergeItem<D>[]
  // 刷新列标识，当列筛选被改变时，触发表格刷新数据
  upDataFlag: number
  // 刷新列标识，当列的特定属性被改变时，触发表格刷新列
  reColumnFlag: number
  // 初始化标识
  initStore: {
    filter: boolean
    import: boolean
    export: boolean
  },
  // 当前选中的筛选列
  filterStore: {
    isAllSelected: boolean
    isIndeterminate: boolean
    style: any
    options: any[]
    column: any
    multiple: boolean
    visible: boolean
    maxHeight: number | null
    [key: string]: any
  },
  // 存放列相关的信息
  columnStore: {
    leftList: VxeTableDefines.ColumnInfo<D>[]
    centerList: VxeTableDefines.ColumnInfo<D>[]
    rightList: VxeTableDefines.ColumnInfo<D>[]
    resizeList: VxeTableDefines.ColumnInfo<D>[]
    pxList: VxeTableDefines.ColumnInfo<D>[]
    pxMinList: VxeTableDefines.ColumnInfo<D>[]
    scaleList: VxeTableDefines.ColumnInfo<D>[]
    scaleMinList: VxeTableDefines.ColumnInfo<D>[]
    autoList: VxeTableDefines.ColumnInfo<D>[]
  },
  // 存放快捷菜单的信息
  ctxMenuStore: {
    selected: any
    visible: boolean
    showChild: boolean
    selectChild: any
    list: any[][]
    style: any
    [key: string]: any
  },
  // 存放可编辑相关信息
  editStore: {
    indexs: {
      columns: any[]
    },
    titles: {
      columns: any[]
    },
    // 选中源
    selected: {
      row: D | null
      column: any
      [key: string]: any
    },
    // 已复制源
    copyed: {
      cut: boolean
      rows: D[]
      columns: any[]
      [key: string]: any
    },
    // 激活
    actived: {
      row: D | null
      column: any
      [key: string]: any
    },
    insertList: D[]
    insertMaps: {
      [key: string]: any
    }
    removeList: D[]
    removeMaps: {
      [key: string]: any
    }
  },
  // 存放 tooltip 相关信息
  tooltipStore: {
    row: D | null
    column: any
    content: any
    visible: boolean,
    currOpts: any
  }
  // 存放数据校验相关信息
  validStore: {
    visible: boolean
    row: D | null
    column: any
    content: any
    rule: any
    isArrow: boolean
  },
  // 导入相关信息
  importStore: {
    inited: boolean
    file: any
    type: any
    modeList: any[]
    typeList: any[]
    filename: any
    visible: boolean
  },
  importParams: {
    mode: any
    types: any
    message: boolean
  },
  // 导出相关信息
  exportStore: {
    inited: boolean
    name: any
    modeList: any[]
    typeList: any[]
    columns: any[]
    isPrint: boolean
    hasFooter: boolean
    hasMerge: boolean
    hasTree: boolean
    hasColgroup: boolean
    visible: boolean
  },
  exportParams: {
    filename: any
    sheetName: any
    mode: any
    type: any
    isColgroup: boolean
    isMerge: boolean
    isAllExpand: boolean
    useStyle: boolean
    original: boolean
    message: boolean
    isHeader: boolean
    isFooter: boolean
  }
}

export interface TableInternalData<D = VxeTableDataRow> {
  tZindex: number
  elemStore: {
    [key: string]: Ref<HTMLElement> | null
  }
  // 存放横向 X 虚拟滚动相关的信息
  scrollXStore: {
    offsetSize: number
    visibleSize: number
    startIndex: number
    endIndex: number
  }
  // 存放纵向 Y 虚拟滚动相关信息
  scrollYStore: {
    adaptive?: boolean
    rowHeight: number
    offsetSize: number
    visibleSize: number
    startIndex: number
    endIndex: number
  }
  // 表格宽度
  tableWidth: number
  // 表格高度
  tableHeight: number
  // 表头高度
  headerHeight: number
  // 表尾高度
  footerHeight: number
  customHeight: number
  customMaxHeight: number
  // 当前 hover 行
  hoverRow: any
  // 最后滚动位置
  lastScrollLeft: number
  lastScrollTop: number
  lastScrollTime: number
  // 单选框属性，已选中保留的行
  radioReserveRow: any
  // 复选框属性，已选中保留的行
  checkboxReserveRowMap: any
  // 行数据，已展开保留的行
  rowExpandedReserveRowMap: any
  // 树结构数据，已展开保留的行
  treeExpandedReserveRowMap: any
  // 列表完整数据、条件处理后
  tableFullData: D[]
  afterFullData: D[]
  tableSynchData: D[]
  tableSourceData: D[]
  // 树的全量数据、条件处理后
  tableFullTreeData: D[]
  afterTreeFullData: D[]
  // 收集的列配置（带分组）
  collectColumn: VxeTableDefines.ColumnInfo<D>[],
  // 完整所有列（不带分组）
  tableFullColumn: VxeTableDefines.ColumnInfo<D>[]
  // 渲染所有列
  visibleColumn: VxeTableDefines.ColumnInfo<D>[]
  // 缓存数据集
  fullAllDataRowIdData: {
    [key: string]: {
      row: D
      rowid: string
      seq: string | number
      index: number
      $index: number
      _index: number
      items: any[]
      parent: any
      level: number
      treeLoaded?: boolean
      expandLoaded?: boolean
      formatData?: {
        [key: string]: {
          value: any
          label: any
        }
      }
    }
  }
  fullDataRowIdData: {
    [key: string]: {
      row: D
      rowid: string
      seq: string | number
      index: number
      $index: number
      _index: number
      items: any[]
      parent: any
      level: number
    }
  }
  fullColumnIdData: {
    [key: string]: {
      column: VxeTableDefines.ColumnInfo<D>
      colid: string
      index: number
      $index: number
      _index: number
      items: VxeTableDefines.ColumnInfo<D>[]
      parent: VxeTableDefines.ColumnInfo<D>
    }
  }
  fullColumnFieldData: {
    [key: string]: {
      column: VxeTableDefines.ColumnInfo<D>
      colid: string
      index: number
      items: VxeTableDefines.ColumnInfo<D>[]
      parent: VxeTableDefines.ColumnInfo<D>
    }
  }

  // 特殊标识
  inited: boolean
  tooltipTimeout: any
  initStatus: boolean
  isActivated: boolean

  // 内部属性
  _lastResizeTime?: any
  _isResize?: boolean
  _keyCtx?: any
  _lastCallTime?: any
  _importResolve?: ((...args: any[]) => any) | null
  _importReject?: ((...args: any[]) => any) | null
  _currFilterParams?: any
  _currMenuParams?: any
}

export namespace VxeTablePropTypes {
  export type Size = SizeType
  export type ID = string
  export type Data<T = any> = T[]
  export type Height = number | string
  export type MaxHeight = number | string
  export type Resizable = boolean
  export type Stripe = boolean
  export type Round = boolean
  export type Border = boolean | 'default' | 'full' | 'outer' | 'inner' | 'none' | ''
  export type Loading = boolean
  export type Align = 'left' | 'center' | 'right' | '' | null
  export type HeaderAlign = Align
  export type FooterAlign = Align
  export type ShowHeader = boolean
  export type HighlightCurrentRow = boolean
  export type HighlightHoverRow = boolean
  export type HighlightCurrentColumn = boolean
  export type HighlightHoverColumn = boolean
  export type HighlightCell = boolean
  export type ShowFooter = boolean

  export type FooterMethod<D = VxeTableDataRow> = (params: {
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    $grid: VxeGridConstructor<D> | null | undefined
    columns: VxeTableDefines.ColumnInfo<D>[]
    data: D[]
  }) => Array<string | number | null>[]

  export type RowClassName<D = VxeTableDataRow> = string | ((params: {
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    row: D
    rowIndex: number
    $rowIndex: number
    _rowIndex: number
  }) => void | null | string | { [key: string]: boolean })

  export type CellClassName<D = VxeTableDataRow> = string | ((params: {
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    row: D
    rowIndex: number
    $rowIndex: number
    _rowIndex: number
    column: VxeTableDefines.ColumnInfo<D>
    columnIndex: number
    $columnIndex: number
    _columnIndex: number
  }) => void | null | string | { [key: string]: boolean })

  export type HeaderRowClassName<D = VxeTableDataRow> = string | ((params: {
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    $rowIndex: number
    fixed: VxeColumnPropTypes.Fixed
    type: string
  }) => void | null | string | { [key: string]: boolean })

  export type HeaderCellClassName<D = VxeTableDataRow> = string | ((params: {
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    $rowIndex: number
    column: VxeTableDefines.ColumnInfo<D>
    fixed: VxeColumnPropTypes.Fixed
    type: string
  }) => void | null | string | { [key: string]: boolean })

  export type FooterRowClassName<D = VxeTableDataRow> = string | ((params: {
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    $rowIndex: number
    _rowIndex: number
    fixed: VxeColumnPropTypes.Fixed
    type: string
  }) => void | null | string | { [key: string]: boolean })

  export type FooterCellClassName<D = VxeTableDataRow> = string | ((params: {
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    $rowIndex: number
    _rowIndex: number
    column: VxeTableDefines.ColumnInfo<D>
    columnIndex: number
    $columnIndex: number
    _columnIndex: number
  }) => void | null | string | { [key: string]: boolean })

  export type CellStyle<D = VxeTableDataRow> = VNodeStyle | ((params: {
    row: D
    rowIndex: number
    $rowIndex: number
    _rowIndex: number
    column: VxeTableDefines.ColumnInfo<D>
    columnIndex: number
    $columnIndex: number
    _columnIndex: number
  }) => void | null | VNodeStyle)

  export type HeaderCellStyle<D = VxeTableDataRow> = VNodeStyle | ((params: {
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    $rowIndex: number
    column: VxeTableDefines.ColumnInfo<D>
    columnIndex: number
    _columnIndex: number
  }) => void | null | VNodeStyle)

  export type FooterCellStyle<D = VxeTableDataRow> = VNodeStyle | ((params: {
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    $rowIndex: number
    column: VxeTableDefines.ColumnInfo<D>
    columnIndex: number
    $columnIndex: number
    _columnIndex: number
  }) => void | null | VNodeStyle)

  export type RowStyle<D = VxeTableDataRow> = VNodeStyle | ((params: {
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    row: D
    rowIndex: number
    $rowIndex: number
    _rowIndex: number
  }) => void | null | VNodeStyle)

  export type HeaderRowStyle<D = VxeTableDataRow> = VNodeStyle | ((params: {
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    $rowIndex: number
    fixed: VxeColumnPropTypes.Fixed
    type: string
  }) => void | null | VNodeStyle)

  export type FooterRowStyle<D = VxeTableDataRow> = VNodeStyle | ((params: {
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    $rowIndex: number
    _rowIndex: number
    fixed: VxeColumnPropTypes.Fixed
    type: string
  }) => void | null | VNodeStyle)

  export type MergeCell<D = VxeTableDataRow> = VxeTableDefines.MergeOptions<D>
  export type MergeCells<D = VxeTableDataRow> = MergeCell<D>[]
  export type MergeFooterItem<D = VxeTableDataRow> = VxeTableDefines.MergeOptions<D>
  export type MergeFooterItems<D = VxeTableDataRow> = MergeFooterItem<D>[]

  export type SpanMethod<D = VxeTableDataRow> = (params: {
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    column: VxeTableDefines.ColumnInfo<D>
    columnIndex: number
    $columnIndex: number
    row: D
    rowIndex: number
    $rowIndex: number
    _rowIndex: number
    isHidden: boolean
    fixed: VxeColumnPropTypes.Fixed
    type: string
    visibleData: D[]
  }) => void | { rowspan: number, colspan: number }

  export type FooterSpanMethod<D = VxeTableDataRow> = (params: {
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    column: VxeTableDefines.ColumnInfo<D>
    columnIndex: number
    _columnIndex: number
    $columnIndex: number
    $rowIndex: number
    _rowIndex: number
    items: any[]
    data: D[][]
  }) => void | { rowspan: number, colspan: number }

  export type ShowOverflow = boolean | 'ellipsis' | 'title' | 'tooltip' | '' | null
  export type ShowHeaderOverflow = ShowOverflow
  export type ShowFooterOverflow = ShowOverflow
  export type ColumnKey = boolean
  export type RowKey = boolean
  export type RowId = string
  export type KeepSource = boolean
  export type AutoResize = boolean
  export type SyncResize = boolean | string | number

  /**
   * 响应式布局配置项
   */
  export interface ResizeConfig {
    refreshDelay?: number
  }
  export interface ResizeOpts extends ResizeConfig { }

  /**
   * 列配置信息
   */
  export interface ColumnConfig {
    useKey?: boolean
    isCurrent?: boolean
    isHover?: boolean
    resizable?: VxeColumnPropTypes.Resizable
    width?: VxeColumnPropTypes.Width
    minWidth?: VxeColumnPropTypes.MinWidth
    maxWidth?: VxeColumnPropTypes.MaxWidth
  }
  export interface ColumnOpts extends ColumnConfig { }

  /**
   * 行配置信息
   */
  export interface RowConfig {
    useKey?: boolean
    keyField?: string
    isCurrent?: boolean
    isHover?: boolean
    height?: number
  }
  export interface RowOpts extends RowConfig { }

  /**
   * 自定义列配置项
   */
  export interface CustomConfig<D = VxeTableDataRow> {
    storage?: boolean | {
      visible?: boolean
      resizable?: boolean
      fixed?: boolean
      order?: boolean
    }
    checkMethod?(params: {
      column: VxeTableDefines.ColumnInfo<D>
    }): boolean
  }
  export interface CustomOpts<D = VxeTableDataRow> extends CustomConfig<D> { }

  /**
   * 列调整配置项
   */
  export interface ResizableConfig<D = VxeTableDataRow> {
    minWidth?: number | string | ((params: {
      $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
      column: VxeTableDefines.ColumnInfo<D>
      columnIndex: number
      $columnIndex: number
      $rowIndex: number
      cell: HTMLElement
    }) => number | string)
    maxWidth?: number | string | ((params: {
      $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
      column: VxeTableDefines.ColumnInfo<D>
      columnIndex: number
      $columnIndex: number
      $rowIndex: number
      cell: HTMLElement
    }) => number | string)
  }
  export interface ResizableOpts<D = VxeTableDataRow> extends ResizableConfig<D> { }

  /**
   * 序号配置项
   */
  export interface SeqConfig<D = VxeTableDataRow> {
    startIndex?: number
    seqMethod?(params: {
      column: VxeTableDefines.ColumnInfo<D>
      columnIndex: number
      $columnIndex: number
      row: D
      rowIndex: number
      $rowIndex: number
    }): number | string
  }
  export interface SeqOpts<D = VxeTableDataRow> extends SeqConfig<D> { }

  interface SortConfigDefaultSort {
    field: string
    order: SortOrder
  }

  /**
   * 排序配置项
   */
  export interface SortConfig<D = VxeTableDataRow> {
    defaultSort?: SortConfigDefaultSort | SortConfigDefaultSort[]
    orders?: SortOrder[]
    sortMethod?(params: {
      $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
      data: D[]
      sortList: VxeTableDefines.SortCheckedParams[]
    }): any[]
    remote?: boolean
    multiple?: boolean
    chronological?: boolean
    trigger?: 'default' | 'cell'
    showIcon?: boolean
    iconAsc?: string
    iconDesc?: string
  }
  export type SortOrder = 'asc' | 'desc' | '' | null
  export interface SortOpts<D = VxeTableDataRow> extends SortConfig<D> {
    orders: SortOrder[]
  }

  /**
   * 筛选配置项
   */
  export interface FilterConfig<D = VxeTableDataRow> {
    filterMethod?:(params: {
      options: VxeTableDefines.FilterOption[]
      values: any[]
      cellValue: any
      row: D
      column: VxeTableDefines.ColumnInfo<D>
    }) => any
    remote?: boolean
    showIcon?: boolean
    iconNone?: string
    iconMatch?: string
  }
  export interface FilterOpts<D = VxeTableDataRow> extends FilterConfig<D> { }

  /**
   * 单选框配置
   */
  export interface RadioConfig<D = VxeTableDataRow> {
    reserve?: boolean
    labelField?: string
    checkRowKey?: string | number
    checkMethod?(params: {
      row: D
    }): boolean
    visibleMethod?(params: {
      row: D
    }): boolean
    trigger?: 'default' | 'cell' | 'row' | '' | null
    highlight?: boolean
    strict?: boolean
  }
  export interface RadioOpts<D = VxeTableDataRow> extends RadioConfig<D> { }

  /**
   * 复选框配置项
   */
  export interface CheckboxConfig<D = VxeTableDataRow> {
    reserve?: boolean
    labelField?: string
    checkField?: string
    halfField?: string
    showHeader?: boolean
    checkAll?: boolean
    checkRowKeys?: string[] | number[]
    checkStrictly?: boolean
    strict?: boolean
    checkMethod?(params: {
      row: D
    }): boolean
    visibleMethod?(params: {
      row: D
    }): boolean
    trigger?: 'default' | 'cell' | 'row' | '' | null
    highlight?: boolean
    range?: boolean
  }
  export interface CheckboxOpts<D = VxeTableDataRow> extends CheckboxConfig<D> { }

  /**
   * 提示信息配置项
   */
  export interface TooltipConfig<D = VxeTableDataRow> {
    showAll?: boolean
    theme?: 'dark' | 'light' | '' | null
    enterable?: boolean
    enterDelay?: number
    leaveDelay?: number
    contentMethod?(params: {
      items: any[]
      row: D
      rowIndex: number
      $rowIndex: number
      _rowIndex: number
      column: VxeTableDefines.ColumnInfo<D>
      columnIndex: number
      $columnIndex: number
      _columnIndex: number
      type: 'header' | 'body' | 'footer' | '' | null
      cell: HTMLElement
      $event: any
    }): string | null | void
  }
  export interface TooltipOpts<D = VxeTableDataRow> extends TooltipConfig<D> { }

  /**
   * 展开行配置项
   */
  export interface ExpandConfig<D = VxeTableDataRow> {
    labelField?: string
    expandAll?: boolean
    expandRowKeys?: string[] | number[]
    accordion?: boolean
    trigger?: 'default' | 'cell' | 'row' | '' | null
    lazy?: boolean
    reserve?: boolean
    height?: number
    loadMethod?(params: {
      $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
      row: D
      rowIndex: number
      $rowIndex: number
    }): Promise<void>
    toggleMethod?(params: {
      $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
      expanded: boolean
      row: D
      rowIndex: number
      $rowIndex: number
      column: VxeTableDefines.ColumnInfo<D>
      columnIndex: number
      $columnIndex: number
    }): boolean
    visibleMethod?(params: VxeTableDefines.CellRenderBodyParams<D>): boolean
    showIcon?: boolean
    iconOpen?: string
    iconClose?: string
    iconLoaded?: string
  }
  export interface ExpandOpts<D = VxeTableDataRow> extends ExpandConfig<D> { }

  /**
   * 树形结构配置项
   */
  export interface TreeConfig<D = VxeTableDataRow> {
    transform?: boolean
    rowField?: string
    parentField?: string
    children?: string
    mapChildren?: string
    indent?: number
    line?: boolean
    expandAll?: boolean
    expandRowKeys?: string[] | number[]
    accordion?: boolean
    trigger?: 'default' | 'cell' | 'row' | '' | null
    lazy?: boolean
    hasChild?: string
    reserve?: boolean
    loadMethod?(params: {
      $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
      row: D
    }): Promise<any[]>
    toggleMethod?(params: {
      $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
      expanded: boolean
      row: D
      column: VxeTableDefines.ColumnInfo<D>
      columnIndex: number
      $columnIndex: number
    }): boolean
    showIcon?: boolean
    iconOpen?: string
    iconClose?: string
    iconLoaded?: string
  }
  export interface TreeOpts<D = VxeTableDataRow> extends TreeConfig<D> {
    rowField: string
    parentField: string
    children: string
    indent: number
    hasChild: string
    mapChildren: string
    iconOpen: string
    iconClose: string
    iconLoaded: string
  }

  /**
   * 快捷菜单配置项
   */
  export interface MenuConfig<D = VxeTableDataRow> {
    header?: VxeTableDefines.MenuOptions
    body?: VxeTableDefines.MenuOptions
    footer?: VxeTableDefines.MenuOptions
    trigger?: 'default' | 'cell' | '' | null
    className?: string
    visibleMethod?(params: {
      type: string
      options: VxeTableDefines.MenuFirstOption[][]
      columns: VxeTableDefines.ColumnInfo<D>[]
      row?: D
      rowIndex?: number
      column?: VxeTableDefines.ColumnInfo<D>
      columnIndex?: number
    }): boolean
  }

  /**
   * 鼠标配置项
   */
  export interface MouseConfig {
    selected?: boolean
    /**
     * 如果功能被支持，则开启单元格区域选取功能，非连续的区域，按住 Ctrl 键，用鼠标逐一选取
     */
    area?: boolean
    /**
     * 只对 area 启用后有效，是否开启区域扩展选取功能，开启后可以通过鼠标左键按住区域内右下角扩展按钮，将区域横向或纵向扩大（支持扩大区域并复制值）
     */
    extension?: boolean
  }
  export interface MouseOpts extends MouseConfig { }

  /**
   * 区域配置项
   */
  export interface AreaConfig<D = VxeTableDataRow> {
    /**
     * 只对 mouse-config.area 启用后有效，启用多区域选取功能
     */
    multiple?: boolean
    /**
     * 只对 mouse-config.area 启用后有效，点击列头是否选取当前列的所有单元格
     */
    selectCellByHeader?: boolean
    /**
     * 只对 mouse-config.extension 启用后有效，将被选取区域的值复制到扩展区域中
     */
    extendByCopy?: boolean
    /**
     * 只对 mouse-config.extension 启用后有效，扩展区域时将自动识别数字规则进行计算
     */
    extendByCalc?: boolean
    /**
     * 只对 extendByCalc 启用后有效，重写单元格扩展区域计算值的方法
     * @param params
     */
    extendCalcMethod?(params: VxeTableProDefines.ExtendCellAreaCalcBaseParams<D>): any[][]
    /**
     * 只对 extendByCopy | extendByCalc 启用后有效，重写单元格扩展区域赋值的方法
     * @param params
     */
    extendSetMethod?(params: {
      cellValue: any
      row: D
      column: VxeTableDefines.ColumnInfo<D>
    } & VxeTableProDefines.ExtendCellAreaCalcBaseParams<D>): void
    /**
     * 只对 extendByCopy | extendByCalc 启用后有效，自定义单元格扩展区域赋值之前的方法，可以通过返回 false 阻止扩展行为
     * @param params
     */
    beforeExtendSetMethod?(params: VxeTableProDefines.ExtendCellAreaCalcBaseParams<D>): boolean
    /**
     * 只对 extendByCopy | extendByCalc 启用后有效，自定义单元格扩展区域赋值之后的方法
     * @param params
     */
    afterExtendSetMethod?(params: {
      extendValues: any[][]
    } & VxeTableProDefines.ExtendCellAreaCalcBaseParams<D>): boolean
  }
  export interface AreaOpts<D = VxeTableDataRow> extends AreaConfig<D> { }

  /**
   * 按键配置项
   */
  export interface KeyboardConfig<D = VxeTableDataRow> {
    /**
     * 是否开启非编辑状态下，上下左右移动功能
     */
    isArrow?: boolean
    /**
     * 是否开启Esc键退出编辑功能
     */
    isEsc?: boolean
    /**
     * 是否开启删除键功能
     */
    isDel?: boolean
    /**
     * 是否开启回车移动上下行移动
     */
    isEnter?: boolean
    /**
     * 如果功能被支持，用于 mouse-config.area，开启同时按住方向键以活动区域为起始，向指定方向延伸单元格区域
     */
    isShift?: boolean
    /**
     * 是否开启TAB键左右移动功能
     */
    isTab?: boolean
    /**
     * 是否开启单元格选择编辑
     */
    isEdit?: boolean
    /**
     * 用于 mouse-config.area，开启合并和取消合并功能
     */
    isMerge?: boolean
    /**
     * 用于 mouse-config.area，开启复制/剪贴/粘贴功能
     */
    isClip?: boolean
    /**
     * 如果功能被支持，用于 mouse-config.area，开启查找和替换功能
     */
    isFNR?: boolean
    /**
     * 用于 mouse-config.area & column.type=checkbox|radio，开启空格键切换复选框或单选框状态功能
     */
    isChecked?: boolean
    /**
     * 用于 mouse-config.area，是否将回车键行为改成 Tab 键行为
     */
    enterToTab?: boolean
    /**
     * 只对 isDel=true 有效，用于删除键清空单元格内容方法
     */
    delMethod?(params: {
      row: D
      rowIndex: number
      column: VxeTableDefines.ColumnInfo<D>
      columnIndex: number
      $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    }): void
    /**
     * 只对 isDel=true 有效，用于重写回退键清空单元格内容并激活为编辑状态方法
     */
    backMethod?(params: {
      row: D
      rowIndex: number
      column: VxeTableDefines.ColumnInfo<D>
      columnIndex: number
      $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    }): void
    /**
     * 只对 isEdit=true 有效，用于重写编辑单元格方法
     */
    editMethod?(params: {
      row: D
      rowIndex: number
      column: VxeTableDefines.ColumnInfo<D>
      columnIndex: number
      $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
      $grid: VxeGridConstructor<D> | null | undefined
    }): boolean
  }
  export interface KeyboardOpts<D = VxeTableDataRow> extends KeyboardConfig<D> { }

  /**
   * 复制/粘贴配置项
   */
  export interface ClipConfig<DT = VxeTableDataRow> {
    /**
     * 是否启用复制功能
     */
    isCopy?: boolean
    /**
     * 是否启用剪贴功能
     */
    isCut?: boolean
    /**
     * 是否启用粘贴功能
     */
    isPaste?: boolean
    /**
     * 是否填充粘贴，如果启用了，当被选取的粘贴单元格与粘贴单元格的行与列数量不匹配时，会将内容强制粘贴所选的单元格
     */
    isFillPaste?: boolean
    /**
     * 是否启用行自增，当粘贴的行数超出表格时自动插入新行
     */
    isRowIncrement?: boolean
    /**
     * 是否启用列自增，当粘贴的列数超出表格时自动插入新列（需要注意自增的列自字段是否定义，否则将无法响应）
     */
    isColumnIncrement?: boolean
    /**
     * 重写单元格复制取值的方法，将单元格复制到剪贴板
     */
    copyMethod?(params: {
      isCut: boolean
      row: DT
      column: VxeTableDefines.ColumnInfo<DT>
      cellValue: any
      $table: VxeTableConstructor<DT> & VxeTablePrivateMethods<DT>
      $grid: VxeGridConstructor<DT> | null | undefined
    }): string
    /**
     * 自定义单元格复制取值之前的方法，可以通过返回 false 阻止复制行为
     */
    beforeCopyMethod?(params: {
      isCut: boolean
      activeArea: VxeTableProDefines.MouseActiveCellArea
      targetAreas: VxeTableProDefines.CellAreaParams<DT>[]
      $table: VxeTableConstructor<DT> & VxeTablePrivateMethods<DT>
      $grid: VxeGridConstructor<DT> | null | undefined
    }): boolean
    /**
     * 自定义单元格复制到剪贴板之后的方法
     */
    afterCopyMethod?(params: {
      isCut: boolean
      targetAreas: VxeTableProDefines.CellAreaParams<DT>[]
      $table: VxeTableConstructor<DT> & VxeTablePrivateMethods<DT>
      $grid: VxeGridConstructor<DT> | null | undefined
    }): boolean
    /**
     * 重写单元格剪贴值清除的方法，将剪贴单元格的值清除
     */
    cutMethod?:(params: {
      row: DT,
      column: VxeTableDefines.ColumnInfo<DT>
      cellValue: any
      $table: VxeTableConstructor<DT> & VxeTablePrivateMethods<DT>
      $grid: VxeGridConstructor<DT> | null | undefined
    }) => void
    /**
     * 自定义单元格剪贴值清除之前的方法，可以通过返回 false 阻止清除行为
     */
    beforeCutMethod?:(params: {
      activeArea: VxeTableProDefines.MouseActiveCellArea
      cutAreas: VxeTableProDefines.CellAreaParams<DT>[]
      currentAreas: VxeTableProDefines.CellAreaParams<DT>[]
      $table: VxeTableConstructor<DT> & VxeTablePrivateMethods<DT>
      $grid: VxeGridConstructor<DT> | null | undefined
    }) => boolean
    /**
     * 自定义单元格剪贴值清除之后的方法
     */
    afterCutMethod?:(params: {
      cutAreas: VxeTableProDefines.CellAreaParams<DT>[]
      currentAreas: VxeTableProDefines.CellAreaParams<DT>[]
      $table: VxeTableConstructor<DT> & VxeTablePrivateMethods<DT>
      $grid: VxeGridConstructor<DT> | null | undefined
    }) => void
    /**
     * 重写单元格粘贴赋值的方法，从剪贴板赋值到单元格
     */
    pasteMethod?(params: {
      isCut: boolean
      row: DT,
      column: VxeTableDefines.ColumnInfo<DT>
      cellValue: any
      $table: VxeTableConstructor<DT> & VxeTablePrivateMethods<DT>
      $grid: VxeGridConstructor<DT> | null | undefined
    }): void
    /**
     * 自定义单元格粘贴赋值之前的方法，可以通过返回 false 阻止复制行为
     */
    beforePasteMethod?(params: {
      isCut: boolean
      activeArea: VxeTableProDefines.MouseActiveCellArea
      cutAreas: VxeTableProDefines.CellAreaParams<DT>[]
      currentAreas: VxeTableProDefines.CellAreaParams<DT>[]
      targetAreas: VxeTableProDefines.CellAreaParams<DT>[]
      cellValues: string[][]
      pasteCells: string[][]
      $table: VxeTableConstructor<DT> & VxeTablePrivateMethods<DT>
      $grid: VxeGridConstructor<DT> | null | undefined
    }): boolean
    /**
     * 自定义单元格粘贴赋值之后的方法
     */
    afterPasteMethod?(params: {
      isCut: boolean
      currentAreas: VxeTableProDefines.CellAreaParams<DT>[]
      cutAreas: VxeTableProDefines.CellAreaParams<DT>[]
      targetAreas: VxeTableProDefines.CellAreaParams<DT>[]
      cellValues: any[][]
      pasteCells: string[][]
      insertRows: DT[]
      insertColumns: VxeTableDefines.ColumnInfo<DT>[]
      $table: VxeTableConstructor<DT> & VxeTablePrivateMethods<DT>
      $grid: VxeGridConstructor<DT> | null | undefined
    }): boolean
    /**
     * 只对 isRowIncrement 有效，自定义创建自增行数据的方法
     */
    createRowsMethod?(params: {
      currentAreas: VxeTableProDefines.CellAreaParams<DT>[]
      targetAreas: VxeTableProDefines.CellAreaParams<DT>[]
      cellValues: any[][]
      pasteCells: string[][]
      insertRows: DT[]
      $table: VxeTableConstructor<DT> & VxeTablePrivateMethods<DT>
      $grid: VxeGridConstructor<DT> | null | undefined
    }): DT[]
    /**
     * 只对 isColumnIncrement 有效，自定义创建自增列配置的方法
     */
    createColumnsMethod?(params: {
      currentAreas: VxeTableProDefines.CellAreaParams<DT>[]
      targetAreas: VxeTableProDefines.CellAreaParams<DT>[]
      cellValues: any[][]
      pasteCells: string[][]
      insertColumns: VxeTableDefines.ColumnOptions[]
      $table: VxeTableConstructor<DT> & VxeTablePrivateMethods<DT>
      $grid: VxeGridConstructor<DT> | null | undefined
    }): VxeTableDefines.ColumnOptions<DT>[]
  }
  export interface ClipOpts<D = VxeTableDataRow> extends ClipConfig<D> { }

  /**
   * 查找/替换配置项
   */
  export interface FNRConfig<DT = VxeTableDataRow> {
    isFind?: boolean
    findMethod?(params: {
      cellValue: any
      isWhole: boolean
      isRE: boolean
      isSensitive: boolean
      findValue: string | null
      findRE: RegExp | null
    }): boolean
    beforeFindMethod?(params: {
      isAll: boolean
      findValue: string | null
      $table: VxeTableConstructor<DT> & VxeTablePrivateMethods<DT>
      $grid: VxeGridConstructor<DT> | null | undefined
    }): boolean
    afterFindMethod?(params: {
      isAll: boolean
      findValue: string | null
      result: VxeTableProDefines.FindAndReplaceResult[]
      $table: VxeTableConstructor<DT> & VxeTablePrivateMethods<DT>
      $grid: VxeGridConstructor<DT> | null | undefined
    }): void
    isReplace?: boolean
    replaceMethod?:(params: {
      row: DT
      column: VxeTableDefines.ColumnInfo<DT>
      cellValue: any
    }) => void
    beforeReplaceMethod?:(params: {
      isAll: boolean
      findValue: string | null
      replaceValue: string
      $table: VxeTableConstructor<DT> & VxeTablePrivateMethods<DT>
      $grid: VxeGridConstructor<DT> | null | undefined
    }) => boolean
    afterReplaceMethod?:(params: {
      isAll: boolean
      findValue: string | null
      replaceValue: string
      result: VxeTableProDefines.FindAndReplaceResult[]
      $table: VxeTableConstructor<DT> & VxeTablePrivateMethods<DT>
      $grid: VxeGridConstructor<DT> | null | undefined
    }) => void
  }
  export interface FNROpts<D = VxeTableDataRow> extends FNRConfig<D> { }

  /**
   * 编辑配置项
   */
  export interface EditConfig<DT = VxeTableDataRow> {
    trigger?: 'manual' | 'click' | 'dblclick' | '' | null
    enabled?: boolean
    mode?: string
    icon?: string
    showIcon?: boolean
    showStatus?: boolean
    showUpdateStatus?: boolean
    showInsertStatus?: boolean
    showAsterisk?: boolean
    autoClear?: boolean
    /**
     * 该方法的返回值用来决定该单元格是否允许编辑
     */
    beforeEditMethod?(params: {
      row: DT
      rowIndex: number
      column: VxeTableDefines.ColumnInfo<DT>
      columnIndex: number
      $table: VxeTableConstructor<DT> & VxeTablePrivateMethods<DT>
      $grid: VxeGridConstructor<DT> | null | undefined
    }): boolean
    /**
     * 请使用 beforeEditMethod
     * @deprecated
     */
    activeMethod?(params: {
      row: DT
      rowIndex: number
      column: VxeTableDefines.ColumnInfo<DT>
      columnIndex: number
      $table: VxeTableConstructor<DT> & VxeTablePrivateMethods<DT>
      $grid: VxeGridConstructor<DT> | null | undefined
    }): boolean
  }
  export interface EditOpts<D = VxeTableDataRow> extends EditConfig<D> { }

  /**
   * 校验配置项
   */
  export interface ValidConfig {
    autoPos?: boolean
    showMessage?: boolean
    /**
     * 不建议使用，后续废弃
     * @deprecated
     */
    message?: string
    maxWidth?: number
  }
  export interface ValidOpts extends ValidConfig { }

  /**
   * 校验规则配置项
   */
  export interface EditRules<D = VxeTableDataRow> {
    [field: string]: VxeTableDefines.ValidatorRule<D>[]
  }

  export type ZIndex = number
  export type EmptyText = string

  export interface LoadingConfig {
    icon?: string
    text?: string
  }
  export interface LoadingOpts extends LoadingConfig { }

  export interface EmptyRender extends VxeGlobalRendererHandles.RenderOptions { }
  export interface EmptyOpts extends EmptyRender { }

  export type Fit = boolean
  export type Animat = boolean
  export type DelayHover = number

  export interface ScrollX {
    gt?: number
    oSize?: number
    enabled?: boolean
    scrollToLeftOnChange?: boolean
  }
  export interface SXOpts extends ScrollX {
    gt: number
    oSize: number
  }

  export interface ScrollY {
    mode?: 'default' | 'wheel'
    gt?: number
    oSize?: number
    enabled?: boolean
    scrollToTopOnChange?: boolean
    /**
     * @deprecated 请使用 row-config.height
     */
    rHeight?: number
    adaptive?: boolean
  }
  export interface SYOpts extends ScrollY {
    gt: number
    oSize: number
  }

  export type Params = any
}

export type VxeTableProps<D = VxeTableDataRow> = {
  size?: VxeTablePropTypes.Size
  id?: VxeTablePropTypes.ID
  data?: VxeTablePropTypes.Data<D>
  height?: VxeTablePropTypes.Height
  maxHeight?: VxeTablePropTypes.MaxHeight
  /**
   * 不建议使用，被 column-config.resizable 替换
   * @deprecated
   */
  resizable?: VxeTablePropTypes.Resizable
  stripe?: VxeTablePropTypes.Stripe
  round?: VxeTablePropTypes.Round
  border?: VxeTablePropTypes.Border
  loading?: VxeTablePropTypes.Loading
  align?: VxeTablePropTypes.Align
  headerAlign?: VxeTablePropTypes.HeaderAlign
  footerAlign?: VxeTablePropTypes.FooterAlign
  showHeader?: VxeTablePropTypes.ShowHeader
  /**
   * 不建议使用，被 row-config.isCurrent 替换
   * @deprecated
   */
  highlightCurrentRow?: VxeTablePropTypes.HighlightCurrentRow
  /**
   * 不建议使用，被 row-config.isHover 替换
   * @deprecated
   */
  highlightHoverRow?: VxeTablePropTypes.HighlightHoverRow
  /**
   * 不建议使用，被 column-config.isCurrent 替换
   * @deprecated
   */
  highlightCurrentColumn?: VxeTablePropTypes.HighlightCurrentColumn
  /**
   * 不建议使用，被 column-config.isHover 替换
   * @deprecated
   */
  highlightHoverColumn?: VxeTablePropTypes.HighlightHoverColumn
  /**
   * 已废弃
   * @deprecated
   */
  highlightCell?: VxeTablePropTypes.HighlightCell
  showFooter?: VxeTablePropTypes.ShowFooter
  footerMethod?: VxeTablePropTypes.FooterMethod<D>
  rowClassName?: VxeTablePropTypes.RowClassName<D>
  cellClassName?: VxeTablePropTypes.CellClassName<D>
  headerRowClassName?: VxeTablePropTypes.HeaderRowClassName<D>
  headerCellClassName?: VxeTablePropTypes.HeaderCellClassName<D>
  footerRowClassName?: VxeTablePropTypes.FooterRowClassName<D>
  footerCellClassName?: VxeTablePropTypes.FooterCellClassName<D>
  cellStyle?: VxeTablePropTypes.CellStyle<D>
  rowStyle?: VxeTablePropTypes.RowStyle<D>
  headerCellStyle?: VxeTablePropTypes.HeaderCellStyle<D>
  headerRowStyle?: VxeTablePropTypes.HeaderRowStyle<D>
  footerRowStyle?: VxeTablePropTypes.FooterRowStyle<D>
  footerCellStyle?: VxeTablePropTypes.FooterCellStyle<D>
  mergeCells?: VxeTablePropTypes.MergeCells<D>
  mergeFooterItems?: VxeTablePropTypes.MergeFooterItems<D>
  spanMethod?: VxeTablePropTypes.SpanMethod<D>
  footerSpanMethod?: VxeTablePropTypes.FooterSpanMethod<D>
  showOverflow?: VxeTablePropTypes.ShowOverflow
  showHeaderOverflow?: VxeTablePropTypes.ShowHeaderOverflow
  showFooterOverflow?: VxeTablePropTypes.ShowFooterOverflow
  /**
   * 请使用 column-config.useKey
   * @deprecated
   */
  columnKey?: VxeTablePropTypes.ColumnKey
  /**
   * 请使用 row-config.useKey
   * @deprecated
   */
  rowKey?: VxeTablePropTypes.RowKey
  /**
   * 请使用 row-config.keyField
   * @deprecated
   */
  rowId?: VxeTablePropTypes.RowId
  keepSource?: VxeTablePropTypes.KeepSource
  autoResize?: VxeTablePropTypes.AutoResize
  syncResize?: VxeTablePropTypes.SyncResize
  columnConfig?: VxeTablePropTypes.ColumnConfig
  rowConfig?: VxeTablePropTypes.RowConfig
  customConfig?: VxeTablePropTypes.CustomConfig<D>
  resizeConfig?: VxeTablePropTypes.ResizeConfig
  resizableConfig?: VxeTablePropTypes.ResizableConfig<D>
  seqConfig?: VxeTablePropTypes.SeqConfig<D>
  sortConfig?: VxeTablePropTypes.SortConfig<D>
  filterConfig?: VxeTablePropTypes.FilterConfig<D>
  radioConfig?: VxeTablePropTypes.RadioConfig<D>
  checkboxConfig?: VxeTablePropTypes.CheckboxConfig<D>
  tooltipConfig?: VxeTablePropTypes.TooltipConfig<D>
  exportConfig?: VxeTablePropTypes.ExportConfig
  importConfig?: VxeTablePropTypes.ImportConfig
  printConfig?: VxeTablePropTypes.PrintConfig
  expandConfig?: VxeTablePropTypes.ExpandConfig<D>
  treeConfig?: VxeTablePropTypes.TreeConfig<D>
  menuConfig?: VxeTablePropTypes.MenuConfig<D>
  mouseConfig?: VxeTablePropTypes.MouseConfig
  areaConfig?: VxeTablePropTypes.AreaConfig<D>
  fnrConfig?: VxeTablePropTypes.FNRConfig<D>
  keyboardConfig?: VxeTablePropTypes.KeyboardConfig<D>
  clipConfig?: VxeTablePropTypes.ClipConfig<D>
  editConfig?: VxeTablePropTypes.EditConfig<D>
  validConfig?: VxeTablePropTypes.ValidConfig
  editRules?: VxeTablePropTypes.EditRules<D>
  emptyText?: VxeTablePropTypes.EmptyText
  emptyRender?: VxeTablePropTypes.EmptyRender
  loadingConfig?: VxeTablePropTypes.LoadingConfig
  /**
   * 不建议使用，已废弃
   * @deprecated
   */
  fit?: VxeTablePropTypes.Fit
  /**
   * 不建议使用，已废弃
   * @deprecated
   */
  animat?: VxeTablePropTypes.Animat
  /**
   * 不建议使用，已废弃
   * @deprecated
   */
  delayHover?: VxeTablePropTypes.DelayHover
  scrollX?: VxeTablePropTypes.ScrollX
  scrollY?: VxeTablePropTypes.ScrollY
  params?: VxeTablePropTypes.Params
}

export type VxeTableEmits = [
  'update:data',
  'keydown-start',
  'keydown',
  'keydown-end',
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
  'cell-selected',
  'header-cell-click',
  'header-cell-dblclick',
  'header-cell-menu',
  'footer-cell-click',
  'footer-cell-dblclick',
  'footer-cell-menu',
  'clear-merge',
  'sort-change',
  'clear-sort',
  'filter-change',
  'filter-visible',
  'clear-filter',
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
    field: string
    order?: VxeTablePropTypes.SortOrder
  }

  export interface MergeOptions<D = VxeTableDataRow> {
    row: any | number
    col: VxeTableDefines.ColumnInfo<D> | number
    rowspan: number
    colspan: number
  }

  export interface MergeInfo {
    row: number
    col: number
    rowspan: number
    colspan: number
  }

  export interface MergeItem<D = VxeTableDataRow> extends MergeInfo {
    _row: any
    _col: VxeTableDefines.ColumnInfo<D>
    _rowspan: number
    _colspan: number
  }

  export interface ColumnOptions<D = VxeTableDataRow> extends VxeColumnProps<D> {
    children?: ColumnOptions<D>[]
    slots?: VxeColumnPropTypes.Slots<D>
  }

  /**
   * 列对象
   */
  export class ColumnInfo<D = VxeTableDataRow> {
    /**
     * 该属性已废弃，该属性被 field 替换
     * @deprecated
     */
    property: VxeColumnPropTypes.Field

    /**
     * 公开属性
     */
    type: VxeColumnPropTypes.Type
    field: VxeColumnPropTypes.Field
    title: VxeColumnPropTypes.Title
    width: VxeColumnPropTypes.Width
    minWidth: VxeColumnPropTypes.MinWidth
    maxWidth: VxeColumnPropTypes.MaxWidth
    resizable: VxeColumnPropTypes.Resizable
    fixed: VxeColumnPropTypes.Fixed
    align: VxeColumnPropTypes.Align
    headerAlign: VxeColumnPropTypes.HeaderAlign
    footerAlign: VxeColumnPropTypes.FooterAlign
    showOverflow: VxeColumnPropTypes.ShowOverflow
    showHeaderOverflow: VxeColumnPropTypes.ShowHeaderOverflow
    showFooterOverflow: VxeColumnPropTypes.ShowFooterOverflow
    className: VxeColumnPropTypes.ClassName
    headerClassName: VxeColumnPropTypes.HeaderClassName
    footerClassName: VxeColumnPropTypes.FooterClassName
    formatter: VxeColumnPropTypes.Formatter<D>
    sortable: VxeColumnPropTypes.Sortable
    sortBy: VxeColumnPropTypes.SortBy
    sortType: VxeColumnPropTypes.SortType
    filters: VxeColumnPropTypes.Filter[]
    filterMultiple: VxeColumnPropTypes.FilterMultiple
    filterMethod: VxeColumnPropTypes.FilterMethod<D>
    filterRender: VxeColumnPropTypes.FilterRender
    treeNode: VxeColumnPropTypes.TreeNode
    visible: VxeColumnPropTypes.Visible
    exportMethod: VxeColumnPropTypes.ExportMethod<D>
    footerExportMethod: VxeColumnPropTypes.FooterExportMethod
    /**
     * 已废弃，请使用 titlePrefix
     * @deprecated
     */
    titleHelp: VxeColumnPropTypes.TitleHelp
    titlePrefix: VxeColumnPropTypes.TitlePrefix
    cellType: VxeColumnPropTypes.CellType
    cellRender: VxeColumnPropTypes.CellRender<D>
    editRender: VxeColumnPropTypes.EditRender
    contentRender: VxeColumnPropTypes.ContentRender
    params: VxeColumnPropTypes.Params
    slots: VxeColumnPropTypes.Slots<D>

    /**
     * 以下内部属性
     * 内部属性随时都会调整，不应该被使用
     */
    id: string
    parentId: string
    level: number
    rowSpan: number
    colSpan: number
    halfVisible: boolean
    defaultVisible: any
    defaultFixed: any
    checked: boolean
    halfChecked: boolean
    disabled: boolean
    order: VxeTablePropTypes.SortOrder
    sortTime: number
    renderWidth: number
    renderHeight: number
    resizeWidth: number
    model: {
      update: boolean
      value: any
    }

    children: ColumnInfo<D>[]

    renderHeader(params: CellRenderHeaderParams<D>): VNode[]
    renderCell(params: CellRenderCellParams<D>): VNode[]
    renderData(params: CellRenderDataParams<D>): VNode[]
    renderFooter(params: CellRenderFooterParams<D>): VNode[]

    getTitle(): string
    getKey(): string
  }

  export interface CellRenderHeaderParams<D = VxeTableDataRow> {
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    $grid: VxeGridConstructor<D> | null
    $rowIndex: number
    column: ColumnInfo<D>
    columnIndex: number
    $columnIndex: number
    _columnIndex: number
    fixed: VxeColumnPropTypes.Fixed
    type: string
    isHidden: boolean
    hasFilter: boolean
  }

  export interface CellRenderBodyParams<D = VxeTableDataRow> {
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    $grid: VxeGridConstructor<D> | null
    seq: string | number
    rowid: string
    row: D
    rowIndex: number
    $rowIndex: number
    _rowIndex: number
    column: ColumnInfo<D>
    columnIndex: number
    $columnIndex: number
    _columnIndex: number
    fixed: VxeColumnPropTypes.Fixed
    type: string
    isHidden: boolean
    level: number
    visibleData: D[]
    data: D[]
    items: any[]
  }

  export interface CellRenderDataParams<D = VxeTableDataRow> extends CellRenderBodyParams<D> { }
  export interface CellRenderCellParams<D = VxeTableDataRow> extends CellRenderBodyParams<D> { }

  export interface CellRenderFooterParams<D = VxeTableDataRow> {
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
    $grid: VxeGridConstructor<D> | null
    _rowIndex: number
    $rowIndex: number
    column: ColumnInfo<D>
    columnIndex: number
    $columnIndex: number
    _columnIndex: number
    itemIndex: number
    items: any[]
    fixed: VxeColumnPropTypes.Fixed
    type: string
    data: any[][]
  }

  interface TableEventParams<D = VxeTableDataRow> extends VxeEvent {
    $table: VxeTableConstructor<D> & VxeTablePrivateMethods<D>
  }

  interface TableBaseHeaderCellParams<D = VxeTableDataRow> {
    $rowIndex: number
    column: ColumnInfo<D>
    columnIndex: number
    $columnIndex: number
  }

  interface TableBaseCellParams<D = VxeTableDataRow> {
    row: D
    rowIndex: number
    $rowIndex: number
    column: ColumnInfo<D>
    columnIndex: number
    $columnIndex: number
  }

  interface TableBaseFooterCellParams<D = VxeTableDataRow> {
    $rowIndex: number
    column: ColumnInfo<D>
    columnIndex: number
    $columnIndex: number
  }

  export interface KeydownStartParams { }
  export interface KeydownStartEventParams<D = VxeTableDataRow> extends TableEventParams<D>, KeydownStartParams { }

  export interface KeydownParams { }
  export interface KeydownEventParams<D = VxeTableDataRow> extends TableEventParams<D>, KeydownParams { }

  export interface KeydownEndParams { }
  export interface KeydownEndEventParams<D = VxeTableDataRow> extends TableEventParams<D>, KeydownEndParams { }

  export interface PasteParams { }
  export interface PasteEventParams<D = VxeTableDataRow> extends TableEventParams<D>, PasteParams { }

  export interface CopyParams { }
  export interface CopyEventParams<D = VxeTableDataRow> extends TableEventParams<D>, CopyParams { }

  export interface CutParams { }
  export interface CutEventParams<D = VxeTableDataRow> extends TableEventParams<D>, CutParams { }

  export interface CurrentChangeParams<D = VxeTableDataRow> extends TableBaseCellParams<D> {
    newValue: any
    oldValue: any
  }
  export interface CurrentChangeEventParams<D = VxeTableDataRow> extends TableEventParams<D>, CurrentChangeParams<D> { }

  export interface RadioChangeParams<D = VxeTableDataRow> extends TableBaseCellParams<D> {
    newValue: any
    oldValue: any
  }
  export interface RadioChangeEventParams<D = VxeTableDataRow> extends TableEventParams<D>, RadioChangeParams<D> { }

  export interface CheckboxChangeParams<D = VxeTableDataRow> extends TableBaseCellParams<D> {
    checked: boolean
    /**
     * 请调用方法 getCheckboxRecords() 获取
     * @deprecated
     */
    records: D[]
    /**
     * 请调用方法 getCheckboxReserveRecords() 获取
     * @deprecated
     */
    reserves: D[]
    /**
     * 请调用方法 getCheckboxIndeterminateRecords() 获取
     * @deprecated
     */
    indeterminates: D[]
  }
  export interface CheckboxChangeEventParams<D = VxeTableDataRow> extends TableEventParams<D>, CheckboxChangeParams<D> { }

  export interface CheckboxAllParams<D = VxeTableDataRow> extends CheckboxChangeParams<D> { }
  export interface CheckboxAllEventParams<D = VxeTableDataRow> extends TableEventParams<D>, CheckboxAllParams<D> { }

  export interface CheckboxRangeStartParams<D = VxeTableDataRow> {
    /**
     * 请调用方法 getCheckboxRecords() 获取
     * @deprecated
     */
    records: D[]
    /**
     * 请调用方法 getCheckboxReserveRecords() 获取
     * @deprecated
     */
    reserves: D[]
  }
  export interface CheckboxRangeStartEventParams<D = VxeTableDataRow> extends TableEventParams<D>, CheckboxRangeStartParams<D> { }

  export interface CheckboxRangeChangeParams<D = VxeTableDataRow> extends CheckboxRangeStartParams<D> { }
  export interface CheckboxRangeChangeEventParams<D = VxeTableDataRow> extends TableEventParams<D>, CheckboxRangeChangeParams<D> { }

  export interface CheckboxRangeEndParams<D = VxeTableDataRow> extends CheckboxRangeStartParams<D> { }

  export interface CheckboxRangeEndEventParams<D = VxeTableDataRow> extends TableEventParams<D>, CheckboxRangeEndParams<D> { }

  export interface CellClickParams<D = VxeTableDataRow> extends TableBaseCellParams<D> {
    triggerRadio: boolean
    triggerCheckbox: boolean
    triggerTreeNode: boolean
    triggerExpandNode: boolean
  }
  export interface CellClickEventParams<D = VxeTableDataRow> extends TableEventParams<D>, CellClickParams<D> { }

  export interface CellDblclickParams<D = VxeTableDataRow> extends TableEventParams<D>, CellClickParams<D> { }
  export interface CellDblclickEventParams<D = VxeTableDataRow> extends TableEventParams<D>, CellDblclickParams<D> { }

  export interface CellMenuParams<D = VxeTableDataRow> extends TableBaseCellParams<D> { }
  export interface CellMenuEventParams<D = VxeTableDataRow> extends TableEventParams<D>, CellMenuParams<D> { }

  export interface CellMouseenterParams<D = VxeTableDataRow> extends TableBaseCellParams<D> { }
  export interface CellMouseenterEventParams<D = VxeTableDataRow> extends TableEventParams<D>, CellMouseenterParams<D> { }

  export interface CellMouseleaveParams<D = VxeTableDataRow> extends TableBaseCellParams<D> { }
  export interface CellMouseleaveEventParams<D = VxeTableDataRow> extends TableEventParams<D>, CellMouseleaveParams<D> { }

  export interface HeaderCellClickParams<D = VxeTableDataRow> extends TableBaseHeaderCellParams<D> {
    triggerResizable: boolean
    triggerSort: boolean
    triggerFilter: boolean
  }
  export interface HeaderCellClickEventParams<D = VxeTableDataRow> extends TableEventParams<D>, HeaderCellClickParams<D> { }

  export interface HeaderCellDblclickParams<D = VxeTableDataRow> extends TableBaseHeaderCellParams<D> { }
  export interface HeaderCellDblclickEventParams<D = VxeTableDataRow> extends TableEventParams<D>, HeaderCellDblclickParams<D> { }

  export interface HeaderCellMenuParams<D = VxeTableDataRow> extends TableBaseHeaderCellParams<D> { }
  export interface HeaderCellMenuEventParams<D = VxeTableDataRow> extends TableEventParams<D>, HeaderCellMenuParams<D> { }

  export interface FooterCellClickParams<D = VxeTableDataRow> extends TableBaseFooterCellParams<D> { }
  export interface FooterCellClickEventParams<D = VxeTableDataRow> extends TableEventParams<D>, FooterCellClickParams<D> { }

  export interface FooterCellDblclickParams<D = VxeTableDataRow> extends TableBaseFooterCellParams<D> { }
  export interface FooterCellDblclickEventParams<D = VxeTableDataRow> extends TableEventParams<D>, FooterCellDblclickParams<D> { }

  export interface FooterCellMenuParams<D = VxeTableDataRow> extends TableBaseFooterCellParams<D> { }
  export interface FooterCellMenuEventParams<D = VxeTableDataRow> extends TableEventParams<D>, FooterCellMenuParams<D> { }

  export interface SortCheckedParams<D = VxeTableDataRow> {
    column: VxeTableDefines.ColumnInfo<D>
    field: VxeColumnPropTypes.Field
    property: VxeColumnPropTypes.Field
    order: VxeTablePropTypes.SortOrder
    sortTime: number
  }
  export interface SortChangeParams<D = VxeTableDataRow> extends SortCheckedParams<D> {
    sortList: SortCheckedParams[]
  }
  export interface SortChangeEventParams<D = VxeTableDataRow> extends TableEventParams<D>, SortChangeParams<D> { }

  export interface FilterCheckedParams<D = VxeTableDataRow> {
    column: VxeTableDefines.ColumnInfo<D>
    field: VxeColumnPropTypes.Field
    property: VxeColumnPropTypes.Field
    values: any[]
    datas: any[]
  }
  export interface FilterChangeParams<D = VxeTableDataRow> extends FilterCheckedParams<D> {
    filterList: FilterCheckedParams<D>[]
  }
  export interface FilterChangeEventParams<D = VxeTableDataRow> extends TableEventParams<D>, FilterChangeParams<D> { }

  export interface FilterVisibleParams<D = VxeTableDataRow> {
    column: VxeTableDefines.ColumnInfo<D>
    field: VxeColumnPropTypes.Field
    property: VxeColumnPropTypes.Field
    filterList: FilterCheckedParams<D>[]
    visible: boolean
  }
  export interface FilterVisibleEventParams<D = VxeTableDataRow> extends TableEventParams<D>, FilterVisibleParams<D> { }

  export interface ResizableChangeParams<D = VxeTableDataRow> extends TableBaseHeaderCellParams<D> { }
  export interface ResizableChangeEventParams<D = VxeTableDataRow> extends TableEventParams<D>, ResizableChangeParams<D> {
    resizeWidth: number
  }

  export interface ToggleRowExpandParams<D = VxeTableDataRow> extends TableBaseCellParams<D> { }
  export interface ToggleRowExpandEventParams<D = VxeTableDataRow> extends TableEventParams<D>, ToggleRowExpandParams { }

  export interface ToggleTreeExpandParams<D = VxeTableDataRow> extends TableBaseCellParams<D> { }
  export interface ToggleTreeExpandEventParams<D = VxeTableDataRow> extends TableEventParams<D>, ToggleTreeExpandParams<D> { }

  export interface MenuClickParams<D = VxeTableDataRow> extends TableBaseCellParams<D> {
    menu: VxeTableDefines.MenuFirstOption | VxeTableDefines.MenuChildOption
    type: string
  }
  export interface MenuClickEventParams<D = VxeTableDataRow> extends TableEventParams<D>, MenuClickParams<D> { }

  export interface EditClosedParams<D = VxeTableDataRow> extends TableBaseCellParams<D> { }
  export interface EditClosedEventParams<D = VxeTableDataRow> extends TableEventParams<D>, EditClosedParams<D> { }

  export interface EditActivedParams<D = VxeTableDataRow> extends TableBaseCellParams<D> { }
  export interface EditActivedEventParams<D = VxeTableDataRow> extends TableEventParams<D>, EditActivedParams<D> { }

  export interface EditDisabledParams<D = VxeTableDataRow> extends TableBaseCellParams<D> { }
  export interface EditDisabledEventParams<D = VxeTableDataRow> extends TableEventParams<D>, EditDisabledParams<D> { }

  export interface ValidErrorParams<D = VxeTableDataRow> extends TableBaseCellParams<D> {
    rule: any
  }
  export interface ValidErrorEventParams<D = VxeTableDataRow> extends TableEventParams<D>, ValidErrorParams<D> { }

  export interface ScrollParams {
    type: string
    scrollTop: number
    scrollLeft: number
    scrollHeight: number
    scrollWidth: number
    bodyWidth: number
    bodyHeight: number
    isX: boolean
    isY: boolean
  }
  export interface ScrollEventParams<D = VxeTableDataRow> extends TableEventParams<D>, ScrollParams {
    target: HTMLDivElement
  }

  export interface CustomParams {
    type: string
  }
  export interface CustomEventParams<D = VxeTableDataRow> extends TableEventParams<D>, CustomParams { }
}

export interface VxeTableEventProps<D = VxeTableDataRow> {
  onKeydownStart?: VxeTableEvents.KeydownStart<D>
  onKeydown?: VxeTableEvents.Keydown<D>
  onKeydownEnd?: VxeTableEvents.KeydownEnd<D>
  onPaste?: VxeTableEvents.Paste<D>
  onCopy?: VxeTableEvents.Copy<D>
  onCut?: VxeTableEvents.Cut<D>
  onCurrentChange?: VxeTableEvents.CurrentChange<D>
  onRadioChange?: VxeTableEvents.RadioChange<D>
  onCheckboxChange?: VxeTableEvents.CheckboxChange<D>
  onCheckboxAll?: VxeTableEvents.CheckboxAll<D>
  onCheckboxRangeStart?: VxeTableEvents.CheckboxRangeStart<D>
  onCheckboxRangeChange?: VxeTableEvents.CheckboxRangeChange<D>
  onCheckboxRangeEnd?: VxeTableEvents.CheckboxRangeEnd<D>
  onCellClick?: VxeTableEvents.CellClick<D>
  onCellDblclick?: VxeTableEvents.CellDblclick<D>
  onCellMenu?: VxeTableEvents.CellMenu<D>
  onCellMouseenter?: VxeTableEvents.CellMouseenter<D>
  onCellMouseleave?: VxeTableEvents.CellMouseleave<D>
  onHeaderCellClick?: VxeTableEvents.HeaderCellClick<D>
  onHeaderCellDblclick?: VxeTableEvents.HeaderCellDblclick<D>
  onHeaderCellMenu?: VxeTableEvents.HeaderCellMenu<D>
  onFooterCellClick?: VxeTableEvents.FooterCellClick<D>
  onFooterCellDblclick?: VxeTableEvents.FooterCellDblclick<D>
  onFooterCellMenu?: VxeTableEvents.FooterCellMenu<D>
  onSortChange?: VxeTableEvents.SortChange<D>
  onFilterChange?: VxeTableEvents.FilterChange<D>
  onFilterVisible?: VxeTableEvents.FilterVisible<D>
  onResizableChange?: VxeTableEvents.ResizableChange<D>
  onToggleRowExpand?: VxeTableEvents.ToggleRowExpand<D>
  onToggleTreeExpand?: VxeTableEvents.ToggleTreeExpand<D>
  onMenuClick?: VxeTableEvents.MenuClick<D>
  onEditClosed?: VxeTableEvents.EditClosed<D>
  onEditActived?: VxeTableEvents.EditActived<D>
  onEditDisabled?: VxeTableEvents.EditDisabled<D>
  onValidError?: VxeTableEvents.ValidError<D>
  onScroll?: VxeTableEvents.Scroll<D>
  onCustom?: VxeTableEvents.Custom<D>
}

export interface VxeTableListeners<D = VxeTableDataRow> {
  keydownStart?: VxeTableEvents.KeydownStart<D>
  keydown?: VxeTableEvents.Keydown<D>
  keydownEnd?: VxeTableEvents.KeydownEnd<D>
  paste?: VxeTableEvents.Paste<D>
  copy?: VxeTableEvents.Copy<D>
  cut?: VxeTableEvents.Cut<D>
  currentChange?: VxeTableEvents.CurrentChange<D>
  radioChange?: VxeTableEvents.RadioChange<D>
  checkboxChange?: VxeTableEvents.CheckboxChange<D>
  checkboxAll?: VxeTableEvents.CheckboxAll<D>
  checkboxRangeStart?: VxeTableEvents.CheckboxRangeStart<D>
  checkboxRangeChange?: VxeTableEvents.CheckboxRangeChange<D>
  checkboxRangeEnd?: VxeTableEvents.CheckboxRangeEnd<D>
  cellClick?: VxeTableEvents.CellClick<D>
  cellDblclick?: VxeTableEvents.CellDblclick<D>
  cellMenu?: VxeTableEvents.CellMenu<D>
  cellMouseenter?: VxeTableEvents.CellMouseenter<D>
  cellMouseleave?: VxeTableEvents.CellMouseleave<D>
  headerCellClick?: VxeTableEvents.HeaderCellClick<D>
  headerCellDblclick?: VxeTableEvents.HeaderCellDblclick<D>
  headerCellMenu?: VxeTableEvents.HeaderCellMenu<D>
  footerCellClick?: VxeTableEvents.FooterCellClick<D>
  footerCellDblclick?: VxeTableEvents.FooterCellDblclick<D>
  footerCellMenu?: VxeTableEvents.FooterCellMenu<D>
  sortChange?: VxeTableEvents.SortChange<D>
  filterChange?: VxeTableEvents.FilterChange<D>
  resizableChange?: VxeTableEvents.ResizableChange<D>
  toggleRowExpand?: VxeTableEvents.ToggleRowExpand<D>
  toggleTreeExpand?: VxeTableEvents.ToggleTreeExpand<D>
  menuClick?: VxeTableEvents.MenuClick<D>
  editClosed?: VxeTableEvents.EditClosed<D>
  editActived?: VxeTableEvents.EditActived<D>
  editDisabled?: VxeTableEvents.EditDisabled<D>
  validError?: VxeTableEvents.ValidError<D>
  scroll?: VxeTableEvents.Scroll<D>
  custom?: VxeTableEvents.Custom<D>
}

export namespace VxeTableEvents {
  export type KeydownStart<D = any> = (params: VxeTableDefines.KeydownStartEventParams<D>) => void
  export type Keydown<D = any> = (params: VxeTableDefines.KeydownEventParams<D>) => void
  export type KeydownEnd<D = any> = (params: VxeTableDefines.KeydownEndEventParams<D>) => void
  export type Paste<D = any> = (params: VxeTableDefines.PasteEventParams<D>) => void
  export type Copy<D = any> = (params: VxeTableDefines.CopyEventParams<D>) => void
  export type Cut<D = any> = (params: VxeTableDefines.CutEventParams<D>) => void
  export type CurrentChange<D = any> = (params: VxeTableDefines.CurrentChangeEventParams<D>) => void
  export type RadioChange<D = any> = (params: VxeTableDefines.RadioChangeEventParams<D>) => void
  export type CheckboxChange<D = any> = (params: VxeTableDefines.CheckboxChangeEventParams<D>) => void
  export type CheckboxAll<D = any> = (params: VxeTableDefines.CheckboxAllEventParams<D>) => void
  export type CheckboxRangeStart<D = any> = (params: VxeTableDefines.CheckboxRangeStartEventParams<D>) => void
  export type CheckboxRangeChange<D = any> = (params: VxeTableDefines.CheckboxRangeChangeEventParams<D>) => void
  export type CheckboxRangeEnd<D = any> = (params: VxeTableDefines.CheckboxRangeEndEventParams<D>) => void
  export type CellClick<D = any> = (params: VxeTableDefines.CellClickEventParams<D>) => void
  export type CellDblclick<D = any> = (params: VxeTableDefines.CellDblclickEventParams<D>) => void
  export type CellMenu<D = any> = (params: VxeTableDefines.CellMenuEventParams<D>) => void
  export type CellMouseenter<D = any> = (params: VxeTableDefines.CellMouseenterEventParams<D>) => void
  export type CellMouseleave<D = any> = (params: VxeTableDefines.CellMouseleaveEventParams<D>) => void
  export type HeaderCellClick<D = any> = (params: VxeTableDefines.HeaderCellClickEventParams<D>) => void
  export type HeaderCellDblclick<D = any> = (params: VxeTableDefines.HeaderCellDblclickEventParams<D>) => void
  export type HeaderCellMenu<D = any> = (params: VxeTableDefines.HeaderCellMenuEventParams<D>) => void
  export type FooterCellClick<D = any> = (params: VxeTableDefines.FooterCellClickEventParams<D>) => void
  export type FooterCellDblclick<D = any> = (params: VxeTableDefines.FooterCellDblclickEventParams<D>) => void
  export type FooterCellMenu<D = any> = (params: VxeTableDefines.FooterCellMenuEventParams<D>) => void
  export type SortChange<D = any> = (params: VxeTableDefines.SortChangeEventParams<D>) => void
  export type FilterChange<D = any> = (params: VxeTableDefines.FilterChangeEventParams<D>) => void
  export type FilterVisible<D = any> = (params: VxeTableDefines.FilterVisibleEventParams<D>) => void
  export type ResizableChange<D = any> = (params: VxeTableDefines.ResizableChangeEventParams<D>) => void
  export type ToggleRowExpand<D = any> = (params: VxeTableDefines.ToggleRowExpandEventParams<D>) => void
  export type ToggleTreeExpand<D = any> = (params: VxeTableDefines.ToggleTreeExpandEventParams<D>) => void
  export type MenuClick<D = any> = (params: VxeTableDefines.MenuClickEventParams<D>) => void
  export type EditClosed<D = any> = (params: VxeTableDefines.EditClosedEventParams<D>) => void
  export type EditActived<D = any> = (params: VxeTableDefines.EditActivedEventParams<D>) => void
  export type EditDisabled<D = any> = (params: VxeTableDefines.EditDisabledEventParams<D>) => void
  export type ValidError<D = any> = (params: VxeTableDefines.ValidErrorEventParams<D>) => void
  export type Scroll<D = any> = (params: VxeTableDefines.ScrollEventParams<D>) => void
  export type Custom<D = any> = (params: VxeTableDefines.CustomEventParams<D>) => void
}

export interface VxeTableSlots<D = VxeTableDataRow> {
  /**
   * 自定义空数据时显示模板
   */
  empty?(params: {
    $table: VxeTableConstructor<D>
    $grid: VxeGridConstructor<D> | null | undefined
  }): any
  /**
   * 自定义加载中模板
   */
  loading?(params: {
    $table: VxeTableConstructor<D>
    $grid: VxeGridConstructor<D> | null | undefined
  }): any
}
