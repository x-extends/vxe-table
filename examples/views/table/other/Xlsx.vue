<template>
  <div>
    <p>使用 <a class="link" href="https://www.npmjs.com/package/xlsx" target="_blank">xlsx</a> 和 <a class="link" href="https://www.npmjs.com/package/file-saver" target="_blank">file-saver</a> 实现导出 xlsx 文件</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="exportEvent">导出选中.xlsx</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-grid
      border
      ref="xGrid"
      height="500"
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
import XLSX from 'xlsx'
import FileSaver from 'file-saver'

export default {
  data () {
    return {
      tableColumn: [
        { type: 'selection', width: 60 },
        { field: 'name', title: 'Name' },
        { field: 'role', title: 'Role' },
        { field: 'sex', title: 'Sex' },
        { field: 'date3', title: 'Date' },
        { field: 'address', title: 'Address', showOverflow: true }
      ],
      tableData: [],
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="exportEvent">导出选中.xlsx</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-grid
          border
          ref="xGrid"
          height="500"
          :columns="tableColumn"
          :data.sync="tableData"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableColumn: [
                { type: 'selection', width: 60 },
                { field: 'name', title: 'Name' },
                { field: 'role', title: 'Role' },
                { field: 'sex', title: 'Sex' },
                { field: 'date3', title: 'Date' },
                { field: 'address', title: 'Address', showOverflow: true }
              ],
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 50)
          },
          methods: {
            exportEvent () {
              // 获取数据
              let data = this.getExportData(true)

              // 处理工作簿
              let wb = XLSX.utils.book_new()
              let ws = XLSX.utils.json_to_sheet(data, { skipHeader: true })
              XLSX.utils.book_append_sheet(wb, ws)
              let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: false, type: 'binary' })
              let blob = new Blob([this.toBuffer(wbout)], { type: 'application/octet-stream' })
              
              // 保存导出
              FileSaver.saveAs(blob, '数据导出.xlsx')
            },
            getExportData (isHead) {
              let datas = this.$refs.xGrid.getSelectRecords()
              let columns = this.tableColumn.filter(item => item.field)
              let headers = isHead ? [columns.map(item => item.title)] : []
              return headers.concat(
                datas.map(row => {
                  return columns.map(column => {
                    return row[column.field]
                  })
                })
              )
            },
            toBuffer (wbout) {
              let buf = new ArrayBuffer(wbout.length)
              let view = new Uint8Array(buf)
              for (let index = 0; index !== wbout.length; ++index) view[index] = wbout.charCodeAt(index) & 0xFF
              return buf
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
    exportEvent () {
      let data = this.getExportData(true)
      let wb = XLSX.utils.book_new()
      let ws = XLSX.utils.json_to_sheet(data, { skipHeader: true })

      XLSX.utils.book_append_sheet(wb, ws)

      let wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: false, type: 'binary' })
      let blob = new Blob([this.toBuffer(wbout)], { type: 'application/octet-stream' })
      FileSaver.saveAs(blob, '数据导出.xlsx')
    },
    getExportData (isHead) {
      let datas = this.$refs.xGrid.getSelectRecords()
      let columns = this.tableColumn.filter(item => item.field)
      let headers = isHead ? [columns.map(item => item.title)] : []
      return headers.concat(
        datas.map(row => {
          return columns.map(column => {
            return row[column.field]
          })
        })
      )
    },
    toBuffer (wbout) {
      let buf = new ArrayBuffer(wbout.length)
      let view = new Uint8Array(buf)
      for (let index = 0; index !== wbout.length; ++index) view[index] = wbout.charCodeAt(index) & 0xFF
      return buf
    }
  }
}
</script>
