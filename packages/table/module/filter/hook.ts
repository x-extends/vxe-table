import { nextTick } from 'vue'
import XEUtils from 'xe-utils'
import { VxeUI } from '../../../ui'
import { toFilters, handleFieldOrColumn, getRefElem } from '../../src/util'
import { toCssUnit, triggerEvent, getDomNode } from '../../../ui/src/dom'
import { isEnableConf } from '../../../ui/src/utils'

import type { TableFilterMethods, TableFilterPrivateMethods } from '../../../../types'

const { renderer, hooks } = VxeUI

const tableFilterMethodKeys: (keyof TableFilterMethods)[] = ['openFilter', 'setFilter', 'clearFilter', 'saveFilterPanel', 'saveFilterPanelByEvent', 'resetFilterPanel', 'resetFilterPanelByEvent', 'getCheckedFilters', 'updateFilterOptionStatus']

hooks.add('tableFilterModule', {
  setupTable ($xeTable) {
    const { props, reactData, internalData } = $xeTable
    const { refElem, refTableFilter } = $xeTable.getRefMaps()
    const { computeFilterOpts, computeMouseOpts } = $xeTable.getComputeMaps()

    // 确认筛选
    const handleFilterConfirmFilter = (evnt: Event | null) => {
      const { filterStore } = reactData
      filterStore.options.forEach((option: any) => {
        option.checked = option._checked
      })
      $xeTable.confirmFilterEvent(evnt)
    }

    // （单选）筛选发生改变
    const changeRadioOption = (evnt: Event, checked: boolean, item: any) => {
      const { filterStore } = reactData
      filterStore.options.forEach((option: any) => {
        option._checked = false
      })
      item._checked = checked
      $xeTable.checkFilterOptions()
      handleFilterConfirmFilter(evnt)
    }

    // （多选）筛选发生改变
    const changeMultipleOption = (evnt: Event, checked: boolean, item: any) => {
      item._checked = checked
      $xeTable.checkFilterOptions()
    }

    /**
     * 重置筛选
     * 当筛选面板中的重置按钮被按下时触发
     * @param {Event} evnt 事件
     */
    const handleFilterResetFilter = (evnt: Event | null) => {
      const { filterStore } = reactData
      $xeTable.handleClearFilter(filterStore.column)
      $xeTable.confirmFilterEvent(evnt)
      if (evnt) {
        $xeTable.dispatchEvent('clear-filter', { filterList: [] }, evnt)
      }
    }

    const filterPrivateMethods: TableFilterPrivateMethods = {
      checkFilterOptions () {
        const { filterStore } = reactData
        filterStore.isAllSelected = filterStore.options.every((item: any) => item._checked)
        filterStore.isIndeterminate = !filterStore.isAllSelected && filterStore.options.some((item: any) => item._checked)
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
      triggerFilterEvent (evnt: MouseEvent, column, params) {
        const { initStore, filterStore } = reactData
        const { elemStore } = internalData
        if (filterStore.column === column && filterStore.visible) {
          filterStore.visible = false
        } else {
          const el = refElem.value
          const { scrollTop, scrollLeft, visibleHeight, visibleWidth } = getDomNode()
          const filterOpts = computeFilterOpts.value
          const { transfer } = filterOpts
          const tableRect = el.getBoundingClientRect()
          const btnElem = evnt.currentTarget as HTMLDivElement
          const { filters, filterMultiple, filterRender } = column
          const compConf = isEnableConf(filterRender) ? renderer.get(filterRender.name) : null
          const frMethod = column.filterRecoverMethod || (compConf ? (compConf.tableFilterRecoverMethod || compConf.filterRecoverMethod) : null)
          internalData._currFilterParams = params
          Object.assign(filterStore, {
            multiple: filterMultiple,
            options: filters,
            column,
            style: null
          })
          // 复原状态
          filterStore.options.forEach((option: any) => {
            const { _checked, checked } = option
            option._checked = checked
            if (!checked && _checked !== checked) {
              if (frMethod) {
                frMethod({ option, column, $table: $xeTable })
              }
            }
          })
          this.checkFilterOptions()
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
            let maxHeight = 0
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
              maxHeight = Math.max(40, el.clientHeight - top - (filterHeadElem ? filterHeadElem.clientHeight : 0) - (filterFootElem ? filterFootElem.clientHeight : 0) - 14)
              if (left < 1) {
                left = 1
              } else if (left > (el.clientWidth - filterWidth - 1)) {
                left = el.clientWidth - filterWidth - 1
              }
            }
            filterStore.style = {
              top: toCssUnit(top),
              left: toCssUnit(left)
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
        const { field } = column
        const values: any[] = []
        const datas: any[] = []
        column.filters.forEach((item: any) => {
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
       * @param {Event} evnt 事件
       */
      confirmFilterEvent (evnt: Event) {
        const { filterStore } = reactData
        const { column } = filterStore
        $xeTable.handleColumnConfirmFilter(column, evnt)
      },
      handleFilterChangeRadioOption: changeRadioOption,
      handleFilterChangeMultipleOption: changeMultipleOption,
      // 筛选发生改变
      handleFilterChangeOption (evnt: Event, checked: boolean, item: any) {
        const { filterStore } = reactData
        if (filterStore.multiple) {
          changeMultipleOption(evnt, checked, item)
        } else {
          changeRadioOption(evnt, checked, item)
        }
      },
      handleFilterConfirmFilter,
      handleFilterResetFilter
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
        const column = handleFieldOrColumn($xeTable, fieldOrColumn)
        if (column && column.filters) {
          column.filters = toFilters(options || [])
          if (isUpdate) {
            // 已废弃，即将去掉事件触发 new Event('click') -> null
            return $xeTable.handleColumnConfirmFilter(column, new Event('click'))
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
      saveFilterPanel () {
        handleFilterConfirmFilter(null)
        return nextTick()
      },
      saveFilterPanelByEvent (evnt) {
        handleFilterConfirmFilter(evnt)
        return nextTick()
      },
      resetFilterPanel () {
        handleFilterResetFilter(null)
        return nextTick()
      },
      resetFilterPanelByEvent (evnt) {
        handleFilterResetFilter(evnt)
        return nextTick()
      },
      getCheckedFilters () {
        const { tableFullColumn } = internalData
        const filterList: any[] = []
        tableFullColumn.forEach((column) => {
          const { field, filters } = column
          const valueList: any[] = []
          const dataList: any[] = []
          if (filters && filters.length) {
            filters.forEach((item) => {
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
  }
})
