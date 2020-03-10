<template>
  <div>
    <p class="tip">通过快捷菜单增删改查</p>

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
      keep-source
      ref="xTable"
      height="400"
      :loading="loading"
      :data="tableData"
      :context-menu="tableMenu"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      @context-menu-click="contextMenuClickEvent">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
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
      tableMenu: {
        header: {
          options: [
            [
              { code: 'hideColumn', name: '隐藏列', disabled: false },
              { code: 'showAllColumn', name: '取消所有隐藏列', disabled: false }
            ]
          ]
        },
        body: {
          options: [
            [
              { code: 'copy', name: '复制', prefixIcon: 'fa fa-copy', disabled: false },
              { code: 'reload', name: '刷新', disabled: false },
              { code: 'insertAt', name: '插入', disabled: false },
              { code: 'remove', name: '删除', disabled: false },
              { code: 'save', name: '保存', prefixIcon: 'fa fa-save', disabled: false }
            ]
          ]
        },
        visibleMethod: this.visibleMethod
      },
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
          keep-source
          ref="xTable"
          height="400"
          :loading="loading"
          :data="tableData"
          :context-menu="tableMenu"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          @context-menu-click="contextMenuClickEvent">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
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
              tableMenu: {
                header: {
                  options: [
                    [
                      { code: 'hideColumn', name: '隐藏列', disabled: false },
                      { code: 'showAllColumn', name: '取消所有隐藏列', disabled: false }
                    ]
                  ]
                },
                body: {
                  options: [
                    [
                      { code: 'copy', name: '复制', prefixIcon: 'fa fa-copy', disabled: false },
                      { code: 'reload', name: '刷新', disabled: false },
                      { code: 'insertAt', name: '插入', disabled: false },
                      { code: 'remove', name: '删除', disabled: false },
                      { code: 'save', name: '保存', prefixIcon: 'fa fa-save', disabled: false }
                    ]
                  ]
                },
                visibleMethod: this.visibleMethod
              }
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
            visibleMethod ({ options, column }) {
              let isDisabled = !column
              options.forEach(list => {
                list.forEach(item => {
                  item.disabled = isDisabled
                })
              })
              return true
            },
            contextMenuClickEvent ({ menu, row, column }) {
              let xTable = this.$refs.xTable
              switch (menu.code) {
                case 'hideColumn':
                  xTable.hideColumn(column)
                  break
                case 'showAllColumn':
                  xTable.resetColumn()
                  break
                case 'copy':
                  if (XEClipboard.copy(row[column.property])) {
                    this.$XModal.message({ message: '已复制到剪贴板！', status: 'success' })
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
                  this.$XModal.message({ message: '保存成功', status: 'success' })
                  this.findList()
                  break
              }
            },
            getInsertEvent () {
              let insertRecords = this.$refs.xTable.getInsertRecords()
              this.$XModal.alert(insertRecords.length)
            },
            getRemoveEvent () {
              let removeRecords = this.$refs.xTable.getRemoveRecords()
              this.$XModal.alert(removeRecords.length)
            },
            getUpdateEvent () {
              let updateRecords = this.$refs.xTable.getUpdateRecords()
              this.$XModal.alert(updateRecords.length)
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
      const xTable = this.$refs.xTable
      xTable.insertAt(null, row || -1)
        .then(({ row }) => xTable.setActiveCell(row, column ? column.property : 'name'))
    },
    visibleMethod ({ options, column }) {
      const isDisabled = !column
      options.forEach(list => {
        list.forEach(item => {
          item.disabled = isDisabled
        })
      })
      return true
    },
    contextMenuClickEvent ({ menu, row, column }) {
      const xTable = this.$refs.xTable
      switch (menu.code) {
        case 'hideColumn':
          xTable.hideColumn(column)
          break
        case 'showAllColumn':
          xTable.resetColumn()
          break
        case 'copy':
          if (XEClipboard.copy(row[column.property])) {
            this.$XModal.message({ message: '已复制到剪贴板！', status: 'success' })
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
          this.$XModal.message({ message: '保存成功', status: 'success' })
          this.findList()
          break
      }
    },
    getInsertEvent () {
      const insertRecords = this.$refs.xTable.getInsertRecords()
      this.$XModal.alert(insertRecords.length)
    },
    getRemoveEvent () {
      const removeRecords = this.$refs.xTable.getRemoveRecords()
      this.$XModal.alert(removeRecords.length)
    },
    getUpdateEvent () {
      const updateRecords = this.$refs.xTable.getUpdateRecords()
      this.$XModal.alert(updateRecords.length)
    }
  }
}
</script>
