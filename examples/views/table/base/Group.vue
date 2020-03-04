<template>
  <div>
    <p class="tip">当数据结构比较复杂的时候，可以使用多级表头显示更加直观</p>

    <vxe-table
      border
      height="400"
      :data="tableData">
      <vxe-table-column title="基本信息">
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column field="name" title="Name"></vxe-table-column>
      </vxe-table-column>
      <vxe-table-column title="更多信息">
        <vxe-table-column field="role" title="Role"></vxe-table-column>
        <vxe-table-column title="详细信息">
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
        </vxe-table-column>
      </vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">
      <span class="red">注：如果使用了分组表头，则需要按组来设置固定列，且固定列必须是在左右两侧位置，不允许跨列</span>
    </p>

    <vxe-table
      border
      height="400"
      :data="tableData">
      <vxe-table-column title="基本信息">
        <vxe-table-column type="seq" width="60" fixed="left"></vxe-table-column>
        <vxe-table-column field="name" title="Name" fixed="left" width="180"></vxe-table-column>
      </vxe-table-column>
      <vxe-table-column title="更多信息">
        <vxe-table-column field="role" title="Role" width="300"></vxe-table-column>
        <vxe-table-column field="sex" title="Sex" width="200"></vxe-table-column>
        <vxe-table-column title="详细信息">
          <vxe-table-column field="sex" title="Sex" width="200"></vxe-table-column>
          <vxe-table-column field="num" title="Num" width="200"></vxe-table-column>
        </vxe-table-column>
      </vxe-table-column>
      <vxe-table-column title="额外信息">
        <vxe-table-column field="date3" title="Date" fixed="right" width="140"></vxe-table-column>
        <vxe-table-column field="address" title="Address" fixed="right" width="200" show-overflow></vxe-table-column>
      </vxe-table-column>
    </vxe-table>

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
      tableData: [],
      demoCodes: [
        `
        <vxe-table
          border
          height="400"
          :data="tableData">
          <vxe-table-column title="基本信息">
            <vxe-table-column type="seq" width="60"></vxe-table-column>
            <vxe-table-column field="name" title="Name"></vxe-table-column>
          </vxe-table-column>
          <vxe-table-column title="更多信息">
            <vxe-table-column field="role" title="Role"></vxe-table-column>
            <vxe-table-column title="详细信息">
              <vxe-table-column field="sex" title="Sex"></vxe-table-column>
              <vxe-table-column field="age" title="Age"></vxe-table-column>
            </vxe-table-column>
          </vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
          }
        }
        `,
        `
        <vxe-table
          border
          height="400"
          :data="tableData">
          <vxe-table-column title="基本信息">
            <vxe-table-column type="seq" width="60" fixed="left"></vxe-table-column>
            <vxe-table-column field="name" title="Name" fixed="left" width="180"></vxe-table-column>
          </vxe-table-column>
          <vxe-table-column title="更多信息">
            <vxe-table-column field="role" title="Role" width="300"></vxe-table-column>
            <vxe-table-column field="sex" title="Sex" width="200"></vxe-table-column>
            <vxe-table-column title="详细信息">
              <vxe-table-column field="sex" title="Sex" width="200"></vxe-table-column>
              <vxe-table-column field="num" title="Num" width="200"></vxe-table-column>
            </vxe-table-column>
          </vxe-table-column>
          <vxe-table-column title="额外信息">
            <vxe-table-column field="date3" title="Date" fixed="right" width="140"></vxe-table-column>
            <vxe-table-column field="address" title="Address" fixed="right" width="200" show-overflow></vxe-table-column>
          </vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
