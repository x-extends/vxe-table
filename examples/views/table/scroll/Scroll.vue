<template>
  <div>
    <p>海量数据</p>
    <p>大数据不建议使用双向绑定的 data 属性（vue 监听会大数据会短暂的卡顿），建议使用 load 函数</p>
    <p>实际渲染速度受以下影响：多选(超严重)、固定列(严重)、底部合计(中度)、数据运算量(轻度)、任何双向的数据或函数都会影响加载速度</p>
    <p>数据超大情况下必须使用：show-all-overflow,show-header-all-overflow 参数以及调整好 optimized：scrollX,scrollY 适合的参数可以更加流畅</p>

    <vxe-table
      border
      highlight-hover-row
      height="300"
      :data.sync="tableData">
      <vxe-table-column type="index" width="100"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" sortable></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="age" label="Age"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">显示代码</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p>高级配置项</p>
    <p>参数 scrollY: {gt: 500, oSize: 30, rSize: 120}，当超过 500 条时自动启用滚动渲染</p>
    <p>gt大于条数时启用，oSize低于剩余条数重新渲染r，Size渲染条数</p>
    <p>优点可以流畅支持海量数据；缺点是通过滚动条拖动过快时无法实时显示效果</p>

    <vxe-table
      border
      show-all-overflow
      height="300"
      :loading="loading"
      :data.sync="tableData2">
      <vxe-table-column type="index" width="100"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" sortable></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="age" label="Age"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">显示代码</p>

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
      loading: false,
      tableData: [],
      tableData2: [],
      demoCodes: [
        `
        <vxe-table
          border
          highlight-hover-row
          height="300"
          :data.sync="tableData">
          <vxe-table-column type="index" width="100"></vxe-table-column>
          <vxe-table-column prop="name" label="Name" sortable></vxe-table-column>
          <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
          <vxe-table-column prop="age" label="Age"></vxe-table-column>
          <vxe-table-column prop="address" label="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              tableData2: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 200)
            this.tableData2 = window.MOCK_DATA_LIST.slice(0, 1000)
          }
        }
        `,
        `
        <vxe-table
          border
          show-all-overflow
          height="300"
          :data.sync="tableData2">
          <vxe-table-column type="index" width="100"></vxe-table-column>
          <vxe-table-column prop="name" label="Name" sortable></vxe-table-column>
          <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
          <vxe-table-column prop="age" label="Age"></vxe-table-column>
          <vxe-table-column prop="address" label="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              tableData2: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 200)
            this.tableData2 = window.MOCK_DATA_LIST.slice(0, 1000)
          }
        }
        `
      ]
    }
  },
  created () {
    let list = window.MOCK_DATA_LIST.slice(0, 200)
    this.tableData = list
    this.loading = true
    setTimeout(() => {
      this.tableData2 = window.MOCK_DATA_LIST.slice(0, 10000)
      this.loading = false
    }, 200)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
