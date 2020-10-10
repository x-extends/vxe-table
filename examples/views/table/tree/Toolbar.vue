<template>
  <div>
    <p class="tip">
      增删改查、工具栏<br>
      <span class="red">（注：内置的 CRUD 管理器是不支持插入子节点的，如果要往子节点插入或删除节点数据，可以直接操作数据源）</span>
    </p>

    <vxe-toolbar :refresh="{query: reload}" export print custom>
      <template v-slot:buttons>
        <vxe-button @click="insertEvent">{{ $t('app.body.button.insert') }}</vxe-button>
        <vxe-button @click="saveEvent">保存</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      resizable
      show-overflow
      export-config
      keep-source
      ref="xTree"
      row-id="id"
      :loading="loading"
      :tree-config="treeConfig"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      :data="tableData">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" tree-node></vxe-table-column>
      <vxe-table-column field="size" title="Size" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="type" title="Type" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="date" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      loading: false,
      tableData: [],
      removeList: [],
      treeConfig: {
        children: 'children'
      },
      demoCodes: [
        `
        <vxe-toolbar :refresh="{query: reload}" export print custom>
          <template v-slot:buttons>
            <vxe-button @click="insertEvent">{{ $t('app.body.button.insert') }}</vxe-button>
            <vxe-button @click="saveEvent">保存</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          resizable
          show-overflow
          export-config
          keep-source
          ref="xTree"
          row-id="id"
          :loading="loading"
          :tree-config="treeConfig"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          :data="tableData">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" tree-node></vxe-table-column>
          <vxe-table-column field="size" title="Size" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="type" title="Type" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="date" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              ttableData: [],
              removeList: [],
              treeConfig: {
                children: 'children'
              }
            }
          },
          created () {
            this.findList()
          },
          methods: {
            findList () {
              this.loading = true
              return new Promise(resolve => {
                setTimeout(() => {
                  this.tableData = XEUtils.clone(window.MOCK_TREE_DATA_LIST, true)
                  this.loading = false
                  resolve(this.tableData)
                }, 300)
              })
            },
            insertEvent () {
              const xTree = this.$refs.xTree
              const newRow = {
                name: '新数据',
                date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd')
              }
              xTree.insert(newRow).then(({ row }) => xTree.setActiveRow(row))
            },
            reload () {
              // 清除所有状态
              this.$refs.xTree.clearAll()
              return this.findList()
            },
            saveEvent () {
              const { insertRecords, updateRecords } = this.$refs.xTree.getRecordset()
              this.$XModal.alert(\`insertRecords=\${insertRecords.length} updateRecords=\${updateRecords.length}\`)
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.findList()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    findList () {
      this.loading = true
      return new Promise(resolve => {
        setTimeout(() => {
          this.tableData = XEUtils.clone(window.MOCK_TREE_DATA_LIST, true)
          this.loading = false
          resolve(this.tableData)
        }, 300)
      })
    },
    insertEvent () {
      const xTree = this.$refs.xTree
      const newRow = {
        name: '新数据',
        date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd')
      }
      xTree.insert(newRow).then(({ row }) => xTree.setActiveRow(row))
    },
    reload () {
      // 清除所有状态
      this.$refs.xTree.clearAll()
      return this.findList()
    },
    saveEvent () {
      const { insertRecords, updateRecords } = this.$refs.xTree.getRecordset()
      this.$XModal.alert(`insertRecords=${insertRecords.length} updateRecords=${updateRecords.length}`)
    }
  }
}
</script>
