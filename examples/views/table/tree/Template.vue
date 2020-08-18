<template>
  <div>
    <p class="tip">
      使用自定义模板渲染<br>
      <span class="red">(注：树结构不支持大量数据，如果数据量超过 500 条，请谨慎使用！)</span>
    </p>

    <vxe-toolbar>
      <template v-slot:buttons>
         <vxe-input size="small" placeholder="搜索"></vxe-input>
      </template>
      <template v-slot:tools>
        <vxe-button status="primary">操作1</vxe-button>
        <vxe-button status="primary">操作2</vxe-button>
        <vxe-button status="primary">操作3</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      resizable
      :tree-config="{children: 'children'}"
      :data="tableData">
      <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
      <vxe-table-column field="size" title="Size"></vxe-table-column>
      <vxe-table-column field="type" title="Type">
        <template v-slot="{ row }">
          <span>{{ `类型：${row.type || '无'}` }}</span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="attr3" title="Image" tree-node>
        <template v-slot>
          <img src="static/other/img1.gif" height="50">
        </template>
      </vxe-table-column>
      <vxe-table-column field="date" title="Date">
        <template v-slot="{ row }">
          <span>{{ formatDate(row.date) }}</span>
        </template>
      </vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
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
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-input size="small" placeholder="搜索"></vxe-input>
          </template>
          <template v-slot:tools>
            <vxe-button status="primary">操作1</vxe-button>
            <vxe-button status="primary">操作2</vxe-button>
            <vxe-button status="primary">操作3</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          resizable
          :tree-config="{children: 'children'}"
          :data="tableData">
          <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
          <vxe-table-column field="size" title="Size"></vxe-table-column>
          <vxe-table-column field="type" title="Type">
            <template v-slot="{ row }">
              <span>{{ \`类型：\${row.type || '无'}\` }}</span>
            </template>
          </vxe-table-column>
          <vxe-table-column field="attr3" title="Image" tree-node>
            <template v-slot>
              <img src="static/other/img1.gif" height="50">
            </template>
          </vxe-table-column>
          <vxe-table-column field="date" title="Date">
            <template v-slot="{ row }">
              <span>{{ formatDate(row.date) }}</span>
            </template>
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
            this.tableData = window.MOCK_TREE_DATA_LIST
          },
          methods: {
            formatDate (value) {
              return XEUtils.toDateString(value, 'yyyy-MM-dd HH:mm:ss.S')
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
    formatDate (value) {
      return XEUtils.toDateString(value, 'yyyy-MM-dd HH:mm:ss.S')
    }
  }
}
</script>
