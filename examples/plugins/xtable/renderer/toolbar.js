import Vue from 'vue'
import VXETable from '../../../../packages/v-x-e-table'

import ToolbarInput from './components/ToolbarInput.vue'

Vue.component(ToolbarInput.name, ToolbarInput)

// 创建一个工具栏（仅用于简单示例，实际开发中应该封装成一个组件，不应该把复杂的渲染逻辑写在渲染器中）
VXETable.renderer.add('ToolbarInput', {
  renderButtons (h, renderOpts, params, context) {
    return [
      <toolbar-input formData={ params.data } params={ params } context={ context }></toolbar-input>
    ]
  }
})
