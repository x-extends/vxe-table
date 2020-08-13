import Vue from 'vue'
import VXETable from '../../../../packages/v-x-e-table'

import EditDownTable from './components/EditDownTable.vue'
import EditPopupModal from './components/EditPopupModal.vue'
import EditDownModal from './components/EditDownModal.vue'

Vue.component(EditDownTable.name, EditDownTable)
Vue.component(EditPopupModal.name, EditPopupModal)
Vue.component(EditDownModal.name, EditDownModal)

// 创建一个简单的输入框渲染
VXETable.renderer.add('MyInput', {
  // 激活时自动聚焦
  autofocus: '.my-cell',
  // 可编辑激活模板
  renderEdit (h, renderOpts, { row, column }) {
    return [
      <vxe-input class="my-cell" v-model={ row[column.property] } prefix-icon="fa fa-user" suffix-icon="fa fa-search" clearable></vxe-input>
    ]
  },
  // 可编辑显示模板
  renderCell (h, renderOpts, { row, column }) {
    return [
      <span>{ row[column.property] }</span>
    ]
  }
})

// 创建一个下拉表格渲染
VXETable.renderer.add('EditDownTable', {
  autofocus: '.vxe-input--inner',
  renderEdit (h, renderOpts, params) {
    return [
      <edit-down-table params={ params }></edit-down-table>
    ]
  }
})

// 创建一个弹窗渲染
VXETable.renderer.add('EditPopupModal', {
  autofocus: '.vxe-input--inner',
  renderEdit (h, renderOpts, params) {
    return [
      <edit-popup-modal params={ params }></edit-popup-modal>
    ]
  }
})

// 创建一个复杂的组合渲染
VXETable.renderer.add('EditDownModal', {
  autofocus: '.vxe-input--inner',
  renderEdit (h, renderOpts, params) {
    return [
      <edit-down-modal params={ params } renderOpts={ renderOpts }></edit-down-modal>
    ]
  }
})
