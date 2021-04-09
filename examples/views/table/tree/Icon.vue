<template>
  <div>
    <p class="tip">
      自定义图标，通过设置 <table-api-link prop="tree-config"/>={<table-api-link prop="iconOpen"/>, <table-api-link prop="iconClose"/>} 局部替换默认的图标，例如第三方图标库：font-awesome、inconfont
    </p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="getTreeExpansionEvent">获取已展开</vxe-button>
        <vxe-button @click="$refs.xTree1.setAllTreeExpand(true)">展开所有</vxe-button>
        <vxe-button @click="$refs.xTree1.clearTreeExpand()">关闭所有</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      resizable
      ref="xTree1"
      :tree-config="demo1.tableTreeConfig"
      :data="demo1.tableData">
      <vxe-table-column field="name" title="app.body.label.name" tree-node></vxe-table-column>
      <vxe-table-column field="size" title="Size"></vxe-table-column>
      <vxe-table-column field="type" title="Type"></vxe-table-column>
      <vxe-table-column field="date" title="Date"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">更多自定义</p>

    <vxe-table
      resizable
      show-overflow
      ref="xTree2"
      :tree-config="demo2.tableTreeConfig"
      :data="demo2.tableData">
      <vxe-table-column field="name" title="Name" tree-node>
        <template #default="{ row }">
          <span>
            <template v-if="row.children && row.children.length">
              <i class="tree-node-icon fa" :class="$refs.xTree2.isTreeExpandByRow(row) ? 'fa-folder-open-o' : 'fa-folder-o'"></i>
            </template>
            <template v-else>
              <i class="tree-node-icon fa fa-file-o"></i>
            </template>
            <span>{{ row.name }}</span>
          </span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="size" title="Size"></vxe-table-column>
      <vxe-table-column field="type" title="Type"></vxe-table-column>
      <vxe-table-column field="date" title="Date"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[3] }}</pre-code>
      <pre-code class="css">{{ demoCodes[4] }}</pre-code>
    </pre>

    <p class="tip">还可以通过 <table-api-link prop="tree-config"/>={<table-api-link prop="toggleMethod"/>} 方法实现展开与关闭的细节处理，返回值用来决定是否允许继续执行</p>

    <vxe-table
      resizable
      show-overflow
      :tree-config="demo3.tableTreeConfig"
      :data="demo3.tableData">
      <vxe-table-column field="name" title="Name" tree-node></vxe-table-column>
      <vxe-table-column field="size" title="Size"></vxe-table-column>
      <vxe-table-column field="type" title="Type"></vxe-table-column>
      <vxe-table-column field="date" title="Date"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[5] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[6] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { VXETable } from '../../../../packages/all'
import { VxeTableInstance, VxeTablePropTypes } from '../../../../types/index'

