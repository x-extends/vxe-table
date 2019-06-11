<template>
  <div>
    <p>数据代理、固定列、服务端排序、服务端筛选、服务端分页</p>
    <p>对于分页场景下，如果想要保留选中状态，可以通过设置 <table-api-link prop="select-config"/> 的 <table-api-link prop="reserve"/> 属性</p>

    <vxe-grid
      ref="xGrid"
      border
      height="548"
      :pager-config="tablePage"
      :columns="tableColumn"
      :proxy-config="tableProxy"
      :select-config="{reserve: true}"
      @sort-change="sortChangeEvent"
      @filter-change="filterChangeEvent"></vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import XEAjax from 'xe-ajax'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      formData: {
        sort: '',
        order: ''
      },
      tablePage: {
        pageSize: 15
      },
      tableProxy: {
        ajax: {
          query: ({ page }) => XEAjax.getJSON(`/api/user/page/list/${page.pageSize}/${page.currentPage}`, this.formData)
        }
      },
      tableColumn: [
        { type: 'selection', width: 50, fixed: 'left' },
        { type: 'index', width: 60, fixed: 'left' },
        { prop: 'id', label: 'ID', width: 100, remoteSort: true },
        { prop: 'name', label: 'Name', width: 300, remoteSort: true },
        { prop: 'nickname', label: 'Nickname', remoteSort: true, width: 300 },
        { prop: 'age', label: 'Age', remoteSort: true, width: 100 },
        {
          prop: 'role',
          label: 'Role',
          remoteSort: true,
          width: 200,
          filters: [
            { label: '前端', value: '前端' },
            { label: '后端', value: '后端' },
            { label: '测试', value: '测试' }
          ],
          filterMultiple: false,
          remoteFilter: true
        },
        { prop: 'describe', label: 'Describe', width: 300, showOverflow: true }
      ],
      demoCodes: [
        `
        <vxe-grid
          ref="xGrid"
          border
          height="548"
          :pager-config="tablePage"
          :columns="tableColumn"
          :proxy-config="tableProxy"
          @sort-change="sortChangeEvent"
          @filter-change="filterChangeEvent"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              formData: {
                sort: '',
                order: ''
              },
              tablePage: {
                pageSize: 15
              },
              tableProxy: {
                ajax: {
                  query: ({ page }) => XEAjax.getJSON(\`/api/user/page/list/\${page.pageSize}/\${page.currentPage}\`, this.formData)
                }
              },
              tableColumn: [
                { type: 'selection', width: 50, fixed: 'left' },
                { type: 'index', width: 60, fixed: 'left' },
                { prop: 'id', label: 'ID', width: 100, remoteSort: true },
                { prop: 'name', label: 'Name', width: 300, remoteSort: true },
                { prop: 'nickname', label: 'Nickname', remoteSort: true, width: 300 },
                { prop: 'age', label: 'Age', remoteSort: true, width: 100 },
                {
                  prop: 'role',
                  label: 'Role',
                  remoteSort: true,
                  width: 200,
                  filters: [
                    { label: '前端', value: '前端' },
                    { label: '后端', value: '后端' },
                    { label: '测试', value: '测试' }
                  ],
                  filterMultiple: false,
                  remoteFilter: true
                },
                { prop: 'describe', label: 'Describe', width: 300, showOverflow: true }
              ]
            }
          },
          methods: {
            sortChangeEvent ({ column, prop, order }) {
              this.formData.sort = prop
              this.formData.order = order
              // 重新查询
              this.$refs.xGrid.commitProxy('query')
            },
            filterChangeEvent ({ column, prop, values }) {
              this.formData = {
                [prop]: values[0]
              }
              // 重新加载，恢复初始状态
              this.$refs.xGrid.commitProxy('reload')
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
  methods: {
    sortChangeEvent ({ column, prop, order }) {
      this.formData.sort = prop
      this.formData.order = order
      // 重新查询
      this.$refs.xGrid.commitProxy('query')
    },
    filterChangeEvent ({ column, prop, values }) {
      this.formData = {
        [prop]: values[0]
      }
      // 重新加载，恢复初始状态
      this.$refs.xGrid.commitProxy('reload')
    }
  }
}
</script>
