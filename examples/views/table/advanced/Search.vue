<template>
  <div>
    <p class="tip">表格搜索功能，非常简单就可以实现表格内容搜索<span class="red">（具体请自行实现，该示例仅供参考）</span></p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-input v-model="demo1.filterName" type="search" placeholder="试试全表搜索" @keyup="searchEvent1"></vxe-input>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      height="300"
      :data="demo1.list">
      <vxe-column type="seq" width="80"></vxe-column>
      <vxe-column field="name" title="Name" type="html"></vxe-column>
      <vxe-column field="role" title="Role" type="html"></vxe-column>
      <vxe-column field="age" title="Age" type="html"></vxe-column>
      <vxe-column field="address" title="Address" type="html"></vxe-column>
      <template #empty>
        <span style="color: red;">
          <img src="/vxe-table/static/other/img2.gif">
          <p>没有更多数据了！</p>
        </span>
      </template>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
      <pre-code class="scss">{{ demoCodes[2] }}</pre-code>
    </pre>

    <p class="tip">树表格搜索功能，非常简单就可以实现树表格内容搜索<span class="red">（具体请自行实现，该示例仅供参考）</span></p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-input v-model="demo2.filterName" type="search" placeholder="试试全表搜索" @keyup="searchEvent2"></vxe-input>
      </template>
    </vxe-toolbar>

    <vxe-table
      ref="xTree"
      max-height="400"
      :tree-config="{}"
      :data="demo2.list">
      <vxe-column type="seq" width="220" title="序号" tree-node></vxe-column>
      <vxe-column field="name" title="Name" type="html"></vxe-column>
      <vxe-column field="size" title="Size" type="html"></vxe-column>
      <vxe-column field="type" title="Type" type="html"></vxe-column>
      <vxe-column field="date" title="Date" type="html"></vxe-column>
      <template #empty>
        <span style="color: red;">
          <img src="/vxe-table/static/other/img1.gif">
          <p>搜索不到数据，可能输入的关键字姿势不对！</p>
        </span>
      </template>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[3] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[4] }}</pre-code>
      <pre-code class="scss">{{ demoCodes[5] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, nextTick } from 'vue'
import { VxeTableInstance } from '../../../../types/index'
import XEUtils from 'xe-utils'

export default defineComponent({
  setup () {
    const demo1 = reactive({
      filterName: '',
      list: [] as any[],
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, amount: 888, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, amount: 666, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: '1', age: 32, amount: 89, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: '0', age: 23, amount: 1000, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: '0', age: 30, amount: 999, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: '0', age: 21, amount: 998, address: 'vxe-table 从入门到放弃' },
        { id: 10007, name: 'Test7', role: 'Test', sex: '1', age: 29, amount: 2000, address: 'vxe-table 从入门到放弃' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: '1', age: 35, amount: 999, address: 'vxe-table 从入门到放弃' },
        { id: 10009, name: 'Test9', role: 'Test', sex: '1', age: 26, amount: 2000, address: 'vxe-table 从入门到放弃' },
        { id: 100010, name: 'Test10', role: 'Develop', sex: '1', age: 21, amount: 666, address: 'vxe-table 从入门到放弃' }
      ] as any[]
    })

    const searchEvent1 = () => {
      const filterName = XEUtils.toValueString(demo1.filterName).trim().toLowerCase()
      if (filterName) {
        const filterRE = new RegExp(filterName, 'gi')
        const searchProps = ['name', 'role', 'age', 'address']
        const rest = demo1.tableData.filter(item => searchProps.some(key => XEUtils.toValueString(item[key]).toLowerCase().indexOf(filterName) > -1))
        demo1.list = rest.map(row => {
          const item = Object.assign({}, row)
          searchProps.forEach(key => {
            item[key] = XEUtils.toValueString(item[key]).replace(filterRE, match => `<span class="keyword-lighten">${match}</span>`)
          })
          return item
        })
      } else {
        demo1.list = demo1.tableData
      }
    }

    searchEvent1()

    const demo2 = reactive({
      filterName: '',
      list: [] as any[],
      tableData: [
        { id: 1000, name: 'Test1', type: 'mp3', size: 1024, date: '2020-08-01' },
        {
          id: 1005,
          name: 'Test2',
          type: 'mp4',
          size: null,
          date: '2021-04-01',
          children: [
            { id: 24300, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
            { id: 20045, name: 'Test4', type: 'html', size: 600, date: '2021-04-01' },
            {
              id: 10053,
              name: 'Test96',
              type: 'avi',
              size: null,
              date: '2021-04-01',
              children: [
                { id: 24330, name: 'Test5', type: 'txt', size: 25, date: '2021-10-01' },
                { id: 21011, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
                { id: 22200, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' }
              ]
            }
          ]
        },
        { id: 23666, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
        { id: 24555, name: 'Test9', type: 'avi', size: 224, date: '2020-10-01' }
      ] as any[]
    })

    const xTree = ref({} as VxeTableInstance)

    const searchEvent2 = () => {
      const filterName = XEUtils.toValueString(demo2.filterName).trim().toLowerCase()
      if (filterName) {
        const filterRE = new RegExp(filterName, 'gi')
        const options = { children: 'children' }
        const searchProps = ['name', 'size', 'type', 'date']
        const rest = XEUtils.searchTree(demo2.tableData, item => searchProps.some(key => XEUtils.toValueString(item[key]).toLowerCase().indexOf(filterName) > -1), options)
        XEUtils.eachTree(rest, item => {
          searchProps.forEach(key => {
            item[key] = XEUtils.toValueString(item[key]).replace(filterRE, match => `<span class="keyword-lighten">${match}</span>`)
          })
        }, options)
        demo2.list = rest
        // 搜索之后默认展开所有子节点
        nextTick(() => {
          const $table = xTree.value
          $table.setAllTreeExpand(true)
        })
      } else {
        demo2.list = demo2.tableData
      }
    }

    searchEvent2()

    return {
      demo1,
      searchEvent1,
      demo2,
      xTree,
      searchEvent2,
      demoCodes: [
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-input v-model="demo1.filterName" type="search" placeholder="试试全表搜索" @keyup="searchEvent1"></vxe-input>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          height="300"
          :data="demo1.list">
          <vxe-column type="seq" width="80"></vxe-column>
          <vxe-column field="name" title="Name" type="html"></vxe-column>
          <vxe-column field="role" title="Role" type="html"></vxe-column>
          <vxe-column field="age" title="Age" type="html"></vxe-column>
          <vxe-column field="address" title="Address" type="html"></vxe-column>
          <template #empty>
            <span style="color: red;">
              <img src="/vxe-table/static/other/img2.gif">
              <p>没有更多数据了！</p>
            </span>
          </template>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive } from 'vue'
        import XEUtils from 'xe-utils'

        export default defineComponent({
          setup () {
            const demo1 = reactive({
              filterName: '',
              list: [] as any[],
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, amount: 888, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, amount: 666, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: '1', age: 32, amount: 89, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: '0', age: 23, amount: 1000, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: '0', age: 30, amount: 999, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: '0', age: 21, amount: 998, address: 'vxe-table 从入门到放弃' },
                { id: 10007, name: 'Test7', role: 'Test', sex: '1', age: 29, amount: 2000, address: 'vxe-table 从入门到放弃' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: '1', age: 35, amount: 999, address: 'vxe-table 从入门到放弃' },
                { id: 10009, name: 'Test9', role: 'Test', sex: '1', age: 26, amount: 2000, address: 'vxe-table 从入门到放弃' },
                { id: 100010, name: 'Test10', role: 'Develop', sex: '1', age: 21, amount: 666, address: 'vxe-table 从入门到放弃' }
              ] as any[]
            })

            const searchEvent1 = () => {
              const filterName = XEUtils.toValueString(demo1.filterName).trim().toLowerCase()
              if (filterName) {
                const filterRE = new RegExp(filterName, 'gi')
                const searchProps = ['name', 'role', 'age', 'address']
                const rest = demo1.tableData.filter(item => searchProps.some(key => XEUtils.toValueString(item[key]).toLowerCase().indexOf(filterName) > -1))
                demo1.list = rest.map(row => {
                  const item = Object.assign({}, row)
                  searchProps.forEach(key => {
                    item[key] = XEUtils.toValueString(item[key]).replace(filterRE, match => \`<span class="keyword-lighten">\${match}</span>\`)
                  })
                  return item
                })
              } else {
                demo1.list = demo1.tableData
              }
            }

            searchEvent1()

            return {
              demo1,
              searchEvent1
            }
          }
        })
        `,
        `
        .keyword-lighten {
          color: #000;
          background-color: #FFFF00;
        }
        `,
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-input v-model="demo2.filterName" type="search" placeholder="试试全表搜索" @keyup="searchEvent2"></vxe-input>
          </template>
        </vxe-toolbar>

        <vxe-table
          ref="xTree"
          max-height="400"
          :tree-config="{}"
          :data="demo2.list">
          <vxe-column type="seq" width="220" title="序号" tree-node></vxe-column>
          <vxe-column field="name" title="Name" type="html"></vxe-column>
          <vxe-column field="size" title="Size" type="html"></vxe-column>
          <vxe-column field="type" title="Type" type="html"></vxe-column>
          <vxe-column field="date" title="Date" type="html"></vxe-column>
          <template #empty>
            <span style="color: red;">
              <img src="/vxe-table/static/other/img1.gif">
              <p>搜索不到数据，可能输入的关键字姿势不对！</p>
            </span>
          </template>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref, nextTick } from 'vue'
        import { VxeTableInstance } from 'vxe-table'
        import XEUtils from 'xe-utils'

        export default defineComponent({
          setup () {
            const demo2 = reactive({
              filterName: '',
              list: [] as any[],
              tableData: [
                { id: 1000, name: 'Test1', type: 'mp3', size: 1024, date: '2020-08-01' },
                {
                  id: 1005,
                  name: 'Test2',
                  type: 'mp4',
                  size: null,
                  date: '2021-04-01',
                  children: [
                    { id: 24300, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
                    { id: 20045, name: 'Test4', type: 'html', size: 600, date: '2021-04-01' },
                    {
                      id: 10053,
                      name: 'Test96',
                      type: 'avi',
                      size: null,
                      date: '2021-04-01',
                      children: [
                        { id: 24330, name: 'Test5', type: 'txt', size: 25, date: '2021-10-01' },
                        { id: 21011, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
                        { id: 22200, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' }
                      ]
                    }
                  ]
                },
                { id: 23666, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
                { id: 24555, name: 'Test9', type: 'avi', size: 224, date: '2020-10-01' }
              ] as any[]
            })

            const xTree = ref({} as VxeTableInstance)

            const searchEvent2 = () => {
              const filterName = XEUtils.toValueString(demo2.filterName).trim().toLowerCase()
              if (filterName) {
                const filterRE = new RegExp(filterName, 'gi')
                const options = { children: 'children' }
                const searchProps = ['name', 'size', 'type', 'date']
                const rest = XEUtils.searchTree(demo2.tableData, item => searchProps.some(key => XEUtils.toValueString(item[key]).toLowerCase().indexOf(filterName) > -1), options)
                XEUtils.eachTree(rest, item => {
                  searchProps.forEach(key => {
                    item[key] = XEUtils.toValueString(item[key]).replace(filterRE, match => \`<span class="keyword-lighten">\${match}</span>\`)
                  })
                }, options)
                demo2.list = rest
                // 搜索之后默认展开所有子节点
                nextTick(() => {
                  const $table = xTree.value
                  $table.setAllTreeExpand(true)
                })
              } else {
                demo2.list = demo2.tableData
              }
            }

            searchEvent2()

            return {
              demo2,
              xTree,
              searchEvent2
            }
          }
        })
        `,
        `
        .keyword-lighten {
          color: #000;
          background-color: #FFFF00;
        }
        `
      ]
    }
  }
})
</script>
