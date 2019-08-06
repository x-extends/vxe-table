<template>
  <div>
    <p>通过快捷菜单增删改查</p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="getInsertEvent">获取新增</vxe-button>
        <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
        <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      resizable
      show-overflow
      ref="xTable"
      height="400"
      :loading="loading"
      :data.sync="tableData"
      :context-menu="{header: {options: headerMenus}, body: {options: bodyMenus}}"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      @context-menu-click="contextMenuClickEvent">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="age" title="Age" :edit-render="{name: 'input'}"></vxe-table-column>
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
import XEClipboard from 'xe-clipboard'

export default {
  data () {
    return {
      loading: false,
      tableData: [],
      headerMenus: [
        [
          {
            code: 'hideColumn',
            name: '隐藏列'
          },
          {
            code: 'showAllColumn',
            name: '取消所有隐藏列'
          }
        ]
      ],
      bodyMenus: [
        [
          {
            code: 'copy',
            name: '复制'
          },
          {
            code: 'reload',
            name: '刷新'
          },
          {
            code: 'insertAt',
            name: '插入'
          },
          {
            code: 'remove',
            name: '删除'
          },
          {
            code: 'save',
            name: '保存'
          }
        ]
      ],
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="getInsertEvent">获取新增</vxe-button>
            <vxe-button @click="getRemoveEvent">获取删除</vxe-button>
            <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          resizable
          show-overflow
          ref="xTable"
          height="400"
          :loading="loading"
          :data.sync="tableData"
          :context-menu="{header: {options: headerMenus}, body: {options: bodyMenus}}"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          @context-menu-click="contextMenuClickEvent">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="age" title="Age" :edit-render="{name: 'input'}"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tableData: [],
              headerMenus: [
                [
                  {
                    code: 'hideColumn',
                    name: '隐藏列'
                  },
                  {
                    code: 'showAllColumn',
                    name: '取消所有隐藏列'
                  }
                ]
              ],
              bodyMenus: [
                [
                  {
                    code: 'copy',
                    name: '复制'
                  },
                  {
                    code: 'reload',
                    name: '刷新'
                  },
                  {
                    code: 'insertAt',
                    name: '插入'
                  },
                  {
                    code: 'remove',
                    name: '删除'
                  },
                  {
                    code: 'save',
                    name: '保存'
                  }
                ]
              ]
            }
          },
          created () {
            this.findList()
          },
          methods: {
            findList () {
              this.loading = true
              this.tableData = []
              setTimeout(() => {
                this.tableData = window.MOCK_DATA_LIST.slice(0, 5)
                this.loading = false
              }, 500)
            },
            insertEvent (row, column) {
              let xTable = this.$refs.xTable
              xTable.insertAt(null, row)
                .then(({ row }) => xTable.setActiveCell(row, column.property))
            },
            contextMenuClickEvent ({ menu, row, column }) {
              let xTable = this.$refs.xTable
              switch (menu.code) {
                case 'hideColumn':
                  xTable.hideColumn(column)
                  break
                case 'showAllColumn':
                  xTable.resetCustoms()
                  break
                case 'copy':
                  if (row && column) {
                    if (XEClipboard.copy(row[column.property])) {
                      this.$XMsg.message({ message: '已复制到剪贴板！', status: 'success' })
                    }
                  } else {
                    this.$XMsg.message({ message: '请在任意单元格上右键点击复制！', status: 'info' })
                  }
                  break
                case 'reload':
                  this.findList()
                  break
                case 'insertAt':
                  this.insertEvent(row, column)
                  break
                case 'remove':
                  xTable.remove(row)
                  break
                case 'save':
                  this.$XMsg.message({ message: '保存成功', status: 'success' })
                  this.findList()
                  break
              }
            },
            getInsertEvent () {
              let insertRecords = this.$refs.xTable.getInsertRecords()
              this.$XMsg.alert(insertRecords.length)
            },
            getRemoveEvent () {
              let removeRecords = this.$refs.xTable.getRemoveRecords()
              this.$XMsg.alert(removeRecords.length)
            },
            getUpdateEvent () {
              let updateRecords = this.$refs.xTable.getUpdateRecords()
              this.$XMsg.alert(updateRecords.length)
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
      this.tableData = []
      setTimeout(() => {
        this.tableData = window.MOCK_DATA_LIST.slice(0, 5)
        this.loading = false
      }, 500)
    },
    insertEvent (row, column) {
      let xTable = this.$refs.xTable
      xTable.insertAt(null, row || -1)
        .then(({ row }) => xTable.setActiveCell(row, column ? column.property : 'name'))
    },
    contextMenuClickEvent ({ menu, row, column }) {
      let xTable = this.$refs.xTable
      switch (menu.code) {
        case 'hideColumn':
          xTable.hideColumn(column)
          break
        case 'showAllColumn':
          xTable.resetCustoms()
          break
        case 'copy':
          if (row && column) {
            if (XEClipboard.copy(row[column.property])) {
              this.$XMsg.message({ message: '已复制到剪贴板！', status: 'success' })
            }
          } else {
            this.$XMsg.message({ message: '请在任意单元格上右键点击复制！', status: 'info' })
          }
          break
        case 'reload':
          this.findList()
          break
        case 'insertAt':
          this.insertEvent(row, column)
          break
        case 'remove':
          xTable.remove(row)
          break
        case 'save':
          this.$XMsg.message({ message: '保存成功', status: 'success' })
          this.findList()
          break
      }
    },
    getInsertEvent () {
      let insertRecords = this.$refs.xTable.getInsertRecords()
      this.$XMsg.alert(insertRecords.length)
    },
    getRemoveEvent () {
      let removeRecords = this.$refs.xTable.getRemoveRecords()
      this.$XMsg.alert(removeRecords.length)
    },
    getUpdateEvent () {
      let updateRecords = this.$refs.xTable.getUpdateRecords()
      this.$XMsg.alert(updateRecords.length)
    }
  }
}
</script>
