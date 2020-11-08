import VXETable from '../../../../packages/v-x-e-table'

// 创建一个简单的超链接渲染
VXETable.renderer.add('MyLink', {
  // 默认显示模板
  renderDefault (renderOpts, params) {
    const { row, column } = params
    const { events = {} } = renderOpts
    return [
      <a class="link" onClick={ () => events.click(params) }>{row[column.property]}</a>
    ]
  }
})
