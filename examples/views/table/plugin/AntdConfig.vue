<template>
  <div>
    <p class="tip">
      具体兼容请查看 <a class="link" href="https://github.com/x-extends/vxe-table-plugin-antd" target="_blank">vxe-table-plugin-antd</a> 插件的 API<br>
      <span class="red">（注：该示例仅供参考，具体逻辑请自行实现）</span>
    </p>

    <vxe-grid ref="xGrid" v-bind="gridOptions" v-on="gridEvents">
      <template #top>
        <a-alert type="warning" :message="`已选择 ${demo1.selectRecords.length} 项`" banner></a-alert>
      </template>
      <template #toolbar_buttons>
        <el-button @click="insertEvent">新增</el-button>
        <el-button @click="saveEvent">保存</el-button>
      </template>
    </vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { Modal } from 'ant-design-vue'
import { VxeGridInstance, VxeGridProps, VxeGridListeners } from '../../../../types/index'

export default defineComponent({
  setup () {
    const xGrid = ref({} as VxeGridInstance)

    const restaurants = [
      { value: 'Designer' },
      { value: 'Develop' },
      { value: 'Test' },
      { value: 'PM' }
    ]

    const demo1 = reactive({
      selectRecords: [] as any[]
    })

    const gridOptions = reactive({
      border: true,
      showOverflow: true,
      keepSource: true,
      height: 460,
      loading: false,
      data: [],
      toolbarConfig: {
        slots: {
          buttons: 'toolbar_buttons'
        }
      },
      editConfig: {
        trigger: 'click',
        mode: 'row'
      },
      columns: [
        { type: 'checkbox', width: 60 },
        { type: 'seq', title: 'Number', width: 80 },
        { field: 'name', title: 'AInput', minWidth: 140, editRender: { name: 'AInput' } },
        {
          field: 'role',
          title: 'AAutoComplete',
          width: 160,
          editRender: {
            name: 'AAutoComplete',
            props: { options: [] },
            events: {
              search (params, value) {
                const options = restaurants.filter(option => option.value.toUpperCase().indexOf((value || '').toUpperCase()) !== -1)
                if (gridOptions.columns) {
                  const column3 = gridOptions.columns[3]
                  if (column3.editRender && column3.editRender.props) {
                    column3.editRender.props.options = options
                  }
                }
              }
            }
          }
        },
        { field: 'age', title: 'AInputNumber', width: 160, editRender: { name: 'AInputNumber', props: { max: 99, min: 18 } } },
        { field: 'sex', title: 'ASelect', width: 140, editRender: { name: 'ASelect', options: [] } },
        { field: 'sex1', title: 'ASelect（不建议放在单元格）', width: 260, editRender: { name: 'ASelect', options: [], props: { mode: 'multiple' } } },
        { field: 'sex2', title: 'ASelect', width: 140, editRender: { name: 'ASelect', optionGroups: [] } },
        { field: 'region', title: 'ACascader', width: 200, editRender: { name: 'ACascader', props: { options: [] } } },
        { field: 'date1', title: 'ADatePicker', width: 140, editRender: { name: 'ADatePicker', props: { type: 'date', format: 'YYYY/MM/DD' } } },
        { field: 'date2', title: 'AMonthPicker', width: 140, editRender: { name: 'AMonthPicker' } },
        { field: 'date3', title: 'AWeekPicker', width: 140, editRender: { name: 'AWeekPicker' } },
        { field: 'date4', title: 'ARangePicker', width: 260, editRender: { name: 'ARangePicker' } },
        { field: 'date5', title: 'ATimePicker', width: 140, editRender: { name: 'ATimePicker' } },
        { field: 'tree1', title: 'ATreeSelect', width: 140, editRender: { name: 'ATreeSelect', props: { treeData: [] } } },
        { field: 'tree2', title: 'ATreeSelect（不建议放在单元格）', width: 300, editRender: { name: 'ATreeSelect', props: { treeData: [], treeCheckable: true } } },
        { field: 'flag', title: 'ASwitch', width: 100, cellRender: { name: 'ASwitch' } },
        { field: 'rate', title: 'ARate', width: 200, cellRender: { name: 'ARate' } }
      ]
    } as VxeGridProps)

    const gridEvents: VxeGridListeners = {
      checkboxAll () {
        const $grid = xGrid.value
        demo1.selectRecords = $grid.getCheckboxRecords()
      },
      checkboxChange () {
        const $grid = xGrid.value
        demo1.selectRecords = $grid.getCheckboxRecords()
      }
    }

    const findSexList = () => {
      const sexList = [
        { label: '男', value: '1' },
        { label: '女', value: '0' }
      ]
      if (gridOptions.columns) {
        const column5 = gridOptions.columns[5]
        if (column5.editRender) {
          column5.editRender.options = sexList
        }
        const column6 = gridOptions.columns[6]
        if (column6.editRender) {
          column6.editRender.options = sexList
        }
      }
    }

    const findRegionList = () => {
      const regionList = [
        {
          label: '北京',
          value: 1,
          children: [
            { value: 3, label: '东城区' },
            { value: 4, label: '西城区' }
          ]
        },
        {
          label: '上海',
          value: 21,
          children: [
            { value: 23, label: '黄浦区' },
            { value: 24, label: '卢湾区' }
          ]
        },
        {
          label: '广东',
          value: 42,
          children: [
            { value: 43, label: '广州市' },
            { value: 67, label: '深圳市' }
          ]
        }
      ]
      if (gridOptions.columns) {
        const column8 = gridOptions.columns[8]
        if (column8.editRender && column8.editRender.props) {
          column8.editRender.props.options = regionList
        }
      }
    }

    const findSexGroupList = () => {
      const sexGroupList = [
        {
          label: '分组1',
          options: [
            { label: '男', value: '1' }
          ]
        },
        {
          label: '分组2',
          options: [
            { label: '女', value: '0' }
          ]
        }
      ]
      if (gridOptions.columns) {
        const column7 = gridOptions.columns[7]
        if (column7.editRender) {
          column7.editRender.optionGroups = sexGroupList
        }
      }
    }

    const findTreeSelectList = () => {
      const treeData = [
        {
          title: 'Node1',
          value: '0-0',
          key: '0-0',
          children: [
            { title: 'Child Node1', value: '0-0-0', key: '0-0-0' }
          ]
        }, {
          title: 'Node2',
          value: '0-1',
          key: '0-1',
          children: [
            { title: 'Child Node3', value: '0-1-0', key: '0-1-0', disabled: true },
            { title: 'Child Node4', value: '0-1-1', key: '0-1-1' },
            { title: 'Child Node5', value: '0-1-2', key: '0-1-2' }
          ]
        }
      ]
      if (gridOptions.columns) {
        const column14 = gridOptions.columns[14]
        if (column14.editRender && column14.editRender.props) {
          column14.editRender.props.treeData = treeData
        }
        const column15 = gridOptions.columns[15]
        if (column15.editRender && column15.editRender.props) {
          column15.editRender.props.treeData = treeData
        }
      }
    }

    const insertEvent = async () => {
      const $grid = xGrid.value
      const record = {
        role: '',
        age: 18,
        sex1: [],
        region: [],
        flag: false,
        rate: 2
      }
      const { row: newRow } = await $grid.insert(record)
      $grid.setActiveRow(newRow)
    }

    const saveEvent = () => {
      const $grid = xGrid.value
      const { insertRecords, removeRecords, updateRecords } = $grid.getRecordset()
      if (insertRecords.length || removeRecords.length || updateRecords.length) {
        Modal.success({
          content: `insertRecords=${insertRecords.length}; removeRecords=${removeRecords.length}; updateRecords=${updateRecords.length}`
        })
      } else {
        Modal.warn({
          content: '数据未改动！'
        })
      }
    }

    findSexList()
    findRegionList()
    findSexGroupList()
    findTreeSelectList()

    gridOptions.loading = true
    setTimeout(() => {
      gridOptions.data = [
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
      gridOptions.loading = false
    }, 500)

    return {
      xGrid,
      demo1,
      gridOptions,
      gridEvents,
      insertEvent,
      saveEvent,
      demoCodes: [
        `
        <vxe-grid ref="xGrid" v-bind="gridOptions" v-on="gridEvents">
          <template #top>
            <a-alert type="warning" :message="\`已选择 \${demo1.selectRecords.length} 项\`" banner></a-alert>
          </template>
          <template #toolbar_buttons>
            <el-button @click="insertEvent">新增</el-button>
            <el-button @click="saveEvent">保存</el-button>
          </template>
        </vxe-grid>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { Modal } from 'ant-design-vue'
        import { VxeGridInstance, VxeGridProps, VxeGridListeners } from 'vxe-table'

        export default defineComponent({
          setup () {
            const xGrid = ref({} as VxeGridInstance)

            const restaurants = [
              { value: 'Designer' },
              { value: 'Develop' },
              { value: 'Test' },
              { value: 'PM' }
            ]

            const demo1 = reactive({
              selectRecords: [] as any[]
            })

            const gridOptions = reactive({
              border: true,
              showOverflow: true,
              keepSource: true,
              height: 460,
              loading: false,
              data: [],
              toolbarConfig: {
                slots: {
                  buttons: 'toolbar_buttons'
                }
              },
              editConfig: {
                trigger: 'click',
                mode: 'row'
              },
              columns: [
                { type: 'checkbox', width: 60 },
                { type: 'seq', title: 'Number', width: 80 },
                { field: 'name', title: 'AInput', minWidth: 140, editRender: { name: 'AInput' } },
                {
                  field: 'role',
                  title: 'AAutoComplete',
                  width: 160,
                  editRender: {
                    name: 'AAutoComplete',
                    props: { options: [] },
                    events: {
                      search (params, value) {
                        const options = restaurants.filter(option => option.value.toUpperCase().indexOf((value || '').toUpperCase()) !== -1)
                        if (gridOptions.columns) {
                          const column3 = gridOptions.columns[3]
                          if (column3.editRender && column3.editRender.props) {
                            column3.editRender.props.options = options
                          }
                        }
                      }
                    }
                  }
                },
                { field: 'age', title: 'AInputNumber', width: 160, editRender: { name: 'AInputNumber', props: { max: 99, min: 18 } } },
                { field: 'sex', title: 'ASelect', width: 140, editRender: { name: 'ASelect', options: [] } },
                { field: 'sex1', title: 'ASelect（不建议放在单元格）', width: 260, editRender: { name: 'ASelect', options: [], props: { mode: 'multiple' } } },
                { field: 'sex2', title: 'ASelect', width: 140, editRender: { name: 'ASelect', optionGroups: [] } },
                { field: 'region', title: 'ACascader', width: 200, editRender: { name: 'ACascader', props: { options: [] } } },
                { field: 'date1', title: 'ADatePicker', width: 140, editRender: { name: 'ADatePicker', props: { type: 'date', format: 'YYYY/MM/DD' } } },
                { field: 'date2', title: 'AMonthPicker', width: 140, editRender: { name: 'AMonthPicker' } },
                { field: 'date3', title: 'AWeekPicker', width: 140, editRender: { name: 'AWeekPicker' } },
                { field: 'date4', title: 'ARangePicker', width: 260, editRender: { name: 'ARangePicker' } },
                { field: 'date5', title: 'ATimePicker', width: 140, editRender: { name: 'ATimePicker' } },
                { field: 'tree1', title: 'ATreeSelect', width: 140, editRender: { name: 'ATreeSelect', props: { treeData: [] } } },
                { field: 'tree2', title: 'ATreeSelect（不建议放在单元格）', width: 300, editRender: { name: 'ATreeSelect', props: { treeData: [], treeCheckable: true } } },
                { field: 'flag', title: 'ASwitch', width: 100, cellRender: { name: 'ASwitch' } },
                { field: 'rate', title: 'ARate', width: 200, cellRender: { name: 'ARate' } }
              ]
            } as VxeGridProps)

            const gridEvents: VxeGridListeners = {
              checkboxAll () {
                const $grid = xGrid.value
                demo1.selectRecords = $grid.getCheckboxRecords()
              },
              checkboxChange () {
                const $grid = xGrid.value
                demo1.selectRecords = $grid.getCheckboxRecords()
              }
            }

            const findSexList = () => {
              const sexList = [
                { label: '', value: '' },
                { label: '男', value: '1' },
                { label: '女', value: '0' }
              ]
              if (gridOptions.columns) {
                const column5 = gridOptions.columns[5]
                if (column5.editRender) {
                  column5.editRender.options = sexList
                }
                const column6 = gridOptions.columns[6]
                if (column6.editRender) {
                  column6.editRender.options = sexList
                }
              }
            }

            const findRegionList = () => {
              const regionList = [
                {
                  label: '北京',
                  value: 1,
                  children: [
                    { value: 3, label: '东城区' },
                    { value: 4, label: '西城区' }
                  ]
                },
                {
                  label: '上海',
                  value: 21,
                  children: [
                    { value: 23, label: '黄浦区' },
                    { value: 24, label: '卢湾区' }
                  ]
                },
                {
                  label: '广东',
                  value: 42,
                  children: [
                    { value: 43, label: '广州市' },
                    { value: 67, label: '深圳市' }
                  ]
                }
              ]
              if (gridOptions.columns) {
                const column8 = gridOptions.columns[8]
                if (column8.editRender && column8.editRender.props) {
                  column8.editRender.props.options = regionList
                }
              }
            }

            const findSexGroupList = () => {
              const sexGroupList = [
                {
                  label: '分组1',
                  options: [
                    { label: '男', value: '1' }
                  ]
                },
                {
                  label: '分组2',
                  options: [
                    { label: '女', value: '0' }
                  ]
                }
              ]
              if (gridOptions.columns) {
                const column7 = gridOptions.columns[7]
                if (column7.editRender) {
                  column7.editRender.optionGroups = sexGroupList
                }
              }
            }

            const findTreeSelectList = () => {
              const treeData = [
                {
                  title: 'Node1',
                  value: '0-0',
                  key: '0-0',
                  children: [
                    { title: 'Child Node1', value: '0-0-0', key: '0-0-0' }
                  ]
                }, {
                  title: 'Node2',
                  value: '0-1',
                  key: '0-1',
                  children: [
                    { title: 'Child Node3', value: '0-1-0', key: '0-1-0', disabled: true },
                    { title: 'Child Node4', value: '0-1-1', key: '0-1-1' },
                    { title: 'Child Node5', value: '0-1-2', key: '0-1-2' }
                  ]
                }
              ]
              if (gridOptions.columns) {
                const column14 = gridOptions.columns[14]
                if (column14.editRender && column14.editRender.props) {
                  column14.editRender.props.treeData = treeData
                }
                const column15 = gridOptions.columns[15]
                if (column15.editRender && column15.editRender.props) {
                  column15.editRender.props.treeData = treeData
                }
              }
            }

            const insertEvent = async () => {
              const $grid = xGrid.value
              const record = {
                role: '',
                age: 18,
                sex1: [],
                region: [],
                flag: false,
                rate: 2
              }
              const { row: newRow } = await $grid.insert(record)
              $grid.setActiveRow(newRow)
            }

            const saveEvent = () => {
              const $grid = xGrid.value
              const { insertRecords, removeRecords, updateRecords } = $grid.getRecordset()
              if (insertRecords.length || removeRecords.length || updateRecords.length) {
                Modal.success({
                  content: \`insertRecords=\${insertRecords.length}; removeRecords=\${removeRecords.length}; updateRecords=\${updateRecords.length}\`
                })
              } else {
                Modal.warn({
                  content: '数据未改动！'
                })
              }
            }

            findSexList()
            findRegionList()
            findSexGroupList()
            findTreeSelectList()

            gridOptions.loading = true
            setTimeout(() => {
              gridOptions.data = [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '0', sex1: [], region: [], age: 28, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 5, flag: false, address: 'Shenzhen' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: '1', sex1: [], region: [], age: 22, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 2, flag: false, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: '0', sex1: [], region: [], age: 32, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 3, flag: false, address: 'Shanghai' },
                { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '0', sex1: ['1', '0'], region: [], age: 23, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', color1: '', tree1: '', tree2: [], date7: '', rate: 3, flag: true, address: 'Shenzhen' },
                { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: '0', sex1: ['1', '0'], region: [], age: 30, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', color1: '', tree1: '', tree2: [], date7: '', rate: 0, flag: true, address: 'Shanghai' },
                { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: '0', sex1: [], region: [], age: 21, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 3, flag: false, address: 'Shenzhen' },
                { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: '1', sex1: ['1'], region: [], age: 29, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 0, flag: true, address: 'Guangzhou' },
                { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '1', sex1: [], region: [], age: 35, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 2, flag: false, address: 'Shenzhen' },
                { id: 10009, name: 'Test9', nickname: 'T9', role: 'Test', sex: '1', sex1: ['0'], region: [], age: 24, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 3, flag: false, address: 'Shenzhen' },
                { id: 100010, name: 'Test10', nickname: 'T10', role: 'Develop', sex: '1', sex1: [], region: [], age: 20, date: '', date1: '', date2: '', date3: '', date4: [], date5: '', date7: '', color1: '', tree1: '', tree2: [], rate: 4, flag: false, address: 'Guangzhou' }
              ]
              gridOptions.loading = false
            }, 500)

            return {
              xGrid,
              demo1,
              gridOptions,
              gridEvents,
              insertEvent,
              saveEvent
            }
          }
        })
        `
      ]
    }
  }
})
</script>
