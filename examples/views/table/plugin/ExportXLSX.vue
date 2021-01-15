<template>
  <div>
    <p class="tip">
      具体兼容请查看 <a class="link" href="https://github.com/x-extends/vxe-table-plugin-export-xlsx" target="_blank">vxe-table-plugin-export-xlsx</a> 插件的 API<br>
      <span class="red">（注：该示例仅供参考，建议使用后端导出）</span>
      </p>

    <vxe-toolbar custom import export>
      <template v-slot:buttons>
        <vxe-button @click="tableData = []">清空数据</vxe-button>
        <vxe-button @click="exportDataEvent">导出数据</vxe-button>
        <vxe-button @click="align = 'left'">居左</vxe-button>
        <vxe-button @click="align = 'center'">居中</vxe-button>
        <vxe-button @click="align = 'right'">居右</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      show-footer
      ref="xTable"
      height="400"
      :align="align"
      :loading="loading"
      :footer-method="footerMethod"
      :import-config="tableImport"
      :export-config="tableExport"
      :merge-cells="mergeCells"
      :data="tableData">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-colgroup title="Group1">
        <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
        <vxe-table-column field="rate" title="Rate"></vxe-table-column>
        <vxe-table-colgroup title="Group2">
          <vxe-table-column field="sex" title="app.body.label.sex" width="80" :formatter="formatterSex"></vxe-table-column>
          <vxe-table-column field="num" title="Num"></vxe-table-column>
        </vxe-table-colgroup>
      </vxe-table-colgroup>
      <vxe-table-colgroup title="Group1">
        <vxe-table-column field="num1" title="数值类型" cell-type="number"></vxe-table-column>
        <vxe-table-column field="num2" title="字符串类型" cell-type="string"></vxe-table-column>
      </vxe-table-colgroup>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      loading: false,
      align: null,
      tableData: [],
      tableImport: {
        // 自定义类型
        types: ['xlsx']
      },
      tableExport: {
        // 默认选中类型
        type: 'xlsx',
        // 自定义类型
        types: ['xlsx', 'csv', 'html', 'xml', 'txt']
      },
      mergeCells: [],
      demoCodes: [
        `
        <vxe-toolbar custom import export>
          <template v-slot:buttons>
            <vxe-button @click="tableData = []">清空数据</vxe-button>
            <vxe-button @click="exportDataEvent">导出数据</vxe-button>
            <vxe-button @click="align = 'left'">居左</vxe-button>
            <vxe-button @click="align = 'center'">居中</vxe-button>
            <vxe-button @click="align = 'right'">居右</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          show-footer
          ref="xTable"
          height="400"
          :align="align"
          :loading="loading"
          :footer-method="footerMethod"
          :import-config="tableImport"
          :export-config="tableExport"
          :merge-cells="mergeCells"
          :data="tableData">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-colgroup title="Group1">
            <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
            <vxe-table-column field="rate" title="Rate"></vxe-table-column>
            <vxe-table-colgroup title="Group2">
              <vxe-table-column field="sex" title="app.body.label.sex" width="80" :formatter="formatterSex"></vxe-table-column>
              <vxe-table-column field="num" title="Num"></vxe-table-column>
            </vxe-table-colgroup>
          </vxe-table-colgroup>
          <vxe-table-colgroup title="Group1">
            <vxe-table-column field="num1" title="数值类型" cell-type="number"></vxe-table-column>
            <vxe-table-column field="num2" title="字符串类型" cell-type="string"></vxe-table-column>
          </vxe-table-colgroup>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              align: null,
              tableData: [],
              tableImport: {
                // 自定义类型
                types: ['xlsx']
              },
              tableExport: {
                // 默认选中类型
                type: 'xlsx',
                // 自定义类型
                types: ['xlsx', 'csv', 'html', 'xml', 'txt']
              },
              mergeCells: []
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
                  { name: 'name1', role: 'role1', rate: 1, sex: '0', num: '22', num1: '22', num2: '22', cardNo: '998' },
                  { name: 'name2', role: 'role2', rate: 1, sex: '1', num: 32, num1: 32, num2: 32, cardNo: 10000 },
                  { name: 'name3', role: 'role3', rate: 6, sex: '1', num: 99999999999999, num1: 99999999999999, num2: 99999999999999, cardNo: '62221234219637458563' },
                  { name: 'name4', role: 'role4', rate: 3, sex: '0', num: '999.99', num1: '999.99', num2: '999.99', cardNo: '62227412123789459631' },
                  { name: 'name5', role: 'role5', rate: 1, sex: '1', num: -1, num1: -1, num2: -1, cardNo: '62221234214752459631' },
                  { name: 'name6', role: 'role6', rate: 4, sex: '1', num: '10000', num1: '10000', num2: '10000', cardNo: '62221267214853659622' },
                  { name: 'name7', role: 'role7', rate: 1, sex: '1', num: 10000000000000.001, num1: 10000000000000.001, num2: 10000000000000.001, cardNo: '62221237123480359633' },
                  { name: 'name8', role: 'role8', rate: 5, sex: '2', num: 9998, num1: 9998, num2: 9998, cardNo: '62221234018523736237' },
                  { name: 'name9', role: 'role9', rate: 8, sex: '1', num: 70000, num1: 70000, num2: 70000, cardNo: '62221230283686397412' }
                ]
                this.mergeCells = [
                  { row: 1, col: 1, rowspan: 2, colspan: 2 },
                  { row: 4, col: 3, rowspan: 1, colspan: 3 }
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
            },
            footerMethod ({ columns, data }) {
              return [
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '和值'
                  }
                  if (['age', 'rate'].includes(column.property)) {
                    return XEUtils.sum(data, column.property)
                  }
                  return ''
                })
              ]
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
  methods: {
    findList () {
      this.loading = true
      setTimeout(() => {
        this.tableData = [
          { name: 'name1', role: 'role1', rate: 1, sex: '0', num: '22', num1: '22', num2: '22', cardNo: '998' },
          { name: 'name2', role: 'role2', rate: 1, sex: '1', num: 32, num1: 32, num2: 32, cardNo: 10000 },
          { name: 'name3', role: 'role3', rate: 6, sex: '1', num: 99999999999999, num1: 99999999999999, num2: 99999999999999, cardNo: '62221234219637458563' },
          { name: 'name4', role: 'role4', rate: 3, sex: '0', num: '999.99', num1: '999.99', num2: '999.99', cardNo: '62227412123789459631' },
          { name: 'name5', role: 'role5', rate: 1, sex: '1', num: -1, num1: -1, num2: -1, cardNo: '62221234214752459631' },
          { name: 'name6', role: 'role6', rate: 4, sex: '1', num: '10000', num1: '10000', num2: '10000', cardNo: '62221267214853659622' },
          { name: 'name7', role: 'role7', rate: 1, sex: '1', num: 10000000000000.001, num1: 10000000000000.001, num2: 10000000000000.001, cardNo: '62221237123480359633' },
          { name: 'name8', role: 'role8', rate: 5, sex: '2', num: 9998, num1: 9998, num2: 9998, cardNo: '62221234018523736237' },
          { name: 'name9', role: 'role9', rate: 8, sex: '1', num: 70000, num1: 70000, num2: 70000, cardNo: '62221230283686397412' }
        ]
        this.mergeCells = [
          { row: 1, col: 1, rowspan: 2, colspan: 2 },
          { row: 4, col: 3, rowspan: 1, colspan: 3 }
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
    },
    footerMethod ({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '和值'
          }
          if (['age', 'rate'].includes(column.property)) {
            return XEUtils.sum(data, column.property)
          }
          return ''
        })
      ]
    }
  }
}
</script>
