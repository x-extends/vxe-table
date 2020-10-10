<template>
  <div>
    <p class="tip">
      键盘移动高亮行，设置 <table-api-link prop="keyboard-config"/>={isArrow: true, isEnter: true} 启用方向键功能
    </p>

    <vxe-table
      highlight-current-row
      :data="tableData"
      :tree-config="{children: 'children'}"
      :keyboard-config="{isArrow: true, isEnter: true}">
      <vxe-table-column field="name" title="Name" tree-node></vxe-table-column>
      <vxe-table-column field="size" title="Size"></vxe-table-column>
      <vxe-table-column field="type" title="Type"></vxe-table-column>
      <vxe-table-column field="date" title="Date"></vxe-table-column>
    </vxe-table>

    <pre>
      <code>
        | Arrow Up ↑ | 移动到高亮行的上一行 |
        | Arrow Down ↓ | 移动到高亮行的下一行 |
        | Enter | 展开节点，进入子节点 |
        | Backspace | 关闭节点，返回到父节点 |
      </code>
    </pre>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      tableData: [],
      selectRow: null,
      demoCodes: [
        `
        <vxe-table
          highlight-current-row
          :data="tableData"
          :tree-config="{children: 'children'}"
          :keyboard-config="{isArrow: true, isEnter: true}">
          <vxe-table-column field="name" title="Name" tree-node></vxe-table-column>
          <vxe-table-column field="size" title="Size"></vxe-table-column>
          <vxe-table-column field="type" title="Type"></vxe-table-column>
          <vxe-table-column field="date" title="Date"></vxe-table-column>
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
            this.tableData = window.MOCK_TREE_DATA_LIST
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = XEUtils.clone(window.MOCK_TREE_DATA_LIST, true)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
