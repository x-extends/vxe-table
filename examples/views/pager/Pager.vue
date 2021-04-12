<template>
  <div>
    <h2>{{ $t('app.aside.nav.pager') }}</h2>
    <p class="tip">支持自定义的分页，查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'pager'}}">API</router-link>，可以通过 <router-link class="link" :to="{name: 'StartGlobal'}">setup</router-link> 设置全局参数</p>

    <p>
      <vxe-pager
        align="left"
        v-model:current-page="page1.currentPage"
        v-model:page-size="page1.pageSize"
        :total="page1.totalResult">
      </vxe-pager>
      <vxe-pager
        align="left"
        size="medium"
        v-model:current-page="page2.currentPage"
        v-model:page-size="page2.pageSize"
        :total="page2.totalResult">
      </vxe-pager>
      <vxe-pager
        align="left"
        size="small"
        v-model:current-page="page2.currentPage"
        v-model:page-size="page2.pageSize"
        :total="page2.totalResult">
      </vxe-pager>
      <vxe-pager
        align="left"
        size="mini"
        v-model:current-page="page2.currentPage"
        v-model:page-size="page2.pageSize"
        :total="page2.totalResult">
      </vxe-pager>
    </p>

    <p>
      <vxe-pager
        v-model:current-page="page4.currentPage"
        v-model:page-size="page4.pageSize"
        :total="page4.totalResult"
        :layouts="['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
      </vxe-pager>

      <vxe-pager
        background
        v-model:current-page="page5.currentPage"
        v-model:page-size="page5.pageSize"
        :total="page5.totalResult"
        :layouts="['PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
      </vxe-pager>
    </p>

    <p>
      <vxe-tooltip ref="xTip"></vxe-tooltip>
      <vxe-table
        border
        height="200"
        :data="demo6.tableData">
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column field="name" title="Name"></vxe-table-column>
        <vxe-table-column field="sex" title="Sex"></vxe-table-column>
        <vxe-table-column field="age" title="Age"></vxe-table-column>
      </vxe-table>
      <vxe-pager
        perfect
        v-model:current-page="page6.currentPage"
        v-model:page-size="page6.pageSize"
        :total="page6.totalResult"
        :page-sizes="[10, 20, 100, {label: '大量数据', value: 1000}, {label: '全量数据', value: -1}]"
        :layouts="['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
        <template #left>
          <vxe-button content="更多操作" size="small">
            <template #dropdowns>
              <vxe-button content="批量修改" type="text"></vxe-button>
              <vxe-button content="批量管理" type="text"></vxe-button>
              <vxe-button content="批量删除" type="text"></vxe-button>
            </template>
          </vxe-button>
        </template>
        <template #right>
          <img src="/vxe-table/static/other/img1.gif" height="34">
          <img src="/vxe-table/static/other/img1.gif" height="34">
          <img src="/vxe-table/static/other/img1.gif" height="34">
        </template>
      </vxe-pager>
    </p>

    <pre>
      <pre-code>
        | Arrow Up ↑ | 如果在当前页输入框内则向上翻页 |
        | Arrow Down ↓ | 如果在当前页输入框内则向下翻页 |
        | Tab | 切换到上一个 |
        | Shift + Tab | 切换到下一个 |
        | Spacebar | 按下点击 |
        | Enter | 点击 |
      </pre-code>
    </pre>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="html">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  data  () {
    const page1 = reactive({
      currentPage: 1,
      pageSize: 10,
      totalResult: 200
    })

    const page2 = reactive({
      currentPage: 1,
      pageSize: 10,
      totalResult: 200
    })

    const page3 = reactive({
      currentPage: 1,
      pageSize: 10,
      totalResult: 200
    })

    const page4 = reactive({
      currentPage: 1,
      pageSize: 10,
      totalResult: 300
    })

    const page5 = reactive({
      currentPage: 1,
      pageSize: 10,
      totalResult: 300
    })

    const page6 = reactive({
      currentPage: 1,
      pageSize: 10,
      totalResult: 300
    })

    const demo6 = reactive({
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 24, address: 'Shanghai' }
      ]
    })

    return {
      page1,
      page2,
      page3,
      page4,
      page5,
      page6,
      demo6,
      demoCodes: [
        `
        <p>
          <vxe-pager
            align="left"
            v-model:current-page="page1.currentPage"
            v-model:page-size="page1.pageSize"
            :total="page1.totalResult">
          </vxe-pager>
          <vxe-pager
            align="left"
            size="medium"
            v-model:current-page="page2.currentPage"
            v-model:page-size="page2.pageSize"
            :total="page2.totalResult">
          </vxe-pager>
          <vxe-pager
            align="left"
            size="small"
            v-model:current-page="page2.currentPage"
            v-model:page-size="page2.pageSize"
            :total="page2.totalResult">
          </vxe-pager>
          <vxe-pager
            align="left"
            size="mini"
            v-model:current-page="page2.currentPage"
            v-model:page-size="page2.pageSize"
            :total="page2.totalResult">
          </vxe-pager>
        </p>

        <p>
          <vxe-pager
            v-model:current-page="page4.currentPage"
            v-model:page-size="page4.pageSize"
            :total="page4.totalResult"
            :layouts="['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
          </vxe-pager>

          <vxe-pager
            background
            v-model:current-page="page5.currentPage"
            v-model:page-size="page5.pageSize"
            :total="page5.totalResult"
            :layouts="['PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
          </vxe-pager>
        </p>

        <p>
          <vxe-tooltip ref="xTip"></vxe-tooltip>
          <vxe-table
            border
            height="200"
            :data="demo6.tableData">
            <vxe-table-column type="seq" width="60"></vxe-table-column>
            <vxe-table-column field="name" title="Name"></vxe-table-column>
            <vxe-table-column field="sex" title="Sex"></vxe-table-column>
            <vxe-table-column field="age" title="Age"></vxe-table-column>
          </vxe-table>
          <vxe-pager
            perfect
            v-model:current-page="page6.currentPage"
            v-model:page-size="page6.pageSize"
            :total="page6.totalResult"
            :page-sizes="[10, 20, 100, {label: '大量数据', value: 1000}, {label: '全量数据', value: -1}]"
            :layouts="['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
            <template #left>
              <vxe-button content="更多操作" size="small">
                <template #dropdowns>
                  <vxe-button content="批量修改" type="text"></vxe-button>
                  <vxe-button content="批量管理" type="text"></vxe-button>
                  <vxe-button content="批量删除" type="text"></vxe-button>
                </template>
              </vxe-button>
            </template>
            <template #right>
              <img src="/vxe-table/static/other/img1.gif" height="34">
              <img src="/vxe-table/static/other/img1.gif" height="34">
              <img src="/vxe-table/static/other/img1.gif" height="34">
            </template>
          </vxe-pager>
        </p>
        `,
        `
        import { defineComponent, reactive } from 'vue'

        export default defineComponent({
          data  () {
            const page1 = reactive({
              currentPage: 1,
              pageSize: 10,
              totalResult: 200
            })

            const page2 = reactive({
              currentPage: 1,
              pageSize: 10,
              totalResult: 200
            })

            const page3 = reactive({
              currentPage: 1,
              pageSize: 10,
              totalResult: 200
            })

            const page4 = reactive({
              currentPage: 1,
              pageSize: 10,
              totalResult: 300
            })

            const page5 = reactive({
              currentPage: 1,
              pageSize: 10,
              totalResult: 300
            })

            const page6 = reactive({
              currentPage: 1,
              pageSize: 10,
              totalResult: 300
            })

            const demo6 = reactive({
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 24, address: 'Shanghai' }
              ]
            })

            return {
              page1,
              page2,
              page3,
              page4,
              page5,
              page6,
              demo6
            }
          }
        })
        `
      ]
    }
  }
})
</script>
