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
      :data="tableData"
      @current-change="currentChangeEvent">
      <vxe-column field="name" title="Name"></vxe-column>
      <vxe-column field="sex" title="Sex"></vxe-column>
      <vxe-column field="age" title="Age"></vxe-column>
      <vxe-column field="address" title="Address" show-overflow></vxe-column>
    </vxe-table>

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
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
      ],
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
          :data="tableData"
          @current-change="currentChangeEvent">
          <vxe-column field="name" title="Name"></vxe-column>
          <vxe-column field="sex" title="Sex"></vxe-column>
          <vxe-column field="age" title="Age"></vxe-column>
          <vxe-column field="address" title="Address" show-overflow></vxe-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
              ]
            }
          },
          methods: {
            currentChangeEvent ({ row }) {
              console.log('行选中事件')
            },
            getCurrentEvent () {
              this.$XModal.alert(JSON.stringify(this.$refs.xTable.getCurrentRecord()))
            }
          }
        }
        `
      ]
    }
  },
  methods: {
    currentChangeEvent ({ rowIndex }) {
      console.log(`行选中事件 ${rowIndex}`)
    },
    getCurrentEvent () {
      this.$XModal.alert(JSON.stringify(this.$refs.xTable.getCurrentRecord()))
    }
  }
}
</script>
