<template>
  <div>
    <p class="tip">自定义图标，通过设置 <virtual-tree-api-link prop="tree-config"/>={<virtual-tree-api-link prop="iconOpen"/>, <virtual-tree-api-link prop="iconClose"/>} 局部替换默认的图标</p>

    <vxe-virtual-tree
      border
      resizable
      row-key
      ref="xVTree1"
      row-id="id"
      :toolbar-config="{slots: {buttons: 'toolbar_buttons'}}"
      :columns="tableColumn1"
      :tree-config="{children: 'children', iconOpen: 'fa fa-minus-square-o', iconClose: 'fa fa-plus-square-o'}"
      :data="tableData">
      <template v-slot:toolbar_buttons>
        <vxe-button @click="getTreeExpansionEvent">获取已展开</vxe-button>
        <vxe-button @click="$refs.xVTree1.setAllTreeExpand(true)">展开所有</vxe-button>
        <vxe-button @click="$refs.xVTree1.clearTreeExpand()">关闭所有</vxe-button>
      </template>
    </vxe-virtual-tree>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">更多自定义</p>

    <vxe-virtual-tree
      resizable
      show-overflow
      row-key
      ref="xVTree2"
      row-id="id"
      :columns="tableColumn2"
      :tree-config="{children: 'children', iconOpen: 'fa fa-minus-circle', iconClose: 'fa fa-plus-circle'}"
      :data="tableData">
    </vxe-virtual-tree>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[3] }}</pre-code>
      <pre-code class="css">{{ demoCodes[4] }}</pre-code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'

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
        {
          field: 'name',
          title: 'Name',
          width: 400,
          treeNode: true,
          slots: {
            default: ({ row }) => {
              return [
                <span>
                  {
                    row.children && row.children.length
                      ? <i class={ ['tree-node-icon fa', this.$refs.xVTree2.isTreeExpandByRow(row) ? 'fa-folder-open-o' : 'fa-folder-o'] }></i>
                      : <i class="tree-node-icon fa fa-file-o"></i>
                  }
                  <span>{ row.name }</span>
                </span>
              ]
            }
          }
        },
        { field: 'size', title: 'Size' },
        { field: 'type', title: 'Type' },
        { field: 'date', title: 'Date' }
      ],
      demoCodes: [
        `
        <vxe-virtual-tree
          border
          resizable
          row-key
          ref="xVTree1"
          row-id="id"
          :toolbar-config="{slots: {buttons: 'toolbar_buttons'}}"
          :columns="tableColumn1"
          :tree-config="{children: 'children', iconOpen: 'fa fa-minus-square-o', iconClose: 'fa fa-plus-square-o'}"
          :data="tableData">
          <template v-slot:toolbar_buttons>
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
                { field: 'name', title: 'Name', width: 400, treeNode: true },
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
            getTreeExpansionEvent () {
              let treeExpandRecords = this.$refs.xVTree.getTreeExpandRecords()
              this.$XModal.alert(treeExpandRecords.length)
            }
          }
        }
        `,
        `
        <vxe-virtual-tree
          resizable
          show-overflow
          row-key
          ref="xVTree"
          row-id="id"
          :columns="tableColumn"
          :tree-config="{children: 'children', iconOpen: 'fa fa-minus-circle', iconClose: 'fa fa-plus-circle'}"
          :data="tableData">
        </vxe-virtual-tree>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              tableColumn: [
                {
                  field: 'name',
                  title: 'Name',
                  width: 400,
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
        .tree-node-icon {
          width: 20px;
        }
        `
      ]
    }
  },
  created () {
    this.tableData = XEUtils.clone(window.MOCK_TREE_DATA_LIST, true)
  },
  methods: {
    getTreeExpansionEvent () {
      const treeExpandRecords = this.$refs.xVTree1.getTreeExpandRecords()
      this.$XModal.alert(treeExpandRecords.length)
    }
  }
}
</script>

<style scoped>
.tree-node-icon {
  width: 20px;
}
</style>
