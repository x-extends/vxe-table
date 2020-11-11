<template>
  <div>
    <p class="tip">
      通过调用 <table-api-link prop="print"/> 函数打印表格
      <span class="red">（注：打印的页数有限，如果超大数据量请关闭打印功能或者分页打印）</span>
    </p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="printEvent1">打印</vxe-button>
        <vxe-button @click="printSelectEvent">打印选中</vxe-button>
        <vxe-button @click="printEvent2">高级打印</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      show-footer
      ref="xTable"
      height="500"
      :print-config="{}"
      :footer-method="footerMethod"
      :data="demo1.tableData">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-colgroup title="Group1">
        <vxe-table-column field="name" title="Name"></vxe-table-column>
        <vxe-table-colgroup title="Group2">
          <vxe-table-column field="role" title="Role"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
        </vxe-table-colgroup>
        <vxe-table-column field="address" title="Address"></vxe-table-column>
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
import { defineComponent, reactive, ref } from 'vue'
import { VxeTableInstance, VxeTablePropTypes, VxeButtonEvents } from '../../../../types/vxe-table'
import XEUtils from 'xe-utils'

export default defineComponent({
  setup () {
    const demo1 = reactive({
      tableData: [
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

    const xTable = ref({} as VxeTableInstance)

    const printEvent1: VxeButtonEvents.Click = () => {
      const $table = xTable.value
      $table.print()
    }

    const printSelectEvent: VxeButtonEvents.Click = () => {
      const $table = xTable.value
      $table.print({
        data: $table.getCheckboxRecords()
      })
    }

    const printEvent2: VxeButtonEvents.Click = () => {
      const $table = xTable.value
      $table.openPrint()
    }

    const footerMethod: VxeTablePropTypes.FooterMethod = ({ columns, data }) => {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '平均'
          }
          if (['age', 'rate'].includes(column.property)) {
            return XEUtils.mean(data, column.property)
          }
          return null
        }),
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '和值'
          }
          if (['age', 'rate'].includes(column.property)) {
            return XEUtils.sum(data, column.property)
          }
          return null
        })
      ]
      return footerData
    }

    return {
      demo1,
      xTable,
      printEvent1,
      printSelectEvent,
      printEvent2,
      footerMethod,
      demoCodes: [
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-button @click="printEvent1">打印</vxe-button>
            <vxe-button @click="printSelectEvent">打印选中</vxe-button>
            <vxe-button @click="printEvent2">高级打印</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          show-footer
          ref="xTable"
          height="500"
          :print-config="{}"
          :footer-method="footerMethod"
          :data="demo1.tableData">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-colgroup title="Group1">
            <vxe-table-column field="name" title="Name"></vxe-table-column>
            <vxe-table-colgroup title="Group2">
              <vxe-table-column field="role" title="Role"></vxe-table-column>
              <vxe-table-column field="age" title="Age"></vxe-table-column>
            </vxe-table-colgroup>
            <vxe-table-column field="address" title="Address"></vxe-table-column>
          </vxe-table-colgroup>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VxeTableInstance, VxeTablePropTypes, VxeButtonEvents } from 'vxe-table'
        import XEUtils from 'xe-utils'

        export default defineComponent({
          setup () {
            const demo1 = reactive({
              tableData: [
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

            const xTable = ref({} as VxeTableInstance)

            const printEvent1: VxeButtonEvents.Click = () => {
              const $table = xTable.value
              $table.print()
            }

            const printSelectEvent: VxeButtonEvents.Click = () => {
              const $table = xTable.value
              $table.print({
                data: $table.getCheckboxRecords()
              })
            }

            const printEvent2: VxeButtonEvents.Click = () => {
              const $table = xTable.value
              $table.openPrint()
            }

            const footerMethod: VxeTablePropTypes.FooterMethod = ({ columns, data }) => {
              const footerData = [
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '平均'
                  }
                  if (['age', 'rate'].includes(column.property)) {
                    return XEUtils.mean(data, column.property)
                  }
                  return null
                }),
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '和值'
                  }
                  if (['age', 'rate'].includes(column.property)) {
                    return XEUtils.sum(data, column.property)
                  }
                  return null
                })
              ]
              return footerData
            }

            return {
              demo1,
              printEvent1,
              printSelectEvent,
              printEvent2,
              footerMethod
            }
          }
        })
        `
      ]
    }
  }
})
</script>
