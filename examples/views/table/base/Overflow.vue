<template>
  <div>
    <p>当内容或表头超过隐藏时显示为省略号，<table-column-api-link prop="show-overflow"/> 和 <table-api-link prop="show-header-overflow"/></p>
    <p><table-column-api-link prop="ellipsis"/> 当内容超过时显示为省略号</p>
    <p><table-column-api-link prop="title"/> 当内容超过时显示为省略号并用原生 title 显示</p>
    <p><table-column-api-link prop="tooltip"/> 当内容超过隐藏时显示为省略号并用 tooltip 显示</p>

    <vxe-table
      highlight-hover-row
      :data.sync="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column field="address" title="超过隐藏时显示为省略号————————————" show-header-overflow show-overflow></vxe-table-column>
      <vxe-table-column field="date" title="内容超过隐藏时显示为省略号并用原生 title 显示" show-overflow="title">
        <template>
          <span>111111111111 111111111111111111 22222222222222222222222222222222222</span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="age" title="表头超过隐藏时显示为省略号并用原生 title 显示" show-header-overflow="title">
        <template v-slot:header>
          <span>33333333333333333333333333 5555555555555555555555555555555555555555555555</span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p>使用 light 主题，通过 <table-api-link prop="tooltip-config"/> 参数配置</p>

    <vxe-table
      highlight-hover-row
      :data.sync="tableData"
      :tooltip-config="{theme: 'light'}">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column field="address" title="超过隐藏时显示为省略号————————————" show-header-overflow show-overflow></vxe-table-column>
      <vxe-table-column field="date" title="内容超过隐藏时显示为省略号并用原生 title 显示" show-overflow="title">
        <template>
          <span>111111111111 111111111111111111 22222222222222222222222222222222222</span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="age" title="表头超过隐藏时显示为省略号并用原生 title 显示" show-header-overflow="title">
        <template v-slot:header>
          <span>33333333333333333333333333 5555555555555555555555555555555555555555555555</span>
        </template>
      </vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
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
          highlight-hover-row
          :data.sync="tableData">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column field="address" title="超过隐藏时显示为省略号————————————" show-header-overflow show-overflow></vxe-table-column>
          <vxe-table-column field="date" title="内容超过隐藏时显示为省略号并用原生 title 显示" show-overflow="title">
            <template>
              <span>111111111111 111111111111111111 22222222222222222222222222222222222</span>
            </template>
          </vxe-table-column>
          <vxe-table-column field="age" title="表头超过隐藏时显示为省略号并用原生 title 显示" show-header-overflow="title">
            <template v-slot:header>
              <span>33333333333333333333333333 5555555555555555555555555555555555555555555555</span>
            </template>
          </vxe-table-column>
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
          }
        }
        `,
        `
        <vxe-table
          highlight-hover-row
          :data.sync="tableData"
          :tooltip-config="{theme: 'light'}">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column field="address" title="超过隐藏时显示为省略号————————————" show-header-overflow show-overflow></vxe-table-column>
          <vxe-table-column field="date" title="内容超过隐藏时显示为省略号并用原生 title 显示" show-overflow="title">
            <template>
              <span>111111111111 111111111111111111 22222222222222222222222222222222222</span>
            </template>
          </vxe-table-column>
          <vxe-table-column field="age" title="表头超过隐藏时显示为省略号并用原生 title 显示" show-header-overflow="title">
            <template v-slot:header>
              <span>33333333333333333333333333 5555555555555555555555555555555555555555555555</span>
            </template>
          </vxe-table-column>
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
          }
        }
        `
      ]
    }
  },
  created () {
    let list = window.MOCK_DATA_LIST.slice(0, 6)
    this.tableData = list
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
