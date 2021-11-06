<template>
  <div>
    <p class="tip">
      实现树结构深层排序<br>
    </p>

    <vxe-table
      max-height="600"
      :loading="loading"
      :data="tableData"
      :sort-config="{remote: true}"
      :tree-config="{children: 'children'}"
      @sort-change="sortChangeEvent">
      <vxe-column field="id" title="ID" width="80"></vxe-column>
      <vxe-column field="name" title="名称" tree-node></vxe-column>
      <vxe-column field="size" title="大小" width="140"></vxe-column>
      <vxe-column field="type" title="类型" width="140"></vxe-column>
      <vxe-column field="date" title="修改日期" width="260" sortable></vxe-column>
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
      originData: [
        { id: 1000, parentId: null, name: 'test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
        { id: 1005, parentId: 1000, name: 'Test2', type: 'mp4', size: null, date: '2021-04-01' },
        { id: 24300, parentId: 1000, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
        { id: 20045, parentId: 20045, name: 'test abc4', type: 'html', size: 600, date: '2021-04-01' },
        { id: 10053, parentId: null, name: 'test abc96', type: 'avi', size: null, date: '2021-04-01' },
        { id: 24330, parentId: 10053, name: 'test abc5', type: 'txt', size: 25, date: '2021-10-01' },
        { id: 21011, parentId: 24330, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
        { id: 22200, parentId: 20045, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 23666, parentId: null, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
        { id: 24555, parentId: null, name: 'test abc9', type: 'avi', size: 224, date: '2020-10-01' }
      ],
      tableData: [],
      demoCodes: [
        `
        <vxe-table
          max-height="600"
          :loading="loading"
          :data="tableData"
          :sort-config="{remote: true}"
          :tree-config="{children: 'children'}"
          @sort-change="sortChangeEvent">
          <vxe-column field="id" title="ID" width="80"></vxe-column>
          <vxe-column field="name" title="名称" tree-node></vxe-column>
          <vxe-column field="size" title="大小" width="140"></vxe-column>
          <vxe-column field="type" title="类型" width="140"></vxe-column>
          <vxe-column field="date" title="修改日期" width="260" sortable></vxe-column>
        </vxe-table>
        `,
        `
        import XEUtils from 'xe-utils'
        
        export default {
          data () {
            return {
              loading: false,
              originData: [
                { id: 1000, parentId: null, name: 'test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
                { id: 1005, parentId: 1000, name: 'Test2', type: 'mp4', size: null, date: '2021-04-01' },
                { id: 24300, parentId: 1000, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
                { id: 20045, parentId: 20045, name: 'test abc4', type: 'html', size: 600, date: '2021-04-01' },
                { id: 10053, parentId: null, name: 'test abc96', type: 'avi', size: null, date: '2021-04-01' },
                { id: 24330, parentId: 10053, name: 'test abc5', type: 'txt', size: 25, date: '2021-10-01' },
                { id: 21011, parentId: 24330, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
                { id: 22200, parentId: 20045, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 23666, parentId: null, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
                { id: 24555, parentId: null, name: 'test abc9', type: 'avi', size: 224, date: '2020-10-01' }
              ],
              tableData: []
            }
          },
          created () {
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
    sortChangeEvent ({ order }) {
      this.findList(order)
    }
  }
}
</script>
