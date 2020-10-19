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
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'

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
              const list = [
                { id: 1000, name: 'vxe-table 从入门到放弃1', type: 'mp3', size: 1024, date: '2020-08-01' },
                {
                  id: 1005,
                  name: 'Test2',
                  type: 'mp4',
                  size: null,
                  date: '2021-04-01',
                  children: [
                    { id: 24300, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
                    { id: 20045, name: 'vxe-table 从入门到放弃4', type: 'html', size: 600, date: '2021-04-01' },
                    {
                      id: 10053,
                      name: 'vxe-table 从入门到放弃96',
                      type: 'avi',
                      size: null,
                      date: '2021-04-01',
                      children: [
                        { id: 24330, name: 'vxe-table 从入门到放弃5', type: 'txt', size: 25, date: '2021-10-01' },
                        { id: 21011, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
                        { id: 22200, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' }
                      ]
                    }
                  ]
                },
                { id: 23666, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
                { id: 24555, name: 'vxe-table 从入门到放弃9', type: 'avi', size: 224, date: '2020-10-01' }
              ]
              this.loading = false
              this.originData = list
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
      const list = [
        { id: 1000, name: 'vxe-table 从入门到放弃1', type: 'mp3', size: 1024, date: '2020-08-01' },
        {
          id: 1005,
          name: 'Test2',
          type: 'mp4',
          size: null,
          date: '2021-04-01',
          children: [
            { id: 24300, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
            { id: 20045, name: 'vxe-table 从入门到放弃4', type: 'html', size: 600, date: '2021-04-01' },
            {
              id: 10053,
              name: 'vxe-table 从入门到放弃96',
              type: 'avi',
              size: null,
              date: '2021-04-01',
              children: [
                { id: 24330, name: 'vxe-table 从入门到放弃5', type: 'txt', size: 25, date: '2021-10-01' },
                { id: 21011, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
                { id: 22200, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' }
              ]
            }
          ]
        },
        { id: 23666, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
        { id: 24555, name: 'vxe-table 从入门到放弃9', type: 'avi', size: 224, date: '2020-10-01' }
      ]
      this.loading = false
      this.originData = list
      this.handleSearch()
    }, 300)
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
