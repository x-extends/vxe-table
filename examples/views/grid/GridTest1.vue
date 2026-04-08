<template>
  <div>
    <vxe-radio-group v-model="gridOptions.height">
      <vxe-radio-button checked-value="200" content="高度200"></vxe-radio-button>
      <vxe-radio-button checked-value="" content="不设置高度"></vxe-radio-button>
    </vxe-radio-group>
    <vxe-grid v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script>
export default {
  data () {
    const gridOptions = {
      border: true,
      height: '',
      rowConfig: {
        keyField: 'id'
      },
      columnConfig: {
        resizable: true
      },
      toolbarConfig: {
        custom: true
      },
      columns: [
        { type: 'seq', width: 70 },
        { field: 'name', title: 'Name' },
        { field: 'role', title: 'Role' },
        { field: 'sex', title: 'Sex' },
        { field: 'age', title: 'Age' },
        { field: 'attr1', title: 'Attr1' },
        { field: 'attr2', title: 'Attr2' },
        { field: 'attr3', title: 'Attr3' },
        { field: 'attr4', title: 'Attr4' },
        { field: 'address', title: 'Address' }
      ],
      data: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' }
      ]
    }
    return {
      gridOptions
    }
  }
}
</script>
