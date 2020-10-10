<template>
  <div>
    <p class="tip">
      Tab 页签切换<span class="red">（如果需要将表格放到隐藏的元素中，那么就必然会导致宽度无法计算）</span>，有以下方法解决<br>
      1.每次切换 Tab 页显示之后手动调用 <table-api-link prop="recalculate"/> 重新计算表格<br>
      2.使用 <table-api-link prop="sync-resize"/> 绑定指定的变量来触发重新计算表格<br>
      3.使用 <table-api-link prop="auto-resize"/> 自动监听父容器来触发重新计算表格
    </p>

    <p>
      <vxe-radio-group v-model="selectTab">
        <vxe-radio-button label="tab1" content="页签1"></vxe-radio-button>
        <vxe-radio-button label="tab2" content="页签2"></vxe-radio-button>
        <vxe-radio-button label="tab3" content="页签3"></vxe-radio-button>
      </vxe-radio-group>
    </p>

    <div v-show="selectTab === 'tab1'">
      <vxe-table
        border
        show-overflow
        height="400"
        :sync-resize="selectTab"
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
        show-overflow
        height="400"
        :sync-resize="selectTab"
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
        show-overflow
        height="400"
        :sync-resize="selectTab"
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
          <vxe-radio-group v-model="selectTab">
            <vxe-radio-button label="tab1" content="页签1"></vxe-radio-button>
            <vxe-radio-button label="tab2" content="页签2"></vxe-radio-button>
            <vxe-radio-button label="tab3" content="页签3"></vxe-radio-button>
          </vxe-radio-group>
        </p>

        <div v-show="selectTab === 'tab1'">
          <vxe-table
            border
            show-overflow
            height="400"
            :sync-resize="selectTab"
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
            show-overflow
            height="400"
            :sync-resize="selectTab"
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
            show-overflow
            height="400"
            :sync-resize="selectTab"
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 600)
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 600)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
