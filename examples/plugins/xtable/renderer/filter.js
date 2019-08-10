import VXETable from '../../../../packages/v-x-e-table'
import XEUtils from 'xe-utils'

// 创建一个支持输入的筛选器
VXETable.renderer.add('MyFilter', {
  // 筛选模板
  renderFilter (h, filterRender, params, context) {
    let { column } = params
    return column.filters.map(item => {
      return h('input', {
        attrs: {
          type: 'text'
        },
        domProps: {
          value: item.data
        },
        on: {
          input (evnt) {
            item.data = evnt.target.value
            let checked = !!item.data
            context.changeOption(evnt, checked, item)
          }
        }
      })
    })
  },
  // 筛选方法
  filterMethod ({ option, row, column }) {
    let { data } = option
    let cellValue = XEUtils.get(row, column.property)
    /* eslint-disable eqeqeq */
    return cellValue == data
  }
})
