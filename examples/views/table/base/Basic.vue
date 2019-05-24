<template>
  <div>
    <p>基础使用</p>

    <vxe-table
      :data.sync="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="age" label="Age"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">显示代码</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p>使用 highlight-hover-row 属性启用 hover 行高亮</p>

    <vxe-table
      highlight-hover-row
      :data.sync="tableData">
      <vxe-table-column type="index" label="序号" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="age" label="Age"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">显示代码</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
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
        <vxe-table
          :data.sync="tableData">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column prop="name" label="Name"></vxe-table-column>
          <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
          <vxe-table-column prop="age" label="Age"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
          }
        }
        `,
        `
        <vxe-table
          highlight-hover-row
          :data.sync="tableData">
          <vxe-table-column type="index" label="序号" width="60"></vxe-table-column>
          <vxe-table-column prop="name" label="Name"></vxe-table-column>
          <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
          <vxe-table-column prop="age" label="Age"></vxe-table-column>
          <vxe-table-column prop="address" label="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
          }
        }
        `
      ]
    }
  },
  created () {
    let list = window.MOCK_DATA_LIST.slice(0, 6)
    this.tableData = list
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
