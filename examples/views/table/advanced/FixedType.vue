<template>
  <div>
    <p class="tip">
      导入/导出文件类型：通过 <table-api-link prop="types"/> 设置文件类型，例如：限制只允许使用 CSV 格式<br>
    </p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="clearDataEvent">清空数据</vxe-button>
        <vxe-button @click="exportDataEvent">导出数据</vxe-button>
        <vxe-button @click="importDataEvent">导入数据</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      highlight-hover-row
      ref="xTable"
      height="400"
      :import-config="{}"
      :export-config="{}"
      :data="demo1.tableData">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name"></vxe-column>
      <vxe-column field="sex" title="Sex"></vxe-column>
      <vxe-column field="age" title="Age" sortable></vxe-column>
      <vxe-column field="address" title="Address" show-overflow></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { VxeTableInstance } from '../../../../types/index'

export default defineComponent({
  setup () {
    const xTable = ref({} as VxeTableInstance)

    const demo1 = reactive({
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 36, address: 'Guangzhou' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 24, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Man', age: 34, address: 'vxe-table 从入门到放弃' }
      ]
    })

    const clearDataEvent = () => {
      demo1.tableData = []
    }

    const exportDataEvent = () => {
      const $table = xTable.value
      $table.openExport({ types: ['csv'] })
    }

    const importDataEvent = () => {
      const $table = xTable.value
      $table.importData({ types: ['csv'] })
    }

    return {
      xTable,
      demo1,
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
          border
          highlight-hover-row
          ref="xTable"
          height="400"
          :import-config="{}"
          :export-config="{}"
          :data="demo1.tableData">
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column field="name" title="Name"></vxe-column>
          <vxe-column field="sex" title="Sex"></vxe-column>
          <vxe-column field="age" title="Age" sortable></vxe-column>
          <vxe-column field="address" title="Address" show-overflow></vxe-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VxeTableInstance } from 'vxe-table'

        export default defineComponent({
          setup () {
            const xTable = ref({} as VxeTableInstance)

            const demo1 = reactive({
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 36, address: 'Guangzhou' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 24, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Man', age: 34, address: 'vxe-table 从入门到放弃' }
              ]
            })

            const clearDataEvent = () => {
              demo1.tableData = []
            }

            const exportDataEvent = () => {
              const $table = xTable.value
              $table.openExport({ types: ['csv'] })
            }

            const importDataEvent = () => {
              const $table = xTable.value
              $table.importData({ types: ['csv'] })
            }

            return {
              xTable,
              demo1,
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
