<template>
  <div>
    <p class="tip">
      实现树结构深层查找
    </p>

    <vxe-table
      ref="xTree"
      max-height="600"
      :loading="demo1.loading"
      :data="demo1.tableData"
      :tree-config="{children: 'children'}">
      <vxe-column field="name" title="名称" tree-node>
        <template #header>
          <div>名称</div>
          <input v-model="demo1.filterName" type="type" placeholder="Filter" @keyup="searchEvent">
        </template>
      </vxe-column>
      <vxe-column field="size" title="大小" width="140"></vxe-column>
      <vxe-column field="type" title="类型" width="140"></vxe-column>
      <vxe-column field="date" title="修改日期" width="260"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, nextTick } from 'vue'
import { VxeTableInstance } from '../../../../types/index'
import XEUtils from 'xe-utils'

export default defineComponent({
  setup () {
    const xTree = ref({} as VxeTableInstance)

    const demo1 = reactive({
      filterName: '',
      loading: false,
      originData: [] as any[],
      tableData: [] as any[]
    })

    const handleSearch = () => {
      const filterName = XEUtils.toValueString(demo1.filterName).trim()
      if (filterName) {
        const options = { children: 'children' }
        const searchProps = ['name']
        demo1.tableData = XEUtils.searchTree(demo1.originData, item => searchProps.some(key => XEUtils.toValueString(item[key]).indexOf(filterName) > -1), options)
        // 搜索之后默认展开所有子节点
        nextTick(() => {
          const $table = xTree.value
          $table.setAllTreeExpand(true)
        })
      } else {
        demo1.tableData = demo1.originData
      }
    }

    // 创建一个防防抖函数，调用频率间隔 500 毫秒
    const searchEvent = XEUtils.debounce(function () {
      handleSearch()
    }, 500, { leading: false, trailing: true })

    demo1.loading = true
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
      demo1.loading = false
      demo1.originData = list
      handleSearch()
    }, 300)

    return {
      xTree,
      demo1,
      searchEvent,
      demoCodes: [
        `
        <vxe-table
          ref="xTree"
          max-height="600"
          :loading="demo1.loading"
          :data="demo1.tableData"
          :tree-config="{children: 'children'}">
          <vxe-column field="name" title="名称" tree-node>
            <template #header>
              <div>名称</div>
              <input v-model="demo1.filterName" type="type" placeholder="Filter" @keyup="searchEvent">
            </template>
          </vxe-column>
          <vxe-column field="size" title="大小" width="140"></vxe-column>
          <vxe-column field="type" title="类型" width="140"></vxe-column>
          <vxe-column field="date" title="修改日期" width="260"></vxe-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref, nextTick } from 'vue'
        import { VxeTableInstance } from 'vxe-table'
        import XEUtils from 'xe-utils'

        export default defineComponent({
          setup () {
            const xTree = ref({} as VxeTableInstance)

            const demo1 = reactive({
              filterName: '',
              loading: false,
              originData: [] as any[],
              tableData: [] as any[]
            })

            const handleSearch = () => {
              const filterName = XEUtils.toValueString(demo1.filterName).trim()
              if (filterName) {
                const options = { children: 'children' }
                const searchProps = ['name']
                demo1.tableData = XEUtils.searchTree(demo1.originData, item => searchProps.some(key => XEUtils.toValueString(item[key]).indexOf(filterName) > -1), options)
                // 搜索之后默认展开所有子节点
                nextTick(() => {
                  const $table = xTree.value
                  $table.setAllTreeExpand(true)
                })
              } else {
                demo1.tableData = demo1.originData
              }
            }

            // 创建一个防防抖函数，调用频率间隔 500 毫秒
            const searchEvent = XEUtils.debounce(function () {
              handleSearch()
            }, 500, { leading: false, trailing: true })

            demo1.loading = true
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
              demo1.loading = false
              demo1.originData = list
              handleSearch()
            }, 300)

            return {
              xTree,
              demo1,
              searchEvent
            }
          }
        })
        `
      ]
    }
  }
})
</script>
