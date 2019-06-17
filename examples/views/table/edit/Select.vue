<template>
  <div>
    <p>单元格点击编辑，还可以通过 edit-actived 事件处理点击后自动选中文本</p>

    <vxe-table
      border
      resizable
      highlight-current-row
      show-all-overflow
      :data.sync="tableData"
      :edit-config="{key: 'id', trigger: 'click', mode: 'cell'}"
      @edit-actived="editActivedEvent">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column prop="date" label="Date" :edit-render="{name: 'input'}"></vxe-table-column>
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
          resizable
          highlight-current-row
          show-all-overflow
          :data.sync="tableData"
          :edit-config="{key: 'id', trigger: 'click', mode: 'cell'}"
          @edit-actived="editActivedEvent">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column prop="name" label="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column prop="sex" label="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column prop="date" label="Date" :edit-render="{name: 'input'}"></vxe-table-column>
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
          },
          methods: {
            editActivedEvent ({ row, column, cell}, event) {
              this.$nextTick(() => {
                cell.querySelector('input').select()
              })
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    editActivedEvent ({ row, column, cell }, event) {
      this.$nextTick(() => {
        cell.querySelector('input').select()
      })
    }
  }
}
</script>
