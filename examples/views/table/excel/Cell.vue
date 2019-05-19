<template>
  <div>
    <p>使用 vxe-excel 渲染 Excel 表格</p>
    <p>快捷键：方向键、Tab 键、Esc 键、F2 键、Del、Back 键、Ctrl 复制粘贴</p>

    <button class="btn" @click="getValidEvent">获取有效数据</button>
    <button class="btn" @click="getInsertEvent">获取新增</button>
    <button class="btn" @click="getRemoveEvent">获取删除</button>
    <button class="btn" @click="getUpdateEvent">获取修改</button>
    <button class="btn" @click="exportCsvEvent">导出.csv</button>
    <vxe-excel
      ref="xExcel"
      max-height="600"
      :columns="columns"
      :data.sync="tableData">
    </vxe-excel>

    <p class="demo-code">显示代码</p>

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
    let columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P']
    return {
      columns: [
        {
          type: 'index',
          width: 50,
          fixed: 'left',
          align: 'center',
          headerAlign: 'center'
        }
      ].concat(columns.map(name => {
        return {
          prop: name.toLowerCase(),
          label: name,
          width: 76,
          headerAlign: 'center',
          editRender: {
            name: 'cell'
          }
        }
      })),
      tableData: Array.from(new Array(20)).map(() => {
        let item = {}
        columns.forEach(name => {
          item[name.toLowerCase()] = ''
        })
        return item
      }),
      demoCodes: [
        `
        <vxe-excel
          ref="xExcel"
          max-height="600"
          :columns="columns"
          :data.sync="tableData">
        </vxe-excel>
        `,
        `
        export default {
          data () {
            let columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P']
            return {
              columns: [
                {
                  type: 'index',
                  width: 50,
                  fixed: 'left',
                  align: 'center',
                  headerAlign: 'center'
                }
              ].concat(columns.map(name => {
                return {
                  prop: name.toLowerCase(),
                  label: name,
                  width: 76,
                  headerAlign: 'center',
                  editRender: {
                    name: 'cell'
                  }
                }
              })),
              tableData: Array.from(new Array(20)).map(() => {
                let item = {}
                columns.forEach(name => {
                  item[name.toLowerCase()] = ''
                })
                return item
              })
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
      let validRecords = this.$refs.xExcel.getRecords().filter(item => Object.keys(item).some(key => item[key]))
      alert(validRecords.length)
    },
    getInsertEvent () {
      let insertRecords = this.$refs.xExcel.getInsertRecords()
      alert(insertRecords.length)
    },
    getRemoveEvent () {
      let removeRecords = this.$refs.xExcel.getRemoveRecords()
      alert(removeRecords.length)
    },
    getUpdateEvent () {
      let updateRecords = this.$refs.xExcel.getUpdateRecords()
      alert(updateRecords.length)
    },
    exportCsvEvent () {
      this.$refs.xExcel.exportCsv()
    }
  }
}
</script>
