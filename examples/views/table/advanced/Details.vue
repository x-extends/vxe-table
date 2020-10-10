<template>
  <div>
    <p class="tip">实现点击行弹出窗口并显示详情信息<span class="red">（具体请自行实现，该示例仅供参考）</span></p>

    <vxe-table
      border
      resizable
      highlight-hover-row
      highlight-current-row
      height="500"
      :data="tableData"
      @cell-click="cellClickEvent">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <vxe-modal v-model="showDetails" title="查看详情" width="600" height="400" :mask="false" :lock-view="false" resize>
      <template v-slot>
        <vxe-table
          border="inner"
          auto-resize
          show-overflow
          highlight-hover-row
          height="auto"
          :show-header="false"
          :sync-resize="showDetails"
          :data="detailData">
          <vxe-table-column field="label" width="40%"></vxe-table-column>
          <vxe-table-column field="value"></vxe-table-column>
        </vxe-table>
      </template>
    </vxe-modal>

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
      showDetails: false,
      detailData: [],
      tableData: [],
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          highlight-hover-row
          highlight-current-row
          height="500"
          :data="tableData"
          @cell-click="cellClickEvent">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>

        <vxe-modal v-model="showDetails" title="查看详情" width="600" height="400" :mask="false" :lock-view="false" resize>
          <template v-slot>
            <vxe-table
              border="inner"
              auto-resize
              show-overflow
              highlight-hover-row
              height="auto"
              :show-header="false"
              :sync-resize="showDetails"
              :data="detailData">
              <vxe-table-column field="label" width="40%"></vxe-table-column>
              <vxe-table-column field="value"></vxe-table-column>
            </vxe-table>
          </template>
        </vxe-modal>
        `,
        `
        export default {
          data () {
            return {
              showDetails: false,
              detailData: [],
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
          },
          methods: {
            cellClickEvent ({ row }) {
              this.detailData = ['name', 'nickname', 'role', 'sex', 'age', 'date12', 'address'].map(field => {
                return { label: field, value: row[field] }
              })
              this.showDetails = true
            }
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
  },
  methods: {
    cellClickEvent ({ row }) {
      this.detailData = ['name', 'nickname', 'role', 'sex', 'age', 'date12', 'address'].map(field => {
        return { label: field, value: row[field] }
      })
      this.showDetails = true
    }
  }
}
</script>
