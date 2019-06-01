<template>
  <div>
    <p>树表格、增删改查、工具栏</p>

    <vxe-grid
      highlight-hover-row
      :proxy-config="tableProxy"
      :columns="tableColumn"
      :toolbar="toolbar"
      :select-config="{labelProp: 'id'}"
      :tree-config="{key: 'id', children: 'children', expandAll: true}"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"></vxe-grid>

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
        alert: true,
        ajax: {
          // 处理树结构转换
          query: () => XEAjax.getJSON('/api/file/list').then(data => XEUtils.toArrayTree(data, { key: 'id', parentKey: 'parentId', children: 'children' })),
          save: ({ body }) => XEAjax.doPost('/api/file/save', body)
        }
      },
      toolbar: {
        buttons: [
          { code: 'reload', name: '刷新' },
          { code: 'insert_actived', name: '新增' },
          { code: 'delete_pending', name: '标记/取消' },
          { code: 'delete_rows', name: '移除' },
          { code: 'save', name: '保存' },
          { code: 'export', name: '导出.csv' }
        ],
        setting: true
      },
      tableColumn: [
        { type: 'selection', label: '全选', width: 180, treeNode: true },
        { prop: 'name', label: '名称', editRender: { name: 'input' } },
        { prop: 'size', label: '大小', editRender: { name: 'input' } },
        { prop: 'createTime', label: '创建时间', formatter: this.formatterDate },
        { prop: 'updateTime', label: '修改时间', formatter: this.formatterDate }
      ],
      demoCodes: [
        `
        <vxe-grid
          highlight-hover-row
          :proxy-config="tableProxy"
          :columns="tableColumn"
          :toolbar="toolbar"
          :select-config="{labelProp: 'id'}"
          :tree-config="{key: 'id', children: 'children', expandAll: true}"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableProxy: {
                alert: true,
                ajax: {
                  // 处理树结构转换
                  query: () => XEAjax.getJSON('/api/file/list').then(data => XEUtils.toArrayTree(data, { key: 'id', parentKey: 'parentId', children: 'children' })),
                  save: ({ body }) => XEAjax.doPost('/api/file/save', body)
                }
              },
              toolbar: {
                buttons: [
                  { code: 'reload', name: '刷新' },
                  { code: 'insert_actived', name: '新增' },
                  { code: 'delete_pending', name: '标记/取消' },
                  { code: 'delete_rows', name: '移除' },
                  { code: 'save', name: '保存' },
                  { code: 'export', name: '导出.csv' }
                ],
                setting: true
              },
              tableColumn: [
                { type: 'selection', label: '全选', width: 180, treeNode: true },
                { prop: 'name', label: '名称', editRender: { name: 'input' } },
                { prop: 'size', label: '大小', editRender: { name: 'input' } },
                { prop: 'createTime', label: '创建时间', formatter: this.formatterDate },
                { prop: 'updateTime', label: '修改时间', formatter: this.formatterDate }
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
