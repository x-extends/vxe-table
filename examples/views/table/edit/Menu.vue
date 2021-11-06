<template>
  <div>
    <p class="tip">通过快捷菜单增删改查<span class="red">（具体请自行实现，该示例仅供参考）</span></p>

    <vxe-toolbar>
      <template #buttons>
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
      :menu-config="tableMenu"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      @menu-click="contextMenuClickEvent">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-column>
      <vxe-column field="sex" title="Sex" :edit-render="{name: 'input'}"></vxe-column>
      <vxe-column field="age" title="Age" :edit-render="{name: 'input'}"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script>
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
          <template #buttons>
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
          :menu-config="tableMenu"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          @menu-click="contextMenuClickEvent">
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-column>
          <vxe-column field="sex" title="Sex" :edit-render="{name: 'input'}"></vxe-column>
          <vxe-column field="age" title="Age" :edit-render="{name: 'input'}"></vxe-column>
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
                this.tableData = [
                  { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
                  { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                  { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                  { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
                  { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
                  { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
                  { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
                  { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
                ]
                this.loading = false
              }, 500)
            },
            insertEvent (row, column) {
              const $table = this.$refs.xTable
              $table.insertAt(null, row || -1).then(({ row }) => {
                $table.setActiveCell(row, column || 'name')
              })
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
              const $table = this.$refs.xTable
              switch (menu.code) {
                case 'hideColumn':
                  $table.hideColumn(column)
                  break
                case 'showAllColumn':
                  $table.resetColumn()
                  break
                case 'copy':
                  if (XEClipboard.copy(row[column.property])) {
                    this.$XModal.message({ content: '已复制到剪贴板！', status: 'success' })
                  }
                  break
                case 'reload':
                  this.findList()
                  break
                case 'insertAt':
                  this.insertEvent(row, column)
                  break
                case 'remove':
                  $table.remove(row)
                  break
                case 'save':
                  this.$XModal.message({ content: '保存成功', status: 'success' })
                  this.findList()
                  break
              }
            },
            getInsertEvent () {
              const $table = this.$refs.xTable
              const insertRecords = $table.getInsertRecords()
              this.$XModal.alert(insertRecords.length)
            },
            getRemoveEvent () {
              const $table = this.$refs.xTable
              const removeRecords = $table.getRemoveRecords()
              this.$XModal.alert(removeRecords.length)
            },
            getUpdateEvent () {
              const $table = this.$refs.xTable
              const updateRecords = $table.getUpdateRecords()
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
  methods: {
    findList () {
      this.loading = true
      this.tableData = []
      setTimeout(() => {
        this.tableData = [
          { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
          { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
          { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
          { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
          { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
          { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
          { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
          { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
        ]
        this.loading = false
      }, 500)
    },
    insertEvent (row, column) {
      const $table = this.$refs.xTable
      $table.insertAt(null, row || -1).then(({ row }) => {
        $table.setActiveCell(row, column || 'name')
      })
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
      const $table = this.$refs.xTable
      switch (menu.code) {
        case 'hideColumn':
          $table.hideColumn(column)
          break
        case 'showAllColumn':
          $table.resetColumn()
          break
        case 'copy':
          if (XEClipboard.copy(row[column.property])) {
            this.$XModal.message({ content: '已复制到剪贴板！', status: 'success' })
          }
          break
        case 'reload':
          this.findList()
          break
        case 'insertAt':
          this.insertEvent(row, column)
          break
        case 'remove':
          $table.remove(row)
          break
        case 'save':
          this.$XModal.message({ content: '保存成功', status: 'success' })
          this.findList()
          break
      }
    },
    getInsertEvent () {
      const $table = this.$refs.xTable
      const insertRecords = $table.getInsertRecords()
      this.$XModal.alert(insertRecords.length)
    },
    getRemoveEvent () {
      const $table = this.$refs.xTable
      const removeRecords = $table.getRemoveRecords()
      this.$XModal.alert(removeRecords.length)
    },
    getUpdateEvent () {
      const $table = this.$refs.xTable
      const updateRecords = $table.getUpdateRecords()
      this.$XModal.alert(updateRecords.length)
    }
  }
}
</script>
