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
      <vxe-column field="name" title="名称" tree-node>
        <template #header>
          <div>名称</div>
          <input v-model="filterName" type="type" placeholder="Filter" @keyup="searchEvent">
        </template>
      </vxe-column>
      <vxe-column field="size" title="大小" width="140"></vxe-column>
      <vxe-column field="type" title="类型" width="140"></vxe-column>
      <vxe-column field="date" title="修改日期" width="260"></vxe-column>
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
          <vxe-column field="name" title="名称" tree-node>
            <template #header="{ row }">
              <div>名称</div>
              <input v-model="filterName" type="type" placeholder="Filter" @keyup="searchEvent">
            </template>
          </vxe-column>
          <vxe-column field="size" title="大小" width="140"></vxe-column>
          <vxe-column field="type" title="类型" width="140"></vxe-column>
          <vxe-column field="date" title="修改日期" width="260"></vxe-column>
        </vxe-table>
        `,
        `
        import XEUtils from 'xe-utils'
        
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
                { id: 1000, name: 'test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
                {
                  id: 1005,
                  name: 'Test2',
                  type: 'mp4',
                  size: null,
                  date: '2021-04-01',
                  children: [
                    { id: 24300, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
                    { id: 20045, name: 'test abc4', type: 'html', size: 600, date: '2021-04-01' },
                    {
                      id: 10053,
                      name: 'test abc96',
                      type: 'avi',
                      size: null,
                      date: '2021-04-01',
                      children: [
                        { id: 24330, name: 'test abc5', type: 'txt', size: 25, date: '2021-10-01' },
                        { id: 21011, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
                        { id: 22200, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' }
                      ]
                    }
                  ]
                },
                { id: 23666, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
                { id: 24555, name: 'test abc9', type: 'avi', size: 224, date: '2020-10-01' }
              ]
              this.loading = false
              this.originData = list
              this.handleSearch()
            }, 300)
          },
          methods: {
            handleSearch () {
              let filterName = XEUtils.toValueString(this.filterName).trim()
              if (filterName) {
                let options = { children: 'children' }
                let searchProps = ['name']
                this.tableData = XEUtils.searchTree(this.originData, item => searchProps.some(key => XEUtils.toValueString(item[key]).indexOf(filterName) > -1), options)
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
        { id: 1000, name: 'test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
        {
          id: 1005,
          name: 'Test2',
          type: 'mp4',
          size: null,
          date: '2021-04-01',
          children: [
            { id: 24300, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
            { id: 20045, name: 'test abc4', type: 'html', size: 600, date: '2021-04-01' },
            {
              id: 10053,
              name: 'test abc96',
              type: 'avi',
              size: null,
              date: '2021-04-01',
              children: [
                { id: 24330, name: 'test abc5', type: 'txt', size: 25, date: '2021-10-01' },
                { id: 21011, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
                { id: 22200, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' }
              ]
            }
          ]
        },
        { id: 23666, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
        { id: 24555, name: 'test abc9', type: 'avi', size: 224, date: '2020-10-01' }
      ]
      this.loading = false
      this.originData = list
      this.handleSearch()
    }, 300)
  },
  methods: {
    handleSearch () {
      const filterName = XEUtils.toValueString(this.filterName).trim()
      if (filterName) {
        const options = { children: 'children' }
        const searchProps = ['name']
        this.tableData = XEUtils.searchTree(this.originData, item => searchProps.some(key => XEUtils.toValueString(item[key]).indexOf(filterName) > -1), options)
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
