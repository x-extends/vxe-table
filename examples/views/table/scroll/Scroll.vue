<template>
  <div>
    <p>滚动渲染</p>
    <p>大数据不建议使用双向绑定的 data 属性（vue 监听会大数据会短暂的卡顿），建议使用 reload 函数</p>

    <vxe-table
      border
      highlight-hover-row
      height="300"
      :data.sync="tableData">
      <vxe-table-column type="index" width="100"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" sortable></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="age" label="Age"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" show-overflow-tooltip></vxe-table-column>
    </vxe-table>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p>高级配置项</p>
    <p>参数 scroll: {gt: 500, oSize: 30, rSize: 120}，当超过 500 条时自动启用滚动渲染</p>
    <p>gt大于条数时启用，oSize低于剩余条数重新渲染r，Size渲染条数</p>
    <p>优点可以非常流畅支持海量数据；缺点是通过滚动条拖动时无法实时显示效果</p>

    <vxe-table
      border
      height="300"
      :data.sync="tableData2">
      <vxe-table-column type="index" width="100"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" sortable></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="age" label="Age"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" show-overflow-tooltip></vxe-table-column>
    </vxe-table>

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
      tableData2: [],
      demoCodes: [
        `
        <vxe-table
          border
          highlight-hover-row
          height="300"
          :data.sync="tableData">
          <vxe-table-column type="index" width="100"></vxe-table-column>
          <vxe-table-column prop="name" label="Name" sortable></vxe-table-column>
          <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
          <vxe-table-column prop="age" label="Age"></vxe-table-column>
          <vxe-table-column prop="address" label="Address" show-overflow-tooltip></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              tableData2: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 200)
            this.tableData2 = window.MOCK_DATA_LIST.slice(0, 1000)
          }
        }
        `,
        `
        <vxe-table
          border
          height="300"
          :data.sync="tableData2">
          <vxe-table-column type="index" width="100"></vxe-table-column>
          <vxe-table-column prop="name" label="Name" sortable></vxe-table-column>
          <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
          <vxe-table-column prop="age" label="Age"></vxe-table-column>
          <vxe-table-column prop="address" label="Address" show-overflow-tooltip></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              tableData2: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 200)
            this.tableData2 = window.MOCK_DATA_LIST.slice(0, 1000)
          }
        }
        `
      ]
    }
  },
  created () {
    let list = window.MOCK_DATA_LIST.slice(0, 200)
    this.tableData = list
    this.tableData2 = window.MOCK_DATA_LIST.slice(0, 1000)
  },
  mounted () {
    this.$el.querySelectorAll('pre code').forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
