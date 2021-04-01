import VXETable from '../../../../packages/v-x-e-table'

// 创建一个简单的工具栏-左侧按钮渲染
VXETable.renderer.add('ToolbarButtonDownload', {
  renderToolbarButton (h, renderOpts, params) {
    const { events = {} } = renderOpts
    const { button } = params
    return [
      <vxe-button circle icon="fa fa-cloud-download" onClick={
        () => {
          events.click(button)
        }
      }></vxe-button>
    ]
  }
})

// 创建一个简单的工具栏-右侧工具渲染
VXETable.renderer.add('ToolbarToolPrint', {
  renderToolbarTool (h, renderOpts, params) {
    const { $table } = params
    return [
      <vxe-button circle icon="fa fa-print" onClick={
        () => {
          $table.print()
        }
      }></vxe-button>
    ]
  }
})
