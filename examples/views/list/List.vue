<template>
  <div>
    <h2>{{ $t('app.aside.nav.list') }}</h2>
    <p class="tip">
      高性能的虚拟列表，用于处理将大数组按需切割成可视区 items 条数，使渲染性能大幅提升，查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'list'}}">API</router-link><br>
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
        <vxe-list class="my-list" :data="list2">
          <template v-slot="{ items }">
            <div class="my-list-item" v-for="(item, index) in items" :key="index">{{ item.label }}</div>
          </template>
        </vxe-list>
      </div>
      <div class="vxe-col--4">
        <vxe-list class="my-list" :data="list3">
          <template v-slot="{ items }">
            <div class="my-list-item" v-for="(item, index) in items" :key="index">
              <img src="static/other/img2.gif" height="28">
              <span>{{ item.label }}</span>
            </div>
          </template>
        </vxe-list>
      </div>
      <div class="vxe-col--4">
        <vxe-list class="my-ul-list" :data="list4" :scrollY="{sItem: 'li'}">
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
        <vxe-list class="my-table-list" :data="list5" :scrollY="{gt: 60, sItem: '.my-tr'}">
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

const mockList = []

export default {
  data () {
    return {
      loading1: false,
      list1: [],
      list2: [],
      list3: [],
      list4: [],
      list5: [],
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
            <vxe-list class="my-list" :data="list2">
              <template v-slot="{ items }">
                <div class="my-list-item" v-for="(item, index) in items" :key="index">{{ item.label }}</div>
              </template>
            </vxe-list>
          </div>
          <div class="vxe-col--4">
            <vxe-list class="my-list" :data="list3">
              <template v-slot="{ items }">
                <div class="my-list-item" v-for="(item, index) in items" :key="index">
                  <img src="static/other/img2.gif" height="28">
                  <span>{{ item.label }}</span>
                </div>
              </template>
            </vxe-list>
          </div>
          <div class="vxe-col--4">
            <vxe-list class="my-ul-list" :data="list4" :scrollY="{sItem: 'li'}">
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
            <vxe-list class="my-table-list" :data="list5" :scrollY="{gt: 60, sItem: '.my-tr'}">
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
        `,
        `
        export default {
          data () {
            return {
              loading1: false,
              list1: [],
              list2: [],
              list3: [],
              list4: [],
              list5: []
            }
          },
          created () {
            this.loadData1(500)
            this.list2 = this.getList(40)
            this.list3 = this.getList(400)
            this.list4 = this.getList(2000)
            this.list5 = this.getList(4000)
          },
          methods: {
            getList (size) {
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
            }
          }
        }
        `,
        `
        .my-list {
          height: 200px;
          border: 1px solid #e8eaec;
        }
        .my-list .my-list-item {
          height: 28px;
          padding-left: 15px;
        }
        .my-ul-list {
          height: 200px;
          border: 1px solid #e8eaec;
        }
        .my-ul-list li {
          height: 40px;
        }
        .my-table-list {
          height: 200px;
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
          border-right: 1px solid #e8eaec;;
        }
        `
      ]
    }
  },
  created () {
    this.loadData1(500)
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
    }
  }
}
</script>

<style scoped>
.my-list {
  height: 200px;
  border: 1px solid #e8eaec;
}
.my-list .my-list-item {
  height: 28px;
  padding-left: 15px;
}
.my-ul-list {
  height: 200px;
  border: 1px solid #e8eaec;
}
.my-ul-list li {
  height: 40px;
}
.my-table-list {
  height: 200px;
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
  border-right: 1px solid #e8eaec;;
}
</style>
