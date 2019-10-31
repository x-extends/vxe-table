<template>
  <div>
    <p class="tip">
      实现支持大数据的虚拟树表格<br>
      <span class="red">注意：如果要启用纵向虚拟滚动，所有的行度必须一致，否则无法兼容</span>
    </p>

    <vxe-table
      ref="xTable"
      resizable
      show-overflow
      height="500"
      row-id="id"
      :loading="loading">
      <vxe-table-column type="index" title="索引" width="100"></vxe-table-column>
      <vxe-table-column field="seq" title="序号" width="100"></vxe-table-column>
      <vxe-table-column type="checkbox" width="50"></vxe-table-column>
      <vxe-table-column field="name" title="省市区">
        <template v-slot="{ row }">
          <span class="tree-column" :class="[`level-${row.level}`]" :style="{paddingLeft: `${row.level * 15}px`}">
            <i class="tree-icon" :class="[row.expand ? 'vxe-icon--caret-bottom' : 'vxe-icon--caret-right', {visible: row.children && row.children.length}]" @click="toggleExpand(row)"></i>
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
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      loading: false,
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="loadList(10000)">加载1w条</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          ref="xTable"
          border
          resizable
          show-overflow
          height="300"
          :loading="loading">
          <vxe-table-column type="index" width="100"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable width="200"></vxe-table-column>
          <vxe-table-column field="age" title="Age" width="200"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" width="200"></vxe-table-column>
          <vxe-table-column field="rate" title="Rate" width="200"></vxe-table-column>
          <vxe-table-column field="region" title="Region" width="200"></vxe-table-column>
          <vxe-table-column field="time" title="Time" width="200"></vxe-table-column>
          <vxe-table-column field="address" title="Address" width="300" show-overflow></vxe-table-column>
          <vxe-table-column field="updateTime" title="UpdateTime" width="200"></vxe-table-column>
          <vxe-table-column field="createTime" title="CreateTime" width="200"></vxe-table-column>
          <vxe-table-column field="attr1" title="Attr1" width="200"></vxe-table-column>
          <vxe-table-column field="attr2" title="Attr2" width="200"></vxe-table-column>
          <vxe-table-column field="attr3" title="Attr3" width="200"></vxe-table-column>
          <vxe-table-column field="attr4" title="Attr4" width="200"></vxe-table-column>
          <vxe-table-column field="attr5" title="Attr5" width="200"></vxe-table-column>
          <vxe-table-column field="attr6" title="Attr6" width="200"></vxe-table-column>
          <vxe-table-column field="attr7" title="Attr7" width="200"></vxe-table-column>
          <vxe-table-column field="attr8" title="Attr8" width="200"></vxe-table-column>
          <vxe-table-column field="name" title="Name" width="200"></vxe-table-column>
          <vxe-table-column field="attr9" title="Attr9" width="200"></vxe-table-column>
          <vxe-table-column field="createTime" title="CreateTime" width="200"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              loading: false
            }
          },
          created () {
            this.loadList(600)
          },
          methods: {
            loadList (size) {
              this.loading = true
              setTimeout(() => {
                let xTable = this.$refs.xTable
                if (xTable) {
                  // 使用函数式加载，阻断 vue 对大数组的双向绑定，大数据性能翻倍提升
                  xTable.reloadData(window.MOCK_DATA_LIST.slice(0, size)).then(() => {
                    this.loading = false
                  })
                } else {
                  this.loading = false
                }
              }, 300)
            }
          }
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
        this.$refs.xTable.loadData(list)
        this.loading = false
      })
    },
    // 通用虚拟树平铺方法
    toVirtualTree (treeData) {
      // 定义相关属性
      this.$utils.eachTree(treeData, (item, index, obj, paths, parent, nodes) => {
        let level = nodes.length
        item.seq = level > 1 ? `${level}.${index + 1}` : `${index + 1}`
        item.expand = false
        item.level = level - 1
      })
      // 将树平铺为列表
      let treeList = this.$utils.toTreeArray(treeData)
      this.treeList = treeList
      this.tableData = treeData
      return treeData
    },
    // 通用虚拟树展开方法
    toggleExpand (row) {
      let tableData = this.tableData
      let rowIndex = tableData.indexOf(row)
      let children = row.children
      if (row.expand) {
        // 展开节点
        let childList = []
        this.$utils.eachTree(children, item => {
          childList.push(item)
        })
        tableData = tableData.filter(item => childList.indexOf(item) === -1)
      } else {
        // 收起节点
        let expandList = []
        this.$utils.eachTree(children, (item, index, obj, paths, parent, nodes) => {
          if (!parent || parent.expand) {
            expandList.push(item)
          }
        })
        tableData.splice.apply(tableData, [rowIndex + 1, 0].concat(expandList))
      }
      row.expand = !row.expand
      this.$refs.xTable.loadData(tableData)
      this.tableData = tableData
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-column {
  .tree-icon {
    visibility: hidden;
    &.visible {
      visibility: visible;
    }
  }
}
</style>
