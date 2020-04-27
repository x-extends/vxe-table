import XEUtils from 'xe-utils/methods/xe-utils'
import { UtilTools } from '../../tools'

export default {
  methods: {
    _openCustom () {
      const { customConfig, customOpts, collectColumn } = this
      const checkMethod = customOpts.checkMethod
      const customColumns = collectColumn.slice(0)
      if (!customConfig) {
        UtilTools.error('vxe.error.reqProp', ['custom-config'])
      }
      // 默认全部选中
      XEUtils.eachTree(customColumns, (column, index, items, path, parent) => {
        const isColGroup = column.children && column.children.length
        if (isColGroup || column.property || column.type === 'seq') {
          column.checked = column.visible
          column.halfChecked = false
          column.disabled = (parent && parent.disabled) || (checkMethod ? !checkMethod({ column }) : false)
        }
      })
      // 更新条件
      Object.assign(this.customStore, {
        columns: customColumns,
        visible: true
      })
      return this.$nextTick()
    }
  }
}
