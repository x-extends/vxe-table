<template>
  <div>
    <p>单选表格，用户操作点击选项时会触发事件 <table-api-link prop="radio-change"/></p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="$refs.xTable1.setRadioRow(tableData[1])">设置第二行选中</vxe-button>
        <vxe-button @click="$refs.xTable1.clearRadioRow()">取消选中</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      ref="xTable1"
      height="300"
      :data.sync="tableData"
      @radio-change="radioChangeEvent">
      <vxe-table-column type="radio" width="60"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p>使用 <table-api-link prop="highlight-current-row"/> 高亮方式</p>

    <vxe-table
      border
      highlight-current-row
      height="300"
      :data.sync="tableData"
      @current-change="currentChangeEvent">
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>

    <p>两种方式混合使用</p>

    <vxe-table
      ref="xTable"
      border
      highlight-current-row
      height="300"
      :radio-config="{labelField: 'name'}"
      :data.sync="tableData">
      <vxe-table-column type="radio" title="还可以这样" width="120"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[4] }}</code>
      <code class="javascript">{{ demoCodes[5] }}</code>
    </pre>

    <p>当然也可以两种方式同时使用</p>

    <vxe-table
      border
      highlight-hover-row
      highlight-current-row
      height="300"
      :radio-config="{labelField: 'name', trigger: 'row'}"
      :data.sync="tableData">
      <vxe-table-column type="radio" title="还可以这样" width="120"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[6] }}</code>
      <code class="javascript">{{ demoCodes[7] }}</code>
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
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="$refs.xTable1.setRadioRow(tableData[1])">设置第二行选中</vxe-button>
            <vxe-button @click="$refs.xTable1.clearRadioRow()">取消选中</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          ref="xTable1"
          height="300"
          :data.sync="tableData"
          @radio-change="radioChangeEvent">
          <vxe-table-column type="radio" title="这样也行"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
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
          },
          methods: {
            radioChangeEvent ({ row }) {
              console.log('单选事件')
            }
          }
        }
        `,
        `
        <vxe-table
          border
          highlight-current-row
          height="300"
          :data.sync="tableData"
          @current-change="currentChangeEvent">
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
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
          },
          methods: {
            currentChangeEvent ({ row }) {
              console.log('行选中事件')
            }
          }
        }
        `,
        `
        <vxe-table
          ref="xTable"
          border
          highlight-current-row
          height="300"
          :radio-config="{labelField: 'name'}"
          :data.sync="tableData">
          <vxe-table-column type="radio" title="还可以这样" width="120"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
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
          border
          highlight-hover-row
          highlight-current-row
          height="300"
          :radio-config="{labelField: 'name', trigger: 'row'}"
          :data.sync="tableData">
          <vxe-table-column type="radio" title="还可以这样" width="120"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
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
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  created () {
    let list = window.MOCK_DATA_LIST.slice(0, 6)
    this.tableData = list
  },
  methods: {
    currentChangeEvent ({ row }) {
      console.log('行选中事件')
    },
    radioChangeEvent ({ row }) {
      console.log('单选事件')
    }
  }
}
</script>
