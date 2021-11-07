<template>
  <div>
    <p class="tip">
      树表格的懒加载，通过配置 <table-api-link prop="row-id"/> 和 <table-api-link prop="tree-config"/>={<table-api-link prop="lazy"/>, <table-api-link prop="loadMethod"/>} 加载方法来开启树形懒加载<br>
      当启用懒加载后，必须通过 <table-api-link prop="hasChild"/> 属性来标识是否存在子节点，从而控制该节点是否允许被点击<br>
      <span class="red">（注：懒加载启用后一次只允许异步加载一层根节点）</span>
    </p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="$refs.xTree.toggleTreeExpand(tableData[1])">切换第二行展开</vxe-button>
        <vxe-button @click="$refs.xTree.setTreeExpand([tableData[1], tableData[3]], true)">设置第二、四行展开</vxe-button>
        <vxe-button @click="$refs.xTree.setAllTreeExpand(true)">展开所有</vxe-button>
        <vxe-button @click="$refs.xTree.clearTreeExpand()">关闭所有</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      resizable
      ref="xTree"
      row-id="id"
      :tree-config="{transform: true, rowField: 'id', parentField: 'parentId', lazy: true, hasChild: 'hasChild', loadMethod: loadChildrenMethod}"
      :data="tableData1">
      <vxe-column field="name" title="Name" width="400" tree-node></vxe-column>
      <vxe-column field="size" title="Size"></vxe-column>
      <vxe-column field="type" title="Type"></vxe-column>
      <vxe-column field="date" title="Date"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">通过设置 <table-api-link prop="expandRowKeys"/> 属性默认展开指定节点</p>

    <vxe-table
      border
      resizable
      row-id="id"
      :loading="loading2"
      :checkbox-config="{labelField: 'name'}"
      :tree-config="{transform: true, lazy: true, hasChild: 'hasChild', expandRowKeys: defaultExpandRowKeys, loadMethod: loadChildrenMethod, iconOpen: 'fa fa-minus-square-o', iconClose: 'fa fa-plus-square-o'}"
      :data="tableData2">
      <vxe-column type="checkbox" title="Name" width="400" tree-node></vxe-column>
      <vxe-column field="size" title="Size"></vxe-column>
      <vxe-column field="type" title="Type"></vxe-column>
      <vxe-column field="date" title="Date"></vxe-column>
    </vxe-table>

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
        { id: 10000, parentId: null, name: 'test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
        { id: 10050, parentId: null, name: 'Test2', type: 'mp4', size: null, date: '2021-04-01', hasChild: true },
        { id: 23666, parentId: null, name: 'Test23', type: 'mp4', size: null, date: '2021-01-02', hasChild: true },
        { id: 24555, parentId: null, name: 'test abc9', type: 'avi', size: 224, date: '2020-10-01' }
      ],
      loading2: false,
      tableData2: [],
      defaultExpandRowKeys: [],
      demoCodes: [
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-button @click="$refs.xTree.toggleTreeExpand(tableData[1])">切换第二行展开</vxe-button>
            <vxe-button @click="$refs.xTree.setTreeExpand([tableData[1], tableData[3]], true)">设置第二、四行展开</vxe-button>
            <vxe-button @click="$refs.xTree.setAllTreeExpand(true)">展开所有</vxe-button>
            <vxe-button @click="$refs.xTree.clearTreeExpand()">关闭所有</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          resizable
          ref="xTree"
          row-id="id"
          :tree-config="{transform: true, rowField: 'id', parentField: 'parentId', lazy: true, hasChild: 'hasChild', loadMethod: loadChildrenMethod}"
          :data="tableData1">
          <vxe-column field="name" title="Name" width="400" tree-node></vxe-column>
          <vxe-column field="size" title="Size"></vxe-column>
          <vxe-column field="type" title="Type"></vxe-column>
          <vxe-column field="date" title="Date"></vxe-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData1: [
                { id: 10000, parentId: null, name: 'test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
                { id: 10050, parentId: null, name: 'Test2', type: 'mp4', size: null, date: '2021-04-01', hasChild: true },
                { id: 23666, parentId: null, name: 'Test23', type: 'mp4', size: null, date: '2021-01-02', hasChild: true },
                { id: 24555, parentId: null, name: 'test abc9', type: 'avi', size: 224, date: '2020-10-01' }
              ]
            }
          },
          methods: {
            loadChildrenMethod ({ row }) {
              // 异步加载子节点
              return new Promise(resolve => {
                setTimeout(() => {
                  const childs = [
                    { id: row.id + 100000, parentId: row.id, name: row.name + 'Test45', type: 'mp4', size: null, date: '2021-10-03', hasChild: true },
                    { id: row.id + 150000, parentId: row.id, name: row.name + 'Test56', type: 'mp3', size: null, date: '2021-07-09', hasChild: false }
                  ]
                  resolve(childs)
                }, 500)
              })
            }
          }
        }
        `,
        `
        <vxe-table
          border
          resizable
          row-id="id"
          :loading="loading2"
          :checkbox-config="{labelField: 'name'}"
          :tree-config="{transform: true, lazy: true, hasChild: 'hasChild', expandRowKeys: defaultExpandRowKeys, loadMethod: loadChildrenMethod, iconOpen: 'fa fa-minus-square-o', iconClose: 'fa fa-plus-square-o'}"
          :data="tableData2">
          <vxe-column type="checkbox" title="Name" width="400" tree-node></vxe-column>
          <vxe-column field="size" title="Size"></vxe-column>
          <vxe-column field="type" title="Type"></vxe-column>
          <vxe-column field="date" title="Date"></vxe-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              loading2: false,
              tableData2: [],
              defaultExpandRowKeys: []
            }
          },
          created () {
            this.loading2 = true
            setTimeout(() => {
              this.loading2 = false
              // 默认展开的节点必须在数据初始化之前赋值且只会执行一次
              this.defaultExpandRowKeys = [10050, 23666]
              this.tableData2 = [
                { id: 10000, parentId: null, name: 'test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
                { id: 10050, parentId: null, name: 'Test2', type: 'mp4', size: null, date: '2021-04-01', hasChild: true },
                { id: 23666, parentId: null, name: 'Test23', type: 'mp4', size: null, date: '2021-01-02', hasChild: true },
                { id: 24555, parentId: null, name: 'test abc9', type: 'avi', size: 224, date: '2020-10-01' }
              ]
            }, 300)
          },
          methods: {
            loadChildrenMethod ({ row }) {
              // 异步加载子节点
              return new Promise(resolve => {
                setTimeout(() => {
                  const childs = [
                    { id: row.id + 100000, parentId: row.id, name: row.name + 'Test45', type: 'mp4', size: null, date: '2021-10-03', hasChild: true },
                    { id: row.id + 150000, parentId: row.id, name: row.name + 'Test56', type: 'mp3', size: null, date: '2021-07-09', hasChild: false }
                  ]
                  resolve(childs)
                }, 500)
              })
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.loading2 = true
    setTimeout(() => {
      this.loading2 = false
      // 默认展开的节点必须在数据初始化之前赋值且只会执行一次
      this.defaultExpandRowKeys = [10050, 23666]
      this.tableData2 = [
        { id: 10000, parentId: null, name: 'test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
        { id: 10050, parentId: null, name: 'Test2', type: 'mp4', size: null, date: '2021-04-01', hasChild: true },
        { id: 23666, parentId: null, name: 'Test23', type: 'mp4', size: null, date: '2021-01-02', hasChild: true },
        { id: 24555, parentId: null, name: 'test abc9', type: 'avi', size: 224, date: '2020-10-01' }
      ]
    }, 300)
  },
  methods: {
    loadChildrenMethod ({ row }) {
      // 异步加载子节点
      return new Promise(resolve => {
        setTimeout(() => {
          const childs = [
            { id: row.id + 100000, parentId: row.id, name: row.name + 'Test45', type: 'mp4', size: null, date: '2021-10-03', hasChild: true },
            { id: row.id + 150000, parentId: row.id, name: row.name + 'Test56', type: 'mp3', size: null, date: '2021-07-09', hasChild: false }
          ]
          resolve(childs)
        }, 500)
      })
    }
  }
}
</script>
