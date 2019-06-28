<template>
  <div>
    <p>多选表格，基础方式</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="$refs.xTable1.toggleRowSelection(tableData[1])">切换第二行选中</vxe-button>
        <vxe-button @click="$refs.xTable1.setSelection([tableData[2], tableData[3]], true)">设置第三、四行选中</vxe-button>
        <vxe-button @click="$refs.xTable1.setAllSelection(true)">设置所有行选中</vxe-button>
        <vxe-button @click="$refs.xTable1.clearSelection()">清除所有行选中</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      ref="xTable1"
      border
      height="300"
      :data.sync="tableData">
      <vxe-table-column type="selection" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p>还可以通过 <table-api-link prop="checkMethod"/> 方法控制是否允许点击 CheckBox 勾选，还可以配置 <table-api-link prop="labelProp"/> 列显示属性</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="$refs.xTable2.toggleRowSelection(tableData[1])">切换第二行选中</vxe-button>
        <vxe-button @click="$refs.xTable2.setSelection([tableData[2], tableData[3]], true)">设置第三、四行选中</vxe-button>
        <vxe-button @click="$refs.xTable2.setAllSelection(true)">设置所有行选中</vxe-button>
        <vxe-button @click="$refs.xTable2.clearSelection()">清除所有行选中</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      ref="xTable2"
      border
      height="300"
      :data.sync="tableData"
      :select-config="{labelProp: 'name', checkMethod}">
      <vxe-table-column type="selection" title="All"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>

    <p>多选表格，通过配置 <table-api-link prop="select-config"/> 参数，使用渲染最快的 <table-api-link prop="labelProp"/> 属性绑定方式</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="$refs.xTable3.toggleRowSelection(tableData[1])">切换第二行选中</vxe-button>
        <vxe-button @click="$refs.xTable3.setSelection([tableData[2], tableData[3]], true)">设置第三、四行选中</vxe-button>
        <vxe-button @click="$refs.xTable3.setAllSelection(true)">设置所有行选中</vxe-button>
        <vxe-button @click="$refs.xTable3.clearSelection()">清除所有行选中</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      ref="xTable3"
      border
      height="300"
      :data.sync="tableData"
      :select-config="{checkProp: 'checked'}">
      <vxe-table-column type="selection" width="60"></vxe-table-column>
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
            <vxe-button @click="$refs.xTable1.toggleRowSelection(tableData[1])">切换第二行选中</vxe-button>
            <vxe-button @click="$refs.xTable1.setSelection([tableData[2], tableData[3]], true)">设置第三、四行选中</vxe-button>
            <vxe-button @click="$refs.xTable1.setAllSelection(true)">设置所有行选中</vxe-button>
            <vxe-button @click="$refs.xTable1.clearSelection()">清除所有行选中</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          ref="xTable1"
          border
          height="300"
          :data.sync="tableData">
          <vxe-table-column type="selection" width="60"></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 10)
          }
        }
        `,
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="$refs.xTable2.toggleRowSelection(tableData[1])">切换第二行选中</vxe-button>
            <vxe-button @click="$refs.xTable2.setSelection([tableData[2], tableData[3]], true)">设置第三、四行选中</vxe-button>
            <vxe-button @click="$refs.xTable2.setAllSelection(true)">设置所有行选中</vxe-button>
            <vxe-button @click="$refs.xTable2.clearSelection()">清除所有行选中</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          ref="xTable2"
          border
          height="300"
          :data.sync="tableData"
          :select-config="{labelProp: 'name', checkMethod}">
          <vxe-table-column type="selection" title="All"></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 10)
          },
          methods: {
            checkMethod ({ row }) {
              return row.age > 26
            }
          }
        }
        `,
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="$refs.xTable3.toggleRowSelection(tableData[1])">切换第二行选中</vxe-button>
            <vxe-button @click="$refs.xTable3.setSelection([tableData[2], tableData[3]], true)">设置第三、四行选中</vxe-button>
            <vxe-button @click="$refs.xTable3.setAllSelection(true)">设置所有行选中</vxe-button>
            <vxe-button @click="$refs.xTable3.clearSelection()">清除所有行选中</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          ref="xTable3"
          border
          height="300"
          :data.sync="tableData"
          :select-config="{checkProp: 'checked'}">
          <vxe-table-column type="selection" width="60"></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 10)
          }
        }
        `
      ]
    }
  },
  created () {
    let list = window.MOCK_DATA_LIST.slice(0, 10)
    this.tableData = list
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    checkMethod ({ row }) {
      return row.age > 26
    }
  }
}
</script>
