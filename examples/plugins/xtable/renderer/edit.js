import VXETable from '../../../../packages/v-x-e-table'

// 创建一个简单输入框渲染器
VXETable.renderer.add('MyInput', {
  // 可编辑激活模板
  renderEdit (h, renderOpts, { row, column }) {
    return [
      <input class="my-cell" text="text" value={ row[column.property] } onInput={ evnt => { row[column.property] = evnt.target.value }}/>
    ]
  },
  // 可编辑显示模板
  renderCell (h, renderOpts, { row, column }) {
    return [
      <span>{ row[column.property] }</span>
    ]
  // },
  // // 导出格式化值函数
  // editExportMethod ({ row, column }) {
  //   return `值为：${row[column.property]}`
  }
})
