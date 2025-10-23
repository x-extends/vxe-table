<template>
  <div>
    <button @click="gridRef.commitProxy('reload')">reload</button>
    <button @click="gridRef.commitProxy('query')">query</button>
    <vxe-grid ref="gridRef" v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
const gridRef = ref()
const gridOptions = reactive({
  height: 400,
  virtualYConfig: {
    enabled: true,
    gt: 10
  },
  columns: [
    { type: 'seq', width: 70 },
    { field: 'name', title: 'Name' },
    { field: 'sex', title: 'Sex' },
    { field: 'age', title: 'Age' }
  ],
  proxyConfig: {
    response: {
      list: 'data'
    },
    ajax: {
      query: () => {
        console.log('query')
        return {
          data: [
            {
              id: 10001,
              name: 'Test1',
              role: 'Develop',
              sex: 'Man',
              age: 28,
              address: 'test abc'
            },
            {
              id: 10002,
              name: 'Test2',
              role: 'Test',
              sex: 'Women',
              age: 22,
              address: 'Guangzhou'
            },
            {
              id: 10003,
              name: 'Test3',
              role: 'PM',
              sex: 'Man',
              age: 32,
              address: 'Shanghai'
            },
            {
              id: 10004,
              name: 'Test4',
              role: 'Designer',
              sex: 'Women',
              age: 24,
              address: 'Shanghai'
            },
            {
              id: 10001,
              name: 'Test1',
              role: 'Develop',
              sex: 'Man',
              age: 28,
              address: 'test abc'
            },
            {
              id: 10002,
              name: 'Test2',
              role: 'Test',
              sex: 'Women',
              age: 22,
              address: 'Guangzhou'
            },
            {
              id: 10003,
              name: 'Test3',
              role: 'PM',
              sex: 'Man',
              age: 32,
              address: 'Shanghai'
            },
            {
              id: 10004,
              name: 'Test4',
              role: 'Designer',
              sex: 'Women',
              age: 24,
              address: 'Shanghai'
            },
            {
              id: 10001,
              name: 'Test1',
              role: 'Develop',
              sex: 'Man',
              age: 28,
              address: 'test abc'
            },
            {
              id: 10002,
              name: 'Test2',
              role: 'Test',
              sex: 'Women',
              age: 22,
              address: 'Guangzhou'
            },
            {
              id: 10003,
              name: 'Test3',
              role: 'PM',
              sex: 'Man',
              age: 32,
              address: 'Shanghai'
            },
            {
              id: 10004,
              name: 'Test4',
              role: 'Designer',
              sex: 'Women',
              age: 24,
              address: 'Shanghai'
            },
            {
              id: 10001,
              name: 'Test1',
              role: 'Develop',
              sex: 'Man',
              age: 28,
              address: 'test abc'
            },
            {
              id: 10002,
              name: 'Test2',
              role: 'Test',
              sex: 'Women',
              age: 22,
              address: 'Guangzhou'
            },
            {
              id: 10003,
              name: 'Test3',
              role: 'PM',
              sex: 'Man',
              age: 32,
              address: 'Shanghai'
            },
            {
              id: 10004,
              name: 'Test4',
              role: 'Designer',
              sex: 'Women',
              age: 24,
              address: 'Shanghai'
            },
            {
              id: 10001,
              name: 'Test1',
              role: 'Develop',
              sex: 'Man',
              age: 28,
              address: 'test abc'
            },
            {
              id: 10002,
              name: 'Test2',
              role: 'Test',
              sex: 'Women',
              age: 22,
              address: 'Guangzhou'
            },
            {
              id: 10003,
              name: 'Test3',
              role: 'PM',
              sex: 'Man',
              age: 32,
              address: 'Shanghai'
            },
            {
              id: 10004,
              name: 'Test4',
              role: 'Designer',
              sex: 'Women',
              age: 24,
              address: 'Shanghai'
            },
            {
              id: 10001,
              name: 'Test1',
              role: 'Develop',
              sex: 'Man',
              age: 28,
              address: 'test abc'
            },
            {
              id: 10002,
              name: 'Test2',
              role: 'Test',
              sex: 'Women',
              age: 22,
              address: 'Guangzhou'
            },
            {
              id: 10003,
              name: 'Test3',
              role: 'PM',
              sex: 'Man',
              age: 32,
              address: 'Shanghai'
            },
            {
              id: 10004,
              name: 'Test4',
              role: 'Designer',
              sex: 'Women',
              age: 24,
              address: 'Shanghai'
            },
            {
              id: 10001,
              name: 'Test1',
              role: 'Develop',
              sex: 'Man',
              age: 28,
              address: 'test abc'
            },
            {
              id: 10002,
              name: 'Test2',
              role: 'Test',
              sex: 'Women',
              age: 22,
              address: 'Guangzhou'
            },
            {
              id: 10003,
              name: 'Test3',
              role: 'PM',
              sex: 'Man',
              age: 32,
              address: 'Shanghai'
            },
            {
              id: 10004,
              name: 'Test4',
              role: 'Designer',
              sex: 'Women',
              age: 24,
              address: 'Shanghai'
            },
            {
              id: 10001,
              name: 'Test1',
              role: 'Develop',
              sex: 'Man',
              age: 28,
              address: 'test abc'
            },
            {
              id: 10002,
              name: 'Test2',
              role: 'Test',
              sex: 'Women',
              age: 22,
              address: 'Guangzhou'
            },
            {
              id: 10003,
              name: 'Test3',
              role: 'PM',
              sex: 'Man',
              age: 32,
              address: 'Shanghai'
            },
            {
              id: 10004,
              name: 'Test4',
              role: 'Designer',
              sex: 'Women',
              age: 24,
              address: 'Shanghai'
            },
            {
              id: 10001,
              name: 'Test1',
              role: 'Develop',
              sex: 'Man',
              age: 28,
              address: 'test abc'
            },
            {
              id: 10002,
              name: 'Test2',
              role: 'Test',
              sex: 'Women',
              age: 22,
              address: 'Guangzhou'
            },
            {
              id: 10003,
              name: 'Test3',
              role: 'PM',
              sex: 'Man',
              age: 32,
              address: 'Shanghai'
            },
            {
              id: 10004,
              name: 'Test4',
              role: 'Designer',
              sex: 'Women',
              age: 24,
              address: 'Shanghai'
            }
          ]
        }
      }
    }
  }
})
</script>

<style scoped></style>
