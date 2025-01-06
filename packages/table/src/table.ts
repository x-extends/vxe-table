import { CreateElement } from 'vue'
import XEUtils from 'xe-utils'
import { getFuncText, isEnableConf } from '../../ui/src/utils'
import { initTpImg } from '../../ui/src/dom'
import { VxeUI } from '../../ui'
import methods from './methods'
import TableBodyComponent from './body'
import TableHeaderComponent from './header'
import TableFooterComponent from './footer'
import tableProps from './props'
import { getSlotVNs } from '../../ui/src/vn'
import { warnLog, errLog } from '../../ui/src/log'
import TableCustomPanelComponent from '../module/custom/panel'
import TableFilterPanelComponent from '../module/filter/panel'
import TableImportPanelComponent from '../module/export/import-panel'
import TableExportPanelComponent from '../module/export/export-panel'
import TableMenuPanelComponent from '../module/menu/panel'

import filterMixin from '../module/filter/mixin'
import menuMixin from '../module/menu/mixin'
import editMixin from '../module/edit/mixin'
import exportMixin from '../module/export/mixin'
import keyboardMixin from '../module/keyboard/mixin'
import validatorMixin from '../module/validator/mixin'
import customMixin from '../module/custom/mixin'

import type { VxeLoadingComponent, VxeTooltipComponent, VxeTabsConstructor, VxeTabsPrivateMethods } from 'vxe-pc-ui'

const { getConfig, getIcon, getI18n, renderer, globalResize, globalEvents, globalMixins, renderEmptyElement } = VxeUI

/**
 * 渲染浮固定列
 * 分别渲染左边固定列和右边固定列
 * 如果宽度足够情况下，则不需要渲染固定列
 * @param {Function} h 创建 VNode 函数
 * @param {Object} $xetable 表格实例
 * @param {String} fixedType 固定列类型
 */
function renderFixed (h: CreateElement, $xetable: any, fixedType: any) {
  const { _e, tableData, tableColumn, tableGroupColumn, vSize, showHeader, showFooter, columnStore, footerTableData } = $xetable
  const fixedColumn = columnStore[`${fixedType}List`]
  return h('div', {
    class: `vxe-table--fixed-${fixedType}-wrapper`,
    ref: `${fixedType}Container`
  }, [
    showHeader
      ? h(TableHeaderComponent, {
        props: {
          fixedType,
          tableData,
          tableColumn,
          tableGroupColumn,
          size: vSize,
          fixedColumn
        },
        ref: `${fixedType}Header`
      })
      : _e(),
    h(TableBodyComponent, {
      props: {
        fixedType,
        tableData,
        tableColumn,
        fixedColumn,
        size: vSize
      },
      ref: `${fixedType}Body`
    }),
    showFooter
      ? h(TableFooterComponent, {
        props: {
          footerTableData,
          tableColumn,
          fixedColumn,
          fixedType,
          size: vSize
        },
        ref: `${fixedType}Footer`
      })
      : _e()
  ])
}

function renderEmptyBody (h: CreateElement, _vm: any) {
  const { $scopedSlots, emptyOpts } = _vm
  let emptyContent: any = ''
  const params = { $table: _vm }
  if ($scopedSlots.empty) {
    emptyContent = $scopedSlots.empty.call(_vm, params, h)
  } else {
    const compConf = emptyOpts.name ? renderer.get(emptyOpts.name) : null
    const rtEmptyView = compConf ? (compConf.renderTableEmpty || compConf.renderTableEmptyView || compConf.renderEmpty) : null
    if (rtEmptyView) {
      emptyContent = getSlotVNs(rtEmptyView.call(_vm, h, emptyOpts, params))
    } else {
      emptyContent = getFuncText(_vm.emptyText) || getI18n('vxe.table.emptyText')
    }
  }
  return emptyContent
}

const renderDragTipContents = (h: CreateElement, $xeTable: any) => {
  const props = $xeTable
  const reactData = $xeTable

  const { dragConfig } = props
  const { dragRow, dragCol, dragTipText } = reactData
  const columnDragOpts = $xeTable.computeColumnDragOpts
  const rowDragOpts = $xeTable.computeRowDragOpts
  const rowDragSlots = rowDragOpts.slots || {}
  const rTipSlot = rowDragSlots.tip || (dragConfig && dragConfig.slots ? dragConfig.slots.rowTip : null)
  const columnDragSlots = columnDragOpts.slots || {}
  const cTipSlot = columnDragSlots.tip

  if (dragRow && rTipSlot) {
    return $xeTable.callSlot(rTipSlot, { row: dragRow }, h)
  }
  if (dragCol && cTipSlot) {
    return $xeTable.callSlot(cTipSlot, { column: dragCol }, h)
  }
  return [h('span', dragTipText)]
}

const renderDragTip = (h: CreateElement, $xeTable: any) => {
  const reactData = $xeTable

  const { dragRow } = reactData
  const rowOpts = $xeTable.computeRowOpts
  const columnOpts = $xeTable.computeColumnOpts
  const rowDragOpts = $xeTable.computeRowDragOpts
  const columnDragOpts = $xeTable.computeColumnDragOpts

  if (rowOpts.drag || columnOpts.drag) {
    return h('div', {
      class: 'vxe-table--drag-wrapper'
    }, [
      h('div', {
        ref: 'refDragRowLineElem',
        class: ['vxe-table--drag-row-line', {
          'is--guides': rowDragOpts.showGuidesStatus
        }]
      }),
      h('div', {
        ref: 'refDragColLineElem',
        class: ['vxe-table--drag-col-line', {
          'is--guides': columnDragOpts.showGuidesStatus
        }]
      }),
      h('div', {
        ref: 'refDragTipElem',
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
          }, renderDragTipContents(h, $xeTable))
        ])
      ])
    ])
  }
  return renderEmptyElement($xeTable)
}

