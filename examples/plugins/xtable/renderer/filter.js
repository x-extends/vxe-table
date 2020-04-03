import Vue from 'vue'
import VXETable from '../../../../packages/v-x-e-table'
import XEUtils from 'xe-utils'

import FilterInput from './components/FilterInput.vue'
import FilterContent from './components/FilterContent.vue'
import FilterComplex from './components/FilterComplex.vue'
import FilterExcel from './components/FilterExcel.vue'

Vue.component(FilterInput.name, FilterInput)
Vue.component(FilterContent.name, FilterContent)
Vue.component(FilterComplex.name, FilterComplex)
Vue.component(FilterExcel.name, FilterExcel)

// 创建一个简单的输入框筛选
VXETable.renderer.add('FilterInput', {
  // 筛选模板
  renderFilter (h, renderOpts, params) {
    return [
      <filter-input params={ params }></filter-input>
    ]
  },
  // 筛选方法
  filterMethod ({ option, row, column }) {
    const { data } = option
    const cellValue = XEUtils.get(row, column.property)
    return XEUtils.toString(cellValue).indexOf(data) > -1
  }
})

// 创建一个支持列内容的筛选
VXETable.renderer.add('FilterContent', {
  // 不显示底部按钮，使用自定义的按钮
  isFooter: false,
  // 筛选模板
  renderFilter (h, renderOpts, params) {
    return [
      <filter-content params={ params }></filter-content>
    ]
  },
  // 重置数据方法
  filterResetMethod ({ options }) {
    options.forEach(option => {
      option.data = { vals: [], sVal: '' }
    })
  },
  // 筛选数据方法
  filterMethod ({ option, row, column }) {
    const { vals } = option.data
    const cellValue = XEUtils.get(row, column.property)
    /* eslint-disable eqeqeq */
    return vals.some(val => val == cellValue)
  }
})

// 创建一个条件的渲染器
VXETable.renderer.add('FilterComplex', {
  // 不显示底部按钮，使用自定义的按钮
  isFooter: false,
  // 筛选模板
  renderFilter (h, renderOpts, params) {
    return [
      <filter-complex params={ params }></filter-complex>
    ]
  },
  // 重置数据方法
  filterResetMethod ({ options }) {
    options.forEach(option => {
      option.data = { type: 'has', isCase: true, name: '' }
    })
  },
  // 筛选数据方法
  filterMethod ({ option, row, column }) {
    let cellValue = XEUtils.get(row, column.property)
    const { type, isCase } = option.data
    let { name } = option.data
    if (cellValue) {
      if (isCase) {
        cellValue = cellValue.toLowerCase()
        name = name.toLowerCase()
      }
      switch (type) {
        case 'has':
          return cellValue.indexOf(name) > -1
        case 'eq':
          /* eslint-disable eqeqeq */
          return cellValue == name
        case 'gt':
          return cellValue > name
        case 'lt':
          return cellValue < name
      }
    }
    return false
  }
})

// 创建一个实现Excel的筛选器
VXETable.renderer.add('FilterExcel', {
  // 不显示底部按钮，使用自定义的按钮
  isFooter: false,
  // 筛选模板
  renderFilter (h, renderOpts, params) {
    return [
      <filter-excel params={ params }></filter-excel>
    ]
  },
  // 重置数据方法
  filterResetMethod ({ options }) {
    options.forEach(option => {
      option.data = { vals: [], sVal: '', fMenu: '', f1Type: '', f1Val: '', fMode: 'and', f2Type: '', f2Val: '' }
    })
  },
  // 筛选数据方法
  filterMethod ({ option, row, column }) {
    const cellValue = XEUtils.get(row, column.property)
    const { vals, f1Type, f1Val, fMode, f2Type, f2Val } = option.data
    if (cellValue) {
      if (f1Type || f2Type) {
        // 通过筛选条件
        const calculate = (type, val) => {
          switch (type) {
            case '1':
              return cellValue == val
            case '2':
              return cellValue != val
            case '3':
              return cellValue > val
            case '4':
              return cellValue > val || cellValue == val
            case '5':
              return cellValue < val
            case '6':
              return cellValue < val || cellValue == val
            case '7':
              return cellValue.indexOf(val) === 0
            case '8':
              return cellValue.indexOf(val) !== 0
            case '9':
              return cellValue.lastIndexOf(val) === 0
            case '10':
              return cellValue.lastIndexOf(val) === -1
            case '11':
              return cellValue.indexOf(val) > -1
            case '12':
              return cellValue.indexOf(val) === -1
          }
          return true
        }
        const f1Rest = calculate(f1Type, f1Val)
        const f2Rest = calculate(f2Type, f2Val)
        if (fMode === 'and') {
          return f1Rest && f2Rest
        }
        return f1Rest || f2Rest
      } else if (vals.length) {
        // 通过指定值筛选
        return vals.includes(cellValue)
      }
    }
    return false
  }
})
