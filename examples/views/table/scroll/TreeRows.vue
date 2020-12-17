<template>
  <div>
    <p class="tip">
      树形虚拟滚动渲染<span class="orange">（最大可以支撑 1w 列、5w 行）</span>，具体兼容请查看 <a class="link" href="https://github.com/x-extends/vxe-table-plugin-virtual-tree" target="_blank">vxe-table-plugin-virtual-tree</a> 插件的 API<br>
      复选框不支持父子关联，...具体请看相关文档！<br>
      <span class="red">（注：启用纵向虚拟滚的后不支持动态行高）</span>
    </p>

    <vxe-virtual-tree
      resizable
      show-overflow
      row-key
      ref="xVTree"
      height="500"
      :loading="loading"
      :data="tableData"
      :toolbar-config="{slots: {buttons: 'toolbar_buttons'}}"
      :checkbox-config="{labelField: 'name'}"
      :tree-config="{children: 'children'}"
      :columns="tableColumn">
      <template v-slot:toolbar_buttons>
        <vxe-button @click="loadData(1000)">加载1k节点</vxe-button>
        <vxe-button @click="loadData(5000)">加载5k节点</vxe-button>
        <vxe-button @click="loadData(10000)">加载1w节点</vxe-button>
        <vxe-button @click="loadData(30000)">加载3w节点</vxe-button>
        <vxe-button @click="$refs.xVTree.setAllTreeExpand(true)">展开所有</vxe-button>
        <vxe-button @click="$refs.xVTree.setAllTreeExpand(false)">收起所有</vxe-button>
      </template>
    </vxe-virtual-tree>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      tableData: [],
      tableColumn: [
        { type: 'seq', title: '序号', width: 100 },
        { type: 'checkbox', title: 'Name', treeNode: true },
        { field: 'id', title: 'ID' }
      ],
      demoCodes: [
        `
        <vxe-virtual-tree
          resizable
          show-overflow
          row-key
          ref="xVTree"
          height="500"
          :loading="loading"
          :data="tableData"
          :toolbar-config="{slots: {buttons: 'toolbar_buttons'}}"
          :checkbox-config="{labelField: 'name'}"
          :tree-config="{children: 'children'}"
          :columns="tableColumn">
          <template v-slot:toolbar_buttons>
            <vxe-button @click="loadData(1000)">加载1k节点</vxe-button>
            <vxe-button @click="loadData(5000)">加载5k节点</vxe-button>
            <vxe-button @click="loadData(10000)">加载1w节点</vxe-button>
            <vxe-button @click="loadData(30000)">加载3w节点</vxe-button>
            <vxe-button @click="$refs.xVTree.setAllTreeExpand(true)">展开所有</vxe-button>
            <vxe-button @click="$refs.xVTree.setAllTreeExpand(false)">收起所有</vxe-button>
          </template>
        </vxe-virtual-tree>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tableData: [],
              tableColumn: [
                { type: 'seq', title: '序号', width: 100 },
                { type: 'checkbox', title: 'Name', treeNode: true },
                { field: 'id', title: 'ID' }
              ]
            }
          },
          created () {
            this.loadData(500)
          },
          methods: {
            loadData (size) {
              this.loading = true
              this.getTreeList(size).then(data => {
                const startTime = Date.now()
                this.tableData = data
                this.loading = false
                this.$nextTick(() => {
                  this.$XModal.message({ message: \`渲染 \${size} 行，用时 \${Date.now() - startTime}毫秒\`, status: 'info' })
                })
              })
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
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.loadData(500)
  },
  methods: {
    loadData (size) {
      this.loading = true
      this.getTreeList(size).then(data => {
        const startTime = Date.now()
        this.tableData = data
        this.loading = false
        this.$nextTick(() => {
          this.$XModal.message({ message: `渲染 ${size} 行，用时 ${Date.now() - startTime}毫秒`, status: 'info' })
        })
      })
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
    }
  }
}
</script>
