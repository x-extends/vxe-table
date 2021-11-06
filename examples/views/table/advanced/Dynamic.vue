<template>
  <div>
    <p class="tip">
      使用 v-for 去循环静态列是非常糟糕的，仅用于改变属性，需确保 key 唯一性<span class="green">（动态场景需使用 <router-link :to="{name: 'GridBasic'}">vxe-grid</router-link> 进行渲染）</span><br>
      如果列信息发生变动，则需要通过调用 <table-api-link prop="refreshColumn"/> 方法刷新列信息<br>
      <span class="red">（注：该用法是不建议使用，所有兼容性应自行解决，该示例仅供参考）</span>
    </p>

    <vxe-toolbar>
      <template #buttons>
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
      border
      ref="xTable"
      height="300"
      :data="tableData">
      <vxe-column
        v-for="config in tableColumn"
        :key="config.key"
        :type="config.type"
        :field="config.field"
        :title="config.title"
        :fixed="config.fixed"
        :width="config.width"
        :filters="config.filters">
      </vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableColumn: [
        { key: 1, type: 'seq', width: 60, fixed: null },
        { key: 2, type: 'checkbox', width: 50, fixed: null },
        { key: 3, field: 'name', title: 'Name', width: 200 },
        { key: 4, field: 'nickname', title: 'Nickname', width: 300 },
        { key: 5, field: 'sex', title: 'Sex', width: 200, filters: [{ value: '1', label: '男' }] },
        { key: 6, field: 'role', title: 'Role', width: 200 },
        { key: 7, field: 'address', title: 'Address', width: 300 }
      ],
      tableData: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '1', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: '0', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: '1', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '0', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: '0', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: '0', age: 21, address: 'test abc' },
        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: '1', age: 29, address: 'test abc' },
        { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '1', age: 35, address: 'test abc' }
      ],
      demoCodes: [
        `
        <vxe-toolbar>
          <template #buttons>
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
          border
          ref="xTable"
          height="300"
          :data="tableData">
          <vxe-column
            v-for="config in tableColumn"
            :key="config.key"
            :type="config.type"
            :field="config.field"
            :title="config.title"
            :fixed="config.fixed"
            :width="config.width"
            :filters="config.filters">
          </vxe-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableColumn: [
                { key: 1, type: 'seq', width: 60, fixed: null },
                { key: 2, type: 'checkbox', width: 50, fixed: null },
                { key: 3, field: 'name', title: 'Name', width: 200 },
                { key: 4, field: 'nickname', title: 'Nickname', width: 300 },
                { key: 5, field: 'sex', title: 'Sex', width: 200, filters: [{ value: '1', label: '男' }] },
                { key: 6, field: 'role', title: 'Role', width: 200 },
                { key: 7, field: 'address', title: 'Address', width: 300 }
              ],
              tableData: [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '1', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: '0', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: '1', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '0', age: 23, address: 'test abc' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: '0', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: '0', age: 21, address: 'test abc' },
                { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: '1', age: 29, address: 'test abc' },
                { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '1', age: 35, address: 'test abc' }
              ]
            }
          },
          methods: {
            addColumn () {
              const uniqueId = Date.now()
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
  methods: {
    addColumn () {
      const uniqueId = Date.now()
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
