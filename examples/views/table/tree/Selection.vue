<template>
  <div>
    <p class="tip">
      多选树表格<br>
    </p>

    <vxe-table
      resizable
      :tree-config="{children: 'children'}"
      :data="tableData"
      :checkbox-config="{labelField: 'id', highlight: true}"
      @checkbox-change="selectChangeEvent">
      <vxe-table-column type="checkbox" title="ID" width="280" tree-node></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="size" title="Size"></vxe-table-column>
      <vxe-table-column field="type" title="Type"></vxe-table-column>
      <vxe-table-column field="date" title="Date"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">默认选中，通过指定 <table-api-link prop="checkRowKeys"/> 设置默认选中的行</p>

    <vxe-table
      resizable
      row-id="id"
      :data="tableData"
      :tree-config="{children: 'children'}"
      :checkbox-config="{labelField: 'name', checkRowKeys: ['122000', '20000']}"
      @checkbox-change="selectChangeEvent">
      <vxe-table-column type="checkbox" title="Sex" width="400" tree-node></vxe-table-column>
      <vxe-table-column field="size" title="Size"></vxe-table-column>
      <vxe-table-column field="type" title="Type"></vxe-table-column>
      <vxe-table-column field="date" title="Date"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>

    <p class="tip">通过 <table-api-link prop="checkStrictly"/> 设置父子节点不互相关联，默认不显示头部复选框，可以通过 checkbox-config={<table-api-link prop="showHeader"/>} 设置</p>

    <vxe-table
      resizable
      :data="tableData"
      :tree-config="{children: 'children'}"
      :checkbox-config="{labelField: 'name', checkStrictly: true}">
      <vxe-table-column type="checkbox" title="Name" width="280" tree-node></vxe-table-column>
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
import hljs from 'highlight.js'
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      tableData: [],
      demoCodes: [
        `
        <vxe-table
          resizable
          :tree-config="{children: 'children'}"
          :data="tableData"
          :checkbox-config="{labelField: 'id', highlight: true}"
          @checkbox-change="selectChangeEvent">
          <vxe-table-column type="checkbox" title="ID" width="280" tree-node></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
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
          },
          methods: {
            selectChangeEvent ({ records }) {
              console.info(\`勾选\${records.length}个树形节点\`, records)
            }
          }
        }
        `,
        `
        <vxe-table
          resizable
          row-id="id"
          :data="tableData"
          :tree-config="{children: 'children'}"
          :checkbox-config="{labelField: 'name', checkRowKeys: ['122000', '20000']}"
          @checkbox-change="selectChangeEvent">
          <vxe-table-column type="checkbox" title="Sex" width="400" tree-node></vxe-table-column>
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
          },
          methods: {
            selectChangeEvent ({ records }) {
              console.info(\`勾选\${records.length}个树形节点\`, records)
            }
          }
        }
        `,
        `
        <vxe-table
          resizable
          :data="tableData"
          :tree-config="{children: 'children'}"
          :checkbox-config="{labelField: 'name', checkStrictly: true}">
          <vxe-table-column type="checkbox" title="Name" width="280" tree-node></vxe-table-column>
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
    checCheckboxkMethod ({ row }) {
      return !['js', 'mp4'].includes(row.type)
    },
    selectChangeEvent ({ records }) {
      console.info(`勾选${records.length}个树形节点`, records)
    }
  }
}
</script>
