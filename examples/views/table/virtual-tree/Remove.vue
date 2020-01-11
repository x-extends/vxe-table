<template>
  <div>
    <p class="tip">删除数据，简单的实现示例</p>

    <vxe-virtual-tree
      resizable
      row-key
      export-config
      keep-source
      ref="xTree"
      row-id="id"
      :toolbar="{export: true, zoom: true, custom: true}"
      :tree-config="{children: 'children'}"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      :data="tableData"
      :columns="tableColumn">
      <template v-slot:buttons>
        <vxe-button @click="insertEvent()">新增</vxe-button>
        <vxe-button @click="removeSelectEvent()">删除选中</vxe-button>
        <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
        <vxe-button @click="getInsertEvent">获取新增</vxe-button>
        <vxe-button @click="getSelectEvent">获取选中</vxe-button>
      </template>
    </vxe-virtual-tree>

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
      tableData: [],
      tableColumn: [
        { type: 'checkbox', width: 120, treeNode: true },
        { field: 'name', title: 'Name', editRender: { name: 'input' } },
        { field: 'size', title: 'Size', editRender: { name: 'input' } },
        { field: 'type', title: 'Type', editRender: { name: 'input' } },
        { field: 'date', title: 'Date', editRender: { name: 'input' } },
        {
          title: '操作',
          slots: {
            default: ({ row }) => {
              return [
                <vxe-button onClick={ e => this.removeRowEvent(row) }>删除</vxe-button>
              ]
            }
          }
        }
      ],
      demoCodes: [
        `
        <vxe-virtual-tree
          resizable
          row-key
          export-config
          keep-source
          ref="xTree"
          row-id="id"
          :toolbar="{export: true, zoom: true, custom: true}"
          :tree-config="{children: 'children'}"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          :data="tableData"
          :columns="tableColumn">
          <template v-slot:buttons>
            <vxe-button @click="insertEvent()">新增</vxe-button>
            <vxe-button @click="removeSelectEvent()">删除选中</vxe-button>
            <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
            <vxe-button @click="getInsertEvent">获取新增</vxe-button>
            <vxe-button @click="getSelectEvent">获取选中</vxe-button>
          </template>
        </vxe-virtual-tree>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              tableColumn: [
                { type: 'checkbox', width: 120, treeNode: true },
                { field: 'name', title: 'Name', editRender: { name: 'input' } },
                { field: 'size', title: 'Size', editRender: { name: 'input' } },
                { field: 'type', title: 'Type', editRender: { name: 'input' } },
                { field: 'date', title: 'Date', editRender: { name: 'input' } },
                {
                  title: '操作',
                  slots: {
                    default: ({ row }) => {
                      return [
                        <vxe-button onClick={ e => this.removeRowEvent(row) }>删除</vxe-button>
                      ]
                    }
                  }
                }
              ]
            }
          },
          created () {
            this.tableData = window.MOCK_TREE_DATA_LIST.slice(0)
          },
          methods: {
            insertEvent () {
              let xTree = this.$refs.xTree
              let record = {
                name: '新数据',
                date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd')
              }
              xTree.insert(record).then(({ row }) => xTree.setActiveRow(row))
            },
            removeSelectEvent () {
              this.$refs.xTree.removeSelecteds()
            },
            removeRowEvent (row) {
              this.$refs.xTree.remove(row)
            },
            getRemoveEvent () {
              let removeRecords = this.$refs.xTree.getRemoveRecords()
              this.$XModal.alert(removeRecords.length)
            },
            getInsertEvent () {
              let insertRecords = this.$refs.xTree.getInsertRecords()
              this.$XModal.alert(insertRecords.length)
            },
            getSelectEvent () {
              let selectRecords = this.$refs.xTree.getCheckboxRecords()
              this.$XModal.alert(selectRecords.length)
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
      let xTree = this.$refs.xTree
      let record = {
        name: '新数据',
        date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd')
      }
      xTree.insert(record).then(({ row }) => xTree.setActiveRow(row))
    },
    removeSelectEvent () {
      this.$refs.xTree.removeSelecteds()
    },
    removeRowEvent (row) {
      this.$refs.xTree.remove(row)
    },
    getRemoveEvent () {
      let removeRecords = this.$refs.xTree.getRemoveRecords()
      this.$XModal.alert(removeRecords.length)
    },
    getInsertEvent () {
      let insertRecords = this.$refs.xTree.getInsertRecords()
      this.$XModal.alert(insertRecords.length)
    },
    getSelectEvent () {
      let selectRecords = this.$refs.xTree.getCheckboxRecords()
      this.$XModal.alert(selectRecords.length)
    }
  }
}
</script>
