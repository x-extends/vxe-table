<template>
  <div>
    <p class="tip">分组表头<br><span class="red">（注：分组表头不支持横向虚拟滚动，设置 scroll-x={gt: -1} 关闭即可）</span></p>

    <vxe-table
      border
      resizable
      show-overflow
      ref="xTable"
      height="500"
      :scroll-x="{gt: -1}"
      :loading="loading"
      :data="tableData">
      <vxe-table-column type="seq" title="序号" width="100"></vxe-table-column>
      <vxe-table-column title="基本信息">
        <vxe-table-column field="name" title="Name" width="200" sortable></vxe-table-column>
        <vxe-table-column field="age" title="Age" width="200"></vxe-table-column>
        <vxe-table-column field="sex" title="Sex" width="200"></vxe-table-column>
      </vxe-table-column>
      <vxe-table-column title="详细信息">
        <vxe-table-column title="分组">
          <vxe-table-column field="rate" title="Rate" width="200"></vxe-table-column>
          <vxe-table-column field="region" title="Region" width="200"></vxe-table-column>
        </vxe-table-column>
        <vxe-table-column title="其他">
          <vxe-table-column field="time" title="Time" width="200" sortable></vxe-table-column>
          <vxe-table-column field="address" title="Address" width="300" show-overflow></vxe-table-column>
        </vxe-table-column>
      </vxe-table-column>
      <vxe-table-column field="updateTime" title="UpdateTime" width="200"></vxe-table-column>
      <vxe-table-column field="createTime" title="CreateTime" width="200"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import XEAjax from 'xe-ajax'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      loading: false,
      tableData: [],
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          show-overflow
          ref="xTable"
          height="500"
          :scroll-x="{gt: -1}"
          :loading="loading"
          :data="tableData">
          <vxe-table-column type="seq" title="序号" width="100"></vxe-table-column>
          <vxe-table-column title="基本信息">
            <vxe-table-column field="name" title="Name" width="200" sortable></vxe-table-column>
            <vxe-table-column field="age" title="Age" width="200"></vxe-table-column>
            <vxe-table-column field="sex" title="Sex" width="200"></vxe-table-column>
          </vxe-table-column>
          <vxe-table-column title="详细信息">
            <vxe-table-column title="分组">
              <vxe-table-column field="rate" title="Rate" width="200"></vxe-table-column>
              <vxe-table-column field="region" title="Region" width="200"></vxe-table-column>
            </vxe-table-column>
            <vxe-table-column title="其他">
              <vxe-table-column field="time" title="Time" width="200" sortable></vxe-table-column>
              <vxe-table-column field="address" title="Address" width="300" show-overflow></vxe-table-column>
            </vxe-table-column>
          </vxe-table-column>
          <vxe-table-column field="updateTime" title="UpdateTime" width="200"></vxe-table-column>
          <vxe-table-column field="createTime" title="CreateTime" width="200"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tableData: []
            }
          },
          created () {
            this.loading = true
            XEAjax.mockList(1000).then(data => {
              this.loading = false
              this.tableData = data
            })
          }
        }
        `
      ]
    }
  },
  created () {
    this.loading = true
    XEAjax.mockList(1000).then(data => {
      this.loading = false
      this.tableData = data
    })
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
