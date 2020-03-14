import VXETable from '../../../../packages/v-x-e-table'

// 创建一个简单输入框渲染器
VXETable.renderer.add('MyInput', {
  // 可编辑激活模板
  renderEdit (h, renderOpts, { row, column }) {
    return [
      <input class="my-cell" text="text" v-model={ row[column.property] } />
    ]
  },
  // 可编辑显示模板
  renderCell (h, renderOpts, { row, column }) {
    return [
      <span>{ row[column.property] }</span>
    ]
  // },
  // // 单元格导出函数
  // editCellExportMethod ({ row, column }) {
  //   return `值为：${row[column.property]}`
  // },
  // // 表尾单元格导出函数
  // footerCellExportMethod ({ items, itemIndex, column }) {
  //   return `合计为：${items[itemIndex]}`
  }
})
