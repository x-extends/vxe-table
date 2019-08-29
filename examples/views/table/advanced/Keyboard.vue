<template>
  <div>
    <p class="tip">键盘移动高亮行，设置 <table-api-link prop="keyboard-config"/>={isArrow: true} 启用方向键功能</p>

    <vxe-table
      border
      resizable
      highlight-current-row
      height="500"
      :data="tableData"
      :keyboard-config="{isArrow: true}"
      :radio-config="{trigger: 'row'}">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column type="radio" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <pre>
      <code>
        | Arrow Up ↑ | 移动到高亮行的上一行 |
        | Arrow Down ↓ | 移动到高亮行的下一行 |
        | Spacebar | 如果单元格是复选框或单选框则切换勾选状态 |
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

export default {
  data () {
    return {
      tableData: [],
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          highlight-current-row
          height="500"
          :data="tableData"
          :keyboard-config="{isArrow: true}"
          :radio-config="{trigger: 'row'}">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column type="radio" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
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
