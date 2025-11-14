import XEUtils from 'xe-utils'
import { getColumnList } from '../../src/util'

import type { VxeColumnPropTypes, VxeTableConstructor, VxeTablePrivateMethods, VxeTableDefines, TableReactData, TableInternalData } from '../../../../types'

function calcMaxHeight ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const $xeGantt = $xeTable.$xeGantt
  const reactData = $xeTable as unknown as TableReactData

  const { customStore } = reactData
  let wrapperEl = $xeTable.$refs.refElem as HTMLDivElement
  // 判断面板不能大于表格高度
  let tableHeight = 0
  if ($xeGantt) {
    const ganttContainerElem = $xeGantt.$refs.refGanttContainerElem as HTMLDivElement
    if (ganttContainerElem) {
      wrapperEl = ganttContainerElem
    }
  }
  if (wrapperEl) {
    tableHeight = wrapperEl.clientHeight - 28
  }
  customStore.maxHeight = Math.max(88, tableHeight)
}

function emitCustomEvent ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, type: VxeTableDefines.CustomType, evnt: Event) {
  const $xeGrid = $xeTable.$xeGrid
  const $xeGantt = $xeTable.$xeGantt

  const comp = $xeGrid || $xeGantt || $xeTable
  comp.dispatchEvent('custom', { type }, evnt)
}

