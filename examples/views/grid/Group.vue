<template>
  <div>
    <p class="tip">分组表头</p>

    <vxe-grid v-bind="gridOptions"></vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { VxeGridOptions } from '../../../types/vxe-table'

export default defineComponent({
  setup () {
    const gridOptions = reactive({
      border: true,
      stripe: true,
      resizable: true,
      height: 500,
      columns: [
        { type: 'seq', width: 50 },
        {
          title: '基本信息',
          children: [
            { field: 'name', title: 'Name' },
            {
              title: '其他信息',
              children: [
                { field: 'nickname', title: 'Nickname' },
                { field: 'age', title: 'Age' }
              ]
            },
            { field: 'sex', title: 'Sex' }
          ]
        },
        { field: 'address', title: 'Address', showOverflow: true }
      ],
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
    } as VxeGridOptions)

    return {
      gridOptions,
      demoCodes: [
        `
        <vxe-grid v-bind="gridOptions"></vxe-grid>
        `,
        `
        import { defineComponent, reactive } from 'vue'
        import { VxeGridOptions } from 'vxe-table'

        export default defineComponent({
          setup () {
            const gridOptions = reactive({
              border: true,
              stripe: true,
              resizable: true,
              height: 500,
              columns: [
                { type: 'seq', width: 50 },
                {
                  title: '基本信息',
                  children: [
                    { field: 'name', title: 'Name' },
                    {
                      title: '其他信息',
                      children: [
                        { field: 'nickname', title: 'Nickname' },
                        { field: 'age', title: 'Age' }
                      ]
                    },
                    { field: 'sex', title: 'Sex' }
                  ]
                },
                { field: 'address', title: 'Address', showOverflow: true }
              ],
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
            } as VxeGridOptions)

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
