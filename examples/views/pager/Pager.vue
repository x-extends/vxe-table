<template>
  <div>
    <h2>{{ $t('app.aside.nav.pager') }}</h2>
    <p class="tip">支持自定义的分页，查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'pager'}}">API</router-link>，可以通过 <router-link class="link" :to="{name: 'StartGlobal'}">setup</router-link> 设置全局参数</p>

    <p>
      <vxe-pager
        align="left"
        :current-page.sync="page1.currentPage"
        :page-size.sync="page1.pageSize"
        :total="page1.totalResult">
      </vxe-pager>
      <vxe-pager
        align="left"
        size="medium"
        :current-page.sync="page2.currentPage"
        :page-size.sync="page2.pageSize"
        :total="page2.totalResult">
      </vxe-pager>
      <vxe-pager
        align="left"
        size="small"
        :current-page.sync="page2.currentPage"
        :page-size.sync="page2.pageSize"
        :total="page2.totalResult">
      </vxe-pager>
      <vxe-pager
        align="left"
        size="mini"
        :current-page.sync="page2.currentPage"
        :page-size.sync="page2.pageSize"
        :total="page2.totalResult">
      </vxe-pager>
    </p>

    <p>
      <vxe-pager
        :current-page.sync="page4.currentPage"
        :page-size.sync="page4.pageSize"
        :total="page4.totalResult"
        :layouts="['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
      </vxe-pager>

      <vxe-pager
        background
        :current-page.sync="page5.currentPage"
        :page-size.sync="page5.pageSize"
        :total="page5.totalResult"
        :layouts="['PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
      </vxe-pager>
    </p>

    <p>
      <vxe-tooltip ref="xTip"></vxe-tooltip>
      <vxe-table
        border
        height="200"
        :data="tableData">
        <vxe-column type="seq" width="60"></vxe-column>
        <vxe-column field="name" title="Name"></vxe-column>
        <vxe-column field="sex" title="Sex"></vxe-column>
        <vxe-column field="age" title="Age"></vxe-column>
      </vxe-table>
      <vxe-pager
        perfect
        :current-page.sync="page6.currentPage"
        :page-size.sync="page6.pageSize"
        :total="page6.totalResult"
        :page-sizes="[10, 20, 100, {label: '大量数据', value: 1000}, {label: '全量数据', value: -1}]"
        :layouts="['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
        <template #left>
          <vxe-button size="small">
            <template #default>更多操作</template>
            <template #dropdowns>
              <vxe-button type="text">批量修改</vxe-button>
              <vxe-button type="text">批量管理</vxe-button>
              <vxe-button type="text">批量删除</vxe-button>
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
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data  () {
    return {
      page1: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 200
      },
      page2: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 200
      },
      page3: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 200
      },
      page4: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 300
      },
      page5: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 300
      },
      page6: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 300
      },
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'test abc' }
      ],
      demoCodes: [
        `
        <p>
          <vxe-pager
            align="left"
            :current-page.sync="page1.currentPage"
            :page-size.sync="page1.pageSize"
            :total="page1.totalResult">
          </vxe-pager>
          <vxe-pager
            align="left"
            size="medium"
            :current-page.sync="page2.currentPage"
            :page-size.sync="page2.pageSize"
            :total="page2.totalResult">
          </vxe-pager>
          <vxe-pager
            align="left"
            size="small"
            :current-page.sync="page2.currentPage"
            :page-size.sync="page2.pageSize"
            :total="page2.totalResult">
          </vxe-pager>
          <vxe-pager
            align="left"
            size="mini"
            :current-page.sync="page2.currentPage"
            :page-size.sync="page2.pageSize"
            :total="page2.totalResult">
          </vxe-pager>
        </p>

        <p>
          <vxe-pager
            :current-page.sync="page4.currentPage"
            :page-size.sync="page4.pageSize"
            :total="page4.totalResult"
            :layouts="['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
          </vxe-pager>

          <vxe-pager
            background
            :current-page.sync="page5.currentPage"
            :page-size.sync="page5.pageSize"
            :total="page5.totalResult"
            :layouts="['PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
          </vxe-pager>
        </p>

        <p>
          <vxe-tooltip ref="xTip"></vxe-tooltip>
          <vxe-table
            border
            height="200"
            :data="tableData">
            <vxe-column type="seq" width="60"></vxe-column>
            <vxe-column field="name" title="Name"></vxe-column>
            <vxe-column field="sex" title="Sex"></vxe-column>
            <vxe-column field="age" title="Age"></vxe-column>
          </vxe-table>
          <vxe-pager
            perfect
            :current-page.sync="page6.currentPage"
            :page-size.sync="page6.pageSize"
            :total="page6.totalResult"
            :page-sizes="[10, 20, 100, {label: '大量数据', value: 1000}, {label: '全量数据', value: -1}]"
            :layouts="['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
            <template #left>
              <vxe-button size="small">
                <template #default>更多操作</template>
                <template #dropdowns>
                  <vxe-button type="text">批量修改</vxe-button>
                  <vxe-button type="text">批量管理</vxe-button>
                  <vxe-button type="text">批量删除</vxe-button>
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
        export default {
          data () {
            return {
              page1: {
                currentPage: 1,
                pageSize: 10,
                totalResult: 200
              },
              page2: {
                currentPage: 1,
                pageSize: 10,
                totalResult: 200
              },
              page3: {
                currentPage: 1,
                pageSize: 10,
                totalResult: 200
              },
              page4: {
                currentPage: 1,
                pageSize: 10,
                totalResult: 300
              },
              page5: {
                currentPage: 1,
                pageSize: 10,
                totalResult: 300
              },
              page6: {
                currentPage: 1,
                pageSize: 10,
                totalResult: 300
              },
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'test abc' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'test abc' }
              ]
            }
          }
        }
        `
      ]
    }
  }
}
</script>
