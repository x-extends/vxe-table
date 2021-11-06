<template>
  <div>
    <p class="tip">
      <span class="red">Warning 1：将全表的单元格渲染成可编辑，该方式将无法兼容 v3</span><br>
      <span class="red">（注：由于不符合 vxe-table 单行编辑的设计原则，使用这个方式的所有兼容问题都应该自行处理）</span>
    </p>

    <vxe-table
      border
      resizable
      show-overflow
      :data="tableData">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name" :cell-render="{name: 'input', attrs: {type: 'text'}}"></vxe-column>
      <vxe-column field="sex" title="Sex" :cell-render="{name: '$select', options: sexList}"></vxe-column>
      <vxe-column field="age" title="Age" :cell-render="{name: '$input', props: {type: 'number'}}"></vxe-column>
      <vxe-column field="role" title="Role">
        <template #default="{ row }">
          <vxe-input type="text" v-model="row.role"></vxe-input>
        </template>
      </vxe-column>
      <vxe-column field="date3" title="Date">
        <template #default="{ row }">
          <vxe-input type="date" v-model="row.date3" transfer></vxe-input>
        </template>
      </vxe-column>
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
      sexList: [
        { value: '', label: '请选择' },
        { value: '0', label: '女' },
        { value: '1', label: '男' }
      ],
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          show-overflow
          :data="tableData">
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column field="name" title="Name" :cell-render="{name: 'input', attrs: {type: 'text'}}"></vxe-column>
          <vxe-column field="sex" title="Sex" :cell-render="{name: '$select', options: sexList}"></vxe-column>
          <vxe-column field="age" title="Age" :cell-render="{name: '$input', props: {type: 'number'}}"></vxe-column>
          <vxe-column field="role" title="Role">
            <template #default="{ row }">
              <vxe-input type="text" v-model="row.role"></vxe-input>
            </template>
          </vxe-column>
          <vxe-column field="date3" title="Date">
            <template #default="{ row }">
              <vxe-input type="date" v-model="row.date3" transfer></vxe-input>
            </template>
          </vxe-column>
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
