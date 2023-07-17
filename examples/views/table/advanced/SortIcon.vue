<template>
  <div>
    <p class="tip">改变图标，通过设置 <table-api-link prop="sort-config"/>={<table-api-link prop="iconAsc"/>, <table-api-link prop="iconDesc"/>} 局部替换默认的图标</p>

    <vxe-table
      border
      resizable
      highlight-hover-row
      highlight-current-row
      height="300"
      :sort-config="{iconAsc: 'fa fa-chevron-up', iconDesc: 'fa fa-chevron-down'}"
      :data="tableData">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name" sortable :filters="nameOptions" :filter-method="filterNameMethod"></vxe-column>
      <vxe-column field="role" title="Role"></vxe-column>
      <vxe-column field="age" title="Age" sortable></vxe-column>
      <vxe-column field="address" title="Address" sortable></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { VxeColumnPropTypes } from '../../../../types/index'

export default defineComponent({
  setup () {
    const tableData = ref([
      { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
      { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
      { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
      { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
      { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
      { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
      { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
      { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
    ])

    const nameOptions = ref([{ label: 'id大于10', value: 10 }, { label: 'id大于40', value: 40 }])

    const filterNameMethod: VxeColumnPropTypes.FilterMethod = ({ value, row }) => {
      return row.id >= value
    }

    return {
      tableData,
      nameOptions,
      filterNameMethod,
      demoCodes: []
    }
  }
})
</script>
