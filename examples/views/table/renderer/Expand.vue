<template>
  <div>
    <p class="tip">
      内容渲染 <table-column-api-link prop="content-render"/>，查看 <a class="link" href="https://gitee.com/xuliangzhan_admin/vxe-table/tree/master/examples/plugins/table/renderer" target="_blank">示例的源码</a><span class="red">（具体请自行实现，该示例仅供参考）</span><br>
      配置参数：<br>
      renderExpand (renderOpts, params: { row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $table }) 展开内容<br>
    </p>

    <vxe-table
      border
      resizable
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column type="expand" width="80" :content-render="{name: 'MyExpand'}"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="typescript">{{ demoCodes[0] }}</pre-code>
      <pre-code class="xml">{{ demoCodes[1] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[2] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const tableData = ref([
      { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
      { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
      { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
      { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
      { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
      { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
      { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
      { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' }
    ])

    return {
      tableData,
      demoCodes: [
        `
        import VXETable from 'vxe-table'
        
        // 创建一个简单的展开内容渲染
        VXETable.renderer.add('MyExpand', {
          renderExpand (renderOpts, params) {
            const { row } = params
            return [
              <ul>
                <li>
                  <span>ID：</span>
                  <span>{ row.id }</span>
                </li>
                <li>
                  <span>Name：</span>
                  <span>{ row.name }</span>
                </li>
                <li>
                  <span>UpdateTime：</span>
                  <span>{ row.updateTime }</span>
                </li>
                <li>
                  <span>CreateTime：</span>
                  <span>{ row.createTime }</span>
                </li>
              </ul>
            ]
          }
        })
        `,
        `
        <vxe-table
          border
          resizable
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column type="expand" width="80" :content-render="{name: 'MyExpand'}"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, ref } from 'vue'

        export default defineComponent({
          setup () {
            const tableData = ref([
              { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen' },
              { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
              { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
              { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'Shenzhen' },
              { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
              { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'Shenzhen' },
              { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'Shenzhen' },
              { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'Shenzhen' }
            ])

            return {
              tableData
            }
          }
        })
        `
      ]
    }
  }
})
</script>
