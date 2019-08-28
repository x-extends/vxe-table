<template>
  <div>
    <p class="tip">
      当一个表格需要铺满父容器时，这个功能将非常有用<br>
      通过设置 <table-api-link prop="height"/>=auto表格会相对于父容器的高度去铺满，但是只会在数据重新加载时才会计算<br>
      还可以根据不同场景添加 <table-api-link prop="auto-resize"/> 属性启用自动监听（<table-api-link prop="auto-resize"/> 会有额外的损耗，根据需要的场景添加），这样就只需要通过样式控制父容器高度就可以实现响应式表格
    </p>

    <div style="height: 600px">
      <vxe-table
        border
        height="auto"
        :data="tableData">
        <vxe-table-column type="index" width="60"></vxe-table-column>
        <vxe-table-column field="name" title="Name"></vxe-table-column>
        <vxe-table-column field="sex" title="Sex"></vxe-table-column>
        <vxe-table-column field="age" title="Age"></vxe-table-column>
        <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
      </vxe-table>
    </div>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p>也可以设置相对于父容器的百分比</p>

    <div style="height: 600px">
      <vxe-table
        border
        height="40%"
        :data="tableData">
        <vxe-table-column type="index" width="60"></vxe-table-column>
        <vxe-table-column field="name" title="Name"></vxe-table-column>
        <vxe-table-column field="sex" title="Sex"></vxe-table-column>
        <vxe-table-column field="age" title="Age"></vxe-table-column>
        <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
      </vxe-table>
      <vxe-table
        border
        height="60%"
        :data="tableData">
        <vxe-table-column type="index" width="60"></vxe-table-column>
        <vxe-table-column field="name" title="Name"></vxe-table-column>
        <vxe-table-column field="sex" title="Sex"></vxe-table-column>
        <vxe-table-column field="age" title="Age"></vxe-table-column>
        <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
      </vxe-table>
    </div>

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
        <div style="height: 600px">
          <vxe-table
            border
            height="auto"
            :data="tableData">
            <vxe-table-column type="index" width="60"></vxe-table-column>
            <vxe-table-column field="name" title="Name"></vxe-table-column>
            <vxe-table-column field="sex" title="Sex"></vxe-table-column>
            <vxe-table-column field="age" title="Age"></vxe-table-column>
            <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
          </vxe-table>
        </div>
        `,
        `
        export default {
          data () {
            return {
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
          }
        }
        `,
        `
        <div style="height: 600px">
          <vxe-table
            border
            height="40%"
            :data="tableData">
            <vxe-table-column type="index" width="60"></vxe-table-column>
            <vxe-table-column field="name" title="Name"></vxe-table-column>
            <vxe-table-column field="sex" title="Sex"></vxe-table-column>
            <vxe-table-column field="age" title="Age"></vxe-table-column>
            <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
          </vxe-table>
          <vxe-table
            border
            height="60%"
            :data="tableData">
            <vxe-table-column type="index" width="60"></vxe-table-column>
            <vxe-table-column field="name" title="Name"></vxe-table-column>
            <vxe-table-column field="sex" title="Sex"></vxe-table-column>
            <vxe-table-column field="age" title="Age"></vxe-table-column>
            <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
          </vxe-table>
        </div>
        `,
        `
        export default {
          data () {
            return {
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
