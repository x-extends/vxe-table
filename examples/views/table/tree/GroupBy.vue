<template>
  <div>
    <p class="tip">基于树表格实现分组统计</p>

    <vxe-table
      border
      resizable
      :loading="loading"
      :tree-config="tableTreeConfig"
      :span-method="colspanMethod"
      :data="tableData">
      <vxe-table-column field="name" title="Name" tree-node></vxe-table-column>
      <vxe-table-column field="num" title="Num"></vxe-table-column>
      <vxe-table-column field="level" title="Level"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="rate" title="Rate"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      loading: false,
      tableData: [],
      tableTreeConfig: {
        children: 'children',
        trigger: 'row', // 设置为点击行展开或收缩
        expandAll: false // 默认是否全部展开
      },
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          :loading="loading"
          :tree-config="tableTreeConfig"
          :span-method="colspanMethod"
          :data="tableData">
          <vxe-table-column field="name" title="Name" tree-node></vxe-table-column>
          <vxe-table-column field="num" title="Num"></vxe-table-column>
          <vxe-table-column field="level" title="Level"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="rate" title="Rate"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tableData: [],
              tableTreeConfig: {
                children: 'children',
                trigger: 'row', // 设置为点击行展开或收缩
                expandAll: false // 默认是否全部展开
              }
            }
          },
          created () {
            this.loading = true
            setTimeout(() => {
              let list = [
                { gKey: 'Group 1', name: 'test7', num: 23, level: 9, age: 24, rate: 4 },
                { gKey: 'Group 1', name: 'test6', num: 63, level: 14, age: 20, rate: 3 },
                { gKey: 'Group 1', name: 'test51', num: 84.8, level: 21, age: 19, rate: 5 },
                { gKey: 'Group 1', name: 'test32', num: 63, level: 11, age: 21, rate: 1 },
                { gKey: 'Group 2', name: 'test15', num: 5.9, level: 13, age: 32, rate: 1 },
                { gKey: 'Group 2', name: 'test44', num: 23, level: 9, age: 29, rate: 4 },
                { gKey: 'Group 2', name: 'test44', num: 41, level: 22, age: 28, rate: 5 },
                { gKey: 'Group 2', name: 'test84', num: 63.9, level: 18, age: 24, rate: 2 },
                { gKey: 'Group 2', name: 'test91', num: 12, level: 16, age: 27, rate: 5 },
                { gKey: 'Group 3', name: 'test6', num: 33.6, level: 3, age: 22, rate: 2 },
                { gKey: 'Group 3', name: 'test2', num: 23, level: 5, age: 25, rate: 3 },
                { gKey: 'Group 3', name: 'test42', num: 66.8, level: 17, age: 35, rate: 4 }
              ]
              // 将列表进行分组
              let groupMap = this.$utils.groupBy(list, 'gKey')
              let groupList = []
              // 分组合计计算逻辑
              this.$utils.each(groupMap, (list, gKey) => {
                let children = list || []
                if (children) {
                  let total = {
                    name: '',
                    num: \`总和:\${this.$utils.sum(children, 'num')}\`,
                    level: \`总和:\${this.$utils.sum(children, 'level')}\`,
                    age: \`平均:\${this.$utils.mean(children, 'age')}\`,
                    rate: \`总和:\${this.$utils.sum(children, 'rate')}\`
                  }
                  children.push(total)
                }
                groupList.push({ name: gKey, children })
              })
              this.tableData = groupList
              this.loading = false
            }, 300)
          },
          methods: {
            colspanMethod ({ row, rowIndex, column, columnIndex, data, level }) {
              // 合并第一级数据的所有列，看起来美观一些
              if (level === 0) {
                if (columnIndex === 0) {
                  return {
                    rowspan: 1,
                    colspan: 5
                  }
                } else if (columnIndex < 5) {
                  return {
                    rowspan: 0,
                    colspan: 0
                  }
                }
              }
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.loading = true
    setTimeout(() => {
      let list = [
        { gKey: 'Group 1', name: 'test7', num: 23, level: 9, age: 24, rate: 4 },
        { gKey: 'Group 1', name: 'test6', num: 63, level: 14, age: 20, rate: 3 },
        { gKey: 'Group 1', name: 'test51', num: 84.8, level: 21, age: 19, rate: 5 },
        { gKey: 'Group 1', name: 'test32', num: 63, level: 11, age: 21, rate: 1 },
        { gKey: 'Group 2', name: 'test15', num: 5.9, level: 13, age: 32, rate: 1 },
        { gKey: 'Group 2', name: 'test44', num: 23, level: 9, age: 29, rate: 4 },
        { gKey: 'Group 2', name: 'test44', num: 41, level: 22, age: 28, rate: 5 },
        { gKey: 'Group 2', name: 'test84', num: 63.9, level: 18, age: 24, rate: 2 },
        { gKey: 'Group 2', name: 'test91', num: 12, level: 16, age: 27, rate: 5 },
        { gKey: 'Group 3', name: 'test6', num: 33.6, level: 3, age: 22, rate: 2 },
        { gKey: 'Group 3', name: 'test2', num: 23, level: 5, age: 25, rate: 3 },
        { gKey: 'Group 3', name: 'test42', num: 66.8, level: 17, age: 35, rate: 4 }
      ]
      // 将列表进行分组
      let groupMap = this.$utils.groupBy(list, 'gKey')
      let groupList = []
      // 分组合计计算逻辑
      this.$utils.each(groupMap, (list, gKey) => {
        let children = list || []
        if (children) {
          let total = {
            name: '',
            num: `总和:${this.$utils.sum(children, 'num')}`,
            level: `总和:${this.$utils.sum(children, 'level')}`,
            age: `平均:${this.$utils.mean(children, 'age')}`,
            rate: `总和:${this.$utils.sum(children, 'rate')}`
          }
          children.push(total)
        }
        groupList.push({ name: gKey, children })
      })
      this.tableData = groupList
      this.loading = false
    }, 300)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    colspanMethod ({ row, rowIndex, column, columnIndex, data, level }) {
      // 合并第一级数据的所有列，看起来美观一些
      if (level === 0) {
        if (columnIndex === 0) {
          return {
            rowspan: 1,
            colspan: 5
          }
        } else if (columnIndex < 5) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
  }
}
</script>
