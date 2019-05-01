<template>
  <div>
    <p>右键快捷菜单</p>

    <vxe-table
      border
      highlight-hover-row
      :data.sync="tableData"
      :context-menu="{header: {options: headerMenus}, body: {options: bodyMenus}}"
      @context-menu-link="contextMenuLinkEvent">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" sortable></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="date" label="Date"></vxe-table-column>
      <vxe-table-column prop="time" label="Time"></vxe-table-column>
      <vxe-table-column prop="address" label="Address"></vxe-table-column>
    </vxe-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      headerMenus: [
        [
          {
            code: 'exportAll',
            name: '导出所有.cvs'
          }
        ]
      ],
      bodyMenus: [
        [
          {
            code: 'copy',
            name: '复制'
          },
          {
            code: 'paste',
            name: '粘贴'
          }
        ],
        [
          {
            code: 'remove',
            name: '删除'
          },
          {
            code: 'print',
            name: '打印',
            disabled: true
          }
        ]
      ]
    }
  },
  created () {
    let list = window.CACHE_DATA_LIST.slice(0, 6)
    this.tableData = list
  },
  methods: {
    contextMenuLinkEvent (menu) {
      alert(menu.name)
    }
  }
}
</script>
