import { defineComponent, h, createCommentVNode, ComponentPublicInstance, resolveComponent, reactive, ref, Ref, provide, inject, nextTick, onActivated, onDeactivated, onBeforeUnmount, onUnmounted, watch, computed, ComputedRef, onMounted } from 'vue'
import XEUtils from 'xe-utils'
import { browse, isPx, isScale, hasClass, addClass, removeClass, getEventTargetNode, getPaddingTopBottomSize, setScrollTop, setScrollLeft, isNodeElement } from '../../ui/src/dom'
import { getLastZIndex, nextZIndex, hasChildrenList, getFuncText, isEnableConf, formatText, eqEmptyValue } from '../../ui/src/utils'
import { VxeUI, getConfig, getI18n, renderer, formats, createEvent, globalResize, interceptor, hooks, globalEvents, GLOBAL_EVENT_KEYS, log, useSize } from '@vxe-ui/core'
import Cell from './cell'
import TableBodyComponent from './body'
import TableHeaderComponent from './header'
import TableFooterComponent from './footer'
import tableProps from './props'
import tableEmits from './emits'
import { getRowUniqueId, clearTableAllStatus, getRowkey, getRowid, rowToVisible, colToVisible, getCellValue, setCellValue, handleFieldOrColumn, toTreePathSeq, restoreScrollLocation, restoreScrollListener, XEBodyScrollElement, getRootColumn } from './util'
import { getSlotVNs } from '../../ui/src/vn'
import TableCustomPanelComponent from '../module/custom/panel'
import TableFilterPanelComponent from '../module/filter/panel'
import TableImportPanelComponent from '../module/export/import-panel'
import TableExportPanelComponent from '../module/export/export-panel'
import TableMenuPanelComponent from '../module/menu/panel'

import type { VxeLoadingComponent, VxeTooltipInstance, VxeTooltipComponent } from 'vxe-pc-ui'
import type { VxeGridConstructor, VxeGridPrivateMethods, VxeTableConstructor, TableReactData, TableInternalData, VxeTablePropTypes, VxeToolbarConstructor, TablePrivateMethods, VxeTablePrivateRef, VxeTablePrivateComputed, VxeTablePrivateMethods, TableMethods, VxeTableMethods, VxeTableDefines, VxeTableProps, VxeColumnPropTypes } from '../../../types'

const isWebkit = browse['-webkit'] && !browse.edge

const resizableStorageKey = 'VXE_TABLE_CUSTOM_COLUMN_WIDTH'
const visibleStorageKey = 'VXE_TABLE_CUSTOM_COLUMN_VISIBLE'
const fixedStorageKey = 'VXE_TABLE_CUSTOM_COLUMN_FIXED'
const sortStorageKey = 'VXE_TABLE_CUSTOM_COLUMN_SORT'

