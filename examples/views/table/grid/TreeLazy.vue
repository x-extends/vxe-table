<template>
  <div>
    <p class="tip">懒加载树表格、数据代理</p>

    <vxe-grid
      border
      resizable
      :proxy-config="tableProxy"
      :columns="tableColumn"
      :tree-config="{lazy: true, children: 'children', hasChild: 'hasChild', loadMethod: loadChildrenMethod}"></vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import XEAjax from 'xe-ajax'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableProxy: {
        ajax: {
          // 查询根节点
          query: () => XEAjax.get('/api/file/node/list', { parentId: null })
        }
      },
      tableColumn: [
        { field: 'id', title: 'ID', width: 180, treeNode: true },
        { field: 'name', title: '名称' },
        { field: 'size', title: '大小' },
        { field: 'createTime', title: '创建时间', formatter: this.formatterDate },
        { field: 'updateTime', title: '修改时间', formatter: this.formatterDate }
      ],
      demoCodes: [
        `
        <vxe-grid
          border
          resizable
          :proxy-config="tableProxy"
          :columns="tableColumn"
          :tree-config="{lazy: true, children: 'children', hasChild: 'hasChild', loadMethod: loadChildrenMethod}"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableProxy: {
                ajax: {
                  // 查询根节点
                  query: () => XEAjax.get('/api/file/node/list', { parentId: null })
                }
              },
              tableColumn: [
                { field: 'id', title: 'ID', width: 180, treeNode: true },
                { field: 'name', title: '名称' },
                { field: 'size', title: '大小' },
                { field: 'createTime', title: '创建时间', formatter: this.formatterDate },
                { field: 'updateTime', title: '修改时间', formatter: this.formatterDate }
              ]
            }
          },
          methods: {
            formatterDate ({ cellValue }) {
              return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:mm:ss')
            },
            loadChildrenMethod ({ row }) {
              // 异步加载子节点
              return XEAjax.get('/api/file/node/list', { parentId: row.id })
            }
          }
        }
        `
      ]
    }
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    formatterDate ({ cellValue }) {
      return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:mm:ss')
    },
    loadChildrenMethod ({ row }) {
      // 异步加载子节点
      return XEAjax.get('/api/file/node/list', { parentId: row.id })
    }
  }
}
</script>
