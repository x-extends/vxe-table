import { defineComponent, h, ComponentPublicInstance, reactive, ref, Ref, provide, inject, nextTick, onActivated, onDeactivated, onBeforeUnmount, onUnmounted, watch, computed, onMounted } from 'vue'
import XEUtils from 'xe-utils'
import { browse, initTpImg, getTpImg, isPx, isScale, hasClass, addClass, removeClass, getEventTargetNode, getPaddingTopBottomSize, setScrollTop, setScrollLeft } from '../../ui/src/dom'
import { getLastZIndex, nextZIndex, hasChildrenList, getFuncText, isEnableConf, formatText, eqEmptyValue } from '../../ui/src/utils'
import { VxeUI } from '../../ui'
import Cell from './cell'
import TableBodyComponent from './body'
import TableHeaderComponent from './header'
import TableFooterComponent from './footer'
import tableProps from './props'
import tableEmits from './emits'
import { getRowUniqueId, clearTableAllStatus, getRowkey, getRowid, rowToVisible, colToVisible, getCellValue, setCellValue, handleFieldOrColumn, toTreePathSeq, restoreScrollLocation, getRootColumn, getRefElem, getColReMinWidth } from './util'
import { getSlotVNs } from '../../ui/src/vn'
import { warnLog, errLog } from '../../ui/src/log'
import TableCustomPanelComponent from '../module/custom/panel'
import TableFilterPanelComponent from '../module/filter/panel'
import TableImportPanelComponent from '../module/export/import-panel'
import TableExportPanelComponent from '../module/export/export-panel'
import TableMenuPanelComponent from '../module/menu/panel'

import type { VxeLoadingComponent, VxeTooltipInstance, VxeTooltipComponent, VxeTabsConstructor, VxeTabsPrivateMethods, ValueOf, VxeComponentSlotType } from 'vxe-pc-ui'
import type { VxeGridConstructor, VxeGridPrivateMethods, VxeTableConstructor, TableReactData, TableInternalData, VxeTablePropTypes, VxeToolbarConstructor, TablePrivateMethods, VxeTablePrivateRef, VxeTablePrivateComputed, VxeTablePrivateMethods, TableMethods, VxeTableMethods, VxeTableDefines, VxeTableEmits, VxeTableProps, VxeColumnPropTypes } from '../../../types'

const { getConfig, getIcon, getI18n, renderer, formats, createEvent, globalResize, interceptor, hooks, globalEvents, GLOBAL_EVENT_KEYS, useFns, renderEmptyElement } = VxeUI

const customStorageKey = 'VXE_CUSTOM_STORE'

