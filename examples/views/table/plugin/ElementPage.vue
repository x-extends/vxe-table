<template>
  <div>
    <p class="tip">
      与 <a class="link" href="https://github.com/element-plus/element-plus">element-plus</a> 组合渲染 + 使用分页<br>
      <span class="red">（注：该示例仅供参考，具体逻辑请自行实现）</span>
    </p>

    <vxe-form :data="demo1.formData" title-width="120" title-align="right" @submit="searchEvent" @reset="searchEvent">
      <vxe-form-item field="name" title="ElInput" span="8" :title-prefix="{ message: '帮助信息！！！', icon: 'fa fa-exclamation-circle' }" :item-render="{name: 'ElInput'}"></vxe-form-item>
      <vxe-form-item field="role" title="ElAutocomplete" span="8" :item-render="{name: 'ElAutocomplete', props: {fetchSuggestions: roleSearchEvent}}"></vxe-form-item>
      <vxe-form-item field="age" title="ElInputNumber" span="8" :item-render="{name: 'ElInputNumber'}"></vxe-form-item>
      <vxe-form-item field="sex" title="ElSelect" span="8" :item-render="{name: 'ElSelect', options: demo1.sexList}"></vxe-form-item>
      <vxe-form-item field="region" title="ElCascader" span="8" :item-render="{name: 'ElCascader', props: {options: demo1.regionList}}"></vxe-form-item>
      <vxe-form-item field="date" title="ElDatePicker" span="8" :item-render="{name: 'ElDatePicker', props: {type: 'date', format: 'YYYY/MM/DD'}}"></vxe-form-item>
      <vxe-form-item field="date5" title="ElTimeSelect" span="8" folding :item-render="{name: 'ElTimeSelect', props: {pickerOptions: {start: '08:30', step: '00:15', end: '18:30'}}}"></vxe-form-item>
      <vxe-form-item field="flag" title="ElSwitch" span="8" folding :item-render="{name: 'ElSwitch'}"></vxe-form-item>
      <vxe-form-item field="rate1" title="ElSlider" span="8" folding :item-render="{name: 'ElSlider'}"></vxe-form-item>
      <vxe-form-item field="rate" title="ElRate" span="8" folding :item-render="{name: 'ElRate'}"></vxe-form-item>
      <vxe-form-item field="flag1" title="ElRadio" span="8" folding :item-render="{name: 'ElRadio', options: [{label: '是', value: 'Y'}, {label: '否', value: 'N'}]}"></vxe-form-item>
      <vxe-form-item field="checkedList" title="ElCheckbox" span="8" folding :visible-method="visibleMethod" :item-render="{name: 'ElCheckbox', options: [{label: '北京', value: 'beijing'}, {label: '深圳', value: 'shenzhen'}, {label: '上海', value: 'shanghai'}]}"></vxe-form-item>
      <vxe-form-item span="24" align="center" collapse-node :item-render="{name: 'ElButtons', children: [{ content: '查询', props: {type: 'primary', nativeType: 'submit'} }, { content: '重置', props: {nativeType: 'reset'} }]}"></vxe-form-item>
    </vxe-form>

    <vxe-toolbar ref="xToolbar" export print custom>
      <template #buttons>
        <el-button @click="insertEvent">新增</el-button>
        <el-button @click="saveEvent">保存</el-button>
        <el-button @click="vaildEvent">校验</el-button>
        <el-dropdown @command="dropdownMenuEvent">
          <el-button>操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="remove">删除选中</el-dropdown-item>
              <el-dropdown-item command="export">导出数据</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
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
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      @edit-actived="editActivedEvent"
      @edit-closed="editClosedEvent">
      <vxe-table-column type="checkbox" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column type="seq" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column field="name" title="ElInput" min-width="140" fixed="left" :edit-render="{name: 'ElInput'}"></vxe-table-column>
      <vxe-table-column field="role" title="ElAutocomplete" width="160" :edit-render="{name: 'ElAutocomplete', props: {fetchSuggestions: roleSearchEvent}}"></vxe-table-column>
      <vxe-table-column field="age" title="ElInputNumber" width="160" :edit-render="{name: 'ElInputNumber', props: {max: 35, min: 18}}"></vxe-table-column>
      <vxe-table-column field="sex" title="ElSelect" width="140" :edit-render="{name: 'ElSelect', options: demo1.sexList}"></vxe-table-column>
      <vxe-table-column field="sexList" title="ElSelect multiple" width="180" :edit-render="{name: 'ElSelect', options: demo1.sexList, props: {multiple: true}}"></vxe-table-column>
      <vxe-table-column field="state" title="ElSelect remote" width="140" :edit-render="{name: 'ElSelect', options: demo1.stateOptions, props: {remote: true, filterable: true, loading: demo1.stateloading, remoteMethod: remoteStateMethod}}"></vxe-table-column>
      <vxe-table-column field="region" title="ElCascader" width="200" :edit-render="{name: 'ElCascader', props: {options: demo1.regionList}}"></vxe-table-column>
      <vxe-table-column field="date" title="ElDatePicker" width="200" :edit-render="{name: 'ElDatePicker', props: {type: 'date', format: 'YYYY/MM/DD'}}"></vxe-table-column>
      <vxe-table-column field="date1" title="ElDatePicker" width="220" :edit-render="{name: 'ElDatePicker', props: {type: 'datetime', format: 'YYYY-MM-DD HH:mm:ss'}}"></vxe-table-column>
      <vxe-table-column field="date2" title="ElTimeSelect" width="200" :edit-render="{name: 'ElTimeSelect', props: {pickerOptions: {start: '08:30', step: '00:15', end: '18:30'}}}"></vxe-table-column>
      <vxe-table-column field="flag" title="ElSwitch" width="100" :cell-render="{name: 'ElSwitch'}"></vxe-table-column>
      <vxe-table-column field="rate1" title="ElSlider" width="200" :cell-render="{name: 'ElSlider'}"></vxe-table-column>
      <vxe-table-column field="rate" title="ElRate" width="200" fixed="right" :cell-render="{name: 'ElRate'}"></vxe-table-column>
    </vxe-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="demo1.tablePage.currentPage"
      :page-sizes="[5, 10, 15, 20, 50, 100, 150, 200]"
      :page-size="demo1.tablePage.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="demo1.tablePage.totalResult">
    </el-pagination>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, nextTick } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { VxeTableInstance, VxeTableEvents, VxeToolbarInstance } from '../../../../types/index'

