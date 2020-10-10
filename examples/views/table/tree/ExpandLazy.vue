<template>
  <div>
    <p class="tip">
      实现子孙表格懒加载
    </p>

    <vxe-table
      border
      resizable
      :tree-config="{children: 'children'}"
      :expand-config="{lazy: true, loadMethod: loadContentMethod}"
      :data="tableData">
      <vxe-table-column field="name" title="Name" tree-node></vxe-table-column>
      <vxe-table-column type="expand" width="80">
        <template v-slot:content="{ row }">
          <vxe-grid :columns="row.childCols" :data="row.childData"></vxe-grid>
        </template>
      </vxe-table-column>
      <vxe-table-column field="size" title="Size"></vxe-table-column>
      <vxe-table-column field="type" title="Type"></vxe-table-column>
      <vxe-table-column field="date" title="Date"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [],
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          :tree-config="{children: 'children'}"
          :expand-config="{lazy: true, loadMethod: loadContentMethod}"
          :data="tableData">
          <vxe-table-column field="name" title="Name" tree-node></vxe-table-column>
          <vxe-table-column type="expand" width="80">
            <template v-slot:content="{ row }">
              <vxe-grid :columns="row.childCols" :data="row.childData"></vxe-grid>
            </template>
          </vxe-table-column>
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
            this.tableData = window.MOCK_TREE_DATA_LIST
          },
          methods: {
            loadContentMethod  ({ row }) {
              return new Promise(resolve => {
                setTimeout(() => {
                  let childCols = XEUtils.sample([
                    { type: 'seq', title: 'Sequence' },
                    { field: 'name', title: 'Name' },
                    { field: 'role', title: 'Role' },
                    { field: 'age', title: 'Age' },
                    { field: 'sex', title: 'Sex' }
                  ], XEUtils.random(3, 5))
                  let childData = XEUtils.sample([
                    { name: 'TEST1', role: 'Develop', age: 20, sex: '女' },
                    { name: 'TEST2', role: 'Develop', age: 22, sex: '女' },
                    { name: 'TEST3', role: 'Develop', age: 24, sex: '男' },
                    { name: 'TEST4', role: 'Develop', age: 26, sex: '女' },
                    { name: 'TEST5', role: 'Develop', age: 28, sex: '男' },
                    { name: 'TEST6', role: 'Develop', age: 30, sex: '男' }
                  ], XEUtils.random(1, 5))
                  row.childCols = childCols
                  row.childData = childData
                  resolve()
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
    this.tableData = XEUtils.clone(window.MOCK_TREE_DATA_LIST, true)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    loadContentMethod  ({ row }) {
      return new Promise(resolve => {
        setTimeout(() => {
          const childCols = XEUtils.sample([
            { type: 'seq', title: 'Sequence' },
            { field: 'name', title: 'Name' },
            { field: 'role', title: 'Role' },
            { field: 'age', title: 'Age' },
            { field: 'sex', title: 'Sex' }
          ], XEUtils.random(3, 5))
          const childData = XEUtils.sample([
            { name: 'TEST1', role: 'Develop', age: 20, sex: '女' },
            { name: 'TEST2', role: 'Develop', age: 22, sex: '女' },
            { name: 'TEST3', role: 'Develop', age: 24, sex: '男' },
            { name: 'TEST4', role: 'Develop', age: 26, sex: '女' },
            { name: 'TEST5', role: 'Develop', age: 28, sex: '男' },
            { name: 'TEST6', role: 'Develop', age: 30, sex: '男' }
          ], XEUtils.random(1, 5))
          row.childCols = childCols
          row.childData = childData
          resolve()
        }, 500)
      })
    }
  }
}
</script>
