import { defineComponent, getCurrentInstance, h, createCommentVNode, ComponentPublicInstance, resolveComponent, ComponentOptions, reactive, ref, Ref, provide, inject, nextTick, onActivated, onDeactivated, onBeforeUnmount, onUnmounted, watch, computed, ComputedRef } from 'vue'
import XEUtils from 'xe-utils'
import { browse, isPx, isScale, hasClass, addClass, removeClass, getEventTargetNode, getPaddingTopBottomSize, setScrollTop, setScrollLeft } from '../../tools/dom'
import { warnLog, errLog, getLog, getLastZIndex, nextZIndex, hasChildrenList, getFuncText, isEnableConf, formatText, eqEmptyValue } from '../../tools/utils'
import { createResizeEvent, XEResizeObserver } from '../../tools/resize'
import { GlobalEvent } from '../../tools/event'
import { useSize } from '../../hooks/size'
import { VXETable } from '../../v-x-e-table'
import GlobalConfig from '../../v-x-e-table/src/conf'
import Cell from './cell'
import TableBodyComponent from './body'
import tableProps from './props'
import tableEmits from './emits'
import { getRowUniqueId, clearTableAllStatus, getRowkey, getRowid, rowToVisible, colToVisible, getCellValue, setCellValue, handleFieldOrColumn } from './util'

import { VxeGridConstructor, VxeGridPrivateMethods, VxeTableConstructor, TableReactData, TableInternalData, VxeTablePropTypes, VxeToolbarConstructor, VxeTooltipInstance, TablePrivateMethods, TablePrivateRef, VxeTablePrivateComputed, VxeTablePrivateMethods, VxeTableMethods, TableMethods, VxeMenuPanelInstance, VxeTableDefines } from '../../../types/all'

const isWebkit = browse['-webkit'] && !browse.edge

const resizableStorageKey = 'VXE_TABLE_CUSTOM_COLUMN_WIDTH'
const visibleStorageKey = 'VXE_TABLE_CUSTOM_COLUMN_VISIBLE'

