<template>
  <div>
    <p class="tip">配置 <table-api-link prop="multiple"/> 启用多字段组合排序，如果是服务端排序，只需加上 <table-api-link prop="sort-config"/>.<table-api-link prop="remote"/> 和 <table-api-link prop="sort-change"/> 事件就可以实现</p>

    <vxe-table
      border
      highlight-hover-column
      height="300"
      :sort-config="{multiple: true, trigger: 'cell'}"
      :data="tableData"
      @sort-change="sortChangeEvent">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
      <vxe-table-column field="role" title="Role" sortable></vxe-table-column>
      <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
      <vxe-table-column field="num" title="Num" sortable></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        { name: '小红', role: '前端', age: 25, num: 7 },
        { name: '老王', role: '后端', age: 30, num: 6 },
        { name: '小红', role: '后端', age: 27, num: 1 },
        { name: '小明', role: '前端', age: 24, num: 2 },
        { name: '老徐', role: '测试', age: 23, num: 3 },
        { name: '老徐', role: '测试', age: 28, num: 3 },
        { name: '老王', role: '前端', age: 29, num: 3 },
        { name: '老王', role: '前端', age: 27, num: 3 },
        { name: '老徐', role: '测试', age: 26, num: 4 },
        { name: '小明', role: '前端', age: 23, num: 4 },
        { name: '小明', role: '前端', age: 28, num: 8 },
        { name: '小明', role: '前端', age: 28, num: 7 },
        { name: '小明', role: '测试', age: 25, num: 6 },
        { name: '小红', role: '后端', age: 22, num: 9 },
        { name: '小红', role: '后端', age: 22, num: 8 },
        { name: '老徐', role: '前端', age: 23, num: 5 },
        { name: '老徐', role: '测试', age: 26, num: 1 },
        { name: '小红', role: '前端', age: 23, num: 4 },
        { name: '小红', role: '前端', age: 29, num: 2 },
        { name: '小明', role: '测试', age: 27, num: 3 },
        { name: '老王', role: '前端', age: 24, num: 6 },
        { name: '老王', role: '后端', age: 22, num: 4 },
        { name: '老徐', role: '前端', age: 24, num: 8 },
        { name: '小明', role: '测试', age: 30, num: 7 },
        { name: '小明', role: '测试', age: 29, num: 7 }
      ],
      demoCodes: [
        `
        <vxe-table
          border
          highlight-hover-column
          height="300"
          :sort-config="{multiple: true, trigger: 'cell'}"
          :data="tableData"
          @sort-change="sortChangeEvent">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
          <vxe-table-column field="role" title="Role" sortable></vxe-table-column>
          <vxe-table-column field="age" title="Age" sortable></vxe-table-column>
          <vxe-table-column field="num" title="Num" sortable></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { name: '小红', role: '前端', age: 25, num: 7 },
                { name: '老王', role: '后端', age: 30, num: 6 },
                { name: '小红', role: '后端', age: 27, num: 1 },
                { name: '小明', role: '前端', age: 24, num: 2 },
                { name: '老徐', role: '测试', age: 23, num: 3 },
                { name: '老徐', role: '测试', age: 28, num: 3 },
                { name: '老王', role: '前端', age: 29, num: 3 },
                { name: '老王', role: '前端', age: 27, num: 3 },
                { name: '老徐', role: '测试', age: 26, num: 4 },
                { name: '小明', role: '前端', age: 23, num: 4 },
                { name: '小明', role: '前端', age: 28, num: 8 },
                { name: '小明', role: '前端', age: 28, num: 7 },
                { name: '小明', role: '测试', age: 25, num: 6 },
                { name: '小红', role: '后端', age: 22, num: 9 },
                { name: '小红', role: '后端', age: 22, num: 8 },
                { name: '老徐', role: '前端', age: 23, num: 5 },
                { name: '老徐', role: '测试', age: 26, num: 1 },
                { name: '小红', role: '前端', age: 23, num: 4 },
                { name: '小红', role: '前端', age: 29, num: 2 },
                { name: '小明', role: '测试', age: 27, num: 3 },
                { name: '老王', role: '前端', age: 24, num: 6 },
                { name: '老王', role: '后端', age: 22, num: 4 },
                { name: '老徐', role: '前端', age: 24, num: 8 },
                { name: '小明', role: '测试', age: 30, num: 7 },
                { name: '小明', role: '测试', age: 29, num: 7 }
              ]
            }
          },
          methods: {
            sortChangeEvent ({ sortList }) {
              console.info(sortList.map((item) => \`\${item.property},\${item.order}\`).join('; '))
            }
          }
        }
        `
      ]
    }
  },
  methods: {
    sortChangeEvent ({ sortList }) {
      console.info(sortList.map((item) => `${item.property},${item.order}`).join('; '))
    }
  }
}
</script>
