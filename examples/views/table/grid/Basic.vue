<template>
  <div>
    <p class="tip">
      <grid-api-link name="vxe-grid"/> 高级表格：一个包含表单、工具栏、基础表格、分页...等全功能的组件<br>
    </p>

    <vxe-grid v-bind="gridOptions1">
      <template #toolbar_buttons>
        <vxe-button @click="gridOptions1.align = 'left'">居左</vxe-button>
        <vxe-button @click="gridOptions1.align = 'center'">居中</vxe-button>
        <vxe-button @click="gridOptions1.align = 'right'">居右</vxe-button>
      </template>
    </vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">异步获取列</p>

    <vxe-grid v-bind="gridOptions2"></vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[3] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      gridOptions1: {
        border: true,
        resizable: true,
        showOverflow: true,
        height: 300,
        align: 'left',
        toolbarConfig: {
          slots: {
            // 自定义工具栏模板
            buttons: 'toolbar_buttons'
          }
        },
        columns: [
          { type: 'seq', width: 50 },
          { field: 'name', title: 'Name' },
          { field: 'sex', title: 'Sex', showHeaderOverflow: true },
          { field: 'address', title: 'Address', showOverflow: true }
        ],
        data: [
          { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 0, address: 'Shenzhen' },
          { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
          { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 100, address: 'Shanghai' },
          { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women', age: 70, address: 'Shenzhen' },
          { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women', age: 10, address: 'Shanghai' },
          { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women', age: 90, address: 'Shenzhen' },
          { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man', age: 5, address: 'Shenzhen' },
          { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man', age: 80, address: 'Shenzhen' }
        ]
      },
      gridOptions2: {
        border: true,
        resizable: true,
        showOverflow: true,
        loading: false,
        height: 300,
        columns: [],
        data: []
      },
      demoCodes: [
        `
        <vxe-grid v-bind="gridOptions1">
          <template #toolbar_buttons>
            <vxe-button @click="gridOptions1.align = 'left'">居左</vxe-button>
            <vxe-button @click="gridOptions1.align = 'center'">居中</vxe-button>
            <vxe-button @click="gridOptions1.align = 'right'">居右</vxe-button>
          </template>
        </vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              gridOptions1: {
                border: true,
                resizable: true,
                showOverflow: true,
                height: 300,
                align: 'left',
                toolbarConfig: {
                  slots: {
                    // 自定义工具栏模板
                    buttons: 'toolbar_buttons'
                  }
                },
                columns: [
                  { type: 'seq', width: 50 },
                  { field: 'name', title: 'Name' },
                  { field: 'sex', title: 'Sex', showHeaderOverflow: true },
                  { field: 'address', title: 'Address', showOverflow: true }
                ],
                data: [
                  { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 0, address: 'Shenzhen' },
                  { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                  { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 100, address: 'Shanghai' },
                  { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women', age: 70, address: 'Shenzhen' },
                  { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women', age: 10, address: 'Shanghai' },
                  { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women', age: 90, address: 'Shenzhen' },
                  { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man', age: 5, address: 'Shenzhen' },
                  { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man', age: 80, address: 'Shenzhen' }
                ]
              }
            }
          }
        }
        `,
        `
        <vxe-grid v-bind="gridOptions2"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              gridOptions2: {
                border: true,
                resizable: true,
                showOverflow: true,
                loading: false,
                height: 300,
                columns: [],
                data: []
              }
            }
          },
          created () {
            this.gridOptions2.loading = true
            setTimeout(() => {
              this.gridOptions2.loading = false
              this.gridOptions2.columns = [
                { type: 'seq', width: 50 },
                { field: 'name', title: 'Name' },
                { field: 'sex', title: 'Sex', showHeaderOverflow: true },
                { field: 'role', title: 'Role' },
                { field: 'address', title: 'Address', showOverflow: true }
              ]
              this.gridOptions2.data = [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women', age: 21, address: 'Shenzhen' },
                { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man', age: 29, address: 'Shenzhen' },
                { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man', age: 35, address: 'Shenzhen' }
              ]
            }, 3000)
          }
        }
        `
      ]
    }
  },
  created () {
    this.gridOptions2.loading = true
    setTimeout(() => {
      this.gridOptions2.loading = false
      this.gridOptions2.columns = [
        { type: 'seq', width: 50 },
        { field: 'name', title: 'Name' },
        { field: 'sex', title: 'Sex', showHeaderOverflow: true },
        { field: 'role', title: 'Role' },
        { field: 'address', title: 'Address', showOverflow: true }
      ]
      this.gridOptions2.data = [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women', age: 23, address: 'Shenzhen' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women', age: 21, address: 'Shenzhen' },
        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man', age: 29, address: 'Shenzhen' },
        { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man', age: 35, address: 'Shenzhen' }
      ]
    }, 3000)
  }
}
</script>
