<template>
  <div>
    <p class="tip">设置 <table-api-link prop="keyboard-config"/>={<table-api-link prop="editMethod"/>} 重写默认的编辑行为，改为追加值得方式</p>

    <vxe-table
      border
      show-overflow
      ref="xTable"
      height="500"
      :data="tableData"
      :mouse-config="{selected: true}"
      :keyboard-config="{isArrow: true, isDel: true, isTab: true, isEdit: true, editMethod}"
      :edit-config="{trigger: 'dblclick', mode: 'cell'}">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="date12" title="Date" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="address" title="Address" :edit-render="{name: 'input'}"></vxe-table-column>
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
      demoCodes: [
        `
        <vxe-table
          border
          show-overflow
          ref="xTable"
          height="500"
          :data="tableData"
          :mouse-config="{selected: true}"
          :keyboard-config="{isArrow: true, isDel: true, isTab: true, isEdit: true, editMethod}"
          :edit-config="{trigger: 'dblclick', mode: 'cell'}">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="date12" title="Date" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="address" title="Address" :edit-render="{name: 'input'}"></vxe-table-column>
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
          },
          methods: {
            editMethod ({ row, column }) {
              // 重写默认的覆盖式，改为追加式
              this.$refs.xTable.setActiveCell(row, column.property)
              // 返回 false 阻止默认行为
              return false
            }
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
  },
  methods: {
    editMethod ({ row, column }) {
      // 重写默认的覆盖式，改为追加式
      this.$refs.xTable.setActiveCell(row, column.property)
      // 返回 false 阻止默认行为
      return false
    }
  }
}
</script>
