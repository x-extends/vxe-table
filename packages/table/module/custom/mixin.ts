import XEUtils from 'xe-utils'
import { getColumnList } from '../../src/util'
import { toCssUnit } from '../../../ui/src/dom'

import type { VxeColumnPropTypes, VxeTableConstructor, VxeTablePrivateMethods, VxeTableDefines, TableReactData, TableInternalData, VxeComponentStyleType } from '../../../../types'

const customColumnCssKeys = ['checkbox', 'sort', 'title', 'width', 'fixed', 'align', 'header-align', 'footer-align']

function updatePopupStyle ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const $xeGrid = $xeTable.$xeGrid
  const $xeGantt = $xeTable.$xeGantt
  const $xeGGWrapper = $xeGrid || $xeGantt
  const reactData = $xeTable as unknown as TableReactData

  const { customStore } = reactData
  const customOpts = $xeTable.computeCustomOpts
  const { mode, placement, popupOptions } = customOpts
  const showSimple = !(mode === 'modal' || mode === 'drawer')
  const { transfer, minWidth, maxWidth, maxHeight } = popupOptions || {}
  const customSimpleMode = $xeTable.computeCustomSimpleMode
  const showCustomSimpleOutside = customSimpleMode === 'outside'
  const bodyEl = document.documentElement
  let wrapperEl = $xeTable.$refs.refElem as HTMLDivElement
  let popupTop = 0
  let popupMaxHeight: string | number = 0
  const defPupStys: VxeComponentStyleType = {}
  const panePupStys: VxeComponentStyleType = {}
  if ($xeGantt) {
    const ganttContainerElem = $xeGantt.$refs.refGanttContainerElem as HTMLDivElement
    if (ganttContainerElem) {
      wrapperEl = ganttContainerElem
    }
  }
  const tableRect = wrapperEl.getBoundingClientRect()
  // 多种模式，指定元素插入
  if (showSimple && transfer) {
    popupTop = tableRect.top + bodyEl.scrollTop
    popupMaxHeight = XEUtils.eqNull(maxHeight) ? 360 : maxHeight
  } else if (showCustomSimpleOutside) {
    if ($xeGGWrapper && wrapperEl) {
      popupTop = wrapperEl.offsetTop
    }
    popupMaxHeight = XEUtils.eqNull(maxHeight) ? 360 : maxHeight
  } else {
    // 判断面板不能大于表格高度
    if (wrapperEl) {
      popupMaxHeight = wrapperEl.clientHeight - 22
    }
    popupMaxHeight = Math.max(88, popupMaxHeight)
  }
  let popupMxHeight: string | number = 0
  if (!(placement === 'left' || placement === 'right')) {
    popupMxHeight = XEUtils.eqNull(maxHeight) ? popupMaxHeight : maxHeight
  }
  if (!placement || !(['left', 'right', 'bottom-left', 'bottom-right'].includes(placement))) {
    if (popupTop) {
      defPupStys.top = toCssUnit(popupTop)
    }
  }

  if (showSimple && transfer) {
    if (placement === 'bottom-left' || placement === 'bottom-right') {
      defPupStys.bottom = toCssUnit(bodyEl.scrollHeight - tableRect.top - tableRect.height + 1)
    }
    if (placement === 'top-left' || placement === 'bottom-left') {
      defPupStys.left = toCssUnit(tableRect.left)
    } else if (!placement || placement === 'top-right' || placement === 'bottom-right') {
      defPupStys.right = toCssUnit(bodyEl.scrollWidth - tableRect.left - tableRect.width + 1)
    }
  }

  // 同步表格的css变量到弹窗中
  const bodyComputeStyle = getComputedStyle(bodyEl)
  const tableComputeStyle = getComputedStyle(wrapperEl)
  customColumnCssKeys.forEach(key => {
    const currCssKey = `--vxe-ui-vxe-table-custom-column-${key}-${key === 'title' ? 'min-' : ''}width`
    const currCssVal = tableComputeStyle.getPropertyValue(currCssKey)
    if (currCssVal && currCssVal !== bodyComputeStyle.getPropertyValue(currCssKey)) {
      panePupStys[currCssKey] = currCssVal
    }
  })
  if (minWidth) {
    defPupStys['--vxe-ui-vxe-table-custom-default-min-width'] = toCssUnit(minWidth)
  }
  if (maxWidth) {
    defPupStys['--vxe-ui-vxe-table-custom-default-max-width'] = toCssUnit(maxWidth)
  }
  if (popupMxHeight) {
    defPupStys.maxHeight = toCssUnit(popupMxHeight)
  }
  customStore.defPopupStyle = defPupStys
  customStore.panePopupStyle = panePupStys
  customStore.maxHeight = popupMxHeight
  return $xeTable.$nextTick()
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
      const internalData = $xeTable as unknown as TableInternalData
      const $xeGrid = $xeTable.$xeGrid
      const $xeGantt = $xeTable.$xeGantt
      const $xeGGWrapper = $xeGrid || $xeGantt

      const { initStore, customStore } = reactData
      const customOpts = $xeTable.computeCustomOpts
      const { mode, popupOptions } = customOpts
      const showSimple = !(mode === 'modal' || mode === 'drawer')
      const { transfer } = popupOptions || {}
      const customSimpleMode = $xeTable.computeCustomSimpleMode
      const showCustomSimpleOutside = customSimpleMode === 'outside'
      let cpToElem = $xeTable.$refs.refCustomContainerElem as HTMLElement
      // 多种模式，指定元素插入
      if (showSimple && transfer) {
        cpToElem = document.body
      } else {
        if (showCustomSimpleOutside && $xeGGWrapper) {
          const popupContainerElem = $xeGGWrapper.$refs.refPopupContainerElem as HTMLDivElement
          if (popupContainerElem) {
            cpToElem = popupContainerElem
          }
        }
      }
      if (cpToElem) {
        const customPopupToElem = $xeTable.$refs.refCustomPopupToElem as HTMLDivElement
        if (customPopupToElem && customPopupToElem.parentElement !== cpToElem) {
          cpToElem.appendChild(customPopupToElem)
        }
      }
      if (internalData.customPopupToElem !== cpToElem) {
        reactData.ctPopupFlag++
      }
      internalData.customPopupToElem = cpToElem
      customStore.visible = true
      initStore.custom = true
      $xeTable.handleUpdateCustomColumn()
      $xeTable.checkCustomStatus()
      updatePopupStyle($xeTable)
      return $xeTable.$nextTick().then(() => updatePopupStyle($xeTable))
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
    _saveCustom (isDirectly?: boolean) {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData
      const internalData = $xeTable as unknown as TableInternalData

      const { customColumnList, aggHandleFields, rowGroupList } = reactData
      const customOpts = $xeTable.computeCustomOpts
      const { allowVisible, allowSort, allowFixed, allowResizable, allowAlign, allowHeaderAlign, allowFooterAlign, allowGroup, allowValues } = customOpts
      if (isDirectly) {
        XEUtils.eachTree(customColumnList, (column) => {
          if (allowResizable) {
            if (column.renderVisible && (!column.children || !column.children.length)) {
              column.resizeWidth = Math.max(0, XEUtils.toNumber(column.renderWidth))
            }
          }
        })
      } else {
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
          if (allowAlign) {
            column.align = column.renderAlign
          }
          if (allowHeaderAlign) {
            column.headerAlign = column.renderHeaderAlign
          }
          if (allowFooterAlign) {
            column.footerAlign = column.renderFooterAlign
          }
          if (allowGroup && allowValues) {
            column.aggFunc = column.renderAggFn
          }
        })
      }
      reactData.isCustomStatus = true
      if (allowGroup && !!$xeTable.handlePivotTableAggData) {
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
      const { allowVisible, allowSort, allowFixed, allowAlign, allowHeaderAlign, allowFooterAlign, allowResizable, allowGroup, allowValues } = customOpts
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
        if (allowAlign) {
          column.align = column.renderAlign
        }
        if (allowHeaderAlign) {
          column.headerAlign = column.renderHeaderAlign
        }
        if (allowFooterAlign) {
          column.footerAlign = column.renderFooterAlign
        }
        if (allowGroup) {
          // 无
        }
        if (allowValues) {
          // 无
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
      const opts: VxeTableDefines.VxeTableCustomStorageObj = Object.assign({
        visible: true,
        resizable: options === true,
        fixed: options === true,
        sort: options === true,
        aggFunc: options === true,
        align: options === true,
        headerAlign: options === true,
        footerAlign: options === true
      }, options)
      const allCols: VxeTableDefines.ColumnInfo[] = []
      XEUtils.eachTree(collectColumn, (column) => {
        if (opts.resizable) {
          column.resizeWidth = 0
        }
        if (opts.fixed) {
          column.fixed = column.defaultFixed
          column.renderFixed = column.defaultFixed
        }
        if (opts.sort) {
          column.renderSortNumber = column.sortNumber
          column.parentId = column.defaultParentId
        }
        if (!checkMethod || checkMethod({ $table: $xeTable, column })) {
          column.visible = column.defaultVisible
        }
        if (opts.align) {
          column.align = column.defaultAlign
          column.renderAlign = column.defaultAlign
        }
        if (opts.headerAlign) {
          column.headerAlign = column.defaultHeaderAlign
          column.renderHeaderAlign = column.defaultHeaderAlign
        }
        if (opts.footerAlign) {
          column.footerAlign = column.defaultFooterAlign
          column.renderFooterAlign = column.defaultFooterAlign
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
        if (opts.aggFunc && !!$xeTable.handlePivotTableAggData) {
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
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods
      const reactData = $xeTable as unknown as TableReactData

      const { customStore } = reactData
      const isAll = !customStore.isAll
      return $xeTable.setCustomAllCheckbox(isAll)
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
        $xeTable.closeCustom()
        emitCustomEvent($xeTable, 'close', evnt)
        $xeTable.dispatchEvent('custom-close', {}, evnt)
      } else {
        customStore.btnEl = evnt.target
        $xeTable.openCustom()
        emitCustomEvent($xeTable, 'open', evnt)
        $xeTable.dispatchEvent('custom-open', {}, evnt)
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
        $xeTable.dispatchEvent('custom-open', {}, evnt)
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
        $xeTable.dispatchEvent('custom-close', {}, evnt)
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
          column.renderAlign = column.align
          column.renderHeaderAlign = column.headerAlign
          column.renderFooterAlign = column.footerAlign
          sortMaps[colid] = column.renderSortNumber
          fixedMaps[colid] = column.fixed
          visibleMaps[colid] = column.visible
        })
        customStore.oldSortMaps = sortMaps
        customStore.oldFixedMaps = fixedMaps
        customStore.oldVisibleMaps = visibleMaps
        reactData.customColumnList = collectColumn.slice(0)
      }
    },
    handleCustomStyle () {
      const $xeTable = this as VxeTableConstructor & VxeTablePrivateMethods

      return updatePopupStyle($xeTable)
    }
  } as any
}
