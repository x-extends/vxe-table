<template>
  <div>
    <p class="tip">
      行的动态样色、单元格动态样式，表头的动态样式、表尾的动态样式、可以通过设置 <table-api-link prop="cell-style"/>、<table-api-link prop="header-cell-style"/>、<table-api-link prop="row-style"/> ...等参数<br>
      <span class="red">（注：当自定义样式之后可能会覆盖表格的样式，比如选中行..等，记得自行处理好相关样式）</span>
    </p>

    <vxe-table
      border
      :header-cell-style="headerCellStyle"
      :row-style="rowStyle"
      :cell-style="cellStyle"
      :data="demo1.tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="attr1" title="Attr1"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { VxeTablePropTypes } from '../../../../types/index'

export default defineComponent({
  setup () {
    const demo1 = reactive({
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 24, address: 'Shanghai' }
      ]
    })

    const headerCellStyle: VxeTablePropTypes.HeaderCellStyle = ({ column }) => {
      if (column.property === 'name') {
        return {
          backgroundColor: '#f60',
          color: '#ffffff'
        }
      }
    }

    const rowStyle: VxeTablePropTypes.RowStyle = ({ rowIndex }) => {
      if ([2, 3, 5].includes(rowIndex)) {
        return {
          backgroundColor: 'red',
          color: '#ffffff'
        }
      }
    }

    const cellStyle: VxeTablePropTypes.CellStyle = ({ row, column }) => {
      if (column.property === 'sex') {
        if (row.sex >= '1') {
          return {
            backgroundColor: '#187'
          }
        } else if (row.age === 26) {
          return {
            backgroundColor: '#2db7f5'
          }
        }
      }
    }

    return {
      demo1,
      headerCellStyle,
      rowStyle,
      cellStyle,
      demoCodes: [
        `
        <vxe-table
          border
          :header-cell-style="headerCellStyle"
          :row-style="rowStyle"
          :cell-style="cellStyle"
          :data="demo1.tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="attr1" title="Attr1"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive } from 'vue'
        import { VxeTablePropTypes } from 'vxe-table'

        export default defineComponent({
          setup () {
            const demo1 = reactive({
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 24, address: 'Shanghai' }
              ]
            })

            const headerCellStyle: VxeTablePropTypes.HeaderCellStyle = ({ column }) => {
              if (column.property === 'name') {
                return {
                  backgroundColor: '#f60',
                  color: '#ffffff'
                }
              }
            }

            const rowStyle: VxeTablePropTypes.RowStyle = ({ rowIndex }) => {
              if ([2, 3, 5].includes(rowIndex)) {
                return {
                  backgroundColor: 'red',
                  color: '#ffffff'
                }
              }
            }

            const cellStyle: VxeTablePropTypes.CellStyle = ({ row, column }) => {
              if (column.property === 'sex') {
                if (row.sex >= '1') {
                  return {
                    backgroundColor: '#187'
                  }
                } else if (row.age === 26) {
                  return {
                    backgroundColor: '#2db7f5'
                  }
                }
              }
            }

            return {
              demo1,
              headerCellStyle,
              rowStyle,
              cellStyle
            }
          }
        })
        `
      ]
    }
  }
})
</script>
