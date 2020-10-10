<template>
  <div>
    <p class="tip">使用 <virtual-tree-api-link prop="highlight-current-row"/> 方式</p>

    <vxe-virtual-tree
      row-key
      row-id="id"
      highlight-current-row
      :tree-config="{children: 'children'}"
      :data="tableData"
      :columns="tableColumn1">
    </vxe-virtual-tree>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">使用 radio 方式</p>

    <vxe-virtual-tree
      row-key
      row-id="id"
      :tree-config="{children: 'children'}"
      :radio-config="{labelField: 'name'}"
      :data="tableData"
      :columns="tableColumn2">
    </vxe-virtual-tree>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>

    <p class="tip">当然也可以两种方式同时使用</p>

    <vxe-virtual-tree
      resizable
      row-key
      highlight-current-row
      ref="xVTree3"
      row-id="id"
      :tree-config="{children: 'children'}"
      :radio-config="{labelField: 'name', trigger: 'row'}"
      :data="tableData"
      :columns="tableColumn3"
      @current-change="currentChangeEvent">
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
        { field: 'name', title: 'Name', width: 400, treeNode: true },
        { field: 'size', title: 'Size' },
        { field: 'type', title: 'Type' },
        { field: 'date', title: 'Date' }
      ],
      tableColumn2: [
        { type: 'radio', title: 'Name', width: 400, treeNode: true },
        { field: 'size', title: 'Size' },
        { field: 'type', title: 'Type' },
        { field: 'date', title: 'Date' }
      ],
      tableColumn3: [
        {
          type: 'radio',
          width: 280,
          treeNode: true,
          slots: {
            header: () => {
              return [
                <vxe-button type="text" onClick={ this.clearCurrentRowEvent } disabled={ !this.selectRow }>取消</vxe-button>
              ]
            }
          }
        },
        { field: 'size', title: 'Size' },
        { field: 'type', title: 'Type' },
        { field: 'date', title: 'Date' }
      ],
      selectRow: null,
      demoCodes: [
        `
        <vxe-virtual-tree
          row-key
          highlight-current-row
          row-id="id"
          :tree-config="{children: 'children'}"
          :data="tableData"
          :columns="tableColumn">
        </vxe-virtual-tree>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              tableColumn: [
                { field: 'name', title: 'Name', width: 400, treeNode: true },
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
        `,
        `
        <vxe-virtual-tree
          row-key
          row-id="id"
          :tree-config="{children: 'children'}"
          :radio-config="{labelField: 'name'}"
          :data="tableData"
          :columns="tableColumn">
        </vxe-virtual-tree>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              tableColumn: [
                { type: 'radio', title: 'Name', width: 400, treeNode: true },
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
        `,
        `
        <vxe-virtual-tree
          resizable
          row-key
          highlight-current-row
          ref="xVTree"
          row-id="id"
          :tree-config="{children: 'children'}"
          :radio-config="{labelField: 'name', trigger: 'row'}"
          :data="tableData"
          :columns="tableColumn"
          @current-change="currentChangeEvent">
        </vxe-virtual-tree>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              tableColumn: [
                {
                  type: 'radio',
                  width: 280,
                  treeNode: true,
                  slots: {
                    header: () => {
                      return [
                        <vxe-button type="text" onClick={ this.clearCurrentRowEvent } disabled={ !this.selectRow }>取消</vxe-button>
                      ]
                    }
                  }
                },
                { field: 'size', title: 'Size' },
                { field: 'type', title: 'Type' },
                { field: 'date', title: 'Date' }
              ],
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
              this.$refs.xVTree.clearRadioRow()
              this.$refs.xVTree.clearCurrentRow()
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
      this.$refs.xVTree3.clearRadioRow()
      this.$refs.xVTree3.clearCurrentRow()
    }
  }
}
</script>
