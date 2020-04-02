import Vue from 'vue'
import VXETable from '../../../../packages/v-x-e-table'

import ToolbarInput from './components/ToolbarInput.vue'

Vue.component(ToolbarInput.name, ToolbarInput)

// 创建一个简单的工具栏-按钮渲染
VXETable.renderer.add('ToolbarButtonRefresh', {
  renderButton (h, renderOpts, params) {
    const { events } = renderOpts
    const { button } = params
    return [
      <vxe-button onClick={ () => { events.click(button) } }>自定义按钮</vxe-button>
    ]
  }
})
