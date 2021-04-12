<template>
  <div>
    <p class="tip">
      具体兼容请查看 <a class="link" href="https://github.com/x-extends/vxe-table-plugin-element" target="_blank">vxe-table-plugin-element</a> 适配插件的 API<br>
      <span class="red">（注：该示例仅供参考，具体逻辑请自行实现）</span>
    </p>

    <vxe-table v-bind="gridOptions">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="ElInput" width="100" :filters="[{data: ''}]" :filter-render="{name: 'ElInput', props: {placeholder: '请输入名称'}}"></vxe-table-column>
      <vxe-table-column field="age" title="ElInputNumber" sortable width="180" :filters="[{data: 0}]" :filter-render="{name: 'ElInputNumber', props: {min: 0, max: 100}}"></vxe-table-column>
      <vxe-table-column field="role" title="ElAutocomplete" width="160" :filters="[{data: ''}]" :filter-render="{name: 'ElAutocomplete', props: {fetchSuggestions: roleSearchEvent, placeholder: '请输入角色名称'}}"></vxe-table-column>
      <vxe-table-column field="sex" title="ElSelect" width="100" :formatter="formatterSex" :filters="[{data: null}]" :filter-render="{name: 'ElSelect', options: sexList, props: {placeholder: '请选择'}}"></vxe-table-column>
      <vxe-table-column field="sex1" title="ElSelect" width="100" :formatter="formatterSexs" :filters="[{data: []}]" :filter-render="{name: 'ElSelect', options: sexList, props: {multiple: true, placeholder: '请选择'}}"></vxe-table-column>
      <vxe-table-column field="date3" title="ElDatePicker" width="140" :filters="[{data: []}]" :filter-render="{name: 'ElDatePicker', props: {type: 'daterange', rangeSeparator: '至', startPlaceholder: '开始日期', endPlaceholder: '结束日期'}}"></vxe-table-column>
      <vxe-table-column field="flag" title="ElSwitch" width="100" :filters="[{data: null}]" :filter-render="{name: 'ElSwitch'}" :cell-render="{name: 'ElSwitch', props: {disabled: true}}"></vxe-table-column>
      <vxe-table-column field="rate" title="ElRate" width="180" sortable :filters="[{data: 0}]" :filter-render="{name: 'ElRate'}" :cell-render="{name: 'ElRate', props: {disabled: true}}"></vxe-table-column>
      <vxe-table-column field="rate1" title="ElSlider" width="180" sortable :filters="[{data: 0}]" :filter-render="{name: 'ElSlider'}" :cell-render="{name: 'ElSlider', props: {disabled: true}}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { VxeGridProps, VxeColumnPropTypes } from '../../../../types/index'

