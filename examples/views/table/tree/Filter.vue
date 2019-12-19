<template>
  <div>
    <p class="tip">简单实现树结构查找功能</p>

    <vxe-table
      max-height="600"
      :loading="loading"
      :data="tableData"
      :tree-config="{children: 'children', expandAll: !!filterName}">
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

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils/methods/xe-utils'
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
          :tree-config="{children: 'children', line: true, expandAll: !!filterName}">
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
              this.originData = this.$utils.clone(window.MOCK_TREE_DATA_LIST, true)
              this.handleSearch()
            }, 300)
          },
          methods: {
            handleSearch () {
              let filterName = this.$utils.toString(this.filterName).trim()
              if (filterName) {
                let options = { children: 'children' }
                let searchProps = ['name']
                this.tableData = this.$utils.searchTree(this.originData, item => searchProps.some(key => this.$utils.toString(item[key]).indexOf(filterName) > -1), options)
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
      this.originData = this.$utils.clone(window.MOCK_TREE_DATA_LIST, true)
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
      let filterName = this.$utils.toString(this.filterName).trim()
      if (filterName) {
        let options = { children: 'children' }
        let searchProps = ['name']
        this.tableData = this.$utils.searchTree(this.originData, item => searchProps.some(key => this.$utils.toString(item[key]).indexOf(filterName) > -1), options)
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