export default defineComponent({
  name: 'VxeTable',
  props: tableProps,
  emits: tableEmits,
  setup (props, context) {
    const { slots, emit } = context

    const hasUseTooltip = VXETable.tooltip

    const xID = XEUtils.uniqueId()

    const computeSize = useSize(props)

    const instance = getCurrentInstance()

    const reactData = reactive({
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
      // 复选框属性，已选中的行
      selection: [],
      // 当前行
      currentRow: null,
      // 单选框属性，选中列
      currentColumn: null,
      // 单选框属性，选中行
      selectRow: null,
      // 表尾合计数据
      footerTableData: [],
      // 展开列信息
      expandColumn: null,
      // 树节点列信息
      treeNodeColumn: null,
      hasFixedColumn: false,
      // 已展开的行
      rowExpandeds: [],
      // 懒加载中的展开行的列表
      expandLazyLoadeds: [],
      // 已展开树节点
      treeExpandeds: [],
      // 懒加载中的树节点的列表
      treeLazyLoadeds: [],
      // 树节点不确定状态的列表
      treeIndeterminates: [],
      // 合并单元格的对象集
      mergeList: [],
      // 合并表尾数据的对象集
      mergeFooterList: [],
      // 初始化标识
      initStore: {
        filter: false,
        import: false,
        export: false
      },
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
        insertList: [],
        removeList: []
      },
      // 存放数据校验相关信息
      validStore: {
        visible: false,
        row: null,
        column: null,
        content: '',
        rule: null,
        isArrow: false
      },
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
      }
    } as TableReactData)

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
      // 存放 tooltip 相关信息
      tooltipStore: {},
      // 表格宽度
      tableWidth: 0,
      // 表格高度
      tableHeight: 0,
      // 表头高度
      headerHeight: 0,
      // 表尾高度
      footerHeight: 0,
      customHeight: 0,
      customMaxHeight: 0,
      // 当前 hover 行
      hoverRow: null,
      // 最后滚动位置
      lastScrollLeft: 0,
      lastScrollTop: 0,
      lastScrollTime: 0,
      // 单选框属性，已选中保留的行
      radioReserveRow: null,
      // 复选框属性，已选中保留的行
      checkboxReserveRowMap: {},
      // 行数据，已展开保留的行
      rowExpandedReserveRowMap: {},
      // 树结构数据，已展开保留的行
      treeExpandedReserveRowMap: {},
      // 完整数据、条件处理后
      tableFullData: [],
      afterFullData: [],
      tableSynchData: [],
      tableSourceData: [],
      // 收集的列配置（带分组）
      collectColumn: [],
      // 完整所有列（不带分组）
      tableFullColumn: [],
      // 渲染所有列
      visibleColumn: [],
      // 缓存数据集
      fullAllDataRowIdData: {},
      fullDataRowIdData: {},
      fullColumnIdData: {},
      fullColumnFieldData: {},
      inited: false,
      tooltipActive: false,
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
    const refTableFilter = ref() as Ref<ComponentPublicInstance>
    const refTableMenu = ref() as Ref<VxeMenuPanelInstance>

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

    const $xegrid = inject('$xegrid', null as (VxeGridConstructor & VxeGridPrivateMethods) | null)
    let $xetoolbar: VxeToolbarConstructor

    const computeValidOpts = computed(() => {
      return Object.assign({}, GlobalConfig.table.validConfig, props.validConfig) as VxeTablePropTypes.ValidOpts
    })

    const computeSXOpts = computed(() => {
      return Object.assign({}, GlobalConfig.table.scrollX, props.scrollX) as VxeTablePropTypes.SXOpts
    })

    const computeSYOpts = computed(() => {
      return Object.assign({}, GlobalConfig.table.scrollY, props.scrollY) as VxeTablePropTypes.SYOpts
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
      return Object.assign({}, props.columnConfig) as VxeTablePropTypes.ColumnOpts
    })

    const computeResizableOpts = computed(() => {
      return Object.assign({}, GlobalConfig.table.resizableConfig, props.resizableConfig) as VxeTablePropTypes.ResizableOpts
    })

    const computeSeqOpts = computed(() => {
      return Object.assign({ startIndex: 0 }, GlobalConfig.table.seqConfig, props.seqConfig) as VxeTablePropTypes.SeqOpts
    })

    const computeRadioOpts = computed(() => {
      return Object.assign({}, GlobalConfig.table.radioConfig, props.radioConfig) as VxeTablePropTypes.RadioOpts
    })

    const computeCheckboxOpts = computed(() => {
      return Object.assign({}, GlobalConfig.table.checkboxConfig, props.checkboxConfig) as VxeTablePropTypes.CheckboxOpts
    })

    let computeTooltipOpts = ref() as ComputedRef<VxeTablePropTypes.TooltipOpts>

    const handleTooltipLeaveMethod = () => {
      const tooltipOpts = computeTooltipOpts.value
      setTimeout(() => {
        if (!internalData.tooltipActive) {
          tableMethods.closeTooltip()
        }
      }, tooltipOpts.leaveDelay)
      return false
    }

    computeTooltipOpts = computed(() => {
      const opts: VxeTablePropTypes.TooltipOpts = Object.assign({ leaveDelay: 300 }, GlobalConfig.table.tooltipConfig, props.tooltipConfig)
      if (opts.enterable) {
        opts.leaveMethod = handleTooltipLeaveMethod
      }
      return opts
    })

    const computeValidTipOpts = computed(() => {
      const tooltipOpts = computeTooltipOpts.value
      return Object.assign({ isArrow: false }, tooltipOpts)
    })

    const computeEditOpts = computed(() => {
      return Object.assign({}, GlobalConfig.table.editConfig, props.editConfig) as VxeTablePropTypes.EditOpts
    })

    const computeSortOpts = computed(() => {
      return Object.assign({ orders: ['asc', 'desc', null] }, GlobalConfig.table.sortConfig, props.sortConfig) as VxeTablePropTypes.SortOpts
    })

    const computeFilterOpts = computed(() => {
      return Object.assign({}, GlobalConfig.table.filterConfig, props.filterConfig) as VxeTablePropTypes.FilterOpts
    })

    const computeMouseOpts = computed(() => {
      return Object.assign({}, GlobalConfig.table.mouseConfig, props.mouseConfig) as VxeTablePropTypes.MouseOpts
    })

    const computeAreaOpts = computed(() => {
      return Object.assign({}, GlobalConfig.table.areaConfig, props.areaConfig) as VxeTablePropTypes.AreaOpts
    })

    const computeKeyboardOpts = computed(() => {
      return Object.assign({}, GlobalConfig.table.keyboardConfig, props.keyboardConfig) as VxeTablePropTypes.KeyboardOpts
    })

    const computeClipOpts = computed(() => {
      return Object.assign({}, GlobalConfig.table.clipConfig, props.clipConfig) as VxeTablePropTypes.ClipOpts
    })

    const computeFNROpts = computed(() => {
      return Object.assign({}, GlobalConfig.table.fnrConfig, props.fnrConfig) as VxeTablePropTypes.FNROpts
    })

    const computeMenuOpts = computed(() => {
      return Object.assign({}, GlobalConfig.table.menuConfig, props.menuConfig)
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
      return Object.assign({}, GlobalConfig.table.exportConfig, props.exportConfig) as VxeTablePropTypes.ExportOpts
    })

    const computeImportOpts = computed(() => {
      return Object.assign({}, GlobalConfig.table.importConfig, props.importConfig) as VxeTablePropTypes.ImportOpts
    })

    const computePrintOpts = computed(() => {
      return Object.assign({}, GlobalConfig.table.printConfig, props.printConfig) as VxeTablePropTypes.PrintOpts
    })

    const computeExpandOpts = computed(() => {
      return Object.assign({}, GlobalConfig.table.expandConfig, props.expandConfig) as VxeTablePropTypes.ExpandOpts
    })

    const computeTreeOpts = computed(() => {
      return Object.assign({}, GlobalConfig.table.treeConfig, props.treeConfig) as VxeTablePropTypes.TreeOpts
    })

    const computeEmptyOpts = computed(() => {
      return Object.assign({}, GlobalConfig.table.emptyRender, props.emptyRender) as VxeTablePropTypes.EmptyOpts
    })

    const computeCellOffsetWidth = computed(() => {
      return props.border ? Math.max(2, Math.ceil(reactData.scrollbarWidth / reactData.tableColumn.length)) : 1
    })

    const computeCustomOpts = computed(() => {
      return Object.assign({}, GlobalConfig.table.customConfig, props.customConfig)
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

    const refMaps: TablePrivateRef = {
      refElem,
      refTooltip,
      refValidTooltip,
      refTableFilter,
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
      computeCustomOpts,
      computeIsAllCheckboxDisabled
    }

    const $xetable = {
      xID,
      props,
      context,
      instance,
      reactData,
      internalData,
      getRefMaps: () => refMaps,
      getComputeMaps: () => computeMaps,

      xegrid: $xegrid
    } as VxeTableConstructor & VxeTableMethods & VxeTablePrivateMethods

    const eqCellValue = (row1: any, row2: any, field: string) => {
      const val1 = XEUtils.get(row1, field)
      const val2 = XEUtils.get(row2, field)
      if (eqEmptyValue(val1) && eqEmptyValue(val2)) {
        return true
      }
      if (XEUtils.isString(val1) || XEUtils.isNumber(val1)) {
        /* eslint-disable eqeqeq */
        return val1 == val2
      }
      return XEUtils.isEqual(val1, val2)
    }

    const getNextSortOrder = (column: any) => {
      const sortOpts = computeSortOpts.value
      const { orders } = sortOpts
      const currOrder = column.order || null
      const oIndex = orders.indexOf(currOrder) + 1
      return orders[oIndex < orders.length ? oIndex : 0]
    }

    const getCustomStorageMap = (key: string) => {
      const version = GlobalConfig.version
      const rest = XEUtils.toStringJSON(localStorage.getItem(key) || '')
      return rest && rest._v === version ? rest : { _v: version }
    }

    const getRecoverRow = (list: any) => {
      const { fullAllDataRowIdData } = internalData
      return list.filter((row: any) => {
        const rowid = getRowid($xetable, row)
        return !!fullAllDataRowIdData[rowid]
      })
    }

    const handleReserveRow = (reserveRowMap: any) => {
      const { fullDataRowIdData } = internalData
      const reserveList: any[] = []
      XEUtils.each(reserveRowMap, (item, rowid) => {
        if (fullDataRowIdData[rowid] && $xetable.findRowIndexOf(reserveList, fullDataRowIdData[rowid].row) === -1) {
          reserveList.push(fullDataRowIdData[rowid].row)
        }
      })
      return reserveList
    }

    const restoreScroll = (scrollLeft: number, scrollTop: number) => {
      return tableMethods.clearScroll().then(() => {
        if (scrollLeft || scrollTop) {
          // 重置最后滚动状态
          internalData.lastScrollLeft = 0
          internalData.lastScrollTop = 0
          // 还原滚动状态
          return tableMethods.scrollTo(scrollLeft, scrollTop)
        }
      })
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

    const calculateMergerOffserIndex = (list: any, offsetItem: any, type: 'row' | 'col') => {
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
        if (treeConfig) {
          errLog('vxe.error.noTree', ['merge-footer-items'])
          return
        }
        if (!XEUtils.isArray(merges)) {
          merges = [merges]
        }
        merges.forEach((item: any) => {
          let { row, col, rowspan, colspan }: any = item
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
              const mcIndex = XEUtils.findIndexOf(mList, item => (item._row === row || getRowid($xetable, item._row) === getRowid($xetable, row)) && (item._col.id === col || item._col.id === col.id))
              const mergeItem = mList[mcIndex]
              if (mergeItem) {
                mergeItem.rowspan = rowspan
                mergeItem.colspan = colspan
                mergeItem._rowspan = rowspan
                mergeItem._colspan = colspan
              } else {
                const mergeRowIndex = rowList ? $xetable.findRowIndexOf(rowList, row) : row
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
      const rest: any[] = []
      if (merges) {
        const { treeConfig } = props
        const { visibleColumn } = internalData
        if (treeConfig) {
          throw new Error(getLog('vxe.error.noTree', ['merge-cells']))
        }
        if (!XEUtils.isArray(merges)) {
          merges = [merges]
        }
        merges.forEach((item: any) => {
          let { row, col }: any = item
          if (rowList && XEUtils.isNumber(row)) {
            row = rowList[row]
          }
          if (XEUtils.isNumber(col)) {
            col = visibleColumn[col]
          }
          const mcIndex = XEUtils.findIndexOf(mList, item => (item._row === row || getRowid($xetable, item._row) === getRowid($xetable, row)) && (item._col.id === col || item._col.id === col.id))
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
      tableFullColumn.forEach((column: any) => {
        column.order = null
      })
    }

    const calcHeight = (key: 'height' | 'maxHeight') => {
      const { parentHeight } = reactData
      const val = props[key]
      let num = 0
      if (val) {
        if (val === 'auto') {
          num = parentHeight
        } else {
          const excludeHeight = $xetable.getExcludeHeight()
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
      const { collectColumn } = internalData
      const customOpts = computeCustomOpts.value
      const { storage } = customOpts
      const isResizable = storage === true || (storage && storage.resizable)
      const isVisible = storage === true || (storage && storage.visible)
      if (customConfig && (isResizable || isVisible)) {
        const customMap: any = {}
        if (!id) {
          errLog('vxe.error.reqProp', ['id'])
          return
        }
        if (isResizable) {
          const columnWidthStorage = getCustomStorageMap(resizableStorageKey)[id]
          if (columnWidthStorage) {
            XEUtils.each(columnWidthStorage, (resizeWidth, field) => {
              customMap[field] = { field, resizeWidth }
            })
          }
        }
        if (isVisible) {
          const columnVisibleStorage = getCustomStorageMap(visibleStorageKey)[id]
          if (columnVisibleStorage) {
            const colVisibles = columnVisibleStorage.split('|')
            const colHides = colVisibles[0] ? colVisibles[0].split(',') : []
            const colShows = colVisibles[1] ? colVisibles[1].split(',') : []
            colHides.forEach((field: any) => {
              if (customMap[field]) {
                customMap[field].visible = false
              } else {
                customMap[field] = { field, visible: false }
              }
            })
            colShows.forEach((field: any) => {
              if (customMap[field]) {
                customMap[field].visible = true
              } else {
                customMap[field] = { field, visible: true }
              }
            })
          }
        }
        const keyMap: any = {}
        XEUtils.eachTree(collectColumn, (column: any) => {
          const colKey = column.getKey()
          if (colKey) {
            keyMap[colKey] = column
          }
        })
        XEUtils.each(customMap, ({ visible, resizeWidth }, field) => {
          const column = keyMap[field]
          if (column) {
            if (XEUtils.isNumber(resizeWidth)) {
              column.resizeWidth = resizeWidth
            }
            if (XEUtils.isBoolean(visible)) {
              column.visible = visible
            }
          }
        })
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
      const isGroup = collectColumn.some(hasChildrenList)
      let isAllOverflow = !!props.showOverflow
      let expandColumn: any
      let treeNodeColumn: any
      let checkboxColumn: any
      let radioColumn: any
      let hasFixed: any
      const handleFunc = (column: any, index: any, items: any, path?: any, parent?: any) => {
        const { id: colid, property, fixed, type, treeNode } = column
        const rest = { column, colid, index, items, parent }
        if (property) {
          if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
            if (fullColumnFieldData[property]) {
              warnLog('vxe.error.colRepet', ['field', property])
            }
          }
          fullColumnFieldData[property] = rest
        }
        if (!hasFixed && fixed) {
          hasFixed = fixed
        }
        if (treeNode) {
          if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
            if (treeNodeColumn) {
              warnLog('vxe.error.colRepet', ['tree-node', treeNode])
            }
          }
          if (!treeNodeColumn) {
            treeNodeColumn = column
          }
        } else if (type === 'expand') {
          if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
            if (expandColumn) {
              warnLog('vxe.error.colRepet', ['type', type])
            }
          }
          if (!expandColumn) {
            expandColumn = column
          }
        }
        if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
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
        XEUtils.eachTree(collectColumn, (column: any, index, items, path, parent, nodes) => {
          column.level = nodes.length
          handleFunc(column, index, items, path, parent)
        })
      } else {
        tableFullColumn.forEach(handleFunc)
      }

      if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
        if (expandColumn && mouseOpts.area) {
          errLog('vxe.error.errConflicts', ['mouse-config.area', 'column.type=expand'])
        }
      }

      reactData.isGroup = isGroup
      reactData.treeNodeColumn = treeNodeColumn
      reactData.expandColumn = expandColumn
      reactData.isAllOverflow = isAllOverflow
    }

    const updateHeight = () => {
      internalData.customHeight = calcHeight('height')
      internalData.customMaxHeight = calcHeight('maxHeight')
    }

    /**
     * 列宽算法
     * 支持 px、%、固定 混合分配
     * 支持动态列表调整分配
     * 支持自动分配偏移量
     * @param {Element} headerElem
     * @param {Element} bodyElem
     * @param {Element} footerElem
     * @param {Number} bodyWidth
     */
    const autoCellWidth = (headerElem: any, bodyElem: any, footerElem: any) => {
      let tableWidth = 0
      const minCellWidth = 40 // 列宽最少限制 40px
      const bodyWidth = bodyElem.clientWidth - 1
      let remainWidth = bodyWidth
      let meanWidth = remainWidth / 100
      const { fit } = props
      const { columnStore } = reactData
      const { resizeList, pxMinList, pxList, scaleList, scaleMinList, autoList } = columnStore
      // 最小宽
      pxMinList.forEach((column: any) => {
        const minWidth = parseInt(column.minWidth)
        tableWidth += minWidth
        column.renderWidth = minWidth
      })
      // 最小百分比
      scaleMinList.forEach((column: any) => {
        const scaleWidth = Math.floor(parseInt(column.minWidth) * meanWidth)
        tableWidth += scaleWidth
        column.renderWidth = scaleWidth
      })
      // 固定百分比
      scaleList.forEach((column: any) => {
        const scaleWidth = Math.floor(parseInt(column.width) * meanWidth)
        tableWidth += scaleWidth
        column.renderWidth = scaleWidth
      })
      // 固定宽
      pxList.forEach((column: any) => {
        const width = parseInt(column.width)
        tableWidth += width
        column.renderWidth = width
      })
      // 调整了列宽
      resizeList.forEach((column: any) => {
        const width = parseInt(column.resizeWidth)
        tableWidth += width
        column.renderWidth = width
      })
      remainWidth -= tableWidth
      meanWidth = remainWidth > 0 ? Math.floor(remainWidth / (scaleMinList.length + pxMinList.length + autoList.length)) : 0
      if (fit) {
        if (remainWidth > 0) {
          scaleMinList.concat(pxMinList).forEach((column: any) => {
            tableWidth += meanWidth
            column.renderWidth += meanWidth
          })
        }
      } else {
        meanWidth = minCellWidth
      }
      // 自适应
      autoList.forEach((column: any) => {
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

    const getOrderField = (column: any) => {
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

    const updateAfterDataIndex = () => {
      const { afterFullData, fullDataRowIdData } = internalData
      afterFullData.forEach((row, _index) => {
        const rowid = getRowid($xetable, row)
        const rest = fullDataRowIdData[rowid]
        if (rest) {
          rest._index = _index
        } else {
          fullDataRowIdData[rowid] = { row, rowid, index: -1, $index: -1, _index, items: [], parent: null }
        }
      })
    }

    /**
     * 获取处理后全量的表格数据
     * 如果存在筛选条件，继续处理
     */
    const updateAfterFullData = () => {
      const { tableFullColumn, tableFullData } = internalData
      const filterOpts = computeFilterOpts.value
      const sortOpts = computeSortOpts.value
      const { remote: allRemoteFilter, filterMethod: allFilterMethod } = filterOpts
      const { remote: allRemoteSort, sortMethod: allSortMethod } = sortOpts
      let tableData = tableFullData.slice(0)
      if (!allRemoteFilter || !allRemoteSort) {
        const filterColumns: any[] = []
        const orderColumns: any[] = []
        tableFullColumn.forEach((column: any) => {
          const { sortable, order, filters } = column
          if (!allRemoteFilter && filters && filters.length) {
            const valueList: any[] = []
            const itemList: any[] = []
            filters.forEach((item: any) => {
              if (item.checked) {
                itemList.push(item)
                valueList.push(item.value)
              }
            })
            if (itemList.length) {
              filterColumns.push({ column, valueList, itemList })
            }
          }
          if (!allRemoteSort && sortable && order) {
            orderColumns.push({ column, property: column.property, order })
          }
        })

        // 处理筛选
        // 支持单列、多列、组合筛选
        if (!allRemoteFilter && filterColumns.length) {
          tableData = tableData.filter((row: any) => {
            return filterColumns.every(({ column, valueList, itemList }) => {
              const { filterMethod, filterRender } = column
              const compConf = filterRender ? VXETable.renderer.get(filterRender.name) : null
              const compFilterMethod = compConf && compConf.renderFilter ? compConf.filterMethod : null
              const cellValue = getCellValue(row, column)
              if (filterMethod) {
                return itemList.some((item: any) => filterMethod({ value: item.value, option: item, cellValue, row, column, $table: $xetable }))
              } else if (compFilterMethod) {
                return itemList.some((item: any) => compFilterMethod({ value: item.value, option: item, cellValue, row, column, $table: $xetable }))
              } else if (allFilterMethod) {
                return allFilterMethod({ options: itemList, values: valueList, cellValue, row, column })
              }
              return valueList.indexOf(XEUtils.get(row, column.property)) > -1
            })
          })
        }

        // 处理排序
        // 支持单列、多列、组合排序
        if (!allRemoteSort && orderColumns.length) {
          if (allSortMethod) {
            const sortRests = allSortMethod({ data: tableData, sortList: orderColumns, $table: $xetable })
            tableData = XEUtils.isArray(sortRests) ? sortRests : tableData
          } else {
            tableData = XEUtils.orderBy(tableData, orderColumns.map(({ column, order }) => [getOrderField(column), order]))
          }
        }
      }
      internalData.afterFullData = tableData
      updateAfterDataIndex()
      return tableData
    }

    const updateStyle = () => {
      const { border, showFooter, showOverflow: allColumnOverflow, showHeaderOverflow: allColumnHeaderOverflow, showFooterOverflow: allColumnFooterOverflow, mouseConfig, spanMethod, footerSpanMethod, keyboardConfig } = props
      let { isGroup, currentRow, tableColumn, scrollXLoad, scrollYLoad, scrollbarWidth, scrollbarHeight, columnStore, editStore, mergeList, mergeFooterList, isAllOverflow } = reactData
      let { fullColumnIdData, tableHeight, tableWidth, headerHeight, footerHeight, elemStore, customHeight, customMaxHeight } = internalData
      const containerList = ['main', 'left', 'right']
      const emptyPlaceholderElem = refEmptyPlaceholder.value
      const cellOffsetWidth = computeCellOffsetWidth.value
      const mouseOpts = computeMouseOpts.value
      const keyboardOpts = computeKeyboardOpts.value
      const bodyWrapperElem = elemStore['main-body-wrapper']
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
        let fixedColumn: any[] = []
        let fixedWrapperElem: HTMLDivElement
        if (fixedType) {
          fixedColumn = isFixedLeft ? columnStore.leftList : columnStore.rightList
          fixedWrapperElem = isFixedLeft ? refLeftContainer.value : refRightContainer.value
        }
        layoutList.forEach(layout => {
          const wrapperElem = elemStore[`${name}-${layout}-wrapper`]
          const tableElem = elemStore[`${name}-${layout}-table`]
          if (layout === 'header') {
            // 表头体样式处理
            // 横向滚动渲染
            let tWidth = tableWidth

            // 如果是使用优化模式
            let isOptimize = false
            if (!isGroup) {
              if (fixedType) {
                if (scrollXLoad || allColumnHeaderOverflow) {
                  isOptimize = true
                }
              }
            }
            if (isOptimize) {
              tableColumn = fixedColumn
            }
            if (isOptimize || scrollXLoad) {
              tWidth = tableColumn.reduce((previous, column) => previous + column.renderWidth, 0)
            }

            if (tableElem) {
              tableElem.style.width = tWidth ? `${tWidth + scrollbarWidth}px` : ''
              // 修复 IE 中高度无法自适应问题
              if (browse.msie) {
                XEUtils.arrayEach(tableElem.querySelectorAll('.vxe-resizable'), (resizeElem: any) => {
                  resizeElem.style.height = `${resizeElem.parentNode.offsetHeight}px`
                })
              }
            }

            const repairElem = elemStore[`${name}-${layout}-repair`]
            if (repairElem) {
              repairElem.style.width = `${tableWidth}px`
            }

            const listElem = elemStore[`${name}-${layout}-list`]
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
                    XEUtils.eachTree(column.children, (item: any) => {
                      if (!item.children || !column.children.length) {
                        countChild++
                      }
                      childWidth += item.renderWidth
                    })
                  }
                  thElem.style.width = hasEllipsis ? `${childWidth - countChild - (border ? 2 : 0)}px` : ''
                }
              })
            }
          } else if (layout === 'body') {
            const emptyBlockElem = elemStore[`${name}-${layout}-emptyBlock`]
            if (wrapperElem) {
              if (customMaxHeight) {
                wrapperElem.style.maxHeight = `${fixedType ? customMaxHeight - headerHeight - (showFooter ? 0 : scrollbarHeight) : customMaxHeight - headerHeight}px`
              } else {
                if (customHeight > 0) {
                  wrapperElem.style.height = `${fixedType ? (customHeight > 0 ? customHeight - headerHeight - footerHeight : tableHeight) - (showFooter ? 0 : scrollbarHeight) : customHeight - headerHeight - footerHeight}px`
                } else {
                  wrapperElem.style.height = ''
                }
              }
            }

            // 如果是固定列
            if (fixedWrapperElem) {
              if (wrapperElem) {
                wrapperElem.style.top = `${headerHeight}px`
              }
              fixedWrapperElem.style.height = `${(customHeight > 0 ? customHeight - headerHeight - footerHeight : tableHeight) + headerHeight + footerHeight - scrollbarHeight * (showFooter ? 2 : 1)}px`
              fixedWrapperElem.style.width = `${fixedColumn.reduce((previous: any, column: any) => previous + column.renderWidth, isFixedLeft ? 0 : scrollbarWidth)}px`
            }

            let tWidth = tableWidth

            // 如果是使用优化模式
            let isOptimize = false
            if (fixedType) {
              if ((!mergeList.length && !spanMethod && !(keyboardConfig && keyboardOpts.isMerge)) && (scrollXLoad || scrollYLoad || (allColumnOverflow ? isAllOverflow : allColumnOverflow))) {
                isOptimize = true
              }
            }
            if (isOptimize) {
              tableColumn = fixedColumn
            }
            if (isOptimize || scrollXLoad) {
              tWidth = tableColumn.reduce((previous, column) => previous + column.renderWidth, 0)
            }

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

            // 如果是使用优化模式
            let isOptimize = false
            if (fixedType) {
              if ((!mergeFooterList.length || !footerSpanMethod) && (scrollXLoad || allColumnFooterOverflow)) {
                isOptimize = true
              }
            }
            if (isOptimize) {
              tableColumn = fixedColumn
            }
            if (isOptimize || scrollXLoad) {
              tWidth = tableColumn.reduce((previous, column) => previous + column.renderWidth, 0)
            }

            if (wrapperElem) {
              // 如果是固定列
              if (fixedWrapperElem) {
                wrapperElem.style.top = `${customHeight > 0 ? customHeight - footerHeight : tableHeight + headerHeight}px`
              }
              wrapperElem.style.marginTop = `${-scrollbarHeight}px`
            }
            if (tableElem) {
              tableElem.style.width = tWidth ? `${tWidth + scrollbarWidth}px` : ''
            }
          }
          const colgroupElem = elemStore[`${name}-${layout}-colgroup`]
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
                const listElem = elemStore[`${name}-${layout}-list`]
                // 滚动的渲染不支持动态行高
                if (layout === 'header' || layout === 'footer') {
                  if (scrollXLoad && !hasEllipsis) {
                    hasEllipsis = true
                  }
                } else {
                  if ((scrollXLoad || scrollYLoad) && !hasEllipsis) {
                    hasEllipsis = true
                  }
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
        $xetable.addCellSelectedClass()
      }
      return nextTick()
    }

    const checkValidate = (type: any) => {
      if ($xetable.triggerValidate) {
        return $xetable.triggerValidate(type)
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
          $xetable.handleActived(params, evnt)
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
            (sortConfig.multiple ? defaultSort : defaultSort.slice(0, 1)).forEach((item: any) => {
              const { field, order } = item
              if (field && order) {
                const column = tableMethods.getColumnByField(field)
                if (column && column.sortable) {
                  column.order = order
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
          tableMethods.setAllCheckboxRow(true)
        } else if (checkRowKeys) {
          const defSelection: any[] = []
          checkRowKeys.forEach((rowid: any) => {
            if (fullDataRowIdData[rowid]) {
              defSelection.push(fullDataRowIdData[rowid].row)
            }
          })
          tableMethods.setCheckboxRow(defSelection, true)
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
            tableMethods.setRadioRow(fullDataRowIdData[rowid].row)
          }
          if (reserve) {
            const rowkey = getRowkey($xetable)
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
        const rowid = getRowid($xetable, row)
        if (checked) {
          checkboxReserveRowMap[rowid] = row
        } else if (checkboxReserveRowMap[rowid]) {
          delete checkboxReserveRowMap[rowid]
        }
      }
    }

    // 还原展开、选中等相关状态
    const handleReserveStatus = () => {
      const { treeConfig } = props
      const { expandColumn, currentRow, selectRow, selection, rowExpandeds, treeExpandeds } = reactData
      const { fullDataRowIdData, fullAllDataRowIdData, radioReserveRow } = internalData
      const expandOpts = computeExpandOpts.value
      const treeOpts = computeTreeOpts.value
      const radioOpts = computeRadioOpts.value
      const checkboxOpts = computeCheckboxOpts.value
      // 单选框
      if (selectRow && !fullAllDataRowIdData[getRowid($xetable, selectRow)]) {
        reactData.selectRow = null // 刷新单选行状态
      }
      // 还原保留选中状态
      if (radioOpts.reserve && radioReserveRow) {
        const rowid = getRowid($xetable, radioReserveRow)
        if (fullDataRowIdData[rowid]) {
          tableMethods.setRadioRow(fullDataRowIdData[rowid].row)
        }
      }
      // 复选框
      reactData.selection = getRecoverRow(selection) // 刷新多选行状态
      // 还原保留选中状态
      if (checkboxOpts.reserve) {
        tableMethods.setCheckboxRow(handleReserveRow(internalData.checkboxReserveRowMap), true)
      }
      if (currentRow && !fullAllDataRowIdData[getRowid($xetable, currentRow)]) {
        reactData.currentRow = null // 刷新当前行状态
      }
      // 行展开
      reactData.rowExpandeds = expandColumn ? getRecoverRow(rowExpandeds) : [] // 刷新行展开状态
      // 还原保留状态
      if (expandColumn && expandOpts.reserve) {
        tableMethods.setRowExpand(handleReserveRow(internalData.rowExpandedReserveRowMap), true)
      }
      // 树展开
      reactData.treeExpandeds = treeConfig ? getRecoverRow(treeExpandeds) : [] // 刷新树展开状态
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
        if (expandAll) {
          tableMethods.setAllTreeExpand(true)
        } else if (expandRowKeys) {
          const defExpandeds: any[] = []
          const rowkey = getRowkey($xetable)
          expandRowKeys.forEach((rowid: any) => {
            const matchObj = XEUtils.findTree(tableFullData, item => rowid === XEUtils.get(item, rowkey), treeOpts)
            if (matchObj) {
              defExpandeds.push(matchObj.item)
            }
          })
          tableMethods.setTreeExpand(defExpandeds, true)
        }
      }
    }

    const handleAsyncTreeExpandChilds = (row: any): Promise<void> => {
      const { treeExpandeds, treeLazyLoadeds } = reactData
      const { fullAllDataRowIdData } = internalData
      const treeOpts = computeTreeOpts.value
      const checkboxOpts = computeCheckboxOpts.value
      const { loadMethod } = treeOpts
      const { checkStrictly } = checkboxOpts
      const rest = fullAllDataRowIdData[getRowid($xetable, row)]
      return new Promise(resolve => {
        if (loadMethod) {
          treeLazyLoadeds.push(row)
          loadMethod({ $table: $xetable, row }).catch(() => []).then((childRecords: any) => {
            rest.treeLoaded = true
            XEUtils.remove(treeLazyLoadeds, item => item === row)
            if (!XEUtils.isArray(childRecords)) {
              childRecords = []
            }
            if (childRecords) {
              tableMethods.loadChildren(row, childRecords).then(childRows => {
                if (childRows.length && $xetable.findRowIndexOf(treeExpandeds, row) === -1) {
                  treeExpandeds.push(row)
                }
                // 如果当前节点已选中，则展开后子节点也被选中
                if (!checkStrictly && tableMethods.isCheckedByCheckboxRow(row)) {
                  tableMethods.setCheckboxRow(childRows, true)
                }
              })
            }
            resolve(nextTick().then(() => tableMethods.recalculate()))
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
        const rowid = getRowid($xetable, row)
        if (expanded) {
          treeExpandedReserveRowMap[rowid] = row
        } else if (treeExpandedReserveRowMap[rowid]) {
          delete treeExpandedReserveRowMap[rowid]
        }
      }
    }

    const handleAsyncRowExpand = (row: any): Promise<void> => {
      const { rowExpandeds, expandLazyLoadeds } = reactData
      const { fullAllDataRowIdData } = internalData
      const rest = fullAllDataRowIdData[getRowid($xetable, row)]
      return new Promise(resolve => {
        const expandOpts = computeExpandOpts.value
        const { loadMethod } = expandOpts
        if (loadMethod) {
          expandLazyLoadeds.push(row)
          loadMethod({ $table: $xetable, row, rowIndex: tableMethods.getRowIndex(row), $rowIndex: tableMethods.getVMRowIndex(row) }).catch((e: any) => e).then(() => {
            rest.expandLoaded = true
            XEUtils.remove(expandLazyLoadeds, item => item === row)
            rowExpandeds.push(row)
            resolve(nextTick().then(() => tableMethods.recalculate()))
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
        const rowid = getRowid($xetable, row)
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
          const offsetXSize = sXOpts.oSize ? XEUtils.toNumber(sXOpts.oSize) : browse.msie ? 10 : (browse.edge ? 5 : 0)
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
          const offsetYSize = sYOpts.oSize ? XEUtils.toNumber(sYOpts.oSize) : browse.msie ? 20 : (browse.edge ? 10 : 0)
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
      const sYOpts = computeSYOpts.value
      const tableFullData = datas ? datas.slice(0) : []
      const scrollYLoad = !treeConfig && sYOpts.enabled && sYOpts.gt > -1 && sYOpts.gt < tableFullData.length
      scrollYStore.startIndex = 0
      scrollYStore.endIndex = 1
      scrollXStore.startIndex = 0
      scrollXStore.endIndex = 1
      editStore.insertList = []
      editStore.removeList = []
      // 全量数据
      internalData.tableFullData = tableFullData
      // 缓存数据
      tablePrivateMethods.updateCache(true)
      // 原始数据
      internalData.tableSynchData = datas
      if (keepSource) {
        internalData.tableSourceData = XEUtils.clone(tableFullData, true)
      }
      reactData.scrollYLoad = scrollYLoad
      if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
        if (scrollYLoad) {
          if (!(props.height || props.maxHeight)) {
            errLog('vxe.error.reqProp', ['table.height | table.max-height | table.scroll-y={enabled: false}'])
          }
          if (!props.showOverflow) {
            warnLog('vxe.error.reqProp', ['table.show-overflow'])
          }
          if (props.spanMethod) {
            warnLog('vxe.error.scrollErrProp', ['table.span-method'])
          }
        }
      }
      if ($xetable.clearCellAreas && props.mouseConfig) {
        $xetable.clearCellAreas()
        $xetable.clearCopyCellArea()
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
        // 是否加载了数据
        if (scrollYLoad) {
          scrollYStore.endIndex = scrollYStore.visibleSize
        }
        handleReserveStatus()
        tablePrivateMethods.checkSelectionStatus()
        return new Promise(resolve => {
          nextTick()
            .then(() => tableMethods.recalculate())
            .then(() => {
              // 是否变更虚拟滚动
              if (oldScrollYLoad === scrollYLoad) {
                restoreScroll(lastScrollLeft, lastScrollTop).then(resolve)
              } else {
                setTimeout(() => restoreScroll(lastScrollLeft, lastScrollTop).then(resolve))
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
    const getColumnList = (columns: any) => {
      const result: any[] = []
      columns.forEach((column: any) => {
        result.push(...(column.children && column.children.length ? getColumnList(column.children) : [column]))
      })
      return result
    }

    const parseColumns = () => {
      const leftList: any[] = []
      const centerList: any[] = []
      const rightList: any[] = []
      const { isGroup, columnStore } = reactData
      const sXOpts = computeSXOpts.value
      const { collectColumn, tableFullColumn, scrollXStore, fullColumnIdData } = internalData
      // 如果是分组表头，如果子列全部被隐藏，则根列也隐藏
      if (isGroup) {
        const leftGroupList: any[] = []
        const centerGroupList: any[] = []
        const rightGroupList: any[] = []
        XEUtils.eachTree(collectColumn, (column, index, items, path, parent) => {
          const isColGroup = hasChildrenList(column)
          // 如果是分组，必须按组设置固定列，不允许给子列设置固定
          if (parent && parent.fixed) {
            column.fixed = parent.fixed
          }
          if (parent && column.fixed !== parent.fixed) {
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
      let scrollXLoad = sXOpts.enabled && sXOpts.gt > -1 && sXOpts.gt < tableFullColumn.length
      reactData.hasFixedColumn = leftList.length > 0 || rightList.length > 0
      Object.assign(columnStore, { leftList, centerList, rightList })
      if (scrollXLoad && isGroup) {
        scrollXLoad = false
        if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
          warnLog('vxe.error.scrollXNotGroup')
        }
      }
      if (scrollXLoad) {
        if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
          if (props.showHeader && !props.showHeaderOverflow) {
            warnLog('vxe.error.reqProp', ['show-header-overflow'])
          }
          if (props.showFooter && !props.showFooterOverflow) {
            warnLog('vxe.error.reqProp', ['show-footer-overflow'])
          }
          if (props.spanMethod) {
            warnLog('vxe.error.scrollErrProp', ['span-method'])
          }
          if (props.footerSpanMethod) {
            warnLog('vxe.error.scrollErrProp', ['footer-span-method'])
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
      visibleColumn.forEach((column, _index) => {
        const colid = column.id
        const rest = fullColumnIdData[colid]
        if (rest) {
          rest._index = _index
        }
      })
      internalData.visibleColumn = visibleColumn
      handleTableColumn()
      return tableMethods.updateFooter().then(() => {
        return tableMethods.recalculate()
      }).then(() => {
        tablePrivateMethods.updateCellAreas()
        return tableMethods.recalculate()
      })
    }

    const handleColumn = (collectColumn: any) => {
      internalData.collectColumn = collectColumn
      const tableFullColumn = getColumnList(collectColumn)
      internalData.tableFullColumn = tableFullColumn
      cacheColumnMap()
      restoreCustomStorage()
      parseColumns().then(() => {
        if (reactData.scrollXLoad) {
          loadScrollXData()
        }
      })
      tableMethods.clearMergeCells()
      tableMethods.clearMergeFooterItems()
      tablePrivateMethods.handleTableData(true)
      if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
        if ((reactData.scrollXLoad || reactData.scrollYLoad) && reactData.expandColumn) {
          warnLog('vxe.error.scrollErrProp', ['column.type=expand'])
        }
      }
      nextTick(() => {
        if ($xetoolbar) {
          $xetoolbar.syncUpdate({ collectColumn, $table: $xetable })
        }
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

    const debounceScrollY = XEUtils.debounce(function (evnt: Event) {
      loadScrollYData(evnt)
    }, 20, { leading: false, trailing: true })

    let keyCtxTimeout: any

    tableMethods = {
      dispatchEvent (type, params, evnt) {
        emit(type, Object.assign({ $table: $xetable, $event: evnt }, params))
      },
      /**
       * 重置表格的一切数据状态
       */
      clearAll () {
        return clearTableAllStatus($xetable)
      },
      /**
       * 同步 data 数据
       * 如果用了该方法，那么组件将不再记录增删改的状态，只能自行实现对应逻辑
       * 对于某些特殊的场景，比如深层树节点元素发生变动时可能会用到
       */
      syncData () {
        return nextTick().then(() => {
          reactData.tableData = []
          emit('update:data', internalData.tableFullData)
          return nextTick()
        })
      },
      /**
       * 手动处理数据
       * 对于手动更改了排序、筛选...等条件后需要重新处理数据时可能会用到
       */
      updateData () {
        return tablePrivateMethods.handleTableData(true).then(tableMethods.updateFooter).then(() => tableMethods.recalculate())
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
              XEUtils.set(oRow, field, XEUtils.get(record || row, field))
            } else {
              if (record) {
                tableSourceData[rowIndex] = record
                XEUtils.clear(row, undefined)
                Object.assign(row, tablePrivateMethods.defineField(Object.assign({}, record)))
                tablePrivateMethods.updateCache(true)
              } else {
                XEUtils.destructuring(oRow, XEUtils.clone(row, true))
              }
            }
          }
          reactData.tableData = tableData.slice(0)
        } else {
          if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
            warnLog('vxe.error.reqProp', ['keep-source'])
          }
        }
        return nextTick()
      },
      /**
       * 用于树结构，给行数据加载子节点
       */
      loadChildren (row, childRecords) {
        return this.createData(childRecords).then((rows) => {
          const { keepSource } = props
          const { fullDataRowIdData, fullAllDataRowIdData } = internalData
          const { tableSourceData } = internalData
          const treeOpts = computeTreeOpts.value
          const { children } = treeOpts
          if (keepSource) {
            const rowid = getRowid($xetable, row)
            const matchObj = XEUtils.findTree(tableSourceData, (item) => rowid === getRowid($xetable, item), treeOpts)
            if (matchObj) {
              matchObj.item[children] = XEUtils.clone(rows, true)
            }
          }
          XEUtils.eachTree(rows, (childRow, index, items, path, parent) => {
            const rowid = getRowid($xetable, childRow)
            const rest = { row: childRow, rowid, index: -1, _index: -1, $index: -1, items, parent }
            fullDataRowIdData[rowid] = rest
            fullAllDataRowIdData[rowid] = rest
          }, treeOpts)
          row[children] = rows
          return rows
        })
      },
      /**
       * 加载列配置
       * 对于表格列需要重载、局部递增场景下可能会用到
       * @param {ColumnInfo} columns 列配置
       */
      loadColumn (columns) {
        const collectColumn = XEUtils.mapTree(columns, column => Cell.createColumn($xetable, column))
        handleColumn(collectColumn)
        return nextTick()
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
       * 根据 row 获取相对于 data 中的索引
       * @param {Row} row 行对象
       */
      getRowIndex (row) {
        const { fullDataRowIdData } = internalData
        if (row) {
          const rowid = getRowid($xetable, row)
          const rest = fullDataRowIdData[rowid]
          if (rest) {
            return rest.index
          }
        }
        return -1
      },
      /**
       * 根据 row 获取相对于当前数据中的索引
       * @param {Row} row 行对象
       */
      getVTRowIndex (row) {
        const { fullDataRowIdData } = internalData
        if (row) {
          const rowid = getRowid($xetable, row)
          const rest = fullDataRowIdData[rowid]
          if (rest) {
            return rest._index
          }
        }
        return -1
      },
      /**
       * 根据 row 获取渲染中的虚拟索引
       * @param {Row} row 行对象
       */
      getVMRowIndex (row) {
        const { fullDataRowIdData } = internalData
        if (row) {
          const rowid = getRowid($xetable, row)
          const rest = fullDataRowIdData[rowid]
          if (rest) {
            return rest.$index
          }
        }
        return -1
      },
      /**
       * 根据 column 获取相对于 columns 中的索引
       * @param {ColumnInfo} column 列配置
       */
      getColumnIndex (column) {
        const { fullColumnIdData } = internalData
        if (column) {
          const rest = fullColumnIdData[column.id]
          if (rest) {
            return rest.index
          }
        }
        return -1
      },
      /**
       * 根据 column 获取相对于当前表格列中的索引
       * @param {ColumnInfo} column 列配置
       */
      getVTColumnIndex (column) {
        const { fullColumnIdData } = internalData
        if (column) {
          const rest = fullColumnIdData[column.id]
          if (rest) {
            return rest._index
          }
        }
        return -1
      },
      /**
       * 根据 column 获取渲染中的虚拟索引
       * @param {ColumnInfo} column 列配置
       */
      getVMColumnIndex (column) {
        const { fullColumnIdData } = internalData
        if (column) {
          const rest = fullColumnIdData[column.id]
          if (rest) {
            return rest.$index
          }
        }
        return -1
      },
      /**
       * 创建 data 对象
       * 对于某些特殊场景可能会用到，会自动对数据的字段名进行检测，如果不存在就自动定义
       * @param {Array} records 新数据
       */
      createData (records) {
        const { treeConfig } = props
        const treeOpts = computeTreeOpts.value
        const handleRrecord = (record: any) => tablePrivateMethods.defineField(Object.assign({}, record))
        const rows = treeConfig ? XEUtils.mapTree(records, handleRrecord, treeOpts) : records.map(handleRrecord)
        return nextTick().then(() => rows)
      },
      /**
       * 创建 Row|Rows 对象
       * 对于某些特殊场景需要对数据进行手动插入时可能会用到
       * @param {Array/Object} records 新数据
       */
      createRow (records) {
        const isArr = XEUtils.isArray(records)
        if (!isArr) {
          records = [records]
        }
        return nextTick().then(() => tableMethods.createData(records).then((rows) => isArr ? rows : rows[0]))
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
        const { tableSourceData, tableFullData } = internalData
        if (keepSource) {
          if (arguments.length) {
            if (rows && !XEUtils.isArray(rows)) {
              rows = [rows]
            }
            rows.forEach((row: any) => {
              if (!tableMethods.isInsertByRow(row)) {
                const rowIndex = $xetable.findRowIndexOf(tableFullData, row)
                const oRow = tableSourceData[rowIndex]
                if (oRow && row) {
                  if (field) {
                    XEUtils.set(row, field, XEUtils.clone(XEUtils.get(oRow, field), true))
                  } else {
                    XEUtils.destructuring(row, XEUtils.clone(oRow, true))
                  }
                }
              }
            })
            return nextTick()
          }
          return tableMethods.reloadData(tableSourceData)
        } else {
          if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
            warnLog('vxe.error.reqProp', ['keep-source'])
          }
        }
        return nextTick()
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
      clearData (rows: any, field: any) {
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
              if (column.property) {
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
        return $xetable.findRowIndexOf(editStore.insertList, row) > -1
      },
      /**
       * 检查行或列数据是否发生改变
       * @param {Row} row 行对象
       * @param {String} field 字段名
       */
      isUpdateByRow (row, field) {
        const { keepSource, treeConfig } = props
        const { visibleColumn, tableSourceData, fullDataRowIdData } = internalData
        const treeOpts = computeTreeOpts.value
        if (keepSource) {
          let oRow, property
          const rowid = getRowid($xetable, row)
          // 新增的数据不需要检测
          if (!fullDataRowIdData[rowid]) {
            return false
          }
          if (treeConfig) {
            const children = treeOpts.children
            const matchObj = XEUtils.findTree(tableSourceData, item => rowid === getRowid($xetable, item), treeOpts)
            row = Object.assign({}, row, { [children]: null })
            if (matchObj) {
              oRow = Object.assign({}, matchObj.item, { [children]: null })
            }
          } else {
            const oRowIndex = fullDataRowIdData[rowid].index
            oRow = tableSourceData[oRowIndex]
          }
          if (oRow) {
            if (arguments.length > 1) {
              return !eqCellValue(oRow, row, field as string)
            }
            for (let index = 0, len = visibleColumn.length; index < len; index++) {
              property = visibleColumn[index].property
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
        return fullColumnIdData[colid] ? fullColumnIdData[colid].column : null
      },
      /**
       * 根据列的字段名获取列
       * @param {String} field 字段名
       */
      getColumnByField (field) {
        const fullColumnFieldData = internalData.fullColumnFieldData
        return fullColumnFieldData[field] ? fullColumnFieldData[field].column : null
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
      getCheckboxRecords () {
        const { treeConfig } = props
        const { tableFullData } = internalData
        const treeOpts = computeTreeOpts.value
        const checkboxOpts = computeCheckboxOpts.value
        const { checkField: property } = checkboxOpts
        let rowList = []
        if (property) {
          if (treeConfig) {
            rowList = XEUtils.filterTree(tableFullData, row => XEUtils.get(row, property), treeOpts)
          } else {
            rowList = tableFullData.filter((row) => XEUtils.get(row, property))
          }
        } else {
          const { selection } = reactData
          if (treeConfig) {
            rowList = XEUtils.filterTree(tableFullData, row => $xetable.findRowIndexOf(selection, row) > -1, treeOpts)
          } else {
            rowList = tableFullData.filter((row) => $xetable.findRowIndexOf(selection, row) > -1)
          }
        }
        return rowList
      },
      /**
       * 根据行的唯一主键获取行
       * @param {String/Number} rowid 行主键
       */
      getRowById (rowid) {
        const { fullDataRowIdData } = internalData
        return fullDataRowIdData[rowid] ? fullDataRowIdData[rowid].row : null
      },
      /**
       * 根据行获取行的唯一主键
       * @param {Row} row 行对象
       */
      getRowid (row) {
        return getRowid($xetable, row)
      },
      /**
       * 获取处理后的表格数据
       * 如果存在筛选条件，继续处理
       * 如果存在排序，继续处理
       */
      getTableData () {
        const { tableData, footerTableData } = reactData
        const { tableFullData, afterFullData } = internalData
        return {
          fullData: tableFullData.slice(0),
          visibleData: afterFullData.slice(0),
          tableData: tableData.slice(0),
          footerData: footerTableData.slice(0)
        }
      },
      /**
       * 隐藏指定列
       */
      hideColumn (fieldOrColumn) {
        const column = handleFieldOrColumn($xetable, fieldOrColumn)
        if (column) {
          column.visible = false
        }
        return tablePrivateMethods.handleCustom()
      },
      /**
       * 显示指定列
       */
      showColumn (fieldOrColumn) {
        const column = handleFieldOrColumn($xetable, fieldOrColumn)
        if (column) {
          column.visible = true
        }
        return tablePrivateMethods.handleCustom()
      },
      /**
       * 手动重置列的显示隐藏、列宽拖动的状态；
       * 如果为 true 则重置所有状态
       * 如果已关联工具栏，则会同步更新
       */
      resetColumn (options) {
        const { tableFullColumn } = internalData
        const customOpts = computeCustomOpts.value
        const { checkMethod } = customOpts
        const opts = Object.assign({ visible: true, resizable: options === true }, options)
        tableFullColumn.forEach((column) => {
          if (opts.resizable) {
            column.resizeWidth = 0
          }
          if (!checkMethod || checkMethod({ column })) {
            column.visible = column.defaultVisible
          }
        })
        if (opts.resizable) {
          tablePrivateMethods.saveCustomResizable(true)
        }
        return tablePrivateMethods.handleCustom()
      },
      /**
       * 刷新列信息
       * 将固定的列左边、右边分别靠边
       */
      refreshColumn () {
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
        // 还原滚动条位置
        if (lastScrollLeft || lastScrollTop) {
          return restoreScroll(lastScrollLeft, lastScrollTop)
        }
        // 重置
        setScrollTop(tableBodyElem, lastScrollTop)
        setScrollTop(leftBodyElem, lastScrollTop)
        setScrollTop(rightBodyElem, lastScrollTop)
        setScrollLeft(tableFooterElem, lastScrollLeft)
        return nextTick()
      },
      /**
       * 计算单元格列宽，动态分配可用剩余空间
       * 支持 width=? width=?px width=?% min-width=? min-width=?px min-width=?%
       */
      recalculate (refull?: boolean) {
        const tableHeader = refTableHeader.value
        const tableBody = refTableBody.value
        const tableFooter = refTableFooter.value
        const bodyElem = tableBody ? tableBody.$el as HTMLDivElement : null
        const headerElem = tableHeader ? tableHeader.$el as HTMLDivElement : null
        const footerElem = tableFooter ? tableFooter.$el as HTMLDivElement : null
        if (bodyElem) {
          autoCellWidth(headerElem, bodyElem, footerElem)
          if (refull === true) {
            // 初始化时需要在列计算之后再执行优化运算，达到最优显示效果
            return computeScrollLoad().then(() => {
              autoCellWidth(headerElem, bodyElem, footerElem)
              return computeScrollLoad()
            })
          }
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
        const { tooltipStore } = internalData
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
       * 判断复选框是否全选
       */
      isAllCheckboxChecked () {
        return reactData.isAllSelected
      },
      /**
       * 判断复选框是否半选
       */
      isCheckboxIndeterminate () {
        return !reactData.isAllSelected && reactData.isIndeterminate
      },
      /**
       * 获取复选框半选状态的行数据
       */
      getCheckboxIndeterminateRecords () {
        const { treeConfig } = props
        const { treeIndeterminates } = reactData
        if (treeConfig) {
          return treeIndeterminates.slice(0)
        }
        return []
      },
      /**
       * 用于多选行，设置行为选中状态，第二个参数为选中与否
       * @param {Array/Row} rows 行数据
       * @param {Boolean} value 是否选中
       */
      setCheckboxRow (rows, value) {
        if (rows && !XEUtils.isArray(rows)) {
          rows = [rows]
        }
        (rows as any[]).forEach((row) => tablePrivateMethods.handleSelectRow({ row }, !!value))
        return nextTick()
      },
      isCheckedByCheckboxRow (row) {
        const { selection } = reactData
        const checkboxOpts = computeCheckboxOpts.value
        const { checkField: property } = checkboxOpts
        if (property) {
          return XEUtils.get(row, property)
        }
        return $xetable.findRowIndexOf(selection, row) > -1
      },
      /**
       * 多选，切换某一行的选中状态
       */
      toggleCheckboxRow (row) {
        tablePrivateMethods.handleToggleCheckRowEvent(null, { row })
        return nextTick()
      },
      /**
       * 用于多选行，设置所有行的选中状态
       * @param {Boolean} value 是否选中
       */
      setAllCheckboxRow (value) {
        const { treeConfig } = props
        const { selection } = reactData
        const { afterFullData, checkboxReserveRowMap } = internalData
        const treeOpts = computeTreeOpts.value
        const checkboxOpts = computeCheckboxOpts.value
        const { checkField: property, reserve, checkStrictly, checkMethod } = checkboxOpts
        let selectRows: any[] = []
        const beforeSelection = treeConfig ? [] : selection.filter((row) => $xetable.findRowIndexOf(afterFullData, row) === -1)
        if (checkStrictly) {
          reactData.isAllSelected = value
        } else {
          /**
           * 绑定属性方式（高性能，有污染）
           * 必须在行数据存在对应的属性，否则将不响应
           */
          if (property) {
            const checkValFn = (row: any) => {
              if (!checkMethod || checkMethod({ row })) {
                if (value) {
                  selectRows.push(row)
                }
                XEUtils.set(row, property, value)
              }
            }
            // 如果存在选中方法
            // 如果方法成立，则更新值，否则忽略该数据
            if (treeConfig) {
              XEUtils.eachTree(afterFullData, checkValFn, treeOpts)
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
                  if (!checkMethod || checkMethod({ row })) {
                    selectRows.push(row)
                  }
                }, treeOpts)
              } else {
                /**
                 * 如果是树取消
                 * 如果方法成立，则不添加到临时集合中
                 */
                if (checkMethod) {
                  XEUtils.eachTree(afterFullData, (row) => {
                    if (checkMethod({ row }) ? 0 : $xetable.findRowIndexOf(selection, row) > -1) {
                      selectRows.push(row)
                    }
                  }, treeOpts)
                }
              }
            } else {
              if (value) {
                /**
                 * 如果是行勾选
                 * 如果存在选中方法且成立或者本身已勾选，则添加到临时集合中
                 * 如果不存在选中方法，则添加所有数据到临时集合中
                 */
                if (checkMethod) {
                  selectRows = afterFullData.filter((row) => $xetable.findRowIndexOf(selection, row) > -1 || checkMethod({ row }))
                } else {
                  selectRows = afterFullData.slice(0)
                }
              } else {
                /**
                 * 如果是行取消
                 * 如果方法成立，则不添加到临时集合中；如果方法不成立则判断当前是否已勾选，如果已被勾选则添加到新集合中
                 * 如果不存在选中方法，无需处理，临时集合默认为空
                 */
                if (checkMethod) {
                  selectRows = afterFullData.filter((row) => checkMethod({ row }) ? 0 : $xetable.findRowIndexOf(selection, row) > -1)
                }
              }
            }
          }
          if (reserve) {
            if (value) {
              selectRows.forEach((row) => {
                checkboxReserveRowMap[getRowid($xetable, row)] = row
              })
            } else {
              afterFullData.forEach((row) => handleCheckboxReserveRow(row, false))
            }
          }
          reactData.selection = property ? [] : beforeSelection.concat(selectRows)
        }
        reactData.treeIndeterminates = []
        tablePrivateMethods.checkSelectionStatus()
        return nextTick()
      },
      /**
       * 获取单选框保留选中的行
       */
      getRadioReserveRecord () {
        const { fullDataRowIdData, radioReserveRow } = internalData
        const radioOpts = computeRadioOpts.value
        if (radioOpts.reserve && radioReserveRow) {
          if (!fullDataRowIdData[getRowid($xetable, radioReserveRow)]) {
            return radioReserveRow
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
      getCheckboxReserveRecords () {
        const { fullDataRowIdData, checkboxReserveRowMap } = internalData
        const checkboxOpts = computeCheckboxOpts.value
        const reserveSelection: any[] = []
        if (checkboxOpts.reserve) {
          XEUtils.each(checkboxReserveRowMap, (row, rowid) => {
            if (row && !fullDataRowIdData[rowid]) {
              reserveSelection.push(row)
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
        const checkboxOpts = computeCheckboxOpts.value
        const { checkField: property, reserve } = checkboxOpts
        if (property) {
          if (treeConfig) {
            XEUtils.eachTree(tableFullData, item => XEUtils.set(item, property, false), treeOpts)
          } else {
            tableFullData.forEach((item) => XEUtils.set(item, property, false))
          }
        }
        if (reserve) {
          tableFullData.forEach((row) => handleCheckboxReserveRow(row, false))
        }
        reactData.isAllSelected = false
        reactData.isIndeterminate = false
        reactData.selection = []
        reactData.treeIndeterminates = []
        return nextTick()
      },
      /**
       * 用于当前行，设置某一行为高亮状态
       * @param {Row} row 行对象
       */
      setCurrentRow (row) {
        const el = refElem.value
        tableMethods.clearCurrentRow()
        tableMethods.clearCurrentColumn()
        reactData.currentRow = row
        if (props.highlightCurrentRow) {
          if (el) {
            XEUtils.arrayEach(el.querySelectorAll(`[rowid="${getRowid($xetable, row)}"]`), elem => addClass(elem, 'row--current'))
          }
        }
        return nextTick()
      },
      isCheckedByRadioRow (row) {
        return reactData.selectRow === row
      },
      /**
       * 用于单选行，设置某一行为选中状态
       * @param {Row} row 行对象
       */
      setRadioRow (row) {
        const radioOpts = computeRadioOpts.value
        const { checkMethod } = radioOpts
        if (row && (!checkMethod || checkMethod({ row }))) {
          reactData.selectRow = row
          handleRadioReserveRow(row)
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
        reactData.selectRow = null
        return nextTick()
      },
      /**
       * 用于当前行，获取当前行的数据
       */
      getCurrentRecord () {
        return props.highlightCurrentRow ? reactData.currentRow : null
      },
      /**
       * 用于单选行，获取当已选中的数据
       */
      getRadioRecord () {
        return reactData.selectRow
      },
      getCurrentColumn () {
        return props.highlightCurrentColumn ? reactData.currentColumn : null
      },
      /**
       * 用于当前列，设置某列行为高亮状态
       */
      setCurrentColumn (fieldOrColumn) {
        const column = handleFieldOrColumn($xetable, fieldOrColumn)
        if (column) {
          tableMethods.clearCurrentRow()
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
      sort (sortConfs: any, sortOrder?: any) {
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
          (multiple ? sortConfs : [sortConfs[0]]).forEach((confs: any) => {
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
              column.sortTime = Date.now()
            }
          })
          // 如果是服务端排序，则跳过本地排序处理
          if (!remote) {
            tablePrivateMethods.handleTableData(true)
          }
          return nextTick().then(updateStyle)
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
          const column = handleFieldOrColumn($xetable, fieldOrColumn)
          if (column) {
            column.order = null
          }
        } else {
          clearAllSort()
        }
        if (!sortOpts.remote) {
          return tablePrivateMethods.handleTableData(true)
        }
        return nextTick()
      },
      isSort (fieldOrColumn) {
        if (fieldOrColumn) {
          const column = handleFieldOrColumn($xetable, fieldOrColumn)
          return column ? column.sortable && !!column.order : false
        }
        return tableMethods.getSortColumns().length > 0
      },
      getSortColumns () {
        const sortList: any[] = []
        const { tableFullColumn } = internalData
        tableFullColumn.forEach((column) => {
          const { order } = column
          if (column.sortable && order) {
            sortList.push({ column, property: column.property, order })
          }
        })
        return sortList
      },
      /**
       * 关闭筛选
       * @param {Event} evnt 事件
       */
      closeFilter () {
        const { filterStore } = reactData
        Object.assign(filterStore, {
          isAllSelected: false,
          isIndeterminate: false,
          options: [],
          visible: false
        })
        return nextTick()
      },
      /**
       * 判断指定列是否为筛选状态，如果为空则判断所有列
       * @param {String} fieldOrColumn 字段名
       */
      isFilter (fieldOrColumn) {
        const column = handleFieldOrColumn($xetable, fieldOrColumn)
        if (column) {
          return column.filters && column.filters.some((option) => option.checked)
        }
        return $xetable.getCheckedFilters().length > 0
      },
      /**
       * 判断展开行是否懒加载完成
       * @param {Row} row 行对象
       */
      isRowExpandLoaded (row) {
        const { fullAllDataRowIdData } = internalData
        const rest = fullAllDataRowIdData[getRowid($xetable, row)]
        return rest && !!rest.expandLoaded
      },
      clearRowExpandLoaded (row) {
        const { expandLazyLoadeds } = reactData
        const { fullAllDataRowIdData } = internalData
        const expandOpts = computeExpandOpts.value
        const { lazy } = expandOpts
        const rest = fullAllDataRowIdData[getRowid($xetable, row)]
        if (lazy && rest) {
          rest.expandLoaded = false
          XEUtils.remove(expandLazyLoadeds, item => row === item)
        }
        return nextTick()
      },
      /**
       * 重新加载展开行的内容
       * @param {Row} row 行对象
       */
      reloadExpandContent (row) {
        const { expandLazyLoadeds } = reactData
        const expandOpts = computeExpandOpts.value
        const { lazy } = expandOpts
        if (lazy && $xetable.findRowIndexOf(expandLazyLoadeds, row) === -1) {
          tableMethods.clearRowExpandLoaded(row)
            .then(() => handleAsyncRowExpand(row))
        }
        return nextTick()
      },
      /**
       * 切换展开行
       */
      toggleRowExpand (row) {
        return tableMethods.setRowExpand(row, !tableMethods.isExpandByRow(row))
      },
      /**
       * 设置所有行的展开与否
       * @param {Boolean} expanded 是否展开
       */
      setAllRowExpand (expanded) {
        const expandOpts = computeExpandOpts.value
        return tableMethods.setRowExpand(expandOpts.lazy ? reactData.tableData : internalData.tableFullData, expanded)
      },
      /**
       * 设置展开行，二个参数设置这一行展开与否
       * 支持单行
       * 支持多行
       * @param {Array/Row} rows 行数据
       * @param {Boolean} expanded 是否展开
       */
      setRowExpand (rows, expanded) {
        let { rowExpandeds, expandLazyLoadeds, expandColumn: column } = reactData
        const { fullAllDataRowIdData } = internalData
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
            rowExpandeds = []
            rows = rows.slice(rows.length - 1, rows.length)
          }
          const validRows = toggleMethod ? rows.filter((row: any) => toggleMethod({ $table: $xetable, expanded, column, columnIndex, $columnIndex, row, rowIndex: tableMethods.getRowIndex(row), $rowIndex: tableMethods.getVMRowIndex(row) })) : rows
          if (expanded) {
            validRows.forEach((row: any) => {
              if ($xetable.findRowIndexOf(rowExpandeds, row) === -1) {
                const rest = fullAllDataRowIdData[getRowid($xetable, row)]
                const isLoad = lazy && !rest.expandLoaded && $xetable.findRowIndexOf(expandLazyLoadeds, row) === -1
                if (isLoad) {
                  lazyRests.push(handleAsyncRowExpand(row))
                } else {
                  rowExpandeds.push(row)
                }
              }
            })
          } else {
            XEUtils.remove(rowExpandeds, row => $xetable.findRowIndexOf(validRows, row) > -1)
          }
          if (reserve) {
            validRows.forEach((row: any) => handleRowExpandReserve(row, expanded))
          }
        }
        reactData.rowExpandeds = rowExpandeds
        return Promise.all(lazyRests).then(() => tableMethods.recalculate())
      },
      /**
       * 判断行是否为展开状态
       * @param {Row} row 行对象
       */
      isExpandByRow (row) {
        const { rowExpandeds } = reactData
        return $xetable.findRowIndexOf(rowExpandeds, row) > -1
      },
      /**
       * 手动清空展开行状态，数据会恢复成未展开的状态
       */
      clearRowExpand () {
        const { rowExpandeds } = reactData
        const { tableFullData } = internalData
        const expandOpts = computeExpandOpts.value
        const { reserve } = expandOpts
        const isExists = rowExpandeds.length
        reactData.rowExpandeds = []
        if (reserve) {
          tableFullData.forEach((row) => handleRowExpandReserve(row, false))
        }
        return nextTick().then(() => {
          if (isExists) {
            tableMethods.recalculate()
          }
        })
      },
      clearRowExpandReserve () {
        internalData.rowExpandedReserveRowMap = {}
        return nextTick()
      },
      getRowExpandRecords () {
        return reactData.rowExpandeds.slice(0)
      },
      getTreeExpandRecords () {
        return reactData.treeExpandeds.slice(0)
      },
      /**
       * 判断树节点是否懒加载完成
       * @param {Row} row 行对象
       */
      isTreeExpandLoaded (row) {
        const { fullAllDataRowIdData } = internalData
        const rest = fullAllDataRowIdData[getRowid($xetable, row)]
        return rest && !!rest.treeLoaded
      },
      clearTreeExpandLoaded (row) {
        const { treeExpandeds } = reactData
        const { fullAllDataRowIdData } = internalData
        const treeOpts = computeTreeOpts.value
        const { lazy } = treeOpts
        const rest = fullAllDataRowIdData[getRowid($xetable, row)]
        if (lazy && rest) {
          rest.treeLoaded = false
          XEUtils.remove(treeExpandeds, item => row === item)
        }
        return nextTick()
      },
      /**
       * 重新加载树的子节点
       * @param {Row} row 行对象
       */
      reloadTreeChilds (row) {
        const { treeLazyLoadeds } = reactData
        const treeOpts = computeTreeOpts.value
        const { lazy, hasChild } = treeOpts
        if (lazy && row[hasChild] && $xetable.findRowIndexOf(treeLazyLoadeds, row) === -1) {
          tableMethods.clearTreeExpandLoaded(row)
            .then(() => handleAsyncTreeExpandChilds(row))
        }
        return nextTick()
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
        const { lazy, children } = treeOpts
        const expandeds: any[] = []
        XEUtils.eachTree(tableFullData, (row) => {
          const rowChildren = row[children]
          if (lazy || (rowChildren && rowChildren.length)) {
            expandeds.push(row)
          }
        }, treeOpts)
        return tableMethods.setTreeExpand(expandeds, expanded)
      },
      /**
       * 设置展开树形节点，二个参数设置这一行展开与否
       * 支持单行
       * 支持多行
       * @param {Array/Row} rows 行数据
       * @param {Boolean} expanded 是否展开
       */
      setTreeExpand (rows, expanded) {
        const { treeExpandeds, treeLazyLoadeds, treeNodeColumn } = reactData
        const { fullAllDataRowIdData, tableFullData } = internalData
        const treeOpts = computeTreeOpts.value
        const { reserve, lazy, hasChild, children, accordion, toggleMethod } = treeOpts
        const result: any[] = []
        const columnIndex = tableMethods.getColumnIndex(treeNodeColumn)
        const $columnIndex = tableMethods.getVMColumnIndex(treeNodeColumn)
        if (rows) {
          if (!XEUtils.isArray(rows)) {
            rows = [rows]
          }
          if (rows.length) {
            let validRows = toggleMethod ? rows.filter((row: any) => toggleMethod({ $table: $xetable, expanded, column: treeNodeColumn, columnIndex, $columnIndex, row })) : rows
            if (accordion) {
              validRows = validRows.length ? [validRows[validRows.length - 1]] : []
              // 同一级只能展开一个
              const matchObj = XEUtils.findTree(tableFullData, item => item === validRows[0], treeOpts)
              if (matchObj) {
                XEUtils.remove(treeExpandeds, item => matchObj.items.indexOf(item) > -1)
              }
            }
            if (expanded) {
              validRows.forEach((row: any) => {
                if ($xetable.findRowIndexOf(treeExpandeds, row) === -1) {
                  const rest = fullAllDataRowIdData[getRowid($xetable, row)]
                  const isLoad = lazy && row[hasChild] && !rest.treeLoaded && $xetable.findRowIndexOf(treeLazyLoadeds, row) === -1
                  // 是否使用懒加载
                  if (isLoad) {
                    result.push(handleAsyncTreeExpandChilds(row))
                  } else {
                    if (row[children] && row[children].length) {
                      treeExpandeds.push(row)
                    }
                  }
                }
              })
            } else {
              XEUtils.remove(treeExpandeds, row => $xetable.findRowIndexOf(validRows, row) > -1)
            }
            if (reserve) {
              validRows.forEach((row: any) => handleTreeExpandReserve(row, expanded))
            }
            return Promise.all(result).then(() => {
              return tableMethods.recalculate()
            })
          }
        }
        return nextTick()
      },
      /**
       * 判断行是否为树形节点展开状态
       * @param {Row} row 行对象
       */
      isTreeExpandByRow (row) {
        const { treeExpandeds } = reactData
        return $xetable.findRowIndexOf(treeExpandeds, row) > -1
      },
      /**
       * 手动清空树形节点的展开状态，数据会恢复成未展开的状态
       */
      clearTreeExpand () {
        const { treeExpandeds } = reactData
        const { tableFullData } = internalData
        const treeOpts = computeTreeOpts.value
        const { reserve } = treeOpts
        const isExists = treeExpandeds.length
        reactData.treeExpandeds = []
        if (reserve) {
          XEUtils.eachTree(tableFullData, row => handleTreeExpandReserve(row, false), treeOpts)
        }
        return nextTick().then(() => {
          if (isExists) {
            tableMethods.recalculate()
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
          return new Promise(resolve => setTimeout(() => resolve(nextTick()), 50))
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
            rest.push(rowToVisible($xetable, row))
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
        const column = handleFieldOrColumn($xetable, fieldOrColumn)
        if (column && fullColumnIdData[column.id]) {
          return colToVisible($xetable, column)
        }
        return nextTick()
      },
      /**
       * 手动清除滚动相关信息，还原到初始状态
       */
      clearScroll () {
        const tableBody = refTableBody.value
        const tableFooter = refTableFooter.value
        const rightBody = refTableRightBody.value
        const tableBodyElem = tableBody ? tableBody.$el as HTMLDivElement : null
        const rightBodyElem = rightBody ? rightBody.$el as HTMLDivElement : null
        const tableFooterElem = tableFooter ? tableFooter.$el as HTMLDivElement : null
        if (rightBodyElem) {
          rightBodyElem.scrollTop = 0
        }
        if (tableFooterElem) {
          tableFooterElem.scrollLeft = 0
        }
        if (tableBodyElem) {
          tableBodyElem.scrollTop = 0
          tableBodyElem.scrollLeft = 0
        }
        return nextTick()
      },
      /**
       * 更新表尾合计
       */
      updateFooter () {
        const { showFooter, footerMethod } = props
        const { visibleColumn, afterFullData } = internalData
        if (showFooter && footerMethod) {
          reactData.footerTableData = visibleColumn.length ? footerMethod({ columns: visibleColumn, data: afterFullData, $table: $xetable, $grid: $xegrid }) : []
        }
        return nextTick()
      },
      /**
       * 更新列状态
       * 如果组件值 v-model 发生 change 时，调用改函数用于更新某一列编辑状态
       * 如果单元格配置了校验规则，则会进行校验
       */
      updateStatus (scope, cellValue) {
        const customVal = !XEUtils.isUndefined(cellValue)
        return nextTick().then(() => {
          const { editRules } = props
          const { validStore } = reactData
          const tableBody = refTableBody.value
          if (scope && tableBody && editRules) {
            const { row, column } = scope
            const type = 'change'
            if ($xetable.hasCellRules) {
              if ($xetable.hasCellRules(type, row, column)) {
                const cell = tablePrivateMethods.getCell(row, column)
                if (cell) {
                  return $xetable.validCellRules(type, row, column, cellValue)
                    .then(() => {
                      if (customVal && validStore.visible) {
                        setCellValue(row, column, cellValue)
                      }
                      $xetable.clearValidate()
                    })
                    .catch(({ rule }) => {
                      if (customVal) {
                        setCellValue(row, column, cellValue)
                      }
                      $xetable.showValidTooltip({ rule, row, column, cell })
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
        return nextTick().then(() => tablePrivateMethods.updateCellAreas())
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
          tablePrivateMethods.updateCellAreas()
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
        return nextTick()
      },
      setMergeFooterItems (merges) {
        if (props.footerSpanMethod) {
          errLog('vxe.error.errConflicts', ['merge-footer-items', 'footer-span-method'])
        }
        setMerges(merges, reactData.mergeFooterList)
        return nextTick().then(() => tablePrivateMethods.updateCellAreas())
      },
      removeMergeFooterItems (merges) {
        if (props.footerSpanMethod) {
          errLog('vxe.error.errConflicts', ['merge-footer-items', 'footer-span-method'])
        }
        const rest = removeMerges(merges, reactData.mergeFooterList)
        return nextTick().then(() => {
          tablePrivateMethods.updateCellAreas()
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
          $xetoolbar = $toolbar
          $xetoolbar.syncUpdate({ collectColumn: internalData.collectColumn, $table: $xetable })
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
      const { editStore, ctxMenuStore, filterStore } = reactData
      const { mouseConfig } = props
      const el = refElem.value
      const editOpts = computeEditOpts.value
      const { actived } = editStore
      const $validTooltip = refValidTooltip.value
      const tableFilter = refTableFilter.value
      const tableMenu = refTableMenu.value
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
                tablePrivateMethods.preventEvent(evnt, 'event.clearActived', actived.args, () => {
                  let isClear
                  if (editOpts.mode === 'row') {
                    const rowTargetNode = getEventTargetNode(evnt, el, 'vxe-body--row')
                    const rowNodeRest = rowTargetNode.flag ? tableMethods.getRowNode(rowTargetNode.targetElem) : null
                    // row 方式，如果点击了不同行
                    isClear = rowNodeRest ? !$xetable.eqRow(rowNodeRest.item, actived.args.row) : false
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
                    setTimeout(() => $xetable.clearActived(evnt))
                  }
                })
              }
            }
          }
        }
      } else if (mouseConfig) {
        if (!getEventTargetNode(evnt, el).flag && !($xegrid && getEventTargetNode(evnt, $xegrid.getRefMaps().refElem.value).flag) && !(tableMenu && getEventTargetNode(evnt, tableMenu.getRefMaps().refElem.value).flag) && !($xetoolbar && getEventTargetNode(evnt, $xetoolbar.getRefMaps().refElem.value).flag)) {
          $xetable.clearSelected()
          if ($xetable.clearCellAreas) {
            if (!getEventTargetNode(evnt, document.body, 'vxe-table--ignore-areas-clear').flag) {
              tablePrivateMethods.preventEvent(evnt, 'event.clearAreas', {}, () => {
                $xetable.clearCellAreas()
                $xetable.clearCopyCellArea()
              })
            }
          }
        }
      }
      // 如果配置了快捷菜单且，点击了其他地方则关闭
      if ($xetable.closeMenu) {
        if (ctxMenuStore.visible && tableMenu && !getEventTargetNode(evnt, tableMenu.getRefMaps().refElem.value).flag) {
          $xetable.closeMenu()
        }
      }
      // 最后激活的表格
      internalData.isActivated = getEventTargetNode(evnt, $xegrid ? $xegrid.getRefMaps().refElem.value : el).flag
    }

    /**
     * 窗口失焦事件处理
     */
    const handleGlobalBlurEvent = () => {
      tableMethods.closeFilter()
      if ($xetable.closeMenu) {
        $xetable.closeMenu()
      }
    }

    /**
     * 全局滚动事件
     */
    const handleGlobalMousewheelEvent = () => {
      tableMethods.closeTooltip()
      if ($xetable.closeMenu) {
        $xetable.closeMenu()
      }
    }

    /**
     * 表格键盘事件
     */
    const keydownEvent = (evnt: KeyboardEvent) => {
      const { mouseConfig, keyboardConfig } = props
      const { filterStore, ctxMenuStore, editStore } = reactData
      const mouseOpts = computeMouseOpts.value
      const { actived } = editStore
      const keyCode = evnt.keyCode
      const isEsc = keyCode === 27
      if (isEsc) {
        tablePrivateMethods.preventEvent(evnt, 'event.keydown', null, () => {
          if (keyboardConfig && mouseConfig && mouseOpts.area && $xetable.handleKeyboardEvent) {
            $xetable.handleKeyboardEvent(evnt)
          } else if (actived.row || filterStore.visible || ctxMenuStore.visible) {
            evnt.stopPropagation()
            // 如果按下了 Esc 键，关闭快捷菜单、筛选
            $xetable.closeMenu()
            tableMethods.closeFilter()
            // 如果是激活编辑状态，则取消编辑
            if (actived.row) {
              const params = actived.args
              $xetable.clearActived(evnt)
              // 如果配置了选中功能，则为选中状态
              if (mouseOpts.selected) {
                nextTick(() => $xetable.handleSelected(params, evnt))
              }
            }
          }
          tableMethods.dispatchEvent('keydown', {}, evnt)
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
          const { selected, actived } = editStore
          const keyCode = evnt.keyCode
          const isBack = keyCode === 8
          const isTab = keyCode === 9
          const isEnter = keyCode === 13
          const isSpacebar = keyCode === 32
          const isLeftArrow = keyCode === 37
          const isUpArrow = keyCode === 38
          const isRightArrow = keyCode === 39
          const isDwArrow = keyCode === 40
          const isDel = keyCode === 46
          const isF2 = keyCode === 113
          const isContextMenu = keyCode === 93
          const hasMetaKey = evnt.metaKey
          const hasCtrlKey = evnt.ctrlKey
          const hasShiftKey = evnt.shiftKey
          const isAltKey = evnt.altKey
          const operArrow = isLeftArrow || isUpArrow || isRightArrow || isDwArrow
          const operCtxMenu = isMenu && ctxMenuStore.visible && (isEnter || isSpacebar || operArrow)
          const isEditStatus = editConfig && actived.column && actived.row
          let params: any
          if (operCtxMenu) {
            // 如果配置了右键菜单; 支持方向键操作、回车
            evnt.preventDefault()
            if (ctxMenuStore.showChild && hasChildrenList(ctxMenuStore.selected)) {
              $xetable.moveCtxMenu(evnt, keyCode, ctxMenuStore, 'selectChild', 37, false, ctxMenuStore.selected.children)
            } else {
              $xetable.moveCtxMenu(evnt, keyCode, ctxMenuStore, 'selected', 39, true, menuList)
            }
          } else if (keyboardConfig && mouseConfig && mouseOpts.area && $xetable.handleKeyboardEvent) {
            $xetable.handleKeyboardEvent(evnt)
          } else if (isSpacebar && keyboardConfig && keyboardOpts.isChecked && selected.row && selected.column && (selected.column.type === 'checkbox' || selected.column.type === 'radio')) {
            // 空格键支持选中复选框
            evnt.preventDefault()
            if (selected.column.type === 'checkbox') {
              tablePrivateMethods.handleToggleCheckRowEvent(evnt, selected.args)
            } else {
              tablePrivateMethods.triggerRadioRowEvent(evnt, selected.args)
            }
          } else if (isF2) {
            if (!isEditStatus) {
              // 如果按下了 F2 键
              if (selected.row && selected.column) {
                evnt.preventDefault()
                $xetable.handleActived(selected.args, evnt)
              }
            }
          } else if (isContextMenu) {
            // 如果按下上下文键
            internalData._keyCtx = selected.row && selected.column && bodyMenu.length
            clearTimeout(keyCtxTimeout)
            keyCtxTimeout = setTimeout(() => {
              internalData._keyCtx = false
            }, 1000)
          } else if (isEnter && !isAltKey && keyboardConfig && keyboardOpts.isEnter && (selected.row || actived.row || (treeConfig && highlightCurrentRow && currentRow))) {
            // 退出选中
            if (hasCtrlKey) {
              // 如果是激活编辑状态，则取消编辑
              if (actived.row) {
                params = actived.args
                $xetable.clearActived(evnt)
                // 如果配置了选中功能，则为选中状态
                if (mouseOpts.selected) {
                  nextTick(() => $xetable.handleSelected(params, evnt))
                }
              }
            } else {
              // 如果是激活状态，退则出到上一行/下一行
              if (selected.row || actived.row) {
                const targetArgs = selected.row ? selected.args : actived.args
                if (hasShiftKey) {
                  if (keyboardOpts.enterToTab) {
                    $xetable.moveTabSelected(targetArgs, hasShiftKey, evnt)
                  } else {
                    $xetable.moveSelected(targetArgs, isLeftArrow, true, isRightArrow, false, evnt)
                  }
                } else {
                  if (keyboardOpts.enterToTab) {
                    $xetable.moveTabSelected(targetArgs, hasShiftKey, evnt)
                  } else {
                    $xetable.moveSelected(targetArgs, isLeftArrow, false, isRightArrow, true, evnt)
                  }
                }
              } else if (treeConfig && highlightCurrentRow && currentRow) {
                // 如果是树形表格当前行回车移动到子节点
                const childrens = currentRow[treeOpts.children]
                if (childrens && childrens.length) {
                  evnt.preventDefault()
                  const targetRow = childrens[0]
                  params = {
                    $table: $xetable,
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
                $xetable.moveSelected(selected.args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow, evnt)
              } else if ((isUpArrow || isDwArrow) && highlightCurrentRow) {
                // 当前行按键上下移动
                $xetable.moveCurrentRow(isUpArrow, isDwArrow, evnt)
              }
            }
          } else if (isTab && keyboardConfig && keyboardOpts.isTab) {
            // 如果按下了 Tab 键切换
            if (selected.row || selected.column) {
              $xetable.moveTabSelected(selected.args, hasShiftKey, evnt)
            } else if (actived.row || actived.column) {
              $xetable.moveTabSelected(actived.args, hasShiftKey, evnt)
            }
          } else if (keyboardConfig && (isDel || (treeConfig && highlightCurrentRow && currentRow ? isBack && keyboardOpts.isArrow : isBack))) {
            if (!isEditStatus) {
              const { delMethod, backMethod } = keyboardOpts
              // 如果是删除键
              if (keyboardOpts.isDel && (selected.row || selected.column)) {
                if (delMethod) {
                  delMethod({
                    row: selected.row,
                    rowIndex: tableMethods.getRowIndex(selected.row),
                    column: selected.column,
                    columnIndex: tableMethods.getColumnIndex(selected.column),
                    $table: $xetable
                  })
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
                      $table: $xetable
                    })
                  } else {
                    $xetable.handleActived(selected.args, evnt)
                  }
                } else if (isDel) {
                  // 如果按下 del 键，更新表尾数据
                  tableMethods.updateFooter()
                }
              } else if (isBack && keyboardOpts.isArrow && treeConfig && highlightCurrentRow && currentRow) {
                // 如果树形表格回退键关闭当前行返回父节点
                const { parent: parentRow } = XEUtils.findTree(internalData.afterFullData, item => item === currentRow, treeOpts)
                if (parentRow) {
                  evnt.preventDefault()
                  params = {
                    $table: $xetable,
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
          } else if (keyboardConfig && keyboardOpts.isEdit && !hasCtrlKey && !hasMetaKey && (isSpacebar || (keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 96 && keyCode <= 111) || (keyCode >= 186 && keyCode <= 192) || (keyCode >= 219 && keyCode <= 222))) {
            const { editMethod } = keyboardOpts
            // 启用编辑后，空格键功能将失效
            // if (isSpacebar) {
            //   evnt.preventDefault()
            // }
            // 如果是按下非功能键之外允许直接编辑
            if (selected.column && selected.row && isEnableConf(selected.column.editRender)) {
              if (!editOpts.activeMethod || editOpts.activeMethod(selected.args)) {
                if (editMethod) {
                  editMethod({
                    row: selected.row,
                    rowIndex: tableMethods.getRowIndex(selected.row),
                    column: selected.column,
                    columnIndex: tableMethods.getColumnIndex(selected.column),
                    $table: $xetable
                  })
                } else {
                  setCellValue(selected.row, selected.column, null)
                  $xetable.handleActived(selected.args, evnt)
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
          if (keyboardConfig && keyboardOpts.isClip && mouseConfig && mouseOpts.area && $xetable.handlePasteCellAreaEvent) {
            $xetable.handlePasteCellAreaEvent(evnt)
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
          if (keyboardConfig && keyboardOpts.isClip && mouseConfig && mouseOpts.area && $xetable.handleCopyCellAreaEvent) {
            $xetable.handleCopyCellAreaEvent(evnt)
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
          if (keyboardConfig && keyboardOpts.isClip && mouseConfig && mouseOpts.area && $xetable.handleCutCellAreaEvent) {
            $xetable.handleCutCellAreaEvent(evnt)
          }
        }
        tableMethods.dispatchEvent('cut', {}, evnt)
      }
    }

    const handleGlobalResizeEvent = () => {
      if ($xetable.closeMenu) {
        $xetable.closeMenu()
      }
      tablePrivateMethods.updateCellAreas()
      tableMethods.recalculate(true)
    }

    const handleTargetEnterEvent = () => {
      clearTimeout(internalData.tooltipTimeout)
      internalData.tooltipActive = true
      tableMethods.closeTooltip()
    }

    /**
     * 处理显示 tooltip
     * @param {Event} evnt 事件
     * @param {ColumnInfo} column 列配置
     * @param {Row} row 行对象
     */
    const handleTooltip = (evnt: MouseEvent, cell: any, overflowElem: any, tipElem: any, params: any) => {
      params.cell = cell
      const { tooltipStore } = internalData
      const tooltipOpts = computeTooltipOpts.value
      const { column, row } = params
      const { showAll, contentMethod } = tooltipOpts
      const $tooltip = refTooltip.value
      const customContent = contentMethod ? contentMethod(params) : null
      const useCustom = contentMethod && !XEUtils.eqNull(customContent)
      const content = useCustom ? customContent : (column.type === 'html' ? overflowElem.innerText : overflowElem.textContent).trim()
      const isCellOverflow = overflowElem.scrollWidth > overflowElem.clientWidth
      if (content && (showAll || useCustom || isCellOverflow)) {
        Object.assign(tooltipStore, {
          row,
          column,
          visible: true
        })
        if ($tooltip) {
          $tooltip.open(isCellOverflow ? overflowElem : (tipElem || overflowElem), formatText(content))
        }
      }
      return nextTick()
    }

    /**
     * 内部方法
     */
    tablePrivateMethods = {
      updateAfterDataIndex,
      callSlot (slotFunc, params) {
        if (slotFunc) {
          if ($xegrid) {
            return $xegrid.callSlot(slotFunc, params)
          }
          if (XEUtils.isFunction(slotFunc)) {
            return slotFunc(params)
          }
        }
        return []
      },
      /**
       * 获取父容器元素
       */
      getParentElem () {
        const el = refElem.value
        if ($xegrid) {
          const gridEl = $xegrid.getRefMaps().refElem.value
          return gridEl.parentNode as HTMLElement
        }
        return el.parentNode as HTMLElement
      },
      /**
       * 获取父容器的高度
       */
      getParentHeight () {
        const { height } = props
        const el = refElem.value
        const parentElem = el.parentNode as HTMLElement
        const parentPaddingSize = height === 'auto' ? getPaddingTopBottomSize(parentElem) : 0
        return Math.floor($xegrid ? $xegrid.getParentHeight() : XEUtils.toNumber(getComputedStyle(parentElem).height) - parentPaddingSize)
      },
      /**
       * 获取需要排除的高度
       * 但渲染表格高度时，需要排除工具栏或分页等相关组件的高度
       * 如果存在表尾合计滚动条，则需要排除滚动条高度
       */
      getExcludeHeight () {
        return $xegrid ? $xegrid.getExcludeHeight() : 0
      },
      /**
       * 定义行数据中的列属性，如果不存在则定义
       * @param {Row} record 行数据
       */
      defineField (record) {
        const { treeConfig } = props
        const expandOpts = computeExpandOpts.value
        const treeOpts = computeTreeOpts.value
        const radioOpts = computeRadioOpts.value
        const checkboxOpts = computeCheckboxOpts.value
        const rowkey = getRowkey($xetable)
        internalData.visibleColumn.forEach(({ property, editRender }) => {
          if (property && !XEUtils.has(record, property)) {
            XEUtils.set(record, property, editRender && !XEUtils.isUndefined(editRender.defaultValue) ? editRender.defaultValue : null)
          }
        })
        const ohterFields: (string | undefined)[] = [radioOpts.labelField, checkboxOpts.checkField, checkboxOpts.labelField, expandOpts.labelField]
        ohterFields.forEach((key) => {
          if (key && !XEUtils.get(record, key)) {
            XEUtils.set(record, key, null)
          }
        })
        if (treeConfig && treeOpts.lazy && XEUtils.isUndefined(record[treeOpts.children])) {
          record[treeOpts.children] = null
        }
        // 必须有行数据的唯一主键，可以自行设置；也可以默认生成一个随机数
        if (!XEUtils.get(record, rowkey)) {
          XEUtils.set(record, rowkey, getRowUniqueId())
        }
        return record
      },
      handleTableData (force?: boolean) {
        const { scrollYLoad } = reactData
        const { scrollYStore, fullDataRowIdData } = internalData
        const fullData = force ? updateAfterFullData() : internalData.afterFullData
        const tableData = scrollYLoad ? fullData.slice(scrollYStore.startIndex, scrollYStore.endIndex) : fullData.slice(0)
        tableData.forEach((row, $index) => {
          const rowid = getRowid($xetable, row)
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
      updateCache (isSource) {
        const { treeConfig } = props
        const treeOpts = computeTreeOpts.value
        let { fullDataRowIdData, fullAllDataRowIdData, tableFullData } = internalData
        const rowkey = getRowkey($xetable)
        const isLazy = treeConfig && treeOpts.lazy
        const handleCache = (row: any, index: any, items: any, path?: any, parent?: any) => {
          let rowid = getRowid($xetable, row)
          if (!rowid) {
            rowid = getRowUniqueId()
            XEUtils.set(row, rowkey, rowid)
          }
          if (isLazy && row[treeOpts.hasChild] && XEUtils.isUndefined(row[treeOpts.children])) {
            row[treeOpts.children] = null
          }
          const rest = { row, rowid, index: treeConfig && parent ? -1 : index, _index: -1, $index: -1, items, parent }
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
          XEUtils.eachTree(tableFullData, handleCache, treeOpts)
        } else {
          tableFullData.forEach(handleCache)
        }
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
        const isResizable = storage === true || (storage && storage.resizable)
        if (customConfig && isResizable) {
          const columnWidthStorageMap = getCustomStorageMap(resizableStorageKey)
          let columnWidthStorage: any
          if (!id) {
            errLog('vxe.error.reqProp', ['id'])
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
      saveCustomVisible () {
        const { id, customConfig } = props
        const { collectColumn } = internalData
        const customOpts = computeCustomOpts.value
        const { checkMethod, storage } = customOpts
        const isVisible = storage === true || (storage && storage.visible)
        if (customConfig && isVisible) {
          const columnVisibleStorageMap = getCustomStorageMap(visibleStorageKey)
          const colHides: any[] = []
          const colShows: any[] = []
          if (!id) {
            errLog('vxe.error.reqProp', ['id'])
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
        tablePrivateMethods.saveCustomVisible()
        tablePrivateMethods.analyColumnWidth()
        return tableMethods.refreshColumn()
      },
      preventEvent (evnt, type, args, next, end) {
        const evntList = VXETable.interceptor.get(type)
        let rest
        if (!evntList.some((func) => func(Object.assign({ $grid: $xegrid, $table: $xetable, $event: evnt }, args)) === false)) {
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
        const { selection, treeIndeterminates } = reactData
        const { afterFullData } = internalData
        const checkboxOpts = computeCheckboxOpts.value
        const { checkField, halfField, checkStrictly, checkMethod } = checkboxOpts
        if (!checkStrictly) {
          let isAllSelected = false
          let isIndeterminate = false
          if (checkField) {
            isAllSelected = afterFullData.length > 0 && afterFullData.every(
              checkMethod
                ? (row) => !checkMethod({ row }) || XEUtils.get(row, checkField)
                : (row) => XEUtils.get(row, checkField)
            )
            if (treeConfig) {
              if (halfField) {
                isIndeterminate = !isAllSelected && afterFullData.some((row) => XEUtils.get(row, checkField) || XEUtils.get(row, halfField) || $xetable.findRowIndexOf(treeIndeterminates, row) > -1)
              } else {
                isIndeterminate = !isAllSelected && afterFullData.some((row) => XEUtils.get(row, checkField) || $xetable.findRowIndexOf(treeIndeterminates, row) > -1)
              }
            } else {
              if (halfField) {
                isIndeterminate = !isAllSelected && afterFullData.some((row) => XEUtils.get(row, checkField) || XEUtils.get(row, halfField))
              } else {
                isIndeterminate = !isAllSelected && afterFullData.some((row) => XEUtils.get(row, checkField))
              }
            }
          } else {
            isAllSelected = afterFullData.length > 0 && afterFullData.every(
              checkMethod
                ? (row) => !checkMethod({ row }) || $xetable.findRowIndexOf(selection, row) > -1
                : (row) => $xetable.findRowIndexOf(selection, row) > -1
            )
            if (treeConfig) {
              isIndeterminate = !isAllSelected && afterFullData.some((row) => $xetable.findRowIndexOf(treeIndeterminates, row) > -1 || $xetable.findRowIndexOf(selection, row) > -1)
            } else {
              isIndeterminate = !isAllSelected && afterFullData.some((row) => $xetable.findRowIndexOf(selection, row) > -1)
            }
          }
          reactData.isAllSelected = isAllSelected
          reactData.isIndeterminate = isIndeterminate
        }
      },
      /**
       * 多选，行选中事件
       * value 选中true 不选false 不确定-1
       */
      handleSelectRow ({ row }, value) {
        const { treeConfig } = props
        const { selection, treeIndeterminates } = reactData
        const { afterFullData } = internalData
        const treeOpts = computeTreeOpts.value
        const checkboxOpts = computeCheckboxOpts.value
        const { checkField: property, checkStrictly, checkMethod } = checkboxOpts
        if (property) {
          if (treeConfig && !checkStrictly) {
            if (value === -1) {
              if ($xetable.findRowIndexOf(treeIndeterminates, row) === -1) {
                treeIndeterminates.push(row)
              }
              XEUtils.set(row, property, false)
            } else {
              // 更新子节点状态
              XEUtils.eachTree([row], (item) => {
                if (row === item || (!checkMethod || checkMethod({ row: item }))) {
                  XEUtils.set(item, property, value)
                  XEUtils.remove(treeIndeterminates, half => half === item)
                  handleCheckboxReserveRow(row, value)
                }
              }, treeOpts)
            }
            // 如果存在父节点，更新父节点状态
            const matchObj = XEUtils.findTree(afterFullData, item => item === row, treeOpts)
            if (matchObj && matchObj.parent) {
              let parentStatus
              const vItems = checkMethod ? matchObj.items.filter((item) => checkMethod({ row: item })) : matchObj.items
              const indeterminatesItem = XEUtils.find(matchObj.items, item => $xetable.findRowIndexOf(treeIndeterminates, item) > -1)
              if (indeterminatesItem) {
                parentStatus = -1
              } else {
                const selectItems = matchObj.items.filter(item => XEUtils.get(item, property))
                parentStatus = selectItems.filter(item => $xetable.findRowIndexOf(vItems, item) > -1).length === vItems.length ? true : (selectItems.length || value === -1 ? -1 : false)
              }
              return tablePrivateMethods.handleSelectRow({ row: matchObj.parent }, parentStatus)
            }
          } else {
            if (!checkMethod || checkMethod({ row })) {
              XEUtils.set(row, property, value)
              handleCheckboxReserveRow(row, value)
            }
          }
        } else {
          if (treeConfig && !checkStrictly) {
            if (value === -1) {
              if ($xetable.findRowIndexOf(treeIndeterminates, row) === -1) {
                treeIndeterminates.push(row)
              }
              XEUtils.remove(selection, item => item === row)
            } else {
              // 更新子节点状态
              XEUtils.eachTree([row], (item) => {
                if (row === item || (!checkMethod || checkMethod({ row: item }))) {
                  if (value) {
                    selection.push(item)
                  } else {
                    XEUtils.remove(selection, select => select === item)
                  }
                  XEUtils.remove(treeIndeterminates, half => half === item)
                  handleCheckboxReserveRow(row, value)
                }
              }, treeOpts)
            }
            // 如果存在父节点，更新父节点状态
            const matchObj = XEUtils.findTree(afterFullData, item => item === row, treeOpts)
            if (matchObj && matchObj.parent) {
              let parentStatus
              const vItems = checkMethod ? matchObj.items.filter((item) => checkMethod({ row: item })) : matchObj.items
              const indeterminatesItem = XEUtils.find(matchObj.items, item => $xetable.findRowIndexOf(treeIndeterminates, item) > -1)
              if (indeterminatesItem) {
                parentStatus = -1
              } else {
                const selectItems = matchObj.items.filter(item => $xetable.findRowIndexOf(selection, item) > -1)
                parentStatus = selectItems.filter(item => $xetable.findRowIndexOf(vItems, item) > -1).length === vItems.length ? true : (selectItems.length || value === -1 ? -1 : false)
              }
              return tablePrivateMethods.handleSelectRow({ row: matchObj.parent }, parentStatus)
            }
          } else {
            if (!checkMethod || checkMethod({ row })) {
              if (value) {
                if ($xetable.findRowIndexOf(selection, row) === -1) {
                  selection.push(row)
                }
              } else {
                XEUtils.remove(selection, item => item === row)
              }
              handleCheckboxReserveRow(row, value)
            }
          }
        }
        tablePrivateMethods.checkSelectionStatus()
      },
      triggerHeaderHelpEvent (evnt, params) {
        const { column } = params
        const { titleHelp } = column
        if (titleHelp.message) {
          const { tooltipStore } = internalData
          const $tooltip = refTooltip.value
          const content = getFuncText(titleHelp.message)
          handleTargetEnterEvent()
          tooltipStore.visible = true
          if ($tooltip) {
            $tooltip.open(evnt.currentTarget, content)
          }
        }
      },
      /**
       * 触发表头 tooltip 事件
       */
      triggerHeaderTooltipEvent (evnt, params) {
        const { tooltipStore } = internalData
        const { column } = params
        const titleElem = evnt.currentTarget
        handleTargetEnterEvent()
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
        const { tooltipStore } = internalData
        const editOpts = computeEditOpts.value
        const { actived } = editStore
        const { row, column } = params
        const cell = evnt.currentTarget as HTMLTableDataCellElement
        handleTargetEnterEvent()
        if (editConfig) {
          if ((editOpts.mode === 'row' && actived.row === row) || (actived.row === row && actived.column === column)) {
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
            tipElem = cell.querySelector(column.type === 'html' ? '.vxe-cell--html' : '.vxe-cell--label')
          }
          handleTooltip(evnt, cell, overflowElem || cell.children[0], tipElem, params)
        }
      },
      /**
       * 触发表尾 tooltip 事件
       */
      triggerFooterTooltipEvent (evnt, params) {
        const { column } = params
        const { tooltipStore } = internalData
        const cell = evnt.currentTarget as HTMLTableDataCellElement
        handleTargetEnterEvent()
        if (tooltipStore.column !== column || !tooltipStore.visible) {
          handleTooltip(evnt, cell, cell.querySelector('.vxe-cell--item') || cell.children[0], null, params)
        }
      },
      handleTargetLeaveEvent () {
        const tooltipOpts = computeTooltipOpts.value
        internalData.tooltipActive = false
        if (tooltipOpts.enterable) {
          internalData.tooltipTimeout = setTimeout(() => {
            const $tooltip = refTooltip.value
            if ($tooltip && !$tooltip.reactData.isHover) {
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
        const { column } = params
        const cell = evnt.currentTarget
        const triggerResizable = _lastResizeTime && _lastResizeTime > Date.now() - 300
        const triggerSort = getEventTargetNode(evnt, cell, 'vxe-cell--sort').flag
        const triggerFilter = getEventTargetNode(evnt, cell, 'vxe-cell--filter').flag
        if (sortOpts.trigger === 'cell' && !(triggerResizable || triggerSort || triggerFilter)) {
          tablePrivateMethods.triggerSortEvent(evnt, column, getNextSortOrder(column))
        }
        tableMethods.dispatchEvent('header-cell-click', Object.assign({ triggerResizable, triggerSort, triggerFilter, cell }, params), evnt)
        if (props.highlightCurrentColumn) {
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
        const { actived } = editStore
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
            if (highlightCurrentRow) {
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
          if (editConfig) {
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
        if (editConfig && editOpts.trigger === 'dblclick') {
          if (!actived.args || evnt.currentTarget !== actived.args.cell) {
            if (editOpts.mode === 'row') {
              checkValidate('blur')
                .catch((e: any) => e)
                .then(() => {
                  $xetable.handleActived(params, evnt)
                    .then(() => checkValidate('change'))
                    .catch((e: any) => e)
                })
            } else if (editOpts.mode === 'cell') {
              $xetable.handleActived(params, evnt)
                .then(() => checkValidate('change'))
                .catch((e: any) => e)
            }
          }
        }
        tableMethods.dispatchEvent('cell-dblclick', params, evnt)
      },
      handleToggleCheckRowEvent (evnt, params) {
        const { selection } = reactData
        const checkboxOpts = computeCheckboxOpts.value
        const { checkField: property } = checkboxOpts
        const { row } = params
        const value = property ? !XEUtils.get(row, property) : $xetable.findRowIndexOf(selection, row) === -1
        if (evnt) {
          tablePrivateMethods.triggerCheckRowEvent(evnt, params, value)
        } else {
          tablePrivateMethods.handleSelectRow(params, value)
        }
      },
      triggerCheckRowEvent (evnt, params, value) {
        const checkboxOpts = computeCheckboxOpts.value
        const { checkMethod } = checkboxOpts
        if (!checkMethod || checkMethod({ row: params.row })) {
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
        tableMethods.setAllCheckboxRow(value)
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
        const isChange = reactData.selectRow !== params.row
        tableMethods.setRadioRow(params.row)
        if (isChange) {
          tableMethods.dispatchEvent('radio-change', params, evnt)
        }
      },
      triggerCurrentRowEvent (evnt, params) {
        const isChange = reactData.currentRow !== params.row
        tableMethods.setCurrentRow(params.row)
        if (isChange) {
          tableMethods.dispatchEvent('current-change', params, evnt)
        }
      },
      /**
       * 展开行事件
       */
      triggerRowExpandEvent (evnt, params) {
        const { expandLazyLoadeds, expandColumn: column } = reactData
        const expandOpts = computeExpandOpts.value
        const { row } = params
        const { lazy } = expandOpts
        if (!lazy || $xetable.findRowIndexOf(expandLazyLoadeds, row) === -1) {
          const expanded = !tableMethods.isExpandByRow(row)
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
        const { treeLazyLoadeds } = reactData
        const treeOpts = computeTreeOpts.value
        const { row, column } = params
        const { lazy } = treeOpts
        if (!lazy || $xetable.findRowIndexOf(treeLazyLoadeds, row) === -1) {
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
        const sortOpts = computeSortOpts.value
        const property = column.property
        if (column.sortable) {
          if (!order || column.order === order) {
            tableMethods.clearSort(sortOpts.multiple ? column : null)
          } else {
            tableMethods.sort({ field: property, order })
          }
          const params = { column, property, order: column.order, sortList: tableMethods.getSortColumns() }
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
        if (treeConfig) {
          const treeOpts = computeTreeOpts.value
          const matchObj = XEUtils.findTree(tableFullData, item => item === row, treeOpts)
          if (matchObj) {
            const nodes = matchObj.nodes
            nodes.forEach((row, index) => {
              if (index < nodes.length - 1 && !tableMethods.isTreeExpandByRow(row)) {
                tableMethods.setTreeExpand(row, true)
              }
            })
          }
        }
        return nextTick()
      },
      // 更新横向 X 可视渲染上下剩余空间大小
      updateScrollXSpace () {
        const { scrollXLoad, scrollbarWidth } = reactData
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
            headerElem.style.marginLeft = marginLeft
          }
          bodyElem.style.marginLeft = marginLeft
          if (footerElem) {
            footerElem.style.marginLeft = marginLeft
          }
          const containerList = ['main']
          containerList.forEach(name => {
            const layoutList = ['header', 'body', 'footer']
            layoutList.forEach(layout => {
              const xSpaceElem = elemStore[`${name}-${layout}-xSpace`]
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
          const tableElem = elemStore[`${name}-body-table`]
          if (tableElem) {
            tableElem.style.marginTop = marginTop
          }
          layoutList.forEach(layout => {
            const ySpaceElem = elemStore[`${name}-${layout}-ySpace`]
            if (ySpaceElem) {
              ySpaceElem.style.height = ySpaceHeight
            }
          })
        })
        nextTick(updateStyle)
      },
      updateScrollXData () {
        handleTableColumn()
        tablePrivateMethods.updateScrollXSpace()
      },
      updateScrollYData () {
        tablePrivateMethods.handleTableData()
        tablePrivateMethods.updateScrollYSpace()
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
      updateCellAreas () {
        const { mouseConfig } = props
        const mouseOpts = computeMouseOpts.value
        if (mouseConfig && mouseOpts.area && $xetable.handleUpdateCellAreas) {
          $xetable.handleUpdateCellAreas()
        }
      },
      /**
       * 行 hover 事件
       */
      triggerHoverEvent (evnt, { row }) {
        tablePrivateMethods.setHoverRow(row)
      },
      setHoverRow (row) {
        const rowid = getRowid($xetable, row)
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
        const rowid = getRowid($xetable, row)
        const tableBody = refTableBody.value
        const leftBody = refTableLeftBody.value
        const rightBody = refTableRightBody.value
        let bodyElem
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
        return null
      },
      getCellLabel (row, column) {
        const formatter = column.formatter
        const cellValue = getCellValue(row, column)
        let cellLabel = cellValue
        if (formatter) {
          let formatData
          const { fullAllDataRowIdData } = internalData
          const rowid = getRowid($xetable, row)
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
            const globalFunc = VXETable.formats.get(formatter)
            cellLabel = globalFunc ? globalFunc(formatParams) : ''
          } else if (XEUtils.isArray(formatter)) {
            const globalFunc = VXETable.formats.get(formatter[0])
            cellLabel = globalFunc ? globalFunc(formatParams, ...formatter.slice(1)) : ''
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
        return row ? XEUtils.findIndexOf(list, item => $xetable.eqRow(item, row)) : -1
      },
      eqRow (row1, row2) {
        if (row1 && row2) {
          if (row1 === row2) {
            return true
          }
          return getRowid($xetable, row1) === getRowid($xetable, row2)
        }
        return false
      }
    }

    Object.assign($xetable, tableMethods, tablePrivateMethods)

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
        showHeader ? h(resolveComponent('vxe-table-header') as ComponentOptions, {
          ref: isFixedLeft ? refTableLeftHeader : refTableRightHeader,
          fixedType,
          tableData,
          tableColumn,
          tableGroupColumn,
          fixedColumn
        }) : createCommentVNode(),
        h(TableBodyComponent as ComponentOptions, {
          ref: isFixedLeft ? refTableLeftBody : refTableRightBody,
          fixedType,
          tableData,
          tableColumn,
          fixedColumn
        }),
        showFooter ? h(resolveComponent('vxe-table-footer') as ComponentOptions, {
          ref: isFixedLeft ? refTableLeftFooter : refTableRightFooter,
          footerTableData,
          tableColumn,
          fixedColumn,
          fixedType
        }) : createCommentVNode()
      ])
    }

    const renderEmptyContenet = () => {
      const emptyOpts = computeEmptyOpts.value
      const params = { $table: $xetable }
      if (slots.empty) {
        return slots.empty(params)
      } else {
        const compConf = emptyOpts.name ? VXETable.renderer.get(emptyOpts.name) : null
        const renderEmpty = compConf ? compConf.renderEmpty : null
        if (renderEmpty) {
          return renderEmpty(emptyOpts, params)
        }
      }
      return getFuncText(props.emptyText) || GlobalConfig.i18n('vxe.table.emptyText')
    }

    function handleUupdateResize () {
      const el = refElem.value
      if (el && el.clientWidth && el.clientHeight) {
        tableMethods.recalculate()
      }
    }

    watch(() => props.data, (value) => {
      const { inited, initStatus } = internalData
      loadTableData(value || []).then(() => {
        const { scrollXLoad, scrollYLoad, expandColumn } = reactData
        internalData.inited = true
        internalData.initStatus = true
        if (!initStatus) {
          handleLoadDefaults()
        }
        if (!inited) {
          handleInitDefaults()
        }
        if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
          if ((scrollXLoad || scrollYLoad) && expandColumn) {
            warnLog('vxe.error.scrollErrProp', ['column.type=expand'])
          }
        }
        tableMethods.recalculate()
      })
    })

    watch(() => reactData.staticColumns, (value) => {
      handleColumn(value)
    })

    watch(() => reactData.tableColumn, () => {
      tablePrivateMethods.analyColumnWidth()
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

    watch(() => props.mergeCells, (value) => {
      tableMethods.clearMergeCells()
      if (value) {
        tableMethods.setMergeCells(value)
      }
    })

    watch(() => props.mergeFooterItems, (value) => {
      tableMethods.clearMergeFooterItems()
      if (value) {
        tableMethods.setMergeFooterItems(value)
      }
    })

    VXETable.hooks.forEach((options) => {
      const { setupTable } = options
      if (setupTable) {
        const hookRest = setupTable($xetable)
        if (hookRest && XEUtils.isObject(hookRest)) {
          Object.assign($xetable, hookRest)
        }
      }
    })

    tablePrivateMethods.preventEvent(null, 'created', { $table: $xetable })

    let resizeObserver: XEResizeObserver

    nextTick(() => {
      const { data, treeConfig, showOverflow } = props
      const { scrollXStore, scrollYStore } = internalData
      const sYOpts = computeSYOpts.value
      const editOpts = computeEditOpts.value
      const treeOpts = computeTreeOpts.value
      const radioOpts = computeRadioOpts.value
      const checkboxOpts = computeCheckboxOpts.value
      const expandOpts = computeExpandOpts.value

      if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
        if (!props.rowId && (checkboxOpts.reserve || checkboxOpts.checkRowKeys || radioOpts.reserve || radioOpts.checkRowKey || expandOpts.expandRowKeys || treeOpts.expandRowKeys)) {
          warnLog('vxe.error.reqProp', ['row-id'])
        }
        if (props.editConfig && (editOpts.showStatus || editOpts.showUpdateStatus || editOpts.showInsertStatus) && !props.keepSource) {
          warnLog('vxe.error.reqProp', ['keep-source'])
        }
        if (treeConfig && treeOpts.line && (!props.rowKey || !showOverflow)) {
          warnLog('vxe.error.reqProp', ['row-key | show-overflow'])
        }
        if (treeConfig && props.stripe) {
          warnLog('vxe.error.noTree', ['stripe'])
        }
        if (props.showFooter && !props.footerMethod) {
          warnLog('vxe.error.reqProp', ['footer-method'])
        }
        // 检查导入导出类型，如果自定义导入导出方法，则不校验类型
        const { exportConfig, importConfig } = props
        const exportOpts = computeExportOpts.value
        const importOpts = computeImportOpts.value
        if (importConfig && importOpts.types && !importOpts.importMethod && !XEUtils.includeArrays(VXETable.config.importTypes, importOpts.types)) {
          warnLog('vxe.error.errProp', [`export-config.types=${importOpts.types.join(',')}`, importOpts.types.filter((type: string) => XEUtils.includes(VXETable.config.importTypes, type)).join(',') || VXETable.config.importTypes.join(',')])
        }
        if (exportConfig && exportOpts.types && !exportOpts.exportMethod && !XEUtils.includeArrays(VXETable.config.exportTypes, exportOpts.types)) {
          warnLog('vxe.error.errProp', [`export-config.types=${exportOpts.types.join(',')}`, exportOpts.types.filter((type: string) => XEUtils.includes(VXETable.config.exportTypes, type)).join(',') || VXETable.config.exportTypes.join(',')])
        }
      }

      if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
        const customOpts = computeCustomOpts.value
        const mouseOpts = computeMouseOpts.value
        if (!props.id && props.customConfig && (customOpts.storage === true || (customOpts.storage && customOpts.storage.resizable) || (customOpts.storage && customOpts.storage.visible))) {
          errLog('vxe.error.reqProp', ['id'])
        }
        if (props.treeConfig && checkboxOpts.range) {
          errLog('vxe.error.noTree', ['checkbox-config.range'])
        }
        if (!$xetable.handleUpdateCellAreas) {
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
        if (mouseOpts.area && mouseOpts.selected) {
          warnLog('vxe.error.errConflicts', ['mouse-config.area', 'mouse-config.selected'])
        }
        if (mouseOpts.area && checkboxOpts.range) {
          warnLog('vxe.error.errConflicts', ['mouse-config.area', 'checkbox-config.range'])
        }
        if (props.treeConfig && mouseOpts.area) {
          errLog('vxe.error.noTree', ['mouse-config.area'])
        }
      }

      // 检查是否有安装需要的模块
      if (process.env.VUE_APP_VXE_TABLE_ENV === 'development') {
        if (props.editConfig && !$xetable.insert) {
          errLog('vxe.error.reqModule', ['Edit'])
        }
        if (props.editRules && !$xetable.validate) {
          errLog('vxe.error.reqModule', ['Validator'])
        }
        if ((checkboxOpts.range || props.keyboardConfig || props.mouseConfig) && !$xetable.triggerCellMousedownEvent) {
          errLog('vxe.error.reqModule', ['Keyboard'])
        }
        if ((props.printConfig || props.importConfig || props.exportConfig) && !$xetable.exportData) {
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
          handleInitDefaults()
        }
        updateStyle()
      })

      if (props.autoResize) {
        const el = refElem.value
        resizeObserver = createResizeEvent(() => {
          if (props.autoResize) {
            tableMethods.recalculate(true)
          }
        })
        resizeObserver.observe(el)
        resizeObserver.observe(tablePrivateMethods.getParentElem())
      }
      GlobalEvent.on($xetable, 'paste', handleGlobalPasteEvent)
      GlobalEvent.on($xetable, 'copy', handleGlobalCopyEvent)
      GlobalEvent.on($xetable, 'cut', handleGlobalCutEvent)
      GlobalEvent.on($xetable, 'mousedown', handleGlobalMousedownEvent)
      GlobalEvent.on($xetable, 'blur', handleGlobalBlurEvent)
      GlobalEvent.on($xetable, 'mousewheel', handleGlobalMousewheelEvent)
      GlobalEvent.on($xetable, 'keydown', handleGlobalKeydownEvent)
      GlobalEvent.on($xetable, 'resize', handleGlobalResizeEvent)
      if ($xetable.handleGlobalContextmenuEvent) {
        GlobalEvent.on($xetable, 'contextmenu', $xetable.handleGlobalContextmenuEvent)
      }
    })

    onActivated(() => {
      tableMethods.recalculate().then(() => tableMethods.refreshScroll())
      tablePrivateMethods.preventEvent(null, 'activated', { $table: $xetable })
    })

    onDeactivated(() => {
      internalData.isActivated = false
      tablePrivateMethods.preventEvent(null, 'deactivated', { $table: $xetable })
    })

    onUnmounted(() => {
      tablePrivateMethods.preventEvent(null, 'mounted', { $table: $xetable })
    })

    onBeforeUnmount(() => {
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
      tableMethods.closeFilter()
      if ($xetable.closeMenu) {
        $xetable.closeMenu()
      }
      tablePrivateMethods.preventEvent(null, 'beforeUnmount', { $table: $xetable })
    })

    onUnmounted(() => {
      GlobalEvent.off($xetable, 'paste')
      GlobalEvent.off($xetable, 'copy')
      GlobalEvent.off($xetable, 'cut')
      GlobalEvent.off($xetable, 'mousedown')
      GlobalEvent.off($xetable, 'blur')
      GlobalEvent.off($xetable, 'mousewheel')
      GlobalEvent.off($xetable, 'keydown')
      GlobalEvent.off($xetable, 'resize')
      GlobalEvent.off($xetable, 'contextmenu')
      tablePrivateMethods.preventEvent(null, 'unmounted', { $table: $xetable })
    })

    const renderVN = () => {
      const { loading, stripe, showHeader, height, treeConfig, mouseConfig, showFooter, highlightCell, highlightHoverRow, highlightHoverColumn, editConfig } = props
      const { isGroup, overflowX, overflowY, scrollXLoad, scrollYLoad, scrollbarHeight, tableData, tableColumn, tableGroupColumn, footerTableData, initStore, columnStore, filterStore } = reactData
      const { leftList, rightList } = columnStore
      const tooltipOpts = computeTooltipOpts.value
      const treeOpts = computeTreeOpts.value
      const vSize = computeSize.value
      const tableBorder = computeTableBorder.value
      const mouseOpts = computeMouseOpts.value
      const validOpts = computeValidOpts.value
      const validTipOpts = computeValidTipOpts.value
      const isMenu = computeIsMenu.value
      return h('div', {
        ref: refElem,
        class: ['vxe-table', 'vxe-table--render-default', `tid_${xID}`, `border--${tableBorder}`, {
          [`size--${vSize}`]: vSize,
          'vxe-editable': !!editConfig,
          'cell--highlight': highlightCell,
          'cell--selected': mouseConfig && mouseOpts.selected,
          'cell--area': mouseConfig && mouseOpts.area,
          'row--highlight': highlightHoverRow,
          'column--highlight': highlightHoverColumn,
          'is--header': showHeader,
          'is--footer': showFooter,
          'is--group': isGroup,
          'is--tree-line': treeConfig && treeOpts.line,
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
            showHeader ? h(resolveComponent('vxe-table-header') as ComponentOptions, {
              ref: refTableHeader,
              tableData,
              tableColumn,
              tableGroupColumn
            }) : createCommentVNode(),
            /**
             * 表体
             */
            h(TableBodyComponent as ComponentOptions, {
              ref: refTableBody,
              tableData,
              tableColumn
            }),
            /**
             * 表尾
             */
            showFooter ? h(resolveComponent('vxe-table-footer') as ComponentOptions, {
              ref: refTableFooter,
              footerTableData,
              tableColumn
            }) : createCommentVNode()
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
          style: overflowX ? {
            'padding-bottom': `${scrollbarHeight}px`
          } : null
        }),
        /**
         * 加载中
         */
        h('div', {
          class: ['vxe-table--loading vxe-loading', {
            'is--visible': loading
          }]
        }, [
          h('div', {
            class: 'vxe-loading--spinner'
          })
        ]),
        /**
         * 筛选
         */
        initStore.filter ? h(resolveComponent('vxe-table-filter') as ComponentOptions, {
          ref: refTableFilter,
          filterStore
        }) : createCommentVNode(),
        /**
         * 导入
         */
        initStore.import && props.importConfig ? h(resolveComponent('vxe-import-panel') as ComponentOptions, {
          defaultOptions: reactData.importParams,
          storeData: reactData.importStore
        }) : createCommentVNode(),
        /**
         * 导出/导出
         */
        initStore.export && (props.exportConfig || props.printConfig) ? h(resolveComponent('vxe-export-panel') as ComponentOptions, {
          defaultOptions: reactData.exportParams,
          storeData: reactData.exportStore
        }) : createCommentVNode(),
        /**
         * 快捷菜单
         */
        isMenu ? h(resolveComponent('vxe-table-context-menu') as ComponentOptions, {
          ref: refTableMenu
        }) : createCommentVNode(),
        /**
         * 通用提示
         */
        hasUseTooltip ? h(resolveComponent('vxe-tooltip') as ComponentOptions, {
          ref: refCommTooltip,
          isArrow: false,
          enterable: false
        }) : createCommentVNode(),
        /**
         * 校验提示
         */
        hasUseTooltip && props.editRules && validOpts.showMessage && (validOpts.message === 'default' ? !height : validOpts.message === 'tooltip') ? h(resolveComponent('vxe-tooltip') as ComponentOptions, {
          ref: refValidTooltip,
          class: 'vxe-table--valid-error',
          ...(validOpts.message === 'tooltip' || tableData.length === 1 ? validTipOpts : {})
        }) : createCommentVNode(),
        /**
         * 工具提示
         */
        hasUseTooltip ? h(resolveComponent('vxe-tooltip') as ComponentOptions, {
          ref: refTooltip,
          ...tooltipOpts
        }) : createCommentVNode()
      ])
    }

    $xetable.renderVN = renderVN

    provide('xecolgroup', null)
    provide('$xetable', $xetable)

    return $xetable
  },
  render () {
    return this.renderVN()
  }
})
