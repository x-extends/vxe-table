import { CreateElement } from 'vue'
import XEUtils from 'xe-utils'
import { getFuncText, isEnableConf } from '../../ui/src/utils'
import { initTpImg } from '../../ui/src/dom'
import { createHandleGetRowId, getCellHeight, hasDeepKey } from './util'
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
import type { VxeTableConstructor, VxeTablePrivateMethods, TableInternalData, TableReactData, VxeTableDefines } from '../../../types'

const { getConfig, getIcon, getI18n, renderer, globalResize, globalEvents, globalMixins, renderEmptyElement } = VxeUI

function handleKeyField ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const internalData = $xeTable as unknown as TableInternalData

  const keyField = $xeTable.computeRowField
  internalData.currKeyField = keyField
  internalData.isCurrDeepKey = hasDeepKey(keyField)
}

/**
 * 渲染浮固定列
 * 分别渲染左边固定列和右边固定列
 * 如果宽度足够情况下，则不需要渲染固定列
 */
function renderFixed (h: CreateElement, $xeTable: VxeTableConstructor & VxeTablePrivateMethods, fixedType: any) {
  const props = $xeTable
  const reactData = $xeTable as unknown as TableReactData

  const { showHeader, showFooter } = props
  const { tableData, tableColumn, tableGroupColumn, columnStore, footerTableData } = reactData
  const isFixedLeft = fixedType === 'left'
  const fixedColumn = isFixedLeft ? columnStore.leftList : columnStore.rightList
  return h('div', {
    ref: isFixedLeft ? 'refLeftContainer' : 'refRightContainer',
    class: `vxe-table--fixed-${fixedType}-wrapper`
  }, [
    showHeader
      ? h(TableHeaderComponent, {
        props: {
          fixedType,
          tableData,
          tableColumn,
          tableGroupColumn,
          fixedColumn
        },
        ref: `${fixedType}Header`
      })
      : renderEmptyElement($xeTable),
    h(TableBodyComponent, {
      props: {
        fixedType,
        tableData,
        tableColumn,
        fixedColumn
      },
      ref: `${fixedType}Body`
    }),
    showFooter
      ? h(TableFooterComponent, {
        props: {
          footerTableData,
          tableColumn,
          fixedColumn,
          fixedType
        },
        ref: `${fixedType}Footer`
      })
      : renderEmptyElement($xeTable)
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

  const { dragRow, dragCol } = reactData
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
      (dragRow && rowDragOpts.showDragTip) || (dragCol && columnDragOpts.showDragTip)
        ? h('div', {
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
        : renderEmptyElement($xeTable)
    ])
  }
  return renderEmptyElement($xeTable)
}

function handleUpdateResize (_vm: any) {
  const { $el } = _vm
  if ($el && $el.clientWidth && $el.clientHeight) {
    _vm.recalculate()
  }
}

function renderRowExpandedVNs (h: CreateElement, $xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const props = $xeTable
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData
  const $xeGrid = $xeTable.$xeGrid

  const { treeConfig } = props
  const { expandColumn, isRowGroupStatus } = reactData
  const tableRowExpandedList: any[] = ($xeTable as any).computeTableRowExpandedList
  const expandOpts = $xeTable.computeExpandOpts
  const { mode } = expandOpts
  if (mode !== 'fixed') {
    return renderEmptyElement($xeTable)
  }
  const expandVNs = [
    h('div', {
      key: 'repY',
      ref: 'refRowExpandYSpaceElem'
    })
  ]

  if (expandColumn) {
    const { handleGetRowId } = createHandleGetRowId($xeTable)
    tableRowExpandedList.forEach((row) => {
      const expandOpts = $xeTable.computeExpandOpts
      const { height: expandHeight, padding, indent } = expandOpts
      const { fullAllDataRowIdData, fullColumnIdData } = internalData
      const treeOpts = $xeTable.computeTreeOpts
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
          attrs: {
            rowid
          },
          style: cellStyle
        }, expandColumn.renderData(h, expandParams))
      )
    })
  }

  return h('div', {
    ref: 'refRowExpandElem',
    class: 'vxe-table--row-expanded-wrapper'
  }, expandVNs)
}