function handleUupdateResize (_vm: any) {
  const { $el } = _vm
  if ($el && $el.clientWidth && $el.clientHeight) {
    _vm.recalculate()
  }
}

export default {
  name: 'VxeTable',
  mixins: [
    globalMixins.sizeMixin,
    filterMixin,
    menuMixin,
    editMixin,
    exportMixin,
    keyboardMixin,
    validatorMixin,
    customMixin
  ],
  props: tableProps,
  provide () {
    return {
      $xetable: this,
      $xeTable: this,
      xecolgroup: null
    }
  },
  inject: {
    $xeTabs: {
      default: null
    },
    $xeGrid: {
      default: null
    },
    $xegrid: {
      default: null
    }
  },
  data () {
    return {
      tId: `${XEUtils.uniqueId()}`,
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
      hasFixedColumn: false,
      // 树节点列信息
      treeNodeColumn: null,
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
      // 初始化标识
      initStore: {
        filter: false,
        import: false,
        export: false,
        custom: false
      },
      customColumnList: [],
      // 刷新列标识，当列筛选被改变时，触发表格刷新数据
      upDataFlag: 0,
      // 刷新列标识，当列的特定属性被改变时，触发表格刷新列
      reColumnFlag: 0,
      // 已标记的对象集
      pendingRowMaps: {},
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
        removeList: [],
        removeMaps: {}
      },
      // 存放 tooltip 相关信息
      tooltipStore: {
        row: null,
        column: null,
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
        hasTree: false,
        hasMerge: false,
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
      _isLoading: false
    }
  },
  computed: {
    ...({} as {
      $xeTabs(): (VxeTabsConstructor & VxeTabsPrivateMethods) | null
    }),
    tableId () {
      return this.computeTableId
    },
    computeTableId () {
      const { id } = this
      if (id) {
        if (XEUtils.isFunction(id)) {
          return `${id({ $table: this }) || ''}`
        }
        return `${id}`
      }
      return ''
    },
    validOpts () {
      return this.computeValidOpts
    },
    computeValidOpts () {
      return Object.assign({ message: 'default' }, getConfig().table.validConfig, this.validConfig)
    },
    sXOpts () {
      return this.computeSXOpts
    },
    computeSXOpts () {
      return Object.assign({}, getConfig().table.scrollX, this.scrollX)
    },
    computeScrollXThreshold () {
      const $xeTable = this

      const sXOpts = $xeTable.computeSXOpts
      const { threshold } = sXOpts
      if (threshold) {
        return XEUtils.toNumber(threshold)
      }
      return 0
    },
    sYOpts () {
      return this.computeSYOpts
    },
    computeSYOpts () {
      return Object.assign({}, getConfig().table.scrollY, this.scrollY)
    },
    computeScrollYThreshold () {
      const $xeTable = this

      const sYOpts = $xeTable.computeSYOpts
      const { threshold } = sYOpts
      if (threshold) {
        return XEUtils.toNumber(threshold)
      }
      return 0
    },
    rowHeightMaps () {
      return this.computeRowHeightMaps
    },
    computeRowHeightMaps () {
      return {
        default: 48,
        medium: 44,
        small: 40,
        mini: 36
      }
    },
    columnOpts () {
      return this.computeColumnOpts
    },
    computeColumnOpts () {
      return Object.assign({}, getConfig().table.columnConfig, this.columnConfig)
    },
    computeCellOpts () {
      return Object.assign({}, getConfig().table.cellConfig, this.cellConfig)
    },
    rowOpts () {
      return this.computeRowOpts
    },
    computeRowOpts () {
      return Object.assign({}, getConfig().table.rowConfig, this.rowConfig)
    },
    computeRowDragOpts () {
      return Object.assign({}, getConfig().table.rowDragConfig, this.rowDragConfig)
    },
    computeColumnDragOpts () {
      return Object.assign({}, getConfig().table.columnDragConfig, this.columnDragConfig)
    },
    resizeOpts () {
      return this.computeResizeOpts
    },
    computeResizeOpts () {
      return Object.assign({}, getConfig().table.resizeConfig, this.resizeConfig)
    },
    resizableOpts () {
      return this.computeResizableOpts
    },
    computeResizableOpts () {
      return Object.assign({}, getConfig().table.resizableConfig, this.resizableConfig)
    },
    seqOpts () {
      return this.computeSeqOpts
    },
    computeSeqOpts () {
      return Object.assign({ startIndex: 0 }, getConfig().table.seqConfig, this.seqConfig)
    },
    radioOpts () {
      return this.computeRadioOpts
    },
    computeRadioOpts () {
      return Object.assign({}, getConfig().table.radioConfig, this.radioConfig)
    },
    checkboxOpts () {
      return this.computeCheckboxOpts
    },
    computeCheckboxOpts () {
      return Object.assign({}, getConfig().table.checkboxConfig, this.checkboxConfig)
    },
    tooltipOpts () {
      return this.computeTooltipOpts
    },
    computeTooltipOpts () {
      return Object.assign({}, getConfig().tooltip, getConfig().table.tooltipConfig, this.tooltipConfig)
    },
    tipConfig () {
      return { ...this.tooltipOpts }
    },
    validTipOpts () {
      return Object.assign({ isArrow: false }, this.tooltipOpts)
    },
    editOpts () {
      return this.computeEditOpts
    },
    computeEditOpts () {
      return Object.assign({}, getConfig().table.editConfig, this.editConfig)
    },
    sortOpts () {
      return this.computeSortOpts
    },
    computeSortOpts () {
      return Object.assign({ orders: ['asc', 'desc', null] }, getConfig().table.sortConfig, this.sortConfig)
    },
    filterOpts () {
      return this.computeFilterOpts
    },
    computeFilterOpts () {
      return Object.assign({}, getConfig().table.filterConfig, this.filterConfig)
    },
    mouseOpts () {
      return this.computeMouseOpts
    },
    computeMouseOpts () {
      return Object.assign({}, getConfig().table.mouseConfig, this.mouseConfig)
    },
    areaOpts () {
      return this.computeAreaOpts
    },
    computeAreaOpts () {
      return Object.assign({}, getConfig().table.areaConfig, this.areaConfig)
    },
    keyboardOpts () {
      return this.computeKeyboardOpts
    },
    computeKeyboardOpts () {
      return Object.assign({}, getConfig().table.keyboardConfig, this.keyboardConfig)
    },
    clipOpts () {
      return this.computeClipOpts
    },
    computeClipOpts () {
      return Object.assign({}, getConfig().table.clipConfig, this.clipConfig)
    },
    fnrOpts () {
      return this.computeFNROpts
    },
    computeFNROpts () {
      return Object.assign({}, getConfig().table.fnrConfig, this.fnrConfig)
    },
    headerCtxMenu () {
      const headerOpts = this.ctxMenuOpts.header
      return headerOpts && headerOpts.options ? headerOpts.options : []
    },
    bodyCtxMenu () {
      const bodyOpts = this.ctxMenuOpts.body
      return bodyOpts && bodyOpts.options ? bodyOpts.options : []
    },
    footerCtxMenu () {
      const footerOpts = this.ctxMenuOpts.footer
      return footerOpts && footerOpts.options ? footerOpts.options : []
    },
    isCtxMenu () {
      return !!((this.contextMenu || this.menuConfig) && isEnableConf(this.ctxMenuOpts) && (this.headerCtxMenu.length || this.bodyCtxMenu.length || this.footerCtxMenu.length))
    },
    ctxMenuList () {
      const rest: any[] = []
      this.ctxMenuStore.list.forEach((list: any[]) => {
        list.forEach(item => {
          rest.push(item)
        })
      })
      return rest
    },
    ctxMenuOpts () {
      return this.computeMenuOpts
    },
    computeMenuOpts () {
      return Object.assign({}, getConfig().table.menuConfig, this.contextMenu, this.menuConfig)
    },
    exportOpts () {
      return this.computeExportOpts
    },
    computeExportOpts () {
      return Object.assign({}, getConfig().table.exportConfig, this.exportConfig)
    },
    importOpts () {
      return this.computeImportOpts
    },
    computeImportOpts () {
      return Object.assign({}, getConfig().table.importConfig, this.importConfig)
    },
    printOpts () {
      return this.computePrintOpts
    },
    computePrintOpts () {
      return Object.assign({}, getConfig().table.printConfig, this.printConfig)
    },
    expandOpts () {
      return this.computeExpandOpts
    },
    computeExpandOpts () {
      return Object.assign({}, getConfig().table.expandConfig, this.expandConfig)
    },
    treeOpts () {
      return this.computeTreeOpts
    },
    computeTreeOpts () {
      return Object.assign({}, getConfig().table.treeConfig, this.treeConfig)
    },
    emptyOpts () {
      return this.computeEmptyOpts
    },
    computeEmptyOpts () {
      return Object.assign({}, getConfig().table.emptyRender, this.emptyRender)
    },
    loadingOpts () {
      return this.computeLoadingOpts
    },
    computeLoadingOpts () {
      return Object.assign({}, getConfig().table.loadingConfig, this.loadingConfig)
    },
    cellOffsetWidth () {
      return this.border ? Math.max(2, Math.ceil(this.scrollbarWidth / this.tableColumn.length)) : 1
    },
    customOpts () {
      return this.computeCustomOpts
    },
    computeCustomOpts () {
      return Object.assign({}, getConfig().table.customConfig, this.customConfig)
    },
    computeAutoWidthColumnList () {
      const { tableColumn, visibleColumn } = this
      return tableColumn.length || visibleColumn.length ? visibleColumn.filter((column: any) => column.width === 'auto' || column.minWidth === 'auto') : []
    },
    computeFixedColumnSize () {
      const $xeTable = this
      const reactData = $xeTable
      const internalData = $xeTable

      const { tableColumn } = reactData
      const { collectColumn } = internalData
      let fixedSize = 0
      // 只判断第一层
      if (tableColumn.length && collectColumn.length) {
        collectColumn.forEach((column: any) => {
          if (column.renderFixed) {
            fixedSize++
          }
        })
      }
      return fixedSize
    },
    fixedColumnSize () {
      const $xeTable = this

      return $xeTable.computeFixedColumnSize
    },
    computeIsMaxFixedColumn () {
      const $xeTable = this

      const fixedColumnSize = $xeTable.computeFixedColumnSize
      const columnOpts = $xeTable.columnOpts
      const { maxFixedSize } = columnOpts
      if (maxFixedSize) {
        return fixedColumnSize >= maxFixedSize
      }
      return false
    },
    computeTableBorder () {
      const $xeTable = this
      const props = $xeTable

      const { border } = props
      if (border === true) {
        return 'full'
      }
      if (border) {
        return border
      }
      return 'default'
    },
    /**
     * 判断列全选的复选框是否禁用
     */
    isAllCheckboxDisabled () {
      const { tableFullData, tableData, treeConfig, checkboxOpts } = this
      const { strict, checkMethod } = checkboxOpts
      if (strict) {
        if (tableData.length || tableFullData.length) {
          if (checkMethod) {
            if (treeConfig) {
              // 暂时不支持树形结构
            }
            // 如果所有行都被禁用
            return tableFullData.every((row: any) => !checkMethod({ row }))
          }
          return false
        }
        return true
      }
      return false
    },
    computeVirtualScrollBars () {
      const $xeTable = this
      const reactData = $xeTable

      const { overflowX, scrollXLoad, overflowY, scrollYLoad } = reactData
      return {
        x: overflowX && scrollXLoad,
        y: overflowY && scrollYLoad
      }
    },
    tabsResizeFlag () {
      const $xeTable = this
      const $xeTabs = $xeTable.$xeTabs

      return $xeTabs ? $xeTabs.reactData.resizeFlag : null
    }
  } as any,
  watch: {
    data (value: any) {
      const { initStatus } = this
      if (value && value.length >= 50000) {
        warnLog('vxe.error.errLargeData', ['loadData(data), reloadData(data)'])
      }
      this.loadTableData(value || []).then(() => {
        this.inited = true
        this.initStatus = true
        if (!initStatus) {
          this.handleLoadDefaults()
        }
        // const checkboxColumn = this.tableFullColumn.find(column => column.type === 'checkbox')
        // if (checkboxColumn && this.tableFullData.length > 300 && !this.checkboxOpts.checkField) {
        //   warnLog('vxe.error.checkProp', ['checkbox-config.checkField'])
        // }
        if ((this.scrollXLoad || this.scrollYLoad) && this.expandColumn) {
          warnLog('vxe.error.scrollErrProp', ['column.type=expand'])
        }
        this.recalculate()
      })
    },
    staticColumns (value: any) {
      this.handleColumn(XEUtils.clone(value))
    },
    tableColumn () {
      this.analyColumnWidth()
    },
    upDataFlag () {
      this.$nextTick().then(() => this.updateData())
    },
    reColumnFlag () {
      this.$nextTick().then(() => this.refreshColumn())
    },
    showHeader () {
      this.$nextTick(() => {
        this.recalculate(true).then(() => this.refreshScroll())
      })
    },
    showFooter () {
      this.$nextTick(() => {
        this.recalculate(true).then(() => this.refreshScroll())
      })
    },
    height () {
      this.$nextTick(() => this.recalculate(true))
    },
    maxHeight () {
      this.$nextTick(() => this.recalculate(true))
    },
    computeSize () {
      this.$nextTick(() => {
        this.recalculate(true).then(() => this.refreshScroll())
      })
    },
    syncResize (value: any) {
      if (value) {
        handleUupdateResize(this)
        this.$nextTick(() => {
          handleUupdateResize(this)
          setTimeout(() => handleUupdateResize(this))
        })
      }
    },
    tabsResizeFlag () {
      this.handleGlobalResizeEvent()
    },
    mergeCells (value: any) {
      this.clearMergeCells()
      this.$nextTick(() => this.setMergeCells(value))
    },
    mergeFooterItems (value: any) {
      this.clearMergeFooterItems()
      this.$nextTick(() => this.setMergeFooterItems(value))
    }
  } as any,
  created () {
    const { scrollXStore, sYOpts, scrollYStore, data, editOpts, treeOpts, treeConfig, showOverflow, rowOpts } = Object.assign(this, {
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
      // 当前 hover 行
      // hoverRow: null,
      // 最后滚动位置
      lastScrollLeft: 0,
      lastScrollTop: 0,
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
      // 列表条件处理后数据集合
      afterFullRowMaps: {},
      // 收集的列配置（带分组）
      collectColumn: [],
      // 完整所有列（不带分组）
      tableFullColumn: [],
      // 渲染所有列
      visibleColumn: [],
      // 缓存数据集
      fullAllDataRowIdData: {},
      fullDataRowMap: new Map(),
      fullDataRowIdData: {},
      fullColumnMap: new Map(),
      fullColumnIdData: {},
      fullColumnFieldData: {}
    })

    if (process.env.VUE_APP_VXE_ENV === 'development') {
      if (this.rowId) {
        warnLog('vxe.error.delProp', ['row-id', 'row-config.keyField'])
      }
      if (this.rowKey) {
        warnLog('vxe.error.delProp', ['row-key', 'row-config.useKey'])
      }
      if (this.columnKey) {
        warnLog('vxe.error.delProp', ['column-id', 'column-config.useKey'])
      }
      if (!(this.rowId || rowOpts.keyField) && (this.checkboxOpts.reserve || this.checkboxOpts.checkRowKeys || this.radioOpts.reserve || this.radioOpts.checkRowKey || this.expandOpts.expandRowKeys || this.treeOpts.expandRowKeys)) {
        warnLog('vxe.error.reqProp', ['row-config.keyField'])
      }
      if (this.editConfig && editOpts.showStatus && !this.keepSource) {
        warnLog('vxe.error.reqProp', ['keep-source'])
      }
      if (treeConfig && (treeOpts.showLine || treeOpts.line) && (!(this.rowKey || rowOpts.useKey) || !showOverflow)) {
        warnLog('vxe.error.reqProp', ['row-config.useKey | show-overflow'])
      }
      if (this.showFooter && !(this.footerMethod || this.footerData)) {
        warnLog('vxe.error.reqProp', ['footer-data | footer-method'])
      }
      if (treeConfig && !treeOpts.transform && this.stripe) {
        warnLog('vxe.error.noTree', ['stripe'])
      }
      if (this.tooltipOpts.enabled) {
        warnLog('vxe.error.delProp', ['tooltip-config.enabled', 'tooltip-config.showAll'])
      }
      // if (this.highlightCurrentRow) {
      //   warnLog('vxe.error.delProp', ['highlight-current-row', 'row-config.isCurrent'])
      // }
      // if (this.highlightHoverRow) {
      //   warnLog('vxe.error.delProp', ['highlight-hover-row', 'row-config.isHover'])
      // }
      // if (this.highlightCurrentColumn) {
      //   warnLog('vxe.error.delProp', ['highlight-current-column', 'column-config.isCurrent'])
      // }
      // if (this.highlightHoverColumn) {
      //   warnLog('vxe.error.delProp', ['highlight-hover-column', 'column-config.isHover'])
      // }
      // 检查导入导出类型，如果自定义导入导出方法，则不校验类型
      const { exportConfig, exportOpts, importConfig, importOpts } = this
      if (importConfig && importOpts.types && !importOpts.importMethod && !XEUtils.includeArrays(XEUtils.keys(importOpts._typeMaps), importOpts.types)) {
        warnLog('vxe.error.errProp', [`export-config.types=${importOpts.types.join(',')}`, importOpts.types.filter((type: string) => XEUtils.includes(XEUtils.keys(importOpts._typeMaps), type)).join(',') || XEUtils.keys(importOpts._typeMaps).join(',')])
      }
      if (exportConfig && exportOpts.types && !exportOpts.exportMethod && !XEUtils.includeArrays(XEUtils.keys(exportOpts._typeMaps), exportOpts.types)) {
        warnLog('vxe.error.errProp', [`export-config.types=${exportOpts.types.join(',')}`, exportOpts.types.filter((type: string) => XEUtils.includes(XEUtils.keys(exportOpts._typeMaps), type)).join(',') || XEUtils.keys(exportOpts._typeMaps).join(',')])
      }
    }

    if (process.env.VUE_APP_VXE_ENV === 'development') {
      const customOpts = this.customOpts
      if (!this.id) {
        if ((this.customConfig ? isEnableConf(customOpts) : customOpts.enabled) && customOpts.storage) {
          errLog('vxe.error.reqProp', ['id'])
        }
      }
      if (this.treeConfig && this.checkboxOpts.range) {
        errLog('vxe.error.noTree', ['checkbox-config.range'])
      }
      if (this.rowOpts.height && !this.showOverflow) {
        warnLog('vxe.error.notProp', ['table.show-overflow'])
      }
      if (!this.handleMousedownCellAreaEvent) {
        if (this.areaConfig) {
          warnLog('vxe.error.notProp', ['area-config'])
        }
        if (this.clipConfig) {
          warnLog('vxe.error.notProp', ['clip-config'])
        }
        if (this.fnrConfig) {
          warnLog('vxe.error.notProp', ['fnr-config'])
        }
        if (this.mouseOpts.area) {
          errLog('vxe.error.notProp', ['mouse-config.area'])
          return
        }
      }
      if (this.dragConfig) {
        warnLog('vxe.error.delProp', ['drag-config', 'row-drag-config'])
      }
      if (this.treeConfig && treeOpts.children) {
        warnLog('vxe.error.delProp', ['tree-config.children', 'tree-config.childrenField'])
      }
      if (this.treeConfig && treeOpts.line) {
        warnLog('vxe.error.delProp', ['tree-config.line', 'tree-config.showLine'])
      }
      if (this.mouseOpts.area && this.mouseOpts.selected) {
        warnLog('vxe.error.errConflicts', ['mouse-config.area', 'mouse-config.selected'])
      }
      // if (this.mouseOpts.area && this.checkboxOpts.range) {
      //   warnLog('vxe.error.errConflicts', ['mouse-config.area', 'checkbox-config.range'])
      // }
      if (this.mouseOpts.area && (this.treeConfig && !treeOpts.transform)) {
        errLog('vxe.error.noTree', ['mouse-config.area'])
      }
    }

    // v4 中只支持对象类型
    if (process.env.VUE_APP_VXE_ENV === 'development') {
      // 在 v3.0 中废弃 context-menu
      if (this.contextMenu) {
        warnLog('vxe.error.delProp', ['context-menu', 'menu-config'])
        if (!XEUtils.isObject(this.contextMenu)) {
          warnLog('vxe.error.errProp', [`table.context-menu=${this.contextMenu}`, 'table.context-menu={}'])
        }
      }
      if (this.menuConfig && !XEUtils.isObject(this.menuConfig)) {
        warnLog('vxe.error.errProp', [`table.menu-config=${this.menuConfig}`, 'table.menu-config={}'])
      }
      if (this.exportConfig && !XEUtils.isObject(this.exportConfig)) {
        warnLog('vxe.error.errProp', [`table.export-config=${this.exportConfig}`, 'table.export-config={}'])
      }
      if (this.importConfig && !XEUtils.isObject(this.importConfig)) {
        warnLog('vxe.error.errProp', [`table.import-config=${this.importConfig}`, 'table.import-config={}'])
      }
      if (this.printConfig && !XEUtils.isObject(this.printConfig)) {
        warnLog('vxe.error.errProp', [`table.print-config=${this.printConfig}`, 'table.print-config={}'])
      }
      if (this.treeConfig && !XEUtils.isObject(this.treeConfig)) {
        warnLog('vxe.error.errProp', [`table.tree-config=${this.treeConfig}`, 'table.tree-config={}'])
      }
      if (this.customConfig && !XEUtils.isObject(this.customConfig)) {
        warnLog('vxe.error.errProp', [`table.custom-config=${this.customConfig}`, 'table.custom-config={}'])
      }
      if (this.editConfig && !XEUtils.isObject(this.editConfig)) {
        warnLog('vxe.error.errProp', [`table.edit-config=${this.editConfig}`, 'table.edit-config={}'])
      }
      if (this.emptyRender && !XEUtils.isObject(this.emptyRender)) {
        warnLog('vxe.error.errProp', [`table.empty-render=${this.emptyRender}`, 'table.empty-render={}'])
      }
      if (this.editConfig && this.editOpts.activeMethod) {
        warnLog('vxe.error.delProp', ['table.edit-config.activeMethod', 'table.edit-config.beforeEditMethod'])
      }
      if (this.treeConfig && this.checkboxOpts.isShiftKey) {
        errLog('vxe.error.errConflicts', ['tree-config', 'checkbox-config.isShiftKey'])
      }
      if (this.checkboxOpts.halfField) {
        warnLog('vxe.error.delProp', ['checkbox-config.halfField', 'checkbox-config.indeterminateField'])
      }
    }

    // 检查是否有安装需要的模块
    if (process.env.VUE_APP_VXE_ENV === 'development') {
      if (this.editConfig && !this._insert) {
        errLog('vxe.error.reqModule', ['Edit'])
      }
      if (this.editRules && !this._validate) {
        errLog('vxe.error.reqModule', ['Validator'])
      }
      if ((this.checkboxOpts.range || this.keyboardConfig || this.mouseConfig) && !this.handleCellMousedownEvent) {
        errLog('vxe.error.reqModule', ['Keyboard'])
      }
      if ((this.printConfig || this.importConfig || this.exportConfig) && !this._exportData) {
        errLog('vxe.error.reqModule', ['Export'])
      }
    }

    Object.assign(scrollYStore, {
      startIndex: 0,
      endIndex: 1,
      visibleSize: 0,
      adaptive: sYOpts.adaptive !== false
    })
    Object.assign(scrollXStore, {
      startIndex: 0,
      endIndex: 1,
      visibleSize: 0
    })
    this.loadTableData(data).then(() => {
      if (data && data.length) {
        this.inited = true
        this.initStatus = true
        this.handleLoadDefaults()
      }
      this.handleInitDefaults()
      this.updateStyle()
    })
    globalEvents.on(this, 'paste', this.handleGlobalPasteEvent)
    globalEvents.on(this, 'copy', this.handleGlobalCopyEvent)
    globalEvents.on(this, 'cut', this.handleGlobalCutEvent)
    globalEvents.on(this, 'mousedown', this.handleGlobalMousedownEvent)
    globalEvents.on(this, 'blur', this.handleGlobalBlurEvent)
    globalEvents.on(this, 'mousewheel', this.handleGlobalMousewheelEvent)
    globalEvents.on(this, 'keydown', this.handleGlobalKeydownEvent)
    globalEvents.on(this, 'resize', this.handleGlobalResizeEvent)
    globalEvents.on(this, 'contextmenu', this.handleGlobalContextmenuEvent)
    this.preventEvent(null, 'created')
  },
  mounted () {
    const $xeTable = this
    const props = $xeTable

    const columnOpts = $xeTable.computeColumnOpts
    const rowOpts = $xeTable.computeRowOpts
    const customOpts = $xeTable.computeCustomOpts

    if (columnOpts.drag || rowOpts.drag || customOpts.allowSort) {
      initTpImg()
    }

    if (process.env.VUE_APP_VXE_ENV === 'development') {
      const { $listeners } = this
      if (!this.menuConfig && ($listeners['menu-click'] || $listeners['cell-menu'] || $listeners['header-cell-menu'] || $listeners['footer-cell-menu'])) {
        warnLog('vxe.error.reqProp', ['menu-config'])
      }
      if (!this.tooltipConfig && ($listeners['cell-mouseenter'] || $listeners['cell-mouseleave'])) {
        warnLog('vxe.error.reqProp', ['tooltip-config'])
      }
    }

    if (process.env.VUE_APP_VXE_ENV === 'development') {
      // 使用已安装的组件，如果未安装则不渲染
      const VxeUILoadingComponent = VxeUI.getComponent<VxeLoadingComponent>('VxeLoading')
      const VxeUITooltipComponent = VxeUI.getComponent<VxeTooltipComponent>('VxeTooltip')

      $xeTable.$nextTick(() => {
        if (props.loading) {
          if (!VxeUILoadingComponent && !this.$scopedSlots.loading) {
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
    if (this.autoResize) {
      const resizeObserver = globalResize.create(() => {
        if (this.autoResize) {
          this.recalculate(true)
        }
      })
      resizeObserver.observe(this.$el)
      resizeObserver.observe(this.getParentElem())
      this.$resize = resizeObserver
    }
    this.preventEvent(null, 'mounted')
  },
  activated () {
    this.recalculate().then(() => this.refreshScroll())
    this.preventEvent(null, 'activated')
  },
  deactivated () {
    this.preventEvent(null, 'deactivated')
  },
  beforeDestroy () {
    if (this.$resize) {
      this.$resize.disconnect()
    }
    this.closeFilter()
    this.closeMenu()
    this.preventEvent(null, 'beforeDestroy')
  },
  destroyed () {
    globalEvents.off(this, 'paste')
    globalEvents.off(this, 'copy')
    globalEvents.off(this, 'cut')
    globalEvents.off(this, 'mousedown')
    globalEvents.off(this, 'blur')
    globalEvents.off(this, 'mousewheel')
    globalEvents.off(this, 'keydown')
    globalEvents.off(this, 'resize')
    globalEvents.off(this, 'contextmenu')
    this.preventEvent(null, 'destroyed')
  },
  render (h: CreateElement) {
    // 使用已安装的组件，如果未安装则不渲染
    const VxeUILoadingComponent = VxeUI.getComponent<VxeLoadingComponent>('VxeLoading')
    const VxeUITooltipComponent = VxeUI.getComponent<VxeTooltipComponent>('VxeTooltip')

    const $xeTable = this
    const $xeGrid = $xeTable.$xeGrid

    const {
      _e,
      $scopedSlots,
      tId,
      isCalcColumn,
      tableData,
      tableColumn,
      tableGroupColumn,
      isGroup,
      loading,
      stripe,
      showHeader,
      height,
      treeOpts,
      treeConfig,
      mouseConfig,
      mouseOpts,
      areaOpts,
      computeSize,
      validOpts,
      showFooter,
      overflowX,
      overflowY,
      scrollXLoad,
      scrollYLoad,
      scrollbarHeight,
      highlightCell,
      highlightHoverRow,
      highlightHoverColumn,
      editConfig,
      validTipOpts,
      initStore,
      columnStore,
      filterStore,
      customStore,
      ctxMenuStore,
      ctxMenuOpts,
      footerTableData,
      columnOpts,
      rowOpts,
      checkboxOpts,
      loadingOpts,
      resizableOpts,
      editRules
    } = $xeTable
    const { leftList, rightList } = columnStore
    const loadingSlot = $scopedSlots.loading
    const currLoading = this._isLoading || loading
    const vSize = computeSize
    const tableBorder = $xeTable.computeTableBorder
    const virtualScrollBars = $xeTable.computeVirtualScrollBars
    const isArea = mouseConfig && mouseOpts.area
    const columnDragOpts = $xeTable.computeColumnDragOpts
    return h('div', {
      ref: 'refElem',
      class: ['vxe-table', 'vxe-table--render-default', `tid_${tId}`, vSize ? `size--${vSize}` : '', `border--${tableBorder}`, {
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
        'is--animat': !!this.animat,
        'is--padding': this.padding,
        'is--round': this.round,
        'is--stripe': !treeConfig && stripe,
        'is--loading': currLoading,
        'is--empty': !currLoading && !tableData.length,
        'is--scroll-y': overflowY,
        'is--scroll-x': overflowX,
        'is--virtual-x': scrollXLoad,
        'is--virtual-y': scrollYLoad
      }],
      attrs: {
        spellcheck: false
      },
      on: {
        keydown: this.keydownEvent
      }
    }, [
      /**
       * 隐藏列
       */
      h('div', {
        class: 'vxe-table-slots',
        ref: 'hideColumn'
      }, this.$slots.default),
      h('div', {
        key: 'tw',
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
              ref: 'tableHeader',
              props: {
                tableData,
                tableColumn,
                tableGroupColumn,
                size: vSize
              }
            })
            : _e(),
          /**
           * 表体
           */
          h(TableBodyComponent, {
            ref: 'tableBody',
            props: {
              tableData,
              tableColumn,
              size: vSize
            }
          }),
          /**
           * 表尾
           */
          showFooter
            ? h(TableFooterComponent, {
              ref: 'tableFooter',
              props: {
                footerTableData,
                tableColumn,
                size: vSize
              }
            })
            : _e()
        ]),
        h('div', {
          class: 'vxe-table--fixed-wrapper'
        }, [
          leftList && leftList.length && overflowX ? renderFixed(h, this, 'left') : _e(),
          rightList && rightList.length && overflowX ? renderFixed(h, this, 'right') : _e()
        ])
      ]),
      virtualScrollBars.x
        ? h('div', {
          key: 'vx',
          ref: 'refScrollXVirtualElem',
          class: 'vxe-table--scroll-x-virtual'
        }, [
          h('div', {
            ref: 'refScrollXHandleElem',
            class: 'vxe-table--scroll-x-handle',
            on: {
              scroll: $xeTable.scrollXEvent
            }
          }, [
            h('div', {
              ref: 'refScrollXSpaceElem',
              class: 'vxe-table--scroll-x-space'
            })
          ])
        ])
        : renderEmptyElement($xeTable),
      virtualScrollBars.y
        ? h('div', {
          key: 'vy',
          ref: 'refScrollYVirtualElem',
          class: 'vxe-table--scroll-y-virtual'
        }, [
          h('div', {
            ref: 'refScrollYHandleElem',
            class: 'vxe-table--scroll-y-handle',
            on: {
              scroll: $xeTable.scrollYEvent
            }
          }, [
            h('div', {
              ref: 'refScrollYSpaceElem',
              class: 'vxe-table--scroll-y-space'
            })
          ])
        ])
        : renderEmptyElement($xeTable),
      /**
       * 空数据
       */
      h('div', {
        key: 'tn',
        ref: 'emptyPlaceholder',
        class: 'vxe-table--empty-placeholder'
      }, [
        h('div', {
          class: 'vxe-table--empty-content'
        }, renderEmptyBody(h, this))
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
        class: 'vxe-table--resizable-bar',
        style: overflowX
          ? {
              'padding-bottom': `${scrollbarHeight}px`
            }
          : {},
        ref: 'resizeBar'
      }, resizableOpts.showDragTip
        ? [
            h('div', {
              ref: 'refCellResizeTip',
              class: 'vxe-table--resizable-number-tip'
            }, '23432px')
          ]
        : []),
      /**
       * 加载中
       */
      VxeUILoadingComponent
        ? h(VxeUILoadingComponent, {
          key: 'lg',
          class: 'vxe-table--loading',
          props: {
            value: currLoading,
            icon: loadingOpts.icon,
            text: loadingOpts.text
          },
          scopedSlots: loadingSlot
            ? {
                default: () => $xeTable.callSlot(loadingSlot, { $table: $xeTable, $grid: $xeGrid, loading: currLoading }, h)
              }
            : {}
        })
        : loadingSlot
          ? h('div', {
            class: ['vxe-loading--custom-wrapper', {
              'is--visible': currLoading
            }]
          }, $xeTable.callSlot(loadingSlot, { $table: $xeTable, $grid: $xeGrid, loading: currLoading }, h))
          : renderEmptyElement($xeTable),
      /**
       * 自定义列
       */
      initStore.custom
        ? h(TableCustomPanelComponent, {
          key: 'cs',
          ref: 'customWrapper',
          props: {
            customStore
          }
        })
        : renderEmptyElement($xeTable),
      /**
       * 筛选
       */
      initStore.filter
        ? h(TableFilterPanelComponent, {
          key: 'tf',
          ref: 'filterWrapper',
          props: {
            filterStore
          }
        })
        : _e(),
      /**
       * 导入
       */
      initStore.import && this.importConfig
        ? h(TableImportPanelComponent, {
          key: 'it',
          props: {
            defaultOptions: this.importParams,
            storeData: this.importStore
          }
        })
        : _e(),
      /**
       * 导出
       */
      initStore.export && (this.exportConfig || this.printConfig)
        ? h(TableExportPanelComponent, {
          key: 'et',
          props: {
            defaultOptions: this.exportParams,
            storeData: this.exportStore
          }
        })
        : _e(),
      /**
       * 快捷菜单
       */
      ctxMenuStore.visible && this.isCtxMenu
        ? h(TableMenuPanelComponent, {
          key: 'tm',
          ref: 'ctxWrapper',
          props: {
            ctxMenuStore,
            ctxMenuOpts
          }
        })
        : _e(),
      /**
       * 拖拽提示
       */
      renderDragTip(h, this),
      h('div', {}, [
        /**
         * 提示相关
         */
        VxeUITooltipComponent
          ? h(VxeUITooltipComponent, {
            key: 'ctp',
            ref: 'commTip',
            props: {
              isArrow: false,
              enterable: false
            }
          })
          : _e(),
        /**
         * 工具提示
         */
        VxeUITooltipComponent
          ? h(VxeUITooltipComponent, {
            key: 'btp',
            ref: 'tooltip',
            props: Object.assign({}, this.tipConfig, this.tooltipStore.currOpts)
          })
          : _e(),
        /**
         * 校验提示
         */
        VxeUITooltipComponent && this.editRules && validOpts.showMessage && (validOpts.message === 'default' ? !height : validOpts.message === 'tooltip')
          ? h(VxeUITooltipComponent, {
            key: 'vtp',
            ref: 'validTip',
            class: [{
              'old-cell-valid': editRules && getConfig().cellVaildMode === 'obsolete'
            }, 'vxe-table--valid-error'],
            props: validOpts.message === 'tooltip' || tableData.length === 1 ? validTipOpts : null
          })
          : _e()
      ])
    ])
  },
  methods
} as any
