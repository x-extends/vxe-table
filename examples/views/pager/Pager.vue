<template>
  <div>
    <h2>分页</h2>
    <p class="tip">查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'pager'}}">API</router-link>，建议通过 <router-link :to="{name: 'StartGlobal'}">setup</router-link> 设置全局样式</p>

    <vxe-pager
      align="left"
      :current-page.sync="page1.currentPage"
      :page-size.sync="page1.pageSize"
      :total="page1.totalResult"
      :layouts="['JumpNumber']">
    </vxe-pager>

    <vxe-pager
      align="left"
      :current-page.sync="page2.currentPage"
      :page-size.sync="page2.pageSize"
      :total="page2.totalResult"
      :layouts="['Sizes', 'PrevPage', 'JumpNumber', 'NextPage']">
    </vxe-pager>

    <vxe-pager
      :current-page.sync="page3.currentPage"
      :page-size.sync="page3.pageSize"
      :total="page3.totalResult"
      :layouts="['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total']">
    </vxe-pager>

    <vxe-pager
      border
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
      :layouts="['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
    </vxe-pager>

    <vxe-pager
      perfect
      :current-page.sync="page6.currentPage"
      :page-size.sync="page6.pageSize"
      :total="page6.totalResult"
      :layouts="['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
    </vxe-pager>

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
      value2: '',
      demoCodes: [
        `
        <vxe-pager
          align="left"
          :current-page.sync="page1.currentPage"
          :page-size.sync="page1.pageSize"
          :total="page1.totalResult"
          :layouts="['JumpNumber']">
        </vxe-pager>

        <vxe-pager
          align="left"
          :current-page.sync="page2.currentPage"
          :page-size.sync="page2.pageSize"
          :total="page2.totalResult"
          :layouts="['Sizes', 'PrevPage', 'JumpNumber', 'NextPage']">
        </vxe-pager>

        <vxe-pager
          :current-page.sync="page3.currentPage"
          :page-size.sync="page3.pageSize"
          :total="page3.totalResult"
          :layouts="['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total']">
        </vxe-pager>

        <vxe-pager
          border
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
          :layouts="['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
        </vxe-pager>

        <vxe-pager
          perfect
          :current-page.sync="page6.currentPage"
          :page-size.sync="page6.pageSize"
          :total="page6.totalResult"
          :layouts="['PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
        </vxe-pager>
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
              }
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
  }
}
</script>
