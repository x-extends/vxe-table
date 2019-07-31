<template>
  <div>
    <p>增删改查、工具栏</p>

    <vxe-toolbar :data="tableData" :setting="{storage: false}">
      <template v-slot:buttons>
        <vxe-button @click="insertEvent">{{ $t('app.body.button.insert') }}</vxe-button>
        <vxe-button @click="$refs.xTree.removeSelecteds()">移除选中</vxe-button>
        <vxe-button @click="getInsertEvent">获取新增</vxe-button>
        <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
        <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      resizable
      ref="xTree"
      :tree-config="{children: 'children'}"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      :data.sync="tableData">
      <vxe-table-column type="selection" width="120" tree-node></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="size" title="Size" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="type" title="Type" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="date" title="Date" :edit-render="{name: 'input'}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
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
        <vxe-toolbar :data="tableData" :setting="{storage: false}">
          <template v-slot:buttons>
            <vxe-button @click="insertEvent">新增</vxe-button>
            <vxe-button @click="$refs.xTree.removeSelecteds()">移除选中</vxe-button>
            <vxe-button @click="getInsertEvent">获取新增</vxe-button>
            <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
            <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          resizable
          ref="xTree"
          :tree-config="{children: 'children'}"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          :data.sync="tableData">
          <vxe-table-column type="selection" width="120" tree-node></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="size" title="Size" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="type" title="Type" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="date" title="Date" :edit-render="{name: 'input'}"></vxe-table-column>
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
            this.tableData = window.MOCK_TREE_DATA_LIST.slice(0)
          },
          methods: {
            insertEvent () {
              let record = {
                date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd')
              }
              this.$refs.xTree.insert(record)
                .then(({ row }) => this.$refs.xTree.setActiveRow(row))
            },
            getInsertEvent () {
              let insertRecords = this.$refs.xTree.getInsertRecords()
              this.$XMsg.alert(insertRecords.length)
            },
            getRemoveEvent () {
              let removeRecords = this.$refs.xTree.getRemoveRecords()
              this.$XMsg.alert(removeRecords.length)
            },
            getUpdateEvent () {
              let updateRecords = this.$refs.xTree.getUpdateRecords()
              this.$XMsg.alert(updateRecords.length)
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = XEUtils.clone(window.MOCK_TREE_DATA_LIST, true)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    insertEvent () {
      let record = {
        date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd')
      }
      this.$refs.xTree.insert(record)
        .then(({ row }) => this.$refs.xTree.setActiveRow(row))
    },
    getInsertEvent () {
      let insertRecords = this.$refs.xTree.getInsertRecords()
      this.$XMsg.alert(insertRecords.length)
    },
    getRemoveEvent () {
      let removeRecords = this.$refs.xTree.getRemoveRecords()
      this.$XMsg.alert(removeRecords.length)
    },
    getUpdateEvent () {
      let updateRecords = this.$refs.xTree.getUpdateRecords()
      this.$XMsg.alert(updateRecords.length)
    }
  }
}
</script>
