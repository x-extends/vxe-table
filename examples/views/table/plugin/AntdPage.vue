<template>
  <div>
    <p class="tip">
      与 <a class="link" href="https://github.com/vueComponent/ant-design-vue">ant-design-vue</a> 组合渲染 + 使用分页<br>
      <span class="red">（注：该示例仅供参考，具体逻辑请自行实现）</span>
    </p>

    <vxe-form :data="demo1.formData" title-width="120" title-align="right" @submit="searchEvent" @reset="searchEvent">
      <vxe-form-item field="name" title="AInput" span="8" :title-prefix="{ message: '帮助信息！！！', icon: 'fa fa-exclamation-circle' }" :item-render="{name: 'AInput'}"></vxe-form-item>
      <vxe-form-item field="role" title="AAutoComplete" span="8" :item-render="{name: 'AAutoComplete', props: {options: roleList}, events: {search: roleSearchEvent}}"></vxe-form-item>
      <vxe-form-item field="age" title="AInputNumber" span="8" :item-render="{name: 'AInputNumber'}"></vxe-form-item>
      <vxe-form-item field="sex" title="ASelect" span="8" :item-render="{name: 'ASelect', options: demo1.sexList}"></vxe-form-item>
      <vxe-form-item field="region" title="ACascader" span="8" :item-render="{name: 'ACascader', props: {options: demo1.regionList}}"></vxe-form-item>
      <vxe-form-item field="date" title="ADatePicker" span="8" :item-render="{name: 'ADatePicker', props: {type: 'date', format: 'YYYY/MM/DD'}}"></vxe-form-item>
      <vxe-form-item field="flag" title="ASwitch" span="8" folding :item-render="{name: 'ASwitch'}"></vxe-form-item>
      <vxe-form-item field="rate" title="ARate" span="8" folding :item-render="{name: 'ARate'}"></vxe-form-item>
      <vxe-form-item field="flag1" title="ARadio" span="8" folding :item-render="{name: 'ARadio', options: [{label: '是', value: 'Y'}, {label: '否', value: 'N'}]}"></vxe-form-item>
      <vxe-form-item field="checkedList" title="ACheckbox" span="8" folding :item-render="{name: 'ACheckbox', options: [{label: '北京', value: 'beijing'}, {label: '深圳', value: 'shenzhen'}, {label: '上海', value: 'shanghai'}]}" :visible-method="visibleMethod"></vxe-form-item>
      <vxe-form-item span="24" align="center" collapse-node :item-render="{name: 'AButtons', children: [{ content: '查询', props: {type: 'primary', htmlType: 'submit'} }, { content: '重置', props: {htmlType: 'reset'} }]}"></vxe-form-item>
    </vxe-form>

    <vxe-toolbar ref="xToolbar" export print custom>
      <template #buttons>
        <a-button @click="insertEvent">新增</a-button>
        <a-button @click="saveEvent">保存</a-button>
        <a-button @click="vaildEvent">校验</a-button>
        <a-dropdown :trigger="['click']">
          <a-button>操作</a-button>
          <template #overlay>
            <a-menu>
              <a-menu-item key="0">
                <a @click="dropdownMenuEvent('remove')">删除选中</a>
              </a-menu-item>
              <a-menu-item key="1">
                <a @click="dropdownMenuEvent('export')">导出数据</a>
              </a-menu-item>
              <a-menu-divider />
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      resizable
      show-overflow
      keep-source
      highlight-hover-row
      ref="xTable"
      height="460"
      :export-config="{}"
      :print-config="{}"
      :loading="demo1.loading"
      :data="demo1.tableData"
      :edit-rules="demo1.validRules"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
      <vxe-column type="checkbox" width="60" fixed="left"></vxe-column>
      <vxe-column type="seq" title="Number" width="80" fixed="left"></vxe-column>
      <vxe-column field="name" title="AInput" min-width="140" fixed="left" :edit-render="{name: 'AInput'}"></vxe-column>
      <vxe-column field="role" title="AAutoComplete" width="160" :edit-render="{name: 'AAutoComplete', props: {options: roleList}, events: {search: roleSearchEvent}}"></vxe-column>
      <vxe-column field="age" title="AInputNumber" width="160" :edit-render="{name: 'AInputNumber', props: {max: 35, min: 18}}"></vxe-column>
      <vxe-column field="sex" title="ASelect" width="140" :edit-render="{name: 'ASelect', options: demo1.sexList}"></vxe-column>
      <vxe-column field="sex1" title="ASelect multiple" width="180" :edit-render="{name: 'ASelect', options: demo1.sexList, props: {mode: 'multiple'}}"></vxe-column>
      <vxe-column field="region" title="ACascader" width="200" :edit-render="{name: 'ACascader', props: {options: demo1.regionList}}"></vxe-column>
      <vxe-column field="date1" title="ADatePicker" width="200" :edit-render="{name: 'ADatePicker', props: {type: 'date', format: 'YYYY/MM/DD'}}"></vxe-column>
      <vxe-column field="flag" title="ASwitch" width="100" :cell-render="{name: 'ASwitch'}"></vxe-column>
      <vxe-column field="rate" title="ARate" width="200" fixed="right" :cell-render="{name: 'ARate'}"></vxe-column>
    </vxe-table>

    <a-pagination
      @showSizeChange="handleSizeChange"
      @change="handleCurrentChange"
      v-model="demo1.tablePage.currentPage"
      :page-size-options="['5', '10', '15', '20', '50', '100', '150', '200']"
      :page-size="demo1.tablePage.pageSize"
      :total="demo1.tablePage.totalResult"
      showSizeChanger
      showQuickJumper>
    </a-pagination>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, nextTick } from 'vue'