export default {
  methods: {
    _getCustomVisible () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      const { customStore } = reactData
      return customStore.visible
    },
    _openCustom () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      const { initStore, customStore } = reactData
      customStore.visible = true
      initStore.custom = true
      $xeTable.handleUpdateCustomColumn()
      $xeTable.checkCustomStatus()
      calcMaxHeight($xeTable)
      return $xeTable.$nextTick().then(() => calcMaxHeight($xeTable))
    },
    _closeCustom () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      const { customStore } = reactData
      const customOpts = $xeTable.computeCustomOpts
      if (customStore.visible) {
        customStore.visible = false
        if (!customOpts.immediate) {
          $xeTable.handleCustom()
        }
      }
      return $xeTable.$nextTick()
    },
    _toggleCustom () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      const { customStore } = reactData
      if (customStore.visible) {
        return $xeTable.closeCustom()
      }
      return $xeTable.openCustom()
    },
    _saveCustom () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData
      const internalData = $xeTable as unknown as TableInternalData

      const { customColumnList, aggHandleFields, rowGroupList } = reactData
      const customOpts = $xeTable.computeCustomOpts
      const { allowVisible, allowSort, allowFixed, allowResizable, allowGroup, allowValues } = customOpts
      XEUtils.eachTree(customColumnList, (column, index, items, path, parentColumn) => {
        if (parentColumn) {
          // 更新子列信息
          column.fixed = parentColumn.fixed
        } else {
          if (allowSort) {
            const sortIndex = index + 1
            column.renderSortNumber = sortIndex
          }
          if (allowFixed) {
            column.fixed = column.renderFixed
          }
        }
        if (allowResizable) {
          if (column.renderVisible && (!column.children || !column.children.length)) {
            if (column.renderResizeWidth !== column.renderWidth) {
              column.resizeWidth = column.renderResizeWidth
              column.renderWidth = column.renderResizeWidth
            }
          }
        }
        if (allowVisible) {
          column.visible = column.renderVisible
        }
        if (allowGroup && allowValues) {
          column.aggFunc = column.renderAggFn
        }
      })
      reactData.isCustomStatus = true
      if (allowGroup && allowValues && !!$xeTable.handlePivotTableAggregateData) {
        if (rowGroupList.length !== aggHandleFields.length || rowGroupList.some((conf, i) => conf.field !== aggHandleFields[i])) {
          // 更新数据分组
          if (aggHandleFields.length) {
            $xeTable.setRowGroups(aggHandleFields)
          } else {
            $xeTable.clearRowGroups()
          }
        } else if (allowValues) {
          // 更新聚合函数
          $xeTable.handleUpdateAggData()
        }
      }
      if (allowSort) {
        internalData.collectColumn = customColumnList
      }
      return $xeTable.saveCustomStore('confirm')
    },
    _cancelCustom () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      const { customColumnList, customStore } = reactData
      const { oldSortMaps, oldFixedMaps, oldVisibleMaps } = customStore
      const customOpts = $xeTable.computeCustomOpts
      const { allowVisible, allowSort, allowFixed, allowResizable } = customOpts
      XEUtils.eachTree(customColumnList, column => {
        const colid = column.getKey()
        const visible = !!oldVisibleMaps[colid]
        const fixed = oldFixedMaps[colid] || ''
        if (allowVisible) {
          column.renderVisible = visible
          column.visible = visible
        }
        if (allowFixed) {
          column.renderFixed = fixed
          column.fixed = fixed
        }
        if (allowSort) {
          column.renderSortNumber = oldSortMaps[colid] || 0
        }
        if (allowResizable) {
          column.renderResizeWidth = column.renderWidth
        }
      }, { children: 'children' })
      return $xeTable.$nextTick()
    },
    _resetCustom (options: any) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData
      const internalData = $xeTable as unknown as TableInternalData

      const { rowGroupList } = reactData
      const { collectColumn } = internalData
      const customOpts = $xeTable.computeCustomOpts
      const { checkMethod } = customOpts
      const opts = Object.assign({
        visible: true,
        resizable: options === true,
        fixed: options === true,
        sort: options === true,
        aggFunc: options === true
      }, options)
      const allCols: VxeTableDefines.ColumnInfo[] = []
      XEUtils.eachTree(collectColumn, (column) => {
        if (opts.resizable) {
          column.resizeWidth = 0
        }
        if (opts.fixed) {
          column.fixed = column.defaultFixed
        }
        if (opts.sort) {
          column.renderSortNumber = column.sortNumber
          column.parentId = column.defaultParentId
        }
        if (!checkMethod || checkMethod({ $table: $xeTable, column })) {
          column.visible = column.defaultVisible
        }
        if (opts.aggFunc) {
          column.aggFunc = column.defaultAggFunc
          column.renderAggFn = column.defaultAggFunc
        }
        column.renderResizeWidth = column.renderWidth
        allCols.push(column)
      })
      if (opts.sort) {
        const newCollectCols = XEUtils.toArrayTree(XEUtils.orderBy(allCols, 'renderSortNumber'), { key: 'id', parentKey: 'parentId', children: 'children' })
        internalData.collectColumn = newCollectCols
        internalData.tableFullColumn = getColumnList(newCollectCols)
      }
      reactData.isCustomStatus = false
      return $xeTable.handleCustom().then(() => {
        if (opts.aggFunc && ($xeTable as any).handlePivotTableAggregateData) {
          const rowGroupFields = $xeTable.computeRowGroupFields
          if (rowGroupFields ? rowGroupFields.length : rowGroupList.length) {
            if (rowGroupFields && rowGroupFields.length) {
              $xeTable.setRowGroups(rowGroupFields)
            } else {
              $xeTable.clearRowGroups()
            }
          } else {
            $xeTable.handleUpdateAggData()
          }
        }
        $xeTable.saveCustomStore('reset')
      })
    },
    _toggleCustomAllCheckbox () {
      const { customStore } = this
      const isAll = !customStore.isAll
      return this.setCustomAllCheckbox(isAll)
    },
    _setCustomAllCheckbox (checked: boolean) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      const { customStore } = reactData
      const { customColumnList } = reactData
      const customOpts = $xeTable.computeCustomOpts
      const { checkMethod, visibleMethod } = customOpts
      const isAll = !!checked
      if (customOpts.immediate) {
        XEUtils.eachTree(customColumnList, (column) => {
          if (visibleMethod && !visibleMethod({ $table: $xeTable, column })) {
            return
          }
          if (checkMethod && !checkMethod({ $table: $xeTable, column })) {
            return
          }
          column.visible = isAll
          column.renderVisible = isAll
          column.halfVisible = false
        })
        customStore.isAll = isAll
        reactData.isCustomStatus = true
        $xeTable.handleCustom()
        $xeTable.saveCustomStore('update:visible')
      } else {
        XEUtils.eachTree(customColumnList, (column) => {
          if (visibleMethod && !visibleMethod({ $table: $xeTable, column })) {
            return
          }
          if (checkMethod && !checkMethod({ $table: $xeTable, column })) {
            return
          }
          column.renderVisible = isAll
          column.halfVisible = false
        })
        customStore.isAll = isAll
      }
      $xeTable.checkCustomStatus()
    },
    checkCustomStatus () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData
      const internalData = $xeTable as unknown as TableInternalData

      const { customStore } = reactData
      const { collectColumn } = internalData
      const customOpts = $xeTable.computeCustomOpts
      const { checkMethod } = customOpts
      customStore.isAll = collectColumn.every((column) => (checkMethod ? !checkMethod({ $table: $xeTable, column }) : false) || column.renderVisible)
      customStore.isIndeterminate = !customStore.isAll && collectColumn.some((column) => (!checkMethod || checkMethod({ $table: $xeTable, column })) && (column.renderVisible || column.halfVisible))
    },
    emitCustomEvent (type: any, evnt: any) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

      $xeTable.dispatchEvent('custom', { type }, evnt)
    },
    triggerCustomEvent (evnt: any) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      const { customStore } = reactData
      if (customStore.visible) {
        this.closeCustom()
        emitCustomEvent($xeTable, 'close', evnt)
      } else {
        customStore.btnEl = evnt.target
        this.openCustom()
        emitCustomEvent($xeTable, 'open', evnt)
      }
    },
    customOpenEvent (evnt: any) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      const { customStore } = reactData
      if (customStore.visible) {
        customStore.activeBtn = true
        customStore.btnEl = evnt.target
        $xeTable.openCustom()
        emitCustomEvent($xeTable, 'open', evnt)
      }
    },
    customCloseEvent (evnt: any) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      const { customStore } = reactData
      if (customStore.visible) {
        customStore.activeBtn = false
        $xeTable.closeCustom()
        emitCustomEvent($xeTable, 'close', evnt)
      }
    },
    handleUpdateCustomColumn () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData
      const internalData = $xeTable as unknown as TableInternalData

      const { customStore } = reactData
      const { collectColumn } = internalData
      if (customStore.visible) {
        const sortMaps: Record<string, number> = {}
        const fixedMaps: Record<string, VxeColumnPropTypes.Fixed> = {}
        const visibleMaps: Record<string, boolean> = {}
        XEUtils.eachTree(collectColumn, column => {
          const colid = column.getKey()
          column.renderFixed = column.fixed
          column.renderVisible = column.visible
          column.renderResizeWidth = column.renderWidth
          sortMaps[colid] = column.renderSortNumber
          fixedMaps[colid] = column.fixed
          visibleMaps[colid] = column.visible
        })
        customStore.oldSortMaps = sortMaps
        customStore.oldFixedMaps = fixedMaps
        customStore.oldVisibleMaps = visibleMaps
        reactData.customColumnList = collectColumn.slice(0)
      }
    }
  } as any
}
