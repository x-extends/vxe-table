<template>
  <div>
    <vxe-table
      border
      stripe
      resizable
      show-footer
      height="400"
      :row-config="{isHover: true}"
      :loading="demo1.loading"
      :checkbox-config="{labelField: 'id', highlight: true, range: true}"
      :data="demo1.tableData"
      :footer-data="demo1.footerData">
      <vxe-column type="seq" width="auto"></vxe-column>
      <vxe-column type="checkbox" title="ID" width="auto"></vxe-column>
      <vxe-column field="role" title="Role" width="auto"></vxe-column>
      <vxe-column field="name" title="Name Name Name Name Name" width="auto"></vxe-column>
      <vxe-column field="age" title="Age" width="auto"></vxe-column>
      <vxe-column field="sex" title="Sex" width="auto"></vxe-column>
      <vxe-column field="address" title="Address Address Address" width="auto" show-overflow></vxe-column>
    </vxe-table>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'

const demo1 = reactive({
  loading: false,
  tableData: [] as any[],
  footerData: [
    { name: 'xxx xxx x xxx xxx xxxx xxx xxxx xxx xxxx xxx xxxx xxx xxxx xxx x', address: 'xxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xxxxx xx' }
  ]
})

onMounted(() => {
  demo1.loading = true
  setTimeout(() => {
    demo1.tableData = [
      { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'test abc' },
      { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
      { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
      { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'test abc' },
      { id: 10005, name: 'Test5', role: 'Devel543535 sdf sdf sdf sd op', sex: '1', age: 30, address: 'Shanghai' },
      { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'test abc' },
      { id: 10007, name: 'Test7', role: 'Test', sex: '0', age: 29, address: 'test abc' },
      { id: 10008, name: 'Test8', role: 'Devdsf sdf  elop', sex: '0', age: 35, address: 'test abc' },
      { id: 10009, name: 'Test9', role: 'Test', sex: '1', age: 21, address: 'test abc' },
      { id: 10010, name: 'Test10', role: 'Develop', sex: '0', age: 28, address: 'test abc' },
      { id: 10011, name: 'Test11', role: 'Test', sex: '0', age: 29, address: 'test abc' },
      { id: 10012, name: 'Test12', role: 'Develop', sex: '1', age: 27, address: 'test abc' },
      { id: 10013, name: 'Test13', role: 'Test', sex: '0', age: 24, address: 'test abc' },
      { id: 10014, name: 'Test14', role: 'Develop', sex: '1', age: 34, address: 'test abc' },
      { id: 10015, name: 'Test15', role: 'Tes sdfsd fsd fdss ff sd fds sdf fsdf st', sex: '1', age: 21, address: 'test abc' },
      { id: 10016, name: 'Test16', role: 'Develop', sex: '0', age: 20, address: 'test abc' },
      { id: 10017, name: 'Test17', role: 'Test', sex: '1', age: 31, address: 'test abc' },
      { id: 10018, name: 'Test18', role: 'Develop', sex: '0', age: 32, address: 'test abc' },
      { id: 10019, name: 'Test19', role: 'Test', sex: '1', age: 37, address: 'test abc' },
      { id: 10020, name: 'Test20', role: 'Develop', sex: '1', age: 41, address: 'test abc' }
    ]
    demo1.loading = false
  }, 100)
})
</script>
