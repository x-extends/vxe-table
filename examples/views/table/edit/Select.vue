<template>
  <div>
    <p class="tip">单元格点击编辑，还可以通过 <table-column-api-link prop="autoselect"/> 开启默认选中</p>

    <vxe-table
      border
      resizable
      show-overflow
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'cell'}">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-colgroup title="分组1">
        <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', autoselect: true}"></vxe-table-column>
        <vxe-table-column field="sex5" title="Sex" :edit-render="{name: '$select', optionGroups: sexGriupList}"></vxe-table-column>
      </vxe-table-colgroup>
      <vxe-table-colgroup title="分组1">
        <vxe-table-column field="date13" title="Date" :edit-render="{name: '$input', props: {type: 'date'}, autoselect: true}"></vxe-table-column>
      </vxe-table-colgroup>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-codecode class="xml">{{ demoCodes[0] }}</pre-codecode>
      <pre-codecode class="javascript">{{ demoCodes[1] }}</pre-codecode>
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      sexGriupList: [
        {
          label: '第一分组',
          options: [
            { value: '0', label: '女' }
          ]
        },
        {
          label: '第二分组',
          options: [
            { value: '1', label: '男' }
          ]
        },
        {
          label: '其他',
          options: [
            { value: '2', label: '无' }
          ]
        }
      ],
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          show-overflow
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'cell'}">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-colgroup title="分组1">
            <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', autoselect: true}"></vxe-table-column>
            <vxe-table-column field="sex5" title="Sex" :edit-render="{name: '$select', optionGroups: sexGriupList}"></vxe-table-column>
          </vxe-table-colgroup>
          <vxe-table-colgroup title="分组1">
            <vxe-table-column field="date13" title="Date" :edit-render="{name: '$input', props: {type: 'date'}, autoselect: true}"></vxe-table-column>
          </vxe-table-colgroup>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              sexGriupList: [
                {
                  label: '第一分组',
                  options: [
                    { value: '0', label: '女' }
                  ]
                },
                {
                  label: '第二分组',
                  options: [
                    { value: '1', label: '男' }
                  ]
                },
                {
                  label: '其他',
                  options: [
                    { value: '2', label: '无' }
                  ]
                }
              ]
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
          }
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
