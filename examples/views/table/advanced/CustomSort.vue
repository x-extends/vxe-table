<template>
  <div>
    <p class="tip">自定义列头排序的实现，你可以把表格封装成子组件进行定制，通过 <table-column-api-link prop="slot"/> 就可以实现自定义排序，通过设置 <table-column-api-link prop="showIcon"/> 可以去掉内置排序图标，例如第三方图标库：font-awesome、inconfont<br><span class="red">（具体请自行实现，该示例仅供参考）</span></p>

    <vxe-table
      border
      resizable
      highlight-hover-row
      highlight-current-row
      class="my-sort"
      ref="xTable"
      height="300"
      :data="tableData"
      :sort-config="{showIcon: false}"
      @header-cell-click="headerCellClickEvent">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name" sortable :filters="nameList" :filter-method="filterNameMethod">
        <template #header="{ column }">
          <span>{{ column.title }}</span>
          <span class="custom-sort" :class="{'is-order': column.order}">
            <i class="fa" :class="[column.order ? `fa-sort-alpha-${column.order}` : 'fa-long-arrow-down']"></i>
          </span>
        </template>
      </vxe-column>
      <vxe-column field="role" title="Role"></vxe-column>
      <vxe-column field="age" title="Age" sortable>
        <template #header="{ column }">
          <span>{{ column.title }}</span>
          <span class="custom-sort" :class="{'is-order': column.order}">
            <i class="fa" :class="[column.order ? `fa-sort-numeric-${column.order}` : 'fa-long-arrow-down']"></i>
          </span>
        </template>
      </vxe-column>
      <vxe-column field="amount" title="Amount" :formatter="formatAmount" sortable>
        <template #header="{ column }">
          <span>{{ column.title }}</span>
          <span class="custom-sort" :class="{'is-order': column.order}">
            <i class="fa" :class="[column.order ? `fa-sort-amount-${column.order}` : 'fa-long-arrow-down']"></i>
          </span>
        </template>
      </vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
      <pre-code class="css">{{ demoCodes[2] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { VxeTableInstance, VxeTableEvents, VxeColumnPropTypes } from '../../../../types/index'
import XEUtils from 'xe-utils'

export default defineComponent({
  setup () {
    const tableData = ref([
      { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, amount: 888, address: 'test abc' },
      { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, amount: 666, address: 'Guangzhou' },
      { id: 10003, name: 'Test3', role: 'PM', sex: '1', age: 32, amount: 89, address: 'Shanghai' },
      { id: 10004, name: 'Test4', role: 'Designer', sex: '0', age: 23, amount: 1000, address: 'test abc' },
      { id: 10005, name: 'Test5', role: 'Develop', sex: '0', age: 30, amount: 999, address: 'Shanghai' },
      { id: 10006, name: 'Test6', role: 'Designer', sex: '0', age: 21, amount: 998, address: 'test abc' },
      { id: 10007, name: 'Test7', role: 'Test', sex: '1', age: 29, amount: 2000, address: 'test abc' },
      { id: 10008, name: 'Test8', role: 'Develop', sex: '1', age: 35, amount: 999, address: 'test abc' }
    ])

    const xTable = ref({} as VxeTableInstance)

    const nameList = ref([{ label: 'id大于10', value: 10 }, { label: 'id大于40', value: 40 }])

    const headerCellClickEvent: VxeTableEvents.HeaderCellClick = ({ column, triggerResizable, triggerSort, triggerFilter }) => {
      const $table = xTable.value
      // 如果触发了列的其他功能按钮
      if (column.sortable && !(triggerResizable || triggerSort || triggerFilter)) {
        if (column.order === 'desc') {
          $table.clearSort()
        } else if (column.order === 'asc') {
          $table.sort(column.property, 'desc')
        } else {
          $table.sort(column.property, 'asc')
        }
      }
    }

    const formatAmount: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
      return XEUtils.commafy(XEUtils.toNumber(cellValue))
    }

    const filterNameMethod: VxeColumnPropTypes.FilterMethod = ({ value, row }) => {
      return row.id >= value
    }

    return {
      xTable,
      tableData,
      nameList,
      headerCellClickEvent,
      formatAmount,
      filterNameMethod,
      demoCodes: []
    }
  }
})
</script>

<style>
.my-sort .custom-sort {
  padding: 0 4px;
}
.my-sort .custom-sort.is-order {
  color: #409eff;
}
</style>