export default defineComponent({
  name: 'VxeTable',
  props: tableProps,
  emits: tableEmits,
  setup (props, context) {
    const { slots, emit } = context

    const hasUseTooltip = false

    const xID = XEUtils.uniqueId()

    const { computeSize } = useSize(props)

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
      // 已标记的行
      pendingRowList: [],
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
        maxHeight: 0
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
        scaleList: [],
        scaleMinList: [],
        autoList: []
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
        visible: false
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
      _isResize: false
    })

    const internalData: TableInternalData = {
      tZindex: 0,
      elemStore: {},
      // 存放横向 X 虚拟滚动相关的信息
      scrollXStore: {
        offsetSize: 0,
        visibleSize: 0,
        startIndex: 0,
        endIndex: 0
      },
      // 存放纵向 Y 虚拟滚动相关信息
      scrollYStore: {
        rowHeight: 0,
        offsetSize: 0,
        visibleSize: 0,
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
    const refEmptyPlaceholder = ref() as Ref<HTMLDivElement>

    const $xeGrid = inject<(VxeGridConstructor & VxeGridPrivateMethods) | null>('$xeGrid', null)
    let $xeToolbar: VxeToolbarConstructor

    const computeValidOpts = computed(() => {
      return Object.assign({}, getConfig().table.validConfig, props.validConfig) as VxeTablePropTypes.ValidOpts
    })

    const computeSXOpts = computed(() => {
      return Object.assign({}, getConfig().table.scrollX, props.scrollX) as VxeTablePropTypes.SXOpts
    })

    const computeSYOpts = computed(() => {
      return Object.assign({}, getConfig().table.scrollY, props.scrollY) as VxeTablePropTypes.SYOpts
    })

    const computeRowHeightMaps = computed(() => {
      return {
        default: 48,
        medium: 44,
        small: 40,
        mini: 36
      }
    })

    const computeColumnOpts = computed(() => {
      return Object.assign({}, getConfig().table.columnConfig, props.columnConfig) as VxeTablePropTypes.ColumnOpts
    })

    const computeRowOpts = computed(() => {
      return Object.assign({}, getConfig().table.rowConfig, props.rowConfig) as VxeTablePropTypes.RowOpts
    })

    const computeResizeleOpts = computed(() => {
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

    let computeTooltipOpts = ref() as ComputedRef<VxeTablePropTypes.TooltipOpts>

    computeTooltipOpts = computed(() => {
      return Object.assign({}, getConfig().tooltip, getConfig().table.tooltipConfig, props.tooltipConfig)
    })

    const computeTipConfig = computed(() => {
      const tooltipOpts = computeTooltipOpts.value
      return {
        ...tooltipOpts
      }
    })

    const computeValidTipOpts = computed(() => {
      const tooltipOpts = computeTooltipOpts.value
      return Object.assign({ isArrow: false }, tooltipOpts)
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

    const computeFixedColumnSize = computed(() => {
      const { collectColumn } = internalData
      let fixedSize = 0
      // 只判断第一层
      collectColumn.forEach((column) => {
        if (column.fixed) {
          fixedSize++
        }
      })
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
      refCellResizeBar
    }

    const computeMaps: VxeTablePrivateComputed = {
      computeSize,
      computeValidOpts,
      computeSXOpts,
      computeSYOpts,
      computeColumnOpts,
      computeRowOpts,
      computeResizeleOpts,
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
      computeCustomOpts,
      computeFixedColumnSize,
      computeIsMaxFixedColumn,
      computeIsAllCheckboxDisabled
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

    const getCustomStorageMap = (key: string) => {
      const version = getConfig().version
      const rest = XEUtils.toStringJSON(localStorage.getItem(key) || '')
      return rest && rest._v === version ? rest : { _v: version }
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

    const computeVirtualX = () => {
      const { visibleColumn } = internalData
      const tableBody = refTableBody.value
      const tableBodyElem = tableBody ? tableBody.$el as HTMLDivElement : null
      if (tableBodyElem) {
        const { scrollLeft, clientWidth } = tableBodyElem
        const endWidth = scrollLeft + clientWidth
        let toVisibleIndex = -1
        let cWidth = 0
        let visibleSize = 0
        for (let colIndex = 0, colLen = visibleColumn.length; colIndex < colLen; colIndex++) {
          cWidth += visibleColumn[colIndex].renderWidth
          if (toVisibleIndex === -1 && scrollLeft < cWidth) {
            toVisibleIndex = colIndex
          }
          if (toVisibleIndex >= 0) {
            visibleSize++
            if (cWidth > endWidth) {
              break
            }
          }
        }
        return { toVisibleIndex: Math.max(0, toVisibleIndex), visibleSize: Math.max(8, visibleSize) }
      }
      return { toVisibleIndex: 0, visibleSize: 8 }
    }

    const computeVirtualY = () => {
      const tableHeader = refTableHeader.value
      const tableBody = refTableBody.value
      const tableBodyElem = tableBody ? tableBody.$el as HTMLDivElement : null
      const vSize = computeSize.value
      const rowHeightMaps = computeRowHeightMaps.value
      if (tableBodyElem) {
        const tableHeaderElem = tableHeader ? tableHeader.$el as HTMLDivElement : null
        let rowHeight = 0
        let firstTrElem
        firstTrElem = tableBodyElem.querySelector('tr')
        if (!firstTrElem && tableHeaderElem) {
          firstTrElem = tableHeaderElem.querySelector('tr')
        }
        if (firstTrElem) {
          rowHeight = firstTrElem.clientHeight
        }
        if (!rowHeight) {
          rowHeight = rowHeightMaps[vSize || 'default']
        }
        const visibleSize = Math.max(8, Math.ceil(tableBodyElem.clientHeight / rowHeight) + 2)
        return { rowHeight, visibleSize }
      }
      return { rowHeight: 0, visibleSize: 8 }
    }

    const calculateMergerOffserIndex = (list: any[], offsetItem: any, type: 'row' | 'col') => {
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
          log.err('vxe.error.noTree', ['merge-cells | merge-footer-items'])
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
          log.err('vxe.error.noTree', ['merge-cells | merge-footer-items'])
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

    const calcHeight = (key: 'height' | 'minHeight' | 'maxHeight') => {
      const { parentHeight } = reactData
      const val = props[key]
      let num = 0
      if (val) {
        if (val === 'auto') {
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

    /**
     * 还原自定义列操作状态
     */
    const restoreCustomStorage = () => {
      const { id, customConfig } = props
      const customOpts = computeCustomOpts.value
      const { storage } = customOpts
      const isAllCustom = storage === true
      const storageOpts: VxeTableDefines.VxeTableCustomStorageObj = isAllCustom ? {} : Object.assign({}, storage || {})
      const isCustomResizable = isAllCustom || storageOpts.resizable
      const isCustomVisible = isAllCustom || storageOpts.visible
      const isCustomFixed = isAllCustom || storageOpts.fixed
      const isCustomSort = isAllCustom || storageOpts.sort
      if (customConfig && (isCustomResizable || isCustomVisible || isCustomFixed || isCustomSort)) {
        const customMap: {
          [key: string]: {
            field?: VxeColumnPropTypes.Field
            resizeWidth?: number
            visible?: boolean
            fixed?: string
            renderSortNumber?: number
          }
        } = {}
        if (!id) {
          log.err('vxe.error.reqProp', ['id'])
          return
        }
        // 自定义列宽
        if (isCustomResizable) {
          const columnWidthStorage = getCustomStorageMap(resizableStorageKey)[id]
          if (columnWidthStorage) {
            XEUtils.each(columnWidthStorage, (resizeWidth: number, colKey) => {
              customMap[colKey] = { resizeWidth }
            })
          }
        }
        // 自定义固定列
        if (isCustomFixed) {
          const columnFixedStorage = getCustomStorageMap(fixedStorageKey)[id]
          if (columnFixedStorage) {
            const colFixeds = columnFixedStorage.split(',')
            colFixeds.forEach((fixConf: any) => {
              const [colKey, fixed] = fixConf.split('|')
              if (customMap[colKey]) {
                customMap[colKey].fixed = fixed
              } else {
                customMap[colKey] = { fixed }
              }
            })
          }
        }
        // 自定义顺序
        let hasCustomSort = false
        if (isCustomSort) {
          const columnSortStorage = getCustomStorageMap(sortStorageKey)[id]
          if (columnSortStorage) {
            XEUtils.each(columnSortStorage, (renderSortNumber: number, colKey) => {
              if (customMap[colKey]) {
                customMap[colKey].renderSortNumber = renderSortNumber
              } else {
                customMap[colKey] = { renderSortNumber }
              }
              if (!hasCustomSort) {
                hasCustomSort = true
              }
            })
          }
        }
        // 自定义隐藏列
        if (isCustomVisible) {
          const columnVisibleStorage = getCustomStorageMap(visibleStorageKey)[id]
          if (columnVisibleStorage) {
            const colVisibles = columnVisibleStorage.split('|')
            const colHides: string[] = colVisibles[0] ? colVisibles[0].split(',') : []
            const colShows: string[] = colVisibles[1] ? colVisibles[1].split(',') : []
            colHides.forEach((colKey) => {
              if (customMap[colKey]) {
                customMap[colKey].visible = false
              } else {
                customMap[colKey] = { visible: false }
              }
            })
            colShows.forEach((colKey) => {
              if (customMap[colKey]) {
                customMap[colKey].visible = true
              } else {
                customMap[colKey] = { visible: true }
              }
            })
          }
        }
        let { collectColumn } = internalData
        const keyMap: {
          [key: string]: VxeTableDefines.ColumnInfo
        } = {}
        XEUtils.eachTree(collectColumn, (column) => {
          const colKey = column.getKey()
          if (colKey) {
            keyMap[colKey] = column
          }
        })
        XEUtils.each(customMap, ({ visible, resizeWidth, fixed, renderSortNumber }, colKey) => {
          const column = keyMap[colKey]
          if (column) {
            if (XEUtils.isNumber(resizeWidth)) {
              column.resizeWidth = resizeWidth
            }
            if (XEUtils.isBoolean(visible)) {
              column.visible = visible
            }
            if (fixed) {
              column.fixed = fixed
            }
            if (renderSortNumber) {
              column.renderSortNumber = Number(renderSortNumber)
            }
          }
        })
        // 如果自定义了顺序
        if (hasCustomSort) {
          collectColumn = XEUtils.orderBy(collectColumn, 'renderSortNumber')
          internalData.collectColumn = collectColumn
          internalData.tableFullColumn = getColumnList(collectColumn)
        }
      }
    }

    /**
     * 更新数据列的 Map
     * 牺牲数据组装的耗时，用来换取使用过程中的流畅
     */
    const cacheColumnMap = () => {
      const { tableFullColumn, collectColumn } = internalData
      const fullColumnIdData: any = internalData.fullColumnIdData = {}
      const fullColumnFieldData: any = internalData.fullColumnFieldData = {}
      const mouseOpts = computeMouseOpts.value
      const columnOpts = computeColumnOpts.value
      const rowOpts = computeRowOpts.value
      const isGroup = collectColumn.some(hasChildrenList)
      let isAllOverflow = !!props.showOverflow
      let expandColumn: VxeTableDefines.ColumnInfo | undefined
      let treeNodeColumn: VxeTableDefines.ColumnInfo | undefined
      let checkboxColumn: VxeTableDefines.ColumnInfo | undefined
      let radioColumn: VxeTableDefines.ColumnInfo | undefined
      let htmlColumn: VxeTableDefines.ColumnInfo | undefined
      let hasFixed: VxeColumnPropTypes.Fixed | undefined
      const handleFunc = (column: VxeTableDefines.ColumnInfo, index: number, items: VxeTableDefines.ColumnInfo[], path?: string[], parent?: VxeTableDefines.ColumnInfo) => {
        const { id: colid, field, fixed, type, treeNode } = column
        const rest = { column, colid, index, items, parent }
        if (field) {
          if (process.env.VUE_APP_VXE_ENV === 'development') {
            if (fullColumnFieldData[field]) {
              log.warn('vxe.error.colRepet', ['field', field])
            }
          }
          fullColumnFieldData[field] = rest
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
              log.warn('vxe.error.colRepet', ['tree-node', treeNode])
            }
          }
          if (!treeNodeColumn) {
            treeNodeColumn = column
          }
        } else if (type === 'expand') {
          if (process.env.VUE_APP_VXE_ENV === 'development') {
            if (expandColumn) {
              log.warn('vxe.error.colRepet', ['type', type])
            }
          }
          if (!expandColumn) {
            expandColumn = column
          }
        }
        if (process.env.VUE_APP_VXE_ENV === 'development') {
          if (type === 'checkbox') {
            if (checkboxColumn) {
              log.warn('vxe.error.colRepet', ['type', type])
            }
            if (!checkboxColumn) {
              checkboxColumn = column
            }
          } else if (type === 'radio') {
            if (radioColumn) {
              log.warn('vxe.error.colRepet', ['type', type])
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
          log.err('vxe.error.colRepet', ['colId', colid])
        }
        fullColumnIdData[colid] = rest
      }
      if (isGroup) {
        XEUtils.eachTree(collectColumn, (column, index, items, path, parent, nodes) => {
          column.level = nodes.length
          handleFunc(column, index, items, path, parent)
        })
      } else {
        tableFullColumn.forEach(handleFunc)
      }

      if (process.env.VUE_APP_VXE_ENV === 'development') {
        if (expandColumn && mouseOpts.area) {
          log.err('vxe.error.errConflicts', ['mouse-config.area', 'column.type=expand'])
        }
      }

      if (process.env.VUE_APP_VXE_ENV === 'development') {
        if (htmlColumn) {
          if (!columnOpts.useKey) {
            log.err('vxe.error.reqProp', ['column-config.useKey', 'column.type=html'])
          }
          if (!rowOpts.useKey) {
            log.err('vxe.error.reqProp', ['row-config.useKey', 'column.type=html'])
          }
        }
      }

      reactData.isGroup = isGroup
      reactData.treeNodeColumn = treeNodeColumn
      reactData.expandColumn = expandColumn
      reactData.isAllOverflow = isAllOverflow
    }

    const updateHeight = () => {
      internalData.customHeight = calcHeight('height')
      internalData.customMinHeight = calcHeight('minHeight')
      internalData.customMaxHeight = calcHeight('maxHeight')
    }

    /**
     * 列宽算法
     * 支持 px、%、固定 混合分配
     * 支持动态列表调整分配
     * 支持自动分配偏移量
     */
    const autoCellWidth = () => {
      const tableHeader = refTableHeader.value
      const tableBody = refTableBody.value
      const tableFooter = refTableFooter.value
      const bodyElem = tableBody ? tableBody.$el as HTMLDivElement : null
      const headerElem = tableHeader ? tableHeader.$el as HTMLDivElement : null
      const footerElem = tableFooter ? tableFooter.$el as HTMLDivElement : null
      if (!bodyElem) {
        return
      }
      let tableWidth = 0
      const minCellWidth = 40 // 列宽最少限制 40px
      const bodyWidth = bodyElem.clientWidth - 1
      let remainWidth = bodyWidth
      let meanWidth = remainWidth / 100
      const { fit } = props
      const { columnStore } = reactData
      const { resizeList, pxMinList, pxList, scaleList, scaleMinList, autoList } = columnStore
      // 最小宽
      pxMinList.forEach((column) => {
        const minWidth = XEUtils.toInteger(column.minWidth)
        tableWidth += minWidth
        column.renderWidth = minWidth
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
      // 调整了列宽
      resizeList.forEach((column) => {
        const width = XEUtils.toInteger(column.resizeWidth)
        tableWidth += width
        column.renderWidth = width
      })
      remainWidth -= tableWidth
      meanWidth = remainWidth > 0 ? Math.floor(remainWidth / (scaleMinList.length + pxMinList.length + autoList.length)) : 0
      if (fit) {
        if (remainWidth > 0) {
          scaleMinList.concat(pxMinList).forEach((column) => {
            tableWidth += meanWidth
            column.renderWidth += meanWidth
          })
        }
      } else {
        meanWidth = minCellWidth
      }
      // 自适应
      autoList.forEach((column) => {
        const width = Math.max(meanWidth, minCellWidth)
        column.renderWidth = width
        tableWidth += width
      })
      if (fit) {
        /**
         * 偏移量算法
         * 如果所有列足够放的情况下，从最后动态列开始分配
         */
        const dynamicList = scaleList.concat(scaleMinList).concat(pxMinList).concat(autoList)
        let dynamicSize = dynamicList.length - 1
        if (dynamicSize > 0) {
          let odiffer = bodyWidth - tableWidth
          if (odiffer > 0) {
            while (odiffer > 0 && dynamicSize >= 0) {
              odiffer--
              dynamicList[dynamicSize--].renderWidth++
            }
            tableWidth = bodyWidth
          }
        }
      }
      const tableHeight = bodyElem.offsetHeight
      const overflowY = bodyElem.scrollHeight > bodyElem.clientHeight
      let scrollbarWidth = 0
      if (overflowY) {
        scrollbarWidth = Math.max(bodyElem.offsetWidth - bodyElem.clientWidth, 0)
      }
      reactData.scrollbarWidth = scrollbarWidth
      reactData.overflowY = overflowY
      internalData.tableWidth = tableWidth
      internalData.tableHeight = tableHeight
      let headerHeight = 0
      if (headerElem) {
        headerHeight = headerElem.clientHeight
        nextTick(() => {
          // 检测是否同步滚动
          if (headerElem && bodyElem && headerElem.scrollLeft !== bodyElem.scrollLeft) {
            headerElem.scrollLeft = bodyElem.scrollLeft
          }
        })
      }
      internalData.headerHeight = headerHeight

      let overflowX = false
      let footerHeight = 0
      let scrollbarHeight = 0
      if (footerElem) {
        footerHeight = footerElem.offsetHeight
        overflowX = tableWidth > footerElem.clientWidth
        if (overflowX) {
          scrollbarHeight = Math.max(footerHeight - footerElem.clientHeight, 0)
        }
      } else {
        overflowX = tableWidth > bodyWidth
        if (overflowX) {
          scrollbarHeight = Math.max(tableHeight - bodyElem.clientHeight, 0)
        }
      }
      internalData.footerHeight = footerHeight
      reactData.overflowX = overflowX
      reactData.scrollbarHeight = scrollbarHeight
      updateHeight()
      reactData.parentHeight = Math.max(internalData.headerHeight + footerHeight + 20, tablePrivateMethods.getParentHeight())
      if (overflowX) {
        tablePrivateMethods.checkScrolling()
      }
    }

    const getOrderField = (column: VxeTableDefines.ColumnInfo) => {
      const { sortBy, sortType } = column
      return (row: any) => {
        let cellValue
        if (sortBy) {
          cellValue = XEUtils.isFunction(sortBy) ? sortBy({ row, column }) : XEUtils.get(row, sortBy)
        } else {
          cellValue = tablePrivateMethods.getCellLabel(row, column)
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

    /**
     * 预编译
     * 对渲染中的数据提前解析序号及索引。牺牲提前编译耗时换取渲染中额外损耗，使运行时更加流畅
     */
    const updateAfterDataIndex = () => {
      const { treeConfig } = props
      const { afterFullData, fullDataRowIdData, fullAllDataRowIdData } = internalData
      const { afterTreeFullData } = internalData
      const treeOpts = computeTreeOpts.value
      const childrenField = treeOpts.children || treeOpts.childrenField
      const fullMaps: Record<string, any> = {}
      if (treeConfig) {
        XEUtils.eachTree(afterTreeFullData, (row, index, items, path) => {
          const rowid = getRowid($xeTable, row)
          const allrest = fullAllDataRowIdData[rowid]
          const seq = path.map((num, i) => i % 2 === 0 ? (Number(num) + 1) : '.').join('')
          if (allrest) {
            allrest.seq = seq
            allrest._index = index
          } else {
            const rest = { row, rowid, seq, index: -1, $index: -1, _index: index, items: [], parent: null, level: 0 }
            fullAllDataRowIdData[rowid] = rest
            fullDataRowIdData[rowid] = rest
          }
          fullMaps[rowid] = row
        }, { children: treeOpts.transform ? treeOpts.mapChildrenField : childrenField })
      } else {
        afterFullData.forEach((row, index) => {
          const rowid = getRowid($xeTable, row)
          const allrest = fullAllDataRowIdData[rowid]
          const seq = index + 1
          if (allrest) {
            allrest.seq = seq
            allrest._index = index
          } else {
            const rest = { row, rowid, seq, index: -1, $index: -1, _index: index, items: [], parent: null, level: 0 }
            fullAllDataRowIdData[rowid] = rest
            fullDataRowIdData[rowid] = rest
          }
          fullMaps[rowid] = row
        })
      }
      internalData.afterFullRowMaps = fullMaps
    }

    /**
     * 如果为虚拟树，将树结构拍平
     * @returns
     */
    const handleVirtualTreeToList = () => {
      const { treeConfig } = props
      const { treeExpandedMaps } = reactData
      const treeOpts = computeTreeOpts.value
      if (treeConfig && treeOpts.transform) {
        const fullData: any[] = []
        const expandMaps: {
          [key: string]: number
        } = {}
        XEUtils.eachTree(internalData.afterTreeFullData, (row, index, items, path, parent) => {
          const rowid = getRowid($xeTable, row)
          const parentRowid = getRowid($xeTable, parent)
          if (!parent || (expandMaps[parentRowid] && treeExpandedMaps[parentRowid])) {
            expandMaps[rowid] = 1
            fullData.push(row)
          }
        }, { children: treeOpts.mapChildrenField })
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
              const compConf = filterRender ? renderer.get(filterRender.name) : null
              const compFilterMethod = compConf ? compConf.filterMethod : null
              const defaultFilterMethod = compConf ? compConf.defaultFilterMethod : null
              const cellValue = getCellValue(row, column)
              if (filterMethod) {
                return itemList.some((item) => filterMethod({ value: item.value, option: item, cellValue, row, column, $table: $xeTable }))
              } else if (compFilterMethod) {
                return itemList.some((item) => compFilterMethod({ value: item.value, option: item, cellValue, row, column, $table: $xeTable }))
              } else if (allFilterMethod) {
                return allFilterMethod({ options: itemList, values: valueList, cellValue, row, column })
              } else if (defaultFilterMethod) {
                return itemList.some((item) => defaultFilterMethod({ value: item.value, option: item, cellValue, row, column, $table: $xeTable }))
              }
              return valueList.indexOf(XEUtils.get(row, column.field)) > -1
            })
          }
          if (treeConfig && transform) {
            // 筛选虚拟树
            tableTree = XEUtils.searchTree(tableFullTreeData, handleFilter, { ...treeOpts, original: true })
            tableData = tableTree
          } else {
            tableData = treeConfig ? tableFullTreeData.filter(handleFilter) : tableFullData.filter(handleFilter)
            tableTree = tableData
          }
        } else {
          if (treeConfig && transform) {
            // 还原虚拟树
            tableTree = XEUtils.searchTree(tableFullTreeData, () => true, { ...treeOpts, original: true })
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
          tableTree = XEUtils.searchTree(tableFullTreeData, () => true, { ...treeOpts, original: true })
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
      const { border, showFooter, showOverflow: allColumnOverflow, showHeaderOverflow: allColumnHeaderOverflow, showFooterOverflow: allColumnFooterOverflow, mouseConfig, spanMethod, footerSpanMethod, keyboardConfig } = props
      const { isGroup, currentRow, tableColumn, scrollXLoad, scrollYLoad, scrollbarWidth, scrollbarHeight, columnStore, editStore, mergeList, mergeFooterList, isAllOverflow } = reactData
      let { visibleColumn, fullColumnIdData, tableHeight, tableWidth, headerHeight, footerHeight, elemStore, customHeight, customMinHeight, customMaxHeight } = internalData
      const containerList = ['main', 'left', 'right']
      const emptyPlaceholderElem = refEmptyPlaceholder.value
      const cellOffsetWidth = computeCellOffsetWidth.value
      const mouseOpts = computeMouseOpts.value
      const keyboardOpts = computeKeyboardOpts.value
      const bodyWrapperRef = elemStore['main-body-wrapper']
      const bodyWrapperElem = bodyWrapperRef ? bodyWrapperRef.value : null
      if (emptyPlaceholderElem) {
        emptyPlaceholderElem.style.top = `${headerHeight}px`
        emptyPlaceholderElem.style.height = bodyWrapperElem ? `${bodyWrapperElem.offsetHeight - scrollbarHeight}px` : ''
      }
      if (customHeight > 0) {
        if (showFooter) {
          customHeight += scrollbarHeight
        }
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
          const wrapperRef = elemStore[`${name}-${layout}-wrapper`]
          const wrapperElem = wrapperRef ? wrapperRef.value : null
          const tableRef = elemStore[`${name}-${layout}-table`]
          const tableElem = tableRef ? tableRef.value : null
          if (layout === 'header') {
            // 表头体样式处理
            // 横向滚动渲染
            let tWidth = tableWidth
            let renderColumnList = tableColumn

            if (isGroup) {
              renderColumnList = visibleColumn
            } else {
              // 如果是使用优化模式
              if (fixedType) {
                if (scrollXLoad || allColumnHeaderOverflow) {
                  renderColumnList = fixedColumn
                }
              }
            }

            tWidth = renderColumnList.reduce((previous, column) => previous + column.renderWidth, 0)

            if (tableElem) {
              tableElem.style.width = tWidth ? `${tWidth + scrollbarWidth}px` : ''
            }

            const repairRef = elemStore[`${name}-${layout}-repair`]
            const repairElem = repairRef ? repairRef.value : null
            if (repairElem) {
              repairElem.style.width = `${tableWidth}px`
            }

            const listRef = elemStore[`${name}-${layout}-list`]
            const listElem = listRef ? listRef.value : null
            if (isGroup && listElem) {
              XEUtils.arrayEach(listElem.querySelectorAll('.col--group'), (thElem: any) => {
                const colNode = tableMethods.getColumnNode(thElem)
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
            const emptyBlockRef = elemStore[`${name}-${layout}-emptyBlock`]
            const emptyBlockElem = emptyBlockRef ? emptyBlockRef.value : null
            if (isNodeElement(wrapperElem)) {
              let bodyMaxHeight = 0
              const bodyMinHeight = customMinHeight - headerHeight - footerHeight
              if (customMaxHeight) {
                bodyMaxHeight = customMaxHeight - headerHeight - footerHeight
                // 如果是固定列
                if (fixedType) {
                  bodyMaxHeight -= (showFooter ? 0 : scrollbarHeight)
                }
                bodyMaxHeight = Math.max(bodyMinHeight, bodyMaxHeight)
                wrapperElem.style.maxHeight = `${bodyMaxHeight}px`
              }
              if (customHeight) {
                let bodyHeight = customHeight - headerHeight - footerHeight
                // 如果是固定列
                if (fixedType) {
                  bodyHeight -= (showFooter ? 0 : scrollbarHeight)
                }
                if (bodyMaxHeight) {
                  bodyHeight = Math.min(bodyMaxHeight, bodyHeight)
                }
                wrapperElem.style.height = `${Math.max(bodyMinHeight, bodyHeight)}px`
              } else {
                wrapperElem.style.height = ''
              }
              wrapperElem.style.minHeight = `${bodyMinHeight}px`
            }

            // 如果是固定列
            if (fixedWrapperElem) {
              if (isNodeElement(wrapperElem)) {
                wrapperElem.style.top = `${headerHeight}px`
              }
              fixedWrapperElem.style.height = `${(customHeight > 0 ? customHeight - headerHeight - footerHeight : tableHeight) + headerHeight + footerHeight - scrollbarHeight * (showFooter ? 2 : 1)}px`
              fixedWrapperElem.style.width = `${fixedColumn.reduce((previous, column) => previous + column.renderWidth, isFixedLeft ? 0 : scrollbarWidth)}px`
            }

            let tWidth = tableWidth
            let renderColumnList = tableColumn

            // 如果是使用优化模式
            if (fixedType) {
              // 如果存在展开行使用全量渲染
              if (!reactData.expandColumn && (scrollYLoad || (allColumnOverflow ? isAllOverflow : allColumnOverflow))) {
                if (!mergeList.length && !spanMethod && !(keyboardConfig && keyboardOpts.isMerge)) {
                  renderColumnList = fixedColumn
                } else {
                  renderColumnList = visibleColumn
                }
              } else {
                renderColumnList = visibleColumn
              }
            }
            tWidth = renderColumnList.reduce((previous, column) => previous + column.renderWidth, 0)

            if (tableElem) {
              tableElem.style.width = tWidth ? `${tWidth}px` : ''
              // 兼容性处理
              tableElem.style.paddingRight = scrollbarWidth && fixedType && (browse['-moz'] || browse.safari) ? `${scrollbarWidth}px` : ''
            }
            if (emptyBlockElem) {
              emptyBlockElem.style.width = tWidth ? `${tWidth}px` : ''
            }
          } else if (layout === 'footer') {
            let tWidth = tableWidth

            let renderColumnList = tableColumn
            // 如果是使用优化模式
            if (fixedType) {
              // 如果存在展开行使用全量渲染
              if (!reactData.expandColumn && (scrollXLoad || allColumnFooterOverflow)) {
                if (!mergeFooterList.length || !footerSpanMethod) {
                  renderColumnList = fixedColumn
                } else {
                  renderColumnList = visibleColumn
                }
              } else {
                renderColumnList = visibleColumn
              }
            }
            tWidth = renderColumnList.reduce((previous, column) => previous + column.renderWidth, 0)

            if (isNodeElement(wrapperElem)) {
              // 如果是固定列
              if (fixedWrapperElem) {
                wrapperElem.style.top = `${customHeight > 0 ? customHeight - footerHeight : tableHeight + headerHeight}px`
              }
              wrapperElem.style.marginTop = `${-Math.max(1, scrollbarHeight)}px`
            }
            if (tableElem) {
              tableElem.style.width = tWidth ? `${tWidth + scrollbarWidth}px` : ''
            }
          }
          const colgroupRef = elemStore[`${name}-${layout}-colgroup`]
          const colgroupElem = colgroupRef ? colgroupRef.value : null
          if (colgroupElem) {
            XEUtils.arrayEach(colgroupElem.children, (colElem: any) => {
              const colid = colElem.getAttribute('name')
              if (colid === 'col_gutter') {
                colElem.style.width = `${scrollbarWidth}px`
              }
              if (fullColumnIdData[colid]) {
                const column = fullColumnIdData[colid].column
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
                const listRef = elemStore[`${name}-${layout}-list`]
                const listElem = listRef ? listRef.value : null
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
                        const columnIndex = tableMethods.getColumnIndex(column)
                        for (let index = 1; index < colspan; index++) {
                          const nextColumn = tableMethods.getColumns(columnIndex + index)
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
        tableMethods.setCurrentRow(currentRow)
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
          $xeTable.handleActived(params, evnt)
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

    const handleCheckedCheckboxRow = (rows: any, value: boolean, isForce?: boolean) => {
      if (rows && !XEUtils.isArray(rows)) {
        rows = [rows]
      }
      rows.forEach((row: any) => tablePrivateMethods.handleSelectRow({ row }, !!value, isForce))
      return nextTick()
    }

    const handleCheckedAllCheckboxRow = (value: boolean, isForce?: boolean) => {
      const { treeConfig } = props
      const { selectCheckboxMaps } = reactData
      const { afterFullData, afterFullRowMaps, checkboxReserveRowMap } = internalData
      const treeOpts = computeTreeOpts.value
      const childrenField = treeOpts.children || treeOpts.childrenField
      const checkboxOpts = computeCheckboxOpts.value
      const { checkField, reserve, checkStrictly, checkMethod } = checkboxOpts
      const indeterminateField = checkboxOpts.indeterminateField || checkboxOpts.halfField
      const selectRowMaps: Record<string, any> = {}

      // 疑惑！
      if (!treeConfig) {
        XEUtils.each(selectCheckboxMaps, (row, rowid) => {
          if (!afterFullRowMaps[rowid]) {
            selectRowMaps[rowid] = row
          }
        })
      }
      // 疑惑！

      if (checkStrictly) {
        reactData.isAllSelected = value
      } else {
        /**
         * 绑定属性方式（高性能，有污染）
         * 必须在行数据存在对应的属性，否则将不响应
         */
        if (checkField) {
          const checkValFn = (row: any) => {
            if (isForce || (!checkMethod || checkMethod({ row }))) {
              if (value) {
                selectRowMaps[getRowid($xeTable, row)] = row
              }
              XEUtils.set(row, checkField, value)
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
            if (value) {
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
            if (value) {
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
          if (value) {
            XEUtils.each(selectRowMaps, (row, rowid) => {
              checkboxReserveRowMap[rowid] = row
            })
          } else {
            afterFullData.forEach((row) => handleCheckboxReserveRow(row, false))
          }
        }
        reactData.selectCheckboxMaps = checkField ? {} : selectRowMaps
      }
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
      return new Promise(resolve => {
        if (loadMethod) {
          const { treeExpandLazyLoadedMaps } = reactData
          const { fullAllDataRowIdData } = internalData
          const rowid = getRowid($xeTable, row)
          const rest = fullAllDataRowIdData[rowid]
          treeExpandLazyLoadedMaps[rowid] = row
          loadMethod({ $table: $xeTable, row }).then((childRecords: any) => {
            rest.treeLoaded = true
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
                    return tablePrivateMethods.handleTableData()
                  }
                })
              })
            }
          }).catch(() => {
            const { treeExpandLazyLoadedMaps } = reactData
            rest.treeLoaded = false
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
      return new Promise(resolve => {
        const expandOpts = computeExpandOpts.value
        const { loadMethod } = expandOpts
        if (loadMethod) {
          const { fullAllDataRowIdData } = internalData
          const { rowExpandLazyLoadedMaps } = reactData
          const rowid = getRowid($xeTable, row)
          const rest = fullAllDataRowIdData[rowid]
          rowExpandLazyLoadedMaps[rowid] = row
          loadMethod({ $table: $xeTable, row, rowIndex: tableMethods.getRowIndex(row), $rowIndex: tableMethods.getVMRowIndex(row) }).then(() => {
            const { rowExpandedMaps } = reactData
            rest.expandLoaded = true
            rowExpandedMaps[rowid] = row
          }).catch(() => {
            rest.expandLoaded = false
          }).finally(() => {
            const { rowExpandLazyLoadedMaps } = reactData
            if (rowExpandLazyLoadedMaps[rowid]) {
              delete rowExpandLazyLoadedMaps[rowid]
            }
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
        const sYOpts = computeSYOpts.value
        const sXOpts = computeSXOpts.value
        // 计算 X 逻辑
        if (scrollXLoad) {
          const { visibleSize: visibleXSize } = computeVirtualX()
          const offsetXSize = sXOpts.oSize ? XEUtils.toNumber(sXOpts.oSize) : (browse.edge ? 5 : 0)
          scrollXStore.offsetSize = offsetXSize
          scrollXStore.visibleSize = visibleXSize
          scrollXStore.endIndex = Math.max(scrollXStore.startIndex + scrollXStore.visibleSize + offsetXSize, scrollXStore.endIndex)
          tablePrivateMethods.updateScrollXData()
        } else {
          tablePrivateMethods.updateScrollXSpace()
        }
        // 计算 Y 逻辑
        const { rowHeight, visibleSize: visibleYSize } = computeVirtualY()
        scrollYStore.rowHeight = rowHeight
        if (scrollYLoad) {
          const offsetYSize = sYOpts.oSize ? XEUtils.toNumber(sYOpts.oSize) : (browse.edge ? 10 : 0)
          scrollYStore.offsetSize = offsetYSize
          scrollYStore.visibleSize = visibleYSize
          scrollYStore.endIndex = Math.max(scrollYStore.startIndex + visibleYSize + offsetYSize, scrollYStore.endIndex)
          tablePrivateMethods.updateScrollYData()
        } else {
          tablePrivateMethods.updateScrollYSpace()
        }
        reactData.rowHeight = rowHeight
        nextTick(updateStyle)
      })
    }
    /**
     * 加载表格数据
     * @param {Array} datas 数据
     */
    const loadTableData = (datas: any[]) => {
      const { keepSource, treeConfig } = props
      const { editStore, scrollYLoad: oldScrollYLoad } = reactData
      const { scrollYStore, scrollXStore, lastScrollLeft, lastScrollTop } = internalData
      const treeOpts = computeTreeOpts.value
      const { transform } = treeOpts
      const childrenField = treeOpts.children || treeOpts.childrenField
      let treeData = []
      let fullData = reactive(datas ? datas.slice(0) : []) // 转为响应式
      if (treeConfig) {
        if (transform) {
          // 树结构自动转换
          if (process.env.VUE_APP_VXE_ENV === 'development') {
            if (!treeOpts.rowField) {
              log.err('vxe.error.reqProp', ['tree-config.rowField'])
            }
            if (!treeOpts.parentField) {
              log.err('vxe.error.reqProp', ['tree-config.parentField'])
            }
            if (!childrenField) {
              log.err('vxe.error.reqProp', ['tree-config.childrenField'])
            }
            if (!treeOpts.mapChildrenField) {
              log.err('vxe.error.reqProp', ['tree-config.mapChildrenField'])
            }
            if (childrenField === treeOpts.mapChildrenField) {
              log.err('vxe.error.errConflicts', ['tree-config.childrenField', 'tree-config.mapChildrenField'])
            }
            // fullData.forEach(row => {
            //   if (row[treeOpts.children] && row[treeOpts.children].length) {
            //     log.warn('vxe.error.errConflicts', ['tree-config.transform', `row.${treeOpts.children}`])
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
      reactData.scrollYLoad = sYLoad
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
      if (process.env.VUE_APP_VXE_ENV === 'development') {
        if (sYLoad) {
          if (!(props.height || props.maxHeight)) {
            log.err('vxe.error.reqProp', ['table.height | table.max-height | table.scroll-y={enabled: false}'])
          }
          if (!props.showOverflow) {
            log.warn('vxe.error.reqProp', ['table.show-overflow'])
          }
          if (props.spanMethod) {
            log.warn('vxe.error.scrollErrProp', ['table.span-method'])
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
        return new Promise(resolve => {
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
              // 是否变更虚拟滚动
              if (oldScrollYLoad === sYLoad) {
                restoreScrollLocation($xeTable, targetScrollLeft, targetScrollTop).then(resolve)
              } else {
                setTimeout(() => restoreScrollLocation($xeTable, targetScrollLeft, targetScrollTop).then(resolve))
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
        const rest = fullColumnIdData[colid]
        if (rest) {
          rest.$index = $index
        }
      })
      reactData.tableColumn = tableColumn
    }

    const loadScrollXData = () => {
      const { mergeList, mergeFooterList } = reactData
      const { scrollXStore } = internalData
      const { startIndex, endIndex, offsetSize } = scrollXStore
      const { toVisibleIndex, visibleSize } = computeVirtualX()
      const offsetItem = {
        startIndex: Math.max(0, toVisibleIndex - 1 - offsetSize),
        endIndex: toVisibleIndex + visibleSize + offsetSize
      }
      calculateMergerOffserIndex(mergeList.concat(mergeFooterList), offsetItem, 'col')
      const { startIndex: offsetStartIndex, endIndex: offsetEndIndex } = offsetItem
      if (toVisibleIndex <= startIndex || toVisibleIndex >= endIndex - visibleSize - 1) {
        if (startIndex !== offsetStartIndex || endIndex !== offsetEndIndex) {
          scrollXStore.startIndex = offsetStartIndex
          scrollXStore.endIndex = offsetEndIndex
          tablePrivateMethods.updateScrollXData()
        }
      }
      tableMethods.closeTooltip()
    }

    // 获取所有的列，排除分组
    const getColumnList = (columns: VxeTableDefines.ColumnInfo[]) => {
      const result: VxeTableDefines.ColumnInfo[] = []
      columns.forEach((column) => {
        result.push(...(column.children && column.children.length ? getColumnList(column.children) : [column]))
      })
      return result
    }

    const parseColumns = () => {
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
        XEUtils.eachTree(collectColumn, (column, index, items, path, parent) => {
          const isColGroup = hasChildrenList(column)
          // 如果是分组，必须按组设置固定列，不允许给子列设置固定
          if (parent && parent.fixed) {
            column.fixed = parent.fixed
          }
          if (parent && column.fixed !== parent.fixed) {
            log.err('vxe.error.groupFixed')
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
        if (process.env.VUE_APP_VXE_ENV === 'development') {
          // if (props.showHeader && !props.showHeaderOverflow) {
          //   log.warn('vxe.error.reqProp', ['show-header-overflow'])
          // }
          // if (props.showFooter && !props.showFooterOverflow) {
          //   log.warn('vxe.error.reqProp', ['show-footer-overflow'])
          // }
          if (props.spanMethod) {
            log.warn('vxe.error.scrollErrProp', ['span-method'])
          }
          if (props.footerSpanMethod) {
            log.warn('vxe.error.scrollErrProp', ['footer-span-method'])
          }
        }
        const { visibleSize } = computeVirtualX()
        scrollXStore.startIndex = 0
        scrollXStore.endIndex = visibleSize
        scrollXStore.visibleSize = visibleSize
      }
      // 如果列被显示/隐藏，则清除合并状态
      // 如果列被设置为固定，则清除合并状态
      if (visibleColumn.length !== internalData.visibleColumn.length || !internalData.visibleColumn.every((column, index) => column === visibleColumn[index])) {
        tableMethods.clearMergeCells()
        tableMethods.clearMergeFooterItems()
      }
      reactData.scrollXLoad = scrollXLoad
      visibleColumn.forEach((column, index) => {
        const colid = column.id
        const rest = fullColumnIdData[colid]
        if (rest) {
          rest._index = index
        }
      })
      internalData.visibleColumn = visibleColumn
      handleTableColumn()
      return tableMethods.updateFooter().then(() => {
        return tableMethods.recalculate()
      }).then(() => {
        tableMethods.updateCellAreas()
        return tableMethods.recalculate()
      })
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
      initColumnSort()
      restoreCustomStorage()
      cacheColumnMap()
      parseColumns().then(() => {
        if (reactData.scrollXLoad) {
          loadScrollXData()
        }
      })
      tableMethods.clearMergeCells()
      tableMethods.clearMergeFooterItems()
      tablePrivateMethods.handleTableData(true)
      if (process.env.VUE_APP_VXE_ENV === 'development') {
        if ((reactData.scrollXLoad || reactData.scrollYLoad) && reactData.expandColumn) {
          log.warn('vxe.error.scrollErrProp', ['column.type=expand'])
        }
      }
      return nextTick().then(() => {
        if ($xeToolbar) {
          $xeToolbar.syncUpdate({ collectColumn, $table: $xeTable })
        }
        return tableMethods.recalculate()
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
            const rest = fullAllDataRowIdData[rowid]
            const isLoad = lazy && row[hasChildField] && !rest.treeLoaded && !treeExpandLazyLoadedMaps[rowid]
            // 是否使用懒加载
            if (isLoad) {
              result.push(handleAsyncTreeExpandChilds(row))
            } else {
              if (row[childrenField] && row[childrenField].length) {
                treeTempExpandedMaps[rowid] = row
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
        return tablePrivateMethods.handleTableData()
      }).then(() => {
        return tableMethods.recalculate()
      })
    }

    /**
     * 纵向 Y 可视渲染处理
     */
    const loadScrollYData = (evnt: Event) => {
      const { mergeList } = reactData
      const { scrollYStore } = internalData
      const { startIndex, endIndex, visibleSize, offsetSize, rowHeight } = scrollYStore
      const scrollBodyElem = (evnt.currentTarget || evnt.target) as HTMLDivElement
      const scrollTop = scrollBodyElem.scrollTop
      const toVisibleIndex = Math.floor(scrollTop / rowHeight)
      const offsetItem = {
        startIndex: Math.max(0, toVisibleIndex - 1 - offsetSize),
        endIndex: toVisibleIndex + visibleSize + offsetSize
      }
      calculateMergerOffserIndex(mergeList, offsetItem, 'row')
      const { startIndex: offsetStartIndex, endIndex: offsetEndIndex } = offsetItem
      if (toVisibleIndex <= startIndex || toVisibleIndex >= endIndex - visibleSize - 1) {
        if (startIndex !== offsetStartIndex || endIndex !== offsetEndIndex) {
          scrollYStore.startIndex = offsetStartIndex
          scrollYStore.endIndex = offsetEndIndex
          tablePrivateMethods.updateScrollYData()
        }
      }
    }

    const createGetRowCacheProp = (prop: 'seq' | 'index' | '_index' | '$index') => {
      return function (row: any) {
        const { fullAllDataRowIdData } = internalData
        if (row) {
          const rowid = getRowid($xeTable, row)
          const rest = fullAllDataRowIdData[rowid]
          if (rest) {
            return rest[prop]
          }
        }
        return -1
      }
    }

    const createGetColumnCacheProp = (prop: 'index' | '_index' | '$index') => {
      return function (column: VxeTableDefines.ColumnInfo) {
        const { fullColumnIdData } = internalData
        if (column) {
          const rest = fullColumnIdData[column.id]
          if (rest) {
            return rest[prop]
          }
        }
        return -1
      }
    }

    const debounceScrollY = XEUtils.debounce(function (evnt: Event) {
      loadScrollYData(evnt)
    }, 20, { leading: false, trailing: true })

    let keyCtxTimeout: any

    tableMethods = {
      dispatchEvent (type, params, evnt) {
        emit(type, createEvent(evnt, { $table: $xeTable, $grid: $xeGrid }, params))
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
        log.warn('vxe.error.delFunc', ['syncData', 'getData'])
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
        const { inited, initStatus } = internalData
        return loadTableData(datas).then(() => {
          internalData.inited = true
          internalData.initStatus = true
          if (!initStatus) {
            handleLoadDefaults()
          }
          if (!inited) {
            handleInitDefaults()
          }
          return tableMethods.recalculate()
        })
      },
      /**
       * 重新加载数据，会清空表格状态
       * @param {Array} datas 数据
       */
      reloadData (datas) {
        const { inited } = internalData
        return tableMethods.clearAll()
          .then(() => {
            internalData.inited = true
            internalData.initStatus = true
            return loadTableData(datas)
          })
          .then(() => {
            handleLoadDefaults()
            if (!inited) {
              handleInitDefaults()
            }
            return tableMethods.recalculate()
          })
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
              const newValue = XEUtils.get(record || row, field)
              XEUtils.set(row, field, newValue)
              XEUtils.set(oRow, field, newValue)
            } else {
              const newRecord = XEUtils.clone({ ...record }, true)
              XEUtils.destructuring(oRow, Object.assign(row, newRecord))
            }
          }
          reactData.tableData = tableData.slice(0)
        } else {
          if (process.env.VUE_APP_VXE_ENV === 'development') {
            log.warn('vxe.error.reqProp', ['keep-source'])
          }
        }
        return nextTick()
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
          XEUtils.eachTree(rows, (childRow, index, items, path, parent, nodes) => {
            const rowid = getRowid($xeTable, childRow)
            const parentRow = parent || parentRest.row
            const rest = { row: childRow, rowid, seq: -1, index, _index: -1, $index: -1, items, parent: parentRow, level: parentLevel + nodes.length }
            fullDataRowIdData[rowid] = rest
            fullAllDataRowIdData[rowid] = rest
          }, { children: childrenField })
          row[childrenField] = rows
          if (transform) {
            row[mapChildrenField] = rows
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
            const rest = fullAllDataRowIdData[rowid]
            if (rest) {
              return { rowid: rest.rowid, item: rest.row, index: rest.index, items: rest.items, parent: rest.parent }
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
            const rest = fullColumnIdData[colid]
            if (rest) {
              return { colid: rest.colid, item: rest.column, index: rest.index, items: rest.items, parent: rest.parent }
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
        const { keepSource } = props
        const { tableSourceData, sourceDataRowIdData } = internalData
        if (!keepSource) {
          if (process.env.VUE_APP_VXE_ENV === 'development') {
            log.warn('vxe.error.reqProp', ['keep-source'])
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
      /**
       * 检查是否为临时行数据
       * @param {Row} row 行对象
       */
      isInsertByRow (row) {
        const { editStore } = reactData
        const rowid = getRowid($xeTable, row)
        return editStore.insertMaps[rowid]
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
       * 只对 tree-config 有效，获取行的父级
       */
      getParentRow (rowOrRowid) {
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
       * 设置为固定列
       */
      setColumnFixed (fieldOrColumn, fixed) {
        const column = handleFieldOrColumn($xeTable, fieldOrColumn)
        const targetColumn = getRootColumn($xeTable, column as any)
        const isMaxFixedColumn = computeIsMaxFixedColumn.value
        const columnOpts = computeColumnOpts.value
        const { maxFixedSize } = columnOpts
        if (targetColumn && targetColumn.fixed !== fixed) {
          // 是否超过最大固定列数量
          if (!targetColumn.fixed && isMaxFixedColumn) {
            if (VxeUI.modal) {
              VxeUI.modal.message({
                status: 'error',
                content: getI18n('vxe.table.maxFixedCol', [maxFixedSize])
              })
            }
            return nextTick()
          }
          XEUtils.eachTree([targetColumn], (column) => {
            column.fixed = fixed
          })
          tablePrivateMethods.saveCustomFixed()
          return tableMethods.refreshColumn()
        }
        return nextTick()
      },
      /**
       * 取消指定固定列
       */
      clearColumnFixed (fieldOrColumn) {
        const column = handleFieldOrColumn($xeTable, fieldOrColumn)
        const targetColumn = getRootColumn($xeTable, column as any)
        if (targetColumn && targetColumn.fixed) {
          XEUtils.eachTree([targetColumn], (column) => {
            column.fixed = null
          })
          tablePrivateMethods.saveCustomFixed()
          return tableMethods.refreshColumn()
        }
        return nextTick()
      },
      /**
       * 隐藏指定列
       */
      hideColumn (fieldOrColumn) {
        const column = handleFieldOrColumn($xeTable, fieldOrColumn)
        if (column && column.visible) {
          column.visible = false
          return tablePrivateMethods.handleCustom()
        }
        return nextTick()
      },
      /**
       * 显示指定列
       */
      showColumn (fieldOrColumn) {
        const column = handleFieldOrColumn($xeTable, fieldOrColumn)
        if (column && !column.visible) {
          column.visible = true
          return tablePrivateMethods.handleCustom()
        }
        return nextTick()
      },
      setColumnWidth (fieldOrColumn, width) {
        const column = handleFieldOrColumn($xeTable, fieldOrColumn)
        if (column) {
          const colWidth = XEUtils.toInteger(width)
          let rdWidth = colWidth
          if (isScale(width)) {
            const tableBody = refTableBody.value
            const bodyElem = tableBody ? tableBody.$el as HTMLDivElement : null
            const bodyWidth = bodyElem ? bodyElem.clientWidth - 1 : 0
            rdWidth = Math.floor(colWidth * bodyWidth)
          }
          column.renderWidth = rdWidth
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
        const { collectColumn } = internalData
        const customOpts = computeCustomOpts.value
        const { checkMethod } = customOpts
        const opts: VxeTableDefines.VxeTableCustomStorageObj = Object.assign({
          visible: true,
          resizable: options === true,
          fixed: options === true,
          sort: options === true
        }, options)
        XEUtils.eachTree(collectColumn, (column) => {
          if (opts.resizable) {
            column.resizeWidth = 0
          }
          if (opts.fixed) {
            column.fixed = column.defaultFixed
          }
          if (opts.sort) {
            column.renderSortNumber = column.sortNumber
          }
          if (!checkMethod || checkMethod({ column })) {
            column.visible = column.defaultVisible
          }
        })
        if (opts.resizable) {
          tablePrivateMethods.saveCustomResizable(true)
        }
        if (opts.sort) {
          tablePrivateMethods.saveCustomSort(true)
        }
        if (opts.fixed) {
          tablePrivateMethods.saveCustomFixed()
        }
        return tablePrivateMethods.handleCustom()
      },
      /**
       * 刷新列信息
       * 将固定的列左边、右边分别靠边
       * 如果传 true 则会检查列顺序并排序
       */
      refreshColumn (resiveOrder) {
        if (resiveOrder) {
          const columnList = XEUtils.orderBy(internalData.collectColumn, 'renderSortNumber')
          internalData.collectColumn = columnList
          const tableFullColumn = getColumnList(columnList)
          internalData.tableFullColumn = tableFullColumn
          cacheColumnMap()
        }
        return parseColumns().then(() => {
          return tableMethods.refreshScroll()
        }).then(() => {
          return tableMethods.recalculate()
        })
      },
      /**
       * 刷新滚动操作，手动同步滚动相关位置（对于某些特殊的操作，比如滚动条错位、固定列不同步）
       */
      refreshScroll () {
        const { lastScrollLeft, lastScrollTop } = internalData
        const tableBody = refTableBody.value
        const tableFooter = refTableFooter.value
        const leftBody = refTableLeftBody.value
        const rightBody = refTableRightBody.value
        const tableBodyElem = tableBody ? tableBody.$el as HTMLDivElement : null
        const leftBodyElem = leftBody ? leftBody.$el as HTMLDivElement : null
        const rightBodyElem = rightBody ? rightBody.$el as HTMLDivElement : null
        const tableFooterElem = tableFooter ? tableFooter.$el as HTMLDivElement : null
        return new Promise(resolve => {
          // 还原滚动条位置
          if (lastScrollLeft || lastScrollTop) {
            return restoreScrollLocation($xeTable, lastScrollLeft, lastScrollTop).then().then(() => {
              // 存在滚动行为未结束情况
              setTimeout(resolve, 30)
            })
          }
          // 重置
          setScrollTop(tableBodyElem, lastScrollTop)
          setScrollTop(leftBodyElem, lastScrollTop)
          setScrollTop(rightBodyElem, lastScrollTop)
          setScrollLeft(tableFooterElem, lastScrollLeft)
          // 存在滚动行为未结束情况
          setTimeout(resolve, 30)
        })
      },
      /**
       * 计算单元格列宽，动态分配可用剩余空间
       * 支持 width=? width=?px width=?% min-width=? min-width=?px min-width=?%
       */
      recalculate (refull?: boolean) {
        autoCellWidth()
        if (refull === true) {
          // 初始化时需要在列计算之后再执行优化运算，达到最优显示效果
          return computeScrollLoad().then(() => {
            autoCellWidth()
            return computeScrollLoad()
          })
        }
        return computeScrollLoad()
      },
      openTooltip (target, content) {
        const $commTip = refCommTooltip.value
        if ($commTip) {
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
            visible: false
          })
          if ($tooltip) {
            $tooltip.close()
          }
        }
        if ($commTip) {
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
      setCheckboxRow (rows: any, value) {
        return handleCheckedCheckboxRow(rows, value, true)
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
      isIndeterminateByCheckboxRow (row) {
        const { treeIndeterminateMaps } = reactData
        return !!treeIndeterminateMaps[getRowid($xeTable, row)] && !tableMethods.isCheckedByCheckboxRow(row)
      },
      /**
       * 多选，切换某一行的选中状态
       */
      toggleCheckboxRow (row) {
        const { selectCheckboxMaps } = reactData
        const checkboxOpts = computeCheckboxOpts.value
        const { checkField } = checkboxOpts
        const value = checkField ? !XEUtils.get(row, checkField) : !selectCheckboxMaps[getRowid($xeTable, row)]
        tablePrivateMethods.handleSelectRow({ row }, value, true)
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
        tablePrivateMethods.triggerCheckAllEvent(null, !reactData.isAllSelected)
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
        return $xeTable.eqRow(reactData.selectRadioRow, row)
      },
      /**
       * 用于单选行，设置某一行为选中状态
       * @param {Row} row 行对象
       */
      setRadioRow (row) {
        return handleCheckedRadioRow(row, true)
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
        const pendingMaps = { ...reactData.pendingRowMaps }
        const pendingList = [...reactData.pendingRowList]
        if (rows && !XEUtils.isArray(rows)) {
          rows = [rows]
        }
        if (status) {
          rows.forEach((row: any) => {
            const rowid = getRowid($xeTable, row)
            if (rowid && !pendingMaps[rowid]) {
              pendingList.push(row)
              pendingMaps[rowid] = row
            }
          })
        } else {
          rows.forEach((row: any) => {
            const rowid = getRowid($xeTable, row)
            if (rowid && pendingMaps[rowid]) {
              const pendingIndex = $xeTable.findRowIndexOf(pendingList, row)
              if (pendingIndex > -1) {
                pendingList.splice(pendingIndex, 1)
              }
              delete pendingMaps[rowid]
            }
          })
        }
        reactData.pendingRowMaps = pendingMaps
        reactData.pendingRowList = pendingList
        return nextTick()
      },
      togglePendingRow (rows: any | any[]) {
        const pendingMaps = { ...reactData.pendingRowMaps }
        const pendingList = [...reactData.pendingRowList]
        if (rows && !XEUtils.isArray(rows)) {
          rows = [rows]
        }
        rows.forEach((row: any) => {
          const rowid = getRowid($xeTable, row)
          if (rowid) {
            if (pendingMaps[rowid]) {
              const pendingIndex = $xeTable.findRowIndexOf(pendingList, row)
              if (pendingIndex > -1) {
                pendingList.splice(pendingIndex, 1)
              }
              delete pendingMaps[rowid]
            } else {
              pendingList.push(row)
              pendingMaps[rowid] = row
            }
          }
        })
        reactData.pendingRowMaps = pendingMaps
        reactData.pendingRowList = pendingList
        return nextTick()
      },
      hasPendingByRow (row) {
        const { pendingRowMaps } = reactData
        const rowid = getRowid($xeTable, row)
        return !!pendingRowMaps[rowid]
      },
      getPendingRecords () {
        const { pendingRowList } = reactData
        return pendingRowList.slice(0)
      },
      clearPendingRow () {
        reactData.pendingRowMaps = {}
        reactData.pendingRowList = []
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
          $xeTable.dispatchEvent('filter-visible', { column, property: column.field, field: column.field, filterList: $xeTable.getCheckedFilters(), visible: false }, null)
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
        const rest = fullAllDataRowIdData[getRowid($xeTable, row)]
        return rest && !!rest.expandLoaded
      },
      clearRowExpandLoaded (row) {
        const { rowExpandLazyLoadedMaps } = reactData
        const { fullAllDataRowIdData } = internalData
        const expandOpts = computeExpandOpts.value
        const { lazy } = expandOpts
        const rowid = getRowid($xeTable, row)
        const rest = fullAllDataRowIdData[rowid]
        if (lazy && rest) {
          rest.expandLoaded = false
          delete rowExpandLazyLoadedMaps[rowid]
        }
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
          log.warn('vxe.error.delFunc', ['reloadExpandContent', 'reloadRowExpand'])
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
                const rest = fullAllDataRowIdData[rowid]
                const isLoad = lazy && !rest.expandLoaded && !rowExpandLazyLoadedMaps[rowid]
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
          log.warn('vxe.error.delFunc', ['isExpandByRow', 'isRowExpandByRow'])
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
        const rest = fullAllDataRowIdData[getRowid($xeTable, row)]
        return rest && !!rest.treeLoaded
      },
      clearTreeExpandLoaded (row) {
        const { treeExpandedMaps } = reactData
        const { fullAllDataRowIdData } = internalData
        const treeOpts = computeTreeOpts.value
        const { transform, lazy } = treeOpts
        const rowid = getRowid($xeTable, row)
        const rest = fullAllDataRowIdData[rowid]
        if (lazy && rest) {
          rest.treeLoaded = false
          if (treeExpandedMaps[rowid]) {
            delete treeExpandedMaps[rowid]
          }
        }
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
          tableMethods.clearTreeExpandLoaded(row).then(() => {
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
          log.warn('vxe.error.delFunc', ['reloadTreeChilds', 'reloadTreeExpand'])
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
      scrollTo (scrollLeft: number, scrollTop?: number) {
        const tableBody = refTableBody.value
        const tableFooter = refTableFooter.value
        const rightBody = refTableRightBody.value
        const tableBodyElem = tableBody ? tableBody.$el as HTMLDivElement : null
        const rightBodyElem = rightBody ? rightBody.$el as HTMLDivElement : null
        const tableFooterElem = tableFooter ? tableFooter.$el as HTMLDivElement : null
        if (XEUtils.isNumber(scrollLeft)) {
          setScrollLeft(tableFooterElem || tableBodyElem, scrollLeft)
        }
        if (XEUtils.isNumber(scrollTop)) {
          setScrollTop(rightBodyElem || tableBodyElem, scrollTop)
        }
        if (reactData.scrollXLoad || reactData.scrollYLoad) {
          return new Promise(resolve => {
            setTimeout(() => {
              nextTick(() => {
                resolve()
              })
            }, 50)
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
        const rest = []
        if (row) {
          if (props.treeConfig) {
            rest.push(tablePrivateMethods.scrollToTreeRow(row))
          } else {
            rest.push(rowToVisible($xeTable, row))
          }
        }
        if (fieldOrColumn) {
          rest.push(tableMethods.scrollToColumn(fieldOrColumn))
        }
        return Promise.all(rest)
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
        const { scrollXStore, scrollYStore } = internalData
        const tableBody = refTableBody.value
        const tableFooter = refTableFooter.value
        const rightBody = refTableRightBody.value
        const tableBodyElem = tableBody ? tableBody.$el as XEBodyScrollElement : null
        const rightBodyElem = rightBody ? rightBody.$el as XEBodyScrollElement : null
        const tableFooterElem = tableFooter ? tableFooter.$el as HTMLDivElement : null
        if (rightBodyElem) {
          restoreScrollListener(rightBodyElem)
          rightBodyElem.scrollTop = 0
        }
        if (tableFooterElem) {
          tableFooterElem.scrollLeft = 0
        }
        if (tableBodyElem) {
          restoreScrollListener(tableBodyElem)
          tableBodyElem.scrollTop = 0
          tableBodyElem.scrollLeft = 0
        }
        scrollXStore.startIndex = 0
        scrollYStore.startIndex = 0
        return nextTick()
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
                const cell = tablePrivateMethods.getCell(row, column)
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
          log.err('vxe.error.errConflicts', ['merge-cells', 'span-method'])
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
          log.err('vxe.error.errConflicts', ['merge-cells', 'span-method'])
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
          log.err('vxe.error.errConflicts', ['merge-footer-items', 'footer-span-method'])
        }
        setMerges(merges, reactData.mergeFooterList)
        return nextTick().then(() => {
          tableMethods.updateCellAreas()
          return updateStyle()
        })
      },
      removeMergeFooterItems (merges) {
        if (props.footerSpanMethod) {
          log.err('vxe.error.errConflicts', ['merge-footer-items', 'footer-span-method'])
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
        if (mouseConfig && mouseOpts.area && $xeTable.handleUpdateCellAreas) {
          return $xeTable.handleUpdateCellAreas()
        }
        return nextTick()
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
          log.err('vxe.error.barUnableLink')
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
                    setTimeout(() => $xeTable.clearEdit(evnt))
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
            if ($xeTable.clearCellAreas) {
              if (!getEventTargetNode(evnt, document.body, 'vxe-table--ignore-areas-clear').flag) {
                tablePrivateMethods.preventEvent(evnt, 'event.clearAreas', {}, () => {
                  $xeTable.clearCellAreas()
                  $xeTable.clearCopyCellArea()
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
          tableMethods.dispatchEvent('keydown-start', {}, evnt)
          if (keyboardConfig && mouseConfig && mouseOpts.area && $xeTable.handleKeyboardEvent) {
            $xeTable.handleKeyboardEvent(evnt)
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
                $xeTable.clearEdit(evnt)
                // 如果配置了选中功能，则为选中状态
                if (mouseOpts.selected) {
                  nextTick(() => $xeTable.handleSelected(params, evnt))
                }
              }
            }
          }
          tableMethods.dispatchEvent('keydown', {}, evnt)
          tableMethods.dispatchEvent('keydown-end', {}, evnt)
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
          const isBack = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.BACKSPACE)
          const isTab = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.TAB)
          const isEnter = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ENTER)
          const isSpacebar = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.SPACEBAR)
          const isLeftArrow = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_LEFT)
          const isUpArrow = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_UP)
          const isRightArrow = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_RIGHT)
          const isDwArrow = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.ARROW_DOWN)
          const isDel = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.DELETE)
          const isF2 = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.F2)
          const isContextMenu = globalEvents.hasKey(evnt, GLOBAL_EVENT_KEYS.CONTEXT_MENU)
          const hasMetaKey = evnt.metaKey
          const hasCtrlKey = evnt.ctrlKey
          const hasShiftKey = evnt.shiftKey
          const isAltKey = evnt.altKey
          const operArrow = isLeftArrow || isUpArrow || isRightArrow || isDwArrow
          const operCtxMenu = isMenu && ctxMenuStore.visible && (isEnter || isSpacebar || operArrow)
          const isEditStatus = isEnableConf(editConfig) && actived.column && actived.row
          let params: any
          if (operCtxMenu) {
            // 如果配置了右键菜单; 支持方向键操作、回车
            evnt.preventDefault()
            if (ctxMenuStore.showChild && hasChildrenList(ctxMenuStore.selected)) {
              $xeTable.moveCtxMenu(evnt, ctxMenuStore, 'selectChild', isLeftArrow, false, ctxMenuStore.selected.children)
            } else {
              $xeTable.moveCtxMenu(evnt, ctxMenuStore, 'selected', isRightArrow, true, menuList)
            }
          } else if (keyboardConfig && mouseConfig && mouseOpts.area && $xeTable.handleKeyboardEvent) {
            $xeTable.handleKeyboardEvent(evnt)
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
                $xeTable.clearEdit(evnt)
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
                $xeTable.handleActived(selected.args, evnt)
              }
            }
          } else if (isContextMenu) {
            // 如果按下上下文键
            internalData._keyCtx = selected.row && selected.column && bodyMenu.length
            clearTimeout(keyCtxTimeout)
            keyCtxTimeout = setTimeout(() => {
              internalData._keyCtx = false
            }, 1000)
          } else if (isEnter && !isAltKey && keyboardConfig && keyboardOpts.isEnter && (selected.row || actived.row || (treeConfig && (rowOpts.isCurrent || highlightCurrentRow) && currentRow))) {
            // 退出选中
            if (hasCtrlKey) {
              // 如果是激活编辑状态，则取消编辑
              if (actived.row) {
                params = actived.args
                $xeTable.clearEdit(evnt)
                // 如果配置了选中功能，则为选中状态
                if (mouseOpts.selected) {
                  nextTick(() => $xeTable.handleSelected(params, evnt))
                }
              }
            } else {
              // 如果是激活状态，退则出到上一行/下一行
              if (selected.row || actived.row) {
                const targetArgs = selected.row ? selected.args : actived.args
                if (hasShiftKey) {
                  if (keyboardOpts.enterToTab) {
                    $xeTable.moveTabSelected(targetArgs, hasShiftKey, evnt)
                  } else {
                    $xeTable.moveSelected(targetArgs, isLeftArrow, true, isRightArrow, false, evnt)
                  }
                } else {
                  if (keyboardOpts.enterToTab) {
                    $xeTable.moveTabSelected(targetArgs, hasShiftKey, evnt)
                  } else {
                    $xeTable.moveSelected(targetArgs, isLeftArrow, false, isRightArrow, true, evnt)
                  }
                }
              } else if (treeConfig && (rowOpts.isCurrent || highlightCurrentRow) && currentRow) {
                // 如果是树形表格当前行回车移动到子节点
                const childrens = currentRow[childrenField]
                if (childrens && childrens.length) {
                  evnt.preventDefault()
                  const targetRow = childrens[0]
                  params = {
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
          } else if (keyboardConfig && isEnableConf(editConfig) && (isDel || (treeConfig && (rowOpts.isCurrent || highlightCurrentRow) && currentRow ? isBack && keyboardOpts.isArrow : isBack))) {
            if (!isEditStatus) {
              const { delMethod, backMethod } = keyboardOpts
              // 如果是删除键
              if (keyboardOpts.isDel && (selected.row || selected.column)) {
                const delPaqrams = {
                  row: selected.row,
                  rowIndex: tableMethods.getRowIndex(selected.row),
                  column: selected.column,
                  columnIndex: tableMethods.getColumnIndex(selected.column),
                  $table: $xeTable
                }
                if (delMethod) {
                  delMethod(delPaqrams)
                } else {
                  setCellValue(selected.row, selected.column, null)
                }
                if (isBack) {
                  if (backMethod) {
                    backMethod({
                      row: selected.row,
                      rowIndex: tableMethods.getRowIndex(selected.row),
                      column: selected.column,
                      columnIndex: tableMethods.getColumnIndex(selected.column),
                      $table: $xeTable
                    })
                  } else {
                    $xeTable.handleActived(selected.args, evnt)
                  }
                } else if (isDel) {
                  // 如果按下 del 键，更新表尾数据
                  tableMethods.updateFooter()
                }
                $xeTable.dispatchEvent('cell-delete-value', delPaqrams, evnt)
              } else if (isBack && keyboardOpts.isArrow && treeConfig && (rowOpts.isCurrent || highlightCurrentRow) && currentRow) {
                // 如果树形表格回退键关闭当前行返回父节点
                const { parent: parentRow } = XEUtils.findTree(internalData.afterFullData, item => item === currentRow, { children: childrenField })
                if (parentRow) {
                  evnt.preventDefault()
                  params = {
                    $table: $xeTable,
                    row: parentRow,
                    rowIndex: tableMethods.getRowIndex(parentRow),
                    $rowIndex: tableMethods.getVMRowIndex(parentRow)
                  }
                  tableMethods.setTreeExpand(parentRow, false)
                    .then(() => tableMethods.scrollToRow(parentRow))
                    .then(() => tablePrivateMethods.triggerCurrentRowEvent(evnt, params))
                }
              }
            }
          } else if (keyboardConfig && isEnableConf(editConfig) && keyboardOpts.isEdit && !hasCtrlKey && !hasMetaKey && (isSpacebar || (keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 96 && keyCode <= 111) || (keyCode >= 186 && keyCode <= 192) || (keyCode >= 219 && keyCode <= 222))) {
            const { editMethod } = keyboardOpts
            // 启用编辑后，空格键功能将失效
            // if (isSpacebar) {
            //   evnt.preventDefault()
            // }
            // 如果是按下非功能键之外允许直接编辑
            if (selected.column && selected.row && isEnableConf(selected.column.editRender)) {
              const beforeEditMethod = editOpts.beforeEditMethod || editOpts.activeMethod
              if (!beforeEditMethod || beforeEditMethod({ ...selected.args, $table: $xeTable, $grid: $xeGrid })) {
                if (editMethod) {
                  editMethod({
                    row: selected.row,
                    rowIndex: tableMethods.getRowIndex(selected.row),
                    column: selected.column,
                    columnIndex: tableMethods.getColumnIndex(selected.column),
                    $table: $xeTable,
                    $grid: $xeGrid
                  })
                } else {
                  setCellValue(selected.row, selected.column, null)
                  $xeTable.handleActived(selected.args, evnt)
                }
                const afterEditMethod = editOpts.afterEditMethod
                if (afterEditMethod) {
                  nextTick(() => {
                    afterEditMethod({
                      row: selected.row as any,
                      rowIndex: tableMethods.getRowIndex(selected.row),
                      column: selected.column,
                      columnIndex: tableMethods.getColumnIndex(selected.column),
                      $table: $xeTable,
                      $grid: $xeGrid
                    })
                  })
                }
              }
            }
          }
          tableMethods.dispatchEvent('keydown', {}, evnt)
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
        tableMethods.dispatchEvent('paste', {}, evnt)
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
        tableMethods.dispatchEvent('copy', {}, evnt)
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
        tableMethods.dispatchEvent('cut', {}, evnt)
      }
    }

    const handleGlobalResizeEvent = () => {
      if ($xeTable.closeMenu) {
        $xeTable.closeMenu()
      }
      tableMethods.updateCellAreas()
      tableMethods.recalculate(true)
    }

    const handleTargetEnterEvent = (isClear: boolean) => {
      const $tooltip = refTooltip.value
      clearTimeout(internalData.tooltipTimeout)
      if (isClear) {
        tableMethods.closeTooltip()
      } else {
        if ($tooltip) {
          $tooltip.setActived(true)
        }
      }
    }

    /**
     * 处理显示 tooltip
     * @param {Event} evnt 事件
     * @param {ColumnInfo} column 列配置
     * @param {Row} row 行对象
     */
    const handleTooltip = (evnt: MouseEvent, cell: HTMLTableCellElement, overflowElem: HTMLElement, tipElem: HTMLElement | null, params: any) => {
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
          visible: true
        })
        nextTick(() => {
          const $tooltip = refTooltip.value
          if ($tooltip) {
            $tooltip.open(isCellOverflow ? overflowElem : (tipElem || overflowElem), formatText(content))
          }
        })
      }
      return nextTick()
    }

    /**
     * 内部方法
     */
    tablePrivateMethods = {
      getSetupOptions () {
        return getConfig()
      },
      updateAfterDataIndex,
      callSlot (slotFunc, params) {
        if (slotFunc) {
          if ($xeGrid) {
            return $xeGrid.callSlot(slotFunc, params)
          }
          if (XEUtils.isFunction(slotFunc)) {
            return getSlotVNs(slotFunc(params))
          }
        }
        return []
      },
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
          const parentPaddingSize = height === 'auto' ? getPaddingTopBottomSize(parentElem) : 0
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
        let { fullDataRowIdData, fullAllDataRowIdData, tableFullData, tableFullTreeData } = internalData
        const childrenField = treeOpts.children || treeOpts.childrenField
        const hasChildField = treeOpts.hasChild || treeOpts.hasChildField
        const rowkey = getRowkey($xeTable)
        const isLazy = treeConfig && treeOpts.lazy
        const handleRow = (row: any, index: any, items: any, path?: any[], parent?: any, nodes?: any[]) => {
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
          const rest = { row, rowid, seq, index: treeConfig && parent ? -1 : index, _index: -1, $index: -1, items, parent, level }
          if (isSource) {
            fullDataRowIdData[rowid] = rest
          }
          fullAllDataRowIdData[rowid] = rest
        }
        if (isSource) {
          fullDataRowIdData = internalData.fullDataRowIdData = {}
        }
        fullAllDataRowIdData = internalData.fullAllDataRowIdData = {}
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
        const resizeList: any[] = []
        const pxList: any[] = []
        const pxMinList: any[] = []
        const scaleList: any[] = []
        const scaleMinList: any[] = []
        const autoList: any[] = []
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
            } else if (isPx(column.width)) {
              pxList.push(column)
            } else if (isScale(column.width)) {
              scaleList.push(column)
            } else if (isPx(column.minWidth)) {
              pxMinList.push(column)
            } else if (isScale(column.minWidth)) {
              scaleMinList.push(column)
            } else {
              autoList.push(column)
            }
          }
        })
        Object.assign(reactData.columnStore, { resizeList, pxList, pxMinList, scaleList, scaleMinList, autoList })
      },
      saveCustomResizable (isReset?: boolean) {
        const { id, customConfig } = props
        const customOpts = computeCustomOpts.value
        const { collectColumn } = internalData
        const { storage } = customOpts
        const isAllStorage = storage === true
        const storageOpts = isAllStorage ? {} : Object.assign({}, storage || {})
        const isResizable = isAllStorage || storageOpts.resizable
        if (customConfig && isResizable) {
          const columnWidthStorageMap = getCustomStorageMap(resizableStorageKey)
          let columnWidthStorage: any
          if (!id) {
            log.err('vxe.error.reqProp', ['id'])
            return
          }
          if (!isReset) {
            columnWidthStorage = XEUtils.isPlainObject(columnWidthStorageMap[id]) ? columnWidthStorageMap[id] : {}
            XEUtils.eachTree(collectColumn, (column) => {
              if (column.resizeWidth) {
                const colKey = column.getKey()
                if (colKey) {
                  columnWidthStorage[colKey] = column.renderWidth
                }
              }
            })
          }
          columnWidthStorageMap[id] = XEUtils.isEmpty(columnWidthStorage) ? undefined : columnWidthStorage
          localStorage.setItem(resizableStorageKey, XEUtils.toJSONString(columnWidthStorageMap))
        }
      },
      saveCustomSort (isReset?: boolean) {
        const { id, customConfig } = props
        const customOpts = computeCustomOpts.value
        const { collectColumn } = internalData
        const { storage } = customOpts
        const isAllStorage = storage === true
        const storageOpts = isAllStorage ? {} : Object.assign({}, storage || {})
        const isSort = isAllStorage || storageOpts.sort
        if (customConfig && isSort) {
          const columnSortStorageMap = getCustomStorageMap(sortStorageKey)
          let columnWidthStorage: any
          if (!id) {
            log.err('vxe.error.reqProp', ['id'])
            return
          }
          if (!isReset) {
            columnWidthStorage = XEUtils.isPlainObject(columnSortStorageMap[id]) ? columnSortStorageMap[id] : {}
            // 排序只支持一级
            collectColumn.forEach((column) => {
              if (column.sortNumber !== column.renderSortNumber) {
                const colKey = column.getKey()
                if (colKey) {
                  columnWidthStorage[colKey] = column.renderSortNumber
                }
              }
            })
          }
          columnSortStorageMap[id] = XEUtils.isEmpty(columnWidthStorage) ? undefined : columnWidthStorage
          localStorage.setItem(sortStorageKey, XEUtils.toJSONString(columnSortStorageMap))
        }
      },
      saveCustomFixed () {
        const { id, customConfig } = props
        const { collectColumn } = internalData
        const customOpts = computeCustomOpts.value
        const { storage } = customOpts
        const isAllStorage = storage === true
        const storageOpts = isAllStorage ? {} : Object.assign({}, storage || {})
        const isCustomFixed = isAllStorage || storageOpts.fixed
        if (customConfig && isCustomFixed) {
          const columnFixedStorageMap = getCustomStorageMap(fixedStorageKey)
          const colFixeds: any[] = []
          if (!id) {
            log.err('vxe.error.reqProp', ['id'])
            return
          }
          XEUtils.eachTree(collectColumn, (column) => {
            if (column.fixed && column.fixed !== column.defaultFixed) {
              const colKey = column.getKey()
              if (colKey) {
                colFixeds.push(`${colKey}|${column.fixed}`)
              }
            }
          })
          columnFixedStorageMap[id] = colFixeds.join(',') || undefined
          localStorage.setItem(fixedStorageKey, XEUtils.toJSONString(columnFixedStorageMap))
        }
      },
      saveCustomVisible () {
        const { id, customConfig } = props
        const { collectColumn } = internalData
        const customOpts = computeCustomOpts.value
        const { checkMethod, storage } = customOpts
        const isAllStorage = storage === true
        const storageOpts = isAllStorage ? {} : Object.assign({}, storage || {})
        const isCustomVisible = isAllStorage || storageOpts.visible
        if (customConfig && isCustomVisible) {
          const columnVisibleStorageMap = getCustomStorageMap(visibleStorageKey)
          const colHides: any[] = []
          const colShows: any[] = []
          if (!id) {
            log.err('vxe.error.reqProp', ['id'])
            return
          }
          XEUtils.eachTree(collectColumn, (column) => {
            if (!checkMethod || checkMethod({ column })) {
              if (!column.visible && column.defaultVisible) {
                const colKey = column.getKey()
                if (colKey) {
                  colHides.push(colKey)
                }
              } else if (column.visible && !column.defaultVisible) {
                const colKey = column.getKey()
                if (colKey) {
                  colShows.push(colKey)
                }
              }
            }
          })
          columnVisibleStorageMap[id] = [colHides.join(',')].concat(colShows.length ? [colShows.join(',')] : []).join('|') || undefined
          localStorage.setItem(visibleStorageKey, XEUtils.toJSONString(columnVisibleStorageMap))
        }
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
        tablePrivateMethods.saveCustomVisible()
        tablePrivateMethods.saveCustomSort()
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
              log.warn('vxe.error.delEvent', ['event.clearActived', 'event.clearEdit'])
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
      checkSelectionStatus () {
        const { treeConfig } = props
        const { selectCheckboxMaps, treeIndeterminateMaps } = reactData
        const { afterFullData } = internalData
        const checkboxOpts = computeCheckboxOpts.value
        const { checkField, checkStrictly, checkMethod } = checkboxOpts
        const indeterminateField = checkboxOpts.indeterminateField || checkboxOpts.halfField
        if (!checkStrictly) {
          const disableRows = []
          const checkRows = []
          let isAllResolve = false
          let isAllSelected = false
          let isIndeterminate = false
          if (checkField) {
            isAllResolve = afterFullData.every(
              checkMethod
                ? (row) => {
                    if (!checkMethod({ row })) {
                      disableRows.push(row)
                      return true
                    }
                    if (XEUtils.get(row, checkField)) {
                      checkRows.push(row)
                      return true
                    }
                    return false
                  }
                : row => XEUtils.get(row, checkField)
            )
            isAllSelected = isAllResolve && afterFullData.length !== disableRows.length
            if (treeConfig) {
              if (indeterminateField) {
                isIndeterminate = !isAllSelected && afterFullData.some((row) => XEUtils.get(row, checkField) || XEUtils.get(row, indeterminateField) || !!treeIndeterminateMaps[getRowid($xeTable, row)])
              } else {
                isIndeterminate = !isAllSelected && afterFullData.some((row) => XEUtils.get(row, checkField) || !!treeIndeterminateMaps[getRowid($xeTable, row)])
              }
            } else {
              if (indeterminateField) {
                isIndeterminate = !isAllSelected && afterFullData.some((row) => XEUtils.get(row, checkField) || XEUtils.get(row, indeterminateField))
              } else {
                isIndeterminate = !isAllSelected && afterFullData.some((row) => XEUtils.get(row, checkField))
              }
            }
          } else {
            isAllResolve = afterFullData.every(
              checkMethod
                ? (row) => {
                    if (!checkMethod({ row })) {
                      disableRows.push(row)
                      return true
                    }
                    if (selectCheckboxMaps[getRowid($xeTable, row)]) {
                      checkRows.push(row)
                      return true
                    }
                    return false
                  }
                : row => selectCheckboxMaps[getRowid($xeTable, row)]
            )
            isAllSelected = isAllResolve && afterFullData.length !== disableRows.length
            if (treeConfig) {
              isIndeterminate = !isAllSelected && afterFullData.some((row) => {
                const itemRid = getRowid($xeTable, row)
                return treeIndeterminateMaps[itemRid] || selectCheckboxMaps[itemRid]
              })
            } else {
              isIndeterminate = !isAllSelected && afterFullData.some((row) => selectCheckboxMaps[getRowid($xeTable, row)])
            }
          }
          reactData.isAllSelected = isAllSelected
          reactData.isIndeterminate = isIndeterminate
        }
      },
      /**
       * 多选，行选中事件
       * value 选中true 不选false 半选-1
       */
      handleSelectRow ({ row }, value, isForce) {
        const { treeConfig } = props
        const { selectCheckboxMaps, treeIndeterminateMaps } = reactData
        const selectRowMaps = { ...selectCheckboxMaps }
        const { afterFullData } = internalData
        const treeOpts = computeTreeOpts.value
        const childrenField = treeOpts.children || treeOpts.childrenField
        const checkboxOpts = computeCheckboxOpts.value
        const { checkField, checkStrictly, checkMethod } = checkboxOpts
        const indeterminateField = checkboxOpts.indeterminateField || checkboxOpts.halfField
        const rowid = getRowid($xeTable, row)
        if (checkField) {
          if (treeConfig && !checkStrictly) {
            if (value === -1) {
              if (!treeIndeterminateMaps[rowid]) {
                if (indeterminateField) {
                  XEUtils.set(row, indeterminateField, true)
                }
                treeIndeterminateMaps[rowid] = row
              }
              XEUtils.set(row, checkField, false)
            } else {
              // 更新子节点状态
              XEUtils.eachTree([row], (item) => {
                if ($xeTable.eqRow(item, row) || (isForce || (!checkMethod || checkMethod({ row: item })))) {
                  XEUtils.set(item, checkField, value)
                  if (indeterminateField) {
                    XEUtils.set(row, indeterminateField, false)
                  }
                  delete treeIndeterminateMaps[getRowid($xeTable, item)]
                  handleCheckboxReserveRow(row, value)
                }
              }, { children: childrenField })
            }
            // 如果存在父节点，更新父节点状态
            const matchObj = XEUtils.findTree(afterFullData, item => $xeTable.eqRow(item, row), { children: childrenField })
            if (matchObj && matchObj.parent) {
              let parentStatus
              const vItems: any[] = []
              const vItemMaps: Record<string, any> = {}
              if (!isForce && checkMethod) {
                matchObj.items.forEach((item) => {
                  if (checkMethod({ row: item })) {
                    const itemRid = getRowid($xeTable, item)
                    vItemMaps[itemRid] = item
                    vItems.push(item)
                  }
                })
              } else {
                matchObj.items.forEach(item => {
                  const itemRid = getRowid($xeTable, item)
                  vItemMaps[itemRid] = item
                  vItems.push(item)
                })
              }
              const indeterminatesItem = XEUtils.find(matchObj.items, item => !!treeIndeterminateMaps[getRowid($xeTable, item)])
              if (indeterminatesItem) {
                parentStatus = -1
              } else {
                const selectItems: any[] = []
                matchObj.items.forEach(item => {
                  if (XEUtils.get(item, checkField)) {
                    selectItems.push(item)
                  }
                })
                parentStatus = selectItems.filter(item => vItemMaps[getRowid($xeTable, item)]).length === vItems.length ? true : (selectItems.length || value === -1 ? -1 : false)
              }
              reactData.selectCheckboxMaps = selectRowMaps
              return tablePrivateMethods.handleSelectRow({ row: matchObj.parent }, parentStatus, isForce)
            }
          } else {
            if (isForce || (!checkMethod || checkMethod({ row }))) {
              XEUtils.set(row, checkField, value)
              handleCheckboxReserveRow(row, value)
            }
          }
        } else {
          if (treeConfig && !checkStrictly) {
            if (value === -1) {
              if (!treeIndeterminateMaps[rowid]) {
                if (indeterminateField) {
                  XEUtils.set(row, indeterminateField, true)
                }
                treeIndeterminateMaps[rowid] = row
              }
              if (selectRowMaps[rowid]) {
                delete selectRowMaps[rowid]
              }
            } else {
              // 更新子节点状态
              XEUtils.eachTree([row], (item) => {
                const itemRid = getRowid($xeTable, item)
                if ($xeTable.eqRow(item, row) || (isForce || (!checkMethod || checkMethod({ row: item })))) {
                  if (value) {
                    selectRowMaps[itemRid] = item
                  } else {
                    if (selectRowMaps[itemRid]) {
                      delete selectRowMaps[itemRid]
                    }
                  }
                  if (indeterminateField) {
                    XEUtils.set(row, indeterminateField, false)
                  }
                  delete treeIndeterminateMaps[getRowid($xeTable, item)]
                  handleCheckboxReserveRow(row, value)
                }
              }, { children: childrenField })
            }
            // 如果存在父节点，更新父节点状态
            const matchObj = XEUtils.findTree(afterFullData, item => $xeTable.eqRow(item, row), { children: childrenField })
            if (matchObj && matchObj.parent) {
              let parentStatus
              const vItems: any[] = []
              const vItemMaps: Record<string, any> = {}
              if (!isForce && checkMethod) {
                matchObj.items.forEach((item) => {
                  if (checkMethod({ row: item })) {
                    const itemRid = getRowid($xeTable, item)
                    vItemMaps[itemRid] = item
                    vItems.push(item)
                  }
                })
              } else {
                matchObj.items.forEach(item => {
                  const itemRid = getRowid($xeTable, item)
                  vItemMaps[itemRid] = item
                  vItems.push(item)
                })
              }
              const indeterminatesItem = XEUtils.find(matchObj.items, item => !!treeIndeterminateMaps[getRowid($xeTable, item)])
              if (indeterminatesItem) {
                parentStatus = -1
              } else {
                const selectItems: any[] = []
                matchObj.items.forEach(item => {
                  const itemRid = getRowid($xeTable, item)
                  if (selectRowMaps[itemRid]) {
                    selectItems.push(item)
                  }
                })
                parentStatus = selectItems.filter(item => vItemMaps[getRowid($xeTable, item)]).length === vItems.length ? true : (selectItems.length || value === -1 ? -1 : false)
              }
              reactData.selectCheckboxMaps = selectRowMaps
              return tablePrivateMethods.handleSelectRow({ row: matchObj.parent }, parentStatus, isForce)
            }
          } else {
            if (isForce || (!checkMethod || checkMethod({ row }))) {
              if (value) {
                if (!selectRowMaps[rowid]) {
                  selectRowMaps[rowid] = row
                }
              } else {
                if (selectRowMaps[rowid]) {
                  delete selectRowMaps[rowid]
                }
              }
              handleCheckboxReserveRow(row, value)
            }
          }
        }
        reactData.selectCheckboxMaps = selectRowMaps
        tablePrivateMethods.checkSelectionStatus()
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
          // tooltipStore.currOpts = { content: null }
          nextTick(() => {
            const $tooltip = refTooltip.value
            if ($tooltip) {
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
        if ($tooltip) {
          $tooltip.setActived(false)
        }
        if (tooltipOpts.enterable) {
          internalData.tooltipTimeout = setTimeout(() => {
            $tooltip = refTooltip.value
            if ($tooltip && !$tooltip.isActived()) {
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
        tableMethods.dispatchEvent('header-cell-click', Object.assign({ triggerResizable, triggerSort, triggerFilter, cell }, params), evnt)
        if (columnOpts.isCurrent || props.highlightCurrentColumn) {
          tableMethods.setCurrentColumn(column)
        }
      },
      triggerHeaderCellDblclickEvent (evnt, params) {
        tableMethods.dispatchEvent('header-cell-dblclick', Object.assign({ cell: evnt.currentTarget }, params), evnt)
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
        const cell = evnt.currentTarget
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
        tableMethods.dispatchEvent('cell-click', params, evnt)
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
        const cell = evnt.currentTarget
        params = Object.assign({ cell }, params)
        if (isEnableConf(editConfig) && editOpts.trigger === 'dblclick') {
          if (!actived.args || evnt.currentTarget !== actived.args.cell) {
            if (editOpts.mode === 'row') {
              checkValidate('blur')
                .catch((e) => e)
                .then(() => {
                  $xeTable.handleActived(params, evnt)
                    .then(() => checkValidate('change'))
                    .catch((e) => e)
                })
            } else if (editOpts.mode === 'cell') {
              $xeTable.handleActived(params, evnt)
                .then(() => checkValidate('change'))
                .catch((e) => e)
            }
          }
        }
        tableMethods.dispatchEvent('cell-dblclick', params, evnt)
      },
      handleToggleCheckRowEvent (evnt, params) {
        const { selectCheckboxMaps } = reactData
        const checkboxOpts = computeCheckboxOpts.value
        const { checkField } = checkboxOpts
        const { row } = params
        let value = false
        if (checkField) {
          value = !XEUtils.get(row, checkField)
        } else {
          value = !selectCheckboxMaps[getRowid($xeTable, row)]
        }
        if (evnt) {
          tablePrivateMethods.triggerCheckRowEvent(evnt, params, value)
        } else {
          tablePrivateMethods.handleSelectRow(params, value)
        }
      },
      triggerCheckRowEvent (evnt: MouseEvent, params, value) {
        const checkboxOpts = computeCheckboxOpts.value
        const { row } = params
        const { afterFullData } = internalData
        const { checkMethod } = checkboxOpts
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
              tableMethods.dispatchEvent('checkbox-range-select', Object.assign({ rangeRecords: rangeRows }, params), evnt)
              return
            }
          }
        }
        if (!checkMethod || checkMethod({ row })) {
          tablePrivateMethods.handleSelectRow(params, value)
          tableMethods.dispatchEvent('checkbox-change', Object.assign({
            records: tableMethods.getCheckboxRecords(),
            reserves: tableMethods.getCheckboxReserveRecords(),
            indeterminates: tableMethods.getCheckboxIndeterminateRecords(),
            checked: value
          }, params), evnt)
        }
      },
      /**
       * 多选，选中所有事件
       */
      triggerCheckAllEvent (evnt, value) {
        handleCheckedAllCheckboxRow(value)
        if (evnt) {
          tableMethods.dispatchEvent('checkbox-all', {
            records: tableMethods.getCheckboxRecords(),
            reserves: tableMethods.getCheckboxReserveRecords(),
            indeterminates: tableMethods.getCheckboxIndeterminateRecords(),
            checked: value
          }, evnt)
        }
      },
      /**
       * 单选，行选中事件
       */
      triggerRadioRowEvent (evnt, params) {
        const { selectRadioRow: oldValue } = reactData
        const { row } = params
        const radioOpts = computeRadioOpts.value
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
          tableMethods.dispatchEvent('radio-change', { oldValue, newValue, ...params }, evnt)
        }
      },
      triggerCurrentRowEvent (evnt, params) {
        const { currentRow: oldValue } = reactData
        const { row: newValue } = params
        const isChange = oldValue !== newValue
        tableMethods.setCurrentRow(newValue)
        if (isChange) {
          tableMethods.dispatchEvent('current-change', { oldValue, newValue, ...params }, evnt)
        }
      },
      /**
       * 展开行事件
       */
      triggerRowExpandEvent (evnt, params) {
        const { rowExpandLazyLoadedMaps, expandColumn: column } = reactData
        const expandOpts = computeExpandOpts.value
        const { row } = params
        const { lazy } = expandOpts
        const rowid = getRowid($xeTable, row)
        if (!lazy || !rowExpandLazyLoadedMaps[rowid]) {
          const expanded = !tableMethods.isRowExpandByRow(row)
          const columnIndex = tableMethods.getColumnIndex(column)
          const $columnIndex = tableMethods.getVMColumnIndex(column)
          tableMethods.setRowExpand(row, expanded)
          tableMethods.dispatchEvent('toggle-row-expand', {
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
        const { lazy } = treeOpts
        const rowid = getRowid($xeTable, row)
        if (!lazy || !treeExpandLazyLoadedMaps[rowid]) {
          const expanded = !tableMethods.isTreeExpandByRow(row)
          const columnIndex = tableMethods.getColumnIndex(column)
          const $columnIndex = tableMethods.getVMColumnIndex(column)
          tableMethods.setTreeExpand(row, expanded)
          tableMethods.dispatchEvent('toggle-tree-expand', { expanded, column, columnIndex, $columnIndex, row }, evnt)
        }
      },
      /**
       * 点击排序事件
       */
      triggerSortEvent (evnt, column, order) {
        const { mouseConfig } = props
        const sortOpts = computeSortOpts.value
        const mouseOpts = computeMouseOpts.value
        const { field, sortable } = column
        if (sortable) {
          if (!order || column.order === order) {
            tableMethods.clearSort(sortOpts.multiple ? column : null)
          } else {
            tableMethods.sort({ field, order })
          }
          const params = { $table: $xeTable, $event: evnt, column, field, property: field, order: column.order, sortList: tableMethods.getSortColumns(), sortTime: column.sortTime }
          if (mouseConfig && mouseOpts.area && $xeTable.handleSortEvent) {
            $xeTable.handleSortEvent(evnt, params)
          }
          tableMethods.dispatchEvent('sort-change', params, evnt)
        }
      },
      /**
       * 横向 X 可视渲染事件处理
       */
      triggerScrollXEvent () {
        loadScrollXData()
      },
      /**
       * 纵向 Y 可视渲染事件处理
       */
      triggerScrollYEvent (evnt) {
        const { scrollYStore } = internalData
        const { adaptive, offsetSize, visibleSize } = scrollYStore
        // webkit 浏览器使用最佳的渲染方式，且最高渲染量不能大于 40 条
        if (isWebkit && adaptive && (offsetSize * 2 + visibleSize) <= 40) {
          loadScrollYData(evnt)
        } else {
          debounceScrollY(evnt)
        }
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
        const { isGroup, scrollXLoad, scrollbarWidth } = reactData
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
              const xSpaceRef = elemStore[`${name}-${layout}-xSpace`]
              const xSpaceElem = xSpaceRef ? xSpaceRef.value : null
              if (xSpaceElem) {
                xSpaceElem.style.width = scrollXLoad ? `${tableWidth + (layout === 'header' ? scrollbarWidth : 0)}px` : ''
              }
            })
          })
          nextTick(updateStyle)
        }
      },
      // 更新纵向 Y 可视渲染上下剩余空间大小
      updateScrollYSpace () {
        const { scrollYLoad } = reactData
        const { scrollYStore, elemStore, afterFullData } = internalData
        const { startIndex, rowHeight } = scrollYStore
        const bodyHeight = afterFullData.length * rowHeight
        const topSpaceHeight = Math.max(0, startIndex * rowHeight)
        const containerList = ['main', 'left', 'right']
        let marginTop = ''
        let ySpaceHeight = ''
        if (scrollYLoad) {
          marginTop = `${topSpaceHeight}px`
          ySpaceHeight = `${bodyHeight}px`
        }
        containerList.forEach(name => {
          const layoutList = ['header', 'body', 'footer']
          const tableRef = elemStore[`${name}-body-table`]
          const tableElem = tableRef ? tableRef.value : null
          if (tableElem) {
            tableElem.style.marginTop = marginTop
          }
          layoutList.forEach(layout => {
            const ySpaceRef = elemStore[`${name}-${layout}-ySpace`]
            const ySpaceElem = ySpaceRef ? ySpaceRef.value : null
            if (ySpaceElem) {
              ySpaceElem.style.height = ySpaceHeight
            }
          })
        })
        nextTick(updateStyle)
      },
      updateScrollXData () {
        // reactData.tableColumn = []
        nextTick(() => {
          handleTableColumn()
          tablePrivateMethods.updateScrollXSpace()
        })
      },
      updateScrollYData () {
        // reactData.tableData = []
        nextTick(() => {
          tablePrivateMethods.handleTableData()
          tablePrivateMethods.updateScrollYSpace()
        })
      },
      /**
       * 处理固定列的显示状态
       */
      checkScrolling () {
        const leftContainerElem = refLeftContainer.value
        const rightContainerElem = refRightContainer.value
        const tableBody = refTableBody.value
        const bodyElem = tableBody ? tableBody.$el as HTMLDivElement : null
        if (bodyElem) {
          if (leftContainerElem) {
            if (bodyElem.scrollLeft > 0) {
              addClass(leftContainerElem, 'scrolling--middle')
            } else {
              removeClass(leftContainerElem, 'scrolling--middle')
            }
          }
          if (rightContainerElem) {
            if (bodyElem.clientWidth < bodyElem.scrollWidth - Math.ceil(bodyElem.scrollLeft)) {
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
      getCell (row, column) {
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
      getCellLabel (row, column) {
        const formatter = column.formatter
        const cellValue = getCellValue(row, column)
        let cellLabel = cellValue
        if (formatter) {
          let formatData
          const { fullAllDataRowIdData } = internalData
          const rowid = getRowid($xeTable, row)
          const colid = column.id
          const rest = fullAllDataRowIdData[rowid]
          if (rest) {
            formatData = rest.formatData
            if (!formatData) {
              formatData = fullAllDataRowIdData[rowid].formatData = {}
            }
            if (rest && formatData[colid]) {
              if (formatData[colid].value === cellValue) {
                return formatData[colid].label
              }
            }
          }
          const formatParams = { cellValue, row, rowIndex: tableMethods.getRowIndex(row), column, columnIndex: tableMethods.getColumnIndex(column) }
          if (XEUtils.isString(formatter)) {
            const gFormatOpts = formats.get(formatter)
            cellLabel = gFormatOpts && gFormatOpts.cellFormatMethod ? gFormatOpts.cellFormatMethod(formatParams) : ''
          } else if (XEUtils.isArray(formatter)) {
            const gFormatOpts = formats.get(formatter[0])
            cellLabel = gFormatOpts && gFormatOpts.cellFormatMethod ? gFormatOpts.cellFormatMethod(formatParams, ...formatter.slice(1)) : ''
          } else {
            cellLabel = formatter(formatParams)
          }
          if (formatData) {
            formatData[colid] = { value: cellValue, label: cellLabel }
          }
        }
        return cellLabel
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
          log.err('vxe.error.reqModule', ['VxeTableExportModule'])
        }
      })
      'clearValidate,fullValidate,validate'.split(',').forEach(name => {
        ($xeTable as any)[name] = function () {
          log.err('vxe.error.reqModule', ['VxeTableValidatorModule'])
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
          : createCommentVNode(),
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
          : createCommentVNode()
      ])
    }

    const renderEmptyContenet = () => {
      const emptyOpts = computeEmptyOpts.value
      const params = { $table: $xeTable }
      if (slots.empty) {
        return slots.empty(params)
      } else {
        const compConf = emptyOpts.name ? renderer.get(emptyOpts.name) : null
        const renderTableEmptyView = compConf ? compConf.renderTableEmptyView || compConf.renderEmpty : null
        if (renderTableEmptyView) {
          return getSlotVNs(renderTableEmptyView(emptyOpts, params))
        }
      }
      return getFuncText(props.emptyText) || getI18n('vxe.table.emptyText')
    }

    function handleUupdateResize () {
      const el = refElem.value
      if (el && el.clientWidth && el.clientHeight) {
        tableMethods.recalculate()
      }
    }

    const dataFlag = ref(0)
    watch(() => props.data ? props.data.length : -1, () => {
      dataFlag.value++
    })
    watch(() => props.data, () => {
      dataFlag.value++
    })
    watch(dataFlag, () => {
      const { inited, initStatus } = internalData
      loadTableData(props.data || []).then(() => {
        const { scrollXLoad, scrollYLoad, expandColumn } = reactData
        internalData.inited = true
        internalData.initStatus = true
        if (!initStatus) {
          handleLoadDefaults()
        }
        if (!inited) {
          handleInitDefaults()
        }
        if (process.env.VUE_APP_VXE_ENV === 'development') {
          // const checkboxOpts = computeCheckboxOpts.value
          // const checkboxColumn = internalData.tableFullColumn.find(column => column.type === 'checkbox')
          // if (checkboxColumn && internalData.tableFullData.length > 300 && !checkboxOpts.checkField) {
          //   log.warn('vxe.error.checkProp', ['checkbox-config.checkField'])
          // }
          if ((scrollXLoad || scrollYLoad) && expandColumn) {
            log.warn('vxe.error.scrollErrProp', ['column.type=expand'])
          }
        }
        tableMethods.recalculate()
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
      handleColumn(reactData.staticColumns)
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

    watch(() => props.showHeader, () => {
      nextTick(() => {
        tableMethods.recalculate(true).then(() => tableMethods.refreshScroll())
      })
    })

    watch(() => props.showFooter, () => {
      nextTick(() => {
        tableMethods.recalculate(true).then(() => tableMethods.refreshScroll())
      })
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

    watch(() => props.height, () => {
      nextTick(() => tableMethods.recalculate(true))
    })

    watch(() => props.maxHeight, () => {
      nextTick(() => tableMethods.recalculate(true))
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
            log.warn('vxe.error.delProp', ['row-id', 'row-config.keyField'])
          }
          if (props.rowKey) {
            log.warn('vxe.error.delProp', ['row-key', 'row-config.useKey'])
          }
          if (props.columnKey) {
            log.warn('vxe.error.delProp', ['column-id', 'column-config.useKey'])
          }
          if (!(props.rowId || rowOpts.keyField) && (checkboxOpts.reserve || checkboxOpts.checkRowKeys || radioOpts.reserve || radioOpts.checkRowKey || expandOpts.expandRowKeys || treeOpts.expandRowKeys)) {
            log.warn('vxe.error.reqProp', ['row-config.keyField'])
          }
          if (props.editConfig && (editOpts.showStatus || editOpts.showUpdateStatus || editOpts.showInsertStatus) && !props.keepSource) {
            log.warn('vxe.error.reqProp', ['keep-source'])
          }
          if (treeConfig && (treeOpts.showLine || treeOpts.line) && (!(props.rowKey || rowOpts.useKey) || !showOverflow)) {
            log.warn('vxe.error.reqProp', ['row-config.useKey | show-overflow'])
          }
          if (treeConfig && props.stripe) {
            log.warn('vxe.error.noTree', ['stripe'])
          }
          if (props.showFooter && !(props.footerMethod || props.footerData)) {
            log.warn('vxe.error.reqProp', ['footer-data | footer-method'])
          }
          // if (props.highlightCurrentRow) {
          //   log.warn('vxe.error.delProp', ['highlight-current-row', 'row-config.isCurrent'])
          // }
          // if (props.highlightHoverRow) {
          //   log.warn('vxe.error.delProp', ['highlight-hover-row', 'row-config.isHover'])
          // }
          // if (props.highlightCurrentColumn) {
          //   log.warn('vxe.error.delProp', ['highlight-current-column', 'column-config.isCurrent'])
          // }
          // if (props.highlightHoverColumn) {
          //   log.warn('vxe.error.delProp', ['highlight-hover-column', 'column-config.isHover'])
          // }
          // 检查导入导出类型，如果自定义导入导出方法，则不校验类型
          const { exportConfig, importConfig } = props
          const exportOpts = computeExportOpts.value
          const importOpts = computeImportOpts.value
          if (importConfig && importOpts.types && !importOpts.importMethod && !XEUtils.includeArrays(XEUtils.keys(importOpts._typeMaps), importOpts.types)) {
            log.warn('vxe.error.errProp', [`export-config.types=${importOpts.types.join(',')}`, importOpts.types.filter((type: string) => XEUtils.includes(XEUtils.keys(importOpts._typeMaps), type)).join(',') || XEUtils.keys(importOpts._typeMaps).join(',')])
          }
          if (exportConfig && exportOpts.types && !exportOpts.exportMethod && !XEUtils.includeArrays(XEUtils.keys(exportOpts._typeMaps), exportOpts.types)) {
            log.warn('vxe.error.errProp', [`export-config.types=${exportOpts.types.join(',')}`, exportOpts.types.filter((type: string) => XEUtils.includes(XEUtils.keys(exportOpts._typeMaps), type)).join(',') || XEUtils.keys(exportOpts._typeMaps).join(',')])
          }
        }

        if (process.env.VUE_APP_VXE_ENV === 'development') {
          const customOpts = computeCustomOpts.value
          const mouseOpts = computeMouseOpts.value
          const rowOpts = computeRowOpts.value
          if (!props.id && props.customConfig && (customOpts.storage === true || (customOpts.storage && customOpts.storage.resizable) || (customOpts.storage && customOpts.storage.visible))) {
            log.err('vxe.error.reqProp', ['id'])
          }
          if (props.treeConfig && checkboxOpts.range) {
            log.err('vxe.error.noTree', ['checkbox-config.range'])
          }
          if (rowOpts.height && !props.showOverflow) {
            log.warn('vxe.error.notProp', ['table.show-overflow'])
          }
          if (!$xeTable.handleUpdateCellAreas) {
            if (props.clipConfig) {
              log.warn('vxe.error.notProp', ['clip-config'])
            }
            if (props.fnrConfig) {
              log.warn('vxe.error.notProp', ['fnr-config'])
            }
            if (mouseOpts.area) {
              log.err('vxe.error.notProp', ['mouse-config.area'])
              return
            }
          }
          if (props.treeConfig && treeOpts.children) {
            log.warn('vxe.error.delProp', ['tree-config.children', 'tree-config.childrenField'])
          }
          if (props.treeConfig && treeOpts.line) {
            log.warn('vxe.error.delProp', ['tree-config.line', 'tree-config.showLine'])
          }
          if (mouseOpts.area && mouseOpts.selected) {
            log.warn('vxe.error.errConflicts', ['mouse-config.area', 'mouse-config.selected'])
          }
          if (mouseOpts.area && checkboxOpts.range) {
            log.warn('vxe.error.errConflicts', ['mouse-config.area', 'checkbox-config.range'])
          }
          if (props.treeConfig && mouseOpts.area) {
            log.err('vxe.error.noTree', ['mouse-config.area'])
          }
          if (props.editConfig && editOpts.activeMethod) {
            log.warn('vxe.error.delProp', ['edit-config.activeMethod', 'edit-config.beforeEditMethod'])
          }
          if (props.treeConfig && checkboxOpts.isShiftKey) {
            log.err('vxe.error.errConflicts', ['tree-config', 'checkbox-config.isShiftKey'])
          }
          if (checkboxOpts.halfField) {
            log.warn('vxe.error.delProp', ['checkbox-config.halfField', 'checkbox-config.indeterminateField'])
          }
        }

        // 检查是否有安装需要的模块
        if (process.env.VUE_APP_VXE_ENV === 'development') {
          if (props.editConfig && !$xeTable.insert) {
            log.err('vxe.error.reqModule', ['Edit'])
          }
          if (props.editRules && !$xeTable.validate) {
            log.err('vxe.error.reqModule', ['Validator'])
          }
          if ((checkboxOpts.range || props.keyboardConfig || props.mouseConfig) && !$xeTable.triggerCellMousedownEvent) {
            log.err('vxe.error.reqModule', ['Keyboard'])
          }
          if ((props.printConfig || props.importConfig || props.exportConfig) && !$xeTable.exportData) {
            log.err('vxe.error.reqModule', ['Export'])
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
            handleInitDefaults()
          }
          updateStyle()
        })

        if (props.autoResize) {
          const resizeOpts = computeResizeleOpts.value
          const { refreshDelay } = resizeOpts
          const el = refElem.value
          const parentEl = tablePrivateMethods.getParentElem()
          const handleOptimizeResize = refreshDelay ? XEUtils.throttle(() => tableMethods.recalculate(true), refreshDelay, { leading: true, trailing: true }) : null
          resizeObserver = globalResize.create(handleOptimizeResize
            ? () => {
                if (props.autoResize) {
                  requestAnimationFrame(handleOptimizeResize)
                }
              }
            : () => {
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
      if ($xeTable.handleGlobalContextmenuEvent) {
        globalEvents.on($xeTable, 'contextmenu', $xeTable.handleGlobalContextmenuEvent)
      }
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

    const renderVN = () => {
      const { loading, stripe, showHeader, height, treeConfig, mouseConfig, showFooter, highlightCell, highlightHoverRow, highlightHoverColumn, editConfig, editRules } = props
      const { isGroup, overflowX, overflowY, scrollXLoad, scrollYLoad, scrollbarHeight, tableData, tableColumn, tableGroupColumn, footerTableData, initStore, columnStore, filterStore, customStore } = reactData
      const { leftList, rightList } = columnStore
      const loadingSlot = slots.loading
      const tipConfig = computeTipConfig.value
      const validOpts = computeValidOpts.value
      const treeOpts = computeTreeOpts.value
      const rowOpts = computeRowOpts.value
      const columnOpts = computeColumnOpts.value
      const vSize = computeSize.value
      const tableBorder = computeTableBorder.value
      const mouseOpts = computeMouseOpts.value
      const validTipOpts = computeValidTipOpts.value
      const loadingOpts = computeLoadingOpts.value
      const isMenu = computeIsMenu.value
      return h('div', {
        ref: refElem,
        class: ['vxe-table', 'vxe-table--render-default', `tid_${xID}`, `border--${tableBorder}`, {
          [`size--${vSize}`]: vSize,
          [`valid-msg--${validOpts.msgMode}`]: !!editRules,
          'vxe-editable': !!editConfig,
          'old-cell-valid': editRules && getConfig().cellVaildMode === 'obsolete',
          'cell--highlight': highlightCell,
          'cell--selected': mouseConfig && mouseOpts.selected,
          'cell--area': mouseConfig && mouseOpts.area,
          'row--highlight': rowOpts.isHover || highlightHoverRow,
          'column--highlight': columnOpts.isHover || highlightHoverColumn,
          'is--header': showHeader,
          'is--footer': showFooter,
          'is--group': isGroup,
          'is--tree-line': treeConfig && (treeOpts.showLine || treeOpts.line),
          'is--fixed-left': leftList.length,
          'is--fixed-right': rightList.length,
          'is--animat': !!props.animat,
          'is--round': props.round,
          'is--stripe': !treeConfig && stripe,
          'is--loading': loading,
          'is--empty': !loading && !tableData.length,
          'is--scroll-y': overflowY,
          'is--scroll-x': overflowX,
          'is--virtual-x': scrollXLoad,
          'is--virtual-y': scrollYLoad
        }],
        onKeydown: keydownEvent
      }, [
        /**
         * 隐藏列
         */
        h('div', {
          class: 'vxe-table-slots'
        }, slots.default ? slots.default({}) : []),
        h('div', {
          class: 'vxe-table--render-wrapper'
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
              : createCommentVNode(),
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
              : createCommentVNode()
          ]),
          h('div', {
            class: 'vxe-table--fixed-wrapper'
          }, [
            /**
             * 左侧固定区域
             */
            leftList && leftList.length && overflowX ? renderFixed('left') : createCommentVNode(),
            /**
             * 右侧固定区域
             */
            rightList && rightList.length && overflowX ? renderFixed('right') : createCommentVNode()
          ])
        ]),
        /**
         * 空数据
         */
        h('div', {
          ref: refEmptyPlaceholder,
          class: 'vxe-table--empty-placeholder'
        }, [
          h('div', {
            class: 'vxe-table--empty-content'
          }, renderEmptyContenet())
        ]),
        /**
         * 边框线
         */
        h('div', {
          class: 'vxe-table--border-line'
        }),
        /**
         * 列宽线
         */
        h('div', {
          ref: refCellResizeBar,
          class: 'vxe-table--resizable-bar',
          style: overflowX
            ? {
                'padding-bottom': `${scrollbarHeight}px`
              }
            : null
        }),
        /**
         * 加载中
         */
        h(resolveComponent('vxe-loading') as VxeLoadingComponent, {
          class: 'vxe-table--loading',
          modelValue: loading,
          icon: loadingOpts.icon,
          text: loadingOpts.text
        }, loadingSlot
          ? {
              default: () => loadingSlot({ $table: $xeTable, $grid: $xeGrid })
            }
          : {}),
        /**
         * 自定义列
         */
        initStore.custom
          ? h(TableCustomPanelComponent, {
            ref: refTableCustom,
            customStore
          })
          : createCommentVNode(),
        /**
         * 筛选
         */
        initStore.filter
          ? h(TableFilterPanelComponent, {
            ref: refTableFilter,
            filterStore
          })
          : createCommentVNode(),
        /**
         * 导入
         */
        initStore.import && props.importConfig
          ? h(TableImportPanelComponent, {
            defaultOptions: reactData.importParams,
            storeData: reactData.importStore
          })
          : createCommentVNode(),
        /**
         * 导出/导出
         */
        initStore.export && (props.exportConfig || props.printConfig)
          ? h(TableExportPanelComponent, {
            defaultOptions: reactData.exportParams,
            storeData: reactData.exportStore
          })
          : createCommentVNode(),
        /**
         * 快捷菜单
         */
        isMenu
          ? h(TableMenuPanelComponent, {
            ref: refTableMenu
          })
          : createCommentVNode(),
        /**
         * 通用提示
         */
        hasUseTooltip
          ? h(resolveComponent('vxe-tooltip') as VxeTooltipComponent, {
            ref: refCommTooltip,
            isArrow: false,
            enterable: false
          })
          : createCommentVNode(),
        /**
         * 工具提示
         */
        hasUseTooltip
          ? h(resolveComponent('vxe-tooltip') as VxeTooltipComponent, {
            ref: refTooltip,
            ...tipConfig as any
          })
          : createCommentVNode(),
        /**
         * 校验提示
         */
        hasUseTooltip && props.editRules && validOpts.showMessage && (validOpts.message === 'default' ? !height : validOpts.message === 'tooltip')
          ? h(resolveComponent('vxe-tooltip') as VxeTooltipComponent, {
            ref: refValidTooltip,
            class: [{
              'old-cell-valid': editRules && getConfig().cellVaildMode === 'obsolete'
            }, 'vxe-table--valid-error'],
            ...(validOpts.message === 'tooltip' || tableData.length === 1 ? validTipOpts : {}) as any
          })
          : createCommentVNode()
      ])
    }

    $xeTable.renderVN = renderVN

    provide('$xeColgroup', null)
    provide('$xeTable', $xeTable)

    return $xeTable
  },
  render () {
    return this.renderVN()
  }
})
