import { nextTick } from 'vue'
import { VxeUI } from '../../../ui'
import XEUtils from 'xe-utils'
import { getColumnList } from '../../src/util'
import { toCssUnit } from '../../../ui/src/dom'

import type { TableCustomMethods, TableCustomPrivateMethods, VxeColumnPropTypes, VxeTableDefines, VxeComponentStyleType } from '../../../../types'

const tableCustomMethodKeys: (keyof TableCustomMethods)[] = ['openCustom', 'closeCustom', 'getCustomVisible', 'toggleCustom', 'saveCustom', 'cancelCustom', 'resetCustom', 'toggleCustomAllCheckbox', 'setCustomAllCheckbox']

const customColumnCssKeys = ['checkbox', 'sort', 'title', 'width', 'fixed', 'align', 'header-align', 'footer-align']

VxeUI.hooks.add('tableCustomModule', {
  setupTable ($xeTable) {
    const { reactData, internalData } = $xeTable
    const { computeCustomOpts, computeRowGroupFields, computeCustomSimpleMode } = $xeTable.getComputeMaps()
    const { refElem } = $xeTable.getRefMaps()

    const $xeGrid = $xeTable.xeGrid
    const $xeGantt = $xeTable.xeGantt
    const $xeGGWrapper = $xeGrid || $xeGantt

    const updatePopupStyle = () => {
      const { customStore } = reactData
      const customOpts = computeCustomOpts.value
      const { mode, placement, popupOptions } = customOpts
      const showSimple = !(mode === 'modal' || mode === 'drawer')
      const { transfer, minWidth, maxWidth, maxHeight } = popupOptions || {}
      const customSimpleMode = computeCustomSimpleMode.value
      const showCustomSimpleOutside = customSimpleMode === 'outside'
      const bodyEl = document.documentElement
      let wrapperEl = refElem.value
      let popupTop = 0
      let popupMaxHeight: string | number = 0
      const defPupStys: VxeComponentStyleType = {}
      const panePupStys: VxeComponentStyleType = {}
      if ($xeGantt) {
        const { refGanttContainerElem } = $xeGantt.getRefMaps()
        const ganttContainerElem = refGanttContainerElem.value
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
      return nextTick()
    }

    const openCustom = () => {
      const { initStore, customStore } = reactData
      const customOpts = computeCustomOpts.value
      const { mode, popupOptions } = customOpts
      const showSimple = !(mode === 'modal' || mode === 'drawer')
      const { transfer } = popupOptions || {}
      const customSimpleMode = computeCustomSimpleMode.value
      const showCustomSimpleOutside = customSimpleMode === 'outside'
      let cpToElem = null
      // 多种模式，指定元素插入
      if (showSimple && transfer) {
        cpToElem = document.body
      } else {
        if (showCustomSimpleOutside && $xeGGWrapper) {
          const { refPopupContainerElem } = $xeGGWrapper.getRefMaps()
          const popupContainerElem = refPopupContainerElem.value
          if (popupContainerElem) {
            cpToElem = popupContainerElem
          }
        }
      }
      if (internalData.customPopupToElem !== cpToElem) {
        reactData.ctPopupFlag++
      }
      internalData.customPopupToElem = cpToElem
      customStore.visible = true
      initStore.custom = true
      handleUpdateCustomColumn()
      checkCustomStatus()
      updatePopupStyle()
      return nextTick().then(() => updatePopupStyle())
    }

    const handleUpdateCustomColumn = () => {
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
    }

    const closeCustom = () => {
      const { customStore } = reactData
      const customOpts = computeCustomOpts.value
      if (customStore.visible) {
        customStore.visible = false
        if (!customOpts.immediate) {
          $xeTable.handleCustom()
        }
      }
      return nextTick()
    }

    const toggleCustom = () => {
      const { customStore } = reactData
      if (customStore.visible) {
        return closeCustom()
      }
      return openCustom()
    }

    const saveCustom = (isDirectly?: boolean) => {
      const { customColumnList, aggHandleFields, rowGroupList } = reactData
      const customOpts = computeCustomOpts.value
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
    }

    const cancelCustom = () => {
      const { customColumnList, customStore } = reactData
      const { oldSortMaps, oldFixedMaps, oldVisibleMaps } = customStore
      const customOpts = computeCustomOpts.value
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
      return nextTick()
    }

    const setCustomAllCheckbox = (checked: boolean) => {
      const { customStore } = reactData
      const { customColumnList } = reactData
      const customOpts = computeCustomOpts.value
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
      return nextTick()
    }

    const customMethods: TableCustomMethods = {
      getCustomVisible () {
        const { customStore } = reactData
        return customStore.visible
      },
      openCustom,
      closeCustom,
      toggleCustom,
      saveCustom,
      cancelCustom,
      resetCustom (options) {
        const { rowGroupList } = reactData
        const { collectColumn } = internalData
        const customOpts = computeCustomOpts.value
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
            const rowGroupFields = computeRowGroupFields.value
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
      toggleCustomAllCheckbox () {
        const { customStore } = reactData
        const isAll = !customStore.isAll
        return setCustomAllCheckbox(isAll)
      },
      setCustomAllCheckbox
    }

    const checkCustomStatus = () => {
      const { customStore } = reactData
      const { collectColumn } = internalData
      const customOpts = computeCustomOpts.value
      const { checkMethod } = customOpts
      customStore.isAll = collectColumn.every((column) => (checkMethod ? !checkMethod({ $table: $xeTable, column }) : false) || column.renderVisible)
      customStore.isIndeterminate = !customStore.isAll && collectColumn.some((column) => (!checkMethod || checkMethod({ $table: $xeTable, column })) && (column.renderVisible || column.halfVisible))
    }

    const emitCustomEvent = (type: VxeTableDefines.CustomType, evnt: Event) => {
      $xeTable.dispatchEvent('custom', { type }, evnt)
    }

    const customPrivateMethods: TableCustomPrivateMethods = {
      checkCustomStatus,
      emitCustomEvent,
      triggerCustomEvent (evnt) {
        const reactData = $xeTable.reactData

        const { customStore } = reactData
        if (customStore.visible) {
          closeCustom()
          emitCustomEvent('close', evnt)
          $xeTable.dispatchEvent('custom-close', {}, evnt)
        } else {
          customStore.btnEl = evnt.target as HTMLDivElement
          openCustom()
          emitCustomEvent('open', evnt)
          $xeTable.dispatchEvent('custom-open', {}, evnt)
        }
      },
      customOpenEvent (evnt) {
        const reactData = $xeTable.reactData

        const { customStore } = reactData
        if (!customStore.visible) {
          customStore.activeBtn = true
          customStore.btnEl = evnt.target as HTMLDivElement
          $xeTable.openCustom()
          $xeTable.emitCustomEvent('open', evnt)
          $xeTable.dispatchEvent('custom-open', {}, evnt)
        }
      },
      customCloseEvent (evnt) {
        const reactData = $xeTable.reactData

        const { customStore } = reactData
        if (customStore.visible) {
          customStore.activeBtn = false
          $xeTable.closeCustom()
          $xeTable.emitCustomEvent('close', evnt)
          $xeTable.dispatchEvent('custom-close', {}, evnt)
        }
      },
      handleUpdateCustomColumn,
      handleCustomStyle () {
        const reactData = $xeTable.reactData

        reactData.isCustomDragStatus = false
        return updatePopupStyle()
      }
    }

    return { ...customMethods, ...customPrivateMethods }
  },
  setupGrid ($xeGrid) {
    return $xeGrid.extendTableMethods(tableCustomMethodKeys)
  },
  setupGantt ($xeGantt) {
    return $xeGantt.extendTableMethods(tableCustomMethodKeys)
  }
})