export default defineComponent({
  setup () {
    const demo1 = reactive({
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
      ],
      tableTreeConfig: {
        children: 'children',
        iconOpen: 'fa fa-minus-square-o',
        iconClose: 'fa fa-plus-square-o'
      } as VxeTablePropTypes.TreeConfig
    })

    const xTree1 = ref({} as VxeTableInstance)

    const getTreeExpansionEvent = () => {
      const $table = xTree1.value
      const treeExpandRecords = $table.getTreeExpandRecords()
      VXETable.modal.alert(`${treeExpandRecords.length}`)
    }

    const demo2 = reactive({
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
      ],
      tableTreeConfig: {
        children: 'children',
        iconOpen: 'fa fa-minus-circle',
        iconClose: 'fa fa-plus-circle'
      } as VxeTablePropTypes.TreeConfig
    })

    const demo3 = reactive({
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
      ],
      tableTreeConfig: {
        children: 'children',
        toggleMethod ({ expanded, row }) {
          if (expanded) {
            if (row.date === '2019-10-22') {
              VXETable.modal.message({ id: 'openErr', content: '不允许展开', status: 'error' })
              return false
            }
          } else {
            if (row.date === '2019-03-04') {
              VXETable.modal.message({ id: 'closeErr', content: '不允许关闭', status: 'error' })
              return false
            }
          }
          return true
        }
      } as VxeTablePropTypes.TreeConfig
    })

    return {
      demo1,
      xTree1,
      getTreeExpansionEvent,
      demo2,
      demo3,
      demoCodes: [
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-button @click="getTreeExpansionEvent">获取已展开</vxe-button>
            <vxe-button @click="$refs.xTree1.setAllTreeExpand(true)">展开所有</vxe-button>
            <vxe-button @click="$refs.xTree1.clearTreeExpand()">关闭所有</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          resizable
          ref="xTree1"
          :tree-config="demo1.tableTreeConfig"
          :data="demo1.tableData">
          <vxe-table-column field="name" title="app.body.label.name" tree-node></vxe-table-column>
          <vxe-table-column field="size" title="Size"></vxe-table-column>
          <vxe-table-column field="type" title="Type"></vxe-table-column>
          <vxe-table-column field="date" title="Date"></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VXETable, VxeTableInstance, VxeTablePropTypes } from 'vxe-table'

        export default defineComponent({
          setup () {
            const demo1 = reactive({
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
              ],
              tableTreeConfig: {
                children: 'children',
                iconOpen: 'fa fa-minus-square-o',
                iconClose: 'fa fa-plus-square-o'
              } as VxeTablePropTypes.TreeConfig
            })

            const xTree1 = ref({} as VxeTableInstance)

            const getTreeExpansionEvent = () => {
              const $table = xTree1.value
              const treeExpandRecords = $table.getTreeExpandRecords()
              VXETable.modal.alert(\`\${treeExpandRecords.length}\`)
            }

            return {
              demo1,
              xTree1,
              getTreeExpansionEvent
            }
          }
        })
        `,
        `
        <vxe-table
          resizable
          show-overflow
          ref="xTree2"
          :tree-config="demo2.tableTreeConfig"
          :data="demo2.tableData">
          <vxe-table-column field="name" title="Name" tree-node>
            <template #default="{ row }">
              <span>
                <template v-if="row.children && row.children.length">
                  <i class="tree-node-icon fa" :class="$refs.xTree2.isTreeExpandByRow(row) ? 'fa-folder-open-o' : 'fa-folder-o'"></i>
                </template>
                <template v-else>
                  <i class="tree-node-icon fa fa-file-o"></i>
                </template>
                <span>{{ row.name }}</span>
              </span>
            </template>
          </vxe-table-column>
          <vxe-table-column field="size" title="Size"></vxe-table-column>
          <vxe-table-column field="type" title="Type"></vxe-table-column>
          <vxe-table-column field="date" title="Date"></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive } from 'vue'
        import { VxeTablePropTypes } from 'vxe-table'

        export default defineComponent({
          setup () {
            const demo2 = reactive({
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
              ],
              tableTreeConfig: {
                children: 'children',
                iconOpen: 'fa fa-minus-circle',
                iconClose: 'fa fa-plus-circle'
              } as VxeTablePropTypes.TreeConfig
            })

            return {
              demo2
            }
          }
        })
        `,
        `
        .tree-node-icon {
          width: 20px;
        }
        `,
        `
        <vxe-table
          resizable
          show-overflow
          :tree-config="demo3.tableTreeConfig"
          :data="demo3.tableData">
          <vxe-table-column field="name" title="Name" tree-node></vxe-table-column>
          <vxe-table-column field="size" title="Size"></vxe-table-column>
          <vxe-table-column field="type" title="Type"></vxe-table-column>
          <vxe-table-column field="date" title="Date"></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive } from 'vue'
        import { VXETable, VxeTablePropTypes } from 'vxe-table'

        export default defineComponent({
          setup () {
            const demo3 = reactive({
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
              ],
              tableTreeConfig: {
                children: 'children',
                toggleMethod ({ expanded, row }) {
                  if (expanded) {
                    if (row.date === '2019-10-22') {
                      VXETable.modal.message({ id: 'openErr', content: '不允许展开', status: 'error' })
                      return false
                    }
                  } else {
                    if (row.date === '2019-03-04') {
                      VXETable.modal.message({ id: 'closeErr', content: '不允许关闭', status: 'error' })
                      return false
                    }
                  }
                  return true
                }
              } as VxeTablePropTypes.TreeConfig
            })

            return {
              demo3
            }
          }
        })
        `
      ]
    }
  }
})
</script>

<style scoped>
.tree-node-icon {
  width: 20px;
}
</style>
