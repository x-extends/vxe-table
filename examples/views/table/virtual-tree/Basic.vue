<template>
  <div>
    <p class="tip">
      虚拟树表格，具体兼容性看 <a class="link" href="https://www.npmjs.com/package/vxe-table-plugin-virtual-tree" target="_blank">vxe-table-plugin-virtual-tree</a> 插件的 API<br>
      <span class="red">(实现原理就是把一颗树结构平铺进行渲染，可以支持虚拟滚动，但是会失去部分功能)</span><br>
      通过配置 <virtual-tree-api-link prop="tree-config"/> 和指定列 <table-column-api-link prop="tree-node"/> 属性来开启树表格
    </p>

    <vxe-virtual-tree
      border
      resizable
      row-key
      ref="xVTree"
      :toolbar-config="{slots: {buttons: 'toolbar_buttons'}}"
      :tree-config="{children: 'children'}"
      :columns="tableColumn1"
      :data="tableData1">
      <template #toolbar_buttons>
        <vxe-button @click="getTreeExpansionEvent">获取已展开</vxe-button>
        <vxe-button @click="$refs.xVTree.setAllTreeExpand(true)">展开所有</vxe-button>
        <vxe-button @click="$refs.xVTree.clearTreeExpand()">关闭所有</vxe-button>
      </template>
    </vxe-virtual-tree>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">默认展开所有树节点，通过 <virtual-tree-api-link prop="tree-config"/>={<virtual-tree-api-link prop="expandAll"/>: true} 参数设置默认展开所有树节点</p>

    <vxe-virtual-tree
      border
      row-key
      row-id="id"
      :data="tableData2"
      :tree-config="{children: 'children', expandAll: true}"
      :columns="tableColumn2">
    </vxe-virtual-tree>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[3] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData1: [
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
      tableData2: [
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
      tableColumn1: [
        { field: 'name', title: 'Name', treeNode: true },
        { field: 'size', title: 'Size' },
        { field: 'type', title: 'Type' },
        { field: 'date', title: 'Date' }
      ],
      tableColumn2: [
        { type: 'seq', title: '序号', width: 280, treeNode: true },
        { field: 'name', title: 'Name' },
        {
          title: '基本信息',
          children: [
            { field: 'size', title: 'Size' },
            { field: 'type', title: 'Type' }
          ]
        },
        { field: 'date', title: 'Date' }
      ],
      demoCodes: [
        `
        <vxe-virtual-tree
          border
          resizable
          row-key
          ref="xVTree"
          :toolbar-config="{slots: {buttons: 'toolbar_buttons'}}"
          :tree-config="{children: 'children'}"
          :columns="tableColumn1"
          :data="tableData">
          <template #toolbar_buttons>
            <vxe-button @click="getTreeExpansionEvent">获取已展开</vxe-button>
            <vxe-button @click="$refs.xVTree.setAllTreeExpand(true)">展开所有</vxe-button>
            <vxe-button @click="$refs.xVTree.clearTreeExpand()">关闭所有</vxe-button>
          </template>
        </vxe-virtual-tree>
        `,
        `
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
              tableColumn1: [
                { field: 'name', title: 'Name', treeNode: true },
                { field: 'size', title: 'Size' },
                { field: 'type', title: 'Type' },
                { field: 'date', title: 'Date' }
              ]
            }
          },
          methods: {
            getTreeExpansionEvent () {
              let treeExpandRecords = this.$refs.xVTree.getTreeExpandRecords()
              this.$XModal.alert(treeExpandRecords.length)
            }
          }
        }
        `,
        `
        <vxe-virtual-tree
          border
          row-key
          row-id="id"
          :data="tableData"
          :tree-config="{children: 'children', expandAll: true}"
          :columns="tableColumn">
        </vxe-virtual-tree>
        `,
        `
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
                { type: 'seq', title: '序号', width: 280, treeNode: true },
                { field: 'name', title: 'Name' },
                {
                  title: '基本信息',
                  children: [
                    { field: 'size', title: 'Size' },
                    { field: 'type', title: 'Type' }
                  ]
                },
                { field: 'date', title: 'Date' }
              ]
            }
          }
        }
        `
      ]
    }
  },
  methods: {
    getTreeExpansionEvent () {
      const treeExpandRecords = this.$refs.xVTree.getTreeExpandRecords()
      this.$XModal.alert(treeExpandRecords.length)
    }
  }
}
</script>
