<template>
  <div>
    <p class="tip">
      具体兼容请查看 <a class="link" href="https://github.com/x-extends/vxe-table-plugin-export-xlsx/tree/v2" target="_blank">vxe-table-plugin-export-xlsx</a> 插件的 API<br>
      <span class="red">（注：该示例仅供参考，建议使用后端导出）</span>
      </p>

    <vxe-toolbar custom import export>
      <template #buttons>
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
      height="500"
      :align="align"
      :loading="loading"
      :footer-method="footerMethod"
      :import-config="tableImport"
      :export-config="tableExport"
      :merge-cells="mergeCells"
      :merge-footer-items="mergeFooterItems"
      :data="tableData">
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-colgroup title="Group1">
        <vxe-column field="name" title="名称"></vxe-column>
        <vxe-column field="date1" title="日期"></vxe-column>
        <vxe-colgroup title="Group2">
          <vxe-column field="sex" title="格式化" :formatter="formatterSex"></vxe-column>
          <vxe-column field="num" title="数值-默认"></vxe-column>
        </vxe-colgroup>
      </vxe-colgroup>
      <vxe-colgroup title="Group1">
        <vxe-column field="num1" title="数值-数值" cell-type="number"></vxe-column>
        <vxe-column field="num2" title="数值-字符串" cell-type="string"></vxe-column>
      </vxe-colgroup>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script>
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
      mergeFooterItems: [],
      demoCodes: [
        `
        <vxe-toolbar custom import export>
          <template #buttons>
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
          height="500"
          :align="align"
          :loading="loading"
          :footer-method="footerMethod"
          :import-config="tableImport"
          :export-config="tableExport"
          :merge-cells="mergeCells"
          :merge-footer-items="mergeFooterItems"
          :data="tableData">
          <vxe-column type="checkbox" width="60"></vxe-column>
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-colgroup title="Group1">
            <vxe-column field="name" title="名称"></vxe-column>
            <vxe-column field="date1" title="日期"></vxe-column>
            <vxe-colgroup title="Group2">
              <vxe-column field="sex" title="格式化" :formatter="formatterSex"></vxe-column>
              <vxe-column field="num" title="数值-默认"></vxe-column>
            </vxe-colgroup>
          </vxe-colgroup>
          <vxe-colgroup title="Group1">
            <vxe-column field="num1" title="数值-数值" cell-type="number"></vxe-column>
            <vxe-column field="num2" title="数值-字符串" cell-type="string"></vxe-column>
          </vxe-colgroup>
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
              mergeCells: [],
              mergeFooterItems: []
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
                  { name: 'name1', role: 'role1', rate: 1, date1: '2021-06-02 10:05:20', sex: '0', num: '22', num1: '22', num2: '22', cardNo: '998' },
                  { name: 'name2', role: 'role2', rate: 1, date1: '2021-01-28 16:05:28', sex: '1', num: 32, num1: 32, num2: 32, cardNo: 10000 },
                  { name: 'name3', role: 'role3', rate: 6, date1: '2021-05-04 11:05:48', sex: '1', num: 99999999999999, num1: 99999999999999, num2: 99999999999999, cardNo: '62221234219637458563' },
                  { name: 'name4', role: 'role4', rate: 3, date1: '2021-07-02 08:05:23', sex: '0', num: '999.99', num1: '999.99', num2: '999.99', cardNo: '62227412123789459631' },
                  { name: 'name5', role: 'role5', rate: 1, date1: '2021-02-15 05:05:20', sex: '1', num: -1, num1: -1, num2: -1, cardNo: '62221234214752459631' },
                  { name: 'name6', role: 'role6', rate: 4, date1: '2021-12-02 01:05:33', sex: '1', num: '10000', num1: '10000', num2: '10000', cardNo: '62221267214853659622' },
                  { name: 'name7', role: 'role7', rate: 1, date1: '2021-09-22 23:22:41', sex: '1', num: 10000000000000.001, num1: 10000000000000.001, num2: 10000000000000.001, cardNo: '62221237123480359633' },
                  { name: 'name8', role: 'role8', rate: 5, date1: '2021-11-02 22:08:27', sex: '2', num: 9998, num1: 9998, num2: 9998, cardNo: '62221234018523736237' },
                  { name: 'name9', role: 'role9', rate: 8, date1: '2021-01-02 14:05:52', sex: '1', num: 70000, num1: 70000, num2: 70000, cardNo: '62221230283686397412' }
                ]
                this.mergeFooterItems = [
                  { row: 0, col: 1, rowspan: 2, colspan: 2 },
                  { row: 1, col: 5, rowspan: 1, colspan: 3 }
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
            meanNum (list, field) {
              let count = 0
              list.forEach(item => {
                count += Number(item[field])
              })
              return count / list.length
            },
            sumNum (list, field) {
              let count = 0
              list.forEach(item => {
                count += Number(item[field])
              })
              return count
            },
            footerMethod ({ columns, data }) {
              const means = []
              const sums = []
              columns.forEach((column, columnIndex) => {
                if (columnIndex === 0) {
                  means.push('平均')
                  sums.push('和值')
                } else {
                  let meanCell = '-'
                  let sumCell = '-'
                  switch (column.property) {
                    case 'rate':
                    case 'num':
                    case 'num1':
                    case 'num2':
                      meanCell = parseInt(this.meanNum(data, column.property))
                      sumCell = this.sumNum(data, column.property)
                      break
                  }
                  means.push(meanCell)
                  sums.push(sumCell)
                }
              })
              // 返回一个二维数组的表尾合计
              return [means, sums]
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
          { name: 'name1', role: 'role1', rate: 1, date1: '2021-06-02 10:05:20', sex: '0', num: '22', num1: '22', num2: '22', cardNo: '998' },
          { name: 'name2', role: 'role2', rate: 1, date1: '2021-01-28 16:05:28', sex: '1', num: 32, num1: 32, num2: 32, cardNo: 10000 },
          { name: 'name3', role: 'role3', rate: 6, date1: '2021-05-04 11:05:48', sex: '1', num: 99999999999999, num1: 99999999999999, num2: 99999999999999, cardNo: '62221234219637458563' },
          { name: 'name4', role: 'role4', rate: 3, date1: '2021-07-02 08:05:23', sex: '0', num: '999.99', num1: '999.99', num2: '999.99', cardNo: '62227412123789459631' },
          { name: 'name5', role: 'role5', rate: 1, date1: '2021-02-15 05:05:20', sex: '1', num: -1, num1: -1, num2: -1, cardNo: '62221234214752459631' },
          { name: 'name6', role: 'role6', rate: 4, date1: '2021-12-02 01:05:33', sex: '1', num: '10000', num1: '10000', num2: '10000', cardNo: '62221267214853659622' },
          { name: 'name7', role: 'role7', rate: 1, date1: '2021-09-22 23:22:41', sex: '1', num: 10000000000000.001, num1: 10000000000000.001, num2: 10000000000000.001, cardNo: '62221237123480359633' },
          { name: 'name8', role: 'role8', rate: 5, date1: '2021-11-02 22:08:27', sex: '2', num: 9998, num1: 9998, num2: 9998, cardNo: '62221234018523736237' },
          { name: 'name9', role: 'role9', rate: 8, date1: '2021-01-02 14:05:52', sex: '1', num: 70000, num1: 70000, num2: 70000, cardNo: '62221230283686397412' }
        ]
        this.mergeCells = [
          { row: 1, col: 1, rowspan: 2, colspan: 2 },
          { row: 4, col: 3, rowspan: 1, colspan: 3 }
        ]
        this.mergeFooterItems = [
          { row: 0, col: 1, rowspan: 2, colspan: 2 },
          { row: 1, col: 5, rowspan: 1, colspan: 3 }
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
    meanNum (list, field) {
      let count = 0
      list.forEach(item => {
        count += Number(item[field])
      })
      return count / list.length
    },
    sumNum (list, field) {
      let count = 0
      list.forEach(item => {
        count += Number(item[field])
      })
      return count
    },
    footerMethod ({ columns, data }) {
      const means = []
      const sums = []
      columns.forEach((column, columnIndex) => {
        if (columnIndex === 0) {
          means.push('平均')
          sums.push('和值')
        } else {
          let meanCell = '-'
          let sumCell = '-'
          switch (column.property) {
            case 'rate':
            case 'num':
            case 'num1':
            case 'num2':
              meanCell = parseInt(this.meanNum(data, column.property))
              sumCell = this.sumNum(data, column.property)
              break
          }
          means.push(meanCell)
          sums.push(sumCell)
        }
      })
      // 返回一个二维数组的表尾合计
      return [means, sums]
    }
  }
}
</script>
