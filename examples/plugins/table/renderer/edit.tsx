import { VXETable } from '../../../../packages/all'
import EditDownTable from './components/EditDownTable.vue'
import EditPopupModal from './components/EditPopupModal.vue'
import EditDownModal from './components/EditDownModal.vue'

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
      <EditDownTable params={ params }></EditDownTable>
    ]
  }
})

// 创建一个弹窗渲染
VXETable.renderer.add('EditPopupModal', {
  autofocus: '.vxe-input--inner',
  renderEdit (renderOpts, params) {
    return [
      <EditPopupModal params={ params }></EditPopupModal>
    ]
  }
})

// 创建一个复杂的组合渲染
VXETable.renderer.add('EditDownModal', {
  autofocus: '.vxe-input--inner',
  renderEdit (renderOpts, params) {
    return [
      <EditDownModal params={ params }></EditDownModal>
    ]
  }
})
