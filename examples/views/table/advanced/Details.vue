<template>
  <div>
    <p class="tip">实现点击行弹出窗口并显示详情信息<span class="red">（具体请自行实现，该示例仅供参考）</span></p>

    <vxe-table
      border
      resizable
      highlight-hover-row
      highlight-current-row
      height="500"
      :data="tableData"
      @cell-click="cellClickEvent">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <vxe-modal v-model="showDetails" title="查看详情" width="600" height="400" :mask="false" :lock-view="false" resize>
      <template v-slot>
        <vxe-table
          border="inner"
          auto-resize
          show-overflow
          highlight-hover-row
          height="auto"
          :show-header="false"
          :sync-resize="showDetails"
          :data="detailData">
          <vxe-table-column field="label" width="40%"></vxe-table-column>
          <vxe-table-column field="value"></vxe-table-column>
        </vxe-table>
      </template>
    </vxe-modal>

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
      showDetails: false,
      detailData: [],
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, amount: 888, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, amount: 666, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: '1', age: 32, amount: 89, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: '0', age: 23, amount: 1000, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: '0', age: 30, amount: 999, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: '0', age: 21, amount: 998, address: 'vxe-table 从入门到放弃' },
        { id: 10007, name: 'Test7', role: 'Test', sex: '1', age: 29, amount: 2000, address: 'vxe-table 从入门到放弃' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: '1 ', age: 35, amount: 999, address: 'vxe-table 从入门到放弃' },
        { id: 10009, name: 'Test9', role: 'Test', sex: '1', age: 26, amount: 2000, address: 'vxe-table 从入门到放弃' },
        { id: 100010, name: 'Test10', role: 'Develop', sex: '1 ', age: 21, amount: 666, address: 'vxe-table 从入门到放弃' }
      ],
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          highlight-hover-row
          highlight-current-row
          height="500"
          :data="tableData"
          @cell-click="cellClickEvent">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>

        <vxe-modal v-model="showDetails" title="查看详情" width="600" height="400" :mask="false" :lock-view="false" resize>
          <template v-slot>
            <vxe-table
              border="inner"
              auto-resize
              show-overflow
              highlight-hover-row
              height="auto"
              :show-header="false"
              :sync-resize="showDetails"
              :data="detailData">
              <vxe-table-column field="label" width="40%"></vxe-table-column>
              <vxe-table-column field="value"></vxe-table-column>
            </vxe-table>
          </template>
        </vxe-modal>
        `,
        `
        export default {
          data () {
            return {
              showDetails: false,
              detailData: [],
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, amount: 888, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, amount: 666, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: '1', age: 32, amount: 89, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: '0', age: 23, amount: 1000, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: '0', age: 30, amount: 999, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: '0', age: 21, amount: 998, address: 'vxe-table 从入门到放弃' },
                { id: 10007, name: 'Test7', role: 'Test', sex: '1', age: 29, amount: 2000, address: 'vxe-table 从入门到放弃' },
                { id: 10008, name: 'Test8', role: 'Develop', sex: '1 ', age: 35, amount: 999, address: 'vxe-table 从入门到放弃' },
                { id: 10009, name: 'Test9', role: 'Test', sex: '1', age: 26, amount: 2000, address: 'vxe-table 从入门到放弃' },
                { id: 100010, name: 'Test10', role: 'Develop', sex: '1 ', age: 21, amount: 666, address: 'vxe-table 从入门到放弃' }
              ]
            }
          },
          methods: {
            cellClickEvent ({ row }) {
              this.detailData = ['name', 'nickname', 'role', 'sex', 'age', 'amount', 'address'].map(field => {
                return { label: field, value: row[field] }
              })
              this.showDetails = true
            }
          }
        }
        `
      ]
    }
  },
  methods: {
    cellClickEvent ({ row }) {
      this.detailData = ['name', 'nickname', 'role', 'sex', 'age', 'amount', 'address'].map(field => {
        return { label: field, value: row[field] }
      })
      this.showDetails = true
    }
  }
}
</script>