export default defineComponent({
  name: 'VxeTable',
  props: tableProps,
  emits: tableEmits,
  setup (props, context) {
    const { slots, emit } = context

    const xID = XEUtils.uniqueId()

    // 使用已安装的组件，如果未安装则不渲染
    const VxeUILoadingComponent = VxeUI.getComponent<VxeLoadingComponent>('VxeLoading')
    const VxeUITooltipComponent = VxeUI.getComponent<VxeTooltipComponent>('VxeTooltip')

    const $xeTabs = inject<(VxeTabsConstructor & VxeTabsPrivateMethods) | null>('$xeTabs', null)

    const { computeSize } = useFns.useSize(props)

    const reactData = reactive<TableReactData>({
      isCalcColumn: false,
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
      // 复选框属性，已选中的行集合
      selectCheckboxMaps: {},
      // 当前行
      currentRow: null,
      // 单选框属性，选中列
      currentColumn: null,
      // 单选框属性，选中行
      selectRadioRow: null,
      // 表尾合计数据
      footerTableData: [],
      // 展开列信息
      expandColumn: null,
      // 树节点列信息
      treeNodeColumn: null,
      hasFixedColumn: false,
      // 已展开的行集合
      rowExpandedMaps: {},
      // 懒加载中的展开行的集合
      rowExpandLazyLoadedMaps: {},
      // 已展开树节点集合
      treeExpandedMaps: {},
      // 懒加载中的树节点的集合
      treeExpandLazyLoadedMaps: {},
      // 树节点不确定状态的集合
      treeIndeterminateMaps: {},
      // 合并单元格的对象集
      mergeList: [],
      // 合并表尾数据的对象集
      mergeFooterList: [],
      // 刷新列标识，当列筛选被改变时，触发表格刷新数据
      upDataFlag: 0,
      // 刷新列标识，当列的特定属性被改变时，触发表格刷新列
      reColumnFlag: 0,
      // 已标记的对象集
      pendingRowMaps: {},
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
        },
        insertMaps: {},
        removeMaps: {}
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
        isFooter: false
      },

      scrollVMLoading: false,

      isCalcCellHeight: 0,

      isCustomStatus: false,

      isDragRowMove: false,
      dragRow: null,
      isDragColMove: false,
      dragCol: null,
      dragTipText: '',

      _isResize: false,
      isLoading: false
    })

    const internalData: TableInternalData = {
      tZindex: 0,
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
      // 列表条件处理后数据集合
      afterFullRowMaps: {},
      // 树结构完整数据、条件处理后
      tableFullTreeData: [],
      tableSynchData: [],
      tableSourceData: [],
      // 收集的列配置（带分组）
      collectColumn: [],
      // 完整所有列（不带分组）
      tableFullColumn: [],
      // 渲染所有列
      visibleColumn: [],
      // 总的缓存数据集
      fullAllDataRowIdData: {},
      // 渲染中缓存数据
      sourceDataRowIdData: {},
      fullDataRowIdData: {},
      fullColumnIdData: {},
      fullColumnFieldData: {},
      // 列选取状态
      columnStatusMaps: {},
      // 行选取状态
      rowStatusMaps: {},
      // prevDragRow: null,

      inited: false,
      tooltipTimeout: null,
      initStatus: false,
      isActivated: false
    }

    let tableMethods = {} as TableMethods
    let tablePrivateMethods = {} as TablePrivateMethods

    const refElem = ref() as Ref<HTMLDivElement>
    const refTooltip = ref() as Ref<VxeTooltipInstance>
    const refCommTooltip = ref() as Ref<VxeTooltipInstance>
    const refValidTooltip = ref() as Ref<VxeTooltipInstance>
    const refTableMenu = ref() as Ref<any>
    const refTableFilter = ref() as Ref<ComponentPublicInstance>
    const refTableCustom = ref() as Ref<ComponentPublicInstance>

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
    const refCellResizeBar = ref() as Ref<HTMLDivElement>
    const refCellResizeTip = ref() as Ref<HTMLDivElement>
    const refEmptyPlaceholder = ref() as Ref<HTMLDivElement>

    const refDragTipElem = ref<HTMLDivElement>()
    const refDragRowLineElem = ref<HTMLDivElement>()
    const refDragColLineElem = ref<HTMLDivElement>()

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

    const computeValidOpts = computed(() => {
      return Object.assign({}, getConfig().table.validConfig, props.validConfig) as VxeTablePropTypes.ValidOpts
    })

    /**
     * @deprecated
     */
    const computeSXOpts = computed(() => {
      const virtualXOpts = computeVirtualXOpts.value
      return virtualXOpts as VxeTablePropTypes.SXOpts
    })

    const computeScrollXThreshold = computed(() => {
      const sXOpts = computeSXOpts.value
      const { threshold } = sXOpts
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
      return virtualYOpts as VxeTablePropTypes.SYOpts
    })

    const computeVirtualXOpts = computed(() => {
      return Object.assign({}, getConfig().table.scrollX, getConfig().table.virtualXConfig, props.scrollX, props.virtualXConfig) as VxeTablePropTypes.VirtualXConfig
    })

    const computeVirtualYOpts = computed(() => {
      return Object.assign({}, getConfig().table.scrollY, getConfig().table.virtualYConfig, props.scrollY, props.virtualYConfig) as VxeTablePropTypes.VirtualYConfig
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
      const sYOpts = computeSYOpts.value
      const { threshold } = sYOpts
      if (threshold) {
        return XEUtils.toNumber(threshold)
      }
      return 0
    })

    const computeRowHeightMaps = computed(() => {
      return {
        default: 48,
        medium: 44,
        small: 40,
        mini: 36
      }
    })

    const computeDefaultRowHeight = computed(() => {
      const vSize = computeSize.value
      const rowHeightMaps = computeRowHeightMaps.value
      return rowHeightMaps[vSize || 'default']
    })

    const computeColumnOpts = computed(() => {
      return Object.assign({}, getConfig().table.columnConfig, props.columnConfig) as VxeTablePropTypes.ColumnOpts
    })

    const computeCellOpts = computed(() => {
      return Object.assign({}, getConfig().table.cellConfig, props.cellConfig) as VxeTablePropTypes.CellConfig
    })

    const computeRowOpts = computed(() => {
      return Object.assign({}, getConfig().table.rowConfig, props.rowConfig) as VxeTablePropTypes.RowOpts
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
            return tableFullData.every((row) => !checkMethod({ row }))
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
      refCellResizeBar,
      refCellResizeTip,
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
      computeVirtualXOpts,
      computeVirtualYOpts,
      computeScrollbarOpts,
      computeScrollbarXToTop,
      computeScrollbarYToLeft,
      computeColumnOpts,
      computeScrollXThreshold,
      computeScrollYThreshold,
      computeDefaultRowHeight,
      computeCellOpts,
      computeRowOpts,
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

    const getNextSortOrder = (column: VxeTableDefines.ColumnInfo) => {
      const sortOpts = computeSortOpts.value
      const { orders } = sortOpts
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
      const { elemStore, visibleColumn } = internalData
      const leftFixedWidth = computeLeftFixedWidth.value
      const rightFixedWidth = computeRightFixedWidth.value
      const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
      if (bodyScrollElem) {
        const { scrollLeft, clientWidth } = bodyScrollElem
        const startWidth = scrollLeft + leftFixedWidth
        const endWidth = scrollLeft + clientWidth - rightFixedWidth
        let toVisibleIndex = -1
        let cWidth = 0
        let visibleSize = 0
        for (let colIndex = 0, colLen = visibleColumn.length; colIndex < colLen; colIndex++) {
          cWidth += visibleColumn[colIndex].renderWidth
          if (toVisibleIndex === -1 && startWidth < cWidth) {
            toVisibleIndex = colIndex
          }
          if (toVisibleIndex >= 0) {
            visibleSize++
            if (cWidth > endWidth) {
              break
            }
          }
        }
        return { toVisibleIndex: Math.max(0, toVisibleIndex), visibleSize: Math.max(1, visibleSize) }
      }
      return { toVisibleIndex: 0, visibleSize: 6 }
    }

    const computeRowHeight = () => {
      const { showOverflow } = props
      const tableHeader = refTableHeader.value
      const tableBody = refTableBody.value
      const tableBodyElem = tableBody ? tableBody.$el as HTMLDivElement : null
      const defaultRowHeight = computeDefaultRowHeight.value
      let rowHeight = 0
      if (showOverflow) {
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

    const handleVirtualYVisible = (currScrollTop?: number) => {
      const { showOverflow } = props
      const { rowHeight } = reactData
      const { elemStore, afterFullData, fullAllDataRowIdData } = internalData
      const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
      if (bodyScrollElem) {
        const clientHeight = bodyScrollElem.clientHeight
        const scrollTop = XEUtils.isNumber(currScrollTop) ? currScrollTop : bodyScrollElem.scrollTop
        const endHeight = scrollTop + clientHeight
        let toVisibleIndex = -1
        let offsetTop = 0
        let visibleSize = 0
        if (showOverflow) {
          toVisibleIndex = Math.floor(scrollTop / rowHeight)
          visibleSize = Math.ceil(clientHeight / rowHeight) + 1
        } else {
          for (let rIndex = 0, rLen = afterFullData.length; rIndex < rLen; rIndex++) {
            const row = afterFullData[rIndex]
            const rowid = getRowid($xeTable, row)
            const rowRest = fullAllDataRowIdData[rowid]
            offsetTop += rowRest ? (rowRest.height || rowHeight) : rowHeight
            if (toVisibleIndex === -1 && scrollTop < offsetTop) {
              toVisibleIndex = rIndex
            }
            if (toVisibleIndex >= 0) {
              visibleSize++
              if (offsetTop > endHeight) {
                break
              }
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

    const setMerges = (merges: VxeTableDefines.MergeOptions | VxeTableDefines.MergeOptions[], mList: VxeTableDefines.MergeItem[], rowList?: any[]) => {
      if (merges) {
        const { treeConfig } = props
        const { visibleColumn } = internalData
        if (!XEUtils.isArray(merges)) {
          merges = [merges]
        }
        if (treeConfig && merges.length) {
          errLog('vxe.error.noTree', ['merge-cells | merge-footer-items'])
        }
        merges.forEach((item) => {
          let { row, col, rowspan, colspan } = item
          if (rowList && XEUtils.isNumber(row)) {
            row = rowList[row]
          }
          if (XEUtils.isNumber(col)) {
            col = visibleColumn[col]
          }
          if ((rowList ? row : XEUtils.isNumber(row)) && col && (rowspan || colspan)) {
            rowspan = XEUtils.toNumber(rowspan) || 1
            colspan = XEUtils.toNumber(colspan) || 1
            if (rowspan > 1 || colspan > 1) {
              const mcIndex = XEUtils.findIndexOf(mList, item => (item._row === row || getRowid($xeTable, item._row) === getRowid($xeTable, row)) && ((item as any)._col.id === col || item._col.id === (col as VxeTableDefines.ColumnInfo).id))
              const mergeItem = mList[mcIndex]
              if (mergeItem) {
                mergeItem.rowspan = rowspan
                mergeItem.colspan = colspan
                mergeItem._rowspan = rowspan
                mergeItem._colspan = colspan
              } else {
                const mergeRowIndex = rowList ? $xeTable.findRowIndexOf(rowList, row) : row
                const mergeColIndex = tableMethods.getVTColumnIndex(col)
                mList.push({
                  row: mergeRowIndex,
                  col: mergeColIndex,
                  rowspan,
                  colspan,
                  _row: row,
                  _col: col,
                  _rowspan: rowspan,
                  _colspan: colspan
                })
              }
            }
          }
        })
      }
    }

    const removeMerges = (merges: VxeTableDefines.MergeOptions | VxeTableDefines.MergeOptions[], mList: VxeTableDefines.MergeItem[], rowList?: any) => {
      const rest: VxeTableDefines.MergeItem[] = []
      if (merges) {
        const { treeConfig } = props
        const { visibleColumn } = internalData
        if (!XEUtils.isArray(merges)) {
          merges = [merges]
        }
        if (treeConfig && merges.length) {
          errLog('vxe.error.noTree', ['merge-cells | merge-footer-items'])
        }
        merges.forEach((item) => {
          let { row, col } = item
          if (rowList && XEUtils.isNumber(row)) {
            row = rowList[row]
          }
          if (XEUtils.isNumber(col)) {
            col = visibleColumn[col]
          }
          const mcIndex = XEUtils.findIndexOf(mList, item => (item._row === row || getRowid($xeTable, item._row) === getRowid($xeTable, row)) && ((item as any)._col.id === col || item._col.id === (col as VxeTableDefines.ColumnInfo).id))
          if (mcIndex > -1) {
            const rItems = mList.splice(mcIndex, 1)
            rest.push(rItems[0])
          }
        })
      }
      return rest
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
      const { storage, restoreStore } = customOpts
      const isAllCustom = storage === true
      const storageOpts: VxeTableDefines.VxeTableCustomStorageObj = isAllCustom ? {} : Object.assign({}, storage || {})
      const isCustomResizable = isAllCustom || storageOpts.resizable
      const isCustomVisible = isAllCustom || storageOpts.visible
      const isCustomFixed = isAllCustom || storageOpts.fixed
      const isCustomSort = isAllCustom || storageOpts.sort
      if ((customConfig ? isEnableConf(customOpts) : customOpts.enabled) && (isCustomResizable || isCustomVisible || isCustomFixed || isCustomSort)) {
        if (!tableId) {
          errLog('vxe.error.reqProp', ['id'])
          return
        }
        const storeData: VxeTableDefines.CustomStoreData = getCustomStorageMap(tableId)
        if (restoreStore) {
          return Promise.resolve(
            restoreStore({ id: tableId, type: 'restore', storeData })
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
      const columnOpts = computeColumnOpts.value
      const columnDragOpts = computeColumnDragOpts.value
      const { isCrossDrag, isSelfToChildDrag } = columnDragOpts
      const customOpts = computeCustomOpts.value
      const { storage } = customOpts
      const rowOpts = computeRowOpts.value
      const isGroup = collectColumn.some(hasChildrenList)
      let isAllOverflow = !!props.showOverflow
      let expandColumn: VxeTableDefines.ColumnInfo | undefined
      let treeNodeColumn: VxeTableDefines.ColumnInfo | undefined
      let checkboxColumn: VxeTableDefines.ColumnInfo | undefined
      let radioColumn: VxeTableDefines.ColumnInfo | undefined
      let htmlColumn: VxeTableDefines.ColumnInfo | undefined
      let hasFixed: VxeColumnPropTypes.Fixed | undefined
      const handleFunc = (column: VxeTableDefines.ColumnInfo, index: number, items: VxeTableDefines.ColumnInfo[], path?: string[], parentColumn?: VxeTableDefines.ColumnInfo) => {
        const { id: colid, field, fixed, type, treeNode } = column
        const rest = { $index: -1, _index: -1, column, colid, index, items, parent: parentColumn || null, width: 0 }
        if (field) {
          if (fullColumnFieldData[field]) {
            errLog('vxe.error.colRepet', ['field', field])
          }
          fullColumnFieldData[field] = rest
        } else {
          if ((storage && !type) || (columnOpts.drag && (isCrossDrag || isSelfToChildDrag))) {
            errLog('vxe.error.reqProp', [`${column.getTitle() || type || ''} -> column.field`])
          }
        }
        if (!hasFixed && fixed) {
          hasFixed = fixed
        }
        if (!htmlColumn && type === 'html') {
          htmlColumn = column
        }
        if (treeNode) {
          if (process.env.VUE_APP_VXE_ENV === 'development') {
            if (treeNodeColumn) {
              warnLog('vxe.error.colRepet', ['tree-node', treeNode])
            }
          }
          if (!treeNodeColumn) {
            treeNodeColumn = column
          }
        } else if (type === 'expand') {
          if (process.env.VUE_APP_VXE_ENV === 'development') {
            if (expandColumn) {
              warnLog('vxe.error.colRepet', ['type', type])
            }
          }
          if (!expandColumn) {
            expandColumn = column
          }
        }
        if (process.env.VUE_APP_VXE_ENV === 'development') {
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

      if (process.env.VUE_APP_VXE_ENV === 'development') {
        if (expandColumn && mouseOpts.area) {
          errLog('vxe.error.errConflicts', ['mouse-config.area', 'column.type=expand'])
        }
      }

      if (process.env.VUE_APP_VXE_ENV === 'development') {
        if (htmlColumn) {
          if (!columnOpts.useKey) {
            errLog('vxe.error.reqProp', ['column-config.useKey & column.type=html'])
          }
          if (!rowOpts.useKey) {
            errLog('vxe.error.reqProp', ['row-config.useKey & column.type=html'])
          }
        }
      }

      reactData.isGroup = isGroup
      reactData.treeNodeColumn = treeNodeColumn
      reactData.expandColumn = expandColumn
      reactData.isAllOverflow = isAllOverflow
    }

    const updateHeight = () => {
      internalData.customHeight = calcTableHeight('height')
      internalData.customMinHeight = calcTableHeight('minHeight')
      internalData.customMaxHeight = calcTableHeight('maxHeight')
    }

    const calcColumnAutoWidth = (column: VxeTableDefines.ColumnInfo, wrapperEl: HTMLDivElement) => {
      const cellElList = wrapperEl.querySelectorAll(`.vxe-header--column.${column.id}>.vxe-cell,.vxe-body--column.${column.id}>.vxe-cell,.vxe-footer--column.${column.id}>.vxe-cell`)
      const firstCellEl = cellElList[0]
      let paddingSize = 0
      if (firstCellEl) {
        const cellStyle = getComputedStyle(firstCellEl)
        paddingSize = Math.floor(XEUtils.toNumber(cellStyle.paddingLeft) + XEUtils.toNumber(cellStyle.paddingRight)) + 2
      }
      let colWidth = column.renderAutoWidth - paddingSize
      XEUtils.arrayEach(cellElList, (itemEl) => {
        const cellEl = itemEl as HTMLElement
        const thElem = cellEl.parentElement as HTMLElement
        let titleWidth = 0
        if (`${thElem.tagName}`.toLowerCase() === 'th') {
          XEUtils.arrayEach(cellEl.children, (btnEl) => {
            titleWidth += (btnEl as HTMLElement).offsetWidth + 1
          })
        } else {
          const labelEl = cellEl.firstElementChild as HTMLElement
          if (labelEl) {
            titleWidth = labelEl.offsetWidth
          }
        }
        if (titleWidth) {
          colWidth = Math.max(colWidth, Math.ceil(titleWidth) + 4)
        }
      })
      return colWidth + paddingSize
    }

    const calcCellWidth = () => {
      const autoWidthColumnList = computeAutoWidthColumnList.value
      reactData.isCalcColumn = true
      return nextTick().then(() => {
        const { fullColumnIdData } = internalData
        const el = refElem.value
        if (el) {
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
        }
        reactData.isCalcColumn = false
      })
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
      const scrollbarOpts = computeScrollbarOpts.value
      const tableBody = refTableBody.value
      const bodyElem = tableBody ? tableBody.$el as HTMLDivElement : null
      if (!bodyElem) {
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
      let tableWidth = 0
      const minCellWidth = 40 // 列宽最少限制 40px
      const bodyWidth = bodyElem.clientWidth
      let remainWidth = bodyWidth
      let meanWidth = remainWidth / 100
      const { fit } = props
      const { columnStore } = reactData
      const { resizeList, pxMinList, autoMinList, pxList, scaleList, scaleMinList, autoList, remainList } = columnStore
      // 最小宽
      pxMinList.forEach((column) => {
        const minWidth = XEUtils.toInteger(column.minWidth)
        tableWidth += minWidth
        column.renderWidth = minWidth
      })
      // 最小自适应
      autoMinList.forEach((column) => {
        const scaleWidth = Math.max(60, XEUtils.toInteger(column.renderAutoWidth))
        tableWidth += scaleWidth
        column.renderWidth = scaleWidth
      })
      // 最小百分比
      scaleMinList.forEach((column) => {
        const scaleWidth = Math.floor(XEUtils.toInteger(column.minWidth) * meanWidth)
        tableWidth += scaleWidth
        column.renderWidth = scaleWidth
      })
      // 固定百分比
      scaleList.forEach((column) => {
        const scaleWidth = Math.floor(XEUtils.toInteger(column.width) * meanWidth)
        tableWidth += scaleWidth
        column.renderWidth = scaleWidth
      })
      // 固定宽
      pxList.forEach((column) => {
        const width = XEUtils.toInteger(column.width)
        tableWidth += width
        column.renderWidth = width
      })
      // 自适应宽
      autoList.forEach((column) => {
        const width = Math.max(60, XEUtils.toInteger(column.renderAutoWidth))
        tableWidth += width
        column.renderWidth = width
      })
      // 调整了列宽
      resizeList.forEach((column) => {
        const width = XEUtils.toInteger(column.resizeWidth)
        tableWidth += width
        column.renderWidth = width
      })
      remainWidth -= tableWidth
      meanWidth = remainWidth > 0 ? Math.floor(remainWidth / (scaleMinList.length + pxMinList.length + autoMinList.length + remainList.length)) : 0
      if (fit) {
        if (remainWidth > 0) {
          scaleMinList.concat(pxMinList).concat(autoMinList).forEach((column) => {
            tableWidth += meanWidth
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
        tableWidth += width
      })
      if (fit) {
        /**
         * 偏移量算法
         * 如果所有列足够放的情况下，从最后动态列开始分配
         */
        const dynamicList = scaleList.concat(scaleMinList).concat(pxMinList).concat(autoMinList).concat(remainList)
        let dynamicSize = dynamicList.length - 1
        if (dynamicSize > 0) {
          let i = bodyWidth - tableWidth
          if (i > 0) {
            while (i > 0 && dynamicSize >= 0) {
              i--
              dynamicList[dynamicSize--].renderWidth++
            }
            tableWidth = bodyWidth
          }
        }
      }
      const tableHeight = bodyElem.offsetHeight
      const overflowY = yHandleEl.scrollHeight > yHandleEl.clientHeight
      reactData.scrollbarWidth = overflowY ? Math.max(scrollbarOpts.width || 0, yHandleEl.offsetWidth - yHandleEl.clientWidth) : 0
      reactData.overflowY = overflowY
      internalData.tableWidth = tableWidth
      internalData.tableHeight = tableHeight

      const headerTableElem = getRefElem(elemStore['main-header-table'])
      const footerTableElem = getRefElem(elemStore['main-footer-table'])
      const headerHeight = headerTableElem ? headerTableElem.clientHeight : 0
      const overflowX = tableWidth > bodyWidth
      const footerHeight = footerTableElem ? footerTableElem.clientHeight : 0
      reactData.scrollbarHeight = overflowX ? Math.max(scrollbarOpts.height || 0, xHandleEl.offsetHeight - xHandleEl.clientHeight) : 0
      internalData.headerHeight = headerHeight
      internalData.footerHeight = footerHeight
      reactData.overflowX = overflowX
      updateHeight()
      reactData.parentHeight = Math.max(internalData.headerHeight + footerHeight + 20, $xeTable.getParentHeight())
      if (overflowX) {
        $xeTable.checkScrolling()
      }
    }

    // const updateCellOffset = () => {
    //   const { chTimeout, chRunTime } = internalData
    //   if (chTimeout) {
    //     clearTimeout(chTimeout)
    //   }
    //   if (!chRunTime || chRunTime + 10 < Date.now()) {
    //     internalData.chRunTime = Date.now()
    //   }
    //   internalData.chTimeout = setTimeout(() => {
    //     internalData.chRunTime = undefined
    //     internalData.chTimeout = undefined
    //   }, 80)
    // }

    const calcCellHeight = () => {
      const { showOverflow } = props
      const { tableData, scrollXLoad } = reactData
      const { fullAllDataRowIdData } = internalData
      const el = refElem.value
      if (!showOverflow && el) {
        let paddingTop = 0
        let paddingBottom = 0
        let calcPadding = false
        tableData.forEach(row => {
          const rowid = getRowid($xeTable, row)
          const rowRest = fullAllDataRowIdData[rowid]
          const cellList = el.querySelectorAll(`.vxe-body--row[rowid="${rowid}"]>.vxe-body--column>.vxe-cell>.vxe-cell--auto-wrapper`)
          if (rowRest && cellList.length) {
            let height = 0
            for (let i = 0; i < cellList.length; i++) {
              const cellElem = cellList[i] as HTMLElement
              const tdEl = cellElem.parentElement as HTMLTableCellElement
              if (!tdEl || !tdEl.clientWidth) {
                break
              }
              if (!calcPadding) {
                paddingTop = XEUtils.toNumber(getComputedStyle(tdEl).paddingTop)
                paddingBottom = XEUtils.toNumber(getComputedStyle(tdEl).paddingBottom)
                calcPadding = true
              }
              let cellHeight = paddingTop + paddingBottom
              if (cellElem) {
                cellHeight += cellElem.clientHeight
              }
              height = Math.max(height, cellHeight)
            }
            rowRest.height = scrollXLoad ? Math.max(rowRest.height, height) : height
          }
        })
        reactData.isCalcCellHeight++
      }
      // updateCellOffset()
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
      const { afterFullData, fullDataRowIdData, fullAllDataRowIdData } = internalData
      const fullMaps: Record<string, any> = {}
      afterFullData.forEach((row, index) => {
        const rowid = getRowid($xeTable, row)
        const rowRest = fullAllDataRowIdData[rowid]
        const seq = index + 1
        if (rowRest) {
          rowRest.seq = seq
          rowRest._index = index
        } else {
          const rest = { row, rowid, seq, index: -1, $index: -1, _index: index, treeIndex: -1, items: [], parent: null, level: 0, height: 0, oTop: 0 }
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
      const { fullDataRowIdData, fullAllDataRowIdData, afterTreeFullData } = internalData
      const treeOpts = computeTreeOpts.value
      const { transform } = treeOpts
      const childrenField = treeOpts.children || treeOpts.childrenField
      const fullMaps: Record<string, any> = {}
      if (treeConfig) {
        XEUtils.eachTree(afterTreeFullData, (row, index, items, path) => {
          const rowid = getRowid($xeTable, row)
          const rowRest = fullAllDataRowIdData[rowid]
          const seq = path.map((num, i) => i % 2 === 0 ? (Number(num) + 1) : '.').join('')
          if (rowRest) {
            rowRest.seq = seq
            rowRest.treeIndex = index
          } else {
            const rest = { row, rowid, seq, index: -1, $index: -1, _index: -1, treeIndex: -1, items: [], parent: null, level: 0, height: 0, oTop: 0 }
            fullAllDataRowIdData[rowid] = rest
            fullDataRowIdData[rowid] = rest
          }
          fullMaps[rowid] = row
        }, { children: transform ? treeOpts.mapChildrenField : childrenField })
        internalData.afterFullRowMaps = fullMaps
        updateAfterListIndex()
      } else {
        updateAfterListIndex()
      }
    }

    /**
     * 如果为虚拟树，将树结构拍平
     * @returns
     */
    const handleVirtualTreeToList = () => {
      const { treeConfig } = props
      const { treeExpandedMaps } = reactData
      const { fullAllDataRowIdData } = internalData
      const treeOpts = computeTreeOpts.value
      const childrenField = treeOpts.children || treeOpts.childrenField
      if (treeConfig && treeOpts.transform) {
        const fullData: any[] = []
        const expandMaps: {
          [key: string]: number
        } = {}
        XEUtils.eachTree(internalData.afterTreeFullData, (row, index, items, path, parentRow) => {
          const rowid = getRowid($xeTable, row)
          const parentRowid = getRowid($xeTable, parentRow)
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
      }
      return internalData.afterFullData
    }

    /**
     * 获取处理后全量的表格数据
     * 如果存在筛选条件，继续处理
     */
    const updateAfterFullData = () => {
      const { treeConfig } = props
      const { tableFullColumn, tableFullData, tableFullTreeData } = internalData
      const filterOpts = computeFilterOpts.value
      const sortOpts = computeSortOpts.value
      const treeOpts = computeTreeOpts.value
      const childrenField = treeOpts.children || treeOpts.childrenField
      const { transform } = treeOpts
      const { remote: allRemoteFilter, filterMethod: allFilterMethod } = filterOpts
      const { remote: allRemoteSort, sortMethod: allSortMethod, multiple: sortMultiple, chronological } = sortOpts
      let tableData: any[] = []
      let tableTree: any[] = []

      // 处理列
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
                return allFilterMethod({ options: itemList, values: valueList, cellValue, row, column })
              } else if (tdFilterMethod) {
                return itemList.some((item) => tdFilterMethod({ value: item.value, option: item, cellValue, row, column, $table: $xeTable }))
              }
              return valueList.indexOf(XEUtils.get(row, column.field)) > -1
            })
          }
          if (treeConfig && transform) {
            // 筛选虚拟树
            tableTree = XEUtils.searchTree(tableFullTreeData, handleFilter, {
              original: true,
              isEvery: true,
              children: treeOpts.mapChildrenField,
              mapChildren: childrenField
            })
            tableData = tableTree
          } else {
            tableData = treeConfig ? tableFullTreeData.filter(handleFilter) : tableFullData.filter(handleFilter)
            tableTree = tableData
          }
        } else {
          if (treeConfig && transform) {
            // 还原虚拟树
            tableTree = XEUtils.searchTree(tableFullTreeData, () => true, {
              original: true,
              isEvery: true,
              children: treeOpts.mapChildrenField,
              mapChildren: childrenField
            })
            tableData = tableTree
          } else {
            tableData = treeConfig ? tableFullTreeData.slice(0) : tableFullData.slice(0)
            tableTree = tableData
          }
        }

        // 处理排序（不能用于树形结构）
        // 支持单列、多列、组合排序
        if (!allRemoteSort && orderColumns.length) {
          if (treeConfig && transform) {
            // 虚拟树和列表一样，只能排序根级节点
            if (allSortMethod) {
              const sortRests = allSortMethod({ data: tableTree, sortList: orderColumns, $table: $xeTable })
              tableTree = XEUtils.isArray(sortRests) ? sortRests : tableTree
            } else {
              tableTree = XEUtils.orderBy(tableTree, orderColumns.map(({ column, order }) => [getOrderField(column), order]))
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
        if (treeConfig && transform) {
          // 还原虚拟树
          tableTree = XEUtils.searchTree(tableFullTreeData, () => true, {
            original: true,
            isEvery: true,
            children: treeOpts.mapChildrenField,
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
      updateAfterDataIndex()
    }

    const updateStyle = () => {
      const { border, showOverflow: allColumnOverflow, showHeaderOverflow: allColumnHeaderOverflow, showFooterOverflow: allColumnFooterOverflow, mouseConfig, spanMethod, footerSpanMethod } = props
      const { isGroup, currentRow, tableColumn, scrollXLoad, scrollYLoad, scrollbarWidth, scrollbarHeight, columnStore, editStore, isAllOverflow, expandColumn } = reactData
      const { visibleColumn, fullColumnIdData, tableHeight, tableWidth, headerHeight, footerHeight, elemStore, customHeight, customMinHeight, customMaxHeight } = internalData
      const el = refElem.value
      if (!el) {
        return
      }
      const containerList = ['main', 'left', 'right']
      const emptyPlaceholderElem = refEmptyPlaceholder.value
      const cellOffsetWidth = computeCellOffsetWidth.value
      const mouseOpts = computeMouseOpts.value
      const bodyWrapperElem = getRefElem(elemStore['main-body-wrapper'])
      const bodyTableElem = getRefElem(elemStore['main-body-table'])
      if (emptyPlaceholderElem) {
        emptyPlaceholderElem.style.top = `${headerHeight}px`
        emptyPlaceholderElem.style.height = bodyWrapperElem ? `${bodyWrapperElem.offsetHeight - scrollbarHeight}px` : ''
      }

      let bodyHeight = 0
      let bodyMaxHeight = 0
      const bodyMinHeight = customMinHeight - headerHeight - footerHeight - scrollbarHeight
      if (customMaxHeight) {
        bodyMaxHeight = Math.max(bodyMinHeight, customMaxHeight - headerHeight - footerHeight - scrollbarHeight)
      }
      if (customHeight) {
        bodyHeight = customHeight - headerHeight - footerHeight - scrollbarHeight
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

      const xLeftCornerEl = refScrollXLeftCornerElem.value
      const xRightCornerEl = refScrollXRightCornerElem.value
      const scrollbarXToTop = computeScrollbarXToTop.value
      const scrollXVirtualEl = refScrollXVirtualElem.value
      if (scrollXVirtualEl) {
        scrollXVirtualEl.style.height = `${scrollbarHeight}px`
        scrollXVirtualEl.style.visibility = scrollbarHeight ? 'visible' : 'hidden'
      }
      const xWrapperEl = refScrollXWrapperElem.value
      if (xWrapperEl) {
        xWrapperEl.style.left = scrollbarXToTop ? `${scrollbarWidth}px` : ''
        xWrapperEl.style.width = `${el.clientWidth - scrollbarWidth}px`
      }
      if (xLeftCornerEl) {
        xLeftCornerEl.style.width = scrollbarXToTop ? `${scrollbarWidth}px` : ''
        xLeftCornerEl.style.display = scrollbarXToTop ? (scrollbarWidth && scrollbarHeight ? 'block' : '') : ''
      }
      if (xRightCornerEl) {
        xRightCornerEl.style.width = scrollbarXToTop ? '' : `${scrollbarWidth}px`
        xRightCornerEl.style.display = scrollbarXToTop ? '' : (scrollbarWidth && scrollbarHeight ? 'block' : '')
      }

      const scrollYVirtualEl = refScrollYVirtualElem.value
      if (scrollYVirtualEl) {
        scrollYVirtualEl.style.width = `${scrollbarWidth}px`
        scrollYVirtualEl.style.height = `${bodyHeight + headerHeight + footerHeight}px`
        scrollYVirtualEl.style.visibility = scrollbarWidth ? 'visible' : 'hidden'
      }
      const yTopCornerEl = refScrollYTopCornerElem.value
      if (yTopCornerEl) {
        yTopCornerEl.style.height = `${headerHeight}px`
        yTopCornerEl.style.display = headerHeight ? 'block' : ''
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
        yBottomCornerEl.style.display = footerHeight ? 'block' : ''
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
            let tWidth = tableWidth
            let renderColumnList = tableColumn
            let isOptimizeMode = false

            if (isGroup) {
              renderColumnList = visibleColumn

              if (fixedType) {
                if (wrapperElem) {
                  wrapperElem.style.width = tWidth ? `${tWidth}px` : ''
                }
              }
            } else {
              // 如果是使用优化模式
              if (scrollXLoad || scrollYLoad || allColumnHeaderOverflow) {
                if (spanMethod || footerSpanMethod) {
                  // 如果不支持优化模式
                } else {
                  isOptimizeMode = true
                }
              }

              if (fixedType) {
                renderColumnList = visibleColumn
                // 如果是使用优化模式
                if (isOptimizeMode) {
                  renderColumnList = fixedColumn || []
                }

                if (!isOptimizeMode) {
                  if (wrapperElem) {
                    wrapperElem.style.width = tWidth ? `${tWidth}px` : ''
                  }
                }
              }
            }

            tWidth = renderColumnList.reduce((previous, column) => previous + column.renderWidth, 0)

            if (currScrollElem) {
              currScrollElem.style.height = `${headerHeight}px`
            }

            if (tableElem) {
              tableElem.style.width = tWidth ? `${tWidth}px` : ''
            }

            const repairElem = getRefElem(elemStore[`${name}-${layout}-repair`])
            if (repairElem) {
              repairElem.style.width = `${tableWidth}px`
            }

            const listElem = getRefElem(elemStore[`${name}-${layout}-list`])
            if (isGroup && listElem) {
              XEUtils.arrayEach(listElem.querySelectorAll('.col--group'), (thElem: any) => {
                const colNode = $xeTable.getColumnNode(thElem)
                if (colNode) {
                  const column = colNode.item
                  const { showHeaderOverflow } = column
                  const cellOverflow = XEUtils.isBoolean(showHeaderOverflow) ? showHeaderOverflow : allColumnHeaderOverflow
                  const showEllipsis = cellOverflow === 'ellipsis'
                  const showTitle = cellOverflow === 'title'
                  const showTooltip = cellOverflow === true || cellOverflow === 'tooltip'
                  const hasEllipsis = showTitle || showTooltip || showEllipsis
                  let childWidth = 0
                  let countChild = 0
                  if (hasEllipsis) {
                    XEUtils.eachTree(column.children, (item) => {
                      if (!item.children || !column.children.length) {
                        countChild++
                      }
                      childWidth += item.renderWidth
                    }, { children: 'children' })
                  }
                  thElem.style.width = hasEllipsis ? `${childWidth - countChild - (border ? 2 : 0)}px` : ''
                }
              })
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
              fixedWrapperElem.style.height = `${customHeight > 0 ? customHeight : (tableHeight + headerHeight + footerHeight + scrollbarHeight)}px`
              fixedWrapperElem.style.width = `${fixedColumn.reduce((previous, column) => previous + column.renderWidth, 0)}px`
            }

            let tWidth = tableWidth
            let renderColumnList = tableColumn

            let isOptimizeMode = false
            // 如果是使用优化模式
            if (scrollXLoad || scrollYLoad || (allColumnOverflow && isAllOverflow)) {
              if (expandColumn || spanMethod || footerSpanMethod) {
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

              if (!isOptimizeMode) {
                if (wrapperElem) {
                  wrapperElem.style.width = tWidth ? `${tWidth}px` : ''
                }
              }
            }

            tWidth = renderColumnList.reduce((previous, column) => previous + column.renderWidth, 0)

            if (tableElem) {
              tableElem.style.width = tWidth ? `${tWidth}px` : ''
              // 兼容性处理
              tableElem.style.paddingRight = scrollbarWidth && fixedType && (browse['-moz'] || browse.safari) ? `${scrollbarWidth}px` : ''
            }
            const emptyBlockElem = getRefElem(elemStore[`${name}-${layout}-emptyBlock`])
            if (emptyBlockElem) {
              emptyBlockElem.style.width = tWidth ? `${tWidth}px` : ''
            }
          } else if (layout === 'footer') {
            let tWidth = tableWidth

            let renderColumnList = tableColumn
            let isOptimizeMode = false
            // 如果是使用优化模式
            if (scrollXLoad || scrollYLoad || allColumnFooterOverflow) {
              if (spanMethod || footerSpanMethod) {
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

              if (!isOptimizeMode) {
                if (wrapperElem) {
                  wrapperElem.style.width = tWidth ? `${tWidth}px` : ''
                }
              }
            }

            tWidth = renderColumnList.reduce((previous, column) => previous + column.renderWidth, 0)

            if (currScrollElem) {
              currScrollElem.style.height = `${footerHeight}px`
              // 如果是固定列
              if (fixedWrapperElem) {
                if (wrapperElem) {
                  wrapperElem.style.top = `${customHeight > 0 ? customHeight - footerHeight - scrollbarHeight : tableHeight + headerHeight}px`
                }
              }
            }
            if (tableElem) {
              tableElem.style.width = tWidth ? `${tWidth}px` : ''
            }
          }
          const colgroupElem = getRefElem(elemStore[`${name}-${layout}-colgroup`])
          if (colgroupElem) {
            XEUtils.arrayEach(colgroupElem.children, (colElem: any) => {
              const colid = colElem.getAttribute('name')
              if (fullColumnIdData[colid]) {
                const colRest = fullColumnIdData[colid]
                const column = colRest.column
                const { showHeaderOverflow, showFooterOverflow, showOverflow } = column
                let cellOverflow
                colElem.style.width = `${column.renderWidth}px`
                if (layout === 'header') {
                  cellOverflow = XEUtils.isUndefined(showHeaderOverflow) || XEUtils.isNull(showHeaderOverflow) ? allColumnHeaderOverflow : showHeaderOverflow
                } else if (layout === 'footer') {
                  cellOverflow = XEUtils.isUndefined(showFooterOverflow) || XEUtils.isNull(showFooterOverflow) ? allColumnFooterOverflow : showFooterOverflow
                } else {
                  cellOverflow = XEUtils.isUndefined(showOverflow) || XEUtils.isNull(showOverflow) ? allColumnOverflow : showOverflow
                }
                const showEllipsis = cellOverflow === 'ellipsis'
                const showTitle = cellOverflow === 'title'
                const showTooltip = cellOverflow === true || cellOverflow === 'tooltip'
                let hasEllipsis = showTitle || showTooltip || showEllipsis
                const listElem = getRefElem(elemStore[`${name}-${layout}-list`])
                // 纵向虚拟滚动不支持动态行高
                if (scrollYLoad && !hasEllipsis) {
                  hasEllipsis = true
                }
                if (listElem) {
                  XEUtils.arrayEach(listElem.querySelectorAll(`.${column.id}`), (elem: any) => {
                    const colspan = parseInt(elem.getAttribute('colspan') || 1)
                    const cellElem = elem.querySelector('.vxe-cell')
                    let colWidth = column.renderWidth
                    if (cellElem) {
                      if (colspan > 1) {
                        const columnIndex = $xeTable.getColumnIndex(column)
                        for (let index = 1; index < colspan; index++) {
                          const nextColumn = $xeTable.getColumns(columnIndex + index)
                          if (nextColumn) {
                            colWidth += nextColumn.renderWidth
                          }
                        }
                      }
                      cellElem.style.width = hasEllipsis ? `${colWidth - (cellOffsetWidth * colspan)}px` : ''
                    }
                  })
                }
              }
            })
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
                const column = tableMethods.getColumnByField(field)
                if (column && column.sortable) {
                  column.order = order
                  column.sortTime = Date.now() + index
                }
              }
            })
            if (!sortOpts.remote) {
              tablePrivateMethods.handleTableData(true).then(updateStyle)
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
          tableMethods.setAllRowExpand(true)
        } else if (expandRowKeys) {
          const defExpandeds: any[] = []
          expandRowKeys.forEach((rowid: any) => {
            if (fullDataRowIdData[rowid]) {
              defExpandeds.push(fullDataRowIdData[rowid].row)
            }
          })
          tableMethods.setRowExpand(defExpandeds, true)
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
      if (row && (isForce || (!checkMethod || checkMethod({ row })))) {
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
      const { selectCheckboxMaps } = reactData
      const { afterFullData, checkboxReserveRowMap } = internalData
      const treeOpts = computeTreeOpts.value
      const childrenField = treeOpts.children || treeOpts.childrenField
      const checkboxOpts = computeCheckboxOpts.value
      const { checkField, reserve, checkMethod } = checkboxOpts
      const indeterminateField = checkboxOpts.indeterminateField || checkboxOpts.halfField
      const selectRowMaps: Record<string, any> = {}
      /**
       * 绑定属性方式（高性能，有污染）
       * 必须在行数据存在对应的属性，否则将不响应
       */
      if (checkField) {
        const checkValFn = (row: any) => {
          if (isForce || (!checkMethod || checkMethod({ row }))) {
            if (checked) {
              selectRowMaps[getRowid($xeTable, row)] = row
            }
            XEUtils.set(row, checkField, checked)
          }
          if (treeConfig && indeterminateField) {
            XEUtils.set(row, indeterminateField, false)
          }
        }
        // 如果存在选中方法
        // 如果方法成立，则更新值，否则忽略该数据
        if (treeConfig) {
          XEUtils.eachTree(afterFullData, checkValFn, { children: childrenField })
        } else {
          afterFullData.forEach(checkValFn)
        }
      } else {
        /**
           * 默认方式（低性能，无污染）
           * 无需任何属性，直接绑定
           */
        if (treeConfig) {
          if (checked) {
            /**
               * 如果是树勾选
               * 如果方法成立，则添加到临时集合中
               */
            XEUtils.eachTree(afterFullData, (row) => {
              if (isForce || (!checkMethod || checkMethod({ row }))) {
                selectRowMaps[getRowid($xeTable, row)] = row
              }
            }, { children: childrenField })
          } else {
            /**
               * 如果是树取消
               * 如果方法成立，则不添加到临时集合中
               */
            if (!isForce && checkMethod) {
              XEUtils.eachTree(afterFullData, (row) => {
                const rowid = getRowid($xeTable, row)
                if (checkMethod({ row }) ? 0 : selectCheckboxMaps[rowid]) {
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
                const rowid = getRowid($xeTable, row)
                if (selectCheckboxMaps[rowid] || checkMethod({ row })) {
                  selectRowMaps[rowid] = row
                }
              })
            } else {
              afterFullData.forEach(row => {
                selectRowMaps[getRowid($xeTable, row)] = row
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
                const rowid = getRowid($xeTable, row)
                if (checkMethod({ row }) ? 0 : selectCheckboxMaps[rowid]) {
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
      reactData.selectCheckboxMaps = checkField ? {} : selectRowMaps

      reactData.isAllSelected = checked
      reactData.isIndeterminate = false
      reactData.treeIndeterminateMaps = {}
      internalData.treeIndeterminateRowMaps = {}
      tablePrivateMethods.checkSelectionStatus()
      return nextTick()
    }

    // 还原展开、选中等相关状态
    const handleReserveStatus = () => {
      const { treeConfig } = props
      const { expandColumn, currentRow, selectCheckboxMaps, selectRadioRow, rowExpandedMaps, treeExpandedMaps } = reactData
      const { fullDataRowIdData, fullAllDataRowIdData, radioReserveRow } = internalData
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
      reactData.selectCheckboxMaps = getRecoverRowMaps(selectCheckboxMaps) // 刷新多选行状态
      // 还原保留选中状态
      if (checkboxOpts.reserve) {
        handleCheckedCheckboxRow(handleReserveRow(internalData.checkboxReserveRowMap), true, true)
      }
      if (currentRow && !fullAllDataRowIdData[getRowid($xeTable, currentRow)]) {
        reactData.currentRow = null // 刷新当前行状态
      }
      // 行展开
      reactData.rowExpandedMaps = expandColumn ? getRecoverRowMaps(rowExpandedMaps) : {} // 刷新行展开状态
      // 还原保留状态
      if (expandColumn && expandOpts.reserve) {
        tableMethods.setRowExpand(handleReserveRow(internalData.rowExpandedReserveRowMap), true)
      }
      // 树展开
      reactData.treeExpandedMaps = treeConfig ? getRecoverRowMaps(treeExpandedMaps) : {} // 刷新树展开状态
      if (treeConfig && treeOpts.reserve) {
        tableMethods.setTreeExpand(handleReserveRow(internalData.treeExpandedReserveRowMap), true)
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
          tableMethods.setAllTreeExpand(true)
        } else if (expandRowKeys) {
          const defExpandeds: any[] = []
          const rowkey = getRowkey($xeTable)
          expandRowKeys.forEach((rowid: any) => {
            const matchObj = XEUtils.findTree(tableFullData, item => rowid === XEUtils.get(item, rowkey), { children: childrenField })
            if (matchObj) {
              defExpandeds.push(matchObj.item)
            }
          })
          tableMethods.setTreeExpand(defExpandeds, true)
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
          const { treeExpandLazyLoadedMaps } = reactData
          const { fullAllDataRowIdData } = internalData
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
              return tableMethods.loadTreeChildren(row, childRecords).then(childRows => {
                const { treeExpandedMaps } = reactData
                if (childRows.length && !treeExpandedMaps[rowid]) {
                  treeExpandedMaps[rowid] = row
                }
                // 如果当前节点已选中，则展开后子节点也被选中
                if (!checkStrictly && tableMethods.isCheckedByCheckboxRow(row)) {
                  handleCheckedCheckboxRow(childRows, true)
                }
                return nextTick().then(() => {
                  if (transform) {
                    tablePrivateMethods.handleTableData()
                    updateAfterDataIndex()
                    return nextTick()
                  }
                })
              })
            }
          }).catch(() => {
            const { treeExpandLazyLoadedMaps } = reactData
            if (rowRest) {
              rowRest.treeLoaded = false
            }
            if (treeExpandLazyLoadedMaps[rowid]) {
              delete treeExpandLazyLoadedMaps[rowid]
            }
          }).finally(() => {
            nextTick().then(() => tableMethods.recalculate()).then(() => resolve())
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
          const { fullAllDataRowIdData } = internalData
          const rExpandLazyLoadedMaps = { ...reactData.rowExpandLazyLoadedMaps }
          const rowid = getRowid($xeTable, row)
          const rowRest = fullAllDataRowIdData[rowid]
          rExpandLazyLoadedMaps[rowid] = row
          reactData.rowExpandLazyLoadedMaps = rExpandLazyLoadedMaps
          loadMethod({ $table: $xeTable, row, rowIndex: tableMethods.getRowIndex(row), $rowIndex: tableMethods.getVMRowIndex(row) }).then(() => {
            const rExpandedMaps = { ...reactData.rowExpandedMaps }
            if (rowRest) {
              rowRest.expandLoaded = true
            }
            rExpandedMaps[rowid] = row
            reactData.rowExpandedMaps = rExpandedMaps
          }).catch(() => {
            if (rowRest) {
              rowRest.expandLoaded = false
            }
          }).finally(() => {
            const rExpandLazyLoadedMaps = { ...reactData.rowExpandLazyLoadedMaps }
            if (rExpandLazyLoadedMaps[rowid]) {
              delete rExpandLazyLoadedMaps[rowid]
            }
            reactData.rowExpandLazyLoadedMaps = rExpandLazyLoadedMaps
            nextTick().then(() => tableMethods.recalculate()).then(() => resolve())
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
        tableMethods.setMergeCells(mergeCells)
      }
    }

    const handleDefaultMergeFooterItems = () => {
      const { mergeFooterItems } = props
      if (mergeFooterItems) {
        tableMethods.setMergeFooterItems(mergeFooterItems)
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
        ;(scrollYStore as any).rowHeight = rowHeight
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
        nextTick(() => {
          updateStyle()
        })
      })
    }

    const handleRecalculateLayout = (reFull: boolean) => {
      const el = refElem.value
      internalData.rceRunTime = Date.now()
      if (!el || !el.clientWidth) {
        return nextTick()
      }
      calcCellWidth()
      autoCellWidth()
      updateStyle()
      return computeScrollLoad().then(() => {
        if (reFull === true) {
          // 初始化时需要在列计算之后再执行优化运算，达到最优显示效果
          calcCellWidth()
          autoCellWidth()
          updateStyle()
          return computeScrollLoad()
        }
      })
    }

    /**
     * 加载表格数据
     * @param {Array} datas 数据
     */
    const loadTableData = (datas: any[]) => {
      const { keepSource, treeConfig, showOverflow } = props
      const { editStore, scrollYLoad: oldScrollYLoad } = reactData
      const { scrollYStore, scrollXStore, lastScrollLeft, lastScrollTop } = internalData
      const treeOpts = computeTreeOpts.value
      const rowOpts = computeRowOpts.value
      const { transform } = treeOpts
      const childrenField = treeOpts.children || treeOpts.childrenField
      let treeData = []
      let fullData = reactive(datas ? datas.slice(0) : []) // 转为响应式
      if (treeConfig) {
        if (transform) {
          // 树结构自动转换
          if (process.env.VUE_APP_VXE_ENV === 'development') {
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
          }
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
      }
      scrollYStore.startIndex = 0
      scrollYStore.endIndex = 1
      scrollXStore.startIndex = 0
      scrollXStore.endIndex = 1
      reactData.scrollVMLoading = false
      editStore.insertMaps = {}
      editStore.removeMaps = {}
      const sYLoad = updateScrollYStatus(fullData)
      reactData.isDragRowMove = false
      // 全量数据
      internalData.tableFullData = fullData
      internalData.tableFullTreeData = treeData
      // 缓存数据
      tablePrivateMethods.cacheRowMap(true)
      // 原始数据
      internalData.tableSynchData = datas
      // 克隆原数据，用于显示编辑状态，与编辑值做对比
      if (keepSource) {
        tablePrivateMethods.cacheSourceMap(fullData)
      }
      if (sYLoad) {
        if (showOverflow) {
          if (!rowOpts.height) {
            const errColumn = internalData.tableFullColumn.find(column => column.showOverflow === false)
            if (errColumn) {
              errLog('vxe.error.errProp', [`column[field="${errColumn.field}"].show-overflow=false`, 'show-overflow=true'])
            }
          }
        }

        if (process.env.VUE_APP_VXE_ENV === 'development') {
          if (!(props.height || props.maxHeight)) {
            errLog('vxe.error.reqProp', ['table.height | table.max-height | table.scroll-y={enabled: false}'])
          }
          // if (!props.showOverflow) {
          //   warnLog('vxe.error.reqProp', ['table.show-overflow'])
          // }
          if (props.spanMethod) {
            warnLog('vxe.error.scrollErrProp', ['table.span-method'])
          }
        }
      }
      if ($xeTable.clearCellAreas && props.mouseConfig) {
        $xeTable.clearCellAreas()
        $xeTable.clearCopyCellArea()
      }
      tableMethods.clearMergeCells()
      tableMethods.clearMergeFooterItems()
      tablePrivateMethods.handleTableData(true)
      tableMethods.updateFooter()
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
        handleReserveStatus()
        tablePrivateMethods.checkSelectionStatus()
        return new Promise<void>(resolve => {
          nextTick()
            .then(() => tableMethods.recalculate())
            .then(() => {
              let targetScrollLeft = lastScrollLeft
              let targetScrollTop = lastScrollTop
              const sXOpts = computeSXOpts.value
              const sYOpts = computeSYOpts.value
              // 是否在更新数据之后自动滚动重置滚动条
              if (sXOpts.scrollToLeftOnChange) {
                targetScrollLeft = 0
              }
              if (sYOpts.scrollToTopOnChange) {
                targetScrollTop = 0
              }
              calcCellHeight()
              // 是否变更虚拟滚动
              if (oldScrollYLoad === sYLoad) {
                restoreScrollLocation($xeTable, targetScrollLeft, targetScrollTop)
                  .then(() => {
                    resolve()
                  })
              } else {
                setTimeout(() => {
                  restoreScrollLocation($xeTable, targetScrollLeft, targetScrollTop)
                    .then(() => {
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
      nextTick(() => setTimeout(() => tableMethods.recalculate()))
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
      const { mergeList, mergeFooterList } = reactData
      const { scrollXStore } = internalData
      const { preloadSize, startIndex, endIndex, offsetSize } = scrollXStore
      const { toVisibleIndex, visibleSize } = handleVirtualXVisible()
      const offsetItem = {
        startIndex: Math.max(0, toVisibleIndex - 1 - offsetSize - preloadSize),
        endIndex: toVisibleIndex + visibleSize + offsetSize + preloadSize
      }
      scrollXStore.visibleStartIndex = toVisibleIndex
      scrollXStore.visibleEndIndex = toVisibleIndex + visibleSize
      calculateMergerOffsetIndex(mergeList.concat(mergeFooterList), offsetItem, 'col')
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
      const { showOverflow } = props
      const rowOpts = computeRowOpts.value
      const leftList: VxeTableDefines.ColumnInfo[] = []
      const centerList: VxeTableDefines.ColumnInfo[] = []
      const rightList: VxeTableDefines.ColumnInfo[] = []
      const { isGroup, columnStore } = reactData
      const sXOpts = computeSXOpts.value
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
      // 如果gt为0，则总是启用
      const scrollXLoad = !!sXOpts.enabled && sXOpts.gt > -1 && (sXOpts.gt === 0 || sXOpts.gt < tableFullColumn.length)
      reactData.hasFixedColumn = leftList.length > 0 || rightList.length > 0
      Object.assign(columnStore, { leftList, centerList, rightList })
      if (scrollXLoad) {
        if (showOverflow) {
          if (!rowOpts.height) {
            const errColumn = internalData.tableFullColumn.find(column => column.showOverflow === false)
            if (errColumn) {
              errLog('vxe.error.errProp', [`column[field="${errColumn.field}"].show-overflow=false`, 'show-overflow=true'])
            }
          }
        }
        if (process.env.VUE_APP_VXE_ENV === 'development') {
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
      reactData.scrollXLoad = scrollXLoad
      visibleColumn.forEach((column, index) => {
        const colid = column.id
        const colRest = fullColumnIdData[colid]
        if (colRest) {
          colRest._index = index
        }
      })
      internalData.visibleColumn = visibleColumn
      handleTableColumn()
      if (isReset) {
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
      internalData.collectColumn = collectColumn
      const tableFullColumn = getColumnList(collectColumn)
      internalData.tableFullColumn = tableFullColumn
      reactData.isLoading = true
      reactData.isDragColMove = false
      initColumnSort()
      return Promise.resolve(
        restoreCustomStorage()
      ).then(() => {
        reactData.isLoading = false
        cacheColumnMap()
        parseColumns(true).then(() => {
          if (reactData.scrollXLoad) {
            loadScrollXData()
          }
        })
        $xeTable.clearMergeCells()
        $xeTable.clearMergeFooterItems()
        $xeTable.handleTableData(true)
        if (process.env.VUE_APP_VXE_ENV === 'development') {
          if ((reactData.scrollXLoad || reactData.scrollYLoad) && reactData.expandColumn) {
            warnLog('vxe.error.scrollErrProp', ['column.type=expand'])
          }
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
          return $xeTable.recalculate()
        })
      })
    }

    const updateScrollYStatus = (fullData?: any[]) => {
      const { treeConfig } = props
      const sYOpts = computeSYOpts.value
      const treeOpts = computeTreeOpts.value
      const { transform } = treeOpts
      const allList = fullData || internalData.tableFullData
      // 如果gt为0，则总是启用
      const scrollYLoad = (transform || !treeConfig) && !!sYOpts.enabled && sYOpts.gt > -1 && (sYOpts.gt === 0 || sYOpts.gt < allList.length)
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
      const { treeExpandedMaps, treeExpandLazyLoadedMaps, treeNodeColumn } = reactData
      const treeTempExpandedMaps = { ...treeExpandedMaps }
      const { fullAllDataRowIdData, tableFullData } = internalData
      const treeOpts = computeTreeOpts.value
      const { reserve, lazy, accordion, toggleMethod } = treeOpts
      const childrenField = treeOpts.children || treeOpts.childrenField
      const hasChildField = treeOpts.hasChild || treeOpts.hasChildField
      const result: any[] = []
      const columnIndex = tableMethods.getColumnIndex(treeNodeColumn)
      const $columnIndex = tableMethods.getVMColumnIndex(treeNodeColumn)
      let validRows = toggleMethod ? rows.filter((row: any) => toggleMethod({ $table: $xeTable, expanded, column: treeNodeColumn, columnIndex, $columnIndex, row })) : rows
      if (accordion) {
        validRows = validRows.length ? [validRows[validRows.length - 1]] : []
        // 同一级只能展开一个
        const matchObj = XEUtils.findTree(tableFullData, item => item === validRows[0], { children: childrenField })
        if (matchObj) {
          matchObj.items.forEach(item => {
            const rowid = getRowid($xeTable, item)
            if (treeTempExpandedMaps[rowid]) {
              delete treeTempExpandedMaps[rowid]
            }
          })
        }
      }
      if (expanded) {
        validRows.forEach((row: any) => {
          const rowid = getRowid($xeTable, row)
          if (!treeTempExpandedMaps[rowid]) {
            const rowRest = fullAllDataRowIdData[rowid]
            if (rowRest) {
              const isLoad = lazy && row[hasChildField] && !rowRest.treeLoaded && !treeExpandLazyLoadedMaps[rowid]
              // 是否使用懒加载
              if (isLoad) {
                result.push(handleAsyncTreeExpandChilds(row))
              } else {
                if (row[childrenField] && row[childrenField].length) {
                  treeTempExpandedMaps[rowid] = row
                }
              }
            }
          }
        })
      } else {
        validRows.forEach(item => {
          const rowid = getRowid($xeTable, item)
          if (treeTempExpandedMaps[rowid]) {
            delete treeTempExpandedMaps[rowid]
          }
        })
      }
      if (reserve) {
        validRows.forEach((row: any) => handleTreeExpandReserve(row, expanded))
      }
      reactData.treeExpandedMaps = treeTempExpandedMaps
      return Promise.all(result).then(() => {
        return tableMethods.recalculate()
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
        tablePrivateMethods.handleTableData()
        updateAfterDataIndex()
        return nextTick()
      }).then(() => {
        return tableMethods.recalculate(true)
      }).then(() => {
        setTimeout(() => {
          tableMethods.updateCellAreas()
        }, 30)
      })
    }

    const handleCheckAllEvent = (evnt: Event | null, value: any) => {
      handleCheckedAllCheckboxRow(value)
      if (evnt) {
        dispatchEvent('checkbox-all', {
          records: tableMethods.getCheckboxRecords(),
          reserves: tableMethods.getCheckboxReserveRecords(),
          indeterminates: tableMethods.getCheckboxIndeterminateRecords(),
          checked: value
        }, evnt)
      }
    }

    /**
     * 纵向 Y 可视渲染处理
     */
    const loadScrollYData = (scrollTop?: number) => {
      const { showOverflow } = props
      const { mergeList } = reactData
      const { scrollYStore } = internalData
      const { preloadSize, startIndex, endIndex, offsetSize } = scrollYStore
      const autoOffsetYSize = showOverflow ? offsetSize : offsetSize + 1
      const { toVisibleIndex, visibleSize } = handleVirtualYVisible(scrollTop)
      const offsetItem = {
        startIndex: Math.max(0, toVisibleIndex - 1 - offsetSize - preloadSize),
        endIndex: toVisibleIndex + visibleSize + autoOffsetYSize + preloadSize
      }
      scrollYStore.visibleStartIndex = toVisibleIndex
      scrollYStore.visibleEndIndex = toVisibleIndex + visibleSize
      calculateMergerOffsetIndex(mergeList, offsetItem, 'row')
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
      const fpsTime = Math.max(5, Math.min(80, Math.floor(visibleSize * 3)))
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
      const { lyTimeout, lyRunTime } = internalData
      const fpsTime = Math.floor(Math.max(4, Math.min(10, 20 / 3)))
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
      const { scrollXLoad, scrollYLoad } = reactData
      const { lcsTimeout } = internalData
      if (lcsTimeout) {
        clearTimeout(lcsTimeout)
      }
      internalData.lcsTimeout = setTimeout(() => {
        internalData.lcsRunTime = Date.now()
        internalData.lcsTimeout = undefined
        internalData.inVirtualScroll = false
        internalData.inWheelScroll = false
        internalData.inHeaderScroll = false
        internalData.inBodyScroll = false
        internalData.inFooterScroll = false
        internalData.scrollRenderType = ''
        calcCellHeight()
        if (isRollX && scrollXLoad) {
          $xeTable.updateScrollXData()
        }
        if (isRollY && scrollYLoad) {
          $xeTable.updateScrollYData().then(() => {
            calcCellHeight()
            $xeTable.updateScrollYSpace()
          })
        }
        $xeTable.updateCellAreas()
      }, 200)
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

    function handleUupdateResize () {
      const el = refElem.value
      if (el && el.clientWidth && el.clientHeight) {
        tableMethods.recalculate()
      }
    }

    tableMethods = {
      dispatchEvent,
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
        warnLog('vxe.error.delFunc', ['syncData', 'getData'])
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
        return tablePrivateMethods.handleTableData(true).then(() => {
          tableMethods.updateFooter()
          if (scrollXLoad || scrollYLoad) {
            if (scrollXLoad) {
              tablePrivateMethods.updateScrollXSpace()
            }
            if (scrollYLoad) {
              tablePrivateMethods.updateScrollYSpace()
            }
            return tableMethods.refreshScroll()
          }
        }).then(() => {
          tableMethods.updateCellAreas()
          return tableMethods.recalculate(true)
        }).then(() => {
          // 存在滚动行为未结束情况
          setTimeout(() => $xeTable.recalculate(), 50)
        })
      },
      /**
       * 重新加载数据，不会清空表格状态
       * @param {Array} datas 数据
       */
      loadData (datas) {
        const { initStatus } = internalData
        return loadTableData(datas).then(() => {
          internalData.inited = true
          internalData.initStatus = true
          if (!initStatus) {
            handleLoadDefaults()
          }
          return tableMethods.recalculate()
        })
      },
      /**
       * 重新加载数据，会清空表格状态
       * @param {Array} datas 数据
       */
      reloadData (datas) {
        return tableMethods.clearAll()
          .then(() => {
            internalData.inited = true
            internalData.initStatus = true
            return loadTableData(datas)
          }).then(() => {
            handleLoadDefaults()
            return tableMethods.recalculate()
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
        const { tableSourceData } = internalData
        if (keepSource) {
          const rowIndex = tableMethods.getRowIndex(row)
          const oRow = tableSourceData[rowIndex]
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
          if (process.env.VUE_APP_VXE_ENV === 'development') {
            warnLog('vxe.error.reqProp', ['keep-source'])
          }
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
            const rest = { row: childRow, rowid, seq: -1, index, _index: -1, $index: -1, treeIndex: -1, items, parent: parentRow, level: parentLevel + nodes.length, height: 0, oTop: 0 }
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
        const collectColumn = XEUtils.mapTree(columns, column => reactive(Cell.createColumn($xeTable, column)))
        return handleColumn(collectColumn)
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
      // toOriginalRecords (rows: any[]) {
      //   const { treeConfig } = props
      //   const treeOpts = computeTreeOpts.value
      //   const { transform, mapChildrenField } = treeOpts
      //   const rowkey = getRowkey($xeTable)
      //   if (treeConfig) {
      //     if (transform) {
      //       return []
      //     }
      //     return []
      //   }
      //   return rows.map(item => {
      //     const obj = Object.assign({}, item)
      //     delete obj.rowkey
      //     return obj
      //   })
      // },
      /**
       * 还原数据
       * 如果不传任何参数，则还原整个表格
       * 如果传 row 则还原一行
       * 如果传 rows 则还原多行
       * 如果还额外传了 field 则还原指定的单元格数据
       */
      revertData (rows: any, field) {
        const { keepSource } = props
        const { tableSourceData, sourceDataRowIdData } = internalData
        if (!keepSource) {
          if (process.env.VUE_APP_VXE_ENV === 'development') {
            warnLog('vxe.error.reqProp', ['keep-source'])
          }
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
        if (targetRows.length) {
          targetRows.forEach((row: any) => {
            if (!tableMethods.isInsertByRow(row)) {
              const rowid = getRowid($xeTable, row)
              const oRow = sourceDataRowIdData[rowid]
              if (oRow && row) {
                if (field) {
                  XEUtils.set(row, field, XEUtils.clone(XEUtils.get(oRow, field), true))
                } else {
                  XEUtils.destructuring(row, XEUtils.clone(oRow, true))
                }
              }
            }
          })
        }
        if (rows) {
          return nextTick()
        }
        return tableMethods.reloadData(tableSourceData)
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
        const column = handleFieldOrColumn($xeTable, fieldOrColumn)
        if (!column) {
          return null
        }
        const rowid = getRowid($xeTable, row)
        const tableBody = refTableBody.value
        const leftBody = refTableLeftBody.value
        const rightBody = refTableRightBody.value
        let bodyElem
        if (column) {
          if (column.fixed) {
            if (column.fixed === 'left') {
              if (leftBody) {
                bodyElem = leftBody.$el as HTMLDivElement
              }
            } else {
              if (rightBody) {
                bodyElem = rightBody.$el as HTMLDivElement
              }
            }
          }
          if (!bodyElem) {
            bodyElem = tableBody.$el as HTMLDivElement
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
        const formatter = column.formatter
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
       * @param {Row} row 行对象
       */
      isInsertByRow (row) {
        const { editStore } = reactData
        const rowid = getRowid($xeTable, row)
        return !!editStore.insertMaps[rowid]
      },
      /**
       * 删除所有新增的临时数据
       * @returns
       */
      removeInsertRow () {
        const { editStore } = reactData
        editStore.insertMaps = {}
        return $xeTable.remove($xeTable.getInsertRecords())
      },
      /**
       * 检查行或列数据是否发生改变
       * @param {Row} row 行对象
       * @param {String} field 字段名
       */
      isUpdateByRow (row, field) {
        const { keepSource } = props
        const { tableFullColumn, fullDataRowIdData, sourceDataRowIdData } = internalData
        if (keepSource) {
          const rowid = getRowid($xeTable, row)
          // 新增的数据不需要检测
          if (!fullDataRowIdData[rowid]) {
            return false
          }
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
        const columns = internalData.visibleColumn
        return XEUtils.isUndefined(columnIndex) ? columns.slice(0) : columns[columnIndex]
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
        const fullColumnIdData = internalData.fullColumnIdData
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
        const fullColumnIdData = internalData.fullColumnIdData
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
        const { tableFullData, afterFullData, afterTreeFullData, tableFullTreeData, fullDataRowIdData, afterFullRowMaps } = internalData
        const treeOpts = computeTreeOpts.value
        const checkboxOpts = computeCheckboxOpts.value
        const { transform, mapChildrenField } = treeOpts
        const { checkField } = checkboxOpts
        const childrenField = treeOpts.children || treeOpts.childrenField
        let rowList: any[] = []
        const currTableData = isFull ? (transform ? tableFullTreeData : tableFullData) : (transform ? afterTreeFullData : afterFullData)
        if (checkField) {
          if (treeConfig) {
            rowList = XEUtils.filterTree(currTableData, row => XEUtils.get(row, checkField), { children: transform ? mapChildrenField : childrenField })
          } else {
            rowList = currTableData.filter((row) => XEUtils.get(row, checkField))
          }
        } else {
          const { selectCheckboxMaps } = reactData
          XEUtils.each(selectCheckboxMaps, (row, rowid) => {
            if (isFull) {
              if (fullDataRowIdData[rowid]) {
                rowList.push(fullDataRowIdData[rowid].row)
              }
            } else {
              if (afterFullRowMaps[rowid]) {
                rowList.push(afterFullRowMaps[rowid])
              }
            }
          })
        }
        return rowList
      },
      /**
       * 只对 tree-config 有效，获取行的子级
       */
      getTreeRowChildren (rowOrRowid) {
        const { treeConfig } = props
        const { fullDataRowIdData } = internalData
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
            const rest = fullDataRowIdData[rowid]
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
        const { fullDataRowIdData } = internalData
        if (rowOrRowid && treeConfig) {
          let rowid
          if (XEUtils.isString(rowOrRowid)) {
            rowid = rowOrRowid
          } else {
            rowid = getRowid($xeTable, rowOrRowid)
          }
          if (rowid) {
            const rest = fullDataRowIdData[rowid]
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
        const { fullDataRowIdData } = internalData
        const rowid = XEUtils.eqNull(cellValue) ? '' : encodeURIComponent(cellValue || '')
        return fullDataRowIdData[rowid] ? fullDataRowIdData[rowid].row : null
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
        let status = false
        const cols = XEUtils.isArray(fieldOrColumn) ? fieldOrColumn : [fieldOrColumn]
        cols.forEach(item => {
          const column = handleFieldOrColumn($xeTable, item)
          if (column) {
            const colWidth = XEUtils.toInteger(width)
            let rdWidth = colWidth
            if (isScale(width)) {
              const tableBody = refTableBody.value
              const bodyElem = tableBody ? tableBody.$el as HTMLDivElement : null
              const bodyWidth = bodyElem ? bodyElem.clientWidth - 1 : 0
              rdWidth = Math.floor(colWidth * bodyWidth)
            }
            column.resizeWidth = rdWidth
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
          return tableMethods.refreshScroll()
        }).then(() => {
          return tableMethods.recalculate()
        })
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
            return restoreScrollLocation($xeTable, lastScrollLeft, lastScrollTop).then().then(() => {
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
        return new Promise<void>(resolve => {
          const { rceTimeout, rceRunTime } = internalData
          const resizeOpts = computeResizeOpts.value
          const refreshDelay = resizeOpts.refreshDelay || 20
          const el = refElem.value
          if (el && el.clientWidth) {
            autoCellWidth()
          }
          if (rceTimeout) {
            clearTimeout(rceTimeout)
            if (rceRunTime && rceRunTime + (refreshDelay - 5) < Date.now()) {
              resolve(
                handleRecalculateLayout(!!reFull)
              )
            } else {
              nextTick(() => {
                resolve()
              })
            }
          } else {
            resolve(
              handleRecalculateLayout(!!reFull)
            )
          }
          internalData.rceTimeout = setTimeout(() => {
            internalData.rceTimeout = undefined
            handleRecalculateLayout(!!reFull)
          }, refreshDelay)
        })
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
        const { fullDataRowIdData } = internalData
        const { treeIndeterminateMaps } = reactData
        if (treeConfig) {
          const fullRest: any[] = []
          const defRest: any[] = []
          XEUtils.each(treeIndeterminateMaps, (item, rowid) => {
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
        const { selectCheckboxMaps } = reactData
        const checkboxOpts = computeCheckboxOpts.value
        const { checkField } = checkboxOpts
        if (checkField) {
          return XEUtils.get(row, checkField)
        }
        return !!selectCheckboxMaps[getRowid($xeTable, row)]
      },
      isCheckedByCheckboxRowKey (rowid: any) {
        const { selectCheckboxMaps } = reactData
        const { fullAllDataRowIdData } = internalData
        const checkboxOpts = computeCheckboxOpts.value
        const { checkField } = checkboxOpts
        if (checkField) {
          const rowRest = fullAllDataRowIdData[rowid]
          if (rowRest) {
            return XEUtils.get(rowRest.row, checkField)
          }
          return false
        }
        return !!selectCheckboxMaps[rowid]
      },
      isIndeterminateByCheckboxRow (row) {
        const { treeIndeterminateMaps } = reactData
        return !!treeIndeterminateMaps[getRowid($xeTable, row)] && !$xeTable.isCheckedByCheckboxRow(row)
      },
      isIndeterminateByCheckboxRowKey (rowid: any) {
        const { treeIndeterminateMaps } = reactData
        return !!treeIndeterminateMaps[rowid] && !$xeTable.isCheckedByCheckboxRowKey(rowid)
      },
      /**
       * 多选，切换某一行的选中状态
       */
      toggleCheckboxRow (row) {
        const { selectCheckboxMaps } = reactData
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
          const afterFullIdMaps: { [key: string]: number } = {}
          if (treeConfig) {
            XEUtils.eachTree(afterFullData, row => {
              afterFullIdMaps[getRowid($xeTable, row)] = 1
            }, { children: childrenField })
          } else {
            afterFullData.forEach(row => {
              afterFullIdMaps[getRowid($xeTable, row)] = 1
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
        reactData.selectCheckboxMaps = {}
        reactData.treeIndeterminateMaps = {}
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
        const column = handleFieldOrColumn($xeTable, fieldOrColumn)
        if (column) {
          // tableMethods.clearCurrentRow()
          tableMethods.clearCurrentColumn()
          reactData.currentColumn = column
        }
        return nextTick()
      },
      /**
       * 用于当前列，手动清空当前高亮的状态
       */
      clearCurrentColumn () {
        reactData.currentColumn = null
        return nextTick()
      },
      setPendingRow (rows: any | any[], status: boolean) {
        const pendingMaps = Object.assign({}, reactData.pendingRowMaps)
        if (rows && !XEUtils.isArray(rows)) {
          rows = [rows]
        }
        if (status) {
          rows.forEach((row: any) => {
            const rowid = getRowid($xeTable, row)
            if (rowid && !pendingMaps[rowid]) {
              pendingMaps[rowid] = row
            }
          })
        } else {
          rows.forEach((row: any) => {
            const rowid = getRowid($xeTable, row)
            if (rowid && pendingMaps[rowid]) {
              delete pendingMaps[rowid]
            }
          })
        }
        reactData.pendingRowMaps = pendingMaps
        return nextTick()
      },
      togglePendingRow (rows: any | any[]) {
        const pendingMaps = Object.assign({}, reactData.pendingRowMaps)
        if (rows && !XEUtils.isArray(rows)) {
          rows = [rows]
        }
        rows.forEach((row: any) => {
          const rowid = getRowid($xeTable, row)
          if (rowid) {
            if (pendingMaps[rowid]) {
              delete pendingMaps[rowid]
            } else {
              pendingMaps[rowid] = row
            }
          }
        })
        reactData.pendingRowMaps = pendingMaps
        return nextTick()
      },
      hasPendingByRow (row) {
        return tableMethods.isPendingByRow(row)
      },
      isPendingByRow (row) {
        const { pendingRowMaps } = reactData
        const rowid = getRowid($xeTable, row)
        return !!pendingRowMaps[rowid]
      },
      getPendingRecords () {
        const { pendingRowMaps } = reactData
        const { fullAllDataRowIdData } = internalData
        const insertRecords: any[] = []
        XEUtils.each(pendingRowMaps, (row, rowid) => {
          if (fullAllDataRowIdData[rowid]) {
            insertRecords.push(row)
          }
        })
        return insertRecords
      },
      clearPendingRow () {
        reactData.pendingRowMaps = {}
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
              if (orders.indexOf(order) === -1) {
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
            tableMethods.updateCellAreas()
            return updateStyle()
          })
        }
        return nextTick()
      },
      setSort (sortConfs, isUpdate) {
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
              column = tableMethods.getColumnByField(field)
            }
            if (!firstColumn) {
              firstColumn = column
            }
            if (column && column.sortable) {
              if (orders.indexOf(order) === -1) {
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
              tablePrivateMethods.handleTableData(true)
            }
            $xeTable.handleColumnSortEvent(new Event('click'), firstColumn)
          }
          return nextTick().then(() => {
            tableMethods.updateCellAreas()
            return updateStyle()
          })
        }
        return nextTick()
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
          tablePrivateMethods.handleTableData(true)
        }
        return nextTick().then(updateStyle)
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
      /**
       * 关闭筛选
       * @param {Event} evnt 事件
       */
      closeFilter () {
        const { filterStore } = reactData
        const { column, visible } = filterStore
        Object.assign(filterStore, {
          isAllSelected: false,
          isIndeterminate: false,
          options: [],
          visible: false
        })
        if (visible) {
          dispatchEvent('filter-visible', { column, property: column.field, field: column.field, filterList: $xeTable.getCheckedFilters(), visible: false }, null)
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
        const rExpandLazyLoadedMaps = { ...reactData.rowExpandLazyLoadedMaps }
        const { fullAllDataRowIdData } = internalData
        const expandOpts = computeExpandOpts.value
        const { lazy } = expandOpts
        const rowid = getRowid($xeTable, row)
        const rowRest = fullAllDataRowIdData[rowid]
        if (lazy && rowRest) {
          rowRest.expandLoaded = false
          delete rExpandLazyLoadedMaps[rowid]
        }
        reactData.rowExpandLazyLoadedMaps = rExpandLazyLoadedMaps
        return nextTick()
      },
      /**
       * 重新懒加载展开行，并展开内容
       * @param {Row} row 行对象
       */
      reloadRowExpand (row) {
        const { rowExpandLazyLoadedMaps } = reactData
        const expandOpts = computeExpandOpts.value
        const { lazy } = expandOpts
        const rowid = getRowid($xeTable, row)
        if (lazy && !rowExpandLazyLoadedMaps[rowid]) {
          tableMethods.clearRowExpandLoaded(row)
            .then(() => handleAsyncRowExpand(row))
        }
        return nextTick()
      },
      reloadExpandContent (row) {
        if (process.env.VUE_APP_VXE_ENV === 'development') {
          warnLog('vxe.error.delFunc', ['reloadExpandContent', 'reloadRowExpand'])
        }
        // 即将废弃
        return tableMethods.reloadRowExpand(row)
      },
      /**
       * 切换展开行
       */
      toggleRowExpand (row) {
        return tableMethods.setRowExpand(row, !tableMethods.isRowExpandByRow(row))
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
        const { rowExpandedMaps, rowExpandLazyLoadedMaps, expandColumn: column } = reactData
        const { fullAllDataRowIdData } = internalData
        let rExpandedMaps = { ...rowExpandedMaps }
        const expandOpts = computeExpandOpts.value
        const { reserve, lazy, accordion, toggleMethod } = expandOpts
        const lazyRests: any[] = []
        const columnIndex = tableMethods.getColumnIndex(column)
        const $columnIndex = tableMethods.getVMColumnIndex(column)
        if (rows) {
          if (!XEUtils.isArray(rows)) {
            rows = [rows]
          }
          if (accordion) {
            // 只能同时展开一个
            rExpandedMaps = {}
            rows = rows.slice(rows.length - 1, rows.length)
          }
          const validRows: any[] = toggleMethod ? rows.filter((row: any) => toggleMethod({ $table: $xeTable, expanded, column, columnIndex, $columnIndex, row, rowIndex: tableMethods.getRowIndex(row), $rowIndex: tableMethods.getVMRowIndex(row) })) : rows
          if (expanded) {
            validRows.forEach((row: any) => {
              const rowid = getRowid($xeTable, row)
              if (!rExpandedMaps[rowid]) {
                const rowRest = fullAllDataRowIdData[rowid]
                const isLoad = lazy && !rowRest.expandLoaded && !rowExpandLazyLoadedMaps[rowid]
                if (isLoad) {
                  lazyRests.push(handleAsyncRowExpand(row))
                } else {
                  rExpandedMaps[rowid] = row
                }
              }
            })
          } else {
            validRows.forEach(item => {
              const rowid = getRowid($xeTable, item)
              if (rExpandedMaps[rowid]) {
                delete rExpandedMaps[rowid]
              }
            })
          }
          if (reserve) {
            validRows.forEach((row: any) => handleRowExpandReserve(row, expanded))
          }
        }
        reactData.rowExpandedMaps = rExpandedMaps
        return Promise.all(lazyRests).then(() => tableMethods.recalculate())
      },
      /**
       * 判断行是否为展开状态
       * @param {Row} row 行对象
       */
      isRowExpandByRow (row) {
        const { rowExpandedMaps } = reactData
        const rowid = getRowid($xeTable, row)
        return !!rowExpandedMaps[rowid]
      },
      isExpandByRow (row) {
        // 已废弃
        if (process.env.VUE_APP_VXE_ENV === 'development') {
          warnLog('vxe.error.delFunc', ['isExpandByRow', 'isRowExpandByRow'])
        }
        return tableMethods.isRowExpandByRow(row)
      },
      /**
       * 手动清空展开行状态，数据会恢复成未展开的状态
       */
      clearRowExpand () {
        const { tableFullData } = internalData
        const expandOpts = computeExpandOpts.value
        const { reserve } = expandOpts
        const expList = tableMethods.getRowExpandRecords()
        reactData.rowExpandedMaps = {}
        if (reserve) {
          tableFullData.forEach((row) => handleRowExpandReserve(row, false))
        }
        return nextTick().then(() => {
          if (expList.length) {
            tableMethods.recalculate()
          }
        })
      },
      clearRowExpandReserve () {
        internalData.rowExpandedReserveRowMap = {}
        return nextTick()
      },
      getRowExpandRecords () {
        const rest: any[] = []
        XEUtils.each(reactData.rowExpandedMaps, item => {
          if (item) {
            rest.push(item)
          }
        })
        return rest
      },
      getTreeExpandRecords () {
        const rest: any[] = []
        XEUtils.each(reactData.treeExpandedMaps, item => {
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
        const tExpandedMaps = { ...reactData.treeExpandedMaps }
        const { fullAllDataRowIdData } = internalData
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
              if (tExpandedMaps[rowid]) {
                delete tExpandedMaps[rowid]
              }
            }
          })
        }
        reactData.treeExpandedMaps = tExpandedMaps
        if (transform) {
          handleVirtualTreeToList()
          return tablePrivateMethods.handleTableData()
        }
        return nextTick()
      },
      /**
       * 重新懒加载树节点，并展开该节点
       * @param {Row} row 行对象
       */
      reloadTreeExpand (row) {
        const { treeExpandLazyLoadedMaps } = reactData
        const treeOpts = computeTreeOpts.value
        const hasChildField = treeOpts.hasChild || treeOpts.hasChildField
        const { transform, lazy } = treeOpts
        const rowid = getRowid($xeTable, row)
        if (lazy && row[hasChildField] && !treeExpandLazyLoadedMaps[rowid]) {
          return tableMethods.clearTreeExpandLoaded(row).then(() => {
            return handleAsyncTreeExpandChilds(row)
          }).then(() => {
            if (transform) {
              handleVirtualTreeToList()
              return tablePrivateMethods.handleTableData()
            }
          }).then(() => {
            return tableMethods.recalculate()
          })
        }
        return nextTick()
      },
      reloadTreeChilds (row) {
        if (process.env.VUE_APP_VXE_ENV === 'development') {
          warnLog('vxe.error.delFunc', ['reloadTreeChilds', 'reloadTreeExpand'])
        }
        // 即将废弃
        return tableMethods.reloadTreeExpand(row)
      },
      /**
       * 切换/展开树节点
       */
      toggleTreeExpand (row) {
        return tableMethods.setTreeExpand(row, !tableMethods.isTreeExpandByRow(row))
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
        return tableMethods.setTreeExpand(expandeds, expanded).then(() => {
          if (transform) {
            handleVirtualTreeToList()
            return tableMethods.recalculate()
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
        const { treeExpandedMaps } = reactData
        return !!treeExpandedMaps[getRowid($xeTable, row)]
      },
      /**
       * 手动清空树形节点的展开状态，数据会恢复成未展开的状态
       */
      clearTreeExpand () {
        const { tableFullTreeData } = internalData
        const treeOpts = computeTreeOpts.value
        const childrenField = treeOpts.children || treeOpts.childrenField
        const { transform, reserve } = treeOpts
        const expList = tableMethods.getTreeExpandRecords()
        reactData.treeExpandedMaps = {}
        if (reserve) {
          XEUtils.eachTree(tableFullTreeData, row => handleTreeExpandReserve(row, false), { children: childrenField })
        }
        return tablePrivateMethods.handleTableData().then(() => {
          if (transform) {
            handleVirtualTreeToList()
            return tablePrivateMethods.handleTableData()
          }
        }).then(() => {
          if (expList.length) {
            return tableMethods.recalculate()
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
        const tableBody = refTableBody.value
        const bodyElem = tableBody.$el as HTMLDivElement
        return {
          virtualX: scrollXLoad,
          virtualY: scrollYLoad,
          scrollTop: bodyElem.scrollTop,
          scrollLeft: bodyElem.scrollLeft
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
        }
        if (XEUtils.isNumber(scrollTop)) {
          setScrollTop(yHandleEl, scrollTop)
          setScrollTop(bodyScrollElem, scrollTop)
          setScrollTop(leftScrollElem, scrollTop)
          setScrollTop(rightScrollElem, scrollTop)
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
        return nextTick()
      },
      /**
       * 如果有滚动条，则滚动到对应的行
       * @param {Row} row 行对象
       * @param {ColumnInfo} fieldOrColumn 列配置
       */
      scrollToRow (row, fieldOrColumn) {
        const { showOverflow } = props
        const { scrollYLoad, scrollXLoad } = reactData
        const rest = []
        if (row) {
          if (props.treeConfig) {
            rest.push(tablePrivateMethods.scrollToTreeRow(row))
          } else {
            rest.push(rowToVisible($xeTable, row))
          }
        }
        if (fieldOrColumn) {
          rest.push(handleScrollToRowColumn(fieldOrColumn, row))
        }
        return Promise.all(rest).then(() => {
          if (row) {
            if (!showOverflow && (scrollYLoad || scrollXLoad)) {
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
        return nextTick()
      },
      /**
       * 更新列状态 updateStatus({ row, column }, cellValue)
       * 如果组件值 v-model 发生 change 时，调用改函数用于更新某一列编辑状态
       * 如果单元格配置了校验规则，则会进行校验
       */
      updateStatus (slotParams, cellValue) {
        const customVal = !XEUtils.isUndefined(cellValue)
        return nextTick().then(() => {
          const { editRules } = props
          const { validStore } = reactData
          const tableBody = refTableBody.value
          if (slotParams && tableBody && editRules) {
            const { row, column } = slotParams
            const type = 'change'
            if ($xeTable.hasCellRules) {
              if ($xeTable.hasCellRules(type, row, column)) {
                const cell = tableMethods.getCellElement(row, column)
                if (cell) {
                  return $xeTable.validCellRules(type, row, column, cellValue)
                    .then(() => {
                      if (customVal && validStore.visible) {
                        setCellValue(row, column, cellValue)
                      }
                      $xeTable.clearValidate(row, column)
                    })
                    .catch(({ rule }) => {
                      if (customVal) {
                        setCellValue(row, column, cellValue)
                      }
                      $xeTable.showValidTooltip({ rule, row, column, cell })
                    })
                }
              }
            }
          }
        })
      },
      /**
       * 设置合并单元格
       * @param {TableMergeConfig[]} merges { row: Row|number, column: ColumnInfo|number, rowspan: number, colspan: number }
       */
      setMergeCells (merges) {
        if (props.spanMethod) {
          errLog('vxe.error.errConflicts', ['merge-cells', 'span-method'])
        }
        setMerges(merges, reactData.mergeList, internalData.afterFullData)
        return nextTick().then(() => {
          tableMethods.updateCellAreas()
          return updateStyle()
        })
      },
      /**
       * 移除单元格合并
       * @param {TableMergeConfig[]} merges 多个或数组 [{row:Row|number, col:ColumnInfo|number}]
       */
      removeMergeCells (merges) {
        if (props.spanMethod) {
          errLog('vxe.error.errConflicts', ['merge-cells', 'span-method'])
        }
        const rest = removeMerges(merges, reactData.mergeList, internalData.afterFullData)
        return nextTick().then(() => {
          tableMethods.updateCellAreas()
          updateStyle()
          return rest
        })
      },
      /**
       * 获取所有被合并的单元格
       */
      getMergeCells () {
        return reactData.mergeList.slice(0)
      },
      /**
       * 清除所有单元格合并
       */
      clearMergeCells () {
        reactData.mergeList = []
        return nextTick().then(() => {
          return updateStyle()
        })
      },
      setMergeFooterItems (merges) {
        if (props.footerSpanMethod) {
          errLog('vxe.error.errConflicts', ['merge-footer-items', 'footer-span-method'])
        }
        setMerges(merges, reactData.mergeFooterList)
        return nextTick().then(() => {
          tableMethods.updateCellAreas()
          return updateStyle()
        })
      },
      removeMergeFooterItems (merges) {
        if (props.footerSpanMethod) {
          errLog('vxe.error.errConflicts', ['merge-footer-items', 'footer-span-method'])
        }
        const rest = removeMerges(merges, reactData.mergeFooterList)
        return nextTick().then(() => {
          tableMethods.updateCellAreas()
          updateStyle()
          return rest
        })
      },
      /**
       * 获取所有被合并的表尾
       */
      getMergeFooterItems () {
        return reactData.mergeFooterList.slice(0)
      },
      /**
       * 清除所有表尾合并
       */
      clearMergeFooterItems () {
        reactData.mergeFooterList = []
        return nextTick().then(() => {
          return updateStyle()
        })
      },
      updateCellAreas () {
        const { mouseConfig } = props
        const mouseOpts = computeMouseOpts.value
        if (mouseConfig && mouseOpts.area && $xeTable.handleRecalculateCellAreas) {
          return $xeTable.handleRecalculateCellAreas()
        }
        return nextTick()
      },
      getCustomStoreData () {
        const { id } = props
        const customOpts = computeCustomOpts.value
        const { collectColumn } = internalData
        const { checkMethod } = customOpts
        const resizableData: Record<string, number> = {}
        const sortData: Record<string, number> = {}
        const visibleData: Record<string, boolean> = {}
        const fixedData: Record<string, VxeColumnPropTypes.Fixed> = {}
        const storeData: VxeTableDefines.CustomStoreData = {
          resizableData: undefined,
          sortData: undefined,
          visibleData: undefined,
          fixedData: undefined
        }
        if (!id) {
          errLog('vxe.error.reqProp', ['id'])
          return storeData
        }
        let hasResizable = 0
        let hasSort = 0
        let hasFixed = 0
        let hasVisible = 0
        XEUtils.eachTree(collectColumn, (column, index, items, path, parentColumn) => {
          // 只支持一级
          if (!parentColumn) {
            collectColumn.forEach((column) => {
              const colKey = column.getKey()
              if (colKey) {
                hasSort = 1
                sortData[colKey] = column.renderSortNumber
              }
            })
            if (column.fixed !== column.defaultFixed) {
              const colKey = column.getKey()
              if (colKey) {
                hasFixed = 1
                fixedData[colKey] = column.fixed
              }
            }
          }
          if (column.resizeWidth) {
            const colKey = column.getKey()
            if (colKey) {
              hasResizable = 1
              resizableData[colKey] = column.renderWidth
            }
          }
          if (!checkMethod || checkMethod({ column })) {
            if (!column.visible && column.defaultVisible) {
              const colKey = column.getKey()
              if (colKey) {
                hasVisible = 1
                visibleData[colKey] = false
              }
            } else if (column.visible && !column.defaultVisible) {
              const colKey = column.getKey()
              if (colKey) {
                hasVisible = 1
                visibleData[colKey] = true
              }
            }
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
        } else if (getEventTargetNode(evnt, tableFilter.$el as HTMLDivElement).flag) {
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
        } else if (getEventTargetNode(evnt, tableCustom.$el as HTMLDivElement).flag) {
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
        tablePrivateMethods.preventEvent(evnt, 'event.keydown', null, () => {
          const { mouseConfig, keyboardConfig, treeConfig, editConfig, highlightCurrentRow } = props
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
          const hasMetaKey = evnt.metaKey
          const hasCtrlKey = evnt.ctrlKey
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
            if (hasCtrlKey) {
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
                    $xeTable.moveSelected(activeParams, isLeftArrow, true, isRightArrow, false, evnt)
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
                      $xeTable.moveSelected(activeParams, isLeftArrow, false, isRightArrow, true, evnt)
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
                    rowIndex: tableMethods.getRowIndex(targetRow),
                    $rowIndex: tableMethods.getVMRowIndex(targetRow)
                  }
                  tableMethods.setTreeExpand(currentRow, true)
                    .then(() => tableMethods.scrollToRow(targetRow))
                    .then(() => tablePrivateMethods.triggerCurrentRowEvent(evnt, params))
                }
              }
            }
          } else if (operArrow && keyboardConfig && keyboardOpts.isArrow) {
            if (!isEditStatus) {
              // 如果按下了方向键
              if (selected.row && selected.column) {
                $xeTable.moveSelected(selected.args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow, evnt)
              } else if ((isUpArrow || isDwArrow) && (rowOpts.isCurrent || highlightCurrentRow)) {
                // 当前行按键上下移动
                $xeTable.moveCurrentRow(isUpArrow, isDwArrow, evnt)
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
                  rowIndex: tableMethods.getRowIndex(selected.row),
                  column: selected.column,
                  columnIndex: tableMethods.getColumnIndex(selected.column),
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
                rowIndex: tableMethods.getRowIndex(parentRow),
                $rowIndex: tableMethods.getVMRowIndex(parentRow),
                $table: $xeTable,
                $grid: $xeGrid
              }
              tableMethods.setTreeExpand(parentRow, false)
                .then(() => tableMethods.scrollToRow(parentRow))
                .then(() => tablePrivateMethods.triggerCurrentRowEvent(evnt, params))
            }
          } else if (keyboardConfig && isEnableConf(editConfig) && keyboardOpts.isEdit && !hasCtrlKey && !hasMetaKey && (isSpacebar || (keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 96 && keyCode <= 111) || (keyCode >= 186 && keyCode <= 192) || (keyCode >= 219 && keyCode <= 222))) {
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
                rowIndex: tableMethods.getRowIndex(selected.row),
                column: selected.column,
                columnIndex: tableMethods.getColumnIndex(selected.column),
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
        return nextTick()
      }
      tableMethods.recalculate(true)
      tableMethods.updateCellAreas()
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
        reactData.isDragColMove = false
        reactData.isDragRowMove = false
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
        tipContent = `${rTooltipMethod({
          row: dragRow
        }) || ''}`
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
        tipContent = `${tooltipMethod({
          column: dragCol as VxeTableDefines.ColumnInfo
        }) || ''}`
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
      const { scrollbarWidth, scrollbarHeight } = reactData
      const { prevDragToChild } = internalData
      const wrapperRect = el.getBoundingClientRect()
      const tableWidth = el.clientWidth
      const tableHeight = el.clientHeight
      if (trEl) {
        const rdLineEl = refDragRowLineElem.value
        if (rdLineEl) {
          if (showLine) {
            const scrollbarYToLeft = computeScrollbarYToLeft.value
            const trRect = trEl.getBoundingClientRect()
            let trHeight = trEl.clientHeight
            const offsetTop = Math.max(1, trRect.y - wrapperRect.y)
            if (offsetTop + trHeight > tableHeight - scrollbarHeight) {
              trHeight = tableHeight - offsetTop - scrollbarHeight
            }
            rdLineEl.style.display = 'block'
            rdLineEl.style.left = `${scrollbarYToLeft ? scrollbarWidth : 0}px`
            rdLineEl.style.top = `${offsetTop}px`
            rdLineEl.style.height = `${trHeight}px`
            rdLineEl.style.width = `${tableWidth - scrollbarWidth}px`
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
            const endX = tableWidth - rightContainerWidth - (rightContainerWidth ? 0 : scrollbarWidth)
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
              cdLineEl.style.height = `${tableHeight - offsetTop - (scrollbarXToTop ? 0 : scrollbarHeight)}px`
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
    const handleTooltip = (evnt: MouseEvent, cell: HTMLTableCellElement, overflowElem: HTMLElement, tipElem: HTMLElement | null, params: any) => {
      if (!overflowElem) {
        return nextTick()
      }
      params.cell = cell
      const { tooltipStore } = reactData
      const tooltipOpts = computeTooltipOpts.value
      const { column, row } = params
      const { showAll, contentMethod } = tooltipOpts
      const customContent = contentMethod ? contentMethod(params) : null
      const useCustom = contentMethod && !XEUtils.eqNull(customContent)
      const content = useCustom ? customContent : XEUtils.toString(column.type === 'html' ? overflowElem.innerText : overflowElem.textContent).trim()
      const isCellOverflow = overflowElem.scrollWidth > overflowElem.clientWidth
      if (content && (showAll || useCustom || isCellOverflow)) {
        Object.assign(tooltipStore, {
          row,
          column,
          visible: true,
          currOpts: {}
        })
        nextTick(() => {
          const $tooltip = refTooltip.value
          if ($tooltip && $tooltip.open) {
            $tooltip.open(isCellOverflow ? overflowElem : (tipElem || overflowElem), formatText(content))
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
          return Math.floor($xeGrid ? $xeGrid.getParentHeight() : XEUtils.toNumber(getComputedStyle(parentElem).height) - parentPaddingSize)
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
        tableData.forEach((row, $index) => {
          const rowid = getRowid($xeTable, row)
          const rest = fullDataRowIdData[rowid]
          if (rest) {
            rest.$index = $index
          }
        })
        reactData.tableData = tableData
        return nextTick()
      },
      /**
       * 更新数据行的 Map
       * 牺牲数据组装的耗时，用来换取使用过程中的流畅
       */
      cacheRowMap (isSource) {
        const { treeConfig } = props
        const treeOpts = computeTreeOpts.value
        const { fullAllDataRowIdData, tableFullData, tableFullTreeData } = internalData
        const childrenField = treeOpts.children || treeOpts.childrenField
        const hasChildField = treeOpts.hasChild || treeOpts.hasChildField
        const rowkey = getRowkey($xeTable)
        const isLazy = treeConfig && treeOpts.lazy
        const fullAllDataRowIdMaps: Record<string, VxeTableDefines.RowCacheItem> = {}
        const fullDataRowIdMaps: Record<string, VxeTableDefines.RowCacheItem> = {}
        const handleRow = (row: any, index: any, items: any, path?: any[], parentRow?: any, nodes?: any[]) => {
          let rowid = getRowid($xeTable, row)
          const seq = treeConfig && path ? toTreePathSeq(path) : index + 1
          const level = nodes ? nodes.length - 1 : 0
          if (eqEmptyValue(rowid)) {
            rowid = getRowUniqueId()
            XEUtils.set(row, rowkey, rowid)
          }
          if (isLazy && row[hasChildField] && XEUtils.isUndefined(row[childrenField])) {
            row[childrenField] = null
          }
          let cacheItem = fullAllDataRowIdData[rowid]
          if (!cacheItem) {
            cacheItem = { row, rowid, seq, index: -1, _index: -1, $index: -1, treeIndex: index, items, parent: parentRow, level, height: 0, oTop: 0 }
          }
          cacheItem.row = row
          cacheItem.items = items
          cacheItem.parent = parentRow
          cacheItem.level = level
          cacheItem.index = treeConfig && parentRow ? -1 : index
          if (isSource) {
            fullDataRowIdMaps[rowid] = cacheItem
          }
          fullAllDataRowIdMaps[rowid] = cacheItem
        }
        if (isSource) {
          internalData.fullDataRowIdData = fullDataRowIdMaps
        }
        internalData.fullAllDataRowIdData = fullAllDataRowIdMaps
        if (treeConfig) {
          XEUtils.eachTree(tableFullTreeData, handleRow, { children: childrenField })
        } else {
          tableFullData.forEach(handleRow)
        }
      },
      cacheSourceMap (fullData) {
        const { treeConfig } = props
        const treeOpts = computeTreeOpts.value
        let { sourceDataRowIdData } = internalData
        const sourceData = XEUtils.clone(fullData, true)
        const rowkey = getRowkey($xeTable)
        sourceDataRowIdData = internalData.sourceDataRowIdData = {}
        const handleSourceRow = (row: any) => {
          let rowid = getRowid($xeTable, row)
          if (eqEmptyValue(rowid)) {
            rowid = getRowUniqueId()
            XEUtils.set(row, rowkey, rowid)
          }
          sourceDataRowIdData[rowid] = row
        }
        // 源数据缓存
        if (treeConfig) {
          const childrenField = treeOpts.children || treeOpts.childrenField
          XEUtils.eachTree(sourceData, handleSourceRow, { children: treeOpts.transform ? treeOpts.mapChildrenField : childrenField })
        } else {
          sourceData.forEach(handleSourceRow)
        }
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
      handleResizeDblclickEvent (evnt, params) {
        const resizableOpts = computeResizableOpts.value
        const { isDblclickAutoWidth } = resizableOpts
        const el = refElem.value
        if (isDblclickAutoWidth && el) {
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
          let resizeWidth = calcColumnAutoWidth(resizeColumn, el)
          if (colRest) {
            resizeWidth = Math.max(resizeWidth, colRest.width)
          }
          resizeColumn.resizeWidth = Math.max(colMinWidth, resizeWidth)
          reactData._isResize = false
          internalData._lastResizeTime = Date.now()
          $xeTable.analyColumnWidth()
          $xeTable.recalculate(true).then(() => {
            $xeTable.saveCustomStore('update:visible')
            $xeTable.updateCellAreas()
            $xeTable.dispatchEvent('resizable-change', { ...params, resizeWidth }, evnt)
            setTimeout(() => $xeTable.recalculate(true), 300)
          })
        }
      },
      saveCustomStore (type) {
        const { customConfig } = props
        const tableId = computeTableId.value
        const customOpts = computeCustomOpts.value
        const { updateStore, storage } = customOpts
        const isAllCustom = storage === true
        const storageOpts: VxeTableDefines.VxeTableCustomStorageObj = isAllCustom ? {} : Object.assign({}, storage || {})
        const isCustomResizable = isAllCustom || storageOpts.resizable
        const isCustomVisible = isAllCustom || storageOpts.visible
        const isCustomFixed = isAllCustom || storageOpts.fixed
        const isCustomSort = isAllCustom || storageOpts.sort
        if (type !== 'reset') {
          // fix：修复拖动列宽，重置按钮无法点击的问题
          reactData.isCustomStatus = true
        }
        if ((customConfig ? isEnableConf(customOpts) : customOpts.enabled) && (isCustomResizable || isCustomVisible || isCustomFixed || isCustomSort)) {
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
          if (process.env.VUE_APP_VXE_ENV === 'development') {
            if (evntList.length) {
              warnLog('vxe.error.delEvent', ['event.clearActived', 'event.clearEdit'])
            }
          }
        }
        // 兼容老版本

        let rest
        if (!evntList.some((func) => func(Object.assign({ $grid: $xeGrid, $table: $xeTable, $event: evnt }, args)) === false)) {
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
        const { selectCheckboxMaps, treeIndeterminateMaps } = reactData
        const selectRowMaps = Object.assign({}, selectCheckboxMaps)
        const halfRowMaps = Object.assign({}, treeIndeterminateMaps)
        const treeOpts = computeTreeOpts.value
        const { transform, mapChildrenField } = treeOpts
        const childrenField = treeOpts.children || treeOpts.childrenField
        const checkboxOpts = computeCheckboxOpts.value
        const { checkField, checkStrictly, checkMethod } = checkboxOpts
        const { afterTreeFullData } = internalData
        if (checkStrictly) {
          return
        }
        // 树结构
        if (treeConfig) {
          const childRowMaps: Record<string, number> = {}
          const childRowList: any[][] = []
          XEUtils.eachTree(afterTreeFullData, (row) => {
            const rowid = getRowid($xeTable, row)
            const childList = row[transform ? mapChildrenField : childrenField]
            if (childList && childList.length && !childRowMaps[rowid]) {
              childRowMaps[rowid] = 1
              childRowList.unshift([row, rowid, childList])
            }
          }, { children: transform ? mapChildrenField : childrenField })
          childRowList.forEach(vals => {
            const row: string = vals[0]
            const rowid: string = vals[1]
            const childList: any[] = vals[2]
            let sLen = 0 // 已选
            let hLen = 0 // 半选
            let vLen = 0 // 有效行
            childList.forEach(
              checkMethod
                ? (item) => {
                    const childRowid = getRowid($xeTable, item)
                    const isSelect = checkField ? XEUtils.get(item, checkField) : selectRowMaps[childRowid]
                    if (checkMethod({ row: item })) {
                      if (isSelect) {
                        sLen++
                      } else if (halfRowMaps[childRowid]) {
                        hLen++
                      }
                      vLen++
                    } else {
                      if (isSelect) {
                        sLen++
                      } else if (halfRowMaps[childRowid]) {
                        hLen++
                      }
                    }
                  }
                : item => {
                  const childRowid = getRowid($xeTable, item)
                  const isSelect = checkField ? XEUtils.get(item, checkField) : selectRowMaps[childRowid]
                  if (isSelect) {
                    sLen++
                  } else if (halfRowMaps[childRowid]) {
                    hLen++
                  }
                  vLen++
                }
            )
            const isSelected = sLen >= vLen
            const halfSelect = !isSelected && (sLen >= 1 || hLen >= 1)
            if (checkField) {
              XEUtils.get(row, checkField, isSelected)
            }
            if (isSelected) {
              if (!checkField) {
                selectRowMaps[rowid] = row
              }
              if (halfRowMaps[rowid]) {
                delete halfRowMaps[rowid]
              }
            } else {
              if (!checkField) {
                if (selectRowMaps[rowid]) {
                  delete selectRowMaps[rowid]
                }
              }
              if (halfSelect) {
                halfRowMaps[rowid] = row
              } else {
                if (halfRowMaps[rowid]) {
                  delete halfRowMaps[rowid]
                }
              }
            }
          })
        }
        reactData.selectCheckboxMaps = selectRowMaps
        reactData.treeIndeterminateMaps = halfRowMaps
      },
      updateAllCheckboxStatus () {
        const { treeConfig } = props
        const { selectCheckboxMaps, treeIndeterminateMaps } = reactData
        const checkboxOpts = computeCheckboxOpts.value
        const { checkField, checkMethod } = checkboxOpts
        const { afterFullData, afterTreeFullData } = internalData

        let sLen = 0 // 已选
        let hLen = 0 // 半选
        let vLen = 0 // 有效行

        const rootList = (treeConfig ? afterTreeFullData : afterFullData)
        rootList.forEach(checkMethod
          ? row => {
            const childRowid = getRowid($xeTable, row)
            const selected = checkField ? XEUtils.get(row, checkField) : selectCheckboxMaps[childRowid]
            if (checkMethod({ row })) {
              if (selected) {
                sLen++
              } else if (treeIndeterminateMaps[childRowid]) {
                hLen++
              }
              vLen++
            } else {
              if (selected) {
                sLen++
              } else if (treeIndeterminateMaps[childRowid]) {
                hLen++
              }
            }
          }
          : row => {
            const childRowid = getRowid($xeTable, row)
            const selected = checkField ? XEUtils.get(row, checkField) : selectCheckboxMaps[childRowid]
            if (selected) {
              sLen++
            } else if (treeIndeterminateMaps[childRowid]) {
              hLen++
            }
            vLen++
          })

        const isSelected = vLen > 0 ? sLen >= vLen : sLen >= rootList.length
        const halfSelect = !isSelected && (sLen >= 1 || hLen >= 1)

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
        const { selectCheckboxMaps } = reactData
        const selectRowMaps = Object.assign({}, selectCheckboxMaps)
        const treeOpts = computeTreeOpts.value
        const { transform, mapChildrenField } = treeOpts
        const childrenField = treeOpts.children || treeOpts.childrenField
        const checkboxOpts = computeCheckboxOpts.value
        const { checkField, checkStrictly, checkMethod } = checkboxOpts
        const indeterminateField = checkboxOpts.indeterminateField || checkboxOpts.halfField
        if (checkField) {
          // 树结构
          if (treeConfig && !checkStrictly) {
            // 更新子节点状态
            XEUtils.eachTree(rows, (row) => {
              if (isForce || (!checkMethod || checkMethod({ row }))) {
                XEUtils.set(row, checkField, checked)
                if (indeterminateField) {
                  XEUtils.set(row, indeterminateField, false)
                }
                handleCheckboxReserveRow(row, checked)
              }
            }, { children: transform ? mapChildrenField : childrenField })
            reactData.selectCheckboxMaps = selectRowMaps
            return
          } else {
            // 列表
            rows.forEach(row => {
              if (isForce || (!checkMethod || checkMethod({ row }))) {
                XEUtils.set(row, checkField, checked)
                handleCheckboxReserveRow(row, checked)
              }
            })
          }
          reactData.selectCheckboxMaps = selectRowMaps
          return
        }

        // 树结构
        if (treeConfig && !checkStrictly) {
          // 更新子节点状态
          XEUtils.eachTree(rows, (row) => {
            const rowid = getRowid($xeTable, row)
            if (isForce || (!checkMethod || checkMethod({ row }))) {
              if (checked) {
                selectRowMaps[rowid] = row
              } else {
                if (selectRowMaps[rowid]) {
                  delete selectRowMaps[rowid]
                }
              }
              handleCheckboxReserveRow(row, checked)
            }
          }, { children: transform ? mapChildrenField : childrenField })
          reactData.selectCheckboxMaps = selectRowMaps
          return
        }

        // 列表
        rows.forEach(row => {
          const rowid = getRowid($xeTable, row)
          if (isForce || (!checkMethod || checkMethod({ row }))) {
            if (checked) {
              if (!selectRowMaps[rowid]) {
                selectRowMaps[rowid] = row
              }
            } else {
              if (selectRowMaps[rowid]) {
                delete selectRowMaps[rowid]
              }
            }
            handleCheckboxReserveRow(row, checked)
          }
        })
        reactData.selectCheckboxMaps = selectRowMaps
      },
      /**
       * 即将移除
       * @deprecated
       */
      handleSelectRow ({ row }, checked, isForce) {
        $xeTable.handleBatchSelectRows([row], checked, isForce)
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
        const titleElem = evnt.currentTarget as HTMLTableCellElement
        handleTargetEnterEvent(true)
        if (tooltipStore.column !== column || !tooltipStore.visible) {
          handleTooltip(evnt, titleElem, titleElem, null, params)
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
        const cell = evnt.currentTarget as HTMLTableCellElement
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
          let overflowElem
          let tipElem
          if (column.treeNode) {
            overflowElem = cell.querySelector('.vxe-tree-cell')
            if (column.type === 'html') {
              tipElem = cell.querySelector('.vxe-cell--html')
            }
          } else {
            tipElem = cell.querySelector(column.type === 'html' ? '.vxe-cell--html' : '.vxe-cell--label') as HTMLElement
          }
          handleTooltip(evnt, cell, (overflowElem || cell.children[0]) as HTMLElement, tipElem as HTMLElement, params)
        }
      },
      /**
       * 触发表尾 tooltip 事件
       */
      triggerFooterTooltipEvent (evnt, params) {
        const { column } = params
        const { tooltipStore } = reactData
        const cell = evnt.currentTarget as HTMLTableCellElement
        handleTargetEnterEvent(tooltipStore.column !== column || !!tooltipStore.row)
        if (tooltipStore.column !== column || !tooltipStore.visible) {
          handleTooltip(evnt, cell, cell.querySelector('.vxe-cell--item') as HTMLElement || cell.children[0], null, params)
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
              tableMethods.closeTooltip()
            }
          }, tooltipOpts.leaveDelay)
        } else {
          tableMethods.closeTooltip()
        }
      },
      triggerHeaderCellClickEvent (evnt, params) {
        const { _lastResizeTime } = internalData
        const sortOpts = computeSortOpts.value
        const columnOpts = computeColumnOpts.value
        const { column } = params
        const cell = evnt.currentTarget
        const triggerResizable = _lastResizeTime && _lastResizeTime > Date.now() - 300
        const triggerSort = getEventTargetNode(evnt, cell, 'vxe-cell--sort').flag
        const triggerFilter = getEventTargetNode(evnt, cell, 'vxe-cell--filter').flag
        if (sortOpts.trigger === 'cell' && !(triggerResizable || triggerSort || triggerFilter)) {
          tablePrivateMethods.triggerSortEvent(evnt, column, getNextSortOrder(column))
        }
        dispatchEvent('header-cell-click', Object.assign({ triggerResizable, triggerSort, triggerFilter, cell }, params), evnt)
        if (columnOpts.isCurrent || props.highlightCurrentColumn) {
          tablePrivateMethods.triggerCurrentColumnEvent(evnt, params)
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
        const { highlightCurrentRow, editConfig } = props
        const { editStore } = reactData
        const expandOpts = computeExpandOpts.value
        const editOpts = computeEditOpts.value
        const treeOpts = computeTreeOpts.value
        const radioOpts = computeRadioOpts.value
        const checkboxOpts = computeCheckboxOpts.value
        const keyboardOpts = computeKeyboardOpts.value
        const rowOpts = computeRowOpts.value
        const { actived, focused } = editStore
        const { row, column } = params
        const { type, treeNode } = column
        const isRadioType = type === 'radio'
        const isCheckboxType = type === 'checkbox'
        const isExpandType = type === 'expand'
        const cell = evnt.currentTarget as HTMLDivElement
        const triggerRadio = isRadioType && getEventTargetNode(evnt, cell, 'vxe-cell--radio').flag
        const triggerCheckbox = isCheckboxType && getEventTargetNode(evnt, cell, 'vxe-cell--checkbox').flag
        const triggerTreeNode = treeNode && getEventTargetNode(evnt, cell, 'vxe-tree--btn-wrapper').flag
        const triggerExpandNode = isExpandType && getEventTargetNode(evnt, cell, 'vxe-table--expanded').flag
        params = Object.assign({ cell, triggerRadio, triggerCheckbox, triggerTreeNode, triggerExpandNode }, params)
        if (!triggerCheckbox && !triggerRadio) {
          // 如果是展开行
          if (!triggerExpandNode && (expandOpts.trigger === 'row' || (isExpandType && expandOpts.trigger === 'cell'))) {
            tablePrivateMethods.triggerRowExpandEvent(evnt, params)
          }
          // 如果是树形表格
          if ((treeOpts.trigger === 'row' || (treeNode && treeOpts.trigger === 'cell'))) {
            tablePrivateMethods.triggerTreeExpandEvent(evnt, params)
          }
        }
        // 如果点击了树节点
        if (!triggerTreeNode) {
          if (!triggerExpandNode) {
            // 如果是高亮行
            if (rowOpts.isCurrent || highlightCurrentRow) {
              if (!triggerCheckbox && !triggerRadio) {
                tablePrivateMethods.triggerCurrentRowEvent(evnt, params)
              }
            }
            // 如果是单选框
            if (!triggerRadio && (radioOpts.trigger === 'row' || (isRadioType && radioOpts.trigger === 'cell'))) {
              tablePrivateMethods.triggerRadioRowEvent(evnt, params)
            }
            // 如果是复选框
            if (!triggerCheckbox && (checkboxOpts.trigger === 'row' || (isCheckboxType && checkboxOpts.trigger === 'cell'))) {
              tablePrivateMethods.handleToggleCheckRowEvent(evnt, params)
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
        const { editStore } = reactData
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
        const { selectCheckboxMaps } = reactData
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
          tablePrivateMethods.triggerCheckRowEvent(evnt, params, checked)
        } else {
          tablePrivateMethods.handleBatchSelectRows([row], checked)
          tablePrivateMethods.checkSelectionStatus()
        }
      },
      triggerCheckRowEvent (evnt: MouseEvent, params, checked) {
        const checkboxOpts = computeCheckboxOpts.value
        const { row } = params
        const { afterFullData } = internalData
        const { checkMethod, trigger } = checkboxOpts
        if (trigger === 'manual') {
          return
        }
        evnt.stopPropagation()
        if (checkboxOpts.isShiftKey && evnt.shiftKey && !props.treeConfig) {
          const checkboxRecords = tableMethods.getCheckboxRecords()
          if (checkboxRecords.length) {
            const firstRow = checkboxRecords[0]
            const _rowIndex = tableMethods.getVTRowIndex(row)
            const _firstRowIndex = tableMethods.getVTRowIndex(firstRow)
            if (_rowIndex !== _firstRowIndex) {
              tableMethods.setAllCheckboxRow(false)
              const rangeRows = _rowIndex < _firstRowIndex ? afterFullData.slice(_rowIndex, _firstRowIndex + 1) : afterFullData.slice(_firstRowIndex, _rowIndex + 1)
              handleCheckedCheckboxRow(rangeRows, true, false)
              dispatchEvent('checkbox-range-select', Object.assign({ rangeRecords: rangeRows }, params), evnt)
              return
            }
          }
        }
        if (!checkMethod || checkMethod({ row })) {
          tablePrivateMethods.handleBatchSelectRows([row], checked)
          tablePrivateMethods.checkSelectionStatus()
          dispatchEvent('checkbox-change', Object.assign({
            records: tableMethods.getCheckboxRecords(),
            reserves: tableMethods.getCheckboxReserveRecords(),
            indeterminates: tableMethods.getCheckboxIndeterminateRecords(),
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
        const { trigger } = radioOpts
        if (trigger === 'manual') {
          return
        }
        evnt.stopPropagation()
        let newValue = row
        let isChange = oldValue !== newValue
        if (isChange) {
          handleCheckedRadioRow(newValue)
        } else if (!radioOpts.strict) {
          isChange = oldValue === newValue
          if (isChange) {
            newValue = null
            tableMethods.clearRadioRow()
          }
        }
        if (isChange) {
          dispatchEvent('radio-change', { oldValue, newValue, ...params }, evnt)
        }
      },
      triggerCurrentColumnEvent (evnt, params) {
        const columnOpts = computeColumnOpts.value
        const { currentMethod } = columnOpts
        const { column } = params
        if (!currentMethod || currentMethod({ column })) {
          tableMethods.setCurrentColumn(column)
        }
      },
      triggerCurrentRowEvent (evnt, params) {
        const { currentRow: oldValue } = reactData
        const rowOpts = computeRowOpts.value
        const { currentMethod } = rowOpts
        const { row: newValue } = params
        const isChange = oldValue !== newValue
        if (!currentMethod || currentMethod({ row: newValue })) {
          tableMethods.setCurrentRow(newValue)
          if (isChange) {
            dispatchEvent('current-change', { oldValue, newValue, ...params }, evnt)
          }
        }
      },
      /**
       * 展开行事件
       */
      triggerRowExpandEvent (evnt, params) {
        const { rowExpandLazyLoadedMaps, expandColumn: column } = reactData
        const expandOpts = computeExpandOpts.value
        const { row } = params
        const { lazy, trigger } = expandOpts
        if (trigger === 'manual') {
          return
        }
        evnt.stopPropagation()
        const rowid = getRowid($xeTable, row)
        if (!lazy || !rowExpandLazyLoadedMaps[rowid]) {
          const expanded = !tableMethods.isRowExpandByRow(row)
          const columnIndex = tableMethods.getColumnIndex(column)
          const $columnIndex = tableMethods.getVMColumnIndex(column)
          tableMethods.setRowExpand(row, expanded)
          dispatchEvent('toggle-row-expand', {
            expanded,
            column,
            columnIndex,
            $columnIndex,
            row,
            rowIndex: tableMethods.getRowIndex(row),
            $rowIndex: tableMethods.getVMRowIndex(row)
          }, evnt)
        }
      },
      /**
       * 展开树节点事件
       */
      triggerTreeExpandEvent (evnt, params) {
        const { treeExpandLazyLoadedMaps } = reactData
        const treeOpts = computeTreeOpts.value
        const { row, column } = params
        const { lazy, trigger } = treeOpts
        if (trigger === 'manual') {
          return
        }
        evnt.stopPropagation()
        const rowid = getRowid($xeTable, row)
        if (!lazy || !treeExpandLazyLoadedMaps[rowid]) {
          const expanded = !tableMethods.isTreeExpandByRow(row)
          const columnIndex = tableMethods.getColumnIndex(column)
          const $columnIndex = tableMethods.getVMColumnIndex(column)
          tableMethods.setTreeExpand(row, expanded)
          dispatchEvent('toggle-tree-expand', { expanded, column, columnIndex, $columnIndex, row }, evnt)
        }
      },
      handleColumnSortEvent (evnt, column) {
        const { mouseConfig } = props
        const mouseOpts = computeMouseOpts.value
        const { field, sortable } = column
        if (sortable) {
          const params = { $table: $xeTable, $event: evnt, column, field, property: field, order: column.order, sortList: tableMethods.getSortColumns(), sortTime: column.sortTime }
          if (mouseConfig && mouseOpts.area && $xeTable.handleSortEvent) {
            $xeTable.handleSortEvent(evnt, params)
          }
          dispatchEvent('sort-change', params, evnt)
        }
      },
      /**
       * 点击排序事件
       */
      triggerSortEvent (evnt, column, order) {
        const sortOpts = computeSortOpts.value
        const { field, sortable } = column
        if (sortable) {
          if (!order || column.order === order) {
            tableMethods.clearSort(sortOpts.multiple ? column : null)
          } else {
            tableMethods.sort({ field, order })
          }
          $xeTable.handleColumnSortEvent(evnt, column)
        }
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
        const triggerTreeNode = treeNode && getEventTargetNode(evnt, cell, 'vxe-tree--btn-wrapper').flag
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
        const { fullAllDataRowIdData } = internalData
        const { isPeerDrag, isCrossDrag, isSelfToChildDrag, dragEndMethod } = rowDragOpts
        const treeOpts = computeTreeOpts.value
        const { transform, rowField, mapChildrenField, parentField } = treeOpts
        const childrenField = treeOpts.children || treeOpts.childrenField
        const { afterFullData, tableFullData } = internalData
        const dEndMethod = dragEndMethod || (dragConfig ? dragConfig.dragEndMethod : null)
        const dragOffsetIndex = prevDragPos === 'bottom' ? 1 : 0
        if (prevDragRow && dragRow) {
          // 判断是否有拖动
          if (prevDragRow !== dragRow) {
            return Promise.resolve(
              dEndMethod
                ? dEndMethod({
                  oldRow: dragRow,
                  newRow: prevDragRow,
                  dragPos: prevDragPos as any,
                  dragToChild: !!prevDragToChild,
                  offsetIndex: dragOffsetIndex
                })
                : true
            ).then((status) => {
              if (!status) {
                return
              }

              let oafIndex = -1
              let nafIndex = -1
              // 如果为树结构
              if (treeConfig) {
                if (transform) {
                  // 移出源位置
                  const oldRowid = getRowid($xeTable, dragRow)
                  const oldRest = fullAllDataRowIdData[oldRowid]
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
                          return
                        }
                      } else {
                        if (!isCrossDrag) {
                          return
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
                            return
                          }
                        }
                      }
                    } else if (oldLevel) {
                      // 子到根

                      if (!isCrossDrag) {
                        return
                      }
                    } else if (newLevel) {
                      // 根到子

                      if (!isCrossDrag) {
                        return
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
                          return
                        }
                      }
                    } else {
                      // 根到根
                    }

                    const fullList = XEUtils.toTreeArray(internalData.afterTreeFullData, { children: childrenField })

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
                    dragRow[parentField] = prevDragToChild ? prevDragRow[rowField] : prevDragRow[parentField]

                    internalData.tableFullTreeData = XEUtils.toArrayTree(fullList, {
                      key: treeOpts.rowField,
                      parentKey: treeOpts.parentField,
                      children: childrenField,
                      mapChildren: treeOpts.mapChildrenField
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

              reactData.isDragRowMove = true
              $xeTable.handleTableData(treeConfig && transform)
              $xeTable.cacheRowMap()
              updateScrollYStatus()
              if (!(treeConfig && transform)) {
                $xeTable.updateAfterDataIndex()
              }
              $xeTable.checkSelectionStatus()
              if (reactData.scrollYLoad) {
                $xeTable.updateScrollYSpace()
              }
              nextTick().then(() => {
                $xeTable.updateCellAreas()
                $xeTable.recalculate()
              })

              dispatchEvent('row-dragend', {
                oldRow: dragRow,
                newRow: prevDragRow,
                dragPos: prevDragPos as any,
                dragToChild: !!prevDragToChild,
                offsetIndex: dragOffsetIndex,
                _index: {
                  newIndex: nafIndex,
                  oldIndex: oafIndex
                }
              }, evnt)
            }).catch(() => {
            })
          }
        }
        return Promise.resolve()
      },
      handleRowDragDragendEvent (evnt) {
        const { treeConfig } = props
        const { fullAllDataRowIdData, prevDragToChild } = internalData
        const { dragRow } = reactData
        const treeOpts = computeTreeOpts.value
        const { lazy } = treeOpts
        const hasChildField = treeOpts.hasChild || treeOpts.hasChildField
        const { prevDragRow, prevDragPos } = internalData
        if (treeConfig && prevDragToChild) {
          // 懒加载
          if (lazy) {
            const newRowid = getRowid($xeTable, prevDragRow)
            const rowRest = fullAllDataRowIdData[newRowid]
            if (prevDragRow[hasChildField]) {
              if (rowRest && rowRest.treeLoaded) {
                $xeTable.handleRowDragSwapEvent(evnt, true, dragRow, prevDragRow, prevDragPos, prevDragToChild)
              }
            } else {
              $xeTable.handleRowDragSwapEvent(evnt, true, dragRow, prevDragRow, prevDragPos, prevDragToChild)
            }
          }
        } else {
          $xeTable.handleRowDragSwapEvent(evnt, true, dragRow, prevDragRow, prevDragPos, prevDragToChild)
        }
        hideDropTip()
        clearRowDropOrigin()
        internalData.prevDragToChild = false
        reactData.dragRow = null
        reactData.dragCol = null
        setTimeout(() => {
          reactData.isDragRowMove = false
        }, 500)
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
        const hasCtrlKey = evnt.ctrlKey
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
          internalData.prevDragToChild = !!(treeConfig && transform && (isCrossDrag && isToChildDrag) && hasCtrlKey)
          internalData.prevDragRow = row
          internalData.prevDragPos = dragPos
          if ($xeTable.eqRow(dragRow, row) ||
            (hasCtrlKey && treeConfig && lazy && row[hasChildField] && rowRest && !rowRest.treeLoaded) ||
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
        parseColumns(false).then(() => {
          $xeTable.updateCellAreas()
          $xeTable.saveCustomStore('update:sort')
        })
      },
      handleColDragSwapEvent (evnt, isSyncColumn, dragCol, prevDragCol, prevDragPos, prevDragToChild) {
        const { mouseConfig } = props
        const columnDragOpts = computeColumnDragOpts.value
        const { isPeerDrag, isCrossDrag, isSelfToChildDrag, isToChildDrag, dragEndMethod } = columnDragOpts
        const { collectColumn } = internalData
        const dragOffsetIndex = prevDragPos === 'right' ? 1 : 0
        if (prevDragCol && dragCol) {
          // 判断是否有拖动
          if (prevDragCol !== dragCol) {
            const oldColumn = dragCol
            const newColumn = prevDragCol
            return Promise.resolve(
              dragEndMethod
                ? dragEndMethod({
                  oldColumn,
                  newColumn,
                  dragPos: prevDragPos as any,
                  dragToChild: !!prevDragToChild,
                  offsetIndex: dragOffsetIndex
                })
                : true
            ).then((status) => {
              if (!status) {
                return
              }

              let oafIndex = -1
              let nafIndex = -1

              const oldAllMaps: Record<string, any> = {}
              XEUtils.eachTree([oldColumn], column => {
                oldAllMaps[column.id] = column
              })

              let isSelfToChildStatus = false

              if (oldColumn.parentId && newColumn.parentId) {
                // 子到子

                if (isPeerDrag && !isCrossDrag) {
                  if (oldColumn.parentId !== newColumn.parentId) {
                    // 非同级
                    return
                  }
                } else {
                  if (!isCrossDrag) {
                    return
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
                      return
                    }
                  }
                }
              } else if (oldColumn.parentId) {
                // 子到根

                if (!isCrossDrag) {
                  return
                }
              } else if (newColumn.parentId) {
                // 根到子

                if (!isCrossDrag) {
                  return
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
                    return
                  }
                }
              } else {
                // 根到根
              }

              const oldewMatchRest = XEUtils.findTree(collectColumn, item => item.id === oldColumn.id)

              // 改变层级
              if (isSelfToChildStatus && (isCrossDrag && isSelfToChildDrag)) {
                if (oldewMatchRest) {
                  const { items: oCols, index: oIndex } = oldewMatchRest
                  const childList = oldColumn.children || []
                  childList.forEach(column => {
                    column.parentId = oldColumn.parentId
                  })
                  oCols.splice(oIndex, 1, ...childList)
                  oldColumn.children = []
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
                if ((isCrossDrag && isToChildDrag) && prevDragToChild) {
                  oldColumn.parentId = newColumn.id
                  newColumn.children = (newColumn.children || []).concat([oldColumn])
                } else {
                  oldColumn.parentId = newColumn.parentId
                  nCols.splice(nIndex + dragOffsetIndex, 0, oldColumn)
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

              reactData.isDragColMove = true
              if (mouseConfig) {
                if ($xeTable.clearSelected) {
                  $xeTable.clearSelected()
                }
                if ($xeTable.clearCellAreas) {
                  $xeTable.clearCellAreas()
                  $xeTable.clearCopyCellArea()
                }
              }

              dispatchEvent('column-dragend', {
                oldColumn,
                newColumn,
                dragPos: prevDragPos,
                dragToChild: !!prevDragToChild,
                offsetIndex: dragOffsetIndex,
                _index: {
                  newIndex: nafIndex,
                  oldIndex: oafIndex
                }
              }, evnt)

              if (isSyncColumn) {
                $xeTable.handleColDragSwapColumn()
              }
            }).catch(() => {
            })
          }
        }
        return Promise.resolve()
      },
      handleHeaderCellDragDragendEvent (evnt) {
        const { dragCol } = reactData
        const { prevDragCol, prevDragPos, prevDragToChild } = internalData
        $xeTable.handleColDragSwapEvent(evnt, true, dragCol, prevDragCol, prevDragPos, prevDragToChild)
        hideDropTip()
        clearColDropOrigin()
        internalData.prevDragToChild = false
        reactData.dragRow = null
        reactData.dragCol = null
        setTimeout(() => {
          reactData.isDragColMove = false
          $xeTable.recalculate().then(() => {
            loadScrollXData()
          })
        }, 500)
      },
      handleHeaderCellDragDragoverEvent (evnt) {
        const { dragCol } = reactData
        const columnDragOpts = computeColumnDragOpts.value
        const { isToChildDrag, isPeerDrag, isCrossDrag } = columnDragOpts
        if (!dragCol) {
          evnt.preventDefault()
          return
        }
        const hasCtrlKey = evnt.ctrlKey
        const thEl = evnt.currentTarget as HTMLElement
        const colid = thEl.getAttribute('colid')
        const column = $xeTable.getColumnById(colid)
        if (column) {
          evnt.preventDefault()
          const { clientX } = evnt
          const offsetX = clientX - thEl.getBoundingClientRect().x
          const dragPos = offsetX < thEl.clientWidth / 2 ? 'left' : 'right'
          internalData.prevDragToChild = !!((isCrossDrag && isToChildDrag) && hasCtrlKey)
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
            const tableWidth = el.clientWidth
            const leftContainerElem = refLeftContainer.value
            const leftContainerWidth = leftContainerElem ? leftContainerElem.clientWidth : 0
            const rightContainerElem = refRightContainer.value
            const rightContainerWidth = rightContainerElem ? rightContainerElem.clientWidth : 0
            const srartX = wrapperRect.x + leftContainerWidth
            const endX = wrapperRect.x + tableWidth - rightContainerWidth
            const distSize = 28
            const startDistSize = clientX - srartX
            const endDistSize = endX - clientX
            if (startDistSize > 0 && startDistSize <= distSize) {
              const scrollRatio = Math.floor(tableWidth / (startDistSize > distSize / 2 ? 240 : 120))
              scrollTargetEl.scrollLeft -= scrollRatio * (distSize - startDistSize)
            } else if (endDistSize > 0 && endDistSize <= distSize) {
              const scrollRatio = Math.floor(tableWidth / (endDistSize > distSize / 2 ? 240 : 120))
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
        reactData.isDragColMove = false
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
        reactData.isDragColMove = false
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
        reactData.isDragColMove = false
        reactData.isDragRowMove = false
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
        checkLastSyncScroll(isRollX, isRollY)
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
        const sXOpts = computeSXOpts.value
        if (sXOpts.immediate) {
          loadScrollXData()
        } else {
          lazyScrollXData()
        }
      },
      /**
       * 纵向 Y 可视渲染事件处理
       */
      triggerScrollYEvent () {
        const sYOpts = computeSYOpts.value
        if (sYOpts.immediate) {
          loadScrollYData()
        } else {
          lazyScrollYData()
        }
      },
      triggerBodyScrollEvent (evnt, fixedType) {
        const { elemStore, lastScrollTop, lastScrollLeft, inWheelScroll, inVirtualScroll, inHeaderScroll, inBodyScroll, scrollRenderType, inFooterScroll } = internalData
        const xHandleEl = refScrollXHandleElem.value
        const yHandleEl = refScrollYHandleElem.value
        const leftScrollElem = getRefElem(elemStore['left-body-scroll'])
        const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
        const rightScrollElem = getRefElem(elemStore['right-body-scroll'])
        const headerScrollElem = getRefElem(elemStore['main-header-scroll'])
        const footerScrollElem = getRefElem(elemStore['main-footer-scroll'])
        if (inWheelScroll || inVirtualScroll || inHeaderScroll || inFooterScroll) {
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
          $xeTable.triggerScrollYEvent(evnt)
        }
        if (isRollX) {
          setScrollLeft(xHandleEl, scrollLeft)
          setScrollLeft(headerScrollElem, scrollLeft)
          setScrollLeft(footerScrollElem, scrollLeft)
          $xeTable.triggerScrollXEvent(evnt)
        }
        $xeTable.handleScrollEvent(evnt, isRollY, isRollX, scrollTop, scrollLeft, {
          type: 'body',
          fixed: fixedType
        })
      },
      triggerHeaderScrollEvent (evnt, fixedType) {
        const { elemStore, inWheelScroll, inVirtualScroll, inBodyScroll, inFooterScroll } = internalData
        const yHandleEl = refScrollYHandleElem.value
        const xHandleEl = refScrollXHandleElem.value
        const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
        const headerScrollElem = getRefElem(elemStore['main-header-scroll'])
        const footerScrollElem = getRefElem(elemStore['main-footer-scroll'])
        if (inWheelScroll) {
          return
        }
        if (inVirtualScroll) {
          return
        }
        if (inBodyScroll) {
          return
        }
        if (inFooterScroll) {
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
        $xeTable.triggerScrollXEvent(evnt)
        $xeTable.handleScrollEvent(evnt, isRollY, isRollX, scrollTop, scrollLeft, {
          type: 'header',
          fixed: fixedType
        })
      },
      triggerFooterScrollEvent (evnt, fixedType) {
        const { elemStore, inWheelScroll, inVirtualScroll, inHeaderScroll, inBodyScroll } = internalData
        const yHandleEl = refScrollYHandleElem.value
        const xHandleEl = refScrollXHandleElem.value
        const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
        const headerScrollElem = getRefElem(elemStore['main-header-scroll'])
        const footerScrollElem = getRefElem(elemStore['main-footer-scroll'])
        if (inWheelScroll) {
          return
        }
        if (inVirtualScroll) {
          return
        }
        if (inHeaderScroll) {
          return
        }
        if (inBodyScroll) {
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
        $xeTable.triggerScrollXEvent(evnt)
        $xeTable.handleScrollEvent(evnt, isRollY, isRollX, scrollTop, scrollLeft, {
          type: 'footer',
          fixed: fixedType
        })
      },
      triggerBodyWheelEvent (evnt) {
        const { deltaY, deltaX } = evnt
        const { highlightHoverRow } = tableProps
        const { elemStore, lastScrollTop, lastScrollLeft } = internalData
        const rowOpts = computeRowOpts.value
        const xHandleEl = refScrollXHandleElem.value
        const yHandleEl = refScrollYHandleElem.value
        const leftScrollElem = getRefElem(elemStore['left-body-scroll'])
        const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
        const rightScrollElem = getRefElem(elemStore['right-body-scroll'])

        if (!xHandleEl) {
          return
        }
        if (!yHandleEl) {
          return
        }
        if (!bodyScrollElem) {
          return
        }

        let multiple = 1

        if (reactData.lastScrollTime + 25 > Date.now()) {
          multiple = 1.18
        } else if (reactData.lastScrollTime + 30 > Date.now()) {
          multiple = 1.15
        } else if (reactData.lastScrollTime + 40 > Date.now()) {
          multiple = 1.12
        } else if (reactData.lastScrollTime + 55 > Date.now()) {
          multiple = 1.09
        } else if (reactData.lastScrollTime + 75 > Date.now()) {
          multiple = 1.06
        } else if (reactData.lastScrollTime + 100 > Date.now()) {
          multiple = 1.03
        }

        const deltaTop = deltaY * multiple
        const deltaLeft = deltaX * multiple

        const isTopWheel = deltaTop < 0
        const currScrollTop = yHandleEl.scrollTop
        // 如果滚动位置已经是顶部或底部，则不需要触发
        if (isTopWheel ? currScrollTop <= 0 : currScrollTop >= yHandleEl.scrollHeight - yHandleEl.clientHeight) {
          return
        }

        const scrollTop = bodyScrollElem.scrollTop + deltaTop
        const scrollLeft = bodyScrollElem.scrollLeft + deltaLeft
        const isRollX = scrollLeft !== lastScrollLeft
        const isRollY = scrollTop !== lastScrollTop

        // 用于鼠标纵向滚轮处理
        if (isRollY) {
          evnt.preventDefault()
          if (rowOpts.isHover || highlightHoverRow) {
            $xeTable.clearHoverRow()
          }

          internalData.inWheelScroll = true
          setScrollTop(yHandleEl, scrollTop)
          setScrollTop(bodyScrollElem, scrollTop)
          setScrollTop(leftScrollElem, scrollTop)
          setScrollTop(rightScrollElem, scrollTop)

          loadScrollYData(scrollTop)
          $xeTable.handleScrollEvent(evnt, isRollY, isRollX, scrollTop, scrollLeft, {
            type: 'table',
            fixed: ''
          })
        }
      },
      triggerVirtualScrollXEvent (evnt) {
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
        $xeTable.triggerScrollXEvent(evnt)
        $xeTable.handleScrollEvent(evnt, isRollY, isRollX, scrollTop, scrollLeft, {
          type: 'table',
          fixed: ''
        })
      },
      triggerVirtualScrollYEvent (evnt) {
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
        $xeTable.triggerScrollYEvent(evnt)
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
        const { tableFullData } = internalData
        const rests: Promise<any>[] = []
        if (treeConfig) {
          const treeOpts = computeTreeOpts.value
          const childrenField = treeOpts.children || treeOpts.childrenField
          const matchObj = XEUtils.findTree(tableFullData, item => $xeTable.eqRow(item, row), { children: childrenField })
          if (matchObj) {
            const nodes = matchObj.nodes
            nodes.forEach((row, index) => {
              if (index < nodes.length - 1 && !tableMethods.isTreeExpandByRow(row)) {
                rests.push(tableMethods.setTreeExpand(row, true))
              }
            })
          }
        }
        return Promise.all(rests).then(() => rowToVisible($xeTable, row))
      },
      updateScrollYStatus,
      // 更新横向 X 可视渲染上下剩余空间大小
      updateScrollXSpace () {
        const { isGroup, scrollXLoad } = reactData
        const { visibleColumn, scrollXStore, elemStore, tableWidth } = internalData
        const tableHeader = refTableHeader.value
        const tableBody = refTableBody.value
        const tableFooter = refTableFooter.value
        const tableBodyElem = tableBody ? tableBody.$el as HTMLDivElement : null
        if (tableBodyElem) {
          const tableHeaderElem = tableHeader ? tableHeader.$el as HTMLDivElement : null
          const tableFooterElem = tableFooter ? tableFooter.$el as HTMLDivElement : null
          const headerElem = tableHeaderElem ? tableHeaderElem.querySelector('.vxe-table--header') as HTMLTableElement : null
          const bodyElem = tableBodyElem.querySelector('.vxe-table--body') as HTMLTableElement
          const footerElem = tableFooterElem ? tableFooterElem.querySelector('.vxe-table--footer') as HTMLTableElement : null
          const leftSpaceWidth = visibleColumn.slice(0, scrollXStore.startIndex).reduce((previous, column) => previous + column.renderWidth, 0)
          let marginLeft = ''
          if (scrollXLoad) {
            marginLeft = `${leftSpaceWidth}px`
          }
          if (headerElem) {
            headerElem.style.marginLeft = isGroup ? '' : marginLeft
          }
          bodyElem.style.marginLeft = marginLeft
          if (footerElem) {
            footerElem.style.marginLeft = marginLeft
          }
          const containerList = ['main']
          containerList.forEach(name => {
            const layoutList = ['header', 'body', 'footer']
            layoutList.forEach(layout => {
              const xSpaceElem = getRefElem(elemStore[`${name}-${layout}-xSpace`])
              if (xSpaceElem) {
                xSpaceElem.style.width = scrollXLoad ? `${tableWidth}px` : ''
              }
            })
          })
          const scrollXSpaceEl = refScrollXSpaceElem.value
          if (scrollXSpaceEl) {
            scrollXSpaceEl.style.width = `${tableWidth}px`
          }
          nextTick(() => {
            updateStyle()
          })
        }
      },
      // 更新纵向 Y 可视渲染上下剩余空间大小
      updateScrollYSpace () {
        const { showOverflow } = props
        const { scrollYLoad, rowHeight } = reactData
        const { scrollYStore, elemStore, afterFullData, fullAllDataRowIdData } = internalData
        const { startIndex } = scrollYStore
        const bodyTableElem = getRefElem(elemStore['main-body-table'])
        const containerList = ['main', 'left', 'right']
        let topSpaceHeight = 0
        let ySpaceHeight = 0
        if (scrollYLoad) {
          if (showOverflow) {
            ySpaceHeight = afterFullData.length * rowHeight
            topSpaceHeight = Math.max(0, startIndex * rowHeight)
          } else {
            for (let i = 0; i < afterFullData.length; i++) {
              const row = afterFullData[i]
              const rowid = getRowid($xeTable, row)
              const rowRest = fullAllDataRowIdData[rowid]
              if (rowRest) {
                ySpaceHeight += rowRest.height || rowHeight
              }
            }
            for (let i = 0; i < startIndex; i++) {
              const row = afterFullData[i]
              const rowid = getRowid($xeTable, row)
              const rowRest = fullAllDataRowIdData[rowid]
              if (rowRest) {
                topSpaceHeight += rowRest.height || rowHeight
              }
            }
          }
        } else {
          if (bodyTableElem) {
            ySpaceHeight = bodyTableElem.clientHeight
          }
        }
        containerList.forEach(name => {
          const layoutList = ['header', 'body', 'footer']
          const tableElem = getRefElem(elemStore[`${name}-body-table`])
          if (tableElem) {
            tableElem.style.marginTop = topSpaceHeight ? `${topSpaceHeight}px` : ''
          }
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
        nextTick(() => {
          updateStyle()
        })
      },
      updateScrollXData () {
        const { showOverflow } = props
        handleTableColumn()
        return nextTick().then(() => {
          handleTableColumn()
          $xeTable.updateScrollXSpace()
          if (!showOverflow) {
            $xeTable.updateScrollYSpace()
          }
        })
      },
      updateScrollYData () {
        $xeTable.handleTableData()
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
          XEUtils.arrayEach(el.querySelectorAll(`[rowid="${rowid}"]`), elem => addClass(elem, 'row--hover'))
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
    if (process.env.VUE_APP_VXE_ENV === 'development') {
      'openExport,openPrint,exportData,openImport,importData,saveFile,readFile,importByFile,print'.split(',').forEach(name => {
        ($xeTable as any)[name] = function () {
          errLog('vxe.error.reqModule', ['VxeTableExportModule'])
        }
      })
      'clearValidate,fullValidate,validate'.split(',').forEach(name => {
        ($xeTable as any)[name] = function () {
          errLog('vxe.error.reqModule', ['VxeTableValidatorModule'])
        }
      })
    }

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
      const params = { $table: $xeTable }
      if (slots.empty) {
        return slots.empty(params)
      } else {
        const compConf = emptyOpts.name ? renderer.get(emptyOpts.name) : null
        const rtEmptyView = compConf ? (compConf.renderTableEmpty || compConf.renderTableEmptyView || compConf.renderEmpty) : null
        if (rtEmptyView) {
          return getSlotVNs(rtEmptyView(emptyOpts, params))
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
      const { dragRow } = reactData
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
          h('div', {
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
        ])
      }
      return renderEmptyElement($xeTable)
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
        ])
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
      const { isCalcColumn, isGroup, overflowX, overflowY, scrollXLoad, scrollYLoad, tableData, initStore, columnStore, filterStore, customStore, tooltipStore } = reactData
      const { leftList, rightList } = columnStore
      const loadingSlot = slots.loading
      const tooltipOpts = computeTooltipOpts.value
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
      const currLoading = reactData.isLoading || loading
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
          'column--calc': isCalcColumn,
          'col--drag-cell': columnOpts.drag && columnDragOpts.trigger === 'cell',
          'is--header': showHeader,
          'is--footer': showFooter,
          'is--group': isGroup,
          'is--tree-line': treeConfig && (treeOpts.showLine || treeOpts.line),
          'is--fixed-left': leftList.length,
          'is--fixed-right': rightList.length,
          'is--animat': !!props.animat,
          'is--padding': props.padding,
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
          key: 'cl',
          ref: refCellResizeBar,
          class: 'vxe-table--resizable-bar'
        }, resizableOpts.showDragTip
          ? [
              h('div', {
                ref: refCellResizeTip,
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
            h(VxeUITooltipComponent, Object.assign({
              key: 'btp',
              ref: refTooltip
            }, tooltipOpts, tooltipStore.currOpts)),
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
                ...(validOpts.message === 'tooltip' || tableData.length === 1 ? Object.assign({ isArrow: false }, tooltipOpts) : {}) as any
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
      loadTableData(value).then(() => {
        const { scrollXLoad, scrollYLoad, expandColumn } = reactData
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
        if ((scrollXLoad || scrollYLoad) && expandColumn) {
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
        handleUupdateResize()
        nextTick(() => {
          handleUupdateResize()
          setTimeout(() => handleUupdateResize())
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
      tableMethods.clearMergeCells()
      nextTick(() => {
        if (props.mergeCells) {
          tableMethods.setMergeCells(props.mergeCells)
        }
      })
    })

    const mergeFooterItemFlag = ref(0)
    watch(() => props.mergeFooterItems ? props.mergeFooterItems.length : -1, () => {
      mergeFooterItemFlag.value++
    })
    watch(() => props.mergeFooterItems, () => {
      mergeFooterItemFlag.value++
    })
    watch(mergeFooterItemFlag, () => {
      tableMethods.clearMergeFooterItems()
      nextTick(() => {
        if (props.mergeFooterItems) {
          tableMethods.setMergeFooterItems(props.mergeFooterItems)
        }
      })
    })

    if ($xeTabs) {
      watch(() => $xeTabs ? $xeTabs.reactData.resizeFlag : null, () => {
        handleGlobalResizeEvent()
      })
    }

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

      if (columnOpts.drag || rowOpts.drag || customOpts.allowSort) {
        initTpImg()
      }

      nextTick(() => {
        const { data, treeConfig, showOverflow } = props
        const { scrollXStore, scrollYStore } = internalData
        const sYOpts = computeSYOpts.value
        const editOpts = computeEditOpts.value
        const treeOpts = computeTreeOpts.value
        const radioOpts = computeRadioOpts.value
        const checkboxOpts = computeCheckboxOpts.value
        const expandOpts = computeExpandOpts.value
        const rowOpts = computeRowOpts.value

        if (process.env.VUE_APP_VXE_ENV === 'development') {
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
          if (treeConfig && (treeOpts.showLine || treeOpts.line) && (!(props.rowKey || rowOpts.useKey) || !showOverflow)) {
            warnLog('vxe.error.reqProp', ['row-config.useKey | show-overflow'])
          }
          if (treeConfig && !treeOpts.transform && props.stripe) {
            warnLog('vxe.error.noTree', ['stripe'])
          }
          if (props.showFooter && !(props.footerMethod || props.footerData)) {
            warnLog('vxe.error.reqProp', ['footer-data | footer-method'])
          }
          // if (props.highlightCurrentRow) {
          //   warnLog('vxe.error.delProp', ['highlight-current-row', 'row-config.isCurrent'])
          // }
          // if (props.highlightHoverRow) {
          //   warnLog('vxe.error.delProp', ['highlight-hover-row', 'row-config.isHover'])
          // }
          // if (props.highlightCurrentColumn) {
          //   warnLog('vxe.error.delProp', ['highlight-current-column', 'column-config.isCurrent'])
          // }
          // if (props.highlightHoverColumn) {
          //   warnLog('vxe.error.delProp', ['highlight-hover-column', 'column-config.isHover'])
          // }
          // 检查导入导出类型，如果自定义导入导出方法，则不校验类型
          const { exportConfig, importConfig } = props
          const exportOpts = computeExportOpts.value
          const importOpts = computeImportOpts.value
          if (importConfig && importOpts.types && !importOpts.importMethod && !XEUtils.includeArrays(XEUtils.keys(importOpts._typeMaps), importOpts.types)) {
            warnLog('vxe.error.errProp', [`export-config.types=${importOpts.types.join(',')}`, importOpts.types.filter((type: string) => XEUtils.includes(XEUtils.keys(importOpts._typeMaps), type)).join(',') || XEUtils.keys(importOpts._typeMaps).join(',')])
          }
          if (exportConfig && exportOpts.types && !exportOpts.exportMethod && !XEUtils.includeArrays(XEUtils.keys(exportOpts._typeMaps), exportOpts.types)) {
            warnLog('vxe.error.errProp', [`export-config.types=${exportOpts.types.join(',')}`, exportOpts.types.filter((type: string) => XEUtils.includes(XEUtils.keys(exportOpts._typeMaps), type)).join(',') || XEUtils.keys(exportOpts._typeMaps).join(',')])
          }
        }

        if (process.env.VUE_APP_VXE_ENV === 'development') {
          const customOpts = computeCustomOpts.value
          const mouseOpts = computeMouseOpts.value
          const rowOpts = computeRowOpts.value
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
          if (!$xeTable.handleMousedownCellAreaEvent) {
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
          if (props.dragConfig) {
            warnLog('vxe.error.delProp', ['drag-config', 'row-drag-config'])
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
          // if (mouseOpts.area && checkboxOpts.range) {
          //   warnLog('vxe.error.errConflicts', ['mouse-config.area', 'checkbox-config.range'])
          // }
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
        }

        // 检查是否有安装需要的模块
        if (process.env.VUE_APP_VXE_ENV === 'development') {
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
        }

        Object.assign(scrollYStore, {
          startIndex: 0,
          endIndex: 0,
          visibleSize: 0,
          adaptive: sYOpts.adaptive !== false
        })
        Object.assign(scrollXStore, {
          startIndex: 0,
          endIndex: 0,
          visibleSize: 0
        })

        loadTableData(data || []).then(() => {
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
      globalEvents.on($xeTable, 'paste', handleGlobalPasteEvent)
      globalEvents.on($xeTable, 'copy', handleGlobalCopyEvent)
      globalEvents.on($xeTable, 'cut', handleGlobalCutEvent)
      globalEvents.on($xeTable, 'mousedown', handleGlobalMousedownEvent)
      globalEvents.on($xeTable, 'blur', handleGlobalBlurEvent)
      globalEvents.on($xeTable, 'mousewheel', handleGlobalMousewheelEvent)
      globalEvents.on($xeTable, 'keydown', handleGlobalKeydownEvent)
      globalEvents.on($xeTable, 'resize', handleGlobalResizeEvent)
      globalEvents.on($xeTable, 'contextmenu', $xeTable.handleGlobalContextmenuEvent)
      tablePrivateMethods.preventEvent(null, 'mounted', { $table: $xeTable })
    })

    onBeforeUnmount(() => {
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

    if (process.env.VUE_APP_VXE_ENV === 'development') {
      nextTick(() => {
        if (props.loading) {
          if (!VxeUILoadingComponent && !slots.loading) {
            errLog('vxe.error.reqComp', ['vxe-loading'])
          }
        }
        if ((props.showOverflow === true || props.showOverflow === 'tooltip') ||
          (props.showHeaderOverflow === true || props.showHeaderOverflow === 'tooltip') ||
          (props.showFooterOverflow === true || props.showFooterOverflow === 'tooltip') ||
          props.tooltipConfig || props.editRules) {
          if (!VxeUITooltipComponent) {
            errLog('vxe.error.reqComp', ['vxe-tooltip'])
          }
        }
      })
    }

    provide('$xeColgroup', null)
    provide('$xeTable', $xeTable)

    $xeTable.renderVN = renderVN

    return $xeTable
  },
  render () {
    return this.renderVN()
  }
})