function renderScrollX (h: CreateElement, $xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  return h('div', {
    key: 'vsx',
    ref: 'refScrollXVirtualElem',
    class: 'vxe-table--scroll-x-virtual'
  }, [
    h('div', {
      ref: 'refScrollXLeftCornerElem',
      class: 'vxe-table--scroll-x-left-corner'
    }),
    h('div', {
      ref: 'refScrollXWrapperElem',
      class: 'vxe-table--scroll-x-wrapper'
    }, [
      h('div', {
        ref: 'refScrollXHandleElem',
        class: 'vxe-table--scroll-x-handle',
        on: {
          scroll: $xeTable.triggerVirtualScrollXEvent
        }
      }, [
        h('div', {
          ref: 'refScrollXSpaceElem',
          class: 'vxe-table--scroll-x-space'
        })
      ])
    ]),
    h('div', {
      ref: 'refScrollXRightCornerElem',
      class: 'vxe-table--scroll-x-right-corner'
    })
  ])
}

function renderScrollY (h: CreateElement, $xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  return h('div', {
    ref: 'refScrollYVirtualElem',
    class: 'vxe-table--scroll-y-virtual'
  }, [
    h('div', {
      ref: 'refScrollYTopCornerElem',
      class: 'vxe-table--scroll-y-top-corner'
    }),
    h('div', {
      ref: 'refScrollYWrapperElem',
      class: 'vxe-table--scroll-y-wrapper'
    }, [
      h('div', {
        ref: 'refScrollYHandleElem',
        class: 'vxe-table--scroll-y-handle',
        on: {
          scroll: $xeTable.triggerVirtualScrollYEvent
        }
      }, [
        h('div', {
          ref: 'refScrollYSpaceElem',
          class: 'vxe-table--scroll-y-space'
        })
      ])
    ]),
    h('div', {
      ref: 'refScrollYBottomCornerElem',
      class: 'vxe-table--scroll-y-bottom-corner'
    })
  ])
}

function renderViewport (h: CreateElement, $xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const props = $xeTable
  const reactData = $xeTable as unknown as TableReactData

  const { showHeader, showFooter } = props
  const { overflowX, tableData, tableColumn, tableGroupColumn, footerTableData, columnStore } = reactData
  const { leftList, rightList } = columnStore

  return h('div', {
    ref: 'refTableViewportElem',
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
          ref: 'refTableHeader',
          props: {
            tableData,
            tableColumn,
            tableGroupColumn
          }
        })
        : renderEmptyElement($xeTable),
      /**
         * 表体
         */
      h(TableBodyComponent, {
        ref: 'refTableBody',
        props: {
          tableData,
          tableColumn
        }
      }),
      /**
         * 表尾
         */
      showFooter
        ? h(TableFooterComponent, {
          ref: 'refTableFooter',
          props: {
            footerTableData,
            tableColumn
          }
        })
        : renderEmptyElement($xeTable)
    ]),
    h('div', {
      class: 'vxe-table--fixed-wrapper'
    }, [
      leftList && leftList.length && overflowX ? renderFixed(h, $xeTable, 'left') : renderEmptyElement($xeTable),
      rightList && rightList.length && overflowX ? renderFixed(h, $xeTable, 'right') : renderEmptyElement($xeTable)
    ]),
    renderRowExpandedVNs(h, $xeTable)
  ])
}

