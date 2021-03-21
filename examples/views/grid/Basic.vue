<template>
  <div>
    <p class="tip">
      <grid-api-link name="vxe-grid"/> 高级表格：一个包含表单、工具栏、基础表格、分页...等全功能的组件<br>
    </p>

    <vxe-grid v-bind="gridOptions">
      <template #toolbar_buttons>
        <vxe-button @click="gridOptions.align = 'left'">居左</vxe-button>
        <vxe-button @click="gridOptions.align = 'center'">居中</vxe-button>
        <vxe-button @click="gridOptions.align = 'right'">居右</vxe-button>
      </template>
    </vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { VxeGridProps } from '../../../types/index'

export default defineComponent({
  setup () {
    const gridOptions = reactive({
      border: true,
      resizable: true,
      height: 300,
      align: null,
      columns: [
        { type: 'seq', width: 50 },
        { field: 'name', title: 'app.body.label.name' },
        { field: 'sex', title: 'app.body.label.sex', showHeaderOverflow: true },
        { field: 'address', title: 'Address', showOverflow: true }
      ],
      toolbarConfig: {
        slots: {
          buttons: 'toolbar_buttons'
        }
      },
      data: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
        { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' }
      ]
    } as VxeGridProps)
    return {
      gridOptions,
      demoCodes: [
        `
        <vxe-grid v-bind="gridOptions">
          <template #toolbar_buttons>
            <vxe-button @click="gridOptions.align = 'left'">居左</vxe-button>
            <vxe-button @click="gridOptions.align = 'center'">居中</vxe-button>
            <vxe-button @click="gridOptions.align = 'right'">居右</vxe-button>
          </template>
        </vxe-grid>
        `,
        `
        import { defineComponent, reactive } from 'vue'
        import { VxeGridProps } from 'vxe-table'

        export default defineComponent({
          setup () {
            const gridOptions = reactive({
              border: true,
              resizable: true,
              height: 300,
              align: null,
              columns: [
                { type: 'seq', width: 50 },
                { field: 'name', title: 'app.body.label.name' },
                { field: 'sex', title: 'app.body.label.sex', showHeaderOverflow: true },
                { field: 'address', title: 'Address', showOverflow: true }
              ],
              toolbarConfig: {
                slots: {
                  buttons: 'toolbar_buttons'
                }
              },
              data: [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
                { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
                { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' }
              ]
            } as VxeGridProps)
            return {
              gridOptions
            }
          }
        })
        `
      ]
    }
  }
})
</script>
