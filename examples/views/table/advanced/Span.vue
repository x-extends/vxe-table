<template>
  <div>
    <p>合并列，通过参数 <table-api-link prop="span-method"/></p>
    <p>使用 $rowIndex 获取渲染中的行索引，rowIndex 指向真实数据的行索引，可以根据不同场景使用</p>

    <vxe-table
      border
      max-height="400"
      :span-method="colspanMethod"
      :data.sync="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" sortable></vxe-table-column>
      <vxe-table-column prop="role" label="Role" sortable></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="age" label="Age"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p>合并行</p>

    <vxe-table
      ref="xTable"
      border
      max-height="400"
      :span-method="rowspanMethod"
      :data.sync="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="key" label="Key"></vxe-table-column>
      <vxe-table-column prop="content" label="Content"></vxe-table-column>
      <vxe-table-column prop="language" label="Language" :filters="[{label: '中文', value: 'zh_CN'}, {label: 'English', value: 'en_US'}]"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [],
      demoCodes: [
        `
        <vxe-table
          border
          max-height="400"
          :span-method="colspanMethod"
          :data.sync="tableData">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column prop="name" label="Name" sortable></vxe-table-column>
          <vxe-table-column prop="role" label="Role" sortable></vxe-table-column>
          <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
          <vxe-table-column prop="age" label="Age"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
          },
          methods: {
            colspanMethod ({ row, rowIndex, column, columnIndex, data }) {
              if (rowIndex % 2 === 0) {
                if (columnIndex === 2) {
                  return {
                    rowspan: 1,
                    colspan: 2
                  }
                } else if (columnIndex === 3) {
                  return {
                    rowspan: 0,
                    colspan: 0
                  }
                }
              }
            }
          }
        }
        `,
        `
        <vxe-table
          ref="xTable"
          border
          max-height="400"
          :span-method="rowspanMethod"
          :data.sync="tableData">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column prop="key" label="Key"></vxe-table-column>
          <vxe-table-column prop="language" label="Language" :filters="[{label: '中文', value: 'zh_CN'}, {label: 'English', value: 'en_US'}]"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
          },
          methods: {
            rowspanMethod ({ row, $rowIndex, column, data }) {
              let prevRow = data[$rowIndex - 1]
              let nextRow = data[$rowIndex + 1]
              if (column.property === 'key') {
                if (prevRow && prevRow.key === row.key) {
                  return {
                    rowspan: 0,
                    colspan: 0
                  }
                }
                if (nextRow && nextRow.key === row.key) {
                  return {
                    rowspan: 2,
                    colspan: 1
                  }
                }
              }
            }
          }
        }
        `
      ]
    }
  },
  created () {
    let list = window.MOCK_DATA_LIST.slice(0, 20)
    this.tableData = list
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    colspanMethod ({ row, rowIndex, column, columnIndex, data }) {
      if (rowIndex % 2 === 0) {
        if (columnIndex === 2) {
          return {
            rowspan: 1,
            colspan: 2
          }
        } else if (columnIndex === 3) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    rowspanMethod ({ row, $rowIndex, column, data }) {
      let prevRow = data[$rowIndex - 1]
      let nextRow = data[$rowIndex + 1]
      if (column.property === 'key') {
        if (prevRow && prevRow.key === row.key) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
        if (nextRow && nextRow.key === row.key) {
          return {
            rowspan: 2,
            colspan: 1
          }
        }
      }
    }
  }
}
</script>
