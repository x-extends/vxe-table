import { h, ComponentPublicInstance, reactive, ref, Ref, provide, inject, nextTick, onActivated, onDeactivated, onBeforeUnmount, onUnmounted, watch, computed, onMounted } from 'vue'
import { defineVxeComponent } from '../../ui/src/comp'
import XEUtils from 'xe-utils'
import { initTpImg, getTpImg, isPx, isScale, hasClass, addClass, removeClass, getEventTargetNode, getPaddingTopBottomSize, setScrollTop, setScrollLeft, toCssUnit, hasControlKey } from '../../ui/src/dom'
import { getLastZIndex, nextZIndex, hasChildrenList, getFuncText, isEnableConf, formatText, eqEmptyValue } from '../../ui/src/utils'
import { VxeUI } from '../../ui'
import { getRowUniqueId, clearTableAllStatus, toFilters, hasDeepKey, getRowkey, getRowid, rowToVisible, colToVisible, getCellValue, setCellValue, handleRowidOrRow, handleFieldOrColumn, toTreePathSeq, restoreScrollLocation, getRootColumn, getRefElem, getColReMinWidth, createHandleUpdateRowId, createHandleGetRowId, getCalcHeight, getCellRestHeight } from './util'
import { getSlotVNs } from '../../ui/src/vn'
import { moveRowAnimateToTb, clearRowAnimate, moveColAnimateToLr, clearColAnimate } from './anime'
import { warnLog, errLog } from '../../ui/src/log'
import Cell from './cell'
import TableBodyComponent from './body'
import TableHeaderComponent from './header'
import TableFooterComponent from './footer'
import tableProps from './props'
import tableEmits from './emits'
import TableCustomPanelComponent from '../module/custom/panel'
import TableFilterPanelComponent from '../module/filter/panel'
import TableImportPanelComponent from '../module/export/import-panel'
import TableExportPanelComponent from '../module/export/export-panel'
import TableMenuPanelComponent from '../module/menu/panel'

import type { VxeTooltipInstance, VxeTabsConstructor, VxeTabsPrivateMethods, ValueOf, VxeComponentSlotType } from 'vxe-pc-ui'
import type { VxeGridConstructor, VxeGridPrivateMethods, VxeTableConstructor, TableReactData, TableInternalData, VxeTablePropTypes, VxeToolbarConstructor, TablePrivateMethods, VxeTablePrivateRef, VxeTablePrivateComputed, VxeTablePrivateMethods, TableMethods, VxeTableMethods, VxeTableDefines, VxeTableEmits, VxeTableProps, VxeColumnPropTypes, VxeTableCustomPanelConstructor } from '../../../types'

const { getConfig, getIcon, getI18n, renderer, formats, createEvent, globalResize, interceptor, hooks, globalEvents, GLOBAL_EVENT_KEYS, useFns, renderEmptyElement } = VxeUI

const supportMaxRow = 5e6
const customStorageKey = 'VXE_CUSTOM_STORE'
const maxYHeight = 5e6
const maxXWidth = 5e6

export default defineVxeComponent({
  name: 'VxeTable',
  props: tableProps,
  emits: tableEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    const browseObj = XEUtils.browse()

    // 使用已安装的组件，如果未安装则不渲染
    const VxeUILoadingComponent = VxeUI.getComponent('VxeLoading')
    const VxeUITooltipComponent = VxeUI.getComponent('VxeTooltip')

    const $xeTabs = inject<(VxeTabsConstructor & VxeTabsPrivateMethods) | null>('$xeTabs', null)

    const { computeSize } = useFns.useSize(props)

    const reactData = reactive<TableReactData>({
      // 低性能的静态列
      staticColumns: [],
      // 渲染的列分组
      tableGroupColumn: [],
      // 可视区渲染的列
      tableColumn: [],
      // 渲染中的数据
      tableData: [],
      // 是否启用了横向 X 可视渲染方式加载
      scrollXLoad: false,
      // 是否启用了纵向 Y 可视渲染方式加载
      scrollYLoad: false,
      // 是否存在纵向滚动条
      overflowY: true,
      // 是否存在横向滚动条
      overflowX: false,
      // 纵向滚动条的宽度
      scrollbarWidth: 0,
      // 横向滚动条的高度
      scrollbarHeight: 0,
      // 最后滚动时间戳
      lastScrollTime: 0,
      // 行高
      rowHeight: 0,
      // 表格父容器的高度
      parentHeight: 0,
      // 是否使用分组表头
      isGroup: false,
      isAllOverflow: false,
      // 复选框属性，是否全选
      isAllSelected: false,
      // 复选框属性，有选中且非全选状态
      isIndeterminate: false,
      // 当前行
      currentRow: null,
      // 单选框属性，选中列
      currentColumn: null,
      // 单选框属性，选中行
      selectRadioRow: null,
      // 表尾合计数据
      footerTableData: [],
      // 行分组列信息
      rowGroupColumn: null,
      // 展开列信息
      expandColumn: null,
      // 树节点列信息
      treeNodeColumn: null,
      hasFixedColumn: false,
      // 刷新列标识，当列筛选被改变时，触发表格刷新数据
      upDataFlag: 0,
      // 刷新列标识，当列的特定属性被改变时，触发表格刷新列
      reColumnFlag: 0,
      // 初始化标识
      initStore: {
        filter: false,
        import: false,
        export: false,
        custom: false
      },
      // 自定义列相关的信息
      customStore: {
        btnEl: null,
        isAll: false,
        isIndeterminate: false,
        activeBtn: false,
        activeWrapper: false,
        visible: false,
        maxHeight: 0,
        oldSortMaps: {},
        oldFixedMaps: {},
        oldVisibleMaps: {}
      },
      customColumnList: [],
      // 当前选中的筛选列
      filterStore: {
        isAllSelected: false,
        isIndeterminate: false,
        style: null,
        options: [],
        column: null,
        multiple: false,
        visible: false,
        maxHeight: null
      },
      // 存放列相关的信息
      columnStore: {
        leftList: [],
        centerList: [],
        rightList: [],
        resizeList: [],
        pxList: [],
        pxMinList: [],
        autoMinList: [],
        scaleList: [],
        scaleMinList: [],
        autoList: [],
        remainList: []
      },
      // 存放快捷菜单的信息
      ctxMenuStore: {
        selected: null,
        visible: false,
        showChild: false,
        selectChild: null,
        list: [],
        style: null
      },
      // 存放可编辑相关信息
      editStore: {
        indexs: {
          columns: []
        },
        titles: {
          columns: []
        },
        // 选中源
        selected: {
          row: null,
          column: null
        },
        // 已复制源
        copyed: {
          cut: false,
          rows: [],
          columns: []
        },
        // 激活
        actived: {
          row: null,
          column: null
        },
        // 当前被强制聚焦单元格，只会在鼠标点击后算聚焦
        focused: {
          row: null,
          column: null
        }
      },
      // 存放 tooltip 相关信息
      tooltipStore: {
        row: null,
        column: null,
        content: null,
        visible: false,
        currOpts: {}
      },
      // 存放数据校验相关信息
      validStore: {
        visible: false
      },
      validErrorMaps: {},
      // 导入相关信息
      importStore: {
        inited: false,
        file: null,
        type: '',
        modeList: [],
        typeList: [],
        filename: '',
        visible: false
      },
      importParams: {
        mode: '',
        types: null,
        message: true
      },
      // 导出相关信息
      exportStore: {
        inited: false,
        name: '',
        modeList: [],
        typeList: [],
        columns: [],
        isPrint: false,
        hasFooter: false,
        hasMerge: false,
        hasTree: false,
        hasColgroup: false,
        visible: false
      },
      exportParams: {
        filename: '',
        sheetName: '',
        mode: '',
        type: '',
        isColgroup: false,
        isMerge: false,
        isAllExpand: false,
        useStyle: false,
        original: false,
        message: true,
        isHeader: false,
        isTitle: false,
        isFooter: false
      },

      visiblwRowsFlag: 1,

      isRowGroupStatus: false,
      rowGroupList: [],
      aggHandleFields: [],
      aggHandleAggColumns: [],

      rowGroupExpandedFlag: 1,
      rowExpandedFlag: 1,
      treeExpandedFlag: 1,
      updateCheckboxFlag: 1,
      pendingRowFlag: 1,
      insertRowFlag: 1,
      removeRowFlag: 1,
      mergeBodyFlag: 1,
      mergeFootFlag: 1,

      rowHeightStore: {
        large: 52,
        default: 48,
        medium: 44,
        small: 40,
        mini: 36
      },

      scrollVMLoading: false,
      scrollYHeight: 0,
      scrollYTop: 0,
      isScrollYBig: false,
      scrollXLeft: 0,
      scrollXWidth: 0,
      isScrollXBig: false,

      lazScrollLoading: false,

      rowExpandHeightFlag: 1,
      calcCellHeightFlag: 1,
      resizeHeightFlag: 1,
      resizeWidthFlag: 1,

      isCustomStatus: false,

      isDragRowMove: false,
      dragRow: null,
      isDragColMove: false,
      dragCol: null,
      dragTipText: '',

      isDragResize: false,
      isRowLoading: false,
      isColLoading: false
    })

    const internalData: TableInternalData = {
      tZindex: 0,
      currKeyField: '',
      isCurrDeepKey: false,
      elemStore: {},
      // 存放横向 X 虚拟滚动相关的信息
      scrollXStore: {
        preloadSize: 0,
        offsetSize: 0,
        visibleSize: 0,
        visibleStartIndex: 0,
        visibleEndIndex: 0,
        startIndex: 0,
        endIndex: 0
      },
      // 存放纵向 Y 虚拟滚动相关信息
      scrollYStore: {
        preloadSize: 0,
        offsetSize: 0,
        visibleSize: 0,
        visibleStartIndex: 0,
        visibleEndIndex: 0,
        startIndex: 0,
        endIndex: 0
      },
      // 表格宽度
      tableWidth: 0,
      // 表格高度
      tableHeight: 0,
      // 表头高度
      headerHeight: 0,
      // 表尾高度
      footerHeight: 0,
      customHeight: 0,
      customMinHeight: 0,
      customMaxHeight: 0,
      // 当前 hover 行
      hoverRow: null,
      // 最后滚动位置
      lastScrollLeft: 0,
      lastScrollTop: 0,
      // 单选框属性，已选中保留的行
      radioReserveRow: null,
      // 复选框属性，已选中保留的行集合
      checkboxReserveRowMap: {},
      // 行数据，已展开保留的行集合
      rowExpandedReserveRowMap: {},
      // 树结构数据，已展开保留的行集合
      treeExpandedReserveRowMap: {},
      // 树结构数据，不确定状态的集合
      treeIndeterminateRowMaps: {},
      // 列表完整数据、条件处理后
      tableFullData: [],
      afterFullData: [],
      afterTreeFullData: [],
      afterGroupFullData: [],
      // 列表条件处理后数据集合
      afterFullRowMaps: {},
      // 树结构完整数据、条件处理后
      tableFullTreeData: [],
      // 行分组全量数据、条件处理后
      tableFullGroupData: [],
      tableSynchData: [],
      tableSourceData: [],
      // 收集的列配置（带分组）
      collectColumn: [],
      // 完整所有列（不带分组）
      tableFullColumn: [],
      // 渲染所有列
      visibleColumn: [],
      // 全量数据集（包括当前和已删除）
      fullAllDataRowIdData: {},
      // 数据集（仅当前）
      fullDataRowIdData: {},
      // 数据集（仅可视）
      visibleDataRowIdData: {},
      // 渲染中缓存数据
      sourceDataRowIdData: {},
      fullColumnIdData: {},
      fullColumnFieldData: {},

      // 合并单元格的数据
      mergeBodyList: [],
      mergeBodyMaps: {},
      // 合并表尾的数据
      mergeFooterList: [],
      mergeFooterMaps: {},
      // 已合并单元格数据集合
      mergeBodyCellMaps: {},
      // 已合并表尾数据集合
      mergeFooterCellMaps: {},
      // 已展开的行集合
      rowExpandedMaps: {},
      // 懒加载中的展开行的集合
      rowExpandLazyLoadedMaps: {},
      // 已展开的分组行
      rowGroupExpandedMaps: {},
      // 已展开树节点集合
      treeExpandedMaps: {},
      // 懒加载中的树节点的集合
      treeExpandLazyLoadedMaps: {},
      // 复选框属性，已选中的行集合
      selectCheckboxMaps: {},
      // 已标记的对象集
      pendingRowMaps: {},
      // 已新增的临时行
      insertRowMaps: {},
      // 已删除行
      removeRowMaps: {},

      cvCacheMaps: {},

      inited: false,
      tooltipTimeout: null,
      initStatus: false,
      isActivated: false
    }

    let tableMethods = {} as TableMethods
    let tablePrivateMethods = {} as TablePrivateMethods

    const refElem = ref() as Ref<HTMLDivElement>
    const refVarElem = ref() as Ref<HTMLDivElement>
    const refTooltip = ref() as Ref<VxeTooltipInstance>
    const refCommTooltip = ref() as Ref<VxeTooltipInstance>
    const refValidTooltip = ref() as Ref<VxeTooltipInstance>
    const refTableMenu = ref() as Ref<any>
    const refTableFilter = ref() as Ref<any>
    const refTableCustom = ref() as Ref<VxeTableCustomPanelConstructor>

    const refTableViewportElem = ref<HTMLDivElement>()
    const refTableHeader = ref() as Ref<ComponentPublicInstance>
    const refTableBody = ref() as Ref<ComponentPublicInstance>
    const refTableFooter = ref() as Ref<ComponentPublicInstance>
    const refTableLeftHeader = ref() as Ref<ComponentPublicInstance>
    const refTableLeftBody = ref() as Ref<ComponentPublicInstance>
    const refTableLeftFooter = ref() as Ref<ComponentPublicInstance>
    const refTableRightHeader = ref() as Ref<ComponentPublicInstance>
    const refTableRightBody = ref() as Ref<ComponentPublicInstance>
    const refTableRightFooter = ref() as Ref<ComponentPublicInstance>

    const refLeftContainer = ref() as Ref<HTMLDivElement>
    const refRightContainer = ref() as Ref<HTMLDivElement>
    const refColResizeBar = ref() as Ref<HTMLDivElement>
    const refRowResizeBar = ref() as Ref<HTMLDivElement>
    const refEmptyPlaceholder = ref() as Ref<HTMLDivElement>

    const refDragTipElem = ref<HTMLDivElement>()
    const refDragRowLineElem = ref<HTMLDivElement>()
    const refDragColLineElem = ref<HTMLDivElement>()

    const refRowExpandElem = ref<HTMLDivElement>()
    const refRowExpandYSpaceElem = ref<HTMLDivElement>()

    const refScrollXVirtualElem = ref<HTMLDivElement>()
    const refScrollYVirtualElem = ref<HTMLDivElement>()
    const refScrollXHandleElem = ref<HTMLDivElement>()
    const refScrollXLeftCornerElem = ref<HTMLDivElement>()
    const refScrollXRightCornerElem = ref<HTMLDivElement>()
    const refScrollYHandleElem = ref<HTMLDivElement>()
    const refScrollYTopCornerElem = ref<HTMLDivElement>()
    const refScrollXWrapperElem = ref<HTMLDivElement>()
    const refScrollYWrapperElem = ref<HTMLDivElement>()
    const refScrollYBottomCornerElem = ref<HTMLDivElement>()
    const refScrollXSpaceElem = ref<HTMLDivElement>()
    const refScrollYSpaceElem = ref<HTMLDivElement>()

    const $xeGrid = inject<(VxeGridConstructor & VxeGridPrivateMethods) | null>('$xeGrid', null)
    let $xeToolbar: VxeToolbarConstructor

    const computeTableId = computed(() => {
      const { id } = props
      if (id) {
        if (XEUtils.isFunction(id)) {
          return `${id({ $table: $xeTable, $grid: $xeGrid }) || ''}`
        }
        return `${id}`
      }
      return ''
    })

    const computeRowField = computed(() => {
      const rowOpts = computeRowOpts.value
      return `${props.rowId || rowOpts.keyField || '_X_ROW_KEY'}`
    })

    const computeValidOpts = computed(() => {
      return Object.assign({}, getConfig().table.validConfig, props.validConfig)
    })

    /**
     * @deprecated
     */
    const computeSXOpts = computed(() => {
      const virtualXOpts = computeVirtualXOpts.value
      return virtualXOpts
    })

    const computeScrollXThreshold = computed(() => {
      const virtualXOpts = computeVirtualXOpts.value
      const { threshold } = virtualXOpts
      if (threshold) {
        return XEUtils.toNumber(threshold)
      }
      return 0
    })

    /**
     * @deprecated
     */
    const computeSYOpts = computed(() => {
      const virtualYOpts = computeVirtualYOpts.value
      return virtualYOpts
    })

    const computeVirtualXOpts = computed(() => {
      return Object.assign({}, getConfig().table.virtualXConfig || getConfig().table.scrollX, props.virtualXConfig || props.scrollX) as VxeTablePropTypes.VirtualXConfig & { gt: number }
    })

    const computeVirtualYOpts = computed(() => {
      return Object.assign({}, getConfig().table.virtualYConfig || getConfig().table.scrollY, props.virtualYConfig || props.scrollY) as VxeTablePropTypes.VirtualYConfig & { gt: number }
    })

    const computeScrollbarOpts = computed(() => {
      return Object.assign({}, getConfig().table.scrollbarConfig, props.scrollbarConfig)
    })

    const computeScrollbarXToTop = computed(() => {
      const scrollbarOpts = computeScrollbarOpts.value
      return !!(scrollbarOpts.x && scrollbarOpts.x.position === 'top')
    })

    const computeScrollbarYToLeft = computed(() => {
      const scrollbarOpts = computeScrollbarOpts.value
      return !!(scrollbarOpts.y && scrollbarOpts.y.position === 'left')
    })

    const computeScrollYThreshold = computed(() => {
      const virtualYOpts = computeVirtualYOpts.value
      const { threshold } = virtualYOpts
      if (threshold) {
        return XEUtils.toNumber(threshold)
      }
      return 0
    })

    const computeRowHeightMaps = computed(() => {
      return reactData.rowHeightStore
    })

    const computeDefaultRowHeight = computed(() => {
      const vSize = computeSize.value
      const rowHeightMaps = computeRowHeightMaps.value
      return rowHeightMaps[vSize || 'default'] || 18
    })

    const computeColumnOpts = computed(() => {
      return Object.assign({}, getConfig().table.columnConfig, props.columnConfig)
    })

    const computeCurrentColumnOpts = computed(() => {
      return Object.assign({}, getConfig().table.currentColumnConfig, props.currentColumnConfig)
    })

    const computeCellOpts = computed(() => {
      const cellOpts = Object.assign({}, getConfig().table.cellConfig, props.cellConfig)
      if (cellOpts.height) {
        cellOpts.height = XEUtils.toNumber(cellOpts.height)
      }
      return cellOpts
    })

    const computeHeaderCellOpts = computed(() => {
      const headerCellOpts = Object.assign({}, getConfig().table.headerCellConfig, props.headerCellConfig)
      const cellOpts = computeCellOpts.value
      headerCellOpts.height = XEUtils.toNumber(getCalcHeight(headerCellOpts.height || cellOpts.height))
      return headerCellOpts
    })

    const computeFooterCellOpts = computed(() => {
      const footerCellOpts = Object.assign({}, getConfig().table.footerCellConfig, props.footerCellConfig)
      const cellOpts = computeCellOpts.value
      footerCellOpts.height = XEUtils.toNumber(getCalcHeight(footerCellOpts.height || cellOpts.height))
      return footerCellOpts
    })

    const computeRowOpts = computed(() => {
      return Object.assign({}, getConfig().table.rowConfig, props.rowConfig)
    })

    const computeAggregateOpts = computed(() => {
      return Object.assign({}, getConfig().table.aggregateConfig || getConfig().table.rowGroupConfig, props.aggregateConfig || props.rowGroupConfig)
    })

    const computeRowGroupOpts = computed(() => {
      return computeAggregateOpts.value
    })

    const computeCurrentRowOpts = computed(() => {
      return Object.assign({}, getConfig().table.currentRowConfig, props.currentRowConfig)
    })

    const computeRowDragOpts = computed(() => {
      return Object.assign({}, getConfig().table.rowDragConfig, props.rowDragConfig)
    })

    const computeColumnDragOpts = computed(() => {
      return Object.assign({}, getConfig().table.columnDragConfig, props.columnDragConfig)
    })

    const computeResizeOpts = computed(() => {
      return Object.assign({}, getConfig().table.resizeConfig, props.resizeConfig) as VxeTablePropTypes.ResizeOpts
    })

    const computeResizableOpts = computed(() => {
      return Object.assign({}, getConfig().table.resizableConfig, props.resizableConfig) as VxeTablePropTypes.ResizableOpts
    })

    const computeSeqOpts = computed(() => {
      return Object.assign({ startIndex: 0 }, getConfig().table.seqConfig, props.seqConfig) as VxeTablePropTypes.SeqOpts
    })

    const computeRadioOpts = computed(() => {
      return Object.assign({}, getConfig().table.radioConfig, props.radioConfig) as VxeTablePropTypes.RadioOpts
    })

    const computeCheckboxOpts = computed(() => {
      return Object.assign({}, getConfig().table.checkboxConfig, props.checkboxConfig) as VxeTablePropTypes.CheckboxOpts
    })

    const computeTooltipOpts = computed(() => {
      return Object.assign({}, getConfig().tooltip, getConfig().table.tooltipConfig, props.tooltipConfig)
    })

    const computeTableTipConfig = computed(() => {
      const { tooltipStore } = reactData
      const tooltipOpts = computeTooltipOpts.value
      return Object.assign({}, tooltipOpts, tooltipStore.currOpts)
    })

    const computeValidTipConfig = computed(() => {
      const tooltipOpts = computeTooltipOpts.value
      return Object.assign({}, tooltipOpts)
    })

    const computeEditOpts = computed(() => {
      return Object.assign({}, getConfig().table.editConfig, props.editConfig) as VxeTablePropTypes.EditOpts
    })

    const computeSortOpts = computed(() => {
      return Object.assign({ orders: ['asc', 'desc', null] }, getConfig().table.sortConfig, props.sortConfig) as VxeTablePropTypes.SortOpts
    })

    const computeFilterOpts = computed(() => {
      return Object.assign({}, getConfig().table.filterConfig, props.filterConfig) as VxeTablePropTypes.FilterOpts
    })

    const computeMouseOpts = computed(() => {
      return Object.assign({}, getConfig().table.mouseConfig, props.mouseConfig) as VxeTablePropTypes.MouseOpts
    })

    const computeAreaOpts = computed(() => {
      return Object.assign({}, getConfig().table.areaConfig, props.areaConfig) as VxeTablePropTypes.AreaOpts
    })

    const computeKeyboardOpts = computed(() => {
      return Object.assign({}, getConfig().table.keyboardConfig, props.keyboardConfig) as VxeTablePropTypes.KeyboardOpts
    })

    const computeClipOpts = computed(() => {
      return Object.assign({}, getConfig().table.clipConfig, props.clipConfig)
    })

    const computeFNROpts = computed(() => {
      return Object.assign({}, getConfig().table.fnrConfig, props.fnrConfig) as VxeTablePropTypes.FNROpts
    })

    const computeMenuOpts = computed(() => {
      return Object.assign({}, getConfig().table.menuConfig, props.menuConfig) as VxeTablePropTypes.MenuOpts
    })

    const computeLeftFixedWidth = computed(() => {
      const { columnStore } = reactData
      const { leftList } = columnStore
      let leftWidth = 0
      for (let i = 0; i < leftList.length; i++) {
        const column = leftList[i]
        leftWidth += column.renderWidth
      }
      return leftWidth
    })

    const computeRightFixedWidth = computed(() => {
      const { columnStore } = reactData
      const { rightList } = columnStore
      let leftWidth = 0
      for (let i = 0; i < rightList.length; i++) {
        const column = rightList[i]
        leftWidth += column.renderWidth
      }
      return leftWidth
    })

    const computeHeaderMenu = computed(() => {
      const menuOpts = computeMenuOpts.value
      const headerOpts = menuOpts.header
      return headerOpts && headerOpts.options ? headerOpts.options : []
    })

    const computeBodyMenu = computed(() => {
      const menuOpts = computeMenuOpts.value
      const bodyOpts = menuOpts.body
      return bodyOpts && bodyOpts.options ? bodyOpts.options : []
    })

    const computeFooterMenu = computed(() => {
      const menuOpts = computeMenuOpts.value
      const footerOpts = menuOpts.footer
      return footerOpts && footerOpts.options ? footerOpts.options : []
    })

    const computeIsMenu = computed(() => {
      const menuOpts = computeMenuOpts.value
      const headerMenu = computeHeaderMenu.value
      const bodyMenu = computeBodyMenu.value
      const footerMenu = computeFooterMenu.value
      return !!(props.menuConfig && isEnableConf(menuOpts) && (headerMenu.length || bodyMenu.length || footerMenu.length))
    })

    const computeMenuList = computed(() => {
      const { ctxMenuStore } = reactData
      const rest: any[] = []
      ctxMenuStore.list.forEach((list) => {
        list.forEach((item) => {
          rest.push(item)
        })
      })
      return rest
    })

    const computeExportOpts = computed(() => {
      return Object.assign({}, getConfig().table.exportConfig, props.exportConfig) as VxeTablePropTypes.ExportOpts
    })

    const computeImportOpts = computed(() => {
      return Object.assign({}, getConfig().table.importConfig, props.importConfig) as VxeTablePropTypes.ImportOpts
    })

    const computePrintOpts = computed(() => {
      return Object.assign({}, getConfig().table.printConfig, props.printConfig) as VxeTablePropTypes.PrintOpts
    })

    const computeExpandOpts = computed(() => {
      return Object.assign({}, getConfig().table.expandConfig, props.expandConfig) as VxeTablePropTypes.ExpandOpts
    })

    const computeTreeOpts = computed(() => {
      return Object.assign({}, getConfig().table.treeConfig, props.treeConfig) as VxeTablePropTypes.TreeOpts
    })

    const computeEmptyOpts = computed(() => {
      return Object.assign({}, getConfig().table.emptyRender, props.emptyRender) as VxeTablePropTypes.EmptyOpts
    })

    const computeLoadingOpts = computed(() => {
      return Object.assign({}, getConfig().table.loadingConfig, props.loadingConfig) as VxeTablePropTypes.LoadingOpts
    })

    const computeCellOffsetWidth = computed(() => {
      return props.border ? Math.max(2, Math.ceil(reactData.scrollbarWidth / reactData.tableColumn.length)) : 1
    })

    const computeCustomOpts = computed(() => {
      return Object.assign({}, getConfig().table.customConfig, props.customConfig)
    })

    const computeTableRowExpandedList = computed(() => {
      const { tableData, rowExpandedFlag, expandColumn, rowGroupExpandedFlag, treeExpandedFlag } = reactData
      const { visibleDataRowIdData, rowExpandedMaps } = internalData
      const expandList: any[] = []
      if (tableData.length && expandColumn && rowExpandedFlag && rowGroupExpandedFlag && treeExpandedFlag) {
        XEUtils.each(rowExpandedMaps, (row, rowid) => {
          if (visibleDataRowIdData[rowid]) {
            expandList.push(row)
          }
        })
      }
      return expandList
    })

    const computeAutoWidthColumnList = computed(() => {
      const { visibleColumn } = internalData
      const { tableColumn } = reactData
      return tableColumn.length || visibleColumn.length ? visibleColumn.filter(column => column.width === 'auto' || column.minWidth === 'auto') : []
    })

    const computeFixedColumnSize = computed(() => {
      const { tableColumn } = reactData
      const { collectColumn } = internalData
      let fixedSize = 0
      // 只判断第一层
      if (tableColumn.length && collectColumn.length) {
        collectColumn.forEach((column) => {
          if (column.renderFixed) {
            fixedSize++
          }
        })
      }
      return fixedSize
    })

    const computeIsMaxFixedColumn = computed(() => {
      const fixedColumnSize = computeFixedColumnSize.value
      const columnOpts = computeColumnOpts.value
      const { maxFixedSize } = columnOpts
      if (maxFixedSize) {
        return fixedColumnSize >= maxFixedSize
      }
      return false
    })

    const computeTableBorder = computed(() => {
      const { border } = props
      if (border === true) {
        return 'full'
      }
      if (border) {
        return border
      }
      return 'default'
    })

    const computeIsAllCheckboxDisabled = computed(() => {
      const { treeConfig } = props
      const { tableData } = reactData
      const { tableFullData } = internalData
      const checkboxOpts = computeCheckboxOpts.value
      const { strict, checkMethod } = checkboxOpts
      if (strict) {
        if (tableData.length || tableFullData.length) {
          if (checkMethod) {
            if (treeConfig) {
              // 暂时不支持树形结构
            }
            // 如果所有行都被禁用
            return tableFullData.every((row) => !checkMethod({ $table: $xeTable, row }))
          }
          return false
        }
        return true
      }
      return false
    })

    const computeVirtualScrollBars = computed(() => {
      const { overflowX, scrollXLoad, overflowY, scrollYLoad } = reactData
      return {
        x: overflowX && scrollXLoad,
        y: overflowY && scrollYLoad
      }
    })

    const computeRowGroupFields = computed(() => {
      const rowGroupOpts = computeRowGroupOpts.value
      return rowGroupOpts.groupFields
    })

    const computeRowGroupColumns = computed(() => {
      const { rowGroupList } = reactData
      const { fullColumnFieldData } = internalData
      const rgColumns: VxeTableDefines.ColumnInfo[] = []
      rowGroupList.forEach(aggConf => {
        const colRest = fullColumnFieldData[aggConf.field]
        if (colRest) {
          rgColumns.push(colRest.column)
        }
      })
      return rgColumns
    })

    const refMaps: VxeTablePrivateRef = {
      refElem,
      refTooltip,
      refValidTooltip,
      refTableFilter,
      refTableCustom,
      refTableMenu,
      refTableHeader,
      refTableBody,
      refTableFooter,
      refTableLeftHeader,
      refTableLeftBody,
      refTableLeftFooter,
      refTableRightHeader,
      refTableRightBody,
      refTableRightFooter,
      refLeftContainer,
      refRightContainer,
      refColResizeBar,
      refRowResizeBar,
      refScrollXVirtualElem,
      refScrollYVirtualElem,
      refScrollXHandleElem,
      refScrollYHandleElem,
      refScrollXSpaceElem,
      refScrollYSpaceElem
    }

    const computeMaps: VxeTablePrivateComputed = {
      computeSize,
      computeTableId,
      computeValidOpts,
      computeRowField,
      computeVirtualXOpts,
      computeVirtualYOpts,
      computeScrollbarOpts,
      computeScrollbarXToTop,
      computeScrollbarYToLeft,
      computeColumnOpts,
      computeCurrentColumnOpts,
      computeScrollXThreshold,
      computeScrollYThreshold,
      computeRowHeightMaps,
      computeDefaultRowHeight,
      computeCellOpts,
      computeHeaderCellOpts,
      computeFooterCellOpts,
      computeRowOpts,
      computeAggregateOpts,
      computeRowGroupOpts,
      computeCurrentRowOpts,
      computeRowDragOpts,
      computeColumnDragOpts,
      computeResizeOpts,
      computeResizableOpts,
      computeSeqOpts,
      computeRadioOpts,
      computeCheckboxOpts,
      computeTooltipOpts,
      computeEditOpts,
      computeSortOpts,
      computeFilterOpts,
      computeMouseOpts,
      computeAreaOpts,
      computeKeyboardOpts,
      computeClipOpts,
      computeFNROpts,
      computeHeaderMenu,
      computeBodyMenu,
      computeFooterMenu,
      computeIsMenu,
      computeMenuList,
      computeMenuOpts,
      computeExportOpts,
      computeImportOpts,
      computePrintOpts,
      computeExpandOpts,
      computeTreeOpts,
      computeEmptyOpts,
      computeLoadingOpts,
      computeCellOffsetWidth,
      computeCustomOpts,
      computeLeftFixedWidth,
      computeRightFixedWidth,
      computeFixedColumnSize,
      computeIsMaxFixedColumn,
      computeIsAllCheckboxDisabled,
      computeVirtualScrollBars,
      computeRowGroupFields,
      computeRowGroupColumns,

      computeSXOpts,
      computeSYOpts
    }

    const $xeTable = {
      xID,
      props: props as VxeTableProps,
      context,
      reactData,
      internalData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps,

      xeGrid: $xeGrid,
      xegrid: $xeGrid
    } as unknown as VxeTableConstructor & VxeTableMethods & VxeTablePrivateMethods

    const eqCellValue = (row1: any, row2: any, field: string) => {
      const val1 = XEUtils.get(row1, field)
      const val2 = XEUtils.get(row2, field)
      if (eqEmptyValue(val1) && eqEmptyValue(val2)) {
        return true
      }
      if (XEUtils.isString(val1) || XEUtils.isNumber(val1)) {
        return ('' + val1) === ('' + val2)
      }
      return XEUtils.isEqual(val1, val2)
    }

    const handleKeyField = () => {
      const keyField = computeRowField.value
      internalData.currKeyField = keyField
      internalData.isCurrDeepKey = hasDeepKey(keyField)
    }

    const hangleStorageDefaultValue = (value: boolean | null | undefined, isAll: boolean) => {
      return XEUtils.isBoolean(value) ? value : isAll
    }

    const getNextSortOrder = (column: VxeTableDefines.ColumnInfo) => {
      const sortOpts = computeSortOpts.value
      const { orders = [] } = sortOpts
      const currOrder = column.order || null
      const oIndex = orders.indexOf(currOrder) + 1
      return orders[oIndex < orders.length ? oIndex : 0]
    }

    const getCustomStorageMap = (id?: string) => {
      const version = getConfig().version
      const rest = XEUtils.toStringJSON(localStorage.getItem(customStorageKey) || '')
      const maps = rest && rest._v === version ? rest : { _v: version }
      return (id ? maps[id] : maps) || {}
    }

    const setCustomStorageMap = (id: string, data: any) => {
      const version = getConfig().version
      const maps = getCustomStorageMap()
      maps[id] = data || undefined
      maps._v = version
      localStorage.setItem(customStorageKey, XEUtils.toJSONString(maps))
    }

    const getRecoverRowMaps = (keyMaps: Record<string, any>) => {
      const { fullAllDataRowIdData } = internalData
      const restKeys: Record<string, any> = {}
      XEUtils.each(keyMaps, (row, rowid) => {
        if (fullAllDataRowIdData[rowid]) {
          restKeys[rowid] = row
        }
      })
      return restKeys
    }

    const handleReserveRow = (reserveRowMap: any) => {
      const { fullDataRowIdData } = internalData
      const reserveList: any[] = []
      XEUtils.each(reserveRowMap, (item, rowid) => {
        if (fullDataRowIdData[rowid] && $xeTable.findRowIndexOf(reserveList, fullDataRowIdData[rowid].row) === -1) {
          reserveList.push(fullDataRowIdData[rowid].row)
        }
      })
      return reserveList
    }

    const handleVirtualXVisible = () => {
      const { isScrollXBig, scrollXWidth } = reactData
      const { elemStore, visibleColumn, fullColumnIdData } = internalData
      const leftFixedWidth = computeLeftFixedWidth.value
      const rightFixedWidth = computeRightFixedWidth.value
      const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
      if (bodyScrollElem) {
        const clientWidth = bodyScrollElem.clientWidth
        let scrollLeft = bodyScrollElem.scrollLeft
        if (isScrollXBig) {
          scrollLeft = Math.ceil((scrollXWidth - clientWidth) * Math.min(1, (scrollLeft / (maxXWidth - clientWidth))))
        }
        const startLeft = scrollLeft + leftFixedWidth
        const endLeft = scrollLeft + clientWidth - rightFixedWidth
        let leftIndex = 0
        let rightIndex = visibleColumn.length
        while (leftIndex < rightIndex) {
          const cIndex = Math.floor((leftIndex + rightIndex) / 2)
          const column = visibleColumn[cIndex]
          const colid = column.id
          const colRest = fullColumnIdData[colid] || {}
          if (colRest.oLeft <= startLeft) {
            leftIndex = cIndex + 1
          } else {
            rightIndex = cIndex
          }
        }
        let visibleSize = 0
        const toVisibleIndex = leftIndex === visibleColumn.length ? leftIndex : Math.max(0, leftIndex < visibleColumn.length ? leftIndex - 2 : 0)
        for (let cIndex = toVisibleIndex, cLen = visibleColumn.length; cIndex < cLen; cIndex++) {
          const column = visibleColumn[cIndex]
          const colid = column.id
          const colRest = fullColumnIdData[colid] || {}
          visibleSize++
          if (colRest.oLeft > endLeft || visibleSize >= 60) {
            break
          }
        }
        return { toVisibleIndex: Math.max(0, toVisibleIndex), visibleSize: Math.max(1, visibleSize) }
      }
      return { toVisibleIndex: 0, visibleSize: 6 }
    }

    const calcVarRowHeightConfig = (sizeKey: 'default' | 'medium' | 'small' | 'mini', sizeEl: Element) => {
      const { rowHeightStore } = reactData
      if (sizeEl && sizeEl.clientHeight) {
        rowHeightStore[sizeKey] = sizeEl.clientHeight
      }
    }

    const computeRowHeight = () => {
      const { isAllOverflow } = reactData
      const tableHeader = refTableHeader.value
      const tableBody = refTableBody.value
      const tableBodyElem = tableBody ? tableBody.$el as HTMLDivElement : null
      const defaultRowHeight = computeDefaultRowHeight.value
      let rowHeight = 0
      if (isAllOverflow) {
        if (tableBodyElem) {
          const tableHeaderElem = tableHeader ? tableHeader.$el as HTMLDivElement : null
          let firstTrElem
          firstTrElem = tableBodyElem.querySelector('tr')
          if (!firstTrElem && tableHeaderElem) {
            firstTrElem = tableHeaderElem.querySelector('tr')
          }
          if (firstTrElem) {
            rowHeight = firstTrElem.clientHeight
          }
        }
        if (!rowHeight) {
          rowHeight = defaultRowHeight
        }
      } else {
        rowHeight = defaultRowHeight
      }
      // 最低支持 18px 行高
      return Math.max(18, rowHeight)
    }

    const handleVirtualYVisible = () => {
      const { isAllOverflow, expandColumn, isScrollYBig, scrollYHeight } = reactData
      const { elemStore, isResizeCellHeight, afterFullData, fullAllDataRowIdData } = internalData
      const rowOpts = computeRowOpts.value
      const cellOpts = computeCellOpts.value
      const defaultRowHeight = computeDefaultRowHeight.value
      const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
      if (bodyScrollElem) {
        const clientHeight = bodyScrollElem.clientHeight
        let scrollTop = bodyScrollElem.scrollTop
        if (isScrollYBig) {
          scrollTop = Math.ceil((scrollYHeight - clientHeight) * Math.min(1, (scrollTop / (maxYHeight - clientHeight))))
        }
        const startTop = scrollTop
        const endTop = scrollTop + clientHeight
        let toVisibleIndex = -1
        let visibleSize = 0
        const isCustomCellHeight = isResizeCellHeight || cellOpts.height || rowOpts.height
        if (!isCustomCellHeight && !expandColumn && isAllOverflow) {
          toVisibleIndex = Math.floor(startTop / defaultRowHeight) - 1
          visibleSize = Math.ceil(clientHeight / defaultRowHeight) + 1
        } else {
          const { handleGetRowId } = createHandleGetRowId($xeTable)
          let leftIndex = 0
          let rightIndex = afterFullData.length
          while (leftIndex < rightIndex) {
            const rIndex = Math.floor((leftIndex + rightIndex) / 2)
            const row = afterFullData[rIndex]
            const rowid = handleGetRowId(row)
            const rowRest = fullAllDataRowIdData[rowid] || {}
            if (rowRest.oTop <= startTop) {
              leftIndex = rIndex + 1
            } else {
              rightIndex = rIndex
            }
          }
          toVisibleIndex = leftIndex === afterFullData.length ? leftIndex : Math.max(0, leftIndex < afterFullData.length ? leftIndex - 2 : 0)
          for (let rIndex = toVisibleIndex, rLen = afterFullData.length; rIndex < rLen; rIndex++) {
            const row = afterFullData[rIndex]
            const rowid = handleGetRowId(row)
            const rowRest = fullAllDataRowIdData[rowid] || {}
            visibleSize++
            if (rowRest.oTop > endTop || visibleSize >= 100) {
              break
            }
          }
        }
        return { toVisibleIndex: Math.max(0, toVisibleIndex), visibleSize: Math.max(6, visibleSize) }
      }
      return { toVisibleIndex: 0, visibleSize: 6 }
    }

    const calculateMergerOffsetIndex = (list: any[], offsetItem: any, type: 'row' | 'col') => {
      for (let mcIndex = 0, len = list.length; mcIndex < len; mcIndex++) {
        const mergeItem = list[mcIndex]
        const { startIndex, endIndex } = offsetItem
        const mergeStartIndex = mergeItem[type]
        const mergeSpanNumber = mergeItem[type + 'span']
        const mergeEndIndex = mergeStartIndex + mergeSpanNumber
        if (mergeStartIndex < startIndex && startIndex < mergeEndIndex) {
          offsetItem.startIndex = mergeStartIndex
        }
        if (mergeStartIndex < endIndex && endIndex < mergeEndIndex) {
          offsetItem.endIndex = mergeEndIndex
        }
        if (offsetItem.startIndex !== startIndex || offsetItem.endIndex !== endIndex) {
          mcIndex = -1
        }
      }
    }

    function buildMergeData (mergeConfigs: VxeTableDefines.MergeItem[]) {
      const mergeMaps: Record<string, VxeTableDefines.MergeCacheItem> = {}
      if (mergeConfigs && mergeConfigs.length) {
        for (let mIndex = 0; mIndex < mergeConfigs.length; mIndex++) {
          const { row: _rowIndex, col: _columnIndex, rowspan: mergeRowspan, colspan: mergeColspan } = mergeConfigs[mIndex]
          for (let i = 0; i < mergeRowspan; i++) {
            for (let j = 0; j < mergeColspan; j++) {
              mergeMaps[`${_rowIndex + i}:${_columnIndex + j}`] = !i && !j
                ? {
                    rowspan: mergeRowspan,
                    colspan: mergeColspan
                  }
                : {
                    rowspan: 0,
                    colspan: 0
                  }
            }
          }
        }
      }
      return mergeMaps
    }

    const handleUpdateMergeBodyCells = (merges: VxeTableDefines.MergeOptions | VxeTableDefines.MergeOptions[]) => {
      internalData.mergeBodyList = []
      internalData.mergeBodyMaps = {}
      internalData.mergeBodyCellMaps = {}
      $xeTable.setMergeCells(merges)
    }

    const handleBodyMerge = (merges: VxeTableDefines.MergeOptions | VxeTableDefines.MergeOptions[]) => {
      const { fullAllDataRowIdData, fullColumnIdData, visibleColumn, afterFullData, mergeBodyList, mergeBodyMaps } = internalData
      if (merges) {
        const { handleGetRowId } = createHandleGetRowId($xeTable)
        if (!XEUtils.isArray(merges)) {
          merges = [merges]
        }
        merges.forEach((item) => {
          let { row: margeRow, col: margeCol, rowspan, colspan } = item
          let mergeRowIndex = -1
          let mergeColumnIndex = -1
          if (XEUtils.isNumber(margeRow)) {
            mergeRowIndex = margeRow
          } else {
            const rowid = margeRow ? handleGetRowId(margeRow) : null
            const rowRest = rowid ? fullAllDataRowIdData[rowid] : null
            if (rowRest) {
              mergeRowIndex = rowRest._index
            }
          }
          if (XEUtils.isNumber(margeCol)) {
            mergeColumnIndex = margeCol
          } else {
            const colid = margeCol ? margeCol.id : null
            const colRest = colid ? fullColumnIdData[colid] : null
            if (colRest) {
              mergeColumnIndex = colRest._index
            }
          }
          if (mergeRowIndex > -1 && mergeColumnIndex > -1 && (rowspan || colspan)) {
            rowspan = XEUtils.toNumber(rowspan) || 1
            colspan = XEUtils.toNumber(colspan) || 1
            if (rowspan > 1 || colspan > 1) {
              const row = afterFullData[mergeRowIndex]
              const column = visibleColumn[mergeColumnIndex]
              let mergeItem = mergeBodyMaps[`${mergeRowIndex}:${mergeColumnIndex}`]
              if (mergeItem) {
                mergeItem.rowspan = rowspan
                mergeItem.colspan = colspan
                mergeItem._rowspan = rowspan
                mergeItem._colspan = colspan
              } else {
                mergeItem = {
                  row: mergeRowIndex,
                  col: mergeColumnIndex,
                  rowspan,
                  colspan,
                  _row: row,
                  _col: column,
                  _rowspan: rowspan,
                  _colspan: colspan
                }
                mergeBodyMaps[`${mergeRowIndex}:${mergeColumnIndex}`] = mergeItem
                mergeBodyList.push(mergeItem)
              }
            }
          }
        })
      }
    }

    const handleUpdateMergeFooterCells = (merges: VxeTableDefines.MergeOptions | VxeTableDefines.MergeOptions[]) => {
      internalData.mergeFooterList = []
      internalData.mergeFooterMaps = {}
      internalData.mergeFooterCellMaps = {}
      $xeTable.setMergeFooterItems(merges)
    }

    const handleFooterMerge = (merges: VxeTableDefines.MergeOptions | VxeTableDefines.MergeOptions[]) => {
      const { footerTableData } = reactData
      const { mergeFooterList, mergeFooterMaps, fullColumnIdData } = internalData
      if (merges) {
        const { visibleColumn } = internalData
        if (!XEUtils.isArray(merges)) {
          merges = [merges]
        }
        merges.forEach((item) => {
          let { row: margeRow, col: margeCol, rowspan, colspan } = item
          const mergeRowIndex = XEUtils.isNumber(margeRow) ? margeRow : -1
          let mergeColumnIndex = -1
          if (XEUtils.isNumber(margeCol)) {
            mergeColumnIndex = margeCol
          } else {
            const colid = margeCol ? margeCol.id : null
            const colRest = colid ? fullColumnIdData[colid] : null
            if (colRest) {
              mergeColumnIndex = colRest._index
            }
          }
          if (mergeRowIndex > -1 && mergeColumnIndex > -1 && (rowspan || colspan)) {
            rowspan = XEUtils.toNumber(rowspan) || 1
            colspan = XEUtils.toNumber(colspan) || 1
            if (rowspan > 1 || colspan > 1) {
              const row = footerTableData[mergeRowIndex]
              const column = visibleColumn[mergeColumnIndex]
              let mergeItem = mergeFooterMaps[`${mergeRowIndex}:${mergeColumnIndex}`]
              if (mergeItem) {
                mergeItem.rowspan = rowspan
                mergeItem.colspan = colspan
                mergeItem._rowspan = rowspan
                mergeItem._colspan = colspan
              } else {
                mergeItem = {
                  row: mergeRowIndex,
                  col: mergeColumnIndex,
                  rowspan,
                  colspan,
                  _row: row,
                  _col: column,
                  _rowspan: rowspan,
                  _colspan: colspan
                }
                mergeFooterMaps[`${mergeRowIndex}:${mergeColumnIndex}`] = mergeItem
                mergeFooterList.push(mergeItem)
              }
            }
          }
        })
      }
    }

    const removeBodyMerges = (merges: VxeTableDefines.MergeOptions | VxeTableDefines.MergeOptions[]) => {
      const { mergeBodyList, fullColumnIdData, fullAllDataRowIdData, mergeBodyMaps } = internalData
      const rest: VxeTableDefines.MergeItem[] = []
      if (merges) {
        const { handleGetRowId } = createHandleGetRowId($xeTable)
        if (!XEUtils.isArray(merges)) {
          merges = [merges]
        }
        merges.forEach((item) => {
          const { row: margeRow, col: margeCol } = item
          let mergeRowIndex = -1
          let mergeColumnIndex = -1
          if (XEUtils.isNumber(margeRow)) {
            mergeRowIndex = margeRow
          } else {
            const rowid = margeRow ? handleGetRowId(margeRow) : null
            const rowRest = rowid ? fullAllDataRowIdData[rowid] : null
            if (rowRest) {
              mergeRowIndex = rowRest._index
            }
          }
          if (XEUtils.isNumber(margeCol)) {
            mergeColumnIndex = margeCol
          } else {
            const colid = margeCol ? margeCol.id : null
            const colRest = colid ? fullColumnIdData[colid] : null
            if (colRest) {
              mergeColumnIndex = colRest._index
            }
          }
          const mcIndex = XEUtils.findIndexOf(mergeBodyList, item => item.row === mergeRowIndex && item.col === mergeColumnIndex)
          if (mcIndex > -1) {
            const rItems = mergeBodyList.splice(mcIndex, 1)
            const item = rItems[0]
            if (item) {
              rest.push(rItems[0])
              if (mergeBodyMaps[`${mergeRowIndex}:${mergeColumnIndex}`]) {
                delete mergeBodyMaps[`${mergeRowIndex}:${mergeColumnIndex}`]
              }
            }
          }
        })
      }
      return rest
    }

    const removeFooterMerges = (merges: VxeTableDefines.MergeOptions | VxeTableDefines.MergeOptions[]) => {
      const { mergeFooterList, fullColumnIdData, mergeFooterMaps } = internalData
      const rest: VxeTableDefines.MergeItem[] = []
      if (merges) {
        if (!XEUtils.isArray(merges)) {
          merges = [merges]
        }
        merges.forEach((item) => {
          const { row: margeRow, col: margeCol } = item
          const mergeRowIndex = XEUtils.isNumber(margeRow) ? margeRow : -1
          let mergeColumnIndex = -1
          if (XEUtils.isNumber(margeCol)) {
            mergeColumnIndex = margeCol
          } else {
            const colid = margeCol ? margeCol.id : null
            const colRest = colid ? fullColumnIdData[colid] : null
            if (colRest) {
              mergeColumnIndex = colRest._index
            }
          }
          const mcIndex = XEUtils.findIndexOf(mergeFooterList, item => item.row === mergeRowIndex && item.col === mergeColumnIndex)
          if (mcIndex > -1) {
            const rItems = mergeFooterList.splice(mcIndex, 1)
            const item = rItems[0]
            if (item) {
              rest.push(item)
              if (mergeFooterMaps[`${mergeRowIndex}:${mergeColumnIndex}`]) {
                delete mergeFooterMaps[`${mergeRowIndex}:${mergeColumnIndex}`]
              }
            }
          }
        })
      }
      return rest
    }

    const handleSortEvent = (evnt: Event | null, sortConfs: VxeTableDefines.SortConfs | VxeTableDefines.SortConfs[], isUpdate?: boolean) => {
      const sortOpts = computeSortOpts.value
      const { multiple, remote, orders } = sortOpts
      if (!XEUtils.isArray(sortConfs)) {
        sortConfs = [sortConfs]
      }
      if (sortConfs && sortConfs.length) {
        if (!multiple) {
          sortConfs = [sortConfs[0]]
          clearAllSort()
        }
        let firstColumn: any = null
        sortConfs.forEach((confs: any, index: number) => {
          let { field, order } = confs
          let column = field
          if (XEUtils.isString(field)) {
            column = $xeTable.getColumnByField(field)
          }
          if (!firstColumn) {
            firstColumn = column
          }
          if (column && column.sortable) {
            if (orders && orders.indexOf(order) === -1) {
              order = getNextSortOrder(column)
            }
            if (column.order !== order) {
              column.order = order
            }
            column.sortTime = Date.now() + index
          }
        })
        if (isUpdate) {
          if (!remote) {
            $xeTable.handleTableData(true)
          }
        }
        if (evnt) {
          $xeTable.handleColumnSortEvent(evnt, firstColumn)
        }
        return nextTick().then(() => {
          updateRowOffsetTop()
          $xeTable.updateCellAreas()
          return updateStyle()
        })
      }
      return nextTick()
    }

    const clearAllSort = () => {
      const { tableFullColumn } = internalData
      tableFullColumn.forEach((column) => {
        column.order = null
      })
    }

    const calcTableHeight = (key: 'height' | 'minHeight' | 'maxHeight') => {
      const { parentHeight } = reactData
      const val = props[key]
      let num = 0
      if (val) {
        if (val === '100%' || val === 'auto') {
          num = parentHeight
        } else {
          const excludeHeight = $xeTable.getExcludeHeight()
          if (isScale(val)) {
            num = Math.floor((XEUtils.toInteger(val) || 1) / 100 * parentHeight)
          } else {
            num = XEUtils.toNumber(val)
          }
          num = Math.max(40, num - excludeHeight)
        }
      }
      return num
    }

    const handleCustomRestore = (storeData: VxeTableDefines.CustomStoreData) => {
      let { collectColumn } = internalData
      const { resizableData, sortData, visibleData, fixedData } = storeData
      let hasCustomSort = false
      // 处理还原
      if (resizableData || sortData || visibleData || fixedData) {
        XEUtils.eachTree(collectColumn, (column, index, items, path, parentColumn) => {
          const colKey = column.getKey()
          // 支持一级
          if (!parentColumn) {
            if (fixedData && fixedData[colKey] !== undefined) {
              column.fixed = fixedData[colKey]
            }
            if (sortData && XEUtils.isNumber(sortData[colKey])) {
              hasCustomSort = true
              column.renderSortNumber = sortData[colKey]
            }
          }
          if (resizableData && XEUtils.isNumber(resizableData[colKey])) {
            column.resizeWidth = resizableData[colKey]
          }
          if (visibleData && XEUtils.isBoolean(visibleData[colKey])) {
            column.visible = visibleData[colKey]
          }
        })
        // 如果自定义了顺序
        if (hasCustomSort) {
          collectColumn = XEUtils.orderBy(collectColumn, 'renderSortNumber')
          internalData.collectColumn = collectColumn
          internalData.tableFullColumn = getColumnList(collectColumn)
        }
        reactData.isCustomStatus = true
      } else {
        reactData.isCustomStatus = false
      }
    }

    /**
     * 还原自定义列操作状态
     */
    const restoreCustomStorage = () => {
      const { customConfig } = props
      const tableId = computeTableId.value
      const customOpts = computeCustomOpts.value
      const { storage, restoreStore, storeOptions } = customOpts
      const isAllCustom = storage === true
      const storageOpts: VxeTableDefines.VxeTableCustomStorageObj = isAllCustom ? {} : Object.assign({}, storage || {}, storeOptions)
      const isCustomResizable = hangleStorageDefaultValue(storageOpts.resizable, isAllCustom)
      const isCustomVisible = hangleStorageDefaultValue(storageOpts.visible, isAllCustom)
      const isCustomFixed = hangleStorageDefaultValue(storageOpts.fixed, isAllCustom)
      const isCustomSort = hangleStorageDefaultValue(storageOpts.sort, isAllCustom)
      const isCustomAggFunc = hangleStorageDefaultValue(storageOpts.aggFunc, isAllCustom)
      if (storage && (customConfig ? isEnableConf(customOpts) : customOpts.enabled) && (isCustomResizable || isCustomVisible || isCustomFixed || isCustomSort || isCustomAggFunc)) {
        if (!tableId) {
          errLog('vxe.error.reqProp', ['id'])
          return
        }
        const storeData: VxeTableDefines.CustomStoreData = getCustomStorageMap(tableId)
        if (restoreStore) {
          return Promise.resolve(
            restoreStore({ $table: $xeTable, id: tableId, type: 'restore', storeData })
          ).then(storeData => {
            if (!storeData) {
              return
            }
            return handleCustomRestore(storeData)
          }).catch(e => e)
        } else {
          return handleCustomRestore(storeData)
        }
      }
    }

    /**
     * 更新数据列的 Map
     * 牺牲数据组装的耗时，用来换取使用过程中的流畅
     */
    const cacheColumnMap = () => {
      const { tableFullColumn, collectColumn } = internalData
      const fullColumnIdData: Record<string, VxeTableDefines.ColumnCacheItem> = internalData.fullColumnIdData = {}
      const fullColumnFieldData: Record<string, VxeTableDefines.ColumnCacheItem> = internalData.fullColumnFieldData = {}
      const mouseOpts = computeMouseOpts.value
      const expandOpts = computeExpandOpts.value
      const columnOpts = computeColumnOpts.value
      const columnDragOpts = computeColumnDragOpts.value
      const virtualYOpts = computeVirtualYOpts.value
      const { isCrossDrag, isSelfToChildDrag } = columnDragOpts
      const customOpts = computeCustomOpts.value
      const { storage } = customOpts
      const rowOpts = computeRowOpts.value
      const isGroup = collectColumn.some(hasChildrenList)
      let isAllOverflow = !!props.showOverflow
      let rowGroupColumn: VxeTableDefines.ColumnInfo | undefined
      let expandColumn: VxeTableDefines.ColumnInfo | undefined
      let treeNodeColumn: VxeTableDefines.ColumnInfo | undefined
      let checkboxColumn: VxeTableDefines.ColumnInfo | undefined
      let radioColumn: VxeTableDefines.ColumnInfo | undefined
      let htmlColumn: VxeTableDefines.ColumnInfo | undefined
      let hasFixed: VxeColumnPropTypes.Fixed | undefined
      const handleFunc = (column: VxeTableDefines.ColumnInfo, index: number, items: VxeTableDefines.ColumnInfo[], path?: string[], parentColumn?: VxeTableDefines.ColumnInfo) => {
        const { id: colid, field, fixed, type, treeNode, rowGroupNode } = column
        const rest = { $index: -1, _index: -1, column, colid, index, items, parent: parentColumn || null, width: 0, oLeft: 0 }
        if (field) {
          if (fullColumnFieldData[field]) {
            errLog('vxe.error.colRepet', ['field', field])
          }
          fullColumnFieldData[field] = rest
        } else {
          if ((storage && !type) || (columnOpts.drag && (isCrossDrag || isSelfToChildDrag))) {
            errLog('vxe.error.reqProp', [`${column.getTitle() || type || ''} -> column.field=?`])
          }
        }
        if (!hasFixed && fixed) {
          hasFixed = fixed
        }
        if (!htmlColumn && type === 'html') {
          htmlColumn = column
        }
        if (treeNode) {
          if (treeNodeColumn) {
            warnLog('vxe.error.colRepet', ['tree-node', treeNode])
          }
          if (!treeNodeColumn) {
            treeNodeColumn = column
          }
        }
        if (rowGroupNode) {
          if (treeNodeColumn) {
            warnLog('vxe.error.colRepet', ['row-group-node', rowGroupNode])
          }
          if (!rowGroupColumn) {
            rowGroupColumn = column
          }
        }
        if (type === 'expand') {
          if (expandColumn) {
            warnLog('vxe.error.colRepet', ['type', type])
          }
          if (!expandColumn) {
            expandColumn = column
          }
        }
        if (type === 'checkbox') {
          if (checkboxColumn) {
            warnLog('vxe.error.colRepet', ['type', type])
          }
          if (!checkboxColumn) {
            checkboxColumn = column
          }
        } else if (type === 'radio') {
          if (radioColumn) {
            warnLog('vxe.error.colRepet', ['type', type])
          }
          if (!radioColumn) {
            radioColumn = column
          }
        }
        if (isAllOverflow && column.showOverflow === false) {
          isAllOverflow = false
        }
        if (fullColumnIdData[colid]) {
          errLog('vxe.error.colRepet', ['colId', colid])
        }
        fullColumnIdData[colid] = rest
      }
      if (isGroup) {
        XEUtils.eachTree(collectColumn, (column, index, items, path, parentColumn, nodes) => {
          column.level = nodes.length
          handleFunc(column, index, items, path, parentColumn)
        })
      } else {
        tableFullColumn.forEach(handleFunc)
      }

      if (expandColumn && expandOpts.mode !== 'fixed' && virtualYOpts.enabled) {
        warnLog('vxe.error.notConflictProp', ['column.type="expand', 'virtual-y-config.enabled=false'])
      }
      if ((expandColumn && expandOpts.mode !== 'fixed') && mouseOpts.area) {
        errLog('vxe.error.errConflicts', ['mouse-config.area', 'column.type=expand'])
      }

      if (htmlColumn) {
        if (!columnOpts.useKey) {
          errLog('vxe.error.reqProp', ['column-config.useKey & column.type=html'])
        }
        if (!rowOpts.useKey) {
          errLog('vxe.error.reqProp', ['row-config.useKey & column.type=html'])
        }
      }

      reactData.isGroup = isGroup
      reactData.rowGroupColumn = rowGroupColumn
      reactData.treeNodeColumn = treeNodeColumn
      reactData.expandColumn = expandColumn
      reactData.isAllOverflow = isAllOverflow
    }

    const updateHeight = () => {
      internalData.customHeight = calcTableHeight('height')
      internalData.customMinHeight = calcTableHeight('minHeight')
      internalData.customMaxHeight = calcTableHeight('maxHeight')

      // 如果启用虚拟滚动，默认高度
      if (reactData.scrollYLoad && !(internalData.customHeight || internalData.customMinHeight)) {
        internalData.customHeight = 300
      }
    }

    const calcColumnAutoWidth = (column: VxeTableDefines.ColumnInfo, wrapperEl: HTMLDivElement) => {
      const columnOpts = computeColumnOpts.value
      const { autoOptions } = columnOpts
      const { isCalcHeader, isCalcBody, isCalcFooter } = autoOptions || {}
      const querySelections: string[] = []
      if (isCalcHeader) {
        querySelections.push(`.vxe-header-cell--wrapper[colid="${column.id}"]`)
      }
      if (isCalcBody) {
        querySelections.push(`.vxe-body-cell--wrapper[colid="${column.id}"]`)
      }
      if (isCalcFooter) {
        querySelections.push(`.vxe-footer-cell--wrapper[colid="${column.id}"]`)
      }
      const cellElemList = querySelections.length ? wrapperEl.querySelectorAll(querySelections.join(',')) : []
      let leftRightPadding = 0
      const firstCellEl = cellElemList[0]
      if (firstCellEl && firstCellEl.parentElement) {
        const cellStyle = getComputedStyle(firstCellEl.parentElement)
        leftRightPadding = Math.ceil(XEUtils.toNumber(cellStyle.paddingLeft) + XEUtils.toNumber(cellStyle.paddingRight))
      }
      let colWidth = column.renderAutoWidth - leftRightPadding
      for (let i = 0; i < cellElemList.length; i++) {
        const celEl = cellElemList[i] as HTMLDivElement
        colWidth = Math.max(colWidth, celEl ? Math.ceil(celEl.scrollWidth) + 4 : 0)
      }
      return colWidth + leftRightPadding
    }

    const calcCellWidth = () => {
      const autoWidthColumnList = computeAutoWidthColumnList.value
      const { fullColumnIdData } = internalData
      const el = refElem.value
      if (el) {
        el.setAttribute('data-calc-col', 'Y')
        autoWidthColumnList.forEach(column => {
          const colid = column.id
          const colRest = fullColumnIdData[colid]
          const colWidth = calcColumnAutoWidth(column, el)
          if (colRest) {
            colRest.width = Math.max(colWidth, colRest.width)
          }
          column.renderAutoWidth = colWidth
        })
        $xeTable.analyColumnWidth()
        el.removeAttribute('data-calc-col')
      }
    }

    /**
     * 列宽算法，计算单元格列宽，动态分配可用剩余空间
     * 支持 px、%、固定 混合分配
     * 支持动态列表调整分配
     * 支持自动分配偏移量
     * 支持 width=60 width=60px width=10% min-width=60 min-width=60px min-width=10%
     */
    const autoCellWidth = () => {
      const { elemStore } = internalData
      const bodyWrapperElem = getRefElem(elemStore['main-body-wrapper'])
      if (!bodyWrapperElem) {
        return
      }
      const yHandleEl = refScrollYHandleElem.value
      if (!yHandleEl) {
        return
      }
      const xHandleEl = refScrollXHandleElem.value
      if (!xHandleEl) {
        return
      }
      let tWidth = 0
      const minCellWidth = 40 // 列宽最少限制 40px
      const bodyWidth = bodyWrapperElem.clientWidth
      let remainWidth = bodyWidth
      let meanWidth = remainWidth / 100
      const { fit } = props
      const { columnStore } = reactData
      const { resizeList, pxMinList, autoMinList, pxList, scaleList, scaleMinList, autoList, remainList } = columnStore
      // 最小宽
      pxMinList.forEach((column) => {
        const minWidth = XEUtils.toInteger(column.minWidth)
        tWidth += minWidth
        column.renderWidth = minWidth
      })
      // 最小自适应
      autoMinList.forEach((column) => {
        const caWidth = Math.max(60, XEUtils.toInteger(column.renderAutoWidth))
        tWidth += caWidth
        column.renderWidth = caWidth
      })
      // 最小百分比
      scaleMinList.forEach((column) => {
        const smWidth = Math.floor(XEUtils.toInteger(column.minWidth) * meanWidth)
        tWidth += smWidth
        column.renderWidth = smWidth
      })
      // 固定百分比
      scaleList.forEach((column) => {
        const sfWidth = Math.floor(XEUtils.toInteger(column.width) * meanWidth)
        tWidth += sfWidth
        column.renderWidth = sfWidth
      })
      // 固定宽
      pxList.forEach((column) => {
        const pWidth = XEUtils.toInteger(column.width)
        tWidth += pWidth
        column.renderWidth = pWidth
      })
      // 自适应宽
      autoList.forEach((column) => {
        const aWidth = Math.max(60, XEUtils.toInteger(column.renderAutoWidth))
        tWidth += aWidth
        column.renderWidth = aWidth
      })
      // 调整了列宽
      resizeList.forEach((column) => {
        const reWidth = XEUtils.toInteger(column.resizeWidth)
        tWidth += reWidth
        column.renderWidth = reWidth
      })
      remainWidth -= tWidth
      meanWidth = remainWidth > 0 ? Math.floor(remainWidth / (scaleMinList.length + pxMinList.length + autoMinList.length + remainList.length)) : 0
      if (fit) {
        if (remainWidth > 0) {
          scaleMinList.concat(pxMinList).concat(autoMinList).forEach((column) => {
            tWidth += meanWidth
            column.renderWidth += meanWidth
          })
        }
      } else {
        meanWidth = minCellWidth
      }
      // 剩余均分
      remainList.forEach((column) => {
        const width = Math.max(meanWidth, minCellWidth)
        column.renderWidth = width
        tWidth += width
      })
      if (fit) {
        /**
         * 偏移量算法
         * 如果所有列足够放的情况下，从最后动态列开始分配
         */
        const dynamicList = scaleList.concat(scaleMinList).concat(pxMinList).concat(autoMinList).concat(remainList)
        let dynamicSize = dynamicList.length - 1
        if (dynamicSize > 0) {
          let i = bodyWidth - tWidth
          if (i > 0) {
            while (i > 0 && dynamicSize >= 0) {
              i--
              dynamicList[dynamicSize--].renderWidth++
            }
            tWidth = bodyWidth
          }
        }
      }
      reactData.scrollXWidth = tWidth
      reactData.resizeWidthFlag++
      updateColumnOffsetLeft()
      updateHeight()
    }

    const calcCellAutoHeight = (rowRest: VxeTableDefines.RowCacheItem, wrapperEl: HTMLDivElement) => {
      const cellElemList = wrapperEl.querySelectorAll(`.vxe-cell--wrapper[rowid="${rowRest.rowid}"]`)
      let colHeight = rowRest.height
      for (let i = 0; i < cellElemList.length; i++) {
        const cellElem = cellElemList[i] as HTMLElement
        const tdEl = cellElem.parentElement as HTMLTableCellElement
        const topBottomPadding = Math.ceil(XEUtils.toNumber(tdEl.style.paddingTop) + XEUtils.toNumber(tdEl.style.paddingBottom))
        const cellHeight = cellElem ? cellElem.clientHeight : 0
        colHeight = Math.max(colHeight - topBottomPadding, Math.ceil(cellHeight))
      }
      return colHeight
    }

    const calcCellHeight = () => {
      const { tableData, isAllOverflow, scrollYLoad, scrollXLoad } = reactData
      const { fullAllDataRowIdData } = internalData
      const defaultRowHeight = computeDefaultRowHeight.value
      const el = refElem.value
      if (!isAllOverflow && scrollYLoad && el) {
        const { handleGetRowId } = createHandleGetRowId($xeTable)
        el.setAttribute('data-calc-row', 'Y')
        tableData.forEach(row => {
          const rowid = handleGetRowId(row)
          const rowRest = fullAllDataRowIdData[rowid]
          if (rowRest) {
            const reHeight = calcCellAutoHeight(rowRest, el)
            rowRest.height = Math.max(defaultRowHeight, scrollXLoad ? Math.max(rowRest.height, reHeight) : reHeight)
          }
          el.removeAttribute('data-calc-row')
        })
        reactData.calcCellHeightFlag++
      }
    }

    const getOrderField = (column: VxeTableDefines.ColumnInfo) => {
      const { sortBy, sortType } = column
      return (row: any) => {
        let cellValue
        if (sortBy) {
          cellValue = XEUtils.isFunction(sortBy) ? sortBy({ row, column }) : XEUtils.get(row, sortBy)
        } else {
          cellValue = tableMethods.getCellLabel(row, column)
        }
        if (!sortType || sortType === 'auto') {
          return isNaN(cellValue) ? cellValue : XEUtils.toNumber(cellValue)
        } else if (sortType === 'number') {
          return XEUtils.toNumber(cellValue)
        } else if (sortType === 'string') {
          return XEUtils.toValueString(cellValue)
        }
        return cellValue
      }
    }

    const updateAfterListIndex = () => {
      const { treeConfig } = props
      const { afterFullData, fullDataRowIdData, fullAllDataRowIdData } = internalData
      const { handleGetRowId } = createHandleGetRowId($xeTable)
      const fullMaps: Record<string, any> = {}
      afterFullData.forEach((row, index) => {
        const rowid = handleGetRowId(row)
        const rowRest = fullAllDataRowIdData[rowid]
        const seq = index + 1
        if (rowRest) {
          if (!treeConfig) {
            rowRest.seq = seq
          }
          rowRest._index = index
        } else {
          const rest = { row, rowid, seq, index: -1, $index: -1, _index: index, treeIndex: -1, items: [], parent: null, level: 0, height: 0, resizeHeight: 0, oTop: 0, expandHeight: 0 }
          fullAllDataRowIdData[rowid] = rest
          fullDataRowIdData[rowid] = rest
        }
        fullMaps[rowid] = row
      })
      internalData.afterFullRowMaps = fullMaps
    }

    /**
     * 预编译
     * 对渲染中的数据提前解析序号及索引。牺牲提前编译耗时换取渲染中额外损耗，使运行时更加流畅
     */
    const updateAfterDataIndex = () => {
      const { treeConfig } = props
      const { fullDataRowIdData, fullAllDataRowIdData, afterFullData, afterTreeFullData } = internalData
      const treeOpts = computeTreeOpts.value
      const { transform } = treeOpts
      const childrenField = treeOpts.children || treeOpts.childrenField
      const fullMaps: Record<string, any> = {}
      if (treeConfig) {
        const { handleGetRowId } = createHandleGetRowId($xeTable)
        XEUtils.eachTree(afterTreeFullData, (row, index, items, path) => {
          const rowid = handleGetRowId(row)
          const rowRest = fullAllDataRowIdData[rowid]
          const seq = path.map((num, i) => i % 2 === 0 ? (Number(num) + 1) : '.').join('')
          if (rowRest) {
            rowRest.seq = seq
            rowRest.treeIndex = index
          } else {
            const rest = { row, rowid, seq, index: -1, $index: -1, _index: -1, treeIndex: -1, items: [], parent: null, level: 0, height: 0, resizeHeight: 0, oTop: 0, expandHeight: 0 }
            fullAllDataRowIdData[rowid] = rest
            fullDataRowIdData[rowid] = rest
          }
          fullMaps[rowid] = row
        }, { children: transform ? treeOpts.mapChildrenField : childrenField })
        if (transform) {
          afterFullData.forEach((row, index) => {
            const rowid = handleGetRowId(row)
            const rowRest = fullAllDataRowIdData[rowid]
            const seq = index + 1
            if (rowRest) {
              if (!treeConfig) {
                rowRest.seq = seq
              }
              rowRest._index = index
            }
          })
        }
        internalData.afterFullRowMaps = fullMaps
      } else {
        updateAfterListIndex()
      }
    }

    /**
     * 如果为虚拟树、行分组、则将树结构拍平
     * @returns
     */
    const handleVirtualTreeToList = () => {
      const { treeConfig } = props
      const { isRowGroupStatus } = reactData
      const { fullAllDataRowIdData, treeExpandedMaps, rowGroupExpandedMaps } = internalData
      const aggregateOpts = computeAggregateOpts.value
      const treeOpts = computeTreeOpts.value
      const { handleGetRowId } = createHandleGetRowId($xeTable)
      const fullData: any[] = []
      const expandMaps: {
        [key: string]: number
      } = {}
      if (treeConfig && treeOpts.transform) {
        const childrenField = treeOpts.children || treeOpts.childrenField
        XEUtils.eachTree(internalData.afterTreeFullData, (row, index, items, path, parentRow) => {
          const rowid = handleGetRowId(row)
          const parentRowid = handleGetRowId(parentRow)
          if (!parentRow || (expandMaps[parentRowid] && treeExpandedMaps[parentRowid])) {
            const rowRest = fullAllDataRowIdData[rowid]
            if (rowRest) {
              rowRest._index = fullData.length
            }
            expandMaps[rowid] = 1
            fullData.push(row)
          }
        }, { children: childrenField })
        internalData.afterFullData = fullData
        updateScrollYStatus(fullData)
        return fullData
      } else if (isRowGroupStatus) {
        const { childrenField } = aggregateOpts
        XEUtils.eachTree(internalData.afterGroupFullData, (row, index, items, path, parentRow) => {
          const rowid = handleGetRowId(row)
          const parentRowid = handleGetRowId(parentRow)
          if (!parentRow || (expandMaps[parentRowid] && rowGroupExpandedMaps[parentRowid])) {
            const rowRest = fullAllDataRowIdData[rowid]
            if (rowRest) {
              rowRest._index = fullData.length
            }
            expandMaps[rowid] = 1
            fullData.push(row)
          }
        }, { children: childrenField })
        internalData.afterFullData = fullData
        updateScrollYStatus(fullData)
        return fullData
      }
      return internalData.afterFullData
    }

    /**
     * 编译处理后全量的表格数据
     * 如果存在筛选条件，继续处理
     */
    const updateAfterFullData = () => {
      const { treeConfig } = props
      const { isRowGroupStatus } = reactData
      const { tableFullColumn, tableFullData, tableFullTreeData, tableFullGroupData } = internalData
      const filterOpts = computeFilterOpts.value
      const sortOpts = computeSortOpts.value
      const aggregateOpts = computeAggregateOpts.value
      const treeOpts = computeTreeOpts.value
      const childrenField = treeOpts.children || treeOpts.childrenField
      const { transform, rowField, parentField, mapChildrenField } = treeOpts
      const { isEvery, remote: allRemoteFilter, filterMethod: allFilterMethod } = filterOpts
      const { remote: allRemoteSort, sortMethod: allSortMethod, multiple: sortMultiple, chronological } = sortOpts
      let tableData: any[] = []
      let tableTree: any[] = []
      // 处理数据
      if (!allRemoteFilter || !allRemoteSort) {
        const filterColumns: {
          column: VxeTableDefines.ColumnInfo
          valueList: any[]
          itemList: VxeTableDefines.FilterOption[]
        }[] = []
        let orderColumns: VxeTableDefines.SortCheckedParams[] = []
        tableFullColumn.forEach((column) => {
          const { field, sortable, order, filters } = column
          if (!allRemoteFilter && filters && filters.length) {
            const valueList: any[] = []
            const itemList: VxeTableDefines.FilterOption[] = []
            filters.forEach((item) => {
              if (item.checked) {
                itemList.push(item as VxeTableDefines.FilterOption)
                valueList.push(item.value)
              }
            })
            if (itemList.length) {
              filterColumns.push({ column, valueList, itemList })
            }
          }
          if (!allRemoteSort && sortable && order) {
            orderColumns.push({ column, field, property: field, order: order, sortTime: column.sortTime })
          }
        })
        if (sortMultiple && chronological && orderColumns.length > 1) {
          orderColumns = XEUtils.orderBy(orderColumns, 'sortTime')
        }

        // 处理筛选
        // 支持单列、多列、组合筛选
        if (!allRemoteFilter && filterColumns.length) {
          const handleFilter = (row: any) => {
            return filterColumns.every(({ column, valueList, itemList }) => {
              const { filterMethod, filterRender } = column
              const compConf = isEnableConf(filterRender) ? renderer.get(filterRender.name) : null
              const compFilterMethod = compConf ? (compConf.tableFilterMethod || compConf.filterMethod) : null
              const tdFilterMethod = compConf ? (compConf.tableFilterDefaultMethod || compConf.defaultTableFilterMethod || compConf.defaultFilterMethod) : null
              const cellValue = getCellValue(row, column)
              if (filterMethod) {
                return itemList.some((item) => filterMethod({ value: item.value, option: item, cellValue, row, column, $table: $xeTable }))
              } else if (compFilterMethod) {
                return itemList.some((item) => compFilterMethod({ value: item.value, option: item, cellValue, row, column, $table: $xeTable }))
              } else if (allFilterMethod) {
                return allFilterMethod({ $table: $xeTable, options: itemList, values: valueList, cellValue, row, column })
              } else if (tdFilterMethod) {
                return itemList.some((item) => tdFilterMethod({ value: item.value, option: item, cellValue, row, column, $table: $xeTable }))
              }
              return valueList.indexOf(XEUtils.get(row, column.field)) > -1
            })
          }
          if (isRowGroupStatus) {
            // 行分组
            tableTree = XEUtils.searchTree(tableFullGroupData, handleFilter, {
              original: true,
              isEvery: true,
              children: aggregateOpts.mapChildrenField,
              mapChildren: aggregateOpts.childrenField
            })
            tableData = tableTree
          } else if (treeConfig && transform) {
            // 筛选虚拟树
            tableTree = XEUtils.searchTree(tableFullTreeData, handleFilter, {
              original: true,
              isEvery,
              children: mapChildrenField,
              mapChildren: childrenField
            })
            tableData = tableTree
          } else {
            tableData = treeConfig ? tableFullTreeData.filter(handleFilter) : tableFullData.filter(handleFilter)
            tableTree = tableData
          }
        } else {
          if (isRowGroupStatus) {
            // 还原行分组
            tableTree = XEUtils.searchTree(tableFullGroupData, () => true, {
              original: true,
              isEvery: true,
              children: aggregateOpts.mapChildrenField,
              mapChildren: aggregateOpts.childrenField
            })
            tableData = tableTree
          } else if (treeConfig && transform) {
            // 还原虚拟树
            tableTree = XEUtils.searchTree(tableFullTreeData, () => true, {
              original: true,
              isEvery,
              children: mapChildrenField,
              mapChildren: childrenField
            })
            tableData = tableTree
          } else {
            tableData = treeConfig ? tableFullTreeData.slice(0) : tableFullData.slice(0)
            tableTree = tableData
          }
        }

        // 处理排序
        // 支持单列、多列、组合排序
        if (!allRemoteSort && orderColumns.length) {
          if (isRowGroupStatus) {
            // 行分组的排序
            if (allSortMethod) {
              const sortRests = allSortMethod({ data: tableTree, sortList: orderColumns, $table: $xeTable })
              tableTree = XEUtils.isArray(sortRests) ? sortRests : tableTree
            } else {
              const treeList = XEUtils.toTreeArray(tableTree, {
                key: aggregateOpts.rowField,
                parentKey: aggregateOpts.parentField,
                children: aggregateOpts.mapChildrenField
              })
              tableTree = XEUtils.toArrayTree(
                XEUtils.orderBy(treeList, orderColumns.map(({ column, order }) => [getOrderField(column), order])),
                {
                  key: aggregateOpts.rowField,
                  parentKey: aggregateOpts.parentField,
                  children: aggregateOpts.childrenField,
                  mapChildren: aggregateOpts.mapChildrenField
                }
              )
            }
            tableData = tableTree
          } else if (treeConfig && transform) {
            // 虚拟树的排序
            if (allSortMethod) {
              const sortRests = allSortMethod({ data: tableTree, sortList: orderColumns, $table: $xeTable })
              tableTree = XEUtils.isArray(sortRests) ? sortRests : tableTree
            } else {
              const treeList = XEUtils.toTreeArray(tableTree, {
                children: mapChildrenField
              })
              tableTree = XEUtils.toArrayTree(
                XEUtils.orderBy(treeList, orderColumns.map(({ column, order }) => [getOrderField(column), order])),
                {
                  key: rowField,
                  parentKey: parentField,
                  children: childrenField,
                  mapChildren: mapChildrenField
                }
              )
            }
            tableData = tableTree
          } else {
            if (allSortMethod) {
              const sortRests = allSortMethod({ data: tableData, sortList: orderColumns, $table: $xeTable })
              tableData = XEUtils.isArray(sortRests) ? sortRests : tableData
            } else {
              tableData = XEUtils.orderBy(tableData, orderColumns.map(({ column, order }) => [getOrderField(column), order]))
            }
            tableTree = tableData
          }
        }
      } else {
        if (isRowGroupStatus) {
          // 还原行分组
          // 还原虚拟树
          tableTree = XEUtils.searchTree(tableFullGroupData, () => true, {
            original: true,
            isEvery: true,
            children: aggregateOpts.mapChildrenField,
            mapChildren: aggregateOpts.childrenField
          })
          tableData = tableTree
        } else if (treeConfig && transform) {
          // 还原虚拟树
          tableTree = XEUtils.searchTree(tableFullTreeData, () => true, {
            original: true,
            isEvery,
            children: mapChildrenField,
            mapChildren: childrenField
          })
          tableData = tableTree
        } else {
          tableData = treeConfig ? tableFullTreeData.slice(0) : tableFullData.slice(0)
          tableTree = tableData
        }
      }
      internalData.afterFullData = tableData
      internalData.afterTreeFullData = tableTree
      internalData.afterGroupFullData = tableTree
      updateAfterDataIndex()
    }

    const updateStyle = () => {
      const { showHeaderOverflow: allColumnHeaderOverflow, showFooterOverflow: allColumnFooterOverflow, mouseConfig, spanMethod, footerSpanMethod } = props
      const { isGroup, currentRow, tableColumn, scrollXLoad, scrollYLoad, overflowX, scrollbarWidth, overflowY, scrollbarHeight, scrollXWidth, columnStore, editStore, isAllOverflow, expandColumn, isColLoading } = reactData
      const { visibleColumn, tableHeight, headerHeight, footerHeight, elemStore, customHeight, customMinHeight, customMaxHeight } = internalData
      const el = refElem.value
      if (!el) {
        return
      }
      const containerList = ['main', 'left', 'right']
      const osbWidth = overflowY ? scrollbarWidth : 0
      const osbHeight = overflowX ? scrollbarHeight : 0
      const emptyPlaceholderElem = refEmptyPlaceholder.value
      const mouseOpts = computeMouseOpts.value
      const expandOpts = computeExpandOpts.value
      const bodyWrapperElem = getRefElem(elemStore['main-body-wrapper'])
      const bodyTableElem = getRefElem(elemStore['main-body-table'])
      if (emptyPlaceholderElem) {
        emptyPlaceholderElem.style.top = `${headerHeight}px`
        emptyPlaceholderElem.style.height = bodyWrapperElem ? `${bodyWrapperElem.offsetHeight - osbHeight}px` : ''
      }

      let bodyHeight = 0
      let bodyMaxHeight = 0
      const bodyMinHeight = customMinHeight - headerHeight - footerHeight - osbHeight
      if (customMaxHeight) {
        bodyMaxHeight = Math.max(bodyMinHeight, customMaxHeight - headerHeight - footerHeight - osbHeight)
      }
      if (customHeight) {
        bodyHeight = customHeight - headerHeight - footerHeight - osbHeight
      }
      if (!bodyHeight) {
        if (bodyTableElem) {
          bodyHeight = bodyTableElem.clientHeight
        }
      }
      if (bodyHeight) {
        if (bodyMaxHeight) {
          bodyHeight = Math.min(bodyMaxHeight, bodyHeight)
        }
        bodyHeight = Math.max(bodyMinHeight, bodyHeight)
      }

      const scrollbarXToTop = computeScrollbarXToTop.value

      const xLeftCornerEl = refScrollXLeftCornerElem.value
      const xRightCornerEl = refScrollXRightCornerElem.value
      const scrollXVirtualEl = refScrollXVirtualElem.value
      if (scrollXVirtualEl) {
        scrollXVirtualEl.style.height = `${osbHeight}px`
        scrollXVirtualEl.style.visibility = overflowX ? 'visible' : 'hidden'
      }
      const xWrapperEl = refScrollXWrapperElem.value
      if (xWrapperEl) {
        xWrapperEl.style.left = scrollbarXToTop ? `${osbWidth}px` : ''
        xWrapperEl.style.width = `${el.clientWidth - osbWidth}px`
      }
      if (xLeftCornerEl) {
        xLeftCornerEl.style.width = scrollbarXToTop ? `${osbWidth}px` : ''
        xLeftCornerEl.style.display = scrollbarXToTop ? (overflowX && osbHeight ? 'block' : '') : ''
      }
      if (xRightCornerEl) {
        xRightCornerEl.style.width = scrollbarXToTop ? '' : `${osbWidth}px`
        xRightCornerEl.style.display = scrollbarXToTop ? '' : (overflowX && osbHeight ? 'block' : '')
      }

      const scrollYVirtualEl = refScrollYVirtualElem.value
      if (scrollYVirtualEl) {
        scrollYVirtualEl.style.width = `${osbWidth}px`
        scrollYVirtualEl.style.height = `${bodyHeight + headerHeight + footerHeight}px`
        scrollYVirtualEl.style.visibility = overflowY ? 'visible' : 'hidden'
      }
      const yTopCornerEl = refScrollYTopCornerElem.value
      if (yTopCornerEl) {
        yTopCornerEl.style.height = `${headerHeight}px`
        yTopCornerEl.style.display = overflowY && headerHeight ? 'block' : ''
      }
      const yWrapperEl = refScrollYWrapperElem.value
      if (yWrapperEl) {
        yWrapperEl.style.height = `${bodyHeight}px`
        yWrapperEl.style.top = `${headerHeight}px`
      }
      const yBottomCornerEl = refScrollYBottomCornerElem.value
      if (yBottomCornerEl) {
        yBottomCornerEl.style.height = `${footerHeight}px`
        yBottomCornerEl.style.top = `${headerHeight + bodyHeight}px`
        yBottomCornerEl.style.display = overflowY && footerHeight ? 'block' : ''
      }

      const rowExpandEl = refRowExpandElem.value
      if (rowExpandEl) {
        rowExpandEl.style.height = `${bodyHeight}px`
        rowExpandEl.style.top = `${headerHeight}px`
      }

      containerList.forEach((name, index) => {
        const fixedType = index > 0 ? name : ''
        const layoutList = ['header', 'body', 'footer']
        const isFixedLeft = fixedType === 'left'
        let fixedColumn: VxeTableDefines.ColumnInfo[] = []
        let fixedWrapperElem: HTMLDivElement
        if (fixedType) {
          fixedColumn = isFixedLeft ? columnStore.leftList : columnStore.rightList
          fixedWrapperElem = isFixedLeft ? refLeftContainer.value : refRightContainer.value
        }
        layoutList.forEach(layout => {
          const wrapperElem = getRefElem(elemStore[`${name}-${layout}-wrapper`])
          const currScrollElem = getRefElem(elemStore[`${name}-${layout}-scroll`])
          const tableElem = getRefElem(elemStore[`${name}-${layout}-table`])
          if (layout === 'header') {
            // 表头体样式处理
            // 横向滚动渲染
            let renderColumnList = tableColumn
            let isOptimizeMode = false

            if (isGroup) {
              renderColumnList = visibleColumn
            } else {
              // 如果是使用优化模式
              if (scrollXLoad && allColumnHeaderOverflow) {
                if (spanMethod || footerSpanMethod) {
                  // 如果不支持优化模式
                } else {
                  isOptimizeMode = true
                }
              }

              if (!isOptimizeMode || (!isColLoading && (fixedType || !overflowX))) {
                renderColumnList = visibleColumn
              }

              if (fixedType) {
                // 如果是使用优化模式
                if (isOptimizeMode) {
                  renderColumnList = fixedColumn || []
                }
              }
            }

            const tWidth = renderColumnList.reduce((previous, column) => previous + column.renderWidth, 0)

            if (fixedType) {
              if (isGroup) {
                if (wrapperElem) {
                  wrapperElem.style.width = scrollXWidth ? `${scrollXWidth}px` : ''
                }
              } else {
                if (isOptimizeMode) {
                  if (wrapperElem) {
                    wrapperElem.style.width = tWidth ? `${tWidth}px` : ''
                  }
                } else {
                  if (wrapperElem) {
                    wrapperElem.style.width = scrollXWidth ? `${scrollXWidth}px` : ''
                  }
                }
              }
            }

            if (currScrollElem) {
              currScrollElem.style.height = `${headerHeight}px`
            }

            if (tableElem) {
              tableElem.style.width = tWidth ? `${tWidth}px` : ''
            }
          } else if (layout === 'body') {
            if (currScrollElem) {
              currScrollElem.style.maxHeight = customMaxHeight ? `${bodyMaxHeight}px` : ''
              currScrollElem.style.height = customHeight ? `${bodyHeight}px` : ''
              currScrollElem.style.minHeight = `${bodyMinHeight}px`
            }

            // 如果是固定列
            if (fixedWrapperElem) {
              if (wrapperElem) {
                wrapperElem.style.top = `${headerHeight}px`
              }
              fixedWrapperElem.style.height = `${customHeight > 0 ? customHeight : (tableHeight + headerHeight + footerHeight + osbHeight)}px`
              fixedWrapperElem.style.width = `${fixedColumn.reduce((previous, column) => previous + column.renderWidth, 0)}px`
            }

            let renderColumnList = tableColumn

            let isOptimizeMode = false
            // 如果是使用优化模式
            if (scrollXLoad || scrollYLoad || isAllOverflow) {
              if ((expandColumn && expandOpts.mode !== 'fixed') || spanMethod || footerSpanMethod) {
                // 如果不支持优化模式
              } else {
                isOptimizeMode = true
              }
            }

            if (fixedType) {
              renderColumnList = visibleColumn
              if (isOptimizeMode) {
                renderColumnList = fixedColumn || []
              }
            }

            const tWidth = renderColumnList.reduce((previous, column) => previous + column.renderWidth, 0)

            if (fixedType) {
              if (isOptimizeMode) {
                if (wrapperElem) {
                  wrapperElem.style.width = tWidth ? `${tWidth}px` : ''
                }
              } else {
                if (wrapperElem) {
                  wrapperElem.style.width = scrollXWidth ? `${scrollXWidth}px` : ''
                }
              }
            }

            if (tableElem) {
              tableElem.style.width = tWidth ? `${tWidth}px` : ''
              // 兼容性处理
              tableElem.style.paddingRight = osbWidth && fixedType && (browseObj.firefox || browseObj.safari) ? `${osbWidth}px` : ''
            }
            const emptyBlockElem = getRefElem(elemStore[`${name}-${layout}-emptyBlock`])
            if (emptyBlockElem) {
              emptyBlockElem.style.width = tWidth ? `${tWidth}px` : ''
            }
          } else if (layout === 'footer') {
            let renderColumnList = tableColumn
            let isOptimizeMode = false
            // 如果是使用优化模式
            if (scrollXLoad && allColumnFooterOverflow) {
              if (spanMethod || footerSpanMethod) {
                // 如果不支持优化模式
              } else {
                isOptimizeMode = true
              }
            }

            if (!isOptimizeMode || (!isColLoading && (fixedType || !overflowX))) {
              renderColumnList = visibleColumn
            }

            if (fixedType) {
              if (isOptimizeMode) {
                renderColumnList = fixedColumn || []
              }
            }

            const tWidth = renderColumnList.reduce((previous, column) => previous + column.renderWidth, 0)

            if (fixedType) {
              if (isOptimizeMode) {
                if (wrapperElem) {
                  wrapperElem.style.width = tWidth ? `${tWidth}px` : ''
                }
              } else {
                if (wrapperElem) {
                  wrapperElem.style.width = scrollXWidth ? `${scrollXWidth}px` : ''
                }
              }
            }

            if (currScrollElem) {
              currScrollElem.style.height = `${footerHeight}px`
              // 如果是固定列
              if (fixedWrapperElem) {
                if (wrapperElem) {
                  wrapperElem.style.top = `${customHeight > 0 ? customHeight - footerHeight - osbHeight : tableHeight + headerHeight}px`
                }
              }
            }
            if (tableElem) {
              tableElem.style.width = tWidth ? `${tWidth}px` : ''
            }
          }
        })
      })
      if (currentRow) {
        $xeTable.setCurrentRow(currentRow)
      }
      if (mouseConfig && mouseOpts.selected && editStore.selected.row && editStore.selected.column) {
        $xeTable.addCellSelectedClass()
      }
      return nextTick()
    }

    const checkValidate = (type: any) => {
      if ($xeTable.triggerValidate) {
        return $xeTable.triggerValidate(type)
      }
      return nextTick()
    }

    /**
     * 当单元格发生改变时
     * 如果存在规则，则校验
     */
    const handleChangeCell = (evnt: Event, params: any) => {
      checkValidate('blur')
        .catch((e: any) => e)
        .then(() => {
          $xeTable.handleEdit(params, evnt)
            .then(() => checkValidate('change'))
            .catch((e: any) => e)
        })
    }

    const handleDefaultSort = () => {
      const { sortConfig } = props
      if (sortConfig) {
        const sortOpts = computeSortOpts.value
        let { defaultSort } = sortOpts
        if (defaultSort) {
          if (!XEUtils.isArray(defaultSort)) {
            defaultSort = [defaultSort]
          }
          if (defaultSort.length) {
            (sortConfig.multiple ? defaultSort : defaultSort.slice(0, 1)).forEach((item: any, index: number) => {
              const { field, order } = item
              if (field && order) {
                const column = $xeTable.getColumnByField(field)
                if (column && column.sortable) {
                  column.order = order
                  column.sortTime = Date.now() + index
                }
              }
            })
            if (!sortOpts.remote) {
              $xeTable.handleTableData(true).then(updateStyle)
            }
          }
        }
      }
    }

    /**
     * 处理默认勾选
     */
    const handleDefaultSelectionChecked = () => {
      const { checkboxConfig } = props
      if (checkboxConfig) {
        const { fullDataRowIdData } = internalData
        const checkboxOpts = computeCheckboxOpts.value
        const { checkAll, checkRowKeys } = checkboxOpts
        if (checkAll) {
          handleCheckedAllCheckboxRow(true, true)
        } else if (checkRowKeys) {
          const defSelection: any[] = []
          checkRowKeys.forEach((rowid: any) => {
            if (fullDataRowIdData[rowid]) {
              defSelection.push(fullDataRowIdData[rowid].row)
            }
          })
          handleCheckedCheckboxRow(defSelection, true, true)
        }
      }
    }

    /**
     * 处理单选框默认勾选
     */
    const handleDefaultRadioChecked = () => {
      const { radioConfig } = props
      if (radioConfig) {
        const { fullDataRowIdData } = internalData
        const radioOpts = computeRadioOpts.value
        const { checkRowKey: rowid, reserve } = radioOpts
        if (rowid) {
          if (fullDataRowIdData[rowid]) {
            handleCheckedRadioRow(fullDataRowIdData[rowid].row, true)
          }
          if (reserve) {
            const rowkey = getRowkey($xeTable)
            internalData.radioReserveRow = { [rowkey]: rowid }
          }
        }
      }
    }

    /**
     * 处理默认展开行
     */
    const handleDefaultRowExpand = () => {
      const { expandConfig } = props
      if (expandConfig) {
        const { fullDataRowIdData } = internalData
        const expandOpts = computeExpandOpts.value
        const { expandAll, expandRowKeys } = expandOpts
        if (expandAll) {
          $xeTable.setAllRowExpand(true)
        } else if (expandRowKeys) {
          const defExpandeds: any[] = []
          expandRowKeys.forEach((rowid: any) => {
            if (fullDataRowIdData[rowid]) {
              defExpandeds.push(fullDataRowIdData[rowid].row)
            }
          })
          $xeTable.setRowExpand(defExpandeds, true)
        }
      }
    }

    const handleRadioReserveRow = (row: any) => {
      const radioOpts = computeRadioOpts.value
      if (radioOpts.reserve) {
        internalData.radioReserveRow = row
      }
    }

    const handleCheckboxReserveRow = (row: any, checked: boolean) => {
      const { checkboxReserveRowMap } = internalData
      const checkboxOpts = computeCheckboxOpts.value
      if (checkboxOpts.reserve) {
        const rowid = getRowid($xeTable, row)
        if (checked) {
          checkboxReserveRowMap[rowid] = row
        } else if (checkboxReserveRowMap[rowid]) {
          delete checkboxReserveRowMap[rowid]
        }
      }
    }

    const handleCheckedRadioRow = (row: any, isForce?: boolean) => {
      const radioOpts = computeRadioOpts.value
      const { checkMethod } = radioOpts
      if (row && (isForce || (!checkMethod || checkMethod({ $table: $xeTable, row })))) {
        reactData.selectRadioRow = row
        handleRadioReserveRow(row)
      }
      return nextTick()
    }

    const handleCheckedCheckboxRow = (rows: any[], value: boolean, isForce?: boolean) => {
      if (rows && !XEUtils.isArray(rows)) {
        rows = [rows]
      }
      $xeTable.handleBatchSelectRows(rows, !!value, isForce)
      $xeTable.checkSelectionStatus()
      return nextTick()
    }

    const handleCheckedAllCheckboxRow = (checked: boolean, isForce?: boolean) => {
      const { treeConfig } = props
      const { isRowGroupStatus } = reactData
      const { afterFullData, afterTreeFullData, afterGroupFullData, checkboxReserveRowMap, selectCheckboxMaps } = internalData
      const treeOpts = computeTreeOpts.value
      const aggregateOpts = computeAggregateOpts.value
      const childrenField = treeOpts.children || treeOpts.childrenField
      const checkboxOpts = computeCheckboxOpts.value
      const { checkField, reserve, checkMethod } = checkboxOpts
      const { handleGetRowId } = createHandleGetRowId($xeTable)
      // indeterminateField 仅支持读取
      const indeterminateField = checkboxOpts.indeterminateField || checkboxOpts.halfField
      const selectRowMaps: Record<string, any> = {}

      /**
       * 绑定属性方式（有污染）
       * 必须在行数据存在对应的属性，否则将不响应
       */
      if (checkField) {
        const checkValFn = (row: any) => {
          if (isForce || (!checkMethod || checkMethod({ $table: $xeTable, row }))) {
            if (checked) {
              selectRowMaps[handleGetRowId(row)] = row
            }
            XEUtils.set(row, checkField, checked)
          }
          if ((treeConfig || isRowGroupStatus) && indeterminateField) {
            XEUtils.set(row, indeterminateField, false)
          }
        }
        // 如果存在选中方法
        // 如果方法成立，则更新值，否则忽略该数据
        if ((treeConfig || isRowGroupStatus)) {
          XEUtils.eachTree(afterFullData, checkValFn, { children: childrenField })
        } else {
          afterFullData.forEach(checkValFn)
        }
      } else {
        /**
         * 默认方式（无污染）
         * 无需任何属性，直接绑定
         */
        if (isRowGroupStatus) {
          if (checked) {
            /**
             * 如果是行分组勾选
             * 如果方法成立，则添加到临时集合中
             */
            XEUtils.eachTree(afterGroupFullData, (row) => {
              if (isForce || (!checkMethod || checkMethod({ $table: $xeTable, row }))) {
                const rowid = handleGetRowId(row)
                selectRowMaps[rowid] = row
              }
            }, { children: aggregateOpts.mapChildrenField })
          } else {
            /**
             * 如果是树取消
             * 如果方法成立，则不添加到临时集合中
             */
            if (!isForce && checkMethod) {
              XEUtils.eachTree(afterGroupFullData, (row) => {
                const rowid = handleGetRowId(row)
                if (checkMethod({ $table: $xeTable, row }) ? false : selectCheckboxMaps[rowid]) {
                  selectRowMaps[rowid] = row
                }
              }, { children: aggregateOpts.mapChildrenField })
            }
          }
        } else if (treeConfig) {
          if (checked) {
            /**
             * 如果是树勾选
             * 如果方法成立，则添加到临时集合中
             */
            XEUtils.eachTree(afterTreeFullData, (row) => {
              if (isForce || (!checkMethod || checkMethod({ $table: $xeTable, row }))) {
                const rowid = handleGetRowId(row)
                selectRowMaps[rowid] = row
              }
            }, { children: childrenField })
          } else {
            /**
             * 如果是树取消
             * 如果方法成立，则不添加到临时集合中
             */
            if (!isForce && checkMethod) {
              XEUtils.eachTree(afterTreeFullData, (row) => {
                const rowid = handleGetRowId(row)
                if (checkMethod({ $table: $xeTable, row }) ? false : selectCheckboxMaps[rowid]) {
                  selectRowMaps[rowid] = row
                }
              }, { children: childrenField })
            }
          }
        } else {
          if (checked) {
            /**
             * 如果是行勾选
             * 如果存在选中方法且成立或者本身已勾选，则添加到临时集合中
             * 如果不存在选中方法，则添加所有数据到临时集合中
             */
            if (!isForce && checkMethod) {
              afterFullData.forEach((row) => {
                const rowid = handleGetRowId(row)
                if (selectCheckboxMaps[rowid] || checkMethod({ $table: $xeTable, row })) {
                  selectRowMaps[rowid] = row
                }
              })
            } else {
              afterFullData.forEach(row => {
                const rowid = handleGetRowId(row)
                selectRowMaps[rowid] = row
              })
            }
          } else {
            /**
             * 如果是行取消
             * 如果方法成立，则不添加到临时集合中；如果方法不成立则判断当前是否已勾选，如果已被勾选则添加到新集合中
             * 如果不存在选中方法，无需处理，临时集合默认为空
             */
            if (!isForce && checkMethod) {
              afterFullData.forEach((row) => {
                const rowid = handleGetRowId(row)
                if (checkMethod({ $table: $xeTable, row }) ? false : selectCheckboxMaps[rowid]) {
                  selectRowMaps[rowid] = row
                }
              })
            }
          }
        }
      }
      if (reserve) {
        if (checked) {
          XEUtils.each(selectRowMaps, (row, rowid) => {
            checkboxReserveRowMap[rowid] = row
          })
        } else {
          afterFullData.forEach((row) => handleCheckboxReserveRow(row, false))
        }
      }
      reactData.updateCheckboxFlag++
      internalData.selectCheckboxMaps = checkField ? {} : selectRowMaps

      reactData.isAllSelected = checked
      reactData.isIndeterminate = false
      internalData.treeIndeterminateRowMaps = {}
      $xeTable.checkSelectionStatus()
      return nextTick()
    }

    // 还原展开、选中等相关状态
    const handleReserveStatus = () => {
      const { treeConfig } = props
      const { expandColumn, currentRow, selectRadioRow } = reactData
      const { fullDataRowIdData, fullAllDataRowIdData, radioReserveRow, selectCheckboxMaps, treeExpandedMaps, rowExpandedMaps } = internalData
      const expandOpts = computeExpandOpts.value
      const treeOpts = computeTreeOpts.value
      const radioOpts = computeRadioOpts.value
      const checkboxOpts = computeCheckboxOpts.value
      // 单选框
      if (selectRadioRow && !fullAllDataRowIdData[getRowid($xeTable, selectRadioRow)]) {
        reactData.selectRadioRow = null // 刷新单选行状态
      }
      // 还原保留选中状态
      if (radioOpts.reserve && radioReserveRow) {
        const rowid = getRowid($xeTable, radioReserveRow)
        if (fullDataRowIdData[rowid]) {
          handleCheckedRadioRow(fullDataRowIdData[rowid].row, true)
        }
      }
      // 复选框
      internalData.selectCheckboxMaps = getRecoverRowMaps(selectCheckboxMaps) // 刷新多选行状态
      reactData.updateCheckboxFlag++
      // 还原保留选中状态
      if (checkboxOpts.reserve) {
        handleCheckedCheckboxRow(handleReserveRow(internalData.checkboxReserveRowMap), true, true)
      }
      if (currentRow && !fullAllDataRowIdData[getRowid($xeTable, currentRow)]) {
        reactData.currentRow = null // 刷新当前行状态
      }
      // 行展开
      internalData.rowExpandedMaps = expandColumn ? getRecoverRowMaps(rowExpandedMaps) : {} // 刷新行展开状态
      reactData.rowExpandedFlag++
      // 还原保留状态
      if (expandColumn && expandOpts.reserve) {
        $xeTable.setRowExpand(handleReserveRow(internalData.rowExpandedReserveRowMap), true)
      }
      // 树展开
      internalData.treeExpandedMaps = treeConfig ? getRecoverRowMaps(treeExpandedMaps) : {} // 刷新树展开状态
      reactData.treeExpandedFlag++
      if (treeConfig && treeOpts.reserve) {
        $xeTable.setTreeExpand(handleReserveRow(internalData.treeExpandedReserveRowMap), true)
      }
    }

    /**
     * 处理默认展开树节点
     */
    const handleDefaultTreeExpand = () => {
      const { treeConfig } = props
      if (treeConfig) {
        const { tableFullData } = internalData
        const treeOpts = computeTreeOpts.value
        const { expandAll, expandRowKeys } = treeOpts
        const childrenField = treeOpts.children || treeOpts.childrenField
        if (expandAll) {
          $xeTable.setAllTreeExpand(true)
        } else if (expandRowKeys) {
          const defExpandeds: any[] = []
          const rowkey = getRowkey($xeTable)
          expandRowKeys.forEach((rowid: any) => {
            const matchObj = XEUtils.findTree(tableFullData, item => rowid === XEUtils.get(item, rowkey), { children: childrenField })
            if (matchObj) {
              defExpandeds.push(matchObj.item)
            }
          })
          $xeTable.setTreeExpand(defExpandeds, true)
        }
      }
    }

    const handleAsyncTreeExpandChilds = (row: any): Promise<void> => {
      const treeOpts = computeTreeOpts.value
      const checkboxOpts = computeCheckboxOpts.value
      const { transform, loadMethod } = treeOpts
      const { checkStrictly } = checkboxOpts
      return new Promise<void>(resolve => {
        if (loadMethod) {
          const { fullAllDataRowIdData, treeExpandLazyLoadedMaps } = internalData
          const rowid = getRowid($xeTable, row)
          const rowRest = fullAllDataRowIdData[rowid]
          treeExpandLazyLoadedMaps[rowid] = row
          Promise.resolve(
            loadMethod({ $table: $xeTable, row })
          ).then((childRecords: any) => {
            if (rowRest) {
              rowRest.treeLoaded = true
            }
            if (treeExpandLazyLoadedMaps[rowid]) {
              delete treeExpandLazyLoadedMaps[rowid]
            }
            if (!XEUtils.isArray(childRecords)) {
              childRecords = []
            }
            if (childRecords) {
              return $xeTable.loadTreeChildren(row, childRecords).then(childRows => {
                const { treeExpandedMaps } = internalData
                if (childRows.length && !treeExpandedMaps[rowid]) {
                  treeExpandedMaps[rowid] = row
                }
                reactData.treeExpandedFlag++
                // 如果当前节点已选中，则展开后子节点也被选中
                if (!checkStrictly && $xeTable.isCheckedByCheckboxRow(row)) {
                  handleCheckedCheckboxRow(childRows, true)
                }
                return nextTick().then(() => {
                  if (transform) {
                    $xeTable.handleTableData()
                    updateAfterDataIndex()
                    return nextTick()
                  }
                })
              })
            }
          }).catch(() => {
            const { treeExpandLazyLoadedMaps } = internalData
            if (rowRest) {
              rowRest.treeLoaded = false
            }
            if (treeExpandLazyLoadedMaps[rowid]) {
              delete treeExpandLazyLoadedMaps[rowid]
            }
          }).finally(() => {
            reactData.treeExpandedFlag++
            nextTick().then(() => $xeTable.recalculate()).then(() => resolve())
          })
        } else {
          resolve()
        }
      })
    }

    const handleTreeExpandReserve = (row: any, expanded: boolean) => {
      const { treeExpandedReserveRowMap } = internalData
      const treeOpts = computeTreeOpts.value
      if (treeOpts.reserve) {
        const rowid = getRowid($xeTable, row)
        if (expanded) {
          treeExpandedReserveRowMap[rowid] = row
        } else if (treeExpandedReserveRowMap[rowid]) {
          delete treeExpandedReserveRowMap[rowid]
        }
      }
    }

    const handleAsyncRowExpand = (row: any): Promise<void> => {
      return new Promise<void>(resolve => {
        const expandOpts = computeExpandOpts.value
        const { loadMethod } = expandOpts
        if (loadMethod) {
          const { fullAllDataRowIdData, rowExpandLazyLoadedMaps } = internalData
          const rowid = getRowid($xeTable, row)
          const rowRest = fullAllDataRowIdData[rowid]
          rowExpandLazyLoadedMaps[rowid] = row
          loadMethod({ $table: $xeTable, row, rowIndex: $xeTable.getRowIndex(row), $rowIndex: $xeTable.getVMRowIndex(row) }).then(() => {
            const { rowExpandedMaps } = internalData
            if (rowRest) {
              rowRest.expandLoaded = true
            }
            rowExpandedMaps[rowid] = row
            reactData.rowExpandedFlag++
          }).catch(() => {
            if (rowRest) {
              rowRest.expandLoaded = false
            }
          }).finally(() => {
            const { rowExpandLazyLoadedMaps } = internalData
            if (rowExpandLazyLoadedMaps[rowid]) {
              delete rowExpandLazyLoadedMaps[rowid]
            }
            reactData.rowExpandedFlag++
            nextTick()
              .then(() => $xeTable.recalculate())
              .then(() => $xeTable.updateCellAreas())
              .then(() => resolve())
          })
        } else {
          resolve()
        }
      })
    }

    const handleRowExpandReserve = (row: any, expanded: boolean) => {
      const { rowExpandedReserveRowMap } = internalData
      const expandOpts = computeExpandOpts.value
      if (expandOpts.reserve) {
        const rowid = getRowid($xeTable, row)
        if (expanded) {
          rowExpandedReserveRowMap[rowid] = row
        } else if (rowExpandedReserveRowMap[rowid]) {
          delete rowExpandedReserveRowMap[rowid]
        }
      }
    }

    const handleDefaultMergeCells = () => {
      const { mergeCells } = props
      if (mergeCells) {
        $xeTable.setMergeCells(mergeCells)
      }
    }

    const handleDefaultMergeFooterItems = () => {
      const { mergeFooterItems } = props
      if (mergeFooterItems) {
        $xeTable.setMergeFooterItems(mergeFooterItems)
      }
    }

    // 计算可视渲染相关数据
    const computeScrollLoad = () => {
      return nextTick().then(() => {
        const { scrollXLoad, scrollYLoad } = reactData
        const { scrollXStore, scrollYStore } = internalData
        const virtualYOpts = computeVirtualYOpts.value
        const virtualXOpts = computeVirtualXOpts.value
        // 计算 X 逻辑
        if (scrollXLoad) {
          const { toVisibleIndex: toXVisibleIndex, visibleSize: visibleXSize } = handleVirtualXVisible()
          const offsetXSize = Math.max(0, virtualXOpts.oSize ? XEUtils.toNumber(virtualXOpts.oSize) : 0)
          scrollXStore.preloadSize = XEUtils.toNumber(virtualXOpts.preSize)
          scrollXStore.offsetSize = offsetXSize
          scrollXStore.visibleSize = visibleXSize
          scrollXStore.endIndex = Math.max(scrollXStore.startIndex + scrollXStore.visibleSize + offsetXSize, scrollXStore.endIndex)
          scrollXStore.visibleStartIndex = Math.max(scrollXStore.startIndex, toXVisibleIndex)
          scrollXStore.visibleEndIndex = Math.min(scrollXStore.endIndex, toXVisibleIndex + visibleXSize)
          $xeTable.updateScrollXData().then(() => {
            loadScrollXData()
          })
        } else {
          $xeTable.updateScrollXSpace()
        }
        // 计算 Y 逻辑
        const rowHeight = computeRowHeight()

        ;(scrollYStore as any).rowHeight = rowHeight // 已废弃

        reactData.rowHeight = rowHeight
        const { toVisibleIndex: toYVisibleIndex, visibleSize: visibleYSize } = handleVirtualYVisible()
        if (scrollYLoad) {
          const offsetYSize = Math.max(0, virtualYOpts.oSize ? XEUtils.toNumber(virtualYOpts.oSize) : 0)
          scrollYStore.preloadSize = XEUtils.toNumber(virtualYOpts.preSize)
          scrollYStore.offsetSize = offsetYSize
          scrollYStore.visibleSize = visibleYSize
          scrollYStore.endIndex = Math.max(scrollYStore.startIndex + visibleYSize + offsetYSize, scrollYStore.endIndex)
          scrollYStore.visibleStartIndex = Math.max(scrollYStore.startIndex, toYVisibleIndex)
          scrollYStore.visibleEndIndex = Math.min(scrollYStore.endIndex, toYVisibleIndex + visibleYSize)
          $xeTable.updateScrollYData().then(() => {
            loadScrollYData()
          })
        } else {
          $xeTable.updateScrollYSpace()
        }
      })
    }

    const calcScrollbar = () => {
      const { scrollXWidth, scrollYHeight } = reactData
      const { elemStore } = internalData
      const scrollbarOpts = computeScrollbarOpts.value
      const bodyWrapperElem = getRefElem(elemStore['main-body-wrapper'])
      const headerTableElem = getRefElem(elemStore['main-header-table'])
      const footerTableElem = getRefElem(elemStore['main-footer-table'])
      const xHandleEl = refScrollXHandleElem.value
      const yHandleEl = refScrollYHandleElem.value
      let overflowY = false
      let overflowX = false
      if (bodyWrapperElem) {
        overflowY = scrollYHeight > bodyWrapperElem.clientHeight
        if (yHandleEl) {
          reactData.scrollbarWidth = scrollbarOpts.width || (yHandleEl.offsetWidth - yHandleEl.clientWidth) || 14
        }
        reactData.overflowY = overflowY

        overflowX = scrollXWidth > bodyWrapperElem.clientWidth
        if (xHandleEl) {
          reactData.scrollbarHeight = scrollbarOpts.height || (xHandleEl.offsetHeight - xHandleEl.clientHeight) || 14
        }

        const headerHeight = headerTableElem ? headerTableElem.clientHeight : 0
        const footerHeight = footerTableElem ? footerTableElem.clientHeight : 0
        internalData.tableHeight = bodyWrapperElem.offsetHeight
        internalData.headerHeight = headerHeight
        internalData.footerHeight = footerHeight

        reactData.overflowX = overflowX
        reactData.parentHeight = Math.max(internalData.headerHeight + footerHeight + 20, $xeTable.getParentHeight())
      }
      if (overflowX) {
        $xeTable.checkScrolling()
      }
    }

    const handleRecalculateStyle = (reFull: boolean, reWidth: boolean, reHeight: boolean) => {
      const el = refElem.value
      internalData.rceRunTime = Date.now()
      if (!el || !el.clientWidth) {
        return nextTick()
      }
      const varEl = refVarElem.value
      if (varEl) {
        const [defEl, mediumEl, smallEl, miniEl] = varEl.children
        calcVarRowHeightConfig('default', defEl)
        calcVarRowHeightConfig('medium', mediumEl)
        calcVarRowHeightConfig('small', smallEl)
        calcVarRowHeightConfig('mini', miniEl)
      }
      if (reWidth) {
        calcCellWidth()
      }
      if (reFull) {
        autoCellWidth()
      }
      calcScrollbar()
      updateStyle()
      updateRowExpandStyle()
      return computeScrollLoad().then(() => {
        // 初始化时需要在列计算之后再执行优化运算，达到最优显示效果
        if (reWidth) {
          calcCellWidth()
        }
        if (reFull) {
          autoCellWidth()
        }
        if (reHeight) {
          calcCellHeight()
        }
        updateStyle()
        calcScrollbar()
        if (reFull) {
          updateRowOffsetTop()
        }
        updateRowExpandStyle()
        if (reFull) {
          return computeScrollLoad()
        }
      })
    }

    const handleLazyRecalculate = (reFull: boolean, reWidth: boolean, reHeight: boolean) => {
      return new Promise<void>(resolve => {
        const { rceTimeout, rceRunTime } = internalData
        const resizeOpts = computeResizeOpts.value
        const refreshDelay = resizeOpts.refreshDelay || 20
        const el = refElem.value
        if (el && el.clientWidth) {
          autoCellWidth()
          updateRowExpandStyle()
        }
        if (rceTimeout) {
          clearTimeout(rceTimeout)
          if (rceRunTime && rceRunTime + (refreshDelay - 5) < Date.now()) {
            resolve(
              handleRecalculateStyle(reFull, reWidth, reHeight)
            )
          } else {
            nextTick(() => {
              resolve()
            })
          }
        } else {
          resolve(
            handleRecalculateStyle(reFull, reWidth, reHeight)
          )
        }
        internalData.rceTimeout = setTimeout(() => {
          internalData.rceTimeout = undefined
          handleRecalculateStyle(reFull, reWidth, reHeight)
        }, refreshDelay)
      })
    }

    const handleUpdateAggValues = () => {
      const { visibleColumn } = internalData
      const aggCols: VxeTableDefines.ColumnInfo[] = []
      visibleColumn.forEach(column => {
        if (column.aggFunc) {
          aggCols.push(column)
        }
      })
      reactData.aggHandleAggColumns = aggCols
    }

    const handleUpdateRowGroup = (groupFields?: string[]) => {
      const aggFields: string[] = []
      const aggConfs: { field: string }[] = []
      if (groupFields) {
        (XEUtils.isArray(groupFields) ? groupFields : [groupFields]).forEach(field => {
          aggFields.push(field)
          aggConfs.push({
            field
          })
        })
      }
      reactData.rowGroupList = aggConfs
      reactData.aggHandleFields = aggFields
      handleUpdateAggValues()
    }

    const handleeGroupSummary = (aggList: VxeTableDefines.AggregateRowInfo[]) => {
      const aggregateOpts = computeAggregateOpts.value
      const { mapChildrenField } = aggregateOpts
      if (mapChildrenField) {
        XEUtils.lastEach(aggList, aggRow => {
          let count = 0
          XEUtils.each(aggRow[mapChildrenField], (row: VxeTableDefines.AggregateRowInfo) => {
            if (row.isAggregate) {
              count += row.childCount || 0
            } else {
              count++
            }
          })
          aggRow.childCount = count
        })
        if ($xeTable.handlePivotTableAggregateData) {
          $xeTable.handlePivotTableAggregateData(aggList)
        }
      }
    }

    const updateGroupData = () => {
      const { aggregateConfig, rowGroupConfig } = props
      const { isRowGroupStatus } = reactData
      const { tableFullGroupData } = internalData
      const aggregateOpts = computeAggregateOpts.value
      const { mapChildrenField } = aggregateOpts
      if ((aggregateConfig || rowGroupConfig) && isRowGroupStatus) {
        const aggList: VxeTableDefines.AggregateRowInfo[] = []
        XEUtils.eachTree(tableFullGroupData, row => {
          if (row.isAggregate) {
            aggList.push(row)
          }
        }, { children: mapChildrenField })
        handleeGroupSummary(aggList)
      }
    }

    const handleGroupData = (list: any[], rowGroups: VxeTableDefines.RowGroupItem[]) => {
      let fullData = list
      let treeData = list
      if (rowGroups) {
        const aggregateOpts = computeAggregateOpts.value
        const { rowField, parentField, childrenField, mapChildrenField } = aggregateOpts
        const checkboxOpts = computeCheckboxOpts.value
        const { checkField } = checkboxOpts
        const indeterminateField = checkboxOpts.indeterminateField || checkboxOpts.halfField
        const rgItem = rowGroups[0]
        if (rgItem && rowField && parentField && childrenField && mapChildrenField) {
          fullData = []
          treeData = []
          const groupField = rgItem.field
          const groupColumn = $xeTable.getColumnByField(groupField)
          const groupMaps: Record<string, any[]> = {}
          const aggList: VxeTableDefines.AggregateRowInfo[] = []
          const rowkey = getRowkey($xeTable)
          list.forEach((row) => {
            const cellValue = groupColumn ? $xeTable.getCellLabel(row, groupColumn) : XEUtils.get(row, groupField)
            const groupValue = XEUtils.eqNull(cellValue) ? '' : cellValue
            let childList = groupMaps[groupValue]
            if (!childList) {
              childList = []
              groupMaps[groupValue] = childList
            }
            if (row.isAggregate) {
              row.isAggregate = undefined
            }
            childList.push(row)
          })
          XEUtils.objectEach(groupMaps, (childList, groupValue) => {
            const { fullData: childFullData, treeData: childTreeData } = handleGroupData(childList, rowGroups.slice(1))
            const aggRow: VxeTableDefines.AggregateRowInfo = {
              isAggregate: true,
              aggData: {},
              groupContent: groupValue,
              groupField,
              childCount: 0,
              [rowField]: getRowUniqueId(),
              [parentField]: null,
              [rowkey]: getRowUniqueId(),
              [childrenField]: childTreeData,
              [mapChildrenField]: childTreeData
            }
            if (checkField) {
              aggRow[checkField] = false
            }
            if (indeterminateField) {
              aggRow[indeterminateField] = false
            }
            aggList.push(aggRow)
            treeData.push(aggRow)
            fullData.push(aggRow)
            if (childFullData.length) {
              fullData.push(...childFullData)
            }
          })
          handleeGroupSummary(aggList)
        }
      }
      return {
        treeData,
        fullData
      }
    }

    /**
     * 加载表格数据
     * @param {Array} datas 数据
     */
    const loadTableData = (datas: any[], isReset: boolean) => {
      const { keepSource, treeConfig, rowGroupConfig, aggregateConfig } = props
      const { rowGroupList, scrollYLoad: oldScrollYLoad } = reactData
      const { scrollYStore, scrollXStore, lastScrollLeft, lastScrollTop } = internalData
      const rowOpts = computeRowOpts.value
      const treeOpts = computeTreeOpts.value
      const expandOpts = computeExpandOpts.value
      const { transform } = treeOpts
      const childrenField = treeOpts.children || treeOpts.childrenField
      let treeData = []
      let fullData = reactive(datas ? datas.slice(0) : []) // 转为响应式数据
      if (fullData.length > supportMaxRow) {
        errLog('vxe.error.errMaxRow', [supportMaxRow])
      }
      if (treeConfig && rowGroupList.length) {
        errLog('vxe.error.noTree', ['aggregate-config'])
        return nextTick()
      }
      if (rowOpts.drag && rowGroupList.length) {
        errLog('vxe.error.errConflicts', ['row-config.drag', 'aggregate-config'])
        return nextTick()
      }
      let isRGroup = false
      if (treeConfig) {
        if (transform) {
          // 树结构自动转换
          if (!treeOpts.rowField) {
            errLog('vxe.error.reqProp', ['tree-config.rowField'])
          }
          if (!treeOpts.parentField) {
            errLog('vxe.error.reqProp', ['tree-config.parentField'])
          }
          if (!childrenField) {
            errLog('vxe.error.reqProp', ['tree-config.childrenField'])
          }
          if (!treeOpts.mapChildrenField) {
            errLog('vxe.error.reqProp', ['tree-config.mapChildrenField'])
          }
          if (childrenField === treeOpts.mapChildrenField) {
            errLog('vxe.error.errConflicts', ['tree-config.childrenField', 'tree-config.mapChildrenField'])
          }
          // fullData.forEach(row => {
          //   if (row[treeOpts.children] && row[treeOpts.children].length) {
          //     warnLog('vxe.error.errConflicts', ['tree-config.transform', `row.${treeOpts.children}`])
          //   }
          // })
          treeData = XEUtils.toArrayTree(fullData, {
            key: treeOpts.rowField,
            parentKey: treeOpts.parentField,
            children: childrenField,
            mapChildren: treeOpts.mapChildrenField
          })
          fullData = treeData.slice(0)
        } else {
          treeData = fullData.slice(0)
        }
      } else if ((aggregateConfig || rowGroupConfig) && rowGroupList.length) {
        const groupRest = handleGroupData(fullData, rowGroupList)
        treeData = groupRest.treeData
        fullData = groupRest.fullData
        isRGroup = true
      }
      reactData.isRowGroupStatus = isRGroup
      scrollYStore.startIndex = 0
      scrollYStore.endIndex = 1
      scrollXStore.startIndex = 0
      scrollXStore.endIndex = 1
      internalData.cvCacheMaps = {}
      reactData.isRowLoading = true
      reactData.scrollVMLoading = false
      // internalData.treeExpandedMaps = {}
      reactData.treeExpandedFlag++
      // internalData.rowExpandedMaps = {}
      reactData.rowExpandedFlag++
      internalData.insertRowMaps = {}
      reactData.insertRowFlag++
      internalData.removeRowMaps = {}
      reactData.removeRowFlag++
      const sYLoad = updateScrollYStatus(fullData)
      // 全量数据
      internalData.tableFullData = fullData
      internalData.tableFullTreeData = isRGroup ? [] : treeData
      internalData.tableFullGroupData = isRGroup ? treeData : []
      // 缓存数据
      $xeTable.cacheRowMap(isReset)
      // 原始数据
      internalData.tableSynchData = datas
      if (isReset) {
        internalData.isResizeCellHeight = false
      }
      // 克隆原数据，用于显示编辑状态，与编辑值做对比
      if (keepSource) {
        $xeTable.cacheSourceMap(fullData)
      }
      if ($xeTable.clearCellAreas && props.mouseConfig) {
        $xeTable.clearCellAreas()
        $xeTable.clearCopyCellArea()
      }
      $xeTable.clearMergeCells()
      $xeTable.clearMergeFooterItems()
      $xeTable.handleTableData(true)
      $xeTable.updateFooter()
      $xeTable.handleUpdateBodyMerge()
      return nextTick().then(() => {
        updateHeight()
        updateStyle()
      }).then(() => {
        computeScrollLoad()
      }).then(() => {
        // 是否启用了虚拟滚动
        if (sYLoad) {
          scrollYStore.endIndex = scrollYStore.visibleSize
        }

        if (sYLoad) {
          if (reactData.expandColumn && expandOpts.mode !== 'fixed') {
            errLog('vxe.error.notConflictProp', ['column.type="expand', 'expand-config.mode="fixed"'])
          }
          // if (showOverflow) {
          //   if (!rowOpts.height) {
          //     const errColumn = internalData.tableFullColumn.find(column => column.showOverflow === false)
          //     if (errColumn) {
          //       errLog('vxe.error.errProp', [`column[field="${errColumn.field}"].show-overflow=false`, 'show-overflow=true'])
          //     }
          //   }
          // }

          if (!(props.height || props.maxHeight)) {
            errLog('vxe.error.reqProp', ['height | max-height | virtual-y-config={enabled: false}'])
          }
          // if (!props.showOverflow) {
          //   warnLog('vxe.error.reqProp', ['table.show-overflow'])
          // }
          if (props.spanMethod) {
            errLog('vxe.error.scrollErrProp', ['table.span-method'])
          }
        }

        handleReserveStatus()
        $xeTable.checkSelectionStatus()
        return new Promise<void>(resolve => {
          nextTick()
            .then(() => handleRecalculateStyle(false, false, false))
            .then(() => {
              handleRecalculateStyle(false, true, true)
              updateRowOffsetTop()
            })
            .then(() => {
              let targetScrollLeft = lastScrollLeft
              let targetScrollTop = lastScrollTop
              const virtualXOpts = computeVirtualXOpts.value
              const virtualYOpts = computeVirtualYOpts.value
              // 是否在更新数据之后自动滚动重置滚动条
              if (virtualXOpts.scrollToLeftOnChange) {
                targetScrollLeft = 0
              }
              if (virtualYOpts.scrollToTopOnChange) {
                targetScrollTop = 0
              }
              reactData.isRowLoading = false
              handleRecalculateStyle(false, false, false)
              // 是否变更虚拟滚动
              if (oldScrollYLoad === sYLoad) {
                restoreScrollLocation($xeTable, targetScrollLeft, targetScrollTop)
                  .then(() => {
                    handleRecalculateStyle(false, true, true)
                    updateRowOffsetTop()
                    resolve()
                  })
              } else {
                setTimeout(() => {
                  restoreScrollLocation($xeTable, targetScrollLeft, targetScrollTop)
                    .then(() => {
                      handleRecalculateStyle(false, true, true)
                      updateRowOffsetTop()
                      resolve()
                    })
                })
              }
            })
        })
      })
    }

    /**
     * 处理数据加载默认行为
     * 默认执行一次，除非被重置
     */
    const handleLoadDefaults = () => {
      handleDefaultSelectionChecked()
      handleDefaultRadioChecked()
      handleDefaultRowExpand()
      handleDefaultTreeExpand()
      handleDefaultMergeCells()
      handleDefaultMergeFooterItems()
      nextTick(() => setTimeout(() => $xeTable.recalculate()))
    }

    /**
     * 处理初始化的默认行为
     * 只会执行一次
     */
    const handleInitDefaults = () => {
      handleDefaultSort()
    }

    const handleTableColumn = () => {
      const { scrollXLoad } = reactData
      const { visibleColumn, scrollXStore, fullColumnIdData } = internalData
      const tableColumn = scrollXLoad ? visibleColumn.slice(scrollXStore.startIndex, scrollXStore.endIndex) : visibleColumn.slice(0)
      tableColumn.forEach((column, $index) => {
        const colid = column.id
        const colRest = fullColumnIdData[colid]
        if (colRest) {
          colRest.$index = $index
        }
      })
      reactData.tableColumn = tableColumn
    }

    const handleUpdateColumn = () => {
      const columnList = XEUtils.orderBy(internalData.collectColumn, 'renderSortNumber')
      internalData.collectColumn = columnList
      const tableFullColumn = getColumnList(columnList)
      internalData.tableFullColumn = tableFullColumn
      cacheColumnMap()
    }

    const loadScrollXData = () => {
      const { isScrollXBig } = reactData
      const { mergeBodyList, mergeFooterList, scrollXStore } = internalData
      const { preloadSize, startIndex, endIndex, offsetSize } = scrollXStore
      const { toVisibleIndex, visibleSize } = handleVirtualXVisible()
      const offsetItem = {
        startIndex: Math.max(0, isScrollXBig ? toVisibleIndex - 1 : toVisibleIndex - 1 - offsetSize - preloadSize),
        endIndex: isScrollXBig ? toVisibleIndex + visibleSize : toVisibleIndex + visibleSize + offsetSize + preloadSize
      }
      scrollXStore.visibleStartIndex = toVisibleIndex - 1
      scrollXStore.visibleEndIndex = toVisibleIndex + visibleSize + 1
      calculateMergerOffsetIndex(mergeBodyList.concat(mergeFooterList), offsetItem, 'col')
      const { startIndex: offsetStartIndex, endIndex: offsetEndIndex } = offsetItem
      if (toVisibleIndex <= startIndex || toVisibleIndex >= endIndex - visibleSize - 1) {
        if (startIndex !== offsetStartIndex || endIndex !== offsetEndIndex) {
          scrollXStore.startIndex = offsetStartIndex
          scrollXStore.endIndex = offsetEndIndex
          $xeTable.updateScrollXData()
        }
      }
      $xeTable.closeTooltip()
    }

    // 获取所有的列，排除分组
    const getColumnList = (columns: VxeTableDefines.ColumnInfo[]) => {
      const result: VxeTableDefines.ColumnInfo[] = []
      columns.forEach((column) => {
        result.push(...(column.children && column.children.length ? getColumnList(column.children) : [column]))
      })
      return result
    }

    const parseColumns = (isReset: boolean) => {
      // const { showOverflow } = props
      // const rowOpts = computeRowOpts.value
      const leftList: VxeTableDefines.ColumnInfo[] = []
      const centerList: VxeTableDefines.ColumnInfo[] = []
      const rightList: VxeTableDefines.ColumnInfo[] = []
      const { isGroup, columnStore } = reactData
      const { collectColumn, tableFullColumn, scrollXStore, fullColumnIdData } = internalData
      // 如果是分组表头，如果子列全部被隐藏，则根列也隐藏
      if (isGroup) {
        const leftGroupList: VxeTableDefines.ColumnInfo[] = []
        const centerGroupList: VxeTableDefines.ColumnInfo[] = []
        const rightGroupList: VxeTableDefines.ColumnInfo[] = []
        XEUtils.eachTree(collectColumn, (column, index, items, path, parentColumn) => {
          const isColGroup = hasChildrenList(column)
          // 如果是分组，必须按组设置固定列，不允许给子列设置固定
          if (parentColumn && parentColumn.fixed) {
            column.fixed = parentColumn.fixed
          }
          if (parentColumn && column.fixed !== parentColumn.fixed) {
            errLog('vxe.error.groupFixed')
          }
          if (isColGroup) {
            column.visible = !!XEUtils.findTree(column.children, (subColumn) => hasChildrenList(subColumn) ? false : subColumn.visible)
          } else if (column.visible) {
            if (column.fixed === 'left') {
              leftList.push(column)
            } else if (column.fixed === 'right') {
              rightList.push(column)
            } else {
              centerList.push(column)
            }
          }
        })
        collectColumn.forEach((column) => {
          if (column.visible) {
            if (column.fixed === 'left') {
              leftGroupList.push(column)
            } else if (column.fixed === 'right') {
              rightGroupList.push(column)
            } else {
              centerGroupList.push(column)
            }
          }
        })
        reactData.tableGroupColumn = leftGroupList.concat(centerGroupList).concat(rightGroupList)
      } else {
        // 重新分配列
        tableFullColumn.forEach((column) => {
          if (column.visible) {
            if (column.fixed === 'left') {
              leftList.push(column)
            } else if (column.fixed === 'right') {
              rightList.push(column)
            } else {
              centerList.push(column)
            }
          }
        })
      }
      const visibleColumn = leftList.concat(centerList).concat(rightList)
      internalData.visibleColumn = visibleColumn
      updateColumnOffsetLeft()
      const sXLoad = updateScrollXStatus()
      reactData.hasFixedColumn = leftList.length > 0 || rightList.length > 0
      Object.assign(columnStore, { leftList, centerList, rightList })
      if (sXLoad) {
        // if (showOverflow) {
        //   if (!rowOpts.height) {
        //     const errColumn = internalData.tableFullColumn.find(column => column.showOverflow === false)
        //     if (errColumn) {
        //       errLog('vxe.error.errProp', [`column[field="${errColumn.field}"].show-overflow=false`, 'show-overflow=true'])
        //     }
        //   }
        // }
        // if (props.showHeader && !props.showHeaderOverflow) {
        //   warnLog('vxe.error.reqProp', ['show-header-overflow'])
        // }
        // if (props.showFooter && !props.showFooterOverflow) {
        //   warnLog('vxe.error.reqProp', ['show-footer-overflow'])
        // }
        if (props.spanMethod) {
          warnLog('vxe.error.scrollErrProp', ['span-method'])
        }
        if (props.footerSpanMethod) {
          warnLog('vxe.error.scrollErrProp', ['footer-span-method'])
        }
        if (isReset) {
          const { visibleSize } = handleVirtualXVisible()
          scrollXStore.startIndex = 0
          scrollXStore.endIndex = visibleSize
          scrollXStore.visibleSize = visibleSize
          scrollXStore.visibleStartIndex = 0
          scrollXStore.visibleEndIndex = visibleSize
        }
      }
      // 如果列被显示/隐藏，则清除合并状态
      // 如果列被设置为固定，则清除合并状态
      if (visibleColumn.length !== internalData.visibleColumn.length || !internalData.visibleColumn.every((column, index) => column === visibleColumn[index])) {
        $xeTable.clearMergeCells()
        $xeTable.clearMergeFooterItems()
      }
      visibleColumn.forEach((column, index) => {
        const colid = column.id
        const colRest = fullColumnIdData[colid]
        if (colRest) {
          colRest._index = index
        }
      })
      handleTableColumn()
      handleUpdateAggValues()
      if (isReset) {
        updateColumnOffsetLeft()
        return $xeTable.updateFooter().then(() => {
          return $xeTable.recalculate()
        }).then(() => {
          $xeTable.updateCellAreas()
          return $xeTable.recalculate()
        })
      }
      return $xeTable.updateFooter()
    }

    const initColumnSort = () => {
      const { collectColumn } = internalData
      collectColumn.forEach((column, index) => {
        const sortIndex = index + 1
        column.sortNumber = sortIndex
        column.renderSortNumber = sortIndex
      })
    }

    const handleColumn = (collectColumn: VxeTableDefines.ColumnInfo[]) => {
      const expandOpts = computeExpandOpts.value
      internalData.collectColumn = collectColumn
      const tableFullColumn = getColumnList(collectColumn)
      internalData.tableFullColumn = tableFullColumn
      reactData.isColLoading = true
      initColumnSort()
      return Promise.resolve(
        restoreCustomStorage()
      ).then(() => {
        const { scrollXLoad, scrollYLoad, expandColumn } = reactData
        cacheColumnMap()
        parseColumns(true).then(() => {
          if (reactData.scrollXLoad) {
            loadScrollXData()
          }
        })
        $xeTable.clearMergeCells()
        $xeTable.clearMergeFooterItems()
        $xeTable.handleTableData(true)
        $xeTable.handleAggregateSummaryData()

        if ((scrollXLoad || scrollYLoad) && (expandColumn && expandOpts.mode !== 'fixed')) {
          warnLog('vxe.error.scrollErrProp', ['column.type=expand'])
        }

        return nextTick().then(() => {
          if ($xeToolbar) {
            $xeToolbar.syncUpdate({
              collectColumn: internalData.collectColumn,
              $table: $xeTable
            })
          }
          if ($xeTable.handleUpdateCustomColumn) {
            $xeTable.handleUpdateCustomColumn()
          }
          reactData.isColLoading = false
          return handleLazyRecalculate(false, true, true)
        })
      })
    }

    const updateScrollXStatus = (fullColumn?: any[]) => {
      const virtualXOpts = computeVirtualXOpts.value
      const allCols = fullColumn || internalData.tableFullColumn
      // 如果gt为0，则总是启用
      const scrollXLoad = !!virtualXOpts.enabled && virtualXOpts.gt > -1 && (virtualXOpts.gt === 0 || virtualXOpts.gt < allCols.length)
      reactData.scrollXLoad = scrollXLoad
      return scrollXLoad
    }

    const updateScrollYStatus = (fullData?: any[]) => {
      const { treeConfig } = props
      const virtualYOpts = computeVirtualYOpts.value
      const treeOpts = computeTreeOpts.value
      const { transform } = treeOpts
      const allList = fullData || internalData.tableFullData
      // 如果gt为0，则总是启用
      const scrollYLoad = (transform || !treeConfig) && !!virtualYOpts.enabled && virtualYOpts.gt > -1 && (virtualYOpts.gt === 0 || virtualYOpts.gt < allList.length)
      reactData.scrollYLoad = scrollYLoad
      return scrollYLoad
    }

    /**
     * 展开与收起树节点
     * @param rows
     * @param expanded
     * @returns
     */
    const handleBaseTreeExpand = (rows: any[], expanded: boolean) => {
      const { treeNodeColumn } = reactData
      const { fullAllDataRowIdData, tableFullTreeData, treeExpandedMaps, treeExpandLazyLoadedMaps } = internalData
      const treeOpts = computeTreeOpts.value
      const { reserve, lazy, accordion, toggleMethod } = treeOpts
      const childrenField = treeOpts.children || treeOpts.childrenField
      const hasChildField = treeOpts.hasChild || treeOpts.hasChildField
      const result: any[] = []
      const columnIndex = $xeTable.getColumnIndex(treeNodeColumn)
      const $columnIndex = $xeTable.getVMColumnIndex(treeNodeColumn)
      const { handleGetRowId } = createHandleGetRowId($xeTable)
      let validRows = toggleMethod ? rows.filter((row: any) => toggleMethod({ $table: $xeTable, expanded, column: treeNodeColumn, columnIndex, $columnIndex, row })) : rows
      if (accordion) {
        validRows = validRows.length ? [validRows[validRows.length - 1]] : []
        // 同一级只能展开一个
        const matchObj = XEUtils.findTree(tableFullTreeData, item => item === validRows[0], { children: childrenField })
        if (matchObj) {
          matchObj.items.forEach(item => {
            const rowid = handleGetRowId(item)
            if (treeExpandedMaps[rowid]) {
              delete treeExpandedMaps[rowid]
            }
          })
        }
      }
      if (expanded) {
        validRows.forEach((row: any) => {
          const rowid = handleGetRowId(row)
          if (!treeExpandedMaps[rowid]) {
            const rowRest = fullAllDataRowIdData[rowid]
            if (rowRest) {
              const isLoad = lazy && row[hasChildField] && !rowRest.treeLoaded && !treeExpandLazyLoadedMaps[rowid]
              // 是否使用懒加载
              if (isLoad) {
                result.push(handleAsyncTreeExpandChilds(row))
              } else {
                if (row[childrenField] && row[childrenField].length) {
                  treeExpandedMaps[rowid] = row
                }
              }
            }
          }
        })
      } else {
        validRows.forEach(item => {
          const rowid = handleGetRowId(item)
          if (treeExpandedMaps[rowid]) {
            delete treeExpandedMaps[rowid]
          }
        })
      }
      if (reserve) {
        validRows.forEach((row: any) => handleTreeExpandReserve(row, expanded))
      }
      reactData.treeExpandedFlag++
      return Promise.all(result).then(() => {
        return $xeTable.recalculate()
      })
    }

    /**
     * 虚拟树的展开与收起
     * @param rows
     * @param expanded
     * @returns
     */
    const handleVirtualTreeExpand = (rows: any[], expanded: boolean) => {
      return handleBaseTreeExpand(rows, expanded).then(() => {
        handleVirtualTreeToList()
        $xeTable.handleTableData()
        reactData.treeExpandedFlag++
        updateAfterDataIndex()
        return nextTick()
      }).then(() => {
        return handleLazyRecalculate(true, true, true)
      }).then(() => {
        setTimeout(() => {
          $xeTable.updateCellAreas()
        }, 30)
      })
    }

    /**
     * 展开与收起行分组节点
     * @param rows
     * @param expanded
     * @returns
     */
    const handleRowGroupBaseExpand = (rows: any[], expanded: boolean) => {
      const { fullAllDataRowIdData, tableFullGroupData, rowGroupExpandedMaps } = internalData
      const aggregateOpts = computeAggregateOpts.value
      const { mapChildrenField, accordion } = aggregateOpts
      const { handleGetRowId } = createHandleGetRowId($xeTable)
      let validRows = rows
      if (mapChildrenField) {
        if (accordion) {
          validRows = validRows.length ? [validRows[validRows.length - 1]] : []
          // 同一级只能展开一个
          const matchObj = XEUtils.findTree(tableFullGroupData, item => getRowid($xeTable, item) === getRowid($xeTable, validRows[0]), { children: mapChildrenField })
          if (matchObj) {
            matchObj.items.forEach(item => {
              const rowid = handleGetRowId(item)
              if (rowGroupExpandedMaps[rowid]) {
                delete rowGroupExpandedMaps[rowid]
              }
            })
          }
        }
        if (expanded) {
          validRows.forEach((row) => {
            const rowid = handleGetRowId(row)
            if (!rowGroupExpandedMaps[rowid]) {
              const rowRest = fullAllDataRowIdData[rowid]
              if (rowRest) {
                if (row[mapChildrenField] && row[mapChildrenField].length) {
                  rowGroupExpandedMaps[rowid] = row
                }
              }
            }
          })
        } else {
          validRows.forEach(item => {
            const rowid = handleGetRowId(item)
            if (rowGroupExpandedMaps[rowid]) {
              delete rowGroupExpandedMaps[rowid]
            }
          })
        }
      }
      reactData.rowGroupExpandedFlag++
      return $xeTable.recalculate()
    }

    /**
     * 行分组的展开与收起
     * @param rows
     * @param expanded
     * @returns
     */
    const handleRowGroupVirtualExpand = (rows: any[], expanded: boolean) => {
      return handleRowGroupBaseExpand(rows, expanded).then(() => {
        handleVirtualTreeToList()
        $xeTable.handleTableData()
        reactData.rowGroupExpandedFlag++
        updateAfterDataIndex()
        return nextTick()
      }).then(() => {
        return handleLazyRecalculate(true, true, true)
      }).then(() => {
        setTimeout(() => {
          $xeTable.updateCellAreas()
        }, 30)
      })
    }

    const handleCheckAllEvent = (evnt: Event | null, value: any) => {
      handleCheckedAllCheckboxRow(value)
      if (evnt) {
        dispatchEvent('checkbox-all', {
          records: () => $xeTable.getCheckboxRecords(),
          reserves: () => $xeTable.getCheckboxReserveRecords(),
          indeterminates: () => $xeTable.getCheckboxIndeterminateRecords(),
          checked: value
        }, evnt)
      }
    }

    /**
     * 纵向 Y 可视渲染处理
     */
    const loadScrollYData = () => {
      const { isAllOverflow, isScrollYBig } = reactData
      const { mergeBodyList, scrollYStore } = internalData
      const { preloadSize, startIndex, endIndex, offsetSize } = scrollYStore
      const autoOffsetYSize = isAllOverflow ? offsetSize : offsetSize + 1
      const { toVisibleIndex, visibleSize } = handleVirtualYVisible()
      const offsetItem = {
        startIndex: Math.max(0, isScrollYBig ? toVisibleIndex - 1 : toVisibleIndex - 1 - offsetSize - preloadSize),
        endIndex: isScrollYBig ? (toVisibleIndex + visibleSize) : (toVisibleIndex + visibleSize + autoOffsetYSize + preloadSize)
      }
      scrollYStore.visibleStartIndex = toVisibleIndex - 1
      scrollYStore.visibleEndIndex = toVisibleIndex + visibleSize + 1
      calculateMergerOffsetIndex(mergeBodyList, offsetItem, 'row')
      const { startIndex: offsetStartIndex, endIndex: offsetEndIndex } = offsetItem
      if (toVisibleIndex <= startIndex || toVisibleIndex >= endIndex - visibleSize - 1) {
        if (startIndex !== offsetStartIndex || endIndex !== offsetEndIndex) {
          scrollYStore.startIndex = offsetStartIndex
          scrollYStore.endIndex = offsetEndIndex
          $xeTable.updateScrollYData()
        }
      }
    }

    const createGetRowCacheProp = (prop: 'seq' | 'index' | '_index' | '$index') => {
      return function (row: any) {
        const { fullAllDataRowIdData } = internalData
        if (row) {
          const rowid = getRowid($xeTable, row)
          const rowRest = fullAllDataRowIdData[rowid]
          if (rowRest) {
            return rowRest[prop]
          }
        }
        return -1
      }
    }

    const createGetColumnCacheProp = (prop: 'index' | '_index' | '$index') => {
      return function (column: VxeTableDefines.ColumnInfo) {
        const { fullColumnIdData } = internalData
        if (column) {
          const colRest = fullColumnIdData[column.id]
          if (colRest) {
            return colRest[prop]
          }
        }
        return -1
      }
    }

    const lazyScrollXData = () => {
      const { lxTimeout, lxRunTime, scrollXStore } = internalData
      const { visibleSize } = scrollXStore
      const fpsTime = visibleSize > 26 ? 26 : (visibleSize > 16 ? 14 : 6)
      if (lxTimeout) {
        clearTimeout(lxTimeout)
      }
      if (!lxRunTime || lxRunTime + fpsTime < Date.now()) {
        internalData.lxRunTime = Date.now()
        loadScrollXData()
      }
      internalData.lxTimeout = setTimeout(() => {
        internalData.lxTimeout = undefined
        internalData.lxRunTime = undefined
        loadScrollXData()
      }, fpsTime)
    }

    const lazyScrollYData = () => {
      const { lyTimeout, lyRunTime, scrollYStore } = internalData
      const { visibleSize } = scrollYStore
      const fpsTime = visibleSize > 30 ? 32 : (visibleSize > 20 ? 18 : 8)
      if (lyTimeout) {
        clearTimeout(lyTimeout)
      }
      if (!lyRunTime || lyRunTime + fpsTime < Date.now()) {
        internalData.lyRunTime = Date.now()
        loadScrollYData()
      }
      internalData.lyTimeout = setTimeout(() => {
        internalData.lyTimeout = undefined
        internalData.lyRunTime = undefined
        loadScrollYData()
      }, fpsTime)
    }

    const checkLastSyncScroll = (isRollX: boolean, isRollY: boolean) => {
      const { scrollXLoad, scrollYLoad, isAllOverflow } = reactData
      const { lcsTimeout } = internalData
      reactData.lazScrollLoading = true
      if (lcsTimeout) {
        clearTimeout(lcsTimeout)
      }
      internalData.lcsTimeout = setTimeout(() => {
        internalData.lcsRunTime = Date.now()
        internalData.lcsTimeout = undefined
        internalData.intoRunScroll = false
        internalData.inVirtualScroll = false
        internalData.inWheelScroll = false
        internalData.inHeaderScroll = false
        internalData.inBodyScroll = false
        internalData.inFooterScroll = false
        reactData.lazScrollLoading = false
        internalData.scrollRenderType = ''

        if (!isAllOverflow) {
          calcCellHeight()
          updateRowOffsetTop()
        }
        if (isRollX && scrollXLoad) {
          $xeTable.updateScrollXData()
        }
        if (isRollY && scrollYLoad) {
          $xeTable.updateScrollYData().then(() => {
            if (!isAllOverflow) {
              calcCellHeight()
              updateRowOffsetTop()
            }
            $xeTable.updateScrollYSpace()
          })
        }
        updateRowExpandStyle()
        $xeTable.updateCellAreas()
      }, 200)
    }

    const getWheelSpeed = (lastScrollTime: number) => {
      let multiple = 1
      const currTime = Date.now()
      if (lastScrollTime + 25 > currTime) {
        multiple = 1.18
      } else if (lastScrollTime + 30 > currTime) {
        multiple = 1.15
      } else if (lastScrollTime + 40 > currTime) {
        multiple = 1.12
      } else if (lastScrollTime + 55 > currTime) {
        multiple = 1.09
      } else if (lastScrollTime + 75 > currTime) {
        multiple = 1.06
      } else if (lastScrollTime + 100 > currTime) {
        multiple = 1.03
      }
      return multiple
    }

    const wheelScrollLeftTo = (scrollLeft: number, cb: (offsetLeft: number) => void) => {
      requestAnimationFrame(() => {
        cb(scrollLeft)
      })
    }

    const wheelScrollTopTo = (diffNum: number, cb: (progress: number) => void) => {
      const duration = Math.abs(diffNum)
      const startTime = performance.now()
      let countTop = 0
      const step = (timestamp: number) => {
        let progress = (timestamp - startTime) / duration
        if (progress > 1) {
          progress = 1
        }
        const easedProgress = Math.pow(progress, 2)
        const offsetTop = Math.floor((diffNum * easedProgress)) - countTop
        countTop += offsetTop
        cb(offsetTop)
        if (progress < 1) {
          requestAnimationFrame(step)
        }
      }
      requestAnimationFrame(step)
    }

    const dispatchEvent = (type: ValueOf<VxeTableEmits>, params: Record<string, any>, evnt: Event | null) => {
      emit(type, createEvent(evnt, { $table: $xeTable, $grid: $xeGrid }, params))
    }

    const handleScrollToRowColumn = (fieldOrColumn: string | VxeTableDefines.ColumnInfo | null, row?: any) => {
      const { fullColumnIdData } = internalData
      const column = handleFieldOrColumn($xeTable, fieldOrColumn)
      if (column && fullColumnIdData[column.id]) {
        return colToVisible($xeTable, column, row)
      }
      return nextTick()
    }

    const handleUpdateResize = () => {
      const el = refElem.value
      if (el && el.clientWidth && el.clientHeight) {
        $xeTable.recalculate()
      }
    }

    const handleUpdateColResize = (evnt: MouseEvent, params: any) => {
      $xeTable.analyColumnWidth()
      $xeTable.recalculate().then(() => {
        $xeTable.saveCustomStore('update:width')
        $xeTable.updateCellAreas()
        $xeTable.dispatchEvent('column-resizable-change', params, evnt)
        // 已废弃 resizable-change
        $xeTable.dispatchEvent('resizable-change', params, evnt)
        setTimeout(() => $xeTable.recalculate(true), 300)
      })
    }

    const handleUpdateRowResize = (evnt: MouseEvent, params: any) => {
      reactData.resizeHeightFlag++
      $xeTable.recalculate().then(() => {
        $xeTable.updateCellAreas()
        $xeTable.dispatchEvent('row-resizable-change', params, evnt)
        setTimeout(() => $xeTable.recalculate(true), 300)
      })
    }

    const updateColumnOffsetLeft = () => {
      const { visibleColumn, fullColumnIdData } = internalData
      let offsetLeft = 0
      for (let cIndex = 0, rLen = visibleColumn.length; cIndex < rLen; cIndex++) {
        const column = visibleColumn[cIndex]
        const colid = column.id
        const colRest = fullColumnIdData[colid]
        if (colRest) {
          colRest.oLeft = offsetLeft
        }
        offsetLeft += column.renderWidth
      }
    }

    const updateRowOffsetTop = () => {
      const { expandColumn } = reactData
      const { afterFullData, fullAllDataRowIdData, rowExpandedMaps } = internalData
      const expandOpts = computeExpandOpts.value
      const rowOpts = computeRowOpts.value
      const cellOpts = computeCellOpts.value
      const defaultRowHeight = computeDefaultRowHeight.value
      const { handleGetRowId } = createHandleGetRowId($xeTable)
      let offsetTop = 0
      for (let rIndex = 0, rLen = afterFullData.length; rIndex < rLen; rIndex++) {
        const row = afterFullData[rIndex]
        const rowid = handleGetRowId(row)
        const rowRest = fullAllDataRowIdData[rowid] || {}
        rowRest.oTop = offsetTop
        offsetTop += rowRest.resizeHeight || cellOpts.height || rowOpts.height || rowRest.height || defaultRowHeight
        // 是否展开行
        if (expandColumn && rowExpandedMaps[rowid]) {
          offsetTop += rowRest.expandHeight || expandOpts.height || 0
        }
      }
    }

    const updateRowExpandStyle = () => {
      const { expandColumn, scrollYLoad, scrollYTop, isScrollYBig } = reactData
      const expandOpts = computeExpandOpts.value
      const rowOpts = computeRowOpts.value
      const cellOpts = computeCellOpts.value
      const defaultRowHeight = computeDefaultRowHeight.value
      const { mode } = expandOpts
      if (expandColumn && mode === 'fixed') {
        const { elemStore, fullAllDataRowIdData } = internalData
        const rowExpandEl = refRowExpandElem.value
        const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
        if (rowExpandEl && bodyScrollElem) {
          let isUpdateHeight = false
          XEUtils.arrayEach(rowExpandEl.children, reEl => {
            const expandEl = reEl as HTMLDivElement
            const rowid = expandEl.getAttribute('rowid') || ''
            const rowRest = fullAllDataRowIdData[rowid]
            if (rowRest) {
              const expandHeight = expandEl.offsetHeight + 1
              const trEl = bodyScrollElem.querySelector(`.vxe-body--row[rowid="${rowid}"]`) as HTMLTableCellElement
              let offsetTop = 0
              if (scrollYLoad) {
                if (isScrollYBig && trEl) {
                  offsetTop = trEl.offsetTop + trEl.offsetHeight
                } else {
                  offsetTop = rowRest.oTop + (rowRest.resizeHeight || cellOpts.height || rowOpts.height || rowRest.height || defaultRowHeight)
                }
              } else {
                if (trEl) {
                  offsetTop = trEl.offsetTop + trEl.offsetHeight
                }
              }
              if (isScrollYBig) {
                offsetTop += scrollYTop
              }
              expandEl.style.top = toCssUnit(offsetTop)

              if (!isUpdateHeight) {
                if (rowRest.expandHeight !== expandHeight) {
                  isUpdateHeight = true
                }
              }
              rowRest.expandHeight = expandHeight
            }
          })
          if (isUpdateHeight) {
            reactData.rowExpandHeightFlag++
            nextTick(() => {
              updateRowOffsetTop()
            })
          }
        }
      }
    }

    const handleRowExpandScroll = () => {
      const { elemStore } = internalData
      const rowExpandEl = refRowExpandElem.value
      const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
      if (rowExpandEl && bodyScrollElem) {
        rowExpandEl.scrollTop = bodyScrollElem.scrollTop
      }
    }

    tableMethods = {
      dispatchEvent,
      getEl () {
        return refElem.value
      },
      /**
       * 重置表格的一切数据状态
       */
      clearAll () {
        return clearTableAllStatus($xeTable)
      },
      /**
       * 同步 data 数据（即将废弃）
       * 如果用了该方法，那么组件将不再记录增删改的状态，只能自行实现对应逻辑
       * 对于某些特殊的场景，比如深层树节点元素发生变动时可能会用到
       */
      syncData () {
        errLog('vxe.error.delFunc', ['syncData', 'getData'])
        return nextTick().then(() => {
          reactData.tableData = []
          emit('update:data', internalData.tableFullData)
          return nextTick()
        })
      },
      /**
       * 手动处理数据，用于手动排序与筛选
       * 对于手动更改了排序、筛选...等条件后需要重新处理数据时可能会用到
       */
      updateData () {
        const { scrollXLoad, scrollYLoad } = reactData
        return $xeTable.handleTableData(true).then(() => {
          $xeTable.updateFooter()
          if (scrollXLoad || scrollYLoad) {
            if (scrollXLoad) {
              $xeTable.updateScrollXSpace()
            }
            if (scrollYLoad) {
              $xeTable.updateScrollYSpace()
            }
            return $xeTable.refreshScroll()
          }
        }).then(() => {
          $xeTable.updateCellAreas()
          return handleLazyRecalculate(true, true, true)
        }).then(() => {
          // 存在滚动行为未结束情况
          setTimeout(() => handleLazyRecalculate(false, true, true), 50)
        })
      },
      /**
       * 重新加载数据，不会清空表格状态
       * @param {Array} datas 数据
       */
      loadData (datas) {
        const { initStatus } = internalData
        return loadTableData(datas, false).then(() => {
          internalData.inited = true
          internalData.initStatus = true
          if (!initStatus) {
            handleLoadDefaults()
          }
          return handleLazyRecalculate(false, true, true)
        })
      },
      /**
       * 重新加载数据，会清空表格状态
       * @param {Array} datas 数据
       */
      reloadData (datas) {
        return $xeTable.clearAll()
          .then(() => {
            internalData.inited = true
            internalData.initStatus = true
            return loadTableData(datas, true)
          }).then(() => {
            handleLoadDefaults()
            return handleLazyRecalculate(false, true, true)
          })
      },
      /**
       * 修改行数据
       */
      setRow (rows, record) {
        if (rows && record) {
          let rest: any[] = rows
          if (!XEUtils.isArray(rows)) {
            rest = [rows]
          }
          const rowkey = getRowkey($xeTable)
          rest.forEach(row => {
            const rowid = getRowid($xeTable, row)
            const newRecord = XEUtils.clone(Object.assign({}, record), true)
            XEUtils.set(newRecord, rowkey, rowid)
            Object.assign(row, newRecord)
          })
        }
        return nextTick()
      },
      /**
       * 局部加载行数据并恢复到初始状态
       * 对于行数据需要局部更改的场景中可能会用到
       * @param {Row} row 行对象
       * @param {Object} record 新数据
       * @param {String} field 字段名
       */
      reloadRow (row, record, field?: string) {
        const { keepSource } = props
        const { tableData } = reactData
        const { sourceDataRowIdData } = internalData
        if (keepSource) {
          if ($xeTable.isAggregateRecord(row)) {
            return nextTick()
          }
          const oRow = sourceDataRowIdData[getRowid($xeTable, row)]
          if (oRow && row) {
            if (field) {
              const newValue = XEUtils.clone(XEUtils.get(record || row, field), true)
              XEUtils.set(row, field, newValue)
              XEUtils.set(oRow, field, newValue)
            } else {
              const rowkey = getRowkey($xeTable)
              const rowid = getRowid($xeTable, row)
              const newRecord = XEUtils.clone(Object.assign({}, record), true)
              XEUtils.set(newRecord, rowkey, rowid)
              XEUtils.destructuring(oRow, Object.assign(row, newRecord))
            }
          }
          reactData.tableData = tableData.slice(0)
        } else {
          errLog('vxe.error.reqProp', ['keep-source'])
        }
        return nextTick()
      },
      getParams () {
        return props.params
      },
      /**
       * 用于树结构，给行数据加载子节点
       */
      loadTreeChildren (row, childRecords) {
        const { keepSource } = props
        const { tableSourceData, fullDataRowIdData, fullAllDataRowIdData, sourceDataRowIdData } = internalData
        const treeOpts = computeTreeOpts.value
        const { transform, mapChildrenField } = treeOpts
        const childrenField = treeOpts.children || treeOpts.childrenField
        const parentRest = fullAllDataRowIdData[getRowid($xeTable, row)]
        const parentLevel = parentRest ? parentRest.level : 0
        return tableMethods.createData(childRecords).then((rows) => {
          if (keepSource) {
            const rowid = getRowid($xeTable, row)
            const matchObj = XEUtils.findTree(tableSourceData, (item) => rowid === getRowid($xeTable, item), { children: childrenField })
            if (matchObj) {
              matchObj.item[childrenField] = XEUtils.clone(rows, true)
            }
            rows.forEach(childRow => {
              const rowid = getRowid($xeTable, childRow)
              sourceDataRowIdData[rowid] = XEUtils.clone(childRow, true)
            })
          }
          XEUtils.eachTree(rows, (childRow, index, items, path, parentItem, nodes) => {
            const rowid = getRowid($xeTable, childRow)
            const parentRow = parentItem || parentRest.row
            const rest = { row: childRow, rowid, seq: -1, index, _index: -1, $index: -1, treeIndex: -1, items, parent: parentRow, level: parentLevel + nodes.length, height: 0, resizeHeight: 0, oTop: 0, expandHeight: 0 }
            fullDataRowIdData[rowid] = rest
            fullAllDataRowIdData[rowid] = rest
          }, { children: childrenField })
          row[childrenField] = rows
          if (transform) {
            row[mapChildrenField] = XEUtils.clone(rows, false)
          }
          updateAfterDataIndex()
          return rows
        })
      },
      /**
       * 加载列配置
       * 对于表格列需要重载、局部递增场景下可能会用到
       * @param {ColumnInfo} columns 列配置
       */
      loadColumn (columns) {
        const { lastScrollLeft, lastScrollTop } = internalData
        const collectColumn = XEUtils.mapTree(columns, column => reactive(Cell.createColumn($xeTable, column)))
        return handleColumn(collectColumn).then(() => {
          let targetScrollLeft = lastScrollLeft
          let targetScrollTop = lastScrollTop
          const virtualXOpts = computeVirtualXOpts.value
          const virtualYOpts = computeVirtualYOpts.value
          // 是否在更新数据之后自动滚动重置滚动条
          if (virtualXOpts.scrollToLeftOnChange) {
            targetScrollLeft = 0
          }
          if (virtualYOpts.scrollToTopOnChange) {
            targetScrollTop = 0
          }
          restoreScrollLocation($xeTable, targetScrollLeft, targetScrollTop)
        })
      },
      /**
       * 加载列配置并恢复到初始状态
       * 对于表格列需要重载、局部递增场景下可能会用到
       * @param {ColumnInfo} columns 列配置
       */
      reloadColumn (columns) {
        return tableMethods.clearAll().then(() => {
          return tableMethods.loadColumn(columns)
        })
      },
      /**
       * 根据 tr 元素获取对应的 row 信息
       * @param {Element} tr 元素
       */
      getRowNode (tr) {
        if (tr) {
          const { fullAllDataRowIdData } = internalData
          const rowid = tr.getAttribute('rowid')
          if (rowid) {
            const rowRest = fullAllDataRowIdData[rowid]
            if (rowRest) {
              return {
                rowid: rowRest.rowid,
                item: rowRest.row,
                index: rowRest.index,
                items: rowRest.items,
                parent: rowRest.parent
              }
            }
          }
        }
        return null
      },
      /**
       * 根据 th/td 元素获取对应的 column 信息
       * @param {Element} cell 元素
       */
      getColumnNode (cell) {
        if (cell) {
          const { fullColumnIdData } = internalData
          const colid = cell.getAttribute('colid')
          if (colid) {
            const colRest = fullColumnIdData[colid]
            if (colRest) {
              return {
                colid: colRest.colid,
                item: colRest.column,
                index: colRest.index,
                items: colRest.items,
                parent: colRest.parent
              }
            }
          }
        }
        return null
      },
      /**
       * 根据 row 获取序号
       * @param {Row} row 行对象
       */
      getRowSeq: createGetRowCacheProp('seq'),
      /**
       * 根据 row 获取相对于 data 中的索引
       * @param {Row} row 行对象
       */
      getRowIndex: createGetRowCacheProp('index') as ((row: any) => number),
      /**
       * 根据 row 获取相对于当前数据中的索引
       * @param {Row} row 行对象
       */
      getVTRowIndex: createGetRowCacheProp('_index') as ((row: any) => number),
      /**
       * 根据 row 获取渲染中的虚拟索引
       * @param {Row} row 行对象
       */
      getVMRowIndex: createGetRowCacheProp('$index') as ((row: any) => number),
      /**
       * 根据 column 获取相对于 columns 中的索引
       * @param {ColumnInfo} column 列配置
       */
      getColumnIndex: createGetColumnCacheProp('index'),
      /**
       * 根据 column 获取相对于当前表格列中的索引
       * @param {ColumnInfo} column 列配置
       */
      getVTColumnIndex: createGetColumnCacheProp('_index'),
      /**
       * 根据 column 获取渲染中的虚拟索引
       * @param {ColumnInfo} column 列配置
       */
      getVMColumnIndex: createGetColumnCacheProp('$index'),
      /**
       * 创建 data 对象
       * 对于某些特殊场景可能会用到，会自动对数据的字段名进行检测，如果不存在就自动定义
       * @param {Array} records 新数据
       */
      createData (records) {
        return nextTick().then(() => {
          return reactive(tablePrivateMethods.defineField(records))
        })
      },
      /**
       * 创建 Row|Rows 对象
       * 对于某些特殊场景需要对数据进行手动插入时可能会用到
       * @param {Array/Object} records 新数据
       */
      createRow (records) {
        const isArr = XEUtils.isArray(records)
        if (!isArr) {
          records = [records || {}]
        }
        return tableMethods.createData(records).then((rows) => isArr ? rows : rows[0])
      },
      /**
       * 还原数据
       * 如果不传任何参数，则还原整个表格
       * 如果传 row 则还原一行
       * 如果传 rows 则还原多行
       * 如果还额外传了 field 则还原指定的单元格数据
       */
      revertData (rows: any, field) {
        const { keepSource, treeConfig } = props
        const { fullAllDataRowIdData, fullDataRowIdData, tableSourceData, sourceDataRowIdData, tableFullData, afterFullData, removeRowMaps } = internalData
        const treeOpts = computeTreeOpts.value
        const { transform } = treeOpts
        const { handleGetRowId } = createHandleGetRowId($xeTable)
        if (!keepSource) {
          errLog('vxe.error.reqProp', ['keep-source'])
          return nextTick()
        }
        let targetRows = rows
        if (rows) {
          if (!XEUtils.isArray(rows)) {
            targetRows = [rows]
          }
        } else {
          targetRows = XEUtils.toArray($xeTable.getUpdateRecords())
        }
        let reDelFlag = false
        if (targetRows.length) {
          targetRows.forEach((item: any) => {
            const rowid = handleGetRowId(item)
            const rowRest = fullAllDataRowIdData[rowid]
            if (rowRest) {
              const row = rowRest.row
              if (!$xeTable.isInsertByRow(row)) {
                const oRow = sourceDataRowIdData[rowid]
                if (oRow && row) {
                  if (field) {
                    XEUtils.set(row, field, XEUtils.clone(XEUtils.get(oRow, field), true))
                  } else {
                    XEUtils.destructuring(row, XEUtils.clone(oRow, true))
                  }
                  if (!fullDataRowIdData[rowid] && $xeTable.isRemoveByRow(row)) {
                    if (removeRowMaps[rowid]) {
                      delete removeRowMaps[rowid]
                    }
                    tableFullData.unshift(row)
                    afterFullData.unshift(row)
                    reDelFlag = true
                  }
                }
              }
            }
          })
        }
        if (rows) {
          if (reDelFlag) {
            reactData.removeRowFlag++
            $xeTable.updateFooter()
            $xeTable.cacheRowMap(false)
            $xeTable.handleTableData(treeConfig && transform)
            if (!(treeConfig && transform)) {
              $xeTable.updateAfterDataIndex()
            }
            $xeTable.checkSelectionStatus()
            if (reactData.scrollYLoad) {
              $xeTable.updateScrollYSpace()
            }
          }
          return nextTick().then(() => {
            $xeTable.updateCellAreas()
            return handleLazyRecalculate(false, true, true)
          })
        }
        return $xeTable.reloadData(tableSourceData)
      },
      /**
       * 清空单元格内容
       * 如果不创参数，则清空整个表格内容
       * 如果传 row 则清空一行内容
       * 如果传 rows 则清空多行内容
       * 如果还额外传了 field 则清空指定单元格内容
       * @param {Array/Row} rows 行数据
       * @param {String} field 字段名
       */
      clearData (rows: any, field: string) {
        const { tableFullData, visibleColumn } = internalData
        if (!arguments.length) {
          rows = tableFullData
        } else if (rows && !XEUtils.isArray(rows)) {
          rows = [rows]
        }
        if (field) {
          rows.forEach((row: any) => XEUtils.set(row, field, null))
        } else {
          rows.forEach((row: any) => {
            visibleColumn.forEach((column) => {
              if (column.field) {
                setCellValue(row, column, null)
              }
            })
          })
        }
        return nextTick()
      },
      getCellElement (row, fieldOrColumn) {
        const { elemStore } = internalData
        const column = handleFieldOrColumn($xeTable, fieldOrColumn)
        if (!column) {
          return null
        }
        const rowid = getRowid($xeTable, row)
        const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
        const leftScrollElem = getRefElem(elemStore['left-body-scroll'])
        const rightScrollElem = getRefElem(elemStore['right-body-scroll'])
        let bodyElem
        if (column) {
          if (column.fixed) {
            if (column.fixed === 'left') {
              if (leftScrollElem) {
                bodyElem = leftScrollElem
              }
            } else {
              if (rightScrollElem) {
                bodyElem = rightScrollElem
              }
            }
          }
          if (!bodyElem) {
            bodyElem = bodyScrollElem
          }
          if (bodyElem) {
            return bodyElem.querySelector(`.vxe-body--row[rowid="${rowid}"] .${column.id}`)
          }
        }
        return null
      },
      getCellLabel (row, fieldOrColumn) {
        const column = handleFieldOrColumn($xeTable, fieldOrColumn)
        if (!column) {
          return null
        }
        const { formatter } = column
        const cellValue = getCellValue(row, column)
        let cellLabel = cellValue
        if (formatter) {
          let formatData
          const { fullAllDataRowIdData } = internalData
          const rowid = getRowid($xeTable, row)
          const colid = column.id
          const rowRest = fullAllDataRowIdData[rowid]
          if (rowRest) {
            formatData = rowRest.formatData
            if (!formatData) {
              formatData = fullAllDataRowIdData[rowid].formatData = {}
            }
            if (rowRest && formatData[colid]) {
              if (formatData[colid].value === cellValue) {
                return formatData[colid].label
              }
            }
          }
          const formatParams = { cellValue, row, rowIndex: tableMethods.getRowIndex(row), column, columnIndex: tableMethods.getColumnIndex(column) }
          if (XEUtils.isString(formatter)) {
            const gFormatOpts = formats.get(formatter)
            const tcFormatMethod = gFormatOpts ? (gFormatOpts.tableCellFormatMethod || gFormatOpts.cellFormatMethod) : null
            cellLabel = tcFormatMethod ? tcFormatMethod(formatParams) : ''
          } else if (XEUtils.isArray(formatter)) {
            const gFormatOpts = formats.get(formatter[0])
            const tcFormatMethod = gFormatOpts ? (gFormatOpts.tableCellFormatMethod || gFormatOpts.cellFormatMethod) : null
            cellLabel = tcFormatMethod ? tcFormatMethod(formatParams, ...formatter.slice(1)) : ''
          } else {
            cellLabel = formatter(formatParams)
          }
          if (formatData) {
            formatData[colid] = { value: cellValue, label: cellLabel }
          }
        }
        return cellLabel
      },
      /**
       * 检查是否为临时行数据
       */
      isInsertByRow (row) {
        const rowid = getRowid($xeTable, row)
        return !!reactData.insertRowFlag && !!internalData.insertRowMaps[rowid]
      },
      isRemoveByRow (row) {
        const rowid = getRowid($xeTable, row)
        return !!reactData.removeRowFlag && !!internalData.removeRowMaps[rowid]
      },
      /**
       * 删除所有新增的临时数据
       */
      removeInsertRow () {
        const { insertRowMaps } = internalData
        return $xeTable.remove(XEUtils.values(insertRowMaps))
      },
      /**
       * 检查行或列数据是否发生改变
       */
      isUpdateByRow (rowidOrRow, field) {
        const { keepSource } = props
        const { tableFullColumn, fullDataRowIdData, sourceDataRowIdData } = internalData
        if (keepSource) {
          const rowid = XEUtils.isString(rowidOrRow) || XEUtils.isNumber(rowidOrRow) ? rowidOrRow : getRowid($xeTable, rowidOrRow)
          const rowRest = fullDataRowIdData[rowid]
          // 新增的数据不需要检测
          if (!rowRest) {
            return false
          }
          const row = rowRest.row
          const oRow = sourceDataRowIdData[rowid]
          if (oRow) {
            if (arguments.length > 1) {
              return !eqCellValue(oRow, row, field as string)
            }
            for (let index = 0, len = tableFullColumn.length; index < len; index++) {
              const property = tableFullColumn[index].field
              if (property && !eqCellValue(oRow, row, property)) {
                return true
              }
            }
          }
        }
        return false
      },
      /**
       * 获取表格的可视列，也可以指定索引获取列
       * @param {Number} columnIndex 索引
       */
      getColumns (columnIndex?: number): any {
        const { visibleColumn } = internalData
        return XEUtils.isUndefined(columnIndex) ? visibleColumn.slice(0) : visibleColumn[columnIndex]
      },
      /**
       * 根据列获取列的唯一主键
       */
      getColid (fieldOrColumn) {
        const column = handleFieldOrColumn($xeTable, fieldOrColumn)
        return column ? column.id : null
      },
      /**
       * 根据列的唯一主键获取列
       * @param {String} colid 列主键
       */
      getColumnById (colid) {
        const { fullColumnIdData } = internalData
        return colid && fullColumnIdData[colid] ? fullColumnIdData[colid].column : null
      },
      /**
       * 根据列的字段名获取列
       * @param {String} field 字段名
       */
      getColumnByField (field) {
        const fullColumnFieldData = internalData.fullColumnFieldData
        return field && fullColumnFieldData[field] ? fullColumnFieldData[field].column : null
      },
      getParentColumn (fieldOrColumn) {
        const { fullColumnIdData } = internalData
        const column = handleFieldOrColumn($xeTable, fieldOrColumn)
        return column && column.parentId && fullColumnIdData[column.parentId] ? fullColumnIdData[column.parentId].column : null
      },
      /**
       * 获取当前表格的列
       * 收集到的全量列、全量表头列、处理条件之后的全量表头列、当前渲染中的表头列
       */
      getTableColumn () {
        return {
          collectColumn: internalData.collectColumn.slice(0),
          fullColumn: internalData.tableFullColumn.slice(0),
          visibleColumn: internalData.visibleColumn.slice(0),
          tableColumn: reactData.tableColumn.slice(0)
        }
      },
      /**
       * 移动列到指定列的位置
       * @param fieldOrColumn
       * @param targetFieldOrColumn
       * @param options
       */
      moveColumnTo (fieldOrColumn, targetFieldOrColumn, options) {
        const { fullColumnIdData, visibleColumn } = internalData
        const { dragToChild, dragPos, isCrossDrag } = Object.assign({}, options)
        const dragCol = handleFieldOrColumn($xeTable, fieldOrColumn)
        let prevDragCol: VxeTableDefines.ColumnInfo | null = null
        const colRest = dragCol ? fullColumnIdData[dragCol.id] : null
        let defPos: 'left' | 'right' = 'left'
        if (XEUtils.isNumber(targetFieldOrColumn)) {
          if (colRest && targetFieldOrColumn) {
            let currList = colRest.items
            let offsetIndex = colRest._index + targetFieldOrColumn
            if (isCrossDrag) {
              currList = visibleColumn
              offsetIndex = colRest._index + targetFieldOrColumn
            }
            if (offsetIndex > 0 && offsetIndex < currList.length - 1) {
              prevDragCol = currList[offsetIndex]
            }
            if (targetFieldOrColumn > 0) {
              defPos = 'right'
            }
          }
        } else {
          prevDragCol = handleFieldOrColumn($xeTable, targetFieldOrColumn)
          const targetColRest = prevDragCol ? fullColumnIdData[prevDragCol.id] : null
          if (colRest && targetColRest) {
            if (targetColRest._index > colRest._index) {
              defPos = 'right'
            }
          }
        }
        return $xeTable.handleColDragSwapEvent(null, true, dragCol, prevDragCol, dragPos || defPos, dragToChild === true)
      },
      /**
       * 移动行到指定行的位置
       * @param rowidOrRow
       * @param targetRowidOrRow
       * @param options
       */
      moveRowTo (rowidOrRow, targetRowidOrRow, options) {
        const { treeConfig } = props
        const { fullAllDataRowIdData, afterFullData } = internalData
        const { dragToChild, dragPos, isCrossDrag } = Object.assign({}, options)
        const treeOpts = computeTreeOpts.value
        const dragRow = handleRowidOrRow($xeTable, rowidOrRow)
        let prevDragRow: any = null
        let defPos: 'top' | 'bottom' = 'top'
        const rowRest = dragRow ? fullAllDataRowIdData[getRowid($xeTable, dragRow)] : null
        if (XEUtils.isNumber(targetRowidOrRow)) {
          if (rowRest && targetRowidOrRow) {
            let currList = afterFullData
            let offsetIndex = rowRest._index + targetRowidOrRow
            if (treeConfig) {
              currList = rowRest.items
              if (treeOpts.transform) {
                offsetIndex = rowRest.treeIndex + targetRowidOrRow
                if (isCrossDrag) {
                  currList = afterFullData
                  offsetIndex = rowRest._index + targetRowidOrRow
                }
              }
            }
            if (offsetIndex >= 0 && offsetIndex <= currList.length - 1) {
              prevDragRow = currList[offsetIndex]
            }
            if (targetRowidOrRow > 0) {
              defPos = 'bottom'
            }
          }
        } else {
          prevDragRow = handleRowidOrRow($xeTable, targetRowidOrRow)
          const targetRowRest = prevDragRow ? fullAllDataRowIdData[getRowid($xeTable, prevDragRow)] : null
          if (rowRest && targetRowRest) {
            if (targetRowRest._index > rowRest._index) {
              defPos = 'bottom'
            }
          }
        }
        return $xeTable.handleRowDragSwapEvent(null, true, dragRow, prevDragRow, dragPos || defPos, dragToChild === true)
      },
      /**
       * 获取表格的全量列
       */
      getFullColumns () {
        const { collectColumn } = internalData
        return collectColumn.slice(0)
      },
      /**
       * 获取数据，和 data 的行为一致，也可以指定索引获取数据
       */
      getData (rowIndex?: number) {
        const tableSynchData = props.data || internalData.tableSynchData
        return XEUtils.isUndefined(rowIndex) ? tableSynchData.slice(0) : tableSynchData[rowIndex]
      },
      /**
       * 用于多选行，获取已选中的数据
       */
      getCheckboxRecords (isFull) {
        const { treeConfig } = props
        const { updateCheckboxFlag } = reactData
        const { tableFullData, afterFullData, tableFullTreeData, fullDataRowIdData, afterFullRowMaps, selectCheckboxMaps } = internalData
        const treeOpts = computeTreeOpts.value
        const checkboxOpts = computeCheckboxOpts.value
        const { transform, mapChildrenField } = treeOpts
        const { checkField } = checkboxOpts
        const childrenField = treeOpts.children || treeOpts.childrenField
        let rowList: any[] = []
        if (updateCheckboxFlag) {
          if (checkField) {
            if (treeConfig) {
              // 如果开启 transform 默认就是完整数据
              const currTableData = isFull ? (transform ? tableFullTreeData : tableFullData) : (transform ? tableFullTreeData : afterFullData)
              rowList = XEUtils.filterTree(currTableData, row => XEUtils.get(row, checkField), { children: transform ? mapChildrenField : childrenField })
            } else {
              const currTableData = isFull ? tableFullData : afterFullData
              rowList = currTableData.filter((row) => XEUtils.get(row, checkField))
            }
          } else {
            const currMaps = isFull || (treeConfig && !transform) ? fullDataRowIdData : afterFullRowMaps
            XEUtils.each(selectCheckboxMaps, (row, rowid) => {
              if (currMaps[rowid]) {
                rowList.push(fullDataRowIdData[rowid].row)
              }
            })
          }
        }
        return rowList
      },
      /**
       * 只对 tree-config 有效，获取行的子级
       */
      getTreeRowChildren (rowOrRowid) {
        const { treeConfig } = props
        const { fullAllDataRowIdData } = internalData
        const treeOpts = computeTreeOpts.value
        const { transform, mapChildrenField } = treeOpts
        const childrenField = treeOpts.children || treeOpts.childrenField
        if (rowOrRowid && treeConfig) {
          let rowid
          if (XEUtils.isString(rowOrRowid)) {
            rowid = rowOrRowid
          } else {
            rowid = getRowid($xeTable, rowOrRowid)
          }
          if (rowid) {
            const rest = fullAllDataRowIdData[rowid]
            const row = rest ? rest.row : null
            if (row) {
              return row[transform ? mapChildrenField : childrenField] || []
            }
          }
        }
        return []
      },
      /**
       * 只对 tree-config 有效，获取行的父级
       */
      getTreeParentRow (rowOrRowid) {
        const { treeConfig } = props
        const { fullAllDataRowIdData } = internalData
        if (rowOrRowid && treeConfig) {
          let rowid
          if (XEUtils.isString(rowOrRowid)) {
            rowid = rowOrRowid
          } else {
            rowid = getRowid($xeTable, rowOrRowid)
          }
          if (rowid) {
            const rest = fullAllDataRowIdData[rowid]
            return rest ? rest.parent : null
          }
        }
        return null
      },
      getParentRow (rowOrRowid) {
        warnLog('vxe.error.delFunc', ['getParentRow', 'getTreeParentRow'])
        return $xeTable.getTreeParentRow(rowOrRowid)
      },
      /**
       * 根据行的唯一主键获取行
       * @param {String/Number} rowid 行主键
       */
      getRowById (cellValue) {
        const { fullAllDataRowIdData } = internalData
        const rowid = XEUtils.eqNull(cellValue) ? '' : encodeURIComponent(cellValue || '')
        return fullAllDataRowIdData[rowid] ? fullAllDataRowIdData[rowid].row : null
      },
      /**
       * 根据行获取行的唯一主键
       * @param {Row} row 行对象
       */
      getRowid (row) {
        return getRowid($xeTable, row)
      },
      /**
       * 获取处理后的表格数据
       * 如果存在筛选条件，继续处理
       * 如果存在排序，继续处理
       */
      getTableData () {
        const { tableData, footerTableData } = reactData
        const { tableFullData, afterFullData, tableFullTreeData } = internalData
        return {
          fullData: props.treeConfig ? tableFullTreeData.slice(0) : tableFullData.slice(0),
          visibleData: afterFullData.slice(0),
          tableData: tableData.slice(0),
          footerData: footerTableData.slice(0)
        }
      },
      /**
       * 获取表格的全量数据，如果是 tree-config 则返回带层级的树结构
       */
      getFullData () {
        const { treeConfig } = props
        const { tableFullData, tableFullTreeData } = internalData
        if (treeConfig) {
          const treeOpts = computeTreeOpts.value
          const { transform, mapChildrenField, rowField, parentField } = treeOpts
          const childrenField = treeOpts.children || treeOpts.childrenField
          if (transform) {
            return XEUtils.toArrayTree(
              XEUtils.toTreeArray(tableFullTreeData, {
                children: mapChildrenField
              }),
              {
                key: rowField,
                parentKey: parentField,
                children: childrenField,
                mapChildren: mapChildrenField
              }
            )
          }
          return tableFullTreeData.slice(0)
        }
        return tableFullData.slice(0)
      },
      /**
       * 设置为固定列
       */
      setColumnFixed (fieldOrColumn, fixed) {
        let status = false
        const cols = XEUtils.isArray(fieldOrColumn) ? fieldOrColumn : [fieldOrColumn]
        const columnOpts = computeColumnOpts.value
        const isMaxFixedColumn = computeIsMaxFixedColumn.value
        for (let i = 0; i < cols.length; i++) {
          const item = cols[i]
          const column = handleFieldOrColumn($xeTable, item)
          const targetColumn = getRootColumn($xeTable, column as any)
          if (targetColumn && targetColumn.fixed !== fixed) {
            // 是否超过最大固定列数量
            if (!targetColumn.fixed && isMaxFixedColumn) {
              if (VxeUI.modal) {
                VxeUI.modal.message({
                  status: 'error',
                  content: getI18n('vxe.table.maxFixedCol', [columnOpts.maxFixedSize])
                })
              }
              return nextTick()
            }
            XEUtils.eachTree([targetColumn], (column) => {
              column.fixed = fixed
              column.renderFixed = fixed
            })
            tablePrivateMethods.saveCustomStore('update:fixed')
            if (!status) {
              status = true
            }
          }
        }
        if (status) {
          return tableMethods.refreshColumn()
        }
        return nextTick()
      },
      /**
       * 取消指定固定列
       */
      clearColumnFixed (fieldOrColumn) {
        let status = false
        const cols = XEUtils.isArray(fieldOrColumn) ? fieldOrColumn : [fieldOrColumn]
        cols.forEach(item => {
          const column = handleFieldOrColumn($xeTable, item)
          const targetColumn = getRootColumn($xeTable, column as any)
          if (targetColumn && targetColumn.fixed) {
            XEUtils.eachTree([targetColumn], (column) => {
              column.fixed = null
              column.renderFixed = null
            })
            tablePrivateMethods.saveCustomStore('update:fixed')
            if (!status) {
              status = true
            }
          }
        })
        if (status) {
          return tableMethods.refreshColumn()
        }
        return nextTick()
      },
      /**
       * 隐藏指定列
       */
      hideColumn (fieldOrColumn) {
        let status = false
        const cols = XEUtils.isArray(fieldOrColumn) ? fieldOrColumn : [fieldOrColumn]
        cols.forEach(item => {
          const column = handleFieldOrColumn($xeTable, item)
          if (column && column.visible) {
            column.visible = false
            if (!status) {
              status = true
            }
          }
        })
        if (status) {
          return tablePrivateMethods.handleCustom()
        }
        return nextTick()
      },
      /**
       * 显示指定列
       */
      showColumn (fieldOrColumn) {
        let status = false
        const cols = XEUtils.isArray(fieldOrColumn) ? fieldOrColumn : [fieldOrColumn]
        cols.forEach(item => {
          const column = handleFieldOrColumn($xeTable, item)
          if (column && !column.visible) {
            column.visible = true
            if (!status) {
              status = true
            }
          }
        })
        if (status) {
          return tablePrivateMethods.handleCustom()
        }
        return nextTick()
      },
      setColumnWidth (fieldOrColumn, width) {
        const { elemStore } = internalData
        let status = false
        const cols = XEUtils.isArray(fieldOrColumn) ? fieldOrColumn : [fieldOrColumn]
        let cWidth = XEUtils.toInteger(width)
        if (isScale(width)) {
          const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
          const bodyWidth = bodyScrollElem ? bodyScrollElem.clientWidth - 1 : 0
          cWidth = Math.floor(cWidth * bodyWidth)
        }
        if (cWidth) {
          cols.forEach(item => {
            const column = handleFieldOrColumn($xeTable, item)
            if (column) {
              column.resizeWidth = cWidth
              if (!status) {
                status = true
              }
            }
          })
          if (status) {
            return $xeTable.refreshColumn().then(() => {
              return { status }
            })
          }
        }
        return nextTick().then(() => {
          return { status }
        })
      },
      getColumnWidth (fieldOrColumn) {
        const column = handleFieldOrColumn($xeTable, fieldOrColumn)
        if (column) {
          return column.renderWidth
        }
        return 0
      },
      /**
       * 手动重置列的显示隐藏、列宽拖动的状态、固定列、排序列；
       * 如果为 true 则重置所有状态
       * 如果已关联工具栏，则会同步更新
       */
      resetColumn (options) {
        warnLog('vxe.error.delFunc', ['resetColumn', 'resetCustom'])
        return $xeTable.resetCustom(options)
      },
      /**
       * 刷新列信息
       * 将固定的列左边、右边分别靠边
       * 如果传 true 则会检查列顺序并排序
       */
      refreshColumn (initSort) {
        if (initSort) {
          handleUpdateColumn()
        }
        return parseColumns(true).then(() => {
          return $xeTable.refreshScroll()
        }).then(() => {
          return handleLazyRecalculate(false, true, true)
        })
      },
      setRowHeightConf (heightConf) {
        const { fullAllDataRowIdData } = internalData
        let status = false
        if (heightConf) {
          XEUtils.each(heightConf, (height, rowid) => {
            const rowRest = fullAllDataRowIdData[rowid]
            if (rowRest) {
              const rHeight = XEUtils.toInteger(height)
              if (rHeight) {
                rowRest.resizeHeight = rHeight
                if (!status) {
                  status = true
                }
              }
            }
          })
          if (status) {
            internalData.isResizeCellHeight = true
            reactData.resizeHeightFlag++
          }
        }
        return nextTick().then(() => {
          updateRowOffsetTop()
          return { status }
        })
      },
      getRowHeightConf (isFull) {
        const { fullAllDataRowIdData, afterFullData } = internalData
        const { handleGetRowId } = createHandleGetRowId($xeTable)
        const rowOpts = computeRowOpts.value
        const cellOpts = computeCellOpts.value
        const defaultRowHeight = computeDefaultRowHeight.value
        const rest: Record<string, number> = {}
        afterFullData.forEach(row => {
          const rowid = handleGetRowId(row)
          const rowRest = fullAllDataRowIdData[rowid]
          if (rowRest) {
            const resizeHeight = rowRest.resizeHeight
            if (resizeHeight || isFull) {
              const currCellHeight = resizeHeight || cellOpts.height || rowOpts.height || rowRest.height || defaultRowHeight
              rest[rowid] = currCellHeight
            }
          }
        })
        return rest
      },
      setRowHeight (rowOrId, height) {
        const { fullAllDataRowIdData } = internalData
        let status = false
        const rows = XEUtils.isArray(rowOrId) ? rowOrId : [rowOrId]
        let rHeight = XEUtils.toInteger(height)
        if (isScale(height)) {
          const tableBody = refTableBody.value
          const bodyElem = tableBody ? tableBody.$el as HTMLDivElement : null
          const bodyHeight = bodyElem ? bodyElem.clientHeight - 1 : 0
          rHeight = Math.floor(rHeight * bodyHeight)
        }
        if (rHeight) {
          const { handleGetRowId } = createHandleGetRowId($xeTable)
          rows.forEach(row => {
            const rowid = XEUtils.isString(row) || XEUtils.isNumber(row) ? row : handleGetRowId(row)
            const rowRest = fullAllDataRowIdData[rowid]
            if (rowRest) {
              rowRest.resizeHeight = rHeight
              if (!status) {
                status = true
              }
            }
          })
          if (status) {
            internalData.isResizeCellHeight = true
            reactData.resizeHeightFlag++
          }
        }
        return nextTick().then(() => {
          return { status }
        })
      },
      getRowHeight (rowOrId) {
        const { fullAllDataRowIdData } = internalData
        const rowOpts = computeRowOpts.value
        const cellOpts = computeCellOpts.value
        const defaultRowHeight = computeDefaultRowHeight.value
        const rowid = XEUtils.isString(rowOrId) || XEUtils.isNumber(rowOrId) ? rowOrId : getRowid($xeTable, rowOrId)
        const rowRest = fullAllDataRowIdData[rowid]
        if (rowRest) {
          return rowRest.resizeHeight || cellOpts.height || rowOpts.height || rowRest.height || defaultRowHeight
        }
        return 0
      },
      /**
       * 刷新滚动操作，手动同步滚动相关位置（对于某些特殊的操作，比如滚动条错位、固定列不同步）
       */
      refreshScroll () {
        const { elemStore, lastScrollLeft, lastScrollTop } = internalData
        const headerScrollElem = getRefElem(elemStore['main-header-scroll'])
        const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
        const footerScrollElem = getRefElem(elemStore['main-footer-scroll'])
        const leftScrollElem = getRefElem(elemStore['left-body-scroll'])
        const rightScrollElem = getRefElem(elemStore['right-body-scroll'])
        const xHandleEl = refScrollXHandleElem.value
        const yHandleEl = refScrollYHandleElem.value
        return new Promise<void>(resolve => {
          // 还原滚动条位置
          if (lastScrollLeft || lastScrollTop) {
            return restoreScrollLocation($xeTable, lastScrollLeft, lastScrollTop).then(() => {
              // 存在滚动行为未结束情况
              setTimeout(resolve, 10)
            })
          }
          internalData.intoRunScroll = true
          // 重置
          setScrollTop(yHandleEl, lastScrollTop)
          setScrollTop(bodyScrollElem, lastScrollTop)
          setScrollTop(leftScrollElem, lastScrollTop)
          setScrollTop(rightScrollElem, lastScrollTop)

          setScrollLeft(xHandleEl, lastScrollLeft)
          setScrollLeft(bodyScrollElem, lastScrollLeft)
          setScrollLeft(headerScrollElem, lastScrollLeft)
          setScrollLeft(footerScrollElem, lastScrollLeft)
          // 存在滚动行为未结束情况
          setTimeout(() => {
            internalData.intoRunScroll = false
            resolve()
          }, 10)
        })
      },
      /**
       * 重新渲染布局
       * 刷新布局
       */
      recalculate (reFull?: boolean) {
        const isForce = !!reFull
        return handleLazyRecalculate(isForce, isForce, isForce)
      },
      openTooltip (target, content) {
        const $commTip = refCommTooltip.value
        if ($commTip && $commTip.open) {
          return $commTip.open(target, content)
        }
        return nextTick()
      },
      /**
       * 关闭 tooltip
       */
      closeTooltip () {
        const { tooltipStore } = reactData
        const $tooltip = refTooltip.value
        const $commTip = refCommTooltip.value
        if (tooltipStore.visible) {
          Object.assign(tooltipStore, {
            row: null,
            column: null,
            content: null,
            visible: false,
            currOpts: {}
          })
          if ($tooltip && $tooltip.close) {
            $tooltip.close()
          }
        }
        if ($commTip && $commTip.close) {
          $commTip.close()
        }
        return nextTick()
      },
      /**
       * 判断列头复选框是否被选中
       */
      isAllCheckboxChecked () {
        return reactData.isAllSelected
      },
      /**
       * 判断列头复选框是否被半选
       */
      isAllCheckboxIndeterminate () {
        return !reactData.isAllSelected && reactData.isIndeterminate
      },
      /**
       * 获取复选框半选状态的行数据
       */
      getCheckboxIndeterminateRecords (isFull) {
        const { treeConfig } = props
        const { fullDataRowIdData, treeIndeterminateRowMaps } = internalData
        if (treeConfig) {
          const fullRest: any[] = []
          const defRest: any[] = []
          XEUtils.each(treeIndeterminateRowMaps, (item, rowid) => {
            if (item) {
              fullRest.push(item)
              if (fullDataRowIdData[rowid]) {
                defRest.push(item)
              }
            }
          })
          if (isFull) {
            return fullRest
          }
          return defRest
        }
        return []
      },
      /**
       * 用于多选行，设置行为选中状态，第二个参数为选中与否
       * @param {Array/Row} rows 行数据
       * @param {Boolean} value 是否选中
       */
      setCheckboxRow (rows, checked) {
        if (rows && !XEUtils.isArray(rows)) {
          rows = [rows]
        }
        return handleCheckedCheckboxRow(rows, checked, true)
      },
      setCheckboxRowKey (keys: any, checked) {
        const { fullAllDataRowIdData } = internalData
        if (!XEUtils.isArray(keys)) {
          keys = [keys]
        }
        const rows: any = []
        keys.forEach((rowid: string) => {
          const rowRest = fullAllDataRowIdData[rowid]
          if (rowRest) {
            rows.push(rowRest.row)
          }
        })
        return handleCheckedCheckboxRow(rows, checked, true)
      },
      isCheckedByCheckboxRow (row) {
        const { updateCheckboxFlag } = reactData
        const { selectCheckboxMaps } = internalData
        const checkboxOpts = computeCheckboxOpts.value
        const { checkField } = checkboxOpts
        if (checkField) {
          return XEUtils.get(row, checkField)
        }
        return !!updateCheckboxFlag && !!selectCheckboxMaps[getRowid($xeTable, row)]
      },
      isCheckedByCheckboxRowKey (rowid: any) {
        const { updateCheckboxFlag } = reactData
        const { fullAllDataRowIdData, selectCheckboxMaps } = internalData
        const checkboxOpts = computeCheckboxOpts.value
        const { checkField } = checkboxOpts
        if (checkField) {
          const rowRest = fullAllDataRowIdData[rowid]
          if (rowRest) {
            return XEUtils.get(rowRest.row, checkField)
          }
          return false
        }
        return !!updateCheckboxFlag && !!selectCheckboxMaps[rowid]
      },
      isIndeterminateByCheckboxRow (row) {
        const { treeIndeterminateRowMaps } = internalData
        return !!treeIndeterminateRowMaps[getRowid($xeTable, row)] && !$xeTable.isCheckedByCheckboxRow(row)
      },
      isIndeterminateByCheckboxRowKey (rowid: any) {
        const { treeIndeterminateRowMaps } = internalData
        return !!treeIndeterminateRowMaps[rowid] && !$xeTable.isCheckedByCheckboxRowKey(rowid)
      },
      /**
       * 多选，切换某一行的选中状态
       */
      toggleCheckboxRow (row) {
        const { selectCheckboxMaps } = internalData
        const checkboxOpts = computeCheckboxOpts.value
        const { checkField } = checkboxOpts
        const checked = checkField ? !XEUtils.get(row, checkField) : !selectCheckboxMaps[getRowid($xeTable, row)]
        tablePrivateMethods.handleBatchSelectRows([row], checked, true)
        tablePrivateMethods.checkSelectionStatus()
        return nextTick()
      },
      /**
       * 用于多选行，设置所有行的选中状态
       * @param {Boolean} value 是否选中
       */
      setAllCheckboxRow (value) {
        return handleCheckedAllCheckboxRow(value, true)
      },
      /**
       * 获取单选框保留选中的行
       */
      getRadioReserveRecord (isFull) {
        const { treeConfig } = props
        const { fullDataRowIdData, radioReserveRow, afterFullData } = internalData
        const radioOpts = computeRadioOpts.value
        const treeOpts = computeTreeOpts.value
        const childrenField = treeOpts.children || treeOpts.childrenField
        if (radioOpts.reserve && radioReserveRow) {
          const rowid = getRowid($xeTable, radioReserveRow)
          if (isFull) {
            if (!fullDataRowIdData[rowid]) {
              return radioReserveRow
            }
          } else {
            const rowkey = getRowkey($xeTable)
            if (treeConfig) {
              const matchObj = XEUtils.findTree(afterFullData, row => rowid === XEUtils.get(row, rowkey), { children: childrenField })
              if (matchObj) {
                return radioReserveRow
              }
            } else {
              if (!afterFullData.some(row => rowid === XEUtils.get(row, rowkey))) {
                return radioReserveRow
              }
            }
          }
        }
        return null
      },
      clearRadioReserve () {
        internalData.radioReserveRow = null
        return nextTick()
      },
      /**
       * 获取复选框保留选中的行
       */
      getCheckboxReserveRecords (isFull) {
        const { treeConfig } = props
        const { afterFullData, fullDataRowIdData, checkboxReserveRowMap } = internalData
        const checkboxOpts = computeCheckboxOpts.value
        const treeOpts = computeTreeOpts.value
        const childrenField = treeOpts.children || treeOpts.childrenField
        const reserveSelection: any[] = []
        if (checkboxOpts.reserve) {
          const { handleGetRowId } = createHandleGetRowId($xeTable)
          const afterFullIdMaps: { [key: string]: number } = {}
          if (treeConfig) {
            XEUtils.eachTree(afterFullData, row => {
              afterFullIdMaps[handleGetRowId(row)] = 1
            }, { children: childrenField })
          } else {
            afterFullData.forEach(row => {
              afterFullIdMaps[handleGetRowId(row)] = 1
            })
          }
          XEUtils.each(checkboxReserveRowMap, (oldRow, oldRowid) => {
            if (oldRow) {
              if (isFull) {
                if (!fullDataRowIdData[oldRowid]) {
                  reserveSelection.push(oldRow)
                }
              } else {
                if (!afterFullIdMaps[oldRowid]) {
                  reserveSelection.push(oldRow)
                }
              }
            }
          })
        }
        return reserveSelection
      },
      clearCheckboxReserve () {
        internalData.checkboxReserveRowMap = {}
        return nextTick()
      },
      /**
       * 多选，切换所有行的选中状态
       */
      toggleAllCheckboxRow () {
        handleCheckAllEvent(null, !reactData.isAllSelected)
        return nextTick()
      },
      /**
       * 用于多选行，手动清空用户的选择
       * 清空行为不管是否被禁用还是保留记录，都将彻底清空选中状态
       */
      clearCheckboxRow () {
        const { treeConfig } = props
        const { tableFullData } = internalData
        const treeOpts = computeTreeOpts.value
        const childrenField = treeOpts.children || treeOpts.childrenField
        const checkboxOpts = computeCheckboxOpts.value
        const { checkField, reserve } = checkboxOpts
        // indeterminateField 仅支持读取
        const indeterminateField = checkboxOpts.indeterminateField || checkboxOpts.halfField
        if (checkField) {
          const handleClearChecked = (item: any) => {
            if (treeConfig && indeterminateField) {
              XEUtils.set(item, indeterminateField, false)
            }
            XEUtils.set(item, checkField, false)
          }
          if (treeConfig) {
            XEUtils.eachTree(tableFullData, handleClearChecked, { children: childrenField })
          } else {
            tableFullData.forEach(handleClearChecked)
          }
        }
        if (reserve) {
          tableFullData.forEach((row) => handleCheckboxReserveRow(row, false))
        }
        reactData.isAllSelected = false
        reactData.isIndeterminate = false
        internalData.selectCheckboxMaps = {}
        internalData.treeIndeterminateRowMaps = {}
        reactData.updateCheckboxFlag++
        return nextTick()
      },
      /**
       * 用于当前行，设置某一行为高亮状态
       * @param {Row} row 行对象
       */
      setCurrentRow (row) {
        const rowOpts = computeRowOpts.value
        const el = refElem.value
        tableMethods.clearCurrentRow()
        // tableMethods.clearCurrentColumn()
        reactData.currentRow = row
        if (rowOpts.isCurrent || props.highlightCurrentRow) {
          if (el) {
            XEUtils.arrayEach(el.querySelectorAll(`[rowid="${getRowid($xeTable, row)}"]`), elem => addClass(elem, 'row--current'))
          }
        }
        return nextTick()
      },
      isCheckedByRadioRow (row) {
        const { selectRadioRow } = reactData
        if (row && selectRadioRow) {
          return $xeTable.eqRow(selectRadioRow, row)
        }
        return false
      },
      isCheckedByRadioRowKey (key) {
        const { selectRadioRow } = reactData
        if (selectRadioRow) {
          return key === getRowid($xeTable, selectRadioRow)
        }
        return false
      },
      /**
       * 用于单选行，设置某一行为选中状态
       * @param {Row} row 行对象
       */
      setRadioRow (row) {
        return handleCheckedRadioRow(row, true)
      },
      /**
       * 用于单选行，设置某一行为选中状态
       * @param key 行主键
       */
      setRadioRowKey (rowid: any) {
        const { fullAllDataRowIdData } = internalData
        const rowRest = fullAllDataRowIdData[rowid]
        if (rowRest) {
          return handleCheckedRadioRow(rowRest.row, true)
        }
        return nextTick()
      },
      /**
       * 用于当前行，手动清空当前高亮的状态
       */
      clearCurrentRow () {
        const el = refElem.value
        reactData.currentRow = null
        internalData.hoverRow = null
        if (el) {
          XEUtils.arrayEach(el.querySelectorAll('.row--current'), elem => removeClass(elem, 'row--current'))
        }
        return nextTick()
      },
      /**
       * 用于单选行，手动清空用户的选择
       */
      clearRadioRow () {
        reactData.selectRadioRow = null
        return nextTick()
      },
      /**
       * 用于当前行，获取当前行的数据
       */
      getCurrentRecord () {
        const rowOpts = computeRowOpts.value
        return rowOpts.isCurrent || props.highlightCurrentRow ? reactData.currentRow : null
      },
      /**
       * 用于单选行，获取当已选中的数据
       */
      getRadioRecord (isFull) {
        const { fullDataRowIdData, afterFullRowMaps } = internalData
        const { selectRadioRow } = reactData
        if (selectRadioRow) {
          const rowid = getRowid($xeTable, selectRadioRow)
          if (isFull) {
            if (fullDataRowIdData[rowid]) {
              return selectRadioRow
            }
          } else {
            if (afterFullRowMaps[rowid]) {
              return selectRadioRow
            }
          }
        }
        return null
      },
      getCurrentColumn () {
        const columnOpts = computeColumnOpts.value
        return columnOpts.isCurrent || props.highlightCurrentColumn ? reactData.currentColumn : null
      },
      /**
       * 用于当前列，设置某列行为高亮状态
       */
      setCurrentColumn (fieldOrColumn) {
        const { mouseConfig } = props
        const mouseOpts = computeMouseOpts.value
        const isMouseSelected = mouseConfig && mouseOpts.selected
        const column = handleFieldOrColumn($xeTable, fieldOrColumn)
        if (column) {
          $xeTable.clearCurrentColumn()
          reactData.currentColumn = column
        }
        return nextTick().then(() => {
          // 更新状选中态
          if (isMouseSelected) {
            $xeTable.addCellSelectedClass()
          }
        })
      },
      /**
       * 用于当前列，手动清空当前高亮的状态
       */
      clearCurrentColumn () {
        reactData.currentColumn = null
        return nextTick()
      },
      setPendingRow (rows: any | any[], status: boolean) {
        const { handleGetRowId } = createHandleGetRowId($xeTable)
        const { pendingRowMaps } = internalData
        if (rows && !XEUtils.isArray(rows)) {
          rows = [rows]
        }
        if (status) {
          rows.forEach((row: any) => {
            const rowid = handleGetRowId(row)
            if (rowid && !pendingRowMaps[rowid]) {
              pendingRowMaps[rowid] = row
            }
          })
        } else {
          rows.forEach((row: any) => {
            const rowid = handleGetRowId(row)
            if (rowid && pendingRowMaps[rowid]) {
              delete pendingRowMaps[rowid]
            }
          })
        }
        reactData.pendingRowFlag++
        return nextTick()
      },
      togglePendingRow (rows: any | any[]) {
        const { handleGetRowId } = createHandleGetRowId($xeTable)
        const { pendingRowMaps } = internalData
        if (rows && !XEUtils.isArray(rows)) {
          rows = [rows]
        }
        rows.forEach((row: any) => {
          const rowid = handleGetRowId(row)
          if (rowid) {
            if (pendingRowMaps[rowid]) {
              delete pendingRowMaps[rowid]
            } else {
              pendingRowMaps[rowid] = row
            }
          }
        })
        reactData.pendingRowFlag++
        return nextTick()
      },
      hasPendingByRow (row) {
        return tableMethods.isPendingByRow(row)
      },
      isPendingByRow (row) {
        const { pendingRowMaps } = internalData
        const rowid = getRowid($xeTable, row)
        return !!pendingRowMaps[rowid]
      },
      getPendingRecords () {
        const { fullAllDataRowIdData, pendingRowMaps } = internalData
        const insertRecords: any[] = []
        XEUtils.each(pendingRowMaps, (row, rowid) => {
          if (fullAllDataRowIdData[rowid]) {
            insertRecords.push(row)
          }
        })
        return insertRecords
      },
      clearPendingRow () {
        internalData.pendingRowMaps = {}
        reactData.pendingRowFlag++
        return nextTick()
      },
      sort (sortConfs: any, sortOrder?: VxeTablePropTypes.SortOrder) {
        const sortOpts = computeSortOpts.value
        const { multiple, remote, orders } = sortOpts
        if (sortConfs) {
          if (XEUtils.isString(sortConfs)) {
            sortConfs = [
              { field: sortConfs, order: sortOrder }
            ]
          }
        }
        if (!XEUtils.isArray(sortConfs)) {
          sortConfs = [sortConfs]
        }
        if (sortConfs.length) {
          if (!multiple) {
            clearAllSort()
          }
          (multiple ? sortConfs : [sortConfs[0]]).forEach((confs: any, index: number) => {
            let { field, order } = confs
            let column = field
            if (XEUtils.isString(field)) {
              column = tableMethods.getColumnByField(field)
            }
            if (column && column.sortable) {
              if (orders && orders.indexOf(order) === -1) {
                order = getNextSortOrder(column)
              }
              if (column.order !== order) {
                column.order = order
              }
              column.sortTime = Date.now() + index
            }
          })
          // 如果是服务端排序，则跳过本地排序处理
          if (!remote) {
            tablePrivateMethods.handleTableData(true)
          }
          return nextTick().then(() => {
            updateRowOffsetTop()
            tableMethods.updateCellAreas()
            return updateStyle()
          })
        }
        return nextTick()
      },
      setSort (sortConfs, isUpdate) {
        // 已废弃，即将去掉事件触发 new Event('click') -> null
        return handleSortEvent(new Event('click'), sortConfs, isUpdate)
      },
      setSortByEvent (evnt, sortConfs, isUpdate) {
        return handleSortEvent(evnt, sortConfs, isUpdate)
      },
      /**
       * 清空指定列的排序条件
       * 如果为空则清空所有列的排序条件
       * @param {String} fieldOrColumn 列或字段名
       */
      clearSort (fieldOrColumn) {
        const sortOpts = computeSortOpts.value
        if (fieldOrColumn) {
          const column = handleFieldOrColumn($xeTable, fieldOrColumn)
          if (column) {
            column.order = null
          }
        } else {
          clearAllSort()
        }
        if (!sortOpts.remote) {
          $xeTable.handleTableData(true)
        }
        return nextTick().then(() => {
          updateRowOffsetTop()
          return updateStyle()
        })
      },
      clearSortByEvent (evnt, fieldOrColumn) {
        const { tableFullColumn } = internalData
        const sortOpts = computeSortOpts.value
        const sortCols: VxeTableDefines.ColumnInfo[] = []
        let column: VxeTableDefines.ColumnInfo<any> | null = null
        if (evnt) {
          if (fieldOrColumn) {
            column = handleFieldOrColumn($xeTable, fieldOrColumn)
            if (column) {
              column.order = null
            }
          } else {
            tableFullColumn.forEach((column) => {
              if (column.order) {
                column.order = null
                sortCols.push(column)
              }
            })
          }
          if (!sortOpts.remote) {
            $xeTable.handleTableData(true)
          }
          if (sortCols.length) {
            const params = { $table: $xeTable, $event: evnt, cols: sortCols, sortList: [] }
            dispatchEvent('clear-all-sort', params, evnt)
          } else if (column) {
            $xeTable.handleColumnSortEvent(evnt, column)
          }
        }
        return nextTick().then(() => {
          updateRowOffsetTop()
          return updateStyle()
        })
      },
      isSort (fieldOrColumn) {
        if (fieldOrColumn) {
          const column = handleFieldOrColumn($xeTable, fieldOrColumn)
          return column ? column.sortable && !!column.order : false
        }
        return tableMethods.getSortColumns().length > 0
      },
      getSortColumns () {
        const sortOpts = computeSortOpts.value
        const { multiple, chronological } = sortOpts
        const sortList: VxeTableDefines.SortCheckedParams[] = []
        const { tableFullColumn } = internalData
        tableFullColumn.forEach((column) => {
          const { field, order } = column
          if (column.sortable && order) {
            sortList.push({ column, field, property: field, order: order, sortTime: column.sortTime })
          }
        })
        if (multiple && chronological && sortList.length > 1) {
          return XEUtils.orderBy(sortList, 'sortTime')
        }
        return sortList
      },
      setFilterByEvent (evnt, fieldOrColumn, options, isUpdate) {
        const column = handleFieldOrColumn($xeTable, fieldOrColumn)
        if (column && column.filters) {
          column.filters = toFilters(options || [])
          if (isUpdate) {
            return $xeTable.handleColumnConfirmFilter(column, evnt)
          }
        }
        return nextTick()
      },
      /**
       * 关闭筛选
       * @param {Event} evnt 事件
       */
      closeFilter () {
        const { filterStore } = reactData
        const { column, visible } = filterStore
        filterStore.isAllSelected = false
        filterStore.isIndeterminate = false
        filterStore.options = []
        filterStore.visible = false
        if (visible) {
          dispatchEvent('filter-visible', {
            column,
            property: column.field,
            field: column.field,
            filterList: () => $xeTable.getCheckedFilters(),
            visible: false
          }, null)
        }
        return nextTick()
      },
      /**
       * 判断指定列是否为筛选状态，如果为空则判断所有列
       * @param {String} fieldOrColumn 字段名
       */
      isActiveFilterByColumn (fieldOrColumn) {
        const column = handleFieldOrColumn($xeTable, fieldOrColumn)
        if (column) {
          return column.filters && column.filters.some((option) => option.checked)
        }
        return $xeTable.getCheckedFilters().length > 0
      },
      isFilter (fieldOrColumn) {
        return tableMethods.isActiveFilterByColumn(fieldOrColumn)
      },
      clearFilterByEvent (evnt, fieldOrColumn) {
        const { filterStore } = reactData
        const { tableFullColumn } = internalData
        const filterOpts = computeFilterOpts.value
        const filterCols: VxeTableDefines.ColumnInfo[] = []
        let column: VxeTableDefines.ColumnInfo<any> | null = null
        if (fieldOrColumn) {
          column = handleFieldOrColumn($xeTable, fieldOrColumn)
          if (column) {
            $xeTable.handleClearFilter(column)
          }
        } else {
          tableFullColumn.forEach(column => {
            if (column.filters) {
              filterCols.push(column)
              $xeTable.handleClearFilter(column)
            }
          })
        }
        if (!fieldOrColumn || column !== filterStore.column) {
          Object.assign(filterStore, {
            isAllSelected: false,
            isIndeterminate: false,
            style: null,
            options: [],
            column: null,
            multiple: false,
            visible: false
          })
        }
        if (!filterOpts.remote) {
          $xeTable.updateData()
        }
        if (filterCols.length) {
          const params = { $table: $xeTable, $event: evnt, cols: filterCols, filterList: [] }
          dispatchEvent('clear-all-filter', params, evnt)
        } else if (column) {
          $xeTable.dispatchEvent('clear-filter', { filterList: () => $xeTable.getCheckedFilters() }, evnt)
        }
        return nextTick()
      },
      /**
       * 判断展开行是否懒加载完成
       * @param {Row} row 行对象
       */
      isRowExpandLoaded (row) {
        const { fullAllDataRowIdData } = internalData
        const rowRest = fullAllDataRowIdData[getRowid($xeTable, row)]
        return rowRest && !!rowRest.expandLoaded
      },
      clearRowExpandLoaded (row) {
        const { fullAllDataRowIdData, rowExpandLazyLoadedMaps } = internalData
        const expandOpts = computeExpandOpts.value
        const { lazy } = expandOpts
        const rowid = getRowid($xeTable, row)
        const rowRest = fullAllDataRowIdData[rowid]
        if (lazy && rowRest) {
          rowRest.expandLoaded = false
          delete rowExpandLazyLoadedMaps[rowid]
        }
        reactData.rowExpandedFlag++
        return nextTick()
      },
      /**
       * 重新懒加载展开行，并展开内容
       * @param {Row} row 行对象
       */
      reloadRowExpand (row) {
        const { rowExpandLazyLoadedMaps } = internalData
        const expandOpts = computeExpandOpts.value
        const { lazy } = expandOpts
        const rowid = getRowid($xeTable, row)
        if (lazy && !rowExpandLazyLoadedMaps[rowid]) {
          $xeTable.clearRowExpandLoaded(row)
            .then(() => handleAsyncRowExpand(row))
        }
        return nextTick()
      },
      reloadExpandContent (row) {
        warnLog('vxe.error.delFunc', ['reloadExpandContent', 'reloadRowExpand'])
        // 即将废弃
        return $xeTable.reloadRowExpand(row)
      },
      /**
       * 切换展开行
       */
      toggleRowExpand (row) {
        return $xeTable.setRowExpand(row, !$xeTable.isRowExpandByRow(row))
      },
      /**
       * 设置所有行的展开与否
       * @param {Boolean} expanded 是否展开
       */
      setAllRowExpand (expanded) {
        const treeOpts = computeTreeOpts.value
        const { tableFullData, tableFullTreeData } = internalData
        const childrenField = treeOpts.children || treeOpts.childrenField
        let expandedRows: any[] = []
        if (props.treeConfig) {
          XEUtils.eachTree(tableFullTreeData, (row) => {
            expandedRows.push(row)
          }, { children: childrenField })
        } else {
          expandedRows = tableFullData
        }
        return tableMethods.setRowExpand(expandedRows, expanded)
      },
      /**
       * 设置展开行，二个参数设置这一行展开与否
       * 支持单行
       * 支持多行
       * @param {Array/Row} rows 行数据
       * @param {Boolean} expanded 是否展开
       */
      setRowExpand (rows, expanded) {
        const { expandColumn } = reactData
        let { fullAllDataRowIdData, rowExpandedMaps, rowExpandLazyLoadedMaps } = internalData
        const { handleGetRowId } = createHandleGetRowId($xeTable)
        const expandOpts = computeExpandOpts.value
        const { reserve, lazy, accordion, toggleMethod } = expandOpts
        const lazyRests: any[] = []
        const columnIndex = expandColumn ? $xeTable.getColumnIndex(expandColumn) : -1
        const $columnIndex = expandColumn ? $xeTable.getVMColumnIndex(expandColumn) : -1
        if (rows) {
          if (!XEUtils.isArray(rows)) {
            rows = [rows]
          }
          if (accordion) {
            // 只能同时展开一个
            rowExpandedMaps = {}
            internalData.rowExpandedMaps = rowExpandedMaps
            rows = rows.slice(rows.length - 1, rows.length)
          }
          const validRows: any[] = toggleMethod ? rows.filter((row: any) => toggleMethod({ $table: $xeTable, expanded, column: expandColumn as VxeTableDefines.ColumnInfo, columnIndex, $columnIndex, row, rowIndex: $xeTable.getRowIndex(row), $rowIndex: $xeTable.getVMRowIndex(row) })) : rows
          if (expanded) {
            validRows.forEach((row) => {
              const rowid = handleGetRowId(row)
              if (!rowExpandedMaps[rowid]) {
                const rowRest = fullAllDataRowIdData[rowid]
                const isLoad = lazy && !rowRest.expandLoaded && !rowExpandLazyLoadedMaps[rowid]
                if (isLoad) {
                  lazyRests.push(handleAsyncRowExpand(row))
                } else {
                  rowExpandedMaps[rowid] = row
                }
              }
            })
          } else {
            validRows.forEach(item => {
              const rowid = handleGetRowId(item)
              if (rowExpandedMaps[rowid]) {
                delete rowExpandedMaps[rowid]
              }
            })
          }
          if (reserve) {
            validRows.forEach((row) => handleRowExpandReserve(row, expanded))
          }
        }
        reactData.rowExpandedFlag++
        return Promise.all(lazyRests)
          .then(() => nextTick())
          .then(() => handleLazyRecalculate(true, true, true))
          .then(() => {
            updateRowOffsetTop()
            updateRowExpandStyle()
            handleRowExpandScroll()
            return $xeTable.updateCellAreas()
          })
      },
      /**
       * 判断行是否为展开状态
       * @param {Row} row 行对象
       */
      isRowExpandByRow (row) {
        const { rowExpandedFlag } = reactData
        const { rowExpandedMaps } = internalData
        const rowid = getRowid($xeTable, row)
        return !!rowExpandedFlag && !!rowExpandedMaps[rowid]
      },
      isExpandByRow (row) {
        // 已废弃
        warnLog('vxe.error.delFunc', ['isExpandByRow', 'isRowExpandByRow'])
        return tableMethods.isRowExpandByRow(row)
      },
      /**
       * 手动清空展开行状态，数据会恢复成未展开的状态
       */
      clearRowExpand () {
        const { tableFullData, scrollYStore } = internalData
        const expandOpts = computeExpandOpts.value
        const { reserve } = expandOpts
        const expList = $xeTable.getRowExpandRecords()
        internalData.rowExpandedMaps = {}
        if (reserve) {
          tableFullData.forEach((row) => handleRowExpandReserve(row, false))
        }
        reactData.rowExpandedFlag++
        scrollYStore.startIndex = 0
        scrollYStore.endIndex = 1
        return nextTick().then(() => {
          if (expList.length) {
            return handleLazyRecalculate(true, true, true)
          }
        }).then(() => {
          updateRowOffsetTop()
          updateRowExpandStyle()
          handleRowExpandScroll()
          return $xeTable.updateCellAreas()
        })
      },
      clearRowExpandReserve () {
        internalData.rowExpandedReserveRowMap = {}
        return nextTick()
      },
      getRowExpandRecords () {
        const rest: any[] = []
        XEUtils.each(internalData.rowExpandedMaps, item => {
          if (item) {
            rest.push(item)
          }
        })
        return rest
      },
      setRowGroups (fieldOrColumns) {
        const { aggregateConfig, rowGroupConfig } = props
        const aggregateOpts = computeAggregateOpts.value
        const { maxGroupSize } = aggregateOpts
        if (!(aggregateConfig || rowGroupConfig)) {
          errLog('vxe.error.reqProp', ['aggregate-config'])
          return nextTick()
        }
        const confList = fieldOrColumns ? (XEUtils.isArray(fieldOrColumns) ? fieldOrColumns : [fieldOrColumns]) : []
        if (maxGroupSize && confList.length > maxGroupSize) {
          if (VxeUI.modal) {
            VxeUI.modal.message({
              status: 'error',
              content: getI18n('vxe.table.maxGroupCol', [maxGroupSize])
            })
          }
          return nextTick()
        }
        if (confList.length) {
          handleUpdateRowGroup(confList.map(fieldOrColumn => {
            return XEUtils.isString(fieldOrColumn) ? fieldOrColumn : fieldOrColumn.field
          }))
          return loadTableData(internalData.tableSynchData, true)
        }
        return nextTick()
      },
      clearRowGroups () {
        const { aggregateConfig, rowGroupConfig } = props
        if (!(aggregateConfig || rowGroupConfig)) {
          errLog('vxe.error.reqProp', ['aggregate-config'])
          return nextTick()
        }
        handleUpdateRowGroup([])
        return loadTableData(internalData.tableSynchData, true)
      },
      isRowGroupRecord (row) {
        warnLog('vxe.error.delFunc', ['isRowGroupRecord', 'isAggregateRecord'])
        return $xeTable.isAggregateRecord(row)
      },
      isRowGroupExpandByRow (row) {
        warnLog('vxe.error.delFunc', ['isRowGroupExpandByRow', 'isAggregateExpandByRow'])
        return $xeTable.isAggregateExpandByRow(row)
      },
      isAggregateRecord (row) {
        const { isRowGroupStatus } = reactData
        return isRowGroupStatus && row.isAggregate
      },
      getAggregateContentByRow (row) {
        const { isRowGroupStatus } = reactData
        return isRowGroupStatus && row && row.isAggregate ? row.groupContent : ''
      },
      getAggregateRowChildren (row) {
        const aggregateOpts = computeAggregateOpts.value
        const { childrenField, mapChildrenField } = aggregateOpts

        const { isRowGroupStatus } = reactData
        return isRowGroupStatus && row && row.isAggregate && childrenField && mapChildrenField ? (row[mapChildrenField] || []) : []
      },
      isAggregateExpandByRow (row) {
        const { rowGroupExpandedFlag } = reactData
        const { rowGroupExpandedMaps } = internalData
        return !!rowGroupExpandedFlag && !!rowGroupExpandedMaps[getRowid($xeTable, row)]
      },
      setRowGroupExpand (rows, expanded) {
        if (rows) {
          if (!XEUtils.isArray(rows)) {
            rows = [rows]
          }
          return handleRowGroupVirtualExpand(rows, expanded)
        }
        return nextTick()
      },
      setAllRowGroupExpand (expanded) {
        const { tableFullGroupData } = internalData
        const aggregateOpts = computeAggregateOpts.value
        const { mapChildrenField } = aggregateOpts
        const rgExpandedMaps: Record<string, any> = {}
        if (expanded && mapChildrenField) {
          XEUtils.eachTree(tableFullGroupData, (row) => {
            if (row[mapChildrenField] && row[mapChildrenField].length) {
              rgExpandedMaps[getRowid($xeTable, row)] = row
            }
          }, { children: mapChildrenField })
        }
        internalData.rowGroupExpandedMaps = rgExpandedMaps
        handleVirtualTreeToList()
        $xeTable.handleTableData()
        updateAfterDataIndex()
        reactData.rowGroupExpandedFlag++
        return handleLazyRecalculate(true, true, true)
      },
      clearRowGroupExpand () {
        internalData.rowGroupExpandedMaps = {}
        handleVirtualTreeToList()
        $xeTable.handleTableData()
        updateAfterDataIndex()
        reactData.rowGroupExpandedFlag++
        return handleLazyRecalculate(true, true, true)
      },
      getTreeExpandRecords () {
        const rest: any[] = []
        XEUtils.each(internalData.treeExpandedMaps, item => {
          if (item) {
            rest.push(item)
          }
        })
        return rest
      },
      /**
       * 判断树节点是否懒加载完成
       * @param {Row} row 行对象
       */
      isTreeExpandLoaded (row) {
        const { fullAllDataRowIdData } = internalData
        const rowRest = fullAllDataRowIdData[getRowid($xeTable, row)]
        return rowRest && !!rowRest.treeLoaded
      },
      clearTreeExpandLoaded (rows: any) {
        const { fullAllDataRowIdData, treeExpandedMaps } = internalData
        const treeOpts = computeTreeOpts.value
        const { transform } = treeOpts
        if (rows) {
          if (!XEUtils.isArray(rows)) {
            rows = [rows]
          }
          rows.forEach((row: any) => {
            const rowid = getRowid($xeTable, row)
            const rowRest = fullAllDataRowIdData[rowid]
            if (rowRest) {
              rowRest.treeLoaded = false
              if (treeExpandedMaps[rowid]) {
                delete treeExpandedMaps[rowid]
              }
            }
          })
        } else {
          XEUtils.each(fullAllDataRowIdData, (rowRest) => {
            rowRest.treeLoaded = false
          })
        }
        internalData.treeExpandedMaps = {}
        if (transform) {
          handleVirtualTreeToList()
          $xeTable.handleTableData()
        }
        reactData.treeExpandedFlag++
        return nextTick()
      },
      /**
       * 重新懒加载树节点，并展开该节点
       * @param {Row} row 行对象
       */
      reloadTreeExpand (row) {
        const { treeExpandLazyLoadedMaps } = internalData
        const treeOpts = computeTreeOpts.value
        const hasChildField = treeOpts.hasChild || treeOpts.hasChildField
        const { transform, lazy } = treeOpts
        const rowid = getRowid($xeTable, row)
        if (lazy && row[hasChildField] && !treeExpandLazyLoadedMaps[rowid]) {
          return $xeTable.clearTreeExpandLoaded(row).then(() => {
            return handleAsyncTreeExpandChilds(row)
          }).then(() => {
            if (transform) {
              handleVirtualTreeToList()
              $xeTable.handleTableData()
            }
            reactData.treeExpandedFlag++
          }).then(() => {
            return $xeTable.recalculate()
          })
        }
        return nextTick()
      },
      reloadTreeChilds (row) {
        warnLog('vxe.error.delFunc', ['reloadTreeChilds', 'reloadTreeExpand'])
        // 即将废弃
        return $xeTable.reloadTreeExpand(row)
      },
      /**
       * 切换/展开树节点
       */
      toggleTreeExpand (row) {
        return $xeTable.setTreeExpand(row, !$xeTable.isTreeExpandByRow(row))
      },
      /**
       * 设置所有树节点的展开与否
       * @param {Boolean} expanded 是否展开
       */
      setAllTreeExpand (expanded: boolean) {
        const { tableFullData } = internalData
        const treeOpts = computeTreeOpts.value
        const { transform, lazy } = treeOpts
        const childrenField = treeOpts.children || treeOpts.childrenField
        const expandeds: any[] = []
        XEUtils.eachTree(tableFullData, (row) => {
          const rowChildren = row[childrenField]
          if (lazy || (rowChildren && rowChildren.length)) {
            expandeds.push(row)
          }
        }, { children: childrenField })
        return $xeTable.setTreeExpand(expandeds, expanded).then(() => {
          if (transform) {
            handleVirtualTreeToList()
            reactData.treeExpandedFlag++
            return $xeTable.recalculate()
          }
        })
      },
      /**
       * 设置展开树形节点，二个参数设置这一行展开与否
       * 支持单行
       * 支持多行
       * @param {Array/Row} rows 行数据
       * @param {Boolean} expanded 是否展开
       */
      setTreeExpand (rows, expanded) {
        const treeOpts = computeTreeOpts.value
        const { transform } = treeOpts
        if (rows) {
          if (!XEUtils.isArray(rows)) {
            rows = [rows]
          }
          if (rows.length) {
            // 如果为虚拟树
            if (transform) {
              return handleVirtualTreeExpand(rows, expanded)
            } else {
              return handleBaseTreeExpand(rows, expanded)
            }
          }
        }
        return nextTick()
      },
      /**
       * 判断行是否为树形节点展开状态
       * @param {Row} row 行对象
       */
      isTreeExpandByRow (row) {
        const { treeExpandedFlag } = reactData
        const { treeExpandedMaps } = internalData
        return !!treeExpandedFlag && !!treeExpandedMaps[getRowid($xeTable, row)]
      },
      /**
       * 手动清空树形节点的展开状态，数据会恢复成未展开的状态
       */
      clearTreeExpand () {
        const { tableFullTreeData } = internalData
        const treeOpts = computeTreeOpts.value
        const childrenField = treeOpts.children || treeOpts.childrenField
        const { transform, reserve } = treeOpts
        const expList = $xeTable.getTreeExpandRecords()
        internalData.treeExpandedMaps = {}
        if (reserve) {
          XEUtils.eachTree(tableFullTreeData, row => handleTreeExpandReserve(row, false), { children: childrenField })
        }
        return $xeTable.handleTableData().then(() => {
          if (transform) {
            handleVirtualTreeToList()
            $xeTable.handleTableData()
          }
          reactData.treeExpandedFlag++
        }).then(() => {
          if (expList.length) {
            return $xeTable.recalculate()
          }
        })
      },
      clearTreeExpandReserve () {
        internalData.treeExpandedReserveRowMap = {}
        return nextTick()
      },
      /**
       * 获取表格的滚动状态
       */
      getScroll () {
        const { scrollXLoad, scrollYLoad } = reactData
        const { elemStore } = internalData
        const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
        return {
          virtualX: scrollXLoad,
          virtualY: scrollYLoad,
          scrollTop: bodyScrollElem ? bodyScrollElem.scrollTop : 0,
          scrollLeft: bodyScrollElem ? bodyScrollElem.scrollLeft : 0
        }
      },
      /**
       * 如果有滚动条，则滚动到对应的位置
       * @param {Number} scrollLeft 左距离
       * @param {Number} scrollTop 上距离
       */
      scrollTo (scrollLeft, scrollTop) {
        const { elemStore } = internalData
        const headerScrollElem = getRefElem(elemStore['main-header-scroll'])
        const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
        const footerScrollElem = getRefElem(elemStore['main-footer-scroll'])
        const leftScrollElem = getRefElem(elemStore['left-body-scroll'])
        const rightScrollElem = getRefElem(elemStore['right-body-scroll'])
        const xHandleEl = refScrollXHandleElem.value
        const yHandleEl = refScrollYHandleElem.value

        internalData.intoRunScroll = true

        if (XEUtils.isNumber(scrollLeft)) {
          setScrollLeft(xHandleEl, scrollLeft)
          setScrollLeft(bodyScrollElem, scrollLeft)
          setScrollLeft(headerScrollElem, scrollLeft)
          setScrollLeft(footerScrollElem, scrollLeft)
          loadScrollXData()
        }
        if (XEUtils.isNumber(scrollTop)) {
          setScrollTop(yHandleEl, scrollTop)
          setScrollTop(bodyScrollElem, scrollTop)
          setScrollTop(leftScrollElem, scrollTop)
          setScrollTop(rightScrollElem, scrollTop)
          loadScrollYData()
        }
        if (reactData.scrollXLoad || reactData.scrollYLoad) {
          return new Promise<void>(resolve => {
            setTimeout(() => {
              nextTick(() => {
                internalData.intoRunScroll = false
                resolve()
              })
            }, 30)
          })
        }
        return nextTick().then(() => {
          internalData.intoRunScroll = false
        })
      },
      /**
       * 如果有滚动条，则滚动到对应的行
       * @param {Row} row 行对象
       * @param {ColumnInfo} fieldOrColumn 列配置
       */
      scrollToRow (row, fieldOrColumn) {
        const { isAllOverflow, scrollYLoad, scrollXLoad } = reactData
        const rest = []
        if (row) {
          if (props.treeConfig) {
            rest.push($xeTable.scrollToTreeRow(row))
          } else {
            rest.push(rowToVisible($xeTable, row))
          }
        }
        if (fieldOrColumn) {
          rest.push(handleScrollToRowColumn(fieldOrColumn, row))
        }
        return Promise.all(rest).then(() => {
          if (row) {
            if (!isAllOverflow && (scrollYLoad || scrollXLoad)) {
              calcCellHeight()
              calcCellWidth()
            }
            return nextTick()
          }
        })
      },
      /**
       * 如果有滚动条，则滚动到对应的列
       */
      scrollToColumn (fieldOrColumn) {
        const { fullColumnIdData } = internalData
        const column = handleFieldOrColumn($xeTable, fieldOrColumn)
        if (column && fullColumnIdData[column.id]) {
          return colToVisible($xeTable, column)
        }
        return nextTick()
      },
      /**
       * 手动清除滚动相关信息，还原到初始状态
       */
      clearScroll () {
        const { elemStore, scrollXStore, scrollYStore } = internalData
        const headerScrollElem = getRefElem(elemStore['main-header-scroll'])
        const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
        const footerScrollElem = getRefElem(elemStore['main-footer-scroll'])
        const leftScrollElem = getRefElem(elemStore['left-body-scroll'])
        const rightScrollElem = getRefElem(elemStore['right-body-scroll'])
        const xHandleEl = refScrollXHandleElem.value
        const yHandleEl = refScrollYHandleElem.value

        internalData.intoRunScroll = true

        setScrollLeft(xHandleEl, 0)
        setScrollLeft(bodyScrollElem, 0)
        setScrollLeft(headerScrollElem, 0)
        setScrollLeft(footerScrollElem, 0)

        setScrollTop(yHandleEl, 0)
        setScrollTop(bodyScrollElem, 0)
        setScrollTop(leftScrollElem, 0)
        setScrollTop(rightScrollElem, 0)

        scrollXStore.startIndex = 0
        scrollXStore.visibleStartIndex = 0
        scrollXStore.endIndex = scrollXStore.visibleSize
        scrollXStore.visibleEndIndex = scrollXStore.visibleSize
        scrollYStore.startIndex = 0
        scrollYStore.visibleStartIndex = 0
        scrollYStore.endIndex = scrollYStore.visibleSize
        scrollYStore.visibleEndIndex = scrollYStore.visibleSize
        return nextTick().then(() => {
          internalData.intoRunScroll = false
        })
      },
      /**
       * 更新表尾合计
       */
      updateFooter () {
        const { showFooter, footerData, footerMethod } = props
        const { visibleColumn, afterFullData } = internalData
        let footData: any[] = []
        if (showFooter && footerData && footerData.length) {
          footData = footerData.slice(0)
        } else if (showFooter && footerMethod) {
          footData = visibleColumn.length ? footerMethod({ columns: visibleColumn, data: afterFullData, $table: $xeTable, $grid: $xeGrid }) : []
        }
        reactData.footerTableData = footData
        $xeTable.handleUpdateFooterMerge()
        return nextTick()
      },
      /**
       * 更新列状态 updateStatus({ row, column }, cellValue)
       * 如果组件值 v-model 发生 change 时，调用改函数用于更新某一列编辑状态
       * 如果单元格配置了校验规则，则会进行校验
       */
      updateStatus (slotParams, cellValue) {
        return nextTick().then(() => {
          const { editRules } = props
          if (slotParams && editRules) {
            return $xeTable.handleCellRuleUpdateStatus('change', slotParams, cellValue)
          }
        })
      },
      /**
       * 设置合并单元格 [{ row: Row|number, column: ColumnInfo|number, rowspan: number, colspan: number }]
       */
      setMergeCells (merges) {
        if (props.spanMethod) {
          errLog('vxe.error.errConflicts', ['merge-cells', 'span-method'])
        }
        handleBodyMerge(merges)
        $xeTable.handleUpdateBodyMerge()
        return nextTick().then(() => {
          const { expandColumn } = reactData
          const { mergeBodyList } = internalData
          if (expandColumn && mergeBodyList.length) {
            warnLog('vxe.error.errConflicts', ['type=expand', 'merge-cells | span-method'])
          }
          $xeTable.updateCellAreas()
          return updateStyle()
        })
      },
      /**
       * 移除单元格合并 [{row:Row|number, col:ColumnInfo|number}]
       */
      removeMergeCells (merges) {
        if (props.spanMethod) {
          errLog('vxe.error.errConflicts', ['merge-cells', 'span-method'])
        }
        const rest = removeBodyMerges(merges)
        $xeTable.handleUpdateBodyMerge()
        return nextTick().then(() => {
          $xeTable.updateCellAreas()
          updateStyle()
          return rest
        })
      },
      /**
       * 获取所有被合并的单元格
       */
      getMergeCells () {
        return internalData.mergeBodyList.slice(0)
      },
      /**
       * 清除所有单元格合并
       */
      clearMergeCells () {
        internalData.mergeBodyList = []
        internalData.mergeBodyMaps = {}
        internalData.mergeBodyCellMaps = {}
        reactData.mergeBodyFlag++
        return nextTick().then(() => {
          return updateStyle()
        })
      },
      setMergeFooterItems (merges) {
        if (props.footerSpanMethod) {
          errLog('vxe.error.errConflicts', ['merge-footer-items', 'footer-span-method'])
        }
        handleFooterMerge(merges)
        $xeTable.handleUpdateFooterMerge()
        return nextTick().then(() => {
          $xeTable.updateCellAreas()
          return updateStyle()
        })
      },
      removeMergeFooterItems (merges) {
        if (props.footerSpanMethod) {
          errLog('vxe.error.errConflicts', ['merge-footer-items', 'footer-span-method'])
        }
        const rest = removeFooterMerges(merges)
        $xeTable.handleUpdateFooterMerge()
        return nextTick().then(() => {
          $xeTable.updateCellAreas()
          updateStyle()
          return rest
        })
      },
      /**
       * 获取所有被合并的表尾
       */
      getMergeFooterItems () {
        return internalData.mergeFooterList.slice(0)
      },
      /**
       * 清除所有表尾合并
       */
      clearMergeFooterItems () {
        internalData.mergeFooterList = []
        internalData.mergeFooterMaps = {}
        internalData.mergeFooterCellMaps = {}
        reactData.mergeFootFlag++
        return nextTick().then(() => {
          return updateStyle()
        })
      },
      updateCellAreas () {
        const { mouseConfig } = props
        const mouseOpts = computeMouseOpts.value
        if (mouseConfig && mouseOpts.area && $xeTable.handleRecalculateCellAreaEvent) {
          return $xeTable.handleRecalculateCellAreaEvent()
        }
        return nextTick()
      },
      getCustomStoreData () {
        const { id } = props
        const customOpts = computeCustomOpts.value
        const { collectColumn } = internalData
        const { storage, checkMethod, storeOptions } = customOpts
        const isAllCustom = storage === true
        const storageOpts: VxeTableDefines.VxeTableCustomStorageObj = isAllCustom ? {} : Object.assign({}, storage || {}, storeOptions)
        const isCustomResizable = hangleStorageDefaultValue(storageOpts.resizable, isAllCustom)
        const isCustomVisible = hangleStorageDefaultValue(storageOpts.visible, isAllCustom)
        const isCustomFixed = hangleStorageDefaultValue(storageOpts.fixed, isAllCustom)
        const isCustomSort = hangleStorageDefaultValue(storageOpts.sort, isAllCustom)
        const isCustomAggFunc = hangleStorageDefaultValue(storageOpts.aggFunc, isAllCustom)
        const resizableData: Record<string, number> = {}
        const sortData: Record<string, number> = {}
        const visibleData: Record<string, boolean> = {}
        const fixedData: Record<string, VxeColumnPropTypes.Fixed> = {}
        const aggFuncData: Record<string, VxeColumnPropTypes.AggFunc> = {}
        const storeData: VxeTableDefines.CustomStoreData = {
          resizableData: undefined,
          sortData: undefined,
          visibleData: undefined,
          fixedData: undefined,
          aggFuncData: undefined
        }
        if (!id) {
          if (storage) {
            errLog('vxe.error.reqProp', ['id'])
          }
          return storeData
        }
        let hasResizable = 0
        let hasSort = 0
        let hasFixed = 0
        let hasVisible = 0
        let hasAggFunc = 0
        XEUtils.eachTree(collectColumn, (column, index, items, path, parentColumn) => {
          const colKey = column.getKey()
          if (!colKey) {
            errLog('vxe.error.reqProp', [`${column.getTitle() || column.type || ''} -> column.field=?`])
            return
          }
          // 只支持一级
          if (!parentColumn) {
            if (isCustomSort) {
              hasSort = 1
              sortData[colKey] = column.renderSortNumber
            }
            if (isCustomFixed && column.fixed !== column.defaultFixed) {
              hasFixed = 1
              fixedData[colKey] = column.fixed
            }
          }
          if (isCustomResizable && column.resizeWidth) {
            hasResizable = 1
            resizableData[colKey] = column.renderWidth
          }
          if (isCustomVisible && (!checkMethod || checkMethod({ $table: $xeTable, column }))) {
            if (!column.visible && column.defaultVisible) {
              hasVisible = 1
              visibleData[colKey] = false
            } else if (column.visible && !column.defaultVisible) {
              hasVisible = 1
              visibleData[colKey] = true
            }
          }
          if (isCustomAggFunc && column.aggFunc !== column.defaultAggFunc) {
            hasAggFunc = 1
            aggFuncData[colKey] = column.aggFunc
          }
        })
        if (hasResizable) {
          storeData.resizableData = resizableData
        }
        if (hasSort) {
          storeData.sortData = sortData
        }
        if (hasFixed) {
          storeData.fixedData = fixedData
        }
        if (hasVisible) {
          storeData.visibleData = visibleData
        }
        if (hasAggFunc) {
          storeData.aggFuncData = aggFuncData
        }
        return storeData
      },
      focus () {
        internalData.isActivated = true
        return nextTick()
      },
      blur () {
        internalData.isActivated = false
        return nextTick()
      },
      /**
       * 连接工具栏
       * @param $toolbar
       */
      connect ($toolbar) {
        if ($toolbar) {
          $xeToolbar = $toolbar
          $xeToolbar.syncUpdate({ collectColumn: internalData.collectColumn, $table: $xeTable })
        } else {
          errLog('vxe.error.barUnableLink')
        }
        return nextTick()
      }
    }

    /**
     * 全局按下事件处理
     */
    const handleGlobalMousedownEvent = (evnt: MouseEvent) => {
      const { editStore, ctxMenuStore, filterStore, customStore } = reactData
      const { mouseConfig, editRules } = props
      const el = refElem.value
      const editOpts = computeEditOpts.value
      const validOpts = computeValidOpts.value
      const areaOpts = computeAreaOpts.value
      const { actived } = editStore
      const $validTooltip = refValidTooltip.value
      const tableFilter = refTableFilter.value
      const tableCustom = refTableCustom.value
      const tableMenu = refTableMenu.value
      // 筛选
      if (tableFilter) {
        if (getEventTargetNode(evnt, el, 'vxe-cell--filter').flag) {
          // 如果点击了筛选按钮
        } else if (getEventTargetNode(evnt, tableFilter.getRefMaps().refElem.value).flag) {
          // 如果点击筛选容器
        } else {
          if (!getEventTargetNode(evnt, document.body, 'vxe-table--ignore-clear').flag) {
            tablePrivateMethods.preventEvent(evnt, 'event.clearFilter', filterStore.args, tableMethods.closeFilter)
          }
        }
      }
      // 自定义列
      if (tableCustom) {
        if (customStore.btnEl === evnt.target || getEventTargetNode(evnt, document.body, 'vxe-toolbar-custom-target').flag) {
          // 如果点击了自定义列按钮
        } else if (getEventTargetNode(evnt, tableCustom.getRefMaps().refElem.value).flag) {
          // 如果点击自定义列容器
        } else {
          if (!getEventTargetNode(evnt, document.body, 'vxe-table--ignore-clear').flag) {
            tablePrivateMethods.preventEvent(evnt, 'event.clearCustom', {}, () => {
              if ($xeTable.closeCustom) {
                $xeTable.closeCustom()
              }
            })
          }
        }
      }

      // 如果已激活了编辑状态
      if (actived.row) {
        if (!(editOpts.autoClear === false)) {
          // 如果是激活状态，点击了单元格之外
          const cell = actived.args.cell
          if ((!cell || !getEventTargetNode(evnt, cell).flag)) {
            if ($validTooltip && getEventTargetNode(evnt, $validTooltip.$el as HTMLDivElement).flag) {
              // 如果是激活状态，且点击了校验提示框
            } else if (!internalData._lastCallTime || internalData._lastCallTime + 50 < Date.now()) {
              // 如果是激活状态，点击了单元格之外
              if (!getEventTargetNode(evnt, document.body, 'vxe-table--ignore-clear').flag) {
                // 如果手动调用了激活单元格，避免触发源被移除后导致重复关闭
                tablePrivateMethods.preventEvent(evnt, 'event.clearEdit', actived.args, () => {
                  let isClear
                  if (editOpts.mode === 'row') {
                    const rowTargetNode = getEventTargetNode(evnt, el, 'vxe-body--row')
                    const rowNodeRest = rowTargetNode.flag ? tableMethods.getRowNode(rowTargetNode.targetElem) : null
                    // row 方式，如果点击了不同行
                    isClear = rowNodeRest ? !$xeTable.eqRow(rowNodeRest.item, actived.args.row) : false
                  } else {
                    // cell 方式，如果是非编辑列
                    isClear = !getEventTargetNode(evnt, el, 'col--edit').flag
                  }
                  // 如果点击表头行，则清除激活状态
                  if (!isClear) {
                    isClear = getEventTargetNode(evnt, el, 'vxe-header--row').flag
                  }
                  // 如果点击表尾行，则清除激活状态
                  if (!isClear) {
                    isClear = getEventTargetNode(evnt, el, 'vxe-footer--row').flag
                  }
                  // 如果固定了高度且点击了行之外的空白处，则清除激活状态
                  if (!isClear && props.height && !reactData.overflowY) {
                    const bodyWrapperElem = evnt.target as HTMLDivElement
                    if (hasClass(bodyWrapperElem, 'vxe-table--body-wrapper')) {
                      isClear = evnt.offsetY < bodyWrapperElem.clientHeight
                    }
                  }
                  if (
                    isClear ||
                      // 如果点击了当前表格之外
                      !getEventTargetNode(evnt, el).flag
                  ) {
                    setTimeout(() => {
                      $xeTable.handleClearEdit(evnt).then(() => {
                        // 如果存在校验，点击了表格之外则清除
                        if (!internalData.isActivated && editRules && validOpts.autoClear) {
                          reactData.validErrorMaps = {}
                        }
                      })
                    })
                  }
                })
              }
            }
          }
        }
      } else if (mouseConfig) {
        if (!getEventTargetNode(evnt, el).flag && !($xeGrid && getEventTargetNode(evnt, $xeGrid.getRefMaps().refElem.value).flag) && !(tableMenu && getEventTargetNode(evnt, tableMenu.getRefMaps().refElem.value).flag) && !($xeToolbar && getEventTargetNode(evnt, $xeToolbar.getRefMaps().refElem.value).flag)) {
          if ($xeTable.clearSelected) {
            $xeTable.clearSelected()
          }
          if (areaOpts.autoClear) {
            if ($xeTable.getCellAreas) {
              const cellAreas = $xeTable.getCellAreas()
              if (cellAreas && cellAreas.length && !getEventTargetNode(evnt, document.body, 'vxe-table--ignore-areas-clear').flag) {
                tablePrivateMethods.preventEvent(evnt, 'event.clearAreas', {}, () => {
                  $xeTable.clearCellAreas()
                  $xeTable.clearCopyCellArea()
                  dispatchEvent('clear-cell-area-selection', { cellAreas }, evnt)
                })
              }
            }
          }
        }
      }
      // 如果配置了快捷菜单且，点击了其他地方则关闭
      if ($xeTable.closeMenu) {
        if (ctxMenuStore.visible && tableMenu && !getEventTargetNode(evnt, tableMenu.getRefMaps().refElem.value).flag) {
          $xeTable.closeMenu()
        }
      }
      const isActivated = getEventTargetNode(evnt, $xeGrid ? $xeGrid.getRefMaps().refElem.value : el).flag
      // 如果存在校验，点击了表格之外则清除
      if (!isActivated && editRules && validOpts.autoClear) {
        reactData.validErrorMaps = {}
      }
      // 最后激活的表格
      internalData.isActivated = isActivated
    }

    /**
     * 窗口失焦事件处理
     */
    const handleGlobalBlurEvent = () => {
      tableMethods.closeFilter()
      if ($xeTable.closeMenu) {
        $xeTable.closeMenu()
      }
    }

    /**
     * 全局滚动事件
     */
    const handleGlobalMousewheelEvent = () => {
      tableMethods.closeTooltip()
      if ($xeTable.closeMenu) {
        $xeTable.closeMenu()
      }
    }

    /**
     * 表格键盘事件
     */
    const keydownEvent = (evnt: KeyboardEvent) => {
      const { mouseConfig, keyboardConfig } = props
      const { filterStore, ctxMenuStore, editStore } = reactData
      const mouseOpts = computeMouseOpts.value
      const keyboardOpts = computeKeyboardOpts.value
      const { actived } = editStore
      const isEsc = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ESCAPE)
      if (isEsc) {
        tablePrivateMethods.preventEvent(evnt, 'event.keydown', null, () => {
          dispatchEvent('keydown-start', {}, evnt)
          if (keyboardConfig && mouseConfig && mouseOpts.area && $xeTable.handleKeyboardCellAreaEvent) {
            $xeTable.handleKeyboardCellAreaEvent(evnt)
          } else if (actived.row || filterStore.visible || ctxMenuStore.visible) {
            evnt.stopPropagation()
            // 如果按下了 Esc 键，关闭快捷菜单、筛选
            if ($xeTable.closeMenu) {
              $xeTable.closeMenu()
            }
            tableMethods.closeFilter()
            if (keyboardConfig && keyboardOpts.isEsc) {
              // 如果是激活编辑状态，则取消编辑
              if (actived.row) {
                const params = actived.args
                $xeTable.handleClearEdit(evnt)
                // 如果配置了选中功能，则为选中状态
                if (mouseOpts.selected) {
                  nextTick(() => $xeTable.handleSelected(params, evnt))
                }
              }
            }
          }
          dispatchEvent('keydown', {}, evnt)
          dispatchEvent('keydown-end', {}, evnt)
        })
      }
    }

    /**
     * 全局键盘事件
     */
    const handleGlobalKeydownEvent = (evnt: KeyboardEvent) => {
      // 该行为只对当前激活的表格有效
      if (internalData.isActivated) {
        $xeTable.preventEvent(evnt, 'event.keydown', null, () => {
          const { mouseConfig, keyboardConfig, treeConfig, editConfig, highlightCurrentRow, highlightCurrentColumn } = props
          const { ctxMenuStore, editStore, currentRow } = reactData
          const { afterFullData } = internalData
          const isMenu = computeIsMenu.value
          const bodyMenu = computeBodyMenu.value
          const keyboardOpts = computeKeyboardOpts.value
          const mouseOpts = computeMouseOpts.value
          const editOpts = computeEditOpts.value
          const treeOpts = computeTreeOpts.value
          const menuList = computeMenuList.value
          const rowOpts = computeRowOpts.value
          const columnOpts = computeColumnOpts.value
          const { selected, actived } = editStore
          const childrenField = treeOpts.children || treeOpts.childrenField
          const keyCode = evnt.keyCode
          const isEsc = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ESCAPE)
          const hasBackspaceKey = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.BACKSPACE)
          const isTab = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.TAB)
          const isEnter = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ENTER)
          const isSpacebar = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.SPACEBAR)
          const isLeftArrow = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_LEFT)
          const isUpArrow = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_UP)
          const isRightArrow = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_RIGHT)
          const isDwArrow = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_DOWN)
          const hasDeleteKey = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.DELETE)
          const isF2 = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.F2)
          const isContextMenu = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.CONTEXT_MENU)
          const isControlKey = hasControlKey(evnt)
          const hasShiftKey = evnt.shiftKey
          const isAltKey = evnt.altKey
          const operArrow = isLeftArrow || isUpArrow || isRightArrow || isDwArrow
          const operCtxMenu = isMenu && ctxMenuStore.visible && (isEnter || isSpacebar || operArrow)
          const isEditStatus = isEnableConf(editConfig) && actived.column && actived.row
          const beforeEditMethod = editOpts.beforeEditMethod || editOpts.activeMethod
          if (operCtxMenu) {
            // 如果配置了右键菜单; 支持方向键操作、回车
            evnt.preventDefault()
            if (ctxMenuStore.showChild && hasChildrenList(ctxMenuStore.selected)) {
              $xeTable.moveCtxMenu(evnt, ctxMenuStore, 'selectChild', isLeftArrow, false, ctxMenuStore.selected.children)
            } else {
              $xeTable.moveCtxMenu(evnt, ctxMenuStore, 'selected', isRightArrow, true, menuList)
            }
          } else if (keyboardConfig && mouseConfig && mouseOpts.area && $xeTable.handleKeyboardCellAreaEvent) {
            $xeTable.handleKeyboardCellAreaEvent(evnt)
          } else if (isEsc) {
            // 如果按下了 Esc 键，关闭快捷菜单、筛选
            if ($xeTable.closeMenu) {
              $xeTable.closeMenu()
            }
            $xeTable.closeFilter()
            if (keyboardConfig && keyboardOpts.isEsc) {
              // 如果是激活编辑状态，则取消编辑
              if (actived.row) {
                const params = actived.args
                $xeTable.handleClearEdit(evnt)
                // 如果配置了选中功能，则为选中状态
                if (mouseOpts.selected) {
                  nextTick(() => $xeTable.handleSelected(params, evnt))
                }
              }
            }
          } else if (isSpacebar && keyboardConfig && keyboardOpts.isChecked && selected.row && selected.column && (selected.column.type === 'checkbox' || selected.column.type === 'radio')) {
            // 空格键支持选中复选框
            evnt.preventDefault()
            if (selected.column.type === 'checkbox') {
              tablePrivateMethods.handleToggleCheckRowEvent(evnt, selected.args)
            } else {
              tablePrivateMethods.triggerRadioRowEvent(evnt, selected.args)
            }
          } else if (isF2 && isEnableConf(editConfig)) {
            if (!isEditStatus) {
              // 如果按下了 F2 键
              if (selected.row && selected.column) {
                evnt.preventDefault()
                $xeTable.handleEdit(selected.args, evnt)
              }
            }
          } else if (isContextMenu) {
            // 如果按下上下文键
            internalData._keyCtx = selected.row && selected.column && bodyMenu.length
            clearTimeout(internalData.keyCtxTimeout)
            internalData.keyCtxTimeout = setTimeout(() => {
              internalData._keyCtx = false
            }, 1000)
          } else if (isEnter && !isAltKey && keyboardConfig && keyboardOpts.isEnter && (selected.row || actived.row || (treeConfig && (rowOpts.isCurrent || highlightCurrentRow) && currentRow))) {
            const { isLastEnterAppendRow, beforeEnterMethod, enterMethod } = keyboardOpts
            // 退出选中
            if (isControlKey) {
              // 如果是激活编辑状态，则取消编辑
              if (actived.row) {
                const params = actived.args
                $xeTable.handleClearEdit(evnt)
                // 如果配置了选中功能，则为选中状态
                if (mouseOpts.selected) {
                  nextTick(() => {
                    $xeTable.handleSelected(params, evnt)
                  })
                }
              }
            } else {
              // 如果是激活状态，退则出到上一行/下一行
              if (selected.row || actived.row) {
                const activeParams = selected.row ? selected.args : actived.args
                if (hasShiftKey) {
                  if (keyboardOpts.enterToTab) {
                    $xeTable.moveTabSelected(activeParams, hasShiftKey, evnt)
                  } else {
                    $xeTable.moveEnterSelected(activeParams, isLeftArrow, true, isRightArrow, false, evnt)
                  }
                } else {
                  if (keyboardOpts.enterToTab) {
                    $xeTable.moveTabSelected(activeParams, hasShiftKey, evnt)
                  } else {
                    const activeRow = selected.row || actived.row
                    const activeColumn = selected.column || actived.column
                    const _rowIndex = $xeTable.getVTRowIndex(activeRow)
                    const etrParams = {
                      row: activeRow,
                      rowIndex: $xeTable.getRowIndex(activeRow),
                      $rowIndex: $xeTable.getVMRowIndex(activeRow),
                      _rowIndex,
                      column: activeColumn,
                      columnIndex: $xeTable.getColumnIndex(activeColumn),
                      $columnIndex: $xeTable.getVMColumnIndex(activeColumn),
                      _columnIndex: $xeTable.getVTColumnIndex(activeColumn),
                      $table: $xeTable
                    }
                    if (!beforeEnterMethod || beforeEnterMethod(etrParams) !== false) {
                      // 最后一行按下回车键，自动追加一行
                      if (isLastEnterAppendRow) {
                        if (_rowIndex >= afterFullData.length - 1) {
                          $xeTable.insertAt({}, -1).then(({ row: newRow }) => {
                            $xeTable.scrollToRow(newRow, activeColumn)
                            $xeTable.handleSelected({ ...activeParams, row: newRow }, evnt)
                          })
                          $xeTable.dispatchEvent('enter-append-row', etrParams, evnt)
                          return
                        }
                      }
                      $xeTable.moveEnterSelected(activeParams, isLeftArrow, false, isRightArrow, true, evnt)
                      if (enterMethod) {
                        enterMethod(etrParams)
                      }
                    }
                  }
                }
              } else if (treeConfig && (rowOpts.isCurrent || highlightCurrentRow) && currentRow) {
                // 如果是树形表格当前行回车移动到子节点
                const childrens = currentRow[childrenField]
                if (childrens && childrens.length) {
                  evnt.preventDefault()
                  const targetRow = childrens[0]
                  const params = {
                    $table: $xeTable,
                    row: targetRow,
                    rowIndex: $xeTable.getRowIndex(targetRow),
                    $rowIndex: $xeTable.getVMRowIndex(targetRow)
                  }
                  $xeTable.setTreeExpand(currentRow, true)
                    .then(() => $xeTable.scrollToRow(targetRow))
                    .then(() => $xeTable.triggerCurrentRowEvent(evnt, params))
                }
              }
            }
          } else if (operArrow && keyboardConfig && keyboardOpts.isArrow) {
            if (!isEditStatus) {
              // 如果按下了方向键
              if (mouseOpts.selected && selected.row && selected.column) {
                $xeTable.moveArrowSelected(selected.args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow, evnt)
              } else {
                // 当前行按键上下移动
                if ((isUpArrow || isDwArrow) && (rowOpts.isCurrent || highlightCurrentRow)) {
                  $xeTable.moveCurrentRow(isUpArrow, isDwArrow, evnt)
                }
                // 当前行按键左右移动
                if ((isLeftArrow || isRightArrow) && (columnOpts.isCurrent || highlightCurrentColumn)) {
                  $xeTable.moveCurrentColumn(isLeftArrow, isRightArrow, evnt)
                }
              }
            }
          } else if (isTab && keyboardConfig && keyboardOpts.isTab) {
            // 如果按下了 Tab 键切换
            if (selected.row || selected.column) {
              $xeTable.moveTabSelected(selected.args, hasShiftKey, evnt)
            } else if (actived.row || actived.column) {
              $xeTable.moveTabSelected(actived.args, hasShiftKey, evnt)
            }
          } else if (keyboardConfig && keyboardOpts.isDel && hasDeleteKey && isEnableConf(editConfig) && (selected.row || selected.column)) {
            // 如果是删除键
            if (!isEditStatus) {
              const { delMethod } = keyboardOpts
              const params = {
                row: selected.row,
                rowIndex: tableMethods.getRowIndex(selected.row),
                column: selected.column,
                columnIndex: tableMethods.getColumnIndex(selected.column),
                $table: $xeTable,
                $grid: $xeGrid
              }
              // 是否被禁用
              if (!beforeEditMethod || beforeEditMethod(params)) {
                if (delMethod) {
                  delMethod(params)
                } else {
                  setCellValue(selected.row, selected.column, null)
                }
                // 如果按下 del 键，更新表尾数据
                tableMethods.updateFooter()
                dispatchEvent('cell-delete-value', params, evnt)
              }
            }
          } else if (hasBackspaceKey && keyboardConfig && keyboardOpts.isBack && isEnableConf(editConfig) && (selected.row || selected.column)) {
            if (!isEditStatus) {
              const { backMethod } = keyboardOpts
              // 如果是删除键
              if (keyboardOpts.isDel && isEnableConf(editConfig) && (selected.row || selected.column)) {
                const params = {
                  row: selected.row,
                  rowIndex: $xeTable.getRowIndex(selected.row),
                  column: selected.column,
                  columnIndex: $xeTable.getColumnIndex(selected.column),
                  $table: $xeTable,
                  $grid: $xeGrid
                }
                // 是否被禁用
                if (!beforeEditMethod || beforeEditMethod(params)) {
                  if (backMethod) {
                    backMethod(params)
                  } else {
                    setCellValue(selected.row, selected.column, null)
                    $xeTable.handleEdit(selected.args, evnt)
                  }
                  dispatchEvent('cell-backspace-value', params, evnt)
                }
              }
            }
          } else if (hasBackspaceKey && keyboardConfig && treeConfig && keyboardOpts.isBack && (rowOpts.isCurrent || highlightCurrentRow) && currentRow) {
            // 如果树形表格回退键关闭当前行返回父节点
            const { parent: parentRow } = XEUtils.findTree(internalData.afterTreeFullData, item => item === currentRow, { children: childrenField })
            if (parentRow) {
              evnt.preventDefault()
              const params = {
                row: parentRow,
                rowIndex: $xeTable.getRowIndex(parentRow),
                $rowIndex: $xeTable.getVMRowIndex(parentRow),
                $table: $xeTable,
                $grid: $xeGrid
              }
              $xeTable.setTreeExpand(parentRow, false)
                .then(() => $xeTable.scrollToRow(parentRow))
                .then(() => $xeTable.triggerCurrentRowEvent(evnt, params))
            }
          } else if (keyboardConfig && isEnableConf(editConfig) && keyboardOpts.isEdit && !isControlKey && (isSpacebar || (keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 96 && keyCode <= 111) || (keyCode >= 186 && keyCode <= 192) || (keyCode >= 219 && keyCode <= 222))) {
            const { editMode, editMethod } = keyboardOpts
            // 启用编辑后，空格键功能将失效
            // if (isSpacebar) {
            //   evnt.preventDefault()
            // }
            // 如果是按下非功能键之外允许直接编辑
            if (selected.column && selected.row && isEnableConf(selected.column.editRender)) {
              const beforeEditMethod = editOpts.beforeEditMethod || editOpts.activeMethod
              const params = {
                row: selected.row,
                rowIndex: $xeTable.getRowIndex(selected.row),
                column: selected.column,
                columnIndex: $xeTable.getColumnIndex(selected.column),
                $table: $xeTable,
                $grid: $xeGrid
              }
              if (!beforeEditMethod || beforeEditMethod({ ...selected.args, $table: $xeTable, $grid: $xeGrid })) {
                if (editMethod) {
                  editMethod(params)
                } else {
                  // 追加方式与覆盖式
                  if (editMode !== 'insert') {
                    setCellValue(selected.row, selected.column, null)
                  }
                  $xeTable.handleEdit(selected.args, evnt)
                }
              }
            }
          }
          dispatchEvent('keydown', {}, evnt)
        })
      }
    }

    const handleGlobalPasteEvent = (evnt: ClipboardEvent) => {
      const { keyboardConfig, mouseConfig } = props
      const { editStore, filterStore } = reactData
      const { isActivated } = internalData
      const mouseOpts = computeMouseOpts.value
      const keyboardOpts = computeKeyboardOpts.value
      const { actived } = editStore
      if (isActivated && !filterStore.visible) {
        if (!(actived.row || actived.column)) {
          if (keyboardConfig && keyboardOpts.isClip && mouseConfig && mouseOpts.area && $xeTable.handlePasteCellAreaEvent) {
            $xeTable.handlePasteCellAreaEvent(evnt)
          }
        }
        dispatchEvent('paste', {}, evnt)
      }
    }

    const handleGlobalCopyEvent = (evnt: ClipboardEvent) => {
      const { keyboardConfig, mouseConfig } = props
      const { editStore, filterStore } = reactData
      const { isActivated } = internalData
      const mouseOpts = computeMouseOpts.value
      const keyboardOpts = computeKeyboardOpts.value
      const { actived } = editStore
      if (isActivated && !filterStore.visible) {
        if (!(actived.row || actived.column)) {
          if (keyboardConfig && keyboardOpts.isClip && mouseConfig && mouseOpts.area && $xeTable.handleCopyCellAreaEvent) {
            $xeTable.handleCopyCellAreaEvent(evnt)
          }
        }
        dispatchEvent('copy', {}, evnt)
      }
    }

    const handleGlobalCutEvent = (evnt: ClipboardEvent) => {
      const { keyboardConfig, mouseConfig } = props
      const { editStore, filterStore } = reactData
      const { isActivated } = internalData
      const mouseOpts = computeMouseOpts.value
      const keyboardOpts = computeKeyboardOpts.value
      const { actived } = editStore
      if (isActivated && !filterStore.visible) {
        if (!(actived.row || actived.column)) {
          if (keyboardConfig && keyboardOpts.isClip && mouseConfig && mouseOpts.area && $xeTable.handleCutCellAreaEvent) {
            $xeTable.handleCutCellAreaEvent(evnt)
          }
        }
        dispatchEvent('cut', {}, evnt)
      }
    }

    const handleGlobalResizeEvent = () => {
      if ($xeTable.closeMenu) {
        $xeTable.closeMenu()
      }
      const el = refElem.value
      if (!el || !el.clientWidth) {
        return
      }
      handleLazyRecalculate(true, true, true)
      $xeTable.updateCellAreas()
    }

    const handleTargetEnterEvent = (isClear: boolean) => {
      const $tooltip = refTooltip.value
      clearTimeout(internalData.tooltipTimeout)
      if (isClear) {
        tableMethods.closeTooltip()
      } else {
        if ($tooltip && $tooltip.setActived) {
          $tooltip.setActived(true)
        }
      }
    }

    const clearDragStatus = () => {
      const { dragRow, dragCol } = reactData
      if (dragRow || dragCol) {
        clearColDropOrigin()
        clearRowDropOrigin()
        hideDropTip()
        reactData.dragRow = null
        reactData.dragCol = null
      }
    }

    const clearRowDropOrigin = () => {
      const el = refElem.value
      if (el) {
        const clss = 'row--drag-origin'
        XEUtils.arrayEach(el.querySelectorAll(`.${clss}`), (elem) => {
          (elem as HTMLTableCellElement).draggable = false
          removeClass(elem, clss)
        })
      }
    }

    const updateRowDropOrigin = (row: any) => {
      const el = refElem.value
      if (el) {
        const clss = 'row--drag-origin'
        const rowid = getRowid($xeTable, row)
        XEUtils.arrayEach(el.querySelectorAll(`[rowid="${rowid}"]`), (elem) => {
          addClass(elem, clss)
        })
      }
    }

    const updateRowDropTipContent = (tdEl: HTMLElement) => {
      const { dragConfig } = props
      const { dragRow } = reactData
      const rowDragOpts = computeRowDragOpts.value
      const { tooltipMethod } = rowDragOpts
      const rTooltipMethod = tooltipMethod || (dragConfig ? dragConfig.rowTooltipMethod : null)
      let tipContent = ''
      if (rTooltipMethod) {
        const rtParams = {
          $table: $xeTable,
          row: dragRow
        }
        tipContent = `${rTooltipMethod(rtParams) || ''}`
      } else {
        tipContent = getI18n('vxe.table.dragTip', [tdEl.textContent || ''])
      }
      reactData.dragTipText = tipContent
    }

    const updateColDropOrigin = (column: VxeTableDefines.ColumnInfo) => {
      const el = refElem.value
      if (el) {
        const colQuerys: string[] = []
        XEUtils.eachTree([column], item => {
          colQuerys.push(`[colid="${item.id}"]`)
        })
        const clss = 'col--drag-origin'
        XEUtils.arrayEach(el.querySelectorAll(colQuerys.join(',')), (elem) => {
          addClass(elem, clss)
        })
      }
    }

    const clearColDropOrigin = () => {
      const el = refElem.value
      if (el) {
        const clss = 'col--drag-origin'
        XEUtils.arrayEach(el.querySelectorAll(`.${clss}`), (elem) => {
          (elem as HTMLTableCellElement).draggable = false
          removeClass(elem, clss)
        })
      }
    }

    const updateColDropTipContent = (tdEl: HTMLElement) => {
      const { dragCol } = reactData
      const columnDragOpts = computeColumnDragOpts.value
      const { tooltipMethod } = columnDragOpts
      let tipContent = ''
      if (tooltipMethod) {
        const dtParams = {
          $table: $xeTable,
          column: dragCol as VxeTableDefines.ColumnInfo
        }
        tipContent = `${tooltipMethod(dtParams) || ''}`
      } else {
        tipContent = getI18n('vxe.table.dragTip', [tdEl.textContent || ''])
      }
      reactData.dragTipText = tipContent
    }

    const showDropTip = (evnt: DragEvent | MouseEvent, trEl: HTMLElement | null, thEl: HTMLElement | null, showLine: boolean, dragPos: string) => {
      const el = refElem.value
      if (!el) {
        return
      }
      const { overflowX, scrollbarWidth, overflowY, scrollbarHeight } = reactData
      const { prevDragToChild } = internalData
      const wrapperRect = el.getBoundingClientRect()
      const osbWidth = overflowY ? scrollbarWidth : 0
      const osbHeight = overflowX ? scrollbarHeight : 0
      const tableWrapperWidth = el.clientWidth
      const tableWrapperHeight = el.clientHeight
      if (trEl) {
        const rdLineEl = refDragRowLineElem.value
        if (rdLineEl) {
          if (showLine) {
            const scrollbarYToLeft = computeScrollbarYToLeft.value
            const trRect = trEl.getBoundingClientRect()
            let trHeight = trEl.clientHeight
            const offsetTop = Math.max(1, trRect.y - wrapperRect.y)
            if (offsetTop + trHeight > tableWrapperHeight - osbHeight) {
              trHeight = tableWrapperHeight - offsetTop - osbHeight
            }
            rdLineEl.style.display = 'block'
            rdLineEl.style.left = `${scrollbarYToLeft ? osbWidth : 0}px`
            rdLineEl.style.top = `${offsetTop}px`
            rdLineEl.style.height = `${trHeight}px`
            rdLineEl.style.width = `${tableWrapperWidth - osbWidth}px`
            rdLineEl.setAttribute('drag-pos', dragPos)
            rdLineEl.setAttribute('drag-to-child', prevDragToChild ? 'y' : 'n')
          } else {
            rdLineEl.style.display = ''
          }
        }
      } else if (thEl) {
        const cdLineEl = refDragColLineElem.value
        if (cdLineEl) {
          if (showLine) {
            const scrollbarXToTop = computeScrollbarXToTop.value
            const leftContainerElem = refLeftContainer.value
            const leftContainerWidth = leftContainerElem ? leftContainerElem.clientWidth : 0
            const rightContainerElem = refRightContainer.value
            const rightContainerWidth = rightContainerElem ? rightContainerElem.clientWidth : 0
            const thRect = thEl.getBoundingClientRect()
            let thWidth = thEl.clientWidth
            const offsetTop = Math.max(0, thRect.y - wrapperRect.y)
            const startX = leftContainerWidth
            let offsetLeft = thRect.x - wrapperRect.x
            if (offsetLeft < startX) {
              thWidth -= startX - offsetLeft
              offsetLeft = startX
            }
            const endX = tableWrapperWidth - rightContainerWidth - (rightContainerWidth ? 0 : osbWidth)
            if (offsetLeft + thWidth > endX) {
              thWidth = endX - offsetLeft
            }
            cdLineEl.style.display = 'block'
            cdLineEl.style.top = `${offsetTop}px`
            cdLineEl.style.left = `${offsetLeft}px`
            cdLineEl.style.width = `${thWidth}px`
            if (prevDragToChild) {
              cdLineEl.style.height = `${thRect.height}px`
            } else {
              cdLineEl.style.height = `${tableWrapperHeight - offsetTop - (scrollbarXToTop ? 0 : osbHeight)}px`
            }
            cdLineEl.setAttribute('drag-pos', dragPos)
            cdLineEl.setAttribute('drag-to-child', prevDragToChild ? 'y' : 'n')
          } else {
            cdLineEl.style.display = ''
          }
        }
      }
      const rdTipEl = refDragTipElem.value
      if (rdTipEl) {
        rdTipEl.style.display = 'block'
        rdTipEl.style.top = `${Math.min(el.clientHeight - el.scrollTop - rdTipEl.clientHeight, evnt.clientY - wrapperRect.y)}px`
        rdTipEl.style.left = `${Math.min(el.clientWidth - el.scrollLeft - rdTipEl.clientWidth - 16, evnt.clientX - wrapperRect.x)}px`
        rdTipEl.setAttribute('drag-status', showLine ? (prevDragToChild ? 'sub' : 'normal') : 'disabled')
      }
    }

    const hideDropTip = () => {
      const rdTipEl = refDragTipElem.value
      const rdLineEl = refDragRowLineElem.value
      const cdLineEl = refDragColLineElem.value
      if (rdTipEl) {
        rdTipEl.style.display = ''
      }
      if (rdLineEl) {
        rdLineEl.style.display = ''
      }
      if (cdLineEl) {
        cdLineEl.style.display = ''
      }
    }

    /**
     * 处理显示 tooltip
     * @param {Event} evnt 事件
     * @param {Row} row 行对象
     */
    const handleTooltip = (evnt: MouseEvent, tdEl: HTMLTableCellElement, overflowElem: HTMLElement | null, tipElem: HTMLElement | null, params: any) => {
      const tipOverEl = overflowElem || tdEl
      if (!tipOverEl) {
        return nextTick()
      }
      params.cell = tdEl
      const { tooltipStore } = reactData
      const tooltipOpts = computeTooltipOpts.value
      const { column, row } = params
      const { showAll, contentMethod } = tooltipOpts
      const customContent = contentMethod ? contentMethod(params) : null
      const useCustom = contentMethod && !XEUtils.eqNull(customContent)
      const content = useCustom ? customContent : XEUtils.toString(column.type === 'html' ? tipOverEl.innerText : tipOverEl.textContent).trim()
      const isOver = tipOverEl.scrollWidth > tipOverEl.clientWidth
      if (content && (showAll || useCustom || isOver)) {
        Object.assign(tooltipStore, {
          row,
          column,
          visible: true,
          currOpts: {}
        })
        nextTick(() => {
          const $tooltip = refTooltip.value
          if ($tooltip && $tooltip.open) {
            $tooltip.open(isOver ? tipOverEl : tipElem, formatText(content))
          }
        })
      }
      return nextTick()
    }

    const callSlot = <T>(slotFunc: ((params: T) => VxeComponentSlotType | VxeComponentSlotType[]) | string | null, params: T): VxeComponentSlotType[] => {
      if (slotFunc) {
        if ($xeGrid) {
          return $xeGrid.callSlot(slotFunc, params)
        }
        // if (XEUtils.isString(slotFunc)) {
        //   slotFunc = slots[slotFunc] || null
        // }
        if (XEUtils.isFunction(slotFunc)) {
          return getSlotVNs(slotFunc(params))
        }
      }
      return []
    }

    /**
     * 内部方法
     */
    tablePrivateMethods = {
      getSetupOptions () {
        return getConfig()
      },
      updateAfterDataIndex,
      callSlot,
      /**
       * 获取父容器元素
       */
      getParentElem () {
        const el = refElem.value
        if ($xeGrid) {
          const gridEl = $xeGrid.getRefMaps().refElem.value
          return gridEl ? gridEl.parentNode as HTMLElement : null
        }
        return el ? el.parentNode as HTMLElement : null
      },
      /**
       * 获取父容器的高度
       */
      getParentHeight () {
        const { height } = props
        const el = refElem.value
        if (el) {
          const parentElem = el.parentNode as HTMLElement
          const parentPaddingSize = height === '100%' || height === 'auto' ? getPaddingTopBottomSize(parentElem) : 0
          let parentWrapperHeight = 0
          if (parentElem) {
            if ($xeGrid && hasClass(parentElem, 'vxe-grid--table-wrapper')) {
              parentWrapperHeight = $xeGrid.getParentHeight()
            } else {
              parentWrapperHeight = parentElem.clientHeight
            }
          }
          return Math.floor(parentWrapperHeight - parentPaddingSize)
        }
        return 0
      },
      /**
       * 获取需要排除的高度
       * 但渲染表格高度时，需要排除工具栏或分页等相关组件的高度
       * 如果存在表尾合计滚动条，则需要排除滚动条高度
       */
      getExcludeHeight () {
        return $xeGrid ? $xeGrid.getExcludeHeight() : 0
      },
      /**
       * 定义行数据中的列属性，如果不存在则定义
       * @param {Row} records 行数据
       */
      defineField (records) {
        const { treeConfig } = props
        const expandOpts = computeExpandOpts.value
        const treeOpts = computeTreeOpts.value
        const radioOpts = computeRadioOpts.value
        const checkboxOpts = computeCheckboxOpts.value
        const childrenField = treeOpts.children || treeOpts.childrenField
        const rowkey = getRowkey($xeTable)
        if (!XEUtils.isArray(records)) {
          records = [records]
        }
        return records.map(record => {
          internalData.tableFullColumn.forEach(column => {
            const { field, editRender } = column
            if (field && !XEUtils.has(record, field) && !record[field]) {
              let cellValue = null
              if (editRender) {
                const { defaultValue } = editRender
                if (XEUtils.isFunction(defaultValue)) {
                  cellValue = defaultValue({ column })
                } else if (!XEUtils.isUndefined(defaultValue)) {
                  cellValue = defaultValue
                }
              }
              XEUtils.set(record, field, cellValue)
            }
          })
          const otherFields: (string | undefined)[] = [radioOpts.labelField, checkboxOpts.checkField, checkboxOpts.labelField, expandOpts.labelField]
          otherFields.forEach((key) => {
            if (key && eqEmptyValue(XEUtils.get(record, key))) {
              XEUtils.set(record, key, null)
            }
          })
          if (treeConfig && treeOpts.lazy && XEUtils.isUndefined(record[childrenField])) {
            record[childrenField] = null
          }
          // 必须有行数据的唯一主键，可以自行设置；也可以默认生成一个随机数
          if (eqEmptyValue(XEUtils.get(record, rowkey))) {
            XEUtils.set(record, rowkey, getRowUniqueId())
          }
          return record
        })
      },
      handleTableData (force?: boolean) {
        const { scrollYLoad } = reactData
        const { scrollYStore, fullDataRowIdData } = internalData
        let fullList: any[] = internalData.afterFullData
        // 是否进行数据处理
        if (force) {
          // 更新数据，处理筛选和排序
          updateAfterFullData()
          // 如果为虚拟树，将树结构拍平
          fullList = handleVirtualTreeToList()
        }
        const tableData = scrollYLoad ? fullList.slice(scrollYStore.startIndex, scrollYStore.endIndex) : fullList.slice(0)
        const visibleDataRowIdMaps: Record<string, any> = {}
        tableData.forEach((row, $index) => {
          const rowid = getRowid($xeTable, row)
          const rest = fullDataRowIdData[rowid]
          if (rest) {
            rest.$index = $index
          }
          visibleDataRowIdMaps[rowid] = row
        })
        reactData.tableData = tableData
        internalData.visibleDataRowIdData = visibleDataRowIdMaps
        return nextTick()
      },
      /**
       * 更新数据行的 Map
       */
      cacheRowMap (isReset) {
        const { treeConfig } = props
        const { isRowGroupStatus } = reactData
        const { fullAllDataRowIdData, tableFullData, tableFullTreeData, tableFullGroupData, treeExpandedMaps } = internalData
        const fullAllDataRowIdMaps: Record<string, VxeTableDefines.RowCacheItem> = isReset ? {} : { ...fullAllDataRowIdData } // 存在已删除数据
        const fullDataRowIdMaps: Record<string, VxeTableDefines.RowCacheItem> = {}

        const { handleUpdateRowId } = createHandleUpdateRowId($xeTable)
        const handleRowCache = (row: any, index: number, items: any, currIndex: number, parentRow: any, rowid: string, level: number, seq: string | number) => {
          let rowRest = fullAllDataRowIdMaps[rowid]
          if (!rowRest) {
            rowRest = { row, rowid, seq, index: -1, _index: -1, $index: -1, treeIndex: index, items, parent: parentRow, level, height: 0, resizeHeight: 0, oTop: 0, expandHeight: 0 }
            fullDataRowIdMaps[rowid] = rowRest
            fullAllDataRowIdMaps[rowid] = rowRest
          }
          rowRest.treeLoaded = false
          rowRest.expandLoaded = false

          rowRest.row = row
          rowRest.items = items
          rowRest.parent = parentRow
          rowRest.level = level
          rowRest.index = currIndex
          rowRest.treeIndex = index

          fullDataRowIdMaps[rowid] = rowRest
          fullAllDataRowIdMaps[rowid] = rowRest
        }

        if (treeConfig) {
          const treeOpts = computeTreeOpts.value
          const { lazy } = treeOpts
          const childrenField = treeOpts.children || treeOpts.childrenField
          const hasChildField = treeOpts.hasChild || treeOpts.hasChildField
          XEUtils.eachTree(tableFullTreeData, (row, index, items, path, parentRow, nodes) => {
            const rowid = handleUpdateRowId(row)
            if (treeConfig && lazy) {
              if (row[hasChildField] && row[childrenField] === undefined) {
                row[childrenField] = null
              }
              if (treeExpandedMaps[rowid]) {
                if (!row[childrenField] || !row[childrenField].length) {
                  delete treeExpandedMaps[rowid]
                }
              }
            }
            handleRowCache(row, index, items, parentRow ? -1 : index, parentRow, rowid, nodes.length - 1, toTreePathSeq(path))
          }, { children: childrenField })
        } else if (isRowGroupStatus) {
          const aggregateOpts = computeAggregateOpts.value
          const { mapChildrenField } = aggregateOpts
          XEUtils.eachTree(tableFullGroupData, (row, index, items, path, parentRow, nodes) => {
            const rowid = handleUpdateRowId(row)
            handleRowCache(row, index, items, parentRow ? -1 : index, parentRow, rowid, nodes.length - 1, toTreePathSeq(path))
          }, { children: mapChildrenField })
        } else {
          tableFullData.forEach((row, index, items) => {
            handleRowCache(row, index, items, index, null, handleUpdateRowId(row), 0, index + 1)
          })
        }

        internalData.fullDataRowIdData = fullDataRowIdMaps
        internalData.fullAllDataRowIdData = fullAllDataRowIdMaps
        reactData.treeExpandedFlag++
      },
      cacheSourceMap (fullData) {
        const { treeConfig } = props
        const treeOpts = computeTreeOpts.value
        const sourceData = XEUtils.clone(fullData, true)
        const { handleUpdateRowId } = createHandleUpdateRowId($xeTable)
        const sourceRowIdData: Record<string, any> = {}
        const handleSourceRow = (row: any) => {
          const rowid = handleUpdateRowId(row)
          sourceRowIdData[rowid] = row
        }
        // 源数据缓存
        if (treeConfig) {
          const childrenField = treeOpts.children || treeOpts.childrenField
          XEUtils.eachTree(sourceData, handleSourceRow, { children: treeOpts.transform ? treeOpts.mapChildrenField : childrenField })
        } else {
          sourceData.forEach(handleSourceRow)
        }
        internalData.sourceDataRowIdData = sourceRowIdData
        internalData.tableSourceData = sourceData
      },
      /**
       * 指定列宽的列进行拆分
       */
      analyColumnWidth () {
        const { tableFullColumn } = internalData
        const columnOpts = computeColumnOpts.value
        const { width: defaultWidth, minWidth: defaultMinWidth } = columnOpts
        const resizeList: VxeTableDefines.ColumnInfo[] = []
        const pxList: VxeTableDefines.ColumnInfo[] = []
        const pxMinList: VxeTableDefines.ColumnInfo[] = []
        const autoMinList: VxeTableDefines.ColumnInfo[] = []
        const scaleList: VxeTableDefines.ColumnInfo[] = []
        const scaleMinList: VxeTableDefines.ColumnInfo[] = []
        const autoList: VxeTableDefines.ColumnInfo[] = []
        const remainList: VxeTableDefines.ColumnInfo[] = []
        tableFullColumn.forEach((column) => {
          if (defaultWidth && !column.width) {
            column.width = defaultWidth
          }
          if (defaultMinWidth && !column.minWidth) {
            column.minWidth = defaultMinWidth
          }
          if (column.visible) {
            if (column.resizeWidth) {
              resizeList.push(column)
            } else if (column.width === 'auto') {
              autoList.push(column)
            } else if (isPx(column.width)) {
              pxList.push(column)
            } else if (isScale(column.width)) {
              scaleList.push(column)
            } else if (isPx(column.minWidth)) {
              pxMinList.push(column)
            } else if (column.minWidth === 'auto') {
              autoMinList.push(column)
            } else if (isScale(column.minWidth)) {
              scaleMinList.push(column)
            } else {
              remainList.push(column)
            }
          }
        })
        Object.assign(reactData.columnStore, { resizeList, pxList, pxMinList, autoMinList, scaleList, scaleMinList, autoList, remainList })
      },
      handleColResizeMousedownEvent (evnt, fixedType, params) {
        evnt.stopPropagation()
        evnt.preventDefault()
        const { column } = params
        const { columnStore, overflowX, scrollbarHeight } = reactData
        const { elemStore, visibleColumn } = internalData
        const { leftList, rightList } = columnStore
        const resizableOpts = computeResizableOpts.value
        const osbHeight = overflowX ? scrollbarHeight : 0
        const tableEl = refElem.value
        const leftContainerElem = refLeftContainer.value
        const rightContainerElem = refRightContainer.value
        const resizeBarElem = refColResizeBar.value
        if (!resizeBarElem) {
          return
        }
        const isLeftFixed = fixedType === 'left'
        const isRightFixed = fixedType === 'right'
        const resizeTipElem = resizeBarElem.firstElementChild as HTMLDivElement
        const scrollbarXToTop = computeScrollbarXToTop.value
        const { clientX: dragClientX } = evnt
        const dragBtnElem = evnt.target as HTMLDivElement
        let resizeColumn = column
        if (column.children && column.children.length) {
          XEUtils.eachTree(column.children, childColumn => {
            resizeColumn = childColumn
          })
        }
        const cell = dragBtnElem.parentNode as HTMLTableCellElement
        const cellParams = Object.assign(params, { cell })
        let dragLeft = 0
        const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
        if (!bodyScrollElem) {
          return
        }
        const tableRect = tableEl.getBoundingClientRect()
        const rightContainerRect = rightContainerElem ? rightContainerElem.getBoundingClientRect() : null
        const cellRect = cell.getBoundingClientRect()
        const dragBtnRect = dragBtnElem.getBoundingClientRect()

        const dragBtnWidth = dragBtnElem.clientWidth
        const dragBtnOffsetWidth = Math.floor(dragBtnWidth / 2)
        const dragPosLeft = dragBtnRect.x - tableRect.x + dragBtnOffsetWidth

        const minInterval = getColReMinWidth(cellParams) - dragBtnOffsetWidth // 列之间的最小间距
        const dragMinLeft = isRightFixed ? 0 : (cellRect.x - tableRect.x + dragBtnWidth + minInterval)
        const dragMaxLeft = cellRect.x - tableRect.x + cell.clientWidth - minInterval

        let fixedLeftRemainWidth = 0
        let fixedRightRemainWidth = 0
        if (isLeftFixed || isRightFixed) {
          let isMach = false
          const fixedColumn = isLeftFixed ? leftList : rightList
          for (let i = 0; i < fixedColumn.length; i++) {
            const item = fixedColumn[i]
            if (isMach) {
              fixedLeftRemainWidth += item.renderWidth
            } else {
              isMach = item.id === resizeColumn.id
              if (!isMach) {
                fixedRightRemainWidth += item.renderWidth
              }
            }
          }
        }

        // 处理拖动事件
        const updateEvent = (evnt: MouseEvent) => {
          evnt.stopPropagation()
          evnt.preventDefault()
          const tableHeight = tableEl.clientHeight
          const offsetX = evnt.clientX - dragClientX
          let left = dragPosLeft + offsetX

          if (isLeftFixed) {
            if (rightContainerRect) {
              left = Math.min(left, rightContainerRect.x - tableRect.x - fixedLeftRemainWidth - minInterval)
            }
          } else if (isRightFixed) {
            if (leftContainerElem) {
              left = Math.max(left, leftContainerElem.clientWidth + fixedRightRemainWidth + minInterval)
            }
            left = Math.min(left, dragMaxLeft)
          }

          dragLeft = Math.max(left, dragMinLeft)

          const resizeBarLeft = Math.max(1, dragLeft)
          resizeBarElem.style.left = `${resizeBarLeft}px`
          resizeBarElem.style.top = `${scrollbarXToTop ? osbHeight : 0}px`
          resizeBarElem.style.height = `${scrollbarXToTop ? tableHeight - osbHeight : tableHeight}px`
          if (resizableOpts.showDragTip && resizeTipElem) {
            resizeTipElem.textContent = getI18n('vxe.table.resizeColTip', [Math.floor(resizeColumn.renderWidth + (isRightFixed ? dragPosLeft - dragLeft : dragLeft - dragPosLeft))])
            const tableWrapperWidth = tableEl.clientWidth
            const resizeBarWidth = resizeBarElem.clientWidth
            const resizeTipWidth = resizeTipElem.clientWidth
            const resizeTipHeight = resizeTipElem.clientHeight
            let resizeTipLeft = -resizeTipWidth
            if (resizeBarLeft < resizeTipWidth + resizeBarWidth) {
              resizeTipLeft = 0
            } else if (resizeBarLeft > tableWrapperWidth) {
              resizeTipLeft += tableWrapperWidth - resizeBarLeft
            }
            resizeTipElem.style.left = `${resizeTipLeft}px`
            resizeTipElem.style.top = `${Math.min(tableHeight - resizeTipHeight, Math.max(0, evnt.clientY - tableRect.y - resizeTipHeight / 2))}px`
          }
          reactData.isDragResize = true
        }

        reactData.isDragResize = true
        addClass(tableEl, 'col-drag--resize')
        resizeBarElem.style.display = 'block'
        document.onmousemove = updateEvent
        document.onmouseup = function (evnt) {
          document.onmousemove = null
          document.onmouseup = null
          resizeBarElem.style.display = 'none'
          internalData._lastResizeTime = Date.now()

          setTimeout(() => {
            reactData.isDragResize = false
          }, 50)

          const resizeWidth = resizeColumn.renderWidth + (isRightFixed ? dragPosLeft - dragLeft : dragLeft - dragPosLeft)
          const resizeParams = { ...params, resizeWidth, resizeColumn }
          if (resizableOpts.dragMode === 'fixed') {
            visibleColumn.forEach(item => {
              if (item.id !== resizeColumn.id) {
                if (!item.resizeWidth) {
                  item.resizeWidth = item.renderWidth
                }
              }
            })
          }

          if ($xeTable.handleColResizeCellAreaEvent) {
            $xeTable.handleColResizeCellAreaEvent(evnt, resizeParams)
          } else {
            resizeColumn.resizeWidth = resizeWidth
            handleUpdateColResize(evnt, resizeParams)
          }
          removeClass(tableEl, 'col-drag--resize')
        }
        updateEvent(evnt)
        if ($xeTable.closeMenu) {
          $xeTable.closeMenu()
        }
      },
      handleColResizeDblclickEvent (evnt, params) {
        const resizableOpts = computeResizableOpts.value
        const { isDblclickAutoWidth } = resizableOpts
        const el = refElem.value
        if (isDblclickAutoWidth && el) {
          evnt.stopPropagation()
          evnt.preventDefault()
          const { fullColumnIdData } = internalData
          const { column } = params
          let resizeColumn = column
          if (column.children && column.children.length) {
            XEUtils.eachTree(column.children, childColumn => {
              resizeColumn = childColumn
            })
          }
          const colid = resizeColumn.id
          const colRest = fullColumnIdData[colid]
          const dragBtnElem = evnt.target as HTMLDivElement
          const cell = dragBtnElem.parentNode as HTMLTableCellElement
          const cellParams = Object.assign(params, { cell })
          const colMinWidth = getColReMinWidth(cellParams)

          el.setAttribute('data-calc-col', 'Y')
          let resizeWidth = calcColumnAutoWidth(resizeColumn, el)
          el.removeAttribute('data-calc-col')
          if (colRest) {
            resizeWidth = Math.max(resizeWidth, colRest.width)
          }
          resizeWidth = Math.max(colMinWidth, resizeWidth)
          const resizeParams = { ...params, resizeWidth, resizeColumn }
          reactData.isDragResize = false
          internalData._lastResizeTime = Date.now()

          if ($xeTable.handleColResizeDblclickCellAreaEvent) {
            $xeTable.handleColResizeDblclickCellAreaEvent(evnt, resizeParams)
          } else {
            resizeColumn.resizeWidth = resizeWidth
            handleUpdateColResize(evnt, resizeParams)
          }
        }
      },
      handleRowResizeMousedownEvent (evnt, params) {
        evnt.stopPropagation()
        evnt.preventDefault()
        const { row } = params
        const { overflowX, scrollbarWidth, overflowY, scrollbarHeight } = reactData
        const { elemStore, fullAllDataRowIdData } = internalData
        const osbWidth = overflowY ? scrollbarWidth : 0
        const osbHeight = overflowX ? scrollbarHeight : 0
        const scrollbarYToLeft = computeScrollbarYToLeft.value
        const resizableOpts = computeResizableOpts.value
        const rowOpts = computeRowOpts.value
        const cellOpts = computeCellOpts.value
        const tableEl = refElem.value
        const resizeBarElem = refRowResizeBar.value
        if (!resizeBarElem) {
          return
        }
        const { clientY: dragClientY } = evnt
        const resizeTipElem = resizeBarElem.firstElementChild as HTMLDivElement
        const dragBtnElem = evnt.currentTarget as HTMLDivElement
        const tdEl = dragBtnElem.parentNode as HTMLTableCellElement
        const trEl = tdEl.parentNode as HTMLTableCellElement
        const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
        if (!bodyScrollElem) {
          return
        }
        const rowid = getRowid($xeTable, row)
        const rowRest = fullAllDataRowIdData[rowid]
        if (!rowRest) {
          return
        }
        const defaultRowHeight = computeDefaultRowHeight.value
        const currCellHeight = rowRest.resizeHeight || cellOpts.height || rowOpts.height || rowRest.height || defaultRowHeight
        const tableRect = tableEl.getBoundingClientRect()
        const trRect = trEl.getBoundingClientRect()
        const targetOffsetY = dragClientY - trRect.y - trEl.clientHeight
        let resizeHeight = currCellHeight
        const cellEl = tdEl.querySelector('.vxe-cell')
        let cellMinHeight = 0
        if (cellEl) {
          const cellStyle = getComputedStyle(cellEl)
          cellMinHeight = Math.max(1, Math.ceil(XEUtils.toNumber(cellStyle.paddingTop) + XEUtils.toNumber(cellStyle.paddingBottom)))
        }
        const minTop = trRect.y - tableRect.y + cellMinHeight
        // 处理拖动事件
        const updateEvent = (evnt: MouseEvent) => {
          evnt.stopPropagation()
          evnt.preventDefault()
          const rtWidth = tableEl.clientWidth - osbWidth
          const tableHeight = tableEl.clientHeight - osbHeight
          let dragTop = evnt.clientY - tableRect.y - targetOffsetY
          if (dragTop < minTop) {
            dragTop = minTop
          } else {
            resizeHeight = Math.max(cellMinHeight, currCellHeight + evnt.clientY - dragClientY)
          }
          resizeBarElem.style.left = `${scrollbarYToLeft ? osbWidth : 0}px`
          resizeBarElem.style.top = `${dragTop}px`
          resizeBarElem.style.width = `${rtWidth}px`
          if (resizableOpts.showDragTip && resizeTipElem) {
            resizeTipElem.textContent = getI18n('vxe.table.resizeRowTip', [resizeHeight])
            const resizeTipWidth = resizeTipElem.clientWidth
            const resizeTipHeight = resizeTipElem.clientHeight
            let resizeBarLeft = Math.max(2, evnt.clientX - tableRect.x)
            let resizeBarTop = 0
            if (resizeBarLeft + resizeTipWidth >= rtWidth - 2) {
              resizeBarLeft = rtWidth - resizeTipWidth - 2
            }
            if (dragTop + resizeTipHeight >= tableHeight) {
              resizeBarTop = tableHeight - (dragTop + resizeTipHeight)
            }
            resizeTipElem.style.left = `${resizeBarLeft}px`
            resizeTipElem.style.top = `${resizeBarTop}px`
          }
          reactData.isDragResize = true
        }

        reactData.isDragResize = true
        addClass(tableEl, 'row-drag--resize')
        resizeBarElem.style.display = 'block'
        document.onmousemove = updateEvent
        document.onmouseup = function (evnt) {
          document.onmousemove = null
          document.onmouseup = null
          resizeBarElem.style.display = 'none'
          internalData._lastResizeTime = Date.now()

          setTimeout(() => {
            reactData.isDragResize = false
          }, 50)

          if (resizeHeight !== currCellHeight) {
            const resizeParams = { ...params, resizeHeight, resizeRow: row }
            internalData.isResizeCellHeight = true
            if ($xeTable.handleRowResizeCellAreaEvent) {
              $xeTable.handleRowResizeCellAreaEvent(evnt, resizeParams)
            } else {
              rowRest.resizeHeight = resizeHeight
              handleUpdateRowResize(evnt, resizeParams)
              updateRowOffsetTop()
            }
          }
          removeClass(tableEl, 'row-drag--resize')
        }
        updateEvent(evnt)
      },
      handleRowResizeDblclickEvent (evnt, params) {
        const resizableOpts = computeResizableOpts.value
        const { isDblclickAutoHeight } = resizableOpts
        const el = refElem.value
        if (isDblclickAutoHeight && el) {
          evnt.stopPropagation()
          evnt.preventDefault()
          const { editStore } = reactData
          const { fullAllDataRowIdData } = internalData
          const { actived } = editStore
          const { row } = params
          const rowid = getRowid($xeTable, row)
          const rowRest = fullAllDataRowIdData[rowid]
          if (!rowRest) {
            return
          }
          const handleRsHeight = () => {
            el.setAttribute('data-calc-row', 'Y')
            const resizeHeight = calcCellAutoHeight(rowRest, el)
            el.removeAttribute('data-calc-row')
            const resizeParams = { ...params, resizeHeight, resizeRow: row }
            reactData.isDragResize = false
            internalData._lastResizeTime = Date.now()
            if ($xeTable.handleRowResizeDblclickCellAreaEvent) {
              $xeTable.handleRowResizeDblclickCellAreaEvent(evnt, resizeParams)
            } else {
              rowRest.resizeHeight = resizeHeight
              handleUpdateRowResize(evnt, resizeParams)
            }
          }
          if (actived.row || actived.column) {
            $xeTable.clearEdit().then(handleRsHeight)
          } else {
            handleRsHeight()
          }
        }
      },
      saveCustomStore (type) {
        const { customConfig } = props
        const tableId = computeTableId.value
        const customOpts = computeCustomOpts.value
        const { updateStore, storage, storeOptions } = customOpts
        const isAllCustom = storage === true
        const storageOpts: VxeTableDefines.VxeTableCustomStorageObj = isAllCustom ? {} : Object.assign({}, storage || {}, storeOptions)
        const isCustomResizable = hangleStorageDefaultValue(storageOpts.resizable, isAllCustom)
        const isCustomVisible = hangleStorageDefaultValue(storageOpts.visible, isAllCustom)
        const isCustomFixed = hangleStorageDefaultValue(storageOpts.fixed, isAllCustom)
        const isCustomSort = hangleStorageDefaultValue(storageOpts.sort, isAllCustom)
        const isCustomAggFunc = hangleStorageDefaultValue(storageOpts.aggFunc, isAllCustom)
        if (type !== 'reset') {
          // fix：修复拖动列宽，重置按钮无法点击的问题
          reactData.isCustomStatus = true
        }
        if (storage && (customConfig ? isEnableConf(customOpts) : customOpts.enabled) && (isCustomResizable || isCustomVisible || isCustomFixed || isCustomSort || isCustomAggFunc)) {
          if (!tableId) {
            errLog('vxe.error.reqProp', ['id'])
            return nextTick()
          }
          const storeData = type === 'reset'
            ? {
                resizableData: {},
                sortData: {},
                visibleData: {},
                fixedData: {}
              }
            : tableMethods.getCustomStoreData()
          if (updateStore) {
            return updateStore({
              $table: $xeTable,
              id: tableId,
              type,
              storeData
            })
          } else {
            setCustomStorageMap(tableId, type === 'reset' ? null : storeData)
          }
        }
        return nextTick()
      },
      handleCustom () {
        const { mouseConfig } = props
        if (mouseConfig) {
          if ($xeTable.clearSelected) {
            $xeTable.clearSelected()
          }
          if ($xeTable.clearCellAreas) {
            $xeTable.clearCellAreas()
            $xeTable.clearCopyCellArea()
          }
        }
        tablePrivateMethods.analyColumnWidth()
        return tableMethods.refreshColumn(true)
      },
      handleUpdateDataQueue () {
        reactData.upDataFlag++
      },
      handleRefreshColumnQueue () {
        reactData.reColumnFlag++
      },
      preventEvent (evnt, type, args, next, end) {
        let evntList = interceptor.get(type)

        // 兼容老版本
        if (!evntList.length && type === 'event.clearEdit') {
          evntList = interceptor.get('event.clearActived')
          if (evntList.length) {
            warnLog('vxe.error.delEvent', ['event.clearActived', 'event.clearEdit'])
          }
        }
        // 兼容老版本

        let rest = null
        let isStop = false
        for (let i = 0; i < evntList.length; i++) {
          const func = evntList[i]
          const fnRest = func(Object.assign({ $grid: $xeGrid, $table: $xeTable, $event: evnt }, args))
          if (fnRest === false) {
            isStop = true
            break
          } else if (fnRest && fnRest.status === false) {
            rest = fnRest.result
            isStop = true
            break
          }
        }
        if (!isStop) {
          if (next) {
            rest = next()
          }
        }
        if (end) {
          end()
        }
        return rest
      },
      updateCheckboxStatus () {
        const { treeConfig } = props
        const { isRowGroupStatus } = reactData
        const { afterTreeFullData, afterGroupFullData, selectCheckboxMaps, treeIndeterminateRowMaps } = internalData
        const aggregateOpts = computeAggregateOpts.value
        const treeOpts = computeTreeOpts.value
        const childrenField = treeOpts.children || treeOpts.childrenField
        const checkboxOpts = computeCheckboxOpts.value
        const { checkField, indeterminateField, checkStrictly, checkMethod } = checkboxOpts
        if (checkStrictly) {
          return
        }
        if (isRowGroupStatus || treeConfig) {
          const { handleGetRowId } = createHandleGetRowId($xeTable)
          const childRowMaps: Record<string, number> = {}
          const childRowList: any[][] = []

          if (isRowGroupStatus) {
            // 行分组
            const mapChildrenField = aggregateOpts.mapChildrenField
            if (mapChildrenField) {
              XEUtils.eachTree(afterGroupFullData, (row) => {
                const rowid = handleGetRowId(row)
                const childList = row[mapChildrenField]
                if (childList && childList.length && !childRowMaps[rowid]) {
                  childRowMaps[rowid] = 1
                  childRowList.unshift([row, rowid, childList])
                }
              }, { children: mapChildrenField })
            }
          } else if (treeConfig) {
            // 树结构
            const { transform, mapChildrenField } = treeOpts
            XEUtils.eachTree(afterTreeFullData, (row) => {
              const rowid = handleGetRowId(row)
              const childList = row[transform ? mapChildrenField : childrenField]
              if (childList && childList.length && !childRowMaps[rowid]) {
                childRowMaps[rowid] = 1
                childRowList.unshift([row, rowid, childList])
              } else {
                if (indeterminateField) {
                  XEUtils.set(row, indeterminateField, false)
                }
              }
            }, { children: transform ? mapChildrenField : childrenField })
          }

          childRowList.forEach(vals => {
            const row = vals[0]
            const rowid: string = vals[1]
            const childList: any[] = vals[2]
            let sLen = 0 // 已选
            let hLen = 0 // 半选
            let vLen = 0 // 有效子行
            const cLen = childList.length // 子行
            childList.forEach(
              checkMethod
                ? (item) => {
                    const childRowid = handleGetRowId(item)
                    const isSelect = checkField ? XEUtils.get(item, checkField) : selectCheckboxMaps[childRowid]
                    if (checkMethod({ $table: $xeTable, row: item })) {
                      if (isSelect) {
                        sLen++
                      } else if (treeIndeterminateRowMaps[childRowid]) {
                        hLen++
                      }
                      vLen++
                    } else {
                      if (isSelect) {
                        sLen++
                      } else if (treeIndeterminateRowMaps[childRowid]) {
                        hLen++
                      }
                    }
                  }
                : item => {
                  const childRowid = handleGetRowId(item)
                  const isSelect = checkField ? XEUtils.get(item, checkField) : selectCheckboxMaps[childRowid]
                  if (isSelect) {
                    sLen++
                  } else if (treeIndeterminateRowMaps[childRowid]) {
                    hLen++
                  }
                  vLen++
                }
            )

            let isSelected = false
            if (cLen > 0) {
              if (vLen > 0) {
                isSelected = (sLen > 0 || hLen > 0) && sLen >= vLen
              } else {
                // 如果存在子项禁用
                if ((sLen > 0 && sLen >= vLen)) {
                  isSelected = true
                } else if (selectCheckboxMaps[rowid]) {
                  isSelected = true
                } else {
                  isSelected = false
                }
              }
            } else {
              // 如果无子项
              isSelected = selectCheckboxMaps[rowid]
            }
            const halfSelect = !isSelected && (sLen > 0 || hLen > 0)

            if (checkField) {
              XEUtils.set(row, checkField, isSelected)
            }
            if (indeterminateField) {
              XEUtils.set(row, indeterminateField, halfSelect)
            }
            if (isSelected) {
              if (!checkField) {
                selectCheckboxMaps[rowid] = row
              }
              if (treeIndeterminateRowMaps[rowid]) {
                delete treeIndeterminateRowMaps[rowid]
              }
            } else {
              if (!checkField) {
                if (selectCheckboxMaps[rowid]) {
                  delete selectCheckboxMaps[rowid]
                }
              }
              if (halfSelect) {
                treeIndeterminateRowMaps[rowid] = row
              } else {
                if (treeIndeterminateRowMaps[rowid]) {
                  delete treeIndeterminateRowMaps[rowid]
                }
              }
            }
          })
        }
        reactData.updateCheckboxFlag++
      },
      updateAllCheckboxStatus () {
        const { treeConfig } = props
        const { isRowGroupStatus } = reactData
        const { afterFullData, afterTreeFullData, afterGroupFullData, checkboxReserveRowMap, selectCheckboxMaps, treeIndeterminateRowMaps } = internalData
        const checkboxOpts = computeCheckboxOpts.value
        const { checkField, checkMethod, showReserveStatus } = checkboxOpts
        const { handleGetRowId } = createHandleGetRowId($xeTable)

        let sLen = 0 // 已选
        let dsLen = 0 // 禁用的已选
        let hLen = 0 // 半选
        let dhLen = 0 // 禁用的半选
        let vLen = 0 // 有效行

        const rootList = (treeConfig ? afterTreeFullData : (isRowGroupStatus ? afterGroupFullData : afterFullData))
        rootList.forEach(checkMethod
          ? row => {
            const childRowid = handleGetRowId(row)
            const selected = checkField ? XEUtils.get(row, checkField) : selectCheckboxMaps[childRowid]
            if (checkMethod({ $table: $xeTable, row })) {
              if (selected) {
                sLen++
              } else if (treeIndeterminateRowMaps[childRowid]) {
                hLen++
              }
              vLen++
            } else {
              if (selected) {
                dsLen++
              } else if (treeIndeterminateRowMaps[childRowid]) {
                dhLen++
              }
            }
          }
          : row => {
            const childRowid = handleGetRowId(row)
            const selected = checkField ? XEUtils.get(row, checkField) : selectCheckboxMaps[childRowid]
            if (selected) {
              sLen++
            } else if (treeIndeterminateRowMaps[childRowid]) {
              hLen++
            }
            vLen++
          })

        const isSelected = rootList.length > 0 ? (vLen > 0 ? (sLen >= vLen) : (sLen >= rootList.length)) : false
        let halfSelect = !isSelected && (sLen > 0 || hLen > 0 || dsLen > 0 || dhLen > 0)

        // 如果复选框启用保留记录，当保留数据存在时显示半选
        if (!isSelected && !halfSelect && showReserveStatus) {
          halfSelect = !XEUtils.isEmpty(checkboxReserveRowMap)
        }

        reactData.isAllSelected = isSelected
        reactData.isIndeterminate = halfSelect
      },
      checkSelectionStatus () {
        $xeTable.updateCheckboxStatus()
        $xeTable.updateAllCheckboxStatus()
      },
      /**
       * 切换选中
       * 多选，行选中事件
       */
      handleBatchSelectRows (rows, checked, isForce) {
        const { treeConfig } = props
        const { isRowGroupStatus } = reactData
        const { selectCheckboxMaps } = internalData
        const aggregateOpts = computeAggregateOpts.value
        const treeOpts = computeTreeOpts.value
        const { transform, mapChildrenField } = treeOpts
        const childrenField = treeOpts.children || treeOpts.childrenField
        const checkboxOpts = computeCheckboxOpts.value
        const { checkField, checkStrictly, checkMethod } = checkboxOpts
        const { handleGetRowId } = createHandleGetRowId($xeTable)
        // indeterminateField 仅支持读取
        const indeterminateField = checkboxOpts.indeterminateField || checkboxOpts.halfField
        if (checkField) {
          // 树结构
          if ((treeConfig || isRowGroupStatus) && !checkStrictly) {
            // 更新子节点状态
            XEUtils.eachTree(rows, (row) => {
              if (isForce || (!checkMethod || checkMethod({ $table: $xeTable, row }))) {
                XEUtils.set(row, checkField, checked)
                if (indeterminateField) {
                  XEUtils.set(row, indeterminateField, false)
                }
                handleCheckboxReserveRow(row, checked)
              }
            }, { children: transform ? mapChildrenField : childrenField })
            reactData.updateCheckboxFlag++
            return
          }
          // 列表
          rows.forEach(row => {
            if (isForce || (!checkMethod || checkMethod({ $table: $xeTable, row }))) {
              XEUtils.set(row, checkField, checked)
              handleCheckboxReserveRow(row, checked)
            }
          })
          reactData.updateCheckboxFlag++
          return
        }

        // 树结构
        if (!checkStrictly) {
          if (isRowGroupStatus) {
            // 更新行分组节点状态
            XEUtils.eachTree(rows, (row) => {
              const rowid = handleGetRowId(row)
              if (isForce || (!checkMethod || checkMethod({ $table: $xeTable, row }))) {
                if (checked) {
                  selectCheckboxMaps[rowid] = row
                } else {
                  if (selectCheckboxMaps[rowid]) {
                    delete selectCheckboxMaps[rowid]
                  }
                }
                handleCheckboxReserveRow(row, checked)
              }
            }, { children: aggregateOpts.mapChildrenField })
            reactData.updateCheckboxFlag++
            return
          } else if (treeConfig) {
            // 更新子节点状态
            XEUtils.eachTree(rows, (row) => {
              const rowid = handleGetRowId(row)
              if (isForce || (!checkMethod || checkMethod({ $table: $xeTable, row }))) {
                if (checked) {
                  selectCheckboxMaps[rowid] = row
                } else {
                  if (selectCheckboxMaps[rowid]) {
                    delete selectCheckboxMaps[rowid]
                  }
                }
                handleCheckboxReserveRow(row, checked)
              }
            }, { children: transform ? mapChildrenField : childrenField })
            reactData.updateCheckboxFlag++
            return
          }
        }

        // 列表
        rows.forEach(row => {
          const rowid = handleGetRowId(row)
          if (isForce || (!checkMethod || checkMethod({ $table: $xeTable, row }))) {
            if (checked) {
              if (!selectCheckboxMaps[rowid]) {
                selectCheckboxMaps[rowid] = row
              }
            } else {
              if (selectCheckboxMaps[rowid]) {
                delete selectCheckboxMaps[rowid]
              }
            }
            handleCheckboxReserveRow(row, checked)
            reactData.updateCheckboxFlag++
          }
        })
      },
      /**
       * 即将移除
       * @deprecated
       */
      handleSelectRow ({ row }, checked, isForce) {
        $xeTable.handleBatchSelectRows([row], checked, isForce)
      },
      /**
       * 处理合并
       */
      handleUpdateBodyMerge () {
        const { mergeBodyList } = internalData
        internalData.mergeBodyCellMaps = buildMergeData(mergeBodyList)
        reactData.mergeBodyFlag++
      },
      handleUpdateFooterMerge () {
        const { mergeFooterList } = internalData
        internalData.mergeFooterCellMaps = buildMergeData(mergeFooterList)
        reactData.mergeFootFlag++
      },
      handleAggregateSummaryData () {
        return updateGroupData()
      },
      triggerHeaderTitleEvent (evnt, iconParams, params) {
        const tipContent = iconParams.content || (iconParams as any).message
        if (tipContent) {
          const { tooltipStore } = reactData
          const { column } = params
          const content = getFuncText(tipContent)
          handleTargetEnterEvent(true)
          tooltipStore.row = null
          tooltipStore.column = column
          tooltipStore.visible = true
          tooltipStore.currOpts = iconParams
          nextTick(() => {
            const $tooltip = refTooltip.value
            if ($tooltip && $tooltip.open) {
              $tooltip.open(evnt.currentTarget, content)
            }
          })
        }
      },
      /**
       * 触发表头 tooltip 事件
       */
      triggerHeaderTooltipEvent (evnt, params) {
        const { tooltipStore } = reactData
        const { column } = params
        handleTargetEnterEvent(true)
        const titleElem = evnt.currentTarget as HTMLDivElement
        if (!titleElem) {
          return
        }
        const cWrapperEl = titleElem.parentElement as HTMLDivElement
        if (!cWrapperEl) {
          return
        }
        const cellEl = cWrapperEl.parentElement as HTMLDivElement
        if (!cellEl) {
          return
        }
        const thEl = cellEl.parentElement as HTMLTableCellElement
        if (!thEl) {
          return
        }
        if (tooltipStore.column !== column || !tooltipStore.visible) {
          const ctEl = thEl.querySelector<HTMLElement>('.vxe-cell--title')
          handleTooltip(evnt, thEl, (hasClass(thEl, 'col--ellipsis') ? ctEl : cWrapperEl) || cWrapperEl, ctEl || cellEl, params)
        }
      },
      /**
       * 触发单元格 tooltip 事件
       */
      triggerBodyTooltipEvent (evnt, params) {
        const { editConfig } = props
        const { editStore } = reactData
        const { tooltipStore } = reactData
        const editOpts = computeEditOpts.value
        const { actived } = editStore
        const { row, column } = params
        const tdEl = evnt.currentTarget as HTMLTableCellElement
        handleTargetEnterEvent(tooltipStore.column !== column || tooltipStore.row !== row)
        // 单元格处于编辑状态时不触发提示框
        if (column.editRender && isEnableConf(editConfig)) {
          // 如果是行编辑模式
          if (editOpts.mode === 'row' && actived.row === row) {
            return
          }
          // 如果是单元格编辑模式
          if (actived.row === row && actived.column === column) {
            return
          }
        }
        if (tooltipStore.column !== column || tooltipStore.row !== row || !tooltipStore.visible) {
          const ctEl = tdEl.querySelector<HTMLElement>('.vxe-cell--wrapper')
          let ovEl = null
          let tipEl = tdEl.querySelector<HTMLElement>(column.type === 'html' ? '.vxe-cell--html' : '.vxe-cell--label')
          if (column.treeNode) {
            ovEl = tdEl.querySelector<HTMLElement>('.vxe-tree-cell')
          }
          if (!tipEl) {
            tipEl = ctEl
          }
          handleTooltip(evnt, tdEl, ovEl || ctEl, tipEl, params)
        }
      },
      /**
       * 触发表尾 tooltip 事件
       */
      triggerFooterTooltipEvent (evnt, params) {
        const { column } = params
        const { tooltipStore } = reactData
        const tdEl = evnt.currentTarget as HTMLTableCellElement
        handleTargetEnterEvent(tooltipStore.column !== column || !!tooltipStore.row)
        if (tooltipStore.column !== column || !tooltipStore.visible) {
          const ctEl = tdEl.querySelector<HTMLElement>('.vxe-cell--wrapper')
          let ovEl = null
          let tipEl = tdEl.querySelector<HTMLElement>(column.type === 'html' ? '.vxe-cell--html' : '.vxe-cell--label')
          if (column.type === 'html') {
            ovEl = tdEl.querySelector<HTMLElement>('.vxe-cell--html')
          }
          if (!tipEl) {
            tipEl = ctEl
          }
          handleTooltip(evnt, tdEl, ovEl || ctEl, tipEl, params)
        }
      },
      handleTargetLeaveEvent () {
        const tooltipOpts = computeTooltipOpts.value
        let $tooltip = refTooltip.value
        if ($tooltip && $tooltip.setActived) {
          $tooltip.setActived(false)
        }
        if (tooltipOpts.enterable) {
          internalData.tooltipTimeout = setTimeout(() => {
            $tooltip = refTooltip.value
            if ($tooltip && $tooltip.isActived && !$tooltip.isActived()) {
              $xeTable.closeTooltip()
            }
          }, tooltipOpts.leaveDelay)
        } else {
          $xeTable.closeTooltip()
        }
      },
      triggerHeaderCellClickEvent (evnt, params) {
        const { _lastResizeTime } = internalData
        const sortOpts = computeSortOpts.value
        const columnOpts = computeColumnOpts.value
        const currentColumnOpts = computeCurrentColumnOpts.value
        const { column } = params
        const cell = evnt.currentTarget
        const triggerResizable = _lastResizeTime && _lastResizeTime > Date.now() - 300
        const triggerSort = getEventTargetNode(evnt, cell, 'vxe-cell--sort').flag
        const triggerFilter = getEventTargetNode(evnt, cell, 'vxe-cell--filter').flag
        if (sortOpts.trigger === 'cell' && !(triggerResizable || triggerSort || triggerFilter)) {
          $xeTable.triggerSortEvent(evnt, column, getNextSortOrder(column))
        }
        dispatchEvent('header-cell-click', Object.assign({ triggerResizable, triggerSort, triggerFilter, cell }, params), evnt)
        if ((columnOpts.isCurrent || props.highlightCurrentColumn) && (!currentColumnOpts.trigger || ['header', 'default'].includes(currentColumnOpts.trigger))) {
          $xeTable.triggerCurrentColumnEvent(evnt, params)
        }
      },
      triggerHeaderCellDblclickEvent (evnt, params) {
        dispatchEvent('header-cell-dblclick', Object.assign({ cell: evnt.currentTarget }, params), evnt)
      },
      /**
       * 列点击事件
       * 如果是单击模式，则激活为编辑状态
       * 如果是双击模式，则单击后选中状态
       */
      triggerCellClickEvent (evnt, params) {
        const { highlightCurrentRow, highlightCurrentColumn, editConfig } = props
        const { editStore, isDragResize } = reactData
        if (isDragResize) {
          return
        }
        const expandOpts = computeExpandOpts.value
        const editOpts = computeEditOpts.value
        const treeOpts = computeTreeOpts.value
        const radioOpts = computeRadioOpts.value
        const checkboxOpts = computeCheckboxOpts.value
        const keyboardOpts = computeKeyboardOpts.value
        const aggregateOpts = computeAggregateOpts.value
        const rowOpts = computeRowOpts.value
        const columnOpts = computeColumnOpts.value
        const currentColumnOpts = computeCurrentColumnOpts.value
        const { actived, focused } = editStore
        const { row, column } = params
        const { type, treeNode, rowGroupNode } = column
        const isRadioType = type === 'radio'
        const isCheckboxType = type === 'checkbox'
        const isExpandType = type === 'expand'
        const cell = evnt.currentTarget as HTMLDivElement
        const triggerRadio = isRadioType && getEventTargetNode(evnt, cell, 'vxe-cell--radio').flag
        const triggerCheckbox = isCheckboxType && getEventTargetNode(evnt, cell, 'vxe-cell--checkbox').flag
        const triggerTreeNode = treeNode && getEventTargetNode(evnt, cell, 'vxe-cell--tree-btn').flag
        const triggerExpandNode = isExpandType && getEventTargetNode(evnt, cell, 'vxe-table--expanded').flag
        const triggerRowGroupNode = isExpandType && getEventTargetNode(evnt, cell, 'vxe-row-group--node-btn').flag
        params = Object.assign({ cell, triggerRadio, triggerCheckbox, triggerTreeNode, triggerExpandNode }, params)
        if (!triggerCheckbox && !triggerRadio) {
          // 如果是展开行
          if (!triggerExpandNode && (expandOpts.trigger === 'row' || (isExpandType && expandOpts.trigger === 'cell'))) {
            $xeTable.triggerRowExpandEvent(evnt, params)
          }
          // 如果是树形表格
          if ((treeOpts.trigger === 'row' || (treeNode && treeOpts.trigger === 'cell'))) {
            $xeTable.triggerTreeExpandEvent(evnt, params)
          }
          // 如果是行分组
          if ((aggregateOpts.trigger === 'row' || (rowGroupNode && aggregateOpts.trigger === 'cell'))) {
            $xeTable.triggerRowGroupExpandEvent(evnt, params)
          }
        }
        // 如果点击了树节点
        if (!triggerTreeNode) {
          if (!triggerExpandNode && !triggerRowGroupNode) {
            // 如果是当前行
            if (rowOpts.isCurrent || highlightCurrentRow) {
              if (!triggerCheckbox && !triggerRadio) {
                $xeTable.triggerCurrentRowEvent(evnt, params)
              }
            }
            // 如果是当前列
            if ((columnOpts.isCurrent || highlightCurrentColumn) && (!currentColumnOpts.trigger || ['cell', 'default'].includes(currentColumnOpts.trigger))) {
              if (!triggerCheckbox && !triggerRadio) {
                $xeTable.triggerCurrentColumnEvent(evnt, params)
              }
            }
            // 如果是单选框
            if (!triggerRadio && (radioOpts.trigger === 'row' || (isRadioType && radioOpts.trigger === 'cell'))) {
              $xeTable.triggerRadioRowEvent(evnt, params)
            }
            // 如果是复选框
            if (!triggerCheckbox && (checkboxOpts.trigger === 'row' || (isCheckboxType && checkboxOpts.trigger === 'cell'))) {
              $xeTable.handleToggleCheckRowEvent(evnt, params)
            }
          }
          // 如果设置了单元格选中功能，则不会使用点击事件去处理（只能支持双击模式）
          if (isEnableConf(editConfig)) {
            // 记录点击输入框聚焦状态
            if (keyboardOpts.arrowCursorLock && evnt && editOpts.mode === 'cell' && evnt.target && /^input|textarea$/i.test((evnt.target as HTMLElement).tagName)) {
              focused.column = column
              focused.row = row
            }
            if (editOpts.trigger === 'manual') {
              if (actived.args && actived.row === row && column !== actived.column) {
                handleChangeCell(evnt, params)
              }
            } else if (!actived.args || row !== actived.row || column !== actived.column) {
              if (editOpts.trigger === 'click') {
                handleChangeCell(evnt, params)
              } else if (editOpts.trigger === 'dblclick') {
                if (editOpts.mode === 'row' && actived.row === row) {
                  handleChangeCell(evnt, params)
                }
              }
            }
          }
        }
        // 如果是双击编辑模式
        if (isEnableConf(editConfig) && editOpts.trigger === 'dblclick') {
          if (actived.row && actived.column) {
            if (editOpts.mode === 'row') {
              if (!$xeTable.eqRow(actived.row, row)) {
                $xeTable.handleClearEdit(evnt)
              }
            } else if (editOpts.mode === 'cell') {
              if (!$xeTable.eqRow(actived.row, row) || actived.column.id !== column.id) {
                $xeTable.handleClearEdit(evnt)
              }
            }
          }
        }
        dispatchEvent('cell-click', params, evnt)
      },
      /**
       * 列双击点击事件
       * 如果是双击模式，则激活为编辑状态
       */
      triggerCellDblclickEvent (evnt, params) {
        const { editConfig } = props
        const { editStore, isDragResize } = reactData
        if (isDragResize) {
          return
        }
        const editOpts = computeEditOpts.value
        const { actived } = editStore
        const cell = evnt.currentTarget as HTMLDivElement
        params = Object.assign({ cell }, params)
        if (isEnableConf(editConfig) && editOpts.trigger === 'dblclick') {
          if (!actived.args || evnt.currentTarget !== actived.args.cell) {
            if (editOpts.mode === 'row') {
              checkValidate('blur')
                .catch((e) => e)
                .then(() => {
                  $xeTable.handleEdit(params, evnt)
                    .then(() => checkValidate('change'))
                    .catch((e) => e)
                })
            } else if (editOpts.mode === 'cell') {
              $xeTable.handleEdit(params, evnt)
                .then(() => checkValidate('change'))
                .catch((e) => e)
            }
          }
        }
        dispatchEvent('cell-dblclick', params, evnt)
      },
      handleToggleCheckRowEvent (evnt, params) {
        const { selectCheckboxMaps } = internalData
        const checkboxOpts = computeCheckboxOpts.value
        const { checkField, trigger } = checkboxOpts
        const { row } = params
        if (trigger === 'manual') {
          return
        }
        let checked = false
        if (checkField) {
          checked = !XEUtils.get(row, checkField)
        } else {
          checked = !selectCheckboxMaps[getRowid($xeTable, row)]
        }
        if (evnt) {
          $xeTable.triggerCheckRowEvent(evnt, params, checked)
        } else {
          $xeTable.handleBatchSelectRows([row], checked)
          $xeTable.checkSelectionStatus()
        }
      },
      triggerCheckRowEvent (evnt: MouseEvent, params, checked) {
        const { treeConfig } = props
        const { row } = params
        const { isRowGroupStatus } = reactData
        const { afterFullData } = internalData
        const checkboxOpts = computeCheckboxOpts.value
        const { checkMethod, trigger } = checkboxOpts
        if (trigger === 'manual') {
          return
        }
        evnt.stopPropagation()
        if (checkboxOpts.isShiftKey && evnt.shiftKey && !(treeConfig || isRowGroupStatus)) {
          const checkboxRecords = $xeTable.getCheckboxRecords()
          if (checkboxRecords.length) {
            const firstRow = checkboxRecords[0]
            const _rowIndex = $xeTable.getVTRowIndex(row)
            const _firstRowIndex = $xeTable.getVTRowIndex(firstRow)
            if (_rowIndex !== _firstRowIndex) {
              $xeTable.setAllCheckboxRow(false)
              const rangeRows = _rowIndex < _firstRowIndex ? afterFullData.slice(_rowIndex, _firstRowIndex + 1) : afterFullData.slice(_firstRowIndex, _rowIndex + 1)
              nextTick(() => {
                handleCheckedCheckboxRow(rangeRows, true, false)
              })
              dispatchEvent('checkbox-range-select', Object.assign({ rangeRecords: rangeRows }, params), evnt)
              return
            }
          }
        }
        if (!checkMethod || checkMethod({ $table: $xeTable, row })) {
          $xeTable.handleBatchSelectRows([row], checked)
          $xeTable.checkSelectionStatus()
          dispatchEvent('checkbox-change', Object.assign({
            records: () => $xeTable.getCheckboxRecords(),
            reserves: () => $xeTable.getCheckboxReserveRecords(),
            indeterminates: () => $xeTable.getCheckboxIndeterminateRecords(),
            checked
          }, params), evnt)
        }
      },
      /**
       * 多选，选中所有事件
       */
      triggerCheckAllEvent (evnt, value) {
        const checkboxOpts = computeCheckboxOpts.value
        const { trigger } = checkboxOpts
        if (trigger === 'manual') {
          return
        }
        if (evnt) {
          evnt.stopPropagation()
        }
        handleCheckAllEvent(evnt, value)
      },
      /**
       * 单选，行选中事件
       */
      triggerRadioRowEvent (evnt, params) {
        const { selectRadioRow: oldValue } = reactData
        const { row } = params
        const radioOpts = computeRadioOpts.value
        const { trigger, checkMethod } = radioOpts
        if (trigger === 'manual') {
          return
        }
        evnt.stopPropagation()
        if (!checkMethod || checkMethod({ $table: $xeTable, row })) {
          let newValue = row
          let isChange = oldValue !== newValue
          if (isChange) {
            handleCheckedRadioRow(newValue)
          } else if (!radioOpts.strict) {
            isChange = oldValue === newValue
            if (isChange) {
              newValue = null
              $xeTable.clearRadioRow()
            }
          }
          if (isChange) {
            dispatchEvent('radio-change', { oldValue, newValue, ...params }, evnt)
          }
        }
      },
      triggerCurrentColumnEvent (evnt, params) {
        const { currentColumn: oldValue } = reactData
        const columnOpts = computeColumnOpts.value
        const currentColumnOpts = computeCurrentColumnOpts.value
        const beforeRowMethod = currentColumnOpts.beforeSelectMethod || columnOpts.currentMethod as any
        const { column: newValue } = params
        const { trigger } = currentColumnOpts
        if (trigger === 'manual') {
          return
        }
        const isChange = oldValue !== newValue
        if (!beforeRowMethod || beforeRowMethod({ column: newValue, $table: $xeTable })) {
          $xeTable.setCurrentColumn(newValue)
          if (isChange) {
            dispatchEvent('current-column-change', { oldValue, newValue, ...params }, evnt)
          }
        } else {
          dispatchEvent('current-column-disabled', params, evnt)
        }
      },
      triggerCurrentRowEvent (evnt, params) {
        const { currentRow: oldValue } = reactData
        const rowOpts = computeRowOpts.value
        const currentRowOpts = computeCurrentRowOpts.value
        const beforeRowMethod = currentRowOpts.beforeSelectMethod || rowOpts.currentMethod as any
        const { row: newValue } = params
        const { trigger } = currentRowOpts
        if (trigger === 'manual') {
          return
        }
        const isChange = oldValue !== newValue
        if (!beforeRowMethod || beforeRowMethod({ row: newValue, $table: $xeTable })) {
          $xeTable.setCurrentRow(newValue)
          if (isChange) {
            dispatchEvent('current-row-change', { oldValue, newValue, ...params }, evnt)
            // 已废弃
            dispatchEvent('current-change', { oldValue, newValue, ...params }, evnt)
          }
        } else {
          dispatchEvent('current-row-disabled', params, evnt)
        }
      },
      /**
       * 展开行事件
       */
      triggerRowExpandEvent (evnt, params) {
        const { expandColumn } = reactData
        const { rowExpandLazyLoadedMaps } = internalData
        const expandOpts = computeExpandOpts.value
        const { row } = params
        const { lazy, trigger } = expandOpts
        if (trigger === 'manual') {
          return
        }
        evnt.stopPropagation()
        const rowid = getRowid($xeTable, row)
        if (!lazy || !rowExpandLazyLoadedMaps[rowid]) {
          const expanded = !$xeTable.isRowExpandByRow(row)
          const columnIndex = expandColumn ? $xeTable.getColumnIndex(expandColumn) : -1
          const $columnIndex = expandColumn ? $xeTable.getVMColumnIndex(expandColumn) : -1
          $xeTable.setRowExpand(row, expanded)
          dispatchEvent('toggle-row-expand', {
            expanded,
            column: expandColumn,
            columnIndex,
            $columnIndex,
            row,
            rowIndex: $xeTable.getRowIndex(row),
            $rowIndex: $xeTable.getVMRowIndex(row)
          }, evnt)
        }
      },
      /**
       * 行分组事件
       */
      triggerRowGroupExpandEvent (evnt, params) {
        const { rowGroupExpandedMaps } = internalData
        const aggregateOpts = computeAggregateOpts.value
        const { row, column } = params
        const { trigger } = aggregateOpts
        if (trigger === 'manual') {
          return
        }
        evnt.stopPropagation()
        const rowid = getRowid($xeTable, row)
        const expanded = !rowGroupExpandedMaps[rowid]
        const columnIndex = $xeTable.getColumnIndex(column)
        const $columnIndex = $xeTable.getVMColumnIndex(column)
        $xeTable.setRowGroupExpand(row, expanded)
        dispatchEvent('toggle-row-group-expand', { expanded, column, columnIndex, $columnIndex, row }, evnt)
      },
      /**
       * 展开树节点事件
       */
      triggerTreeExpandEvent (evnt, params) {
        const { treeExpandLazyLoadedMaps, treeEATime } = internalData
        const treeOpts = computeTreeOpts.value
        const { row, column } = params
        const { lazy, trigger, accordion } = treeOpts
        if (trigger === 'manual') {
          return
        }
        evnt.stopPropagation()
        const rowid = getRowid($xeTable, row)
        if (!lazy || !treeExpandLazyLoadedMaps[rowid]) {
          const expanded = !$xeTable.isTreeExpandByRow(row)
          const columnIndex = $xeTable.getColumnIndex(column)
          const $columnIndex = $xeTable.getVMColumnIndex(column)
          if (treeEATime) {
            clearTimeout(treeEATime)
          }
          $xeTable.setTreeExpand(row, expanded).then(() => {
            if (accordion) {
              internalData.treeEATime = setTimeout(() => {
                internalData.treeEATime = undefined
                $xeTable.scrollToRow(row)
              }, 30)
            }
          })
          dispatchEvent('toggle-tree-expand', { expanded, column, columnIndex, $columnIndex, row }, evnt)
        }
      },
      handleColumnSortEvent (evnt, column) {
        const { mouseConfig } = props
        const mouseOpts = computeMouseOpts.value
        const { field, sortable, order } = column
        if (sortable) {
          const params = { $table: $xeTable, $event: evnt, column, field, property: field, order, sortList: tableMethods.getSortColumns(), sortTime: column.sortTime }
          if (mouseConfig && mouseOpts.area && $xeTable.handleSortEvent) {
            $xeTable.handleSortEvent(evnt, params)
          }
          if (!order) {
            dispatchEvent('clear-sort', params, evnt)
          }
          dispatchEvent('sort-change', params, evnt)
        }
      },
      /**
       * 点击排序事件
       */
      triggerSortEvent (evnt, column, order) {
        const sortOpts = computeSortOpts.value
        const { multiple, allowClear } = sortOpts
        const { field, sortable } = column
        if (sortable) {
          if (!order || column.order === order) {
            if (allowClear) {
              $xeTable.clearSort(multiple ? column : null)
            }
          } else {
            $xeTable.sort({ field, order })
          }
          $xeTable.handleColumnSortEvent(evnt, column)
        }
      },
      handleCellRuleUpdateStatus (type, cellParams, cellValue) {
        const { validStore } = reactData
        const { row, column } = cellParams
        if ($xeTable.hasCellRules) {
          if ($xeTable.hasCellRules(type, row, column)) {
            const cell = $xeTable.getCellElement(row, column)
            if (cell) {
              const customVal = !XEUtils.isUndefined(cellValue)
              return $xeTable.validCellRules(type, row, column, cellValue)
                .then(() => {
                  if (customVal && validStore.visible) {
                    setCellValue(row, column, cellValue)
                  }
                  $xeTable.clearValidate(row, column)
                })
                .catch(({ rule }: any) => {
                  if (customVal) {
                    setCellValue(row, column, cellValue)
                  }
                  $xeTable.showValidTooltip({ rule, row, column, cell })
                })
            }
          }
        }
        return nextTick()
      },
      /**
       * 表头单元格按下事件
       */
      triggerHeaderCellMousedownEvent (evnt, params) {
        const { mouseConfig } = props
        const mouseOpts = computeMouseOpts.value
        const columnOpts = computeColumnOpts.value
        const columnDragOpts = computeColumnDragOpts.value
        const { trigger, isCrossDrag, isPeerDrag, disabledMethod } = columnDragOpts
        const cell = evnt.currentTarget as HTMLDivElement
        const triggerInput = cell && cell.tagName && cell.tagName.toLowerCase() === 'input'
        const triggerCheckbox = getEventTargetNode(evnt, cell, 'vxe-cell--checkbox').flag
        const triggerSort = getEventTargetNode(evnt, cell, 'vxe-cell--sort').flag
        const triggerFilter = getEventTargetNode(evnt, cell, 'vxe-cell--filter').flag
        let triggerDrag = false
        const isColDragCell = columnOpts.drag && trigger === 'cell'
        if (!(triggerInput || triggerCheckbox || triggerSort || triggerFilter)) {
          const { column } = params
          if (isColDragCell && !column.fixed && (isCrossDrag || isPeerDrag || !column.parentId) && !(disabledMethod && disabledMethod(params))) {
            triggerDrag = true
            $xeTable.handleHeaderCellDragMousedownEvent(evnt, params)
          }
        }
        if (!triggerDrag && mouseConfig && mouseOpts.area && $xeTable.handleHeaderCellAreaEvent) {
          $xeTable.handleHeaderCellAreaEvent(evnt, Object.assign({ cell, triggerSort, triggerFilter }, params))
        }
        $xeTable.focus()
        if ($xeTable.closeMenu) {
          $xeTable.closeMenu()
        }
      },
      /**
       * 单元格按下事件
       */
      triggerCellMousedownEvent (evnt, params) {
        const { column } = params
        const { type, treeNode } = column
        const isRadioType = type === 'radio'
        const isCheckboxType = type === 'checkbox'
        const isExpandType = type === 'expand'
        const rowOpts = computeRowOpts.value
        const rowDragOpts = computeRowDragOpts.value
        const { trigger, isCrossDrag, isPeerDrag, disabledMethod } = rowDragOpts
        const cell = evnt.currentTarget as HTMLElement
        params.cell = cell
        const triggerInput = cell && cell.tagName && cell.tagName.toLowerCase() === 'input'
        const triggerRadio = isRadioType && getEventTargetNode(evnt, cell, 'vxe-cell--radio').flag
        const triggerCheckbox = isCheckboxType && getEventTargetNode(evnt, cell, 'vxe-cell--checkbox').flag
        const triggerTreeNode = treeNode && getEventTargetNode(evnt, cell, 'vxe-cell--tree-btn').flag
        const triggerExpandNode = isExpandType && getEventTargetNode(evnt, cell, 'vxe-table--expanded').flag
        let isColDragCell = false
        if (rowOpts.drag) {
          isColDragCell = trigger === 'row' || (column.dragSort && trigger === 'cell')
        }
        let triggerDrag = false
        if (!(triggerInput || triggerRadio || triggerCheckbox || triggerTreeNode || triggerExpandNode)) {
          if (isColDragCell && (isCrossDrag || isPeerDrag || !params.level) && !(disabledMethod && disabledMethod(params))) {
            triggerDrag = true
            $xeTable.handleCellDragMousedownEvent(evnt, params)
          }
        }
        if (!triggerDrag && $xeTable.handleCellMousedownEvent) {
          $xeTable.handleCellMousedownEvent(evnt, params)
        }
        $xeTable.focus()
        $xeTable.closeFilter()
        if ($xeTable.closeMenu) {
          $xeTable.closeMenu()
        }
      },
      triggerCellMouseupEvent () {
        clearDragStatus()
      },
      /**
       * 行拖拽
       */
      handleRowDragDragstartEvent (evnt) {
        if (evnt.dataTransfer) {
          evnt.dataTransfer.setDragImage(getTpImg(), 0, 0)
        }
      },
      handleRowDragSwapEvent (evnt, isSyncRow, dragRow, prevDragRow, prevDragPos, prevDragToChild) {
        const { treeConfig, dragConfig } = props
        const rowDragOpts = computeRowDragOpts.value
        const { afterFullData, tableFullData, fullAllDataRowIdData } = internalData
        const { animation, isPeerDrag, isCrossDrag, isSelfToChildDrag, dragEndMethod, dragToChildMethod } = rowDragOpts
        const treeOpts = computeTreeOpts.value
        const cellOpts = computeCellOpts.value
        const rowOpts = computeRowOpts.value
        const defaultRowHeight = computeDefaultRowHeight.value
        const { transform, rowField, mapChildrenField, parentField } = treeOpts
        const childrenField = treeOpts.children || treeOpts.childrenField
        const dEndMethod = dragEndMethod || (dragConfig ? dragConfig.dragEndMethod : null)
        const dragOffsetIndex = prevDragPos === 'bottom' ? 1 : 0
        const el = refElem.value
        const errRest = {
          status: false
        }
        if (!(el && prevDragRow && dragRow)) {
          return Promise.resolve(errRest)
        }
        // 判断是否有拖动
        if (prevDragRow !== dragRow) {
          const dragParams = {
            oldRow: dragRow,
            newRow: prevDragRow,
            dragRow,
            dragPos: prevDragPos as 'top' | 'bottom',
            dragToChild: !!prevDragToChild,
            offsetIndex: dragOffsetIndex as 0 | 1
          }
          const isDragToChildFlag = isSelfToChildDrag && dragToChildMethod ? dragToChildMethod(dragParams) : prevDragToChild
          return Promise.resolve(dEndMethod ? dEndMethod(dragParams) : true).then((status) => {
            if (!status) {
              return errRest
            }

            const dragRowid = getRowid($xeTable, dragRow)
            const dragRowRest = fullAllDataRowIdData[dragRowid] || {}
            const _dragRowIndex = dragRowRest._index
            let dragRowHeight = 0
            let dragOffsetTop = -1
            if (animation) {
              dragRowHeight = getCellRestHeight(dragRowRest, cellOpts, rowOpts, defaultRowHeight)
              const oldTrEl = el.querySelector<HTMLElement>(`.vxe-body--row[rowid="${dragRowid}"]`)
              if (oldTrEl) {
                dragOffsetTop = oldTrEl.offsetTop
              }
            }

            let oafIndex = -1
            let nafIndex = -1
            // 如果为树结构
            if (treeConfig) {
              if (transform) {
                // 移出源位置
                const oldRest = dragRowRest
                const newRowid = getRowid($xeTable, prevDragRow)
                const newRest = fullAllDataRowIdData[newRowid]

                if (oldRest && newRest) {
                  const { level: oldLevel } = oldRest
                  const { level: newLevel } = newRest

                  const oldAllMaps: Record<string, any> = {}
                  XEUtils.eachTree([dragRow], item => {
                    oldAllMaps[getRowid($xeTable, item)] = item
                  }, { children: mapChildrenField })

                  let isSelfToChildStatus = false

                  if (oldLevel && newLevel) {
                    // 子到子

                    if (isPeerDrag && !isCrossDrag) {
                      if (oldRest.row[parentField] !== newRest.row[parentField]) {
                        // 非同级
                        return errRest
                      }
                    } else {
                      if (!isCrossDrag) {
                        return errRest
                      }
                      if (oldAllMaps[newRowid]) {
                        isSelfToChildStatus = true
                        if (!(isCrossDrag && isSelfToChildDrag)) {
                          if (VxeUI.modal) {
                            VxeUI.modal.message({
                              status: 'error',
                              content: getI18n('vxe.error.treeDragChild')
                            })
                          }
                          return errRest
                        }
                      }
                    }
                  } else if (oldLevel) {
                    // 子到根

                    if (!isCrossDrag) {
                      return errRest
                    }
                  } else if (newLevel) {
                    // 根到子

                    if (!isCrossDrag) {
                      return errRest
                    }
                    if (oldAllMaps[newRowid]) {
                      isSelfToChildStatus = true
                      if (!(isCrossDrag && isSelfToChildDrag)) {
                        if (VxeUI.modal) {
                          VxeUI.modal.message({
                            status: 'error',
                            content: getI18n('vxe.error.treeDragChild')
                          })
                        }
                        return errRest
                      }
                    }
                  } else {
                    // 根到根
                  }

                  const fullList = XEUtils.toTreeArray(internalData.afterTreeFullData, {
                    key: rowField,
                    parentKey: parentField,
                    children: mapChildrenField
                  })

                  // 移出
                  const otfIndex = $xeTable.findRowIndexOf(fullList, dragRow)
                  fullList.splice(otfIndex, 1)

                  // 插入
                  const ptfIndex = $xeTable.findRowIndexOf(fullList, prevDragRow)
                  const ntfIndex = ptfIndex + dragOffsetIndex
                  fullList.splice(ntfIndex, 0, dragRow)

                  // 改变层级
                  if (isSelfToChildStatus && (isCrossDrag && isSelfToChildDrag)) {
                    XEUtils.each(dragRow[childrenField], childRow => {
                      childRow[parentField] = dragRow[parentField]
                    })
                  }
                  dragRow[parentField] = isDragToChildFlag ? prevDragRow[rowField] : prevDragRow[parentField]

                  internalData.tableFullTreeData = XEUtils.toArrayTree(fullList, {
                    key: rowField,
                    parentKey: parentField,
                    children: childrenField,
                    mapChildren: mapChildrenField
                  })
                }
              }
            } else {
              // 移出
              oafIndex = $xeTable.findRowIndexOf(afterFullData, dragRow)
              const otfIndex = $xeTable.findRowIndexOf(tableFullData, dragRow)
              afterFullData.splice(oafIndex, 1)
              tableFullData.splice(otfIndex, 1)
              // 插入
              const pafIndex = $xeTable.findRowIndexOf(afterFullData, prevDragRow)
              const ptfIndex = $xeTable.findRowIndexOf(tableFullData, prevDragRow)
              nafIndex = pafIndex + dragOffsetIndex
              const ntfIndex = ptfIndex + dragOffsetIndex
              afterFullData.splice(nafIndex, 0, dragRow)
              tableFullData.splice(ntfIndex, 0, dragRow)
            }

            $xeTable.handleTableData(treeConfig && transform)
            $xeTable.cacheRowMap(false)
            updateScrollYStatus()
            if (!(treeConfig && transform)) {
              $xeTable.updateAfterDataIndex()
            }
            $xeTable.checkSelectionStatus()
            if (reactData.scrollYLoad) {
              $xeTable.updateScrollYSpace()
            }

            if (evnt) {
              dispatchEvent('row-dragend', {
                oldRow: dragRow,
                newRow: prevDragRow,
                dragRow,
                dragPos: prevDragPos as any,
                dragToChild: isDragToChildFlag,
                offsetIndex: dragOffsetIndex,
                _index: {
                  newIndex: nafIndex,
                  oldIndex: oafIndex
                }
              }, evnt)
            }

            return nextTick().then(() => {
              if (animation) {
                const { tableData } = reactData
                const dragRowRest = fullAllDataRowIdData[dragRowid]
                const _newRowIndex = dragRowRest._index
                const firstRow = tableData[0]
                const firstRowRest = fullAllDataRowIdData[getRowid($xeTable, firstRow)]

                if (firstRowRest) {
                  const _firstRowIndex = firstRowRest._index
                  const _lastRowIndex = _firstRowIndex + tableData.length

                  let rsIndex = -1
                  let reIndex = -1
                  let offsetRate = 1
                  if (_dragRowIndex < _firstRowIndex) {
                    // 从上往下虚拟拖拽
                    rsIndex = 0
                    reIndex = _newRowIndex - _firstRowIndex
                  } else if (_dragRowIndex > _lastRowIndex) {
                    // 从下往上虚拟拖拽
                    const $newRowIndex = dragRowRest.$index
                    rsIndex = $newRowIndex + 1
                    reIndex = tableData.length
                    offsetRate = -1
                  } else {
                    if (_newRowIndex > _dragRowIndex) {
                      // 从上往下拖拽
                      rsIndex = _dragRowIndex - _firstRowIndex
                      reIndex = rsIndex + _newRowIndex - _dragRowIndex
                    } else {
                      // 从下往上拖拽
                      rsIndex = _newRowIndex - _firstRowIndex
                      reIndex = rsIndex + _dragRowIndex - _newRowIndex + 1
                      offsetRate = -1
                    }
                  }

                  const dragRangeList = tableData.slice(rsIndex, reIndex)
                  if (dragRangeList.length) {
                    const dtTrList = el.querySelectorAll<HTMLElement>(dragRangeList.map(row => `.vxe-body--row[rowid="${getRowid($xeTable, row)}"]`).join(','))
                    moveRowAnimateToTb(dtTrList, offsetRate * dragRowHeight)
                  }
                }

                const newTrList = el.querySelectorAll<HTMLElement>(`.vxe-body--row[rowid="${dragRowid}"]`)
                const newTrEl = newTrList[0]
                if (dragOffsetTop > -1 && newTrEl) {
                  moveRowAnimateToTb(newTrList, dragOffsetTop - newTrEl.offsetTop)
                }
              }

              updateRowOffsetTop()
              updateRowExpandStyle()
              $xeTable.updateCellAreas()
              $xeTable.recalculate()
            }).then(() => {
              return {
                status: true
              }
            })
          }).catch(() => {
            return errRest
          })
        }
        return Promise.resolve(errRest)
      },
      handleRowDragDragendEvent (evnt) {
        const { treeConfig } = props
        const { fullAllDataRowIdData, prevDragToChild } = internalData
        const { dragRow } = reactData
        const treeOpts = computeTreeOpts.value
        const { lazy } = treeOpts
        const hasChildField = treeOpts.hasChild || treeOpts.hasChildField
        const { prevDragRow, prevDragPos } = internalData
        const el = refElem.value
        if (treeConfig && lazy && prevDragToChild) {
          // 懒加载
          const newRowid = getRowid($xeTable, prevDragRow)
          const rowRest = fullAllDataRowIdData[newRowid]
          if (prevDragRow[hasChildField]) {
            if (rowRest && rowRest.treeLoaded) {
              $xeTable.handleRowDragSwapEvent(evnt, true, dragRow, prevDragRow, prevDragPos, prevDragToChild)
            }
          } else {
            $xeTable.handleRowDragSwapEvent(evnt, true, dragRow, prevDragRow, prevDragPos, prevDragToChild)
          }
        } else {
          $xeTable.handleRowDragSwapEvent(evnt, true, dragRow, prevDragRow, prevDragPos, prevDragToChild)
        }
        hideDropTip()
        clearRowDropOrigin()
        clearRowAnimate(el)
        internalData.prevDragToChild = false
        reactData.dragRow = null
        reactData.dragCol = null
      },
      handleRowDragDragoverEvent (evnt) {
        const { treeConfig } = props
        const { fullAllDataRowIdData } = internalData
        const { dragRow } = reactData
        const treeOpts = computeTreeOpts.value
        const { lazy, transform, parentField } = treeOpts
        const hasChildField = treeOpts.hasChild || treeOpts.hasChildField
        const rowDragOpts = computeRowDragOpts.value
        const { isPeerDrag, isCrossDrag, isToChildDrag } = rowDragOpts
        if (!dragRow) {
          evnt.preventDefault()
          return
        }
        const isControlKey = hasControlKey(evnt)
        const trEl = evnt.currentTarget as HTMLElement
        const rowid = trEl.getAttribute('rowid') || ''
        const rest = fullAllDataRowIdData[rowid]
        if (rest) {
          const row = rest.row
          const rowid = getRowid($xeTable, row)
          const rowRest = fullAllDataRowIdData[rowid]
          evnt.preventDefault()
          const { dragRow } = reactData
          const offsetY = evnt.clientY - trEl.getBoundingClientRect().y
          const dragPos = offsetY < trEl.clientHeight / 2 ? 'top' : 'bottom'
          internalData.prevDragToChild = !!(treeConfig && transform && (isCrossDrag && isToChildDrag) && isControlKey)
          internalData.prevDragRow = row
          internalData.prevDragPos = dragPos
          if ($xeTable.eqRow(dragRow, row) ||
            (isControlKey && treeConfig && lazy && row[hasChildField] && rowRest && !rowRest.treeLoaded) ||
            (!isCrossDrag && treeConfig && transform && (isPeerDrag ? dragRow[parentField] !== row[parentField] : rest.level))
          ) {
            showDropTip(evnt, trEl, null, false, dragPos)
            return
          }
          showDropTip(evnt, trEl, null, true, dragPos)
          dispatchEvent('row-dragover', {
            oldRow: dragRow,
            targetRow: row,
            dragPos
          }, evnt)
        }
      },
      handleCellDragMousedownEvent (evnt, params) {
        evnt.stopPropagation()
        const { dragConfig } = props
        const rowDragOpts = computeRowDragOpts.value
        const { trigger, dragStartMethod } = rowDragOpts
        const { row } = params
        const dragEl = evnt.currentTarget as HTMLElement
        const tdEl = trigger === 'cell' || trigger === 'row' ? dragEl : dragEl.parentElement?.parentElement as HTMLElement
        const trEl = tdEl.parentElement as HTMLElement
        const dStartMethod = dragStartMethod || (dragConfig ? dragConfig.dragStartMethod : null)
        clearRowDropOrigin()
        if (dStartMethod && !dStartMethod(params)) {
          trEl.draggable = false
          reactData.dragRow = null
          reactData.dragCol = null
          hideDropTip()
          return
        }
        reactData.dragRow = row
        reactData.dragCol = null
        trEl.draggable = true
        updateRowDropOrigin(row)
        updateRowDropTipContent(tdEl)
        dispatchEvent('row-dragstart', params, evnt)
      },
      handleCellDragMouseupEvent () {
        clearDragStatus()
      },
      /**
       * 列拖拽
       */
      handleHeaderCellDragDragstartEvent (evnt) {
        if (evnt.dataTransfer) {
          evnt.dataTransfer.setDragImage(getTpImg(), 0, 0)
        }
      },
      handleColDragSwapColumn () {
        handleUpdateColumn()
        return parseColumns(false).then(() => {
          $xeTable.updateCellAreas()
          $xeTable.saveCustomStore('update:sort')
        })
      },
      handleColDragSwapEvent (evnt, isSyncColumn, dragCol, prevDragCol, prevDragPos, prevDragToChild) {
        const { mouseConfig } = props
        const columnDragOpts = computeColumnDragOpts.value
        const { animation, isPeerDrag, isCrossDrag, isSelfToChildDrag, isToChildDrag, dragEndMethod, dragToChildMethod } = columnDragOpts
        const { collectColumn, fullColumnIdData } = internalData
        const el = refElem.value
        const dragOffsetIndex = prevDragPos === 'right' ? 1 : 0
        const errRest = {
          status: false
        }
        if (!(el && prevDragCol && dragCol)) {
          return Promise.resolve(errRest)
        }
        // 判断是否有拖动
        if (prevDragCol !== dragCol) {
          const dragColumn = dragCol
          const newColumn = prevDragCol
          const dragParams = {
            oldColumn: dragColumn,
            newColumn,
            dragColumn,
            dragPos: prevDragPos as 'left' | 'right',
            dragToChild: !!prevDragToChild,
            offsetIndex: dragOffsetIndex as 0 | 1
          }
          const isDragToChildFlag = isSelfToChildDrag && dragToChildMethod ? dragToChildMethod(dragParams) : prevDragToChild
          return Promise.resolve(dragEndMethod ? dragEndMethod(dragParams) : true).then((status) => {
            if (!status) {
              return errRest
            }

            let dragTargetColumn: VxeTableDefines.ColumnInfo | null = null
            const dragAllTargetCols: VxeTableDefines.ColumnInfo[] = []
            let dragColWidth = 0
            if (animation) {
              XEUtils.eachTree([dragColumn], column => {
                if (!dragTargetColumn && (!column.children || !column.children.length)) {
                  dragTargetColumn = column
                  dragColWidth += column.renderWidth
                }
                dragAllTargetCols.push(column)
              })
            }
            if (!dragTargetColumn) {
              dragTargetColumn = dragColumn
            }
            const dragColRest = fullColumnIdData[dragTargetColumn.id] || {}
            const _dragColIndex = dragColRest._index

            let dragOffsetLeft = -1
            if (animation) {
              const oldTrEl = el.querySelector<HTMLElement>(`.vxe-table--column[colid="${dragTargetColumn.id}"]`)
              if (oldTrEl) {
                dragOffsetLeft = oldTrEl.offsetLeft
              }
            }

            let oafIndex = -1
            let nafIndex = -1

            const oldAllMaps: Record<string, any> = {}
            XEUtils.eachTree([dragColumn], column => {
              oldAllMaps[column.id] = column
            })

            let isSelfToChildStatus = false

            if (dragColumn.parentId && newColumn.parentId) {
              // 子到子

              if (isPeerDrag && !isCrossDrag) {
                if (dragColumn.parentId !== newColumn.parentId) {
                  // 非同级
                  return errRest
                }
              } else {
                if (!isCrossDrag) {
                  return errRest
                }

                if (oldAllMaps[newColumn.id]) {
                  isSelfToChildStatus = true
                  if (!(isCrossDrag && isSelfToChildDrag)) {
                    if (VxeUI.modal) {
                      VxeUI.modal.message({
                        status: 'error',
                        content: getI18n('vxe.error.treeDragChild')
                      })
                    }
                    return errRest
                  }
                }
              }
            } else if (dragColumn.parentId) {
              // 子到根

              if (!isCrossDrag) {
                return errRest
              }
            } else if (newColumn.parentId) {
              // 根到子

              if (!isCrossDrag) {
                return errRest
              }
              if (oldAllMaps[newColumn.id]) {
                isSelfToChildStatus = true
                if (!(isCrossDrag && isSelfToChildDrag)) {
                  if (VxeUI.modal) {
                    VxeUI.modal.message({
                      status: 'error',
                      content: getI18n('vxe.error.treeDragChild')
                    })
                  }
                  return errRest
                }
              }
            } else {
              // 根到根
            }

            const oldewMatchRest = XEUtils.findTree(collectColumn, item => item.id === dragColumn.id)

            // 改变层级
            if (isSelfToChildStatus && (isCrossDrag && isSelfToChildDrag)) {
              if (oldewMatchRest) {
                const { items: oCols, index: oIndex } = oldewMatchRest
                const childList = dragColumn.children || []
                childList.forEach(column => {
                  column.parentId = dragColumn.parentId
                })
                oCols.splice(oIndex, 1, ...childList)
                dragColumn.children = []
              }
            } else {
              if (oldewMatchRest) {
                const { items: oCols, index: oIndex, parent: oParent } = oldewMatchRest
                oCols.splice(oIndex, 1)
                if (!oParent) {
                  oafIndex = oIndex
                }
              }
            }

            const newMatchRest = XEUtils.findTree(collectColumn, item => item.id === newColumn.id)
            if (newMatchRest) {
              const { items: nCols, index: nIndex, parent: nParent } = newMatchRest
              // 转子级
              if ((isCrossDrag && isToChildDrag) && isDragToChildFlag) {
                dragColumn.parentId = newColumn.id
                newColumn.children = (newColumn.children || []).concat([dragColumn])
              } else {
                dragColumn.parentId = newColumn.parentId
                nCols.splice(nIndex + dragOffsetIndex, 0, dragColumn)
              }
              if (!nParent) {
                nafIndex = nIndex
              }
            }

            XEUtils.eachTree(collectColumn, (column, index, items, path, parentColumn) => {
              if (!parentColumn) {
                const sortIndex = index + 1
                column.renderSortNumber = sortIndex
              }
            })

            if (mouseConfig) {
              if ($xeTable.clearSelected) {
                $xeTable.clearSelected()
              }
              if ($xeTable.clearCellAreas) {
                $xeTable.clearCellAreas()
                $xeTable.clearCopyCellArea()
              }
            }

            if (evnt) {
              dispatchEvent('column-dragend', {
                oldColumn: dragColumn,
                newColumn,
                dragColumn,
                dragPos: prevDragPos,
                dragToChild: isDragToChildFlag,
                offsetIndex: dragOffsetIndex,
                _index: {
                  newIndex: nafIndex,
                  oldIndex: oafIndex
                }
              }, evnt)
            }

            return nextTick().then(() => {
              if (isSyncColumn) {
                return $xeTable.handleColDragSwapColumn()
              }
            }).then(() => {
              if (animation) {
                const { tableColumn } = reactData
                const { visibleColumn, fullColumnIdData } = internalData
                let dragNewColumn: VxeTableDefines.ColumnInfo | null = null
                const dragNewColMaps: Record<string, VxeTableDefines.ColumnInfo> = {}
                XEUtils.eachTree([dragColumn], column => {
                  if (!dragNewColumn && (!column.children || !column.children.length)) {
                    dragNewColumn = column
                  }
                  dragNewColMaps[column.id] = column
                })
                if (!dragNewColumn) {
                  dragNewColumn = dragColumn
                }

                if (dragColWidth && dragAllTargetCols.length) {
                  const _newColIndex = XEUtils.findIndexOf(visibleColumn, column => !!dragNewColumn && column.id === dragNewColumn.id)
                  const firstCol = tableColumn[0]
                  const firstColRest = fullColumnIdData[firstCol.id]

                  if (firstColRest) {
                    const _firstColIndex = firstColRest._index
                    const _lastColIndex = _firstColIndex + tableColumn.length
                    let csIndex = -1
                    let ceIndex = -1
                    let offsetRate = 1
                    if (_dragColIndex < _firstColIndex) {
                      // 从左往右虚拟拖拽
                      csIndex = 0
                      ceIndex = _newColIndex - _firstColIndex
                    } else if (_dragColIndex > _lastColIndex) {
                      // 从右往左虚拟拖拽
                      const $newRowIndex = dragColRest.$index
                      csIndex = $newRowIndex + 1
                      ceIndex = tableColumn.length
                      offsetRate = -1
                    } else {
                      if (_newColIndex > _dragColIndex) {
                        // 从左往右拖拽
                        csIndex = _dragColIndex - _firstColIndex
                        ceIndex = csIndex + _newColIndex - _dragColIndex
                      } else {
                        // 从右往左拖拽
                        csIndex = _newColIndex - _firstColIndex + 1
                        ceIndex = csIndex + _dragColIndex - _newColIndex
                        offsetRate = -1
                      }
                    }

                    const dragRangeList: VxeTableDefines.ColumnInfo[] = []
                    const dragRangeMaps: Record<string, VxeTableDefines.ColumnInfo> = {}
                    for (let i = csIndex; i < ceIndex; i++) {
                      const column = tableColumn[i]
                      if (!dragRangeMaps[column.id] && !dragNewColMaps[column.id]) {
                        dragRangeMaps[column.id] = column
                        dragRangeList.push(column)
                      }
                    }
                    XEUtils.eachTree([newColumn], column => {
                      if (!dragRangeMaps[column.id]) {
                        dragRangeMaps[column.id] = column
                        dragRangeList.push(column)
                      }
                    })
                    if (dragRangeList.length) {
                      const dtTrList = el.querySelectorAll<HTMLElement>(dragRangeList.map(column => `.vxe-table--column[colid="${column.id}"]`).join(','))
                      moveColAnimateToLr(dtTrList, offsetRate * dragColWidth)
                    }
                  }

                  const newTrList = el.querySelectorAll<HTMLElement>(dragAllTargetCols.map(column => `.vxe-table--column[colid="${column.id}"]`).join(','))
                  const newTdEl = newTrList[0]
                  if (dragOffsetLeft > -1 && newTdEl) {
                    moveColAnimateToLr(newTrList, dragOffsetLeft - newTdEl.offsetLeft)
                  }
                }
              }

              updateColumnOffsetLeft()
              loadScrollXData()
              $xeTable.updateCellAreas()

              return {
                status: true
              }
            })
          }).catch(() => {
            return errRest
          })
        }
        return Promise.resolve(errRest)
      },
      handleHeaderCellDragDragendEvent (evnt) {
        const { dragCol } = reactData
        const { prevDragCol, prevDragPos, prevDragToChild } = internalData
        const el = refElem.value
        $xeTable.handleColDragSwapEvent(evnt, true, dragCol, prevDragCol, prevDragPos, prevDragToChild)
        hideDropTip()
        clearColDropOrigin()
        clearColAnimate(el)
        internalData.prevDragToChild = false
        reactData.dragRow = null
        reactData.dragCol = null
      },
      handleHeaderCellDragDragoverEvent (evnt) {
        const { dragCol } = reactData
        const columnDragOpts = computeColumnDragOpts.value
        const { isToChildDrag, isPeerDrag, isCrossDrag } = columnDragOpts
        if (!dragCol) {
          evnt.preventDefault()
          return
        }
        const isControlKey = hasControlKey(evnt)
        const thEl = evnt.currentTarget as HTMLElement
        const colid = thEl.getAttribute('colid')
        const column = $xeTable.getColumnById(colid)
        if (column) {
          evnt.preventDefault()
          const { clientX } = evnt
          const offsetX = clientX - thEl.getBoundingClientRect().x
          const dragPos = offsetX < thEl.clientWidth / 2 ? 'left' : 'right'
          internalData.prevDragToChild = !!((isCrossDrag && isToChildDrag) && isControlKey)
          internalData.prevDragCol = column
          internalData.prevDragPos = dragPos
          if (column.fixed ||
            (dragCol && dragCol.id === column.id) ||
            (!isCrossDrag && (isPeerDrag ? dragCol.parentId !== column.parentId : column.parentId))
          ) {
            showDropTip(evnt, null, thEl, false, dragPos)
            return
          }
          showDropTip(evnt, null, thEl, true, dragPos)
          dispatchEvent('column-dragover', {
            oldColumn: dragCol,
            targetColumn: column,
            dragPos
          }, evnt)

          // 边缘滚动
          const el = refElem.value
          if (!el) {
            return
          }
          const xHandleEl = refScrollXHandleElem.value
          const tableBody = refTableBody.value
          const tableBodyElem = tableBody ? tableBody.$el as HTMLDivElement : null
          const scrollTargetEl = xHandleEl || tableBodyElem
          if (scrollTargetEl) {
            const wrapperRect = el.getBoundingClientRect()
            const tableWrapperWidth = el.clientWidth
            const leftContainerElem = refLeftContainer.value
            const leftContainerWidth = leftContainerElem ? leftContainerElem.clientWidth : 0
            const rightContainerElem = refRightContainer.value
            const rightContainerWidth = rightContainerElem ? rightContainerElem.clientWidth : 0
            const srartX = wrapperRect.x + leftContainerWidth
            const endX = wrapperRect.x + tableWrapperWidth - rightContainerWidth
            const distSize = 28
            const startDistSize = clientX - srartX
            const endDistSize = endX - clientX
            if (startDistSize > 0 && startDistSize <= distSize) {
              const scrollRatio = Math.floor(tableWrapperWidth / (startDistSize > distSize / 2 ? 240 : 120))
              scrollTargetEl.scrollLeft -= scrollRatio * (distSize - startDistSize)
            } else if (endDistSize > 0 && endDistSize <= distSize) {
              const scrollRatio = Math.floor(tableWrapperWidth / (endDistSize > distSize / 2 ? 240 : 120))
              scrollTargetEl.scrollLeft += scrollRatio * (distSize - endDistSize)
            }
          }
        }
      },
      handleHeaderCellDragMousedownEvent (evnt, params) {
        evnt.stopPropagation()
        const columnDragOpts = computeColumnDragOpts.value
        const { trigger, dragStartMethod } = columnDragOpts
        const { column } = params
        const dragEl = evnt.currentTarget as HTMLElement
        const thEl = trigger === 'cell' ? dragEl : dragEl.parentElement?.parentElement as HTMLElement
        clearColDropOrigin()
        if (dragStartMethod && !dragStartMethod(params)) {
          thEl.draggable = false
          reactData.dragRow = null
          reactData.dragCol = null
          hideDropTip()
          return
        }
        reactData.dragCol = column
        reactData.dragRow = null
        thEl.draggable = true
        updateColDropOrigin(column)
        updateColDropTipContent(thEl)
        dispatchEvent('column-dragstart', params, evnt)
      },
      handleHeaderCellDragMouseupEvent () {
        clearColDropOrigin()
        hideDropTip()
        reactData.dragRow = null
        reactData.dragCol = null
      },
      handleScrollEvent (evnt, isRollY, isRollX, scrollTop, scrollLeft, params) {
        const { highlightHoverRow } = props
        const { lastScrollLeft, lastScrollTop } = internalData
        const xHandleEl = refScrollXHandleElem.value
        const yHandleEl = refScrollYHandleElem.value
        if (!xHandleEl || !yHandleEl) {
          return
        }
        const rowOpts = computeRowOpts.value
        const validTip = refValidTooltip.value
        const tooltip = refTooltip.value
        const bodyHeight = yHandleEl.clientHeight
        const bodyWidth = xHandleEl.clientWidth
        const scrollHeight = yHandleEl.scrollHeight
        const scrollWidth = xHandleEl.scrollWidth
        let isTop = false
        let isBottom = false
        let isLeft = false
        let isRight = false
        let direction = ''
        let isTopBoundary = false
        let isBottomBoundary = false
        let isLeftBoundary = false
        let isRightBoundary = false
        if (isRollX) {
          const xThreshold = computeScrollXThreshold.value
          isLeft = scrollLeft <= 0
          if (!isLeft) {
            isRight = scrollLeft + bodyWidth >= scrollWidth
          }
          if (scrollLeft > lastScrollLeft) {
            direction = 'right'
            if (scrollLeft + bodyWidth >= scrollWidth - xThreshold) {
              isRightBoundary = true
            }
          } else {
            direction = 'left'
            if (scrollLeft <= xThreshold) {
              isLeftBoundary = true
            }
          }
          $xeTable.checkScrolling()
          internalData.lastScrollLeft = scrollLeft
        }
        if (isRollY) {
          const yThreshold = computeScrollYThreshold.value
          isTop = scrollTop <= 0
          if (!isTop) {
            isBottom = scrollTop + bodyHeight >= scrollHeight
          }
          if (scrollTop > lastScrollTop) {
            direction = 'bottom'
            if (scrollTop + bodyHeight >= scrollHeight - yThreshold) {
              isBottomBoundary = true
            }
          } else {
            direction = 'top'
            if (scrollTop <= yThreshold) {
              isTopBoundary = true
            }
          }
          internalData.lastScrollTop = scrollTop
        }
        reactData.lastScrollTime = Date.now()
        const evntParams = {
          scrollTop,
          scrollLeft,
          bodyHeight,
          bodyWidth,
          scrollHeight,
          scrollWidth,
          isX: isRollX,
          isY: isRollY,
          isTop,
          isBottom,
          isLeft,
          isRight,
          direction,
          ...params
        }
        updateRowExpandStyle()
        checkLastSyncScroll(isRollX, isRollY)
        if (isRollX) {
          $xeTable.closeFilter()
        }
        if (rowOpts.isHover || highlightHoverRow) {
          $xeTable.clearHoverRow()
        }
        if (validTip && validTip.reactData.visible) {
          validTip.close()
        }
        if (tooltip && tooltip.reactData.visible) {
          tooltip.close()
        }
        if (isBottomBoundary || isTopBoundary || isRightBoundary || isLeftBoundary) {
          dispatchEvent('scroll-boundary', evntParams, evnt)
        }
        dispatchEvent('scroll', evntParams, evnt)
      },
      /**
       * 横向 X 可视渲染事件处理
       */
      triggerScrollXEvent () {
        const virtualXOpts = computeVirtualXOpts.value
        if (virtualXOpts.immediate) {
          loadScrollXData()
        } else {
          lazyScrollXData()
        }
      },
      /**
       * 纵向 Y 可视渲染事件处理
       */
      triggerScrollYEvent () {
        const virtualYOpts = computeVirtualYOpts.value
        if (virtualYOpts.immediate) {
          loadScrollYData()
        } else {
          lazyScrollYData()
        }
      },
      triggerBodyScrollEvent (evnt, fixedType) {
        const { scrollYLoad, scrollXLoad } = reactData
        const { elemStore, intoRunScroll, lastScrollTop, lastScrollLeft, inWheelScroll, inVirtualScroll, inHeaderScroll, inBodyScroll, scrollRenderType, inFooterScroll } = internalData
        if (inWheelScroll || inVirtualScroll || inHeaderScroll || inFooterScroll) {
          return
        }
        const xHandleEl = refScrollXHandleElem.value
        const yHandleEl = refScrollYHandleElem.value
        const leftScrollElem = getRefElem(elemStore['left-body-scroll'])
        const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
        const rightScrollElem = getRefElem(elemStore['right-body-scroll'])
        const headerScrollElem = getRefElem(elemStore['main-header-scroll'])
        const footerScrollElem = getRefElem(elemStore['main-footer-scroll'])
        const rowExpandEl = refRowExpandElem.value
        if (intoRunScroll) {
          return
        }
        if (!bodyScrollElem) {
          return
        }
        if (!xHandleEl) {
          return
        }
        if (!yHandleEl) {
          return
        }
        if (inBodyScroll) {
          if (scrollRenderType !== fixedType) {
            return
          }
        }

        let scrollTop = yHandleEl.scrollTop
        let scrollLeft = xHandleEl.scrollLeft
        if (leftScrollElem && fixedType === 'left') {
          scrollTop = leftScrollElem.scrollTop
        } else if (rightScrollElem && fixedType === 'right') {
          scrollTop = rightScrollElem.scrollTop
        } else {
          scrollTop = bodyScrollElem.scrollTop
          scrollLeft = bodyScrollElem.scrollLeft
        }
        const isRollX = scrollLeft !== lastScrollLeft
        const isRollY = scrollTop !== lastScrollTop
        internalData.inBodyScroll = true
        internalData.scrollRenderType = fixedType
        if (isRollY) {
          if (fixedType === 'left') {
            setScrollTop(bodyScrollElem, scrollTop)
            setScrollTop(rightScrollElem, scrollTop)
          } else if (fixedType === 'right') {
            setScrollTop(bodyScrollElem, scrollTop)
            setScrollTop(leftScrollElem, scrollTop)
          } else {
            setScrollTop(leftScrollElem, scrollTop)
            setScrollTop(rightScrollElem, scrollTop)
          }
          setScrollTop(yHandleEl, scrollTop)
          setScrollTop(rowExpandEl, scrollTop)
          if (scrollYLoad) {
            $xeTable.triggerScrollYEvent(evnt)
          }
        }
        if (isRollX) {
          setScrollLeft(xHandleEl, scrollLeft)
          setScrollLeft(headerScrollElem, scrollLeft)
          setScrollLeft(footerScrollElem, scrollLeft)
          if (scrollXLoad) {
            $xeTable.triggerScrollXEvent(evnt)
          }
        }
        $xeTable.handleScrollEvent(evnt, isRollY, isRollX, scrollTop, scrollLeft, {
          type: 'body',
          fixed: fixedType
        })
      },
      triggerHeaderScrollEvent (evnt, fixedType) {
        const { scrollXLoad } = reactData
        const { elemStore, intoRunScroll, inWheelScroll, inVirtualScroll, inBodyScroll, inFooterScroll } = internalData
        if (inWheelScroll || inVirtualScroll || inBodyScroll || inFooterScroll) {
          return
        }
        const yHandleEl = refScrollYHandleElem.value
        const xHandleEl = refScrollXHandleElem.value
        const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
        const headerScrollElem = getRefElem(elemStore['main-header-scroll'])
        const footerScrollElem = getRefElem(elemStore['main-footer-scroll'])
        if (intoRunScroll) {
          return
        }
        if (!headerScrollElem) {
          return
        }
        if (!xHandleEl) {
          return
        }
        if (!yHandleEl) {
          return
        }
        const scrollTop = yHandleEl.scrollTop
        const scrollLeft = headerScrollElem.scrollLeft
        const isRollX = true
        const isRollY = false
        internalData.inHeaderScroll = true
        setScrollLeft(xHandleEl, scrollLeft)
        setScrollLeft(footerScrollElem, scrollLeft)
        setScrollLeft(bodyScrollElem, scrollLeft)
        if (scrollXLoad) {
          $xeTable.triggerScrollXEvent(evnt)
        }
        $xeTable.handleScrollEvent(evnt, isRollY, isRollX, scrollTop, scrollLeft, {
          type: 'header',
          fixed: fixedType
        })
      },
      triggerFooterScrollEvent (evnt, fixedType) {
        const { scrollXLoad } = reactData
        const { elemStore, intoRunScroll, inWheelScroll, inVirtualScroll, inHeaderScroll, inBodyScroll } = internalData
        if (inWheelScroll || inVirtualScroll || inHeaderScroll || inBodyScroll) {
          return
        }
        const yHandleEl = refScrollYHandleElem.value
        const xHandleEl = refScrollXHandleElem.value
        const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
        const headerScrollElem = getRefElem(elemStore['main-header-scroll'])
        const footerScrollElem = getRefElem(elemStore['main-footer-scroll'])
        if (intoRunScroll) {
          return
        }
        if (!footerScrollElem) {
          return
        }
        if (!xHandleEl) {
          return
        }
        if (!yHandleEl) {
          return
        }
        const scrollTop = yHandleEl.scrollTop
        const scrollLeft = footerScrollElem.scrollLeft
        const isRollX = true
        const isRollY = false
        internalData.inFooterScroll = true
        setScrollLeft(xHandleEl, scrollLeft)
        setScrollLeft(headerScrollElem, scrollLeft)
        setScrollLeft(bodyScrollElem, scrollLeft)
        if (scrollXLoad) {
          $xeTable.triggerScrollXEvent(evnt)
        }
        $xeTable.handleScrollEvent(evnt, isRollY, isRollX, scrollTop, scrollLeft, {
          type: 'footer',
          fixed: fixedType
        })
      },
      triggerBodyWheelEvent (evnt) {
        const { target, deltaY, deltaX, shiftKey } = evnt
        if (target && /^textarea$/i.test((target as HTMLElement).tagName)) {
          return
        }

        const { highlightHoverRow } = tableProps
        const { scrollXLoad, scrollYLoad, expandColumn } = reactData
        const leftFixedWidth = computeLeftFixedWidth.value
        const rightFixedWidth = computeRightFixedWidth.value
        if (!(leftFixedWidth || rightFixedWidth || expandColumn)) {
          return
        }

        const { elemStore, lastScrollTop, lastScrollLeft } = internalData
        const rowOpts = computeRowOpts.value
        const xHandleEl = refScrollXHandleElem.value
        const yHandleEl = refScrollYHandleElem.value
        const leftScrollElem = getRefElem(elemStore['left-body-scroll'])
        const headerScrollElem = getRefElem(elemStore['main-header-scroll'])
        const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
        const footerScrollElem = getRefElem(elemStore['main-footer-scroll'])
        const rightScrollElem = getRefElem(elemStore['right-body-scroll'])
        const rowExpandEl = refRowExpandElem.value
        if (!xHandleEl) {
          return
        }
        if (!yHandleEl) {
          return
        }
        if (!bodyScrollElem) {
          return
        }

        const wheelSpeed = getWheelSpeed(reactData.lastScrollTime)
        const deltaTop = shiftKey ? 0 : Math.ceil(deltaY * wheelSpeed)
        const deltaLeft = shiftKey ? Math.ceil((shiftKey ? (deltaY || deltaX) : deltaX) * wheelSpeed) : 0

        const isTopWheel = deltaTop < 0
        const currScrollTop = bodyScrollElem.scrollTop

        // 如果滚动位置已经是顶部或底部，则不需要触发
        if (isTopWheel ? currScrollTop <= 0 : currScrollTop >= bodyScrollElem.scrollHeight - bodyScrollElem.clientHeight) {
          return
        }
        const scrollTop = currScrollTop + deltaTop
        const scrollLeft = bodyScrollElem.scrollLeft + deltaLeft
        const isRollX = scrollLeft !== lastScrollLeft
        const isRollY = scrollTop !== lastScrollTop

        if (rowOpts.isHover || highlightHoverRow) {
          $xeTable.clearHoverRow()
        }
        // 用于鼠标纵向滚轮处理
        if (isRollX) {
          evnt.preventDefault()
          internalData.inWheelScroll = true
          if (browseObj.firefox || browseObj.safari) {
            const currLeftNum = scrollLeft
            setScrollLeft(xHandleEl, currLeftNum)
            setScrollLeft(bodyScrollElem, currLeftNum)
            setScrollLeft(headerScrollElem, currLeftNum)
            setScrollLeft(footerScrollElem, currLeftNum)
            if (scrollXLoad) {
              $xeTable.triggerScrollXEvent(evnt)
            }
            $xeTable.handleScrollEvent(evnt, isRollY, isRollX, bodyScrollElem.scrollTop, currLeftNum, {
              type: 'table',
              fixed: ''
            })
          } else {
            wheelScrollLeftTo(scrollLeft, (offsetLeft: number) => {
              internalData.inWheelScroll = true
              const currLeftNum = offsetLeft
              setScrollLeft(xHandleEl, currLeftNum)
              setScrollLeft(bodyScrollElem, currLeftNum)
              setScrollLeft(headerScrollElem, currLeftNum)
              setScrollLeft(footerScrollElem, currLeftNum)
              if (scrollXLoad) {
                $xeTable.triggerScrollXEvent(evnt)
              }
              $xeTable.handleScrollEvent(evnt, isRollY, isRollX, bodyScrollElem.scrollTop, currLeftNum, {
                type: 'table',
                fixed: ''
              })
            })
          }
        }
        if (isRollY) {
          evnt.preventDefault()
          internalData.inWheelScroll = true
          if (browseObj.firefox || browseObj.safari) {
            const currTopNum = scrollTop
            setScrollTop(yHandleEl, currTopNum)
            setScrollTop(bodyScrollElem, currTopNum)
            setScrollTop(leftScrollElem, currTopNum)
            setScrollTop(rightScrollElem, currTopNum)
            setScrollTop(rowExpandEl, currTopNum)
            if (scrollYLoad) {
              $xeTable.triggerScrollYEvent(evnt)
            }
            $xeTable.handleScrollEvent(evnt, isRollY, isRollX, currTopNum, bodyScrollElem.scrollLeft, {
              type: 'table',
              fixed: ''
            })
          } else {
            wheelScrollTopTo(scrollTop - currScrollTop, (offsetTop: number) => {
              internalData.inWheelScroll = true
              const currTopNum = bodyScrollElem.scrollTop + offsetTop
              setScrollTop(yHandleEl, currTopNum)
              setScrollTop(bodyScrollElem, currTopNum)
              setScrollTop(leftScrollElem, currTopNum)
              setScrollTop(rightScrollElem, currTopNum)
              setScrollTop(rowExpandEl, currTopNum)
              if (scrollYLoad) {
                $xeTable.triggerScrollYEvent(evnt)
              }
              $xeTable.handleScrollEvent(evnt, isRollY, isRollX, currTopNum, bodyScrollElem.scrollLeft, {
                type: 'table',
                fixed: ''
              })
            })
          }
        }
      },
      triggerVirtualScrollXEvent (evnt) {
        const { scrollXLoad } = reactData
        const { elemStore, inWheelScroll, lastScrollTop, inHeaderScroll, inBodyScroll, inFooterScroll } = internalData
        if (inHeaderScroll || inBodyScroll || inFooterScroll) {
          return
        }
        if (inWheelScroll) {
          return
        }
        const headerScrollElem = getRefElem(elemStore['main-header-scroll'])
        const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
        const footerScrollElem = getRefElem(elemStore['main-footer-scroll'])
        const yHandleEl = refScrollYHandleElem.value
        const wrapperEl = evnt.currentTarget as HTMLDivElement
        const { scrollLeft } = wrapperEl
        const yBodyEl = yHandleEl || bodyScrollElem
        let scrollTop = 0
        if (yBodyEl) {
          scrollTop = yBodyEl.scrollTop
        }
        const isRollX = true
        const isRollY = scrollTop !== lastScrollTop

        internalData.inVirtualScroll = true
        setScrollLeft(bodyScrollElem, scrollLeft)
        setScrollLeft(headerScrollElem, scrollLeft)
        setScrollLeft(footerScrollElem, scrollLeft)
        if (scrollXLoad) {
          $xeTable.triggerScrollXEvent(evnt)
        }
        $xeTable.handleScrollEvent(evnt, isRollY, isRollX, scrollTop, scrollLeft, {
          type: 'table',
          fixed: ''
        })
      },
      triggerVirtualScrollYEvent (evnt) {
        const { scrollYLoad } = reactData
        const { elemStore, inWheelScroll, lastScrollLeft, inHeaderScroll, inBodyScroll, inFooterScroll } = internalData
        if (inHeaderScroll || inBodyScroll || inFooterScroll) {
          return
        }
        if (inWheelScroll) {
          return
        }
        const leftScrollElem = getRefElem(elemStore['left-body-scroll'])
        const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
        const rightScrollElem = getRefElem(elemStore['right-body-scroll'])
        const rowExpandEl = refRowExpandElem.value
        const xHandleEl = refScrollXHandleElem.value
        const wrapperEl = evnt.currentTarget as HTMLDivElement
        const { scrollTop } = wrapperEl
        const xBodyEl = xHandleEl || bodyScrollElem
        let scrollLeft = 0
        if (xBodyEl) {
          scrollLeft = xBodyEl.scrollLeft
        }
        const isRollX = scrollLeft !== lastScrollLeft
        const isRollY = true
        internalData.inVirtualScroll = true
        setScrollTop(bodyScrollElem, scrollTop)
        setScrollTop(leftScrollElem, scrollTop)
        setScrollTop(rightScrollElem, scrollTop)
        setScrollTop(rowExpandEl, scrollTop)
        if (scrollYLoad) {
          $xeTable.triggerScrollYEvent(evnt)
        }
        $xeTable.handleScrollEvent(evnt, isRollY, isRollX, scrollTop, scrollLeft, {
          type: 'table',
          fixed: ''
        })
      },
      /**
       * 对于树形结构中，可以直接滚动到指定深层节点中
       * 对于某些特定的场景可能会用到，比如定位到某一节点
       * @param {Row} row 行对象
       */
      scrollToTreeRow (row) {
        const { treeConfig } = props
        const { isRowGroupStatus } = reactData
        const { tableFullData } = internalData
        const rests: Promise<any>[] = []
        if (treeConfig || isRowGroupStatus) {
          const aggregateOpts = computeAggregateOpts.value
          const treeOpts = computeTreeOpts.value
          const childrenField = treeOpts.children || treeOpts.childrenField
          const matchObj = XEUtils.findTree(tableFullData, item => $xeTable.eqRow(item, row), { children: isRowGroupStatus ? aggregateOpts.mapChildrenField : childrenField })
          if (matchObj) {
            const nodes = matchObj.nodes
            nodes.forEach((row, index) => {
              if (index < nodes.length - 1 && !$xeTable.isTreeExpandByRow(row)) {
                rests.push($xeTable.setTreeExpand(row, true))
              }
            })
          }
        }
        return Promise.all(rests).then(() => rowToVisible($xeTable, row))
      },
      updateScrollYStatus,
      // 更新横向 X 可视渲染上下剩余空间大小
      updateScrollXSpace () {
        const { scrollXLoad, overflowX, scrollXWidth } = reactData
        const { visibleColumn, scrollXStore, elemStore, fullColumnIdData } = internalData
        const mouseOpts = computeMouseOpts.value
        const tableBody = refTableBody.value
        const tableBodyElem = tableBody ? tableBody.$el as HTMLDivElement : null
        if (tableBodyElem) {
          const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
          const bodyTableElem = getRefElem(elemStore['main-body-table'])
          const headerTableElem = getRefElem(elemStore['main-header-table'])
          const footerTableElem = getRefElem(elemStore['main-footer-table'])

          let xSpaceLeft = 0
          const firstColumn = visibleColumn[scrollXStore.startIndex]
          if (firstColumn) {
            const colRest = fullColumnIdData[firstColumn.id] || {}
            xSpaceLeft = colRest.oLeft
          }

          let clientWidth = 0
          if (bodyScrollElem) {
            clientWidth = bodyScrollElem.clientWidth
          }
          // 虚拟渲染
          let isScrollXBig = false
          let ySpaceWidth = scrollXWidth
          if (scrollXWidth > maxXWidth) {
            // 触右
            if (bodyScrollElem && bodyTableElem && bodyScrollElem.scrollLeft + clientWidth >= maxXWidth) {
              xSpaceLeft = maxXWidth - bodyTableElem.clientWidth
            } else {
              xSpaceLeft = (maxXWidth - clientWidth) * (xSpaceLeft / (scrollXWidth - clientWidth))
            }
            ySpaceWidth = maxXWidth
            isScrollXBig = true
          }

          if (!(scrollXLoad && overflowX)) {
            xSpaceLeft = 0
          }

          if (headerTableElem) {
            headerTableElem.style.transform = headerTableElem.getAttribute('xvm') ? `translate(${xSpaceLeft}px, 0px)` : ''
          }
          if (bodyTableElem) {
            bodyTableElem.style.transform = `translate(${xSpaceLeft}px, ${reactData.scrollYTop || 0}px)`
          }
          if (footerTableElem) {
            footerTableElem.style.transform = footerTableElem.getAttribute('xvm') ? `translate(${xSpaceLeft}px, 0px)` : ''
          }

          const containerList = ['main']
          containerList.forEach(name => {
            const layoutList = ['header', 'body', 'footer']
            layoutList.forEach(layout => {
              const xSpaceElem = getRefElem(elemStore[`${name}-${layout}-xSpace`])
              if (xSpaceElem) {
                xSpaceElem.style.width = scrollXLoad ? `${ySpaceWidth}px` : ''
              }
            })
          })

          reactData.scrollXLeft = xSpaceLeft
          reactData.scrollXWidth = ySpaceWidth
          reactData.isScrollXBig = isScrollXBig

          const scrollXSpaceEl = refScrollXSpaceElem.value
          if (scrollXSpaceEl) {
            scrollXSpaceEl.style.width = `${ySpaceWidth}px`
          }

          if (isScrollXBig && mouseOpts.area) {
            errLog('vxe.error.notProp', ['mouse-config.area'])
          }
          calcScrollbar()
          return nextTick().then(() => {
            updateStyle()
          })
        }
      },
      // 更新纵向 Y 可视渲染上下剩余空间大小
      updateScrollYSpace () {
        const { isAllOverflow, overflowY, scrollYLoad, expandColumn } = reactData
        const { scrollYStore, elemStore, isResizeCellHeight, afterFullData, fullAllDataRowIdData, rowExpandedMaps } = internalData
        const { startIndex } = scrollYStore
        const mouseOpts = computeMouseOpts.value
        const expandOpts = computeExpandOpts.value
        const rowOpts = computeRowOpts.value
        const cellOpts = computeCellOpts.value
        const defaultRowHeight = computeDefaultRowHeight.value
        const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
        const bodyTableElem = getRefElem(elemStore['main-body-table'])
        const leftBodyTableElem = getRefElem(elemStore['left-body-table'])
        const rightbodyTableElem = getRefElem(elemStore['right-body-table'])
        const containerList = ['main', 'left', 'right']
        let ySpaceTop = 0
        let scrollYHeight = 0
        let isScrollYBig = false
        if (scrollYLoad) {
          const isCustomCellHeight = isResizeCellHeight || cellOpts.height || rowOpts.height
          if (!isCustomCellHeight && !expandColumn && isAllOverflow) {
            scrollYHeight = afterFullData.length * defaultRowHeight
            if (scrollYHeight > maxYHeight) {
              isScrollYBig = true
            }
            ySpaceTop = Math.max(0, startIndex * defaultRowHeight)
          } else {
            const firstRow = afterFullData[startIndex]
            let rowid = getRowid($xeTable, firstRow)
            let rowRest = fullAllDataRowIdData[rowid] || {}
            ySpaceTop = (rowRest.oTop || 0)

            const lastRow = afterFullData[afterFullData.length - 1]
            rowid = getRowid($xeTable, lastRow)
            rowRest = fullAllDataRowIdData[rowid] || {}
            scrollYHeight = (rowRest.oTop || 0) + (rowRest.resizeHeight || cellOpts.height || rowOpts.height || rowRest.height || defaultRowHeight)
            // 是否展开行
            if (expandColumn && rowExpandedMaps[rowid]) {
              scrollYHeight += rowRest.expandHeight || expandOpts.height || 0
            }
            if (scrollYHeight > maxYHeight) {
              isScrollYBig = true
            }
          }
        } else {
          if (bodyTableElem) {
            scrollYHeight = bodyTableElem.clientHeight
          }
        }
        let clientHeight = 0
        if (bodyScrollElem) {
          clientHeight = bodyScrollElem.clientHeight
        }
        // 虚拟渲染
        let ySpaceHeight = scrollYHeight
        let scrollYTop = ySpaceTop
        if (isScrollYBig) {
          // 触底
          if (bodyScrollElem && bodyTableElem && bodyScrollElem.scrollTop + clientHeight >= maxYHeight) {
            scrollYTop = maxYHeight - bodyTableElem.clientHeight
          } else {
            scrollYTop = (maxYHeight - clientHeight) * (ySpaceTop / (scrollYHeight - clientHeight))
          }
          ySpaceHeight = maxYHeight
        }
        if (!(scrollYLoad && overflowY)) {
          scrollYTop = 0
        }

        if (leftBodyTableElem) {
          leftBodyTableElem.style.transform = `translate(0px, ${scrollYTop}px)`
        }
        if (bodyTableElem) {
          bodyTableElem.style.transform = `translate(${reactData.scrollXLeft || 0}px, ${scrollYTop}px)`
        }
        if (rightbodyTableElem) {
          rightbodyTableElem.style.transform = `translate(0px, ${scrollYTop}px)`
        }

        containerList.forEach(name => {
          const layoutList = ['header', 'body', 'footer']
          layoutList.forEach(layout => {
            const ySpaceElem = getRefElem(elemStore[`${name}-${layout}-ySpace`])
            if (ySpaceElem) {
              ySpaceElem.style.height = ySpaceHeight ? `${ySpaceHeight}px` : ''
            }
          })
        })

        const scrollYSpaceEl = refScrollYSpaceElem.value
        if (scrollYSpaceEl) {
          scrollYSpaceEl.style.height = ySpaceHeight ? `${ySpaceHeight}px` : ''
        }
        const rowExpandYSpaceEl = refRowExpandYSpaceElem.value
        if (rowExpandYSpaceEl) {
          rowExpandYSpaceEl.style.height = ySpaceHeight ? `${ySpaceHeight}px` : ''
        }
        reactData.scrollYTop = scrollYTop
        reactData.scrollYHeight = scrollYHeight
        reactData.isScrollYBig = isScrollYBig

        if (isScrollYBig && mouseOpts.area) {
          errLog('vxe.error.notProp', ['mouse-config.area'])
        }
        calcScrollbar()
        return nextTick().then(() => {
          updateStyle()
        })
      },
      updateScrollXData () {
        const { isAllOverflow } = reactData
        handleTableColumn()
        $xeTable.updateScrollXSpace()
        return nextTick().then(() => {
          handleTableColumn()
          $xeTable.updateScrollXSpace()
          if (!isAllOverflow) {
            $xeTable.updateScrollYSpace()
          }
        })
      },
      updateScrollYData () {
        $xeTable.handleTableData()
        $xeTable.updateScrollYSpace()
        return nextTick().then(() => {
          $xeTable.handleTableData()
          $xeTable.updateScrollYSpace()
        })
      },
      /**
       * 处理固定列的显示状态
       */
      checkScrolling () {
        const { elemStore } = internalData
        const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
        const leftContainerElem = refLeftContainer.value
        const rightContainerElem = refRightContainer.value
        const xHandleEl = refScrollXHandleElem.value
        const bodtTargetEl = xHandleEl || bodyScrollElem
        if (bodtTargetEl) {
          if (leftContainerElem) {
            if (bodtTargetEl.scrollLeft > 0) {
              addClass(leftContainerElem, 'scrolling--middle')
            } else {
              removeClass(leftContainerElem, 'scrolling--middle')
            }
          }
          if (rightContainerElem) {
            if (bodtTargetEl.clientWidth < bodtTargetEl.scrollWidth - Math.ceil(bodtTargetEl.scrollLeft)) {
              addClass(rightContainerElem, 'scrolling--middle')
            } else {
              removeClass(rightContainerElem, 'scrolling--middle')
            }
          }
        }
      },
      handleUpdateAggData () {
        return loadTableData(internalData.tableSynchData, true)
      },
      updateZindex () {
        if (props.zIndex) {
          internalData.tZindex = props.zIndex
        } else if (internalData.tZindex < getLastZIndex()) {
          internalData.tZindex = nextZIndex()
        }
      },
      handleCheckedCheckboxRow,
      /**
       * 行 hover 事件
       */
      triggerHoverEvent (evnt, { row }) {
        tablePrivateMethods.setHoverRow(row)
      },
      setHoverRow (row) {
        const rowid = getRowid($xeTable, row)
        const el = refElem.value
        tablePrivateMethods.clearHoverRow()
        if (el) {
          XEUtils.arrayEach(el.querySelectorAll(`.vxe-body--row[rowid="${rowid}"]`), elem => addClass(elem, 'row--hover'))
        }
        internalData.hoverRow = row
      },
      clearHoverRow () {
        const el = refElem.value
        if (el) {
          XEUtils.arrayEach(el.querySelectorAll('.vxe-body--row.row--hover'), elem => removeClass(elem, 'row--hover'))
        }
        internalData.hoverRow = null
      },
      /**
       * 已废弃，被 getCellElement 替换
       * @deprecated
       */
      getCell (row, column) {
        return tableMethods.getCellElement(row, column)
      },
      findRowIndexOf (list, row) {
        return row ? XEUtils.findIndexOf(list, item => $xeTable.eqRow(item, row)) : -1
      },
      eqRow (row1, row2) {
        if (row1 && row2) {
          if (row1 === row2) {
            return true
          }
          return getRowid($xeTable, row1) === getRowid($xeTable, row2)
        }
        return false
      }
    }

    // 检测对应模块是否安装
    'openExport,openPrint,exportData,openImport,importData,saveFile,readFile,importByFile,print'.split(',').forEach(name => {
      ($xeTable as any)[name] = function () {
        errLog('vxe.error.reqModule', ['Export'])
      }
    })
    'clearValidate,fullValidate,validate'.split(',').forEach(name => {
      ($xeTable as any)[name] = function () {
        errLog('vxe.error.reqModule', ['Validator'])
      }
    })

    Object.assign($xeTable, tableMethods, tablePrivateMethods)

    /**
     * 渲染浮固定列
     * 分别渲染左边固定列和右边固定列
     * 如果宽度足够情况下，则不需要渲染固定列
     * @param {String} fixedType 固定列类型
     */
    const renderFixed = (fixedType: 'left' | 'right') => {
      const { showHeader, showFooter } = props
      const { tableData, tableColumn, tableGroupColumn, columnStore, footerTableData } = reactData
      const isFixedLeft = fixedType === 'left'
      const fixedColumn = isFixedLeft ? columnStore.leftList : columnStore.rightList
      return h('div', {
        ref: isFixedLeft ? refLeftContainer : refRightContainer,
        class: `vxe-table--fixed-${fixedType}-wrapper`
      }, [
        showHeader
          ? h(TableHeaderComponent, {
            ref: isFixedLeft ? refTableLeftHeader : refTableRightHeader,
            fixedType,
            tableData,
            tableColumn,
            tableGroupColumn,
            fixedColumn
          })
          : renderEmptyElement($xeTable),
        h(TableBodyComponent, {
          ref: isFixedLeft ? refTableLeftBody : refTableRightBody,
          fixedType,
          tableData,
          tableColumn,
          fixedColumn
        }),
        showFooter
          ? h(TableFooterComponent, {
            ref: isFixedLeft ? refTableLeftFooter : refTableRightFooter,
            footerTableData,
            tableColumn,
            fixedColumn,
            fixedType
          })
          : renderEmptyElement($xeTable)
      ])
    }

    const renderEmptyBody = () => {
      const emptyOpts = computeEmptyOpts.value
      const emptySlot = slots.empty
      const emptyParams = { $table: $xeTable, $grid: $xeGrid }
      if (emptySlot) {
        return emptySlot(emptyParams)
      } else {
        const compConf = emptyOpts.name ? renderer.get(emptyOpts.name) : null
        const rtEmptyView = compConf ? (compConf.renderTableEmpty || compConf.renderTableEmptyView || compConf.renderEmpty) : null
        if (rtEmptyView) {
          return getSlotVNs(rtEmptyView(emptyOpts, emptyParams))
        }
      }
      return getFuncText(props.emptyText) || getI18n('vxe.table.emptyText')
    }

    const renderDragTipContents = () => {
      const { dragConfig } = props
      const { dragRow, dragCol, dragTipText } = reactData
      const columnDragOpts = computeColumnDragOpts.value
      const rowDragOpts = computeRowDragOpts.value
      const rowDragSlots = rowDragOpts.slots || {}
      const rTipSlot = rowDragSlots.tip || (dragConfig && dragConfig.slots ? dragConfig.slots.rowTip : null)
      const columnDragSlots = columnDragOpts.slots || {}
      const cTipSlot = columnDragSlots.tip

      if (dragRow && rTipSlot) {
        return callSlot(rTipSlot, { row: dragRow })
      }
      if (dragCol && cTipSlot) {
        return callSlot(cTipSlot, { column: dragCol })
      }
      return [h('span', dragTipText)]
    }

    const renderDragTip = () => {
      const { dragRow, dragCol } = reactData
      const rowOpts = computeRowOpts.value
      const columnOpts = computeColumnOpts.value
      const rowDragOpts = computeRowDragOpts.value
      const columnDragOpts = computeColumnDragOpts.value

      if (rowOpts.drag || columnOpts.drag) {
        return h('div', {
          class: 'vxe-table--drag-wrapper'
        }, [
          h('div', {
            ref: refDragRowLineElem,
            class: ['vxe-table--drag-row-line', {
              'is--guides': rowDragOpts.showGuidesStatus
            }]
          }),
          h('div', {
            ref: refDragColLineElem,
            class: ['vxe-table--drag-col-line', {
              'is--guides': columnDragOpts.showGuidesStatus
            }]
          }),
          (dragRow && rowDragOpts.showDragTip) || (dragCol && columnDragOpts.showDragTip)
            ? h('div', {
              ref: refDragTipElem,
              class: 'vxe-table--drag-sort-tip'
            }, [
              h('div', {
                class: 'vxe-table--drag-sort-tip-wrapper'
              }, [
                h('div', {
                  class: 'vxe-table--drag-sort-tip-status'
                }, [
                  h('span', {
                    class: ['vxe-table--drag-sort-tip-normal-status', dragRow ? getIcon().TABLE_DRAG_STATUS_ROW : getIcon().TABLE_DRAG_STATUS_COLUMN]
                  }),
                  h('span', {
                    class: ['vxe-table--drag-sort-tip-sub-status', getIcon().TABLE_DRAG_STATUS_SUB_ROW]
                  }),
                  h('span', {
                    class: ['vxe-table--drag-sort-tip-disabled-status', getIcon().TABLE_DRAG_DISABLED]
                  })
                ]),
                h('div', {
                  class: 'vxe-table--drag-sort-tip-content'
                }, renderDragTipContents())
              ])
            ])
            : renderEmptyElement($xeTable)
        ])
      }
      return renderEmptyElement($xeTable)
    }

    const renderRowExpandedVNs = () => {
      const { treeConfig } = props
      const { expandColumn, isRowGroupStatus } = reactData
      const tableRowExpandedList = computeTableRowExpandedList.value
      const expandOpts = computeExpandOpts.value
      const { mode } = expandOpts
      if (mode !== 'fixed') {
        return renderEmptyElement($xeTable)
      }
      const expandVNs = [
        h('div', {
          key: 'repY',
          ref: refRowExpandYSpaceElem
        })
      ]
      if (expandColumn) {
        const { handleGetRowId } = createHandleGetRowId($xeTable)
        tableRowExpandedList.forEach((row) => {
          const expandOpts = computeExpandOpts.value
          const { height: expandHeight, padding, indent } = expandOpts
          const { fullAllDataRowIdData, fullColumnIdData } = internalData
          const treeOpts = computeTreeOpts.value
          const { transform, seqMode } = treeOpts
          const cellStyle: Record<string, string> = {}
          const rowid = handleGetRowId(row)
          const rowRest = fullAllDataRowIdData[rowid]
          const colid = expandColumn.id
          const colRest = fullColumnIdData[colid] || {}
          let rowLevel = 0
          let seq: string | number = -1
          let _rowIndex = -1
          let rowIndex = -1
          let $rowIndex = -1
          if (rowRest) {
            rowLevel = rowRest.level
            if (isRowGroupStatus || (treeConfig && transform && seqMode === 'increasing')) {
              seq = rowRest._index + 1
            } else {
              seq = rowRest.seq
            }
            rowIndex = rowRest.index
            $rowIndex = rowRest.$index
            _rowIndex = rowRest._index
          }
          if (expandHeight) {
            cellStyle.height = `${expandHeight}px`
          }
          if (isRowGroupStatus || treeConfig) {
            cellStyle.paddingLeft = `${(rowLevel * (XEUtils.isNumber(indent) ? indent : treeOpts.indent)) + 30}px`
          }
          let columnIndex = -1
          let $columnIndex = -1
          let _columnIndex = -1
          if (colRest) {
            columnIndex = colRest.index
            $columnIndex = colRest.$index
            _columnIndex = colRest._index
          }
          const expandParams: VxeTableDefines.CellRenderDataParams = {
            $grid: $xeGrid,
            $table: $xeTable,
            seq,
            column: expandColumn,
            columnIndex,
            $columnIndex,
            _columnIndex,
            fixed: '',
            type: 'body',
            level: rowLevel,
            rowid,
            row,
            rowIndex,
            $rowIndex,
            _rowIndex,
            isHidden: false,
            isEdit: false,
            visibleData: [],
            data: [],
            items: []
          }
          expandVNs.push(
            h('div', {
              key: rowid,
              class: ['vxe-body--row-expanded-cell', {
                'is--padding': padding,
                'is--ellipsis': expandHeight
              }],
              rowid,
              style: cellStyle
            }, expandColumn.renderData(expandParams))
          )
        })
      }

      return h('div', {
        ref: refRowExpandElem,
        class: 'vxe-table--row-expanded-wrapper'
      }, expandVNs)
    }

    const renderScrollX = () => {
      return h('div', {
        key: 'vsx',
        ref: refScrollXVirtualElem,
        class: 'vxe-table--scroll-x-virtual'
      }, [
        h('div', {
          ref: refScrollXLeftCornerElem,
          class: 'vxe-table--scroll-x-left-corner'
        }),
        h('div', {
          ref: refScrollXWrapperElem,
          class: 'vxe-table--scroll-x-wrapper'
        }, [
          h('div', {
            ref: refScrollXHandleElem,
            class: 'vxe-table--scroll-x-handle',
            onScroll: $xeTable.triggerVirtualScrollXEvent
          }, [
            h('div', {
              ref: refScrollXSpaceElem,
              class: 'vxe-table--scroll-x-space'
            })
          ])
        ]),
        h('div', {
          ref: refScrollXRightCornerElem,
          class: 'vxe-table--scroll-x-right-corner'
        })
      ])
    }

    const renderScrollY = () => {
      return h('div', {
        ref: refScrollYVirtualElem,
        class: 'vxe-table--scroll-y-virtual'
      }, [
        h('div', {
          ref: refScrollYTopCornerElem,
          class: 'vxe-table--scroll-y-top-corner'
        }),
        h('div', {
          ref: refScrollYWrapperElem,
          class: 'vxe-table--scroll-y-wrapper'
        }, [
          h('div', {
            ref: refScrollYHandleElem,
            class: 'vxe-table--scroll-y-handle',
            onScroll: $xeTable.triggerVirtualScrollYEvent
          }, [
            h('div', {
              ref: refScrollYSpaceElem,
              class: 'vxe-table--scroll-y-space'
            })
          ])
        ]),
        h('div', {
          ref: refScrollYBottomCornerElem,
          class: 'vxe-table--scroll-y-bottom-corner'
        })
      ])
    }

    const renderViewport = () => {
      const { showHeader, showFooter } = props
      const { overflowX, tableData, tableColumn, tableGroupColumn, footerTableData, columnStore } = reactData
      const { leftList, rightList } = columnStore

      return h('div', {
        ref: refTableViewportElem,
        class: 'vxe-table--viewport-wrapper'
      }, [
        h('div', {
          class: 'vxe-table--main-wrapper'
        }, [
          /**
           * 表头
           */
          showHeader
            ? h(TableHeaderComponent, {
              ref: refTableHeader,
              tableData,
              tableColumn,
              tableGroupColumn
            })
            : renderEmptyElement($xeTable),
          /**
           * 表体
           */
          h(TableBodyComponent, {
            ref: refTableBody,
            tableData,
            tableColumn
          }),
          /**
           * 表尾
           */
          showFooter
            ? h(TableFooterComponent, {
              ref: refTableFooter,
              footerTableData,
              tableColumn
            })
            : renderEmptyElement($xeTable)
        ]),
        h('div', {
          class: 'vxe-table--fixed-wrapper'
        }, [
          leftList && leftList.length && overflowX ? renderFixed('left') : renderEmptyElement($xeTable),
          rightList && rightList.length && overflowX ? renderFixed('right') : renderEmptyElement($xeTable)
        ]),
        renderRowExpandedVNs()
      ])
    }

    const renderBody = () => {
      const scrollbarYToLeft = computeScrollbarYToLeft.value
      return h('div', {
        class: 'vxe-table--layout-wrapper'
      }, scrollbarYToLeft
        ? [
            renderScrollY(),
            renderViewport()
          ]
        : [
            renderViewport(),
            renderScrollY()
          ])
    }

    const renderVN = () => {
      const { loading, stripe, showHeader, height, treeConfig, mouseConfig, showFooter, highlightCell, highlightHoverRow, highlightHoverColumn, editConfig, editRules } = props
      const { isGroup, overflowX, overflowY, scrollXLoad, scrollYLoad, tableData, initStore, isRowGroupStatus, columnStore, filterStore, customStore } = reactData
      const { leftList, rightList } = columnStore
      const loadingSlot = slots.loading
      const tableTipConfig = computeTableTipConfig.value
      const validTipConfig = computeValidTipConfig.value
      const validOpts = computeValidOpts.value
      const checkboxOpts = computeCheckboxOpts.value
      const treeOpts = computeTreeOpts.value
      const rowOpts = computeRowOpts.value
      const columnOpts = computeColumnOpts.value
      const vSize = computeSize.value
      const tableBorder = computeTableBorder.value
      const mouseOpts = computeMouseOpts.value
      const areaOpts = computeAreaOpts.value
      const loadingOpts = computeLoadingOpts.value
      const isMenu = computeIsMenu.value
      const currLoading = reactData.isColLoading || reactData.isRowLoading || loading
      const resizableOpts = computeResizableOpts.value
      const isArea = mouseConfig && mouseOpts.area
      const columnDragOpts = computeColumnDragOpts.value
      const scrollbarXToTop = computeScrollbarXToTop.value
      const scrollbarYToLeft = computeScrollbarYToLeft.value
      return h('div', {
        ref: refElem,
        class: ['vxe-table', 'vxe-table--render-default', `tid_${xID}`, `border--${tableBorder}`, `sx-pos--${scrollbarXToTop ? 'top' : 'bottom'}`, `sy-pos--${scrollbarYToLeft ? 'left' : 'right'}`, {
          [`size--${vSize}`]: vSize,
          [`valid-msg--${validOpts.msgMode}`]: !!editRules,
          'vxe-editable': !!editConfig,
          'old-cell-valid': editRules && getConfig().cellVaildMode === 'obsolete',
          'cell--highlight': highlightCell,
          'cell--selected': mouseConfig && mouseOpts.selected,
          'cell--area': isArea,
          'header-cell--area': isArea && areaOpts.selectCellByHeader,
          'body-cell--area': isArea && areaOpts.selectCellByBody,
          'row--highlight': rowOpts.isHover || highlightHoverRow,
          'column--highlight': columnOpts.isHover || highlightHoverColumn,
          'checkbox--range': checkboxOpts.range,
          'col--drag-cell': columnOpts.drag && columnDragOpts.trigger === 'cell',
          'is--header': showHeader,
          'is--footer': showFooter,
          'is--group': isGroup,
          'is-row-group': isRowGroupStatus,
          'is--tree-line': treeConfig && (treeOpts.showLine || treeOpts.line),
          'is--fixed-left': leftList.length,
          'is--fixed-right': rightList.length,
          'is--animat': !!props.animat,
          'is--round': props.round,
          'is--stripe': !treeConfig && stripe,
          'is--loading': currLoading,
          'is--empty': !currLoading && !tableData.length,
          'is--scroll-y': overflowY,
          'is--scroll-x': overflowX,
          'is--virtual-x': scrollXLoad,
          'is--virtual-y': scrollYLoad
        }],
        spellcheck: false,
        onKeydown: keydownEvent
      }, [
        /**
         * 隐藏列
         */
        h('div', {
          class: 'vxe-table-slots'
        }, slots.default ? slots.default({}) : []),
        h('div', {
          ref: refVarElem,
          class: 'vxe-table-vars'
        }, [
          h('div', {
            class: 'vxe-table-var-default'
          }),
          h('div', {
            class: 'vxe-table-var-medium'
          }),
          h('div', {
            class: 'vxe-table-var-small'
          }),
          h('div', {
            class: 'vxe-table-var-mini'
          })
        ]),
        h('div', {
          key: 'tw',
          class: 'vxe-table--render-wrapper'
        }, scrollbarXToTop
          ? [
              renderScrollX(),
              renderBody()
            ]
          : [
              renderBody(),
              renderScrollX()
            ]),
        /**
         * 空数据
         */
        h('div', {
          key: 'tn',
          ref: refEmptyPlaceholder,
          class: 'vxe-table--empty-placeholder'
        }, [
          h('div', {
            class: 'vxe-table--empty-content'
          }, renderEmptyBody())
        ]),
        /**
         * 边框线
         */
        h('div', {
          key: 'tl',
          class: 'vxe-table--border-line'
        }),
        /**
         * 列宽线
         */
        h('div', {
          key: 'tcl',
          ref: refColResizeBar,
          class: 'vxe-table--resizable-col-bar'
        }, resizableOpts.showDragTip
          ? [
              h('div', {
                class: 'vxe-table--resizable-number-tip'
              })
            ]
          : []),
        /**
         * 行高线
         */
        h('div', {
          key: 'trl',
          ref: refRowResizeBar,
          class: 'vxe-table--resizable-row-bar'
        }, resizableOpts.showDragTip
          ? [
              h('div', {
                class: 'vxe-table--resizable-number-tip'
              })
            ]
          : []),
        /**
         * 加载中
         */
        VxeUILoadingComponent
          ? h(VxeUILoadingComponent, {
            key: 'lg',
            class: 'vxe-table--loading',
            modelValue: currLoading,
            icon: loadingOpts.icon,
            text: loadingOpts.text
          }, loadingSlot
            ? {
                default: () => callSlot(loadingSlot, { $table: $xeTable, $grid: $xeGrid, loading: currLoading })
              }
            : {})
          : loadingSlot
            ? h('div', {
              class: ['vxe-loading--custom-wrapper', {
                'is--visible': currLoading
              }]
            }, callSlot(loadingSlot, { $table: $xeTable, $grid: $xeGrid, loading: currLoading }))
            : renderEmptyElement($xeTable),
        /**
         * 自定义列
         */
        initStore.custom
          ? h(TableCustomPanelComponent, {
            key: 'cs',
            ref: refTableCustom,
            customStore
          })
          : renderEmptyElement($xeTable),
        /**
         * 筛选
         */
        initStore.filter
          ? h(TableFilterPanelComponent, {
            key: 'tf',
            ref: refTableFilter,
            filterStore
          })
          : renderEmptyElement($xeTable),
        /**
         * 导入
         */
        initStore.import && props.importConfig
          ? h(TableImportPanelComponent, {
            key: 'it',
            defaultOptions: reactData.importParams,
            storeData: reactData.importStore
          })
          : renderEmptyElement($xeTable),
        /**
         * 导出
         */
        initStore.export && (props.exportConfig || props.printConfig)
          ? h(TableExportPanelComponent, {
            key: 'et',
            defaultOptions: reactData.exportParams,
            storeData: reactData.exportStore
          })
          : renderEmptyElement($xeTable),
        /**
         * 快捷菜单
         */
        isMenu
          ? h(TableMenuPanelComponent, {
            key: 'tm',
            ref: refTableMenu
          })
          : renderEmptyElement($xeTable),
        /**
         * 拖拽排序提示
         */
        renderDragTip(),
        /**
         * 提示相关
         */
        VxeUITooltipComponent
          ? h('div', {}, [
            /**
             * 通用提示
             */
            h(VxeUITooltipComponent, {
              key: 'ctp',
              ref: refCommTooltip,
              isArrow: false,
              enterable: false
            }),
            /**
              * 工具提示
              */
            h(VxeUITooltipComponent, {
              key: 'btp',
              ref: refTooltip,
              theme: tableTipConfig.theme,
              enterable: tableTipConfig.enterable,
              enterDelay: tableTipConfig.enterDelay,
              leaveDelay: tableTipConfig.leaveDelay,
              useHTML: tableTipConfig.useHTML
            }),
            /**
              * 校验提示
              */
            props.editRules && validOpts.showMessage && (validOpts.message === 'default' ? !height : validOpts.message === 'tooltip')
              ? h(VxeUITooltipComponent, {
                key: 'vtp',
                ref: refValidTooltip,
                class: [{
                  'old-cell-valid': editRules && getConfig().cellVaildMode === 'obsolete'
                }, 'vxe-table--valid-error'],
                theme: validTipConfig.theme,
                enterable: validTipConfig.enterable,
                enterDelay: validTipConfig.enterDelay,
                leaveDelay: validTipConfig.leaveDelay
              })
              : renderEmptyElement($xeTable)
          ])
          : renderEmptyElement($xeTable)
      ])
    }

    const dataFlag = ref(0)
    watch(() => props.data ? props.data.length : -1, () => {
      dataFlag.value++
    })
    watch(() => props.data, () => {
      dataFlag.value++
    })
    watch(dataFlag, () => {
      const { initStatus } = internalData
      const value = props.data || []
      if (value && value.length >= 50000) {
        warnLog('vxe.error.errLargeData', ['loadData(data), reloadData(data)'])
      }
      loadTableData(value, false).then(() => {
        const { scrollXLoad, scrollYLoad, expandColumn } = reactData
        const expandOpts = computeExpandOpts.value
        internalData.inited = true
        internalData.initStatus = true
        if (!initStatus) {
          handleLoadDefaults()
        }
        // const checkboxOpts = computeCheckboxOpts.value
        // const checkboxColumn = internalData.tableFullColumn.find(column => column.type === 'checkbox')
        // if (checkboxColumn && internalData.tableFullData.length > 300 && !checkboxOpts.checkField) {
        //   warnLog('vxe.error.checkProp', ['checkbox-config.checkField'])
        // }
        if ((scrollXLoad || scrollYLoad) && (expandColumn && expandOpts.mode !== 'fixed')) {
          warnLog('vxe.error.scrollErrProp', ['column.type=expand'])
        }
        return tableMethods.recalculate()
      })
    })

    const staticColumnFlag = ref(0)
    watch(() => reactData.staticColumns.length, () => {
      staticColumnFlag.value++
    })
    watch(() => reactData.staticColumns, () => {
      staticColumnFlag.value++
    })
    watch(staticColumnFlag, () => {
      handleColumn(XEUtils.clone(reactData.staticColumns))
    })

    const tableColumnFlag = ref(0)
    watch(() => reactData.tableColumn.length, () => {
      tableColumnFlag.value++
    })
    watch(() => reactData.tableColumn, () => {
      tableColumnFlag.value++
    })
    watch(tableColumnFlag, () => {
      tablePrivateMethods.analyColumnWidth()
    })

    watch(() => reactData.upDataFlag, () => {
      nextTick(() => {
        tableMethods.updateData()
      })
    })

    watch(() => reactData.reColumnFlag, () => {
      nextTick(() => {
        tableMethods.refreshColumn()
      })
    })

    const reScrollFlag = ref(0)
    watch(computeSize, () => {
      reScrollFlag.value++
    })
    watch(() => props.showHeader, () => {
      reScrollFlag.value++
    })
    watch(() => props.showFooter, () => {
      reScrollFlag.value++
    })
    watch(() => reactData.overflowX, () => {
      reScrollFlag.value++
    })
    watch(() => reactData.overflowY, () => {
      reScrollFlag.value++
    })
    watch(reScrollFlag, () => {
      nextTick(() => {
        tableMethods.recalculate(true).then(() => tableMethods.refreshScroll())
      })
    })

    const reLayoutFlag = ref(0)
    watch(() => props.height, () => {
      reLayoutFlag.value++
    })
    watch(() => props.maxHeight, () => {
      reLayoutFlag.value++
    })
    watch(computeScrollbarXToTop, () => {
      reLayoutFlag.value++
    })
    watch(computeScrollbarYToLeft, () => {
      reLayoutFlag.value++
    })
    watch(() => VxeUI.getLanguage(), () => {
      reLayoutFlag.value++
    })
    watch(reLayoutFlag, () => {
      nextTick(() => tableMethods.recalculate(true))
    })

    const footFlag = ref(0)
    watch(() => props.footerData ? props.footerData.length : -1, () => {
      footFlag.value++
    })
    watch(() => props.footerData, () => {
      footFlag.value++
    })
    watch(footFlag, () => {
      tableMethods.updateFooter()
    })

    watch(() => props.syncResize, (value) => {
      if (value) {
        handleUpdateResize()
        nextTick(() => {
          handleUpdateResize()
          setTimeout(() => handleUpdateResize())
        })
      }
    })

    const mergeCellFlag = ref(0)
    watch(() => props.mergeCells ? props.mergeCells.length : -1, () => {
      mergeCellFlag.value++
    })
    watch(() => props.mergeCells, () => {
      mergeCellFlag.value++
    })
    watch(mergeCellFlag, () => {
      handleUpdateMergeBodyCells(props.mergeCells || [])
    })

    const mergeFooterItemFlag = ref(0)
    watch(() => props.mergeFooterItems ? props.mergeFooterItems.length : -1, () => {
      mergeFooterItemFlag.value++
    })
    watch(() => props.mergeFooterItems, () => {
      mergeFooterItemFlag.value++
    })
    watch(mergeFooterItemFlag, () => {
      handleUpdateMergeFooterCells(props.mergeFooterItems || [])
    })

    watch(computeRowGroupFields, (val) => {
      handleUpdateRowGroup(val)
    })

    watch(computeRowField, () => {
      const { inited, tableFullData } = internalData
      // 行主键被改变，重载表格
      if (inited) {
        handleKeyField()
        reactData.tableData = []
        nextTick(() => {
          $xeTable.reloadData(tableFullData)
        })
      }
    })

    if ($xeTabs) {
      watch(() => $xeTabs ? $xeTabs.reactData.resizeFlag : null, () => {
        handleGlobalResizeEvent()
      })
    }

    handleKeyField()

    hooks.forEach((options) => {
      const { setupTable } = options
      if (setupTable) {
        const hookRest = setupTable($xeTable)
        if (hookRest && XEUtils.isObject(hookRest)) {
          Object.assign($xeTable, hookRest)
        }
      }
    })

    tablePrivateMethods.preventEvent(null, 'created', { $table: $xeTable })

    let resizeObserver: ResizeObserver

    onActivated(() => {
      tableMethods.recalculate().then(() => tableMethods.refreshScroll())
      tablePrivateMethods.preventEvent(null, 'activated', { $table: $xeTable })
    })

    onDeactivated(() => {
      internalData.isActivated = false
      tablePrivateMethods.preventEvent(null, 'deactivated', { $table: $xeTable })
    })

    onMounted(() => {
      const columnOpts = computeColumnOpts.value
      const rowOpts = computeRowOpts.value
      const customOpts = computeCustomOpts.value
      const aggregateOpts = computeAggregateOpts.value
      const virtualYOpts = computeVirtualYOpts.value
      const { groupFields } = aggregateOpts

      if (columnOpts.drag || rowOpts.drag || customOpts.allowSort) {
        initTpImg()
      }

      handleUpdateRowGroup(groupFields)

      nextTick(() => {
        const { data, exportConfig, importConfig, treeConfig, showOverflow, highlightCurrentRow, highlightCurrentColumn } = props
        const { scrollXStore, scrollYStore } = internalData
        const editOpts = computeEditOpts.value
        const treeOpts = computeTreeOpts.value
        const radioOpts = computeRadioOpts.value
        const checkboxOpts = computeCheckboxOpts.value
        const expandOpts = computeExpandOpts.value
        const rowOpts = computeRowOpts.value
        const customOpts = computeCustomOpts.value
        const mouseOpts = computeMouseOpts.value
        const exportOpts = computeExportOpts.value
        const importOpts = computeImportOpts.value
        const currentRowOpts = computeCurrentRowOpts.value
        const currentColumnOpts = computeCurrentColumnOpts.value
        const keyboardOpts = computeKeyboardOpts.value
        const aggregateOpts = computeAggregateOpts.value

        if (props.rowId) {
          warnLog('vxe.error.delProp', ['row-id', 'row-config.keyField'])
        }
        if (props.rowKey) {
          warnLog('vxe.error.delProp', ['row-key', 'row-config.useKey'])
        }
        if (props.columnKey) {
          warnLog('vxe.error.delProp', ['column-id', 'column-config.useKey'])
        }
        if (!(props.rowId || rowOpts.keyField) && (checkboxOpts.reserve || checkboxOpts.checkRowKeys || radioOpts.reserve || radioOpts.checkRowKey || expandOpts.expandRowKeys || treeOpts.expandRowKeys)) {
          warnLog('vxe.error.reqProp', ['row-config.keyField'])
        }
        if (props.editConfig && (editOpts.showStatus || editOpts.showUpdateStatus || editOpts.showInsertStatus) && !props.keepSource) {
          warnLog('vxe.error.reqProp', ['keep-source'])
        }
        if (treeConfig && (treeOpts.showLine || treeOpts.line) && !showOverflow) {
          warnLog('vxe.error.reqProp', ['show-overflow'])
        }
        if (treeConfig && !treeOpts.transform && props.stripe) {
          warnLog('vxe.error.noTree', ['stripe'])
        }
        if (props.showFooter && !(props.footerMethod || props.footerData)) {
          warnLog('vxe.error.reqProp', ['footer-data | footer-method'])
        }
        if (rowOpts.height) {
          warnLog('vxe.error.delProp', ['row-config.height', 'cell-config.height'])
        }
        if (props.highlightCurrentRow) {
          warnLog('vxe.error.delProp', ['highlight-current-row', 'row-config.isCurrent'])
        }
        if (props.highlightHoverRow) {
          warnLog('vxe.error.delProp', ['highlight-hover-row', 'row-config.isHover'])
        }
        if (props.highlightCurrentColumn) {
          warnLog('vxe.error.delProp', ['highlight-current-column', 'column-config.isCurrent'])
        }
        if (props.highlightHoverColumn) {
          warnLog('vxe.error.delProp', ['highlight-hover-column', 'column-config.isHover'])
        }
        if (props.resizable) {
          warnLog('vxe.error.delProp', ['resizable', 'column-config.resizable'])
        }
        // if (props.scrollY) {
        //   warnLog('vxe.error.delProp', ['scroll-y', 'virtual-y-config'])
        // }
        // if (props.scrollX) {
        //   warnLog('vxe.error.delProp', ['scroll-x', 'virtual-x-config'])
        // }
        // 检查导入导出类型，如果自定义导入导出方法，则不校验类型
        if (importConfig && importOpts.types && !importOpts.importMethod && !XEUtils.includeArrays(XEUtils.keys(importOpts._typeMaps), importOpts.types)) {
          warnLog('vxe.error.errProp', [`export-config.types=${importOpts.types.join(',')}`, importOpts.types.filter((type) => XEUtils.includes(XEUtils.keys(importOpts._typeMaps), type)).join(',') || XEUtils.keys(importOpts._typeMaps).join(',')])
        }
        if (exportConfig && exportOpts.types && !exportOpts.exportMethod && !XEUtils.includeArrays(XEUtils.keys(exportOpts._typeMaps), exportOpts.types)) {
          warnLog('vxe.error.errProp', [`export-config.types=${exportOpts.types.join(',')}`, exportOpts.types.filter((type) => XEUtils.includes(XEUtils.keys(exportOpts._typeMaps), type)).join(',') || XEUtils.keys(exportOpts._typeMaps).join(',')])
        }

        if (!props.id) {
          if ((props.customConfig ? isEnableConf(customOpts) : customOpts.enabled) && customOpts.storage) {
            errLog('vxe.error.reqProp', ['id'])
          }
        }
        if (props.treeConfig && checkboxOpts.range) {
          errLog('vxe.error.noTree', ['checkbox-config.range'])
        }
        if (rowOpts.height && !props.showOverflow) {
          warnLog('vxe.error.notProp', ['table.show-overflow'])
        }
        if (!$xeTable.triggerCellAreaMousednEvent) {
          if (props.areaConfig) {
            warnLog('vxe.error.notProp', ['area-config'])
          }
          if (props.clipConfig) {
            warnLog('vxe.error.notProp', ['clip-config'])
          }
          if (props.fnrConfig) {
            warnLog('vxe.error.notProp', ['fnr-config'])
          }
          if (mouseOpts.area) {
            errLog('vxe.error.notProp', ['mouse-config.area'])
            return
          }
        }
        if (!$xeTable.handlePivotTableAggregateData) {
          if (customOpts.allowGroup) {
            errLog('vxe.error.notProp', ['custom-config.allowGroup'])
            return
          }
          if (customOpts.allowValues) {
            errLog('vxe.error.notProp', ['custom-config.allowValues'])
            return
          }
        }
        if (treeConfig && rowOpts.drag && !treeOpts.transform) {
          errLog('vxe.error.notSupportProp', ['column-config.drag', 'tree-config.transform=false', 'tree-config.transform=true'])
        }
        if (props.dragConfig) {
          warnLog('vxe.error.delProp', ['drag-config', 'row-drag-config'])
        }
        if (props.rowGroupConfig) {
          warnLog('vxe.error.delProp', ['row-group-config', 'aggregate-config'])
        }
        if (aggregateOpts.countFields) {
          warnLog('vxe.error.delProp', ['row-group-config.countFields', 'column.agg-func'])
        }
        if (aggregateOpts.aggregateMethod) {
          warnLog('vxe.error.delProp', ['row-group-config.aggregateMethod', 'aggregate-config.countMethod'])
        }
        if (props.treeConfig && treeOpts.children) {
          warnLog('vxe.error.delProp', ['tree-config.children', 'tree-config.childrenField'])
        }
        if (props.treeConfig && treeOpts.line) {
          warnLog('vxe.error.delProp', ['tree-config.line', 'tree-config.showLine'])
        }
        if (mouseOpts.area && mouseOpts.selected) {
          warnLog('vxe.error.errConflicts', ['mouse-config.area', 'mouse-config.selected'])
        }
        if (mouseOpts.area && (props.treeConfig && !treeOpts.transform)) {
          errLog('vxe.error.noTree', ['mouse-config.area'])
        }
        if (props.editConfig && editOpts.activeMethod) {
          warnLog('vxe.error.delProp', ['edit-config.activeMethod', 'edit-config.beforeEditMethod'])
        }
        if (props.treeConfig && checkboxOpts.isShiftKey) {
          errLog('vxe.error.errConflicts', ['tree-config', 'checkbox-config.isShiftKey'])
        }
        if (checkboxOpts.halfField) {
          warnLog('vxe.error.delProp', ['checkbox-config.halfField', 'checkbox-config.indeterminateField'])
        }

        if (rowOpts.currentMethod) {
          warnLog('vxe.error.delProp', ['row-config.currentMethod', 'current-row-config.beforeSelectMethod'])
        }
        if (columnOpts.currentMethod) {
          warnLog('vxe.error.delProp', ['row-config.currentMethod', 'current-column-config.beforeSelectMethod'])
        }
        if ((rowOpts.isCurrent || highlightCurrentRow) && props.keyboardConfig && keyboardOpts.isArrow && !XEUtils.isBoolean(currentRowOpts.isFollowSelected)) {
          warnLog('vxe.error.notConflictProp', ['row-config.isCurrent', 'current-row-config.isFollowSelected'])
        }
        if ((columnOpts.isCurrent || highlightCurrentColumn) && props.keyboardConfig && keyboardOpts.isArrow && !XEUtils.isBoolean(currentColumnOpts.isFollowSelected)) {
          warnLog('vxe.error.notConflictProp', ['column-config.isCurrent', 'current-column-config.isFollowSelected'])
        }

        // 如果不支持虚拟滚动
        // if (props.spanMethod) {
        //   if (virtualXOpts.enabled) {
        //     warnLog('vxe.error.notConflictProp', ['span-method', 'virtual-x-config.enabled=false'])
        //   }
        //   if (virtualYOpts.enabled) {
        //     warnLog('vxe.error.notConflictProp', ['span-method', 'virtual-y-config.enabled=false'])
        //   }
        // }
        // if (props.footerSpanMethod) {
        //   if (virtualXOpts.enabled) {
        //     warnLog('vxe.error.notConflictProp', ['footer-span-method', 'virtual-x-config.enabled=false'])
        //   }
        // }

        // 检查是否有安装需要的模块
        if (props.editConfig && !$xeTable.insert) {
          errLog('vxe.error.reqModule', ['Edit'])
        }
        if (props.editRules && !$xeTable.validate) {
          errLog('vxe.error.reqModule', ['Validator'])
        }
        if ((checkboxOpts.range || props.keyboardConfig || props.mouseConfig) && !$xeTable.handleCellMousedownEvent) {
          errLog('vxe.error.reqModule', ['Keyboard'])
        }
        if ((props.printConfig || props.importConfig || props.exportConfig) && !$xeTable.exportData) {
          errLog('vxe.error.reqModule', ['Export'])
        }

        Object.assign(scrollYStore, {
          startIndex: 0,
          endIndex: 0,
          visibleSize: 0
        })
        Object.assign(scrollXStore, {
          startIndex: 0,
          endIndex: 0,
          visibleSize: 0
        })

        loadTableData(data || [], true).then(() => {
          if (data && data.length) {
            internalData.inited = true
            internalData.initStatus = true
            handleLoadDefaults()
          }
          handleInitDefaults()
          updateStyle()
        })

        if (props.autoResize) {
          const el = refElem.value
          const parentEl = tablePrivateMethods.getParentElem()
          resizeObserver = globalResize.create(() => {
            if (props.autoResize) {
              tableMethods.recalculate(true)
            }
          })
          if (el) {
            resizeObserver.observe(el)
          }
          if (parentEl) {
            resizeObserver.observe(parentEl)
          }
        }
      })

      if (virtualYOpts.mode !== 'scroll') {
        const tableViewportEl = refTableViewportElem.value
        if (tableViewportEl) {
          tableViewportEl.addEventListener('wheel', $xeTable.triggerBodyWheelEvent, { passive: false })
        }
      }

      globalEvents.on($xeTable, 'paste', handleGlobalPasteEvent)
      globalEvents.on($xeTable, 'copy', handleGlobalCopyEvent)
      globalEvents.on($xeTable, 'cut', handleGlobalCutEvent)
      globalEvents.on($xeTable, 'mousedown', handleGlobalMousedownEvent)
      globalEvents.on($xeTable, 'blur', handleGlobalBlurEvent)
      globalEvents.on($xeTable, 'mousewheel', handleGlobalMousewheelEvent)
      globalEvents.on($xeTable, 'keydown', handleGlobalKeydownEvent)
      globalEvents.on($xeTable, 'resize', handleGlobalResizeEvent)
      globalEvents.on($xeTable, 'contextmenu', $xeTable.handleGlobalContextmenuEvent)
      $xeTable.preventEvent(null, 'mounted', { $table: $xeTable })
    })

    onBeforeUnmount(() => {
      const tableViewportEl = refTableViewportElem.value
      if (tableViewportEl) {
        tableViewportEl.removeEventListener('wheel', $xeTable.triggerBodyWheelEvent)
      }
      internalData.cvCacheMaps = {}
      internalData.prevDragRow = null
      internalData.prevDragCol = null
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
      tableMethods.closeFilter()
      if ($xeTable.closeMenu) {
        $xeTable.closeMenu()
      }
      tablePrivateMethods.preventEvent(null, 'beforeUnmount', { $table: $xeTable })
    })

    onUnmounted(() => {
      globalEvents.off($xeTable, 'paste')
      globalEvents.off($xeTable, 'copy')
      globalEvents.off($xeTable, 'cut')
      globalEvents.off($xeTable, 'mousedown')
      globalEvents.off($xeTable, 'blur')
      globalEvents.off($xeTable, 'mousewheel')
      globalEvents.off($xeTable, 'keydown')
      globalEvents.off($xeTable, 'resize')
      globalEvents.off($xeTable, 'contextmenu')
      tablePrivateMethods.preventEvent(null, 'unmounted', { $table: $xeTable })
    })

    nextTick(() => {
      if (props.loading) {
        if (!VxeUILoadingComponent && !slots.loading) {
          errLog('vxe.error.errProp', ['loading=true', 'loading=false | <template #loading>...</template>'])
          errLog('vxe.error.reqComp', ['vxe-loading'])
        }
      }
      if ((props.showOverflow === true || props.showOverflow === 'tooltip') ||
          (props.showHeaderOverflow === true || props.showHeaderOverflow === 'tooltip') ||
          (props.showFooterOverflow === true || props.showFooterOverflow === 'tooltip') ||
          props.tooltipConfig || props.editRules) {
        if (!VxeUITooltipComponent) {
          if (props.showOverflow === true) {
            errLog('vxe.error.errProp', ['show-overflow=true', 'show-overflow=title'])
          }
          if (props.showOverflow === 'tooltip') {
            errLog('vxe.error.errProp', ['show-overflow=tooltip', 'show-overflow=title'])
          }
          if (props.showHeaderOverflow === true) {
            errLog('vxe.error.errProp', ['show-header-overflow=true', 'show-header-overflow=title'])
          }
          if (props.showHeaderOverflow === 'tooltip') {
            errLog('vxe.error.errProp', ['show-header-overflow=tooltip', 'show-header-overflow=title'])
          }
          if (props.showFooterOverflow === true) {
            errLog('vxe.error.errProp', ['show-footer-overflow=true', 'show-footer-overflow=title'])
          }
          if (props.showFooterOverflow === 'tooltip') {
            errLog('vxe.error.errProp', ['show-footer-overflow=tooltip', 'show-footer-overflow=title'])
          }
          errLog('vxe.error.reqComp', ['vxe-tooltip'])
        }
      }
    })

    provide('$xeColgroup', null)
    provide('$xeTable', $xeTable)

    $xeTable.renderVN = renderVN

    return $xeTable
  },
  render () {
    return this.renderVN()
  }
})
