<template>
  <div>
    <p class="tip">单元格超出指定宽度自动换行，通过设置 <table-api-link prop="scroll-x"/>="{gt: -1} 和 <table-api-link prop="scroll-y"/>="{gt: -1} 启用自动换行</p>

    <vxe-table
      :data="tableData"
      :scroll-y="{gt: -1}">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="role" title="Role"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop Develop Develop Develop Develop Develop Develop Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
        { id: 10002, name: 'Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2', role: 'Designer', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM PM PM PM PM PM PM PM PM PM PM PM PM PM PM PM PM PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Test', sex: 'Women ', age: 24, address: 'Shanghai' }
      ],
      demoCodes: [
        `
        <vxe-table
          :data="tableData"
          :scroll-y="{gt: -1}">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="role" title="Role"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop Develop Develop Develop Develop Develop Develop Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2 Test2', role: 'Designer', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM PM PM PM PM PM PM PM PM PM PM PM PM PM PM PM PM PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Test', sex: 'Women ', age: 24, address: 'Shanghai' }
              ]
            }
          }
        }
        `
      ]
    }
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
