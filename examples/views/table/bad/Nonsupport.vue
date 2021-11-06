<template>
  <div>
    <p class="tip">
      <span class="red">Error 1：同时使用展开行与固定列、同时使用展开行与虚拟滚动</span><br>
      <span class="red">（注：由于使用了不支持的特性，使用这个方式的所有兼容问题都应该自行处理）</span>
    </p>

    <vxe-table
      border
      resizable
      :data="tableData">
      <vxe-column type="seq" width="80" fixed="left"></vxe-column>
      <vxe-column type="expand" width="80">
        <template #content>
          <div>xxxxxxxx 被固定列挡住 emmmmm</div>
        </template>
      </vxe-column>
      <vxe-column field="name" title="Name" width="300"></vxe-column>
      <vxe-column field="sex" title="Sex" width="200"></vxe-column>
      <vxe-column field="age" title="Age" width="200"></vxe-column>
      <vxe-column field="role" title="Role" width="300"></vxe-column>
      <vxe-column field="date3" title="Date" width="300"></vxe-column>
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
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
      ],
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          show-overflow
          :data="tableData">
          <vxe-column type="seq" width="80" fixed="left"></vxe-column>
          <vxe-column type="expand" width="80">
            <template #content>
              <div>xxxxxxxx 被固定列挡住 emmmmm</div>
            </template>
          </vxe-column>
          <vxe-column field="name" title="Name" width="300"></vxe-column>
          <vxe-column field="sex" title="Sex" width="200"></vxe-column>
          <vxe-column field="age" title="Age" width="200"></vxe-column>
          <vxe-column field="role" title="Role" width="300"></vxe-column>
          <vxe-column field="date3" title="Date" width="300"></vxe-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
                { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
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
