<template>
  <div>
    <vxe-button @click="handleSort('role', 'desc')">只修改 role 倒序</vxe-button>
    <vxe-button @click="handleSort('role', 'asc')">只修改 role 升序</vxe-button>
    <vxe-button @click="handleUpdateSort($event, 'role', 'desc')">修改并触发 role 倒序</vxe-button>
    <vxe-button @click="handleUpdateSort($event, 'role', 'asc')">修改并触发 role 升序</vxe-button>
    <vxe-button @click="handleClearEvent">清除排序</vxe-button>

    <vxe-grid
      ref="gridRef"
      v-bind="gridOptions"
      @sort-change="sortChangeEvent"
      @clear-all-sort="clearSortSortEvent">
    </vxe-grid>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
export default {
  data () {
    const gridOptions = {
      border: true,
      loading: false,
      height: 300,
      sortConfig: {
        remote: true,
        multiple: true
      },
      columns: [
        { type: 'seq', width: 70 },
        { field: 'name', title: 'Name' },
        { field: 'role', title: 'Role', sortable: true },
        { field: 'sex', title: 'Sex', sortable: true },
        { field: 'age', title: 'Age', sortable: true },
        { field: 'address', title: 'Address', sortable: true }
      ],
      data: []
    }
    return {
      gridOptions
    }
  },
  methods: {
    findList (field, order) {
      this.gridOptions.loading = true
      // 模拟接口
      return new Promise(resolve => {
        setTimeout(() => {
          this.gridOptions.loading = false
          const mockList = [
            { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, num: '3.8', num2: '3.8', address: 'test abc' },
            { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, num: '511', num2: '511', address: 'Guangzhou' },
            { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, num: '12.8', num2: '12.8', address: 'Shanghai' },
            { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, num: '103', num2: '103', address: 'test abc' },
            { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, num: '56', num2: '56', address: 'Shanghai' },
            { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, num: '49', num2: '49', address: 'test abc' },
            { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, num: '400.9', num2: '400.9', address: 'test abc' },
            { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, num: '5000', num2: '5000', address: 'test abc' }
          ]
          if (field && order) {
            const rest = XEUtils.orderBy(mockList, { field, order })
            this.gridOptions.data = rest
            resolve(rest)
          } else {
            this.gridOptions.data = mockList
            resolve(mockList)
          }
        }, 300)
      })
    },
    sortChangeEvent ({ field, order }) {
      this.findList(field, order)
    },
    clearSortSortEvent () {
      this.findList('', null)
    },
    handleSort (field, order) {
      const $grid = this.$refs.gridRef
      if ($grid) {
        // 设置排序状态，默认不会更新数据，调用该方法不会触发任何事件
        $grid.setSort({ field, order })
      }
    },
    handleUpdateSort (params, field, order) {
      const $grid = this.$refs.gridRef
      if ($grid) {
        // 设置排序状态，调用该方法会自动触发 sort-change 事件
        $grid.setSortByEvent(params.$event, { field, order })
      }
    },
    handleClearEvent ({ $event }) {
      const $grid = this.$refs.gridRef
      if ($grid) {
        // 单列排序模式，清除排序，调用该方法会自动触发 clear-sort 与 sort-change 事件
        $grid.clearSortByEvent($event)
      }
    }
  },
  created () {
    this.findList()
  }
}
</script>
