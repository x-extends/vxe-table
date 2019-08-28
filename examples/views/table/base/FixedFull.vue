<template>
  <div>
    <p class="tip">横纵内容过多时，同时固定列和表头</p>

    <vxe-table
      border
      height="300"
      highlight-hover-row
      show-overflow
      :data="tableData">
      <vxe-table-column type="index" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column field="name" title="Name" width="300"></vxe-table-column>
      <vxe-table-column field="role" title="Role" width="300"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" width="300"></vxe-table-column>
      <vxe-table-column field="date" title="Date" width="300"></vxe-table-column>
      <vxe-table-column field="address" title="Address" fixed="right" width="300"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">固定列建议设置 show-overflow 或 show-overflow 该值，禁用自动换行，大幅提升渲染速度</p>

    <keep-alive>
      <vxe-table
        border
        height="300"
        highlight-hover-row
        show-overflow
        v-if="visible"
        :data="tableData">
        <vxe-table-column type="index" width="60" fixed="left"></vxe-table-column>
        <vxe-table-column field="name" title="Name" width="300"></vxe-table-column>
        <vxe-table-column field="role" title="Role" width="300"></vxe-table-column>
        <vxe-table-column field="sex" title="Sex" width="300"></vxe-table-column>
        <vxe-table-column field="date" title="Date" width="300"></vxe-table-column>
        <vxe-table-column field="address" title="Address" fixed="right" width="300"></vxe-table-column>
      </vxe-table>
    </keep-alive>

    <pre>
      <code>
        | Arrow Up ↑ | 匀速向上滚动数据 |
        | Arrow Down ↓ | 匀速向下滚动数据 |
        | Arrow Left ← | 匀速向左滚动数据 |
        | Arrow Right → | 匀速向右滚动数据 |
      </code>
    </pre>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

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
      visible: true,
      tableData: [],
      demoCodes: [
        `
        <vxe-table
          border
          height="300"
          highlight-hover-row
          show-overflow
          :data="tableData">
          <vxe-table-column type="index" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column field="name" title="Name" width="300"></vxe-table-column>
          <vxe-table-column field="role" title="Role" width="300"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" width="300"></vxe-table-column>
          <vxe-table-column field="date" title="Date" width="300"></vxe-table-column>
          <vxe-table-column field="address" title="Address" fixed="right" width="300"></vxe-table-column>
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
        `,
        `
        <vxe-table
          border
          height="300"
          highlight-hover-row
          show-overflow
          :data="tableData">
          <vxe-table-column type="index" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column field="name" title="Name" width="300"></vxe-table-column>
          <vxe-table-column field="role" title="Role" width="300"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" width="300"></vxe-table-column>
          <vxe-table-column field="date" title="Date" width="300"></vxe-table-column>
          <vxe-table-column field="address" title="Address" fixed="right" width="300"></vxe-table-column>
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
