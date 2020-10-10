<template>
  <div>
    <p class="tip">显示表尾，服务端计算表尾合计</p>

    <vxe-grid
      border
      show-overflow
      show-header-overflow
      show-footer-overflow
      show-footer
      ref="xGrid"
      height="500"
      row-id="id"
      :footer-method="footerMethod"
      :checkbox-config="{checkField: 'checked', labelField: 'id'}"
      :loading="loading">
    </vxe-grid>

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
      colIndex: 0,
      rowIndex: 1,
      footerData: [],
      demoCodes: [
        `
        <vxe-grid
          border
          show-overflow
          show-header-overflow
          show-footer-overflow
          show-footer
          ref="xGrid"
          height="500"
          row-id="id"
          :footer-method="footerMethod"
          :checkbox-config="{checkField: 'checked', labelField: 'id'}"
          :loading="loading">
        </vxe-grid>

        `,
        `
        export default {
          data () {
            return {
              loading: false,
              colIndex: 0,
              rowIndex: 1,
              footerData: []
            }
          },
          created () {
            // 动态定义，阻断 vue 对大数据双向绑定，提升加载速度
            this.allData = []
            this.allColumn = []
            this.init()
          },
          methods: {
            init () {
              this.loading = true
              Promise.all([
                // 模拟后台获取列信息
                this.findColumnList(400).then(data => {
                  const allColumn = this.allData.concat(data)
                  if (this.$refs.xGrid) {
                    this.$refs.xGrid.loadColumn(allColumn)
                  }
                  this.allColumn = allColumn
                  // 模拟后台获取合计数据
                  this.footerData = [
                    allColumn.map((column, columnIndex) => {
                      if (columnIndex === 0) {
                        return '平均'
                      }
                      return columnIndex
                    }),
                    allColumn.map((column, columnIndex) => {
                      if (columnIndex === 0) {
                        return '和值'
                      }
                      return columnIndex
                    })
                  ]
                }),
                this.findDataList(800).then(data => {
                  this.allData = this.allData.concat(data)
                  if (this.$refs.xGrid) {
                    this.$refs.xGrid.loadData(this.allData)
                  }
                })
              ]).then(() => {
                this.loading = false
              })
            },
            findColumnList (size) {
              return new Promise(resolve => {
                setTimeout(() => {
                  const columns = []
                  for (let index = 0; index < size; index++) {
                    const key = this.colIndex++
                    const config = {
                      field: key ? \`col_\${key}\` : 'id',
                      title: key ? \`标题_\${key}\` : 'ID',
                      width: 140
                    }
                    if (!key) {
                      config.type = 'checkbox'
                    }
                    if (key < 2) {
                      config.fixed = 'left'
                    }
                    columns.push(config)
                  }
                  resolve(columns)
                }, 250)
              })
            },
            findDataList (size) {
              return new Promise(resolve => {
                setTimeout(() => {
                  const list = []
                  for (let index = 0; index < size; index++) {
                    const key = this.rowIndex++
                    const item = { id: key, checked: false }
                    // 由于生成数据比较耗时，所以固定生成1000字段
                    Array.from(new Array(1000)).forEach((num, cIndex) => {
                      item[\`col_\${cIndex}\`] = \`内容_\${cIndex}_\${index}\`
                    })
                    list.push(item)
                  }
                  resolve(list)
                }, 250)
              })
            },
            footerMethod () {
              return this.footerData
            }
          }
        }
        `
      ]
    }
  },
  created () {
    // 动态定义，阻断 vue 对大数据双向绑定，提升加载速度
    this.allData = []
    this.allColumn = []
    this.init()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    init () {
      this.loading = true
      Promise.all([
        // 模拟后台获取列信息
        this.findColumnList(400).then(data => {
          const allColumn = this.allData.concat(data)
          if (this.$refs.xGrid) {
            this.$refs.xGrid.loadColumn(allColumn)
          }
          this.allColumn = allColumn
          // 模拟后台获取合计数据
          this.footerData = [
            allColumn.map((column, columnIndex) => {
              if (columnIndex === 0) {
                return '平均'
              }
              return columnIndex
            }),
            allColumn.map((column, columnIndex) => {
              if (columnIndex === 0) {
                return '和值'
              }
              return columnIndex
            })
          ]
        }),
        this.findDataList(800).then(data => {
          this.allData = this.allData.concat(data)
          if (this.$refs.xGrid) {
            this.$refs.xGrid.loadData(this.allData)
          }
        })
      ]).then(() => {
        this.loading = false
      })
    },
    findColumnList (size) {
      return new Promise(resolve => {
        setTimeout(() => {
          const columns = []
          for (let index = 0; index < size; index++) {
            const key = this.colIndex++
            const config = {
              field: key ? `col_${key}` : 'id',
              title: key ? `标题_${key}` : 'ID',
              width: 140
            }
            if (!key) {
              config.type = 'checkbox'
            }
            if (key < 2) {
              config.fixed = 'left'
            }
            columns.push(config)
          }
          resolve(columns)
        }, 250)
      })
    },
    findDataList (size) {
      return new Promise(resolve => {
        setTimeout(() => {
          const list = []
          for (let index = 0; index < size; index++) {
            const key = this.rowIndex++
            const item = { id: key, checked: false }
            // 由于生成数据比较耗时，所以固定生成1000字段
            Array.from(new Array(1000)).forEach((num, cIndex) => {
              item[`col_${cIndex}`] = `内容_${cIndex}_${index}`
            })
            list.push(item)
          }
          resolve(list)
        }, 250)
      })
    },
    footerMethod () {
      return this.footerData
    }
  }
}
</script>
