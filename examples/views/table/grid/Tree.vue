<template>
  <div>
    <p>树表格、数据代理</p>

    <vxe-grid
      border
      :proxy-config="tableProxy"
      :columns="tableColumn"
      :tree-config="{key: 'id', children: 'children'}"></vxe-grid>

    <p class="demo-code">显示代码</p>

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
          // 处理树结构转换
          query: () => XEAjax.getJSON('/api/file/list').then(data => XEUtils.toArrayTree(data, { key: 'id', parentKey: 'parentId', children: 'children' }))
        }
      },
      tableColumn: [
        { prop: 'id', label: 'ID', width: 120, treeNode: true },
        { prop: 'name', label: '名称' },
        { prop: 'size', label: '大小' },
        { prop: 'createTime', label: '创建时间', formatter: this.formatterDate },
        { prop: 'updateTime', label: '修改时间', formatter: this.formatterDate }
      ],
      demoCodes: [
        `
        <vxe-grid
          border
          :proxy-config="tableProxy"
          :columns="tableColumn"
          :tree-config="{key: 'id', children: 'children'}"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableProxy: {
                ajax: {
                  // 处理树结构转换
                  query: () => XEAjax.getJSON('/api/file/list').then(data => XEUtils.toArrayTree(data, { key: 'id', parentKey: 'parentId', children: 'children' }))
                }
              },
              tableColumn: [
                { type: 'selection', width: 100, treeNode: true },
                { prop: 'id', label: 'ID', width: 0 },
                { prop: 'name', label: '名称' },
                { prop: 'size', label: '大小' },
                { prop: 'createTime', label: '创建时间' },
                { prop: 'updateTime', label: '修改时间' }
              ]
            }
          },
          methods: {
            formatterDate ({ cellValue }) {
              return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:mm:ss')
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
    }
  }
}
</script>
