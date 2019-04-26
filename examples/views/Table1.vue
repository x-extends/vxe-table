<template>
  <div>
    <!-- <vxe-table
      height="200"
      border
      :data.sync="tableData"
      :customs.sync="customColumns">
      <vxe-table-column type="index"></vxe-table-column>
      <vxe-table-column prop="address" label="地址">
        <template v-slot="scope">
          <span>{{ test(scope) }}</span>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="phone" label="手机"></vxe-table-column>
      <vxe-table-column prop="name" label="名称"></vxe-table-column>
      <vxe-table-column prop="age" label="年龄"></vxe-table-column>
      <vxe-table-column prop="address" label="地址">
        <template v-slot="scope">
          <span>{{ test(scope) }}</span>
        </template>
      </vxe-table-column>
    </vxe-table> -->

    <!-- <vxe-table
      height="300"
      border
      :data.sync="tableData">
      <vxe-table-column label="分组">
        <vxe-table-column prop="name" label="名称" min-width="200"></vxe-table-column>
        <vxe-table-column prop="date" label="日期" min-width="200"></vxe-table-column>
        <vxe-table-column label="分组2">
          <vxe-table-column prop="name" label="名称" min-width="200"></vxe-table-column>
          <vxe-table-column prop="date" label="日期" min-width="400"></vxe-table-column>
        </vxe-table-column>
      </vxe-table-column>
      <vxe-table-column prop="age" label="年龄" width="200"></vxe-table-column>
      <vxe-table-column label="分组3">
        <vxe-table-column prop="name" label="名称" min-width="200"></vxe-table-column>
        <vxe-table-column prop="date" label="日期" min-width="200"></vxe-table-column>
      </vxe-table-column>
      <vxe-table-column prop="sex" label="性别" width="200"></vxe-table-column>
    </vxe-table> -->

    <vxe-table
      height="500"
      border
      :data.sync="tableData">
      <vxe-table-column type="index" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column type="radio" width="60"></vxe-table-column>
      <vxe-table-column type="selection" prop="checked" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="名称" width="400"></vxe-table-column>
      <vxe-table-column prop="age" label="年龄" width="400"></vxe-table-column>
      <vxe-table-column prop="sex" label="性别" width="400"></vxe-table-column>
      <vxe-table-column prop="rate" label="评分" width="400" :filters="[]"></vxe-table-column>
      <vxe-table-column prop="date" label="日期" width="400" sortable></vxe-table-column>
      <vxe-table-column prop="address" label="地址" width="300" fixed="right">
        <template v-slot="{ row }">
          <span>{{ row.address }}</span>
        </template>
      </vxe-table-column>
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
    let list = window.CACHE_DATA_LIST.slice(0, 100)
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
