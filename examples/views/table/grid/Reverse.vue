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
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableColumn: [
        { prop: 'name', label: 'Name' },
        { prop: 'role', label: 'Role' },
        { prop: 'sex', label: 'Sex' },
        { prop: 'age', label: 'Age' },
        { prop: 'address2', label: 'Address' },
        { prop: 'date3', label: 'Date' }
      ],
      tableData: [],
      demoCodes: [
        `
        <vxe-grid
          border
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
                { prop: 'name', label: 'Name' },
                { prop: 'role', label: 'Role' },
                { prop: 'sex', label: 'Sex' },
                { prop: 'age', label: 'Age' },
                { prop: 'address2', label: 'Address' },
                { prop: 'date3', label: 'Date' }
              ]
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
          },
          methods: {
            // 反转函数
            reverseTable () {
              let tableData = this.tableData
              this.tableData = this.tableColumn.map(column => {
                let item = { 0: column.label }
                tableData.forEach((row, rowIndex) => {
                  item[rowIndex + 1] = row[column.prop]
                })
                return item
              })
              this.tableColumn = [{
                prop: '0',
                fixed: 'left',
                width: 80
              }].concat(tableData.map((item, index) => {
                return {
                  prop: \`\${index + 1}\`,
                  width: 120
                }
              }))
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
    this.reverseTable()
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
        let item = { 0: column.label }
        tableData.forEach((row, rowIndex) => {
          item[rowIndex + 1] = row[column.prop]
        })
        return item
      })
      this.tableColumn = [{
        prop: '0',
        fixed: 'left',
        width: 80
      }].concat(tableData.map((item, index) => {
        return {
          prop: `${index + 1}`,
          width: 120
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
