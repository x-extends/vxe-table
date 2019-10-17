<template>
  <div>
    <p class="tip">数据代理、固定列、服务端排序、服务端筛选、服务端分页，对于分页场景下，如果想要保留选中状态，可以通过设置 <table-api-link prop="checkbox-config"/> 的 <table-api-link prop="reserve"/> 属性</p>

    <vxe-grid
      ref="xGrid"
      border
      resizable
      remote-filter
      height="548"
      row-id="id"
      :pager-config="{pageSize: 15}"
      :columns="tableColumn"
      :proxy-config="tableProxy"
      :checkbox-config="{reserve: true}"></vxe-grid>

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
      tableProxy: {
        index: true, // 启用动态序号代理
        sort: true, // 启用排序代理
        filter: true, // 启用筛选代理
        ajax: {
          // 任何支持 Promise API 的库都可以对接（fetch、jquery、axios、xe-ajax）
          query: ({ page, sort, filters }) => {
            // 处理排序条件
            let formData = {
              sort: sort.field,
              order: sort.order
            }
            // 处理筛选条件
            filters.forEach(({ column, field, values }) => {
              formData[field] = values.join(',')
            })
            return this.$ajax.getJSON(`/api/user/page/list/${page.pageSize}/${page.currentPage}`, formData)
          }
        }
      },
      tableColumn: [
        { type: 'checkbox', width: 50, fixed: 'left' },
        { type: 'index', width: 60, fixed: 'left' },
        { field: 'id', title: 'ID', width: 100, remoteSort: true },
        { field: 'name', title: 'Name', width: 300, remoteSort: true },
        { field: 'nickname', title: 'Nickname', remoteSort: true, width: 300 },
        { field: 'age', title: 'Age', remoteSort: true, width: 100 },
        {
          field: 'role',
          title: 'Role',
          remoteSort: true,
          width: 200,
          filters: [
            { label: '前端', value: '前端' },
            { label: '后端', value: '后端' },
            { label: '测试', value: '测试' }
          ],
          filterMultiple: false
        },
        { field: 'describe', title: 'Describe', width: 300, showOverflow: true }
      ],
      demoCodes: [
        `
        <vxe-grid
          ref="xGrid"
          border
          resizable
          remote-filter
          height="548"
          row-id="id"
          :pager-config="{pageSize: 15}"
          :columns="tableColumn"
          :proxy-config="tableProxy"
          :checkbox-config="{reserve: true}"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              tableProxy: {
                index: true, // 启用动态序号代理
                sort: true, // 启用排序代理
                filter: true, // 启用筛选代理
                ajax: {
                  // 任何支持 Promise API 的库都可以对接（fetch、jquery、axios、xe-ajax）
                  query: ({ page, sort, filters }) => {
                    // 处理排序条件
                    let formData = {
                      sort: sort.property,
                      order: sort.order
                    }
                    // 处理筛选条件
                    filters.forEach(({ column, property, values }) => {
                      formData[property] = values.join(',')
                    })
                    return this.$ajax.getJSON(\`/api/user/page/list/\${page.pageSize}/\${page.currentPage}\`, formData)
                  }
                }
              },
              tableColumn: [
                { type: 'checkbox', width: 50, fixed: 'left' },
                { type: 'index', width: 60, fixed: 'left' },
                { field: 'id', title: 'ID', width: 100, remoteSort: true },
                { field: 'name', title: 'Name', width: 300, remoteSort: true },
                { field: 'nickname', title: 'Nickname', remoteSort: true, width: 300 },
                { field: 'age', title: 'Age', remoteSort: true, width: 100 },
                {
                  field: 'role',
                  title: 'Role',
                  remoteSort: true,
                  width: 200,
                  filters: [
                    { label: '前端', value: '前端' },
                    { label: '后端', value: '后端' },
                    { label: '测试', value: '测试' }
                  ],
                  filterMultiple: false
                },
                { field: 'describe', title: 'Describe', width: 300, showOverflow: true }
              ]
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
