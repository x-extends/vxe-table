<template>
  <div>
    <p>通过设置 <table-api-link prop="resizable"/> 属性可以启用所有列宽拖动</p>
    <p>也可以通过给列设置 <table-column-api-link prop="resizable"/> 属性控制列是否允许拖动</p>

    <vxe-table
      resizable
      :data.sync="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="age" label="Age"></vxe-table-column>
      <vxe-table-column prop="time" label="Time"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p>横向滚动条</p>

    <vxe-table
      border
      resizable
      highlight-hover-row
      :data.sync="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" width="300"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex" width="300"></vxe-table-column>
      <vxe-table-column prop="age" label="Age" width="300"></vxe-table-column>
      <vxe-table-column prop="time" label="Time" width="300"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" width="300" show-overflow></vxe-table-column>
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
          resizable
          :data.sync="tableData">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column prop="name" label="Name"></vxe-table-column>
          <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
          <vxe-table-column prop="age" label="Age"></vxe-table-column>
          <vxe-table-column prop="time" label="Time"></vxe-table-column>
          <vxe-table-column prop="address" label="Address" show-overflow></vxe-table-column>
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
          border
          resizable
          highlight-hover-row
          :data.sync="tableData">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column prop="name" label="Name" width="300"></vxe-table-column>
          <vxe-table-column prop="sex" label="Sex" width="300"></vxe-table-column>
          <vxe-table-column prop="age" label="Age" width="300"></vxe-table-column>
          <vxe-table-column prop="time" label="Time" width="300"></vxe-table-column>
          <vxe-table-column prop="address" label="Address" width="300" show-overflow></vxe-table-column>
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
  }
}
</script>
