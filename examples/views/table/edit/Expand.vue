<template>
  <div>
    <p class="tip">展开行</p>

    <vxe-table
      border
      resizable
      show-overflow
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'cell'}">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column type="expand" width="60">
        <template #content="{ row }">
          <ul class="expand-form">
            <li>
              <span class="title">Name：</span>
              <span class="content">
                <vxe-input v-model="row.name"></vxe-input>
              </span>
            </li>
            <li>
              <span class="title">Sex：</span>
              <span class="content">
                <vxe-input v-model="row.sex"></vxe-input>
              </span>
            </li>
            <li>
              <span class="title">Age：</span>
              <span class="content">
                <vxe-input v-model="row.age"></vxe-input>
              </span>
            </li>
          </ul>
        </template>
      </vxe-column>
      <vxe-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-column>
      <vxe-column field="sex" title="Sex" :edit-render="{name: 'input'}"></vxe-column>
      <vxe-column field="date" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-column>
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
      tableData: [{ id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 20, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['0'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Designer', sex: '1', sex2: ['1'], num1: 18, age: 26, address: 'Shenzhen', date12: '', date13: '' },
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: '1', sex2: ['1'], num1: 35, age: 28, address: 'BeiJing', date12: '', date13: '2020-09-04' }
      ],
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          show-overflow
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'cell'}">
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column type="expand" width="60">
            <template #content="{ row, rowIndex }">
              <ul class="expand-form">
                <li>
                  <span class="title">Name：</span>
                  <span class="content">
                    <vxe-input v-model="row.name"></vxe-input>
                  </span>
                </li>
                <li>
                  <span class="title">Sex：</span>
                  <span class="content">
                    <vxe-input v-model="row.sex"></vxe-input>
                  </span>
                </li>
                <li>
                  <span class="title">Age：</span>
                  <span class="content">
                    <vxe-input v-model="row.age"></vxe-input>
                  </span>
                </li>
              </ul>
            </template>
          </vxe-column>
          <vxe-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-column>
          <vxe-column field="sex" title="Sex" :edit-render="{name: 'input'}"></vxe-column>
          <vxe-column field="date" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [{ id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex2: ['0'], num1: 40, age: 28, address: 'Shenzhen', date12: '', date13: '' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', sex: '1', sex2: ['0', '1'], num1: 20, age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'Test', sex: '0', sex2: ['1'], num1: 200, age: 32, address: 'Shanghai', date12: '2020-09-10', date13: '' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '1', sex2: ['0'], num1: 30, age: 23, address: 'Shenzhen', date12: '', date13: '2020-12-04' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Designer', sex: '1', sex2: ['1'], num1: 18, age: 26, address: 'Shenzhen', date12: '', date13: '' },
                { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: '1', sex2: ['1'], num1: 35, age: 28, address: 'BeiJing', date12: '', date13: '2020-09-04' }
              ]
            }
          }
        }
        `,
        `
        .expand-form {
          padding: 20px;
        }
        .expand-form li {
          margin: 5px 0;
        }
        .expand-form li .title,
        .expand-form li .content {
          display: inline-block;
        }
        .expand-form li .title {
          width: 100px;
        }
        .expand-form li .content {
          width: 200px;
        }
        `
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.expand-form {
  padding: 20px;
}
.expand-form li {
  margin: 5px 0;
}
.expand-form li .title,
.expand-form li .content {
  display: inline-block;
}
.expand-form li .title {
  width: 100px;
}
.expand-form li .content {
  width: 200px;
}
</style>
