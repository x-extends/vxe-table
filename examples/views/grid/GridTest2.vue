<template>
  <div>
    <p>Grid</p>
    <vxe-grid class="merge_table" v-bind="gridOptions">
      <template #mergeCell="{ row }">
        <div>{{ row.mergeCell }}</div>
      </template>
    </vxe-grid>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      mergeCells: [],
      gridOptions: {
        border: true,
        height: 300,
        columnConfig: {
          resizable: true
        },
        virtualYConfig: {
          enabled: true,
          gt: 0
        },
        // border: 'default',
        // rowStyle: this.rowStyleHandle,
        columns: [
          {
            filld: 'mergeCell',
            minWidth: 200,
            fixed: 'left',
            className: 'adaptive_cell',
            slots: { default: 'mergeCell' },
            title: '合并列'
          },
          { field: 'name', width: 600, title: 'Name' },
          { field: 'sex', width: 600, title: 'Sex' },
          { field: 'date', width: 600, title: 'Date' },
          { field: 'address', minWidth: 400, title: 'Address', fixed: 'right' }
        ],
        data: []
      }
    }
  },

  methods: {
    // 处理行样式
    // rowStyleHandle({ row }) {
    //   if (row.isParentRow) {
    //     return {
    //       // 这里是通过监听容器变化和列宽事件来更新需要合并的实际宽度
    //       "--adaptive-width": `1000px`,
    //     };
    //   }
    //   return "";
    // },
    countAllChildren (node) {
      let count = 1 // 初始化计数器，加1因为至少有一个自身
      if (node?.children) {
        for (let i = 0; i < node.children.length; i++) {
          count += this.countAllChildren(node.children[i]) // 递归计算每个子节点的总数
        }
      }
      return count // 返回最终计数
    }
  },
  created () {
    const list1 = []
    const list2 = []
    for (let index = 0; index < 300; index++) {
      const isParent = index % 3 === 0
      list2.push({
        isParentRow: isParent,
        mergeCell: isParent
          ? '我是演示合并的单元格,他有时候会撑满整行,左固定并没有裁切,右固定列的高度出现了高度塌陷'
          : '我是子行',
        name: !isParent ? 'test' + index : '',
        role: !isParent ? 'developer' : '',
        sex: !isParent ? 'Man' : '',
        date: !isParent ? '2019-05-01' : '',
        time: !isParent ? 1556677810888 + index * 500 : '',
        region: !isParent ? 'ShenZhen' : '',
        address: 'address abc' + index
      })
    }
    const mergeCells = list2.reduce((pre, row, rowIndex) => {
      if (row.isParentRow) {
        pre.push({
          row: rowIndex,
          col: 0,
          rowspan: 1,
          colspan: 5
        })
      }

      return pre
    }, [])
    // this.tableData = list1;
    this.gridOptions.mergeCells = mergeCells
    this.gridOptions.data = list2
  }
}
</script>
<style lang="scss">
// .merge_table {
//   .adaptive_cell {
//     overflow: visible !important;
//     visibility: visible !important;
//     z-index: 2;

//     .vxe-cell {
//       width: var(--adaptive-width) !important;
//     }
//   }
// }
</style>
