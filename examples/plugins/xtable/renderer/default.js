import VXETable from '../../../../packages/v-x-e-table'

// 创建一个超HTML标签渲染器
VXETable.renderer.add('html', {
  // 默认显示模板
  renderDefault (h, cellRender, params) {
    return [
      <span domPropsInnerHTML={ params.row[params.column.property] || '&#12288;' }></span>
    ]
  }
})

// 创建一个超链接渲染器
VXETable.renderer.add('MyLink', {
  // 默认显示模板
  renderDefault (h, cellRender, params) {
    let { row, column } = params
    let { events } = cellRender
    return [
      <a class="link" onClick={ () => events.click(params) }>{row[column.property]}</a>
    ]
  }
})
