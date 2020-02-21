import VXETable from '../../../../packages/v-x-e-table'

// 创建一个空内容渲染器
VXETable.renderer.add('NotData', {
  // 空内容模板
  renderEmpty () {
    return [
      <span>
        <img src="static/other/img1.gif"/>
        <p>亲，没有更多数据了！</p>
      </span>
    ]
  }
})
