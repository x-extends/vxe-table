<template>
  <div>
    <p class="tip">虚拟树封装原理可供参考：实现支持大数据的虚拟树表格，基于表格组件很容易就可以封装一个高性能的虚拟树</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="setAllTreeExpansion(true)">展开所有</vxe-button>
        <vxe-button @click="setAllTreeExpansion(false)">收起所有</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      ref="xTable"
      resizable
      show-overflow
      height="500"
      row-id="id"
      :loading="loading">
      <vxe-table-column type="index" width="100"></vxe-table-column>
      <vxe-table-column field="name" title="省市区">
        <template v-slot="{ row }">
          <span :class="[`level-${row.level}`]" :style="{paddingLeft: `${row.level * treeIndent}px`}">
            <i
              class="virtual-tree-icon"
              :class="[`vxe-icon--arrow-${ row.expand ? 'bottom' : 'right' }`, {visible: row.children && row.children.length}]"
              @click="toggleTreeExpansion(row)"></i>
            <span>{{ row.name }}</span>
          </span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="id" title="邮政编码"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
      <code class="css">{{ demoCodes[2] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      loading: false,
      treeConfig: {
        children: 'children'
      },
      treeIndent: 16,
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="setAllTreeExpansion(true)">展开所有</vxe-button>
            <vxe-button @click="setAllTreeExpansion(false)">收起所有</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          ref="xTable"
          resizable
          show-overflow
          height="500"
          row-id="id"
          :loading="loading">
          <vxe-table-column type="index" width="100"></vxe-table-column>
          <vxe-table-column field="name" title="省市区">
            <template v-slot="{ row }">
              <span :class="[\`level-\${row.level}\`]" :style="{paddingLeft: \`\${row.level * treeIndent}px\`}">
                <i
                  class="virtual-tree-icon"
                  :class="[\`vxe-icon--arrow-\${ row.expand ? 'bottom' : 'right' }\`, {visible: row.children && row.children.length}]"
                  @click="toggleTreeExpansion(row)"></i>
                <span>{{ row.name }}</span>
              </span>
            </template>
          </vxe-table-column>
          <vxe-table-column field="id" title="邮政编码"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              treeConfig: {
                children: 'children'
              },
              treeIndent: 16
            }
          },
          created () {
            this.findCityAll()
          },
          methods: {
            findCityAll () {
              this.loading = true
              this.$ajax.getJSON('/api/conf/city/all').then(data => {
                const list = this.toVirtualTree(data)
                this.$refs.xTable.reloadData(list)
                this.loading = false
              })
            },
            setAllTreeExpansion (expand) {
              let list = this.virtualAllExpand(expand)
              this.$refs.xTable.reloadData(list)
            },
            toggleTreeExpansion (row) {
              let list = this.virtualExpand(row, !row.expand)
              this.$refs.xTable.loadData(list)
            },
            // 通用虚拟树方法-定义树属性
            toVirtualTree (treeData) {
              this.$utils.eachTree(treeData, (item, index, obj, paths, parent, nodes) => {
                item.expand = false
                item.level = nodes.length - 1
              })
              this.treeData = treeData.slice(0)
              this.tableData = treeData.slice(0)
              return treeData
            },
            // 通用虚拟树方法-展开/收起树节点
            virtualExpand (row, expand) {
              if (row.expand !== expand) {
                let children = row.children
                if (children && children.length) {
                  let tableData = this.tableData
                  if (row.expand) {
                    // 展开节点
                    let childList = []
                    this.$utils.eachTree(children, item => {
                      childList.push(item)
                    }, this.treeConfig)
                    tableData = tableData.filter(item => childList.indexOf(item) === -1)
                  } else {
                    // 收起节点
                    let expandList = []
                    let rowIndex = tableData.indexOf(row)
                    if (rowIndex === -1) {
                      throw new Error('错误的操作！')
                    }
                    this.$utils.eachTree(children, (item, index, obj, paths, parent, nodes) => {
                      if (!parent || parent.expand) {
                        expandList.push(item)
                      }
                    }, this.treeConfig)
                    tableData.splice.apply(tableData, [rowIndex + 1, 0].concat(expandList))
                  }
                  row.expand = !row.expand
                  this.tableData = tableData
                }
              }
              return this.tableData
            },
            // 通用虚拟树方法-展开/收起所有树节点
            virtualAllExpand (expand) {
              this.$utils.eachTree(this.treeData, row => {
                this.virtualExpand(row, expand)
              }, this.treeConfig)
              return this.tableData
            }
          }
        }
        `,
        `
        .virtual-tree-icon {
          visibility: hidden;
          cursor: pointer;
          margin-right: 4px;
        }
        .virtual-tree-icon.visible {
          visibility: visible;
        }
        `
      ]
    }
  },
  created () {
    this.findCityAll()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    findCityAll () {
      this.loading = true
      this.$ajax.getJSON('/api/conf/city/all').then(data => {
        const list = this.toVirtualTree(data)
        this.$refs.xTable.reloadData(list)
        this.loading = false
      })
    },
    setAllTreeExpansion (expand) {
      let list = this.virtualAllExpand(expand)
      this.$refs.xTable.reloadData(list)
    },
    toggleTreeExpansion (row) {
      let list = this.virtualExpand(row, !row.expand)
      this.$refs.xTable.loadData(list)
    },
    // 通用虚拟树方法-定义树属性
    toVirtualTree (treeData) {
      this.$utils.eachTree(treeData, (item, index, obj, paths, parent, nodes) => {
        item.expand = false
        item.level = nodes.length - 1
      })
      this.treeData = treeData.slice(0)
      this.tableData = treeData.slice(0)
      return treeData
    },
    // 通用虚拟树方法-展开/收起树节点
    virtualExpand (row, expand) {
      if (row.expand !== expand) {
        let children = row.children
        if (children && children.length) {
          let tableData = this.tableData
          if (row.expand) {
            // 展开节点
            let childList = []
            this.$utils.eachTree(children, item => {
              childList.push(item)
            }, this.treeConfig)
            tableData = tableData.filter(item => childList.indexOf(item) === -1)
          } else {
            // 收起节点
            let expandList = []
            let rowIndex = tableData.indexOf(row)
            if (rowIndex === -1) {
              throw new Error('错误的操作！')
            }
            this.$utils.eachTree(children, (item, index, obj, paths, parent, nodes) => {
              if (!parent || parent.expand) {
                expandList.push(item)
              }
            }, this.treeConfig)
            tableData.splice.apply(tableData, [rowIndex + 1, 0].concat(expandList))
          }
          row.expand = !row.expand
          this.tableData = tableData
        }
      }
      return this.tableData
    },
    // 通用虚拟树方法-展开/收起所有树节点
    virtualAllExpand (expand) {
      this.$utils.eachTree(this.treeData, row => {
        this.virtualExpand(row, expand)
      }, this.treeConfig)
      return this.tableData
    }
  }
}
</script>

<style scoped>
.virtual-tree-icon {
  visibility: hidden;
  cursor: pointer;
  margin-right: 4px;
}
.virtual-tree-icon.visible {
  visibility: visible;
}
</style>
