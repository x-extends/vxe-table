<template>
  <div>
    <p class="tip">插入数据，简单的实现示例</p>

    <vxe-virtual-tree
      resizable
      row-key
      ref="xVTree"
      row-id="id"
      :export-config="{}"
      :toolbar="{custom: true, slots: {buttons: 'toolbar_buttons'}}"
      :tree-config="{children: 'children'}"
      :edit-config="{trigger: 'click', mode: 'row'}"
      :data="tableData"
      :columns="tableColumn">
      <template #toolbar_buttons>
        <vxe-button @click="insertEvent()">插入第一行</vxe-button>
        <vxe-button @click="insertAtEvent()">插入指定行</vxe-button>
        <vxe-button @click="getInsertEvent">获取新增</vxe-button>
        <vxe-button @click="getSelectEvent">获取选中</vxe-button>
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
        { type: 'seq', width: 120, treeNode: true },
        { field: 'name', title: 'Name', editRender: { name: 'input' } },
        { field: 'size', title: 'Size', editRender: { name: 'input' } },
        { field: 'type', title: 'Type', editRender: { name: 'input' } },
        { field: 'date', title: 'Date', editRender: { name: 'input' } }
      ],
      demoCodes: [
        `
        <vxe-virtual-tree
          resizable
          row-key
          ref="xVTree"
          row-id="id"
          :export-config="{}"
          :toolbar="{custom: true, slots: {buttons: 'toolbar_buttons'}}"
          :tree-config="{children: 'children'}"
          :edit-config="{trigger: 'click', mode: 'row'}"
          :data="tableData"
          :columns="tableColumn">
          <template #toolbar_buttons>
            <vxe-button @click="insertEvent()">插入第一行</vxe-button>
            <vxe-button @click="insertAtEvent()">插入指定行</vxe-button>
            <vxe-button @click="getInsertEvent">获取新增</vxe-button>
            <vxe-button @click="getSelectEvent">获取选中</vxe-button>
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
                { type: 'seq', width: 120, treeNode: true },
                { field: 'name', title: 'Name', editRender: { name: 'input' } },
                { field: 'size', title: 'Size', editRender: { name: 'input' } },
                { field: 'type', title: 'Type', editRender: { name: 'input' } },
                { field: 'date', title: 'Date', editRender: { name: 'input' } }
              ]
            }
          },
          methods: {
            insertEvent () {
              let xVTree = this.$refs.xVTree
              let record = {
                name: '新数据',
                date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd')
              }
              xVTree.insert(record).then(({ row }) => xVTree.setActiveRow(row))
            },
            insertAtEvent () {
              let xVTree = this.$refs.xVTree
              let record = {
                name: '新数据',
                date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd')
              }
              // 插入到第 3 行第 2 个子节点位置中
              xVTree.insertAt(record, this.tableData[2].children[1]).then(({ row }) => xVTree.setActiveRow(row))
            },
            getInsertEvent () {
              let insertRecords = this.$refs.xVTree.getInsertRecords()
              this.$XModal.alert(insertRecords.length)
            },
            getSelectEvent () {
              let selectRecords = this.$refs.xVTree.getCheckboxRecords()
              this.$XModal.alert(selectRecords.length)
            }
          }
        }
        `
      ]
    }
  },
  methods: {
    insertEvent () {
      const xVTree = this.$refs.xVTree
      const record = {
        name: '新数据',
        date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd')
      }
      xVTree.insert(record).then(({ row }) => xVTree.setActiveRow(row))
    },
    insertAtEvent () {
      const xVTree = this.$refs.xVTree
      const record = {
        name: '新数据',
        date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd')
      }
      // 插入到第 3 行第 2 个子节点位置中
      xVTree.insertAt(record, this.tableData[2].children[1]).then(({ row }) => xVTree.setActiveRow(row))
    },
    getInsertEvent () {
      const insertRecords = this.$refs.xVTree.getInsertRecords()
      this.$XModal.alert(insertRecords.length)
    },
    getSelectEvent () {
      const selectRecords = this.$refs.xVTree.getCheckboxRecords()
      this.$XModal.alert(selectRecords.length)
    }
  }
}
</script>
