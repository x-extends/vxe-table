<template>
  <div>
    <p class="tip">
      显示/隐藏列功能，通过表格设置 <table-api-link prop="id"/> 和 <table-api-link prop="custom-config"/>={storage: true} 参数开启将列个性化 localStorage 保存功能<br>
      通过 <table-api-link prop="custom"/> 事件实现显示/隐藏列服务端保存，通过 <table-api-link prop="resizable-change"/> 事件实现列宽状态服务端保存
    </p>

    <vxe-toolbar ref="xToolbar" custom>
      <template #buttons>
        <vxe-button>按钮1</vxe-button>
        <vxe-button>按钮2</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      resizable
      ref="xTable"
      id="toolbar_demo5"
      height="400"
      :custom-config="demo1.tableCustom"
      :data="demo1.tableData"
      @resizable-change="resizableChangeEvent">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name"></vxe-column>
      <vxe-column field="role" title="Role"></vxe-column>
      <vxe-column field="sex" title="Sex"></vxe-column>
      <vxe-column field="age" title="Age"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, nextTick } from 'vue'
import { VxeTablePropTypes, VxeTableInstance, VxeToolbarInstance, VxeTableEvents } from '../../../../types/index'

export default defineComponent({
  setup () {
    const xTable = ref({} as VxeTableInstance)
    const xToolbar = ref({} as VxeToolbarInstance)

    const demo1 = reactive({
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'vxe-table 从入门到放弃' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'vxe-table 从入门到放弃' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'vxe-table 从入门到放弃' }
      ],
      tableCustom: {
        storage: true,
        checkMethod ({ column }) {
          if (column.property === 'role') {
            return false
          }
          return true
        }
      } as VxeTablePropTypes.CustomConfig
    })

    const resizableChangeEvent: VxeTableEvents.ResizableChange = () => {
      const $table = xTable.value
      const columns = $table.getColumns()
      const customData = columns.map(column => {
        return {
          width: column.renderWidth
        }
      })
      console.log(customData)
    }

    nextTick(() => {
      // 将表格和工具栏进行关联
      const $table = xTable.value
      const $toolbar = xToolbar.value
      $table.connect($toolbar)
    })

    return {
      xTable,
      xToolbar,
      demo1,
      resizableChangeEvent,
      demoCodes: [
        `
        <vxe-toolbar ref="xToolbar" custom>
          <template #buttons>
            <vxe-button>按钮1</vxe-button>
            <vxe-button>按钮2</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          resizable
          ref="xTable"
          id="toolbar_demo5"
          height="400"
          :custom-config="demo1.tableCustom"
          :data="demo1.tableData"
          @resizable-change="resizableChangeEvent">
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column field="name" title="Name"></vxe-column>
          <vxe-column field="role" title="Role"></vxe-column>
          <vxe-column field="sex" title="Sex"></vxe-column>
          <vxe-column field="age" title="Age"></vxe-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref, nextTick } from 'vue'
        import { VxeTablePropTypes, VxeTableInstance, VxeToolbarInstance, VxeTableEvents } from 'vxe-table'

        export default defineComponent({
          setup () {
            const xTable = ref({} as VxeTableInstance)
            const xToolbar = ref({} as VxeToolbarInstance)

            const demo1 = reactive({
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'vxe-table 从入门到放弃' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'vxe-table 从入门到放弃' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'vxe-table 从入门到放弃' }
              ],
              tableCustom: {
                storage: true,
                checkMethod ({ column }) {
                  if (column.property === 'role') {
                    return false
                  }
                  return true
                }
              } as VxeTablePropTypes.CustomConfig
            })

            const resizableChangeEvent: VxeTableEvents.ResizableChange = () => {
              const $table = xTable.value
              const columns = $table.getColumns()
              const customData = columns.map(column => {
                return {
                  width: column.renderWidth
                }
              })
              console.log(customData)
            }

            nextTick(() => {
              // 将表格和工具栏进行关联
              const $table = xTable.value
              const $toolbar = xToolbar.value
              $table.connect($toolbar)
            })

            return {
              xTable,
              xToolbar,
              demo1,
              resizableChangeEvent
            }
          }
        }
        `
      ]
    }
  }
})
</script>
