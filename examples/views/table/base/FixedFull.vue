<template>
  <div>
    <p class="tip">横纵内容过多时，同时固定列和表头</p>

    <vxe-table
      border
      resizable
      height="300"
      highlight-hover-row
      :data="tableData">
      <vxe-column type="seq" width="60" fixed="left"></vxe-column>
      <vxe-column field="name" title="Name" width="300"></vxe-column>
      <vxe-column field="role" title="Role" width="300"></vxe-column>
      <vxe-column field="sex" title="Sex" width="300"></vxe-column>
      <vxe-column field="date" title="Date" width="300"></vxe-column>
      <vxe-column title="操作" fixed="right" width="200">
        <template #default>
          <vxe-button type="text">按钮1</vxe-button>
          <vxe-button type="text">按钮2</vxe-button>
        </template>
      </vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">固定列建议设置 <table-api-link prop="show-overflow"/> 该值，禁用自动换行，大幅提升渲染速度</p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="toggleFixedColumn(0, 'left')">切换第一列固定</vxe-button>
        <vxe-button @click="toggleFixedColumn(1, 'left')">切换第二列固定</vxe-button>
        <vxe-button @click="toggleFixedColumn(4, 'right')">切换第五列固定</vxe-button>
        <vxe-button @click="toggleFixedColumn(5, 'right')">切换第六列固定</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      ref="xTable2"
      height="300"
      highlight-hover-row
      show-overflow
      :data="tableData">
      <vxe-column type="seq" width="60" :fixed="colFixeds.col0"></vxe-column>
      <vxe-column field="name" title="Name" width="300" :fixed="colFixeds.col1"></vxe-column>
      <vxe-column field="role" title="Role" width="300"></vxe-column>
      <vxe-column field="sex" title="Sex" width="300"></vxe-column>
      <vxe-column field="date" title="Date" width="300" :fixed="colFixeds.col4"></vxe-column>
      <vxe-column title="操作" width="200" :fixed="colFixeds.col5">
        <template #default>
          <vxe-button status="primary">按钮1</vxe-button>
          <vxe-button>按钮2</vxe-button>
        </template>
      </vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[3] }}</pre-code>
    </pre>

    <p class="tip">
      <span>分组表头<span class="red">（注：固定列必须按组进行设置）</span></span>
    </p>

    <vxe-table
      border
      height="400"
      :data="tableData">
      <vxe-colgroup title="基本信息" fixed="left">
        <vxe-column type="seq" width="60" fixed="left"></vxe-column>
        <vxe-column field="name" title="Name" fixed="left" width="180"></vxe-column>
      </vxe-colgroup>
      <vxe-colgroup title="更多信息">
        <vxe-column field="role" title="Role" width="300"></vxe-column>
        <vxe-column field="age" title="Age" width="200"></vxe-column>
        <vxe-colgroup title="详细信息">
          <vxe-column field="sex" title="Sex" width="200"></vxe-column>
          <vxe-column field="num" title="Num" width="200"></vxe-column>
        </vxe-colgroup>
      </vxe-colgroup>
      <vxe-colgroup title="额外信息" fixed="right">
        <vxe-column field="date3" title="Date" fixed="right" width="140"></vxe-column>
        <vxe-column field="address" title="Address" fixed="right" width="200" show-overflow></vxe-column>
      </vxe-colgroup>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[4] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[5] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      colFixeds: {
        col0: '',
        col1: '',
        col2: '',
        col3: ''
      },
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' },
        { id: 10009, name: 'Test9', role: 'Test', sex: 'Man', age: 26, address: 'test abc' },
        { id: 10010, name: 'Test10', role: 'Develop', sex: 'Man', age: 38, address: 'test abc' },
        { id: 10011, name: 'Test11', role: 'Test', sex: 'Women', age: 29, address: 'test abc' },
        { id: 10012, name: 'Test12', role: 'Develop', sex: 'Man', age: 27, address: 'test abc' },
        { id: 10013, name: 'Test13', role: 'Test', sex: 'Women', age: 24, address: 'test abc' },
        { id: 10014, name: 'Test14', role: 'Develop', sex: 'Man', age: 34, address: 'test abc' },
        { id: 10015, name: 'Test15', role: 'Test', sex: 'Man', age: 21, address: 'test abc' },
        { id: 10016, name: 'Test16', role: 'Develop', sex: 'Women', age: 20, address: 'test abc' },
        { id: 10017, name: 'Test17', role: 'Test', sex: 'Man', age: 31, address: 'test abc' },
        { id: 10018, name: 'Test18', role: 'Develop', sex: 'Women', age: 32, address: 'test abc' },
        { id: 10019, name: 'Test19', role: 'Test', sex: 'Man', age: 37, address: 'test abc' },
        { id: 10020, name: 'Test20', role: 'Develop', sex: 'Man', age: 41, address: 'test abc' }
      ],
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          height="300"
          highlight-hover-row
          :data="tableData">
          <vxe-column type="seq" width="60" fixed="left"></vxe-column>
          <vxe-column field="name" title="Name" width="300"></vxe-column>
          <vxe-column field="role" title="Role" width="300"></vxe-column>
          <vxe-column field="sex" title="Sex" width="300"></vxe-column>
          <vxe-column field="date" title="Date" width="300"></vxe-column>
          <vxe-column title="操作" fixed="right" width="200">
            <template #default>
              <vxe-button type="text">按钮1</vxe-button>
              <vxe-button type="text">按钮2</vxe-button>
            </template>
          </vxe-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' },
                { id: 10009, name: 'Test9', role: 'Test', sex: 'Man', age: 26, address: 'test abc' },
                { id: 10010, name: 'Test10', role: 'Develop', sex: 'Man', age: 38, address: 'test abc' },
                { id: 10011, name: 'Test11', role: 'Test', sex: 'Women', age: 29, address: 'test abc' },
                { id: 10012, name: 'Test12', role: 'Develop', sex: 'Man', age: 27, address: 'test abc' },
                { id: 10013, name: 'Test13', role: 'Test', sex: 'Women', age: 24, address: 'test abc' },
                { id: 10014, name: 'Test14', role: 'Develop', sex: 'Man', age: 34, address: 'test abc' },
                { id: 10015, name: 'Test15', role: 'Test', sex: 'Man', age: 21, address: 'test abc' },
                { id: 10016, name: 'Test16', role: 'Develop', sex: 'Women', age: 20, address: 'test abc' },
                { id: 10017, name: 'Test17', role: 'Test', sex: 'Man', age: 31, address: 'test abc' },
                { id: 10018, name: 'Test18', role: 'Develop', sex: 'Women', age: 32, address: 'test abc' },
                { id: 10019, name: 'Test19', role: 'Test', sex: 'Man', age: 37, address: 'test abc' },
                { id: 10020, name: 'Test20', role: 'Develop', sex: 'Man', age: 41, address: 'test abc' }
              ]
            }
          }
        }
        `,
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-button @click="toggleFixedColumn(0, 'left')">切换第一列固定</vxe-button>
            <vxe-button @click="toggleFixedColumn(1, 'left')">切换第二列固定</vxe-button>
            <vxe-button @click="toggleFixedColumn(4, 'right')">切换第五列固定</vxe-button>
            <vxe-button @click="toggleFixedColumn(5, 'right')">切换第六列固定</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          height="400"
          :data="tableData">
          <vxe-colgroup title="基本信息" fixed="left">
            <vxe-column type="seq" width="60" fixed="left"></vxe-column>
            <vxe-column field="name" title="Name" fixed="left" width="180"></vxe-column>
          </vxe-colgroup>
          <vxe-colgroup title="更多信息">
            <vxe-column field="role" title="Role" width="300"></vxe-column>
            <vxe-column field="age" title="Age" width="200"></vxe-column>
            <vxe-colgroup title="详细信息">
              <vxe-column field="sex" title="Sex" width="200"></vxe-column>
              <vxe-column field="num" title="Num" width="200"></vxe-column>
            </vxe-colgroup>
          </vxe-colgroup>
          <vxe-colgroup title="额外信息" fixed="right">
            <vxe-column field="date3" title="Date" fixed="right" width="140"></vxe-column>
            <vxe-column field="address" title="Address" fixed="right" width="200" show-overflow></vxe-column>
          </vxe-colgroup>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              colFixeds: {
                col0: '',
                col1: '',
                col2: '',
                col3: ''
              },
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' },
                { id: 10009, name: 'Test9', role: 'Test', sex: 'Man', age: 26, address: 'test abc' },
                { id: 10010, name: 'Test10', role: 'Develop', sex: 'Man', age: 38, address: 'test abc' },
                { id: 10011, name: 'Test11', role: 'Test', sex: 'Women', age: 29, address: 'test abc' },
                { id: 10012, name: 'Test12', role: 'Develop', sex: 'Man', age: 27, address: 'test abc' },
                { id: 10013, name: 'Test13', role: 'Test', sex: 'Women', age: 24, address: 'test abc' },
                { id: 10014, name: 'Test14', role: 'Develop', sex: 'Man', age: 34, address: 'test abc' },
                { id: 10015, name: 'Test15', role: 'Test', sex: 'Man', age: 21, address: 'test abc' },
                { id: 10016, name: 'Test16', role: 'Develop', sex: 'Women', age: 20, address: 'test abc' },
                { id: 10017, name: 'Test17', role: 'Test', sex: 'Man', age: 31, address: 'test abc' },
                { id: 10018, name: 'Test18', role: 'Develop', sex: 'Women', age: 32, address: 'test abc' },
                { id: 10019, name: 'Test19', role: 'Test', sex: 'Man', age: 37, address: 'test abc' },
                { id: 10020, name: 'Test20', role: 'Develop', sex: 'Man', age: 41, address: 'test abc' }
              ]
            }
          },
          methods: {
            toggleFixedColumn (index, type) {
              const xTable = this.$refs.xTable2
              const tableColumns = xTable.getColumns()
              const fxColumn = tableColumns[index]
              fxColumn.fixed = fxColumn.fixed ? null : type
              // 刷新列
              xTable.refreshColumn()
            }
          }
        }
        `,
        `
        <vxe-table
          border
          height="400"
          :data="tableData">
          <vxe-column title="基本信息" fixed="left">
            <vxe-column type="seq" width="60" fixed="left"></vxe-column>
            <vxe-column field="name" title="Name" fixed="left" width="180"></vxe-column>
          </vxe-column>
          <vxe-column title="更多信息">
            <vxe-column field="role" title="Role" width="300"></vxe-column>
            <vxe-column field="age" title="Age" width="200"></vxe-column>
            <vxe-column title="详细信息">
              <vxe-column field="sex" title="Sex" width="200"></vxe-column>
              <vxe-column field="num" title="Num" width="200"></vxe-column>
            </vxe-column>
          </vxe-column>
          <vxe-column title="额外信息" fixed="right">
            <vxe-column field="date3" title="Date" fixed="right" width="140"></vxe-column>
            <vxe-column field="address" title="Address" fixed="right" width="200" show-overflow></vxe-column>
          </vxe-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' },
                { id: 10009, name: 'Test9', role: 'Test', sex: 'Man', age: 26, address: 'test abc' },
                { id: 10010, name: 'Test10', role: 'Develop', sex: 'Man', age: 38, address: 'test abc' },
                { id: 10011, name: 'Test11', role: 'Test', sex: 'Women', age: 29, address: 'test abc' },
                { id: 10012, name: 'Test12', role: 'Develop', sex: 'Man', age: 27, address: 'test abc' },
                { id: 10013, name: 'Test13', role: 'Test', sex: 'Women', age: 24, address: 'test abc' },
                { id: 10014, name: 'Test14', role: 'Develop', sex: 'Man', age: 34, address: 'test abc' },
                { id: 10015, name: 'Test15', role: 'Test', sex: 'Man', age: 21, address: 'test abc' },
                { id: 10016, name: 'Test16', role: 'Develop', sex: 'Women', age: 20, address: 'test abc' },
                { id: 10017, name: 'Test17', role: 'Test', sex: 'Man', age: 31, address: 'test abc' },
                { id: 10018, name: 'Test18', role: 'Develop', sex: 'Women', age: 32, address: 'test abc' },
                { id: 10019, name: 'Test19', role: 'Test', sex: 'Man', age: 37, address: 'test abc' },
                { id: 10020, name: 'Test20', role: 'Develop', sex: 'Man', age: 41, address: 'test abc' }
              ]
            }
          }
        }
        `
      ]
    }
  },
  methods: {
    toggleFixedColumn (index, type) {
      const xTable = this.$refs.xTable2
      const tableColumns = xTable.getColumns()
      const fxColumn = tableColumns[index]
      fxColumn.fixed = fxColumn.fixed ? null : type
      // 刷新列
      xTable.refreshColumn()
    }
  }
}
</script>
