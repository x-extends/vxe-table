<template>
  <div>
    <p class="tip">通过调用 <table-api-link prop="print"/> 函数打印表格</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="printEvent">打印</vxe-button>
        <vxe-button @click="printSelectEvent">打印选中</vxe-button>
        <vxe-button @click="exportDataEvent">导出与打印</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      ref="xTable"
      height="500"
      :data="tableData">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="role" title="Role"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="date12" title="Date"></vxe-table-column>
    </vxe-table>

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
      frameUrl: '',
      tableData: [],
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="printEvent">打印</vxe-button>
            <vxe-button @click="printSelectEvent">打印选中</vxe-button>
            <vxe-button @click="exportDataEvent">导出与打印</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          ref="xTable"
          height="500"
          :data="tableData">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="role" title="Role"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="date12" title="Date"></vxe-table-column>
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
            printEvent () {
              this.$refs.xTable.print()
            },
            printSelectEvent () {
              this.$refs.xTable.print({
                data: this.$refs.xTable.getSelectRecords()
              })
            },
            exportDataEvent () {
              this.$refs.xTable.openExport()
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    printEvent () {
      this.$refs.xTable.print()
    },
    printSelectEvent () {
      this.$refs.xTable.print({
        data: this.$refs.xTable.getSelectRecords()
      })
    },
    exportDataEvent () {
      this.$refs.xTable.openExport()
    }
  }
}
</script>
