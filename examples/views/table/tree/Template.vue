<template>
  <div>
    <p class="tip">
      使用自定义模板渲染<br>
    </p>

    <vxe-toolbar>
      <template #buttons>
         <vxe-input size="small" placeholder="搜索"></vxe-input>
      </template>
      <template #tools>
        <vxe-button status="primary">操作1</vxe-button>
        <vxe-button status="primary">操作2</vxe-button>
        <vxe-button status="primary">操作3</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      resizable
      :tree-config="{children: 'children'}"
      :data="demo1.tableData">
      <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
      <vxe-table-column field="size" title="Size"></vxe-table-column>
      <vxe-table-column field="type" title="Type">
        <template #default="{ row }">
          <span>{{ `类型：${row.type || '无'}` }}</span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="attr3" title="Image" tree-node>
        <template #default>
          <img src="/vxe-table/static/other/img1.gif" height="50">
        </template>
      </vxe-table-column>
      <vxe-table-column field="date" title="Date">
        <template #default="{ row }">
          <span>{{ formatDate(row.date) }}</span>
        </template>
      </vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import XEUtils from 'xe-utils'
import { VxeTablePropTypes } from '../../../../types/vxe-table'

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
        children: 'children'
      } as VxeTablePropTypes.TreeConfig
    })

    const formatDate = (value: any) => {
      return XEUtils.toDateString(value, 'yyyy-MM-dd HH:mm:ss.S')
    }

    return {
      demo1,
      formatDate,
      demoCodes: [
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-input size="small" placeholder="搜索"></vxe-input>
          </template>
          <template #tools>
            <vxe-button status="primary">操作1</vxe-button>
            <vxe-button status="primary">操作2</vxe-button>
            <vxe-button status="primary">操作3</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          resizable
          :tree-config="{children: 'children'}"
          :data="demo1.tableData">
          <vxe-table-column field="name" title="app.body.label.name"></vxe-table-column>
          <vxe-table-column field="size" title="Size"></vxe-table-column>
          <vxe-table-column field="type" title="Type">
            <template #default="{ row }">
              <span>{{ \`类型：\${row.type || '无'}\` }}</span>
            </template>
          </vxe-table-column>
          <vxe-table-column field="attr3" title="Image" tree-node>
            <template #default>
              <img src="/vxe-table/static/other/img1.gif" height="50">
            </template>
          </vxe-table-column>
          <vxe-table-column field="date" title="Date">
            <template #default="{ row }">
              <span>{{ formatDate(row.date) }}</span>
            </template>
          </vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive } from 'vue'
        import XEUtils from 'xe-utils'
        import { VxeTablePropTypes } from 'vxe-table'

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
                children: 'children'
              } as VxeTablePropTypes.TreeConfig
            })

            const formatDate = (value: any) => {
              return XEUtils.toDateString(value, 'yyyy-MM-dd HH:mm:ss.S')
            }

            return {
              demo1,
              formatDate
            }
          }
        })
        `
      ]
    }
  }
})
</script>
