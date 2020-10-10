<template>
  <div>
    <p class="tip">
      使用 <a class="link" href="https://www.npmjs.com/package/xlsx" target="_blank">xlsx</a> 实现导入数据<br>
      <span class="red">（注：该示例仅供参考，具体逻辑请自行实现）</span>
    </p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="impotEvent">选择文件</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-grid
      border
      ref="xGrid1"
      height="300"
      :columns="tableColumn"
      :data="tableData1"></vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">
      使用 <a class="link" href="https://www.npmjs.com/package/xlsx" target="_blank">xlsx</a> 和 <a class="link" href="https://www.npmjs.com/package/file-saver" target="_blank">file-saver</a> 实现导出 xlsx 文件<br>
      <span class="red">（注：该示例仅供参考，具体逻辑请自行实现）</span>
    </p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="exportEvent">导出.xlsx</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-grid
      border
      ref="xGrid2"
      height="300"
      :span-method="rowspanMethod"
      :columns="tableColumn"
      :data="tableData2"></vxe-grid>

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
        { type: 'checkbox', width: 60 },
        { field: 'name', title: 'Name' },
        { field: 'role', title: 'Role' },
        { field: 'sex', title: 'Sex', formatter: this.formatterSex },
        { field: 'date3', title: 'Date' },
        { field: 'address', title: 'Address', showOverflow: true }
      ],
      tableData1: [],
      tableData2: [],
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="impotEvent">选择文件</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-grid
          border
          ref="xGrid1"
          height="300"
          :columns="tableColumn"
          :data="tableData1"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableColumn: [
                { type: 'checkbox', width: 60 },
                { field: 'name', title: 'Name' },
                { field: 'role', title: 'Role' },
                { field: 'sex', title: 'Sex', formatter: this.formatterSex },
                { field: 'date3', title: 'Date' },
                { field: 'address', title: 'Address', showOverflow: true }
              ],
              tableData1: []
            }
          },
          methods: {
            formatterSex ({ cellValue }) {
              if (cellValue === '1') {
                return '男'
              } else if (cellValue === '0') {
                return '女'
              }
              return ''
            },
            impotEvent () {
              this.$refs.xGrid1.readFile({
                types: ['xls', 'xlsx']
              }).then(evnt => {
                const files = evnt.target.files
                const fileReader = new FileReader()
                fileReader.onload = (ev) => {
                  const data = ev.target.result
                  const workbook = XLSX.read(data, { type: 'binary' })
                  const csvData = XLSX.utils.sheet_to_csv(workbook.Sheets.Sheet1)
                  const tableData = []
                  // 解析数据
                  csvData.split('\\n').forEach((vRow) => {
                    if (vRow) {
                      const vCols = vRow.split(',')
                      const item = {}
                      vCols.forEach((val, cIndex) => {
                        const column = this.tableColumn[cIndex]
                        if (column.field) {
                          item[column.field] = val
                        }
                      })
                      tableData.push(item)
                    }
                  })
                  this.tableData1 = tableData
                }
                fileReader.readAsBinaryString(files[0])
              })
            }
          }
        }
        `,
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="exportEvent">导出.xlsx</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-grid
          border
          ref="xGrid2"
          height="300"
          :span-method="rowspanMethod"
          :columns="tableColumn"
          :data="tableData2"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableColumn: [
                { type: 'checkbox', width: 60 },
                { field: 'name', title: 'Name' },
                { field: 'role', title: 'Role' },
                { field: 'sex', title: 'Sex', formatter: this.formatterSex },
                { field: 'date3', title: 'Date' },
                { field: 'address', title: 'Address', showOverflow: true }
              ],
              tableData2: []
            }
          },
          created () {
            this.tableData2 = window.MOCK_DATA_LIST.slice(0, 20)
          },
          methods: {
            formatterSex ({ cellValue }) {
              if (cellValue === '1') {
                return '男'
              } else if (cellValue === '0') {
                return '女'
              }
              return ''
            },
            // 通用行合并函数（将相同多列数据合并为一行）
            rowspanMethod ({ row, _rowIndex, column, visibleData }) {
              let fields = ['sex']
              let cellValue = row[column.property]
              if (cellValue && fields.includes(column.property)) {
                let prevRow = visibleData[_rowIndex - 1]
                let nextRow = visibleData[_rowIndex + 1]
                if (prevRow && prevRow[column.property] === cellValue) {
                  return { rowspan: 0, colspan: 0 }
                } else {
                  let countRowspan = 1
                  while (nextRow && nextRow[column.property] === cellValue) {
                    nextRow = visibleData[++countRowspan + _rowIndex]
                  }
                  if (countRowspan > 1) {
                    return { rowspan: countRowspan, colspan: 1 }
                  }
                }
              }
            },
            exportEvent () {
              const toBuffer = (wbout) => {
                const buf = new ArrayBuffer(wbout.length)
                const view = new Uint8Array(buf)
                for (let index = 0; index !== wbout.length; ++index) view[index] = wbout.charCodeAt(index) & 0xFF
                return buf
              }
              // 转换数据
              const table = this.$refs.xGrid2.$el.querySelector('.body--wrapper>.vxe-table--body')
              const book = XLSX.utils.book_new()
              const sheet = XLSX.utils.table_to_sheet(table)
              XLSX.utils.book_append_sheet(book, sheet)
              const wbout = XLSX.write(book, { bookType: 'xlsx', bookSST: false, type: 'binary' })
              const blob = new Blob([toBuffer(wbout)], { type: 'application/octet-stream' })
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
    this.tableData2 = window.MOCK_DATA_LIST.slice(0, 20)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    formatterSex ({ cellValue }) {
      if (cellValue === '1') {
        return '男'
      } else if (cellValue === '0') {
        return '女'
      }
      return ''
    },
    impotEvent () {
      this.$refs.xGrid1.readFile({
        types: ['xls', 'xlsx']
      }).then(evnt => {
        const files = evnt.target.files
        const fileReader = new FileReader()
        fileReader.onload = (ev) => {
          const data = ev.target.result
          const workbook = XLSX.read(data, { type: 'binary' })
          const csvData = XLSX.utils.sheet_to_csv(workbook.Sheets.Sheet1)
          const tableData = []
          // 解析数据
          csvData.split('\n').forEach((vRow) => {
            if (vRow) {
              const vCols = vRow.split(',')
              const item = {}
              vCols.forEach((val, cIndex) => {
                const column = this.tableColumn[cIndex]
                if (column.field) {
                  item[column.field] = val
                }
              })
              tableData.push(item)
            }
          })
          this.tableData1 = tableData
        }
        fileReader.readAsBinaryString(files[0])
      })
    },
    // 通用行合并函数（将相同多列数据合并为一行）
    rowspanMethod ({ row, _rowIndex, column, visibleData }) {
      const fields = ['sex']
      const cellValue = row[column.property]
      if (cellValue && fields.includes(column.property)) {
        const prevRow = visibleData[_rowIndex - 1]
        let nextRow = visibleData[_rowIndex + 1]
        if (prevRow && prevRow[column.property] === cellValue) {
          return { rowspan: 0, colspan: 0 }
        } else {
          let countRowspan = 1
          while (nextRow && nextRow[column.property] === cellValue) {
            nextRow = visibleData[++countRowspan + _rowIndex]
          }
          if (countRowspan > 1) {
            return { rowspan: countRowspan, colspan: 1 }
          }
        }
      }
    },
    exportEvent () {
      const toBuffer = (wbout) => {
        const buf = new ArrayBuffer(wbout.length)
        const view = new Uint8Array(buf)
        for (let index = 0; index !== wbout.length; ++index) view[index] = wbout.charCodeAt(index) & 0xFF
        return buf
      }
      // 转换数据
      const table = this.$refs.xGrid2.$el.querySelector('.body--wrapper>.vxe-table--body')
      const book = XLSX.utils.book_new()
      const sheet = XLSX.utils.table_to_sheet(table)
      XLSX.utils.book_append_sheet(book, sheet)
      const wbout = XLSX.write(book, { bookType: 'xlsx', bookSST: false, type: 'binary' })
      const blob = new Blob([toBuffer(wbout)], { type: 'application/octet-stream' })
      // 保存导出
      FileSaver.saveAs(blob, '数据导出.xlsx')
    }
  }
}
</script>
