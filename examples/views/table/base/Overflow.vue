<template>
  <div>
    <p>当内容或表头超过隐藏时显示为省略号，show-overflow 和 show-header-overflow</p>
    <p>ellipsis 当内容超过时显示为省略号</p>
    <p>title 当内容超过时显示为省略号并用原生 title 显示</p>
    <p>tooltip 当内容超过隐藏时显示为省略号并用 tooltip 显示</p>

    <vxe-table
      highlight-hover-row
      :data.sync="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="address" label="超过隐藏时显示为省略号————————————" show-header-overflow="ellipsis" show-overflow="ellipsis"></vxe-table-column>
      <vxe-table-column prop="date" label="内容超过隐藏时显示为省略号并用原生 title 显示" show-overflow="title"></vxe-table-column>
      <vxe-table-column prop="age" label="表头超过隐藏时显示为省略号并 tooltip 显示——————————————" show-header-overflow></vxe-table-column>
      <vxe-table-column prop="address" label="Address" show-overflow></vxe-table-column>
    </vxe-table>

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
        <vxe-table
          highlight-hover-row
          :data.sync="tableData">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column prop="address" label="超过隐藏时显示为省略号————————————" show-header-overflow="ellipsis" show-overflow="ellipsis"></vxe-table-column>
          <vxe-table-column prop="date" label="内容超过隐藏时显示为省略号并用原生 title 显示" show-overflow="title"></vxe-table-column>
          <vxe-table-column prop="age" label="表头超过隐藏时显示为省略号并 tooltip 显示——————————————" show-header-overflow></vxe-table-column>
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
