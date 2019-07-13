<template>
  <div>
    <p>通过设置 <table-api-link prop="resizable"/> 属性可以启用所有列宽拖动</p>
    <p>也可以通过给列设置 <table-column-api-link prop="resizable"/> 属性控制列是否允许拖动</p>

    <vxe-table
      resizable
      :data.sync="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="time" title="Time"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
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
      <vxe-table-column field="name" title="Name" width="300"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" width="300"></vxe-table-column>
      <vxe-table-column field="age" title="Age" width="300"></vxe-table-column>
      <vxe-table-column field="time" title="Time" width="300"></vxe-table-column>
      <vxe-table-column field="address" title="Address" width="300" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>

    <p>固定列宽拖动</p>

    <vxe-table
      border
      resizable
      :data.sync="tableData">
      <vxe-table-column type="index" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column field="name" title="Name" width="100" fixed="left"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" width="100" fixed="left"></vxe-table-column>
      <vxe-table-column field="age" title="Age" width="100" fixed="left"></vxe-table-column>
      <vxe-table-column field="atrr1" title="atrr1" width="200"></vxe-table-column>
      <vxe-table-column field="atrr2" title="atrr2" width="200"></vxe-table-column>
      <vxe-table-column field="atrr3" title="atrr3" width="200"></vxe-table-column>
      <vxe-table-column field="atrr4" title="atrr4" width="200"></vxe-table-column>
      <vxe-table-column field="time" title="Time" width="200"></vxe-table-column>
      <vxe-table-column field="address" title="Address" width="200" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[3] }}</code>
      <code class="javascript">{{ demoCodes[4] }}</code>
    </pre>

    <p>左右固定列宽拖动</p>

    <vxe-table
      border
      resizable
      show-overflow
      show-header-overflow
      :data.sync="tableData">
      <vxe-table-column type="index" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column field="name" title="Name" width="100" fixed="left"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" width="100" fixed="left"></vxe-table-column>
      <vxe-table-column field="age" title="Age" width="100" fixed="left"></vxe-table-column>
      <vxe-table-column field="atrr1" title="atrr1" width="200"></vxe-table-column>
      <vxe-table-column field="atrr2" title="atrr2" width="200"></vxe-table-column>
      <vxe-table-column field="atrr3" title="atrr3" width="200"></vxe-table-column>
      <vxe-table-column field="atrr4" title="atrr4" width="200"></vxe-table-column>
      <vxe-table-column field="date" title="Date" width="100" fixed="right"></vxe-table-column>
      <vxe-table-column field="time" title="Time" width="100" fixed="right"></vxe-table-column>
      <vxe-table-column field="address" title="Address" width="100" fixed="right"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[6] }}</code>
      <code class="javascript">{{ demoCodes[7] }}</code>
    </pre>

    <p>分组表头拖动</p>

    <vxe-table
      border
      resizable
      :data.sync="tableData">
      <vxe-table-column title="基本信息">
        <vxe-table-column type="index" width="60"></vxe-table-column>
        <vxe-table-column field="name" title="Name"></vxe-table-column>
      </vxe-table-column>
      <vxe-table-column title="更多信息">
        <vxe-table-column field="role" title="Role"></vxe-table-column>
        <vxe-table-column field="sex" title="Sex"></vxe-table-column>
        <vxe-table-column title="详细信息">
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="date" title="Date" width="140" show-overflow></vxe-table-column>
        </vxe-table-column>
      </vxe-table-column>
      <vxe-table-column field="address" title="Address" width="200" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[8] }}</code>
      <code class="javascript">{{ demoCodes[9] }}</code>
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
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="time" title="Time"></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 3)
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
          <vxe-table-column field="name" title="Name" width="300"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" width="300"></vxe-table-column>
          <vxe-table-column field="age" title="Age" width="300"></vxe-table-column>
          <vxe-table-column field="time" title="Time" width="300"></vxe-table-column>
          <vxe-table-column field="address" title="Address" width="300" show-overflow></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 3)
          }
        }
        `,
        `
        <vxe-table
          border
          resizable
          show-overflow
          show-header-overflow
          :data.sync="tableData">
          <vxe-table-column type="index" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column field="name" title="Name" width="100" fixed="left"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" width="100" fixed="left"></vxe-table-column>
          <vxe-table-column field="age" title="Age" width="100" fixed="left"></vxe-table-column>
          <vxe-table-column field="atrr1" title="atrr1" width="200"></vxe-table-column>
          <vxe-table-column field="atrr2" title="atrr2" width="200"></vxe-table-column>
          <vxe-table-column field="atrr3" title="atrr3" width="200"></vxe-table-column>
          <vxe-table-column field="atrr4" title="atrr4" width="200"></vxe-table-column>
          <vxe-table-column field="date" title="Date" width="100" fixed="right"></vxe-table-column>
          <vxe-table-column field="time" title="Time" width="100" fixed="right"></vxe-table-column>
          <vxe-table-column field="address" title="Address" width="100" fixed="right"></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 3)
          }
        }
        `,
        `
        <vxe-table
          border
          resizable
          show-overflow
          show-header-overflow
          :data.sync="tableData">
          <vxe-table-column type="index" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column field="name" title="Name" width="100" fixed="left"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" width="100" fixed="left"></vxe-table-column>
          <vxe-table-column field="age" title="Age" width="100" fixed="left"></vxe-table-column>
          <vxe-table-column field="atrr1" title="atrr1" width="200"></vxe-table-column>
          <vxe-table-column field="atrr2" title="atrr2" width="200"></vxe-table-column>
          <vxe-table-column field="atrr3" title="atrr3" width="200"></vxe-table-column>
          <vxe-table-column field="atrr4" title="atrr4" width="200"></vxe-table-column>
          <vxe-table-column field="date" title="Date" width="100" fixed="right"></vxe-table-column>
          <vxe-table-column field="time" title="Time" width="100" fixed="right"></vxe-table-column>
          <vxe-table-column field="address" title="Address" width="100" fixed="right"></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 3)
          }
        }
        `,
        `
        <vxe-table
          border
          resizable
          :data.sync="tableData">
          <vxe-table-column title="基本信息">
            <vxe-table-column type="index" width="60"></vxe-table-column>
            <vxe-table-column field="name" title="Name"></vxe-table-column>
          </vxe-table-column>
          <vxe-table-column title="更多信息">
            <vxe-table-column field="role" title="Role"></vxe-table-column>
            <vxe-table-column field="sex" title="Sex"></vxe-table-column>
            <vxe-table-column title="详细信息">
              <vxe-table-column field="sex" title="Sex"></vxe-table-column>
              <vxe-table-column field="date" title="Date" width="140" show-overflow></vxe-table-column>
            </vxe-table-column>
          </vxe-table-column>
          <vxe-table-column field="address" title="Address" width="200" show-overflow></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 3)
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 3)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
