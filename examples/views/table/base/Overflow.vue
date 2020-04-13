<template>
  <div>
    <p class="tip">
      当内容或表头超过隐藏时显示为省略号，<table-column-api-link prop="show-overflow"/> 和 <table-api-link prop="show-header-overflow"/> 和 <table-api-link prop="show-footer-overflow"/><br>
      <table-column-api-link prop="ellipsis"/> 当内容超过时显示为省略号<br>
      <table-column-api-link prop="title"/> 当内容超过时显示为省略号并用原生 title 显示<br>
      <table-column-api-link prop="tooltip"/> 当内容超过隐藏时显示为省略号并用 tooltip 显示<br>
      还可以通过 <table-api-link prop="enterable"/> 开启鼠标是否可进入到 tooltip 中
    </p>

    <vxe-table
      show-footer
      highlight-hover-row
      :footer-method="footerMethod"
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="名称"></vxe-table-column>
      <vxe-table-column field="address" title="内容和标题显示 tooltip" width="160" show-header-overflow show-overflow></vxe-table-column>
      <vxe-table-column field="date" title="内容显示原生 title" show-overflow="title" show-footer-overflow>
        <template>
          <span style="white-space: pre-line;" v-html="`111111111111\n换行换行换行换行换行\n22222222222`"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="rate" title="Rate" show-header-overflow="title">
        <template v-slot:header>
          <span>标题显示原生 title ___________________________</span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="address" title="不换行不换行不换行不换行不换行不换行不换行不换行不换行" width="160" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">使用 light 主题，通过 <table-api-link prop="tooltip-config"/> 参数配置</p>

    <vxe-table
      border
      show-footer
      show-header-overflow
      highlight-hover-row
      :footer-method="footerMethod"
      :data="tableData"
      :tooltip-config="{theme: 'light'}">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="名称"></vxe-table-column>
      <vxe-table-column field="address" title="显示为省略号_____________" width="160" show-header-overflow="ellipsis" show-overflow="ellipsis"></vxe-table-column>
      <vxe-table-column field="date" title="显示 tooltip" show-overflow show-footer-overflow>
        <template>
          <span v-html="`超出隐藏,tooltip支持换行\n111111111111\n换行换行换行换行换行\n33333333333333`"></span>
        </template>
      </vxe-table-column>
      <vxe-table-column title="基本信息">
        <vxe-table-column field="rate" title="表头超过隐藏时显示为省略号并用原生 title 显示" show-header-overflow="title">
          <template v-slot:header>
            <span>33333333333333333333333333 5555555555555555555555555555555555555555555555</span>
          </template>
        </vxe-table-column>
        <vxe-table-column title="详细信息">
          <vxe-table-column field="address" title="Address" width="160" show-overflow></vxe-table-column>
        </vxe-table-column>
      </vxe-table-column>
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

export default {
  data () {
    return {
      tableData: [],
      demoCodes: [
        `
        <vxe-table
          show-footer
          highlight-hover-row
          :footer-method="footerMethod"
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="名称"></vxe-table-column>
          <vxe-table-column field="address" title="内容和标题显示 tooltip" width="160" show-header-overflow show-overflow></vxe-table-column>
          <vxe-table-column field="date" title="内容显示原生 title" show-overflow="title" show-footer-overflow>
            <template>
              <span style="white-space: pre-line;" v-html="\`111111111111\\n换行换行换行换行换行\\n22222222222\`"></span>
            </template>
          </vxe-table-column>
          <vxe-table-column field="rate" title="Rate" show-header-overflow="title">
            <template v-slot:header>
              <span>标题显示原生 title ___________________________</span>
            </template>
          </vxe-table-column>
          <vxe-table-column field="address" title="不换行不换行不换行不换行不换行不换行不换行不换行不换行" width="160" show-overflow></vxe-table-column>
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
          methods:{
            footerMethod ({ columns, data }) {
              const footerData = [
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '合计'
                  }
                  if (['date'].includes(column.property)) {
                    return '说明 xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
                  }
                  if (['rate'].includes(column.property)) {
                    return XEUtils.sum(data, column.property)
                  }
                  return null
                })
              ]
              return footerData
            }
          }
        }
        `,
        `
        <vxe-table
          border
          show-footer
          show-header-overflow
          highlight-hover-row
          :footer-method="footerMethod"
          :data="tableData"
          :tooltip-config="{theme: 'light'}">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="名称"></vxe-table-column>
          <vxe-table-column field="address" title="显示为省略号_____________" width="160" show-header-overflow="ellipsis" show-overflow="ellipsis"></vxe-table-column>
          <vxe-table-column field="date" title="显示 tooltip" show-overflow show-footer-overflow>
            <template>
              <span v-html="\`超出隐藏,tooltip支持换行\\n111111111111\\n换行换行换行换行换行\\n33333333333333\`"></span>
            </template>
          </vxe-table-column>
          <vxe-table-column title="基本信息">
            <vxe-table-column field="rate" title="表头超过隐藏时显示为省略号并用原生 title 显示" show-header-overflow="title">
              <template v-slot:header>
                <span>33333333333333333333333333 5555555555555555555555555555555555555555555555</span>
              </template>
            </vxe-table-column>
            <vxe-table-column title="详细信息">
              <vxe-table-column field="address" title="Address" width="160" show-overflow></vxe-table-column>
            </vxe-table-column>
          </vxe-table-column>
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
          methods:{
            footerMethod ({ columns }) {
              const footerData = [
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '合计'
                  }
                  if (['date'].includes(column.property)) {
                    return '说明 xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
                  }
                  if (['rate'].includes(column.property)) {
                    return '不想换行不想换行不想换行不想换行不想换行不想换行不想换行不想换行'
                  }
                  return null
                })
              ]
              return footerData
            }
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
    footerMethod ({ columns }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '合计'
          }
          if (['date'].includes(column.property)) {
            return '说明 xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
          }
          if (['rate'].includes(column.property)) {
            return '不想换行不想换行不想换行不想换行不想换行不想换行不想换行不想换行'
          }
          return null
        })
      ]
      return footerData
    }
  }
}
</script>
