<template>
  <div>
    <p class="tip">
      局部自定义 <table-column-api-link prop="formatter"/> 格式化内容<br>
      <span class="red">（注：<table-column-api-link prop="formatter"/> 只会在指定的 <table-column-api-link prop="field"/> 值发生改变时触发格式化，如果想要多字段关联变化请使用<router-link class="nav-link" :to="{name: 'TableTemplate'}">自定义模板</router-link>）</span>
    </p>

    <vxe-table
      border
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
      <vxe-table-column field="num" title="Num" :formatter="formatterNum" sortable></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :formatter="formatterSex" sortable></vxe-table-column>
      <vxe-table-column field="time" title="Time" :formatter="formatTime"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">
      全局格式化内容，使用 <router-link class="link" :to="{name: 'FormatsAPI'}">formats</router-link> 添加格式函数，单元格会在渲染的时候自动调用<br>
      <span class="green">（用于实现业务中统一的格式化处理，这对于很多场景非常有用，减少很多不必要的重复代码）</span>
    </p>

    <vxe-table
      border
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="date" title="转日期" width="180" formatter="formatDate"></vxe-table-column>
      <vxe-table-column field="time" title="转日期格式" width="140" :formatter="['formatDate', 'yyyy-MM-dd']"></vxe-table-column>
      <vxe-table-column field="amount" title="格式化金额" formatter="formatAmount"></vxe-table-column>
      <vxe-table-column field="bankCard" title="银行卡" width="180" formatter="formatBankcard"></vxe-table-column>
      <vxe-table-column field="num7" title="数值"></vxe-table-column>
      <vxe-table-column field="num8" title="截取2位数" formatter="formatCutNumber"></vxe-table-column>
      <vxe-table-column field="num9" title="四舍五入2位数" formatter="formatFixedNumber"></vxe-table-column>
      <vxe-table-column field="sex" title="格式化性别" formatter="formatSex"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="javascript">{{ demoCodes[2] }}</code>
      <code class="xml">{{ demoCodes[3] }}</code>
      <code class="javascript">{{ demoCodes[4] }}</code>
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
        { id: 10001, name: 'Test1', bankCard: '6222525678789432', sex: '0', time: 1599320111520, date: '2020-11-14T07:14:41.000Z', amount: 998.3, num: 863.345, num7: 863.345, num8: 863.345, num9: 863.345 },
        { id: 10002, name: 'Test2', bankCard: '6222525675674564', sex: '1', time: 1590820967410, date: '2022-10-24T08:14:18.000Z', amount: 777776536.3, num: 854.7789, num7: 854.7789, num8: 854.7789, num9: 854.7789 },
        { id: 10003, name: 'Test3', bankCard: '6222525477686963', sex: '0', time: 1599390785410, date: '2020-09-04T06:08:25.000Z', amount: 253.486, num: 963.1456, num7: 963.1456, num8: 963.1456, num9: 963.1456 },
        { id: 10004, name: 'Test4', bankCard: '6222525678678946', sex: '1', time: 1597385230710, date: '2019-10-20T20:40:20.000Z', amount: 9990000.66, num: 963.9856, num7: 963.9856, num8: 963.9856, num9: 963.9856 },
        { id: 10005, name: 'Test5', bankCard: '6222525478909009', sex: '0', time: 1591627586920, date: '2020-09-17T11:14:18.000Z', amount: 10000.35, num: 99.845632, num7: 99.845632, num8: 99.845632, num9: 99.845632 },
        { id: 10006, name: 'Test6', bankCard: '6222525789898793', sex: '1', time: 1599728569710, date: '2021-01-04T10:12:18.000Z', amount: 999, num: 698.3689, num7: 698.3689, num8: 698.3689, num9: 698.3689 },
        { id: 10007, name: 'Test7', bankCard: '6222525476534534', sex: '1', time: 1590740052710, date: '2020-08-10T08:14:18.000Z', amount: 458666.3, num: 1000.3658, num7: 1000.3658, num8: 1000.3658, num9: 1000.3658 },
        { id: 10008, name: 'Test8', bankCard: '6222525445554231', sex: '0', time: 1599320425610, date: '2020-05-04T07:17:30.000Z', amount: 79999935.6, num: 600053.32845, num7: 600053.32845, num8: 600053.32845, num9: 600053.32845 }
      ],
      sexList: [
        {
          label: '女',
          value: '0'
        },
        {
          label: '男',
          value: '1'
        }
      ],
      demoCodes: [
        `
        <vxe-table
          border
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
          <vxe-table-column field="num" title="Num" :formatter="formatterNum" sortable></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :formatter="formatterSex" sortable></vxe-table-column>
          <vxe-table-column field="time" title="Time" :formatter="formatTime"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', bankCard: '6222525678789432', sex: '0', time: 1599320111520, date: '2020-11-14T07:14:41.000Z', amount: 998.3, num: 863.345, num7: 863.345, num8: 863.345, num9: 863.345 },
                { id: 10002, name: 'Test2', bankCard: '6222525675674564', sex: '1', time: 1590820967410, date: '2022-10-24T08:14:18.000Z', amount: 777776536.3, num: 854.7789, num7: 854.7789, num8: 854.7789, num9: 854.7789 },
                { id: 10003, name: 'Test3', bankCard: '6222525477686963', sex: '0', time: 1599390785410, date: '2020-09-04T06:08:25.000Z', amount: 253.486, num: 963.1456, num7: 963.1456, num8: 963.1456, num9: 963.1456 },
                { id: 10004, name: 'Test4', bankCard: '6222525678678946', sex: '1', time: 1597385230710, date: '2019-10-20T20:40:20.000Z', amount: 9990000.66, num: 963.9856, num7: 963.9856, num8: 963.9856, num9: 963.9856 },
                { id: 10005, name: 'Test5', bankCard: '6222525478909009', sex: '0', time: 1591627586920, date: '2020-09-17T11:14:18.000Z', amount: 10000.35, num: 99.845632, num7: 99.845632, num8: 99.845632, num9: 99.845632 },
                { id: 10006, name: 'Test6', bankCard: '6222525789898793', sex: '1', time: 1599728569710, date: '2021-01-04T10:12:18.000Z', amount: 999, num: 698.3689, num7: 698.3689, num8: 698.3689, num9: 698.3689 },
                { id: 10007, name: 'Test7', bankCard: '6222525476534534', sex: '1', time: 1590740052710, date: '2020-08-10T08:14:18.000Z', amount: 458666.3, num: 1000.3658, num7: 1000.3658, num8: 1000.3658, num9: 1000.3658 },
                { id: 10008, name: 'Test8', bankCard: '6222525445554231', sex: '0', time: 1599320425610, date: '2020-05-04T07:17:30.000Z', amount: 79999935.6, num: 600053.32845, num7: 600053.32845, num8: 600053.32845, num9: 600053.32845 }
              ],
              sexList: [
                {
                  label: '女',
                  value: '0'
                },
                {
                  label: '男',
                  value: '1'
                }
              ]
            }
          },
          methods: {
            formatterNum ({ cellValue }) {
              return XEUtils.commafy(XEUtils.toNumber(cellValue), { digits: 2 })
            },
            formatterSex ({ cellValue }) {
              let item = this.sexList.find(item => item.value === cellValue)
              return item ? item.label : ''
            },
            formatTime ({ cellValue, row, column }) {
              return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:ss:mm')
            }
          }
        }
        `,
        `
        // 自定义全局的格式化处理函数
        VXETable.formats.mixin({
          // 格式化性别
          formatSex ({ cellValue }) {
            return cellValue ? (cellValue === '1' ? '男' : '女') : ''
          },
          // 格式化下拉选项
          formatSelect ({ cellValue }, list) {
            const item = list.find(item => item.value === cellValue)
            return item ? item.label : ''
          },
          // 格式化日期，默认 yyyy-MM-dd HH:mm:ss
          formatDate ({ cellValue }, format) {
            return XEUtils.toDateString(cellValue, format || 'yyyy-MM-dd HH:mm:ss')
          },
          // 四舍五入金额，每隔3位逗号分隔，默认2位数
          formatAmount ({ cellValue }, digits = 2) {
            return XEUtils.commafy(XEUtils.toNumber(cellValue), { digits: digits })
          },
          // 格式化银行卡，默认每4位空格隔开
          formatBankcard ({ cellValue }) {
            return XEUtils.commafy(XEUtils.toString(cellValue), { spaceNumber: 4, separator: ' ' })
          },
          // 四舍五入,默认两位数
          formatFixedNumber ({ cellValue }, digits = 2) {
            return XEUtils.toFixed(XEUtils.round(cellValue, digits), digits)
          },
          // 向下舍入,默认两位数
          formatCutNumber ({ cellValue }, digits = 2) {
            return XEUtils.toFixed(XEUtils.floor(cellValue, digits), digits)
          },
          // 转换 moment 类型为字符串
          toMomentString ({ cellValue }, format) {
            return cellValue ? cellValue.format(format) : ''
          }
        })
        `,
        `
        <vxe-table
          border
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="date" title="转日期" width="180" formatter="formatDate"></vxe-table-column>
          <vxe-table-column field="time" title="转日期格式" width="140" :formatter="['formatDate', 'yyyy-MM-dd']"></vxe-table-column>
          <vxe-table-column field="amount" title="格式化金额" formatter="formatAmount"></vxe-table-column>
          <vxe-table-column field="bankCard" title="银行卡" width="180" formatter="formatBankcard"></vxe-table-column>
          <vxe-table-column field="num7" title="数值"></vxe-table-column>
          <vxe-table-column field="num8" title="截取2位数" formatter="formatCutNumber"></vxe-table-column>
          <vxe-table-column field="num9" title="四舍五入2位数" formatter="formatFixedNumber"></vxe-table-column>
          <vxe-table-column field="sex" title="格式化性别" formatter="formatSex"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', bankCard: '6222525678789432', sex: '0', time: 1599320111520, date: '2020-11-14T07:14:41.000Z', amount: 998.3, num: 863.345, num7: 863.345, num8: 863.345, num9: 863.345 },
                { id: 10002, name: 'Test2', bankCard: '6222525675674564', sex: '1', time: 1590820967410, date: '2022-10-24T08:14:18.000Z', amount: 777776536.3, num: 854.7789, num7: 854.7789, num8: 854.7789, num9: 854.7789 },
                { id: 10003, name: 'Test3', bankCard: '6222525477686963', sex: '0', time: 1599390785410, date: '2020-09-04T06:08:25.000Z', amount: 253.486, num: 963.1456, num7: 963.1456, num8: 963.1456, num9: 963.1456 },
                { id: 10004, name: 'Test4', bankCard: '6222525678678946', sex: '1', time: 1597385230710, date: '2019-10-20T20:40:20.000Z', amount: 9990000.66, num: 963.9856, num7: 963.9856, num8: 963.9856, num9: 963.9856 },
                { id: 10005, name: 'Test5', bankCard: '6222525478909009', sex: '0', time: 1591627586920, date: '2020-09-17T11:14:18.000Z', amount: 10000.35, num: 99.845632, num7: 99.845632, num8: 99.845632, num9: 99.845632 },
                { id: 10006, name: 'Test6', bankCard: '6222525789898793', sex: '1', time: 1599728569710, date: '2021-01-04T10:12:18.000Z', amount: 999, num: 698.3689, num7: 698.3689, num8: 698.3689, num9: 698.3689 },
                { id: 10007, name: 'Test7', bankCard: '6222525476534534', sex: '1', time: 1590740052710, date: '2020-08-10T08:14:18.000Z', amount: 458666.3, num: 1000.3658, num7: 1000.3658, num8: 1000.3658, num9: 1000.3658 },
                { id: 10008, name: 'Test8', bankCard: '6222525445554231', sex: '0', time: 1599320425610, date: '2020-05-04T07:17:30.000Z', amount: 79999935.6, num: 600053.32845, num7: 600053.32845, num8: 600053.32845, num9: 600053.32845 }
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
    formatterNum ({ cellValue }) {
      return XEUtils.commafy(XEUtils.toNumber(cellValue), { digits: 2 })
    },
    formatterSex ({ cellValue }) {
      const item = this.sexList.find(item => item.value === cellValue)
      return item ? item.label : ''
    },
    formatTime ({ cellValue }) {
      return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:ss:mm')
    }
  }
}
</script>
