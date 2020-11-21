<template>
  <div>
    <p class="tip">设置 <table-api-link prop="edit-config"/> 的 <table-api-link prop="activeMethod"/> 方法判断单元格是否禁用，例如：限制第二行不允许编辑</p>

    <vxe-grid
      border
      show-overflow
      :columns="tableColumn"
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'row', activeMethod: activeRowMethod}"
      @edit-disabled="editDisabledEvent">
    </vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">配合  <table-api-link prop="edit-actived"/> 事件，实现行编辑中对列的权限控制，例如：限制 age 小于 27 的与 name 为 'x' 开头的列禁止编辑</p>

    <vxe-grid
      border
      show-overflow
      ref="xGrid"
      :columns="tableColumn2"
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'row'}"
      @edit-actived="editActivedEvent">
    </vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[3] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableColumn: [
        { type: 'seq', width: 50 },
        { field: 'name', title: 'app.body.label.name', editRender: { name: 'input' } },
        { field: 'sex', title: 'app.body.label.sex', editRender: { name: 'input' } },
        { field: 'age', title: 'Age', editRender: { name: 'input' } },
        { field: 'address', title: 'Address', editRender: { name: 'input' } }
      ],
      tableColumn2: [
        { type: 'seq', width: 50 },
        { field: 'name', title: 'app.body.label.name', editRender: { name: 'input', attrs: { disabled: false } } },
        { field: 'sex', title: 'app.body.label.sex', editRender: { name: 'input', attrs: { disabled: false } } },
        { field: 'age', title: 'Age', editRender: { name: 'input', attrs: { disabled: false } } },
        { field: 'address', title: 'Address', editRender: { name: 'input' } }
      ],
      tableData: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
      ],
      demoCodes: [
        `
        <vxe-grid
          border
          show-overflow
          :columns="tableColumn"
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'row', activeMethod: activeRowMethod}"
          @edit-disabled="editDisabledEvent">
        </vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableColumn: [
                { type: 'seq', width: 50 },
                { field: 'name', title: 'app.body.label.name', editRender: { name: 'input' } },
                { field: 'sex', title: 'app.body.label.sex', editRender: { name: 'input' } },
                { field: 'age', title: 'Age', editRender: { name: 'input' } },
                { field: 'address', title: 'Address', editRender: { name: 'input' } }
              ],
              tableData: [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
              ]
            }
          },
          methods: {
            activeRowMethod ({ row, rowIndex }) {
              if (rowIndex === 1) {
                return false
              }
              return true
            },
            editDisabledEvent ({ row, column }) {
              alert('禁止编辑')
            }
          }
        }
        `,
        `
        <vxe-grid
          border
          show-overflow
          ref="xGrid"
          :columns="tableColumn"
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'row'}"
          @edit-actived="editActivedEvent">
        </vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableColumn: [
                { type: 'seq', width: 50 },
                { field: 'name', title: 'app.body.label.name', editRender: { name: 'input', attrs: { disabled: false } } },
                { field: 'sex', title: 'app.body.label.sex', editRender: { name: 'input', attrs: { disabled: false } } },
                { field: 'age', title: 'Age', editRender: { name: 'input', attrs: { disabled: false } } },
                { field: 'address', title: 'Address', editRender: { name: 'input' } }
              ],
              tableData: [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' }
              ]
            }
          },
          methods: {
            editActivedEvent ({ row }) {
              let xGrid = this.$refs.xGrid
              let nameColumn = xGrid.getColumnByField('name')
              let ageColumn = xGrid.getColumnByField('age')
              let sexColumn = xGrid.getColumnByField('sex')
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
  methods: {
    activeRowMethod ({ rowIndex }) {
      if (rowIndex === 1) {
        return false
      }
      return true
    },
    editActivedEvent ({ row }) {
      const xGrid = this.$refs.xGrid
      const nameColumn = xGrid.getColumnByField('name')
      const ageColumn = xGrid.getColumnByField('age')
      const sexColumn = xGrid.getColumnByField('sex')
      // name 为 'x' 开头的列禁止编辑
      const isNameDisabled = (row.name || '').indexOf('x') === 0
      // age 小于 27 的列禁止编辑
      const isAgeDisabled = row.age < 27
      // sex 值编辑为 1 的列禁止编辑
      const isSexDisabled = row.sex === '1'

      nameColumn.editRender.attrs.disabled = isNameDisabled
      ageColumn.editRender.attrs.disabled = isAgeDisabled
      sexColumn.editRender.attrs.disabled = isSexDisabled
    },
    editDisabledEvent () {
      this.$XModal.alert('禁止编辑')
    }
  }
}
</script>
