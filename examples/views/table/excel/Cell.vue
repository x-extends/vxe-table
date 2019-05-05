<template>
  <div>
    <p>使用 vxe-excel 渲染 Excel 表格</p>

    <vxe-excel
      :columns="columns"
      :data.sync="tableData">
    </vxe-excel>
  </div>
</template>

<script>
export default {
  data () {
    let columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P']
    return {
      columns: [
        {
          type: 'index',
          width: 50,
          fixed: 'left',
          align: 'center',
          headerAlign: 'center'
        }
      ].concat(columns.map(name => {
        return {
          prop: name.toLowerCase(),
          label: name,
          width: 76,
          headerAlign: 'center',
          editRender: {
            name: 'input'
          }
        }
      })),
      tableData: Array.from(new Array(20)).map(() => {
        let item = {}
        columns.forEach(name => {
          item[name.toLowerCase()] = ''
        })
        return item
      })
    }
  }
}
</script>

<style>
/*使用 excel 需要的样式*/
/* .vxe-table-excel.vxe-table.size--excel .vxe-header--column {
  padding: 4px 0;
  font-size: 12px;
}
.vxe-table-excel.vxe-table.size--excel .vxe-body--column,
.vxe-table-excel.vxe-table.size--excel .vxe-body--column .vxe-cell {
  height: 28px;
  line-height: 28px;
}
.vxe-table-excel.vxe-table.size--excel .vxe-body--column.edit--selected .vxe-cell {
  line-height: 24px;
  padding: 0 2px;
}
.vxe-table-excel.vxe-table.size--excel .vxe-body--column.edit--actived .vxe-cell {
  padding: 0;
}
.vxe-table-excel .vxe-body--column .vxe-cell .vxe-input--wrapper {
  height: 26px;
}
.vxe-table-excel .vxe-body--column:first-child {
  background-color: #f8f8f9;
}
.vxe-table-excel .vxe-body--column .vxe-cell {
  padding: 0 4px;
}
.vxe-table-excel .vxe-body--column .vxe-cell .vxe-input--wrapper,
.vxe-table-excel .vxe-body--column .vxe-cell .vxe-input--wrapper .vxe-input,
.vxe-table-excel .vxe-body--column .vxe-cell .vxe-input--wrapper .vxe-textarea {
  height: 100%;
}
.vxe-table-excel .vxe-body--column.edit--selected .vxe-cell,
.vxe-table-excel .vxe-input--wrapper .vxe-input,
.vxe-table-excel .vxe-input--wrapper .vxe-input:focus,
.vxe-table-excel .vxe-input--wrapper .vxe-textarea,
.vxe-table-excel .vxe-input--wrapper .vxe-textarea:focus {
  border: 2px solid #217346;
}
.vxe-table-excel .vxe-input--wrapper .vxe-input,
.vxe-table-excel .vxe-input--wrapper .vxe-input:focus,
.vxe-table-excel .vxe-input--wrapper .vxe-textarea,
.vxe-table-excel .vxe-input--wrapper .vxe-textarea:focus {
  border-radius: 0;
} */
</style>
