<template>
  <div>
    <p class="tip">设置 <table-api-link prop="edit-config"/> 的 <table-api-link prop="activeMethod"/> 方法判断单元格是否禁用，例如：限制第二行不允许编辑</p>

    <vxe-table
      border
      show-overflow
      height="400"
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'row', activeMethod: activeRowMethod}"
      @edit-disabled="editDisabledEvent">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'select', options: sexList}"></vxe-table-column>
      <vxe-table-column field="date12" title="Date" :edit-render="{name: 'input'}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">配合  <table-api-link prop="edit-actived"/> 事件，实现行编辑中对列的权限控制，例如：限制 age 小于 27 的与 name 为 'x' 开头的列禁止编辑</p>

    <vxe-table
      border
      show-overflow
      ref="xTable"
      height="400"
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'row'}"
      @edit-actived="editActivedEvent">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', attrs: {disabled: false}}"></vxe-table-column>
      <vxe-table-column field="age" title="Age" :edit-render="{name: 'input', attrs: {disabled: false}}"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'select', options: sexList, attrs: {disabled: false}}"></vxe-table-column>
      <vxe-table-column field="date12" title="Date" :edit-render="{name: 'input'}"></vxe-table-column>
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

export default {
  data () {
    return {
      tableData: [],
      sexList: [],
      demoCodes: [
        `
        <vxe-table
          border
          show-overflow
          height="400"
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'row', activeMethod: activeRowMethod}"
          @edit-disabled="editDisabledEvent">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'select', options: sexList}"></vxe-table-column>
          <vxe-table-column field="date12" title="Date" :edit-render="{name: 'input'}"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              sexList: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
            this.findSexList()
          },
          methods: {
            findSexList () {
              return this.$ajax.get('/api/conf/sex/list').then(data => {
                this.sexList = data
              })
            },
            activeRowMethod ({ row, rowIndex }) {
              return rowIndex !== 1
            },
            editDisabledEvent ({ row, column }) {
              this.$XModal.alert('禁止编辑')
            }
          }
        }
        `,
        `
        <vxe-table
          border
          show-overflow
          ref="xTable"
          height="400"
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'row'}"
          @edit-actived="editActivedEvent">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', attrs: {disabled: false}}"></vxe-table-column>
          <vxe-table-column field="age" title="Age" :edit-render="{name: 'input', attrs: {disabled: false}}"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'select', options: sexList, attrs: {disabled: false}}"></vxe-table-column>
          <vxe-table-column field="date12" title="Date" :edit-render="{name: 'input'}"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              sexList: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
            this.findSexList()
          },
          methods: {
            findSexList () {
              return this.$ajax.get('/api/conf/sex/list').then(data => {
                this.sexList = data
              })
            },
            editActivedEvent ({ row }) {
              let xTable = this.$refs.xTable
              let nameColumn = xTable.getColumnByField('name')
              let ageColumn = xTable.getColumnByField('age')
              let sexColumn = xTable.getColumnByField('sex')
              // name 为 'x' 开头的列禁止编辑
              let isNameDisabled = (row.name || '').indexOf('x') === 0
              // age 小于 27 的列禁止编辑
              let isAgeDisabled = row.age < 27
              // sex 值编辑为 1 的列禁止编辑
              let isSexDisabled = row.sex === '1'

              nameColumn.editRender.attrs.disabled = isNameDisabled
              ageColumn.editRender.attrs.disabled = isAgeDisabled
              sexColumn.editRender.attrs.disabled = isSexDisabled
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 20)
    this.findSexList()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    findSexList () {
      return this.$ajax.get('/api/conf/sex/list').then(data => {
        this.sexList = data
      })
    },
    activeRowMethod ({ row, rowIndex }) {
      return rowIndex !== 1
    },
    editDisabledEvent ({ row, column }) {
      this.$XModal.alert('禁止编辑')
    },
    editActivedEvent ({ row }) {
      let xTable = this.$refs.xTable
      let nameColumn = xTable.getColumnByField('name')
      let ageColumn = xTable.getColumnByField('age')
      let sexColumn = xTable.getColumnByField('sex')
      // name 为 'x' 开头的列禁止编辑
      let isNameDisabled = (row.name || '').indexOf('x') === 0
      // age 小于 27 的列禁止编辑
      let isAgeDisabled = row.age < 27
      // sex 值编辑为 1 的列禁止编辑
      let isSexDisabled = row.sex === '1'

      nameColumn.editRender.attrs.disabled = isNameDisabled
      ageColumn.editRender.attrs.disabled = isAgeDisabled
      sexColumn.editRender.attrs.disabled = isSexDisabled
    }
  }
}
</script>