export default defineComponent({
  setup () {
    const restaurants = [
      { value: 'Designer', name: 'Designer' },
      { value: 'Develop', name: 'Develop' },
      { value: 'Test', name: 'Test' },
      { value: 'PM', name: 'PM' }
    ]

    const sexList = ref([
      { label: '男', value: '1' },
      { label: '女', value: '0' }
    ])

    const roleList = ref([] as any[])

    const gridOptions = reactive({
      border: true,
      resizable: true,
      highlightHoverRow: true,
      height: 400,
      data: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex1: [], state: '', region: [], age: 28, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 5, rate1: 59, flag: false, address: 'Shenzhen' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: '1', sex1: [], state: '', region: [], age: 22, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 2, rate1: 22, flag: false, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: '0', sex1: [], state: '', region: [], age: 32, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 3, rate1: 12, flag: false, address: 'Shanghai' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '0', sex1: ['1', '0'], state: '', region: [], age: 23, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', color1: '', tree1: '', tree2: [], date7: '', rate: 33, rate1: 4, flag: true, address: 'Shenzhen' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: '0', sex1: ['1', '0'], state: '', region: [], age: 30, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', color1: '', tree1: '', tree2: [], date7: '', rate: 0, rate1: 15, flag: true, address: 'Shanghai' },
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: '0', sex1: [], state: '', region: [], age: 21, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 3, rate1: 73, flag: false, address: 'Shenzhen' },
        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: '1', sex1: ['1'], state: '', region: [], age: 29, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 0, rate1: 0, flag: true, address: 'Guangzhou' },
        { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '1', sex1: [], state: '', region: [], age: 35, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 2, rate1: 14, flag: false, address: 'Shenzhen' },
        { id: 10009, name: 'Test9', nickname: 'T9', role: 'Test', sex: '1', sex1: ['0'], state: '', region: [], age: 24, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 3, rate1: 52, flag: false, address: 'Shenzhen' },
        { id: 100010, name: 'Test10', nickname: 'T10', role: 'Develop', sex: '1', sex1: [], state: '', region: [], age: 20, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 4, rate1: 83, flag: false, address: 'Guangzhou' }
      ]
    } as VxeGridProps)

    const formatterSex: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
      return cellValue === '1' ? '男' : cellValue === '0' ? '女' : ''
    }

    const formatterSexs: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
      return cellValue ? cellValue.map((value: any) => value === '1' ? '男' : value === '0' ? '女' : '').join(';') : ''
    }

    const roleSearchEvent = (queryString: any, cb: (params: any) => void) => {
      const results = queryString ? restaurants.filter(item => (item.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)) : restaurants
      setTimeout(() => {
        cb(results)
      }, 500 * Math.random())
    }

    return {
      sexList,
      roleList,
      gridOptions,
      formatterSex,
      formatterSexs,
      roleSearchEvent,
      demoCodes: [
        `
        <vxe-table v-bind="gridOptions">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="ElInput" width="100" :filters="[{data: ''}]" :filter-render="{name: 'ElInput', props: {placeholder: '请输入名称'}}"></vxe-table-column>
          <vxe-table-column field="age" title="ElInputNumber" sortable width="180" :filters="[{data: 0}]" :filter-render="{name: 'ElInputNumber', props: {min: 0, max: 100}}"></vxe-table-column>
          <vxe-table-column field="role" title="ElAutocomplete" width="160" :filters="[{data: ''}]" :filter-render="{name: 'ElAutocomplete', props: {fetchSuggestions: roleSearchEvent, placeholder: '请输入角色名称'}}"></vxe-table-column>
          <vxe-table-column field="sex" title="ElSelect" width="100" :formatter="formatterSex" :filters="[{data: null}]" :filter-render="{name: 'ElSelect', options: sexList, props: {placeholder: '请选择'}}"></vxe-table-column>
          <vxe-table-column field="sex1" title="ElSelect" width="100" :formatter="formatterSexs" :filters="[{data: []}]" :filter-render="{name: 'ElSelect', options: sexList, props: {multiple: true, placeholder: '请选择'}}"></vxe-table-column>
          <vxe-table-column field="date3" title="ElDatePicker" width="140" :filters="[{data: []}]" :filter-render="{name: 'ElDatePicker', props: {type: 'daterange', rangeSeparator: '至', startPlaceholder: '开始日期', endPlaceholder: '结束日期'}}"></vxe-table-column>
          <vxe-table-column field="flag" title="ElSwitch" width="100" :filters="[{data: null}]" :filter-render="{name: 'ElSwitch'}" :cell-render="{name: 'ElSwitch', props: {disabled: true}}"></vxe-table-column>
          <vxe-table-column field="rate" title="ElRate" width="180" sortable :filters="[{data: 0}]" :filter-render="{name: 'ElRate'}" :cell-render="{name: 'ElRate', props: {disabled: true}}"></vxe-table-column>
          <vxe-table-column field="rate1" title="ElSlider" width="180" sortable :filters="[{data: 0}]" :filter-render="{name: 'ElSlider'}" :cell-render="{name: 'ElSlider', props: {disabled: true}}"></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VxeGridProps, VxeColumnPropTypes } from 'vxe-table'

        export default defineComponent({
          setup () {
            const restaurants = [
              { value: 'Designer', name: 'Designer' },
              { value: 'Develop', name: 'Develop' },
              { value: 'Test', name: 'Test' },
              { value: 'PM', name: 'PM' }
            ]

            const sexList = ref([
              { label: '男', value: '1' },
              { label: '女', value: '0' }
            ])

            const roleList = ref([] as any[])

            const gridOptions = reactive({
              border: true,
              resizable: true,
              highlightHoverRow: true,
              height: 400,
              data: [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex1: [], region: [], age: 28, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 5, rate1: 59, flag: false, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: '1', sex1: [], region: [], age: 22, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 2, rate1: 22, flag: false, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: '0', sex1: [], region: [], age: 32, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 3, rate1: 12, flag: false, address: 'Shanghai' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '0', sex1: ['1', '0'], region: [], age: 23, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', color1: '', tree1: '', tree2: [], date7: '', rate: 33, rate1: 4, flag: true, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: '0', sex1: ['1', '0'], region: [], age: 30, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', color1: '', tree1: '', tree2: [], date7: '', rate: 0, rate1: 15, flag: true, address: 'Shanghai' },
                { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: '0', sex1: [], region: [], age: 21, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 3, rate1: 73, flag: false, address: 'Shenzhen' },
                { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: '1', sex1: ['1'], region: [], age: 29, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 0, rate1: 0, flag: true, address: 'Guangzhou' },
                { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '1', sex1: [], region: [], age: 35, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 2, rate1: 14, flag: false, address: 'Shenzhen' },
                { id: 10009, name: 'Test9', nickname: 'T9', role: 'Test', sex: '1', sex1: ['0'], region: [], age: 24, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 3, rate1: 52, flag: false, address: 'Shenzhen' },
                { id: 100010, name: 'Test10', nickname: 'T10', role: 'Develop', sex: '1', sex1: [], region: [], age: 20, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 4, rate1: 83, flag: false, address: 'Guangzhou' }
              ]
            } as VxeGridProps)

            const formatterSex: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
              return cellValue === '1' ? '男' : cellValue === '0' ? '女' : ''
            }

            const formatterSexs: VxeColumnPropTypes.Formatter = ({ cellValue }) => {
              return cellValue ? cellValue.map((value: any) => value === '1' ? '男' : value === '0' ? '女' : '').join(';') : ''
            }

            const roleSearchEvent = (queryString: any, cb: (params: any) => void) => {
              const results = queryString ? restaurants.filter(item => (item.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)) : restaurants
              setTimeout(() => {
                cb(results)
              }, 500 * Math.random())
            }

            return {
              sexList,
              roleList,
              gridOptions,
              formatterSex,
              formatterSexs,
              roleSearchEvent
            }
          }
        })
        `
      ]
    }
  }
})
</script>
