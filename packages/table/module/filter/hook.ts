import { nextTick } from 'vue'
import XEUtils from 'xe-utils'
import { VxeUI } from '../../../ui'
import { toFilters, handleFieldOrColumn, getRefElem } from '../../src/util'
import { toCssUnit, triggerEvent, getDomNode } from '../../../ui/src/dom'
import { isEnableConf } from '../../../ui/src/utils'

import type { TableFilterMethods, TableFilterPrivateMethods, VxeTableDefines } from '../../../../types'

const { renderer, hooks } = VxeUI

const tableFilterMethodKeys: (keyof TableFilterMethods)[] = ['openFilter', 'setFilter', 'clearFilter', 'saveFilter', 'saveFilterByEvent', 'saveFilterPanel', 'saveFilterPanelByEvent', 'resetFilter', 'resetFilterByEvent', 'resetFilterPanel', 'resetFilterPanelByEvent', 'getCheckedFilters', 'updateFilterOptionStatus']

hooks.add('tableFilterModule', {
  setupTable ($xeTable) {
    const $xeGrid = $xeTable.xeGrid
    const $xeGantt = $xeTable.xeGantt
    const $xeGGWrapper = $xeGrid || $xeGantt

    const { props, reactData, internalData } = $xeTable
    const { refElem, refTableFilter } = $xeTable.getRefMaps()
    const { computeFilterOpts, computeMouseOpts } = $xeTable.getComputeMaps()

    const filterPrivateMethods: TableFilterPrivateMethods = {
      checkFilterOptions () {
        const { filterStore } = reactData
        const { column } = filterStore
        if (column) {
          const filterOptions = (column.filters || []) as VxeTableDefines.FilterOption[]
          filterStore.isAllSelected = filterOptions.every((item) => item._checked)
          filterStore.isIndeterminate = !filterStore.isAllSelected && filterOptions.some((item) => item._checked)
        }
      },
      /**
       * 点击筛选事件
       * 当筛选图标被点击时触发
       * 更新选项是否全部状态
       * 打开筛选面板
       * @param {Event} evnt 事件
       * @param {ColumnInfo} column 列配置
       * @param {Object} params 参数
       */
      triggerFilterEvent (evnt: MouseEvent, column: VxeTableDefines.ColumnInfo, params) {
        const { initStore, filterStore } = reactData
        const { elemStore } = internalData
        if (filterStore.column === column && filterStore.visible) {
          filterStore.visible = false
        } else {
          const tableEl = refElem.value
          const { scrollTop, scrollLeft, visibleHeight, visibleWidth } = getDomNode()
          const filterOpts = computeFilterOpts.value
          const { transfer } = filterOpts
          const tableRect = tableEl.getBoundingClientRect()
          const btnElem = evnt.currentTarget as HTMLDivElement
          const filterRender = column ? column.filterRender : null
          const compConf = filterRender && isEnableConf(filterRender) ? renderer.get(filterRender.name) : null
          $xeTable.handleFilterOptions(column)
          internalData._currFilterParams = params
          filterStore.style = null
          filterStore.visible = true
          initStore.filter = true
          nextTick(() => {
            const headerScrollElem = getRefElem(elemStore['main-header-scroll'])
            if (!headerScrollElem) {
              return
            }
            const tableFilter = refTableFilter.value
            const filterWrapperElem = tableFilter ? tableFilter.getRefMaps().refElem.value as HTMLDivElement : null
            if (!filterWrapperElem) {
              return
            }
            const btnRect = btnElem.getBoundingClientRect()
            const filterHeadElem = filterWrapperElem.querySelector<HTMLDivElement>('.vxe-table--filter-header')
            const filterFootElem = filterWrapperElem.querySelector<HTMLDivElement>('.vxe-table--filter-footer')
            const filterWidth = filterWrapperElem.offsetWidth
            const centerWidth = filterWidth / 2
            let left = 0
            let top = 0
            let maxHeight: number = 0
            if (transfer) {
              left = btnRect.left - centerWidth + scrollLeft
              top = btnRect.top + btnElem.clientHeight + scrollTop
              maxHeight = Math.min(Math.max(tableRect.height, Math.floor(visibleHeight / 2)), Math.max(80, visibleHeight - top - (filterHeadElem ? filterHeadElem.clientHeight : 0) - (filterFootElem ? filterFootElem.clientHeight : 0) - 28))
              if (left < 16) {
                left = 16
              } else if (left > (visibleWidth - filterWidth - 16)) {
                left = visibleWidth - filterWidth - 16
              }
            } else {
              left = btnRect.left - tableRect.left - centerWidth
              top = btnRect.top - tableRect.top + btnElem.clientHeight
              maxHeight = Math.max(40, tableEl.clientHeight - top - (filterHeadElem ? filterHeadElem.clientHeight : 0) - (filterFootElem ? filterFootElem.clientHeight : 0) - 14)
              if (left < 1) {
                left = 1
              } else if (left > (tableEl.clientWidth - filterWidth - 1)) {
                left = tableEl.clientWidth - filterWidth - 1
              }
              if ($xeGGWrapper) {
                const wrapperEl = $xeGGWrapper.getRefMaps().refElem.value
                if (wrapperEl) {
                  const wrapperRect = wrapperEl.getBoundingClientRect()
                  top += tableRect.top - wrapperRect.top
                }
              }
            }
            filterStore.style = {
              top: toCssUnit(top),
              left: toCssUnit(left)
            }
            // 筛选面板是自适应表格高度
            if (compConf ? !compConf.tableFilterAutoHeight : false) {
              maxHeight = 0
            }
            // 判断面板不能大于表格高度
            filterStore.maxHeight = maxHeight
          })
        }
        $xeTable.dispatchEvent('filter-visible', { column, field: column.field, property: column.field, filterList: $xeTable.getCheckedFilters(), visible: filterStore.visible }, evnt)
      },
      handleClearFilter (column) {
        if (column) {
          const { filters, filterRender } = column
          if (filters) {
            const compConf = isEnableConf(filterRender) ? renderer.get(filterRender.name) : null
            const frMethod = column.filterResetMethod || (compConf ? (compConf.tableFilterResetMethod || compConf.filterResetMethod) : null)
            filters.forEach((item: any) => {
              item._checked = false
              item.checked = false
              if (!frMethod) {
                item.data = XEUtils.clone(item.resetValue, true)
              }
            })
            if (frMethod) {
              frMethod({ options: filters, column, $table: $xeTable })
            }
          }
        }
      },
      handleColumnConfirmFilter (column, evnt) {
        const { mouseConfig } = props
        const { scrollXLoad: oldScrollXLoad, scrollYLoad: oldScrollYLoad } = reactData
        const filterOpts = computeFilterOpts.value
        const mouseOpts = computeMouseOpts.value
        const { field, filters } = column
        const filterOptions = filters || []
        const values: any[] = []
        const datas: any[] = []
        filterOptions.forEach((item) => {
          if (item.checked) {
            values.push(item.value)
            datas.push(item.data)
          }
        })
        const filterList = $xeTable.getCheckedFilters()
        const params = { $table: $xeTable, $event: evnt as Event, column, field, property: field, values, datas, filters: filterList, filterList }
        // 如果是服务端筛选，则跳过本地筛选处理
        if (!filterOpts.remote) {
          $xeTable.handleTableData(true)
          $xeTable.checkSelectionStatus()
        }
        if (mouseConfig && mouseOpts.area && $xeTable.handleFilterEvent) {
          $xeTable.handleFilterEvent(evnt as Event, params)
        }
        if (evnt) {
          $xeTable.dispatchEvent('filter-change', params, evnt)
        }
        $xeTable.closeFilter()
        return $xeTable.updateFooter().then(() => {
          const { scrollXLoad, scrollYLoad } = reactData
          if ((oldScrollXLoad || scrollXLoad) || (oldScrollYLoad || scrollYLoad)) {
            if (oldScrollXLoad || scrollXLoad) {
              $xeTable.updateScrollXSpace()
            }
            if (oldScrollYLoad || scrollYLoad) {
              $xeTable.updateScrollYSpace()
            }
            return $xeTable.refreshScroll()
          }
        }).then(() => {
          $xeTable.updateCellAreas()
          return $xeTable.recalculate(true)
        }).then(() => {
          // 存在滚动行为未结束情况
          setTimeout(() => $xeTable.recalculate(), 50)
        })
      },
      /**
       * 确认筛选
       * 当筛选面板中的确定按钮被按下时触发
       */
      confirmFilterEvent (evnt, column) {
        if (column) {
          $xeTable.handleColumnConfirmFilter(column, evnt)
        }
      },
      // （单选）筛选发生改变
      handleFilterChangeRadioOption (evnt, checked, item) {
        const { filterStore } = reactData
        const { column } = filterStore
        if (column) {
          const filterOptions = (column.filters || []) as VxeTableDefines.FilterOption[]
          filterOptions.forEach((option) => {
            option._checked = false
          })
          item._checked = checked
          $xeTable.checkFilterOptions()
          $xeTable.handleFilterConfirmFilter(evnt, column)
        }
      },
      // （多选）筛选发生改变
      handleFilterChangeMultipleOption (evnt, checked, item) {
        item._checked = checked
        $xeTable.checkFilterOptions()
      },
      // 筛选发生改变
      handleFilterChangeOption (evnt, checked, item) {
        const { filterStore } = reactData
        const { fullColumnIdData } = internalData
        let column = filterStore.column
        if (!column) {
          const colRest = fullColumnIdData[item._colId]
          if (colRest) {
            column = colRest.column
            filterStore.column = column
          }
        }
        if (column) {
          if (column.filterMultiple) {
            $xeTable.handleFilterChangeMultipleOption(evnt, checked, item)
          } else {
            $xeTable.handleFilterChangeRadioOption(evnt, checked, item)
          }
        }
      },
      // 确认筛选
      handleFilterConfirmFilter (evnt, column) {
        if (column) {
          const filterOptions = (column.filters || []) as VxeTableDefines.FilterOption[]
          filterOptions.forEach((option) => {
            option.checked = option._checked
          })
          $xeTable.confirmFilterEvent(evnt, column)
        }
      },
      /**
       * 重置筛选
       * 当筛选面板中的重置按钮被按下时触发
       */
      handleFilterResetFilter (evnt: Event, column) {
        if (column) {
          $xeTable.handleClearFilter(column)
          $xeTable.confirmFilterEvent(evnt, column)
          if (evnt) {
            $xeTable.dispatchEvent('clear-filter', { filterList: [] }, evnt)
          }
        }
      }
    }

    const filterMethods: TableFilterMethods = {
      /**
       * 手动弹出筛选面板
       * @param column
       */
      openFilter (fieldOrColumn) {
        const column = handleFieldOrColumn($xeTable, fieldOrColumn)
        if (column && column.filters) {
          const { elemStore } = internalData
          const { fixed } = column
          return $xeTable.scrollToColumn(column).then(() => {
            const headerWrapperElem = getRefElem(elemStore[`${fixed || 'main'}-header-wrapper`] || elemStore['main-header-wrapper'])
            if (headerWrapperElem) {
              const filterBtnElem = headerWrapperElem.querySelector(`.vxe-header--column.${column.id} .vxe-cell--filter`) as HTMLElement
              triggerEvent(filterBtnElem, 'click')
            }
          })
        }
        return nextTick()
      },
      /**
       * 修改筛选条件列表
       * @param {ColumnInfo} fieldOrColumn 列或字段名
       * @param {Array} options 选项
       */
      setFilter (fieldOrColumn, options, isUpdate) {
        const { filterStore } = reactData
        const column = handleFieldOrColumn($xeTable, fieldOrColumn)
        if (column && column.filters) {
          column.filters = toFilters(options || [], column.id)
          if (isUpdate) {
            return $xeTable.handleColumnConfirmFilter(column, null)
          } else {
            if (filterStore.visible) {
              $xeTable.handleFilterOptions(column)
            }
          }
        }
        return nextTick()
      },
      /**
       * 清空指定列的筛选条件
       * 如果为空则清空所有列的筛选条件
       * @param {String} fieldOrColumn 列或字段名
       */
      clearFilter (fieldOrColumn) {
        const { filterStore } = reactData
        const { tableFullColumn } = internalData
        const filterOpts = computeFilterOpts.value
        let column
        if (fieldOrColumn) {
          column = handleFieldOrColumn($xeTable, fieldOrColumn)
          if (column) {
            $xeTable.handleClearFilter(column)
          }
        } else {
          tableFullColumn.forEach($xeTable.handleClearFilter)
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
          return $xeTable.updateData()
        }
        return nextTick()
      },
      saveFilter (fieldOrColumn) {
        if (fieldOrColumn) {
          const column = handleFieldOrColumn($xeTable, fieldOrColumn)
          $xeTable.handleFilterConfirmFilter(null, column)
        }
        return nextTick()
      },
      saveFilterByEvent (evnt, fieldOrColumn) {
        if (fieldOrColumn) {
          const column = handleFieldOrColumn($xeTable, fieldOrColumn)
          $xeTable.handleFilterConfirmFilter(evnt, column)
        }
        return nextTick()
      },
      resetFilter (fieldOrColumn) {
        if (fieldOrColumn) {
          const column = handleFieldOrColumn($xeTable, fieldOrColumn)
          $xeTable.handleFilterResetFilter(null, column)
        }
        return nextTick()
      },
      resetFilterByEvent (evnt, fieldOrColumn) {
        if (fieldOrColumn) {
          const column = handleFieldOrColumn($xeTable, fieldOrColumn)
          $xeTable.handleFilterResetFilter(evnt, column)
        }
        return nextTick()
      },
      saveFilterPanel () {
        const { filterStore } = reactData
        $xeTable.handleFilterConfirmFilter(null, filterStore.column || null)
        return nextTick()
      },
      saveFilterPanelByEvent (evnt) {
        const { filterStore } = reactData
        $xeTable.handleFilterConfirmFilter(evnt, filterStore.column || null)
        return nextTick()
      },
      resetFilterPanel () {
        const { filterStore } = reactData
        $xeTable.handleFilterResetFilter(null, filterStore.column || null)
        return nextTick()
      },
      resetFilterPanelByEvent (evnt) {
        const { filterStore } = reactData
        $xeTable.handleFilterResetFilter(evnt, filterStore.column || null)
        return nextTick()
      },
      getCheckedFilters () {
        const { tableFullColumn } = internalData
        const filterList: VxeTableDefines.FilterCheckedParams[] = []
        tableFullColumn.forEach((column) => {
          const { field, filters } = column
          const filterOptions = filters || []
          const valueList: any[] = []
          const dataList: any[] = []
          if (filterOptions) {
            filterOptions.forEach((item) => {
              if (item.checked) {
                valueList.push(item.value)
                dataList.push(item.data)
              }
            })
            if (valueList.length) {
              filterList.push({ column, field, property: field, values: valueList, datas: dataList })
            }
          }
        })
        return filterList
      },
      updateFilterOptionStatus (item: any, checked: boolean) {
        item._checked = checked
        item.checked = checked
        return nextTick()
      }
    }

    return { ...filterMethods, ...filterPrivateMethods }
  },
  setupGrid ($xeGrid) {
    return $xeGrid.extendTableMethods(tableFilterMethodKeys)
  },
  setupGantt ($xeGantt) {
    return $xeGantt.extendTableMethods(tableFilterMethodKeys)
  }
})
