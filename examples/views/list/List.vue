<template>
  <div>
    <h2>{{ $t('app.aside.nav.list') }}</h2>
    <p class="tip">
      高性能的虚拟列表<span class="orange">（最大可以支撑 80w 行）</span>，用于处理将大数组按需切割成可视区 items 条数，使渲染性能大幅提升，查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'list'}}">API</router-link><br>
      <span class="red">（注：必须固定容器高度和行高）</span>
    </p>

    <p>
      <vxe-button @click="loadData(10)">加载10条</vxe-button>
      <vxe-button @click="loadData(500)">加载500条</vxe-button>
      <vxe-button @click="loadData(10000)">加载1w条</vxe-button>
      <vxe-button @click="loadData(100000)">加载10w条</vxe-button>
      <vxe-button @click="loadData(300000)">加载30w条</vxe-button>
      <vxe-button @click="loadData(500000)">加载50w条</vxe-button>
    </p>

    <p>
      <vxe-list height="240" class="my-list" :loading="demo1.loading" :data="demo1.list1">
        <template #default="{ items }">
          <div class="my-list-item" v-for="(item, index) in items" :key="index">{{ item.label }}</div>
        </template>
      </vxe-list>
    </p>

    <div class="vxe-row">
      <div class="vxe-col--4">
        <vxe-list class="my-list" height="200" :data="demo1.list2">
          <template #default="{ items }">
            <div class="my-list-item" v-for="(item, index) in items" :key="index">{{ item.label }}</div>
          </template>
        </vxe-list>
      </div>
      <div class="vxe-col--4">
        <vxe-list class="my-list" height="200" :data="demo1.list3">
          <template #default="{ items }">
            <div class="my-list-item" v-for="(item, index) in items" :key="index">
              <img src="/vxe-table/static/other/img2.gif" height="28">
              <span>{{ item.label }}</span>
            </div>
          </template>
        </vxe-list>
      </div>
      <div class="vxe-col--4">
        <vxe-list class="my-ul-list" height="200" :data="demo1.list4" :scroll-y="{sItem: 'li'}">
          <template #default="{ items }">
            <ul>
              <li v-for="(item, index) in items" :key="index">
                <img src="/vxe-table/static/other/img1.gif" height="28">
                <span>{{ item.label }}</span>
              </li>
            </ul>
          </template>
        </vxe-list>
      </div>
      <div class="vxe-col--12">
        <vxe-list class="my-table-list" height="200" :data="demo1.list5" :scroll-y="{gt: 60, sItem: '.my-tr'}">
          <template #default="{ items }">
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

    <pre>
      <pre-code>
        | Arrow Up ↑ | 匀速向上滚动数据 |
        | Arrow Down ↓ | 匀速向下滚动数据 |
        | Arrow Left ← | 匀速向左滚动数据 |
        | Arrow Right → | 匀速向右滚动数据 |
        | Page Up | 向上翻页滚动 |
        | Page Down | 向下翻页滚动 |
        | Spacebar | 翻页滚动 |
        | Home | 滚动到顶部 |
        | End | 滚动到底部 |
      </pre-code>
    </pre>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="html">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
      <pre-code class="css">{{ demoCodes[2] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, nextTick, onMounted } from 'vue'
import { VXETable } from '../../../packages/all'

interface ItemVO {
  [key: string]: any;
}

export default defineComponent({
  setup () {
    const mockList: ItemVO[] = []

    const demo1 = reactive({
      loading: false,
      list1: [] as ItemVO[],
      list2: [] as ItemVO[],
      list3: [] as ItemVO[],
      list4: [] as ItemVO[],
      list5: [] as ItemVO[]
    })

    // 模拟后台
    const getList = (size: number): Promise<ItemVO[]> => {
      return new Promise(resolve => {
        setTimeout(() => {
          if (size > mockList.length) {
            for (let index = mockList.length; index < size; index++) {
              mockList.push({
                id: index,
                label: `row_${index}`
              })
            }
          }
          resolve(mockList.slice(0, size))
        }, 100)
      })
    }

    const loadData = async (size: number) => {
      demo1.loading = true
      demo1.list1 = await getList(size)
      demo1.loading = false
      const startTime = Date.now()
      await nextTick()
      await VXETable.modal.message({ content: `渲染 ${size} 行，用时 ${Date.now() - startTime}毫秒`, status: 'info' })
    }

    // 初始化
    onMounted(async () => {
      demo1.list1 = await getList(200)
      demo1.list2 = await getList(200)
      demo1.list3 = await getList(500)
      demo1.list4 = await getList(2000)
      demo1.list5 = await getList(4000)
    })

    return {
      demo1,
      loadData,
      demoCodes: [
        `
        <p>
          <vxe-button @click="loadData(10)">加载10条</vxe-button>
          <vxe-button @click="loadData(500)">加载500条</vxe-button>
          <vxe-button @click="loadData(10000)">加载1w条</vxe-button>
          <vxe-button @click="loadData(100000)">加载10w条</vxe-button>
          <vxe-button @click="loadData(300000)">加载30w条</vxe-button>
          <vxe-button @click="loadData(500000)">加载50w条</vxe-button>
        </p>

        <p>
          <vxe-list height="240" class="my-list" :loading="demo1.loading" :data="demo1.list1">
            <template #default="{ items }">
              <div class="my-list-item" v-for="(item, index) in items" :key="index">{{ item.label }}</div>
            </template>
          </vxe-list>
        </p>

        <div class="vxe-row">
          <div class="vxe-col--4">
            <vxe-list class="my-list" height="200" :data="demo1.list2">
              <template #default="{ items }">
                <div class="my-list-item" v-for="(item, index) in items" :key="index">{{ item.label }}</div>
              </template>
            </vxe-list>
          </div>
          <div class="vxe-col--4">
            <vxe-list class="my-list" height="200" :data="demo1.list3">
              <template #default="{ items }">
                <div class="my-list-item" v-for="(item, index) in items" :key="index">
                  <img src="/vxe-table/static/other/img2.gif" height="28">
                  <span>{{ item.label }}</span>
                </div>
              </template>
            </vxe-list>
          </div>
          <div class="vxe-col--4">
            <vxe-list class="my-ul-list" height="200" :data="demo1.list4" :scroll-y="{sItem: 'li'}">
              <template #default="{ items }">
                <ul>
                  <li v-for="(item, index) in items" :key="index">
                    <img src="/vxe-table/static/other/img1.gif" height="28">
                    <span>{{ item.label }}</span>
                  </li>
                </ul>
              </template>
            </vxe-list>
          </div>
          <div class="vxe-col--12">
            <vxe-list class="my-table-list" height="200" :data="demo1.list5" :scroll-y="{gt: 60, sItem: '.my-tr'}">
              <template #default="{ items }">
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
        `,
        `
        import { defineComponent, reactive, nextTick, onMounted } from 'vue'
        import { VXETable } from 'vxe-table'

        interface ItemVO {
          [key: string]: any;
        }

        export default defineComponent({
          setup () {
            const mockList: ItemVO[] = []

            const demo1 = reactive({
              loading: false,
              list1: [] as ItemVO[],
              list2: [] as ItemVO[],
              list3: [] as ItemVO[],
              list4: [] as ItemVO[],
              list5: [] as ItemVO[]
            })

            // 模拟后台
            const getList = (size: number): Promise<ItemVO[]> => {
              return new Promise(resolve => {
                setTimeout(() => {
                  if (size > mockList.length) {
                    for (let index = mockList.length; index < size; index++) {
                      mockList.push({
                        id: index,
                        label: \`row_\${index}\`
                      })
                    }
                  }
                  resolve(mockList.slice(0, size))
                }, 100)
              })
            }

            const loadData = async (size: number) => {
              demo1.loading = true
              demo1.list1 = await getList(size)
              demo1.loading = false
              const startTime = Date.now()
              await nextTick()
              await VXETable.modal.message({ content: \`渲染 \${size} 行，用时 \${Date.now() - startTime}毫秒\`, status: 'info' })
            }

            // 初始化
            onMounted(async () => {
              demo1.list1 = await getList(200)
              demo1.list2 = await getList(200)
              demo1.list3 = await getList(500)
              demo1.list4 = await getList(2000)
              demo1.list5 = await getList(4000)
            })

            return {
              demo1,
              loadData
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
        `
      ]
    }
  }
})
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
</style>
