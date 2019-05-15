<template>
  <div>
    <p>设置 edit-config 的 activeMethod 方法判断是否禁用</p>

    <vxe-table
      ref="xTable"
      border
      :data.sync="tableData"
      :edit-config="{trigger: 'click', mode: 'cell', activeMethod}"
      @edit-disabled="editDisabledEvent">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column prop="date" label="Date" :edit-render="{name: 'input'}"></vxe-table-column>
    </vxe-table>

    <p>调用代码</p>

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
          ref="xTable"
          border
          :data.sync="tableData"
          :edit-config="{trigger: 'click', mode: 'cell', activeMethod}"
          @edit-disabled="editDisabledEvent">
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
            activeMethod ({ row, rowIndex }) {
              return rowIndex !== 1
            },
            editDisabledEvent () {
              alert('禁止编辑')
            }
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
  },
  methods: {
    activeMethod ({ row, rowIndex }) {
      return rowIndex !== 1
    },
    editDisabledEvent () {
      alert('禁止编辑')
    }
  }
}
</script>
