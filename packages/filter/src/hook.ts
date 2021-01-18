import { nextTick } from 'vue'
import XEUtils from 'xe-utils/ctor'
import { UtilTools, DomTools } from '../../tools'
import VXETable from '../../v-x-e-table'

import { VxeGlobalHooksHandles, TableFilterMethods, TableFilterPrivateMethods } from '../../../types/vxe-table'

const { toFilters } = UtilTools

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
          const { visibleWidth } = DomTools.getDomNode()
          internalData._currFilterParams = params
          Object.assign(filterStore, {
            multiple: column.filterMultiple,
            options: column.filters,
            column,
            style: null
          })
          // 复原状态
          filterStore.options.forEach((option: any) => {
            option._checked = option.checked
          })
          this.checkFilterOptions()
          filterStore.visible = true
          initStore.filter = true
          nextTick(() => {
            const tableBody = refTableBody.value
            const bodyElem = tableBody.$el as HTMLDivElement
            const tableFilter = refTableFilter.value
            const filterWrapperElem = tableFilter ? tableFilter.$el : null
            const filterWidth = filterWrapperElem ? filterWrapperElem.offsetWidth : 0
            const centerWidth = filterWidth / 2
            const minMargin = 32
            let left, right
            const style: any = {
              top: `${targetElem.offsetTop + targetElem.offsetParent.offsetTop + targetElem.offsetHeight + 8}px`
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
              style.left = `${Math.max(minMargin, left)}px`
            } else if (right) {
              const overflowWidth = (pageX + filterWidth - centerWidth + minMargin) - visibleWidth
              if (overflowWidth > 0) {
                right += overflowWidth
              }
              style.right = `${right}px`
            }
            filterStore.style = style
          })
        }
      },
      handleClearFilter (column) {
        if (column) {
          const { filters, filterRender } = column
          if (filters) {
            const compConf = filterRender ? VXETable.renderer.get(filterRender.name) : null
            const filterResetMethod = compConf ? compConf.filterResetMethod : null
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
        const column = $xetable.handleFieldOrColumn(fieldOrColumn)
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
          column = $xetable.handleFieldOrColumn(fieldOrColumn)
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
        const { visibleColumn } = internalData
        const filterList: any[] = []
        visibleColumn.filter((column: any) => {
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
