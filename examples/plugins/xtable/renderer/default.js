import VXETable from '../../../../packages/v-x-e-table'

// 创建一个简单的超链接渲染
VXETable.renderer.add('MyLink', {
  // 默认显示模板
  renderDefault (h, renderOpts, params) {
    const { row, column } = params
    const { events } = renderOpts
    return [
      <a class="link" onClick={ () => events.click(params) }>{row[column.property]}</a>
    ]
  }
})

VXETable.renderer.add('ProgressBar', {
  renderDefault (h, renderOpts, params) {
    const { row, column } = params
    return [
      h('span', {
        class: 'vxe-renderer--progress-bar'
      }, [
        h('span', {
          class: 'vxe-renderer--progress-bar-chart',
          style: {
            width: `${row[column.property]}%`
          }
        }),
        h('span', {
          class: 'vxe-renderer--progress-bar-label'
        }, row[column.property])
      ])
    ]
  }
})
