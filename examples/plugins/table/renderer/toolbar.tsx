import VXETable from '../../../../packages/v-x-e-table'

// 创建一个简单的工具栏-按钮渲染
VXETable.renderer.add('ToolbarButtonRefresh', {
  renderButton (renderOpts, params) {
    const { events = {} } = renderOpts
    const { button } = params
    return [
      <vxe-button onClick={ () => { events.click(button) } }>自定义按钮</vxe-button>
    ]
  }
})
