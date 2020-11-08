import VXETable from '../../../../packages/v-x-e-table'

// 创建一个简单的输入框渲染
VXETable.renderer.add('MyInput', {
  // 激活时自动聚焦
  autofocus: '.my-cell',
  // 可编辑激活模板
  renderEdit (renderOpts, params) {
    const { row, column } = params
    return [
      <vxe-input class="my-cell" v-model={ row[column.property] } prefix-icon="fa fa-user" suffix-icon="fa fa-search" clearable></vxe-input>
    ]
  },
  // 可编辑显示模板
  renderCell (renderOpts, params) {
    const { row, column } = params
    return [
      <span>{ row[column.property] }</span>
    ]
  }
})

// 创建一个下拉表格渲染
VXETable.renderer.add('EditDownTable', {
  autofocus: '.vxe-input--inner',
  renderEdit (renderOpts, params) {
    return [
      <edit-down-table params={ params }></edit-down-table>
    ]
  }
})

// 创建一个弹窗渲染
VXETable.renderer.add('EditPopupModal', {
  autofocus: '.vxe-input--inner',
  renderEdit (renderOpts, params) {
    return [
      <edit-popup-modal params={ params }></edit-popup-modal>
    ]
  }
})

// 创建一个复杂的组合渲染
VXETable.renderer.add('EditDownModal', {
  autofocus: '.vxe-input--inner',
  renderEdit (renderOpts, params) {
    return [
      <edit-down-modal params={ params } renderOpts={ renderOpts }></edit-down-modal>
    ]
  }
})
