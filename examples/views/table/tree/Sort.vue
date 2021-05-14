<template>
  <div>
    <p class="tip">
      实现树结构深层排序<br>
    </p>

    <vxe-table
      max-height="600"
      :loading="demo1.loading"
      :data="demo1.tableData"
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
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { VxeTablePropTypes, VxeTableEvents } from '../../../../types/index'
import XEUtils from 'xe-utils'

export default defineComponent({
  setup () {
    const demo1 = reactive({
      filterName: '',
      loading: false,
      originData: [
        { id: 1000, parentId: null, name: 'vxe-table 从入门到放弃1', type: 'mp3', size: 1024, date: '2020-08-01' },
        { id: 1005, parentId: 1000, name: 'Test2', type: 'mp4', size: null, date: '2021-04-01' },
        { id: 24300, parentId: 1000, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
        { id: 20045, parentId: 20045, name: 'vxe-table 从入门到放弃4', type: 'html', size: 600, date: '2021-04-01' },
        { id: 10053, parentId: null, name: 'vxe-table 从入门到放弃96', type: 'avi', size: null, date: '2021-04-01' },
        { id: 24330, parentId: 10053, name: 'vxe-table 从入门到放弃5', type: 'txt', size: 25, date: '2021-10-01' },
        { id: 21011, parentId: 24330, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
        { id: 22200, parentId: 20045, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 23666, parentId: null, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
        { id: 24555, parentId: null, name: 'vxe-table 从入门到放弃9', type: 'avi', size: 224, date: '2020-10-01' }
      ],
      tableData: [] as any[]
    })

    // 模拟后台接口
    const findList = (order?: VxeTablePropTypes.SortOrder) => {
      demo1.loading = true
      setTimeout(() => {
        demo1.loading = false
        // 将有关联的列表转成树结构
        if (order === 'asc') {
          demo1.tableData = XEUtils.toArrayTree(demo1.originData, { key: 'id', parentKey: 'parentId', sortKey: 'date', reverse: false })
        } else if (order === 'desc') {
          demo1.tableData = XEUtils.toArrayTree(demo1.originData, { key: 'id', parentKey: 'parentId', sortKey: 'date', reverse: true })
        } else {
          demo1.tableData = XEUtils.toArrayTree(demo1.originData, { key: 'id', parentKey: 'parentId' })
        }
      }, 300)
    }

    const sortChangeEvent: VxeTableEvents.SortChange = ({ order }) => {
      findList(order)
    }

    findList()

    return {
      demo1,
      sortChangeEvent,
      demoCodes: [
        `
        <vxe-table
          max-height="600"
          :loading="demo1.loading"
          :data="demo1.tableData"
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
        import { defineComponent, reactive } from 'vue'
        import { VxeTablePropTypes, VxeTableEvents } from 'vxe-table'
        import XEUtils from 'xe-utils'

        export default defineComponent({
          setup () {
            const demo1 = reactive({
              filterName: '',
              loading: false,
              originData: [
                { id: 1000, parentId: null, name: 'vxe-table 从入门到放弃1', type: 'mp3', size: 1024, date: '2020-08-01' },
                { id: 1005, parentId: 1000, name: 'Test2', type: 'mp4', size: null, date: '2021-04-01' },
                { id: 24300, parentId: 1000, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
                { id: 20045, parentId: 20045, name: 'vxe-table 从入门到放弃4', type: 'html', size: 600, date: '2021-04-01' },
                { id: 10053, parentId: null, name: 'vxe-table 从入门到放弃96', type: 'avi', size: null, date: '2021-04-01' },
                { id: 24330, parentId: 10053, name: 'vxe-table 从入门到放弃5', type: 'txt', size: 25, date: '2021-10-01' },
                { id: 21011, parentId: 24330, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
                { id: 22200, parentId: 20045, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 23666, parentId: null, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
                { id: 24555, parentId: null, name: 'vxe-table 从入门到放弃9', type: 'avi', size: 224, date: '2020-10-01' }
              ],
              tableData: [] as any[]
            })

            // 模拟后台接口
            const findList = (order?: VxeTablePropTypes.SortOrder) => {
              demo1.loading = true
              setTimeout(() => {
                demo1.loading = false
                // 将有关联的列表转成树结构
                if (order === 'asc') {
                  demo1.tableData = XEUtils.toArrayTree(demo1.originData, { key: 'id', parentKey: 'parentId', sortKey: 'date', reverse: false })
                } else if (order === 'desc') {
                  demo1.tableData = XEUtils.toArrayTree(demo1.originData, { key: 'id', parentKey: 'parentId', sortKey: 'date', reverse: true })
                } else {
                  demo1.tableData = XEUtils.toArrayTree(demo1.originData, { key: 'id', parentKey: 'parentId' })
                }
              }, 300)
            }

            const sortChangeEvent: VxeTableEvents.SortChange = ({ order }) => {
              findList(order)
            }

            findList()

            return {
              demo1,
              sortChangeEvent
            }
          }
        })
        `
      ]
    }
  }
})
</script>
