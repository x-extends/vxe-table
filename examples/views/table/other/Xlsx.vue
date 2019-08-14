<template>
  <div>
    <p class="tip">使用 <a class="link" href="https://www.npmjs.com/package/xlsx" target="_blank">xlsx</a> 和 <a class="link" href="https://www.npmjs.com/package/file-saver" target="_blank">file-saver</a> 实现导出 xlsx 文件</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="exportEvent1">导出选中.xlsx</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-grid
      border
      ref="xGrid1"
      height="300"
      :columns="tableColumn"
      :data.sync="tableData"></vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">简单的导出表格</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="exportEvent2">导出表格.xlsx</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-grid
      border
      ref="xGrid2"
      height="300"
      :span-method="rowspanMethod"
      :columns="tableColumn"
      :data.sync="tableData"></vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
          },
          methods: {
            exportEvent () {
              // 对数据预处理
              let data = this.getExportData(true)
              // 转换数据
              let book = XLSX.utils.book_new()
              let sheet = XLSX.utils.json_to_sheet(data, { skipHeader: true })
              XLSX.utils.book_append_sheet(book, sheet)
              let wbout = XLSX.write(book, { bookType: 'xlsx', bookSST: false, type: 'binary' })
              let blob = new Blob([this.toBuffer(wbout)], { type: 'application/octet-stream' })
              // 保存导出
              FileSaver.saveAs(blob, '数据导出.xlsx')
            },
            getExportData (isHead) {
              let datas = this.$refs.xGrid1.getSelectRecords()
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
        `,
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="exportEvent2">合并行导出.xlsx</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-grid
          border
          ref="xGrid2"
          height="300"
          :span-method="rowspanMethod"
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
                { field: 'date3', title: 'Date' },
                { field: 'address', title: 'Address', showOverflow: true }
              ],
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
          },
          methods: {
            // 通用行合并函数（将相同多列数据合并为一行）
            rowspanMethod ({ row, $rowIndex, column, data }) {
              let fields = ['sex']
              let cellValue = row[column.property]
              if (cellValue && fields.includes(column.property)) {
                let prevRow = data[$rowIndex - 1]
                let nextRow = data[$rowIndex + 1]
                if (prevRow && prevRow[column.property] === cellValue) {
                  return { rowspan: 0, colspan: 0 }
                } else {
                  let countRowspan = 1
                  while (nextRow && nextRow[column.property] === cellValue) {
                    nextRow = data[++countRowspan + $rowIndex]
                  }
                  if (countRowspan > 1) {
                    return { rowspan: countRowspan, colspan: 1 }
                  }
                }
              }
            },
            exportEvent () {
              // 转换数据
              let table = this.$refs.xGrid2.$el.querySelector('.body--wrapper>.vxe-table--body')
              let book = XLSX.utils.book_new()
              let sheet = XLSX.utils.table_to_sheet(table)
              XLSX.utils.book_append_sheet(book, sheet)
              let wbout = XLSX.write(book, { bookType: 'xlsx', bookSST: false, type: 'binary' })
              let blob = new Blob([this.toBuffer(wbout)], { type: 'application/octet-stream' })
              // 保存导出
              FileSaver.saveAs(blob, '数据导出.xlsx')
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
    exportEvent1 () {
      // 对数据预处理
      let data = this.getExportData(true)
      // 转换数据
      let book = XLSX.utils.book_new()
      let sheet = XLSX.utils.json_to_sheet(data, { skipHeader: true })
      XLSX.utils.book_append_sheet(book, sheet)
      let wbout = XLSX.write(book, { bookType: 'xlsx', bookSST: false, type: 'binary' })
      let blob = new Blob([this.toBuffer(wbout)], { type: 'application/octet-stream' })
      // 保存导出
      FileSaver.saveAs(blob, '数据导出.xlsx')
    },
    getExportData (isHead) {
      let datas = this.$refs.xGrid1.getSelectRecords()
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
    },
    // 通用行合并函数（将相同多列数据合并为一行）
    rowspanMethod ({ row, $rowIndex, column, data }) {
      let fields = ['sex']
      let cellValue = row[column.property]
      if (cellValue && fields.includes(column.property)) {
        let prevRow = data[$rowIndex - 1]
        let nextRow = data[$rowIndex + 1]
        if (prevRow && prevRow[column.property] === cellValue) {
          return { rowspan: 0, colspan: 0 }
        } else {
          let countRowspan = 1
          while (nextRow && nextRow[column.property] === cellValue) {
            nextRow = data[++countRowspan + $rowIndex]
          }
          if (countRowspan > 1) {
            return { rowspan: countRowspan, colspan: 1 }
          }
        }
      }
    },
    exportEvent2 () {
      // 转换数据
      let table = this.$refs.xGrid2.$el.querySelector('.body--wrapper>.vxe-table--body')
      let book = XLSX.utils.book_new()
      let sheet = XLSX.utils.table_to_sheet(table)
      XLSX.utils.book_append_sheet(book, sheet)
      let wbout = XLSX.write(book, { bookType: 'xlsx', bookSST: false, type: 'binary' })
      let blob = new Blob([this.toBuffer(wbout)], { type: 'application/octet-stream' })
      // 保存导出
      FileSaver.saveAs(blob, '数据导出.xlsx')
    }
  }
}
</script>
