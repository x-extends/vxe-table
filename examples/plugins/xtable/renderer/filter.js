import VXETable from '../../../../packages/v-x-e-table'
import XEUtils from 'xe-utils/methods/xe-utils'

// 创建一个支持输入的筛选器（仅用于简单示例，实际开发中应该封装成一个组件，不应该把复杂的渲染逻辑写在渲染器中）
VXETable.renderer.add('MyFilter', {
  // 筛选模板
  renderFilter (h, filterRender, params, context) {
    let { column } = params
    return column.filters.map(item => {
      return <input
        type="text"
        value={ item.data }
        onInput={ evnt => {
          item.data = evnt.target.value
          let checked = !!item.data
          context.changeOption(evnt, checked, item)
        } }/>
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

// 创建一个复杂的渲染器（仅用于简单示例，实际开发中应该封装成一个组件，不应该把复杂的渲染逻辑写在渲染器中）
VXETable.renderer.add('MyComplexFilter', {
  // 不显示底部按钮，使用自定义的按钮
  isFooter: false,
  // 筛选模板
  renderFilter (h, filterRender, params, context) {
    const { column } = params
    return column.filters.map((item, index) => {
      const { data } = item
      return <div class="cmplex-filter">
        <div class="f-type">
          <vxe-radio v-model={ data.type } name="fType" label="has">包含</vxe-radio>
          <vxe-radio v-model={ data.type } name="fType" label="eq">等于</vxe-radio>
          <vxe-radio v-model={ data.type } name="fType" label="gt">大于</vxe-radio>
          <vxe-radio v-model={ data.type } name="fType" label="lt">小于</vxe-radio>
        </div>
        <div class="f-name">
          <vxe-input v-model={ data.name } type="text" placeholder="请输入名称" onInput={ e => { context.changeOption(e, !!data.name, item) } }></vxe-input>
        </div>
        <div class="f-iscase">
          <vxe-checkbox v-model={ data.isCase }>不区分大小写</vxe-checkbox>
        </div>
        <div class="f-footer">
          <vxe-button type="primary" onClick={ e => { context.confirmFilter() } }>确认</vxe-button>
          <vxe-button onClick={ e => { context.resetFilter() } }>重置</vxe-button>
        </div>
      </div>
    })
  },
  // 筛选方法
  filterMethod ({ option, row, column }) {
    let cellValue = XEUtils.get(row, column.property)
    let { type, name, isCase } = option.data
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
