<template>
  <div>
    <p class="tip">
      通过调用 <table-api-link prop="exportData"/> 函数指定 type='csv' 可以直接将表格导出为 CSV/HTML/XML/TXT 格式的文件；<br>
      默认会排除 field 为空和 type 相关的功能列，可以通过自定义 <table-api-link prop="data"/> 和 <table-api-link prop="columns"/> 导出数据<br>
      对于 csv 等特殊类型，可以通过设置 <table-column-api-link prop="cell-type"/> 将数值类型转为字符串类型<br>
      如果是服务端导出，通过设置 <table-api-link prop="remote"/> 和 <table-api-link prop="exportMethod"/> 开启服务端自定义导出<br>
      <span class="red">（注：树结构和虚拟滚动只允许导出数据源，前端导出的数据量有限，建议使用后端导出）</span>
    </p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="exportDataEvent">默认导出</vxe-button>
        <vxe-button @click="exportSelectEvent">导出选中</vxe-button>
        <vxe-button @click="openExportEvent">高级导出</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      highlight-hover-row
      border="inner"
      ref="xTable1"
      height="300"
      :export-config="{}"
      :data="tableData1">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="自动转换"></vxe-table-column>
      <vxe-table-column field="amount" title="导出数值" cell-type="number"></vxe-table-column>
      <vxe-table-column field="num" title="导出字符串" cell-type="string" sortable></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">配置 <table-api-link prop="columnFilterMethod"/> 参数过滤指定列</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="exportDataEvent2">导出指定列 [name,sex]</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      highlight-hover-row
      ref="xTable2"
      height="300"
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[3] }}</pre-code>
    </pre>

    <p class="tip">配置 <table-api-link prop="dataFilterMethod"/> 参数过滤指定行</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="exportDataEvent3">导出 sex=1 的行</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      show-footer
      highlight-hover-row
      height="300"
      ref="xTable3"
      :footer-method="footerMethod"
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :formatter="formatterSex"></vxe-table-column>
      <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[4] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[5] }}</pre-code>
    </pre>

    <p class="tip">不导出表头，指定文件名，导出源数据,格式化数据</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="exportCurrDataEvent4">导出当前页</vxe-button>
        <vxe-button @click="exportDataEvent4">自定义数据导出</vxe-button>
        <vxe-button @click="exportAllDataEvent4">全量导出后台数据</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      show-footer
      highlight-hover-row
      ref="xTable4"
      height="300"
      :loading="loading"
      :footer-method="footerMethod"
      :data="tableData4">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :formatter="formatterSex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column type="html" field="html1" title="Html片段"></vxe-table-column>
    </vxe-table>

    <vxe-pager
      :loading="loading"
      :current-page="tablePage4.currentPage"
      :page-size="tablePage4.pageSize"
      :total="tablePage4.totalResult"
      :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
      @page-change="handlePageChange">
    </vxe-pager>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[6] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[7] }}</pre-code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      loading: false,
      tableData: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃' },
        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃' },
        { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃' }
      ],
      tableData1: [
        { name: 'test1', amount: '12953.6985', num: 1259326 },
        { name: '154645623546345', amount: '45646464888888654654', num: 4564566456645 },
        { name: 1231242, amount: '4564564545646.6985', num: 0 },
        { name: true, amount: '12953.6985', num: 54646646 },
        { name: '0', amount: '0', num: '645645645665567645234326456' },
        { name: false, amount: '1231231213123.456', num: '45645645645646456' },
        { name: 'test2', amount: '99999.08', num: 9999.88 }
      ],
      tableData4: [],
      tablePage4: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0
      },
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="exportDataEvent">默认导出</vxe-button>
            <vxe-button @click="exportSelectEvent">导出选中</vxe-button>
            <vxe-button @click="openExportEvent">高级导出</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          highlight-hover-row
          border="inner"
          ref="xTable1"
          height="300"
          :export-config="{}"
          :data="tableData1">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="自动转换"></vxe-table-column>
          <vxe-table-column field="amount" title="导出数值" cell-type="number"></vxe-table-column>
          <vxe-table-column field="num" title="导出字符串" cell-type="string" sortable></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData1: [
                { name: 'test1', amount: '12953.6985', num: 1259326 },
                { name: '154645623546345', amount: '45646464888888654654', num: 4564566456645 },
                { name: 1231242, amount: '4564564545646.6985', num: 0 },
                { name: true, amount: '12953.6985', num: 54646646 },
                { name: '0', amount: '0', num: '645645645665567645234326456' },
                { name: false, amount: '1231231213123.456', num: '45645645645646456' },
                { name: 'test2', amount: '99999.08', num: 9999.88 }
              ]
            }
          },
          methods: {
            exportDataEvent () {
              this.$refs.xTable1.exportData({ type: 'csv' })
            },
            exportSelectEvent () {
              this.$refs.xTable1.exportData({
                data: this.$refs.xTable1.getCheckboxRecords()
              })
            },
            openExportEvent () {
              this.$refs.xTable1.openExport()
            }
          }
        }
        `,
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="exportDataEvent2">导出指定列 [name,sex]</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          highlight-hover-row
          ref="xTable2"
          height="300"
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
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
            exportDataEvent2 () {
              this.$refs.xTable2.exportData({
                type: 'csv',
                columnFilterMethod ({ column }) {
                  return ['name', 'sex'].includes(column.property)
                }
              })
            }
          }
        }
        `,
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="exportDataEvent3">导出指定第10-20行</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          show-footer
          highlight-hover-row
          height="300"
          ref="xTable3"
          :footer-method="footerMethod"
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :formatter="formatterSex"></vxe-table-column>
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
            formatterSex ({ cellValue }) {
              if (cellValue === '1') {
                return '男'
              } else if (cellValue === '0') {
                return '女'
              }
              return cellValue
            },
            footerMethod ({ columns, data }) {
              const footerData = [
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '平均'
                  }
                  if (['age'].includes(column.property)) {
                    return XEUtils.mean(data, column.property)
                  }
                  return null
                })
              ]
              return footerData
            },
            exportDataEvent3 () {
              this.$refs.xTable3.exportData({
                type: 'csv',
                dataFilterMethod ({ row }) {
                  return row.sex === '1'
                }
              })
            }
          }
        }
        `,
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="exportCurrDataEvent4">导出当前页</vxe-button>
            <vxe-button @click="exportDataEvent4">自定义数据导出</vxe-button>
            <vxe-button @click="exportAllDataEvent4">全量导出后台数据</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          show-footer
          highlight-hover-row
          ref="xTable4"
          height="300"
          :loading="loading"
          :footer-method="footerMethod"
          :data="tableData4">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :formatter="formatterSex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column type="html" field="html1" title="Html片段"></vxe-table-column>
        </vxe-table>

        <vxe-pager
          :loading="loading"
          :current-page="tablePage4.currentPage"
          :page-size="tablePage4.pageSize"
          :total="tablePage4.totalResult"
          :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
          @page-change="handlePageChange">
        </vxe-pager>
        `,
        `
        export default {
          data () {
            return {
              tableData4: [],
              tablePage4: {
                currentPage: 1,
                pageSize: 10,
                totalResult: 0
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
                const list = [
                  { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃', html1: '<span>111</span>' },
                  { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou', html1: '<span>111</span>' },
                  { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai', html1: '<span>456</span>' },
                  { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃', html1: '<span>111</span>' },
                  { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai', html1: '<span>456</span>' },
                  { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃', html1: '<span>56</span>' },
                  { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃', html1: '<span>768</span>' },
                  { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃', html1: '<span>789</span>' }
                ]
                this.tableData4 = list
                this.tablePage4.totalResult = 20
                this.loading = false
              }, 100)
            },
            handlePageChange ({ currentPage, pageSize }) {
              this.tablePage4.currentPage = currentPage
              this.tablePage4.pageSize = pageSize
              this.findList()
            },
            formatterSex ({ cellValue }) {
              if (cellValue === '1') {
                return '男'
              } else if (cellValue === '0') {
                return '女'
              }
              return cellValue
            },
            footerMethod ({ columns, data }) {
              const footerData = [
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '平均'
                  }
                  if (['age'].includes(column.property)) {
                    return XEUtils.mean(data, column.property)
                  }
                  return null
                })
              ]
              return footerData
            },
            exportCurrDataEvent4 () {
              this.$refs.xTable4.exportData({
                filename: '自定义文件名',
                type: 'html',
                isHeader: true,
                isFooter: true
              })
            },
            exportDataEvent4 () {
              this.$refs.xTable4.exportData({
                filename: '自定义文件名',
                type: 'html',
                isHeader: true,
                isFooter: true,
                // 自定义导出的数据源
                data: [
                  { name: 'Name1', sex: '男', age: 26, role: '前端', html1: '<a>xxx1</a>' },
                  { name: 'Name2', sex: '女', age: 20, role: '测试', html1: '<a>xxx2</a>' },
                  { name: 'Name4', sex: '女', age: 22, role: '设计师', html1: '<a>xxx3</a>' }
                ]
              })
            },
            exportAllDataEvent4 () {
              this.loading = true
              setTimeout(() => {
                const list = [
                  { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃', html1: '<span>111</span>' },
                  { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou', html1: '<span>111</span>' },
                  { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai', html1: '<span>456</span>' },
                  { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃', html1: '<span>111</span>' },
                  { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai', html1: '<span>456</span>' },
                  { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃', html1: '<span>56</span>' },
                  { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃', html1: '<span>768</span>' },
                  { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃', html1: '<span>789</span>' }
                ]
                this.$refs.xTable4.exportData({
                  filename: '自定义文件名',
                  type: 'csv',
                  isHeader: true,
                  isFooter: true,
                  data: list
                })
                this.loading = false
              }, 100)
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
        const list = [
          { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃', html1: '<span>111</span>' },
          { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou', html1: '<span>111</span>' },
          { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai', html1: '<span>456</span>' },
          { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃', html1: '<span>111</span>' },
          { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai', html1: '<span>456</span>' },
          { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃', html1: '<span>56</span>' },
          { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃', html1: '<span>768</span>' },
          { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃', html1: '<span>789</span>' }
        ]
        this.tableData4 = list
        this.tablePage4.totalResult = 20
        this.loading = false
      }, 100)
    },
    handlePageChange ({ currentPage, pageSize }) {
      this.tablePage4.currentPage = currentPage
      this.tablePage4.pageSize = pageSize
      this.findList()
    },
    formatterSex ({ cellValue }) {
      if (cellValue === '1') {
        return '男'
      } else if (cellValue === '0') {
        return '女'
      }
      return cellValue
    },
    footerMethod ({ columns, data }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '平均'
          }
          if (['age'].includes(column.property)) {
            return XEUtils.mean(data, column.property)
          }
          return null
        })
      ]
      return footerData
    },
    exportDataEvent () {
      this.$refs.xTable1.exportData({ type: 'csv' })
    },
    exportSelectEvent () {
      this.$refs.xTable1.exportData({
        data: this.$refs.xTable1.getCheckboxRecords()
      })
    },
    openExportEvent () {
      this.$refs.xTable1.openExport()
    },
    exportDataEvent2 () {
      this.$refs.xTable2.exportData({
        type: 'csv',
        columnFilterMethod ({ column }) {
          return ['name', 'sex'].includes(column.property)
        }
      })
    },
    exportDataEvent3 () {
      this.$refs.xTable3.exportData({
        type: 'csv',
        dataFilterMethod ({ row }) {
          return row.sex === '1'
        }
      })
    },
    exportCurrDataEvent4 () {
      this.$refs.xTable4.exportData({
        filename: '自定义文件名',
        type: 'html',
        isHeader: true,
        isFooter: true
      })
    },
    exportDataEvent4 () {
      this.$refs.xTable4.exportData({
        filename: '自定义文件名',
        type: 'html',
        isHeader: true,
        isFooter: true,
        // 自定义导出的数据源
        data: [
          { name: 'Name1', sex: '男', age: 26, role: '前端', html1: '<a>xxx1</a>' },
          { name: 'Name2', sex: '女', age: 20, role: '测试', html1: '<a>xxx2</a>' },
          { name: 'Name4', sex: '女', age: 22, role: '设计师', html1: '<a>xxx3</a>' }
        ]
      })
    },
    exportAllDataEvent4 () {
      this.loading = true
      setTimeout(() => {
        const list = [
          { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃', html1: '<span>111</span>' },
          { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou', html1: '<span>111</span>' },
          { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai', html1: '<span>456</span>' },
          { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃', html1: '<span>111</span>' },
          { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai', html1: '<span>456</span>' },
          { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃', html1: '<span>56</span>' },
          { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃', html1: '<span>768</span>' },
          { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃', html1: '<span>789</span>' }
        ]
        this.$refs.xTable4.exportData({
          filename: '自定义文件名',
          type: 'csv',
          isHeader: true,
          isFooter: true,
          data: list
        })
        this.loading = false
      }, 100)
    }
  }
}
</script>
