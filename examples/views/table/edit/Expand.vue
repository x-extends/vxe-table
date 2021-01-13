<template>
  <div>
    <p class="tip">展开行</p>

    <vxe-table
      border
      resizable
      show-overflow
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'cell'}">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column type="expand" width="60">
        <template v-slot:content="{ row }">
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
      </vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="date" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
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
      tableData: [],
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          show-overflow
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'cell'}">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column type="expand" width="60">
            <template v-slot:content="{ row, rowIndex }">
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
          </vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="date" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
          }
        }
        `,
        `
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
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
  }
}
</script>

<style lang="scss" scoped>
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
