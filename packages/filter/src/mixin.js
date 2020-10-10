import XEUtils from 'xe-utils/ctor'
import { UtilTools, DomTools } from '../../tools'
import VXETable from '../../v-x-e-table'

export default {
  methods: {
    /**
     * v3 废弃 filter 方法，被 setFilter 取代
     * 手动调用筛选的方法
     * 如果不传回调则返回一个选项列表的 Promise 对象
     * 如果传回调则通过回调返回的值更新选项列表，并返回一个新选项列表的 Promise 对象
     * @param {String} field 字段名
     * @param {Function} callback 重置列表的回调函数，返回新的选项列表
     */
    _filter (field, callback) {
      UtilTools.warn('vxe.error.delFunc', ['filter', 'setFilter'])
      const column = this.getColumnByField(field)
      if (column) {
        const options = column.filters
        if (options && callback) {
          const rest = callback(options)
          if (XEUtils.isArray(rest)) {
            column.filters = UtilTools.getFilters(rest)
          }
          return this.$nextTick().then(() => options)
        }
      }
      return this.$nextTick()
    },
    /**
     * 修改筛选条件列表
     * @param {ColumnInfo} column 列
     * @param {Array} options 选项
     */
    _setFilter (column, options) {
      if (column.filters && options) {
        column.filters = UtilTools.getFilters(options)
      }
      return this.$nextTick()
    },
    checkFilterOptions () {
      const { filterStore } = this
      filterStore.isAllSelected = filterStore.options.every(item => item._checked)
      filterStore.isIndeterminate = !filterStore.isAllSelected && filterStore.options.some(item => item._checked)
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
      const { $refs, filterStore } = this
      if (filterStore.column === column && filterStore.visible) {
        filterStore.visible = false
      } else {
        const bodyElem = $refs.tableBody.$el
        const { target: targetElem, pageX } = evnt
        const { visibleWidth } = DomTools.getDomNode()
        Object.assign(filterStore, {
          args: params,
          multiple: column.filterMultiple,
          options: column.filters,
          column,
          style: null,
          visible: true
        })
        // 复原状态
        filterStore.options.forEach(option => {
          option._checked = option.checked
        })
        this.checkFilterOptions()
        this.hasFilterPanel = true
        this.$nextTick(() => {
          const filterWrapperElem = $refs.filterWrapper.$el
          const filterWidth = filterWrapperElem.offsetWidth
          const centerWidth = filterWidth / 2
          const minMargin = 32
          let left, right
          const style = {
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
    /**
     * 确认筛选
     * 当筛选面板中的确定按钮被按下时触发
     * @param {Event} evnt 事件
     */
    confirmFilterEvent (evnt) {
      const { visibleColumn, filterStore, remoteFilter, filterOpts, scrollXLoad, scrollYLoad } = this
      const { column } = filterStore
      const { property } = column
      const values = []
      const datas = []
      column.filters.forEach(item => {
        if (item.checked) {
          values.push(item.value)
          datas.push(item.data)
        }
      })
      filterStore.visible = false
      // 如果是服务端筛选，则跳过本地筛选处理
      if (!(filterOpts.remote || remoteFilter)) {
        this.handleTableData(true)
        this.checkSelectionStatus()
      }
      const filterList = []
      visibleColumn.filter(column => {
        const { property, filters } = column
        const valueList = []
        const dataList = []
        if (filters && filters.length) {
          filters.forEach(item => {
            if (item.checked) {
              valueList.push(item.value)
              dataList.push(item.data)
            }
          })
          // 在 v3.0 中废弃 prop
          filterList.push({ column, property, field: property, prop: property, values: valueList, datas: dataList })
        }
      })
      // 在 v3.0 中废弃 prop
      this.emitEvent('filter-change', { column, property, field: property, prop: property, values, datas, filters: filterList }, evnt)
      this.updateFooter()
      if (scrollXLoad || scrollYLoad) {
        this.clearScroll()
        if (scrollYLoad) {
          this.updateScrollYSpace()
        }
      }
      this.closeFilter()
      this.$nextTick(() => {
        this.recalculate()
        this.updateCellAreas()
      })
    },
    handleClearFilter (column) {
      if (column) {
        const { filters, filterRender } = column
        if (filters) {
          filters.forEach(item => {
            item._checked = false
            item.checked = false
            item.data = XEUtils.clone(item.resetValue, true)
          })
          const compConf = filterRender ? VXETable.renderer.get(filterRender.name) : null
          if (compConf && compConf.filterResetMethod) {
            compConf.filterResetMethod({ options: filters, column, $table: this })
          }
        }
      }
    },
    /**
     * 重置筛选
     * 当筛选面板中的重置按钮被按下时触发
     * @param {Event} evnt 事件
     */
    resetFilterEvent (evnt) {
      this.handleClearFilter(this.filterStore.column)
      this.confirmFilterEvent(evnt)
    },
    /**
     * 清空指定列的筛选条件
     * 如果为空则清空所有列的筛选条件
     * @param {String} column 列
     */
    _clearFilter (column) {
      if (arguments.length && XEUtils.isString(column)) {
        column = this.getColumnByField(column)
      }
      const filterStore = this.filterStore
      if (column) {
        this.handleClearFilter(column)
      } else {
        this.visibleColumn.forEach(this.handleClearFilter)
      }
      if (!column || column !== filterStore.column) {
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
      return this.updateData()
    }
  }
}