export default defineComponent({
  setup () {
    const xToolbar = ref({} as VxeToolbarInstance)
    const xTable = ref({} as VxeTableInstance)

    const restaurants = [
      { value: 'Designer', name: 'Designer' },
      { value: 'Develop', name: 'Develop' },
      { value: 'Test', name: 'Test' },
      { value: 'PM', name: 'PM' }
    ]

    const roleList = ref([] as any[])

    const stateList = [
      { value: 'afg89', label: 'afg89' },
      { value: 'gh17', label: 'gh17' },
      { value: 'ertg5', label: 'ertg5' },
      { value: 'wex4', label: 'wex4' },
      { value: 'ewr23', label: 'ewr23' }
    ]

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
      stateOptions: [] as any[],
      stateloading: false,
      tablePage: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0
      },
      formData: {
        name: '',
        role: '',
        sex: null,
        age: 0,
        region: [],
        date: null,
        date5: null,
        flag: false,
        slider: 0,
        rate: 0,
        flag1: '',
        checkedList: []
      }
    })

    let tempStateList: any[] = []

    // 模拟后台查当前页出远程下拉值
    const updateStateList = () => {
      setTimeout(() => {
        const defaultStateList: any[] = []
        demo1.tableData.forEach(row => {
          if (row.state && !defaultStateList.some(item => item.value === row.state)) {
            defaultStateList.push({
              label: row.state.replace('value', 'label'),
              value: row.state
            })
          }
        })
        tempStateList = defaultStateList
        demo1.stateOptions = defaultStateList
      }, 100)
    }

    const findList = () => {
      demo1.loading = true
      setTimeout(() => {
        const list = [
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
        demo1.tableData = list
        demo1.tablePage.totalResult = 146
        demo1.loading = false
        updateStateList()
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

    const remoteStateMethod = (query: string) => {
      if (query) {
        demo1.stateloading = true
        setTimeout(() => {
          demo1.stateloading = false
          demo1.stateOptions = stateList.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1)
        }, 200)
      } else {
        demo1.stateOptions = []
      }
    }

    const editActivedEvent: VxeTableEvents.EditActived = ({ row }) => {
      // 当激活编辑时，重新更新远程下拉值
      if (row.state) {
        if (row._stateOptions) {
          demo1.stateOptions = row._stateOptions
        } else {
          // 如果是第一次点击则使用默认的列表
          demo1.stateOptions = tempStateList
        }
      } else {
        demo1.stateOptions = []
      }
    }

    const editClosedEvent: VxeTableEvents.EditClosed = ({ row }) => {
      // 当激活编辑时，记录当前远程下拉值
      row._stateOptions = demo1.stateOptions
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
        ElMessageBox.alert('保存成功！')
        searchEvent()
      } else {
        ElMessageBox.alert('数据未改动！')
      }
    }

    const vaildEvent = () => {
      const $table = xTable.value
      $table.validate((errMap) => {
        if (errMap) {
          ElMessage.error('校验不通过！')
        } else {
          ElMessage.success('校验成功！')
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
            ElMessageBox.alert('请至少选择一条数据！')
          }
          break
        }
        case 'export': {
          $table.exportData()
          break
        }
      }
    }

    const handleSizeChange = (pageSize: number) => {
      demo1.tablePage.pageSize = pageSize
      searchEvent()
    }

    const handleCurrentChange = (currentPage: number) => {
      demo1.tablePage.currentPage = currentPage
      findList()
    }

    const visibleMethod = ({ data }: any) => {
      return data.flag1 === 'Y'
    }

    const roleSearchEvent = (queryString: any, cb: (params: any) => any) => {
      const results = queryString ? restaurants.filter(item => (item.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)) : restaurants
      setTimeout(() => {
        cb(results)
      }, 500 * Math.random())
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
      remoteStateMethod,
      dropdownMenuEvent,
      editActivedEvent,
      editClosedEvent,
      searchEvent,
      handleSizeChange,
      handleCurrentChange,
      visibleMethod,
      roleSearchEvent,
      demoCodes: [
        `
        <vxe-form :data="demo1.formData" title-width="120" title-align="right" @submit="searchEvent" @reset="searchEvent">
          <vxe-form-item field="name" title="ElInput" span="8" :title-prefix="{ message: '帮助信息！！！', icon: 'fa fa-exclamation-circle' }" :item-render="{name: 'ElInput'}"></vxe-form-item>
          <vxe-form-item field="role" title="ElAutocomplete" span="8" :item-render="{name: 'ElAutocomplete', props: {fetchSuggestions: roleSearchEvent}}"></vxe-form-item>
          <vxe-form-item field="age" title="ElInputNumber" span="8" :item-render="{name: 'ElInputNumber'}"></vxe-form-item>
          <vxe-form-item field="sex" title="ElSelect" span="8" :item-render="{name: 'ElSelect', options: demo1.sexList}"></vxe-form-item>
          <vxe-form-item field="region" title="ElCascader" span="8" :item-render="{name: 'ElCascader', props: {options: demo1.regionList}}"></vxe-form-item>
          <vxe-form-item field="date" title="ElDatePicker" span="8" :item-render="{name: 'ElDatePicker', props: {type: 'date', format: 'YYYY/MM/DD'}}"></vxe-form-item>
          <vxe-form-item field="date5" title="ElTimeSelect" span="8" folding :item-render="{name: 'ElTimeSelect', props: {pickerOptions: {start: '08:30', step: '00:15', end: '18:30'}}}"></vxe-form-item>
          <vxe-form-item field="flag" title="ElSwitch" span="8" folding :item-render="{name: 'ElSwitch'}"></vxe-form-item>
          <vxe-form-item field="rate1" title="ElSlider" span="8" folding :item-render="{name: 'ElSlider'}"></vxe-form-item>
          <vxe-form-item field="rate" title="ElRate" span="8" folding :item-render="{name: 'ElRate'}"></vxe-form-item>
          <vxe-form-item field="flag1" title="ElRadio" span="8" folding :item-render="{name: 'ElRadio', options: [{label: '是', value: 'Y'}, {label: '否', value: 'N'}]}"></vxe-form-item>
          <vxe-form-item field="checkedList" title="ElCheckbox" span="8" folding :visible-method="visibleMethod" :item-render="{name: 'ElCheckbox', options: [{label: '北京', value: 'beijing'}, {label: '深圳', value: 'shenzhen'}, {label: '上海', value: 'shanghai'}]}"></vxe-form-item>
          <vxe-form-item span="24" align="center" collapse-node :item-render="{name: 'ElButtons', children: [{ content: '查询', props: {type: 'primary', nativeType: 'submit'} }, { content: '重置', props: {nativeType: 'reset'} }]}"></vxe-form-item>
        </vxe-form>

        <vxe-toolbar ref="xToolbar" export print custom>
          <template #buttons>
            <el-button @click="insertEvent">新增</el-button>
            <el-button @click="saveEvent">保存</el-button>
            <el-button @click="vaildEvent">校验</el-button>
            <el-dropdown @command="dropdownMenuEvent">
              <el-button>操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="remove">删除选中</el-dropdown-item>
                  <el-dropdown-item command="export">导出数据</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
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
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          @edit-actived="editActivedEvent"
          @edit-closed="editClosedEvent">
          <vxe-table-column type="checkbox" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column type="seq" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column field="name" title="ElInput" min-width="140" fixed="left" :edit-render="{name: 'ElInput'}"></vxe-table-column>
          <vxe-table-column field="role" title="ElAutocomplete" width="160" :edit-render="{name: 'ElAutocomplete', props: {fetchSuggestions: roleSearchEvent}}"></vxe-table-column>
          <vxe-table-column field="age" title="ElInputNumber" width="160" :edit-render="{name: 'ElInputNumber', props: {max: 35, min: 18}}"></vxe-table-column>
          <vxe-table-column field="sex" title="ElSelect" width="140" :edit-render="{name: 'ElSelect', options: demo1.sexList}"></vxe-table-column>
          <vxe-table-column field="sexList" title="ElSelect multiple" width="180" :edit-render="{name: 'ElSelect', options: demo1.sexList, props: {multiple: true}}"></vxe-table-column>
          <vxe-table-column field="state" title="ElSelect remote" width="140" :edit-render="{name: 'ElSelect', options: demo1.stateOptions, props: {remote: true, filterable: true, loading: demo1.stateloading, remoteMethod: remoteStateMethod}}"></vxe-table-column>
          <vxe-table-column field="region" title="ElCascader" width="200" :edit-render="{name: 'ElCascader', props: {options: demo1.regionList}}"></vxe-table-column>
          <vxe-table-column field="date" title="ElDatePicker" width="200" :edit-render="{name: 'ElDatePicker', props: {type: 'date', format: 'YYYY/MM/DD'}}"></vxe-table-column>
          <vxe-table-column field="date1" title="ElDatePicker" width="220" :edit-render="{name: 'ElDatePicker', props: {type: 'datetime', format: 'YYYY-MM-DD HH:mm:ss'}}"></vxe-table-column>
          <vxe-table-column field="date2" title="ElTimeSelect" width="200" :edit-render="{name: 'ElTimeSelect', props: {pickerOptions: {start: '08:30', step: '00:15', end: '18:30'}}}"></vxe-table-column>
          <vxe-table-column field="flag" title="ElSwitch" width="100" :cell-render="{name: 'ElSwitch'}"></vxe-table-column>
          <vxe-table-column field="rate1" title="ElSlider" width="200" :cell-render="{name: 'ElSlider'}"></vxe-table-column>
          <vxe-table-column field="rate" title="ElRate" width="200" fixed="right" :cell-render="{name: 'ElRate'}"></vxe-table-column>
        </vxe-table>

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="demo1.tablePage.currentPage"
          :page-sizes="[5, 10, 15, 20, 50, 100, 150, 200]"
          :page-size="demo1.tablePage.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="demo1.tablePage.totalResult">
        </el-pagination>
        `,
        `
        import { defineComponent, reactive, ref, nextTick } from 'vue'
        import { ElMessageBox, ElMessage } from 'element-plus'
        import { VxeTableInstance, VxeTableEvents, VxeToolbarInstance } from 'vxe-table'

        export default defineComponent({
          setup () {
            const xToolbar = ref({} as VxeToolbarInstance)
            const xTable = ref({} as VxeTableInstance)

            const restaurants = [
              { value: 'Designer', name: 'Designer' },
              { value: 'Develop', name: 'Develop' },
              { value: 'Test', name: 'Test' },
              { value: 'PM', name: 'PM' }
            ]

            const roleList = ref([] as any[])

            const stateList = [
              { value: 'afg89', label: 'afg89' },
              { value: 'gh17', label: 'gh17' },
              { value: 'ertg5', label: 'ertg5' },
              { value: 'wex4', label: 'wex4' },
              { value: 'ewr23', label: 'ewr23' }
            ]

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
              stateOptions: [] as any[],
              stateloading: false,
              tablePage: {
                currentPage: 1,
                pageSize: 10,
                totalResult: 0
              },
              formData: {
                name: '',
                role: '',
                sex: null,
                age: 0,
                region: [],
                date: null,
                date5: null,
                flag: false,
                slider: 0,
                rate: 0,
                flag1: '',
                checkedList: []
              }
            })

            let tempStateList: any[] = []

            // 模拟后台查当前页出远程下拉值
            const updateStateList = () => {
              setTimeout(() => {
                const defaultStateList: any[] = []
                demo1.tableData.forEach(row => {
                  if (row.state && !defaultStateList.some(item => item.value === row.state)) {
                    defaultStateList.push({
                      label: row.state.replace('value', 'label'),
                      value: row.state
                    })
                  }
                })
                tempStateList = defaultStateList
                demo1.stateOptions = defaultStateList
              }, 100)
            }

            const findList = () => {
              demo1.loading = true
              setTimeout(() => {
                const list = [
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
                demo1.tableData = list
                demo1.tablePage.totalResult = 146
                demo1.loading = false
                updateStateList()
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

            const remoteStateMethod = (query: string) => {
              if (query) {
                demo1.stateloading = true
                setTimeout(() => {
                  demo1.stateloading = false
                  demo1.stateOptions = stateList.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1)
                }, 200)
              } else {
                demo1.stateOptions = []
              }
            }

            const editActivedEvent: VxeTableEvents.EditActived = ({ row }) => {
              // 当激活编辑时，重新更新远程下拉值
              if (row.state) {
                if (row._stateOptions) {
                  demo1.stateOptions = row._stateOptions
                } else {
                  // 如果是第一次点击则使用默认的列表
                  demo1.stateOptions = tempStateList
                }
              } else {
                demo1.stateOptions = []
              }
            }

            const editClosedEvent: VxeTableEvents.EditClosed = ({ row }) => {
              // 当激活编辑时，记录当前远程下拉值
              row._stateOptions = demo1.stateOptions
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
                ElMessageBox.alert('保存成功！')
                searchEvent()
              } else {
                ElMessageBox.alert('数据未改动！')
              }
            }

            const vaildEvent = () => {
              const $table = xTable.value
              $table.validate((errMap) => {
                if (errMap) {
                  ElMessage.error('校验不通过！')
                } else {
                  ElMessage.success('校验成功！')
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
                    ElMessageBox.alert('请至少选择一条数据！')
                  }
                  break
                }
                case 'export': {
                  $table.exportData()
                  break
                }
              }
            }

            const handleSizeChange = (pageSize: number) => {
              demo1.tablePage.pageSize = pageSize
              searchEvent()
            }

            const handleCurrentChange = (currentPage: number) => {
              demo1.tablePage.currentPage = currentPage
              findList()
            }

            const visibleMethod = ({ data }: any) => {
              return data.flag1 === 'Y'
            }

            const roleSearchEvent = (queryString: any, cb: (params: any) => any) => {
              const results = queryString ? restaurants.filter(item => (item.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)) : restaurants
              setTimeout(() => {
                cb(results)
              }, 500 * Math.random())
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
              remoteStateMethod,
              dropdownMenuEvent,
              editActivedEvent,
              editClosedEvent,
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
