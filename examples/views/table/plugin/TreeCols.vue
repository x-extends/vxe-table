<template>
  <div>
    <p class="tip">
      树形虚拟滚动渲染<span class="orange">（最大可以支撑 1w 列、20w 行）</span>，具体兼容请查看 <a class="link" href="https://github.com/x-extends/vxe-table-plugin-virtual-tree" target="_blank">vxe-table-plugin-virtual-tree</a> 插件的 API<br>
      <span class="red">（注：启用纵向虚拟滚的后不支持动态行高）</span>
    </p>

    <vxe-virtual-tree
      resizable
      show-overflow
      show-header-overflow
      row-key
      ref="xVTree"
      height="500"
      :loading="loading"
      :toolbar="{slots: {buttons: 'toolbar_buttons'}}"
      :radio-config="{labelField: 'name'}"
      :tree-config="{children: 'children'}">
      <template v-slot:toolbar_buttons>
        <vxe-button @click="loadColumnAndData(1000, 5000)">1k列5k条</vxe-button>
        <vxe-button @click="loadColumnAndData(1000, 10000)">1k列1w条</vxe-button>
        <vxe-button @click="loadColumnAndData(1000, 20000)">1k列2w条</vxe-button>
        <vxe-button @click="loadColumnAndData(2000, 10000)">2k列1w条</vxe-button>
        <vxe-button @click="loadColumnAndData(5000, 5000)">5k列5k条</vxe-button>
        <vxe-button @click="loadColumnAndData(5000, 10000)">5k列1w条</vxe-button>
        <vxe-button @click="loadColumnAndData(5000, 20000)">5k列2w条</vxe-button>
        <vxe-button @click="$refs.xVTree.setAllTreeExpand(true)">展开所有</vxe-button>
        <vxe-button @click="$refs.xVTree.setAllTreeExpand(false)">收起所有</vxe-button>
        <vxe-button @click="getRadioEvent">获取选中</vxe-button>
      </template>
    </vxe-virtual-tree>

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
      demoCodes: [
        `
        <vxe-virtual-tree
          resizable
          show-overflow
          show-header-overflow
          row-key
          ref="xVTree"
          height="500"
          :loading="loading"
          :toolbar="{slots: {buttons: 'toolbar_buttons'}}"
          :radio-config="{labelField: 'name'}"
          :tree-config="{children: 'children'}">
          <template v-slot:toolbar_buttons>
            <vxe-button @click="loadColumnAndData(1000, 5000)">1k列5k条</vxe-button>
            <vxe-button @click="loadColumnAndData(1000, 10000)">1k列1w条</vxe-button>
            <vxe-button @click="loadColumnAndData(1000, 20000)">1k列2w条</vxe-button>
            <vxe-button @click="loadColumnAndData(2000, 10000)">2k列1w条</vxe-button>
            <vxe-button @click="loadColumnAndData(5000, 5000)">5k列5k条</vxe-button>
            <vxe-button @click="loadColumnAndData(5000, 10000)">5k列1w条</vxe-button>
            <vxe-button @click="loadColumnAndData(5000, 20000)">5k列2w条</vxe-button>
            <vxe-button @click="$refs.xVTree.setAllTreeExpand(true)">展开所有</vxe-button>
            <vxe-button @click="$refs.xVTree.setAllTreeExpand(false)">收起所有</vxe-button>
            <vxe-button @click="getRadioEvent">获取选中</vxe-button>
          </template>
        </vxe-virtual-tree>
        `,
        `
        export default {
          data () {
            return {
              loading: false
            }
          },
          mounted () {
            this.loadColumn()
            this.loadData(500)
          },
          methods: {
            loadData (size) {
              this.loading = true
              this.getTreeList(size).then(data => {
                this.loading = false
                if (this.$refs.xVTree) {
                  this.$refs.xVTree.loadData(data)
                }
              })
            },
            loadColumn (size) {
              const tableColumn = [
                { type: 'seq', title: '序号', width: 100 },
                { type: 'radio', title: 'Name', width: 300, treeNode: true },
                { field: 'id', title: 'ID', width: 200 }
              ]
              for (let index = 0; index < size; index++) {
                tableColumn.push({
                  field: 'col' + index,
                  title: 'col_' + index,
                  width: 100
                })
              }
              if (this.$refs.xVTree) {
                this.$refs.xVTree.loadColumn(tableColumn)
              }
            },
            getTreeList (size) {
              return new Promise(resolve => {
                // 模拟后台生成树结构
                setTimeout(() => {
                  const len1 = size / 2
                  const len2 = 3
                  const len3 = 2
                  const len4 = 2
                  const len5 = 6
                  const result = []
                  const startIndex = 10000
                  let ketIndex = 0
                  for (let index1 = 0; index1 < len1; index1++) {
                    if (ketIndex >= size) {
                      break
                    }
                    const children1 = []
                    for (let index2 = 0; index2 < len2; index2++) {
                      if (ketIndex >= size) {
                        break
                      }
                      const children2 = []
                      for (let index3 = 0; index3 < len3; index3++) {
                        if (ketIndex >= size) {
                          break
                        }
                        const children3 = []
                        for (let index4 = 0; index4 < len4; index4++) {
                          if (ketIndex >= size) {
                            break
                          }
                          const children4 = []
                          for (let index5 = 0; index5 < len5; index5++) {
                            if (ketIndex >= size) {
                              break
                            }
                            const item5 = {
                              id: startIndex + ketIndex++,
                              name: \`name\${index1}_\${index2}_\${index3}_\${index4}_\${index5}\`,
                              children: []
                            }
                            children4.push(item5)
                          }
                          const item4 = {
                            id: startIndex + ketIndex++,
                            name: \`name\${index1}_\${index2}_\${index3}_\${index4}\`,
                            children: children4
                          }
                          children3.push(item4)
                        }
                        const item3 = {
                          id: startIndex + ketIndex++,
                          name: \`name\${index1}_\${index2}_\${index3}\`,
                          children: children3
                        }
                        children2.push(item3)
                      }
                      const item2 = {
                        id: startIndex + ketIndex++,
                        name: \`name\${index1}_\${index2}\`,
                        children: children2
                      }
                      children1.push(item2)
                    }
                    const item1 = {
                      id: startIndex + ketIndex++,
                      name: \`name\${index1}\`,
                      children: children1
                    }
                    result.push(item1)
                  }
                  resolve(result)
                }, 300)
              })
            },
            getRadioEvent () {
              const selectRow = this.$refs.xVTree.getRadioRecord()
              this.$XModal.alert(selectRow ? selectRow.name : null)
            }
          }
        }
        `
      ]
    }
  },
  mounted () {
    this.loadColumnAndData(100, 500)
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    loadColumnAndData (colSize, rowSize) {
      this.loadColumn(colSize)
      this.loadData(rowSize)
    },
    loadData (size) {
      this.loading = true
      this.getTreeList(size).then(data => {
        this.loading = false
        if (this.$refs.xVTree) {
          this.$refs.xVTree.loadData(data)
        }
      })
    },
    loadColumn (size) {
      const tableColumn = [
        { type: 'seq', title: '序号', width: 100 },
        { type: 'radio', title: 'Name', width: 300, treeNode: true },
        { field: 'id', title: 'ID', width: 200 }
      ]
      for (let index = 0; index < size; index++) {
        tableColumn.push({
          field: 'col' + index,
          title: 'col_' + index,
          width: 100
        })
      }
      if (this.$refs.xVTree) {
        this.$refs.xVTree.loadColumn(tableColumn)
      }
    },
    getTreeList (size) {
      return new Promise(resolve => {
        // 模拟后台生成树结构
        setTimeout(() => {
          const len1 = size / 2
          const len2 = 3
          const len3 = 2
          const len4 = 2
          const len5 = 6
          const result = []
          const startIndex = 10000
          let ketIndex = 0
          for (let index1 = 0; index1 < len1; index1++) {
            if (ketIndex >= size) {
              break
            }
            const children1 = []
            for (let index2 = 0; index2 < len2; index2++) {
              if (ketIndex >= size) {
                break
              }
              const children2 = []
              for (let index3 = 0; index3 < len3; index3++) {
                if (ketIndex >= size) {
                  break
                }
                const children3 = []
                for (let index4 = 0; index4 < len4; index4++) {
                  if (ketIndex >= size) {
                    break
                  }
                  const children4 = []
                  for (let index5 = 0; index5 < len5; index5++) {
                    if (ketIndex >= size) {
                      break
                    }
                    const item5 = {
                      id: startIndex + ketIndex++,
                      name: `name${index1}_${index2}_${index3}_${index4}_${index5}`,
                      children: []
                    }
                    children4.push(item5)
                  }
                  const item4 = {
                    id: startIndex + ketIndex++,
                    name: `name${index1}_${index2}_${index3}_${index4}`,
                    children: children4
                  }
                  children3.push(item4)
                }
                const item3 = {
                  id: startIndex + ketIndex++,
                  name: `name${index1}_${index2}_${index3}`,
                  children: children3
                }
                children2.push(item3)
              }
              const item2 = {
                id: startIndex + ketIndex++,
                name: `name${index1}_${index2}`,
                children: children2
              }
              children1.push(item2)
            }
            const item1 = {
              id: startIndex + ketIndex++,
              name: `name${index1}`,
              children: children1
            }
            result.push(item1)
          }
          resolve(result)
        }, 300)
      })
    },
    getRadioEvent () {
      const selectRow = this.$refs.xVTree.getRadioRecord()
      this.$XModal.alert(selectRow ? selectRow.name : null)
    }
  }
}
</script>
