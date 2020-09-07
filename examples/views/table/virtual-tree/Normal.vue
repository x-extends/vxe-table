<template>
  <div>
    <p class="tip">普通树</p>

    <vxe-virtual-tree
      show-overflow
      toolbar
      row-key
      ref="xVTree1"
      row-id="id"
      :show-header="false"
      :tree-config="{children: 'children'}"
      :radio-config="{labelField: 'name'}"
      :columns="tableColumn1"
      :data="tableData">
      <template v-slot:buttons>
        <vxe-button @click="getTreeRadioEvent">获取选中</vxe-button>
        <vxe-button @click="getTreeExpansionEvent">获取已展开</vxe-button>
        <vxe-button @click="$refs.xVTree1.setAllTreeExpand(true)">展开所有</vxe-button>
        <vxe-button @click="$refs.xVTree1.clearTreeExpand()">关闭所有</vxe-button>
      </template>
    </vxe-virtual-tree>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">更多功能</p>

    <vxe-virtual-tree
      show-overflow
      highlight-hover-row
      ref="xVTree3"
      row-id="id"
      :show-header="false"
      :data="tableData"
      :checkbox-config="{labelField: 'name', checkField: 'checked', halfField: 'indeterminate'}"
      :tree-config="{children: 'children', iconOpen: 'fa fa-minus-square-o', iconClose: 'fa fa-plus-square-o'}"
      :columns="tableColumn3">
    </vxe-virtual-tree>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
      <code class="css">{{ demoCodes[4] }}</code>
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
        { type: 'radio', treeNode: true }
      ],
      tableColumn2: [
        { type: 'checkbox', treeNode: true }
      ],
      tableColumn3: [
        {
          type: 'checkbox',
          treeNode: true,
          slots: {
            default: ({ row }) => {
              return [
                <span>
                  {
                    row.children && row.children.length
                      ? <i class={ ['tree-node-icon fa', this.$refs.xVTree3.isTreeExpandByRow(row) ? 'fa-folder-open-o' : 'fa-folder-o'] }></i>
                      : <i class="tree-node-icon fa fa-file-o"></i>
                  }
                  <span>{ row.name }</span>
                </span>
              ]
            }
          }
        },
        {
          title: '操作',
          width: 140,
          slots: {
            default: () => {
              return [
                <vxe-button type="text" icon="fa fa-eye"></vxe-button>,
                <vxe-button type="text" icon="fa fa-edit"></vxe-button>,
                <vxe-button type="text" icon="fa fa-trash-o"></vxe-button>,
                <vxe-button type="text" icon="fa fa-id-card-o"></vxe-button>
              ]
            }
          }
        }
      ],
      demoCodes: [
        `
        <vxe-virtual-tree
          show-overflow
          toolbar
          row-key
          ref="xVTree1"
          row-id="id"
          :show-header="false"
          :tree-config="{children: 'children'}"
          :radio-config="{labelField: 'name'}"
          :columns="tableColumn"
          :data="tableData">
          <template v-slot:buttons>
            <vxe-button @click="getTreeRadioEvent">获取选中</vxe-button>
            <vxe-button @click="getTreeExpansionEvent">获取已展开</vxe-button>
            <vxe-button @click="$refs.xVTree1.setAllTreeExpand(true)">展开所有</vxe-button>
            <vxe-button @click="$refs.xVTree1.clearTreeExpand()">关闭所有</vxe-button>
          </template>
        </vxe-virtual-tree>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              tableColumn1: [
                { type: 'radio', treeNode: true }
              ]
            }
          },
          created () {
            this.tableData = window.MOCK_TREE_DATA_LIST
          },
          methods: {
            getTreeExpansionEvent () {
              let selectRow = this.$refs.xVTree.getRadioRecord()
              this.$XModal.alert(selectRow ? selectRow.name : 'null')
            },
            getTreeExpansionEvent () {
              let treeExpandRecords = this.$refs.xVTree.getTreeExpandRecords()
              this.$XModal.alert(treeExpandRecords.length)
            }
          }
        }
        `,
        `
        <vxe-virtual-tree
          show-overflow
          highlight-hover-row
          ref="xVTree"
          row-id="id"
          :show-header="false"
          :data="tableData"
          :checkbox-config="{labelField: 'name', checkField: 'checked', halfField: 'indeterminate'}"
          :tree-config="{children: 'children', iconOpen: 'fa fa-minus-square-o', iconClose: 'fa fa-plus-square-o'}"
          :columns="tableColumn3">
        </vxe-virtual-tree>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              tableColumn: [
                {
                  type: 'checkbox',
                  treeNode: true,
                  slots: {
                    default: ({ row }) => {
                      return [
                        <span>
                          {
                            row.children && row.children.length
                              ? <i class={ ['tree-node-icon fa', this.$refs.xVTree.isTreeExpandByRow(row) ? 'fa-folder-open-o' : 'fa-folder-o'] }></i>
                              : <i class="tree-node-icon fa fa-file-o"></i>
                          }
                          <span>{ row.name }</span>
                        </span>
                      ]
                    }
                  }
                },
                {
                  title: '操作',
                  width: 140,
                  slots: {
                    default: ({ row }) => {
                      return [
                        <vxe-button type="text" icon="fa fa-eye"></vxe-button>,
                        <vxe-button type="text" icon="fa fa-edit"></vxe-button>,
                        <vxe-button type="text" icon="fa fa-trash-o"></vxe-button>,
                        <vxe-button type="text" icon="fa fa-id-card-o"></vxe-button>
                      ]
                    }
                  }
                }
              ]
            }
          },
          created () {
            this.tableData = window.MOCK_TREE_DATA_LIST
          }
        }
        `,
        `
        .tree-node-icon {
          width: 24px;
          text-align: center;
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
    getTreeRadioEvent () {
      const selectRow = this.$refs.xVTree1.getRadioRecord()
      this.$XModal.alert(selectRow ? selectRow.name : 'null')
    },
    getTreeExpansionEvent () {
      const treeExpandRecords = this.$refs.xVTree1.getTreeExpandRecords()
      this.$XModal.alert(treeExpandRecords.length)
    }
  }
}
</script>

<style scoped>
.tree-node-icon {
  width: 24px;
  text-align: center;
}
</style>
