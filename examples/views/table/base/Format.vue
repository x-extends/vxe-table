<template>
  <div>
    <p>局部自定义 <table-column-api-link prop="formatter"/> 格式化内容（建议是提前转换好数据，<table-column-api-link prop="formatter"/> 一般用于动态的数据，跟随数据的变化而执行）</p>

    <vxe-table
      border
      :data.sync="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="time" title="Time" :formatter="formatTime"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p>全局格式化内容，会在需要的时候自动调用对应 <a class="link" href="https://xuliangzhan.github.io/xe-utils/#/" target="_blank">xe-utils</a> 的方法进行数据处理</p>
    <p>可以通过自定义函数实现统一的格式化处理，这对于很多场景非常有用，减少很多不必要的重复代码</p>

    <vxe-table
      border
      :data.sync="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column field="date" title="转日期" formatter="toDateString"></vxe-table-column>
      <vxe-table-column field="time" title="转日期格式" :formatter="['toDateString', 'yyyy-MM-dd']"></vxe-table-column>
      <vxe-table-column field="num" title="转整数" formatter="toInteger"></vxe-table-column>
      <vxe-table-column field="num" title="截取两位小数" :formatter="['toFixedString', 2]"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      tableData: [],
      demoCodes: [
        `
        <vxe-table
          border
          :data.sync="tableData">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="time" title="Time" :formatter="formatTime"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
          },
          methods: {
            formatTime ({ cellValue, row, column }) {
              return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:ss:mm')
            }
          }
        }
        `,
        `
        <vxe-table
          border
          :data.sync="tableData">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column field="date" title="转日期" formatter="toDateString"></vxe-table-column>
          <vxe-table-column field="time" title="转日期格式" :formatter="['toDateString', 'yyyy-MM-dd']"></vxe-table-column>
          <vxe-table-column field="num" title="转整数" formatter="toInteger"></vxe-table-column>
          <vxe-table-column field="num" title="截取两位小数" :formatter="['toFixedString', 2]"></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    formatTime ({ cellValue, row, column }) {
      return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:ss:mm')
    }
  }
}
</script>
