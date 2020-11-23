<template>
  <div>
    <p class="tip">
      具体兼容请查看 <a class="link" href="https://github.com/x-extends/vxe-table-plugin-export-xlsx" target="_blank">vxe-table-plugin-export-xlsx</a> 插件的 API<br>
      <span class="red">（注：该示例仅供参考，建议使用后端导出）</span>
    </p>

    <vxe-toolbar ref="xToolbar" custom import export>
      <template #buttons>
        <vxe-button @click="demo1.tableData = []">清空数据</vxe-button>
        <vxe-button @click="exportDataEvent">导出数据</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      ref="xTable"
      height="400"
      :loading="demo1.loading"
      :import-config="demo1.tableImport"
      :export-config="demo1.tableExport"
      :data="demo1.tableData">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-colgroup title="Group1">
        <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
        <vxe-table-column field="role" title="Role"></vxe-table-column>
        <vxe-table-colgroup title="Group2">
          <vxe-table-column field="sex" title="app.body.label.sex" width="80" :formatter="formatterSex"></vxe-table-column>
          <vxe-table-column field="other" title="默认自动转换" cell-type="auto"></vxe-table-column>
        </vxe-table-colgroup>
      </vxe-table-colgroup>
      <vxe-table-colgroup title="Group1">
        <vxe-table-column field="num" title="导出数值" cell-type="number"></vxe-table-column>
        <vxe-table-column field="cardNo" title="导出字符串" cell-type="string"></vxe-table-column>
      </vxe-table-colgroup>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, nextTick } from 'vue'
import { VxeTableInstance, VxeTablePropTypes, VxeColumnPropTypes, VxeToolbarInstance } from '../../../../types/vxe-table'

export default defineComponent({
  setup () {
    const demo1 = reactive({
      loading: false,
      tableData: [] as any[],
      tableImport: {
        // 自定义类型
        types: ['xlsx']
      } as VxeTablePropTypes.ImportConfig,
      tableExport: {
        // 默认选中类型
        type: 'xlsx',
        // 自定义类型
        types: ['xlsx', 'csv', 'html', 'xml', 'txt']
      } as VxeTablePropTypes.ExpandConfig
    })

    const xTable = ref({} as VxeTableInstance)
    const xToolbar = ref({} as VxeToolbarInstance)

    const formatterSex: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
      return cellValue ? (cellValue === '1' ? '男' : '女') : ''
    }

    const exportDataEvent = () => {
      const $table = xTable.value
      $table.exportData({
        filename: '导出',
        sheetName: 'Sheet1',
        type: 'xlsx'
      })
    }

    nextTick(() => {
      const $table = xTable.value
      const $toolbar = xToolbar.value
      $table.connect($toolbar)
    })

    demo1.loading = true
    setTimeout(() => {
      demo1.tableData = [
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
      demo1.loading = false
    }, 100)

    return {
      demo1,
      xTable,
      xToolbar,
      formatterSex,
      exportDataEvent,
      demoCodes: [
        `
        <vxe-toolbar ref="xToolbar" custom import export>
          <template #buttons>
            <vxe-button @click="demo1.tableData = []">清空数据</vxe-button>
            <vxe-button @click="exportDataEvent">导出数据</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          ref="xTable"
          height="400"
          :loading="demo1.loading"
          :import-config="demo1.tableImport"
          :export-config="demo1.tableExport"
          :data="demo1.tableData">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-colgroup title="Group1">
            <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
            <vxe-table-column field="role" title="Role"></vxe-table-column>
            <vxe-table-colgroup title="Group2">
              <vxe-table-column field="sex" title="app.body.label.sex" width="80" :formatter="formatterSex"></vxe-table-column>
              <vxe-table-column field="other" title="默认自动转换" cell-type="auto"></vxe-table-column>
            </vxe-table-colgroup>
          </vxe-table-colgroup>
          <vxe-table-colgroup title="Group1">
            <vxe-table-column field="num" title="导出数值" cell-type="number"></vxe-table-column>
            <vxe-table-column field="cardNo" title="导出字符串" cell-type="string"></vxe-table-column>
          </vxe-table-colgroup>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref, nextTick } from 'vue'
        import { VxeTableInstance, VxeTablePropTypes, VxeColumnPropTypes, VxeToolbarInstance } from 'vxe-table'

        export default defineComponent({
          setup () {
            const demo1 = reactive({
              loading: false,
              tableData: [] as any[],
              tableImport: {
                // 自定义类型
                types: ['xlsx']
              } as VxeTablePropTypes.ImportConfig,
              tableExport: {
                // 默认选中类型
                type: 'xlsx',
                // 自定义类型
                types: ['xlsx', 'csv', 'html', 'xml', 'txt']
              } as VxeTablePropTypes.ExpandConfig
            })

            const xTable = ref({} as VxeTableInstance)
            const xToolbar = ref({} as VxeToolbarInstance)

            const formatterSex: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
              return cellValue ? (cellValue === '1' ? '男' : '女') : ''
            }

            const exportDataEvent = () => {
              const $table = xTable.value
              $table.exportData({
                filename: '导出',
                sheetName: 'Sheet1',
                type: 'xlsx'
              })
            }

            nextTick(() => {
              const $table = xTable.value
              const $toolbar = xToolbar.value
              $table.connect($toolbar)
            })

            demo1.loading = true
            setTimeout(() => {
              demo1.tableData = [
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
              demo1.loading = false
            }, 100)

            return {
              demo1,
              xTable,
              xToolbar,
              formatterSex,
              exportDataEvent
            }
          }
        })
        `
      ]
    }
  }
})
</script>
