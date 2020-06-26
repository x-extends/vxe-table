<template>
  <div>
    <p class="tip">
      具体兼容请查看 <a class="link" href="https://github.com/x-extends/vxe-table-plugin-export-xlsx" target="_blank">vxe-table-plugin-export-xlsx</a> 插件的 API<br>
      <span class="red">（注：该示例仅供参考，建议使用后端导出）</span>
      </p>

    <vxe-toolbar custom export>
      <template v-slot:buttons>
        <vxe-button @click="exportDataEvent">导出数据</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      ref="xTable"
      height="400"
      :loading="loading"
      :export-config="tableExport"
      :data="tableData">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
      <vxe-table-column field="role" title="Role"></vxe-table-column>
      <vxe-table-column field="sex" title="app.body.label.sex" width="80" :formatter="formatterSex"></vxe-table-column>
      <vxe-table-column field="other" title="默认自动转换" cell-type="auto"></vxe-table-column>
      <vxe-table-column field="num" title="导出数值" cell-type="number"></vxe-table-column>
      <vxe-table-column field="cardNo" title="导出字符串" cell-type="string"></vxe-table-column>
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
      loading: false,
      tableData: [],
      tableExport: {
        // 默认选中类型
        type: 'xlsx',
        // 自定义类型
        types: ['xlsx', 'csv', 'html', 'xml', 'txt']
      },
      demoCodes: [
        `
        <vxe-toolbar custom :export="tableExport">
          <template v-slot:buttons>
            <vxe-button @click="exportDataEvent">导出数据</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          ref="xTable"
          height="400"
          :loading="loading"
          :export-config="tableExport"
          :data="tableData">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
          <vxe-table-column field="role" title="Role"></vxe-table-column>
          <vxe-table-column field="sex" title="app.body.label.sex" width="80" :formatter="formatterSex"></vxe-table-column>
          <vxe-table-column field="other" title="默认自动转换" cell-type="auto"></vxe-table-column>
          <vxe-table-column field="num" title="导出数值" cell-type="number"></vxe-table-column>
          <vxe-table-column field="cardNo" title="导出字符串" cell-type="string"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tableData: [],
              tableExport: {
                // 默认选中类型
                type: 'xlsx',
                // 自定义类型
                types: ['xlsx', 'csv', 'html', 'xml', 'txt']
              }
            }
          },
          created () {
            this.findList()
          },
          methods: {
            findList () {
              this.loading = true
              setTimeout(() => {
                this.tableData = [
                  { name: 'name1', role: 'role1', sex: '0', num: '22', other: false, cardNo: '998' },
                  { name: 'name2', role: 'role2', sex: '1', num: 32, other: '备注666', cardNo: 10000 },
                  { name: 'name3', role: 'role3', sex: '1', num: 99999999999999, other: 10, cardNo: '62221234219637458563' },
                  { name: 'name4', role: 'role4', sex: '0', num: '28', other: '999.99', cardNo: '62227412123789459631' },
                  { name: 'name5', role: 'role5', sex: '1', num: 24, other: -1, cardNo: '62221234214752459631' },
                  { name: 'name6', role: 'role6', sex: '1', num: '10000', other: '99999999999999', cardNo: '62221267214853659622' },
                  { name: 'name7', role: 'role7', sex: '1', num: 10000000000000000, other: '只需998', cardNo: '62221237123480359633' },
                  { name: 'name8', role: 'role8', sex: '2', num: 9998, other: 10000000000000000, cardNo: '62221234018523736237' },
                  { name: 'name9', role: 'role9', sex: '1', num: 70000, other: 10000, cardNo: '62221230283686397412' }
                ]
                this.loading = false
              }, 100)
            },
            formatterSex ({ cellValue }) {
              return cellValue ? (cellValue === '1' ? '男' : '女') : ''
            },
            exportDataEvent () {
              this.$refs.xTable.exportData({
                filename: '导出',
                sheetName: 'Sheet1',
                type: 'xlsx'
              })
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.findList()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    findList () {
      this.loading = true
      setTimeout(() => {
        this.tableData = [
          { name: 'name1', role: 'role1', sex: '0', num: '22', other: false, cardNo: '998' },
          { name: 'name2', role: 'role2', sex: '1', num: 32, other: '备注666', cardNo: 10000 },
          { name: 'name3', role: 'role3', sex: '1', num: 99999999999999, other: 10, cardNo: '62221234219637458563' },
          { name: 'name4', role: 'role4', sex: '0', num: '28', other: '999.99', cardNo: '62227412123789459631' },
          { name: 'name5', role: 'role5', sex: '1', num: 24, other: -1, cardNo: '62221234214752459631' },
          { name: 'name6', role: 'role6', sex: '1', num: '10000', other: '99999999999999', cardNo: '62221267214853659622' },
          { name: 'name7', role: 'role7', sex: '1', num: 10000000000000000, other: '只需998', cardNo: '62221237123480359633' },
          { name: 'name8', role: 'role8', sex: '2', num: 9998, other: 10000000000000000, cardNo: '62221234018523736237' },
          { name: 'name9', role: 'role9', sex: '1', num: 70000, other: 10000, cardNo: '62221230283686397412' }
        ]
        this.loading = false
      }, 100)
    },
    formatterSex ({ cellValue }) {
      return cellValue ? (cellValue === '1' ? '男' : '女') : ''
    },
    exportDataEvent () {
      this.$refs.xTable.exportData({
        filename: '导出',
        sheetName: 'Sheet1',
        type: 'xlsx'
      })
    }
  }
}
</script>
