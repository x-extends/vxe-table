<template>
  <div>
    <h2>{{ $t('app.aside.nav.list') }}</h2>
    <p class="tip">
      高性能的虚拟列表<span class="orange">（最大可以支撑 80w 行）</span>，用于处理将大数组按需切割成可视区 items 条数，使渲染性能大幅提升，查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'list'}}">API</router-link><br>
      <span class="red">（注：必须固定容器高度和行高）</span>
    </p>

    <p>
      <vxe-button @click="loadData1(10)">加载10条</vxe-button>
      <vxe-button @click="loadData1(500)">加载500条</vxe-button>
      <vxe-button @click="loadData1(10000)">加载1w条</vxe-button>
      <vxe-button @click="loadData1(100000)">加载10w条</vxe-button>
      <vxe-button @click="loadData1(300000)">加载30w条</vxe-button>
      <vxe-button @click="loadData1(500000)">加载50w条</vxe-button>
    </p>

    <p>
      <vxe-list height="240" class="my-list" :loading="loading1" :data="list1">
        <template v-slot="{ items }">
          <div class="my-list-item" v-for="(item, index) in items" :key="index">{{ item.label }}</div>
        </template>
      </vxe-list>
    </p>

    <div class="vxe-row">
      <div class="vxe-col--4">
        <vxe-list class="my-list" height="200" :data="list2">
          <template v-slot="{ items }">
            <div class="my-list-item" v-for="(item, index) in items" :key="index">{{ item.label }}</div>
          </template>
        </vxe-list>
      </div>
      <div class="vxe-col--4">
        <vxe-list class="my-list" height="200" :data="list3">
          <template v-slot="{ items }">
            <div class="my-list-item" v-for="(item, index) in items" :key="index">
              <img src="static/other/img2.gif" height="28">
              <span>{{ item.label }}</span>
            </div>
          </template>
        </vxe-list>
      </div>
      <div class="vxe-col--4">
        <vxe-list class="my-ul-list" height="200" :data="list4" :scroll-y="{sItem: 'li'}">
          <template v-slot="{ items }">
            <ul>
              <li v-for="(item, index) in items" :key="index">
                <img src="static/other/img1.gif" height="28">
                <span>{{ item.label }}</span>
              </li>
            </ul>
          </template>
        </vxe-list>
      </div>
      <div class="vxe-col--12">
        <vxe-list class="my-table-list" height="200" :data="list5" :scroll-y="{gt: 60, sItem: '.my-tr'}">
          <template v-slot="{ items }">
            <table>
              <tbody>
                <tr class="my-tr" v-for="item in items" :key="item.id">
                  <td>{{ item.label }} - 列1</td>
                  <td>{{ item.label }} - 列2</td>
                  <td>{{ item.label }} - 列3</td>
                </tr>
              </tbody>
            </table>
          </template>
        </vxe-list>
      </div>
    </div>

    <p class="tip">实现高性能的虚拟树列表：1.拍平树结构 2.构建列表树结构 3.处理展开收缩</p>

    <p>
      <vxe-button @click="loadTree6(6)">加载30条</vxe-button>
      <vxe-button @click="loadTree6(15)">加载2000条</vxe-button>
      <vxe-button @click="loadTree6(45)">加载2w条</vxe-button>
      <vxe-button @click="loadTree6(100)">加载5w条</vxe-button>
      <vxe-button @click="loadTree6(200)">加载10w条</vxe-button>
      <vxe-button @click="allTreeExpand(true)">全部展开</vxe-button>
      <vxe-button @click="allTreeExpand(false)">全部收起</vxe-button>
    </p>

    <p>
      <vxe-list height="240" class="my-tree" :loading="loading6" :data="list6">
        <template v-slot="{ items }">
          <div
            class="my-tree-item"
            v-for="item in items"
            :key="item.id"
            :class="[`level-${item._LEVEL}`, {'has-child': item._HAS_CHILDREN, 'is-expand': item._EXPAND}]"
            :style="{paddingLeft: `${item._LEVEL * 20}px`}">
            <i class="tree-icon fa fa-chevron-right" @click="toggleTreeNode(item)"></i>
            <span class="tree-label">{{ item.label }}</span>
          </div>
        </template>
      </vxe-list>
    </p>

    <pre>
      <code>
        | Arrow Up ↑ | 匀速向上滚动数据 |
        | Arrow Down ↓ | 匀速向下滚动数据 |
        | Arrow Left ← | 匀速向左滚动数据 |
        | Arrow Right → | 匀速向右滚动数据 |
        | Page Up | 向上翻页滚动 |
        | Page Down | 向下翻页滚动 |
        | Spacebar | 翻页滚动 |
        | Home | 滚动到顶部 |
        | End | 滚动到底部 |
      </code>
    </pre>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="html">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
      <code class="css">{{ demoCodes[2] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      loading1: false,
      loading6: false,
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      list5: [],
      list6: [],
      mockList: [],
      demoCodes: [
        `
        <p>
          <vxe-button @click="loadData1(10)">加载10条</vxe-button>
          <vxe-button @click="loadData1(500)">加载500条</vxe-button>
          <vxe-button @click="loadData1(10000)">加载1w条</vxe-button>
          <vxe-button @click="loadData1(100000)">加载10w条</vxe-button>
          <vxe-button @click="loadData1(300000)">加载30w条</vxe-button>
          <vxe-button @click="loadData1(500000)">加载50w条</vxe-button>
        </p>

        <p>
          <vxe-list height="240" class="my-list" :loading="loading1" :data="list1">
            <template v-slot="{ items }">
              <div class="my-list-item" v-for="(item, index) in items" :key="index">{{ item.label }}</div>
            </template>
          </vxe-list>
        </p>

        <div class="vxe-row">
          <div class="vxe-col--4">
            <vxe-list class="my-list" height="200" :data="list2">
              <template v-slot="{ items }">
                <div class="my-list-item" v-for="(item, index) in items" :key="index">{{ item.label }}</div>
              </template>
            </vxe-list>
          </div>
          <div class="vxe-col--4">
            <vxe-list class="my-list" height="200" :data="list3">
              <template v-slot="{ items }">
                <div class="my-list-item" v-for="(item, index) in items" :key="index">
                  <img src="static/other/img2.gif" height="28">
                  <span>{{ item.label }}</span>
                </div>
              </template>
            </vxe-list>
          </div>
          <div class="vxe-col--4">
            <vxe-list class="my-ul-list" height="200" :data="list4" :scroll-y="{sItem: 'li'}">
              <template v-slot="{ items }">
                <ul>
                  <li v-for="(item, index) in items" :key="index">
                    <img src="static/other/img1.gif" height="28">
                    <span>{{ item.label }}</span>
                  </li>
                </ul>
              </template>
            </vxe-list>
          </div>
          <div class="vxe-col--12">
            <vxe-list class="my-table-list" height="200" :data="list5" :scroll-y="{gt: 60, sItem: '.my-tr'}">
              <template v-slot="{ items }">
                <table>
                  <tbody>
                    <tr class="my-tr" v-for="(item, index) in items" :key="index">
                      <td>{{ item.label }} - 列1</td>
                      <td>{{ item.label }} - 列2</td>
                      <td>{{ item.label }} - 列3</td>
                    </tr>
                  </tbody>
                </table>
              </template>
            </vxe-list>
          </div>
        </div>

        <p class="tip">实现高性能的虚拟树列表：1.拍平树结构 2.构建列表树结构 3.处理展开收缩</p>

        <p>
          <vxe-button @click="loadTree6(6)">加载30条</vxe-button>
          <vxe-button @click="loadTree6(15)">加载2000条</vxe-button>
          <vxe-button @click="loadTree6(45)">加载2w条</vxe-button>
          <vxe-button @click="loadTree6(100)">加载5w条</vxe-button>
          <vxe-button @click="loadTree6(200)">加载10w条</vxe-button>
          <vxe-button @click="allTreeExpand(true)">全部展开</vxe-button>
          <vxe-button @click="allTreeExpand(false)">全部收起</vxe-button>
        </p>

        <p>
          <vxe-list height="240" class="my-tree" :loading="loading6" :data="list6">
            <template v-slot="{ items }">
              <div
                class="my-tree-item"
                v-for="item in items"
                :key="item.id"
                :class="[\`level-\${item._LEVEL}\`, {'has-child': item._HAS_CHILDREN, 'is-expand': item._EXPAND}]"
                :style="{paddingLeft: \`\${item._LEVEL * 20}px\`}">
                <i class="tree-icon fa fa-chevron-right" @click="toggleTreeNode(item)"></i>
                <span class="tree-label">{{ item.label }}</span>
              </div>
            </template>
          </vxe-list>
        </p>
        `,
        `
        export default {
          data () {
            return {
              loading1: false,
              loading6: false,
              list1: [],
              list2: [],
              list3: [],
              list4: [],
              list5: [],
              list6: [],
              mockList: []
            }
          },
          created () {
            this.loadData1(500)
            this.loadTree6(10)
            this.list2 = this.getList(40)
            this.list3 = this.getList(400)
            this.list4 = this.getList(2000)
            this.list5 = this.getList(4000)
          },
          methods: {
            getList (size) {
              const mockList = this.mockList
              if (size > mockList.length) {
                for (let index = mockList.length; index < size; index++) {
                  mockList.push({
                    id: index,
                    label: \`row_\${index}\`
                  })
                }
              }
              return mockList.slice(0, size)
            },
            getTree (size) {
              const result = []
              let idKey = 0
              for (let index = 0; index < size; index++) {
                const item = {
                  id: ++idKey,
                  label: \`节点 \${index}\`
                }
                if (index) {
                  if (index % 33 === 0) {
                    const childList = []
                    for (let cIndex = 0; cIndex < 1000; cIndex++) {
                      childList.push({
                        id: ++idKey,
                        label: \`子节点 \${index}-\${cIndex}\`,
                        children: [
                          { label: \`子节点 \${index}-\${cIndex}-0\` },
                          { label: \`子节点 \${index}-\${cIndex}-1\` },
                          { label: \`子节点 \${index}-\${cIndex}-2\` },
                          { label: \`子节点 \${index}-\${cIndex}-3\` },
                          { label: \`子节点 \${index}-\${cIndex}-4\` },
                          { label: \`子节点 \${index}-\${cIndex}-5\` },
                          { label: \`子节点 \${index}-\${cIndex}-6\` },
                          { label: \`子节点 \${index}-\${cIndex}-7\` }
                        ]
                      })
                    }
                    item.children = childList
                  } else if (index % 22 === 0) {
                    const childList = []
                    for (let cIndex = 0; cIndex < 500; cIndex++) {
                      childList.push({
                        id: ++idKey,
                        label: \`子节点 \${index}-\${cIndex}\`,
                        children: [
                          { label: \`子节点 \${index}-\${cIndex}-0\` },
                          { label: \`子节点 \${index}-\${cIndex}-1\` },
                          { label: \`子节点 \${index}-\${cIndex}-2\` }
                        ]
                      })
                    }
                    item.children = childList
                  } else if (index % 9 === 0) {
                    const childList = []
                    for (let cIndex = 0; cIndex < 200; cIndex++) {
                      childList.push({
                        id: ++idKey,
                        label: \`子节点 \${index}-\${cIndex}\`,
                        children: [
                          { label: \`子节点 \${index}-\${cIndex}-0\` },
                          { label: \`子节点 \${index}-\${cIndex}-1\` },
                          { label: \`子节点 \${index}-\${cIndex}-2\` },
                          { label: \`子节点 \${index}-\${cIndex}-4\` },
                          { label: \`子节点 \${index}-\${cIndex}-5\` }
                        ]
                      })
                    }
                    item.children = childList
                  } else if (index % 6 === 0) {
                    const childList = []
                    for (let cIndex = 0; cIndex < 100; cIndex++) {
                      childList.push({
                        id: ++idKey,
                        label: \`子节点 \${index}-\${cIndex}\`,
                        children: [
                          { label: \`子节点 \${index}-\${cIndex}-0\` },
                          { label: \`子节点 \${index}-\${cIndex}-1\` },
                          { label: \`子节点 \${index}-\${cIndex}-2\` },
                          { label: \`子节点 \${index}-\${cIndex}-3\` }
                        ]
                      })
                    }
                    item.children = childList
                  } else if (index % 3 === 0) {
                    const childList = []
                    for (let cIndex = 0; cIndex < 10; cIndex++) {
                      childList.push({
                        id: ++idKey,
                        label: \`子节点 \${index}-\${cIndex}\`,
                        children: [
                          { label: \`子节点 \${index}-\${cIndex}-0\` },
                          { label: \`子节点 \${index}-\${cIndex}-1\` }
                        ]
                      })
                    }
                    item.children = childList
                  }
                }
                result.push(item)
              }
              return result
            },
            loadData1 (size) {
              // 模拟后台
              this.loading1 = true
              setTimeout(() => {
                this.list1 = this.getList(size)
                this.loading1 = false
                const startTime = Date.now()
                this.$nextTick(() => {
                  this.$XModal.message({ message: \`渲染 \${size} 行，用时 \${Date.now() - startTime}毫秒\`, status: 'info' })
                })
              }, 200)
            },
            loadTree6 (size) {
              // 模拟后台
              this.loading6 = true
              setTimeout(() => {
                const trerData = this.getTree(size)
                // 将树结构拍平，构建列表树结构
                XEUtils.eachTree(trerData, (item, index, items, paths, parent, nodes) => {
                  // 层级
                  item._LEVEL = nodes.length - 1
                  // 是否展开
                  item._EXPAND = false
                  // 是否可视
                  item._VISIBLE = !item._LEVEL
                  // 是否有子节点
                  item._HAS_CHILDREN = item.children && item.children.length > 0
                  // 是否叶子节点
                  item._IS_LEAF = !item._HAS_CHILDREN
                })
                this.tree6 = trerData
                this.refreshTree()
                this.loading6 = false
                const startTime = Date.now()
                this.$nextTick(() => {
                  this.$XModal.message({ message: \`渲染 \${this.fullList6.length} 行，用时 \${Date.now() - startTime}毫秒\`, status: 'info' })
                })
              }, 200)
            },
            toggleTreeNode (row) {
              if (row._HAS_CHILDREN) {
                this.setTreeExpand(row, !row._EXPAND)
              }
            },
            setTreeExpand (row, isExpand) {
              const matchObj = XEUtils.findTree(this.tree6, item => item === row)
              row._EXPAND = isExpand
              if (matchObj) {
                XEUtils.eachTree(matchObj.item.children, (item, index, items, path, parent) => {
                  item._VISIBLE = parent ? parent._EXPAND && parent._VISIBLE : isExpand
                })
              }
              this.refreshTree()
            },
            allTreeExpand (isExpand) {
              if (isExpand) {
                XEUtils.eachTree(this.tree6, item => {
                  item._EXPAND = item._HAS_CHILDREN
                  item._VISIBLE = true
                })
              } else {
                XEUtils.eachTree(this.tree6, item => {
                  item._EXPAND = false
                  item._VISIBLE = !item._LEVEL
                })
              }
              this.refreshTree()
            },
            refreshTree () {
              const treeList = XEUtils.toTreeArray(this.tree6)
              this.fullList6 = treeList
              this.list6 = treeList.filter(item => item._VISIBLE)
            }
          }
        }
        `,
        `
        .my-list {
          border: 1px solid #e8eaec;
        }
        .my-list .my-list-item {
          height: 28px;
          padding-left: 15px;
        }
        .my-ul-list {
          border: 1px solid #e8eaec;
        }
        .my-ul-list li {
          height: 40px;
        }
        .my-table-list {
          border: 1px solid #e8eaec;
        }
        .my-table-list table {
          width: 100%;
          text-align: center;
        }
        .my-table-list .my-tr {
          height: 32px;
        }
        .my-table-list .my-tr:hover {
          background-color: #f5f7fa;
        }
        .my-table-list td {
          border-right: 1px solid #e8eaec;
        }
        .my-tree {
          padding: 0 10px;
          border: 1px solid #e8eaec;
        }
        .my-tree .my-tree-item {
          height: 32px;
          line-height: 32px;
        }
        .my-tree .my-tree-item.has-child .tree-icon {
          visibility: visible;
          transition: all 0.3s;
        }
        .my-tree .my-tree-item.is-expand .tree-icon {
          transform: rotate(90deg);
        }
        .my-tree .tree-icon {
          cursor: pointer;
          width: 20px;
          line-height: 20px;
          text-align: center;
          visibility: hidden;
          user-select: none;
        }
        `
      ]
    }
  },
  created () {
    this.loadData1(500)
    this.loadTree6(10)
    this.list2 = this.getList(40)
    this.list3 = this.getList(400)
    this.list4 = this.getList(2000)
    this.list5 = this.getList(4000)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    getList (size) {
      const mockList = this.mockList
      if (size > mockList.length) {
        for (let index = mockList.length; index < size; index++) {
          mockList.push({
            id: index,
            label: `row_${index}`
          })
        }
      }
      return mockList.slice(0, size)
    },
    getTree (size) {
      const result = []
      let idKey = 0
      for (let index = 0; index < size; index++) {
        const item = {
          id: ++idKey,
          label: `节点 ${index}`
        }
        if (index) {
          if (index % 33 === 0) {
            const childList = []
            for (let cIndex = 0; cIndex < 1000; cIndex++) {
              childList.push({
                id: ++idKey,
                label: `子节点 ${index}-${cIndex}`,
                children: [
                  { label: `子节点 ${index}-${cIndex}-0` },
                  { label: `子节点 ${index}-${cIndex}-1` },
                  { label: `子节点 ${index}-${cIndex}-2` },
                  { label: `子节点 ${index}-${cIndex}-3` },
                  { label: `子节点 ${index}-${cIndex}-4` },
                  { label: `子节点 ${index}-${cIndex}-5` },
                  { label: `子节点 ${index}-${cIndex}-6` },
                  { label: `子节点 ${index}-${cIndex}-7` }
                ]
              })
            }
            item.children = childList
          } else if (index % 22 === 0) {
            const childList = []
            for (let cIndex = 0; cIndex < 500; cIndex++) {
              childList.push({
                id: ++idKey,
                label: `子节点 ${index}-${cIndex}`,
                children: [
                  { label: `子节点 ${index}-${cIndex}-0` },
                  { label: `子节点 ${index}-${cIndex}-1` },
                  { label: `子节点 ${index}-${cIndex}-2` }
                ]
              })
            }
            item.children = childList
          } else if (index % 9 === 0) {
            const childList = []
            for (let cIndex = 0; cIndex < 200; cIndex++) {
              childList.push({
                id: ++idKey,
                label: `子节点 ${index}-${cIndex}`,
                children: [
                  { label: `子节点 ${index}-${cIndex}-0` },
                  { label: `子节点 ${index}-${cIndex}-1` },
                  { label: `子节点 ${index}-${cIndex}-2` },
                  { label: `子节点 ${index}-${cIndex}-4` },
                  { label: `子节点 ${index}-${cIndex}-5` }
                ]
              })
            }
            item.children = childList
          } else if (index % 6 === 0) {
            const childList = []
            for (let cIndex = 0; cIndex < 100; cIndex++) {
              childList.push({
                id: ++idKey,
                label: `子节点 ${index}-${cIndex}`,
                children: [
                  { label: `子节点 ${index}-${cIndex}-0` },
                  { label: `子节点 ${index}-${cIndex}-1` },
                  { label: `子节点 ${index}-${cIndex}-2` },
                  { label: `子节点 ${index}-${cIndex}-3` }
                ]
              })
            }
            item.children = childList
          } else if (index % 3 === 0) {
            const childList = []
            for (let cIndex = 0; cIndex < 10; cIndex++) {
              childList.push({
                id: ++idKey,
                label: `子节点 ${index}-${cIndex}`,
                children: [
                  { label: `子节点 ${index}-${cIndex}-0` },
                  { label: `子节点 ${index}-${cIndex}-1` }
                ]
              })
            }
            item.children = childList
          }
        }
        result.push(item)
      }
      return result
    },
    loadData1 (size) {
      // 模拟后台
      this.loading1 = true
      setTimeout(() => {
        this.list1 = this.getList(size)
        this.loading1 = false
        const startTime = Date.now()
        this.$nextTick(() => {
          this.$XModal.message({ message: `渲染 ${size} 行，用时 ${Date.now() - startTime}毫秒`, status: 'info' })
        })
      }, 200)
    },
    loadTree6 (size) {
      // 模拟后台
      this.loading6 = true
      setTimeout(() => {
        const trerData = this.getTree(size)
        // 将树结构拍平，构建列表树结构
        XEUtils.eachTree(trerData, (item, index, items, paths, parent, nodes) => {
          // 层级
          item._LEVEL = nodes.length - 1
          // 是否展开
          item._EXPAND = false
          // 是否可视
          item._VISIBLE = !item._LEVEL
          // 是否有子节点
          item._HAS_CHILDREN = item.children && item.children.length > 0
          // 是否叶子节点
          item._IS_LEAF = !item._HAS_CHILDREN
        })
        this.tree6 = trerData
        this.refreshTree()
        this.loading6 = false
        const startTime = Date.now()
        this.$nextTick(() => {
          this.$XModal.message({ message: `渲染 ${this.fullList6.length} 行，用时 ${Date.now() - startTime}毫秒`, status: 'info' })
        })
      }, 200)
    },
    toggleTreeNode (row) {
      if (row._HAS_CHILDREN) {
        this.setTreeExpand(row, !row._EXPAND)
      }
    },
    setTreeExpand (row, isExpand) {
      const matchObj = XEUtils.findTree(this.tree6, item => item === row)
      row._EXPAND = isExpand
      if (matchObj) {
        XEUtils.eachTree(matchObj.item.children, (item, index, items, path, parent) => {
          item._VISIBLE = parent ? parent._EXPAND && parent._VISIBLE : isExpand
        })
      }
      this.refreshTree()
    },
    allTreeExpand (isExpand) {
      if (isExpand) {
        XEUtils.eachTree(this.tree6, item => {
          item._EXPAND = item._HAS_CHILDREN
          item._VISIBLE = true
        })
      } else {
        XEUtils.eachTree(this.tree6, item => {
          item._EXPAND = false
          item._VISIBLE = !item._LEVEL
        })
      }
      this.refreshTree()
    },
    refreshTree () {
      const treeList = XEUtils.toTreeArray(this.tree6)
      this.fullList6 = treeList
      this.list6 = treeList.filter(item => item._VISIBLE)
    }
  }
}
</script>

<style scoped>
.my-list {
  border: 1px solid #e8eaec;
}
.my-list .my-list-item {
  height: 28px;
  padding-left: 15px;
}
.my-ul-list {
  border: 1px solid #e8eaec;
}
.my-ul-list li {
  height: 40px;
}
.my-table-list {
  border: 1px solid #e8eaec;
}
.my-table-list table {
  width: 100%;
  text-align: center;
}
.my-table-list .my-tr {
  height: 32px;
}
.my-table-list .my-tr:hover {
  background-color: #f5f7fa;
}
.my-table-list td {
  border-right: 1px solid #e8eaec;
}
.my-tree {
  padding: 0 10px;
  border: 1px solid #e8eaec;
}
.my-tree .my-tree-item {
  height: 32px;
  line-height: 32px;
}
.my-tree .my-tree-item.has-child .tree-icon {
  visibility: visible;
  transition: all 0.3s;
}
.my-tree .my-tree-item.is-expand .tree-icon {
  transform: rotate(90deg);
}
.my-tree .tree-icon {
  cursor: pointer;
  width: 20px;
  line-height: 20px;
  text-align: center;
  visibility: hidden;
  user-select: none;
}
</style>
