<template>
  <div>
    <p class="tip">
      <span class="red">Warning 1：动态行高与虚拟滚动的取舍</span><br>
      <span class="red">（注：‘关闭高性能的虚拟滚动来换取支持动态行高’ 或者 ‘通过任意方式去动态改变行高’，使用这个方式的所有问题都应该自行处理）</span>
    </p>

    <vxe-table
      border
      resizable
      height="400"
      :data="tableData"
      :optimization="{scrollX: {gt: 500}, scrollY: {gt: 50000}}">
      <vxe-table-column type="seq" width="80" fixed="left"></vxe-table-column>
      <vxe-table-column field="name" title="Name">
        <template v-slot="{ row, rowIndex }">
          <template v-if="rowIndex % 4 === 0">
            <div>{{ row.name }}</div>
            <div style="color: red">{{ row.age }}</div>
            <div>{{ row.role }}</div>
          </template>
          <template v-else-if="rowIndex % 3 === 0">
            <img src="static/other/img2.gif" style="width: 60px;">
          </template>
          <template v-else>
            <span>{{ row.name }}</span>
          </template>
        </template>
      </vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age">
        <template v-slot="{ row, rowIndex }">
          <template v-if="rowIndex % 5 === 0">
            <img src="static/other/img1.gif" style="width: 60px;">
          </template>
          <template v-else>
            <span>{{ row.age }}</span>
          </template>
        </template>
      </vxe-table-column>
      <vxe-table-column field="role" title="Role"></vxe-table-column>
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
          height="400"
          :data="tableData"
          :optimization="{scrollX: {gt: 500}, scrollY: {gt: 50000}}">
          <vxe-table-column type="seq" width="80" fixed="left"></vxe-table-column>
          <vxe-table-column field="name" title="Name">
            <template v-slot="{ row, rowIndex }">
              <template v-if="rowIndex % 4 === 0">
                <div>{{ row.name }}</div>
                <div style="color: red">{{ row.age }}</div>
                <div>{{ row.role }}</div>
              </template>
              <template v-else-if="rowIndex % 3 === 0">
                <img src="static/other/img2.gif" style="width: 60px;">
              </template>
              <template v-else>
                <span>{{ row.name }}</span>
              </template>
            </template>
          </vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age">
            <template v-slot="{ row, rowIndex }">
              <template v-if="rowIndex % 5 === 0">
                <img src="static/other/img1.gif" style="width: 60px;">
              </template>
              <template v-else>
                <span>{{ row.age }}</span>
              </template>
            </template>
          </vxe-table-column>
          <vxe-table-column field="role" title="Role"></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 200)
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 200)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
