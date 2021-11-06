<template>
  <div>
    <p class="tip">
      通过调用 <table-api-link prop="print"/> 函数打印表格，还可以通过 <table-api-link prop="style"/> 设置打印的样式
      <span class="red">（注：打印的页数有限，如果超大数据量请关闭打印功能或者分页打印）</span>
    </p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="printEvent1">打印</vxe-button>
        <vxe-button @click="printSelectEvent">打印选中</vxe-button>
        <vxe-button @click="printEvent2">高级打印</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      show-footer
      ref="xTable"
      height="500"
      :print-config="tablePrint"
      :footer-method="footerMethod"
      :data="tableData">
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-colgroup title="Group1">
        <vxe-column field="name" title="Name"></vxe-column>
        <vxe-colgroup title="Group2">
          <vxe-column field="role" title="Role"></vxe-column>
          <vxe-column field="age" title="Age"></vxe-column>
        </vxe-colgroup>
        <vxe-column field="address" title="Address"></vxe-column>
      </vxe-colgroup>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
        { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
      ],
      tablePrint: {
        // 自定义打印的样式示例
        style: `
        .vxe-table {
          color: #000000; // 修改表格默认颜色
          font-size: 12px; // 修改表格默认字体大小
          font-family: "Microsoft YaHei",微软雅黑,"MicrosoftJhengHei",华文细黑,STHeiti,MingLiu; // 修改表格默认字体
        }
        .vxe-table,
        .vxe-table thead th,
        .vxe-table tbody td,
        .vxe-table tfoot td  {
          border-color: #000000; // 修改表格边框颜色
        }
        .vxe-table thead th {
          color: green; // 修改表头字体颜色
          font-size: 14px; // 修改表头默认字体大小
        }
        .vxe-table tfoot td {
          color: red; // 修改表尾字体颜色
        }
        `
      },
      demoCodes: [
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-button @click="printEvent1">打印</vxe-button>
            <vxe-button @click="printSelectEvent">打印选中</vxe-button>
            <vxe-button @click="printEvent2">高级打印</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          show-footer
          ref="xTable"
          height="500"
          :print-config="tablePrint"
          :footer-method="footerMethod"
          :data="tableData">
          <vxe-column type="checkbox" width="60"></vxe-column>
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-colgroup title="Group1">
            <vxe-column field="name" title="Name"></vxe-column>
            <vxe-colgroup title="Group2">
              <vxe-column field="role" title="Role"></vxe-column>
              <vxe-column field="age" title="Age"></vxe-column>
            </vxe-colgroup>
            <vxe-column field="address" title="Address"></vxe-column>
          </vxe-colgroup>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
                { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
                { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
              ],
              tablePrint: {
                // 自定义打印的样式示例
                style: \`
                .vxe-table {
                  color: #000000; // 修改表格默认颜色
                  font-size: 12px; // 修改表格默认字体大小
                  font-family: "Microsoft YaHei",微软雅黑,"MicrosoftJhengHei",华文细黑,STHeiti,MingLiu; // 修改表格默认字体
                }
                .vxe-table,
                .vxe-table thead th,
                .vxe-table tbody td,
                .vxe-table tfoot td  {
                  border-color: #000000; // 修改表格边框颜色
                }
                .vxe-table thead th {
                  color: green; // 修改表头字体颜色
                  font-size: 14px; // 修改表头默认字体大小
                }
                .vxe-table tfoot td {
                  color: red; // 修改表尾字体颜色
                }
                \`
              }
            }
          },
          methods: {
            printEvent () {
              this.$refs.xTable.print()
            },
            printSelectEvent () {
              this.$refs.xTable.print({
                data: this.$refs.xTable.getCheckboxRecords()
              })
            },
            exportDataEvent () {
              this.$refs.xTable.openExport()
            },
            meanNum (list, field) {
              let count = 0
              list.forEach(item => {
                count += Number(item[field])
              })
              return count / list.length
            },
            sumNum (list, field) {
              let count = 0
              list.forEach(item => {
                count += Number(item[field])
              })
              return count
            },
            footerMethod ({ columns, data }) {
              const footerData = [
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '平均'
                  }
                  if (['age', 'rate'].includes(column.property)) {
                    return this.meanNum(data, column.property)
                  }
                  return null
                }),
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '和值'
                  }
                  if (['age', 'rate'].includes(column.property)) {
                    return this.sumNum(data, column.property)
                  }
                  return null
                })
              ]
              return footerData
            }
          }
        }
        `
      ]
    }
  },
  methods: {
    printEvent1 () {
      this.$refs.xTable.print()
    },
    printSelectEvent () {
      this.$refs.xTable.print({
        data: this.$refs.xTable.getCheckboxRecords()
      })
    },
    printEvent2 () {
      this.$refs.xTable.openPrint()
    },
    meanNum (list, field) {
      let count = 0
      list.forEach(item => {
        count += Number(item[field])
      })
      return count / list.length
    },
    sumNum (list, field) {
      let count = 0
      list.forEach(item => {
        count += Number(item[field])
      })
      return count
    },
    footerMethod ({ columns, data }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '平均'
          }
          if (['age', 'rate'].includes(column.property)) {
            return this.meanNum(data, column.property)
          }
          return null
        }),
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '和值'
          }
          if (['age', 'rate'].includes(column.property)) {
            return this.sumNum(data, column.property)
          }
          return null
        })
      ]
      return footerData
    }
  }
}
</script>
