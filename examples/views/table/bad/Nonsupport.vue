<template>
  <div>
    <p class="tip">
      <span class="red">Error 1：同时使用展开行与固定列、同时使用展开行与虚拟滚动</span><br>
      <span class="red">（注：由于使用了不支持的特性，使用这个方式的所有兼容问题都应该自行处理）</span>
    </p>

    <vxe-table
      border
      resizable
      :data="tableData">
      <vxe-table-column type="seq" width="80" fixed="left"></vxe-table-column>
      <vxe-table-column type="expand" width="80">
        <template v-slot:content>
          <div>xxxxxxxx 被固定列挡住 emmmmm</div>
        </template>
      </vxe-table-column>
      <vxe-table-column field="name" title="Name" width="300"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" width="200"></vxe-table-column>
      <vxe-table-column field="age" title="Age" width="200"></vxe-table-column>
      <vxe-table-column field="role" title="Role" width="300"></vxe-table-column>
      <vxe-table-column field="date3" title="Date" width="300"></vxe-table-column>
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
          show-overflow
          :data="tableData">
          <vxe-table-column type="seq" width="80" fixed="left"></vxe-table-column>
          <vxe-table-column type="expand" width="80">
            <template v-slot:content>
              <div>xxxxxxxx 被固定列挡住 emmmmm</div>
            </template>
          </vxe-table-column>
          <vxe-table-column field="name" title="Name" width="300"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" width="200"></vxe-table-column>
          <vxe-table-column field="age" title="Age" width="200"></vxe-table-column>
          <vxe-table-column field="role" title="Role" width="300"></vxe-table-column>
          <vxe-table-column field="date3" title="Date" width="300"></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 2)
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 2)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