import { Modal, message } from 'ant-design-vue'
import { VxeTableInstance, VxeToolbarInstance } from '../../../../types/index'

export default defineComponent({
  setup () {
    const xToolbar = ref({} as VxeToolbarInstance)
    const xTable = ref({} as VxeTableInstance)

    const restaurants = [
      { value: 'Designer' },
      { value: 'Develop' },
      { value: 'Test' },
      { value: 'PM' }
    ]

    const roleList = ref([] as any[])

    const demo1 = reactive({
      loading: false,
      tableData: [] as any[],
      validRules: {
        name: [
          { required: true, message: 'app.body.valid.rName' },
          { min: 3, max: 50, message: '名称长度在 3 到 50 个字符' }
        ],
        sex: [
          { required: true, message: '性别必须填写' }
        ]
      },
      sexList: [] as any[],
      regionList: [] as any[],
      sexGroupList: [
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
      ],
      tablePage: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0
      },
      formData: {
        name: '',
        role: '',
        sex: null,
        age: null,
        region: [],
        date: null,
        flag: false,
        rate: 0,
        flag1: '',
        checkedList: []
      }
    })

    const findList = () => {
      demo1.loading = true
      setTimeout(() => {
        const list = [
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
        demo1.tableData = list
        demo1.tablePage.totalResult = 146
        demo1.loading = false
      }, 500)
    }

    const findSexList = () => {
      const sexList = [
        { label: '男', value: '1' },
        { label: '女', value: '0' }
      ]
      demo1.sexList = sexList
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
      demo1.regionList = regionList
    }

    const searchEvent = () => {
      demo1.tablePage.currentPage = 1
      findList()
    }

    const insertEvent = async () => {
      const $table = xTable.value
      const record = {
        role: '',
        age: 18,
        sex1: [],
        region: [],
        flag: false,
        rate: 2
      }
      const { row: newRow } = await $table.insert(record)
      $table.setActiveRow(newRow)
    }

    const saveEvent = () => {
      const $table = xTable.value
      const { insertRecords, removeRecords, updateRecords } = $table.getRecordset()
      if (insertRecords.length || removeRecords.length || updateRecords.length) {
        Modal.success({
          content: '保存成功！'
        })
        searchEvent()
      } else {
        Modal.warn({
          content: '数据未改动！'
        })
      }
    }

    const vaildEvent = () => {
      const $table = xTable.value
      $table.validate((errMap) => {
        if (errMap) {
          message.error({
            content: '校验不通过！'
          })
        } else {
          message.success({
            content: '校验成功！'
          })
        }
      })
    }

    const dropdownMenuEvent = (name: string) => {
      const $table = xTable.value
      switch (name) {
        case 'remove': {
          const selectRecords = $table.getCheckboxRecords()
          if (selectRecords.length) {
            $table.removeCheckboxRow()
          } else {
            message.warning({
              content: '请至少选择一条数据！'
            })
          }
          break
        }
        case 'export': {
          $table.exportData()
          break
        }
      }
    }

    const handleSizeChange = (current: number, size: number) => {
      demo1.tablePage.pageSize = size
      searchEvent()
    }

    const handleCurrentChange = (currentPage: number) => {
      demo1.tablePage.currentPage = currentPage
      findList()
    }

    const visibleMethod = ({ data }: any) => {
      return data.flag1 === 'Y'
    }

    const roleSearchEvent = (params: any, value: any) => {
      roleList.value = restaurants.filter(option => option.value.toUpperCase().indexOf((value || '').toUpperCase()) !== -1)
    }

    nextTick(() => {
      // 将表格和工具栏进行关联
      const $table = xTable.value
      const $toolbar = xToolbar.value
      $table.connect($toolbar)
    })

    findList()
    findSexList()
    findRegionList()

    return {
      xToolbar,
      xTable,
      demo1,
      roleList,
      insertEvent,
      saveEvent,
      vaildEvent,
      dropdownMenuEvent,
      searchEvent,
      handleSizeChange,
      handleCurrentChange,
      visibleMethod,
      roleSearchEvent,
      demoCodes: [
        `
        <vxe-form :data="demo1.formData" title-width="120" title-align="right" @submit="searchEvent" @reset="searchEvent">
          <vxe-form-item field="name" title="AInput" span="8" :title-prefix="{ message: '帮助信息！！！', icon: 'fa fa-exclamation-circle' }" :item-render="{name: 'AInput'}"></vxe-form-item>
          <vxe-form-item field="role" title="AAutoComplete" span="8" :item-render="{name: 'AAutoComplete', props: {options: roleList}, events: {search: roleSearchEvent}}"></vxe-form-item>
          <vxe-form-item field="age" title="AInputNumber" span="8" :item-render="{name: 'AInputNumber'}"></vxe-form-item>
          <vxe-form-item field="sex" title="ASelect" span="8" :item-render="{name: 'ASelect', options: demo1.sexList}"></vxe-form-item>
          <vxe-form-item field="region" title="ACascader" span="8" :item-render="{name: 'ACascader', props: {options: demo1.regionList}}"></vxe-form-item>
          <vxe-form-item field="date" title="ADatePicker" span="8" :item-render="{name: 'ADatePicker', props: {type: 'date', format: 'YYYY/MM/DD'}}"></vxe-form-item>
          <vxe-form-item field="flag" title="ASwitch" span="8" folding :item-render="{name: 'ASwitch'}"></vxe-form-item>
          <vxe-form-item field="rate" title="ARate" span="8" folding :item-render="{name: 'ARate'}"></vxe-form-item>
          <vxe-form-item field="flag1" title="ARadio" span="8" folding :item-render="{name: 'ARadio', options: [{label: '是', value: 'Y'}, {label: '否', value: 'N'}]}"></vxe-form-item>
          <vxe-form-item field="checkedList" title="ACheckbox" span="8" folding :item-render="{name: 'ACheckbox', options: [{label: '北京', value: 'beijing'}, {label: '深圳', value: 'shenzhen'}, {label: '上海', value: 'shanghai'}]}" :visible-method="visibleMethod"></vxe-form-item>
          <vxe-form-item span="24" align="center" collapse-node :item-render="{name: 'AButtons', children: [{ content: '查询', props: {type: 'primary', htmlType: 'submit'} }, { content: '重置', props: {htmlType: 'reset'} }]}"></vxe-form-item>
        </vxe-form>

        <vxe-toolbar ref="xToolbar" export print custom>
          <template #buttons>
            <a-button @click="insertEvent">新增</a-button>
            <a-button @click="saveEvent">保存</a-button>
            <a-button @click="vaildEvent">校验</a-button>
            <a-dropdown :trigger="['click']">
              <a-button>操作</a-button>
              <template #overlay>
                <a-menu>
                  <a-menu-item key="0">
                    <a @click="dropdownMenuEvent('remove')">删除选中</a>
                  </a-menu-item>
                  <a-menu-item key="1">
                    <a @click="dropdownMenuEvent('export')">导出数据</a>
                  </a-menu-item>
                  <a-menu-divider />
                </a-menu>
              </template>
            </a-dropdown>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          resizable
          show-overflow
          keep-source
          highlight-hover-row
          ref="xTable"
          height="460"
          :export-config="{}"
          :print-config="{}"
          :loading="demo1.loading"
          :data="demo1.tableData"
          :edit-rules="demo1.validRules"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
          <vxe-column type="checkbox" width="60" fixed="left"></vxe-column>
          <vxe-column type="seq" title="Number" width="80" fixed="left"></vxe-column>
          <vxe-column field="name" title="AInput" min-width="140" fixed="left" :edit-render="{name: 'AInput'}"></vxe-column>
          <vxe-column field="role" title="AAutoComplete" width="160" :edit-render="{name: 'AAutoComplete', props: {options: roleList}, events: {search: roleSearchEvent}}"></vxe-column>
          <vxe-column field="age" title="AInputNumber" width="160" :edit-render="{name: 'AInputNumber', props: {max: 35, min: 18}}"></vxe-column>
          <vxe-column field="sex" title="ASelect" width="140" :edit-render="{name: 'ASelect', options: demo1.sexList}"></vxe-column>
          <vxe-column field="sex1" title="ASelect multiple" width="180" :edit-render="{name: 'ASelect', options: demo1.sexList, props: {mode: 'multiple'}}"></vxe-column>
          <vxe-column field="region" title="ACascader" width="200" :edit-render="{name: 'ACascader', props: {options: demo1.regionList}}"></vxe-column>
          <vxe-column field="date1" title="ADatePicker" width="200" :edit-render="{name: 'ADatePicker', props: {type: 'date', format: 'YYYY/MM/DD'}}"></vxe-column>
          <vxe-column field="flag" title="ASwitch" width="100" :cell-render="{name: 'ASwitch'}"></vxe-column>
          <vxe-column field="rate" title="ARate" width="200" fixed="right" :cell-render="{name: 'ARate'}"></vxe-column>
        </vxe-table>

        <a-pagination
          @showSizeChange="handleSizeChange"
          @change="handleCurrentChange"
          v-model="demo1.tablePage.currentPage"
          :page-size-options="['5', '10', '15', '20', '50', '100', '150', '200']"
          :page-size="demo1.tablePage.pageSize"
          :total="demo1.tablePage.totalResult"
          showSizeChanger
          showQuickJumper>
        </a-pagination>
        `,
        `
        import { defineComponent, reactive, ref, nextTick } from 'vue'
        import { Modal, message } from 'ant-design-vue'
        import { VxeTableInstance, VxeToolbarInstance } from 'vxe-table'

        export default defineComponent({
          setup () {
            const xToolbar = ref({} as VxeToolbarInstance)
            const xTable = ref({} as VxeTableInstance)

            const restaurants = [
              { value: 'Designer' },
              { value: 'Develop' },
              { value: 'Test' },
              { value: 'PM' }
            ]

            const roleList = ref([] as any[])

            const demo1 = reactive({
              loading: false,
              tableData: [] as any[],
              validRules: {
                name: [
                  { required: true, message: 'app.body.valid.rName' },
                  { min: 3, max: 50, message: '名称长度在 3 到 50 个字符' }
                ],
                sex: [
                  { required: true, message: '性别必须填写' }
                ]
              },
              sexList: [] as any[],
              regionList: [] as any[],
              sexGroupList: [
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
              ],
              tablePage: {
                currentPage: 1,
                pageSize: 10,
                totalResult: 0
              },
              formData: {
                name: '',
                role: '',
                sex: null,
                age: null,
                region: [],
                date: null,
                flag: false,
                rate: 0,
                flag1: '',
                checkedList: []
              }
            })

            const findList = () => {
              demo1.loading = true
              setTimeout(() => {
                const list = [
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
                demo1.tableData = list
                demo1.tablePage.totalResult = 146
                demo1.loading = false
              }, 500)
            }

            const findSexList = () => {
              const sexList = [
                { label: '', value: '' },
                { label: '男', value: '1' },
                { label: '女', value: '0' }
              ]
              demo1.sexList = sexList
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
              demo1.regionList = regionList
            }

            const searchEvent = () => {
              demo1.tablePage.currentPage = 1
              findList()
            }

            const insertEvent = async () => {
              const $table = xTable.value
              const record = {
                role: '',
                age: 18,
                sex1: [],
                region: [],
                flag: false,
                rate: 2
              }
              const { row: newRow } = await $table.insert(record)
              $table.setActiveRow(newRow)
            }

            const saveEvent = () => {
              const $table = xTable.value
              const { insertRecords, removeRecords, updateRecords } = $table.getRecordset()
              if (insertRecords.length || removeRecords.length || updateRecords.length) {
                Modal.success({
                  content: '保存成功！'
                })
                searchEvent()
              } else {
                Modal.warn({
                  content: '数据未改动！'
                })
              }
            }

            const vaildEvent = () => {
              const $table = xTable.value
              $table.validate((errMap) => {
                if (errMap) {
                  message.error({
                    content: '校验不通过！'
                  })
                } else {
                  message.success({
                    content: '校验成功！'
                  })
                }
              })
            }

            const dropdownMenuEvent = (name: string) => {
              const $table = xTable.value
              switch (name) {
                case 'remove': {
                  const selectRecords = $table.getCheckboxRecords()
                  if (selectRecords.length) {
                    $table.removeCheckboxRow()
                  } else {
                    message.warning({
                      content: '请至少选择一条数据！'
                    })
                  }
                  break
                }
                case 'export': {
                  $table.exportData()
                  break
                }
              }
            }

            const handleSizeChange = (current: number, size: number) => {
              demo1.tablePage.pageSize = size
              searchEvent()
            }

            const handleCurrentChange = (currentPage: number) => {
              demo1.tablePage.currentPage = currentPage
              findList()
            }

            const visibleMethod = ({ data }: any) => {
              return data.flag1 === 'Y'
            }

            const roleSearchEvent = (params: any, value: any) => {
              roleList.value = restaurants.filter(option => option.value.toUpperCase().indexOf((value || '').toUpperCase()) !== -1)
            }

            nextTick(() => {
              // 将表格和工具栏进行关联
              const $table = xTable.value
              const $toolbar = xToolbar.value
              $table.connect($toolbar)
            })

            findList()
            findSexList()
            findRegionList()

            return {
              xToolbar,
              xTable,
              demo1,
              roleList,
              insertEvent,
              saveEvent,
              vaildEvent,
              dropdownMenuEvent,
              searchEvent,
              handleSizeChange,
              handleCurrentChange,
              visibleMethod,
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
