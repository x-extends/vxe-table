<template>
  <div>
    <p class="tip">
      设置 <table-api-link prop="mouse-config"/>={selected: true} 启用单元格选中功能<span class="red">（只能用于 <table-api-link prop="edit-config"/>.<table-api-link prop="mode"/>=cell 有效）</span><br>
      通过 <table-api-link prop="keyboard-config"/>={<table-api-link prop="editMethod"/>} 重写默认的编辑方法，改为追加的方式
    </p>

    <vxe-table
      border
      show-overflow
      show-footer
      ref="xTable"
      height="500"
      :data="tableData"
      :footer-method="footerMethod"
      :mouse-config="{selected: true}"
      :checkbox-config="{range: true}"
      :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true, editMethod}"
      :edit-config="{trigger: 'dblclick', mode: 'cell'}">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-column>
      <vxe-column field="age" title="Age" :edit-render="{name: 'input'}"></vxe-column>
      <vxe-column field="date12" title="Date" :edit-render="{name: '$input'}"></vxe-column>
      <vxe-column field="address" title="Address" :edit-render="{name: '$input'}"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
      ],
      demoCodes: [
        `
        <vxe-table
          border
          show-overflow
          show-footer
          ref="xTable"
          height="500"
          :data="tableData"
          :footer-method="footerMethod"
          :mouse-config="{selected: true}"
          :checkbox-config="{range: true}"
          :keyboard-config="{isArrow: true, isDel: true, isEnter: true, isTab: true, isEdit: true, editMethod}"
          :edit-config="{trigger: 'dblclick', mode: 'cell'}">
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column type="checkbox" width="60"></vxe-column>
          <vxe-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-column>
          <vxe-column field="age" title="Age" :edit-render="{name: 'input'}"></vxe-column>
          <vxe-column field="date12" title="Date" :edit-render="{name: '$input'}"></vxe-column>
          <vxe-column field="address" title="Address" :edit-render="{name: '$input'}"></vxe-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
              ]
            }
          },
          methods: {
            editMethod ({ row, column }) {
              const $table = this.$refs.xTable
              // 重写默认的覆盖式，改为追加式
              $table.setActiveCell(row, column)
            },
            sumNum (list, field) {
              let count = 0
              list.forEach(item => {
                count += Number(item[field])
              })
              return count
            },
            footerMethod ({ columns, data }) {
              return [
                columns.map((column, columnIndex) => {
                  if (columnIndex === 0) {
                    return '和值'
                  }
                  if (['age'].includes(column.property)) {
                    return this.sumNum(data, column.property)
                  }
                  return null
                })
              ]
            }
          }
        }
        `
      ]
    }
  },
  methods: {
    editMethod ({ row, column }) {
      const $table = this.$refs.xTable
      // 重写默认的覆盖式，改为追加式
      $table.setActiveCell(row, column)
    },
    sumNum (list, field) {
      let count = 0
      list.forEach(item => {
        count += Number(item[field])
      })
      return count
    },
    footerMethod ({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return '和值'
          }
          if (['age'].includes(column.property)) {
            return this.sumNum(data, column.property)
          }
          return null
        })
      ]
    }
  }
}
</script>
