<template>
  <div>
    <p class="tip">
      通过给需要排序功能的列加上 <table-api-link prop="sortable"/> 属性可以支持排序，还可以通过设置 <table-api-link prop="sort-by"/> 多字段进行排序<br>
      如果是服务端排序，只需加上 <table-column-api-link prop="remote-sort"/> 和 <table-api-link prop="sort-change"/> 事件就可以实现<br>
      还可以通过调用 <table-api-link prop="sort"/> 方法实现手动排序
    </p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="$refs.xTable.sort('name', 'asc')">Name 升序</vxe-button>
        <vxe-button @click="$refs.xTable.sort('name', 'desc')">Name 降序</vxe-button>
        <vxe-button @click="$refs.xTable.clearSort()">清除排序</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      highlight-hover-row
      ref="xTable"
      height="300"
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
      <vxe-table-column field="nickname" title="Nickname" sortable></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" sortable></vxe-table-column>
      <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
      <vxe-table-column field="time" title="Time" sortable></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">配置 <table-column-api-link prop="sort-by"/> 多个字段排序</p>

    <vxe-table
      border
      highlight-hover-row
      height="300"
      :data="tableData2">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="单个排序 name" sortable></vxe-table-column>
      <vxe-table-column field="role" title="多字段排序 role+num" :sort-by="['role', 'num']" sortable></vxe-table-column>
      <vxe-table-column field="num" title="多字段排序 name+role+num" :sort-by="['name', 'role', 'num']" sortable></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>

    <p class="tip">配置 <table-column-api-link prop="sort-method"/> 自定义排序</p>

    <vxe-table
      border
      highlight-hover-row
      height="300"
      :data="tableData"
      @sort-change="sortChangeEvent">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable :sort-method="sortNameMethod"></vxe-table-column>
      <vxe-table-column field="nickname" title="Nickname" sortable></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" sortable></vxe-table-column>
      <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
      <vxe-table-column field="time" title="Time" sortable></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[4] }}</code>
      <code class="javascript">{{ demoCodes[5] }}</code>
    </pre>

    <p class="tip">点击表头排序，通过 <table-api-link prop="defaultSort"/> 默认排序、<table-api-link prop="orders"/> 自定义轮转顺序、通过配置 <table-api-link prop="trigger"/> 设置触发源</p>

    <vxe-table
      border
      highlight-hover-row
      highlight-hover-column
      height="300"
      :data="tableData"
      :sort-config="{trigger: 'cell', defaultSort: {field: 'age', order: 'desc'}, orders: ['desc', 'asc', null]}"
      @sort-change="sortChangeEvent">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="nickname" title="Nickname" sortable></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" sortable></vxe-table-column>
      <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
      <vxe-table-column field="time" title="Time" sortable></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[6] }}</code>
      <code class="javascript">{{ demoCodes[7] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' }
      ],
      tableData2: [
        { name: '小红', role: '前端', num: 7 },
        { name: '老王', role: '后端', num: 6 },
        { name: '小红', role: '后端', num: 1 },
        { name: '小明', role: '前端', num: 2 },
        { name: '老徐', role: '测试', num: 3 },
        { name: '老王', role: '前端', num: 3 },
        { name: '老徐', role: '测试', num: 4 },
        { name: '小明', role: '前端', num: 4 },
        { name: '小明', role: '前端', num: 8 },
        { name: '小明', role: '测试', num: 6 },
        { name: '小红', role: '后端', num: 9 },
        { name: '老徐', role: '前端', num: 5 },
        { name: '老徐', role: '测试', num: 1 },
        { name: '小红', role: '前端', num: 4 },
        { name: '小红', role: '前端', num: 2 },
        { name: '小明', role: '测试', num: 3 },
        { name: '老王', role: '前端', num: 6 },
        { name: '老王', role: '后端', num: 4 },
        { name: '老徐', role: '前端', num: 8 },
        { name: '小明', role: '测试', num: 7 }
      ],
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="$refs.xTable.sort('name', 'asc')">Name 升序</vxe-button>
            <vxe-button @click="$refs.xTable.sort('name', 'desc')">Name 降序</vxe-button>
            <vxe-button @click="$refs.xTable.clearSort()">清除排序</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          highlight-hover-row
          ref="xTable"
          height="300"
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
          <vxe-table-column field="nickname" title="Nickname" sortable></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" sortable></vxe-table-column>
          <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
          <vxe-table-column field="time" title="Time" sortable></vxe-table-column>
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
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' }
              ]
            }
          }
        }
        `,
        `
        <vxe-table
          border
          highlight-hover-row
          height="300"
          :data="tableData2">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="单个排序 name" sortable></vxe-table-column>
          <vxe-table-column field="role" title="多字段排序 role+num" :sort-by="['role', 'num']" sortable></vxe-table-column>
          <vxe-table-column field="num" title="多字段排序 name+role+num" :sort-by="['name', 'role', 'num']" sortable></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData2: [
                { name: '小红', role: '前端', num: 7 },
                { name: '老王', role: '后端', num: 6 },
                { name: '小红', role: '后端', num: 1 },
                { name: '小明', role: '前端', num: 2 },
                { name: '老徐', role: '测试', num: 3 },
                { name: '老王', role: '前端', num: 3 },
                { name: '老徐', role: '测试', num: 4 },
                { name: '小明', role: '前端', num: 4 },
                { name: '小明', role: '前端', num: 8 },
                { name: '小明', role: '测试', num: 6 },
                { name: '小红', role: '后端', num: 9 },
                { name: '老徐', role: '前端', num: 5 },
                { name: '老徐', role: '测试', num: 1 },
                { name: '小红', role: '前端', num: 4 },
                { name: '小红', role: '前端', num: 2 },
                { name: '小明', role: '测试', num: 3 },
                { name: '老王', role: '前端', num: 6 },
                { name: '老王', role: '后端', num: 4 },
                { name: '老徐', role: '前端', num: 8 },
                { name: '小明', role: '测试', num: 7 }
              ]
            }
          }
        }
        `,
        `
        <vxe-table
          border
          highlight-hover-row
          height="300"
          :data="tableData"
          @sort-change="sortChangeEvent">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable :sort-method="sortNameMethod"></vxe-table-column>
          <vxe-table-column field="nickname" title="Nickname" sortable></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" sortable></vxe-table-column>
          <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
          <vxe-table-column field="time" title="Time" sortable></vxe-table-column>
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
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' }
              ]
            }
          },
          methods: {
            sortNameMethod (a, b) {
              // 例如：名称不区分大小写的排序
              var v1 = (a.name || '').toLowerCase()
              var v2 = (b.name || '').toLowerCase()
              return v1 < v2 ? -1 : v1 > v2 ? 1 : 0
            },
            sortChangeEvent ({ column, property, order }) {
              console.info(property, order)
            }
          }
        }
        `,
        `
        <vxe-table
          border
          highlight-hover-row
          highlight-hover-column
          height="300"
          :data="tableData"
          :sort-config="{trigger: 'cell', defaultSort: {field: 'age', order: 'desc'}, orders: ['desc', 'asc', null]}"
          @sort-change="sortChangeEvent">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="nickname" title="Nickname" sortable></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" sortable></vxe-table-column>
          <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
          <vxe-table-column field="time" title="Time" sortable></vxe-table-column>
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
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' }
              ]
            }
          },
          methods: {
            sortChangeEvent ({ column, property, order }) {
              console.info(property, order)
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
    sortNameMethod (a, b) {
      // 例如：名称不区分大小写的排序
      const v1 = (a.name || '').toLowerCase()
      const v2 = (b.name || '').toLowerCase()
      return v1 < v2 ? -1 : v1 > v2 ? 1 : 0
    },
    sortChangeEvent ({ property, order }) {
      console.info(property, order)
    }
  }
}
</script>
