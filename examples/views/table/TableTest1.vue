<template>
  <div>
 <button @click='handleEdit'>激活编辑状态</button>
      <vxe-grid ref='xGrid' v-bind="gridOptions"></vxe-grid>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      gridOptions: {
        border: true,
        height: 200,
        virtualYConfig: {
          enabled: true,
          gt: 10
        },
        mouseConfig: { selected: true },
        keyboardConfig: {
          isArrow: true,
          isTab: true,
          isEdit: true,
          isChecked: true
        },
        cellConfig: {
          height: 30
        },
        editConfig: {
          trigger: 'click',
          mode: 'cell',
          showStatus: true,
          autoFocus: true
        },
        columns: [
          { type: 'seq', width: 60 },
          {
            field: 'name',
            title: 'Name',
            editRender: {
              name: 'VxeInput',
              props: {
                clearable: true
              }
            }
          },
          { field: 'sex', title: 'Sex' },
          { field: 'date', title: 'Date' },
          { field: 'address', title: 'Address' }
        ],
        data: []
      }
    }
  },
  created () {
    const list2 = []
    for (let index = 0; index < 300; index++) {
      list2.push({
        name: 'test' + index,
        role: 'developer',
        sex: 'Man',
        date: '2019-05-01',
        time: 1556677810888 + index * 500,
        region: 'ShenZhen',
        address: 'address abc' + index
      })
    }
    this.gridOptions.data = list2
  },
  methods: {
    async handleEdit () {
      const { row } = await this.$refs.xGrid.insertAt({}, -1)
      // const { row } = await this.$refs.xGrid.insert({})
      this.$refs.xGrid.setEditRow(row, true)
      // this.$refs.xGrid.scrollToRow(row)
    }
  }
}
</script>
