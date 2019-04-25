<template>
  <div>
    <!-- <vxe-table
      height="200"
      border
      :data.sync="tableData"
      :customs.sync="customColumns">
      <vxe-table-index width="20%"></vxe-table-index>
      <vxe-table-cell prop="address" label="地址" width="20%">
        <template v-slot="scope">
          <span>{{ test(scope) }}</span>
        </template>
      </vxe-table-cell>
      <vxe-table-cell prop="phone" label="手机" width="20%"></vxe-table-cell>
      <vxe-table-cell prop="name" label="名称" width="20%"></vxe-table-cell>
      <vxe-table-cell prop="age" label="年龄" width="10%"></vxe-table-cell>
      <vxe-table-cell prop="address" label="地址" width="10%">
        <template v-slot="scope">
          <span>{{ test(scope) }}</span>
        </template>
      </vxe-table-cell>
    </vxe-table> -->
    <!-- <vxe-table
      height="300"
      :data.sync="tableData">
      <vxe-column-group label="分组">
        <vxe-column-cell prop="name" label="名称" min-width="200"></vxe-column-cell>
        <vxe-column-cell prop="date" label="日期" min-width="200"></vxe-column-cell>
        <vxe-column-group label="分组2">
          <vxe-column-cell prop="name" label="名称" min-width="200"></vxe-column-cell>
          <vxe-column-cell prop="date" label="日期" min-width="400"></vxe-column-cell>
        </vxe-column-group>
      </vxe-column-group>
      <vxe-column-cell prop="age" label="年龄" width="200"></vxe-column-cell>
      <vxe-column-group label="分组3">
        <vxe-column-cell prop="name" label="名称" min-width="200"></vxe-column-cell>
        <vxe-column-cell prop="date" label="日期" min-width="200"></vxe-column-cell>
      </vxe-column-group>
      <vxe-column-cell prop="sex" label="性别" width="200"></vxe-column-cell>
    </vxe-table> -->

    <vxe-table
      height="500"
      :data.sync="tableData">
      <vxe-column-checkbox prop="checked" width="60"></vxe-column-checkbox>
      <vxe-column-cell prop="name" label="名称"></vxe-column-cell>
      <vxe-column-cell prop="age" label="年龄"></vxe-column-cell>
      <vxe-column-cell prop="sex" label="性别"></vxe-column-cell>
      <vxe-column-cell prop="rate" label="评分"></vxe-column-cell>
      <vxe-column-sort prop="date" label="日期" @change="changeEvnet"></vxe-column-sort>
      <vxe-column-cell prop="address" label="地址">
        <template v-slot="{ row }">
          <span>{{ row.address }}</span>
        </template>
      </vxe-column-cell>
    </vxe-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  created () {
    let list = window.CACHE_DATA_LIST.slice(0, 1000)
    this.tableData = list
  },
  methods: {
    formatterPhone ({ cellValue }) {
      return `formatter_${cellValue}`
    },
    indexMethod ({ rowIndex }) {
      return rowIndex * 2
    },
    dblclickEvent (params) {

    },
    changeEvnet (params) {

    }
  }
}
</script>
