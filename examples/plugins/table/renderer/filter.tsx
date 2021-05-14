import { VXETable } from '../../../../packages/all'

// 创建一个简单的输入框筛选
VXETable.renderer.add('FilterInput', {
  // 筛选模板
  renderFilter (renderOpts, params) {
    return [
      <filter-input params={ params }></filter-input>
    ]
  },
  // 重置数据方法
  filterResetMethod (params) {
    const { options } = params
    options.forEach((option) => {
      option.data = ''
    })
  },
  // 重置筛选复原方法（当未点击确认时，该选项将被恢复为默认值）
  filterRecoverMethod ({ option }) {
    option.data = ''
  },
  // 筛选方法
  filterMethod (params) {
    const { option, row, column } = params
    const { data } = option
    const cellValue = row[column.property]
    if (cellValue) {
      return cellValue.indexOf(data) > -1
    }
    return false
  }
})

// 创建一个条件的渲染器
VXETable.renderer.add('FilterComplex', {
  // 不显示底部按钮，使用自定义的按钮
  showFilterFooter: false,
  // 筛选模板
  renderFilter (renderOpts, params) {
    return [
      <filter-complex params={ params }></filter-complex>
    ]
  },
  // 重置数据方法
  filterResetMethod (params) {
    const { options } = params
    options.forEach((option) => {
      option.data = { type: 'has', name: '' }
    })
  },
  // 筛选数据方法
  filterMethod (params) {
    const { option, row, column } = params
    const cellValue = row[column.property]
    const { name } = option.data
    if (cellValue) {
      return cellValue.indexOf(name) > -1
    }
    return false
  }
})

// 创建一个支持列内容的筛选
VXETable.renderer.add('FilterContent', {
  // 不显示底部按钮，使用自定义的按钮
  showFilterFooter: false,
  // 筛选模板
  renderFilter (renderOpts, params) {
    return [
      <filter-content params={ params }></filter-content>
    ]
  },
  // 重置数据方法
  filterResetMethod (params) {
    const { options } = params
    options.forEach((option) => {
      option.data = { vals: [], sVal: '' }
    })
  },
  // 筛选数据方法
  filterMethod (params) {
    const { option, row, column } = params
    const { vals } = option.data
    const cellValue = row[column.property]
    return vals.includes(cellValue)
  }
})

// 创建一个实现Excel的筛选器
VXETable.renderer.add('FilterExcel', {
  // 不显示底部按钮，使用自定义的按钮
  showFilterFooter: false,
  // 筛选模板
  renderFilter (renderOpts, params) {
    return [
      <filter-excel params={ params }></filter-excel>
    ]
  },
  // 重置数据方法
  filterResetMethod (params) {
    const { options } = params
    options.forEach((option) => {
      option.data = { vals: [], sVal: '', fMenu: '', f1Type: '', f1Val: '', fMode: 'and', f2Type: '', f2Val: '' }
    })
  },
  // 筛选数据方法
  filterMethod (params) {
    const { option, row, column } = params
    const cellValue = row[column.property]
    const { vals, f1Type, f1Val } = option.data
    if (cellValue) {
      if (f1Type) {
        return cellValue.indexOf(f1Val) > -1
      } else if (vals.length) {
        // 通过指定值筛选
        return vals.includes(cellValue)
      }
    }
    return false
  }
})
