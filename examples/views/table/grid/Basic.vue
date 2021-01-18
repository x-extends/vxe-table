<template>
  <div>
    <p class="tip">
      <grid-api-link name="vxe-grid"/> 高级表格：一个包含表单、工具栏、基础表格、分页...等全功能的组件<br>
    </p>

    <vxe-grid v-bind="gridOptions">
      <template v-slot:toolbar_buttons>
        <vxe-button @click="gridOptions.align = 'left'">居左</vxe-button>
        <vxe-button @click="gridOptions.align = 'center'">居中</vxe-button>
        <vxe-button @click="gridOptions.align = 'right'">居右</vxe-button>
      </template>
    </vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      gridOptions: {
        border: true,
        resizable: true,
        showOverflow: true,
        height: 300,
        align: 'left',
        toolbarConfig: {
          slots: {
            buttons: 'toolbar_buttons'
          }
        },
        columns: [
          { type: 'seq', width: 50 },
          { field: 'name', title: 'app.body.label.name' },
          { field: 'sex', title: 'app.body.label.sex', showHeaderOverflow: true },
          { field: 'address', title: 'Address', showOverflow: true }
        ],
        data: [
          { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 0, address: 'Shenzhen' },
          { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
          { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 100, address: 'Shanghai' },
          { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 70, address: 'Shenzhen' },
          { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 10, address: 'Shanghai' },
          { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 90, address: 'Shenzhen' },
          { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 5, address: 'Shenzhen' },
          { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 80, address: 'Shenzhen' }
        ]
      },
      demoCodes: [
        `
        <vxe-grid v-bind="gridOptions">
          <template v-slot:toolbar_buttons>
            <vxe-button @click="gridOptions.align = 'left'">居左</vxe-button>
            <vxe-button @click="gridOptions.align = 'center'">居中</vxe-button>
            <vxe-button @click="gridOptions.align = 'right'">居右</vxe-button>
          </template>
        </vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              gridOptions: {
                border: true,
                resizable: true,
                showOverflow: true,
                height: 300,
                align: 'left',
                toolbarConfig: {
                  slots: {
                    buttons: 'toolbar_buttons'
                  }
                },
                columns: [
                  { type: 'seq', width: 50 },
                  { field: 'name', title: 'app.body.label.name' },
                  { field: 'sex', title: 'app.body.label.sex', showHeaderOverflow: true },
                  { field: 'address', title: 'Address', showOverflow: true }
                ],
                data: [
                  { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 0, address: 'Shenzhen' },
                  { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                  { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 100, address: 'Shanghai' },
                  { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 70, address: 'Shenzhen' },
                  { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 10, address: 'Shanghai' },
                  { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women ', age: 90, address: 'Shenzhen' },
                  { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man ', age: 5, address: 'Shenzhen' },
                  { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man ', age: 80, address: 'Shenzhen' }
                ]
              }
            }
          }
        }
        `
      ]
    }
  }
}
</script>
