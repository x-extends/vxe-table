<template>
  <div>
    <p>使用 <a class="link" href="https://www.npmjs.com/package/sortablejs" target="_blank">sortablejs</a> 实现行拖动，由于操作了 Dom 节点所以需要指定 <table-api-link prop="row-key"/></p>

    <vxe-table
      border
      ref="xTable1"
      class="sortable-row-demo"
      row-key="id"
      :data.sync="tableData">
      <vxe-table-column width="60">
        <template v-slot:header>
          <el-tooltip class="item" placement="top">
            <div slot="content">按住后可以上下拖动</div>
            <i class="el-icon-question"></i>
          </el-tooltip>
        </template>
        <template>
          <span class="drag-btn">
            <i class="vxe-icon--menu"></i>
          </span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
      <code class="css">{{ demoCodes[2] }}</code>
    </pre>

    <vxe-table
      border
      ref="xTable2"
      class="sortable-tree-demo"
      row-key="id"
      :data.sync="tableTreeData"
      :tree-config="{children: 'children'}">
      <vxe-table-column width="60">
        <template v-slot:header>
          <el-tooltip class="item" placement="top">
            <div slot="content">按住后可以上下拖动</div>
            <i class="el-icon-question"></i>
          </el-tooltip>
        </template>
        <template>
          <span class="drag-btn">
            <i class="vxe-icon--menu"></i>
          </span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="name" title="Name" tree-node></vxe-table-column>
      <vxe-table-column field="size" title="Size"></vxe-table-column>
      <vxe-table-column field="type" title="Type"></vxe-table-column>
      <vxe-table-column field="date" title="Date"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[3] }}</code>
      <code class="javascript">{{ demoCodes[4] }}</code>
      <code class="css">{{ demoCodes[5] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'
import Sortable from 'sortablejs'
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      tableData: [],
      tableTreeData: [],
      demoCodes: [
        `
        <vxe-table
          border
          class="sortable-row-demo"
          row-key="id"
          :data.sync="tableData">
          <vxe-table-column width="60">
            <template v-slot:header>
              <el-tooltip class="item" placement="top">
                <div slot="content">按住后可以上下拖动排序，<br>完成后点击保存即可！</div>
                <i class="el-icon-question"></i>
              </el-tooltip>
            </template>
            <template>
              <i class="el-icon-rank drag-btn"></i>
            </template>
          </vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
            this.rowDrop()
          },
          destroyed () {
            if (this.sortable) {
              this.sortable.destroy()
            }
          },
          methods: {
            rowDrop () {
              this.$nextTick(() => {
                this.sortable = Sortable.create(this.$el.querySelector('.body--wrapper>.vxe-table--body tbody'), {
                  handle: '.drag-btn',
                  onEnd: ({ newIndex, oldIndex }) => {
                    let currRow = this.tableData.splice(oldIndex, 1)[0]
                    this.tableData.splice(newIndex, 0, currRow)
                  }
                })
              })
            }
          }
        }
        `,
        `
        .sortable-row-demo .drag-btn {
          cursor: move;
          font-size: 12px;
        }
        .sortable-row-demo .vxe-body--row.sortable-ghost,
        .sortable-row-demo .vxe-body--row.sortable-chosen {
          background-color: #dfecfb;
        }
        `,
        `
        <vxe-table
          border
          ref="xTable2"
          class="sortable-tree-demo"
          row-key="id"
          :data.sync="tableTreeData"
          :tree-config="{children: 'children'}">
          <vxe-table-column width="60">
            <template v-slot:header>
              <el-tooltip class="item" placement="top">
                <div slot="content">按住后可以上下拖动</div>
                <i class="el-icon-question"></i>
              </el-tooltip>
            </template>
            <template>
              <span class="drag-btn">
                <i class="vxe-icon--menu"></i>
              </span>
            </template>
          </vxe-table-column>
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
              tableTreeData: []
            }
          },
          created () {
            this.tableTreeData = window.MOCK_DATA_LIST.slice(0)
            this.treeDrop()
          },
          destroyed () {
            if (this.sortable) {
              this.sortable.destroy()
            }
          },
          methods: {
            treeDrop () {
              this.$nextTick(() => {
                this.sortable2 = Sortable.create(this.$refs.xTable2.$el.querySelector('.body--wrapper>.vxe-table--body tbody'), {
                  handle: '.drag-btn',
                  onEnd: ({ item, oldIndex }) => {
                    let options = { children: 'children' }
                    let targetTrElem = item
                    let wrapperElem = targetTrElem.parentNode
                    let tableTreeData = this.tableTreeData
                    let prevTrElem = targetTrElem.previousElementSibling
                    let selfRowId = targetTrElem.getAttribute('data-rowid')
                    let selfNode = XEUtils.findTree(tableTreeData, row => \`\${row.id}\` === selfRowId, options)
                    let selfNodeList = selfNode.parent ? selfNode.parent[options.children] : tableTreeData
                    if (prevTrElem) {
                      // 移动到节点
                      let prevRowId = prevTrElem.getAttribute('data-rowid')
                      let prevNode = XEUtils.findTree(tableTreeData, row => \`\${row.id}\` === prevRowId, options)
                      let prevNodeList = prevNode.parent ? prevNode.parent[options.children] : tableTreeData
                      let prevRow = prevNode.item
                      let selfRow = selfNode.item
                      if (XEUtils.findTree(selfRow[options.children], row => prevRow === row, options)) {
                        // 错误的移动
                        let oldTrElem = wrapperElem.children[oldIndex]
                        wrapperElem.insertBefore(targetTrElem, oldTrElem)
                        return this.$XMsg.message({ message: '不允许自己给自己拖动！', status: 'error' })
                      }
                      let currRow = selfNodeList.splice(selfNode.index, 1)[0]
                      if (this.$refs.xTable2.hasTreeExpand(prevRow)) {
                        // 移动到当前的子节点
                        prevRow[options.children].splice(0, 0, currRow)
                      } else {
                        // 移动到相邻节点
                        prevNodeList.splice(prevNode.index + (selfNode.index < prevNode.index ? 0 : 1), 0, currRow)
                      }
                    } else {
                      // 移动到第一行
                      let currRow = selfNodeList.splice(selfNode.index, 1)[0]
                      tableTreeData.splice(0, 0, currRow)
                    }
                    this.tableTreeData = tableTreeData
                    // 如果变动了树层级，需要刷新表格
                    this.$refs.xTable2.refresh()
                  }
                })
              })
            }
          }
        }
        `,
        `
        .sortable-tree-demo .drag-btn {
          cursor: move;
          font-size: 12px;
        }
        .sortable-tree-demo .vxe-body--row.sortable-ghost,
        .sortable-tree-demo .vxe-body--row.sortable-chosen {
          background-color: #dfecfb;
        }
        `
      ]
    }
  },
  created () {
    window.aa = this
    this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
    this.tableTreeData = XEUtils.clone(window.MOCK_TREE_DATA_LIST, true)
    this.rowDrop()
    this.treeDrop()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  destroyed () {
    if (this.sortable1) {
      this.sortable1.destroy()
    }
    if (this.sortable2) {
      this.sortable2.destroy()
    }
  },
  methods: {
    rowDrop () {
      this.$nextTick(() => {
        this.sortable1 = Sortable.create(this.$refs.xTable1.$el.querySelector('.body--wrapper>.vxe-table--body tbody'), {
          handle: '.drag-btn',
          onEnd: ({ newIndex, oldIndex }) => {
            let currRow = this.tableData.splice(oldIndex, 1)[0]
            this.tableData.splice(newIndex, 0, currRow)
          }
        })
      })
    },
    treeDrop () {
      this.$nextTick(() => {
        this.sortable2 = Sortable.create(this.$refs.xTable2.$el.querySelector('.body--wrapper>.vxe-table--body tbody'), {
          handle: '.drag-btn',
          onEnd: ({ item, oldIndex }) => {
            let options = { children: 'children' }
            let targetTrElem = item
            let wrapperElem = targetTrElem.parentNode
            let tableTreeData = this.tableTreeData
            let prevTrElem = targetTrElem.previousElementSibling
            let selfRowId = targetTrElem.getAttribute('data-rowid')
            let selfNode = XEUtils.findTree(tableTreeData, row => `${row.id}` === selfRowId, options)
            let selfNodeList = selfNode.parent ? selfNode.parent[options.children] : tableTreeData
            if (prevTrElem) {
              // 移动到节点
              let prevRowId = prevTrElem.getAttribute('data-rowid')
              let prevNode = XEUtils.findTree(tableTreeData, row => `${row.id}` === prevRowId, options)
              let prevNodeList = prevNode.parent ? prevNode.parent[options.children] : tableTreeData
              let prevRow = prevNode.item
              let selfRow = selfNode.item
              if (XEUtils.findTree(selfRow[options.children], row => prevRow === row, options)) {
                // 错误的移动
                let oldTrElem = wrapperElem.children[oldIndex]
                wrapperElem.insertBefore(targetTrElem, oldTrElem)
                return this.$XMsg.message({ message: '不允许自己给自己拖动！', status: 'error' })
              }
              let currRow = selfNodeList.splice(selfNode.index, 1)[0]
              if (this.$refs.xTable2.hasTreeExpand(prevRow)) {
                // 移动到当前的子节点
                prevRow[options.children].splice(0, 0, currRow)
              } else {
                // 移动到相邻节点
                prevNodeList.splice(prevNode.index + (selfNode.index < prevNode.index ? 0 : 1), 0, currRow)
              }
            } else {
              // 移动到第一行
              let currRow = selfNodeList.splice(selfNode.index, 1)[0]
              tableTreeData.splice(0, 0, currRow)
            }
            this.tableTreeData = tableTreeData
            // 如果变动了树层级，需要刷新表格
            this.$refs.xTable2.refresh()
          }
        })
      })
    }
  }
}
</script>

<style lang="scss">
.sortable-row-demo .drag-btn {
  cursor: move;
  font-size: 12px;
}
.sortable-row-demo .vxe-body--row.sortable-ghost,
.sortable-row-demo .vxe-body--row.sortable-chosen {
  background-color: #dfecfb;
}

.sortable-tree-demo .drag-btn {
  cursor: move;
  font-size: 12px;
}
.sortable-tree-demo .vxe-body--row.sortable-ghost,
.sortable-tree-demo .vxe-body--row.sortable-chosen {
  background-color: #dfecfb;
}
</style>
