<template>
  <div>
    <p>使用 <table-api-link prop="highlight-current-row"/> 方式；选项改变触发事件 <table-api-link prop="select-change"/></p>

    <vxe-table
      border
      highlight-current-row
      height="300"
      :data.sync="tableData">
      <vxe-table-column prop="name" label="Name"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="age" label="Age"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p>使用 radio 方式</p>

    <vxe-table
      border
      height="300"
      :radio-config="{labelProp: 'name'}"
      :data.sync="tableData">
      <vxe-table-column type="radio" label="这样也行"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="age" label="Age"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>

    <p>当然也可以两种方式同时使用</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="$refs.xTable.setCurrentRow(tableData[1])">设置第二行选中</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      ref="xTable"
      border
      highlight-current-row
      height="300"
      :data.sync="tableData">
      <vxe-table-column type="radio" label="还可以这样" width="120"></vxe-table-column>
      <vxe-table-column prop="name" label="Name"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
      <vxe-table-column prop="age" label="Age"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[4] }}</code>
      <code class="javascript">{{ demoCodes[5] }}</code>
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
          border
          highlight-current-row
          height="300"
          :data.sync="tableData">
          <vxe-table-column prop="name" label="Name"></vxe-table-column>
          <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
          <vxe-table-column prop="age" label="Age"></vxe-table-column>
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
          height="300"
          :radio-config="{labelProp: 'name'}"
          :data.sync="tableData">
          <vxe-table-column type="radio" label="这样也行"></vxe-table-column>
          <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
          <vxe-table-column prop="age" label="Age"></vxe-table-column>
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
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="$refs.xTable.setCurrentRow(tableData[1])">设置第二行选中</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          ref="xTable"
          border
          highlight-current-row
          height="300"
          :data.sync="tableData">
          <vxe-table-column type="radio" label="还可以这样" width="120"></vxe-table-column>
          <vxe-table-column prop="name" label="Name"></vxe-table-column>
          <vxe-table-column prop="sex" label="Sex"></vxe-table-column>
          <vxe-table-column prop="age" label="Age"></vxe-table-column>
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
        `
      ]
    }
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  created () {
    let list = window.MOCK_DATA_LIST.slice(0, 6)
    this.tableData = list
  }
}
</script>
