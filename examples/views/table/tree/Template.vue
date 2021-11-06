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
      :tree-config="{transform: true, rowField: 'id', parentField: 'parentId'}"
      :data="tableData">
      <vxe-column field="name" title="app.body.label.name"></vxe-column>
      <vxe-column field="size" title="Size"></vxe-column>
      <vxe-column field="type" title="Type">
        <template #default="{ row }">
          <span>{{ `类型：${row.type || '无'}` }}</span>
        </template>
      </vxe-column>
      <vxe-column field="attr3" title="Image" tree-node>
        <template #default>
          <img src="/vxe-table/static/other/img1.gif" height="50">
        </template>
      </vxe-column>
      <vxe-column field="date" title="Date">
        <template #default="{ row }">
          <span>{{ formatDate(row.date) }}</span>
        </template>
      </vxe-column>
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
      tableData: [
        { id: 10000, parentId: null, name: 'test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
        { id: 10050, parentId: null, name: 'Test2', type: 'mp4', size: null, date: '2021-04-01' },
        { id: 24300, parentId: 10050, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
        { id: 20045, parentId: 24300, name: 'test abc4', type: 'html', size: 600, date: '2021-04-01' },
        { id: 10053, parentId: 24300, name: 'test abc96', type: 'avi', size: null, date: '2021-04-01' },
        { id: 24330, parentId: 10053, name: 'test abc5', type: 'txt', size: 25, date: '2021-10-01' },
        { id: 21011, parentId: 10053, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
        { id: 22200, parentId: 10053, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 23666, parentId: null, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
        { id: 23677, parentId: 23666, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 23671, parentId: 23677, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 23672, parentId: 23677, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 23688, parentId: 23666, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 23681, parentId: 23688, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 23682, parentId: 23688, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 24555, parentId: null, name: 'test abc9', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 24566, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 24577, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' }
      ],
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
          :tree-config="{transform: true, rowField: 'id', parentField: 'parentId'}"
          :data="tableData">
          <vxe-column field="name" title="app.body.label.name"></vxe-column>
          <vxe-column field="size" title="Size"></vxe-column>
          <vxe-column field="type" title="Type">
            <template #default="{ row }">
              <span>{{ \`类型：\${row.type || '无'}\` }}</span>
            </template>
          </vxe-column>
          <vxe-column field="attr3" title="Image" tree-node>
            <template #default>
              <img src="/vxe-table/static/other/img1.gif" height="50">
            </template>
          </vxe-column>
          <vxe-column field="date" title="Date">
            <template #default="{ row }">
              <span>{{ formatDate(row.date) }}</span>
            </template>
          </vxe-column>
        </vxe-table>
        `,
        `
        import XEUtils from 'xe-utils'
        
        export default {
          data () {
            return {
              tableData: [
                { id: 10000, parentId: null, name: 'test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
                { id: 10050, parentId: null, name: 'Test2', type: 'mp4', size: null, date: '2021-04-01' },
                { id: 24300, parentId: 10050, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
                { id: 20045, parentId: 24300, name: 'test abc4', type: 'html', size: 600, date: '2021-04-01' },
                { id: 10053, parentId: 24300, name: 'test abc96', type: 'avi', size: null, date: '2021-04-01' },
                { id: 24330, parentId: 10053, name: 'test abc5', type: 'txt', size: 25, date: '2021-10-01' },
                { id: 21011, parentId: 10053, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
                { id: 22200, parentId: 10053, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 23666, parentId: null, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
                { id: 23677, parentId: 23666, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 23671, parentId: 23677, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 23672, parentId: 23677, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 23688, parentId: 23666, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 23681, parentId: 23688, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 23682, parentId: 23688, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 24555, parentId: null, name: 'test abc9', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 24566, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 24577, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' }
              ]
            }
          },
          methods: {
            formatDate (value) {
              return XEUtils.toDateString(value, 'yyyy-MM-dd HH:mm:ss.S')
            }
          }
        }
        `
      ]
    }
  },
  methods: {
    formatDate (value) {
      return XEUtils.toDateString(value, 'yyyy-MM-dd HH:mm:ss.S')
    }
  }
}
</script>
