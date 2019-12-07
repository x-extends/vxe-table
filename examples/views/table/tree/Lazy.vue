<template>
  <div>
    <p class="tip">
      树表格的懒加载，通过配置 <table-api-link prop="row-id"/> 和 <table-api-link prop="tree-config"/>={<table-api-link prop="lazy"/>, <table-api-link prop="loadMethod"/>} 加载方法来开启树形懒加载<br>
      当启用懒加载后，必须通过 <table-api-link prop="hasChild"/> 属性来标识是否存在子节点，从而控制该节点是否允许被点击
    </p>

    <vxe-table
      border
      resizable
      row-id="id"
      :tree-config="{lazy: true, children: 'children', hasChild: 'hasChild', loadMethod: loadChildrenMethod}"
      :data="tableData">
      <vxe-table-column field="name" title="Name" width="400" tree-node></vxe-table-column>
      <vxe-table-column field="size" title="Size"></vxe-table-column>
      <vxe-table-column field="type" title="Type"></vxe-table-column>
      <vxe-table-column field="date" title="Date"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">通过设置 <table-api-link prop="expandRowKeys"/> 属性默认展开指定节点<span class="red">（懒加载启用后默认只允许展开根节点）</span></p>

    <vxe-table
      border
      resizable
      row-id="id"
      :checkbox-config="{labelField: 'name'}"
      :tree-config="{lazy: true, children: 'children', hasChild: 'hasChild', expandRowKeys: defaultExpandRowKeys, loadMethod: loadChildrenMethod, iconOpen: 'fa fa-minus-square-o', iconClose: 'fa fa-plus-square-o'}"
      :data="tableData2">
      <vxe-table-column type="checkbox" title="Name" width="400" tree-node></vxe-table-column>
      <vxe-table-column field="size" title="Size"></vxe-table-column>
      <vxe-table-column field="type" title="Type"></vxe-table-column>
      <vxe-table-column field="date" title="Date"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [],
      tableData2: [],
      defaultExpandRowKeys: [],
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          row-id="id"
          :tree-config="{lazy: true, children: 'children', hasChild: 'hasChild', loadMethod: loadChildrenMethod}"
          :data="tableData">
          <vxe-table-column field="name" title="Name" width="400" tree-node></vxe-table-column>
          <vxe-table-column field="size" title="Size"></vxe-table-column>
          <vxe-table-column field="type" title="Type"></vxe-table-column>
          <vxe-table-column field="date" title="Date"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: []
            }
          },
          created () {
            this.findList()
          },
          methods: {
            findList () {
              this.$ajax.get('/api/file/node/list', { parentId: null }).then(data => {
                this.tableData = data
              })
            },
            loadChildrenMethod ({ row }) {
              // 异步加载子节点
              return this.$ajax.get('/api/file/node/list', { parentId: row.id })
            }
          }
        }
        `,
        `
        <vxe-table
          border
          resizable
          row-id="id"
          :checkbox-config="{labelField: 'name'}"
          :tree-config="{lazy: true, children: 'children', hasChild: 'hasChild', expandRowKeys: defaultExpandRowKeys, loadMethod: loadChildrenMethod, iconOpen: 'fa fa-minus-square-o', iconClose: 'fa fa-plus-square-o'}"
          :data="tableData">
          <vxe-table-column type="checkbox" title="Name" width="400" tree-node></vxe-table-column>
          <vxe-table-column field="size" title="Size"></vxe-table-column>
          <vxe-table-column field="type" title="Type"></vxe-table-column>
          <vxe-table-column field="date" title="Date"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              defaultExpandRowKeys: []
            }
          },
          created () {
            this.findList()
          },
          methods: {
            findList () {
              this.$ajax.get('/api/file/node/list', { parentId: null }).then(data => {
                // 默认展开的节点必须在数据初始化之前赋值且只会执行一次
                this.defaultExpandRowKeys = ['10000', '40000']
                this.tableData = data
              })
            },
            loadChildrenMethod ({ row }) {
              // 异步加载子节点
              return this.$ajax.get('/api/file/node/list', { parentId: row.id })
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.findList()
    this.findList2()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    findList () {
      this.$ajax.get('/api/file/node/list', { parentId: null }).then(data => {
        this.tableData = data
      })
    },
    findList2 () {
      this.$ajax.get('/api/file/node/list', { parentId: null }).then(data => {
        // 默认展开的节点必须在数据初始化之前赋值且只会执行一次
        this.defaultExpandRowKeys = ['10000', '40000']
        this.tableData2 = data
      })
    },
    loadChildrenMethod ({ row }) {
      // 异步加载子节点
      return this.$ajax.get('/api/file/node/list', { parentId: row.id })
    }
  }
}
</script>
