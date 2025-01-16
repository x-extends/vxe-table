<template>
  <div>
    <vxe-button @click="exportEvent">导出</vxe-button>
    <vxe-toolbar ref="toolbarRef" custom export import></vxe-toolbar>

    <vxe-table
      border
      stripe
      resizable
      show-footer
      highlight-hover-row
      size="mini"
      height="400"
      ref="tableRef"
      id="bbbbb"
      :row-config="{useKey: true,drag:true}"
      :row-drag-config="{trigger:'row',disabledMethod:disabledRowMethod}"
      :column-config="{useKey: true,drag: true}"
      :column-drag-config="{isPeerDrag:true,isToChildDrag:true,isSelfToChildDrag:true,trigger:'default',disabledMethod:disabledColumnMethod}"
      :custom-config="customConfig"
      :loading="demo1.loading"
      :import-config="{modes: importModes}"
      :export-config="{modes: exportModes}"
      :expand-config="{iconOpen: 'vxe-icon-question-circle-fill', iconClose: 'vxe-icon-question-circle-fill'}"
      :checkbox-config="{labelField: 'id', highlight: true, range: true}"
      :data="demo1.tableData"
      :footer-data="demo1.footerData"
      @row-dragstart="rowDragstartEvent"
      @row-dragover="rowDragoverEvent"
      @row-dragend="rowDragendEvent">
      <vxe-column field="seq" type="seq" width="60" drag-sort></vxe-column>
      <vxe-column field="checkbox" type="checkbox" title="ID" width="140" drag-sort></vxe-column>
      <vxe-colgroup field="group1" title="分组1">
        <vxe-colgroup field="group2" title="分组2">
          <vxe-column type="expand" field="role" title="Role"  drag-sort>
            <template #content="{ row }">
              <div>{{ row.name }}</div>
            </template>
          </vxe-column>
          <vxe-column field="name" title="Name" width="100" drag-sort sortable></vxe-column>
        </vxe-colgroup>
      </vxe-colgroup>
      <vxe-column field="sex11" title="<span style='color:red;'>Sex222</span>" type="html" drag-sort></vxe-column>
      <vxe-column field="sex22" title="<span style='color:red;'>Sex1111</span>" type="html" drag-sort :visible="false"></vxe-column>
      <vxe-column field="name1" title="Name1" sortable ></vxe-column>
      <vxe-column field="sex" title="Sex" :filters="demo1.sexList" :filter-multiple="false" :formatter="formatterSex"></vxe-column>
      <vxe-column
        field="age"
        title="Age"
        sortable
        :filters="demo1.ageOptions"
        :filter-method="filterAgeMethod" drag-sort></vxe-column>
      <vxe-column field="address" title="Address" show-overflow drag-sort></vxe-column>
    </vxe-table>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, nextTick } from 'vue'
import { VxeColumnPropTypes, VxeTablePropTypes, VxeTableInstance, VxeToolbarInstance } from '../../../types'

interface RowVO {
  [key: string]: any
}

const tableRef = ref<VxeTableInstance<RowVO>>()
const toolbarRef = ref<VxeToolbarInstance>()

const importModes = ref([
  { label: '自定义25', value: '11' },
  { label: '自定义11', value: '33' },
  { label: 'current', value: 'current' }
])

const exportModes = ref([
  { label: '自定义25', value: '11' },
  { label: '自定义11', value: '33' },
  { label: 'current', value: 'current' }
])

const customConfig = reactive<VxeTablePropTypes.CustomConfig>({
  storage: true
  // immediate: false,
  // storage: true,
  // checkMethod ({ column }) {
  //   return column.type !== 'seq'
  // },
  // visibleMethod ({ column }) {
  //   return column.field !== 'address'
  // }
})

