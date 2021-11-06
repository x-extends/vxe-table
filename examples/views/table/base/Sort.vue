<template>
  <div>
    <p class="tip">
      通过给需要排序功能的列加上 <table-api-link prop="sortable"/> 属性可以支持排序，还可以通过设置 <table-column-api-link prop="sort-by"/> 指定字段进行排序<br>
      如果该列的值为字符串类型，但实际是数值，可以设置 <table-column-api-link prop="sort-type"/>=number|string 按指定类型进行排序，默认 auto 自动转换数值<br>
      如果是自定义排序，可以通过 <table-api-link prop="sort-config"/>.<table-api-link prop="sortMethod"/> 实现自定义排序<br>
      如果是服务端排序，只需加上 <table-api-link prop="sort-config"/>={remote: true} 和 <table-api-link prop="sort-change"/> 事件就可以实现<br>
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
      <vxe-table-column field="role" title="Role" sortable></vxe-table-column>
      <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
      <vxe-table-column field="num" title="字符串" sort-type="string" sortable></vxe-table-column>
      <vxe-table-column field="num2" title="数值" sort-type="number" sortable></vxe-table-column>
      <vxe-table-column field="address" title="Address" sortable></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">配置 <table-column-api-link prop="sort-by"/> 指定字段排序、或者方法返回自定义排序的值；例如：当使用格式化函数时，排序还是使用原始值</p>

    <vxe-table
      border
      highlight-hover-row
      height="300"
      :data="tableData2">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="num" title="Num" sortable></vxe-table-column>
      <vxe-table-column field="num1" title="分离格式化与数值字段" sort-by="num1" sortable :formatter="formatterNum2"></vxe-table-column>
      <vxe-table-column field="num2" title="分离格式化与字符串字段" sort-by="num2" sort-type="number" sortable :formatter="formatterNum2"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>

    <p class="tip">配置 <table-api-link prop="sort-config"/>.<table-api-link prop="sortMethod"/> 自定义排序</p>

    <vxe-table
      border
      highlight-hover-row
      height="300"
      :data="tableData3"
      :sort-config="{sortMethod: customSortMethod}">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
      <vxe-table-column field="role" title="Role"></vxe-table-column>
      <vxe-table-column field="num1" title="Num1"></vxe-table-column>
      <vxe-table-column field="num2" title="Num2"></vxe-table-column>
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
      <vxe-table-column field="role" title="Role" sortable></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" sortable></vxe-table-column>
      <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
      <vxe-table-column field="address" title="Address" sortable></vxe-table-column>
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
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, num: '3.8', num2: '3.8', address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, num: '511', num2: '511', address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, num: '12.8', num2: '12.8', address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, num: '103', num2: '103', address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, num: '56', num2: '56', address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, num: '49', num2: '49', address: 'test abc' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, num: '400.9', num2: '400.9', address: 'test abc' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, num: '5000', num2: '5000', address: 'test abc' }
      ],
      tableData2: [
        { name: '小红11', role: '前端', num: 7, num1: 1368.7, num2: '1368.7' },
        { name: '老王1', role: '后端', num: 6, num1: 89657, num2: '89657' },
        { name: '小红111111', role: '后端', num: 1, num1: 672, num2: '672' },
        { name: '小明11', role: '前端', num: 2, num1: 482456, num2: '482456' },
        { name: '老徐111', role: '测试', num: 3, num1: 7546.7, num2: '7546.7' },
        { name: '老王11', role: '前端', num: 3, num1: 6897, num2: '6897' },
        { name: '老徐11111111', role: '测试', num: 4, num1: 8957, num2: '8957' },
        { name: '小明111111111', role: '前端', num: 4, num1: 56433.57, num2: '56433.57' },
        { name: '小明1', role: '前端', num: 8, num1: 977, num2: '977' },
        { name: '小明111', role: '测试', num: 6, num1: 98477, num2: '98477' },
        { name: '小红11111', role: '后端', num: 9, num1: 67017, num2: '67017' },
        { name: '老徐11', role: '前端', num: 5, num1: 7364, num2: '7364' },
        { name: '老徐11', role: '测试', num: 1, num1: 1573.7, num2: '1573.7' },
        { name: '小红1111', role: '前端', num: 4, num1: 16807, num2: '16807' },
        { name: '小红111', role: '前端', num: 2, num1: 744345.7, num2: '744345.7' },
        { name: '小明111', role: '测试', num: 3, num1: 10957, num2: '10957' },
        { name: '老王1', role: '前端', num: 6, num1: 6737, num2: '6737' },
        { name: '老王1111', role: '后端', num: 4, num1: 83445.1, num2: '83445.1' },
        { name: '老徐11', role: '前端', num: 8, num1: 4636677, num2: '4636677' },
        { name: '小明111111', role: '测试', num: 7, num1: 5783537, num2: '5783537' }
      ],
      tableData3: [
        { name: 'lefa', role: '前端', num: 7, num1: 1368.7, num2: '1368.7' },
        { name: '老王1', role: '后端', num: 6, num1: 89657, num2: '89657' },
        { name: 'xgy王', role: '后端', num: 1, num1: 672, num2: '672' },
        { name: '小明11', role: '前端', num: 2, num1: 482456, num2: '482456' },
        { name: '好吧', role: '测试', num: 3, num1: 7546.7, num2: '7546.7' },
        { name: '老王11', role: '前端', num: 3, num1: 6897, num2: '6897' },
        { name: 'tfhn', role: '测试', num: 4, num1: 8957, num2: '8957' },
        { name: '踢fhz', role: '测试', num: 4, num1: 8957, num2: '8957' },
        { name: 'qtjh1111111', role: '前端', num: 4, num1: 56433.57, num2: '56433.57' },
        { name: 'lhfgt', role: '前端', num: 8, num1: 977, num2: '977' },
        { name: 'h小明111', role: '测试', num: 6, num1: 98477, num2: '98477' },
        { name: '小红11111', role: '后端', num: 9, num1: 67017, num2: '67017' },
        { name: 'tfhnhy', role: '测试', num: 4, num1: 8957, num2: '8957' },
        { name: '老徐11', role: '前端', num: 5, num1: 7364, num2: '7364' },
        { name: 'qth', role: '测试', num: 1, num1: 1573.7, num2: '1573.7' },
        { name: '小红1111', role: '前端', num: 4, num1: 16807, num2: '16807' },
        { name: '小红111', role: '前端', num: 2, num1: 744345.7, num2: '744345.7' },
        { name: '前任', role: '测试', num: 3, num1: 10957, num2: '10957' },
        { name: 'q老王1', role: '前端', num: 6, num1: 6737, num2: '6737' }
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
          <vxe-table-column field="role" title="Role" sortable></vxe-table-column>
          <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
          <vxe-table-column field="num" title="字符串" sort-type="string" sortable></vxe-table-column>
          <vxe-table-column field="num2" title="数值" sort-type="number" sortable></vxe-table-column>
          <vxe-table-column field="address" title="Address" sortable></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, num: '3.8', num2: '3.8', address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, num: '511', num2: '511', address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, num: '12.8', num2: '12.8', address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, num: '103', num2: '103', address: 'test abc' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, num: '56', num2: '56', address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, num: '49', num2: '49', address: 'test abc' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, num: '400.9', num2: '400.9', address: 'test abc' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, num: '5000', num2: '5000', address: 'test abc' }
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
          <vxe-table-column field="num" title="Num" sortable></vxe-table-column>
          <vxe-table-column field="num1" title="分离格式化与数值字段" sort-by="num1" sortable :formatter="formatterNum2"></vxe-table-column>
          <vxe-table-column field="num2" title="分离格式化与字符串字段" sort-by="num2" sort-type="number" sortable :formatter="formatterNum2"></vxe-table-column>
        </vxe-table>
        `,
        `
        import XEUtils from 'xe-utils'

        export default {
          data () {
            return {
              tableData2: [
                { name: '小红11', role: '前端', num: 7, num1: 1368.7, num2: '1368.7' },
                { name: '老王1', role: '后端', num: 6, num1: 89657, num2: '89657' },
                { name: '小红111111', role: '后端', num: 1, num1: 672, num2: '672' },
                { name: '小明11', role: '前端', num: 2, num1: 482456, num2: '482456' },
                { name: '老徐111', role: '测试', num: 3, num1: 7546.7, num2: '7546.7' },
                { name: '老王11', role: '前端', num: 3, num1: 6897, num2: '6897' },
                { name: '老徐11111111', role: '测试', num: 4, num1: 8957, num2: '8957' },
                { name: '小明111111111', role: '前端', num: 4, num1: 56433.57, num2: '56433.57' },
                { name: '小明1', role: '前端', num: 8, num1: 977, num2: '977' },
                { name: '小明111', role: '测试', num: 6, num1: 98477, num2: '98477' },
                { name: '小红11111', role: '后端', num: 9, num1: 67017, num2: '67017' },
                { name: '老徐11', role: '前端', num: 5, num1: 7364, num2: '7364' },
                { name: '老徐11', role: '测试', num: 1, num1: 1573.7, num2: '1573.7' },
                { name: '小红1111', role: '前端', num: 4, num1: 16807, num2: '16807' },
                { name: '小红111', role: '前端', num: 2, num1: 744345.7, num2: '744345.7' },
                { name: '小明111', role: '测试', num: 3, num1: 10957, num2: '10957' },
                { name: '老王1', role: '前端', num: 6, num1: 6737, num2: '6737' },
                { name: '老王1111', role: '后端', num: 4, num1: 83445.1, num2: '83445.1' },
                { name: '老徐11', role: '前端', num: 8, num1: 4636677, num2: '4636677' },
                { name: '小明111111', role: '测试', num: 7, num1: 5783537, num2: '5783537' }
              ]
            }
          },
          methods: {
            formatterNum2 ({ cellValue }) {
              return XEUtils.commafy(XEUtils.toNumber(cellValue), { digits: 2 })
            }
          }
        }
        `,
        `
        <vxe-table
          border
          highlight-hover-row
          height="300"
          :data="tableData3"
          :sort-config="{sortMethod: customSortMethod}">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
          <vxe-table-column field="role" title="Role"></vxe-table-column>
          <vxe-table-column field="num1" title="Num1"></vxe-table-column>
          <vxe-table-column field="num2" title="Num2"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData3: [
                { name: 'lefa', role: '前端', num: 7, num1: 1368.7, num2: '1368.7' },
                { name: '老王1', role: '后端', num: 6, num1: 89657, num2: '89657' },
                { name: 'xgy王', role: '后端', num: 1, num1: 672, num2: '672' },
                { name: '小明11', role: '前端', num: 2, num1: 482456, num2: '482456' },
                { name: '好吧', role: '测试', num: 3, num1: 7546.7, num2: '7546.7' },
                { name: '老王11', role: '前端', num: 3, num1: 6897, num2: '6897' },
                { name: 'tfhn', role: '测试', num: 4, num1: 8957, num2: '8957' },
                { name: '踢fhz', role: '测试', num: 4, num1: 8957, num2: '8957' },
                { name: 'qtjh1111111', role: '前端', num: 4, num1: 56433.57, num2: '56433.57' },
                { name: 'lhfgt', role: '前端', num: 8, num1: 977, num2: '977' },
                { name: 'h小明111', role: '测试', num: 6, num1: 98477, num2: '98477' },
                { name: '小红11111', role: '后端', num: 9, num1: 67017, num2: '67017' },
                { name: 'tfhnhy', role: '测试', num: 4, num1: 8957, num2: '8957' },
                { name: '老徐11', role: '前端', num: 5, num1: 7364, num2: '7364' },
                { name: 'qth', role: '测试', num: 1, num1: 1573.7, num2: '1573.7' },
                { name: '小红1111', role: '前端', num: 4, num1: 16807, num2: '16807' },
                { name: '小红111', role: '前端', num: 2, num1: 744345.7, num2: '744345.7' },
                { name: '前任', role: '测试', num: 3, num1: 10957, num2: '10957' },
                { name: 'q老王1', role: '前端', num: 6, num1: 6737, num2: '6737' }
              ]
            }
          },
          methods: {
            getPinYin (str) {
              return str.split('').map(char => {
                switch (char.charAt(0)) {
                  case '老': return 'lao'
                  case '小': return 'xiao'
                  case '前': return 'qian'
                  case '好': return 'hao'
                  case '王': return 'wang'
                  case '红': return 'hong'
                  case '明': return 'ming'
                  case '吧': return 'ba'
                  case '踢': return 'ti'
                }
                return char.charAt(0)
              }).join('')
            },
            customSortMethod ({ data, sortList }) {
              const sortItem = sortList[0]
              // 取出第一个排序的列
              const { property, order } = sortItem
              let list = []
              if (order === 'asc' || order === 'desc') {
                if (property === 'name') {
                  // 例如：实现中英文混排，按照字母排序
                  list = data.sort((a, b) => {
                    return this.getPinYin(a.name).localeCompare(this.getPinYin(b.name))
                  })
                } else {
                  list = data.sort()
                }
              }
              if (order === 'desc') {
                list.reverse()
              }
              return list
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
          <vxe-table-column field="role" title="Role" sortable></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" sortable></vxe-table-column>
          <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
          <vxe-table-column field="address" title="Address" sortable></vxe-table-column>
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
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'test abc' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'test abc' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'test abc' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'test abc' }
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
    formatterNum2 ({ cellValue }) {
      return XEUtils.commafy(XEUtils.toNumber(cellValue), { digits: 2 })
    },
    sortNameMethod (a, b) {
      // 例如：名称不区分大小写的排序
      const v1 = (a.name || '').toLowerCase()
      const v2 = (b.name || '').toLowerCase()
      return v1 < v2 ? -1 : v1 > v2 ? 1 : 0
    },
    sortChangeEvent ({ property, order }) {
      console.info(property, order)
    },
    getPinYin (str) {
      return str.split('').map(char => {
        switch (char.charAt(0)) {
          case '老': return 'lao'
          case '小': return 'xiao'
          case '前': return 'qian'
          case '好': return 'hao'
          case '王': return 'wang'
          case '红': return 'hong'
          case '明': return 'ming'
          case '吧': return 'ba'
          case '踢': return 'ti'
        }
        return char.charAt(0)
      }).join('')
    },
    customSortMethod ({ data, sortList }) {
      const sortItem = sortList[0]
      // 取出第一个排序的列
      const { property, order } = sortItem
      let list = []
      if (order === 'asc' || order === 'desc') {
        if (property === 'name') {
          // 例如：实现中英文混排，按照字母排序
          list = data.sort((a, b) => {
            return this.getPinYin(a.name).localeCompare(this.getPinYin(b.name))
          })
        } else {
          list = data.sort()
        }
      }
      if (order === 'desc') {
        list.reverse()
      }
      return list
    }
  }
}
</script>
