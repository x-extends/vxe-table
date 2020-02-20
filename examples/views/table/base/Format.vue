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
      <vxe-table-column field="sex" title="Sex" :formatter="formatterSex"></vxe-table-column>
      <vxe-table-column field="time" title="Time" :formatter="formatTime"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">
      全局格式化内容，基于 <a class="link" href="https://xuliangzhan.github.io/xe-utils/#/" target="_blank">xe-utils</a> 函数库挂载方法进行数据处理，会在渲染的时候自动调用<br>
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
      <vxe-table-column field="num7" title="截取2位数" formatter="formatCutFixed"></vxe-table-column>
      <vxe-table-column field="num7" title="四舍五入2位数" formatter="formatFixed"></vxe-table-column>
      <vxe-table-column field="sex" title="格式化性别" :formatter="['formatSelect', sexList]"></vxe-table-column>
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

// 自定义全局的格式化处理函数
XEUtils.mixin({
  // 格式化下拉选项
  formatSelect (cellValue, list) {
    let item = list.find(item => item.value === cellValue)
    return item ? item.label : ''
  },
  // 格式化日期，默认 yyyy-MM-dd HH:mm:ss
  formatDate (cellValue, format) {
    return XEUtils.toDateString(cellValue, format || 'yyyy-MM-dd HH:mm:ss')
  },
  // 格式金额，默认2位数
  formatAmount (cellValue, digits) {
    return XEUtils.commafy(cellValue, { digits: digits || 2 })
  },
  // 格式化银行卡，默认每4位隔开
  formatBankcard (cellValue) {
    return XEUtils.commafy(cellValue, { spaceNumber: 4, separator: ' ' })
  },
  // 四舍五入,默认两位数
  formatFixed (cellValue, digits) {
    return XEUtils.toNumber(cellValue).toFixed(digits || 2)
  },
  // 截取小数,默认两位数
  formatCutFixed (cellValue, digits) {
    return XEUtils.toFixedString(cellValue, digits || 2)
  }
})

export default {
  data () {
    return {
      tableData: [],
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
          <vxe-table-column field="date" title="转日期" width="180" formatter="formatDate"></vxe-table-column>
          <vxe-table-column field="time" title="转日期格式" width="140" :formatter="['formatDate', 'yyyy-MM-dd']"></vxe-table-column>
          <vxe-table-column field="amount" title="格式化金额" formatter="formatAmount"></vxe-table-column>
          <vxe-table-column field="bankCard" title="银行卡" width="180" formatter="formatBankcard"></vxe-table-column>
          <vxe-table-column field="num7" title="数值"></vxe-table-column>
          <vxe-table-column field="num7" title="截取2位数" :formatter="['toFixedString', 2]"></vxe-table-column>
          <vxe-table-column field="num7" title="四舍五入2位数" formatter="formatFixed"></vxe-table-column>
          <vxe-table-column field="sex" title="格式化性别" :formatter="['formatSelect', sexList]"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
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
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
          },
          methods: {
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
        <vxe-table
          border
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="date" title="转日期" width="180" formatter="formatDate"></vxe-table-column>
          <vxe-table-column field="time" title="转日期格式" width="140" :formatter="['formatDate', 'yyyy-MM-dd']"></vxe-table-column>
          <vxe-table-column field="amount" title="格式化金额" formatter="formatAmount"></vxe-table-column>
          <vxe-table-column field="bankCard" title="银行卡" width="180" formatter="formatBankcard"></vxe-table-column>
          <vxe-table-column field="num7" title="截取2位数" formatter="formatCutFixed"></vxe-table-column>
          <vxe-table-column field="num7" title="四舍五入2位数" formatter="formatFixed"></vxe-table-column>
          <vxe-table-column field="sex" title="格式化性别" :formatter="['formatSelect', sexList]"></vxe-table-column>
        </vxe-table>
        `,
        `
        // 自定义全局的格式化处理函数
        XEUtils.mixin({
          // 格式化下拉选项
          formatSelect (cellValue, list) {
            let item = list.find(item => item.value === cellValue)
            return item ? item.label : ''
          },
          // 格式化日期，默认 yyyy-MM-dd HH:mm:ss
          formatDate (cellValue, format) {
            return XEUtils.toDateString(cellValue, format || 'yyyy-MM-dd HH:mm:ss')
          },
          // 格式金额，默认2位数
          formatAmount (cellValue, digits) {
            return XEUtils.commafy(cellValue, { digits: digits || 2 })
          },
          // 格式化银行卡，默认每4位隔开
          formatBankcard (cellValue) {
            return XEUtils.commafy(cellValue, { spaceNumber: 4, separator: ' ' })
          },
          // 四舍五入,默认两位数
          formatFixed (cellValue, digits) {
            return XEUtils.toNumber(cellValue).toFixed(digits || 2)
          },
          // 截取小数,默认两位数
          formatCutFixed (cellValue, digits) {
            return XEUtils.toFixedString(cellValue, digits || 2)
          }
        })

        export default {
          data () {
            return {
              tableData: [],
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
    formatterSex ({ cellValue }) {
      let item = this.sexList.find(item => item.value === cellValue)
      return item ? item.label : ''
    },
    formatTime ({ cellValue, row, column }) {
      return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:ss:mm')
    }
  }
}
</script>
