<template>
  <div>
    <p class="tip">
      导入数据：通过 <table-api-link prop="importData"/> 函数可以直接将数据导入表格中<br>
      如果是服务端导出，通过设置 <table-api-link prop="remote"/> 和 <table-api-link prop="importMethod"/> 开启服务端自定义导入<br>
      <span class="red">（注：附件中的字段名必须和表格一致，数据格式不正确将无法导入；前端导入的数据量有限，建议使用后端导入）</span>
    </p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="clearDataEvent">清空数据</vxe-button>
        <vxe-button @click="exportDataEvent">导出数据</vxe-button>
        <vxe-button @click="importDataEvent">导入数据</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      highlight-hover-row
      ref="xTable"
      height="400"
      :export-config="{}"
      :data="demo1.tableData1">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :formatter="formatterSex"></vxe-table-column>
      <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
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
import { VxeTableInstance, VxeColumnPropTypes, VxeButtonEvents } from '../../../../types/vxe-table'

export default defineComponent({
  setup () {
    const demo1 = reactive({
      tableData1: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: '1', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: '0', age: 23, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: '0', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: '0', age: 21, address: 'vxe-table 从入门到放弃' },
        { id: 10007, name: 'Test7', role: 'Test', sex: '1', age: 29, address: 'vxe-table 从入门到放弃' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: '1 ', age: 35, address: 'vxe-table 从入门到放弃' }
      ]
    })

    const sexList = [
      { label: '女', value: '0' },
      { label: '男', value: '1' }
    ]

    const xTable = ref({} as VxeTableInstance)

    const formatterSex: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
      const item = sexList.find(item => item.value === cellValue)
      return item ? item.label : ''
    }

    const clearDataEvent: VxeButtonEvents.Click = () => {
      demo1.tableData1 = []
    }

    const exportDataEvent: VxeButtonEvents.Click = () => {
      const $table = xTable.value
      $table.openExport({
        // 默认勾选源
        original: true
      })
    }

    const importDataEvent: VxeButtonEvents.Click = () => {
      const $table = xTable.value
      $table.importData()
    }

    return {
      xTable,
      demo1,
      formatterSex,
      clearDataEvent,
      exportDataEvent,
      importDataEvent,
      demoCodes: [
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-button @click="clearDataEvent">清空数据</vxe-button>
            <vxe-button @click="exportDataEvent">导出数据</vxe-button>
            <vxe-button @click="importDataEvent">导入数据</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          highlight-hover-row
          ref="xTable"
          height="400"
          :export-config="{}"
          :data="demo1.tableData1">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :formatter="formatterSex"></vxe-table-column>
          <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VxeTableInstance, VxeColumnPropTypes, VxeButtonEvents } from 'vxe-table'

        export default defineComponent({
          setup () {
            const demo1 = reactive({
              tableData1: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: '1', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: '0', age: 23, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: '0', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: '0', age: 21, address: 'vxe-table 从入门到放弃' },
                { id: 10007, name: 'Test7', role: 'Test', sex: '1', age: 29, address: 'vxe-table 从入门到放弃' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: '1 ', age: 35, address: 'vxe-table 从入门到放弃' }
              ]
            })

            const sexList = [
              { label: '女', value: '0' },
              { label: '男', value: '1' }
            ]

            const xTable = ref({} as VxeTableInstance)

            const formatterSex: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
              const item = sexList.find(item => item.value === cellValue)
              return item ? item.label : ''
            }

            const clearDataEvent: VxeButtonEvents.Click = () => {
              demo1.tableData1 = []
            }

            const exportDataEvent: VxeButtonEvents.Click = () => {
              const $table = xTable.value
              $table.openExport({
                // 默认勾选源
                original: true
              })
            }

            const importDataEvent: VxeButtonEvents.Click = () => {
              const $table = xTable.value
              $table.importData()
            }

            return {
              xTable,
              demo1,
              formatterSex,
              clearDataEvent,
              exportDataEvent,
              importDataEvent
            }
          }
        })
        `
      ]
    }
  }
})
</script>
