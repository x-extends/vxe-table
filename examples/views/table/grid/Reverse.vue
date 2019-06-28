<template>
  <div>
    <p>反转表格，只需要将 columns 和 data 数据进行反转</p>

    <vxe-grid
      border
      class="reverse-table"
      :show-header="false"
      :columns="tableColumn"
      :data.sync="tableData"></vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
      <code class="scss">{{ demoCodes[2] }}</code>
    </pre>

    <p>更多配置</p>

    <vxe-grid
      border
      show-overflow
      class="reverse-table"
      height="400"
      :show-header="false"
      :columns="tableColumn2"
      :data.sync="tableData2"></vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[3] }}</code>
      <code class="javascript">{{ demoCodes[4] }}</code>
      <code class="scss">{{ demoCodes[5] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableColumn: [
        { field: 'name', title: 'Name' },
        { field: 'role', title: 'Role' },
        { field: 'sex', title: 'Sex' },
        { field: 'age', title: 'Age' },
        { field: 'date3', title: 'Date' }
      ],
      tableColumn2: [
        { field: 'name', title: 'Name' },
        { field: 'role', title: 'Role' },
        { field: 'sex', title: 'Sex' },
        { field: 'age', title: 'Age' },
        { field: 'date2', title: 'Datetime' },
        { field: 'rate', title: 'Rate' },
        { field: 'address2', title: 'Address' },
        { field: 'date3', title: 'Date' },
        { field: 'updateTime', title: 'UpdateTime' },
        { field: 'createTime', title: 'CreateTime' }
      ],
      tableData: [],
      tableData2: [],
      demoCodes: [
        `
        <vxe-grid
          border
          highlight-hover-row
          class="reverse-table"
          :show-header="false"
          :columns="tableColumn"
          :data.sync="tableData"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableColumn: [
                { field: 'name', title: 'Name' },
                { field: 'role', title: 'Role' },
                { field: 'sex', title: 'Sex' },
                { field: 'age', title: 'Age' },
                { field: 'address2', title: 'Address' },
                { field: 'date3', title: 'Date' }
              ]
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
            this.reverseTable()
          },
          methods: {
            // 反转函数
            reverseTable () {
              let tableData = this.tableData
              this.tableData = this.tableColumn.map(column => {
                let item = { 0: column.title }
                tableData.forEach((row, rowIndex) => {
                  item[rowIndex + 1] = row[column.field]
                })
                return item
              })
              this.tableColumn = [{
                field: '0',
                fixed: 'left',
                width: 80
              }].concat(tableData.map((item, index) => {
                return {
                  field: \`\${index + 1}\`,
                  width: 120
                }
              }))
            }
          }
        }
        `,
        `
        .reverse-table {
          .vxe-body--row {
            .vxe-body--column {
              &:first-child {
                background-color: #f8f8f9;
              }
            }
          }
        }
        `,
        `
        <vxe-grid
          border
          show-overflow
          highlight-hover-row
          class="reverse-table"
          height="400"
          :show-header="false"
          :columns="tableColumn"
          :data.sync="tableData"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableColumn: [
                { field: 'name', title: 'Name' },
                { field: 'role', title: 'Role' },
                { field: 'sex', title: 'Sex' },
                { field: 'age', title: 'Age' },
                { field: 'date2', title: 'Datetime' },
                { field: 'rate', title: 'Rate' },
                { field: 'address2', title: 'Address' },
                { field: 'date3', title: 'Date' },
                { field: 'updateTime', title: 'UpdateTime' },
                { field: 'createTime', title: 'CreateTime' }
              ]
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 200)
            this.reverseTable()
          },
          methods: {
            // 反转函数
            reverseTable () {
              let tableData = this.tableData
              this.tableData = this.tableColumn.map(column => {
                let item = { 0: column.title }
                tableData.forEach((row, rowIndex) => {
                  item[rowIndex + 1] = row[column.field]
                })
                return item
              })
              this.tableColumn = [{
                field: '0',
                fixed: 'left',
                width: 80
              }].concat(tableData.map((item, index) => {
                return {
                  field: \`\${index + 1}\`,
                  width: 120
                }
              }))
            }
          }
        }
        `,
        `
        .reverse-table {
          .vxe-body--row {
            .vxe-body--column {
              &:first-child {
                background-color: #f8f8f9;
              }
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
    this.tableData2 = window.MOCK_DATA_LIST.slice(0, 200)
    this.reverseTable()
    this.reverseTable2()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    // 反转函数
    reverseTable () {
      let tableData = this.tableData
      this.tableData = this.tableColumn.map(column => {
        let item = { 0: column.title }
        tableData.forEach((row, rowIndex) => {
          item[rowIndex + 1] = row[column.field]
        })
        return item
      })
      this.tableColumn = [{
        field: '0',
        fixed: 'left',
        width: 80
      }].concat(tableData.map((item, index) => {
        return {
          field: `${index + 1}`,
          minWidth: 120
        }
      }))
    },
    reverseTable2 () {
      let tableData = this.tableData2
      this.tableData2 = this.tableColumn2.map(column => {
        let item = { 0: column.title }
        tableData.forEach((row, rowIndex) => {
          item[rowIndex + 1] = row[column.field]
        })
        return item
      })
      this.tableColumn2 = [{
        field: '0',
        fixed: 'left',
        width: 80
      }].concat(tableData.map((item, index) => {
        return {
          field: `${index + 1}`,
          minWidth: 120
        }
      }))
    }
  }
}
</script>

<style lang="scss">
.reverse-table {
  .vxe-body--row {
    .vxe-body--column {
      &:first-child {
        background-color: #f8f8f9;
      }
    }
  }
}
</style>
