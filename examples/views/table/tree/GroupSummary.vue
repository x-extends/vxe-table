<template>
  <div>
    <p class="tip">
      基于树表格实现分组汇总
    </p>

    <vxe-table
      resizable
      :loading="loading"
      :tree-config="tableTreeConfig"
      :data="tableData">
      <vxe-table-column field="name" title="名称" tree-node :formatter="formatName"></vxe-table-column>
      <vxe-table-column field="level" title="级别"></vxe-table-column>
      <vxe-table-column field="age" title="年龄"></vxe-table-column>
      <vxe-table-column field="rate" title="分数"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      loading: false,
      tableData: [],
      tableTreeConfig: {
        children: 'children',
        accordion: true, // 一层只允许展开一个节点
        expandAll: false // 默认是否全部展开
      },
      demoCodes: [
        `
        <vxe-table
          resizable
          :loading="loading"
          :tree-config="tableTreeConfig"
          :data="tableData">
          <vxe-table-column field="name" title="名称" tree-node :formatter="formatName"></vxe-table-column>
          <vxe-table-column field="level" title="级别"></vxe-table-column>
          <vxe-table-column field="age" title="年龄"></vxe-table-column>
          <vxe-table-column field="rate" title="分数"></vxe-table-column>
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
                accordion: true, // 一层只允许展开一个节点
                expandAll: false // 默认是否全部展开
              }
            }
          },
          created () {
            this.loading = true
            this.findList().then(data => {
              this.tableData = this.getGroupSummary(data)
              this.loading = false
            })
          },
          methods: {
            findList () {
              return new Promise(resolve => {
                setTimeout(() => {
                  let list = [
                    {
                      name: '一班',
                      level: '',
                      age: '',
                      rate: '',
                      children: [
                        { name: 'test7', rate: 9, age: 24, level: 1 },
                        { name: 'test6', rate: 14, age: 20, level: 3 },
                        {
                          name: '第一组',
                          level: '',
                          age: '',
                          rate: '',
                          children: [
                            { name: 'test85', rate: 13, age: 32, level: 1 },
                            { name: 'test37', rate: 9, age: 29, level: 4 },
                            { name: 'test93', rate: 22, age: 28, level: 5 },
                            { name: 'test90', rate: 55, age: 26, level: 2 }
                          ]
                        },
                        { name: 'test32', rate: 11, age: 21, level: 1 }
                      ]
                    },
                    {
                      name: '二班',
                      level: '',
                      age: '',
                      rate: '',
                      children: [
                        { name: 'test15', rate: 13, age: 32, level: 1 },
                        { name: 'test44', rate: 9, age: 29, level: 4 },
                        {
                          name: '第一组',
                          level: '',
                          age: '',
                          rate: '',
                          children: [
                            { name: 'test37', rate: 9, age: 29, level: 4 },
                            { name: 'test93', rate: 22, age: 28, level: 5 }
                          ]
                        },
                        {
                          name: '第二组',
                          level: '',
                          age: '',
                          rate: '',
                          children: [
                            { name: 'test74', rate: 11, age: 32, level: 5 },
                            { name: 'test99', rate: 23, age: 18, level: 4 },
                            {
                              name: '第一排',
                              level: '',
                              age: '',
                              rate: '',
                              children: [
                                { name: 'test48', rate: 77, age: 29, level: 4 },
                                { name: 'test38', rate: 34, age: 21, level: 2 }
                              ]
                            },
                            { name: 'test16', rate: 22, age: 26, level: 5 }
                          ]
                        },
                        { name: 'test91', rate: 16, age: 27, level: 5 },
                        {
                          name: '第三组',
                          level: '',
                          age: '',
                          rate: '',
                          children: [
                            { name: 'test77', rate: 11, age: 35, level: 1 },
                            { name: 'test89', rate: 40, age: 18, level: 4 },
                            { name: 'test10', rate: 22, age: 20, level: 2 }
                          ]
                        }
                      ]
                    },
                    {
                      name: '三班',
                      level: '',
                      age: '',
                      rate: '',
                      children: [
                        { name: 'test6', rate: 3, age: 22, level: 2 },
                        { name: 'test2', rate: 5, age: 25, level: 3 },
                        { name: 'test42', rate: 17, age: 35, level: 4 }
                      ]
                    }
                  ]
                  resolve(list)
                }, 300)
              })
            },
            formatName ({ row }) {
              return row.children && row.children.length ? \`\${row.name} (\${row.num}人)\` : row.name
            },
            // 计算逻辑
            handleSummary  (children) {
              return {
                num: XEUtils.sum(children, 'num'),
                level: Math.floor(XEUtils.sum(children, 'level')),
                age: parseInt(XEUtils.mean(children, 'age')),
                rate: XEUtils.sum(children, 'rate')
              }
            },
            getGroupSummary (data) {
              XEUtils.eachTree(data, (row, index, items, path, parent, nodes) => {
                let children = row.children
                if (children && children.length) {
                  // 合计子节点
                  Object.assign(row, this.handleSummary(children))
                } else {
                  row.num = 1
                  if (index === items.length - 1) {
                    // 全量汇总
                    for (let len = nodes.length - 2; len >= 0; len--) {
                      Object.assign(nodes[len], this.handleSummary(nodes[len].children))
                    }
                  }
                }
              }, this.tableTreeConfig)
              return data
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.loading = true
    this.findList().then(data => {
      this.tableData = this.getGroupSummary(data)
      this.loading = false
    })
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    findList () {
      return new Promise(resolve => {
        setTimeout(() => {
          const list = [
            {
              name: '一班',
              level: '',
              age: '',
              rate: '',
              children: [
                { name: 'test7', rate: 9, age: 24, level: 1 },
                { name: 'test6', rate: 14, age: 20, level: 3 },
                {
                  name: '第一组',
                  level: '',
                  age: '',
                  rate: '',
                  children: [
                    { name: 'test85', rate: 13, age: 32, level: 1 },
                    { name: 'test37', rate: 9, age: 29, level: 4 },
                    { name: 'test93', rate: 22, age: 28, level: 5 },
                    { name: 'test90', rate: 55, age: 26, level: 2 }
                  ]
                },
                { name: 'test32', rate: 11, age: 21, level: 1 }
              ]
            },
            {
              name: '二班',
              level: '',
              age: '',
              rate: '',
              children: [
                { name: 'test15', rate: 13, age: 32, level: 1 },
                { name: 'test44', rate: 9, age: 29, level: 4 },
                {
                  name: '第一组',
                  level: '',
                  age: '',
                  rate: '',
                  children: [
                    { name: 'test37', rate: 9, age: 29, level: 4 },
                    { name: 'test93', rate: 22, age: 28, level: 5 }
                  ]
                },
                {
                  name: '第二组',
                  level: '',
                  age: '',
                  rate: '',
                  children: [
                    { name: 'test74', rate: 11, age: 32, level: 5 },
                    { name: 'test99', rate: 23, age: 18, level: 4 },
                    {
                      name: '第一排',
                      level: '',
                      age: '',
                      rate: '',
                      children: [
                        { name: 'test48', rate: 77, age: 29, level: 4 },
                        { name: 'test38', rate: 34, age: 21, level: 2 }
                      ]
                    },
                    { name: 'test16', rate: 22, age: 26, level: 5 }
                  ]
                },
                { name: 'test91', rate: 16, age: 27, level: 5 },
                {
                  name: '第三组',
                  level: '',
                  age: '',
                  rate: '',
                  children: [
                    { name: 'test77', rate: 11, age: 35, level: 1 },
                    { name: 'test89', rate: 40, age: 18, level: 4 },
                    { name: 'test10', rate: 22, age: 20, level: 2 }
                  ]
                }
              ]
            },
            {
              name: '三班',
              level: '',
              age: '',
              rate: '',
              children: [
                { name: 'test6', rate: 3, age: 22, level: 2 },
                { name: 'test2', rate: 5, age: 25, level: 3 },
                { name: 'test42', rate: 17, age: 35, level: 4 }
              ]
            }
          ]
          resolve(list)
        }, 300)
      })
    },
    formatName ({ row }) {
      return row.children && row.children.length ? `${row.name} (${row.num}人)` : row.name
    },
    // 计算逻辑
    handleSummary  (children) {
      return {
        num: XEUtils.sum(children, 'num'),
        level: Math.floor(XEUtils.sum(children, 'level')),
        age: parseInt(XEUtils.mean(children, 'age')),
        rate: XEUtils.sum(children, 'rate')
      }
    },
    getGroupSummary (data) {
      XEUtils.eachTree(data, (row, index, items, path, parent, nodes) => {
        const children = row.children
        if (children && children.length) {
          // 合计子节点
          Object.assign(row, this.handleSummary(children))
        } else {
          row.num = 1
          if (index === items.length - 1) {
            // 全量汇总
            for (let len = nodes.length - 2; len >= 0; len--) {
              Object.assign(nodes[len], this.handleSummary(nodes[len].children))
            }
          }
        }
      }, this.tableTreeConfig)
      return data
    }
  }
}
</script>
