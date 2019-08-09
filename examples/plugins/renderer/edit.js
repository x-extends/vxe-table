import VXETable from '../../../packages/v-x-e-table'

// 创建一个简单输入框渲染器
VXETable.renderer.add('MyInput', {
  // 激活后自动聚焦
  autofocus: '.my-cell',
  // 可编辑激活模板
  renderEdit (h, editRender, { row, column }) {
    return [
      <input class="my-cell" text="text" value={ row[column.property] } onInput={ evnt => { row[column.property] = evnt.target.value }}/>
    ]
  },
  // 可编辑显示模板
  renderCell (h, editRender, { row, column }) {
    return [
      <span>{ row[column.property] }</span>
    ]
  }
})
