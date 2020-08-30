<template>
  <div>
    <p class="tip">
      实现树结构深层查找
    </p>

    <vxe-table
      ref="xTree"
      max-height="600"
      :loading="loading"
      :data="tableData"
      :tree-config="{children: 'children'}">
      <vxe-table-column field="name" title="名称" tree-node>
        <template v-slot:header>
          <div>名称</div>
          <input v-model="filterName" type="type" placeholder="Filter" @keyup="searchEvent">
        </template>
      </vxe-table-column>
      <vxe-table-column field="size" title="大小" width="140"></vxe-table-column>
      <vxe-table-column field="type" title="类型" width="140"></vxe-table-column>
      <vxe-table-column field="date" title="修改日期" width="260"></vxe-table-column>
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
          ref="xTree"
          max-height="600"
          :loading="loading"
          :data="tableData"
          :tree-config="{children: 'children'}">
          <vxe-table-column field="name" title="名称" tree-node>
            <template v-slot:header="{ row }">
              <div>名称</div>
              <input v-model="filterName" type="type" placeholder="Filter" @keyup="searchEvent">
            </template>
          </vxe-table-column>
          <vxe-table-column field="size" title="大小" width="140"></vxe-table-column>
          <vxe-table-column field="type" title="类型" width="140"></vxe-table-column>
          <vxe-table-column field="date" title="修改日期" width="260"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              filterName: '',
              loading: false,
              originData: [],
              tableData: []
            }
          },
          created () {
            this.loading = true
            setTimeout(() => {
              this.loading = false
              this.originData = XEUtils.clone(window.MOCK_TREE_DATA_LIST, true)
              this.handleSearch()
            }, 300)
          },
          methods: {
            handleSearch () {
              let filterName = XEUtils.toString(this.filterName).trim()
              if (filterName) {
                let options = { children: 'children' }
                let searchProps = ['name']
                this.tableData = XEUtils.searchTree(this.originData, item => searchProps.some(key => XEUtils.toString(item[key]).indexOf(filterName) > -1), options)
                // 搜索之后默认展开所有子节点
                this.$nextTick(() => {
                  this.$refs.xTree.setAllTreeExpand(true)
                })
              } else {
                this.tableData = this.originData
              }
            },
            // 创建一个防反跳策略函数，调用频率间隔 500 毫秒
            searchEvent: XEUtils.debounce(function () {
              this.handleSearch()
            }, 500, { leading: false, trailing: true })
          }
        }`
      ]
    }
  },
  created () {
    this.loading = true
    setTimeout(() => {
      this.loading = false
      this.originData = XEUtils.clone(window.MOCK_TREE_DATA_LIST, true)
      this.handleSearch()
    }, 300)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    handleSearch () {
      const filterName = XEUtils.toString(this.filterName).trim()
      if (filterName) {
        const options = { children: 'children' }
        const searchProps = ['name']
        this.tableData = XEUtils.searchTree(this.originData, item => searchProps.some(key => XEUtils.toString(item[key]).indexOf(filterName) > -1), options)
        // 搜索之后默认展开所有子节点
        this.$nextTick(() => {
          this.$refs.xTree.setAllTreeExpand(true)
        })
      } else {
        this.tableData = this.originData
      }
    },
    // 创建一个防反跳策略函数，调用频率间隔 500 毫秒
    searchEvent: XEUtils.debounce(function () {
      this.handleSearch()
    }, 500, { leading: false, trailing: true })
  }
}
</script>
