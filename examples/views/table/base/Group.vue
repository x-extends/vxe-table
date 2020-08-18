<template>
  <div>
    <p class="tip">当数据结构比较复杂的时候，可以使用多级表头来更加直观的显示数据</p>

    <vxe-table
      border
      height="400"
      :data="tableData">
      <vxe-table-column title="基本信息">
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column field="name" title="Name"></vxe-table-column>
      </vxe-table-column>
      <vxe-table-column title="更多信息">
        <vxe-table-column field="role" title="Role"></vxe-table-column>
        <vxe-table-column title="详细信息">
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
        </vxe-table-column>
      </vxe-table-column>
      <vxe-table-column title="分类信息">
        <vxe-table-column field="date3" title="Date"></vxe-table-column>
      </vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">分组表头与固定列</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="toggleFixedColumn('group0', 'left')">切换第一列固定</vxe-button>
        <vxe-button @click="toggleFixedColumn('group1', 'left')">切换第二列固定</vxe-button>
        <vxe-button @click="toggleFixedColumn('group3', 'right')">切换第四列固定</vxe-button>
        <vxe-button @click="toggleFixedColumn('group4', 'right')">切换第五列固定</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      ref="xTable"
      height="400"
      :data="tableData">
      <vxe-table-column field="group0" title="基本信息">
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column field="name" title="Name" width="180"></vxe-table-column>
      </vxe-table-column>
      <vxe-table-column field="group1" title="分类信息1">
        <vxe-table-column field="age" title="Age1" width="120"></vxe-table-column>
      </vxe-table-column>
      <vxe-table-column field="group2" title="更多信息">
        <vxe-table-column field="role" title="Role" width="300"></vxe-table-column>
        <vxe-table-column field="attr1" title="Attr1" width="200"></vxe-table-column>
        <vxe-table-column title="详细信息">
          <vxe-table-column field="sex" title="Sex" width="200"></vxe-table-column>
          <vxe-table-column field="num" title="Num" width="200"></vxe-table-column>
        </vxe-table-column>
      </vxe-table-column>
      <vxe-table-column field="group3" title="分类信息2">
        <vxe-table-column field="attr6" title="Attr6" width="120"></vxe-table-column>
      </vxe-table-column>
      <vxe-table-column field="group4" title="额外信息">
        <vxe-table-column field="date3" title="Date" width="140"></vxe-table-column>
        <vxe-table-column field="address" title="Address" width="200" show-overflow></vxe-table-column>
      </vxe-table-column>
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
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      tableData: [],
      demoCodes: [
        `
        <vxe-table
          border
          height="400"
          :data="tableData">
          <vxe-table-column title="基本信息">
            <vxe-table-column type="seq" width="60"></vxe-table-column>
            <vxe-table-column field="name" title="Name"></vxe-table-column>
          </vxe-table-column>
          <vxe-table-column title="更多信息">
            <vxe-table-column field="role" title="Role"></vxe-table-column>
            <vxe-table-column title="详细信息">
              <vxe-table-column field="sex" title="Sex"></vxe-table-column>
              <vxe-table-column field="age" title="Age"></vxe-table-column>
            </vxe-table-column>
          </vxe-table-column>
          <vxe-table-column title="分类信息">
            <vxe-table-column field="date3" title="Date"></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 10)
          }
        }
        `,
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="toggleFixedColumn('group0', 'left')">切换第一列固定</vxe-button>
            <vxe-button @click="toggleFixedColumn('group1', 'left')">切换第二列固定</vxe-button>
            <vxe-button @click="toggleFixedColumn('group3', 'right')">切换第四列固定</vxe-button>
            <vxe-button @click="toggleFixedColumn('group4', 'right')">切换第五列固定</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          ref="xTable"
          height="400"
          :data="tableData">
          <vxe-table-column field="group0" title="基本信息">
            <vxe-table-column type="seq" width="60"></vxe-table-column>
            <vxe-table-column field="name" title="Name" width="180"></vxe-table-column>
          </vxe-table-column>
          <vxe-table-column field="group1" title="分类信息1">
            <vxe-table-column field="age" title="Age1" width="120"></vxe-table-column>
          </vxe-table-column>
          <vxe-table-column field="group2" title="更多信息">
            <vxe-table-column field="role" title="Role" width="300"></vxe-table-column>
            <vxe-table-column field="attr1" title="Attr1" width="200"></vxe-table-column>
            <vxe-table-column title="详细信息">
              <vxe-table-column field="sex" title="Sex" width="200"></vxe-table-column>
              <vxe-table-column field="num" title="Num" width="200"></vxe-table-column>
            </vxe-table-column>
          </vxe-table-column>
          <vxe-table-column field="group3" title="分类信息2">
            <vxe-table-column field="attr6" title="Attr6" width="120"></vxe-table-column>
          </vxe-table-column>
          <vxe-table-column field="group4" title="额外信息">
            <vxe-table-column field="date3" title="Date" width="140"></vxe-table-column>
            <vxe-table-column field="address" title="Address" width="200" show-overflow></vxe-table-column>
          </vxe-table-column>
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
            toggleFixedColumn (field, type) {
              const xTable = this.$refs.xTable
              const column = xTable.getColumnByField(field)
              const groupFixed = column.fixed ? null : type
              // 将分组整体设置固定列
              XEUtils.eachTree([column], column => {
                column.fixed = groupFixed
              })
              // 刷新列
              xTable.refreshColumn()
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 10)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    toggleFixedColumn (field, type) {
      const xTable = this.$refs.xTable
      const column = xTable.getColumnByField(field)
      const groupFixed = column.fixed ? null : type
      // 将分组整体设置固定列
      XEUtils.eachTree([column], column => {
        column.fixed = groupFixed
      })
      // 刷新列
      xTable.refreshColumn()
    }
  }
}
</script>
