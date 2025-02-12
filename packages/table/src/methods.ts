import XEUtils from 'xe-utils'
import { browse, getTpImg, isPx, isScale, hasClass, addClass, removeClass, getEventTargetNode, getPaddingTopBottomSize, getOffsetPos, setScrollTop, setScrollLeft } from '../../ui/src/dom'
import { getLastZIndex, nextZIndex, hasChildrenList, getFuncText, isEnableConf, formatText, eqEmptyValue } from '../../ui/src/utils'
import { VxeUI } from '../../ui'
import Cell from './cell'
import { getRowUniqueId, clearTableAllStatus, getRowkey, getRowid, rowToVisible, colToVisible, getCellValue, setCellValue, handleFieldOrColumn, toTreePathSeq, restoreScrollLocation, getRootColumn, getColReMinWidth, getRefElem } from './util'
import { getSlotVNs } from '../../ui/src/vn'
import { warnLog, errLog } from '../../ui/src/log'

import type { VxeTableDefines, VxeColumnPropTypes, VxeTableEmits, ValueOf, TableReactData, VxeTableConstructor, VxeToolbarConstructor, TableInternalData, VxeTablePrivateMethods, VxeTooltipInstance, VxeTablePropTypes } from '../../../types'

const { getConfig, getI18n, renderer, formats, interceptor, createEvent } = VxeUI

const customStorageKey = 'VXE_CUSTOM_STORE'

function eqCellValue (row1: any, row2: any, field: any) {
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

function getNextSortOrder (_vm: any, column: any) {
  const orders = _vm.sortOpts.orders
  const currOrder = column.order || null
  const oIndex = orders.indexOf(currOrder) + 1
  return orders[oIndex < orders.length ? oIndex : 0]
}

const getCustomStorageMap = (id?: any) => {
  const version = getConfig().version
  const rest = XEUtils.toStringJSON(localStorage.getItem(customStorageKey) || '')
  const maps = rest && rest._v === version ? rest : { _v: version }
  return (id ? maps[id] : maps) || {}
}

const setCustomStorageMap = (id: any, data: any) => {
  const version = getConfig().version
  const maps = getCustomStorageMap()
  maps[id] = data || undefined
  maps._v = version
  localStorage.setItem(customStorageKey, XEUtils.toJSONString(maps))
}

const getRecoverRowMaps = (_vm: any, keyMaps: any) => {
  const { fullAllDataRowIdData } = _vm
  const restKeys: any = {}
  XEUtils.each(keyMaps, (row, rowid) => {
    if (fullAllDataRowIdData[rowid]) {
      restKeys[rowid] = row
    }
  })
  return restKeys
}

function handleReserveRow (_vm: any, reserveRowMap: any) {
  const { fullDataRowIdData } = _vm
  const reserveList: any[] = []
  XEUtils.each(reserveRowMap, (item, rowid) => {
    if (fullDataRowIdData[rowid] && reserveList.indexOf(fullDataRowIdData[rowid].row) === -1) {
      reserveList.push(fullDataRowIdData[rowid].row)
    }
  })
  return reserveList
}

function handleVirtualXVisible ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const internalData = $xeTable as unknown as TableInternalData

  const { elemStore, visibleColumn } = internalData
  const leftFixedWidth = $xeTable.computeLeftFixedWidth
  const rightFixedWidth = $xeTable.computeRightFixedWidth
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

function handleCustomRestore ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, storeData: VxeTableDefines.CustomStoreData) {
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

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
function restoreCustomStorage ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const props = $xeTable

  const { customConfig } = props
  const tableId = $xeTable.computeTableId
  const customOpts = $xeTable.computeCustomOpts
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
        return handleCustomRestore($xeTable, storeData)
      }).catch(e => e)
    } else {
      return handleCustomRestore($xeTable, storeData)
    }
  }
}

/**
 * 更新数据列的 Map
 * 牺牲数据组装的耗时，用来换取使用过程中的流畅
 */
function cacheColumnMap ($xeTable: VxeTableConstructor) {
  const props = $xeTable
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { tableFullColumn, collectColumn } = internalData
  const fullColumnIdData: Record<string, VxeTableDefines.ColumnCacheItem> = internalData.fullColumnIdData = {}
  const fullColumnFieldData: Record<string, VxeTableDefines.ColumnCacheItem> = internalData.fullColumnFieldData = {}
  const mouseOpts = $xeTable.computeMouseOpts
  const columnOpts = $xeTable.computeColumnOpts
  const columnDragOpts = $xeTable.computeColumnDragOpts
  const { isCrossDrag, isSelfToChildDrag } = columnDragOpts
  const customOpts = $xeTable.computeCustomOpts
  const { storage } = customOpts
  const rowOpts = $xeTable.computeRowOpts
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

  if (process.env.VUE_APP_VXE_ENV === 'developmeznt') {
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

const updateScrollYStatus = ($xeTable: VxeTableConstructor, fullData?: any[]) => {
  const props = $xeTable
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { treeConfig } = props
  const sYOpts = $xeTable.computeSYOpts
  const treeOpts = $xeTable.computeTreeOpts
  const { transform } = treeOpts
  const allList = fullData || internalData.tableFullData
  // 如果gt为0，则总是启用
  const scrollYLoad = (transform || !treeConfig) && !!sYOpts.enabled && sYOpts.gt > -1 && (sYOpts.gt === 0 || sYOpts.gt < allList.length)
  reactData.scrollYLoad = scrollYLoad
  return scrollYLoad
}

function updateAfterListIndex ($xeTable: VxeTableConstructor) {
  const internalData = $xeTable as unknown as TableInternalData

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
      const rest = { row, rowid, seq, index: -1, $index: -1, _index: index, treeIndex: -1, items: [], parent: null, level: 0, height: 0, resizeHeight: 0, oTop: 0 }
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
function updateAfterDataIndex ($xeTable: VxeTableConstructor) {
  const props = $xeTable
  const internalData = $xeTable as unknown as TableInternalData

  const { treeConfig } = props
  const { fullDataRowIdData, fullAllDataRowIdData, afterTreeFullData } = internalData
  const treeOpts = $xeTable.computeTreeOpts
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
        const rest = { row, rowid, seq, index: -1, $index: -1, _index: -1, treeIndex: -1, items: [], parent: null, level: 0, height: 0, resizeHeight: 0, oTop: 0 }
        fullAllDataRowIdData[rowid] = rest
        fullDataRowIdData[rowid] = rest
      }
      fullMaps[rowid] = row
    }, { children: transform ? treeOpts.mapChildrenField : childrenField })
    internalData.afterFullRowMaps = fullMaps
    updateAfterListIndex($xeTable)
  } else {
    updateAfterListIndex($xeTable)
  }
}

/**
 * 如果为虚拟树，将树结构拍平
 * @returns
 */
function handleVirtualTreeToList ($xeTable: VxeTableConstructor) {
  const props = $xeTable
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { treeConfig } = props
  const { treeExpandedMaps } = reactData
  const { fullAllDataRowIdData } = internalData
  const treeOpts = $xeTable.computeTreeOpts
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
    updateScrollYStatus($xeTable, fullData)
    return fullData
  }
  return internalData.afterFullData
}

function updateStyle ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const props = $xeTable
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { border, showHeaderOverflow: allColumnHeaderOverflow, showFooterOverflow: allColumnFooterOverflow, mouseConfig, spanMethod, footerSpanMethod } = props
  const { isGroup, currentRow, tableColumn, scrollXLoad, scrollYLoad, overflowX, scrollbarWidth, overflowY, scrollbarHeight, columnStore, editStore, isAllOverflow, expandColumn } = reactData
  const { visibleColumn, fullColumnIdData, tableHeight, tableWidth, headerHeight, footerHeight, elemStore, customHeight, customMinHeight, customMaxHeight } = internalData
  const el = $xeTable.$refs.refElem as HTMLDivElement
  if (!el) {
    return
  }
  const containerList = ['main', 'left', 'right']
  const osbWidth = overflowY ? scrollbarWidth : 0
  const osbHeight = overflowX ? scrollbarHeight : 0
  const emptyPlaceholderElem = $xeTable.$refs.refEmptyPlaceholder as HTMLDivElement
  const cellOffsetWidth = $xeTable.computeCellOffsetWidth
  const mouseOpts = $xeTable.computeMouseOpts
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

  const xLeftCornerEl = $xeTable.$refs.refScrollXLeftCornerElem as HTMLDivElement
  const xRightCornerEl = $xeTable.$refs.refScrollXRightCornerElem as HTMLDivElement
  const scrollbarXToTop = $xeTable.computeScrollbarXToTop
  const scrollXVirtualEl = $xeTable.$refs.refScrollXVirtualElem as HTMLDivElement
  if (scrollXVirtualEl) {
    scrollXVirtualEl.style.height = `${osbHeight}px`
    scrollXVirtualEl.style.visibility = overflowX ? 'visible' : 'hidden'
  }
  const xWrapperEl = $xeTable.$refs.refScrollXWrapperElem as HTMLDivElement
  if (xWrapperEl) {
    xWrapperEl.style.left = scrollbarXToTop ? `${osbWidth}px` : ''
    xWrapperEl.style.width = `${el.clientWidth - osbWidth}px`
  }
  if (xLeftCornerEl) {
    xLeftCornerEl.style.width = scrollbarXToTop ? `${osbWidth}px` : ''
    xLeftCornerEl.style.display = scrollbarXToTop ? (osbWidth && osbHeight ? 'block' : '') : ''
  }
  if (xRightCornerEl) {
    xRightCornerEl.style.width = scrollbarXToTop ? '' : `${osbWidth}px`
    xRightCornerEl.style.display = scrollbarXToTop ? '' : (osbWidth && osbHeight ? 'block' : '')
  }

  const scrollYVirtualEl = $xeTable.$refs.refScrollYVirtualElem as HTMLDivElement
  if (scrollYVirtualEl) {
    scrollYVirtualEl.style.width = `${osbWidth}px`
    scrollYVirtualEl.style.height = `${bodyHeight + headerHeight + footerHeight}px`
    scrollYVirtualEl.style.visibility = overflowY ? 'visible' : 'hidden'
  }
  const yTopCornerEl = $xeTable.$refs.refScrollYTopCornerElem as HTMLDivElement
  if (yTopCornerEl) {
    yTopCornerEl.style.height = `${headerHeight}px`
    yTopCornerEl.style.display = headerHeight ? 'block' : ''
  }
  const yWrapperEl = $xeTable.$refs.refScrollYWrapperElem as HTMLDivElement
  if (yWrapperEl) {
    yWrapperEl.style.height = `${bodyHeight}px`
    yWrapperEl.style.top = `${headerHeight}px`
  }
  const yBottomCornerEl = $xeTable.$refs.refScrollYBottomCornerElem as HTMLDivElement
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
      fixedWrapperElem = (isFixedLeft ? $xeTable.$refs.refLeftContainer : $xeTable.$refs.refRightContainer) as HTMLDivElement
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
          fixedWrapperElem.style.height = `${customHeight > 0 ? customHeight : (tableHeight + headerHeight + footerHeight + osbHeight)}px`
          fixedWrapperElem.style.width = `${fixedColumn.reduce((previous, column) => previous + column.renderWidth, 0)}px`
        }

        let tWidth = tableWidth
        let renderColumnList = tableColumn

        let isOptimizeMode = false
        // 如果是使用优化模式
        if (scrollXLoad || scrollYLoad || isAllOverflow) {
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
          tableElem.style.paddingRight = osbWidth && fixedType && (browse['-moz'] || browse.safari) ? `${osbWidth}px` : ''
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
              wrapperElem.style.top = `${customHeight > 0 ? customHeight - footerHeight - osbHeight : tableHeight + headerHeight}px`
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
              cellOverflow = XEUtils.isUndefined(showOverflow) || XEUtils.isNull(showOverflow) ? isAllOverflow : showOverflow
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
  return $xeTable.$nextTick()
}

