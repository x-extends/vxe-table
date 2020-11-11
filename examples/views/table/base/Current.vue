<template>
  <div>
    <p class="tip">使用 <table-api-link prop="highlight-current-row"/> 显示高亮行，当前行是唯一的；用户操作点击选项时会触发事件 <table-api-link prop="current-change"/></p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="$refs.xTable.setCurrentRow(tableData[1])">设置第二行选中</vxe-button>
        <vxe-button @click="$refs.xTable.clearCurrentRow()">取消选中</vxe-button>
        <vxe-button @click="getCurrentEvent">获取高亮行</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      highlight-hover-row
      highlight-current-row
      ref="xTable"
      height="300"
      :data="demo1.tableData"
      @current-change="currentChangeEvent">
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
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
import { VXETable } from '../../../../packages/vxe-table'
import { VxeTableInstance, VxeTableEvents } from '../../../../types/vxe-table'

export default defineComponent({
  setup () {
    const demo1 = reactive({
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 24, address: 'Shanghai' }
      ]
    })

    const xTable = ref({} as VxeTableInstance)

    const currentChangeEvent: VxeTableEvents.CurrentChange = ({ rowIndex }) => {
      console.log(`行选中事件 ${rowIndex}`)
    }

    const getCurrentEvent = () => {
      const $table = xTable.value
      VXETable.modal.alert(JSON.stringify($table.getCurrentRecord()))
    }

    return {
      demo1,
      xTable,
      currentChangeEvent,
      getCurrentEvent,
      demoCodes: [
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-button @click="$refs.xTable.setCurrentRow(tableData[1])">设置第二行选中</vxe-button>
            <vxe-button @click="$refs.xTable.clearCurrentRow()">取消选中</vxe-button>
            <vxe-button @click="getCurrentEvent">获取高亮行</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          highlight-hover-row
          highlight-current-row
          ref="xTable"
          height="300"
          :data="demo1.tableData"
          @current-change="currentChangeEvent">
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VXETable, VxeTableInstance, VxeTableEvents } from 'vxe-table'

        export default defineComponent({
          setup () {
            const demo1 = reactive({
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 24, address: 'Shanghai' }
              ]
            })

            const xTable = ref({} as VxeTableInstance)

            const currentChangeEvent: VxeTableEvents.CurrentChange = ({ rowIndex }: any) => {
              console.log(\`行选中事件 \${rowIndex}\`)
            }

            const getCurrentEvent = () => {
              const $table = xTable.value
              VXETable.modal.alert(JSON.stringify($table.getCurrentRecord()))
            }

            return {
              demo1,
              xTable,
              currentChangeEvent,
              getCurrentEvent
            }
          }
        }
        `
      ]
    }
  }
})
</script>
