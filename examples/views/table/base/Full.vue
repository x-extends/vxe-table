<template>
  <div>
    <p class="tip">完整示例</p>

    <vxe-table
      border
      stripe
      resizable
      highlight-hover-row
      height="400"
      :loading="demo1.loading"
      :checkbox-config="{labelField: 'id', highlight: true, range: true}"
      :data="demo1.tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column type="checkbox" title="ID" width="140"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :filters="demo1.sexList" :filter-multiple="false" :formatter="formatterSex"></vxe-table-column>
      <vxe-table-column
        field="age"
        title="Age"
        sortable
        :filters="[{label: '大于16岁', value: 16}, {label: '大于26岁', value: 26}, {label: '大于30岁', value: 30}]"
        :filter-method="filterAgeMethod"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import { VxeColumnPropTypes } from '../../../../types/vxe-table'

export default defineComponent({
  setup () {
    const demo1 = reactive({
      loading: false,
      tableData: [] as any[],
      sexList: [
        {
          label: '女',
          value: '0'
        },
        {
          label: '男',
          value: '1'
        }
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
          { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
          { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
          { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
          { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
          { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
          { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃' },
          { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃' },
          { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃' },
          { id: 10009, name: 'Test9', role: 'Test', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃' },
          { id: 100010, name: 'Test10', role: 'Develop', sex: 'Man ', age: 28, address: 'vxe-table 从入门到放弃' }
        ]
        demo1.loading = false
      }, 500)
    })

    return {
      demo1,
      formatterSex,
      filterAgeMethod,
      demoCodes: [
        `
        <vxe-table
          border
          stripe
          resizable
          highlight-hover-row
          height="400"
          :loading="demo1.loading"
          :checkbox-config="{labelField: 'id', highlight: true, range: true}"
          :data="demo1.tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column type="checkbox" title="ID" width="140"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :filters="sexList" :filter-multiple="false" :formatter="formatterSex"></vxe-table-column>
          <vxe-table-column
            field="age"
            title="Age"
            sortable
            :filters="[{label: '大于16岁', value: 16}, {label: '大于26岁', value: 26}, {label: '大于30岁', value: 30}]"
            :filter-method="filterAgeMethod"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, onMounted, reactive } from 'vue'
        import { VxeColumnPropTypes } from 'vxe-table'

        export default defineComponent({
          setup () {
            const demo1 = reactive({
              loading: false,
              tableData: [] as any[],
              sexList: [
                {
                  label: '女',
                  value: '0'
                },
                {
                  label: '男',
                  value: '1'
                }
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
                  { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'vxe-table 从入门到放弃' },
                  { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                  { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                  { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women ', age: 23, address: 'vxe-table 从入门到放弃' },
                  { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women ', age: 30, address: 'Shanghai' },
                  { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃' },
                  { id: 10007, name: 'Test7', role: 'Test', sex: 'Man ', age: 29, address: 'vxe-table 从入门到放弃' },
                  { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man ', age: 35, address: 'vxe-table 从入门到放弃' },
                  { id: 10009, name: 'Test9', role: 'Test', sex: 'Women ', age: 21, address: 'vxe-table 从入门到放弃' },
                  { id: 100010, name: 'Test10', role: 'Develop', sex: 'Man ', age: 28, address: 'vxe-table 从入门到放弃' }
                ]
                demo1.loading = false
              }, 500)
            })

            return {
              demo1,
              formatterSex,
              filterAgeMethod
            }
          }
        }
        `
      ]
    }
  }
})
</script>