function renderBody (h: CreateElement, $xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const scrollbarYToLeft = $xeTable.computeScrollbarYToLeft
  return h('div', {
    class: 'vxe-table--layout-wrapper'
  }, scrollbarYToLeft
    ? [
        renderScrollY(h, $xeTable),
        renderViewport(h, $xeTable)
      ]
    : [
        renderViewport(h, $xeTable),
        renderScrollY(h, $xeTable)
      ])
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
    }
  },
  data () {
    const xID = XEUtils.uniqueId()
    return {
      xID,
      tId: xID,
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
      hasFixedColumn: false,
      // 树节点列信息
      treeNodeColumn: null,
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
        }
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
        isTitle: false,
        isFooter: false
      },

      visiblwRowsFlag: 1,

      isRowGroupStatus: false,

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
      isColLoading: false,

      reScrollFlag: 0,
      reLayoutFlag: 0,
      footFlag: 0
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
    computeRowField () {
      const $xeTable = this
      const props = $xeTable

      const rowOpts = $xeTable.computeRowOpts
      return `${props.rowId || rowOpts.keyField || '_X_ROW_KEY'}`
    },
    validOpts () {
      return this.computeValidOpts
    },
    computeValidOpts () {
      return Object.assign({ message: 'default' }, getConfig().table.validConfig, this.validConfig)
    },
    sXOpts () {
      return this.computeVirtualXOpts
    },
    computeSXOpts () {
      return this.computeVirtualXOpts
    },
    computeScrollXThreshold () {
      const $xeTable = this

      const virtualXOpts = $xeTable.computeVirtualXOpts
      const { threshold } = virtualXOpts
      if (threshold) {
        return XEUtils.toNumber(threshold)
      }
      return 0
    },
    sYOpts () {
      return this.computeVirtualYOpts
    },
    computeSYOpts () {
      return this.computeVirtualYOpts
    },
    computeVirtualXOpts () {
      const $xeTable = this
      const props = $xeTable

      return Object.assign({}, getConfig().table.virtualXConfig || getConfig().table.scrollX, props.virtualXConfig || props.scrollX)
    },
    computeVirtualYOpts () {
      const $xeTable = this
      const props = $xeTable

      return Object.assign({}, getConfig().table.virtualYConfig || getConfig().table.scrollY, props.virtualYConfig || props.scrollY)
    },
    computeScrollbarOpts () {
      const $xeTable = this
      const props = $xeTable

      return Object.assign({}, getConfig().table.scrollbarConfig, props.scrollbarConfig)
    },
    computeScrollbarXToTop () {
      const $xeTable = this

      const scrollbarOpts = $xeTable.computeScrollbarOpts
      return !!(scrollbarOpts.x && scrollbarOpts.x.position === 'top')
    },
    computeScrollbarYToLeft () {
      const $xeTable = this

      const scrollbarOpts = $xeTable.computeScrollbarOpts
      return !!(scrollbarOpts.y && scrollbarOpts.y.position === 'left')
    },
    computeScrollYThreshold () {
      const $xeTable = this

      const virtualYOpts = $xeTable.computeVirtualYOpts
      const { threshold } = virtualYOpts
      if (threshold) {
        return XEUtils.toNumber(threshold)
      }
      return 0
    },
    rowHeightMaps () {
      return this.computeRowHeightMaps
    },
    computeRowHeightMaps () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      return reactData.rowHeightStore
    },
    computeDefaultRowHeight () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

      const vSize = $xeTable.computeSize
      const rowHeightMaps = $xeTable.computeRowHeightMaps
      return rowHeightMaps[vSize || 'default'] || 18
    },
    columnOpts () {
      return this.computeColumnOpts
    },
    computeColumnOpts () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const props = $xeTable

      return Object.assign({}, getConfig().table.columnConfig, props.columnConfig)
    },
    computeCurrentColumnOpts () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const props = $xeTable

      return Object.assign({}, getConfig().table.currentColumnConfig, props.currentColumnConfig)
    },
    computeCellOpts () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const props = $xeTable

      const cellOpts = Object.assign({}, getConfig().table.cellConfig, props.cellConfig)
      if (cellOpts.height) {
        cellOpts.height = XEUtils.toNumber(cellOpts.height)
      }
      return cellOpts
    },
    computeHeaderCellOpts () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const props = $xeTable

      const headerCellOpts = Object.assign({}, getConfig().table.headerCellConfig, props.headerCellConfig)
      const cellOpts = $xeTable.computeCellOpts
      headerCellOpts.height = XEUtils.toNumber(getCellHeight(headerCellOpts.height || cellOpts.height))
      return headerCellOpts
    },
    computeFooterCellOpts () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const props = $xeTable

      const footerCellOpts = Object.assign({}, getConfig().table.footerCellConfig, props.footerCellConfig)
      const cellOpts = $xeTable.computeCellOpts
      footerCellOpts.height = XEUtils.toNumber(getCellHeight(footerCellOpts.height || cellOpts.height))
      return footerCellOpts
    },
    rowOpts () {
      return this.computeRowOpts
    },
    computeRowOpts () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const props = $xeTable

      return Object.assign({}, getConfig().table.rowConfig, props.rowConfig)
    },
    computeAggregateOpts () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const props = $xeTable

      return Object.assign({}, getConfig().table.aggregateConfig || getConfig().table.rowGroupConfig, props.aggregateConfig || props.rowGroupConfig)
    },
    computeRowGroupOpts () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

      return $xeTable.computeAggregateOpts
    },
    computeCurrentRowOpts () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const props = $xeTable

      return Object.assign({}, getConfig().table.currentRowConfig, props.currentRowConfig)
    },
    computeRowDragOpts () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const props = $xeTable

      return Object.assign({}, getConfig().table.rowDragConfig, props.rowDragConfig)
    },
    computeColumnDragOpts () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const props = $xeTable

      return Object.assign({}, getConfig().table.columnDragConfig, props.columnDragConfig)
    },
    resizeOpts () {
      return this.computeResizeOpts
    },
    computeResizeOpts () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const props = $xeTable

      return Object.assign({}, getConfig().table.resizeConfig, props.resizeConfig)
    },
    resizableOpts () {
      return this.computeResizableOpts
    },
    computeResizableOpts () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const props = $xeTable

      return Object.assign({}, getConfig().table.resizableConfig, props.resizableConfig)
    },
    seqOpts () {
      return this.computeSeqOpts
    },
    computeSeqOpts () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const props = $xeTable

      return Object.assign({ startIndex: 0 }, getConfig().table.seqConfig, props.seqConfig)
    },
    radioOpts () {
      return this.computeRadioOpts
    },
    computeRadioOpts () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const props = $xeTable

      return Object.assign({}, getConfig().table.radioConfig, props.radioConfig)
    },
    checkboxOpts () {
      return this.computeCheckboxOpts
    },
    computeCheckboxOpts () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const props = $xeTable

      return Object.assign({}, getConfig().table.checkboxConfig, props.checkboxConfig)
    },
    tooltipOpts () {
      return this.computeTooltipOpts
    },
    computeTooltipOpts () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const props = $xeTable

      return Object.assign({}, getConfig().tooltip, getConfig().table.tooltipConfig, props.tooltipConfig)
    },
    tipConfig () {
      return { ...this.tooltipOpts }
    },
    computeTableTipConfig () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      const { tooltipStore } = reactData
      const tooltipOpts = $xeTable.computeTooltipOpts
      return Object.assign({}, tooltipOpts, tooltipStore.currOpts)
    },
    computeValidTipConfig () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

      const tooltipOpts = $xeTable.computeTooltipOpts
      return Object.assign({}, tooltipOpts)
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
      return this.computeHeaderMenu
    },
    computeHeaderMenu () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

      const menuOpts = $xeTable.computeMenuOpts
      const headerOpts = menuOpts.header
      return headerOpts && headerOpts.options ? headerOpts.options : []
    },
    bodyCtxMenu () {
      return this.computeBodyMenu
    },
    computeBodyMenu () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

      const menuOpts = $xeTable.computeMenuOpts
      const bodyOpts = menuOpts.body
      return bodyOpts && bodyOpts.options ? bodyOpts.options : []
    },
    footerCtxMenu () {
      return this.computeFooterMenu
    },
    computeFooterMenu () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

      const menuOpts = $xeTable.computeMenuOpts
      const footerOpts = menuOpts.footer
      return footerOpts && footerOpts.options ? footerOpts.options : []
    },
    isCtxMenu () {
      return this.computeIsMenu
    },
    computeIsMenu () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const props = $xeTable

      const menuOpts = $xeTable.computeMenuOpts
      const headerMenu = $xeTable.computeHeaderMenu
      const bodyMenu = $xeTable.computeBodyMenu
      const footerMenu = $xeTable.computeFooterMenu
      return !!(((props as any).contextMenu || props.menuConfig) && isEnableConf(menuOpts) && (headerMenu.length || bodyMenu.length || footerMenu.length))
    },
    ctxMenuList () {
      return this.computeMenuList
    },
    computeMenuList () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      const { ctxMenuStore } = reactData
      const rest: any[] = []
      ctxMenuStore.list.forEach((list) => {
        list.forEach((item) => {
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
    computeLeftFixedWidth () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      const { columnStore } = reactData
      const { leftList } = columnStore
      let leftWidth = 0
      for (let i = 0; i < leftList.length; i++) {
        const column = leftList[i]
        leftWidth += column.renderWidth
      }
      return leftWidth
    },
    computeRightFixedWidth () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      const { columnStore } = reactData
      const { rightList } = columnStore
      let leftWidth = 0
      for (let i = 0; i < rightList.length; i++) {
        const column = rightList[i]
        leftWidth += column.renderWidth
      }
      return leftWidth
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
    computeCellOffsetWidth () {
      return this.border ? Math.max(2, Math.ceil(this.scrollbarWidth / this.tableColumn.length)) : 1
    },
    customOpts () {
      return this.computeCustomOpts
    },
    computeCustomOpts () {
      return Object.assign({}, getConfig().table.customConfig, this.customConfig)
    },
    computeTableRowExpandedList () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const props = $xeTable
      const reactData = $xeTable as unknown as TableReactData
      const internalData = $xeTable as unknown as TableInternalData

      const { treeConfig } = props
      const { rowExpandedFlag, expandColumn, rowGroupExpandedFlag, treeExpandedFlag, isRowGroupStatus } = reactData
      const { visibleDataRowIdData, rowExpandedMaps } = internalData
      const treeOpts = $xeTable.computeTreeOpts
      const { transform } = treeOpts
      const expandList: any[] = []
      if (expandColumn && rowExpandedFlag && rowGroupExpandedFlag && treeExpandedFlag) {
        if (isRowGroupStatus || (treeConfig && transform)) {
          XEUtils.each(rowExpandedMaps, (row, rowid) => {
            if (visibleDataRowIdData[rowid]) {
              expandList.push(row)
            }
          })
        } else {
          return XEUtils.values(rowExpandedMaps)
        }
      }
      return expandList
    },
    computeAutoWidthColumnList () {
      const { tableColumn, visibleColumn } = this
      return tableColumn.length || visibleColumn.length ? visibleColumn.filter((column: any) => column.width === 'auto' || column.minWidth === 'auto') : []
    },
    computeFixedColumnSize () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData
      const internalData = $xeTable as unknown as TableInternalData

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
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

      return $xeTable.computeFixedColumnSize
    },
    computeIsMaxFixedColumn () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

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
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      const { overflowX, scrollXLoad, overflowY, scrollYLoad } = reactData
      return {
        x: overflowX && scrollXLoad,
        y: overflowY && scrollYLoad
      }
    },
    computeRowGroupFields () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

      const aggregateOpts = $xeTable.computeAggregateOpts
      return aggregateOpts.groupFields
    },
    tabsResizeFlag () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const $xeTabs = $xeTable.$xeTabs

      return $xeTabs ? $xeTabs.reactData.resizeFlag : null
    },
    computeVxeLanguage () {
      return VxeUI.getLanguage()
    }
  } as any,
  watch: {
    data (value: any) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      const { initStatus } = this
      if (value && value.length >= 50000) {
        warnLog('vxe.error.errLargeData', ['loadData(data), reloadData(data)'])
      }
      this.loadTableData(value || [], false).then(() => {
        const { scrollXLoad, scrollYLoad, expandColumn } = reactData
        const expandOpts = $xeTable.computeExpandOpts
        this.inited = true
        this.initStatus = true
        if (!initStatus) {
          this.handleLoadDefaults()
        }
        // const checkboxColumn = this.tableFullColumn.find(column => column.type === 'checkbox')
        // if (checkboxColumn && this.tableFullData.length > 300 && !this.checkboxOpts.checkField) {
        //   warnLog('vxe.error.checkProp', ['checkbox-config.checkField'])
        // }
        if ((scrollXLoad || scrollYLoad) && (expandColumn && expandOpts.mode !== 'fixed')) {
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

    computeSize () {
      this.reScrollFlag++
    },
    showHeader () {
      this.reScrollFlag++
    },
    showFooter () {
      this.reScrollFlag++
    },
    overflowX () {
      this.reScrollFlag++
    },
    overflowY () {
      this.reScrollFlag++
    },
    reScrollFlag () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

      $xeTable.$nextTick(() => {
        $xeTable.recalculate(true).then(() => $xeTable.refreshScroll())
      })
    },

    height () {
      this.reLayoutFlag++
    },
    maxHeight () {
      this.reLayoutFlag++
    },
    computeScrollbarXToTop () {
      this.reLayoutFlag++
    },
    computeScrollbarYToLeft () {
      this.reLayoutFlag++
    },
    computeVxeLanguage () {
      this.reLayoutFlag++
    },
    reLayoutFlag () {
      const $xeTable = this

      $xeTable.$nextTick(() => $xeTable.recalculate(true))
    },

    footerData () {
      this.footFlag++
    },
    footFlag () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

      $xeTable.updateFooter()
    },

    syncResize (value: any) {
      if (value) {
        handleUpdateResize(this)
        this.$nextTick(() => {
          handleUpdateResize(this)
          setTimeout(() => handleUpdateResize(this))
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
    },

    computeRowGroupFields (val: any) {
      const $xeTable = this

      $xeTable.handleUpdateRowGroup(val)
    },
    computeRowField () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData
      const internalData = $xeTable as unknown as TableInternalData

      // 行主键被改变，重载表格
      const { inited, tableFullData } = internalData
      if (inited) {
        handleKeyField($xeTable)
        reactData.tableData = []
        $xeTable.$nextTick(() => {
          $xeTable.reloadData(tableFullData)
        })
      }
    }
  } as any,
  created () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const internalData = $xeTable as unknown as TableInternalData

    Object.assign($xeTable, {
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
      // 当前 hover 行
      // hoverRow: null,
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

      swYSize: 0,
      swYInterval: 0,
      swYTotal: 0
    })

    handleKeyField($xeTable)

    const { data, exportConfig, importConfig, treeConfig, showOverflow, highlightCurrentRow, highlightCurrentColumn } = props
    const { scrollXStore, scrollYStore } = internalData
    const columnOpts = $xeTable.computeColumnOpts
    const editOpts = $xeTable.computeEditOpts
    const treeOpts = $xeTable.computeTreeOpts
    const radioOpts = $xeTable.computeRadioOpts
    const checkboxOpts = $xeTable.computeCheckboxOpts
    const expandOpts = $xeTable.computeExpandOpts
    const rowOpts = $xeTable.computeRowOpts
    const customOpts = $xeTable.computeCustomOpts
    const mouseOpts = $xeTable.computeMouseOpts
    const exportOpts = $xeTable.computeExportOpts
    const importOpts = $xeTable.computeImportOpts
    const currentRowOpts = $xeTable.computeCurrentRowOpts
    const currentColumnOpts = $xeTable.computeCurrentColumnOpts
    const keyboardOpts = $xeTable.computeKeyboardOpts
    const aggregateOpts = $xeTable.computeAggregateOpts
    const { groupFields } = aggregateOpts

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
    if (props.editConfig && editOpts.showStatus && !props.keepSource) {
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
    if (this.tooltipOpts.enabled) {
      warnLog('vxe.error.delProp', ['tooltip-config.enabled', 'tooltip-config.showAll'])
    }
    if (this.highlightCurrentRow) {
      warnLog('vxe.error.delProp', ['highlight-current-row', 'row-config.isCurrent'])
    }
    if (this.highlightHoverRow) {
      warnLog('vxe.error.delProp', ['highlight-hover-row', 'row-config.isHover'])
    }
    if (this.highlightCurrentColumn) {
      warnLog('vxe.error.delProp', ['highlight-current-column', 'column-config.isCurrent'])
    }
    if (this.highlightHoverColumn) {
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
    if (treeConfig && checkboxOpts.range) {
      errLog('vxe.error.noTree', ['checkbox-config.range'])
    }
    if (rowOpts.height && !this.showOverflow) {
      warnLog('vxe.error.notProp', ['table.show-overflow'])
    }
    if (!$xeTable.triggerCellAreaMousedownEvent) {
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
    if (treeConfig && rowOpts.drag && !treeOpts.transform) {
      warnLog('vxe.error.notSupportProp', ['column-config.drag', 'tree-config.transform=false', 'tree-config.transform=true'])
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
    if (aggregateOpts.countMethod) {
      warnLog('vxe.error.delProp', ['row-group-config.countMethod', 'aggregate-config.aggregateMethod'])
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
      warnLog('vxe.error.delProp', ['table.edit-config.activeMethod', 'table.edit-config.beforeEditMethod'])
    }
    if (props.treeConfig && checkboxOpts.isShiftKey) {
      errLog('vxe.error.errConflicts', ['tree-config', 'checkbox-config.isShiftKey'])
    }
    if (checkboxOpts.halfField) {
      warnLog('vxe.error.delProp', ['checkbox-config.halfField', 'checkbox-config.indeterminateField'])
    }

    // 在 v3.0 中废弃 context-menu
    if (this.contextMenu) {
      warnLog('vxe.error.delProp', ['context-menu', 'menu-config'])
      if (!XEUtils.isObject(this.contextMenu)) {
        warnLog('vxe.error.errProp', [`table.context-menu=${this.contextMenu}`, 'table.context-menu={}'])
      }
    }
    if (props.menuConfig && !XEUtils.isObject(props.menuConfig)) {
      warnLog('vxe.error.errProp', [`table.menu-config=${props.menuConfig}`, 'table.menu-config={}'])
    }
    if (props.exportConfig && !XEUtils.isObject(props.exportConfig)) {
      warnLog('vxe.error.errProp', [`table.export-config=${props.exportConfig}`, 'table.export-config={}'])
    }
    if (props.importConfig && !XEUtils.isObject(props.importConfig)) {
      warnLog('vxe.error.errProp', [`table.import-config=${props.importConfig}`, 'table.import-config={}'])
    }
    if (props.printConfig && !XEUtils.isObject(props.printConfig)) {
      warnLog('vxe.error.errProp', [`table.print-config=${props.printConfig}`, 'table.print-config={}'])
    }
    if (props.treeConfig && !XEUtils.isObject(props.treeConfig)) {
      warnLog('vxe.error.errProp', [`table.tree-config=${props.treeConfig}`, 'table.tree-config={}'])
    }
    if (props.customConfig && !XEUtils.isObject(props.customConfig)) {
      warnLog('vxe.error.errProp', [`table.custom-config=${props.customConfig}`, 'table.custom-config={}'])
    }
    if (props.editConfig && !XEUtils.isObject(props.editConfig)) {
      warnLog('vxe.error.errProp', [`table.edit-config=${props.editConfig}`, 'table.edit-config={}'])
    }
    if (props.emptyRender && !XEUtils.isObject(props.emptyRender)) {
      warnLog('vxe.error.errProp', [`table.empty-render=${props.emptyRender}`, 'table.empty-render={}'])
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
      endIndex: 1,
      visibleSize: 0
    })
    Object.assign(scrollXStore, {
      startIndex: 0,
      endIndex: 1,
      visibleSize: 0
    })

    this.handleUpdateRowGroup(groupFields)

    this.loadTableData(data, true).then(() => {
      if (data && data.length) {
        this.inited = true
        this.initStatus = true
        this.handleLoadDefaults()
      }
      this.handleInitDefaults()
      this.updateStyle()
    })
    globalEvents.on($xeTable, 'paste', this.handleGlobalPasteEvent)
    globalEvents.on($xeTable, 'copy', this.handleGlobalCopyEvent)
    globalEvents.on($xeTable, 'cut', this.handleGlobalCutEvent)
    globalEvents.on($xeTable, 'mousedown', this.handleGlobalMousedownEvent)
    globalEvents.on($xeTable, 'blur', this.handleGlobalBlurEvent)
    globalEvents.on($xeTable, 'mousewheel', this.handleGlobalMousewheelEvent)
    globalEvents.on($xeTable, 'keydown', this.handleGlobalKeydownEvent)
    globalEvents.on($xeTable, 'resize', this.handleGlobalResizeEvent)
    globalEvents.on($xeTable, 'contextmenu', this.handleGlobalContextmenuEvent)
    $xeTable.preventEvent(null, 'created')
  },
  mounted () {
    const $xeTable = this
    const props = $xeTable

    const columnOpts = $xeTable.computeColumnOpts
    const rowOpts = $xeTable.computeRowOpts
    const customOpts = $xeTable.computeCustomOpts
    const virtualYOpts = $xeTable.computeVirtualYOpts

    if (columnOpts.drag || rowOpts.drag || customOpts.allowSort) {
      initTpImg()
    }

    const { $listeners } = this
    if (!this.menuConfig && ($listeners['menu-click'] || $listeners['cell-menu'] || $listeners['header-cell-menu'] || $listeners['footer-cell-menu'])) {
      warnLog('vxe.error.reqProp', ['menu-config'])
    }
    if (!this.tooltipConfig && ($listeners['cell-mouseenter'] || $listeners['cell-mouseleave'])) {
      warnLog('vxe.error.reqProp', ['tooltip-config'])
    }

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

    if (virtualYOpts.mode !== 'scroll') {
      const tableViewportEl = $xeTable.$refs.refTableViewportElem as HTMLDivElement
      if (tableViewportEl) {
        tableViewportEl.addEventListener('wheel', $xeTable.triggerBodyWheelEvent, { passive: false })
      }
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
    const $xeTable = this
    const internalData = $xeTable as unknown as TableInternalData

    const tableViewportEl = $xeTable.$refs.refTableViewportElem as HTMLDivElement
    if (tableViewportEl) {
      tableViewportEl.removeEventListener('wheel', $xeTable.triggerBodyWheelEvent)
    }
    internalData.cvCacheMaps = {}
    internalData.prevDragRow = null
    internalData.prevDragCol = null
    if (this.$resize) {
      this.$resize.disconnect()
    }
    this.closeFilter()
    this.closeMenu()
    this.preventEvent(null, 'beforeDestroy')
  },
  destroyed () {
    const $xeTable = this

    globalEvents.off($xeTable, 'paste')
    globalEvents.off($xeTable, 'copy')
    globalEvents.off($xeTable, 'cut')
    globalEvents.off($xeTable, 'mousedown')
    globalEvents.off($xeTable, 'blur')
    globalEvents.off($xeTable, 'mousewheel')
    globalEvents.off($xeTable, 'keydown')
    globalEvents.off($xeTable, 'resize')
    globalEvents.off($xeTable, 'contextmenu')
    this.preventEvent(null, 'destroyed')
  },
  render (h: CreateElement) {
    // 使用已安装的组件，如果未安装则不渲染
    const VxeUILoadingComponent = VxeUI.getComponent<VxeLoadingComponent>('VxeLoading')
    const VxeUITooltipComponent = VxeUI.getComponent<VxeTooltipComponent>('VxeTooltip')

    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const $xeGrid = $xeTable.$xeGrid
    const props = $xeTable
    const slots = $xeTable.$scopedSlots
    const reactData = $xeTable as unknown as TableReactData

    const { xID } = $xeTable

    const { loading, stripe, showHeader, height, treeConfig, mouseConfig, showFooter, highlightCell, highlightHoverRow, highlightHoverColumn, editConfig, editRules } = props
    const { isGroup, overflowX, overflowY, scrollXLoad, scrollYLoad, tableData, initStore, isRowGroupStatus, columnStore, filterStore, customStore } = reactData
    const { leftList, rightList } = columnStore
    const loadingSlot = slots.loading
    const tableTipConfig = $xeTable.computeTableTipConfig
    const validTipConfig = $xeTable.computeValidTipConfig
    const validOpts = $xeTable.computeValidOpts
    const checkboxOpts = $xeTable.computeCheckboxOpts
    const treeOpts = $xeTable.computeTreeOpts
    const rowOpts = $xeTable.computeRowOpts
    const columnOpts = $xeTable.computeColumnOpts
    const vSize = $xeTable.computeSize
    const tableBorder = $xeTable.computeTableBorder
    const mouseOpts = $xeTable.computeMouseOpts
    const areaOpts = $xeTable.computeAreaOpts
    const loadingOpts = $xeTable.computeLoadingOpts
    const isMenu = $xeTable.computeIsMenu
    const currLoading = reactData.isColLoading || reactData.isRowLoading || loading
    const resizableOpts = $xeTable.computeResizableOpts
    const isArea = mouseConfig && mouseOpts.area
    const columnDragOpts = $xeTable.computeColumnDragOpts
    const scrollbarXToTop = $xeTable.computeScrollbarXToTop
    const scrollbarYToLeft = $xeTable.computeScrollbarYToLeft
    return h('div', {
      ref: 'refElem',
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
        ref: 'refVarElem',
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
            renderScrollX(h, $xeTable),
            renderBody(h, $xeTable)
          ]
        : [
            renderBody(h, $xeTable),
            renderScrollX(h, $xeTable)
          ]),
      /**
       * 空数据
       */
      h('div', {
        key: 'tn',
        ref: 'refEmptyPlaceholder',
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
        key: 'tcl',
        ref: 'refColResizeBar',
        class: 'vxe-table--resizable-col-bar'
      }, resizableOpts.showDragTip
        ? [
            h('div', {
              ref: 'refColResizeTip',
              class: 'vxe-table--resizable-number-tip'
            })
          ]
        : []),
      /**
       * 行高线
       */
      h('div', {
        key: 'trl',
        ref: 'refRowResizeBar',
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
          ref: 'refTableFilter',
          props: {
            filterStore
          }
        })
        : renderEmptyElement($xeTable),
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
        : renderEmptyElement($xeTable),
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
        : renderEmptyElement($xeTable),
      /**
         * 快捷菜单
         */
      isMenu
        ? h(TableMenuPanelComponent, {
          key: 'tm',
          ref: 'refTableMenu',
          props: {
            ctxMenuStore: this.ctxMenuStore,
            ctxMenuOpts: this.ctxMenuOpts
          }
        })
        : renderEmptyElement($xeTable),
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
            ref: 'refCommTooltip',
            props: {
              isArrow: false,
              enterable: false
            }
          })
          : renderEmptyElement($xeTable),
        /**
         * 工具提示
         */
        VxeUITooltipComponent
          ? h(VxeUITooltipComponent, {
            key: 'btp',
            ref: 'refTooltip',
            props: {
              theme: tableTipConfig.theme,
              enterable: tableTipConfig.enterable,
              enterDelay: tableTipConfig.enterDelay,
              leaveDelay: tableTipConfig.leaveDelay,
              useHTML: tableTipConfig.useHTML
            }
          })
          : renderEmptyElement($xeTable),
        /**
         * 校验提示
         */
        VxeUITooltipComponent && this.editRules && validOpts.showMessage && (validOpts.message === 'default' ? !height : validOpts.message === 'tooltip')
          ? h(VxeUITooltipComponent, {
            key: 'vtp',
            ref: 'refValidTooltip',
            class: [{
              'old-cell-valid': editRules && getConfig().cellVaildMode === 'obsolete'
            }, 'vxe-table--valid-error'],
            props: {
              theme: validTipConfig.theme,
              enterable: validTipConfig.enterable,
              enterDelay: validTipConfig.enterDelay,
              leaveDelay: validTipConfig.leaveDelay
            }
          })
          : renderEmptyElement($xeTable)
      ])
    ])
  },
  methods
} as any