function computeRowHeight ($xeTable: VxeTableConstructor) {
  const reactData = $xeTable as unknown as TableReactData

  const { isAllOverflow } = reactData
  const tableHeader = $xeTable.$refs.refTableHeader
  const tableBody = $xeTable.$refs.refTableBody
  const tableBodyElem = tableBody ? (tableBody as any).$el as HTMLDivElement : null
  const defaultRowHeight = $xeTable.computeDefaultRowHeight
  let rowHeight = 0
  if (isAllOverflow) {
    if (tableBodyElem) {
      const tableHeaderElem = tableHeader ? (tableHeader as any).$el as HTMLDivElement : null
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

function handleVirtualYVisible ($xeTable: VxeTableConstructor, currScrollTop?: number) {
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { isAllOverflow } = reactData
  const { elemStore, isResizeCellHeight, afterFullData, fullAllDataRowIdData } = internalData
  const rowOpts = $xeTable.computeRowOpts
  const cellOpts = $xeTable.computeCellOpts
  const defaultRowHeight = $xeTable.computeDefaultRowHeight
  const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
  if (bodyScrollElem) {
    const clientHeight = bodyScrollElem.clientHeight
    const scrollTop = XEUtils.isNumber(currScrollTop) ? currScrollTop : bodyScrollElem.scrollTop
    const endHeight = scrollTop + clientHeight
    let toVisibleIndex = -1
    let offsetTop = 0
    let visibleSize = 0
    const isCustomCellHeight = isResizeCellHeight || cellOpts.height || rowOpts.height
    if (!isCustomCellHeight && isAllOverflow) {
      toVisibleIndex = Math.floor(scrollTop / defaultRowHeight)
      visibleSize = Math.ceil(clientHeight / defaultRowHeight) + 1
    } else {
      for (let rIndex = 0, rLen = afterFullData.length; rIndex < rLen; rIndex++) {
        const row = afterFullData[rIndex]
        const rowid = getRowid($xeTable, row)
        const rowRest = fullAllDataRowIdData[rowid] || {}
        offsetTop += rowRest.resizeHeight || cellOpts.height || rowOpts.height || rowRest.height || defaultRowHeight
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

function calculateMergerOffsetIndex (list: any, offsetItem: any, type: any) {
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

function setMerges (_vm: any, merges: any, mList: any, rowList: any) {
  if (merges) {
    const { treeConfig, visibleColumn } = _vm
    if (!XEUtils.isArray(merges)) {
      merges = [merges]
    }
    if (treeConfig && merges.length) {
      errLog('vxe.error.noTree', ['merge-cells | merge-footer-items'])
    }
    merges.forEach((item: any) => {
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
          const mcIndex = XEUtils.findIndexOf(mList, item => item._row === row && item._col === col)
          const mergeItem = mList[mcIndex]
          if (mergeItem) {
            mergeItem.rowspan = rowspan
            mergeItem.colspan = colspan
            mergeItem._rowspan = rowspan
            mergeItem._colspan = colspan
          } else {
            const mergeRowIndex = rowList ? rowList.indexOf(row) : row
            const mergeColIndex = visibleColumn.indexOf(col)
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

function removeMerges (_vm: any, merges: any, mList: any, rowList: any) {
  const rest: any[] = []
  if (merges) {
    const { treeConfig, visibleColumn } = _vm
    if (!XEUtils.isArray(merges)) {
      merges = [merges]
    }
    if (treeConfig && merges.length) {
      errLog('vxe.error.noTree', ['merge-cells | merge-footer-items'])
    }
    merges.forEach((item: any) => {
      let { row, col } = item
      if (rowList && XEUtils.isNumber(row)) {
        row = rowList[row]
      }
      if (XEUtils.isNumber(col)) {
        col = visibleColumn[col]
      }
      const mcIndex = XEUtils.findIndexOf(mList, item => item._row === row && item._col === col)
      if (mcIndex > -1) {
        const rItems = mList.splice(mcIndex, 1)
        rest.push(rItems[0])
      }
    })
  }
  return rest
}

function clearAllSort (_vm: any) {
  _vm.tableFullColumn.forEach((column: any) => {
    column.order = null
  })
}

function calcTableHeight ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, key: 'height' | 'minHeight' | 'maxHeight') {
  const props = $xeTable
  const reactData = $xeTable as unknown as TableReactData

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

/**
 * 列宽算法，计算单元格列宽，动态分配可用剩余空间
 * 支持 px、%、固定 混合分配
 * 支持动态列表调整分配
 * 支持自动分配偏移量
 * 支持 width=60 width=60px width=10% min-width=60 min-width=60px min-width=10%
 */
function autoCellWidth ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const props = $xeTable
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { elemStore } = internalData
  const scrollbarOpts = $xeTable.computeScrollbarOpts
  const tableBody = $xeTable.$refs.refTableBody
  const bodyElem = tableBody ? (tableBody as any).$el as HTMLDivElement : null
  if (!bodyElem) {
    return
  }
  const yHandleEl = $xeTable.$refs.refScrollYHandleElem as HTMLDivElement
  if (!yHandleEl) {
    return
  }
  const xHandleEl = $xeTable.$refs.refScrollXHandleElem as HTMLDivElement
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
  reactData.scrollbarWidth = Math.max(scrollbarOpts.width || 0, yHandleEl.offsetWidth - yHandleEl.clientWidth)
  reactData.overflowY = overflowY
  internalData.tableWidth = tableWidth
  internalData.tableHeight = tableHeight

  const headerTableElem = getRefElem(elemStore['main-header-table'])
  const footerTableElem = getRefElem(elemStore['main-footer-table'])
  const headerHeight = headerTableElem ? headerTableElem.clientHeight : 0
  const overflowX = tableWidth > bodyWidth
  const footerHeight = footerTableElem ? footerTableElem.clientHeight : 0
  reactData.scrollbarHeight = Math.max(scrollbarOpts.height || 0, xHandleEl.offsetHeight - xHandleEl.clientHeight)
  internalData.headerHeight = headerHeight
  internalData.footerHeight = footerHeight
  reactData.overflowX = overflowX
  updateHeight($xeTable)
  reactData.parentHeight = Math.max(internalData.headerHeight + footerHeight + 20, $xeTable.getParentHeight())
  if (overflowX) {
    $xeTable.checkScrolling()
  }
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

const calcCellHeight = ($xeTable: VxeTableConstructor) => {
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { tableData, isAllOverflow, scrollYLoad, scrollXLoad } = reactData
  const { fullAllDataRowIdData } = internalData
  const defaultRowHeight = $xeTable.computeDefaultRowHeight
  const el = $xeTable.$refs.refElem as HTMLDivElement
  if (!isAllOverflow && scrollYLoad && el) {
    tableData.forEach(row => {
      const rowid = getRowid($xeTable, row)
      const rowRest = fullAllDataRowIdData[rowid]
      if (rowRest) {
        const height = calcCellAutoHeight(rowRest, el)
        rowRest.height = Math.max(defaultRowHeight, scrollXLoad ? Math.max(rowRest.height, height) : height)
      }
    })
    reactData.calcCellHeightFlag++
  }
}

function getOrderField ($xeTable: VxeTableConstructor, column: VxeTableDefines.ColumnInfo) {
  const { sortBy, sortType } = column
  return (row: any) => {
    let cellValue
    if (sortBy) {
      cellValue = XEUtils.isFunction(sortBy) ? sortBy({ row, column }) : XEUtils.get(row, sortBy)
    } else {
      cellValue = $xeTable.getCellLabel(row, column)
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

function handleTargetEnterEvent ($xeTable: VxeTableConstructor, isClear: boolean) {
  const internalData = $xeTable as unknown as TableInternalData

  const $tooltip = $xeTable.$refs.refTooltip as VxeTooltipInstance
  clearTimeout(internalData.tooltipTimeout)
  if (isClear) {
    $xeTable.closeTooltip()
  } else {
    if ($tooltip && $tooltip.setActived) {
      $tooltip.setActived(true)
    }
  }
}

function clearDragStatus ($xeTable: any) {
  const reactData = $xeTable

  const { dragRow, dragCol } = reactData
  if (dragRow || dragCol) {
    clearColDropOrigin($xeTable)
    clearRowDropOrigin($xeTable)
    hideDropTip($xeTable)
    reactData.dragRow = null
    reactData.dragCol = null
    reactData.isDragColMove = false
    reactData.isDragRowMove = false
  }
}

function clearRowDropOrigin ($xeTable: any) {
  const el = $xeTable.$el
  if (el) {
    const clss = 'row--drag-origin'
    XEUtils.arrayEach(el.querySelectorAll(`.${clss}`), (elem) => {
      (elem as HTMLTableCellElement).draggable = false
      removeClass(elem, clss)
    })
  }
}

function updateRowDropOrigin ($xeTable: any, row: any) {
  const el = $xeTable.$el
  if (el) {
    const clss = 'row--drag-origin'
    const rowid = getRowid($xeTable, row)
    XEUtils.arrayEach(el.querySelectorAll(`[rowid="${rowid}"]`), (elem) => {
      addClass(elem, clss)
    })
  }
}

function updateRowDropTipContent ($xeTable: any, tdEl: HTMLElement) {
  const reactData = $xeTable
  const props = $xeTable

  const { dragConfig } = props
  const { dragRow } = reactData
  const rowDragOpts = $xeTable.computeRowDragOpts
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

function updateColDropOrigin ($xeTable: any, column: VxeTableDefines.ColumnInfo) {
  const el = $xeTable.$el as HTMLElement
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

function clearColDropOrigin ($xeTable: any) {
  const el = $xeTable.$el as HTMLElement
  if (el) {
    const clss = 'col--drag-origin'
    XEUtils.arrayEach(el.querySelectorAll(`.${clss}`), (elem) => {
      (elem as HTMLTableCellElement).draggable = false
      removeClass(elem, clss)
    })
  }
}

function updateColDropTipContent ($xeTable: any, tdEl: HTMLElement) {
  const reactData = $xeTable

  const { dragCol } = reactData
  const columnDragOpts = $xeTable.computeColumnDragOpts
  const { tooltipMethod } = columnDragOpts
  let tipContent = ''
  if (tooltipMethod) {
    tipContent = `${tooltipMethod({
      column: dragCol
    }) || ''}`
  } else {
    tipContent = getI18n('vxe.table.dragTip', [tdEl.textContent || ''])
  }
  reactData.dragTipText = tipContent
}

function showDropTip ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, evnt: DragEvent | MouseEvent, trEl: HTMLElement | null, thEl: HTMLElement | null, showLine: boolean, dragPos: string) {
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const el = $xeTable.$refs.refElem as HTMLElement
  if (!el) {
    return
  }
  const { overflowX, scrollbarWidth, overflowY, scrollbarHeight } = reactData
  const { prevDragToChild } = internalData
  const wrapperRect = el.getBoundingClientRect()
  const osbWidth = overflowY ? scrollbarWidth : 0
  const osbHeight = overflowX ? scrollbarHeight : 0
  const tableWidth = el.clientWidth
  const tableHeight = el.clientHeight
  if (trEl) {
    const rdLineEl = $xeTable.$refs.refDragRowLineElem as HTMLElement
    if (rdLineEl) {
      if (showLine) {
        const scrollbarYToLeft = $xeTable.computeScrollbarYToLeft
        const trRect = trEl.getBoundingClientRect()
        let trHeight = trEl.clientHeight
        const offsetTop = Math.max(1, trRect.y - wrapperRect.y)
        if (offsetTop + trHeight > tableHeight - osbHeight) {
          trHeight = tableHeight - offsetTop - osbHeight
        }
        rdLineEl.style.display = 'block'
        rdLineEl.style.left = `${scrollbarYToLeft ? osbWidth : 0}px`
        rdLineEl.style.top = `${offsetTop}px`
        rdLineEl.style.height = `${trHeight}px`
        rdLineEl.style.width = `${tableWidth - osbWidth}px`
        rdLineEl.setAttribute('drag-pos', dragPos)
        rdLineEl.setAttribute('drag-to-child', prevDragToChild ? 'y' : 'n')
      } else {
        rdLineEl.style.display = ''
      }
    }
  } else if (thEl) {
    const cdLineEl = $xeTable.$refs.refDragColLineElem as HTMLElement
    if (cdLineEl) {
      if (showLine) {
        const scrollbarXToTop = $xeTable.computeScrollbarXToTop
        const leftContainerElem = $xeTable.$refs.refLeftContainer as HTMLDivElement
        const leftContainerWidth = leftContainerElem ? leftContainerElem.clientWidth : 0
        const rightContainerElem = $xeTable.$refs.refRightContainer as HTMLDivElement
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
        const endX = tableWidth - rightContainerWidth - (rightContainerWidth ? 0 : osbWidth)
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
          cdLineEl.style.height = `${tableHeight - offsetTop - (scrollbarXToTop ? 0 : osbHeight)}px`
        }
        cdLineEl.setAttribute('drag-pos', dragPos)
        cdLineEl.setAttribute('drag-to-child', prevDragToChild ? 'y' : 'n')
      } else {
        cdLineEl.style.display = ''
      }
    }
  }
  const rdTipEl = $xeTable.$refs.refDragTipElem as HTMLElement
  if (rdTipEl) {
    rdTipEl.style.display = 'block'
    rdTipEl.style.top = `${Math.min(el.clientHeight - el.scrollTop - rdTipEl.clientHeight, evnt.clientY - wrapperRect.y)}px`
    rdTipEl.style.left = `${Math.min(el.clientWidth - el.scrollLeft - rdTipEl.clientWidth - 16, evnt.clientX - wrapperRect.x)}px`
    rdTipEl.setAttribute('drag-status', showLine ? (prevDragToChild ? 'sub' : 'normal') : 'disabled')
  }
}

function hideDropTip ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const rdTipEl = $xeTable.$refs.refDragTipElem as HTMLDivElement
  const rdLineEl = $xeTable.$refs.refDragRowLineElem as HTMLDivElement
  const cdLineEl = $xeTable.$refs.refDragColLineElem as HTMLDivElement
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
function handleTooltip ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, evnt: MouseEvent, tdEl: HTMLTableCellElement, overflowElem: HTMLElement, tipElem: HTMLElement | null, params: any) {
  const reactData = $xeTable as unknown as TableReactData

  if (!overflowElem) {
    return $xeTable.$nextTick()
  }
  params.cell = tdEl
  const { tooltipStore } = reactData
  const tooltipOpts = $xeTable.computeTooltipOpts
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
    $xeTable.$nextTick(() => {
      const $tooltip = $xeTable.$refs.refTooltip as VxeTooltipInstance
      if ($tooltip && $tooltip.open) {
        $tooltip.open(isCellOverflow ? overflowElem : (tipElem || overflowElem), formatText(content))
      }
    })
  }
  return $xeTable.$nextTick()
}

function handleScrollToRowColumn ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, fieldOrColumn: string | VxeTableDefines.ColumnInfo | null, row?: any) {
  const internalData = $xeTable as unknown as TableInternalData

  const { fullColumnIdData } = internalData
  const column = handleFieldOrColumn($xeTable, fieldOrColumn)
  if (column && fullColumnIdData[column.id]) {
    return colToVisible($xeTable, column, row)
  }
  return $xeTable.$nextTick()
}

// 计算可视渲染相关数据
function computeScrollLoad ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  return $xeTable.$nextTick().then(() => {
    const { scrollXLoad, scrollYLoad } = reactData
    const { scrollXStore, scrollYStore } = internalData
    const virtualYOpts = $xeTable.computeVirtualYOpts
    const virtualXOpts = $xeTable.computeVirtualXOpts
    // 计算 X 逻辑
    if (scrollXLoad) {
      const { toVisibleIndex: toXVisibleIndex, visibleSize: visibleXSize } = handleVirtualXVisible($xeTable)
      const offsetXSize = Math.max(0, virtualXOpts.oSize ? XEUtils.toNumber(virtualXOpts.oSize) : 0)
      scrollXStore.preloadSize = XEUtils.toNumber(virtualXOpts.preSize)
      scrollXStore.offsetSize = offsetXSize
      scrollXStore.visibleSize = visibleXSize
      scrollXStore.endIndex = Math.max(scrollXStore.startIndex + scrollXStore.visibleSize + offsetXSize, scrollXStore.endIndex)
      scrollXStore.visibleStartIndex = Math.max(scrollXStore.startIndex, toXVisibleIndex)
      scrollXStore.visibleEndIndex = Math.min(scrollXStore.endIndex, toXVisibleIndex + visibleXSize)
      $xeTable.updateScrollXData().then(() => {
        loadScrollXData($xeTable)
      })
    } else {
      $xeTable.updateScrollXSpace()
    }
    // 计算 Y 逻辑
    const rowHeight = computeRowHeight($xeTable)
    ;(scrollYStore as any).rowHeight = rowHeight
    reactData.rowHeight = rowHeight
    const { toVisibleIndex: toYVisibleIndex, visibleSize: visibleYSize } = handleVirtualYVisible($xeTable)
    if (scrollYLoad) {
      const offsetYSize = Math.max(0, virtualYOpts.oSize ? XEUtils.toNumber(virtualYOpts.oSize) : 0)
      scrollYStore.preloadSize = XEUtils.toNumber(virtualYOpts.preSize)
      scrollYStore.offsetSize = offsetYSize
      scrollYStore.visibleSize = visibleYSize
      scrollYStore.endIndex = Math.max(scrollYStore.startIndex + visibleYSize + offsetYSize, scrollYStore.endIndex)
      scrollYStore.visibleStartIndex = Math.max(scrollYStore.startIndex, toYVisibleIndex)
      scrollYStore.visibleEndIndex = Math.min(scrollYStore.endIndex, toYVisibleIndex + visibleYSize)
      $xeTable.updateScrollYData().then(() => {
        loadScrollYData($xeTable)
      })
    } else {
      $xeTable.updateScrollYSpace()
    }
    $xeTable.$nextTick(() => {
      updateStyle($xeTable)
    })
  })
}

function handleRecalculateLayout ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, reFull: boolean) {
  const internalData = $xeTable as unknown as TableInternalData

  const el = $xeTable.$refs.refElem as HTMLDivElement
  internalData.rceRunTime = Date.now()
  if (!el || !el.clientWidth) {
    return $xeTable.$nextTick()
  }
  calcCellWidth($xeTable)
  autoCellWidth($xeTable)
  updateStyle($xeTable)
  return computeScrollLoad($xeTable).then(() => {
    if (reFull === true) {
      // 初始化时需要在列计算之后再执行优化运算，达到最优显示效果
      calcCellHeight($xeTable)
      calcCellWidth($xeTable)
      autoCellWidth($xeTable)
      updateStyle($xeTable)
      return computeScrollLoad($xeTable)
    }
  })
}

function handleTableColumn ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

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

function handleUpdateColumn ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const internalData = $xeTable as unknown as TableInternalData

  const columnList = XEUtils.orderBy(internalData.collectColumn, 'renderSortNumber')
  internalData.collectColumn = columnList
  const tableFullColumn = getColumnList(columnList)
  internalData.tableFullColumn = tableFullColumn
  cacheColumnMap($xeTable)
}

function loadScrollXData ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { mergeList, mergeFooterList } = reactData
  const { scrollXStore } = internalData
  const { preloadSize, startIndex, endIndex, offsetSize } = scrollXStore
  const { toVisibleIndex, visibleSize } = handleVirtualXVisible($xeTable)
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
function getColumnList (columns: any[]) {
  const result: any[] = []
  columns.forEach((column) => {
    result.push(...(column.children && column.children.length ? getColumnList(column.children) : [column]))
  })
  return result
}

function parseColumns ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, isReset: boolean) {
  const props = $xeTable
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { showOverflow } = props
  const rowOpts = $xeTable.computeRowOpts
  const leftList: VxeTableDefines.ColumnInfo[] = []
  const centerList: VxeTableDefines.ColumnInfo[] = []
  const rightList: VxeTableDefines.ColumnInfo[] = []
  const { isGroup, columnStore } = reactData
  const sXOpts = $xeTable.computeSXOpts
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
      const { visibleSize } = handleVirtualXVisible($xeTable)
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
  handleTableColumn($xeTable)
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

function initColumnSort ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const internalData = $xeTable as unknown as TableInternalData

  const { collectColumn } = internalData
  collectColumn.forEach((column, index) => {
    const sortIndex = index + 1
    column.sortNumber = sortIndex
    column.renderSortNumber = sortIndex
  })
}

function handleColumn ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, collectColumn: VxeTableDefines.ColumnInfo[]) {
  const $xeToolbar = $xeTable.$refs.$xeToolbar as VxeToolbarConstructor
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  internalData.collectColumn = collectColumn
  const tableFullColumn = getColumnList(collectColumn)
  internalData.tableFullColumn = tableFullColumn
  reactData.isColLoading = true
  reactData.isDragColMove = false
  initColumnSort($xeTable)
  return Promise.resolve(
    restoreCustomStorage($xeTable)
  ).then(() => {
    cacheColumnMap($xeTable)
    parseColumns($xeTable, true).then(() => {
      if (reactData.scrollXLoad) {
        loadScrollXData($xeTable)
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
    return $xeTable.$nextTick().then(() => {
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
      return $xeTable.recalculate()
    })
  })
}

/**
 * 纵向 Y 可视渲染处理
 */
function loadScrollYData ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, scrollTop?: number) {
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { mergeList, isAllOverflow } = reactData
  const { scrollYStore } = internalData
  const { preloadSize, startIndex, endIndex, offsetSize } = scrollYStore
  const autoOffsetYSize = isAllOverflow ? offsetSize : offsetSize + 1
  const { toVisibleIndex, visibleSize } = handleVirtualYVisible($xeTable, scrollTop)
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

function lazyScrollXData ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const internalData = $xeTable as unknown as TableInternalData

  const { lxTimeout, lxRunTime, scrollXStore } = internalData
  const { visibleSize } = scrollXStore
  const fpsTime = Math.max(5, Math.min(10, Math.floor(visibleSize / 3)))
  if (lxTimeout) {
    clearTimeout(lxTimeout)
  }
  if (!lxRunTime || lxRunTime + fpsTime < Date.now()) {
    internalData.lxRunTime = Date.now()
    loadScrollXData($xeTable)
  }
  internalData.lxTimeout = setTimeout(() => {
    internalData.lxTimeout = undefined
    internalData.lxRunTime = undefined
    loadScrollXData($xeTable)
  }, fpsTime)
}

function lazyScrollYData ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const internalData = $xeTable as unknown as TableInternalData

  const { lyTimeout, lyRunTime, scrollYStore } = internalData
  const { visibleSize } = scrollYStore
  const fpsTime = Math.floor(Math.max(4, Math.min(10, visibleSize / 3)))
  if (lyTimeout) {
    clearTimeout(lyTimeout)
  }
  if (!lyRunTime || lyRunTime + fpsTime < Date.now()) {
    internalData.lyRunTime = Date.now()
    loadScrollYData($xeTable)
  }
  internalData.lyTimeout = setTimeout(() => {
    internalData.lyTimeout = undefined
    internalData.lyRunTime = undefined
    loadScrollYData($xeTable)
  }, fpsTime)
}

function checkLastSyncScroll ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, isRollX: boolean, isRollY: boolean) {
  const reactData = $xeTable as unknown as TableReactData
  const internalData = $xeTable as unknown as TableInternalData

  const { scrollXLoad, scrollYLoad } = reactData
  const { lcsTimeout } = internalData
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
    internalData.scrollRenderType = ''
    calcCellHeight($xeTable)
    if (isRollX && scrollXLoad) {
      $xeTable.updateScrollXData()
    }
    if (isRollY && scrollYLoad) {
      $xeTable.updateScrollYData().then(() => {
        calcCellHeight($xeTable)
        $xeTable.updateScrollYSpace()
      })
    }
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

const wheelScrollTo = (diffNum: number, cb: (progress: number) => void) => {
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

function updateHeight ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const internalData = $xeTable as unknown as TableInternalData

  internalData.customHeight = calcTableHeight($xeTable, 'height')
  internalData.customMinHeight = calcTableHeight($xeTable, 'minHeight')
  internalData.customMaxHeight = calcTableHeight($xeTable, 'maxHeight')
}

function calcColumnAutoWidth (column: VxeTableDefines.ColumnInfo, wrapperEl: HTMLDivElement) {
  const cellElemList = wrapperEl.querySelectorAll(`.vxe-cell--wrapper[colid="${column.id}"]`)
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

function calcCellWidth ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const internalData = $xeTable as unknown as TableInternalData

  const autoWidthColumnList = $xeTable.computeAutoWidthColumnList
  const { fullColumnIdData } = internalData
  const el = $xeTable.$refs.refElem as HTMLDivElement
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

const handleUpdateColResize = ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, evnt: MouseEvent, params: any) => {
  $xeTable.analyColumnWidth()
  $xeTable.recalculate(true).then(() => {
    $xeTable.saveCustomStore('update:width')
    $xeTable.updateCellAreas()
    $xeTable.dispatchEvent('column-resizable-change', params, evnt)
    // 已废弃 resizable-change
    $xeTable.dispatchEvent('resizable-change', params, evnt)
    setTimeout(() => $xeTable.recalculate(true), 300)
  })
}

const handleUpdateRowResize = ($xeTable: VxeTableConstructor & VxeTablePrivateMethods, evnt: MouseEvent, params: any) => {
  const reactData = $xeTable as unknown as TableReactData

  reactData.resizeHeightFlag++
  $xeTable.recalculate(true).then(() => {
    $xeTable.updateCellAreas()
    $xeTable.dispatchEvent('row-resizable-change', params, evnt)
    setTimeout(() => $xeTable.recalculate(true), 300)
  })
}

const Methods = {
  callSlot (slotFunc: any, params: any, h: any, vNodes: any) {
    if (slotFunc) {
      const { $xegrid } = this
      if ($xegrid) {
        return $xegrid.callSlot(slotFunc, params, h, vNodes)
      }
      if (XEUtils.isFunction(slotFunc)) {
        return getSlotVNs(slotFunc.call(this, params, h, vNodes))
      }
    }
    return []
  },
  /**
   * 获取父容器元素
   */
  getParentElem () {
    const { $el, $xegrid } = this
    return $xegrid ? $xegrid.$el.parentNode : $el.parentNode
  },
  /**
   * 获取父容器的高度
   */
  getParentHeight () {
    const { $el, $xegrid, height } = this
    const parentElem = $el.parentNode
    const parentPaddingSize = height === '100%' || height === 'auto' ? getPaddingTopBottomSize(parentElem) : 0
    return Math.floor($xegrid ? $xegrid.getParentHeight() : XEUtils.toNumber(getComputedStyle(parentElem).height) - parentPaddingSize)
  },
  /**
   * 获取需要排除的高度
   * 但渲染表格高度时，需要排除工具栏或分页等相关组件的高度
   * 如果存在表尾合计滚动条，则需要排除滚动条高度
   */
  getExcludeHeight () {
    const { $xegrid } = this
    return $xegrid ? $xegrid.getExcludeHeight() : 0
  },
  /**
   * 重置表格的一切数据状态
   */
  clearAll () {
    return clearTableAllStatus(this)
  },
  /**
   * 同步 data 数据（即将废弃）
   * 如果用了该方法，那么组件将不再记录增删改的状态，只能自行实现对应逻辑
   * 对于某些特殊的场景，比如深层树节点元素发生变动时可能会用到
   */
  syncData () {
    warnLog('vxe.error.delFunc', ['syncData', 'getData'])
    return this.$nextTick().then(() => {
      this.tableData = []
      return this.$nextTick().then(() => this.loadTableData(this.tableFullData, true))
    })
  },
  /**
   * 手动处理数据，用于手动排序与筛选
   * 对于手动更改了排序、筛选...等条件后需要重新处理数据时可能会用到
   */
  updateData () {
    const { scrollXLoad, scrollYLoad } = this
    return this.handleTableData(true).then(() => {
      this.updateFooter()
      if (scrollXLoad || scrollYLoad) {
        if (scrollXLoad) {
          this.updateScrollXSpace()
        }
        if (scrollYLoad) {
          this.updateScrollYSpace()
        }
        return this.refreshScroll()
      }
    }).then(() => {
      this.updateCellAreas()
      return this.recalculate(true)
    }).then(() => {
      // 存在滚动行为未结束情况
      setTimeout(() => this.recalculate(), 50)
    })
  },
  handleTableData (force: any) {
    const $xeTable = this

    const { scrollYLoad, scrollYStore, fullDataRowIdData, afterFullData } = this
    let fullList = afterFullData
    // 是否进行数据处理
    if (force) {
      // 更新数据，处理筛选和排序
      this.updateAfterFullData()
      // 如果为虚拟树，将树结构拍平
      fullList = handleVirtualTreeToList($xeTable)
    }
    const tableData = scrollYLoad ? fullList.slice(scrollYStore.startIndex, scrollYStore.endIndex) : fullList.slice(0)
    tableData.forEach((row: any, $index: any) => {
      const rowid = getRowid(this, row)
      const rest = fullDataRowIdData[rowid]
      if (rest) {
        rest.$index = $index
      }
    })
    this.tableData = tableData
    return this.$nextTick()
  },
  /**
   * 加载表格数据
   * @param {Array} datas 数据
   */
  loadTableData (datas: any[], isReset: boolean) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { keepSource, treeConfig, treeOpts, editStore, scrollYStore, scrollXStore, lastScrollLeft, lastScrollTop, scrollYLoad: oldScrollYLoad, sXOpts, sYOpts } = this
    const childrenField = treeOpts.children || treeOpts.childrenField
    let treeData = []
    let fullData = datas ? datas.slice(0) : []
    if (treeConfig) {
      // 树结构自动转换
      if (treeOpts.transform) {
        if (process.env.VUE_APP_VXE_ENV === 'development') {
          if (!treeOpts.rowField) {
            errLog('vxe.error.reqProp', ['table.tree-config.rowField'])
          }
          if (!treeOpts.parentField) {
            errLog('vxe.error.reqProp', ['table.tree-config.parentField'])
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
          //   if (row[childrenField] && row[childrenField].length) {
          //     warnLog('vxe.error.errConflicts', ['tree-config.transform', `row.${childrenField}`])
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
    reactData.isRowLoading = true
    reactData.scrollVMLoading = false
    editStore.insertMaps = {}
    editStore.removeMaps = {}
    const sYLoad = updateScrollYStatus($xeTable, fullData)
    reactData.isDragColMove = false
    reactData.isDragRowMove = false
    // 全量数据
    internalData.tableFullData = fullData
    internalData.tableFullTreeData = treeData
    // 缓存数据
    $xeTable.cacheRowMap(true, isReset)
    // 原始数据
    internalData.tableSynchData = datas
    if (isReset) {
      internalData.isResizeCellHeight = false
      reactData.rowExpandedMaps = {}
      reactData.rowExpandLazyLoadedMaps = {}
      reactData.treeExpandedMaps = {}
      reactData.treeExpandLazyLoadedMaps = {}
    }
    // 克隆原数据，用于显示编辑状态，与编辑值做对比
    if (keepSource) {
      $xeTable.cacheSourceMap(fullData)
    }
    if (this.clearCellAreas && this.mouseConfig) {
      this.clearCellAreas()
      this.clearCopyCellArea()
    }
    this.clearMergeCells()
    this.clearMergeFooterItems()
    this.handleTableData(true)
    this.updateFooter()
    return this.$nextTick().then(() => {
      updateHeight($xeTable)
      updateStyle($xeTable)
    }).then(() => {
      computeScrollLoad($xeTable)
    }).then(() => {
      // 是否启用了虚拟滚动
      if (sYLoad) {
        scrollYStore.endIndex = scrollYStore.visibleSize
      }

      if (sYLoad) {
        // if (showOverflow) {
        //   if (!rowOpts.height) {
        //     const errColumn = this.tableFullColumn.find((column: any) => column.showOverflow === false)
        //     if (errColumn) {
        //       errLog('vxe.error.errProp', [`column[field="${errColumn.field}"].show-overflow=false`, 'show-overflow=true'])
        //     }
        //   }
        // }

        if (process.env.VUE_APP_VXE_ENV === 'development') {
          if (!(this.height || this.maxHeight)) {
            errLog('vxe.error.reqProp', ['table.height | table.max-height | table.scroll-y={enabled: false}'])
          }
          // if (!this.showOverflow) {
          //   warnLog('vxe.error.reqProp', ['table.show-overflow'])
          // }
          if (this.spanMethod) {
            warnLog('vxe.error.scrollErrProp', ['table.span-method'])
          }
        }
      }

      this.handleReserveStatus()
      this.checkSelectionStatus()
      return new Promise<void>(resolve => {
        this.$nextTick()
          .then(() => this.recalculate())
          .then(() => {
            let targetScrollLeft = lastScrollLeft
            let targetScrollTop = lastScrollTop
            // 是否在更新数据之后自动滚动重置滚动条
            if (sXOpts.scrollToLeftOnChange) {
              targetScrollLeft = 0
            }
            if (sYOpts.scrollToTopOnChange) {
              targetScrollTop = 0
            }
            reactData.isRowLoading = false
            calcCellHeight($xeTable)
            // 是否变更虚拟滚动
            if (oldScrollYLoad === sYLoad) {
              restoreScrollLocation(this, targetScrollLeft, targetScrollTop)
                .then(() => {
                  resolve()
                })
            } else {
              setTimeout(() => {
                restoreScrollLocation(this, targetScrollLeft, targetScrollTop)
                  .then(() => {
                    resolve()
                  })
              })
            }
          })
      })
    })
  },
  /**
   * 重新加载数据，不会清空表格状态
   * @param {Array} datas 数据
   */
  loadData (datas: any) {
    const { initStatus } = this
    return this.loadTableData(datas, false).then(() => {
      this.inited = true
      this.initStatus = true
      if (!initStatus) {
        this.handleLoadDefaults()
      }
      return this.recalculate()
    })
  },
  /**
   * 重新加载数据，会清空表格状态
   * @param {Array} datas 数据
   */
  reloadData (datas: any) {
    return this.clearAll()
      .then(() => {
        this.inited = true
        this.initStatus = true
        return this.loadTableData(datas, true)
      })
      .then(() => {
        this.handleLoadDefaults()
        return this.recalculate()
      })
  },
  /**
   * 修改行数据
   */
  setRow (rows: any, record: any) {
    if (record) {
      let rest = rows
      if (!XEUtils.isArray(rows)) {
        rest = [rows]
      }
      rest.forEach((item:any) => Object.assign(item, record))
    }
    return this.$nextTick()
  },
  /**
   * 局部加载行数据并恢复到初始状态
   * 对于行数据需要局部更改的场景中可能会用到
   * @param {Row} row 行对象
   * @param {Object} record 新数据
   * @param {String} field 字段名
   */
  reloadRow (row: any, record: any, field: any) {
    const { keepSource, tableSourceData, tableData } = this
    if (keepSource) {
      const rowIndex = this.getRowIndex(row)
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
      this.tableData = tableData.slice(0)
    } else {
      if (process.env.VUE_APP_VXE_ENV === 'development') {
        warnLog('vxe.error.reqProp', ['keep-source'])
      }
    }
    return this.$nextTick()
  },
  /**
   * 加载列配置
   * 对于表格列需要重载、局部递增场景下可能会用到
   * @param {ColumnInfo} columns 列配置
   */
  loadColumn (columns: any) {
    const $xeTable = this

    const collectColumn = XEUtils.mapTree(columns, column => Cell.createColumn(this, column), { children: 'children' })
    return handleColumn($xeTable, collectColumn)
  },
  /**
   * 加载列配置并恢复到初始状态
   * 对于表格列需要重载、局部递增场景下可能会用到
   * @param {ColumnInfo} columns 列配置
   */
  reloadColumn (columns: any) {
    return this.clearAll().then(() => {
      return this.loadColumn(columns)
    })
  },
  handleColumn (collectColumn: any[]) {
    const $xeTable = this

    return handleColumn($xeTable, collectColumn)
  },
  /**
   * 更新数据行的 Map
   */
  cacheRowMap (isReset: boolean, isSource?: boolean) {
    const { treeConfig, treeOpts, tableFullData, fullAllDataRowIdData, tableFullTreeData } = this
    const childrenField = treeOpts.children || treeOpts.childrenField
    const hasChildField = treeOpts.hasChild || treeOpts.hasChildField
    const rowkey = getRowkey(this)
    const isLazy = treeConfig && treeOpts.lazy
    const fullAllDataRowIdMaps: Record<string, VxeTableDefines.RowCacheItem> = {}
    const fullDataRowIdMaps: Record<string, VxeTableDefines.RowCacheItem> = {}
    const handleCache = (row: any, index: any, items: any, path: any, parentRow: any, nodes: any) => {
      let rowid = getRowid(this, row)
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
      if (isReset || !cacheItem) {
        cacheItem = { row, rowid, seq, index: -1, _index: -1, $index: -1, treeIndex: index, items, parent: parentRow, level, height: 0, resizeHeight: 0, oTop: 0 }
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
      this.fullDataRowIdData = fullDataRowIdMaps
    }
    this.fullAllDataRowIdData = fullAllDataRowIdMaps
    if (treeConfig) {
      XEUtils.eachTree(tableFullTreeData, handleCache, { children: childrenField })
    } else {
      tableFullData.forEach(handleCache)
    }
  },
  cacheSourceMap (fullData: any) {
    let { treeConfig, treeOpts, sourceDataRowIdData } = this
    const sourceData = XEUtils.clone(fullData, true)
    const rowkey = getRowkey(this)
    sourceDataRowIdData = this.sourceDataRowIdData = {}
    const handleSourceRow = (row: any) => {
      let rowid = getRowid(this, row)
      if (eqEmptyValue(rowid)) {
        rowid = getRowUniqueId()
        XEUtils.set(row, rowkey, rowid)
      }
      sourceDataRowIdData[rowid] = {
        row,
        rowid
      }
    }
    // 源数据缓存
    if (treeConfig) {
      const childrenField = treeOpts.children || treeOpts.childrenField
      XEUtils.eachTree(sourceData, handleSourceRow, { children: treeOpts.transform ? treeOpts.mapChildrenField : childrenField })
    } else {
      sourceData.forEach(handleSourceRow)
    }
    this.tableSourceData = sourceData
  },
  getParams () {
    return this.params
  },
  loadTreeChildren (row: any, childRecords: any) {
    const $xeTable = this

    const { keepSource, tableSourceData, treeOpts, fullDataRowIdData, fullAllDataRowIdData, sourceDataRowIdData } = this
    const { transform, mapChildrenField } = treeOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    const parentRest = fullAllDataRowIdData[getRowid($xeTable, row)]
    const parentLevel = parentRest ? parentRest.level : 0
    return this.createData(childRecords).then((rows: any) => {
      if (keepSource) {
        const rowid = getRowid(this, row)
        const matchObj = XEUtils.findTree(tableSourceData as any[], (item) => rowid === getRowid(this, item), { children: childrenField })
        if (matchObj) {
          matchObj.item[childrenField] = XEUtils.clone(rows, true)
        }
        rows.forEach((childRow: any) => {
          const rowid = getRowid(this, childRow)
          sourceDataRowIdData[rowid] = XEUtils.clone(childRow, true)
        })
      }
      XEUtils.eachTree(rows, (childRow, index, items, path, parentItem, nodes) => {
        const rowid = getRowid($xeTable, childRow)
        const parentRow = parentItem || parentRest.row
        const rest = { row: childRow, rowid, seq: -1, index, _index: -1, $index: -1, treeIndex: -1, items, parent: parentRow, level: parentLevel + nodes.length, height: 0, resizeHeight: 0, oTop: 0 }
        fullDataRowIdData[rowid] = rest
        fullAllDataRowIdData[rowid] = rest
      }, { children: childrenField })
      row[childrenField] = rows
      if (transform) {
        row[mapChildrenField] = XEUtils.clone(rows, false)
      }
      updateAfterDataIndex($xeTable)
      return rows
    })
  },
  /**
   * 根据 tr 元素获取对应的 row 信息
   * @param {Element} tr 元素
   */
  getRowNode (tr: any) {
    if (tr) {
      const { fullAllDataRowIdData } = this
      const rowid = tr.getAttribute('rowid')
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
    return null
  },
  /**
   * 根据 th/td 元素获取对应的 column 信息
   * @param {Element} cell 元素
   */
  getColumnNode (cell: any) {
    if (cell) {
      const { fullColumnIdData } = this
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
  getRowSeq (row: any) {
    const { fullAllDataRowIdData } = this
    if (row) {
      const rowid = getRowid(this, row)
      const rest = fullAllDataRowIdData[rowid]
      if (rest) {
        return rest.seq
      }
    }
    return -1
  },
  /**
   * 根据 row 获取相对于 data 中的索引
   * @param {Row} row 行对象
   */
  getRowIndex (row: any) {
    const { fullAllDataRowIdData } = this
    if (row) {
      const rowid = getRowid(this, row)
      const rest = fullAllDataRowIdData[rowid]
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
  getVTRowIndex (row: any) {
    const { fullAllDataRowIdData } = this
    if (row) {
      const rowid = getRowid(this, row)
      const rest = fullAllDataRowIdData[rowid]
      if (rest) {
        return rest._index
      }
    }
    return -1
  },
  // 在 v3 中废弃
  _getRowIndex (row: any) {
    if (process.env.VUE_APP_VXE_ENV === 'development') {
      warnLog('vxe.error.delFunc', ['_getRowIndex', 'getVTRowIndex'])
    }
    return this.getVTRowIndex(row)
  },
  /**
   * 根据 row 获取渲染中的虚拟索引
   * @param {Row} row 行对象
   */
  getVMRowIndex (row: any) {
    const { fullAllDataRowIdData } = this
    if (row) {
      const rowid = getRowid(this, row)
      const rest = fullAllDataRowIdData[rowid]
      if (rest) {
        return rest.$index
      }
    }
    return -1
  },
  // 在 v3 中废弃
  $getRowIndex (row: any) {
    if (process.env.VUE_APP_VXE_ENV === 'development') {
      warnLog('vxe.error.delFunc', ['$getRowIndex', 'getVMRowIndex'])
    }
    return this.getVMRowIndex(row)
  },
  /**
   * 根据 column 获取相对于 columns 中的索引
   * @param {ColumnInfo} column 列配置
   */
  getColumnIndex (column: any) {
    const { fullColumnIdData } = this
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
  getVTColumnIndex (column: any) {
    const { fullColumnIdData } = this
    if (column) {
      const rest = fullColumnIdData[column.id]
      if (rest) {
        return rest._index
      }
    }
    return -1
  },
  // 在 v3 中废弃
  _getColumnIndex (column: any) {
    if (process.env.VUE_APP_VXE_ENV === 'development') {
      warnLog('vxe.error.delFunc', ['_getColumnIndex', 'getVTColumnIndex'])
    }
    return this.getVTColumnIndex(column)
  },
  /**
   * 根据 column 获取渲染中的虚拟索引
   * @param {ColumnInfo} column 列配置
   */
  getVMColumnIndex (column: any) {
    const { fullColumnIdData } = this
    if (column) {
      const rest = fullColumnIdData[column.id]
      if (rest) {
        return rest.$index
      }
    }
    return -1
  },
  // 在 v3 中废弃
  $getColumnIndex (column: any) {
    if (process.env.VUE_APP_VXE_ENV === 'development') {
      warnLog('vxe.error.delFunc', ['$getColumnIndex', 'getVMColumnIndex'])
    }
    return this.getVMColumnIndex(column)
  },
  /**
   * 判断是否为索引列
   * @param {ColumnInfo} column 列配置
   */
  isSeqColumn (column: any) {
    return column && column.type === 'seq'
  },
  /**
   * 定义行数据中的列属性，如果不存在则定义
   * @param {Row} records 行数据
   */
  defineField (records: any) {
    const { radioOpts, checkboxOpts, treeConfig, treeOpts, expandOpts } = this
    const childrenField = treeOpts.children || treeOpts.childrenField
    const rowkey = getRowkey(this)
    if (!XEUtils.isArray(records)) {
      records = [records || {}]
    }
    return records.map((record: any) => {
      this.tableFullColumn.forEach((column: any) => {
        const { field, editRender } = column
        if (field && !XEUtils.has(record, field)) {
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
      const otherFields = [radioOpts.labelField, checkboxOpts.checkField, checkboxOpts.labelField, expandOpts.labelField]
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
  /**
   * 创建 data 对象
   * 对于某些特殊场景可能会用到，会自动对数据的字段名进行检测，如果不存在就自动定义
   * @param {Array} records 新数据
   */
  createData (records: any) {
    return this.$nextTick().then(() => {
      return this.defineField(records)
    })
  },
  /**
   * 创建 Row|Rows 对象
   * 对于某些特殊场景需要对数据进行手动插入时可能会用到
   * @param {Array/Object} records 新数据
   */
  createRow (records: any) {
    const isArr = XEUtils.isArray(records)
    if (!isArr) {
      records = [records]
    }
    return this.createData(records).then((rows: any) => isArr ? rows : rows[0])
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
  revertData (rows: any, field: any) {
    const { keepSource, tableSourceData, treeConfig } = this
    if (!keepSource) {
      if (process.env.VUE_APP_VXE_ENV === 'development') {
        warnLog('vxe.error.reqProp', ['keep-source'])
      }
      return this.$nextTick()
    }
    let targetRows = rows
    if (rows) {
      if (!XEUtils.isArray(rows)) {
        targetRows = [rows]
      }
    } else {
      targetRows = XEUtils.toArray(this.getUpdateRecords())
    }
    if (targetRows.length) {
      targetRows.forEach((row: any) => {
        if (!this.isInsertByRow(row)) {
          const rowIndex = this.getRowIndex(row)
          if (treeConfig && rowIndex === -1) {
            errLog('vxe.error.noTree', ['revertData'])
          }
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
    }
    if (rows) {
      return this.$nextTick()
    }
    return this.reloadData(tableSourceData)
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
    const { tableFullData, visibleColumn } = this
    if (!arguments.length) {
      rows = tableFullData
    } else if (rows && !XEUtils.isArray(rows)) {
      rows = [rows]
    }
    if (field) {
      rows.forEach((row: any) => XEUtils.set(row, field, null))
    } else {
      rows.forEach((row: any) => {
        visibleColumn.forEach((column: any) => {
          if (column.field) {
            setCellValue(row, column, null)
          }
        })
      })
    }
    return this.$nextTick()
  },
  getCellElement (row: any, fieldOrColumn: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

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
  getCellLabel (row: any, fieldOrColumn: any) {
    const $xeTable = this

    const column = handleFieldOrColumn(this, fieldOrColumn)
    if (!column) {
      return null
    }
    const formatter = column.formatter
    const cellValue = getCellValue(row, column)
    let cellLabel = cellValue
    if (formatter) {
      let formatData
      const { fullAllDataRowIdData } = $xeTable
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
      const formatParams = { cellValue, row, rowIndex: this.getRowIndex(row), column, columnIndex: this.getColumnIndex(column) }
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
  isInsertByRow (row: any) {
    const { editStore } = this
    const rowid = getRowid(this, row)
    return !!editStore.insertMaps[rowid]
  },
  /**
   * 删除所有新增的临时数据
   * @returns
   */
  removeInsertRow () {
    const $xeTable = this
    const reactData = $xeTable

    const { editStore } = reactData
    editStore.insertMaps = {}
    return $xeTable.remove($xeTable.getInsertRecords())
  },
  /**
   * 检查行或列数据是否发生改变
   * @param {Row} row 行对象
   * @param {String} field 字段名
   */
  isUpdateByRow (row: any, field: any) {
    const { tableFullColumn, keepSource, sourceDataRowIdData, fullDataRowIdData } = this
    if (keepSource) {
      const rowid = getRowid(this, row)
      // 新增的数据不需要检测
      if (!fullDataRowIdData[rowid]) {
        return false
      }
      const oldRest = sourceDataRowIdData[rowid]
      if (oldRest) {
        const oRow = oldRest.row
        if (arguments.length > 1) {
          return !eqCellValue(oRow, row, field)
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
  getColumns (columnIndex: any) {
    const columns = this.visibleColumn
    return XEUtils.isUndefined(columnIndex) ? columns.slice(0) : columns[columnIndex]
  },
  /**
   * 根据列获取列的唯一主键
   */
  getColid (fieldOrColumn: any) {
    const column = handleFieldOrColumn(this, fieldOrColumn)
    return column ? column.id : null
  },
  /**
   * 根据列的唯一主键获取列
   * @param {String} colid 列主键
   */
  getColumnById (colid: any) {
    const fullColumnIdData = this.fullColumnIdData
    return fullColumnIdData[colid] ? fullColumnIdData[colid].column : null
  },
  /**
   * 根据列的字段名获取列
   * @param {String} field 字段名
   */
  getColumnByField (field: any) {
    const fullColumnFieldData = this.fullColumnFieldData
    return fullColumnFieldData[field] ? fullColumnFieldData[field].column : null
  },
  getParentColumn (fieldOrColumn: any) {
    const fullColumnIdData = this.fullColumnIdData
    const column = handleFieldOrColumn(this, fieldOrColumn)
    return column && column.parentId && fullColumnIdData[column.parentId] ? fullColumnIdData[column.parentId].column : null
  },
  /**
   * 获取当前表格的列
   * 收集到的全量列、全量表头列、处理条件之后的全量表头列、当前渲染中的表头列
   */
  getTableColumn () {
    return {
      collectColumn: this.collectColumn.slice(0),
      fullColumn: this.tableFullColumn.slice(0),
      visibleColumn: this.visibleColumn.slice(0),
      tableColumn: this.tableColumn.slice(0)
    }
  },
  /**
   * 获取表格的全量列
   */
  getFullColumns () {
    const $xeTable = this
    const internalData = $xeTable

    const { collectColumn } = internalData
    return collectColumn.slice(0)
  },
  /**
   * 获取数据，和 data 的行为一致，也可以指定索引获取数据
   */
  getData (rowIndex: any) {
    const tableSynchData = this.data || this.tableSynchData
    return XEUtils.isUndefined(rowIndex) ? tableSynchData.slice(0) : tableSynchData[rowIndex]
  },
  /**
   * 用于多选行，获取已选中的数据
   */
  getCheckboxRecords (isFull: any) {
    const { tableFullData, afterFullData, treeConfig, treeOpts, checkboxOpts, tableFullTreeData, afterTreeFullData, afterFullRowMaps } = this
    const { transform, mapChildrenField } = treeOpts
    const { checkField } = checkboxOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    const currTableData = isFull ? (transform ? tableFullTreeData : tableFullData) : (transform ? afterTreeFullData : afterFullData)
    let rowList = []
    if (checkField) {
      if (treeConfig) {
        rowList = XEUtils.filterTree(currTableData, row => XEUtils.get(row, checkField), { children: transform ? mapChildrenField : childrenField })
      } else {
        rowList = currTableData.filter((row: any) => XEUtils.get(row, checkField))
      }
    } else {
      const { selectCheckboxMaps, fullDataRowIdData } = this
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
   * 获取处理后全量的表格数据
   * 如果存在筛选条件，继续处理
   */
  updateAfterFullData () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const internalData = $xeTable as unknown as TableInternalData

    const { treeConfig } = props
    const { tableFullColumn, tableFullData, tableFullTreeData } = internalData
    const filterOpts = $xeTable.computeFilterOpts
    const sortOpts = $xeTable.computeSortOpts
    const treeOpts = $xeTable.computeTreeOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    const { transform, rowField, parentField, mapChildrenField } = treeOpts
    const { remote: allRemoteFilter, filterMethod: allFilterMethod } = filterOpts
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
            children: mapChildrenField,
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
            children: mapChildrenField,
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
            const treeList = XEUtils.toTreeArray(tableTree, {
              children: mapChildrenField
            })
            tableTree = XEUtils.toArrayTree(
              XEUtils.orderBy(treeList, orderColumns.map(({ column, order }) => [getOrderField($xeTable, column), order])),
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
            // 兼容 v4
            if (sortMultiple) {
              tableData = XEUtils.orderBy(tableData, orderColumns.map(({ column, order }) => [getOrderField(this, column), order]))
            } else {
              const firstOrderColumn = orderColumns[0]
              let sortByConfs
              // 已废弃，兼容 v2，在 v4 中废弃， sortBy 不能为数组
              if (XEUtils.isArray((firstOrderColumn as any).sortBy)) {
                sortByConfs = (firstOrderColumn as any).sortBy.map((item: any) => [item, firstOrderColumn.order])
              }
              tableData = XEUtils.orderBy(tableData, sortByConfs || [firstOrderColumn].map(({ column, order }) => [getOrderField(this, column), order]))
            }
            tableData = XEUtils.orderBy(tableData, orderColumns.map(({ column, order }) => [getOrderField($xeTable, column), order]))
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
    updateAfterDataIndex($xeTable)
  },
  /**
   * 预编译
   * 对渲染中的数据提前解析序号及索引。牺牲提前编译耗时换取渲染中额外损耗，使运行时更加流畅
   */
  updateAfterDataIndex () {
    const $xeTable = this

    updateAfterDataIndex($xeTable)
  },
  /**
   * 只对 tree-config 有效，获取行的子级
   */
  getTreeRowChildren (rowOrRowid: any) {
    const $xeTable = this
    const props = $xeTable
    const internalData = $xeTable

    const { treeConfig } = props
    const { fullDataRowIdData } = internalData
    const treeOpts = $xeTable.computeTreeOpts
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
  getTreeParentRow (rowOrRowid: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const internalData = $xeTable as unknown as TableInternalData

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
  getParentRow (rowOrRowid: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    warnLog('vxe.error.delFunc', ['getParentRow', 'getTreeParentRow'])
    return $xeTable.getTreeParentRow(rowOrRowid)
  },
  /**
   * 根据行的唯一主键获取行
   * @param {String/Number} rowid 行主键
   */
  getRowById (cellValue: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const { fullDataRowIdData } = internalData
    const rowid = XEUtils.eqNull(cellValue) ? '' : encodeURIComponent(cellValue)
    return fullDataRowIdData[rowid] ? fullDataRowIdData[rowid].row : null
  },
  /**
   * 根据行获取行的唯一主键
   * @param {Row} row 行对象
   */
  getRowid (row: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    return getRowid($xeTable, row)
  },
  /**
   * 获取处理后的表格数据
   * 如果存在筛选条件，继续处理
   * 如果存在排序，继续处理
   */
  getTableData () {
    const { treeConfig, tableFullData, afterFullData, tableData, footerTableData, tableFullTreeData } = this
    return {
      fullData: treeConfig ? tableFullTreeData.slice(0) : tableFullData.slice(0),
      visibleData: afterFullData.slice(0),
      tableData: tableData.slice(0),
      footerData: footerTableData.slice(0)
    }
  },
  /**
   * 获取表格的全量数据，如果是 tree-config 则返回带层级的树结构
   */
  getFullData () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const internalData = $xeTable as unknown as TableInternalData

    const { treeConfig } = props
    const { tableFullData, tableFullTreeData } = internalData
    if (treeConfig) {
      const treeOpts = $xeTable.computeTreeOpts
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
   * 处理数据加载默认行为
   * 默认执行一次，除非被重置
   */
  handleLoadDefaults () {
    if (this.checkboxConfig) {
      this.handleDefaultSelectionChecked()
    }
    if (this.radioConfig) {
      this.handleDefaultRadioChecked()
    }
    if (this.expandConfig) {
      this.handleDefaultRowExpand()
    }
    if (this.treeConfig) {
      this.handleDefaultTreeExpand()
    }
    if (this.mergeCells) {
      this.handleDefaultMergeCells()
    }
    if (this.mergeFooterItems) {
      this.handleDefaultMergeFooterItems()
    }
    this.$nextTick(() => setTimeout(this.recalculate))
  },
  /**
   * 处理初始化的默认行为
   * 只会执行一次
   */
  handleInitDefaults () {
    const { sortConfig } = this
    if (sortConfig) {
      this.handleDefaultSort()
    }
  },
  /**
   * 设置为固定列
   */
  setColumnFixed (fieldOrColumn: any, fixed: any) {
    const $xeTable = this

    let status = false
    const cols = XEUtils.isArray(fieldOrColumn) ? fieldOrColumn : [fieldOrColumn]
    const columnOpts = $xeTable.computeColumnOpts
    const isMaxFixedColumn = $xeTable.computeIsMaxFixedColumn
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
          return $xeTable.$nextTick()
        }
        XEUtils.eachTree([targetColumn], (column) => {
          column.fixed = fixed
        })
        $xeTable.saveCustomStore('update:fixed')
        if (!status) {
          status = true
        }
      }
    }
    if (status) {
      return $xeTable.refreshColumn()
    }
    return $xeTable.$nextTick()
  },
  /**
   * 取消指定固定列
   */
  clearColumnFixed (fieldOrColumn: any) {
    const $xeTable = this

    let status = false
    const cols = XEUtils.isArray(fieldOrColumn) ? fieldOrColumn : [fieldOrColumn]
    cols.forEach(item => {
      const column = handleFieldOrColumn($xeTable, item)
      const targetColumn = getRootColumn($xeTable, column as any)
      if (targetColumn && targetColumn.fixed) {
        XEUtils.eachTree([targetColumn], (column) => {
          column.fixed = null
        })
        $xeTable.saveCustomStore('update:fixed')
        if (!status) {
          status = true
        }
      }
    })
    if (status) {
      return $xeTable.refreshColumn()
    }
    return $xeTable.$nextTick()
  },
  /**
   * 隐藏指定列
   */
  hideColumn (fieldOrColumn: any) {
    const $xeTable = this

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
      return $xeTable.handleCustom()
    }
    return $xeTable.$nextTick()
  },
  /**
   * 显示指定列
   */
  showColumn (fieldOrColumn: any) {
    const $xeTable = this

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
      return $xeTable.handleCustom()
    }
    return $xeTable.$nextTick()
  },
  setColumnWidth (fieldOrColumn: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo | VxeColumnPropTypes.Field[] | VxeTableDefines.ColumnInfo[], width: number | string) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

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
    return $xeTable.$nextTick().then(() => {
      return { status }
    })
  },
  getColumnWidth (fieldOrColumn: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo) {
    const column = handleFieldOrColumn(this, fieldOrColumn)
    if (column) {
      return column.renderWidth
    }
    return 0
  },
  /**
   * 手动重置列的显示隐藏、列宽拖动的状态；
   * 如果为 true 则重置所有状态
   * 如果已关联工具栏，则会同步更新
   */
  resetColumn (options?: boolean | {
    visible?: boolean
    resizable?: boolean
    fixed?: boolean
    order?: boolean
  }) {
    warnLog('vxe.error.delFunc', ['resetColumn', 'resetCustom'])
    return this.resetCustom(options)
  },
  handleCustom () {
    const { mouseConfig } = this
    if (mouseConfig) {
      if (this.clearSelected) {
        this.clearSelected()
      }
      if (this.clearCellAreas) {
        this.clearCellAreas()
        this.clearCopyCellArea()
      }
    }
    this.analyColumnWidth()
    return this.refreshColumn(true)
  },
  handleCustomRestore (storeData: any) {
    const $xetable = this
    const reactData = $xetable
    const internalData = $xetable

    let { collectColumn } = internalData
    const { resizableData, sortData, visibleData, fixedData } = storeData
    let hasCustomSort = false
    // 处理还原
    if (resizableData || sortData || visibleData || fixedData) {
      XEUtils.eachTree(collectColumn, (column, index, items, path, parentRow) => {
        const colKey = column.getKey()
        // 支持一级
        if (!parentRow) {
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
  },
  /**
   * 还原自定义列操作状态
   */
  restoreCustomStorage () {
    const { tableId, customConfig, customOpts } = this
    const { storage, restoreStore } = customOpts
    const isAllCustom = storage === true
    const storageOpts = isAllCustom ? {} : Object.assign({}, storage || {})
    const isCustomResizable = isAllCustom || storageOpts.resizable
    const isCustomVisible = isAllCustom || storageOpts.visible
    const isCustomFixed = isAllCustom || storageOpts.fixed
    const isCustomSort = isAllCustom || storageOpts.sort
    if ((customConfig ? isEnableConf(customOpts) : customOpts.enabled) && (isCustomResizable || isCustomVisible || isCustomFixed || isCustomSort)) {
      if (!tableId) {
        errLog('vxe.error.reqProp', ['id'])
        return
      }
      const storeData = getCustomStorageMap(tableId)
      if (restoreStore) {
        return Promise.resolve(
          restoreStore({ id: tableId, type: 'restore', storeData })
        ).then(storeData => {
          if (!storeData) {
            return
          }
          return this.handleCustomRestore(storeData)
        }).catch(e => e)
      } else {
        return this.handleCustomRestore(storeData)
      }
    }
  },
  getCustomStoreData () {
    const { id, customOpts, collectColumn } = this
    const { checkMethod } = customOpts
    const resizableData: any = {}
    const sortData: any = {}
    const visibleData: any = {}
    const fixedData: any = {}
    const storeData: any = {
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
    let hasFixedt = 0
    let hasVisible = 0
    XEUtils.eachTree(collectColumn, (column, index, items, path, parentColumn) => {
      // 只支持一级
      if (!parentColumn) {
        collectColumn.forEach((column: any) => {
          const colKey = column.getKey()
          if (colKey) {
            hasSort = 1
            sortData[colKey] = column.renderSortNumber
          }
        })
        if (column.fixed !== column.defaultFixed) {
          const colKey = column.getKey()
          if (colKey) {
            hasFixedt = 1
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
    if (hasFixedt) {
      storeData.fixedData = fixedData
    }
    if (hasVisible) {
      storeData.visibleData = visibleData
    }
    return storeData
  },
  saveCustomStore (type: any) {
    const $xeTable = this
    const props = $xeTable
    const reactData = $xeTable as TableReactData

    const { customConfig } = props
    const tableId = $xeTable.computeTableId
    const customOpts = $xeTable.computeCustomOpts
    const { updateStore, storage } = customOpts
    const isAllCustom = storage === true
    const storageOpts = isAllCustom ? {} : Object.assign({}, storage || {})
    const isCustomResizable = isAllCustom || storageOpts.resizable
    const isCustomVisible = isAllCustom || storageOpts.visible
    const isCustomFixed = isAllCustom || storageOpts.fixed
    const isCustomSort = isAllCustom || storageOpts.sort
    if (type !== 'reset') {
      reactData.isCustomStatus = true
    }
    if ((customConfig ? isEnableConf(customOpts) : customOpts.enabled) && (isCustomResizable || isCustomVisible || isCustomFixed || isCustomSort)) {
      if (!tableId) {
        errLog('vxe.error.reqProp', ['id'])
        return this.$nextTick()
      }
      const storeData = type === 'reset'
        ? {
            resizableData: {},
            sortData: {},
            visibleData: {},
            fixedData: {}
          }
        : this.getCustomStoreData()
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
    return this.$nextTick()
  },
  handleUpdateDataQueue () {
    this.upDataFlag++
  },
  handleRefreshColumnQueue () {
    this.reColumnFlag++
  },
  /**
   * 刷新列配置
   */
  refreshColumn (initSort?: boolean) {
    const $xeTable = this

    if (initSort) {
      handleUpdateColumn($xeTable)
    }
    return parseColumns($xeTable, true).then(() => {
      return this.refreshScroll()
    }).then(() => {
      return this.recalculate()
    })
  },
  /**
   * 指定列宽的列进行拆分
   */
  analyColumnWidth () {
    const { columnOpts } = this
    const { width: defaultWidth, minWidth: defaultMinWidth } = columnOpts
    const resizeList: any[] = []
    const pxList: any[] = []
    const pxMinList : any[] = []
    const autoMinList: any[] = []
    const scaleList : any[] = []
    const scaleMinList: any[] = []
    const autoList : any[] = []
    const remainList: any[] = []
    this.tableFullColumn.forEach((column: any) => {
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
    Object.assign(this.columnStore, { resizeList, pxList, pxMinList, autoMinList, scaleList, scaleMinList, autoList, remainList })
  },
  handleColResizeMousedownEvent (evnt: MouseEvent, fixedType: 'left' | 'right' | '', params: VxeTableDefines.CellRenderHeaderParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    evnt.stopPropagation()
    evnt.preventDefault()
    const { column } = params
    const { overflowX, scrollbarHeight } = reactData
    const { elemStore, visibleColumn } = internalData
    const resizableOpts = $xeTable.computeResizableOpts
    const osbHeight = overflowX ? scrollbarHeight : 0
    const tableEl = $xeTable.$refs.refElem as HTMLDivElement
    const leftContainerElem = $xeTable.$refs.refLeftContainer as HTMLDivElement
    const rightContainerElem = $xeTable.$refs.refRightContainer as HTMLDivElement
    const resizeBarElem = $xeTable.$refs.refColResizeBar as HTMLDivElement
    if (!resizeBarElem) {
      return
    }
    const resizeTipElem = resizeBarElem.firstElementChild as HTMLDivElement
    const scrollbarXToTop = $xeTable.computeScrollbarXToTop
    const { clientX: dragClientX } = evnt
    const wrapperElem = $xeTable.$refs.refElem as HTMLDivElement
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
    const pos = getOffsetPos(dragBtnElem, wrapperElem)
    const dragBtnWidth = dragBtnElem.clientWidth
    const dragBtnOffsetWidth = Math.floor(dragBtnWidth / 2)
    const minInterval = getColReMinWidth(cellParams) - dragBtnOffsetWidth // 列之间的最小间距
    let dragMinLeft = pos.left - cell.clientWidth + dragBtnWidth + minInterval
    let dragPosLeft = pos.left + dragBtnOffsetWidth
    const isLeftFixed = fixedType === 'left'
    const isRightFixed = fixedType === 'right'

    // 计算左右侧固定列偏移量
    let fixedOffsetWidth = 0
    if (isLeftFixed || isRightFixed) {
      const siblingProp = isLeftFixed ? 'nextElementSibling' : 'previousElementSibling'
      let tempCellElem = cell[siblingProp] as HTMLTableCellElement
      while (tempCellElem) {
        if (hasClass(tempCellElem, 'fixed--hidden')) {
          break
        } else if (!hasClass(tempCellElem, 'col--group')) {
          fixedOffsetWidth += tempCellElem.offsetWidth
        }
        tempCellElem = tempCellElem[siblingProp] as HTMLTableCellElement
      }
      if (isRightFixed && rightContainerElem) {
        dragPosLeft = rightContainerElem.offsetLeft + fixedOffsetWidth
      }
    }

    // 处理拖动事件
    const updateEvent = (evnt: MouseEvent) => {
      evnt.stopPropagation()
      evnt.preventDefault()
      const tableHeight = tableEl.clientHeight
      const offsetX = evnt.clientX - dragClientX
      let left = dragPosLeft + offsetX
      const scrollLeft = fixedType ? 0 : bodyScrollElem.scrollLeft
      if (isLeftFixed) {
      // 左固定列（不允许超过右侧固定列、不允许超过右边距）
        left = Math.min(left, (rightContainerElem ? rightContainerElem.offsetLeft : bodyScrollElem.clientWidth) - fixedOffsetWidth - minInterval)
      } else if (isRightFixed) {
      // 右侧固定列（不允许超过左侧固定列、不允许超过左边距）
        dragMinLeft = (leftContainerElem ? leftContainerElem.clientWidth : 0) + fixedOffsetWidth + minInterval
        left = Math.min(left, dragPosLeft + cell.clientWidth - minInterval)
      } else {
        dragMinLeft = Math.max(bodyScrollElem.scrollLeft, dragMinLeft)
      // left = Math.min(left, bodyScrollElem.clientWidth + bodyScrollElem.scrollLeft - 40)
      }
      dragLeft = Math.max(left, dragMinLeft)
      const resizeBarLeft = Math.max(1, dragLeft - scrollLeft)
      resizeBarElem.style.left = `${resizeBarLeft}px`
      resizeBarElem.style.top = `${scrollbarXToTop ? osbHeight : 0}px`
      resizeBarElem.style.height = `${scrollbarXToTop ? tableHeight - osbHeight : tableHeight}px`
      if (resizableOpts.showDragTip && resizeTipElem) {
        resizeTipElem.textContent = getI18n('vxe.table.resizeColTip', [resizeColumn.renderWidth + (isRightFixed ? dragPosLeft - dragLeft : dragLeft - dragPosLeft)])
        const tableWidth = tableEl.clientWidth
        const wrapperRect = wrapperElem.getBoundingClientRect()
        const resizeBarWidth = resizeBarElem.clientWidth
        const resizeTipWidth = resizeTipElem.clientWidth
        const resizeTipHeight = resizeTipElem.clientHeight
        let resizeTipLeft = -resizeTipWidth
        if (resizeBarLeft < resizeTipWidth + resizeBarWidth) {
          resizeTipLeft = 0
        } else if (resizeBarLeft > tableWidth) {
          resizeTipLeft += tableWidth - resizeBarLeft
        }
        resizeTipElem.style.left = `${resizeTipLeft}px`
        resizeTipElem.style.top = `${Math.min(tableHeight - resizeTipHeight, Math.max(0, evnt.clientY - wrapperRect.y - resizeTipHeight / 2))}px`
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
        handleUpdateColResize($xeTable, evnt, resizeParams)
      }
      removeClass(tableEl, 'col-drag--resize')
    }
    updateEvent(evnt)
    if ($xeTable.closeMenu) {
      $xeTable.closeMenu()
    }
  },
  handleColResizeDblclickEvent (evnt: MouseEvent, params: VxeTableDefines.CellRenderHeaderParams) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const resizableOpts = $xeTable.computeResizableOpts
    const { isDblclickAutoWidth } = resizableOpts
    const el = $xeTable.$refs.refElem as HTMLDivElement
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
        handleUpdateColResize($xeTable, evnt, resizeParams)
      }
    }
  },
  handleRowResizeMousedownEvent (evnt: MouseEvent, params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    evnt.stopPropagation()
    evnt.preventDefault()
    const { row } = params
    const { overflowX, scrollbarWidth, overflowY, scrollbarHeight } = reactData
    const { elemStore, fullAllDataRowIdData } = internalData
    const osbWidth = overflowY ? scrollbarWidth : 0
    const osbHeight = overflowX ? scrollbarHeight : 0
    const scrollbarYToLeft = $xeTable.computeScrollbarYToLeft
    const resizableOpts = $xeTable.computeResizableOpts
    const rowOpts = $xeTable.computeRowOpts
    const cellOpts = $xeTable.computeCellOpts
    const tableEl = $xeTable.$refs.refElem as HTMLDivElement
    const resizeBarElem = $xeTable.$refs.refRowResizeBar as HTMLDivElement
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
    const defaultRowHeight = $xeTable.computeDefaultRowHeight
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
      const tableWidth = tableEl.clientWidth - osbWidth
      const tableHeight = tableEl.clientHeight - osbHeight
      let dragTop = evnt.clientY - tableRect.y - targetOffsetY
      if (dragTop < minTop) {
        dragTop = minTop
      } else {
        resizeHeight = Math.max(cellMinHeight, currCellHeight + evnt.clientY - dragClientY)
      }
      resizeBarElem.style.left = `${scrollbarYToLeft ? osbWidth : 0}px`
      resizeBarElem.style.top = `${dragTop}px`
      resizeBarElem.style.width = `${tableWidth}px`
      if (resizableOpts.showDragTip && resizeTipElem) {
        resizeTipElem.textContent = getI18n('vxe.table.resizeRowTip', [resizeHeight])
        const resizeTipWidth = resizeTipElem.clientWidth
        const resizeTipHeight = resizeTipElem.clientHeight
        let resizeBarLeft = Math.max(2, evnt.clientX - tableRect.x)
        let resizeBarTop = 0
        if (resizeBarLeft + resizeTipWidth >= tableWidth - 2) {
          resizeBarLeft = tableWidth - resizeTipWidth - 2
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
          handleUpdateRowResize($xeTable, evnt, resizeParams)
        }
      }
      removeClass(tableEl, 'row-drag--resize')
    }
    updateEvent(evnt)
  },
  handleRowResizeDblclickEvent (evnt: MouseEvent, params: VxeTableDefines.CellRenderBodyParams & { $table: VxeTableConstructor & VxeTablePrivateMethods }) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const resizableOpts = $xeTable.computeResizableOpts
    const { isDblclickAutoHeight } = resizableOpts
    const el = $xeTable.$refs.refElem as HTMLDivElement
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
        const resizeHeight = calcCellAutoHeight(rowRest, el)
        const resizeParams = { ...params, resizeHeight, resizeRow: row }
        reactData.isDragResize = false
        internalData._lastResizeTime = Date.now()
        if ($xeTable.handleRowResizeDblclickCellAreaEvent) {
          $xeTable.handleRowResizeDblclickCellAreaEvent(evnt, resizeParams)
        } else {
          rowRest.resizeHeight = resizeHeight
          handleUpdateRowResize($xeTable, evnt, resizeParams)
        }
      }
      if (actived.row || actived.column) {
        $xeTable.clearEdit().then(handleRsHeight)
      } else {
        handleRsHeight()
      }
    }
  },
  setRowHeightConf (heightConf: Record<string, number>) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

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
    return $xeTable.$nextTick().then(() => {
      return { status }
    })
  },
  getRowHeightConf (isFull?: boolean) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const { fullAllDataRowIdData, afterFullData } = internalData
    const rowOpts = $xeTable.computeRowOpts
    const cellOpts = $xeTable.computeCellOpts
    const defaultRowHeight = $xeTable.computeDefaultRowHeight
    const rest: Record<string, number> = {}
    afterFullData.forEach(row => {
      const rowid = getRowid($xeTable, row)
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
  setRowHeight (rowOrId: any | any[], height: number) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { fullAllDataRowIdData } = internalData
    let status = false
    const rows = XEUtils.isArray(rowOrId) ? rowOrId : [rowOrId]
    let rHeight = XEUtils.toInteger(height)
    if (isScale(height)) {
      const tableBody = $xeTable.$refs.refTableBody
      const bodyElem = tableBody ? (tableBody as any).$el as HTMLDivElement : null
      const bodyHeight = bodyElem ? bodyElem.clientHeight - 1 : 0
      rHeight = Math.floor(rHeight * bodyHeight)
    }
    if (rHeight) {
      rows.forEach(row => {
        const rowid = XEUtils.isString(row) || XEUtils.isNumber(row) ? row : getRowid($xeTable, row)
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
    return $xeTable.$nextTick()
  },
  getRowHeight (rowOrId: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const { fullAllDataRowIdData } = internalData
    const rowOpts = $xeTable.computeRowOpts
    const cellOpts = $xeTable.computeCellOpts
    const defaultRowHeight = $xeTable.computeDefaultRowHeight
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
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const { elemStore, lastScrollLeft, lastScrollTop } = internalData
    const headerScrollElem = getRefElem(elemStore['main-header-scroll'])
    const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
    const footerScrollElem = getRefElem(elemStore['main-footer-scroll'])
    const leftScrollElem = getRefElem(elemStore['left-body-scroll'])
    const rightScrollElem = getRefElem(elemStore['right-body-scroll'])
    const xHandleEl = $xeTable.$refs.refScrollXHandleElem as HTMLDivElement
    const yHandleEl = $xeTable.$refs.refScrollYHandleElem as HTMLDivElement
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
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    return new Promise<void>(resolve => {
      const { rceTimeout, rceRunTime } = internalData
      const resizeOpts = $xeTable.computeResizeOpts
      const refreshDelay = resizeOpts.refreshDelay || 20
      const el = $xeTable.$refs.refElem as HTMLElement
      if (el && el.clientWidth) {
        autoCellWidth($xeTable)
      }
      if (rceTimeout) {
        clearTimeout(rceTimeout)
        if (rceRunTime && rceRunTime + (refreshDelay - 5) < Date.now()) {
          resolve(
            handleRecalculateLayout($xeTable, !!reFull)
          )
        } else {
          $xeTable.$nextTick(() => {
            resolve()
          })
        }
      } else {
        resolve(
          handleRecalculateLayout($xeTable, !!reFull)
        )
      }
      internalData.rceTimeout = setTimeout(() => {
        internalData.rceTimeout = undefined
        handleRecalculateLayout($xeTable, !!reFull)
      }, refreshDelay)
    })
  },
  updateStyle () {
    const $xeTable = this

    return updateStyle($xeTable)
  },
  /**
   * 处理固定列的显示状态
   */
  checkScrolling () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const { elemStore } = internalData
    const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
    const leftContainerElem = $xeTable.$refs.refLeftContainer as HTMLDivElement
    const rightContainerElem = $xeTable.$refs.refRightContainer as HTMLDivElement
    const xHandleEl = $xeTable.$refs.refScrollXHandleElem as HTMLDivElement
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
  preventEvent (evnt: any, type: any, args: any, next: any, end: any) {
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
    if (!evntList.some(func => func(Object.assign({ $grid: this.$xegrid, $table: this, $event: evnt }, args)) === false)) {
      if (next) {
        rest = next()
      }
    }
    if (end) {
      end()
    }
    return rest
  },
  /**
   * 全局按下事件处理
   */
  handleGlobalMousedownEvent (evnt: any) {
    const { $el, $refs, $xegrid, $toolbar, mouseConfig, editStore, ctxMenuStore, editRules, editOpts, validOpts, areaOpts, filterStore, customStore, getRowNode } = this
    const { actived } = editStore
    const { refTableMenu, filterWrapper, customWrapper, refValidTooltip } = $refs
    // 筛选
    if (filterWrapper) {
      if (getEventTargetNode(evnt, $el, 'vxe-cell--filter').flag) {
        // 如果点击了筛选按钮
      } else if (getEventTargetNode(evnt, filterWrapper.$el).flag) {
        // 如果点击筛选容器
      } else {
        if (!getEventTargetNode(evnt, document.body, 'vxe-table--ignore-clear').flag) {
          this.preventEvent(evnt, 'event.clearFilter', filterStore.args, this.closeFilter)
        }
      }
    }
    // 自定义列
    if (customWrapper) {
      if (customStore.btnEl === evnt.target || getEventTargetNode(evnt, document.body, 'vxe-toolbar-custom-target').flag) {
        // 如果点击了自定义列按钮
      } else if (getEventTargetNode(evnt, customWrapper.$el).flag) {
        // 如果点击自定义列容器
      } else {
        if (!getEventTargetNode(evnt, document.body, 'vxe-table--ignore-clear').flag) {
          this.preventEvent(evnt, 'event.clearCustom', {}, () => this.closeCustom())
        }
      }
    }

    // 如果已激活了编辑状态
    if (actived.row) {
      if (!(editOpts.autoClear === false)) {
        // 如果是激活状态，点击了单元格之外
        const cell = actived.args.cell
        if ((!cell || !getEventTargetNode(evnt, cell).flag)) {
          if (refValidTooltip && getEventTargetNode(evnt, refValidTooltip.$el).flag) {
            // 如果是激活状态，且点击了校验提示框
          } else if (!this.lastCallTime || this.lastCallTime + 50 < Date.now()) {
            if (!getEventTargetNode(evnt, document.body, 'vxe-table--ignore-clear').flag) {
              // 如果手动调用了激活单元格，避免触发源被移除后导致重复关闭
              this.preventEvent(evnt, 'event.clearEdit', actived.args, () => {
                let isClear
                if (editOpts.mode === 'row') {
                  const rowNode = getEventTargetNode(evnt, $el, 'vxe-body--row')
                  // row 方式，如果点击了不同行
                  isClear = rowNode.flag ? getRowNode(rowNode.targetElem).item !== actived.args.row : false
                } else {
                  // cell 方式，如果是非编辑列
                  isClear = !getEventTargetNode(evnt, $el, 'col--edit').flag
                }
                // 如果点击表头行，则清除激活状态
                if (!isClear) {
                  isClear = getEventTargetNode(evnt, $el, 'vxe-header--row').flag
                }
                // 如果点击表尾行，则清除激活状态
                if (!isClear) {
                  isClear = getEventTargetNode(evnt, $el, 'vxe-footer--row').flag
                }
                // 如果固定了高度且点击了行之外的空白处，则清除激活状态
                if (!isClear && this.height && !this.overflowY) {
                  const bodyWrapperElem = evnt.target
                  if (hasClass(bodyWrapperElem, 'vxe-table--body-wrapper')) {
                    isClear = evnt.offsetY < bodyWrapperElem.clientHeight
                  }
                }
                if (
                  isClear ||
                    // 如果点击了当前表格之外
                    !getEventTargetNode(evnt, $el).flag
                ) {
                  setTimeout(() => {
                    this.handleClearEdit(evnt).then(() => {
                      // 如果存在校验，点击了表格之外则清除
                      if (!this.isActivated && editRules && validOpts.autoClear) {
                        this.validErrorMaps = {}
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
      if (!getEventTargetNode(evnt, $el).flag && !($xegrid && getEventTargetNode(evnt, $xegrid.$el).flag) && !(refTableMenu && getEventTargetNode(evnt, refTableMenu.$el).flag) && !($toolbar && getEventTargetNode(evnt, $toolbar.$el).flag)) {
        if (this.clearSelected) {
          this.clearSelected()
        }
        if (areaOpts.autoClear) {
          if (this.getCellAreas) {
            const cellAreas = this.getCellAreas()
            if (cellAreas && cellAreas.length && !getEventTargetNode(evnt, document.body, 'vxe-table--ignore-areas-clear').flag) {
              this.preventEvent(evnt, 'event.clearAreas', {}, () => {
                this.clearCellAreas()
                this.clearCopyCellArea()
                this.emitEvent('clear-cell-area-selection', { cellAreas }, evnt)
              })
            }
          }
        }
      }
    }
    // 如果配置了快捷菜单且，点击了其他地方则关闭
    if (ctxMenuStore.visible && refTableMenu && !getEventTargetNode(evnt, refTableMenu.$el).flag) {
      this.closeMenu()
    }
    const isActivated = getEventTargetNode(evnt, ($xegrid || this).$el).flag
    // 如果存在校验，点击了表格之外则清除
    if (!isActivated && editRules && validOpts.autoClear) {
      this.validErrorMaps = {}
    }
    // 最后激活的表格
    this.isActivated = isActivated
  },
  /**
   * 窗口失焦事件处理
   */
  handleGlobalBlurEvent () {
    this.closeFilter()
    this.closeMenu()
  },
  /**
   * 全局滚动事件
   */
  handleGlobalMousewheelEvent () {
    this.closeTooltip()
    this.closeMenu()
  },
  /**
   * 表格键盘事件
   */
  keydownEvent (evnt: any) {
    const { filterStore, ctxMenuStore, editStore, keyboardConfig, mouseConfig, mouseOpts, keyboardOpts } = this
    const { actived } = editStore
    const { keyCode } = evnt
    const isEsc = keyCode === 27
    if (isEsc) {
      this.preventEvent(evnt, 'event.keydown', null, () => {
        this.emitEvent('keydown-start', {}, evnt)
        if (keyboardConfig && mouseConfig && mouseOpts.area && this.handleKeyboardCellAreaEvent) {
          this.handleKeyboardCellAreaEvent(evnt)
        } else if (actived.row || filterStore.visible || ctxMenuStore.visible) {
          evnt.stopPropagation()
          // 如果按下了 Esc 键，关闭快捷菜单、筛选
          this.closeFilter()
          this.closeMenu()
          if (keyboardConfig && keyboardOpts.isEsc) {
            // 如果是激活编辑状态，则取消编辑
            if (actived.row) {
              const params = actived.args
              this.handleClearEdit(evnt)
              // 如果配置了选中功能，则为选中状态
              if (mouseConfig && mouseOpts.selected) {
                this.$nextTick(() => this.handleSelected(params, evnt))
              }
            }
          }
        }
        this.emitEvent('keydown', {}, evnt)
        this.emitEvent('keydown-end', {}, evnt)
      })
    }
  },
  /**
   * 全局键盘事件
   */
  handleGlobalKeydownEvent (evnt: any) {
    const $xeTable = this
    const internalData = $xeTable

    // 该行为只对当前激活的表格有效
    if (this.isActivated) {
      this.preventEvent(evnt, 'event.keydown', null, () => {
        const { afterFullData } = internalData
        const { filterStore, isCtxMenu, ctxMenuStore, editStore, editOpts, editConfig, mouseConfig, mouseOpts, keyboardConfig, keyboardOpts, treeConfig, treeOpts, highlightCurrentRow, currentRow, bodyCtxMenu, rowOpts } = this
        const { selected, actived } = editStore
        const { keyCode } = evnt
        const hasBackspaceKey = keyCode === 8
        const isTab = keyCode === 9
        const isEnter = keyCode === 13
        const isEsc = keyCode === 27
        const isSpacebar = keyCode === 32
        const isLeftArrow = keyCode === 37
        const isUpArrow = keyCode === 38
        const isRightArrow = keyCode === 39
        const isDwArrow = keyCode === 40
        const hasDeleteKey = keyCode === 46
        const isF2 = keyCode === 113
        const isContextMenu = keyCode === 93
        const hasMetaKey = evnt.metaKey
        const hasCtrlKey = evnt.ctrlKey
        const hasShiftKey = evnt.shiftKey
        const hasAltKey = evnt.altKey
        const operArrow = isLeftArrow || isUpArrow || isRightArrow || isDwArrow
        const operCtxMenu = isCtxMenu && ctxMenuStore.visible && (isEnter || isSpacebar || operArrow)
        const isEditStatus = isEnableConf(editConfig) && actived.column && actived.row
        const childrenField = treeOpts.children || treeOpts.childrenField
        const beforeEditMethod = editOpts.beforeEditMethod || editOpts.activeMethod
        if (filterStore.visible) {
          if (isEsc) {
            this.closeFilter()
          }
          return
        }
        if (operCtxMenu) {
          // 如果配置了右键菜单; 支持方向键操作、回车
          evnt.preventDefault()
          if (ctxMenuStore.showChild && hasChildrenList(ctxMenuStore.selected)) {
            this.moveCtxMenu(evnt, keyCode, ctxMenuStore, 'selectChild', 37, false, ctxMenuStore.selected.children)
          } else {
            this.moveCtxMenu(evnt, keyCode, ctxMenuStore, 'selected', 39, true, this.ctxMenuList)
          }
        } else if (keyboardConfig && mouseConfig && mouseOpts.area && this.handleKeyboardCellAreaEvent) {
          this.handleKeyboardCellAreaEvent(evnt)
        } else if (keyboardConfig && isSpacebar && keyboardOpts.isChecked && selected.row && selected.column && (selected.column.type === 'checkbox' || selected.column.type === 'radio')) {
          // 空格键支持选中复选框
          evnt.preventDefault()
          if (selected.column.type === 'checkbox') {
            this.handleToggleCheckRowEvent(evnt, selected.args)
          } else {
            this.triggerRadioRowEvent(evnt, selected.args)
          }
        } else if (isF2 && isEnableConf(editConfig)) {
          if (!isEditStatus) {
            // 如果按下了 F2 键
            if (selected.row && selected.column) {
              evnt.stopPropagation()
              evnt.preventDefault()
              this.handleEdit(selected.args, evnt)
            }
          }
        } else if (isContextMenu) {
          // 如果按下上下文键
          internalData._keyCtx = selected.row && selected.column && bodyCtxMenu.length
          clearTimeout(internalData.keyCtxTimeout)
          internalData.keyCtxTimeout = setTimeout(() => {
            internalData._keyCtx = false
          }, 1000)
        } else if (isEnter && !hasAltKey && keyboardConfig && keyboardOpts.isEnter && (selected.row || actived.row || (treeConfig && (rowOpts.isCurrent || highlightCurrentRow) && currentRow))) {
          const { isLastEnterAppendRow, beforeEnterMethod, enterMethod } = keyboardOpts
          // 退出选中
          if (hasCtrlKey) {
            // 如果是激活编辑状态，则取消编辑
            if (actived.row) {
              const params = actived.args
              this.handleClearEdit(evnt)
              // 如果配置了选中功能，则为选中状态
              if (mouseConfig && mouseOpts.selected) {
                this.$nextTick(() => this.handleSelected(params, evnt))
              }
            }
          } else {
            // 如果是激活状态，退则出到上一行/下一行
            if (selected.row || actived.row) {
              const activeParams = selected.row ? selected.args : actived.args
              if (hasShiftKey) {
                if (keyboardOpts.enterToTab) {
                  this.moveTabSelected(activeParams, hasShiftKey, evnt)
                } else {
                  this.moveSelected(activeParams, isLeftArrow, true, isRightArrow, false, evnt)
                }
              } else {
                if (keyboardOpts.enterToTab) {
                  this.moveTabSelected(activeParams, hasShiftKey, evnt)
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
                        $xeTable.insertAt({}, -1).then(({ row: newRow }: any) => {
                          $xeTable.scrollToRow(newRow, selected.column)
                          $xeTable.handleSelected({ ...activeParams, row: newRow }, evnt)
                        })
                        $xeTable.dispatchEvent('enter-append-row', etrParams, evnt)
                        return
                      }
                    }
                    this.moveSelected(activeParams, isLeftArrow, false, isRightArrow, true, evnt)
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
                const params = { $table: this, row: targetRow }
                this.setTreeExpand(currentRow, true)
                  .then(() => this.scrollToRow(targetRow))
                  .then(() => this.triggerCurrentRowEvent(evnt, params))
              }
            }
          }
        } else if (operArrow && keyboardConfig && keyboardOpts.isArrow) {
          if (!isEditStatus) {
            // 如果按下了方向键
            if (selected.row && selected.column) {
              this.moveSelected(selected.args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow, evnt)
            } else if ((isUpArrow || isDwArrow) && (rowOpts.isCurrent || highlightCurrentRow)) {
              // 当前行按键上下移动
              this.moveCurrentRow(isUpArrow, isDwArrow, evnt)
            }
          }
        } else if (isTab && keyboardConfig && keyboardOpts.isTab) {
          // 如果按下了 Tab 键切换
          if (selected.row || selected.column) {
            this.moveTabSelected(selected.args, hasShiftKey, evnt)
          } else if (actived.row || actived.column) {
            this.moveTabSelected(actived.args, hasShiftKey, evnt)
          }
        } else if (keyboardConfig && keyboardOpts.isDel && hasDeleteKey && isEnableConf(editConfig) && (selected.row || selected.column)) {
          // 如果是删除键
          if (!isEditStatus) {
            const { delMethod } = keyboardOpts
            const params = {
              row: selected.row,
              rowIndex: this.getRowIndex(selected.row),
              column: selected.column,
              columnIndex: this.getColumnIndex(selected.column),
              $table: this,
              $grid: this.$xegrid
            }
            // 是否被禁用
            if (!beforeEditMethod || beforeEditMethod(params)) {
              if (delMethod) {
                delMethod(params)
              } else {
                setCellValue(selected.row, selected.column, null)
              }
              // 如果按下 del 键，更新表尾数据
              this.updateFooter()
              this.emitEvent('cell-delete-value', params, evnt)
            }
          }
        } else if (hasBackspaceKey && keyboardConfig && keyboardOpts.isBack && isEnableConf(editConfig) && (selected.row || selected.column)) {
          if (!isEditStatus) {
            const { editMode, backMethod } = keyboardOpts
            // 如果是删除键
            if (keyboardOpts.isDel && isEnableConf(editConfig) && (selected.row || selected.column)) {
              const params = {
                row: selected.row,
                rowIndex: this.getRowIndex(selected.row),
                column: selected.column,
                columnIndex: this.getColumnIndex(selected.column),
                $table: this,
                $grid: this.$xegrid
              }
              // 是否被禁用
              if (!beforeEditMethod || beforeEditMethod(params)) {
                if (backMethod) {
                  backMethod(params)
                } else {
                  // 追加方式与覆盖式
                  if (editMode !== 'insert') {
                    setCellValue(selected.row, selected.column, null)
                  }
                  this.handleEdit(selected.args, evnt)
                }
                this.emitEvent('cell-backspace-value', params, evnt)
              }
            }
          }
        } else if (hasBackspaceKey && keyboardConfig && treeConfig && keyboardOpts.isBack && (rowOpts.isCurrent || highlightCurrentRow) && currentRow) {
          // 如果树形表格回退键关闭当前行返回父节点
          const { parent: parentRow } = XEUtils.findTree(this.afterTreeFullData, item => item === currentRow, { children: childrenField })
          if (parentRow) {
            evnt.preventDefault()
            const params = {
              row: parentRow,
              rowIndex: this.getRowIndex(parentRow),
              $rowIndex: this.getVMRowIndex(parentRow),
              $table: this,
              $grid: this.$xegrid
            }
            this.setTreeExpand(parentRow, false)
              .then(() => this.scrollToRow(parentRow))
              .then(() => this.triggerCurrentRowEvent(evnt, params))
          }
        } else if (keyboardConfig && keyboardOpts.isEdit && !hasCtrlKey && !hasMetaKey && (isSpacebar || (keyCode >= 48 && keyCode <= 57) || (keyCode >= 65 && keyCode <= 90) || (keyCode >= 96 && keyCode <= 111) || (keyCode >= 186 && keyCode <= 192) || (keyCode >= 219 && keyCode <= 222))) {
          const { editMethod } = keyboardOpts
          // 启用编辑后，空格键功能将失效
          // if (isSpacebar) {
          //   evnt.preventDefault()
          // }
          // 如果是按下非功能键之外允许直接编辑
          if (selected.column && selected.row && isEnableConf(selected.column.editRender)) {
            const beforeEditMethod = editOpts.beforeEditMethod || editOpts.activeMethod
            const params = {
              row: selected.row,
              rowIndex: this.getRowIndex(selected.row),
              column: selected.column,
              columnIndex: this.getColumnIndex(selected.column),
              $table: this,
              $grid: this.$xegrid
            }
            if (!beforeEditMethod || beforeEditMethod(params)) {
              if (editMethod) {
                editMethod(params)
              } else {
                setCellValue(selected.row, selected.column, null)
                this.handleEdit(selected.args, evnt)
              }
            }
          }
        }
        this.emitEvent('keydown', {}, evnt)
      })
    }
  },
  handleGlobalPasteEvent (evnt: any) {
    const { isActivated, keyboardConfig, keyboardOpts, mouseConfig, mouseOpts, editStore, filterStore } = this
    const { actived } = editStore
    if (isActivated && !filterStore.visible) {
      if (!(actived.row || actived.column)) {
        if (keyboardConfig && keyboardOpts.isClip && mouseConfig && mouseOpts.area && this.handlePasteCellAreaEvent) {
          this.handlePasteCellAreaEvent(evnt)
        }
      }
      this.emitEvent('paste', {}, evnt)
    }
  },
  handleGlobalCopyEvent (evnt: any) {
    const { isActivated, keyboardConfig, keyboardOpts, mouseConfig, mouseOpts, editStore, filterStore } = this
    const { actived } = editStore
    if (isActivated && !filterStore.visible) {
      if (!(actived.row || actived.column)) {
        if (keyboardConfig && keyboardOpts.isClip && mouseConfig && mouseOpts.area && this.handleCopyCellAreaEvent) {
          this.handleCopyCellAreaEvent(evnt)
        }
      }
      this.emitEvent('copy', {}, evnt)
    }
  },
  handleGlobalCutEvent (evnt: any) {
    const { isActivated, keyboardConfig, keyboardOpts, mouseConfig, mouseOpts, editStore, filterStore } = this
    const { actived } = editStore
    if (isActivated && !filterStore.visible) {
      if (!(actived.row || actived.column)) {
        if (keyboardConfig && keyboardOpts.isClip && mouseConfig && mouseOpts.area && this.handleCutCellAreaEvent) {
          this.handleCutCellAreaEvent(evnt)
        }
      }
      this.emitEvent('cut', {}, evnt)
    }
  },
  handleGlobalResizeEvent () {
    this.closeMenu()
    this.updateCellAreas()
    this.recalculate(true)
  },
  handleTargetLeaveEvent () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const tooltipOpts = $xeTable.computeTooltipOpts
    let $tooltip = $xeTable.$refs.refTooltip as VxeTooltipInstance
    if ($tooltip && $tooltip.setActived) {
      $tooltip.setActived(false)
    }
    if (tooltipOpts.enterable) {
      internalData.tooltipTimeout = setTimeout(() => {
        $tooltip = $xeTable.$refs.refTooltip as VxeTooltipInstance
        if ($tooltip && $tooltip.isActived && !$tooltip.isActived()) {
          $xeTable.closeTooltip()
        }
      }, tooltipOpts.leaveDelay)
    } else {
      $xeTable.closeTooltip()
    }
  },
  triggerHeaderTitleEvent (evnt: any, iconParams: any, params: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData

    const tipContent = iconParams.content || (iconParams as any).message
    if (tipContent) {
      const { tooltipStore } = reactData
      const { column } = params
      const content = getFuncText(tipContent)
      handleTargetEnterEvent($xeTable, true)
      tooltipStore.row = null
      tooltipStore.column = column
      tooltipStore.visible = true
      tooltipStore.currOpts = iconParams
      $xeTable.$nextTick(() => {
        const $tooltip = $xeTable.$refs.refTooltip as VxeTooltipInstance
        if ($tooltip && $tooltip.open) {
          $tooltip.open(evnt.currentTarget, content)
        }
      })
    }
  },
  /**
   * 触发表头 tooltip 事件
   */
  triggerHeaderTooltipEvent (evnt: any, params: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData

    const { tooltipStore } = reactData
    const { column } = params
    handleTargetEnterEvent($xeTable, true)
    const titleElem = evnt.currentTarget as HTMLDivElement
    if (!titleElem) {
      return
    }
    const cellEl = titleElem.parentElement as HTMLDivElement
    if (!cellEl) {
      return
    }
    const thEl = cellEl.parentElement as HTMLTableCellElement
    if (!thEl) {
      return
    }
    if (tooltipStore.column !== column || !tooltipStore.visible) {
      handleTooltip($xeTable, evnt, thEl, cellEl, null, params)
    }
  },
  /**
   * 触发单元格 tooltip 事件
   */
  triggerBodyTooltipEvent (evnt: any, params: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const reactData = $xeTable as unknown as TableReactData

    const { editConfig } = props
    const { editStore } = reactData
    const { tooltipStore } = reactData
    const editOpts = $xeTable.computeEditOpts
    const { actived } = editStore
    const { row, column } = params
    const tdEl = evnt.currentTarget as HTMLTableCellElement
    handleTargetEnterEvent($xeTable, tooltipStore.column !== column || tooltipStore.row !== row)
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
      handleTooltip($xeTable, evnt, tdEl, tdEl.querySelector('.vxe-cell--wrapper') as HTMLElement, null, params)
    }
  },
  /**
   * 触发表尾 tooltip 事件
   */
  triggerFooterTooltipEvent (evnt: any, params: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData

    const { column } = params
    const { tooltipStore } = reactData
    const cell = evnt.currentTarget as HTMLTableCellElement
    handleTargetEnterEvent($xeTable, tooltipStore.column !== column || !!tooltipStore.row)
    if (tooltipStore.column !== column || !tooltipStore.visible) {
      handleTooltip($xeTable, evnt, cell, cell.querySelector('.vxe-cell--wrapper') as HTMLElement || cell.children[0], null, params)
    }
  },
  openTooltip (target: any, content: any) {
    const { $refs } = this
    const commTip = $refs.refCommTooltip
    if (commTip) {
      return commTip.open(target, content)
    }
    return this.$nextTick()
  },
  /**
   * 关闭 tooltip
   */
  closeTooltip () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData

    const { tooltipStore } = reactData
    const tooltip = $xeTable.$refs.refTooltip as VxeTooltipInstance
    const commTip = $xeTable.$refs.refCommTooltip as VxeTooltipInstance
    if (tooltipStore.visible) {
      Object.assign(tooltipStore, {
        row: null,
        column: null,
        content: null,
        visible: false,
        currOpts: {}
      })
      if (tooltip) {
        tooltip.close()
      }
    }
    if (commTip) {
      commTip.close()
    }
    return this.$nextTick()
  },
  /**
   * 判断列头复选框是否被选中
   */
  isAllCheckboxChecked () {
    return this.isAllSelected
  },
  /**
   * 判断列头复选框是否被半选
   */
  isAllCheckboxIndeterminate () {
    return !this.isAllSelected && this.isIndeterminate
  },
  isCheckboxIndeterminate () {
    warnLog('vxe.error.delFunc', ['isCheckboxIndeterminate', 'isAllCheckboxIndeterminate'])
    return this.isAllCheckboxIndeterminate()
  },
  /**
   * 获取复选框半选状态的行数据
   */
  getCheckboxIndeterminateRecords (isFull: any) {
    const { treeConfig, treeIndeterminateMaps, fullDataRowIdData } = this
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
   * 处理默认勾选
   */
  handleDefaultSelectionChecked () {
    const { fullDataRowIdData, checkboxOpts } = this
    const { checkAll, checkRowKeys } = checkboxOpts
    if (checkAll) {
      this.handleCheckedAllCheckboxRow(true, true)
    } else if (checkRowKeys) {
      const defSelection: any[] = []
      checkRowKeys.forEach((rowid: any) => {
        if (fullDataRowIdData[rowid]) {
          defSelection.push(fullDataRowIdData[rowid].row)
        }
      })
      this.handleCheckedCheckboxRow(defSelection, true, true)
    }
  },
  handleCheckedCheckboxRow (rows: any, value: any, isForce: any) {
    const $xeTable = this

    if (rows && !XEUtils.isArray(rows)) {
      rows = [rows]
    }
    $xeTable.handleBatchSelectRows(rows, !!value, isForce)
    $xeTable.checkSelectionStatus()
    return this.$nextTick()
  },
  /**
   * 用于多选行，设置行为选中状态，第二个参数为选中与否
   * @param {Array/Row} rows 行数据
   * @param {Boolean} value 是否选中
   */
  setCheckboxRow (rows: any, checked: any) {
    const $xeTable = this

    if (rows && !XEUtils.isArray(rows)) {
      rows = [rows]
    }
    return $xeTable.handleCheckedCheckboxRow(rows, checked, true)
  },
  setCheckboxRowKey (keys: any, checked: boolean) {
    const $xeTable = this
    const internalData = $xeTable

    const { fullAllDataRowIdData } = internalData
    if (keys && !XEUtils.isArray(keys)) {
      keys = [keys]
    }
    const rows: any = []
    keys.forEach((rowid: string) => {
      const rowRest = fullAllDataRowIdData[rowid]
      if (rowRest) {
        rows.push(rowRest.row)
      }
    })
    return $xeTable.handleCheckedCheckboxRow(rows, checked, true)
  },
  isCheckedByCheckboxRow (row: any) {
    const $xeTable = this
    const reactData = $xeTable

    const { selectCheckboxMaps } = reactData
    const checkboxOpts = $xeTable.computeCheckboxOpts
    const { checkField } = checkboxOpts
    if (checkField) {
      return XEUtils.get(row, checkField)
    }
    return !!selectCheckboxMaps[getRowid($xeTable, row)]
  },
  isCheckedByCheckboxRowKey (rowid: string) {
    const $xeTable = this
    const reactData = $xeTable
    const internalData = $xeTable

    const { selectCheckboxMaps } = reactData
    const { fullAllDataRowIdData } = internalData
    const checkboxOpts = $xeTable.computeCheckboxOpts
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
  isIndeterminateByCheckboxRow (row: any) {
    const $xeTable = this
    const reactData = $xeTable

    const { treeIndeterminateMaps } = reactData
    return !!treeIndeterminateMaps[getRowid($xeTable, row)] && !$xeTable.isCheckedByCheckboxRow(row)
  },
  isIndeterminateByCheckboxRowKey (rowid: string) {
    const $xeTable = this
    const reactData = $xeTable

    const { treeIndeterminateMaps } = reactData
    return !!treeIndeterminateMaps[rowid] && !$xeTable.isCheckedByCheckboxRowKey(rowid)
  },
  /**
   * 切换选中
   * 多选，行选中事件
   */
  handleBatchSelectRows (rows: any[], checked: boolean, isForce?: boolean) {
    const $xeTable = this
    const props = $xeTable
    const reactData = $xeTable

    const { treeConfig } = props
    const { selectCheckboxMaps } = reactData
    const selectRowMaps = Object.assign({}, selectCheckboxMaps)
    const treeOpts = $xeTable.computeTreeOpts
    const { transform, mapChildrenField } = treeOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    const checkboxOpts = $xeTable.computeCheckboxOpts
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
            $xeTable.handleCheckboxReserveRow(row, checked)
          }
        }, { children: transform ? mapChildrenField : childrenField })
        reactData.selectCheckboxMaps = selectRowMaps
        return
      } else {
        // 列表
        rows.forEach(row => {
          if (isForce || (!checkMethod || checkMethod({ row }))) {
            XEUtils.set(row, checkField, checked)
            $xeTable.handleCheckboxReserveRow(row, checked)
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
          $xeTable.handleCheckboxReserveRow(row, checked)
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
        $xeTable.handleCheckboxReserveRow(row, checked)
      }
    })
    reactData.selectCheckboxMaps = selectRowMaps
  },
  /**
   * 即将移除
   * @deprecated
   */
  handleSelectRow ({ row }: any, checked: boolean, isForce?: boolean) {
    const $xeTable = this

    $xeTable.handleBatchSelectRows([row], checked, isForce)
  },
  handleToggleCheckRowEvent (evnt: any, params: any) {
    const { selectCheckboxMaps, checkboxOpts } = this
    const { checkField, trigger } = checkboxOpts
    const { row } = params
    if (trigger === 'manual') {
      return
    }
    let checked = false
    if (checkField) {
      checked = !XEUtils.get(row, checkField)
    } else {
      checked = !selectCheckboxMaps[getRowid(this, row)]
    }
    if (evnt) {
      this.triggerCheckRowEvent(evnt, params, checked)
    } else {
      this.handleSelectRow(params, checked)
      this.checkSelectionStatus()
    }
  },
  triggerCheckRowEvent (evnt: any, params: any, checked: any) {
    const { checkboxOpts, afterFullData } = this
    const { checkMethod, trigger } = checkboxOpts
    const { row } = params
    if (trigger === 'manual') {
      return
    }
    evnt.stopPropagation()
    if (checkboxOpts.isShiftKey && evnt.shiftKey && !this.treeConfig) {
      const checkboxRecords = this.getCheckboxRecords()
      if (checkboxRecords.length) {
        const firstRow = checkboxRecords[0]
        const _rowIndex = this.getVTRowIndex(row)
        const _firstRowIndex = this.getVTRowIndex(firstRow)
        if (_rowIndex !== _firstRowIndex) {
          this.setAllCheckboxRow(false)
          const rangeRows = _rowIndex < _firstRowIndex ? afterFullData.slice(_rowIndex, _firstRowIndex + 1) : afterFullData.slice(_firstRowIndex, _rowIndex + 1)
          this.handleCheckedCheckboxRow(rangeRows, true, false)
          this.emitEvent('checkbox-range-select', Object.assign({ rangeRecords: rangeRows }, params), evnt)
          return
        }
      }
    }
    if (!checkMethod || checkMethod({ row })) {
      this.handleSelectRow(params, checked)
      this.checkSelectionStatus()
      this.emitEvent('checkbox-change', Object.assign({
        records: this.getCheckboxRecords(),
        reserves: this.getCheckboxReserveRecords(),
        indeterminates: this.getCheckboxIndeterminateRecords(),
        checked
      }, params), evnt)
    }
  },
  /**
   * 多选，切换某一行的选中状态
   */
  toggleCheckboxRow (row: any) {
    const $xeTable = this

    const { selectCheckboxMaps, checkboxOpts } = this
    const { checkField } = checkboxOpts
    const checked = checkField ? !XEUtils.get(row, checkField) : !selectCheckboxMaps[getRowid($xeTable, row)]
    $xeTable.handleBatchSelectRows([row], checked, true)
    $xeTable.checkSelectionStatus()
    return $xeTable.$nextTick()
  },
  handleCheckedAllCheckboxRow (checked: any, isForce: any) {
    const $xeTable = this
    const reactData = $xeTable

    const { afterFullData, treeConfig, treeOpts, selectCheckboxMaps, checkboxReserveRowMap, checkboxOpts, afterFullRowMaps } = this
    const { checkField, reserve, checkStrictly, checkMethod } = checkboxOpts
    const indeterminateField = checkboxOpts.indeterminateField || checkboxOpts.halfField
    const childrenField = treeOpts.children || treeOpts.childrenField
    const selectRowMaps: any = {}

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
      this.isAllSelected = checked
    } else {
      /**
       * 绑定属性方式（高性能，有污染）
       * 必须在行数据存在对应的属性，否则将不响应
       */
      if (checkField) {
        const checkValFn = (row: any) => {
          if (isForce || (!checkMethod || checkMethod({ row }))) {
            if (checked) {
              selectRowMaps[getRowid(this, row)] = row
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
                selectRowMaps[getRowid(this, row)] = row
              }
            }, { children: childrenField })
          } else {
            /**
             * 如果是树取消
             * 如果方法成立，则不添加到临时集合中
             */
            if (!isForce && checkMethod) {
              XEUtils.eachTree(afterFullData, (row) => {
                const rowid = getRowid(this, row)
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
              afterFullData.forEach((row: any) => {
                const rowid = getRowid(this, row)
                if (selectCheckboxMaps[rowid] || checkMethod({ row })) {
                  selectRowMaps[rowid] = row
                }
              })
            } else {
              afterFullData.forEach((row: any) => {
                selectRowMaps[getRowid(this, row)] = row
              })
            }
          } else {
            /**
             * 如果是行取消
             * 如果方法成立，则不添加到临时集合中；如果方法不成立则判断当前是否已勾选，如果已被勾选则添加到新集合中
             * 如果不存在选中方法，无需处理，临时集合默认为空
             */
            if (!isForce && checkMethod) {
              afterFullData.forEach((row: any) => {
                const rowid = getRowid(this, row)
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
          afterFullData.forEach((row: any) => this.handleCheckboxReserveRow(row, false))
        }
      }
      this.selectCheckboxMaps = checkField ? {} : selectRowMaps
    }

    reactData.isAllSelected = checked
    reactData.isIndeterminate = false
    this.treeIndeterminateMaps = {}
    this.treeIndeterminateRowMaps = {}
    this.checkSelectionStatus()
    return this.$nextTick()
  },
  /**
   * 用于多选行，设置所有行的选中状态
   * @param {Boolean} value 是否选中
   */
  setAllCheckboxRow (value: any) {
    return this.handleCheckedAllCheckboxRow(value, true)
  },
  updateCheckboxStatus () {
    const $xeTable = this
    const props = $xeTable
    const reactData = $xeTable
    const internalData = $xeTable

    const { treeConfig } = props
    const { selectCheckboxMaps, treeIndeterminateMaps } = reactData
    const selectRowMaps = Object.assign({}, selectCheckboxMaps)
    const halfRowMaps = Object.assign({}, treeIndeterminateMaps)
    const treeOpts = $xeTable.computeTreeOpts
    const { transform, mapChildrenField } = treeOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    const checkboxOpts = $xeTable.computeCheckboxOpts
    const { checkField, checkStrictly, checkMethod } = checkboxOpts
    const { afterTreeFullData } = internalData
    if (checkStrictly) {
      return
    }
    // 树结构
    if (treeConfig) {
      const childRowMaps: Record<string, number> = {}
      const childRowList: any[][] = []
      XEUtils.eachTree(afterTreeFullData, (row: any) => {
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
    const $xeTable = this
    const props = $xeTable
    const reactData = $xeTable
    const internalData = $xeTable

    const { treeConfig } = props
    const { selectCheckboxMaps, treeIndeterminateMaps } = reactData
    const checkboxOpts = $xeTable.computeCheckboxOpts
    const { checkField, checkMethod } = checkboxOpts
    const { afterFullData, afterTreeFullData } = internalData

    let sLen = 0 // 已选
    let hLen = 0 // 半选
    let vLen = 0 // 有效行

    const rootList: any[] = (treeConfig ? afterTreeFullData : afterFullData)
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
    const $xeTable = this

    $xeTable.updateCheckboxStatus()
    $xeTable.updateAllCheckboxStatus()
  },
  // 还原展开、选中等相关状态
  handleReserveStatus () {
    const $xeTable = this

    const { expandColumn, treeOpts, treeConfig, fullDataRowIdData, fullAllDataRowIdData, currentRow, selectRadioRow, radioReserveRow, radioOpts, checkboxOpts, selectCheckboxMaps, rowExpandedMaps, treeExpandedMaps, expandOpts } = this
    // 单选框
    if (selectRadioRow && !fullAllDataRowIdData[getRowid($xeTable, selectRadioRow)]) {
      this.selectRadioRow = null // 刷新单选行状态
    }
    // 还原保留选中状态
    if (radioOpts.reserve && radioReserveRow) {
      const rowid = getRowid(this, radioReserveRow)
      if (fullDataRowIdData[rowid]) {
        this.handleCheckedRadioRow(fullDataRowIdData[rowid].row, true)
      }
    }
    // 复选框
    this.selectCheckboxMaps = getRecoverRowMaps(this, selectCheckboxMaps) // 刷新多选行状态
    // 还原保留选中状态
    if (checkboxOpts.reserve) {
      this.handleCheckedCheckboxRow(handleReserveRow(this, this.checkboxReserveRowMap), true, true)
    }
    if (currentRow && !this.fullAllDataRowIdData[getRowid($xeTable, currentRow)]) {
      this.currentRow = null // 刷新当前行状态
    }
    // 行展开
    this.rowExpandedMaps = expandColumn ? getRecoverRowMaps(this, rowExpandedMaps) : [] // 刷新行展开状态
    // 还原保留状态
    if (expandColumn && expandOpts.reserve) {
      this.setRowExpand(handleReserveRow(this, this.rowExpandedReserveRowMap), true)
    }
    // 树展开
    this.treeExpandedMaps = treeConfig ? getRecoverRowMaps(this, treeExpandedMaps) : [] // 刷新树展开状态
    if (treeConfig && treeOpts.reserve) {
      this.setTreeExpand(handleReserveRow(this, this.treeExpandedReserveRowMap), true)
    }
  },
  /**
   * 获取单选框保留选中的行
   */
  getRadioReserveRecord (isFull: any) {
    const { fullDataRowIdData, radioReserveRow, radioOpts, afterFullData, treeConfig, treeOpts } = this
    const childrenField = treeOpts.children || treeOpts.childrenField
    if (radioOpts.reserve && radioReserveRow) {
      const rowid = getRowid(this, radioReserveRow)
      if (isFull) {
        if (!fullDataRowIdData[rowid]) {
          return radioReserveRow
        }
      } else {
        const rowkey = getRowkey(this)
        if (treeConfig) {
          const matchObj = XEUtils.findTree(afterFullData, row => rowid === XEUtils.get(row, rowkey), { children: childrenField })
          if (matchObj) {
            return radioReserveRow
          }
        } else {
          if (!afterFullData.some((row: any) => rowid === XEUtils.get(row, rowkey))) {
            return radioReserveRow
          }
        }
      }
    }
    return null
  },
  clearRadioReserve () {
    this.radioReserveRow = null
    return this.$nextTick()
  },
  handleRadioReserveRow (row: any) {
    const { radioOpts } = this
    if (radioOpts.reserve) {
      this.radioReserveRow = row
    }
  },
  /**
   * 获取复选框保留选中的行
   */
  getCheckboxReserveRecords (isFull: any) {
    const { fullDataRowIdData, afterFullData, checkboxReserveRowMap, checkboxOpts, treeConfig, treeOpts } = this
    const childrenField = treeOpts.children || treeOpts.childrenField
    const reserveSelection: any[] = []
    if (checkboxOpts.reserve) {
      const afterFullIdMaps: any = {}
      if (treeConfig) {
        XEUtils.eachTree(afterFullData, row => {
          afterFullIdMaps[getRowid(this, row)] = 1
        }, { children: childrenField })
      } else {
        afterFullData.forEach((row: any) => {
          afterFullIdMaps[getRowid(this, row)] = 1
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
    this.checkboxReserveRowMap = {}
    return this.$nextTick()
  },
  handleCheckboxReserveRow (row: any, checked: any) {
    const { checkboxReserveRowMap, checkboxOpts } = this
    if (checkboxOpts.reserve) {
      const rowid = getRowid(this, row)
      if (checked) {
        checkboxReserveRowMap[rowid] = row
      } else if (checkboxReserveRowMap[rowid]) {
        delete checkboxReserveRowMap[rowid]
      }
    }
  },
  handleCheckAllEvent (evnt: any, value: any) {
    this.handleCheckedAllCheckboxRow(value)
    if (evnt) {
      this.emitEvent('checkbox-all', { records: this.getCheckboxRecords(), reserves: this.getCheckboxReserveRecords(), indeterminates: this.getCheckboxIndeterminateRecords(), checked: value }, evnt)
    }
  },
  /**
   * 多选，选中所有事件
   */
  triggerCheckAllEvent (evnt: any, value: any) {
    const { checkboxOpts } = this
    const { trigger } = checkboxOpts
    if (trigger === 'manual') {
      return
    }
    if (evnt) {
      evnt.stopPropagation()
    }
    this.handleCheckAllEvent(evnt, value)
  },
  /**
   * 多选，切换所有行的选中状态
   */
  toggleAllCheckboxRow () {
    this.handleCheckAllEvent(null, !this.isAllSelected)
    return this.$nextTick()
  },
  /**
   * 用于多选行，手动清空用户的选择
   * 清空行为不管是否被禁用还是保留记录，都将彻底清空选中状态
   */
  clearCheckboxRow () {
    const { tableFullData, treeConfig, treeOpts, checkboxOpts } = this
    const { checkField, reserve } = checkboxOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
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
      tableFullData.forEach((row: any) => this.handleCheckboxReserveRow(row, false))
    }
    this.isAllSelected = false
    this.isIndeterminate = false
    this.selectCheckboxMaps = {}
    this.treeIndeterminateMaps = {}
    return this.$nextTick()
  },
  /**
   * 处理单选框默认勾选
   */
  handleDefaultRadioChecked () {
    const { radioOpts, fullDataRowIdData } = this
    const { checkRowKey: rowid, reserve } = radioOpts
    if (rowid) {
      if (fullDataRowIdData[rowid]) {
        this.handleCheckedRadioRow(fullDataRowIdData[rowid].row, true)
      }
      if (reserve) {
        const rowkey = getRowkey(this)
        this.radioReserveRow = { [rowkey]: rowid }
      }
    }
  },
  /**
   * 单选，行选中事件
   */
  triggerRadioRowEvent (evnt: Event, params: {
    row: any
  }) {
    const { selectRadioRow: oldValue, radioOpts } = this
    const { row } = params
    const { trigger } = radioOpts
    if (trigger === 'manual') {
      return
    }
    evnt.stopPropagation()
    let newValue = row
    let isChange = oldValue !== newValue
    if (isChange) {
      this.handleCheckedRadioRow(newValue)
    } else if (!radioOpts.strict) {
      isChange = oldValue === newValue
      if (isChange) {
        newValue = null
        this.clearRadioRow()
      }
    }
    if (isChange) {
      this.emitEvent('radio-change', { oldValue, newValue, ...params }, evnt)
    }
  },
  triggerCurrentColumnEvent (evnt: Event, params: {
    column: VxeTableDefines.ColumnInfo
  }) {
    const $xeTable = this

    const columnOpts = $xeTable.computeColumnOpts
    const { currentMethod } = columnOpts
    const { column } = params
    if (!currentMethod || currentMethod({ column })) {
      $xeTable.setCurrentColumn(column)
    }
  },
  triggerCurrentRowEvent (evnt: Event, params: any) {
    const $xeTable = this
    const reactData = $xeTable

    const { currentRow: oldValue } = reactData
    const rowOpts = $xeTable.computeRowOpts
    const { currentMethod } = rowOpts
    const { row: newValue } = params
    const isChange = oldValue !== newValue
    if (!currentMethod || currentMethod({ row: newValue })) {
      $xeTable.setCurrentRow(newValue)
      if (isChange) {
        $xeTable.dispatchEvent('current-change', { oldValue, newValue, ...params }, evnt)
      }
    }
  },
  /**
   * 用于当前行，设置某一行为高亮状态
   * @param {Row} row 行对象
   */
  setCurrentRow (row: any) {
    const { $el, rowOpts } = this
    this.clearCurrentRow()
    // this.clearCurrentColumn()
    this.currentRow = row
    if (rowOpts.isCurrent || this.highlightCurrentRow) {
      if ($el) {
        XEUtils.arrayEach($el.querySelectorAll(`[rowid="${getRowid(this, row)}"]`), elem => addClass(elem, 'row--current'))
      }
    }
    return this.$nextTick()
  },
  isCheckedByRadioRow (row: any) {
    const $xeTable = this
    const reactData = $xeTable

    const { selectRadioRow } = reactData
    if (row && selectRadioRow) {
      return $xeTable.eqRow(selectRadioRow, row)
    }
    return false
  },
  isCheckedByRadioRowKey (key: string) {
    const $xeTable = this
    const reactData = $xeTable

    const { selectRadioRow } = reactData
    if (selectRadioRow) {
      return key === getRowid($xeTable, selectRadioRow)
    }
    return false
  },
  handleCheckedRadioRow (row: any, isForce?: boolean) {
    const { radioOpts } = this
    const { checkMethod } = radioOpts
    if (row && (isForce || (!checkMethod || checkMethod({ row })))) {
      this.selectRadioRow = row
      this.handleRadioReserveRow(row)
    }
    return this.$nextTick()
  },
  /**
   * 用于单选行，设置某一行为选中状态
   * @param {Row} row 行对象
   */
  setRadioRow (row: any) {
    const $xeTable = this

    return $xeTable.handleCheckedRadioRow(row, true)
  },
  /**
   * 用于单选行，设置某一行为选中状态
   * @param key 行主键
   */
  setRadioRowKey (rowid: any) {
    const $xeTable = this
    const internalData = $xeTable

    const { fullAllDataRowIdData } = internalData
    const rowRest = fullAllDataRowIdData[rowid]
    if (rowRest) {
      return $xeTable.handleCheckedRadioRow(rowRest.row, true)
    }
    return $xeTable.$nextTick()
  },
  /**
   * 用于当前行，手动清空当前高亮的状态
   */
  clearCurrentRow () {
    const { $el } = this
    this.currentRow = null
    this.hoverRow = null
    if ($el) {
      XEUtils.arrayEach($el.querySelectorAll('.row--current'), elem => removeClass(elem, 'row--current'))
    }
    return this.$nextTick()
  },
  /**
   * 用于单选行，手动清空用户的选择
   */
  clearRadioRow () {
    this.selectRadioRow = null
    return this.$nextTick()
  },
  /**
   * 用于当前行，获取当前行的数据
   */
  getCurrentRecord () {
    return this.rowOpts.isCurrent || this.highlightCurrentRow ? this.currentRow : null
  },
  /**
   * 用于单选行，获取当已选中的数据
   */
  getRadioRecord (isFull?: boolean) {
    const { selectRadioRow, fullDataRowIdData, afterFullRowMaps } = this
    if (selectRadioRow) {
      const rowid = getRowid(this, selectRadioRow)
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
  /**
   * 行 hover 事件
   */
  triggerHoverEvent (evnt: any, { row }: any) {
    this.setHoverRow(row)
  },
  setHoverRow (row: any) {
    const { $el } = this
    const rowid = getRowid(this, row)
    this.clearHoverRow()
    if ($el) {
      XEUtils.arrayEach($el.querySelectorAll(`[rowid="${rowid}"]`), elem => addClass(elem, 'row--hover'))
    }
    this.hoverRow = row
  },
  clearHoverRow () {
    const { $el } = this
    if ($el) {
      XEUtils.arrayEach($el.querySelectorAll('.vxe-body--row.row--hover'), elem => removeClass(elem, 'row--hover'))
    }
    this.hoverRow = null
  },
  triggerHeaderCellClickEvent (evnt: MouseEvent, params: VxeTableDefines.CellRenderHeaderParams) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const { _lastResizeTime } = internalData
    const sortOpts = $xeTable.computeSortOpts
    const columnOpts = $xeTable.computeColumnOpts
    const { column } = params
    const cell = evnt.currentTarget
    const triggerResizable = _lastResizeTime && _lastResizeTime > Date.now() - 300
    const triggerSort = getEventTargetNode(evnt, cell, 'vxe-cell--sort').flag
    const triggerFilter = getEventTargetNode(evnt, cell, 'vxe-cell--filter').flag
    if (sortOpts.trigger === 'cell' && !(triggerResizable || triggerSort || triggerFilter)) {
      $xeTable.triggerSortEvent(evnt, column, getNextSortOrder($xeTable, column))
    }
    $xeTable.dispatchEvent('header-cell-click', Object.assign({ triggerResizable, triggerSort, triggerFilter, cell }, params), evnt)
    if (columnOpts.isCurrent || $xeTable.highlightCurrentColumn) {
      $xeTable.triggerCurrentColumnEvent(evnt, params)
    }
    return $xeTable.$nextTick()
  },
  triggerHeaderCellDblclickEvent (evnt: any, params: any) {
    this.emitEvent('header-cell-dblclick', Object.assign({ cell: evnt.currentTarget }, params), evnt)
  },
  getCurrentColumn () {
    return this.columnOpts.isCurrent || this.highlightCurrentColumn ? this.currentColumn : null
  },
  /**
   * 用于当前列，设置某列行为高亮状态
   * @param {ColumnInfo} fieldOrColumn 列配置
   */
  setCurrentColumn (fieldOrColumn: any) {
    const column = handleFieldOrColumn(this, fieldOrColumn)
    if (column) {
      // this.clearCurrentRow()
      this.clearCurrentColumn()
      this.currentColumn = column
    }
    return this.$nextTick()
  },
  /**
   * 用于当前列，手动清空当前高亮的状态
   */
  clearCurrentColumn () {
    this.currentColumn = null
    return this.$nextTick()
  },
  checkValidate (type: any) {
    if (this.triggerValidate) {
      return this.triggerValidate(type)
    }
    return this.$nextTick()
  },
  /**
   * 当单元格发生改变时
   * 如果存在规则，则校验
   */
  handleChangeCell (evnt: Event, params: any) {
    this.checkValidate('blur')
      .catch((e: any) => e)
      .then(() => {
        this.handleEdit(params, evnt)
          .then(() => this.checkValidate('change'))
          .catch((e: any) => e)
      })
  },
  /**
   * 列点击事件
   * 如果是单击模式，则激活为编辑状态
   * 如果是双击模式，则单击后选中状态
   */
  triggerCellClickEvent (evnt: MouseEvent, params: VxeTableDefines.CellRenderBodyParams) {
    const $xeTable = this
    const props = $xeTable
    const reactData = $xeTable

    const { highlightCurrentRow, editConfig } = props
    const { editStore, isDragResize } = reactData
    if (isDragResize) {
      return
    }
    const expandOpts = $xeTable.computeExpandOpts
    const editOpts = $xeTable.computeEditOpts
    const treeOpts = $xeTable.computeTreeOpts
    const radioOpts = $xeTable.computeRadioOpts
    const checkboxOpts = $xeTable.computeCheckboxOpts
    const keyboardOpts = $xeTable.computeKeyboardOpts
    const rowOpts = $xeTable.computeRowOpts
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
        this.triggerRowExpandEvent(evnt, params)
      }
      // 如果是树形表格
      if ((treeOpts.trigger === 'row' || (treeNode && treeOpts.trigger === 'cell'))) {
        this.triggerTreeExpandEvent(evnt, params)
      }
    }
    // 如果点击了树节点
    if (!triggerTreeNode) {
      if (!triggerExpandNode) {
        // 如果是高亮行
        if (rowOpts.isCurrent || highlightCurrentRow) {
          if (!triggerCheckbox && !triggerRadio) {
            this.triggerCurrentRowEvent(evnt, params)
          }
        }
        // 如果是单选框
        if (!triggerRadio && (radioOpts.trigger === 'row' || (isRadioType && radioOpts.trigger === 'cell'))) {
          this.triggerRadioRowEvent(evnt, params)
        }
        // 如果是复选框
        if (!triggerCheckbox && (checkboxOpts.trigger === 'row' || (isCheckboxType && checkboxOpts.trigger === 'cell'))) {
          this.handleToggleCheckRowEvent(evnt, params)
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
            this.handleChangeCell(evnt, params)
          }
        } else if (!actived.args || row !== actived.row || column !== actived.column) {
          if (editOpts.trigger === 'click') {
            this.handleChangeCell(evnt, params)
          } else if (editOpts.trigger === 'dblclick') {
            if (editOpts.mode === 'row' && actived.row === row) {
              this.handleChangeCell(evnt, params)
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
    this.emitEvent('cell-click', params, evnt)
  },
  /**
   * 列双击点击事件
   * 如果是双击模式，则激活为编辑状态
   */
  triggerCellDblclickEvent (evnt: MouseEvent, params: VxeTableDefines.CellRenderBodyParams) {
    const $xeTable = this
    const props = $xeTable
    const reactData = $xeTable

    const { editConfig } = props
    const { editStore, isDragResize } = reactData
    if (isDragResize) {
      return
    }
    const editOpts = $xeTable.computeEditOpts
    const { actived } = editStore
    const cell = evnt.currentTarget as HTMLDivElement
    params = Object.assign({ cell }, params)
    if (isEnableConf(editConfig) && editOpts.trigger === 'dblclick') {
      if (!actived.args || evnt.currentTarget !== actived.args.cell) {
        if (editOpts.mode === 'row') {
          this.checkValidate('blur')
            .catch((e: any) => e)
            .then(() => {
              this.handleEdit(params, evnt)
                .then(() => this.checkValidate('change'))
                .catch((e: any) => e)
            })
        } else if (editOpts.mode === 'cell') {
          this.handleEdit(params, evnt)
            .then(() => this.checkValidate('change'))
            .catch((e: any) => e)
        }
      }
    }
    this.emitEvent('cell-dblclick', params, evnt)
  },
  handleDefaultSort () {
    const $xeTable = this

    const { sortConfig, sortOpts } = this
    let { defaultSort } = sortOpts
    if (defaultSort) {
      if (!XEUtils.isArray(defaultSort)) {
        defaultSort = [defaultSort]
      }
      if (defaultSort.length) {
        (sortConfig.multiple ? defaultSort : defaultSort.slice(0, 1)).forEach((item: any, index: any) => {
          const { field, order } = item
          if (field && order) {
            const column = this.getColumnByField(field)
            if (column && column.sortable) {
              column.order = order
              column.sortTime = Date.now() + index
            }
          }
        })
        if (!sortOpts.remote) {
          this.handleTableData(true).then(() => updateStyle($xeTable))
        }
      }
    }
  },
  handleColumnSortEvent (evnt: any, column: any) {
    const $xeTable = this
    const props = $xeTable

    const { mouseConfig } = props
    const mouseOpts = $xeTable.computeMouseOpts
    const { field, sortable } = column
    if (sortable) {
      const params = { $table: $xeTable, $event: evnt, column, field, property: field, order: column.order, sortList: $xeTable.getSortColumns(), sortTime: column.sortTime }
      if (mouseConfig && mouseOpts.area && $xeTable.handleSortEvent) {
        $xeTable.handleSortEvent(evnt, params)
      }
      $xeTable.dispatchEvent('sort-change', params, evnt)
    }
  },
  /**
   * 点击排序事件
   */
  triggerSortEvent (evnt: Event, column: VxeTableDefines.ColumnInfo, order: VxeTablePropTypes.SortOrder) {
    const $xeTable = this

    const sortOpts = $xeTable.computeSortOpts
    const { multiple, allowClear } = sortOpts
    const { field, sortable } = column
    if (sortable || (column as any).remoteSort) {
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
  handleCellRuleUpdateStatus (type: 'change' | 'blur', cellParams: {
    row: any
    column: VxeTableDefines.ColumnInfo
  }, cellValue?: any) {
    const $xeTable = this
    const reactData = $xeTable as unknown as TableReactData

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
    return $xeTable.$nextTick()
  },
  /**
   * 表头单元格按下事件
   */
  triggerHeaderCellMousedownEvent (evnt: any, params: any) {
    const $xeTable = this
    const props = $xeTable

    const { mouseConfig } = props
    const mouseOpts = $xeTable.computeMouseOpts
    const columnOpts = $xeTable.computeColumnOpts
    const columnDragOpts = $xeTable.computeColumnDragOpts
    const { trigger, isCrossDrag, isPeerDrag, disabledMethod } = columnDragOpts
    const cell = evnt.currentTarget
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
  triggerCellMousedownEvent (evnt: any, params: any) {
    const $xeTable = this

    const { column } = params
    const { type, treeNode } = column
    const isRadioType = type === 'radio'
    const isCheckboxType = type === 'checkbox'
    const isExpandType = type === 'expand'
    const rowOpts = $xeTable.computeRowOpts
    const rowDragOpts = $xeTable.computeRowDragOpts
    const { trigger, isCrossDrag, isPeerDrag, disabledMethod } = rowDragOpts
    const cell = evnt.currentTarget
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
    const $xeTable = this

    clearDragStatus($xeTable)
  },
  /**
   * 行拖拽
   */
  handleRowDragDragstartEvent (evnt: DragEvent) {
    if (evnt.dataTransfer) {
      evnt.dataTransfer.setDragImage(getTpImg(), 0, 0)
    }
  },
  handleRowDragSwapEvent (evnt: DragEvent, isSyncRow: boolean | undefined, dragRow: any, prevDragRow: any, prevDragPos: '' | 'top' | 'bottom' | 'left' | 'right' | undefined, prevDragToChild: boolean | undefined) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { treeConfig, dragConfig } = props
    const rowDragOpts = $xeTable.computeRowDragOpts
    const { fullAllDataRowIdData } = internalData
    const { isPeerDrag, isCrossDrag, isSelfToChildDrag, dragEndMethod, dragToChildMethod } = rowDragOpts
    const treeOpts = $xeTable.computeTreeOpts
    const { transform, rowField, mapChildrenField, parentField } = treeOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    const { afterFullData, tableFullData } = internalData
    const dEndMethod = dragEndMethod || (dragConfig ? dragConfig.dragEndMethod : null)
    const dragOffsetIndex = prevDragPos === 'bottom' ? 1 : 0
    if (prevDragRow && dragRow) {
      // 判断是否有拖动
      if (prevDragRow !== dragRow) {
        const dragParams = {
          oldRow: dragRow,
          newRow: prevDragRow,
          dragPos: prevDragPos as 'top' | 'bottom',
          dragToChild: !!prevDragToChild,
          offsetIndex: dragOffsetIndex as 0 | 1
        }
        const isDragToChildFlag = isSelfToChildDrag && dragToChildMethod ? dragToChildMethod(dragParams) : prevDragToChild
        return Promise.resolve(dEndMethod ? dEndMethod(dragParams) : true).then((status) => {
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

          reactData.isDragRowMove = true
          $xeTable.handleTableData(treeConfig && transform)
          $xeTable.cacheRowMap(false)
          updateScrollYStatus($xeTable)
          if (!(treeConfig && transform)) {
            updateAfterDataIndex($xeTable)
          }
          $xeTable.checkSelectionStatus()
          if (reactData.scrollYLoad) {
            $xeTable.updateScrollYSpace()
          }
          $xeTable.$nextTick().then(() => {
            $xeTable.updateCellAreas()
            $xeTable.recalculate()
          })

          $xeTable.dispatchEvent('row-dragend', {
            oldRow: dragRow,
            newRow: prevDragRow,
            dragPos: prevDragPos as any,
            dragToChild: isDragToChildFlag,
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
  handleRowDragDragendEvent (evnt: DragEvent) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { treeConfig } = props
    const { fullAllDataRowIdData, prevDragToChild } = internalData
    const { dragRow } = reactData
    const treeOpts = $xeTable.computeTreeOpts
    const { lazy } = treeOpts
    const hasChildField = treeOpts.hasChild || treeOpts.hasChildField
    const { prevDragRow, prevDragPos } = internalData

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
    hideDropTip($xeTable)
    clearRowDropOrigin($xeTable)
    internalData.prevDragToChild = false
    reactData.dragRow = null
    reactData.dragCol = null
    setTimeout(() => {
      reactData.isDragRowMove = false
    }, 500)
  },
  handleRowDragDragoverEvent (evnt: DragEvent) {
    const $xeTable = this
    const props = $xeTable
    const internalData = $xeTable
    const reactData = $xeTable

    const { treeConfig } = props
    const { fullAllDataRowIdData } = internalData
    const { dragRow } = reactData
    const treeOpts = $xeTable.computeTreeOpts
    const { lazy, transform, parentField } = treeOpts
    const hasChildField = treeOpts.hasChild || treeOpts.hasChildField
    const rowDragOpts = $xeTable.computeRowDragOpts
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
      internalData.prevDragToChild = !!(treeConfig && transform && isToChildDrag && hasCtrlKey)
      internalData.prevDragRow = row
      internalData.prevDragPos = dragPos
      if ($xeTable.eqRow(dragRow, row) ||
        (hasCtrlKey && treeConfig && lazy && row[hasChildField] && rowRest && !rowRest.treeLoaded) ||
        (!isCrossDrag && treeConfig && transform && (isPeerDrag ? dragRow[parentField] !== row[parentField] : rest.level))
      ) {
        showDropTip($xeTable, evnt, trEl, null, false, dragPos)
        return
      }
      showDropTip($xeTable, evnt, trEl, null, true, dragPos)
      $xeTable.dispatchEvent('row-dragover', {
        oldRow: dragRow,
        targetRow: row,
        dragPos
      }, evnt)
    }
  },
  handleCellDragMousedownEvent (evnt: MouseEvent, params: any) {
    const $xeTable = this
    const props = $xeTable
    const reactData = $xeTable

    evnt.stopPropagation()
    const { dragConfig } = props
    const rowDragOpts = $xeTable.computeRowDragOpts
    const { trigger, dragStartMethod } = rowDragOpts
    const { row } = params
    const dragEl = evnt.currentTarget as HTMLElement
    const tdEl = trigger === 'cell' || trigger === 'row' ? dragEl : dragEl.parentElement?.parentElement as HTMLElement
    const trEl = tdEl.parentElement as HTMLElement
    const dStartMethod = dragStartMethod || (dragConfig ? dragConfig.dragStartMethod : null)
    reactData.isDragRowMove = false
    clearRowDropOrigin($xeTable)
    if (dStartMethod && !dStartMethod(params)) {
      trEl.draggable = false
      reactData.dragRow = null
      reactData.dragCol = null
      hideDropTip($xeTable)
      return
    }
    reactData.dragRow = row
    reactData.dragCol = null
    trEl.draggable = true
    updateRowDropOrigin($xeTable, row)
    updateRowDropTipContent($xeTable, tdEl)
    $xeTable.dispatchEvent('row-dragstart', params, evnt)
  },
  handleCellDragMouseupEvent () {
    const $xeTable = this

    clearDragStatus($xeTable)
  },
  /**
   * 列拖拽
   */
  handleHeaderCellDragDragstartEvent (evnt: DragEvent) {
    if (evnt.dataTransfer) {
      evnt.dataTransfer.setDragImage(getTpImg(), 0, 0)
    }
  },
  handleColDragSwapColumn () {
    const $xeTable = this

    handleUpdateColumn($xeTable)
    parseColumns($xeTable, false).then(() => {
      $xeTable.updateCellAreas()
      $xeTable.saveCustomStore('update:sort')
    })
  },
  handleColDragSwapEvent (evnt: DragEvent, isSyncColumn: boolean | undefined, dragCol: VxeTableDefines.ColumnInfo | null | undefined, prevDragCol: VxeTableDefines.ColumnInfo | undefined, prevDragPos: '' | 'top' | 'bottom' | 'left' | 'right' | undefined, prevDragToChild: boolean | undefined) {
    const $xeTable = this
    const props = $xeTable
    const reactData = $xeTable
    const internalData = $xeTable

    const { mouseConfig } = props
    const columnDragOpts = $xeTable.computeColumnDragOpts
    const { isPeerDrag, isCrossDrag, isSelfToChildDrag, isToChildDrag, dragEndMethod, dragToChildMethod } = columnDragOpts
    const { collectColumn } = internalData
    const dragOffsetIndex = prevDragPos === 'right' ? 1 : 0
    if (prevDragCol && dragCol) {
      // 判断是否有拖动
      if (prevDragCol !== dragCol) {
        const oldColumn = dragCol
        const newColumn = prevDragCol
        const dragParams = {
          oldColumn,
          newColumn,
          dragPos: prevDragPos as 'left' | 'right',
          dragToChild: !!prevDragToChild,
          offsetIndex: dragOffsetIndex as 0 | 1
        }
        const isDragToChildFlag = isSelfToChildDrag && dragToChildMethod ? dragToChildMethod(dragParams) : prevDragToChild
        return Promise.resolve(dragEndMethod ? dragEndMethod(dragParams) : true).then((status) => {
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

          const oldewMatchRest = XEUtils.findTree(collectColumn as VxeTableDefines.ColumnInfo[], item => item.id === oldColumn.id)

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

          const newMatchRest = XEUtils.findTree(collectColumn as VxeTableDefines.ColumnInfo[], item => item.id === newColumn.id)
          if (newMatchRest) {
            const { items: nCols, index: nIndex, parent: nParent } = newMatchRest
            // 转子级
            if ((isCrossDrag && isToChildDrag) && isDragToChildFlag) {
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

          $xeTable.dispatchEvent('column-dragend', {
            oldColumn,
            newColumn,
            dragPos: prevDragPos,
            dragToChild: isDragToChildFlag,
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
  handleHeaderCellDragDragendEvent (evnt: DragEvent) {
    const $xeTable = this
    const reactData = $xeTable
    const internalData = $xeTable

    const { dragCol } = reactData
    const { prevDragCol, prevDragPos, prevDragToChild } = internalData
    $xeTable.handleColDragSwapEvent(evnt, true, dragCol, prevDragCol, prevDragPos, prevDragToChild)
    hideDropTip($xeTable)
    clearColDropOrigin($xeTable)
    internalData.prevDragToChild = false
    reactData.dragRow = null
    reactData.dragCol = null
    setTimeout(() => {
      reactData.isDragColMove = false
      $xeTable.recalculate().then(() => {
        loadScrollXData($xeTable)
      })
    }, 500)
  },
  handleHeaderCellDragDragoverEvent (evnt: DragEvent) {
    const $xeTable = this
    const reactData = $xeTable
    const internalData = $xeTable

    const { dragCol } = reactData
    const columnDragOpts = $xeTable.computeColumnDragOpts
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
        showDropTip($xeTable, evnt, null, thEl, false, dragPos)
        return
      }
      showDropTip($xeTable, evnt, null, thEl, true, dragPos)
      $xeTable.dispatchEvent('column-dragover', {
        oldColumn: dragCol,
        targetColumn: column,
        dragPos
      }, evnt)

      // 边缘滚动
      const el = $xeTable.$refs.refElem as HTMLElement
      if (!el) {
        return
      }
      const xHandleEl = $xeTable.$refs.refScrollXHandleElem as HTMLDivElement
      const refTableBody = $xeTable.$refs.refTableBody
      const tableBodyElem = refTableBody ? refTableBody.$el as HTMLDivElement : null
      const scrollTargetEl = xHandleEl || tableBodyElem
      if (scrollTargetEl) {
        const wrapperRect = el.getBoundingClientRect()
        const tableWidth = el.clientWidth
        const leftContainerElem = $xeTable.$refs.refLeftContainer as HTMLDivElement
        const leftContainerWidth = leftContainerElem ? leftContainerElem.clientWidth : 0
        const rightContainerElem = $xeTable.$refs.refRightContainer as HTMLDivElement
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
  handleHeaderCellDragMousedownEvent (evnt: MouseEvent, params: any) {
    const $xeTable = this
    const reactData = $xeTable

    evnt.stopPropagation()
    const columnDragOpts = $xeTable.computeColumnDragOpts
    const { trigger, dragStartMethod } = columnDragOpts
    const { column } = params
    const dragEl = evnt.currentTarget as HTMLElement
    const thEl = trigger === 'cell' ? dragEl : dragEl.parentElement?.parentElement as HTMLElement
    reactData.isDragColMove = false
    clearColDropOrigin($xeTable)
    if (dragStartMethod && !dragStartMethod(params)) {
      thEl.draggable = false
      reactData.dragRow = null
      reactData.dragCol = null
      hideDropTip($xeTable)
      return
    }
    reactData.dragCol = column
    reactData.dragRow = null
    thEl.draggable = true
    updateColDropOrigin($xeTable, column)
    updateColDropTipContent($xeTable, thEl)
    $xeTable.dispatchEvent('column-dragstart', params, evnt)
  },
  handleHeaderCellDragMouseupEvent () {
    const $xeTable = this
    const reactData = $xeTable

    clearColDropOrigin($xeTable)
    hideDropTip($xeTable)
    reactData.dragRow = null
    reactData.dragCol = null
    reactData.isDragColMove = false
  },
  setPendingRow (rows: any, status: any) {
    const $xeTable = this
    const reactData = $xeTable

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
    return $xeTable.$nextTick()
  },
  togglePendingRow (rows: any) {
    const $xeTable = this
    const reactData = $xeTable

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
    return $xeTable.$nextTick()
  },
  hasPendingByRow (row: any) {
    const $xeTable = this

    return $xeTable.isPendingByRow(row)
  },
  isPendingByRow (row: any) {
    const $xeTable = this
    const reactData = $xeTable

    const { pendingRowMaps } = reactData
    const rowid = getRowid($xeTable, row)
    return !!pendingRowMaps[rowid]
  },
  getPendingRecords () {
    const $xeTable = this
    const reactData = $xeTable
    const internalData = $xeTable

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
    this.pendingRowMaps = {}
    return this.$nextTick()
  },
  sort (sortConfs: any, sortOrder: any) {
    const $xeTable = this

    const { sortOpts } = this
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
      let firstSortColumn: any
      if (!multiple) {
        clearAllSort(this)
      }
      (multiple ? sortConfs : [sortConfs[0]]).forEach((confs: any, index: any) => {
        let { field, order } = confs
        let column = field
        if (XEUtils.isString(field)) {
          column = this.getColumnByField(field)
        }
        if (column && (column.sortable || column.remoteSort)) {
          if (!firstSortColumn) {
            firstSortColumn = column
          }
          if (orders.indexOf(order) === -1) {
            order = getNextSortOrder(this, column)
          }
          if (column.order !== order) {
            column.order = order
          }
          column.sortTime = Date.now() + index
        }
      })
      // 如果是服务端排序，则跳过本地排序处理
      if (!remote || (firstSortColumn && firstSortColumn.remoteSort)) {
        this.handleTableData(true)
      }
      return this.$nextTick().then(() => {
        this.updateCellAreas()
        return updateStyle($xeTable)
      })
    }
    return this.$nextTick()
  },
  setSort (sortConfs: VxeTableDefines.SortConfs | VxeTableDefines.SortConfs[], isUpdate?: boolean) {
    const $xeTable = this

    const sortOpts = $xeTable.computeSortOpts
    const { multiple, remote, orders } = sortOpts
    if (!XEUtils.isArray(sortConfs)) {
      sortConfs = [sortConfs]
    }
    if (sortConfs && sortConfs.length) {
      if (!multiple) {
        sortConfs = [sortConfs[0]]
        clearAllSort($xeTable)
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
          if (orders.indexOf(order) === -1) {
            order = getNextSortOrder($xeTable, column)
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
        $xeTable.handleColumnSortEvent(new Event('click'), firstColumn)
      }
      return $xeTable.$nextTick().then(() => {
        $xeTable.updateCellAreas()
        return updateStyle($xeTable)
      })
    }
    return $xeTable.$nextTick()
  },
  /**
   * 清空指定列的排序条件
   * 如果为空则清空所有列的排序条件
   * @param {String} column 列或字段名
   */
  clearSort (fieldOrColumn: any) {
    const $xeTable = this

    const { sortOpts } = this
    if (fieldOrColumn) {
      const column = handleFieldOrColumn(this, fieldOrColumn)
      if (column) {
        column.order = null
      }
    } else {
      clearAllSort(this)
    }
    if (!sortOpts.remote) {
      this.handleTableData(true)
    }
    return this.$nextTick().then(() => updateStyle($xeTable))
  },
  // 在 v3 中废弃
  getSortColumn () {
    if (process.env.VUE_APP_VXE_ENV === 'development') {
      warnLog('vxe.error.delFunc', ['getSortColumn', 'getSortColumns'])
    }
    return XEUtils.find(this.tableFullColumn, column => (column.sortable || column.remoteSort) && column.order)
  },
  isSort (fieldOrColumn: any) {
    if (fieldOrColumn) {
      const column = handleFieldOrColumn(this, fieldOrColumn)
      return column && column.sortable && !!column.order
    }
    return this.getSortColumns().length > 0
  },
  getSortColumns () {
    const { multiple, chronological } = this.sortOpts
    const sortList: any[] = []
    this.tableFullColumn.forEach((column: any) => {
      const { field, order } = column
      if ((column.sortable || column.remoteSort) && order) {
        sortList.push({ column, field, property: field, order, sortTime: column.sortTime })
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
    const { filterStore } = this
    const { column, visible } = filterStore
    Object.assign(filterStore, {
      isAllSelected: false,
      isIndeterminate: false,
      options: [],
      visible: false
    })
    if (visible) {
      this.emitEvent('filter-visible', { column, field: column.field, property: column.field, filterList: this.getCheckedFilters(), visible: false }, null)
    }
    return this.$nextTick()
  },
  /**
   * 判断指定列是否为筛选状态，如果为空则判断所有列
   * @param {String} fieldOrColumn 字段名
   */
  isActiveFilterByColumn (fieldOrColumn: any) {
    const column = handleFieldOrColumn(this, fieldOrColumn)
    if (column) {
      return column.filters && column.filters.some((option: any) => option.checked)
    }
    return this.getCheckedFilters().length > 0
  },
  // 已废弃
  isFilter (fieldOrColumn: any) {
    return this.isActiveFilterByColumn(fieldOrColumn)
  },
  /**
   * 判断展开行是否懒加载完成
   * @param {Row} row 行对象
   */
  isRowExpandLoaded (row: any) {
    const $xeTable = this

    const { fullAllDataRowIdData } = this
    const rowRest = fullAllDataRowIdData[getRowid($xeTable, row)]
    return rowRest && !!rowRest.expandLoaded
  },
  clearRowExpandLoaded (row: any) {
    const $xeTable = this as VxeTableConstructor
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const rExpandLazyLoadedMaps = { ...reactData.rowExpandLazyLoadedMaps }
    const { fullAllDataRowIdData } = internalData
    const expandOpts = $xeTable.computeExpandOpts
    const { lazy } = expandOpts
    const rowid = getRowid($xeTable, row)
    const rowRest = fullAllDataRowIdData[rowid]
    if (lazy && rowRest) {
      rowRest.expandLoaded = false
      delete rExpandLazyLoadedMaps[rowid]
    }
    reactData.rowExpandLazyLoadedMaps = rExpandLazyLoadedMaps
    return $xeTable.$nextTick()
  },
  /**
   * 重新懒加载展开行，并展开内容
   * @param {Row} row 行对象
   */
  reloadRowExpand (row: any) {
    const { expandOpts, rowExpandLazyLoadedMaps } = this
    const { lazy } = expandOpts
    const rowid = getRowid(this, row)
    if (lazy && !rowExpandLazyLoadedMaps[rowid]) {
      this.clearRowExpandLoaded(row)
        .then(() => this.handleAsyncRowExpand(row))
    }
    return this.$nextTick()
  },
  reloadExpandContent (row: any) {
    if (process.env.VUE_APP_VXE_ENV === 'development') {
      warnLog('vxe.error.delFunc', ['reloadExpandContent', 'reloadRowExpand'])
    }
    // 即将废弃
    return this.reloadRowExpand(row)
  },
  /**
   * 展开行事件
   */
  triggerRowExpandEvent (evnt: any, params: any) {
    const { expandOpts, rowExpandLazyLoadedMaps, expandColumn: column } = this
    const { row } = params
    const { lazy, trigger } = expandOpts
    if (trigger === 'manual') {
      return
    }
    evnt.stopPropagation()
    const rowid = getRowid(this, row)
    if (!lazy || !rowExpandLazyLoadedMaps[rowid]) {
      const expanded = !this.isRowExpandByRow(row)
      const columnIndex = this.getColumnIndex(column)
      const $columnIndex = this.getVMColumnIndex(column)
      this.setRowExpand(row, expanded)
      this.emitEvent('toggle-row-expand', { expanded, column, columnIndex, $columnIndex, row, rowIndex: this.getRowIndex(row), $rowIndex: this.getVMRowIndex(row) }, evnt)
    }
  },
  /**
   * 切换展开行
   */
  toggleRowExpand (row: any) {
    return this.setRowExpand(row, !this.isRowExpandByRow(row))
  },
  /**
   * 处理默认展开行
   */
  handleDefaultRowExpand () {
    const { expandOpts, fullDataRowIdData } = this
    const { expandAll, expandRowKeys } = expandOpts
    if (expandAll) {
      this.setAllRowExpand(true)
    } else if (expandRowKeys) {
      const defExpandeds: any[] = []
      expandRowKeys.forEach((rowid: any) => {
        if (fullDataRowIdData[rowid]) {
          defExpandeds.push(fullDataRowIdData[rowid].row)
        }
      })
      this.setRowExpand(defExpandeds, true)
    }
  },
  /**
   * 设置所有行的展开与否
   * @param {Boolean} expanded 是否展开
   */
  setAllRowExpand (expanded: any) {
    const { treeConfig, treeOpts, tableFullData, tableFullTreeData } = this
    const childrenField = treeOpts.children || treeOpts.childrenField
    let expandedRows = []
    if (treeConfig) {
      XEUtils.eachTree(tableFullTreeData, (row) => {
        expandedRows.push(row)
      }, { children: childrenField })
    } else {
      expandedRows = tableFullData
    }
    return this.setRowExpand(expandedRows, expanded)
  },
  handleAsyncRowExpand (row: any) {
    const $xeTable = this
    const reactData = $xeTable as TableReactData
    const internalData = $xeTable as TableInternalData

    return new Promise<void>(resolve => {
      const { expandOpts } = this
      const { loadMethod } = expandOpts
      if (loadMethod) {
        const { fullAllDataRowIdData } = internalData
        const rExpandLazyLoadedMaps = { ...reactData.rowExpandLazyLoadedMaps }
        const rowid = getRowid($xeTable, row)
        const rowRest = fullAllDataRowIdData[rowid]
        rExpandLazyLoadedMaps[rowid] = row
        reactData.rowExpandLazyLoadedMaps = rExpandLazyLoadedMaps
        loadMethod({ $table: $xeTable, row, rowIndex: $xeTable.getRowIndex(row), $rowIndex: $xeTable.getVMRowIndex(row) }).then(() => {
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
          $xeTable.$nextTick().then(() => $xeTable.recalculate()).then(() => resolve())
        })
      } else {
        resolve()
      }
    })
  },
  /**
   * 设置展开行，二个参数设置这一行展开与否
   * 支持单行
   * 支持多行
   * @param {Array/Row} rows 行数据
   * @param {Boolean} expanded 是否展开
   */
  setRowExpand (rows: any, expanded: any) {
    const { rowExpandedMaps, fullAllDataRowIdData, rowExpandLazyLoadedMaps, expandOpts, expandColumn: column } = this
    let rExpandedMaps = { ...rowExpandedMaps }
    const { reserve, lazy, accordion, toggleMethod } = expandOpts
    const lazyRests: any[] = []
    const columnIndex = this.getColumnIndex(column)
    const $columnIndex = this.getVMColumnIndex(column)
    if (rows) {
      if (!XEUtils.isArray(rows)) {
        rows = [rows]
      }
      if (accordion) {
        // 只能同时展开一个
        rExpandedMaps = {}
        rows = rows.slice(rows.length - 1, rows.length)
      }
      const validRows = toggleMethod ? rows.filter((row: any) => toggleMethod({ expanded, column, columnIndex, $columnIndex, row, rowIndex: this.getRowIndex(row), $rowIndex: this.getVMRowIndex(row) })) : rows
      if (expanded) {
        validRows.forEach((row: any) => {
          const rowid = getRowid(this, row)
          if (!rExpandedMaps[rowid]) {
            const rowRest = fullAllDataRowIdData[rowid]
            const isLoad = lazy && !rowRest.expandLoaded && !rowExpandLazyLoadedMaps[rowid]
            if (isLoad) {
              lazyRests.push(this.handleAsyncRowExpand(row))
            } else {
              rExpandedMaps[rowid] = row
            }
          }
        })
      } else {
        validRows.forEach((item: any) => {
          const rowid = getRowid(this, item)
          if (rExpandedMaps[rowid]) {
            delete rExpandedMaps[rowid]
          }
        })
      }
      if (reserve) {
        validRows.forEach((row: any) => this.handleRowExpandReserve(row, expanded))
      }
    }
    this.rowExpandedMaps = rExpandedMaps
    return Promise.all(lazyRests).then(this.recalculate)
  },
  /**
   * 判断行是否为展开状态
   * @param {Row} row 行对象
   */
  isRowExpandByRow (row: any) {
    const { rowExpandedMaps } = this
    const rowid = getRowid(this, row)
    return !!rowExpandedMaps[rowid]
  },
  isExpandByRow (row: any) {
    if (process.env.VUE_APP_VXE_ENV === 'development') {
      warnLog('vxe.error.delFunc', ['isExpandByRow', 'isRowExpandByRow'])
    }
    // 即将废弃
    return this.isRowExpandByRow(row)
  },
  /**
   * 手动清空展开行状态，数据会恢复成未展开的状态
   */
  clearRowExpand () {
    const { expandOpts, tableFullData } = this
    const { reserve } = expandOpts
    const expList = this.getRowExpandRecords()
    this.rowExpandedMaps = {}
    if (reserve) {
      tableFullData.forEach((row: any) => this.handleRowExpandReserve(row, false))
    }
    return this.$nextTick().then(() => {
      if (expList.length) {
        this.recalculate()
      }
    })
  },
  clearRowExpandReserve () {
    this.rowExpandedReserveRowMap = {}
    return this.$nextTick()
  },
  handleRowExpandReserve (row: any, expanded: any) {
    const { rowExpandedReserveRowMap, expandOpts } = this
    if (expandOpts.reserve) {
      const rowid = getRowid(this, row)
      if (expanded) {
        rowExpandedReserveRowMap[rowid] = row
      } else if (rowExpandedReserveRowMap[rowid]) {
        delete rowExpandedReserveRowMap[rowid]
      }
    }
  },
  getRowExpandRecords () {
    const rest: any[] = []
    XEUtils.each(this.rowExpandedMaps, item => {
      if (item) {
        rest.push(item)
      }
    })
    return rest
  },
  getTreeExpandRecords () {
    const rest: any[] = []
    XEUtils.each(this.treeExpandedMaps, item => {
      if (item) {
        rest.push(item)
      }
    })
    return rest
  },
  /**
   * 获取树表格状态
   */
  getTreeStatus () {
    if (this.treeConfig) {
      return {
        config: this.treeOpts,
        rowExpandeds: this.getTreeExpandRecords()
      }
    }
    return null
  },
  /**
   * 判断树节点是否懒加载完成
   * @param {Row} row 行对象
   */
  isTreeExpandLoaded (row: any) {
    const $xeTable = this

    const { fullAllDataRowIdData } = this
    const rowRest = fullAllDataRowIdData[getRowid($xeTable, row)]
    return rowRest && !!rowRest.treeLoaded
  },
  clearTreeExpandLoaded (rows: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const tExpandedMaps = { ...reactData.treeExpandedMaps }
    const { fullAllDataRowIdData } = internalData
    const treeOpts = $xeTable.computeTreeOpts
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
      handleVirtualTreeToList($xeTable)
      return $xeTable.handleTableData()
    }
    return $xeTable.$nextTick()
  },
  /**
   * 重新懒加载树节点，并展开该节点
   * @param {Row} row 行对象
   */
  reloadTreeExpand (row: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    const { treeOpts, treeExpandLazyLoadedMaps } = this
    const { transform, lazy } = treeOpts
    const hasChildField = treeOpts.hasChild || treeOpts.hasChildField
    const rowid = getRowid(this, row)
    if (lazy && row[hasChildField] && !treeExpandLazyLoadedMaps[rowid]) {
      return this.clearTreeExpandLoaded(row).then(() => {
        return this.handleAsyncTreeExpandChilds(row)
      }).then(() => {
        if (transform) {
          handleVirtualTreeToList($xeTable)
          return this.handleTableData()
        }
      }).then(() => {
        return this.recalculate()
      })
    }
    return this.$nextTick()
  },
  reloadTreeChilds (row: any) {
    if (process.env.VUE_APP_VXE_ENV === 'development') {
      warnLog('vxe.error.delFunc', ['reloadTreeChilds', 'reloadTreeExpand'])
    }
    // 即将废弃
    return this.reloadTreeExpand(row)
  },
  /**
   * 展开树节点事件
   */
  triggerTreeExpandEvent (evnt: any, params: any) {
    const { treeOpts, treeExpandLazyLoadedMaps } = this
    const { row, column } = params
    const { lazy, trigger } = treeOpts
    if (trigger === 'manual') {
      return
    }
    evnt.stopPropagation()
    const rowid = getRowid(this, row)
    if (!lazy || !treeExpandLazyLoadedMaps[rowid]) {
      const expanded = !this.isTreeExpandByRow(row)
      const columnIndex = this.getColumnIndex(column)
      const $columnIndex = this.getVMColumnIndex(column)
      this.setTreeExpand(row, expanded)
      this.emitEvent('toggle-tree-expand', { expanded, column, columnIndex, $columnIndex, row }, evnt)
    }
  },
  /**
   * 切换/展开树节点
   */
  toggleTreeExpand (row: any) {
    return this.setTreeExpand(row, !this.isTreeExpandByRow(row))
  },
  /**
   * 处理默认展开树节点
   */
  handleDefaultTreeExpand () {
    const { treeConfig, treeOpts, tableFullData } = this
    if (treeConfig) {
      const { expandAll, expandRowKeys } = treeOpts
      const childrenField = treeOpts.children || treeOpts.childrenField
      if (expandAll) {
        this.setAllTreeExpand(true)
      } else if (expandRowKeys) {
        const defExpandeds: any[] = []
        const rowkey = getRowkey(this)
        expandRowKeys.forEach((rowid: any) => {
          const matchObj = XEUtils.findTree(tableFullData, item => rowid === XEUtils.get(item, rowkey), { children: childrenField })
          if (matchObj) {
            defExpandeds.push(matchObj.item)
          }
        })
        this.setTreeExpand(defExpandeds, true)
      }
    }
  },
  handleAsyncTreeExpandChilds (row: any) {
    const $xeTable = this

    const { treeOpts, checkboxOpts } = this
    const { transform, loadMethod } = treeOpts
    const { checkStrictly } = checkboxOpts
    return new Promise<void>(resolve => {
      if (loadMethod) {
        const { treeExpandLazyLoadedMaps, fullAllDataRowIdData } = this
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
            return this.loadTreeChildren(row, childRecords).then((childRows: any[]) => {
              const { treeExpandedMaps } = this
              if (childRows.length && !treeExpandedMaps[rowid]) {
                treeExpandedMaps[rowid] = row
              }
              // 如果当前节点已选中，则展开后子节点也被选中
              if (!checkStrictly && this.isCheckedByCheckboxRow(row)) {
                this.handleCheckedCheckboxRow(childRows, true)
              }
              return this.$nextTick().then(() => {
                if (transform) {
                  this.handleTableData()
                  updateAfterDataIndex($xeTable)
                  return this.$nextTick()
                }
              })
            })
          }
        }).catch(() => {
          const { treeExpandLazyLoadedMaps } = this
          if (rowRest) {
            rowRest.treeLoaded = false
          }
          if (treeExpandLazyLoadedMaps[rowid]) {
            delete treeExpandLazyLoadedMaps[rowid]
          }
        }).finally(() => {
          this.$nextTick().then(() => this.recalculate()).then(() => resolve())
        })
      } else {
        resolve()
      }
    })
  },
  /**
   * 设置所有树节点的展开与否
   * @param {Boolean} expanded 是否展开
   */
  setAllTreeExpand (expanded: any) {
    const { tableFullData, treeOpts } = this
    const { lazy } = treeOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    const expandeds: any[] = []
    XEUtils.eachTree(tableFullData, (row: any) => {
      const rowChildren = row[childrenField]
      if (lazy || (rowChildren && rowChildren.length)) {
        expandeds.push(row)
      }
    }, { children: childrenField })
    return this.setTreeExpand(expandeds, expanded)
  },
  /**
   * 默认，展开与收起树节点
   * @param rows
   * @param expanded
   * @returns
   */
  handleBaseTreeExpand (rows: any, expanded: any) {
    const { fullAllDataRowIdData, tableFullData, treeExpandedMaps, treeOpts, treeExpandLazyLoadedMaps, treeNodeColumn } = this
    const { reserve, lazy, accordion, toggleMethod } = treeOpts
    const treeTempExpandedMaps = { ...treeExpandedMaps }
    const childrenField = treeOpts.children || treeOpts.childrenField
    const hasChildField = treeOpts.hasChild || treeOpts.hasChildField
    const result: any[] = []
    const columnIndex = this.getColumnIndex(treeNodeColumn)
    const $columnIndex = this.getVMColumnIndex(treeNodeColumn)
    let validRows = toggleMethod ? rows.filter((row: any) => toggleMethod({ expanded, column: treeNodeColumn, columnIndex, $columnIndex, row })) : rows
    if (accordion) {
      validRows = validRows.length ? [validRows[validRows.length - 1]] : []
      // 同一级只能展开一个
      const matchObj = XEUtils.findTree(tableFullData, item => item === validRows[0], { children: childrenField })
      if (matchObj) {
        matchObj.items.forEach(item => {
          const rowid = getRowid(this, item)
          if (treeTempExpandedMaps[rowid]) {
            delete treeTempExpandedMaps[rowid]
          }
        })
      }
    }
    if (expanded) {
      validRows.forEach((row: any) => {
        const rowid = getRowid(this, row)
        if (!treeTempExpandedMaps[rowid]) {
          const rowRest = fullAllDataRowIdData[rowid]
          if (rowRest) {
            const isLoad = lazy && row[hasChildField] && !rowRest.treeLoaded && !treeExpandLazyLoadedMaps[rowid]
            // 是否使用懒加载
            if (isLoad) {
              result.push(this.handleAsyncTreeExpandChilds(row))
            } else {
              if (row[childrenField] && row[childrenField].length) {
                treeTempExpandedMaps[rowid] = row
              }
            }
          }
        }
      })
    } else {
      validRows.forEach((item: any) => {
        const rowid = getRowid(this, item)
        if (treeTempExpandedMaps[rowid]) {
          delete treeTempExpandedMaps[rowid]
        }
      })
    }
    if (reserve) {
      validRows.forEach((row: any) => this.handleTreeExpandReserve(row, expanded))
    }
    this.treeExpandedMaps = treeTempExpandedMaps
    return Promise.all(result).then(() => {
      return this.recalculate()
    })
  },
  /**
   * 虚拟树的展开与收起
   * @param rows
   * @param expanded
   * @returns
   */
  handleVirtualTreeExpand (rows: any[], expanded: boolean) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    return this.handleBaseTreeExpand(rows, expanded).then(() => {
      handleVirtualTreeToList($xeTable)
      this.handleTableData()
      updateAfterDataIndex($xeTable)
    }).then(() => {
      return this.recalculate()
    }).then(() => {
      setTimeout(() => {
        this.updateCellAreas()
      }, 30)
    })
  },
  /**
   * 设置展开树形节点，二个参数设置这一行展开与否
   * 支持单行
   * 支持多行
   * @param {Array/Row} rows 行数据
   * @param {Boolean} expanded 是否展开
   */
  setTreeExpand (rows: any | any[], expanded: boolean) {
    const { treeOpts } = this
    const { transform } = treeOpts
    if (rows) {
      if (!XEUtils.isArray(rows)) {
        rows = [rows]
      }
      if (rows.length) {
        // 如果为虚拟树
        if (transform) {
          return this.handleVirtualTreeExpand(rows, expanded)
        } else {
          return this.handleBaseTreeExpand(rows, expanded)
        }
      }
    }
    return this.$nextTick()
  },
  /**
   * 判断行是否为树形节点展开状态
   * @param {Row} row 行对象
   */
  isTreeExpandByRow (row: any) {
    const { treeExpandedMaps } = this
    return !!treeExpandedMaps[getRowid(this, row)]
  },
  /**
   * 手动清空树形节点的展开状态，数据会恢复成未展开的状态
   */
  clearTreeExpand () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

    const { treeOpts, tableFullData } = this
    const { transform, reserve } = treeOpts
    const childrenField = treeOpts.children || treeOpts.childrenField
    const expList = this.getTreeExpandRecords()
    this.treeExpandedMaps = {}
    if (reserve) {
      XEUtils.eachTree(tableFullData, row => this.handleTreeExpandReserve(row, false), { children: childrenField })
    }
    return this.handleTableData().then(() => {
      if (transform) {
        handleVirtualTreeToList($xeTable)
        return this.handleTableData()
      }
    }).then(() => {
      if (expList.length) {
        this.recalculate()
      }
    })
  },
  clearTreeExpandReserve () {
    this.treeExpandedReserveRowMap = {}
    return this.$nextTick()
  },
  handleTreeExpandReserve (row: any, expanded: any) {
    const { treeExpandedReserveRowMap, treeOpts } = this
    if (treeOpts.reserve) {
      const rowid = getRowid(this, row)
      if (expanded) {
        treeExpandedReserveRowMap[rowid] = row
      } else if (treeExpandedReserveRowMap[rowid]) {
        delete treeExpandedReserveRowMap[rowid]
      }
    }
  },
  /**
   * 获取表格的滚动状态
   */
  getScroll () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

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
  handleScrollEvent (evnt: Event, isRollY: boolean, isRollX: boolean, scrollTop: number, scrollLeft: number, params: any) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const props = $xeTable
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { highlightHoverRow } = props
    const { lastScrollLeft, lastScrollTop } = internalData
    const xHandleEl = $xeTable.$refs.refScrollXHandleElem as HTMLDivElement
    const yHandleEl = $xeTable.$refs.refScrollYHandleElem as HTMLDivElement
    if (!xHandleEl || !yHandleEl) {
      return
    }
    const rowOpts = $xeTable.computeRowOpts
    const validTip = $xeTable.$refs.refValidTooltip as VxeTooltipInstance
    const tooltip = $xeTable.$refs.refTooltip as VxeTooltipInstance
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
      const xThreshold = $xeTable.computeScrollXThreshold
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
      const yThreshold = $xeTable.computeScrollYThreshold
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
    checkLastSyncScroll($xeTable, isRollX, isRollY)
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
      $xeTable.dispatchEvent('scroll-boundary', evntParams, evnt)
    }
    $xeTable.dispatchEvent('scroll', evntParams, evnt)
  },
  /**
   * 横向 X 可视渲染事件处理
   */
  triggerScrollXEvent () {
    const $xeTable = this

    const sXOpts = $xeTable.computeSXOpts
    if (sXOpts.immediate) {
      loadScrollXData($xeTable)
    } else {
      lazyScrollXData($xeTable)
    }
  },
  /**
   * 纵向 Y 可视渲染事件处理
   */
  triggerScrollYEvent () {
    const $xeTable = this

    const sYOpts = $xeTable.computeSYOpts
    if (sYOpts.immediate) {
      loadScrollYData($xeTable)
    } else {
      lazyScrollYData($xeTable)
    }
  },
  triggerBodyScrollEvent (evnt: Event, fixedType: '' | 'left' | 'right') {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { scrollYLoad, scrollXLoad } = reactData
    const { elemStore, intoRunScroll, lastScrollTop, lastScrollLeft, inWheelScroll, inVirtualScroll, inHeaderScroll, inBodyScroll, scrollRenderType, inFooterScroll } = internalData
    const xHandleEl = $xeTable.$refs.refScrollXHandleElem as HTMLDivElement
    const yHandleEl = $xeTable.$refs.refScrollYHandleElem as HTMLDivElement
    const leftScrollElem = getRefElem(elemStore['left-body-scroll'])
    const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
    const rightScrollElem = getRefElem(elemStore['right-body-scroll'])
    const headerScrollElem = getRefElem(elemStore['main-header-scroll'])
    const footerScrollElem = getRefElem(elemStore['main-footer-scroll'])
    if (inWheelScroll || inVirtualScroll || inHeaderScroll || inFooterScroll) {
      return
    }
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
  triggerHeaderScrollEvent (evnt: Event, fixedType: '' | 'left' | 'right') {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { scrollXLoad } = reactData
    const { elemStore, intoRunScroll, inWheelScroll, inVirtualScroll, inBodyScroll, inFooterScroll } = internalData
    const xHandleEl = $xeTable.$refs.refScrollXHandleElem as HTMLDivElement
    const yHandleEl = $xeTable.$refs.refScrollYHandleElem as HTMLDivElement
    const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
    const headerScrollElem = getRefElem(elemStore['main-header-scroll'])
    const footerScrollElem = getRefElem(elemStore['main-footer-scroll'])
    if (inWheelScroll || inVirtualScroll || inBodyScroll || inFooterScroll) {
      return
    }
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
  triggerFooterScrollEvent (evnt: Event, fixedType: '' | 'left' | 'right') {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { scrollXLoad } = reactData
    const { elemStore, intoRunScroll, inWheelScroll, inVirtualScroll, inHeaderScroll, inBodyScroll } = internalData
    const xHandleEl = $xeTable.$refs.refScrollXHandleElem as HTMLDivElement
    const yHandleEl = $xeTable.$refs.refScrollYHandleElem as HTMLDivElement
    const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
    const headerScrollElem = getRefElem(elemStore['main-header-scroll'])
    const footerScrollElem = getRefElem(elemStore['main-footer-scroll'])
    if (inWheelScroll || inVirtualScroll || inHeaderScroll || inBodyScroll) {
      return
    }
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
  triggerBodyWheelEvent (evnt: WheelEvent) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const tableProps = $xeTable
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { target, deltaY, deltaX } = evnt
    if (target && /^textarea$/i.test((target as HTMLElement).tagName)) {
      return
    }
    const { highlightHoverRow } = tableProps
    const { scrollYLoad } = reactData
    const { elemStore, lastScrollTop, lastScrollLeft } = internalData
    const rowOpts = $xeTable.computeRowOpts
    const xHandleEl = $xeTable.$refs.refScrollXHandleElem as HTMLDivElement
    const yHandleEl = $xeTable.$refs.refScrollYHandleElem as HTMLDivElement
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

    const wheelSpeed = getWheelSpeed(reactData.lastScrollTime)
    const deltaTop = deltaY * wheelSpeed
    const deltaLeft = deltaX * wheelSpeed

    const isTopWheel = deltaTop < 0
    const currScrollTop = bodyScrollElem.scrollTop
    // 如果滚动位置已经是顶部或底部，则不需要触发
    if (isTopWheel ? currScrollTop <= 0 : currScrollTop >= bodyScrollElem.scrollHeight - bodyScrollElem.clientHeight) {
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

      wheelScrollTo(scrollTop - bodyScrollElem.scrollTop, (offsetTop: number) => {
        const currTopNum = bodyScrollElem.scrollTop + offsetTop
        internalData.inWheelScroll = true
        setScrollTop(yHandleEl, currTopNum)
        setScrollTop(bodyScrollElem, currTopNum)
        setScrollTop(leftScrollElem, currTopNum)
        setScrollTop(rightScrollElem, currTopNum)
        if (scrollYLoad) {
          $xeTable.triggerScrollYEvent(evnt)
        }
        $xeTable.handleScrollEvent(evnt, isRollY, isRollX, currTopNum, scrollLeft, {
          type: 'table',
          fixed: ''
        })
      })

      // internalData.inWheelScroll = true
      // setScrollTop(yHandleEl, scrollTop)
      // setScrollTop(bodyScrollElem, scrollTop)
      // setScrollTop(leftScrollElem, scrollTop)
      // setScrollTop(rightScrollElem, scrollTop)

      // loadScrollYData($xeTable, scrollTop)
      // $xeTable.handleScrollEvent(evnt, isRollY, isRollX, scrollTop, scrollLeft, {
      //   type: 'footer',
      //   fixed: ''
      // })
    }
  },
  triggerVirtualScrollXEvent (evnt: Event) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

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
    const yHandleEl = $xeTable.$refs.refScrollYHandleElem as HTMLDivElement
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
  triggerVirtualScrollYEvent (evnt: Event) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

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
    const xHandleEl = $xeTable.$refs.refScrollXHandleElem as HTMLDivElement
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
    if (scrollYLoad) {
      $xeTable.triggerScrollYEvent(evnt)
    }
    $xeTable.handleScrollEvent(evnt, isRollY, isRollX, scrollTop, scrollLeft, {
      type: 'table',
      fixed: ''
    })
  },
  updateScrollXData () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData

    const { isAllOverflow } = reactData
    handleTableColumn($xeTable)
    return $xeTable.$nextTick().then(() => {
      handleTableColumn($xeTable)
      $xeTable.updateScrollXSpace()
      if (!isAllOverflow) {
        $xeTable.updateScrollYSpace()
      }
    })
  },
  // 更新横向 X 可视渲染上下剩余空间大小
  updateScrollXSpace () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { isGroup, scrollXLoad } = reactData
    const { visibleColumn, scrollXStore, elemStore, tableWidth } = internalData
    const tableHeader = $xeTable.$refs.refTableHeader
    const tableBody = $xeTable.$refs.refTableBody
    const tableFooter = $xeTable.$refs.refTableFooter
    const tableBodyElem = tableBody ? (tableBody as any).$el as HTMLDivElement : null
    if (tableBodyElem) {
      const tableHeaderElem = tableHeader ? (tableHeader as any).$el as HTMLDivElement : null
      const tableFooterElem = tableFooter ? (tableFooter as any).$el as HTMLDivElement : null
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
      const scrollXSpaceEl = $xeTable.$refs.refScrollXSpaceElem as HTMLDivElement
      if (scrollXSpaceEl) {
        scrollXSpaceEl.style.width = `${tableWidth}px`
      }
      $xeTable.$nextTick(() => {
        updateStyle($xeTable)
      })
    }
  },
  updateScrollYData () {
    const $xeTable = this

    $xeTable.handleTableData()
    return $xeTable.$nextTick().then(() => {
      $xeTable.handleTableData()
      $xeTable.updateScrollYSpace()
    })
  },
  // 更新纵向 Y 可视渲染上下剩余空间大小
  updateScrollYSpace () {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData
    const internalData = $xeTable as unknown as TableInternalData

    const { isAllOverflow, scrollYLoad } = reactData
    const { scrollYStore, elemStore, isResizeCellHeight, afterFullData, fullAllDataRowIdData } = internalData
    const { startIndex } = scrollYStore
    const rowOpts = $xeTable.computeRowOpts
    const cellOpts = $xeTable.computeCellOpts
    const defaultRowHeight = $xeTable.computeDefaultRowHeight
    const bodyTableElem = getRefElem(elemStore['main-body-table'])
    const containerList = ['main', 'left', 'right']
    let topSpaceHeight = 0
    let ySpaceHeight = 0

    if (scrollYLoad) {
      const isCustomCellHeight = isResizeCellHeight || cellOpts.height || rowOpts.height
      if (!isCustomCellHeight && isAllOverflow) {
        ySpaceHeight = afterFullData.length * defaultRowHeight
        topSpaceHeight = Math.max(0, startIndex * defaultRowHeight)
      } else {
        for (let i = 0; i < afterFullData.length; i++) {
          const row = afterFullData[i]
          const rowid = getRowid($xeTable, row)
          const rowRest = fullAllDataRowIdData[rowid] || {}
          ySpaceHeight += rowRest.resizeHeight || cellOpts.height || rowOpts.height || rowRest.height || defaultRowHeight
        }
        for (let i = 0; i < startIndex; i++) {
          const row = afterFullData[i]
          const rowid = getRowid($xeTable, row)
          const rowRest = fullAllDataRowIdData[rowid] || {}
          topSpaceHeight += rowRest.resizeHeight || cellOpts.height || rowOpts.height || rowRest.height || defaultRowHeight
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
    const scrollYSpaceEl = $xeTable.$refs.refScrollYSpaceElem as HTMLDivElement
    if (scrollYSpaceEl) {
      scrollYSpaceEl.style.height = ySpaceHeight ? `${ySpaceHeight}px` : ''
    }
    return $xeTable.$nextTick().then(() => {
      updateStyle($xeTable)
    })
  },
  updateScrollYStatus () {
    const $xeTable = this

    return updateScrollYStatus($xeTable)
  },
  /**
   * 如果有滚动条，则滚动到对应的位置
   * @param {Number} scrollLeft 左距离
   * @param {Number} scrollTop 上距离
   */
  scrollTo (scrollLeft: number | null, scrollTop?: number | null) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const internalData = $xeTable as unknown as TableInternalData

    const { $refs } = this
    const { refTableBody, refTableHeader, leftBody, rightBody, refTableFooter } = $refs
    const tableBodyElem = refTableBody ? refTableBody.$el : null
    const leftBodyElem = leftBody ? leftBody.$el : null
    const rightBodyElem = rightBody ? rightBody.$el : null
    const tableHeaderElem = refTableHeader ? refTableHeader.$el : null
    const tableFooterElem = refTableFooter ? refTableFooter.$el : null
    internalData.intoRunScroll = true
    if (XEUtils.isNumber(scrollLeft)) {
      const xHandleEl = $xeTable.$refs.refScrollXHandleElem as HTMLDivElement
      if (xHandleEl) {
        setScrollLeft(xHandleEl, scrollLeft)
      } else {
        setScrollLeft(tableBodyElem, scrollLeft)
        setScrollLeft(tableHeaderElem, scrollLeft)
        setScrollLeft(tableFooterElem, scrollLeft)
      }
    }
    if (XEUtils.isNumber(scrollTop)) {
      const yHandleEl = $xeTable.$refs.refScrollYHandleElem as HTMLDivElement
      if (yHandleEl) {
        setScrollTop(yHandleEl, scrollTop)
      } else {
        setScrollTop(tableBodyElem, scrollTop)
        setScrollTop(leftBodyElem, scrollTop)
        setScrollTop(rightBodyElem, scrollTop)
      }
    }
    if (this.scrollXLoad || this.scrollYLoad) {
      return new Promise<void>(resolve => {
        setTimeout(() => {
          $xeTable.$nextTick(() => {
            internalData.intoRunScroll = false
            resolve()
          })
        })
      })
    }
    return this.$nextTick()
  },
  /**
   * 如果有滚动条，则滚动到对应的行
   * @param {Row} row 行对象
   * @param {ColumnInfo} column 列配置
   */
  scrollToRow (row: any, fieldOrColumn?: VxeColumnPropTypes.Field | VxeTableDefines.ColumnInfo) {
    const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
    const reactData = $xeTable as unknown as TableReactData

    const { isAllOverflow, scrollYLoad, scrollXLoad } = reactData
    const rest = []
    if (row) {
      if (this.treeConfig) {
        rest.push(this.scrollToTreeRow(row))
      } else {
        rest.push(rowToVisible(this, row))
      }
    }
    if (fieldOrColumn) {
      rest.push(handleScrollToRowColumn($xeTable, fieldOrColumn, row))
    }
    return Promise.all(rest).then(() => {
      if (row) {
        if (!isAllOverflow && (scrollYLoad || scrollXLoad)) {
          calcCellHeight($xeTable)
          calcCellWidth($xeTable)
        }
        return $xeTable.$nextTick()
      }
    })
  },
  /**
   * 如果有滚动条，则滚动到对应的列
   * @param {ColumnInfo} column 列配置
   */
  scrollToColumn (fieldOrColumn: any) {
    const $xeTable = this

    return handleScrollToRowColumn($xeTable, fieldOrColumn)
  },
  /**
   * 对于树形结构中，可以直接滚动到指定深层节点中
   * 对于某些特定的场景可能会用到，比如定位到某一节点
   * @param {Row} row 行对象
   */
  scrollToTreeRow (row: any) {
    const { tableFullData, treeConfig, treeOpts } = this
    const childrenField = treeOpts.children || treeOpts.childrenField
    const rests: any[] = []
    if (treeConfig) {
      const matchObj = XEUtils.findTree(tableFullData, item => item === row, { children: childrenField })
      if (matchObj) {
        const nodes = matchObj.nodes
        nodes.forEach((row, index) => {
          if (index < nodes.length - 1 && !this.isTreeExpandByRow(row)) {
            rests.push(this.setTreeExpand(row, true))
          }
        })
      }
    }
    return Promise.all(rests).then(() => rowToVisible(this, row))
  },
  /**
   * 手动清除滚动相关信息，还原到初始状态
   */
  clearScroll () {
    const $xeTable = this
    const internalData = $xeTable

    const { elemStore, scrollXStore, scrollYStore } = internalData
    const headerScrollElem = getRefElem(elemStore['main-header-scroll'])
    const bodyScrollElem = getRefElem(elemStore['main-body-scroll'])
    const footerScrollElem = getRefElem(elemStore['main-footer-scroll'])
    const leftScrollElem = getRefElem(elemStore['left-body-scroll'])
    const rightScrollElem = getRefElem(elemStore['right-body-scroll'])
    const xHandleEl = $xeTable.$refs.refScrollXHandleElem as HTMLDivElement
    const yHandleEl = $xeTable.$refs.refScrollYHandleElem as HTMLDivElement

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
    return $xeTable.$nextTick().then(() => {
      internalData.intoRunScroll = false
    })
  },
  /**
   * 更新表尾合计
   */
  updateFooter () {
    const { showFooter, visibleColumn, footerData, footerMethod } = this
    let footData = []
    if (showFooter && footerData && footerData.length) {
      footData = footerData.slice(0)
    } else if (showFooter && footerMethod) {
      footData = visibleColumn.length ? footerMethod({ columns: visibleColumn, data: this.afterFullData, $table: this, $grid: this.$xegrid }) : []
    }
    this.footerTableData = footData
    return this.$nextTick()
  },
  /**
   * 更新列状态 updateStatus({ row, column }, cellValue)
   * 如果组件值 v-model 发生 change 时，调用改函数用于更新某一列编辑状态
   * 如果单元格配置了校验规则，则会进行校验
   */
  updateStatus (slotParams: any, cellValue: any) {
    const $xeTable = this
    const props = $xeTable

    return this.$nextTick().then(() => {
      const { editRules } = props
      if (slotParams && editRules) {
        return $xeTable.handleCellRuleUpdateStatus('change', slotParams, cellValue)
      }
    })
  },
  handleDefaultMergeCells () {
    this.setMergeCells(this.mergeCells)
  },
  /**
   * 设置合并单元格
   * @param {TableMergeConfig[]} merges { row: Row|number, column: ColumnInfo|number, rowspan: number, colspan: number }
   */
  setMergeCells (merges: any) {
    const $xeTable = this

    if (this.spanMethod) {
      errLog('vxe.error.errConflicts', ['merge-cells', 'span-method'])
    }
    setMerges(this, merges, this.mergeList, this.afterFullData)
    return this.$nextTick().then(() => {
      this.updateCellAreas()
      return updateStyle($xeTable)
    })
  },
  /**
   * 移除单元格合并
   * @param {TableMergeConfig[]} merges 多个或数组 [{row:Row|number, col:ColumnInfo|number}]
   */
  removeMergeCells (merges: any) {
    const $xeTable = this

    if (this.spanMethod) {
      errLog('vxe.error.errConflicts', ['merge-cells', 'span-method'])
    }
    const rest = removeMerges(this, merges, this.mergeList, this.afterFullData)
    return this.$nextTick().then(() => {
      this.updateCellAreas()
      updateStyle($xeTable)
      return rest
    })
  },
  /**
   * 获取所有被合并的单元格
   */
  getMergeCells () {
    return this.mergeList.slice(0)
  },
  /**
   * 清除所有单元格合并
   */
  clearMergeCells () {
    const $xeTable = this

    this.mergeList = []
    return this.$nextTick().then(() => {
      return updateStyle($xeTable)
    })
  },
  handleDefaultMergeFooterItems () {
    this.setMergeFooterItems(this.mergeFooterItems)
  },
  setMergeFooterItems (merges: any) {
    const $xeTable = this

    if (this.footerSpanMethod) {
      errLog('vxe.error.errConflicts', ['merge-footer-items', 'footer-span-method'])
    }
    setMerges(this, merges, this.mergeFooterList, null)
    return this.$nextTick().then(() => {
      this.updateCellAreas()
      return updateStyle($xeTable)
    })
  },
  removeMergeFooterItems (merges: any) {
    const $xeTable = this

    if (this.footerSpanMethod) {
      errLog('vxe.error.errConflicts', ['merge-footer-items', 'footer-span-method'])
    }
    const rest = removeMerges(this, merges, this.mergeFooterList, null)
    return this.$nextTick().then(() => {
      this.updateCellAreas()
      updateStyle($xeTable)
      return rest
    })
  },
  /**
   * 获取所有被合并的表尾
   */
  getMergeFooterItems () {
    return this.mergeFooterList.slice(0)
  },
  /**
   * 清除所有表尾合并
   */
  clearMergeFooterItems () {
    const $xeTable = this

    this.mergeFooterList = []
    return this.$nextTick().then(() => {
      return updateStyle($xeTable)
    })
  },
  updateZindex () {
    if (this.zIndex) {
      this.tZindex = this.zIndex
    } else if (this.tZindex < getLastZIndex()) {
      this.tZindex = nextZIndex()
    }
  },
  updateCellAreas () {
    if (this.mouseConfig && this.mouseOpts.area && this.handleRecalculateCellAreas) {
      return this.handleRecalculateCellAreas()
    }
    return this.$nextTick()
  },
  dispatchEvent (type: ValueOf<VxeTableEmits>, params: Record<string, any>, evnt: Event | null) {
    const $xeTable = this
    $xeTable.$emit(type, createEvent(evnt, { $table: $xeTable, $grid: $xeTable.$xegrid }, params))
  },
  // 已废弃，使用 dispatchEvent
  emitEvent (type: any, params: any, evnt: any) {
    this.$emit(type, Object.assign({ $table: this, $grid: this.$xegrid, $event: evnt }, params))
  },
  focus () {
    this.isActivated = true
    return this.$nextTick()
  },
  blur () {
    this.isActivated = false
    return this.$nextTick()
  },
  // 连接工具栏
  connect ($toolbar: any) {
    if ($toolbar && $toolbar.syncUpdate) {
      $toolbar.syncUpdate({ collectColumn: this.collectColumn, $table: this })
      this.$toolbar = $toolbar
    } else {
      errLog('vxe.error.barUnableLink')
    }
    return this.$nextTick()
  },

  /*************************
   * Publish methods
   *************************/
  /**
   * 已废弃，被 getCellElement 替换
   * @deprecated
   */
  getCell (row: any, column: any) {
    return this.getCellElement(row, column)
  },
  findRowIndexOf (list: any, row: any) {
    return row ? XEUtils.findIndexOf(list, item => this.eqRow(item, row)) : -1
  },
  eqRow (row1: any, row2: any) {
    if (row1 && row2) {
      if (row1 === row2) {
        return true
      }
      return getRowid(this, row1) === getRowid(this, row2)
    }
    return false
  },
  /*************************
   * Publish methods
   *************************/

  getSetupOptions () {
    return getConfig()
  }
} as any

// Module methods
const funcs = 'setFilter,openFilter,clearFilter,saveFilterPanel,resetFilterPanel,getCheckedFilters,updateFilterOptionStatus,closeMenu,setActiveCellArea,getActiveCellArea,getCellAreas,clearCellAreas,copyCellArea,cutCellArea,pasteCellArea,getCopyCellArea,getCopyCellAreas,clearCopyCellArea,setCellAreas,openFNR,openFind,openReplace,closeFNR,getSelectedCell,clearSelected,insert,insertAt,insertNextAt,insertChild,insertChildAt,insertChildNextAt,remove,removeCheckboxRow,removeRadioRow,removeCurrentRow,getRecordset,getInsertRecords,getRemoveRecords,getUpdateRecords,clearEdit,clearActived,getEditRecord,getActiveRecord,isEditByRow,isActiveByRow,setEditRow,setActiveRow,setEditCell,setActiveCell,setSelectCell,clearValidate,fullValidate,validate,fullValidateField,validateField,openExport,closeExport,openPrint,closePrint,getPrintHtml,exportData,openImport,closeImport,importData,saveFile,readFile,importByFile,print,openCustom,closeCustom,saveCustom,cancelCustom,resetCustom,toggleCustomAllCheckbox,setCustomAllCheckbox'.split(',')

funcs.forEach(name => {
  Methods[name] = function (...args: any[]) {
    if (process.env.VUE_APP_VXE_ENV === 'development') {
      if (!this[`_${name}`]) {
        if ('openExport,openPrint,exportData,openImport,importData,saveFile,readFile,importByFile,print'.split(',').includes(name)) {
          errLog('vxe.error.reqModule', ['VxeTableExportModule'])
        } else if ('fullValidate,validate'.split(',').includes(name)) {
          errLog('vxe.error.reqModule', ['VxeTableValidatorModule'])
        } else if ('setFilter,openFilter,clearFilter,getCheckedFilters'.split(',').includes(name)) {
          errLog('vxe.error.reqModule', ['VxeTableFilterModule'])
        } else if ('insert,insertAt,insertNextAt,remove,removeCheckboxRow,removeRadioRow,removeCurrentRow,getRecordset,getInsertRecords,getRemoveRecords,getUpdateRecords,getEditRecord,getActiveRecord,isEditByRow,isActiveByRow,setEditRow,setActiveRow,setEditCell,setActiveCell'.split(',').includes(name)) {
          errLog('vxe.error.reqModule', ['VxeTableEditModule'])
        } else if ('openCustom'.split(',').includes(name)) {
          errLog('vxe.error.reqModule', ['VxeTableCustomModule'])
        }
      }
    }
    return this[`_${name}`] ? this[`_${name}`](...args) : null
  }
})

export default Methods
