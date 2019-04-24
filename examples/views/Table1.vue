<template>
  <div>
    <!-- <xe-table
      height="200"
      border
      :data.sync="tableData"
      :customs.sync="customColumns">
      <xe-table-index width="20%"></xe-table-index>
      <xe-table-cell prop="address" label="地址" width="20%">
        <template v-slot="scope">
          <span>{{ test(scope) }}</span>
        </template>
      </xe-table-cell>
      <xe-table-cell prop="phone" label="手机" width="20%"></xe-table-cell>
      <xe-table-cell prop="name" label="名称" width="20%"></xe-table-cell>
      <xe-table-cell prop="age" label="年龄" width="10%"></xe-table-cell>
      <xe-table-cell prop="address" label="地址" width="10%">
        <template v-slot="scope">
          <span>{{ test(scope) }}</span>
        </template>
      </xe-table-cell>
    </xe-table> -->
    <!-- <xe-table
      height="300"
      :data.sync="tableData">
      <xe-column-group label="分组">
        <xe-column-cell prop="name" label="名称" min-width="200"></xe-column-cell>
        <xe-column-cell prop="date" label="日期" min-width="200"></xe-column-cell>
        <xe-column-group label="分组2">
          <xe-column-cell prop="name" label="名称" min-width="200"></xe-column-cell>
          <xe-column-cell prop="date" label="日期" min-width="400"></xe-column-cell>
        </xe-column-group>
      </xe-column-group>
      <xe-column-cell prop="age" label="年龄" width="200"></xe-column-cell>
      <xe-column-group label="分组3">
        <xe-column-cell prop="name" label="名称" min-width="200"></xe-column-cell>
        <xe-column-cell prop="date" label="日期" min-width="200"></xe-column-cell>
      </xe-column-group>
      <xe-column-cell prop="sex" label="性别" width="200"></xe-column-cell>
    </xe-table> -->

    <xe-table
      height="500"
      :data.sync="tableData">
      <xe-column-checkbox prop="checked" width="60"></xe-column-checkbox>
      <xe-column-cell prop="name" label="名称"></xe-column-cell>
      <xe-column-cell prop="age" label="年龄"></xe-column-cell>
      <xe-column-cell prop="sex" label="性别"></xe-column-cell>
      <xe-column-cell prop="rate" label="评分"></xe-column-cell>
      <xe-column-cell prop="date" label="日期"></xe-column-cell>
      <xe-column-cell prop="phone" label="手机"></xe-column-cell>
      <xe-column-cell prop="address" label="地址">
        <template v-slot="{ row }">
          <span>{{ row.address }}</span>
        </template>
      </xe-column-cell>
    </xe-table>
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
    let list = window.CACHE_DATA_LIST.slice(0, 500)
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
      debugger
    }
  }
}
</script>
