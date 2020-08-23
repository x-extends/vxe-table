<template>
  <div>
    <p class="tip">
      虚拟滚动渲染，更加复杂局部递增数据、局部递增列、固定列<br>
    </p>

    <vxe-toolbar :loading="loading">
      <template v-slot:buttons>
        <vxe-button @click="loadList(20)">+20条</vxe-button>
        <vxe-button @click="loadList(50)">+50条</vxe-button>
        <vxe-button @click="loadList(100)">+100条</vxe-button>
        <vxe-button @click="loadList(300)">+300条</vxe-button>
        <vxe-button @click="removeList(20)">-20条</vxe-button>
        <vxe-button @click="removeList(50)">-50条</vxe-button>
        <vxe-button @click="loadColumns(10)">+10列</vxe-button>
        <vxe-button @click="loadColumns(30)">+30列</vxe-button>
        <vxe-button @click="loadColumns(50)">+50列</vxe-button>
        <vxe-button @click="removeColumn(10)">-10列</vxe-button>
        <vxe-button @click="removeColumn(20)">-20列</vxe-button>
        <vxe-button @click="$refs.xGrid.scrollTo(1000, 2000)">x=1000,y=2000</vxe-button>
        <vxe-button @click="$refs.xGrid.clearScroll()">清除滚动</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-grid
      border
      show-overflow
      show-header-overflow
      ref="xGrid"
      height="500"
      row-id="id"
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
      demoCodes: [
        `
        <vxe-toolbar :loading="loading">
          <template v-slot:buttons>
            <vxe-button @click="loadList(20)">+20条</vxe-button>
            <vxe-button @click="loadList(50)">+50条</vxe-button>
            <vxe-button @click="loadList(100)">+100条</vxe-button>
            <vxe-button @click="loadList(300)">+300条</vxe-button>
            <vxe-button @click="removeList(20)">-20条</vxe-button>
            <vxe-button @click="removeList(50)">-50条</vxe-button>
            <vxe-button @click="loadColumns(10)">+10列</vxe-button>
            <vxe-button @click="loadColumns(30)">+30列</vxe-button>
            <vxe-button @click="loadColumns(50)">+50列</vxe-button>
            <vxe-button @click="removeColumn(10)">-10列</vxe-button>
            <vxe-button @click="removeColumn(20)">-20列</vxe-button>
            <vxe-button @click="$refs.xGrid.scrollTo(1000, 2000)">x=1000,y=2000</vxe-button>
            <vxe-button @click="$refs.xGrid.clearScroll()">清除滚动</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-grid
          border
          show-overflow
          show-header-overflow
          ref="xGrid"
          height="500"
          row-id="id"
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
              rowIndex: 0
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
                this.findColumnList(200).then(data => {
                  this.allColumn = this.allData.concat(data)
                  this.$refs.xGrid.loadColumn(this.allColumn)
                }),
                this.findDataList(600).then(data => {
                  this.allData = this.allData.concat(data)
                  this.$refs.xGrid.loadData(this.allData)
                })
              ]).then(() => {
                this.loading = false
              })
            },
            removeColumn (size) {
              this.loading = true
              if (this.allColumn.length > size) {
                this.allColumn = this.allColumn.slice(0, this.allColumn.length - size)
                if (this.$refs.xGrid) {
                  this.$refs.xGrid.loadColumn(this.allColumn)
                }
                this.loading = false
              }
            },
            loadColumns (size) {
              this.loading = true
              this.findColumnList(size).then(data => {
                this.allColumn = this.allColumn.concat(data)// 局部追加并保存全量数据
                this.$refs.xGrid.loadColumn(this.allColumn)
                this.loading = false
              })
            },
            removeList (size) {
              this.loading = true
              setTimeout(() => {
                if (this.allData.length > size) {
                  this.allData = this.allData.slice(0, this.allData.length - size)
                  if (this.$refs.xGrid) {
                    this.$refs.xGrid.loadData(this.allData)
                  }
                }
                this.loading = false
              }, 100)
            },
            loadList (size) {
              this.loading = true
              this.findDataList(size).then(data => {
                this.allData = this.allData.concat(data)// 局部追加并保存全量数据
                this.$refs.xGrid.loadData(this.allData)
                this.loading = false
              })
            },
            findColumnList (size) {
              return new Promise(resolve => {
                setTimeout(() => {
                  var columns = []
                  for (var index = 0; index < size; index++) {
                    let key = this.colIndex++
                    let config = {
                      field: key ? \`col_\${key}\` : 'id',
                      title: key ? \`标题_\${key}\` : 'ID',
                      width: 140
                    }
                    if (!key) {
                      config.type = 'checkbox'
                    }
                    if (key < 2) {
                      config.type = 'checkbox'
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
                  var list = []
                  for (var index = 0; index < size; index++) {
                    let key = this.rowIndex++
                    let item = { id: key, checked: false }
                    // 由于生成数据比较耗时，所以固定生成1000字段
                    Array.from(new Array(1000)).forEach((num, cIndex) => {
                      item[\`col_\${cIndex}\`] = \`内容_\${cIndex}_\${index}\`
                    })
                    list.push(item)
                  }
                  resolve(list)
                }, 250)
              })
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
        this.findColumnList(200).then(data => {
          this.allColumn = this.allData.concat(data)
          if (this.$refs.xGrid) {
            this.$refs.xGrid.loadColumn(this.allColumn)
          }
        }),
        this.findDataList(600).then(data => {
          this.allData = this.allData.concat(data)
          if (this.$refs.xGrid) {
            this.$refs.xGrid.loadData(this.allData)
          }
        })
      ]).then(() => {
        this.loading = false
      })
    },
    removeColumn (size) {
      this.loading = true
      if (this.allColumn.length > size) {
        this.allColumn = this.allColumn.slice(0, this.allColumn.length - size)
        if (this.$refs.xGrid) {
          this.$refs.xGrid.loadColumn(this.allColumn)
        }
        this.loading = false
      }
    },
    loadColumns (size) {
      this.loading = true
      this.findColumnList(size).then(data => {
        this.allColumn = this.allColumn.concat(data)// 局部追加并保存全量数据
        if (this.$refs.xGrid) {
          this.$refs.xGrid.loadColumn(this.allColumn)
        }
        this.loading = false
      })
    },
    removeList (size) {
      this.loading = true
      setTimeout(() => {
        if (this.allData.length > size) {
          this.allData = this.allData.slice(0, this.allData.length - size)
          if (this.$refs.xGrid) {
            this.$refs.xGrid.loadData(this.allData)
          }
        }
        this.loading = false
      }, 100)
    },
    loadList (size) {
      this.loading = true
      this.findDataList(size).then(data => {
        this.allData = this.allData.concat(data)// 局部追加并保存全量数据
        if (this.$refs.xGrid) {
          this.$refs.xGrid.loadData(this.allData)
        }
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
    }
  }
}
</script>
