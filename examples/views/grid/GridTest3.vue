<template>
  <div>
      <button @click="handleRefresh">刷新数据</button>
    <vxe-grid v-bind="gridOptions">
           <template #expand_content="{ row }">
                <div class="expand-wrapper">
                    <vxe-grid v-bind="childGridOptions" :data="row.childList"></vxe-grid>
                </div>
            </template>
      </vxe-grid>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  data () {
    return {
      gridOptions: {
        border: true,
        columns: [
          { type: 'seq', width: 60 },
          { type: 'expand', width: 60, slots: { content: 'expand_content' } },
          { field: 'name', title: 'Name' },
          { field: 'sex', title: 'Sex' },
          { field: 'date', title: 'Date' },
          { field: 'address', title: 'Address' }
        ],
        data: [],
        expandConfig: {
          padding: true,
          reserve: true
        },
        rowConfig: {
          keyField: 'id',
          isHover: true
        }
      },
      childGridOptions: {
        border: true,
        height: 200,
        columns: [
          { field: 'name', title: 'Name' },
          { field: 'sex', title: 'Sex' },
          { field: 'age', title: 'Age' }
        ]
      }
    }
  },
  created () {
    const list2 = []
    for (let index = 0; index < 3; index++) {
      list2.push({
        id: index + 1,
        name: 'test' + index,
        role: 'developer',
        sex: 'Man',
        date: '2019-05-01',
        time: 1556677810888 + index * 500,
        region: 'ShenZhen',
        address: 'address abc' + index,
        childList: [
          { id: 10011, name: 'Test112', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' }
        ]
      })
    }
    this.gridOptions.data = list2
  },
  methods: {
    // 刷新数据方法
    handleRefresh () {
      const list2 = []
      for (let index = 0; index < 3; index++) {
        list2.push({
          id: index + 1,
          name: '2test' + index,
          role: 'developer',
          sex: 'Man',
          date: '2019-05-01',
          time: 1556677810888 + index * 500,
          region: 'ShenZhen',
          address: 'address abc' + index,
          childList: [
            { id: 10011, name: '李四', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' }
          ]
        })
      }
      this.gridOptions.data = list2
      console.log(this.gridOptions.data)
    }
  }
})
</script>

<style scoped></style>
