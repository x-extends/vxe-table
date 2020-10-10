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
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column field="name" title="Name"></vxe-table-column>
        <vxe-table-column field="sex" title="Sex"></vxe-table-column>
        <vxe-table-column field="age" title="Age"></vxe-table-column>
      </vxe-table>
      <vxe-pager
        perfect
        :current-page.sync="page6.currentPage"
        :page-size.sync="page6.pageSize"
        :total="page6.totalResult"
        :page-sizes="[10, 20, 100, {label: '大量数据', value: 1000}, {label: '全量数据', value: -1}]"
        :layouts="['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
        <template v-slot:left>
          <vxe-button size="small">
            <template v-slot>更多操作</template>
            <template v-slot:dropdowns>
              <vxe-button type="text">批量修改</vxe-button>
              <vxe-button type="text">批量管理</vxe-button>
              <vxe-button type="text">批量删除</vxe-button>
            </template>
          </vxe-button>
        </template>
        <template v-slot:right>
          <img src="static/other/img1.gif" height="34">
          <img src="static/other/img1.gif" height="34">
          <img src="static/other/img1.gif" height="34">
        </template>
      </vxe-pager>
    </p>

    <pre>
      <code>
        | Arrow Up ↑ | 如果在当前页输入框内则向上翻页 |
        | Arrow Down ↓ | 如果在当前页输入框内则向下翻页 |
      </code>
    </pre>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="html">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

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
      tableData: [],
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
            <vxe-table-column type="seq" width="60"></vxe-table-column>
            <vxe-table-column field="name" title="Name"></vxe-table-column>
            <vxe-table-column field="sex" title="Sex"></vxe-table-column>
            <vxe-table-column field="age" title="Age"></vxe-table-column>
          </vxe-table>
          <vxe-pager
            perfect
            :current-page.sync="page6.currentPage"
            :page-size.sync="page6.pageSize"
            :total="page6.totalResult"
            :page-sizes="[10, 20, 100, {label: '大量数据', value: 1000}, {label: '全量数据', value: -1}]"
            :layouts="['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
            <template v-slot:left>
              <vxe-button size="small">
                <template v-slot>更多操作</template>
                <template v-slot:dropdowns>
                  <vxe-button type="text">批量修改</vxe-button>
                  <vxe-button type="text">批量管理</vxe-button>
                  <vxe-button type="text">批量删除</vxe-button>
                </template>
              </vxe-button>
            </template>
            <template v-slot:right>
              <img src="static/other/img1.gif" height="34">
              <img src="static/other/img1.gif" height="34">
              <img src="static/other/img1.gif" height="34">
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
              tableData: []
            }
          }
        }
        `
      ]
    }
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 8)
  }
}
</script>
