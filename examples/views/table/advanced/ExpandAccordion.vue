<template>
  <div>
    <p class="tip">
      手风琴展开效果，通过配置 expand-config={<table-api-link prop="accordion"/>} 属性来开启同一级的节点，每次只能展开一个
    </p>

    <vxe-table
      border
      :expand-config="{accordion: true}"
      :data="tableData">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column type="expand" width="80">
        <template #content="{ row, rowIndex }">
          <div v-if="rowIndex === 1" class="expand-wrapper">
            <vxe-table
              border
              :data="childData">
              <vxe-column field="role" title="Role"></vxe-column>
              <vxe-column field="age" title="Age"></vxe-column>
            </vxe-table>
          </div>
          <div v-else class="expand-wrapper">
            <ul>
              <li>
                <span>ID：</span>
                <span>{{ row.id }}</span>
              </li>
              <li>
                <span>Name：</span>
                <span>{{ row.name }}</span>
              </li>
              <li>
                <span>UpdateTime：</span>
                <span>{{ row.updateTime }}</span>
              </li>
              <li>
                <span>CreateTime：</span>
                <span>{{ row.createTime }}</span>
              </li>
            </ul>
          </div>
        </template>
      </vxe-column>
      <vxe-column field="name" title="Name"></vxe-column>
      <vxe-column field="sex" title="Sex"></vxe-column>
      <vxe-column field="age" title="Age"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
      <pre-code class="css">{{ demoCodes[2] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'test abc' }
      ],
      childData: [
        { id: 50004, name: 'Test554', role: 'Designer', sex: '1', age: 33, address: 'test abc' },
        { id: 50005, name: 'Test555', role: 'Develop', sex: '0', age: 36, address: 'Shanghai' },
        { id: 50006, name: 'Test556', role: 'Designer', sex: '1', age: 40, address: 'test abc' }
      ],
      demoCodes: [
        `
        <vxe-table
          border
          :expand-config="{accordion: true}"
          :data="tableData">
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column type="expand" width="80">
            <template #content="{ row, rowIndex }">
              <div v-if="rowIndex === 1" class="expand-wrapper">
                <vxe-table
                  border
                  :data="childData">
                  <vxe-column field="role" title="Role"></vxe-column>
                  <vxe-column field="age" title="Age"></vxe-column>
                </vxe-table>
              </div>
              <div v-else class="expand-wrapper">
                <ul>
                  <li>
                    <span>ID：</span>
                    <span>{{ row.id }}</span>
                  </li>
                  <li>
                    <span>Name：</span>
                    <span>{{ row.name }}</span>
                  </li>
                  <li>
                    <span>UpdateTime：</span>
                    <span>{{ row.updateTime }}</span>
                  </li>
                  <li>
                    <span>CreateTime：</span>
                    <span>{{ row.createTime }}</span>
                  </li>
                </ul>
              </div>
            </template>
          </vxe-column>
          <vxe-column field="name" title="Name"></vxe-column>
          <vxe-column field="sex" title="Sex"></vxe-column>
          <vxe-column field="age" title="Age"></vxe-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'test abc' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'test abc' }
              ],
              childData: [
                { id: 50004, name: 'Test554', role: 'Designer', sex: '1', age: 33, address: 'test abc' },
                { id: 50005, name: 'Test555', role: 'Develop', sex: '0', age: 36, address: 'Shanghai' },
                { id: 50006, name: 'Test556', role: 'Designer', sex: '1', age: 40, address: 'test abc' }
              ]
            }
          }
        }
        `,
        `
        .expand-wrapper {
          padding: 20px;
        }
        `
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.expand-wrapper {
  padding: 20px;
}
</style>
