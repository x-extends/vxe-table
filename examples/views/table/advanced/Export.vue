<template>
  <div>
    <p class="tip">
      通过调用 <table-api-link prop="exportData"/> 函数指定 type='csv' 可以直接将表格导出为 CSV/HTML/XML/TXT 格式的文件；<br>
      默认会排除 field 为空和 type 相关的功能列（除 seq、checkbox、radio 之外），可以通过自定义 <table-api-link prop="columnFilterMethod"/> 列过滤方法<br>
      对于 csv 等特殊类型，可以通过设置 <table-column-api-link prop="cell-type"/> 将数值类型转为字符串类型<br>
      如果是服务端导出，通过设置 <table-api-link prop="remote"/> 和 <table-api-link prop="exportMethod"/> 开启服务端自定义导出<br>
      <span class="red">（注：树结构和虚拟滚动只允许导出数据源，前端导出的数据量有限，建议使用后端导出）</span>
    </p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="demo1.showOverflow = !demo1.showOverflow">单元格是否换行</vxe-button>
        <vxe-button @click="exportDataEvent">默认导出</vxe-button>
        <vxe-button @click="exportSelectEvent">导出选中</vxe-button>
        <vxe-button @click="openExportEvent">高级导出</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      highlight-hover-row
      ref="xTable1"
      height="300"
      :show-overflow="demo1.showOverflow"
      :export-config="{}"
      :data="demo1.tableData1">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-colgroup title="Group1">
        <vxe-table-column field="name" title="Name"></vxe-table-column>
      </vxe-table-colgroup>
      <vxe-table-colgroup title="Group2">
        <vxe-table-column field="attr1" title="自动转换"></vxe-table-column>
        <vxe-table-column field="amount" title="导出数值" cell-type="number"></vxe-table-column>
        <vxe-table-column field="num" title="导出字符串" cell-type="string" sortable></vxe-table-column>
      </vxe-table-colgroup>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">配置 <table-api-link prop="columnFilterMethod"/> 参数过滤指定列</p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="exportDataEvent2">导出指定列 [name,sex]</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      highlight-hover-row
      ref="xTable2"
      height="300"
      :data="demo2.tableData2">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[3] }}</pre-code>
    </pre>

    <p class="tip">配置 <table-api-link prop="dataFilterMethod"/> 参数过滤指定行</p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="exportDataEvent3">导出 sex=1 的行</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      show-footer
      highlight-hover-row
      height="300"
      ref="xTable3"
      :footer-method="footerMethod"
      :data="demo3.tableData3">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :formatter="formatterSex"></vxe-table-column>
      <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[4] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[5] }}</pre-code>
    </pre>

    <p class="tip">不导出表头，指定文件名，导出源数据,格式化数据</p>

    <vxe-toolbar>
      <template #buttons>
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
      :loading="demo4.loading"
      :footer-method="footerMethod"
      :data="demo4.tableData4">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :formatter="formatterSex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column type="html" field="html1" title="Html片段"></vxe-table-column>
    </vxe-table>

    <vxe-pager
      :loading="demo4.loading"
      :current-page="demo4.tablePage4.currentPage"
      :page-size="demo4.tablePage4.pageSize"
      :total="demo4.tablePage4.totalResult"
      :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
      @page-change="handlePageChange4">
    </vxe-pager>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[6] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[7] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { VxeTableInstance, VxeTablePropTypes, VxeColumnPropTypes, VxePagerEvents, VxeButtonEvents } from '../../../../types/index'
import XEUtils from 'xe-utils'

