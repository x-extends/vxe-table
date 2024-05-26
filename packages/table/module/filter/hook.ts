import { nextTick } from 'vue'
import XEUtils from 'xe-utils'
import { renderer, hooks } from '@vxe-ui/core'
import { toFilters, handleFieldOrColumn } from '../../src/util'
import { getDomNode, triggerEvent } from '../../../ui/src/dom'

import type { TableFilterMethods, TableFilterPrivateMethods } from '../../../../types'

const tableFilterMethodKeys: (keyof TableFilterMethods)[] = ['setFilter', 'clearFilter', 'getCheckedFilters']

hooks.add('tableFilterModule', {
  setupTable ($xeTable) {
    const { props, reactData, internalData } = $xeTable
    const { refTableBody, refTableFilter } = $xeTable.getRefMaps()
    const { computeFilterOpts, computeMouseOpts } = $xeTable.getComputeMaps()

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
      triggerFilterEvent (evnt, column, params) {
        const { initStore, filterStore } = reactData
        if (filterStore.column === column && filterStore.visible) {
          filterStore.visible = false
        } else {
          const { target: targetElem, pageX } = evnt
          const { visibleWidth } = getDomNode()
          const { filters, filterMultiple, filterRender } = column
          const compConf = filterRender ? renderer.get(filterRender.name) : null
          const filterRecoverMethod = column.filterRecoverMethod || (compConf ? compConf.filterRecoverMethod : null)
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
              if (filterRecoverMethod) {
                filterRecoverMethod({ option, column, $table: $xeTable })
              }
            }
          })
          this.checkFilterOptions()
          filterStore.visible = true
          initStore.filter = true
          nextTick(() => {
            const tableBody = refTableBody.value
            const bodyElem = tableBody.$el as HTMLDivElement
            const tableFilter = refTableFilter.value
            const filterWrapperElem = tableFilter ? tableFilter.$el as HTMLDivElement : null
            let filterWidth = 0
            let filterHeight = 0
            let filterHeadElem: HTMLDivElement | null = null
            let filterFootElem: HTMLDivElement | null = null
            if (filterWrapperElem) {
              filterWidth = filterWrapperElem.offsetWidth
              filterHeight = filterWrapperElem.offsetHeight
              filterHeadElem = filterWrapperElem.querySelector('.vxe-table--filter-header')
              filterFootElem = filterWrapperElem.querySelector('.vxe-table--filter-footer')
            }
            const centerWidth = filterWidth / 2
            const minMargin = 10
            const maxLeft = bodyElem.clientWidth - filterWidth - minMargin
            let left, right
            const style: any = {
              top: `${targetElem.offsetTop + targetElem.offsetParent.offsetTop + targetElem.offsetHeight + 8}px`
            }
            // 判断面板不能大于表格高度
            let maxHeight: number | null = null
            if (filterHeight >= bodyElem.clientHeight) {
              maxHeight = Math.max(60, bodyElem.clientHeight - (filterFootElem ? filterFootElem.offsetHeight : 0) - (filterHeadElem ? filterHeadElem.offsetHeight : 0))
            }
            if (column.fixed === 'left') {
              left = targetElem.offsetLeft + targetElem.offsetParent.offsetLeft - centerWidth
            } else if (column.fixed === 'right') {
              right = (targetElem.offsetParent.offsetWidth - targetElem.offsetLeft) + (targetElem.offsetParent.offsetParent.offsetWidth - targetElem.offsetParent.offsetLeft) - column.renderWidth - centerWidth
            } else {
              left = targetElem.offsetLeft + targetElem.offsetParent.offsetLeft - centerWidth - bodyElem.scrollLeft
            }
            if (left) {
              const overflowWidth = (pageX + filterWidth - centerWidth + minMargin) - visibleWidth
              if (overflowWidth > 0) {
                left -= overflowWidth
              }
              style.left = `${Math.min(maxLeft, Math.max(minMargin, left))}px`
            } else if (right) {
              const overflowWidth = (pageX + filterWidth - centerWidth + minMargin) - visibleWidth
              if (overflowWidth > 0) {
                right += overflowWidth
              }
              style.right = `${Math.max(minMargin, right)}px`
            }
            filterStore.style = style
            filterStore.maxHeight = maxHeight
          })
        }
        $xeTable.dispatchEvent('filter-visible', { column, field: column.field, property: column.field, filterList: $xeTable.getCheckedFilters(), visible: filterStore.visible }, evnt)
      },
      handleClearFilter (column) {
        if (column) {
          const { filters, filterRender } = column
          if (filters) {
            const compConf = filterRender ? renderer.get(filterRender.name) : null
            const filterResetMethod = column.filterResetMethod || (compConf ? compConf.filterResetMethod : null)
            filters.forEach((item: any) => {
              item._checked = false
              item.checked = false
              if (!filterResetMethod) {
                item.data = XEUtils.clone(item.resetValue, true)
              }
            })
            if (filterResetMethod) {
              filterResetMethod({ options: filters, column, $table: $xeTable })
            }
          }
        }
      },
      /**
       * 确认筛选
       * 当筛选面板中的确定按钮被按下时触发
       * @param {Event} evnt 事件
       */
      confirmFilterEvent (evnt: Event) {
        const { mouseConfig } = props
        const { filterStore, scrollXLoad: oldScrollXLoad, scrollYLoad: oldScrollYLoad } = reactData
        const filterOpts = computeFilterOpts.value
        const mouseOpts = computeMouseOpts.value
        const { column } = filterStore
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
        const params = { $table: $xeTable, $event: evnt, column, field, property: field, values, datas, filters: filterList, filterList }
        // 如果是服务端筛选，则跳过本地筛选处理
        if (!filterOpts.remote) {
          $xeTable.handleTableData(true)
          $xeTable.checkSelectionStatus()
        }
        if (mouseConfig && mouseOpts.area && $xeTable.handleFilterEvent) {
          $xeTable.handleFilterEvent(evnt, params)
        }
        $xeTable.dispatchEvent('filter-change', params, evnt)
        $xeTable.closeFilter()
        $xeTable.updateFooter().then(() => {
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
            const headerWrapperRef = elemStore[`${fixed || 'main'}-header-wrapper`] || elemStore['main-header-wrapper']
            const headerWrapperElem = headerWrapperRef ? headerWrapperRef.value : null
            if (headerWrapperElem) {
              const filterBtnElem = headerWrapperElem.querySelector(`.vxe-header--column.${column.id} .vxe-filter--btn`) as HTMLElement
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
      setFilter (fieldOrColumn, options) {
        const column = handleFieldOrColumn($xeTable, fieldOrColumn)
        if (column && column.filters) {
          column.filters = toFilters(options || [])
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
            filterPrivateMethods.handleClearFilter(column)
          }
        } else {
          tableFullColumn.forEach(filterPrivateMethods.handleClearFilter)
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
      }
    }

    return { ...filterMethods, ...filterPrivateMethods }
  },
  setupGrid ($xeGrid) {
    return $xeGrid.extendTableMethods(tableFilterMethodKeys)
  }
})
