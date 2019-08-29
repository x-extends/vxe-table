<template>
  <div>
    <p class="tip">通过调用 <table-api-link prop="exportCsv"/> 函数可以直接将表格导出为 .csv 格式的文件</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="exportCsvEvent">默认导出</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      ref="xTable1"
      highlight-hover-row
      height="300"
      :data="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">配置 <table-api-link prop="columnFilterMethod"/> 参数过滤指定列</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="exportCsvEvent2">导出指定列 [name,sex]</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      ref="xTable2"
      highlight-hover-row
      height="300"
      :data="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>

    <p class="tip">配置 <table-api-link prop="dataFilterMethod"/> 参数过滤指定行</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="exportCsvEvent3">导出指定第10-20行</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      ref="xTable3"
      highlight-hover-row
      height="300"
      :data="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[4] }}</code>
      <code class="javascript">{{ demoCodes[5] }}</code>
    </pre>

    <p class="tip">不导出表头，指定文件名，导出源数据,格式化数据</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="exportCsvEvent4">完整配置</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      ref="xTable4"
      highlight-hover-row
      height="300"
      :data="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[6] }}</code>
      <code class="javascript">{{ demoCodes[7] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      tableData: [],
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="exportCsvEvent">默认导出</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          ref="xTable1"
          highlight-hover-row
          height="300"
          :data="tableData">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 50)
          },
          methods: {
            exportCsvEvent () {
              this.$refs.xTable1.exportCsv()
            }
          }
        }
        `,
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="exportCsvEvent2">导出指定列 [name,sex]</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          ref="xTable2"
          highlight-hover-row
          height="300"
          :data="tableData">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 50)
          },
          methods: {
            exportCsvEvent2 () {
              this.$refs.xTable2.exportCsv({
                columnFilterMethod: column => ['name', 'sex'].includes(column.property)
              })
            }
          }
        }
        `,
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="exportCsvEvent3">导出指定第10-20行</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          ref="xTable3"
          highlight-hover-row
          height="300"
          :data="tableData">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 50)
          },
          methods: {
            exportCsvEvent3 () {
              this.$refs.xTable3.exportCsv({
                dataFilterMethod: (row, rowIndex) => rowIndex >= 9 && rowIndex < 20
              })
            }
          }
        }
        `,
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="exportCsvEvent4">完整配置</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          ref="xTable4"
          highlight-hover-row
          height="300"
          :data="tableData">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 50)
          },
          methods: {
            exportCsvEvent4 () {
              this.$refs.xTable1.exportCsv({
                filename: '自定义文件名.csv',
                original: true,
                isHeader: false,
                data: this.tableData.map(row => {
                  row.date = XEUtils.toDateString(row.date, 'yyyy-MM-dd')
                  return row
                })
              })
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 50)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    exportCsvEvent () {
      this.$refs.xTable1.exportCsv()
    },
    exportCsvEvent2 () {
      this.$refs.xTable2.exportCsv({
        columnFilterMethod: column => ['name', 'sex'].includes(column.property)
      })
    },
    exportCsvEvent3 () {
      this.$refs.xTable3.exportCsv({
        dataFilterMethod: (row, rowIndex) => rowIndex >= 9 && rowIndex < 20
      })
    },
    exportCsvEvent4 () {
      this.$refs.xTable1.exportCsv({
        filename: '自定义文件名.csv',
        original: true,
        isHeader: false,
        data: this.tableData.map(row => {
          row.date = XEUtils.toDateString(row.date, 'yyyy-MM-dd')
          return row
        })
      })
    }
  }
}
</script>
