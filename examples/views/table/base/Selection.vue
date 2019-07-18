<template>
  <div>
    <p>多选表格，用户手动勾选时会触发事件 <table-api-link prop="select-change"/></p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="$refs.xTable1.toggleRowSelection(tableData[1])">切换第二行选中</vxe-button>
        <vxe-button @click="$refs.xTable1.setSelection([tableData[2], tableData[3]], true)">设置第三、四行选中</vxe-button>
        <vxe-button @click="$refs.xTable1.setAllSelection(true)">设置所有行选中</vxe-button>
        <vxe-button @click="$refs.xTable1.clearSelection()">清除所有行选中</vxe-button>
        <vxe-button @click="getSelectEvent1">获取选中</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      ref="xTable1"
      border
      height="300"
      :data.sync="tableData"
      @select-all="selectAllEvent"
      @select-change="selectChangeEvent">
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

    <p>还可以通过 <table-api-link prop="checkMethod"/> 方法控制是否允许点击 CheckBox 勾选，还可以配置 <table-api-link prop="labelField"/> 列显示属性</p>

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
      :select-config="{labelField: 'name', checkMethod}">
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

    <p>多选表格，通过配置 <table-api-link prop="trigger"/> 设置触发源，使用渲染最快的 <table-api-link prop="checkField"/> 属性绑定方式</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="$refs.xTable3.toggleRowSelection(tableData[1])">切换第二行选中</vxe-button>
        <vxe-button @click="$refs.xTable3.setSelection([tableData[2], tableData[3]], true)">设置第三、四行选中</vxe-button>
        <vxe-button @click="$refs.xTable3.setAllSelection(true)">设置所有行选中</vxe-button>
        <vxe-button @click="$refs.xTable3.clearSelection()">清除所有行选中</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      highlight-hover-row
      ref="xTable3"
      height="300"
      :data.sync="tableData"
      :select-config="{checkField: 'checked', trigger: 'row'}">
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

    <p>默认选中，通过指定 <table-api-link prop="checkRowKeys"/> 设置默认选中的行</p>

    <vxe-table
      border
      highlight-hover-row
      ref="xTable4"
      height="300"
      row-id="id"
      :data.sync="tableData"
      :select-config="{checkRowKeys: ['2', '3']}"
      :radio-config="{labelField: 'name'}">
      <vxe-table-column type="selection" width="60"></vxe-table-column>
      <vxe-table-column type="radio" width="200" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[6] }}</code>
      <code class="javascript">{{ demoCodes[7] }}</code>
    </pre>

    <p>多选可单选同时使用</p>

    <vxe-table
      border
      highlight-hover-row
      ref="xTable4"
      height="300"
      :data.sync="tableData"
      :radio-config="{labelField: 'name'}">
      <vxe-table-column type="selection" width="60"></vxe-table-column>
      <vxe-table-column type="radio" width="200" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[8] }}</code>
      <code class="javascript">{{ demoCodes[9] }}</code>
    </pre>

    <p>不仅如此，还可以多种方式混合使用</p>

    <vxe-table
      border
      resizable
      highlight-hover-row
      highlight-current-row
      ref="xTable5"
      height="300"
      :data.sync="tableData"
      :radio-config="{labelField: 'role'}"
      :select-config="{labelField: 'name'}">
      <vxe-table-column type="selection" title="Name"></vxe-table-column>
      <vxe-table-column type="radio" title="Role"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[10] }}</code>
      <code class="javascript">{{ demoCodes[11] }}</code>
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
            <vxe-button @click="getSelectEvent">获取选中</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          ref="xTable1"
          border
          height="300"
          :data.sync="tableData"
          @select-all="selectAllEvent"
          @select-change="selectChangeEvent">
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
          },
          methods: {
            selectAllEvent ({ checked }) {
              console.log(checked ? '所有勾选事件' : '所有取消事件')
            },
            selectChangeEvent ({ checked, row }) {
              console.log(checked ? '勾选事件' : '取消事件')
            },
            getSelectEvent () {
              let updateRecords = this.$refs.xTable1.getSelectRecords()
              this.$XMsg.alert(updateRecords.length)
            }
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
          :select-config="{labelField: 'name', checkMethod}">
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
          border
          highlight-hover-row
          ref="xTable3"
          height="300"
          :data.sync="tableData"
          :select-config="{checkField: 'checked', trigger: 'row'}">
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
        <vxe-table
          border
          highlight-hover-row
          ref="xTable4"
          height="300"
          row-id="id"
          :data.sync="tableData"
          :select-config="{checkRowKeys: ['2', '3']}"
          :radio-config="{labelField: 'name'}">
          <vxe-table-column type="selection" width="60"></vxe-table-column>
          <vxe-table-column type="radio" width="200" title="Name"></vxe-table-column>
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
        <vxe-table
          border
          highlight-hover-row
          ref="xTable4"
          height="300"
          :data.sync="tableData"
          :radio-config="{labelField: 'name'}">
          <vxe-table-column type="selection" width="60"></vxe-table-column>
          <vxe-table-column type="radio" width="200" title="Name"></vxe-table-column>
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
        <vxe-table
          border
          resizable
          highlight-hover-row
          highlight-current-row
          ref="xTable5"
          height="300"
          :data.sync="tableData"
          :radio-config="{labelField: 'role'}"
          :select-config="{labelField: 'name'}">
          <vxe-table-column type="selection" title="Name"></vxe-table-column>
          <vxe-table-column type="radio" title="Role"></vxe-table-column>
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
    },
    selectAllEvent ({ checked }) {
      console.log(checked ? '所有勾选事件' : '所有取消事件')
    },
    selectChangeEvent ({ checked, row }) {
      console.log(checked ? '勾选事件' : '取消事件')
    },
    getSelectEvent1 () {
      let updateRecords = this.$refs.xTable1.getSelectRecords()
      this.$XMsg.alert(updateRecords.length)
    }
  }
}
</script>
