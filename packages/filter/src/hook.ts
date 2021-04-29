import { nextTick } from 'vue'
import XEUtils from 'xe-utils'
import { VXETable } from '../../v-x-e-table'
import { toFilters, handleFieldOrColumn } from '../../table/src/util'
import { getDomNode } from '../../tools/dom'

import { VxeGlobalHooksHandles, TableFilterMethods, TableFilterPrivateMethods } from '../../../types/all'

const tableFilterMethodKeys: (keyof TableFilterMethods)[] = ['setFilter', 'clearFilter', 'getCheckedFilters']

const tableFilterHook: VxeGlobalHooksHandles.HookOptions = {
  setupTable ($xetable) {
    const { reactData, internalData } = $xetable
    const { refTableBody, refTableFilter } = $xetable.getRefMaps()
    const { computeFilterOpts } = $xetable.getComputeMaps()

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
          const compConf = filterRender ? VXETable.renderer.get(filterRender.name) : null
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
                filterRecoverMethod({ option, column, $table: $xetable })
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
            let maxHeight = null
            if (filterHeight >= bodyElem.clientHeight) {
              maxHeight = bodyElem.clientHeight - (filterFootElem ? filterFootElem.offsetHeight : 0) - (filterHeadElem ? filterHeadElem.offsetHeight : 0)
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
      },
      handleClearFilter (column) {
        if (column) {
          const { filters, filterRender } = column
          if (filters) {
            const compConf = filterRender ? VXETable.renderer.get(filterRender.name) : null
            const filterResetMethod = column.filterResetMethod || (compConf ? compConf.filterResetMethod : null)
            filters.forEach((item: any) => {
              item._checked = false
              item.checked = false
              if (!filterResetMethod) {
                item.data = XEUtils.clone(item.resetValue, true)
              }
            })
            if (filterResetMethod) {
              filterResetMethod({ options: filters, column, $table: $xetable })
            }
          }
        }
      }
    }

    const filterMethods: TableFilterMethods = {
      /**
       * 修改筛选条件列表
       * @param {ColumnInfo} fieldOrColumn 列或字段名
       * @param {Array} options 选项
       */
      setFilter (fieldOrColumn, options) {
        const column = handleFieldOrColumn($xetable, fieldOrColumn)
        if (column && column.filters && options) {
          column.filters = toFilters(options)
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
          column = handleFieldOrColumn($xetable, fieldOrColumn)
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
          return $xetable.updateData()
        }
        return nextTick()
      },
      getCheckedFilters () {
        const { tableFullColumn } = internalData
        const filterList: any[] = []
        tableFullColumn.filter((column: any) => {
          const { property, filters } = column
          const valueList: any[] = []
          const dataList: any[] = []
          if (filters && filters.length) {
            filters.forEach((item: any) => {
              if (item.checked) {
                valueList.push(item.value)
                dataList.push(item.data)
              }
            })
            if (valueList.length) {
              filterList.push({ column, property, values: valueList, datas: dataList })
            }
          }
        })
        return filterList
      }
    }

    return { ...filterMethods, ...filterPrivateMethods }
  },
  setupGrid ($xegrid) {
    return $xegrid.extendTableMethods(tableFilterMethodKeys)
  }
}

export default tableFilterHook
