<template>
  <div>
    <p class="tip">
      <span>Warning 1：动态行高与虚拟滚动的取舍，通过关闭高性能的虚拟滚动可以支持动态行高</span><br>
      <span class="red">（注：如果是通过任意方式去动态改变行高，使用这个方式的所有兼容问题都应该自行处理）</span>
    </p>

    <vxe-table
      border
      resizable
      height="400"
      :data="tableData"
      :scroll-x="{enabled: false}"
      :scroll-y="{enabled: false}">
      <vxe-column type="seq" width="80" fixed="left"></vxe-column>
      <vxe-column field="name" title="Name">
        <template #default="{ row, rowIndex }">
          <template v-if="rowIndex % 4 === 0">
            <div>{{ row.name }}</div>
            <div style="color: red">{{ row.age }}</div>
            <div>{{ row.role }}</div>
          </template>
          <template v-else-if="rowIndex % 3 === 0">
            <img src="/vxe-table/static/other/img2.gif" style="width: 60px;">
          </template>
          <template v-else>
            <span>{{ row.name }}</span>
          </template>
        </template>
      </vxe-column>
      <vxe-column field="sex" title="Sex"></vxe-column>
      <vxe-column field="age" title="Age">
        <template #default="{ row, rowIndex }">
          <template v-if="rowIndex % 5 === 0">
            <img src="/vxe-table/static/other/img1.gif" style="width: 60px;">
          </template>
          <template v-else>
            <span>{{ row.age }}</span>
          </template>
        </template>
      </vxe-column>
      <vxe-column field="role" title="Role"></vxe-column>
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
          height="400"
          :data="tableData"
          :scroll-x="{enabled: false}"
          :scroll-y="{enabled: false}">
          <vxe-column type="seq" width="80" fixed="left"></vxe-column>
          <vxe-column field="name" title="Name">
            <template #default="{ row, rowIndex }">
              <template v-if="rowIndex % 4 === 0">
                <div>{{ row.name }}</div>
                <div style="color: red">{{ row.age }}</div>
                <div>{{ row.role }}</div>
              </template>
              <template v-else-if="rowIndex % 3 === 0">
                <img src="/vxe-table/static/other/img2.gif" style="width: 60px;">
              </template>
              <template v-else>
                <span>{{ row.name }}</span>
              </template>
            </template>
          </vxe-column>
          <vxe-column field="sex" title="Sex"></vxe-column>
          <vxe-column field="age" title="Age">
            <template #default="{ row, rowIndex }">
              <template v-if="rowIndex % 5 === 0">
                <img src="/vxe-table/static/other/img1.gif" style="width: 60px;">
              </template>
              <template v-else>
                <span>{{ row.age }}</span>
              </template>
            </template>
          </vxe-column>
          <vxe-column field="role" title="Role"></vxe-column>
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