export default defineComponent({
  setup () {
    const demo1 = reactive({
      showOverflow: false,
      tableData1: [
        { name: 'test1', attr1: 'test1', amount: '12953.6985', num: 1259326 },
        { name: 'tesfg t1', attr1: '154645623546345', amount: '45646464888888654654', num: 4564566456645 },
        { name: 'sdf sgfd fdg', attr1: 1231242, amount: '4564564545646.6985', num: 0 },
        { name: 'test1', attr1: true, amount: '12953.6985', num: 54646646 },
        { name: 'aaa\n换行bb\n换行gg', attr1: '0', amount: '0', num: '645645645665567645234326456' },
        { name: 'te st1', attr1: false, amount: '1231231213123.456', num: '45645645645646456' },
        { name: 'tesf \n换行g t6', attr1: 'test2', amount: '99999.08', num: 9999.88 }
      ]
    })

    const xTable1 = ref({} as VxeTableInstance)

    const formatterSex: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
      if (cellValue === '1') {
        return '男'
      } else if (cellValue === '0') {
        return '女'
      }
      return cellValue
    }

    const footerMethod: VxeTablePropTypes.FooterMethod = ({ columns, data }) => {
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
    }

    const exportDataEvent: VxeButtonEvents.Click = () => {
      const $table = xTable1.value
      $table.exportData({ type: 'csv' })
    }

    const exportSelectEvent: VxeButtonEvents.Click = () => {
      const $table = xTable1.value
      $table.exportData({
        data: $table.getCheckboxRecords()
      })
    }

    const openExportEvent: VxeButtonEvents.Click = () => {
      const $table = xTable1.value
      $table.openExport()
    }

    const demo2 = reactive({
      tableData2: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃' },
        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃' },
        { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃' }
      ]
    })

    const xTable2 = ref({} as VxeTableInstance)

    const exportDataEvent2: VxeButtonEvents.Click = () => {
      const $table = xTable2.value
      $table.exportData({
        type: 'csv',
        columnFilterMethod ({ column }) {
          return ['name', 'sex'].includes(column.property)
        }
      })
    }

    const demo3 = reactive({
      tableData3: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃' },
        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃' },
        { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃' }
      ]
    })

    const xTable3 = ref({} as VxeTableInstance)

    const exportDataEvent3: VxeButtonEvents.Click = () => {
      const $table = xTable3.value
      $table.exportData({
        type: 'csv',
        dataFilterMethod ({ row }) {
          return row.sex === '1'
        }
      })
    }

    const demo4 = reactive({
      loading: false,
      tableData4: [] as any[],
      tablePage4: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0
      }
    })

    const xTable4 = ref({} as VxeTableInstance)

    const findList4 = () => {
      demo4.loading = true
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
        demo4.tableData4 = list
        demo4.tablePage4.totalResult = 20
        demo4.loading = false
      }, 100)
    }

    const handlePageChange4: VxePagerEvents.PageChange = ({ currentPage, pageSize }) => {
      demo4.tablePage4.currentPage = currentPage
      demo4.tablePage4.pageSize = pageSize
      findList4()
    }

    const exportCurrDataEvent4: VxeButtonEvents.Click = () => {
      const $table = xTable4.value
      $table.exportData({
        filename: '自定义文件名',
        type: 'html',
        isHeader: true,
        isFooter: true
      })
    }

    const exportDataEvent4: VxeButtonEvents.Click = () => {
      const $table = xTable4.value
      $table.exportData({
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
    }

    const exportAllDataEvent4: VxeButtonEvents.Click = () => {
      demo4.loading = true
      setTimeout(() => {
        const $table = xTable4.value
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
        $table.exportData({
          filename: '自定义文件名',
          type: 'csv',
          isHeader: true,
          isFooter: true,
          data: list
        })
        demo4.loading = false
      }, 100)
    }

    findList4()

    return {
      demo1,
      xTable1,
      formatterSex,
      footerMethod,
      exportDataEvent,
      exportSelectEvent,
      openExportEvent,
      demo2,
      xTable2,
      exportDataEvent2,
      demo3,
      xTable3,
      exportDataEvent3,
      demo4,
      xTable4,
      handlePageChange4,
      exportCurrDataEvent4,
      exportDataEvent4,
      exportAllDataEvent4,
      demoCodes: [
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-button @click="demo1.showOverflow = !demo1.showOverflow">单元格是否换行</vxe-button>
            <vxe-button @click="exportDataEvent">默认导出</vxe-button>
            <vxe-button @click="exportSelectEvent">导出选中</vxe-button>
            <vxe-button @click="openExportEvent">高级导出</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          highlight-hover-row
          ref="xTable1"
          height="300"
          :show-overflow="demo1.showOverflow"
          :export-config="{}"
          :data="demo1.tableData1">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-colgroup title="Group1">
            <vxe-table-column field="name" title="Name"></vxe-table-column>
          </vxe-table-colgroup>
          <vxe-table-colgroup title="Group2">
            <vxe-table-column field="attr1" title="自动转换"></vxe-table-column>
            <vxe-table-column field="amount" title="导出数值" cell-type="number"></vxe-table-column>
            <vxe-table-column field="num" title="导出字符串" cell-type="string" sortable></vxe-table-column>
          </vxe-table-colgroup>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VxeTableInstance, VxeButtonEvents } from 'vxe-table'

        export default defineComponent({
          setup () {
            const demo1 = reactive({
              showOverflow: false,
              tableData1: [
                { name: 'test1', attr1: 'test1', amount: '12953.6985', num: 1259326 },
                { name: 'tesfg t1', attr1: '154645623546345', amount: '45646464888888654654', num: 4564566456645 },
                { name: 'sdf sgfd fdg', attr1: 1231242, amount: '4564564545646.6985', num: 0 },
                { name: 'test1', attr1: true, amount: '12953.6985', num: 54646646 },
                { name: 'aaa\n换行bb\n换行gg', attr1: '0', amount: '0', num: '645645645665567645234326456' },
                { name: 'te st1', attr1: false, amount: '1231231213123.456', num: '45645645645646456' },
                { name: 'tesf \n换行g t6', attr1: 'test2', amount: '99999.08', num: 9999.88 }
              ]
            })

            const xTable1 = ref({} as VxeTableInstance)

            const exportDataEvent: VxeButtonEvents.Click = () => {
              const $table = xTable1.value
              $table.exportData({ type: 'csv' })
            }

            const exportSelectEvent: VxeButtonEvents.Click = () => {
              const $table = xTable1.value
              $table.exportData({
                data: $table.getCheckboxRecords()
              })
            }

            const openExportEvent: VxeButtonEvents.Click = () => {
              const $table = xTable1.value
              $table.openExport()
            }

            return {
              demo1,
              xTable1,
              exportDataEvent,
              exportSelectEvent,
              openExportEvent
            }
          }
        })
        `,
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-button @click="exportDataEvent2">导出指定列 [name,sex]</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          highlight-hover-row
          ref="xTable2"
          height="300"
          :data="demo2.tableData2">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VxeTableInstance, VxeButtonEvents } from 'vxe-table'

        export default defineComponent({
          setup () {
            const demo2 = reactive({
              tableData2: [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃' },
                { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃' },
                { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃' }
              ]
            })

            const xTable2 = ref({} as VxeTableInstance)

            const exportDataEvent2: VxeButtonEvents.Click = () => {
              const $table = xTable2.value
              $table.exportData({
                type: 'csv',
                columnFilterMethod ({ column }) {
                  return ['name', 'sex'].includes(column.property)
                }
              })
            }

            return {
              demo2,
              xTable2,
              exportDataEvent2
            }
          }
        })
        `,
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-button @click="exportDataEvent3">导出 sex=1 的行</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          show-footer
          highlight-hover-row
          height="300"
          ref="xTable3"
          :footer-method="footerMethod"
          :data="demo3.tableData3">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :formatter="formatterSex"></vxe-table-column>
          <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VxeTableInstance, VxeTablePropTypes, VxeColumnPropTypes, VxeButtonEvents } from 'vxe-table'
        import XEUtils from 'xe-utils'

        export default defineComponent({
          setup () {
            const formatterSex: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
              if (cellValue === '1') {
                return '男'
              } else if (cellValue === '0') {
                return '女'
              }
              return cellValue
            }

            const footerMethod: VxeTablePropTypes.FooterMethod = ({ columns, data }) => {
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
            }

            const demo3 = reactive({
              tableData3: [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃' },
                { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃' },
                { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃' }
              ]
            })

            const xTable3 = ref({} as VxeTableInstance)

            const exportDataEvent3: VxeButtonEvents.Click = () => {
              const $table = xTable3.value
              $table.exportData({
                type: 'csv',
                dataFilterMethod ({ row }) {
                  return row.sex === '1'
                }
              })
            }

            return {
              formatterSex,
              footerMethod,
              demo3,
              xTable3,
              exportDataEvent3
            }
          }
        })
        `,
        `
        <vxe-toolbar>
          <template #buttons>
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
          :loading="demo4.loading"
          :footer-method="footerMethod"
          :data="demo4.tableData4">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :formatter="formatterSex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column type="html" field="html1" title="Html片段"></vxe-table-column>
        </vxe-table>

        <vxe-pager
          :loading="demo4.loading"
          :current-page="demo4.tablePage4.currentPage"
          :page-size="demo4.tablePage4.pageSize"
          :total="demo4.tablePage4.totalResult"
          :layouts="['PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes', 'Total']"
          @page-change="handlePageChange4">
        </vxe-pager>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VxeTableInstance, VxeTablePropTypes, VxeColumnPropTypes, VxePagerEvents, VxeButtonEvents } from 'vxe-table'
        import XEUtils from 'xe-utils'

        export default defineComponent({
          setup () {
            const formatterSex: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
              if (cellValue === '1') {
                return '男'
              } else if (cellValue === '0') {
                return '女'
              }
              return cellValue
            }

            const footerMethod: VxeTablePropTypes.FooterMethod = ({ columns, data }) => {
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
            }

            const demo4 = reactive({
              loading: false,
              tableData4: [] as any[],
              tablePage4: {
                currentPage: 1,
                pageSize: 10,
                totalResult: 0
              }
            })

            const xTable4 = ref({} as VxeTableInstance)

            const findList4 = () => {
              demo4.loading = true
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
                demo4.tableData4 = list
                demo4.tablePage4.totalResult = 20
                demo4.loading = false
              }, 100)
            }

            const handlePageChange4: VxePagerEvents.PageChange = ({ currentPage, pageSize }) => {
              demo4.tablePage4.currentPage = currentPage
              demo4.tablePage4.pageSize = pageSize
              findList4()
            }

            const exportCurrDataEvent4: VxeButtonEvents.Click = () => {
              const $table = xTable4.value
              $table.exportData({
                filename: '自定义文件名',
                type: 'html',
                isHeader: true,
                isFooter: true
              })
            }

            const exportDataEvent4: VxeButtonEvents.Click = () => {
              const $table = xTable4.value
              $table.exportData({
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
            }

            const exportAllDataEvent4: VxeButtonEvents.Click = () => {
              demo4.loading = true
              setTimeout(() => {
                const $table = xTable4.value
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
                $table.exportData({
                  filename: '自定义文件名',
                  type: 'csv',
                  isHeader: true,
                  isFooter: true,
                  data: list
                })
                demo4.loading = false
              }, 100)
            }

            findList4()

            return {
              formatterSex,
              footerMethod,
              demo4,
              xTable4,
              handlePageChange4,
              exportCurrDataEvent4,
              exportDataEvent4,
              exportAllDataEvent4
            }
          }
        })
        `
      ]
    }
  }
})
</script>
