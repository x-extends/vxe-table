<template>
  <div>
    <p class="tip">
      使用 <table-api-link prop="highlight-current-row"/> 方式
    </p>

    <vxe-table
      highlight-current-row
      :tree-config="{children: 'children'}"
      :data="tableData">
      <vxe-table-column field="name" title="Name" tree-node></vxe-table-column>
      <vxe-table-column field="size" title="Size"></vxe-table-column>
      <vxe-table-column field="type" title="Type"></vxe-table-column>
      <vxe-table-column field="date" title="Date"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">使用 radio 方式</p>

    <vxe-table
      :tree-config="{children: 'children'}"
      :radio-config="{labelField: 'name', highlight: true}"
      :data="tableData">
      <vxe-table-column type="radio" title="Name" width="400" tree-node></vxe-table-column>
      <vxe-table-column field="size" title="Size"></vxe-table-column>
      <vxe-table-column field="type" title="Type"></vxe-table-column>
      <vxe-table-column field="date" title="Date"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>

    <p class="tip">当然也可以两种方式同时使用</p>

    <vxe-table
      resizable
      highlight-current-row
      ref="xTable3"
      :tree-config="{children: 'children'}"
      :radio-config="{labelField: 'name', trigger: 'row'}"
      :data="tableData"
      @current-change="currentChangeEvent">
      <vxe-table-column type="radio" width="400" tree-node>
        <template v-slot:header>
          <vxe-button type="text" @click="clearCurrentRowEvent" :disabled="!selectRow">取消</vxe-button>
        </template>
      </vxe-table-column>
      <vxe-table-column field="size" title="Size"></vxe-table-column>
      <vxe-table-column field="type" title="Type"></vxe-table-column>
      <vxe-table-column field="date" title="Date"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[4] }}</code>
      <code class="javascript">{{ demoCodes[5] }}</code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [],
      selectRow: null,
      demoCodes: [
        `
        <vxe-table
          highlight-current-row
          :tree-config="{children: 'children'}"
          :data="tableData">
          <vxe-table-column field="name" title="Name" tree-node></vxe-table-column>
          <vxe-table-column field="size" title="Size"></vxe-table-column>
          <vxe-table-column field="type" title="Type"></vxe-table-column>
          <vxe-table-column field="date" title="Date"></vxe-table-column>
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
            this.tableData = window.MOCK_TREE_DATA_LIST
          }
        }
        `,
        `
        <vxe-table
          :tree-config="{children: 'children'}"
          :radio-config="{labelField: 'name', highlight: true}"
          :data="tableData">
          <vxe-table-column type="radio" title="Name" width="400" tree-node></vxe-table-column>
          <vxe-table-column field="size" title="Size"></vxe-table-column>
          <vxe-table-column field="type" title="Type"></vxe-table-column>
          <vxe-table-column field="date" title="Date"></vxe-table-column>
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
            this.tableData = window.MOCK_TREE_DATA_LIST
          }
        }
        `,
        `
        <vxe-table
          resizable
          highlight-current-row
          ref="xTable"
          :tree-config="{children: 'children'}"
          :radio-config="{labelField: 'name', trigger: 'row'}"
          :data="tableData"
          @current-change="currentChangeEvent">
          <vxe-table-column type="radio" width="400" tree-node>
            <template v-slot:header>
              <vxe-button type="text" @click="clearCurrentRowEvent" :disabled="!selectRow">取消</vxe-button>
            </template>
          </vxe-table-column>
          <vxe-table-column field="size" title="Size"></vxe-table-column>
          <vxe-table-column field="type" title="Type"></vxe-table-column>
          <vxe-table-column field="date" title="Date"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              selectRow: null
            }
          },
          created () {
            this.tableData = window.MOCK_TREE_DATA_LIST
          },
          methods: {
            currentChangeEvent ({ row }) {
              this.selectRow = row
            },
            clearCurrentRowEvent () {
              this.selectRow = null
              this.$refs.xTable.clearRadioRow()
              this.$refs.xTable.clearCurrentRow()
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = XEUtils.clone(window.MOCK_TREE_DATA_LIST, true)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    currentChangeEvent ({ row }) {
      this.selectRow = row
    },
    clearCurrentRowEvent () {
      this.selectRow = null
      this.$refs.xTable3.clearRadioRow()
      this.$refs.xTable3.clearCurrentRow()
    }
  }
}
</script>
