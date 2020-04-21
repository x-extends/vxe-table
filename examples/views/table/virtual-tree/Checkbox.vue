<template>
  <div>
    <p class="tip">多选树表格</p>

    <vxe-virtual-tree
      resizable
      row-key
      row-id="id"
      :tree-config="{children: 'children'}"
      :data="tableData"
      :columns="tableColumn1"
      @checkbox-change="selectChangeEvent">
    </vxe-virtual-tree>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">默认选中，通过指定 <virtual-tree-api-link prop="checkRowKeys"/> 设置默认选中的行</p>

    <vxe-virtual-tree
      resizable
      row-key
      row-id="id"
      :data="tableData"
      :columns="tableColumn2"
      :tree-config="{children: 'children'}"
      :checkbox-config="{labelField: 'name', checkRowKeys: ['122000', '20000']}"
      @checkbox-change="selectChangeEvent">
    </vxe-virtual-tree>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>

    <p class="tip">通过 <virtual-tree-api-link prop="checkStrictly"/> 设置父子节点不互相关联，默认不显示头部复选框，可以通过 checkbox-config={<virtual-tree-api-link prop="showHeader"/>} 设置</p>

    <vxe-virtual-tree
      resizable
      row-key
      row-id="id"
      :data="tableData"
      :columns="tableColumn3"
      :tree-config="{children: 'children'}"
      :checkbox-config="{labelField: 'name', checkStrictly: true}">
    </vxe-virtual-tree>

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
      tableColumn1: [
        { type: 'checkbox', treeNode: true },
        { field: 'name', title: 'Name' },
        { field: 'size', title: 'Size' },
        { field: 'type', title: 'Type' },
        { field: 'date', title: 'Date' }
      ],
      tableColumn2: [
        { type: 'checkbox', title: 'Name', width: 400, treeNode: true },
        { field: 'size', title: 'Size' },
        { field: 'type', title: 'Type' },
        { field: 'date', title: 'Date' }
      ],
      tableColumn3: [
        { type: 'checkbox', title: 'Name', width: 280, treeNode: true },
        { field: 'size', title: 'Size' },
        { field: 'type', title: 'Type' },
        { field: 'date', title: 'Date' }
      ],
      demoCodes: [
        `
        <vxe-virtual-tree
          resizable
          row-key
          row-id="id"
          :tree-config="{children: 'children'}"
          :data="tableData"
          :columns="tableColumn"
          @checkbox-change="selectChangeEvent">
        </vxe-virtual-tree>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              tableColumn: [
                { type: 'checkbox', treeNode: true },
                { field: 'name', title: 'Name' },
                { field: 'size', title: 'Size' },
                { field: 'type', title: 'Type' },
                { field: 'date', title: 'Date' }
              ]
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
        <vxe-virtual-tree
          resizable
          row-key
          row-id="id"
          :data="tableData"
          :columns="tableColumn"
          :tree-config="{children: 'children'}"
          :checkbox-config="{labelField: 'name', checkRowKeys: ['122000', '20000']}"
          @checkbox-change="selectChangeEvent">
        </vxe-virtual-tree>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              tableColumn: [
                { type: 'checkbox', title: 'Name', width: 400, treeNode: true },
                { field: 'size', title: 'Size' },
                { field: 'type', title: 'Type' },
                { field: 'date', title: 'Date' }
              ]
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
        <vxe-virtual-tree
          resizable
          row-key
          row-id="id"
          :data="tableData"
          :columns="tableColumn3"
          :tree-config="{children: 'children'}"
          :checkbox-config="{labelField: 'name', checkStrictly: true}">
        </vxe-virtual-tree>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              tableColumn: [
                { type: 'checkbox', title: 'Name', width: 280, treeNode: true },
                { field: 'size', title: 'Size' },
                { field: 'type', title: 'Type' },
                { field: 'date', title: 'Date' }
              ]
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
    checkMethod ({ row }) {
      return !['js', 'mp4'].includes(row.type)
    },
    selectChangeEvent ({ records }) {
      console.info(`勾选${records.length}个树形节点`, records)
    }
  }
}
</script>
