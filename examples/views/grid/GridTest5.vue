<template>
  <div>
      <vxe-button status="primary" @click="handleClear">手动清除校验</vxe-button>
      <vxe-button status="primary" @click="handleReset">手动重置</vxe-button>
      <vxe-grid ref="gridRef" v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script>
export default {
  data () {
    const gridOptions = {
      showOverflow: true,
      border: true,
      height: 500,
      formConfig: {
        data: {
          name: '',
          role: '',
          sex: '',
          num: '',
          address: ''
        },
        items: [
          { field: 'name', title: 'Name', span: 12, itemRender: { name: 'VxeInput' } },
          { field: 'role', title: 'Role', span: 12, itemRender: { name: 'VxeInput' } },
          { field: 'age', title: 'Age', span: 12, itemRender: { name: 'VxeInput' } },
          {
            span: 6,
            itemRender: {
              name: 'VxeButtonGroup',
              options: [
                { type: 'submit', content: '搜索', status: 'primary' },
                { type: 'reset', content: '重置' }
              ]
            }
          }
        ],
        rules: {
          name: [{ required: true, message: 'name不能为空' }]
        }
      },
      columns: [
        { field: 'seq', type: 'seq', width: 70 },
        { field: 'name', title: 'Name' },
        { field: 'sex', title: 'Sex' },
        { field: 'num', title: 'Num' },
        { field: 'address', title: 'Address' }
      ],
      data: [
        { id: '10001', name: 'Test1', role: 'Develop', sex: 'Man', num: '28', address: 'test abc' },
        { id: '10002', name: 'Test2', role: 'Test', sex: 'Women', num: '22', address: 'Guangzhou' },
        { id: '10003', name: 'Test3', role: 'PM', sex: 'Man', num: '32', address: 'Shanghai' },
        { id: '10004', name: 'Test4', role: 'Designer', sex: 'Women', num: '24', address: 'Shanghai' },
        { id: '10005', name: 'Test5', role: 'Develop', sex: 'Man', num: '42', address: 'Guangzhou' },
        { id: '10006', name: 'Test6', role: 'Test', sex: 'Women', num: '39', address: 'Shanghai' },
        { id: '10007', name: 'Test7', role: 'Develop', sex: 'Man', num: '46', address: 'Shanghai' },
        { id: '10008', name: 'Test8', role: 'PM', sex: 'Women', num: '49', address: 'Guangzhou' }
      ]
    }
    return {
      gridOptions
    }
  },
  methods: {
    handleClear () {
      this.$refs.gridRef.clearFormValidate()
      console.log('111')
    },
    handleReset () {
      this.$refs.gridRef.resetForm()
      console.log('222')
    }
  }
}
</script>