const demo1 = reactive({
  loading: false,
  tableData: [] as any[],
  footerData: [
    { role: '777', name: '11', sex11: '22', sex22: '44', name1: '66', sex: '5656', age: '666' }
  ],
  sexList: [
    { label: '女', value: '0' },
    { label: '男', value: '1' }
  ],
  ageOptions: [
    { label: '大于16岁', value: 16 },
    { label: '大于26岁', value: 26 },
    { label: '大于30岁', value: 30 },
    { label: '大于30岁', value: 30 },
    { label: '大于30岁', value: 30 },
    { label: '大于30岁', value: 30 },
    { label: '大于30岁', value: 30 },
    { label: '大于30岁', value: 30 },
    { label: '大于30岁', value: 30 },
    { label: '大于30岁', value: 30 },
    { label: '大于30岁', value: 30 },
    { label: '大于30岁', value: 30 },
    { label: '大于30岁', value: 30 },
    { label: '大于30岁', value: 30 },
    { label: '大于30岁', value: 30 },
    { label: '大于30岁', value: 30 },
    { label: '大于30岁', value: 30 },
    { label: '大于30岁', value: 30 }
  ]
})

const formatterSex: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
  const item = demo1.sexList.find(item => item.value === cellValue)
  return item ? item.label : ''
}

const filterAgeMethod: VxeColumnPropTypes.FilterMethod = ({ value, row }) => {
  return row.age >= value
}

onMounted(() => {
  demo1.loading = true
  setTimeout(() => {
    demo1.tableData = [
      { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'test abc' },
      { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
      { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
      { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'test abc' },
      { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
      { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'test abc' },
      { id: 10007, name: 'Test7', role: 'Test', sex: '0', age: 29, address: 'test abc' },
      { id: 10008, name: 'Test8', role: 'Develop', sex: '0', age: 35, address: 'test abc' },
      { id: 10009, name: 'Test9', role: 'Test', sex: '1', age: 21, address: 'test abc' },
      { id: 10010, name: 'Test10 Test10 Test10 Test10 Test10 Test10', role: 'Develop', sex: '0', age: 28, address: 'test abc' },
      { id: 10011, name: 'Test11', role: 'Test', sex: '0', age: 29, address: 'test abc' },
      { id: 10012, name: 'Test12', role: 'Develop', sex: '1', age: 27, address: 'test abc' },
      { id: 10013, name: 'Test13', role: 'Test', sex: '0', age: 24, address: 'test abc' },
      { id: 10014, name: 'Test14', role: 'Develop', sex: '1', age: 34, address: 'test abc' },
      { id: 10015, name: 'Test15', role: 'Test', sex: '1', age: 21, address: 'test abc' },
      { id: 10016, name: 'Test16', role: 'Develop', sex: '0', age: 20, address: 'test abc' },
      { id: 10017, name: 'Test17', role: 'Test', sex: '1', age: 31, address: 'test abc' },
      { id: 10018, name: 'Test18', role: 'Develop', sex: '0', age: 32, address: 'test abc' },
      { id: 10019, name: 'Test19', role: 'Test', sex: '1', age: 37, address: 'test abc' },
      { id: 10020, name: 'Test20', role: 'Develop', sex: '1', age: 41, address: 'test abc' }
    ]
    demo1.loading = false
  }, 100)
})

const disabledColumnMethod = ({ column }: any) => {
  return column.field === 'sex11'
}

const disabledRowMethod = ({ row }: any) => {
  return row.id === 10002
}

const rowDragstartEvent = (params: any) => {
  console.log(params)
}
const rowDragoverEvent = (params: any) => {
  console.log(params)
}
const rowDragendEvent = (params: any) => {
  console.log(params)
}

const exportEvent = () => {
  const $table = tableRef.value
  if ($table) {
    $table.openExport({
      types: ['xlsx', 'pdf', 'fff']
    })
  }
}

nextTick(() => {
  // 将表格和工具栏进行关联
  const $table = tableRef.value
  const $toolbar = toolbarRef.value
  if ($table && $toolbar) {
    $table.connect($toolbar)
  }
})
</script>
