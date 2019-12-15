<template>
  <div>
    <p class="tip">多页签切换，v-show 可以使用 <table-api-link prop="auto-resize"/> 或者 <table-api-link prop="sync-resize"/> 自动监听响应式宽，也可以手动调用 <table-api-link prop="recalculate"/> 重新计算宽度</p>

    <p>
      <vxe-radio v-model="selectTab" name="xtabs" label="tab1">页签1</vxe-radio>
      <vxe-radio v-model="selectTab" name="xtabs" label="tab2">页签2</vxe-radio>
      <vxe-radio v-model="selectTab" name="xtabs" label="tab3">页签3</vxe-radio>
    </p>

    <div v-show="selectTab === 'tab1'">
      <vxe-table
        border
        :sync-resize="selectTab === 'tab1'"
        :data="tableData">
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column field="name" title="Name"></vxe-table-column>
        <vxe-table-column field="sex" title="Sex"></vxe-table-column>
        <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
      </vxe-table>
    </div>

    <div v-show="selectTab === 'tab2'">
      <vxe-table
        border
        :sync-resize="selectTab === 'tab2'"
        :data="tableData">
        <vxe-table-column type="radio" width="60"></vxe-table-column>
        <vxe-table-column field="role" title="Rolw"></vxe-table-column>
        <vxe-table-column field="age" title="Age"></vxe-table-column>
        <vxe-table-column field="num" title="Num"></vxe-table-column>
        <vxe-table-column field="date12" title="Date"></vxe-table-column>
      </vxe-table>
    </div>

    <div v-show="selectTab === 'tab3'">
      <vxe-table
        border
        :sync-resize="selectTab === 'tab3'"
        :data="tableData">
        <vxe-table-column type="checkbox" width="60"></vxe-table-column>
        <vxe-table-column field="nickname" title="nickname"></vxe-table-column>
        <vxe-table-column field="sex" title="Sex"></vxe-table-column>
        <vxe-table-column field="age" title="Age"></vxe-table-column>
        <vxe-table-column field="date12" title="Date"></vxe-table-column>
        <vxe-table-column field="region" title="Region"></vxe-table-column>
        <vxe-table-column field="rate" title="Rate"></vxe-table-column>
      </vxe-table>
    </div>

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
      selectTab: 'tab1',
      tableData: [],
      demoCodes: [
        `
        <p>
          <vxe-radio v-model="selectTab" name="xtabs" label="tab1">页签1</vxe-radio>
          <vxe-radio v-model="selectTab" name="xtabs" label="tab2">页签2</vxe-radio>
          <vxe-radio v-model="selectTab" name="xtabs" label="tab3">页签3</vxe-radio>
        </p>

        <div v-show="selectTab === 'tab1'">
          <vxe-table
            border
            :sync-resize="selectTab === 'tab1'"
            :data="tableData">
            <vxe-table-column type="seq" width="60"></vxe-table-column>
            <vxe-table-column field="name" title="Name"></vxe-table-column>
            <vxe-table-column field="sex" title="Sex"></vxe-table-column>
            <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
          </vxe-table>
        </div>

        <div v-show="selectTab === 'tab2'">
          <vxe-table
            border
            :sync-resize="selectTab === 'tab2'"
            :data="tableData">
            <vxe-table-column type="radio" width="60"></vxe-table-column>
            <vxe-table-column field="role" title="Rolw"></vxe-table-column>
            <vxe-table-column field="age" title="Age"></vxe-table-column>
            <vxe-table-column field="num" title="Num"></vxe-table-column>
            <vxe-table-column field="date12" title="Date"></vxe-table-column>
          </vxe-table>
        </div>

        <div v-show="selectTab === 'tab3'">
          <vxe-table
            border
            :sync-resize="selectTab === 'tab3'"
            :data="tableData">
            <vxe-table-column type="checkbox" width="60"></vxe-table-column>
            <vxe-table-column field="nickname" title="nickname"></vxe-table-column>
            <vxe-table-column field="sex" title="Sex"></vxe-table-column>
            <vxe-table-column field="age" title="Age"></vxe-table-column>
            <vxe-table-column field="date12" title="Date"></vxe-table-column>
            <vxe-table-column field="region" title="Region"></vxe-table-column>
            <vxe-table-column field="rate" title="Rate"></vxe-table-column>
          </vxe-table>
        </div>
        `,
        `
        export default {
          data () {
            return {
              selectTab: 'tab1',
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
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
  }
}
</script>
