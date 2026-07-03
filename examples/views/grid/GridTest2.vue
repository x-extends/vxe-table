<template>
  <div>
    <vxe-radio-group v-model="customConfig.mode">
      <vxe-radio-button checked-value="default" content="默认"></vxe-radio-button>
      <vxe-radio-button checked-value="modal" content="弹窗"></vxe-radio-button>
      <vxe-radio-button checked-value="drawer" content="抽屉"></vxe-radio-button>
    </vxe-radio-group>

    <vxe-grid v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script>
export default {
  data () {
    const customConfig = {
      storage: true,
      mode: 'modal'
    }
    const gridOptions = {
      border: true,
      id: 'myCustomStorage1',
      rowConfig: {
        keyField: 'id'
      },
      toolbarConfig: {
        custom: true
      },
      customConfig,
      columnConfig: {
        drag: true,
        resizable: true
      },
      columns: [
        { field: 'seq', type: 'seq', width: 90 },
        { field: 'name', title: 'Name' },
        { field: 'role', title: 'role' },
        { field: 'sex', title: 'Sex' },
        { field: 'age', title: 'Age' },
        { field: 'address', title: 'address' }
      ],
      data: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
      ]
    }
    return {
      gridOptions,
      customConfig
    }
  }
}
</script>
