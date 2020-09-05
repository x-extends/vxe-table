<template>
  <div>
    <p class="tip">横纵内容过多时，同时固定列和表头</p>

    <vxe-table
      border
      resizable
      height="300"
      highlight-hover-row
      :data="tableData">
      <vxe-table-column type="seq" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column field="name" title="Name" width="300"></vxe-table-column>
      <vxe-table-column field="role" title="Role" width="300"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" width="300"></vxe-table-column>
      <vxe-table-column field="date" title="Date" width="300"></vxe-table-column>
      <vxe-table-column title="操作" fixed="right" width="200">
        <template v-slot>
          <vxe-button type="text">按钮1</vxe-button>
          <vxe-button type="text">按钮2</vxe-button>
        </template>
      </vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">固定列建议设置 <table-api-link prop="show-overflow"/> 该值，禁用自动换行，大幅提升渲染速度</p>

    <vxe-toolbar>
      <template v-slot:buttons>
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
      <vxe-table-column type="seq" width="60" :fixed="colFixeds.col0"></vxe-table-column>
      <vxe-table-column field="name" title="Name" width="300" :fixed="colFixeds.col1"></vxe-table-column>
      <vxe-table-column field="role" title="Role" width="300"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" width="300"></vxe-table-column>
      <vxe-table-column field="date" title="Date" width="300" :fixed="colFixeds.col4"></vxe-table-column>
      <vxe-table-column title="操作" width="200" :fixed="colFixeds.col5">
        <template v-slot>
          <vxe-button status="primary">按钮1</vxe-button>
          <vxe-button>按钮2</vxe-button>
        </template>
      </vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>

    <p class="tip">
      <span>分组表头<span class="red">（注：固定列必须按组进行设置）</span></span>
    </p>

    <vxe-table
      border
      height="400"
      :data="tableData">
      <vxe-table-column title="基本信息" fixed="left">
        <vxe-table-column type="seq" width="60" fixed="left"></vxe-table-column>
        <vxe-table-column field="name" title="Name" fixed="left" width="180"></vxe-table-column>
      </vxe-table-column>
      <vxe-table-column title="更多信息">
        <vxe-table-column field="role" title="Role" width="300"></vxe-table-column>
        <vxe-table-column field="age" title="Age" width="200"></vxe-table-column>
        <vxe-table-column title="详细信息">
          <vxe-table-column field="sex" title="Sex" width="200"></vxe-table-column>
          <vxe-table-column field="num" title="Num" width="200"></vxe-table-column>
        </vxe-table-column>
      </vxe-table-column>
      <vxe-table-column title="额外信息" fixed="right">
        <vxe-table-column field="date3" title="Date" fixed="right" width="140"></vxe-table-column>
        <vxe-table-column field="address" title="Address" fixed="right" width="200" show-overflow></vxe-table-column>
      </vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[4] }}</code>
      <code class="javascript">{{ demoCodes[5] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

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
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' }
      ],
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          height="300"
          highlight-hover-row
          :data="tableData">
          <vxe-table-column type="seq" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column field="name" title="Name" width="300"></vxe-table-column>
          <vxe-table-column field="role" title="Role" width="300"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" width="300"></vxe-table-column>
          <vxe-table-column field="date" title="Date" width="300"></vxe-table-column>
          <vxe-table-column title="操作" fixed="right" width="200">
            <template v-slot>
              <vxe-button type="text">按钮1</vxe-button>
              <vxe-button type="text">按钮2</vxe-button>
            </template>
          </vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' }
              ]
            }
          }
        }
        `,
        `
        <vxe-toolbar>
          <template v-slot:buttons>
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
          <vxe-table-column type="seq" width="60" :fixed="colFixeds.col0"></vxe-table-column>
          <vxe-table-column field="name" title="Name" width="300" :fixed="colFixeds.col1"></vxe-table-column>
          <vxe-table-column field="role" title="Role" width="300"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" width="300"></vxe-table-column>
          <vxe-table-column field="date" title="Date" width="300" :fixed="colFixeds.col4"></vxe-table-column>
          <vxe-table-column title="操作" width="200" :fixed="colFixeds.col5">
            <template v-slot>
              <vxe-button status="primary">按钮1</vxe-button>
              <vxe-button>按钮2</vxe-button>
            </template>
          </vxe-table-column>
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
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' }
              ]
            }
          },
          methods: {
            toggleFixedColumn (index, type) {
              const xTable = this.$refs.xTable2
              const column = xTable.getColumns(index)
              column.fixed = column.fixed ? null : type
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
          <vxe-table-column title="基本信息" fixed="left">
            <vxe-table-column type="seq" width="60" fixed="left"></vxe-table-column>
            <vxe-table-column field="name" title="Name" fixed="left" width="180"></vxe-table-column>
          </vxe-table-column>
          <vxe-table-column title="更多信息">
            <vxe-table-column field="role" title="Role" width="300"></vxe-table-column>
            <vxe-table-column field="age" title="Age" width="200"></vxe-table-column>
            <vxe-table-column title="详细信息">
              <vxe-table-column field="sex" title="Sex" width="200"></vxe-table-column>
              <vxe-table-column field="num" title="Num" width="200"></vxe-table-column>
            </vxe-table-column>
          </vxe-table-column>
          <vxe-table-column title="额外信息" fixed="right">
            <vxe-table-column field="date3" title="Date" fixed="right" width="140"></vxe-table-column>
            <vxe-table-column field="address" title="Address" fixed="right" width="200" show-overflow></vxe-table-column>
          </vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' }
              ]
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
    toggleFixedColumn (index, type) {
      const xTable = this.$refs.xTable2
      const column = xTable.getColumns(index)
      column.fixed = column.fixed ? null : type
      // 刷新列
      xTable.refreshColumn()
    }
  }
}
</script>
