<template>
  <div>
    <p class="tip">
      实现树结构深层排序<br>
    </p>

    <vxe-table
      max-height="600"
      :loading="loading"
      :data="tableData"
      :tree-config="{children: 'children'}"
      @sort-change="sortChangeEvent">
      <vxe-table-column field="id" title="ID" width="80"></vxe-table-column>
      <vxe-table-column field="name" title="名称" tree-node></vxe-table-column>
      <vxe-table-column field="size" title="大小" width="140"></vxe-table-column>
      <vxe-table-column field="type" title="类型" width="140"></vxe-table-column>
      <vxe-table-column field="date" title="修改日期" width="260" sortable remote-sort></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      filterName: '',
      loading: false,
      originData: [],
      tableData: [],
      demoCodes: [
        `
        <vxe-table
          max-height="600"
          :loading="loading"
          :data="tableData"
          :tree-config="{children: 'children'}"
          @sort-change="sortChangeEvent">
          <vxe-table-column field="id" title="ID" width="80"></vxe-table-column>
          <vxe-table-column field="name" title="名称" tree-node></vxe-table-column>
          <vxe-table-column field="size" title="大小" width="140"></vxe-table-column>
          <vxe-table-column field="type" title="类型" width="140"></vxe-table-column>
          <vxe-table-column field="date" title="修改日期" width="260" sortable remote-sort></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              originData: [],
              tableData: []
            }
          },
          created () {
            this.originData = XEUtils.toTreeArray(window.MOCK_TREE_DATA_LIST)
            this.findList()
          },
          methods: {
            // 模拟后台接口
            findList (order) {
              this.loading = true
              setTimeout(() => {
                this.loading = false
                // 将有关联的列表转成树结构
                if (order === 'asc') {
                  this.tableData = XEUtils.toArrayTree(this.originData, { key: 'id', parentKey: 'parentId', sortKey: 'date', reverse: false })
                } else if (order === 'desc') {
                  this.tableData = XEUtils.toArrayTree(this.originData, { key: 'id', parentKey: 'parentId', sortKey: 'date', reverse: true })
                } else {
                  this.tableData = XEUtils.toArrayTree(this.originData, { key: 'id', parentKey: 'parentId' })
                }
              }, 300)
            },
            sortChangeEvent ({ column, property, order }) {
              this.findList(order)
            }
        }`
      ]
    }
  },
  created () {
    this.originData = XEUtils.toTreeArray(XEUtils.clone(window.MOCK_TREE_DATA_LIST, true))
    this.findList()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    // 模拟后台接口
    findList (order) {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        // 将有关联的列表转成树结构
        if (order === 'asc') {
          this.tableData = XEUtils.toArrayTree(this.originData, { key: 'id', parentKey: 'parentId', sortKey: 'date', reverse: false })
        } else if (order === 'desc') {
          this.tableData = XEUtils.toArrayTree(this.originData, { key: 'id', parentKey: 'parentId', sortKey: 'date', reverse: true })
        } else {
          this.tableData = XEUtils.toArrayTree(this.originData, { key: 'id', parentKey: 'parentId' })
        }
      }, 300)
    },
    sortChangeEvent ({ order }) {
      this.findList(order)
    }
  }
}
</script>
