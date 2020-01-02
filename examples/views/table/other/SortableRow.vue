<template>
  <div>
    <p class="tip"><table-api-link name="vxe-table"/> 方式：使用 <a class="link" href="https://www.npmjs.com/package/sortablejs" target="_blank">sortablejs</a> 实现行拖动，由于直接操作了 Dom 节点，需要与 Vue 的数据同步，必须设置 <table-api-link prop="row-key"/></p>

    <vxe-table
      border
      row-key
      ref="xTable1"
      class="sortable-row-demo"
      :data="tableData">
      <vxe-table-column width="60">
        <template>
          <span class="drag-btn">
            <i class="vxe-icon--menu"></i>
          </span>
        </template>
        <template v-slot:header>
          <vxe-tooltip v-model="showHelpTip1" content="按住后可以上下拖动排序！" enterable>
            <i class="vxe-icon--question" @click="showHelpTip1 = !showHelpTip1"></i>
          </vxe-tooltip>
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

    <p class="tip">
      <grid-api-link name="vxe-grid"/> 方式：树表格的移动也是一样的<br>
      由于树节点的深层结构，所以需要在树节点在变动之后调用 <table-api-link prop="refreshData"/> 方法刷新数据<br>
      <span class="red">注意：树结构虽然可以任意跨层级拖动，但需要自行限制自己不能往自己子节点拖动</span>
    </p>

    <vxe-grid
      border
      row-key
      ref="xTable2"
      class="sortable-tree-demo"
      :columns="tableColumn"
      :data="tableTreeData"
      :tree-config="{children: 'children'}"></vxe-grid>

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
      showHelpTip1: false,
      showHelpTip2: false,
      tableData: [],
      tableColumn: [
        {
          width: 60,
          slots: {
            default: () => {
              return [
                <span class="drag-btn">
                  <i class="vxe-icon--menu"></i>
                </span>
              ]
            },
            header: () => {
              return [
                <vxe-tooltip v-model={ this.showHelpTip2 } content="按住后可以上下拖动排序！" enterable>
                  <i class="vxe-icon--question" onClick={ () => { this.showHelpTip2 = !this.showHelpTip2 } }></i>
                </vxe-tooltip>
              ]
            }
          }
        },
        { field: 'name', title: 'Name', treeNode: true },
        { field: 'size', title: 'Size' },
        { field: 'type', title: 'Type' },
        { field: 'date', title: 'Date' }
      ],
      tableTreeData: [],
      demoCodes: [
        `
        <vxe-table
          border
          row-key
          ref="xTable1"
          class="sortable-row-demo"
          :data="tableData">
          <vxe-table-column width="60">
            <template>
              <span class="drag-btn">
                <i class="vxe-icon--menu"></i>
              </span>
            </template>
            <template v-slot:header>
              <vxe-tooltip v-model="showHelpTip1" content="按住后可以上下拖动排序！" enterable>
                <i class="vxe-icon--question" @click="showHelpTip1 = !showHelpTip1"></i>
              </vxe-tooltip>
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
              showHelpTip1: false,
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
            this.rowDrop()
          },
          beforeDestroy () {
            if (this.sortable) {
              this.sortable.destroy()
            }
          },
          methods: {
            rowDrop () {
              this.$nextTick(() => {
                let xTable = this.$refs.xTable
                this.sortable = Sortable.create(xTable.$el.querySelector('.body--wrapper>.vxe-table--body tbody'), {
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
        <vxe-grid
          border
          row-key
          ref="xTable2"
          class="sortable-tree-demo"
          :columns="tableColumn"
          :data="tableTreeData"
          :tree-config="{children: 'children'}"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              showHelpTip2: false,
              tableTreeData: [],
              tableColumn: [
                {
                  width: 60,
                  slots: {
                    default: () => {
                      return [
                        <span class="drag-btn">
                          <i class="vxe-icon--menu"></i>
                        </span>
                      ]
                    },
                    header: () => {
                      return [
                        <vxe-tooltip v-model={ this.showHelpTip2 } content="按住后可以上下拖动排序！" enterable>
                          <i class="vxe-icon--question" onClick={ () => { this.showHelpTip2 = !this.showHelpTip2 } }></i>
                        </vxe-tooltip>
                      ]
                    }
                  }
                },
                { field: 'name', title: 'Name', treeNode: true },
                { field: 'size', title: 'Size' },
                { field: 'type', title: 'Type' },
                { field: 'date', title: 'Date' }
              ]
            }
          },
          created () {
            this.tableTreeData = window.MOCK_DATA_LIST.slice(0)
            this.treeDrop()
          },
          beforeDestroy () {
            if (this.sortable) {
              this.sortable.destroy()
            }
          },
          methods: {
            treeDrop () {
              this.$nextTick(() => {
                let xTable = this.$refs.xTable
                this.sortable2 = Sortable.create(xTable.$el.querySelector('.body--wrapper>.vxe-table--body tbody'), {
                  handle: '.drag-btn',
                  onEnd: ({ item, oldIndex }) => {
                    let options = { children: 'children' }
                    let targetTrElem = item
                    let wrapperElem = targetTrElem.parentNode
                    let prevTrElem = targetTrElem.previousElementSibling
                    let tableTreeData = this.tableTreeData
                    let selfRow = xTable.getRowNode(targetTrElem).item
                    let selfNode = XEUtils.findTree(tableTreeData, row => row === selfRow, options)
                    if (prevTrElem) {
                      // 移动到节点
                      let prevRow = xTable.getRowNode(prevTrElem).item
                      let prevNode = XEUtils.findTree(tableTreeData, row => row === prevRow, options)
                      if (XEUtils.findTree(selfRow[options.children], row => prevRow === row, options)) {
                        // 错误的移动
                        let oldTrElem = wrapperElem.children[oldIndex]
                        wrapperElem.insertBefore(targetTrElem, oldTrElem)
                        return this.$XModal.message({ message: '不允许自己给自己拖动！', status: 'error' })
                      }
                      let currRow = selfNode.items.splice(selfNode.index, 1)[0]
                      if (xTable.isTreeExpandByRow(prevRow)) {
                        // 移动到当前的子节点
                        prevRow[options.children].splice(0, 0, currRow)
                      } else {
                        // 移动到相邻节点
                        prevNode.items.splice(prevNode.index + (selfNode.index < prevNode.index ? 0 : 1), 0, currRow)
                      }
                    } else {
                      // 移动到第一行
                      var currRow = selfNode.items.splice(selfNode.index, 1)[0]
                      tableTreeData.unshift(currRow)
                    }
                    // 如果变动了树层级，需要刷新数据
                    xTable.refreshData()
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
  beforeDestroy () {
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
        let xTable = this.$refs.xTable1
        this.sortable1 = Sortable.create(xTable.$el.querySelector('.body--wrapper>.vxe-table--body tbody'), {
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
        let xTable = this.$refs.xTable2
        this.sortable2 = Sortable.create(xTable.$el.querySelector('.body--wrapper>.vxe-table--body tbody'), {
          handle: '.drag-btn',
          onEnd: ({ item, oldIndex }) => {
            let options = { children: 'children' }
            let targetTrElem = item
            let wrapperElem = targetTrElem.parentNode
            let prevTrElem = targetTrElem.previousElementSibling
            let tableTreeData = this.tableTreeData
            let selfRow = xTable.getRowNode(targetTrElem).item
            let selfNode = XEUtils.findTree(tableTreeData, row => row === selfRow, options)
            if (prevTrElem) {
              // 移动到节点
              let prevRow = xTable.getRowNode(prevTrElem).item
              let prevNode = XEUtils.findTree(tableTreeData, row => row === prevRow, options)
              if (XEUtils.findTree(selfRow[options.children], row => prevRow === row, options)) {
                // 错误的移动
                let oldTrElem = wrapperElem.children[oldIndex]
                wrapperElem.insertBefore(targetTrElem, oldTrElem)
                return this.$XModal.message({ message: '不允许自己给自己拖动！', status: 'error' })
              }
              let currRow = selfNode.items.splice(selfNode.index, 1)[0]
              if (xTable.isTreeExpandByRow(prevRow)) {
                // 移动到当前的子节点
                prevRow[options.children].splice(0, 0, currRow)
              } else {
                // 移动到相邻节点
                prevNode.items.splice(prevNode.index + (selfNode.index < prevNode.index ? 0 : 1), 0, currRow)
              }
            } else {
              // 移动到第一行
              var currRow = selfNode.items.splice(selfNode.index, 1)[0]
              tableTreeData.unshift(currRow)
            }
            // 如果变动了树层级，需要刷新数据
            xTable.refreshData()
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
