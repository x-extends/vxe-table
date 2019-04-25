import XEUtils from 'xe-utils'
import HandleFunc from '../tool/handle.js'

export default {
  name: 'VxeColumnCheckbox',
  props: {
    // 列属性（如果配置了该字段绑定，性能则会提高一倍）
    prop: String,
    // 列宽度
    width: [Number, String],
    // 列最小宽度，把剩余宽度按比例分配
    minWidth: [Number, String],
    // 将列固定在左侧或者右侧
    fixed: String,
    // 列对其方式
    align: { type: String, default: 'center' },
    // 表头对齐方式
    headerAlign: { type: String, default: 'center' }
  },
  inject: [
    '$table'
  ],
  data () {
    return {
      type: 'checkbox',
      columnConfig: null
    }
  },
  created () {
    this.columnConfig = HandleFunc.getColumnConfig(this, {
      renderCell: this.prop ? this.renderCellByprop : this.renderCell
    })
  },
  mounted () {
    HandleFunc.assemColumn(this)
  },
  render (h) {
    return h('div')
  },
  methods: {
    /**
     * 渲染表头
     */
    renderHeader (h, params) {
      let { $table } = this
      let { isHidden } = params
      let options = {
        attrs: {
          type: this.type
        }
      }
      if (!isHidden) {
        options.domProps = {
          checked: $table.isAllSelected
        }
        options.on = {
          change (evnt) {
            $table.checkboxAllEvent(evnt.target.checked)
          }
        }
      }
      return [
        h('label', {
          class: ['vxe-checkbox']
        }, [
          h('input', options),
          h('span')
        ])
      ]
    },
    /**
     * 渲染单元格
     */
    renderCell (h, params) {
      let { $table } = this
      let { row, isHidden } = params
      let options = {
        attrs: {
          type: this.type
        }
      }
      if (!isHidden) {
        options.domProps = {
          checked: $table.selection.indexOf(row) > -1
        }
        options.on = {
          change: evnt => {
            $table.checkboxRowEvent(evnt, params)
            HandleFunc.emitEvent(this, 'change', [$table.selection, row])
          }
        }
      }
      return [
        h('label', {
          class: ['vxe-checkbox']
        }, [
          h('input', options),
          h('span')
        ])
      ]
    },
    /**
     * 渲染单元格（绑定属性的方式）
     */
    renderCellByprop (h, params) {
      let { $table } = this
      let { row, column, isHidden } = params
      let options = {
        attrs: {
          type: this.type
        }
      }
      if (!isHidden) {
        options.domProps = {
          checked: XEUtils.get(row, column.property)
        }
        options.on = {
          change: evnt => {
            $table.checkboxRowEvent(evnt, params)
          }
        }
      }
      return [
        h('label', {
          class: ['vxe-checkbox']
        }, [
          h('input', options),
          h('span')
        ])
      ]
    }
  }
}
