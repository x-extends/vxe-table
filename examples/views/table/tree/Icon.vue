<template>
  <div>
    <p class="tip">自定义图标，通过设置 <table-api-link prop="tree-config"/>={<table-api-link prop="iconOpen"/>, <table-api-link prop="iconClose"/>} 局部替换默认的图标</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="getTreeExpansionEvent">获取已展开</vxe-button>
        <vxe-button @click="$refs.xTree1.setAllTreeExpansion(true)">展开所有</vxe-button>
        <vxe-button @click="$refs.xTree1.clearTreeExpand()">关闭所有</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      resizable
      ref="xTree1"
      :tree-config="{children: 'children', iconOpen: 'fa fa-minus-square-o', iconClose: 'fa fa-plus-square-o'}"
      :data="tableData">
      <vxe-table-column field="name" title="app.body.label.name" tree-node></vxe-table-column>
      <vxe-table-column field="size" title="Size"></vxe-table-column>
      <vxe-table-column field="type" title="Type"></vxe-table-column>
      <vxe-table-column field="date" title="Date"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">更多自定义</p>

    <vxe-table
      resizable
      show-overflow
      ref="xTree2"
      :tree-config="{children: 'children', iconOpen: 'fa fa-minus-circle', iconClose: 'fa fa-plus-circle'}"
      :data="tableData">
      <vxe-table-column field="name" title="Name" tree-node>
        <template v-slot="{ row }">
          <span>
            <template v-if="row.children && row.children.length">
              <i class="tree-node-icon fa" :class="$refs.xTree2.isTreeExpandByRow(row) ? 'fa-folder-open-o' : 'fa-folder-o'"></i>
            </template>
            <template v-else>
              <i class="tree-node-icon fa fa-file-o"></i>
            </template>
            <span>{{ row.name }}</span>
          </span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="size" title="Size"></vxe-table-column>
      <vxe-table-column field="type" title="Type"></vxe-table-column>
      <vxe-table-column field="date" title="Date"></vxe-table-column>
    </vxe-table>

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
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="getTreeExpansionEvent">获取已展开</vxe-button>
            <vxe-button @click="$refs.xTree.setAllTreeExpansion(true)">展开所有</vxe-button>
            <vxe-button @click="$refs.xTree.clearTreeExpand()">关闭所有</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          resizable
          ref="xTree"
          :tree-config="{children: 'children', iconOpen: 'fa fa-minus-square-o', iconClose: 'fa fa-plus-square-o'}"
          :data="tableData">
          <vxe-table-column field="name" title="app.body.label.name"  tree-node></vxe-table-column>
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
            this.tableData = window.MOCK_TREE_DATA_LIST.slice(0)
          },
          methods: {
            getTreeExpansionEvent () {
              let treeExpandRecords = this.$refs.xTree.getTreeExpandRecords()
              this.$XModal.alert(treeExpandRecords.length)
            }
          }
        }
        `,
        `
        <vxe-table
          resizable
          show-overflow
          ref="xTree"
          :tree-config="{children: 'children', iconOpen: 'fa fa-minus-circle', iconClose: 'fa fa-plus-circle'}"
          :data="tableData">
          <vxe-table-column field="name" title="Name" tree-node>
            <template v-slot="{ row }">
              <span>
                <template v-if="row.children && row.children.length">
                  <i class="tree-node-icon fa" :class="$refs.xTree.isTreeExpandByRow(row) ? 'fa-folder-open-o' : 'fa-folder-o'"></i>
                </template>
                <template v-else>
                  <i class="tree-node-icon fa fa-file-o"></i>
                </template>
                <span>{{ row.name }}</span>
              </span>
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
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_TREE_DATA_LIST.slice(0)
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
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    getTreeExpansionEvent () {
      let treeExpandRecords = this.$refs.xTree1.getTreeExpandRecords()
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
