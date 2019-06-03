<template>
  <div>
    <p>当一个表格需要铺满父容器时，这个功能将非常有用</p>
    <p>通过设置 <table-api-link prop="height"/>=auto 表格会相对于父容器的高度去铺满，但是这样表格只会默认计算一次</p>
    <p>还需要配合 <table-api-link prop="auto-resize"/> 自动监听，这样就只需要通过样式控制父容器高度就可以实现响应式表格</p>

    <div style="height: 800px">
      <vxe-table
        border
        auto-resize
        height="auto"
        :data.sync="tableData">
        <vxe-table-column type="index" width="60"></vxe-table-column>
        <vxe-table-column prop="name" label="Name"></vxe-table-column>
        <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
        <vxe-table-column prop="age" label="Age"></vxe-table-column>
        <vxe-table-column prop="address" label="Address" show-overflow></vxe-table-column>
      </vxe-table>
    </div>

    <p class="demo-code">显示代码</p>

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
      tableData: [],
      demoCodes: [
        `
        <div style="height: 800px">
          <vxe-table
            border
            auto-resize
            height="auto"
            :data.sync="tableData">
            <vxe-table-column type="index" width="60"></vxe-table-column>
            <vxe-table-column prop="name" label="Name"></vxe-table-column>
            <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
            <vxe-table-column prop="age" label="Age"></vxe-table-column>
            <vxe-table-column prop="address" label="Address" show-overflow></vxe-table-column>
          </vxe-table>
        </div>
        `,
        `
        export default {
          data () {
            return {
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 50)
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 50)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
