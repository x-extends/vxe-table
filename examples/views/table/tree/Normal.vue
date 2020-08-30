<template>
  <div>
    <p class="tip">
      普通树
    </p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="getTreeRadioEvent">获取选中</vxe-button>
        <vxe-button @click="getTreeExpansionEvent">获取已展开</vxe-button>
        <vxe-button @click="$refs.xTree1.setAllTreeExpand(true)">展开所有</vxe-button>
        <vxe-button @click="$refs.xTree1.clearTreeExpand()">关闭所有</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      show-overflow
      tree-config
      ref="xTree1"
      :show-header="false"
      :radio-config="{labelField: 'name'}"
      :data="tableData">
      <vxe-table-column type="radio" tree-node></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">带连接线</p>

    <vxe-table
      show-overflow
      highlight-hover-row
      row-key
      :show-header="false"
      :data="tableData"
      :checkbox-config="{labelField: 'name'}"
      :tree-config="{children: 'children', accordion: true, line: true, iconOpen: 'fa fa-caret-down', iconClose: 'fa fa-caret-right'}">
      <vxe-table-column type="checkbox" tree-node></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>

    <p class="tip">更多功能</p>

    <vxe-table
      show-overflow
      highlight-hover-row
      row-key
      ref="xTree3"
      border="inner"
      :show-header="false"
      :data="tableData3"
      :checkbox-config="{labelField: 'name'}"
      :tree-config="{children: 'children', accordion: true, line: true, iconOpen: 'fa fa-minus-square-o', iconClose: 'fa fa-plus-square-o'}">
      <vxe-table-column type="checkbox" tree-node>
        <template v-slot="{ row }">
          <span>
            <template v-if="row.children && row.children.length">
              <i class="tree-node-icon fa" :class="$refs.xTree3.isTreeExpandByRow(row) ? 'fa-folder-open-o' : 'fa-folder-o'"></i>
            </template>
            <template v-else>
              <i class="tree-node-icon fa fa-file-o"></i>
            </template>
            <span>{{ row.name }}</span>
          </span>
        </template>
      </vxe-table-column>
      <vxe-table-column title="操作" width="140">
        <template v-slot="{ row }">
          <vxe-button type="text" icon="fa fa-eye"></vxe-button>
          <vxe-button type="text" icon="fa fa-edit"></vxe-button>
          <vxe-button type="text" icon="fa fa-trash-o" @click="removeRowEvent(row)"></vxe-button>
          <vxe-button type="text" icon="fa fa-id-card-o"></vxe-button>
        </template>
      </vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[4] }}</code>
      <code class="javascript">{{ demoCodes[5] }}</code>
      <code class="css">{{ demoCodes[6] }}</code>
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
      tableData3: [],
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="getTreeRadioEvent">获取选中</vxe-button>
            <vxe-button @click="getTreeExpansionEvent">获取已展开</vxe-button>
            <vxe-button @click="$refs.xTree.setAllTreeExpand(true)">展开所有</vxe-button>
            <vxe-button @click="$refs.xTree.clearTreeExpand()">关闭所有</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          show-overflow
          tree-config
          ref="xTree"
          :show-header="false"
          :radio-config="{labelField: 'name'}"
          :data="tableData">
          <vxe-table-column type="radio" tree-node></vxe-table-column>
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
            getTreeExpansionEvent () {
              let selectRow = this.$refs.xTree.getRadioRecord()
              this.$XModal.alert(selectRow ? selectRow.name : 'null')
            },
            getTreeExpansionEvent () {
              let treeExpandRecords = this.$refs.xTree.getTreeExpandRecords()
              this.$XModal.alert(treeExpandRecords.length)
            }
          }
        }
        `,
        `
        <vxe-table
          show-overflow
          highlight-hover-row
          row-key
          :show-header="false"
          :data="tableData"
          :checkbox-config="{labelField: 'name'}"
          :tree-config="{children: 'children', accordion: true, line: true, iconOpen: 'fa fa-caret-down', iconClose: 'fa fa-caret-right'}">
          <vxe-table-column type="checkbox" tree-node></vxe-table-column>
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
          show-overflow
          highlight-hover-row
          row-key
          ref="xTree3"
          border="inner"
          :show-header="false"
          :data="tableData"
          :checkbox-config="{labelField: 'name'}"
          :tree-config="{children: 'children', accordion: true, line: true, iconOpen: 'fa fa-minus-square-o', iconClose: 'fa fa-plus-square-o'}">
          <vxe-table-column type="checkbox" tree-node>
            <template v-slot="{ row }">
              <span>
                <template v-if="row.children && row.children.length">
                  <i class="tree-node-icon fa" :class="$refs.xTree3.isTreeExpandByRow(row) ? 'fa-folder-open-o' : 'fa-folder-o'"></i>
                </template>
                <template v-else>
                  <i class="tree-node-icon fa fa-file-o"></i>
                </template>
                <span>{{ row.name }}</span>
              </span>
            </template>
          </vxe-table-column>
          <vxe-table-column title="操作" width="140">
            <template v-slot="{ row }">
              <vxe-button type="text" icon="fa fa-eye"></vxe-button>
              <vxe-button type="text" icon="fa fa-edit"></vxe-button>
              <vxe-button type="text" icon="fa fa-trash-o" @click="removeRowEvent(row)"></vxe-button>
              <vxe-button type="text" icon="fa fa-id-card-o"></vxe-button>
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
            removeRowEvent (row) {
              this.$XModal.confirm('您确定要删除吗？').then(type => {
                if (type === 'confirm') {
                  let matchObj = XEUtils.findTree(this.tableData, item => item === row, this.treeConfig)
                  if (matchObj) {
                    // 从树节点中移除
                    matchObj.items.splice(matchObj.index, 1)
                  }
                }
              })
            }
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
    this.tableData3 = XEUtils.clone(window.MOCK_TREE_DATA_LIST, true)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    removeRowEvent (row) {
      this.$XModal.confirm('您确定要删除吗？').then(type => {
        if (type === 'confirm') {
          const matchObj = XEUtils.findTree(this.tableData3, item => item === row, this.treeConfig)
          if (matchObj) {
            // 从树节点中移除
            matchObj.items.splice(matchObj.index, 1)
          }
        }
      })
    },
    getTreeRadioEvent () {
      const selectRow = this.$refs.xTree1.getRadioRecord()
      this.$XModal.alert(selectRow ? selectRow.name : 'null')
    },
    getTreeExpansionEvent () {
      const treeExpandRecords = this.$refs.xTree1.getTreeExpandRecords()
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
