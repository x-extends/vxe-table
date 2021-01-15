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
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :cell-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :cell-render="{name: '$select', options: sexList}"></vxe-table-column>
      <vxe-table-column field="age" title="Age" :cell-render="{name: '$input', props: {type: 'number'}}"></vxe-table-column>
      <vxe-table-column field="role" title="Role">
        <template v-slot="{ row }">
          <vxe-input type="text" v-model="row.role"></vxe-input>
        </template>
      </vxe-table-column>
      <vxe-table-column field="date3" title="Date">
        <template v-slot="{ row }">
          <vxe-input type="date" v-model="row.date3" transfer></vxe-input>
        </template>
      </vxe-table-column>
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
      sexList: [
        {
          value: '',
          label: '请选择'
        },
        {
          value: '0',
          label: '女'
        },
        {
          value: '1',
          label: '男'
        }
      ],
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          show-overflow
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :cell-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :cell-render="{name: '$select', options: sexList}"></vxe-table-column>
          <vxe-table-column field="age" title="Age" :cell-render="{name: '$input', props: {type: 'number'}}"></vxe-table-column>
          <vxe-table-column field="role" title="Role">
            <template v-slot="{ row }">
              <vxe-input type="text" v-model="row.role"></vxe-input>
            </template>
          </vxe-table-column>
          <vxe-table-column field="date3" title="Date">
            <template v-slot="{ row }">
              <vxe-input type="date" v-model="row.date3" transfer></vxe-input>
            </template>
          </vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 2)
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 2)
  }
}
</script>
