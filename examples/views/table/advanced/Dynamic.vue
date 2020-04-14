<template>
  <div>
    <p class="tip">
      配合 v-for 动态生成，动态改变宽度、固定列..等<span class="green">（如果是全动态的数据源建议使用 <grid-api-link name="vxe-grid"/>）</span><br>
      无法列发生变动，需要通过调用 <table-api-link prop="refreshColumn"/> 方法刷新列信息<br>
      <span class="red">（注：动态更新属性必须要先定义，否则将失去自动响应）</span>
    </p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="addColumn()">最后增加一列</vxe-button>
        <vxe-button @click="removeColumn()">删除最后一列</vxe-button>
        <vxe-button @click="updateSexFilter()">修改sex列筛选条件</vxe-button>
        <vxe-button @click="toggleFixedColumn(0, 'left')">切换第一列固定</vxe-button>
        <vxe-button @click="toggleFixedColumn(1, 'left')">切换第二列固定</vxe-button>
        <vxe-button @click="updateWidthColumn(2, 500)">修改第三列宽度</vxe-button>
        <vxe-button @click="updateWidthColumn(3, 500)">修改第四列宽度</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border="inner"
      highlight-hover-row
      highlight-current-row
      ref="xTable"
      height="300"
      :data="tableData">
      <vxe-table-column v-for="(config, index) in tableColumn" :key="index" v-bind="config"></vxe-table-column>
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
      tableColumn: [
        { type: 'seq', width: 60, fixed: null },
        { type: 'checkbox', width: 50, fixed: null },
        { field: 'name', title: 'Name', width: 200 },
        { field: 'nickname', title: 'Nickname', width: 300 },
        { field: 'sex', title: 'Sex', width: 200, filters: [{ value: '1', label: '男' }] },
        { field: 'role', title: 'Role', width: 200 },
        { field: 'address', title: 'Address', width: 300, showOverflow: true }
      ],
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="addColumn()">最后增加一列</vxe-button>
            <vxe-button @click="removeColumn()">删除最后一列</vxe-button>
            <vxe-button @click="updateSexFilter()">修改sex列筛选条件</vxe-button>
            <vxe-button @click="toggleFixedColumn(0, 'left')">切换第一列固定</vxe-button>
            <vxe-button @click="toggleFixedColumn(1, 'left')">切换第二列固定</vxe-button>
            <vxe-button @click="updateWidthColumn(2, 500)">修改第三列宽度</vxe-button>
            <vxe-button @click="updateWidthColumn(3, 500)">修改第四列宽度</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border="inner"
          highlight-hover-row
          highlight-current-row
          ref="xTable"
          height="300"
          :data="tableData">
          <vxe-table-column v-for="(config, index) in tableColumn" :key="index" v-bind="config"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              tableColumn: [
                { type: 'seq', width: 60, fixed: null },
                { type: 'checkbox', width: 50, fixed: null },
                { field: 'name', title: 'Name', width: 200 },
                { field: 'nickname', title: 'Nickname', width: 300 },
                { field: 'sex', title: 'Sex', width: 200 },
                { field: 'role', title: 'Role', width: 200 },
                { field: 'address', title: 'Address', width: 300, showOverflow: true }
              ]
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
          },
          methods: {
            addColumn () {
              const uniqueId = XEUtils.uniqueId()
              this.tableColumn.push({
                field: \`new_\${uniqueId}\`,
                title: \`新列_\${uniqueId}\`,
                minWidth: 100
              })
            },
            removeColumn () {
              this.tableColumn.pop()
            },
            updateSexFilter () {
              const xTable = this.$refs.xTable
              const column = xTable.getColumnByField('sex')
              // 修改筛选列表，并默认设置为选中状态
              xTable.setFilter(column, [
                { value: '1', label: '男' },
                { value: '0', label: '女', checked: true }
              ])
              // 修改条件之后，需要手动调用 updateData 处理表格数据
              xTable.updateData()
            },
            toggleFixedColumn (index, value) {
              const xTable = this.$refs.xTable
              this.tableColumn[index].fixed = this.tableColumn[index].fixed ? null : value
              // 更改了列属性，需要手动刷新列
              this.$nextTick(() => {
                // 由于固定列的动态切换是无状态的，所以需要手动刷新滚动位置
                xTable.refreshColumn().then(() => xTable.refreshScroll())
              })
            },
            updateWidthColumn (index, value) {
              this.tableColumn[index].width = value
              // 更改了列属性，需要手动刷新列
              this.$nextTick(() => {
                this.$refs.xTable.refreshColumn()
              })
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
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
  },
  methods: {
    addColumn () {
      const uniqueId = XEUtils.uniqueId()
      this.tableColumn.push({
        field: `new_${uniqueId}`,
        title: `新列_${uniqueId}`,
        minWidth: 100
      })
    },
    removeColumn () {
      this.tableColumn.pop()
    },
    updateSexFilter () {
      const xTable = this.$refs.xTable
      const column = xTable.getColumnByField('sex')
      // 修改筛选列表，并默认设置为选中状态
      xTable.setFilter(column, [
        { value: '1', label: '男' },
        { value: '0', label: '女', checked: true }
      ])
      // 修改条件之后，需要手动调用 updateData 处理表格数据
      xTable.updateData()
    },
    toggleFixedColumn (index, value) {
      const xTable = this.$refs.xTable
      this.tableColumn[index].fixed = this.tableColumn[index].fixed ? null : value
      // 更改了列属性，需要手动刷新列
      this.$nextTick(() => {
        // 由于固定列的动态切换是无状态的，所以需要手动刷新滚动位置
        xTable.refreshColumn().then(() => xTable.refreshScroll())
      })
    },
    updateWidthColumn (index, value) {
      this.tableColumn[index].width = value
      // 更改了列属性，需要手动刷新列
      this.$nextTick(() => {
        this.$refs.xTable.refreshColumn()
      })
    }
  }
}
</script>
