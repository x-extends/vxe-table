<template>
  <div>
    <p class="tip">高亮单元格编辑，通过 <table-api-link prop="highlight-cell"/> 属性设置，指南用于全部单元格都是输入框时</p>

    <vxe-table
      border
      show-overflow
      highlight-cell
      max-height="400"
      :data="tableData"
      :mouse-config="{selected: true}"
      :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true}"
      :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}">
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="nickname" title="Nickname" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="role" title="Role" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="age" title="Age" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="address" title="Address" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="attr1" title="Attr1" :edit-render="{name: 'input'}"></vxe-table-column>
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
      tableData: [],
      sexList: [],
      demoCodes: [
        `
        <vxe-table
          border
          show-overflow
          highlight-cell
          max-height="400"
          :data="tableData"
          :mouse-config="{selected: true}"
          :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true}"
          :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}">
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="nickname" title="Nickname" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="role" title="Role" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="age" title="Age" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="address" title="Address" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="attr1" title="Attr1" :edit-render="{name: 'input'}"></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 4)
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 4)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
