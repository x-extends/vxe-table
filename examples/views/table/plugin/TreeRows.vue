<template>
  <div>
    <p class="tip">
      树形虚拟滚动渲染<span class="orange">（最大可以支撑 1w 列、20w 行）</span>，具体兼容请查看 <a class="link" href="https://github.com/x-extends/vxe-table-plugin-virtual-tree" target="_blank">vxe-table-plugin-virtual-tree</a> 插件的 API<br>
      <span class="red">（注：启用纵向虚拟滚的后不支持动态行高）</span>
    </p>

    <vxe-virtual-tree
      resizable
      show-overflow
      row-key
      ref="xVTree"
      height="500"
      :loading="loading"
      :toolbar="{slots: {buttons: 'toolbar_buttons'}}"
      :checkbox-config="{labelField: 'a', checkField: 'checked', halfField: 'indeterminate'}"
      :tree-config="{children: 'children'}"
      :columns="tableColumn">
      <template v-slot:toolbar_buttons>
        <vxe-button @click="loadData(1000)">加载1k节点</vxe-button>
        <vxe-button @click="loadData(5000)">加载5k节点</vxe-button>
        <vxe-button @click="loadData(10000)">加载1w节点</vxe-button>
        <vxe-button @click="loadData(30000)">加载3w节点</vxe-button>
        <vxe-button @click="loadData(50000)">加载5w节点</vxe-button>
        <vxe-button @click="loadData(100000)">加载10w节点</vxe-button>
        <vxe-button @click="$refs.xVTree.setAllTreeExpand(true)">展开所有</vxe-button>
        <vxe-button @click="$refs.xVTree.setAllTreeExpand(false)">收起所有</vxe-button>
        <vxe-button @click="getSelectionEvent">获取选中</vxe-button>
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
      tableColumn: [
        { type: 'seq', title: '序号', width: 100 },
        { type: 'checkbox', title: 'A', treeNode: true, width: 300 },
        { field: 'b', title: 'B', width: 100 },
        { field: 'c', title: 'C', width: 100 },
        { field: 'd', title: 'D', width: 100 },
        { field: 'e', title: 'E', width: 100 },
        { field: 'f', title: 'F', width: 100 },
        { field: 'g', title: 'G', width: 100 },
        { field: 'h', title: 'H', width: 100 },
        { field: 'i', title: 'I', width: 100 },
        { field: 'j', title: 'J', width: 100 },
        { field: 'k', title: 'K', width: 100 },
        { field: 'x', title: 'X', width: 100 },
        { field: 'y', title: 'Y', width: 100 },
        { field: 'z', title: 'Z', width: 100 }
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
          :toolbar="{slots: {buttons: 'toolbar_buttons'}}"
          :checkbox-config="{labelField: 'a', checkField: 'checked', halfField: 'indeterminate'}"
          :tree-config="{children: 'children'}"
          :columns="tableColumn">
          <template v-slot:toolbar_buttons>
            <vxe-button @click="loadData(1000)">加载1k节点</vxe-button>
            <vxe-button @click="loadData(5000)">加载5k节点</vxe-button>
            <vxe-button @click="loadData(10000)">加载1w节点</vxe-button>
            <vxe-button @click="loadData(30000)">加载3w节点</vxe-button>
            <vxe-button @click="loadData(50000)">加载5w节点</vxe-button>
            <vxe-button @click="loadData(100000)">加载10w节点</vxe-button>
            <vxe-button @click="$refs.xVTree.setAllTreeExpand(true)">展开所有</vxe-button>
            <vxe-button @click="$refs.xVTree.setAllTreeExpand(false)">收起所有</vxe-button>
            <vxe-button @click="getSelectionEvent">获取选中</vxe-button>
          </template>
        </vxe-virtual-tree>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tableColumn: [
                { type: 'seq', title: '序号', width: 100 },
                { type: 'checkbox', title: 'A', treeNode: true, width: 300 },
                { field: 'b', title: 'B', width: 100 },
                { field: 'c', title: 'C', width: 100 },
                { field: 'd', title: 'D', width: 100 },
                { field: 'e', title: 'E', width: 100 },
                { field: 'f', title: 'F', width: 100 },
                { field: 'g', title: 'G', width: 100 },
                { field: 'h', title: 'H', width: 100 },
                { field: 'i', title: 'I', width: 100 },
                { field: 'j', title: 'J', width: 100 },
                { field: 'k', title: 'K', width: 100 },
                { field: 'x', title: 'X', width: 100 },
                { field: 'y', title: 'Y', width: 100 },
                { field: 'z', title: 'Z', width: 100 }
              ]
            }
          },
          mounted () {
            this.loadData(500)
          },
          methods: {
            loadData (size) {
              this.loading = true
              this.getTreeList(size).then(data => {
                const startTime = Date.now()
                this.loading = false
                if (this.$refs.xVTree) {
                  this.$refs.xVTree.loadData(data)
                  this.$nextTick(() => {
                    this.$XModal.message({ message: \`渲染 \${size} 行，用时 \${Date.now() - startTime}毫秒\`, status: 'info' })
                  })
                }
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
                  const len5 = 5
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
                              a: \`a\${index1}_\${index2}_\${index3}_\${index4}_\${index5}\`,
                              b: \`b\${index1}_\${index2}_\${index3}_\${index4}_\${index5}\`,
                              c: \`c\${index1}_\${index2}_\${index3}_\${index4}_\${index5}\`,
                              d: \`d\${index1}_\${index2}_\${index3}_\${index4}_\${index5}\`,
                              e: \`e\${index1}_\${index2}_\${index3}_\${index4}_\${index5}\`,
                              f: \`f\${index1}_\${index2}_\${index3}_\${index4}_\${index5}\`,
                              g: \`g\${index1}_\${index2}_\${index3}_\${index4}_\${index5}\`,
                              h: \`h\${index1}_\${index2}_\${index3}_\${index4}_\${index5}\`,
                              i: \`i\${index1}_\${index2}_\${index3}_\${index4}_\${index5}\`,
                              j: \`j\${index1}_\${index2}_\${index3}_\${index4}_\${index5}\`,
                              k: \`k\${index1}_\${index2}_\${index3}_\${index4}_\${index5}\`,
                              x: \`x\${index1}_\${index2}_\${index3}_\${index4}_\${index5}\`,
                              y: \`y\${index1}_\${index2}_\${index3}_\${index4}_\${index5}\`,
                              z: \`z\${index1}_\${index2}_\${index3}_\${index4}_\${index5}\`,
                              checked: false,
                              indeterminate: false,
                              children: []
                            }
                            children4.push(item5)
                          }
                          const item4 = {
                            id: startIndex + ketIndex++,
                            a: \`a\${index1}_\${index2}_\${index3}_\${index4}\`,
                            b: \`b\${index1}_\${index2}_\${index3}_\${index4}\`,
                            c: \`c\${index1}_\${index2}_\${index3}_\${index4}\`,
                            d: \`d\${index1}_\${index2}_\${index3}_\${index4}\`,
                            e: \`e\${index1}_\${index2}_\${index3}_\${index4}\`,
                            f: \`f\${index1}_\${index2}_\${index3}_\${index4}\`,
                            g: \`g\${index1}_\${index2}_\${index3}_\${index4}\`,
                            h: \`h\${index1}_\${index2}_\${index3}_\${index4}\`,
                            i: \`i\${index1}_\${index2}_\${index3}_\${index4}\`,
                            j: \`j\${index1}_\${index2}_\${index3}_\${index4}\`,
                            k: \`k\${index1}_\${index2}_\${index3}_\${index4}\`,
                            x: \`x\${index1}_\${index2}_\${index3}_\${index4}\`,
                            y: \`y\${index1}_\${index2}_\${index3}_\${index4}\`,
                            z: \`z\${index1}_\${index2}_\${index3}_\${index4}\`,
                            checked: false,
                            indeterminate: false,
                            children: children4
                          }
                          children3.push(item4)
                        }
                        const item3 = {
                          id: startIndex + ketIndex++,
                          a: \`a\${index1}_\${index2}_\${index3}\`,
                          b: \`b\${index1}_\${index2}_\${index3}\`,
                          c: \`c\${index1}_\${index2}_\${index3}\`,
                          d: \`d\${index1}_\${index2}_\${index3}\`,
                          e: \`e\${index1}_\${index2}_\${index3}\`,
                          f: \`f\${index1}_\${index2}_\${index3}\`,
                          g: \`g\${index1}_\${index2}_\${index3}\`,
                          h: \`h\${index1}_\${index2}_\${index3}\`,
                          i: \`i\${index1}_\${index2}_\${index3}\`,
                          j: \`j\${index1}_\${index2}_\${index3}\`,
                          k: \`k\${index1}_\${index2}_\${index3}\`,
                          x: \`x\${index1}_\${index2}_\${index3}\`,
                          y: \`y\${index1}_\${index2}_\${index3}\`,
                          z: \`z\${index1}_\${index2}_\${index3}\`,
                          checked: false,
                          indeterminate: false,
                          children: children3
                        }
                        children2.push(item3)
                      }
                      const item2 = {
                        id: startIndex + ketIndex++,
                        a: \`a\${index1}_\${index2}\`,
                        b: \`b\${index1}_\${index2}\`,
                        c: \`c\${index1}_\${index2}\`,
                        d: \`d\${index1}_\${index2}\`,
                        e: \`e\${index1}_\${index2}\`,
                        f: \`f\${index1}_\${index2}\`,
                        g: \`g\${index1}_\${index2}\`,
                        h: \`h\${index1}_\${index2}\`,
                        i: \`i\${index1}_\${index2}\`,
                        j: \`j\${index1}_\${index2}\`,
                        k: \`k\${index1}_\${index2}\`,
                        x: \`x\${index1}_\${index2}\`,
                        y: \`y\${index1}_\${index2}\`,
                        z: \`z\${index1}_\${index2}\`,
                        checked: false,
                        indeterminate: false,
                        children: children2
                      }
                      children1.push(item2)
                    }
                    const item1 = {
                      id: startIndex + ketIndex++,
                      a: \`a\${index1}\`,
                      b: \`b\${index1}\`,
                      c: \`c\${index1}\`,
                      d: \`d\${index1}\`,
                      e: \`e\${index1}\`,
                      f: \`f\${index1}\`,
                      g: \`g\${index1}\`,
                      h: \`h\${index1}\`,
                      i: \`i\${index1}\`,
                      j: \`j\${index1}\`,
                      k: \`k\${index1}\`,
                      x: \`x\${index1}\`,
                      y: \`y\${index1}\`,
                      z: \`z\${index1}\`,
                      checked: false,
                      indeterminate: false,
                      children: children1
                    }
                    result.push(item1)
                  }
                  resolve(result)
                }, 300)
              })
            },
            getSelectionEvent () {
              const selectRecords = this.$refs.xVTree.getCheckboxRecords()
              this.$XModal.alert(selectRecords.length)
            }
          }
        }
        `
      ]
    }
  },
  mounted () {
    this.loadData(500)
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    loadData (size) {
      this.loading = true
      this.getTreeList(size).then(data => {
        const startTime = Date.now()
        this.loading = false
        if (this.$refs.xVTree) {
          this.$refs.xVTree.loadData(data)
          this.$nextTick(() => {
            this.$XModal.message({ message: `渲染 ${size} 行，用时 ${Date.now() - startTime}毫秒`, status: 'info' })
          })
        }
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
          const len5 = 5
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
                      a: `a${index1}_${index2}_${index3}_${index4}_${index5}`,
                      b: `b${index1}_${index2}_${index3}_${index4}_${index5}`,
                      c: `c${index1}_${index2}_${index3}_${index4}_${index5}`,
                      d: `d${index1}_${index2}_${index3}_${index4}_${index5}`,
                      e: `e${index1}_${index2}_${index3}_${index4}_${index5}`,
                      f: `f${index1}_${index2}_${index3}_${index4}_${index5}`,
                      g: `g${index1}_${index2}_${index3}_${index4}_${index5}`,
                      h: `h${index1}_${index2}_${index3}_${index4}_${index5}`,
                      i: `i${index1}_${index2}_${index3}_${index4}_${index5}`,
                      j: `j${index1}_${index2}_${index3}_${index4}_${index5}`,
                      k: `k${index1}_${index2}_${index3}_${index4}_${index5}`,
                      x: `x${index1}_${index2}_${index3}_${index4}_${index5}`,
                      y: `y${index1}_${index2}_${index3}_${index4}_${index5}`,
                      z: `z${index1}_${index2}_${index3}_${index4}_${index5}`,
                      checked: false,
                      indeterminate: false,
                      children: []
                    }
                    children4.push(item5)
                  }
                  const item4 = {
                    id: startIndex + ketIndex++,
                    a: `a${index1}_${index2}_${index3}_${index4}`,
                    b: `b${index1}_${index2}_${index3}_${index4}`,
                    c: `c${index1}_${index2}_${index3}_${index4}`,
                    d: `d${index1}_${index2}_${index3}_${index4}`,
                    e: `e${index1}_${index2}_${index3}_${index4}`,
                    f: `f${index1}_${index2}_${index3}_${index4}`,
                    g: `g${index1}_${index2}_${index3}_${index4}`,
                    h: `h${index1}_${index2}_${index3}_${index4}`,
                    i: `i${index1}_${index2}_${index3}_${index4}`,
                    j: `j${index1}_${index2}_${index3}_${index4}`,
                    k: `k${index1}_${index2}_${index3}_${index4}`,
                    x: `x${index1}_${index2}_${index3}_${index4}`,
                    y: `y${index1}_${index2}_${index3}_${index4}`,
                    z: `z${index1}_${index2}_${index3}_${index4}`,
                    checked: false,
                    indeterminate: false,
                    children: children4
                  }
                  children3.push(item4)
                }
                const item3 = {
                  id: startIndex + ketIndex++,
                  a: `a${index1}_${index2}_${index3}`,
                  b: `b${index1}_${index2}_${index3}`,
                  c: `c${index1}_${index2}_${index3}`,
                  d: `d${index1}_${index2}_${index3}`,
                  e: `e${index1}_${index2}_${index3}`,
                  f: `f${index1}_${index2}_${index3}`,
                  g: `g${index1}_${index2}_${index3}`,
                  h: `h${index1}_${index2}_${index3}`,
                  i: `i${index1}_${index2}_${index3}`,
                  j: `j${index1}_${index2}_${index3}`,
                  k: `k${index1}_${index2}_${index3}`,
                  x: `x${index1}_${index2}_${index3}`,
                  y: `y${index1}_${index2}_${index3}`,
                  z: `z${index1}_${index2}_${index3}`,
                  checked: false,
                  indeterminate: false,
                  children: children3
                }
                children2.push(item3)
              }
              const item2 = {
                id: startIndex + ketIndex++,
                a: `a${index1}_${index2}`,
                b: `b${index1}_${index2}`,
                c: `c${index1}_${index2}`,
                d: `d${index1}_${index2}`,
                e: `e${index1}_${index2}`,
                f: `f${index1}_${index2}`,
                g: `g${index1}_${index2}`,
                h: `h${index1}_${index2}`,
                i: `i${index1}_${index2}`,
                j: `j${index1}_${index2}`,
                k: `k${index1}_${index2}`,
                x: `x${index1}_${index2}`,
                y: `y${index1}_${index2}`,
                z: `z${index1}_${index2}`,
                checked: false,
                indeterminate: false,
                children: children2
              }
              children1.push(item2)
            }
            const item1 = {
              id: startIndex + ketIndex++,
              a: `a${index1}`,
              b: `b${index1}`,
              c: `c${index1}`,
              d: `d${index1}`,
              e: `e${index1}`,
              f: `f${index1}`,
              g: `g${index1}`,
              h: `h${index1}`,
              i: `i${index1}`,
              j: `j${index1}`,
              k: `k${index1}`,
              x: `x${index1}`,
              y: `y${index1}`,
              z: `z${index1}`,
              checked: false,
              indeterminate: false,
              children: children1
            }
            result.push(item1)
          }
          resolve(result)
        }, 300)
      })
    },
    getSelectionEvent () {
      const selectRecords = this.$refs.xVTree.getCheckboxRecords()
      this.$XModal.alert(selectRecords.length)
    }
  }
}
</script>
