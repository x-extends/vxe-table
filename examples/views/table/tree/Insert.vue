<template>
  <div>
    <p class="tip">
      插入数据，简单的实现示例<br>
      <span class="red">（注：内置的 CRUD 管理器是不支持插入子节点的，如果要往子节点插入或删除节点数据，可以直接操作数据源）</span>
    </p>

    <vxe-toolbar custom>
      <template v-slot:buttons>
        <vxe-button @click="insertEvent()">插入第一行</vxe-button>
        <vxe-button @click="getSelectionEvent">获取选中</vxe-button>
        <vxe-button @click="saveEvent">保存</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      resizable
      show-overflow
      keep-source
      ref="xTree"
      class="my_treetable_insert"
      :tree-config="treeConfig"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      :data="tableData">
      <vxe-table-column type="checkbox" width="120" tree-node></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="size" title="Size" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="type" title="Type" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="date" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
      <code class="css">{{ demoCodes[2] }}</code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [],
      treeConfig: {
        children: 'children'
      },
      demoCodes: [
        `
        <vxe-toolbar custom>
          <template v-slot:buttons>
            <vxe-button @click="insertEvent()">插入第一行</vxe-button>
            <vxe-button @click="getSelectionEvent">获取选中</vxe-button>
            <vxe-button @click="saveEvent">保存</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          resizable
          show-overflow
          keep-source
          ref="xTree"
          class="my_treetable_insert"
          :tree-config="treeConfig"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          :data="tableData">
          <vxe-table-column type="checkbox" width="120" tree-node></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="size" title="Size" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="type" title="Type" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="date" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              treeConfig: {
                children: 'children'
              }
            }
          },
          created () {
            this.tableData = window.MOCK_TREE_DATA_LIST
          },
          methods: {
            insertEvent () {
              const xTree = this.$refs.xTree
              const newRow = {
                name: '新数据',
                date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd')
              }
              xTree.insert(newRow).then(() => xTree.setActiveRow(newRow))
            },
            getSelectionEvent () {
              const selectRecords = this.$refs.xTree.getCheckboxRecords()
              this.$XModal.alert(selectRecords.length)
            },
            saveEvent () {
              const { insertRecords, updateRecords } = this.$refs.xTree.getRecordset()
              this.$XModal.alert(\`insertRecords=\${insertRecords.length} updateRecords=\${updateRecords.length}\`)
            }
          }
        }
        `,
        `
        .my_treetable_insert .vxe-body--row.is--new {
          background-color: #f1fdf1;
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
      const xTree = this.$refs.xTree
      const newRow = {
        name: '新数据',
        date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd')
      }
      xTree.insert(newRow).then(({ row }) => xTree.setActiveRow(row))
    },
    getSelectionEvent () {
      const selectRecords = this.$refs.xTree.getCheckboxRecords()
      this.$XModal.alert(selectRecords.length)
    },
    saveEvent () {
      const { insertRecords, updateRecords } = this.$refs.xTree.getRecordset()
      this.$XModal.alert(`insertRecords=${insertRecords.length} updateRecords=${updateRecords.length}`)
    }
  }
}
</script>

<style lang="scss">
.my_treetable_insert .vxe-body--row.is--new {
  background-color: #f1fdf1;
}
</style>
