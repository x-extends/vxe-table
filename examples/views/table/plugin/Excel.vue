<template>
  <div>
    <p class="tip">
      具体兼容请查看 <a class="link" href="https://www.npmjs.com/package/vxe-table-plugin-excel" target="_blank">vxe-table-plugin-excel</a> 插件的 API<br>
      <span class="red">（注：实验功能，仅供参考！vue 的渲染机制决定无法很好的实现 Excel 类型的表格，只能支持少量数据且实现少部分的功能，所以不建议用于生产）</span>
    </p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="getValidEvent">获取有效数据</vxe-button>
        <vxe-button  @click="getInsertEvent">获取新增</vxe-button>
        <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
        <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
        <vxe-button @click="exportDataEvent">导出.csv</vxe-button>
        <input type="file" @change="fileChangeEvent" accept=".csv,.xls,.xlsx">
      </template>
    </vxe-toolbar>

    <vxe-excel
      ref="xExcel"
      max-height="600"
      :columns="columns"
      :data="tableData">
    </vxe-excel>

    <pre>
      <code>
        | Arrow Up ↑ | 移动到当前活动单元格上面的单元格 |
        | Arrow Down ↓ | 移动到当前活动单元格下面的单元格 |
        | Arrow Left ← | 移动到当前活动单元格左边的单元格 |
        | Arrow Right → | 移动到当前活动单元格右边的单元格 |
        | Tab | 移动到当前选中或活动单元格的右侧单元格，如果到最后一列且存在下一行，则从下一行开始移动 |
        | Tab + Shift | 移动到当前选中或活动单元格的左侧单元格，如果到第一列且存在上一行，则从上一行开始移动 |
        | Enter | 取消编辑并移动到当前活动单元格下面的单元格 |
        | Delete | 清空内容 |
        | Backspace | 清空内容并激活选中单元格为编辑状态 |
        | F2 | 激活单元格编辑 |
        | Esc | 取消单元格编辑 |
        | Ctrl + C | 复制选中的单元格内容 |
        | Ctrl + X | 剪贴选中的单元格内容 |
        | Ctrl + V | 粘贴选中的单元格内容 |
        | Ctrl + A | 选中所有单元格 |
      </code>
    </pre>

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

export default {
  data () {
    const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']
    return {
      columns: [
        {
          type: 'seq',
          width: 50,
          align: 'center',
          headerAlign: 'center'
        }
      ].concat(columns.map(name => {
        return {
          field: name,
          title: name,
          minWidth: 76,
          headerAlign: 'center',
          sortable: true,
          editRender: {
            name: 'cell'
          },
          filters: [{ data: '' }],
          filterRender: {
            name: 'input'
          }
        }
      })),
      tableData: Array.from(new Array(20)).map(() => {
        const item = {}
        columns.forEach(name => {
          item[name] = ''
        })
        return item
      }),
      demoCodes: [
        `
        <vxe-button @click="getValidEvent">获取有效数据</vxe-button>
        <vxe-button  @click="getInsertEvent">获取新增</vxe-button>
        <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
        <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
        <vxe-button @click="exportDataEvent">导出.csv</vxe-button>
        <input type="file" @change="fileChangeEvent" accept=".csv,.xls,.xlsx">

        <vxe-excel
          ref="xExcel"
          max-height="600"
          :columns="columns"
          :data="tableData">
        </vxe-excel>
        `,
        `
        export default {
          data () {
            let columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']
            return {
              columns: [
                {
                  type: 'seq',
                  width: 50,
                  align: 'center',
                  headerAlign: 'center'
                }
              ].concat(columns.map(name => {
                return {
                  field: name,
                  title: name,
                  minWidth: 76,
                  headerAlign: 'center',
                  sortable: true,
                  editRender: {
                    name: 'cell'
                  },
                  filters: [{ data: '' }],
                  filterRender: {
                    name: 'input'
                  }
                }
              })),
              tableData: Array.from(new Array(20)).map((num, index) => {
                let item = {}
                columns.forEach(name => {
                  item[name] = ''
                })
                return item
              })
            }
          },
          methods: {
            getValidEvent () {
              let fields = this.$refs.xExcel.getColumns().map(item => item.property).filter(key => key)
              let validRecords = this.tableData.filter(item => fields.some(key => item[key]))
              this.$XModal.alert(validRecords.length)
            },
            getInsertEvent () {
              let insertRecords = this.$refs.xExcel.getInsertRecords()
              this.$XModal.alert(insertRecords.length)
            },
            getRemoveEvent () {
              let removeRecords = this.$refs.xExcel.getRemoveRecords()
              this.$XModal.alert(removeRecords.length)
            },
            getUpdateEvent () {
              let updateRecords = this.$refs.xExcel.getUpdateRecords()
              this.$XModal.alert(updateRecords.length)
            },
            exportDataEvent () {
              this.$refs.xExcel.exportData({ isHeader: false })
            },
            fileChangeEvent (evnt) {
              let files = evnt.target.files
              let fileReader = new FileReader()
              fileReader.onload = (ev) => {
                let data = ev.target.result
                let workbook = XLSX.read(data, { type: 'binary' })
                let keys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
                let csvData = XLSX.utils.sheet_to_csv(workbook.Sheets.Sheet1)
                let tableData = csvData.split('\n').map((vRow, rIndex) => {
                  let vCols = vRow.split(',')
                  let item = {}
                  vCols.forEach((val, cIndex) => {
                    let kIndex = Math.floor(cIndex / 26)
                    let lIndex = cIndex % 26
                    let key
                    if (kIndex) {
                      key = \`\${keys[kIndex]}\${keys[lIndex]}\`
                    } else {
                      key = keys[lIndex]
                    }
                    item[key] = val
                  })
                  return item
                })
                this.tableData = tableData
              }
              fileReader.readAsBinaryString(files[0])
            }
          }
        }
        `
      ]
    }
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    getValidEvent () {
      const fields = this.$refs.xExcel.getColumns().map(item => item.property).filter(key => key)
      const validRecords = this.tableData.filter(item => fields.some(key => item[key]))
      this.$XModal.alert(validRecords.length)
    },
    getInsertEvent () {
      const insertRecords = this.$refs.xExcel.getInsertRecords()
      this.$XModal.alert(insertRecords.length)
    },
    getRemoveEvent () {
      const removeRecords = this.$refs.xExcel.getRemoveRecords()
      this.$XModal.alert(removeRecords.length)
    },
    getUpdateEvent () {
      const updateRecords = this.$refs.xExcel.getUpdateRecords()
      this.$XModal.alert(updateRecords.length)
    },
    exportDataEvent () {
      this.$refs.xExcel.exportData({ isHeader: false })
    },
    fileChangeEvent (evnt) {
      const files = evnt.target.files
      const fileReader = new FileReader()
      fileReader.onload = (ev) => {
        const data = ev.target.result
        const workbook = XLSX.read(data, { type: 'binary' })
        const keys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        const csvData = XLSX.utils.sheet_to_csv(workbook.Sheets.Sheet1)
        const tableData = csvData.split('\n').map((vRow) => {
          const vCols = vRow.split(',')
          const item = {}
          vCols.forEach((val, cIndex) => {
            const kIndex = Math.floor(cIndex / 26)
            const lIndex = cIndex % 26
            let key
            if (kIndex) {
              key = `${keys[kIndex]}${keys[lIndex]}`
            } else {
              key = keys[lIndex]
            }
            item[key] = val
          })
          return item
        })
        this.tableData = tableData
      }
      fileReader.readAsBinaryString(files[0])
    }
  }
}
</script>
