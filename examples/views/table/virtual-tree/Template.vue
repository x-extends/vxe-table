<template>
  <div>
    <p class="tip">使用自定义模板渲染</p>

    <vxe-virtual-tree
      border
      resizable
      row-key
      :toolbar="{custom: true, slots: {buttons: 'toolbar_buttons', tools: 'toolbar_tools'}}"
      :tree-config="{children: 'children'}"
      :data="tableData"
      :columns="tableColumn">
      <template #toolbar_buttons>
         <vxe-input size="small" placeholder="搜索"></vxe-input>
      </template>
      <template #toolbar_tools>
        <vxe-button status="primary">操作1</vxe-button>
        <vxe-button status="primary">操作2</vxe-button>
        <vxe-button status="primary">操作3</vxe-button>
      </template>
    </vxe-virtual-tree>

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
        {
          id: 23666,
          name: 'Test23',
          type: 'mp4',
          size: null,
          date: '2021-01-02',
          children: [
            {
              id: 27666,
              name: 'test abc96',
              type: 'avi',
              size: null,
              date: '2021-08-04',
              children: [
                { id: 29330, name: 'test abc5', type: 'txt', size: 25, date: '2021-10-03' },
                { id: 29331, name: 'Test33', type: 'pdf', size: 512, date: '2020-03-01' }
              ]
            }
          ]
        },
        { id: 24555, name: 'test abc9', type: 'avi', size: 224, date: '2020-10-01' }
      ],
      tableColumn: [
        { type: 'seq', title: '序号', width: 80 },
        { field: 'name', title: 'app.body.label.name' },
        { field: 'size', title: 'Size' },
        {
          field: 'type',
          title: 'Type',
          slots: {
            default: ({ row }) => {
              return [
                <span>{ `类型：${row.type || '无'}` }</span>
              ]
            }
          }
        },
        {
          title: 'Image',
          treeNode: true,
          slots: {
            default: () => {
              return [
                <img src="/vxe-table/static/other/img1.gif" height="50"/>
              ]
            }
          }
        },
        {
          field: 'date',
          title: 'Date',
          slots: {
            default: ({ row }) => {
              return [
                <span>{ XEUtils.toDateString(row.date, 'yyyy-MM-dd HH:mm:ss.S') }</span>
              ]
            }
          }
        }
      ],
      demoCodes: [
        `
        <vxe-virtual-tree
          border
          resizable
          row-key
          :toolbar="{custom: true, slots: {buttons: 'toolbar_buttons', tools: 'toolbar_tools'}}"
          :tree-config="{children: 'children'}"
          :data="tableData"
          :columns="tableColumn">
          <template #toolbar_buttons>
            <vxe-input size="small" placeholder="搜索"></vxe-input>
          </template>
          <template #toolbar_tools>
            <vxe-button status="primary">操作1</vxe-button>
            <vxe-button status="primary">操作2</vxe-button>
            <vxe-button status="primary">操作3</vxe-button>
          </template>
        </vxe-virtual-tree>
        `,
        `
        import XEUtils from 'xe-utils'
        
        export default {
          data () {
            return {
              tableData: [
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
                {
                  id: 23666,
                  name: 'Test23',
                  type: 'mp4',
                  size: null,
                  date: '2021-01-02',
                  children: [
                    {
                      id: 27666,
                      name: 'test abc96',
                      type: 'avi',
                      size: null,
                      date: '2021-08-04',
                      children: [
                        { id: 29330, name: 'test abc5', type: 'txt', size: 25, date: '2021-10-03' },
                        { id: 29331, name: 'Test33', type: 'pdf', size: 512, date: '2020-03-01' }
                      ]
                    }
                  ]
                },
                { id: 24555, name: 'test abc9', type: 'avi', size: 224, date: '2020-10-01' }
              ],
              tableColumn: [
                { type: 'seq', title: '序号', width: 80 },
                { field: 'name', title: 'app.body.label.name' },
                { field: 'size', title: 'Size' },
                {
                  field: 'type',
                  title: 'Type',
                  slots: {
                    default: ({ row }) => {
                      return [
                        <span>{ \`类型：\${row.type || '无'}\` }</span>
                      ]
                    }
                  }
                },
                {
                  title: 'Image',
                  treeNode: true,
                  slots: {
                    default: ({ row }) => {
                      return [
                        <img src="/vxe-table/static/other/img1.gif" height="50"/>
                      ]
                    }
                  }
                },
                {
                  field: 'date',
                  title: 'Date',
                  slots: {
                    default: ({ row }) => {
                      return [
                        <span>{ XEUtils.toDateString(row.date, 'yyyy-MM-dd HH:mm:ss.S') }</span>
                      ]
                    }
                  }
                }
              ]
            }
          }
        }
        `
      ]
    }
  }
}
</script>
