<template>
  <div>
    <p class="tip">
      具体兼容请查看 <a class="link" href="https://github.com/x-extends/vxe-table-plugin-export-pdf" target="_blank">vxe-table-plugin-export-pdf</a> 插件的 API<span class="red">（建议使用后端导出）</span><br>
      <span class="red">（注：该示例仅供参考，默认是不支持中文字体的，可以通过设置 <a class="link" href="https://github.com/x-extends/vxe-table-plugin-export-pdf#font" target="_blank">字体</a> 解决）</span>
    </p>

    <vxe-toolbar ref="xToolbar" custom export>
      <template #buttons>
        <vxe-button @click="exportDataEvent">导出数据</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      ref="xTable"
      height="400"
      :loading="demo1.loading"
      :export-config="demo1.tableExport"
      :data="demo1.tableData">
      <vxe-table-column field="orderNo" title="Order NO"></vxe-table-column>
      <vxe-table-column field="productNo" title="Product NO"></vxe-table-column>
      <vxe-table-column field="productName" title="Product name"></vxe-table-column>
      <vxe-table-column field="realNum" title="Real quantity"></vxe-table-column>
      <vxe-table-column field="plannedNum" title="Planned quantity"></vxe-table-column>
      <vxe-table-column field="describe" title="Describe"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, reactive, ref } from 'vue'
import { VxeTableInstance, VxeTablePropTypes, VxeToolbarInstance } from '../../../../types/vxe-table'

export default defineComponent({
  setup () {
    const demo1 = reactive({
      loading: false,
      tableData: [] as any[],
      tableExport: {
        // 默认选中类型
        type: 'pdf',
        // 自定义类型
        types: ['pdf', 'csv', 'html', 'xml', 'txt']
      } as VxeTablePropTypes.ExpandConfig
    })

    const xTable = ref({} as VxeTableInstance)
    const xToolbar = ref({} as VxeToolbarInstance)

    const exportDataEvent = () => {
      const $table = xTable.value
      $table.exportData({
        filename: 'Order details',
        sheetName: 'Order details ( X02514645652 )',
        type: 'pdf'
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
        { orderNo: 'X02514645652', productNo: 'SX001', productName: 'XXX', realNum: 34, plannedNum: 20, describe: '' },
        { orderNo: 'X02456765765', productNo: 'Sk001', productName: 'Mouse', realNum: 64, plannedNum: 80, describe: 'Account paid' },
        { orderNo: 'X05672556765', productNo: 'SX002', productName: 'Keyboard', realNum: 127, plannedNum: 88, describe: '' },
        { orderNo: 'X06768905676', productNo: 'SX003', productName: 'Keyboard', realNum: 13, plannedNum: 90, describe: '' },
        { orderNo: 'X05672556765', productNo: 'SX004', productName: 'Mouse', realNum: 89, plannedNum: 12, describe: '' },
        { orderNo: 'X00172556761', productNo: 'SX005', productName: 'Mouse', realNum: 46, plannedNum: 56, describe: '' },
        { orderNo: 'X05672556460', productNo: 'SX006', productName: 'Keyboard', realNum: 146, plannedNum: 3, describe: '' },
        { orderNo: 'X01872556499', productNo: 'SX007', productName: 'Keyboard', realNum: 47, plannedNum: 44, describe: '' },
        { orderNo: 'X77672556431', productNo: 'SX008', productName: 'Mouse', realNum: 126, plannedNum: 61, describe: '' }
      ]
      demo1.loading = false
    }, 100)

    return {
      demo1,
      xTable,
      xToolbar,
      exportDataEvent,
      demoCodes: [
        `
        <vxe-toolbar ref="xToolbar" custom export>
          <template #buttons>
            <vxe-button @click="exportDataEvent">导出数据</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          ref="xTable"
          height="400"
          :loading="demo1.loading"
          :export-config="demo1.tableExport"
          :data="demo1.tableData">
          <vxe-table-column field="orderNo" title="Order NO"></vxe-table-column>
          <vxe-table-column field="productNo" title="Product NO"></vxe-table-column>
          <vxe-table-column field="productName" title="Product name"></vxe-table-column>
          <vxe-table-column field="realNum" title="Real quantity"></vxe-table-column>
          <vxe-table-column field="plannedNum" title="Planned quantity"></vxe-table-column>
          <vxe-table-column field="describe" title="Describe"></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, nextTick, reactive, ref } from 'vue'
        import { VxeTableInstance, VxeTablePropTypes, VxeToolbarInstance } from 'vxe-table'

        export default defineComponent({
          setup () {
            const demo1 = reactive({
              loading: false,
              tableData: [] as any[],
              tableExport: {
                // 默认选中类型
                type: 'pdf',
                // 自定义类型
                types: ['pdf', 'csv', 'html', 'xml', 'txt']
              } as VxeTablePropTypes.ExpandConfig
            })

            const xTable = ref({} as VxeTableInstance)
            const xToolbar = ref({} as VxeToolbarInstance)

            const exportDataEvent = () => {
              const $table = xTable.value
              $table.exportData({
                filename: 'Order details',
                sheetName: 'Order details ( X02514645652 )',
                type: 'pdf'
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
                { orderNo: 'X02514645652', productNo: 'SX001', productName: 'XXX', realNum: 34, plannedNum: 20, describe: '' },
                { orderNo: 'X02456765765', productNo: 'Sk001', productName: 'Mouse', realNum: 64, plannedNum: 80, describe: 'Account paid' },
                { orderNo: 'X05672556765', productNo: 'SX002', productName: 'Keyboard', realNum: 127, plannedNum: 88, describe: '' },
                { orderNo: 'X06768905676', productNo: 'SX003', productName: 'Keyboard', realNum: 13, plannedNum: 90, describe: '' },
                { orderNo: 'X05672556765', productNo: 'SX004', productName: 'Mouse', realNum: 89, plannedNum: 12, describe: '' },
                { orderNo: 'X00172556761', productNo: 'SX005', productName: 'Mouse', realNum: 46, plannedNum: 56, describe: '' },
                { orderNo: 'X05672556460', productNo: 'SX006', productName: 'Keyboard', realNum: 146, plannedNum: 3, describe: '' },
                { orderNo: 'X01872556499', productNo: 'SX007', productName: 'Keyboard', realNum: 47, plannedNum: 44, describe: '' },
                { orderNo: 'X77672556431', productNo: 'SX008', productName: 'Mouse', realNum: 126, plannedNum: 61, describe: '' }
              ]
              demo1.loading = false
            }, 100)

            return {
              demo1,
              xTable,
              xToolbar,
              exportDataEven
            }
          }
        })
        `
      ]
    }
  }
})
</script>
