<template>
  <div>
    <p class="tip">
      与 <a class="link" href="https://github.com/ElemeFE/element">element-ui</a> 组合渲染 + 使用分页<br>
      <span class="red">（注：该示例仅供参考，具体逻辑请自行实现）</span>
    </p>

    <vxe-form :data="formData" title-width="120" title-align="right" @submit="searchEvent" @reset="searchEvent">
      <vxe-form-item field="name" title="ElInput" span="8" :title-prefix="{ message: '帮助信息！！！', icon: 'fa fa-exclamation-circle' }" :item-render="{name: 'ElInput'}"></vxe-form-item>
      <vxe-form-item field="role" title="ElAutocomplete" span="8" :item-render="{name: 'ElAutocomplete', props: {fetchSuggestions: roleFetchSuggestions}}"></vxe-form-item>
      <vxe-form-item field="age" title="ElInputNumber" span="8" :item-render="{name: 'ElInputNumber'}"></vxe-form-item>
      <vxe-form-item field="sex" title="ElSelect" span="8" :item-render="{name: 'ElSelect', options: sexList}"></vxe-form-item>
      <vxe-form-item field="region" title="ElCascader" span="8" :item-render="{name: 'ElCascader', props: {options: regionList}}"></vxe-form-item>
      <vxe-form-item field="date" title="ElDatePicker" span="8" :item-render="{name: 'ElDatePicker', props: {type: 'date', format: 'yyyy/MM/dd'}}"></vxe-form-item>
      <vxe-form-item field="date5" title="ElTimeSelect" span="8" folding :item-render="{name: 'ElTimeSelect', props: {pickerOptions: {start: '08:30', step: '00:15', end: '18:30'}}}"></vxe-form-item>
      <vxe-form-item field="flag" title="ElSwitch" span="8" folding :item-render="{name: 'ElSwitch'}"></vxe-form-item>
      <vxe-form-item field="slider" title="ElSlider" span="8" folding :item-render="{name: 'ElSlider'}"></vxe-form-item>
      <vxe-form-item field="rate" title="ElRate" span="8" folding :item-render="{name: 'ElRate'}"></vxe-form-item>
      <vxe-form-item field="flag1" title="ElRadio" span="8" folding :item-render="{name: 'ElRadio', options: [{label: '是', value: 'Y'}, {label: '否', value: 'N'}]}"></vxe-form-item>
      <vxe-form-item field="checkedList" title="ElCheckbox" span="8" folding :visible-method="visibleMethod" :item-render="{name: 'ElCheckbox', options: [{label: '北京', value: 'beijing'}, {label: '深圳', value: 'shenzhen'}, {label: '上海', value: 'shanghai'}]}"></vxe-form-item>
      <vxe-form-item span="24" align="center" collapse-node :item-render="{name: 'ElButtons', children: [{ content: '查询', props: {type: 'primary', nativeType: 'submit'} }, { content: '重置', props: {nativeType: 'reset'} }]}"></vxe-form-item>
    </vxe-form>

    <vxe-toolbar export print custom>
      <template #buttons>
        <el-button @click="insertEvent">新增</el-button>
        <el-button @click="saveEvent">保存</el-button>
        <el-button @click="vaildEvent">校验</el-button>
        <el-dropdown @command="dropdownMenuEvent">
          <el-button>
            操作<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="remove">删除选中</el-dropdown-item>
            <el-dropdown-item command="export">导出数据</el-dropdown-item>
          </el-dropdown-menu>
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
      :loading="loading"
      :data="tableData"
      :edit-rules="validRules"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      @edit-actived="editActivedEvent"
      @edit-closed="editClosedEvent">
      <vxe-column type="checkbox" width="60" fixed="left"></vxe-column>
      <vxe-column type="seq" width="60" fixed="left"></vxe-column>
      <vxe-column field="name" title="ElInput" min-width="140" fixed="left" :edit-render="{name: 'ElInput'}"></vxe-column>
      <vxe-column field="role" title="ElAutocomplete" width="160" :edit-render="{name: 'ElAutocomplete', props: {fetchSuggestions: roleFetchSuggestions}}"></vxe-column>
      <vxe-column field="age" title="ElInputNumber" width="160" :edit-render="{name: 'ElInputNumber', props: {max: 35, min: 18}}"></vxe-column>
      <vxe-column field="sex" title="ElSelect" width="140" :edit-render="{name: 'ElSelect', options: sexList}"></vxe-column>
      <vxe-column field="sexList" title="ElSelect multiple" width="180" :edit-render="{name: 'ElSelect', options: sexList, props: {multiple: true}}"></vxe-column>
      <vxe-column field="state" title="ElSelect remote" width="140" :edit-render="{name: 'ElSelect', options: stateOptions, props: {remote: true, filterable: true, loading: stateloading, remoteMethod: remoteStateMethod}}"></vxe-column>
      <vxe-column field="region" title="ElCascader" width="200" :edit-render="{name: 'ElCascader', props: {options: regionList}}"></vxe-column>
      <vxe-column field="date" title="ElDatePicker" width="200" :edit-render="{name: 'ElDatePicker', props: {type: 'date', format: 'yyyy/MM/dd'}}"></vxe-column>
      <vxe-column field="date1" title="ElDatePicker" width="220" :edit-render="{name: 'ElDatePicker', props: {type: 'datetime', format: 'yyyy-MM-dd HH:mm:ss'}}"></vxe-column>
      <vxe-column field="date5" title="ElTimeSelect" width="200" :edit-render="{name: 'ElTimeSelect', props: {pickerOptions: {start: '08:30', step: '00:15', end: '18:30'}}}"></vxe-column>
      <vxe-column field="flag" title="ElSwitch" width="100" :cell-render="{name: 'ElSwitch'}"></vxe-column>
      <vxe-column field="slider" title="ElSlider" width="200" :cell-render="{name: 'ElSlider'}"></vxe-column>
      <vxe-column field="rate" title="ElRate" width="200" fixed="right" :cell-render="{name: 'ElRate'}"></vxe-column>
    </vxe-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="tablePage.currentPage"
      :page-sizes="[5, 10, 15, 20, 50, 100, 150, 200]"
      :page-size="tablePage.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tablePage.totalResult">
    </el-pagination>

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
      loading: false,
      tableData: [],
      validRules: {
        name: [
          { required: true, message: 'app.body.valid.rName' },
          { min: 3, max: 50, message: '名称长度在 3 到 50 个字符' }
        ],
        sex: [
          { required: true, message: '性别必须填写' }
        ]
      },
      sexList: [
        { label: '', value: '' },
        { label: '男', value: '1' },
        { label: '女', value: '0' }
      ],
      regionList: [
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
      ],
      stateList: [],
      stateOptions: [],
      stateloading: false,
      states: [
        'Alabama', 'Alaska', 'Arizona',
        'Arkansas', 'California', 'Colorado',
        'Connecticut', 'Delaware', 'Florida',
        'Georgia', 'Hawaii', 'Idaho', 'Illinois',
        'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota',
        'Mississippi', 'Missouri', 'Montana',
        'Nebraska', 'Nevada', 'New Hampshire',
        'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Ohio',
        'Oklahoma', 'Oregon', 'Pennsylvania',
        'Rhode Island', 'South Carolina',
        'South Dakota', 'Tennessee', 'Texas',
        'Utah', 'Vermont', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin',
        'Wyoming'
      ],
      restaurants: [
        { value: '前端', name: '前端' },
        { value: '后端', name: '后端' }
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
        date5: null,
        flag: false,
        slider: 0,
        rate: 0,
        flag1: '',
        checkedList: []
      },
      demoCodes: [
        `
        <vxe-form :data="formData" title-width="120" title-align="right" @submit="searchEvent" @reset="searchEvent">
          <vxe-form-item field="name" title="ElInput" span="8" :title-prefix="{ message: '帮助信息！！！', icon: 'fa fa-exclamation-circle' }" :item-render="{name: 'ElInput'}"></vxe-form-item>
          <vxe-form-item field="role" title="ElAutocomplete" span="8" :item-render="{name: 'ElAutocomplete', props: {fetchSuggestions: roleFetchSuggestions}}"></vxe-form-item>
          <vxe-form-item field="age" title="ElInputNumber" span="8" :item-render="{name: 'ElInputNumber'}"></vxe-form-item>
          <vxe-form-item field="sex" title="ElSelect" span="8" :item-render="{name: 'ElSelect', options: sexList}"></vxe-form-item>
          <vxe-form-item field="region" title="ElCascader" span="8" :item-render="{name: 'ElCascader', props: {options: regionList}}"></vxe-form-item>
          <vxe-form-item field="date" title="ElDatePicker" span="8" :item-render="{name: 'ElDatePicker', props: {type: 'date', format: 'yyyy/MM/dd'}}"></vxe-form-item>
          <vxe-form-item field="date5" title="ElTimeSelect" span="8" folding :item-render="{name: 'ElTimeSelect', props: {pickerOptions: {start: '08:30', step: '00:15', end: '18:30'}}}"></vxe-form-item>
          <vxe-form-item field="flag" title="ElSwitch" span="8" folding :item-render="{name: 'ElSwitch'}"></vxe-form-item>
          <vxe-form-item field="slider" title="ElSlider" span="8" folding :item-render="{name: 'ElSlider'}"></vxe-form-item>
          <vxe-form-item field="rate" title="ElRate" span="8" folding :item-render="{name: 'ElRate'}"></vxe-form-item>
          <vxe-form-item field="flag1" title="ElRadio" span="8" folding :item-render="{name: 'ElRadio', options: [{label: '是', value: 'Y'}, {label: '否', value: 'N'}]}"></vxe-form-item>
          <vxe-form-item field="checkedList" title="ElCheckbox" span="8" folding :visible-method="visibleMethod" :item-render="{name: 'ElCheckbox', options: [{label: '北京', value: 'beijing'}, {label: '深圳', value: 'shenzhen'}, {label: '上海', value: 'shanghai'}]}"></vxe-form-item>
          <vxe-form-item span="24" align="center" collapse-node :item-render="{name: 'ElButtons', children: [{ content: '查询', props: {type: 'primary', nativeType: 'submit'} }, { content: '重置', props: {nativeType: 'reset'} }]}"></vxe-form-item>
        </vxe-form>

        <vxe-toolbar export print custom>
          <template #buttons>
            <el-button @click="insertEvent">新增</el-button>
            <el-button @click="saveEvent">保存</el-button>
            <el-button @click="vaildEvent">校验</el-button>
            <el-dropdown @command="dropdownMenuEvent">
              <el-button>
                操作<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="remove">删除选中</el-dropdown-item>
                <el-dropdown-item command="export">导出数据</el-dropdown-item>
              </el-dropdown-menu>
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
          :loading="loading"
          :data="tableData"
          :edit-rules="validRules"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          @edit-actived="editActivedEvent"
          @edit-closed="editClosedEvent">
          <vxe-column type="checkbox" width="60" fixed="left"></vxe-column>
          <vxe-column type="seq" width="60" fixed="left"></vxe-column>
          <vxe-column field="name" title="ElInput" min-width="140" fixed="left" :edit-render="{name: 'ElInput'}"></vxe-column>
          <vxe-column field="role" title="ElAutocomplete" width="160" :edit-render="{name: 'ElAutocomplete', props: {fetchSuggestions: roleFetchSuggestions}}"></vxe-column>
          <vxe-column field="age" title="ElInputNumber" width="160" :edit-render="{name: 'ElInputNumber', props: {max: 35, min: 18}}"></vxe-column>
          <vxe-column field="sex" title="ElSelect" width="140" :edit-render="{name: 'ElSelect', options: sexList}"></vxe-column>
          <vxe-column field="sexList" title="ElSelect multiple" width="180" :edit-render="{name: 'ElSelect', options: sexList, props: {multiple: true}}"></vxe-column>
          <vxe-column field="state" title="ElSelect remote" width="140" :edit-render="{name: 'ElSelect', options: stateOptions, props: {remote: true, filterable: true, loading: stateloading, remoteMethod: remoteStateMethod}}"></vxe-column>
          <vxe-column field="region" title="ElCascader" width="200" :edit-render="{name: 'ElCascader', props: {options: regionList}}"></vxe-column>
          <vxe-column field="date" title="ElDatePicker" width="200" :edit-render="{name: 'ElDatePicker', props: {type: 'date', format: 'yyyy/MM/dd'}}"></vxe-column>
          <vxe-column field="date1" title="ElDatePicker" width="220" :edit-render="{name: 'ElDatePicker', props: {type: 'datetime', format: 'yyyy-MM-dd HH:mm:ss'}}"></vxe-column>
          <vxe-column field="date5" title="ElTimeSelect" width="200" :edit-render="{name: 'ElTimeSelect', props: {pickerOptions: {start: '08:30', step: '00:15', end: '18:30'}}}"></vxe-column>
          <vxe-column field="flag" title="ElSwitch" width="100" :cell-render="{name: 'ElSwitch'}"></vxe-column>
          <vxe-column field="slider" title="ElSlider" width="200" :cell-render="{name: 'ElSlider'}"></vxe-column>
          <vxe-column field="rate" title="ElRate" width="200" fixed="right" :cell-render="{name: 'ElRate'}"></vxe-column>
        </vxe-table>

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="tablePage.currentPage"
          :page-sizes="[5, 10, 15, 20, 50, 100, 150, 200]"
          :page-size="tablePage.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tablePage.totalResult">
        </el-pagination>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tableData: [],
              validRules: {
                name: [
                  { required: true, message: 'app.body.valid.rName' },
                  { min: 3, max: 50, message: '名称长度在 3 到 50 个字符' }
                ],
                sex: [
                  { required: true, message: '性别必须填写' }
                ]
              },
              sexList: [
                { label: '', value: '' },
                { label: '男', value: '1' },
                { label: '女', value: '0' }
              ],
              regionList: [
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
      ],
              stateList: [],
              stateOptions: [],
              stateloading: false,
              states: [
                'Alabama', 'Alaska', 'Arizona',
                'Arkansas', 'California', 'Colorado',
                'Connecticut', 'Delaware', 'Florida',
                'Georgia', 'Hawaii', 'Idaho', 'Illinois',
                'Indiana', 'Iowa', 'Kansas', 'Kentucky',
                'Louisiana', 'Maine', 'Maryland',
                'Massachusetts', 'Michigan', 'Minnesota',
                'Mississippi', 'Missouri', 'Montana',
                'Nebraska', 'Nevada', 'New Hampshire',
                'New Jersey', 'New Mexico', 'New York',
                'North Carolina', 'North Dakota', 'Ohio',
                'Oklahoma', 'Oregon', 'Pennsylvania',
                'Rhode Island', 'South Carolina',
                'South Dakota', 'Tennessee', 'Texas',
                'Utah', 'Vermont', 'Virginia',
                'Washington', 'West Virginia', 'Wisconsin',
                'Wyoming'
              ],
              restaurants: [
                { value: '前端', name: '前端' },
                { value: '后端', name: '后端' }
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
                date5: null,
                flag: false,
                slider: 0,
                rate: 0,
                flag1: '',
                checkedList: []
              }
            }
          },
          created () {
            this.stateList = this.states.map(item => {
              return { value: \`value:\${item}\`, label: \`label:\${item}\` }
            })
            this.findList()
          },
          methods: {
            findList () {
              this.loading = true
              setTimeout(() => {
                this.tableData = [
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
                this.tablePage.totalResult = 140
                this.loading = false
                this.updateStateList()
              }, 300)
            },
            remoteStateMethod (query) {
              if (query !== '') {
                this.stateloading = true
                setTimeout(() => {
                  this.stateloading = false
                  this.stateOptions = this.stateList.filter(item => {
                    return item.label.toLowerCase()
                      .indexOf(query.toLowerCase()) > -1
                  })
                }, 200)
              } else {
                this.stateOptions = []
              }
            },
            // 模拟后台查当前页出远程下拉值
            updateStateList () {
              setTimeout(() => {
                let defaultStateList = []
                this.tableData.forEach(row => {
                  if (row.state && !defaultStateList.some(item => item.value === row.state)) {
                    defaultStateList.push({
                      label: row.state.replace('value', 'label'),
                      value: row.state
                    })
                  }
                })
                this._defaultStateList = defaultStateList
                this.stateOptions = defaultStateList
              }, 100)
            },
            editActivedEvent ({ row }) {
              // 当激活编辑时，重新更新远程下拉值
              if (row.state) {
                if (row._stateOptions) {
                  this.stateOptions = row._stateOptions
                } else {
                  // 如果是第一次点击则使用默认的列表
                  this.stateOptions = this._defaultStateList
                }
              } else {
                this.stateOptions = []
              }
            },
            editClosedEvent ({ row }) {
              // 当激活编辑时，记录当前远程下拉值
              row._stateOptions = this.stateOptions
            },
            insertEvent () {
              let record = {
                role: '',
                age: 18,
                region: [],
                flag: false,
                rate: 2
              }
              this.$refs.xTable.insert(record).then(({ row }) => this.$refs.xTable.setActiveRow(row))
            },
            saveEvent () {
              let { insertRecords, removeRecords, updateRecords } = this.$refs.xTable.getRecordset()
              if (insertRecords.length || removeRecords.length || updateRecords.length) {
                this.$alert('保存成功！')
                this.searchEvent()
              } else {
                this.$alert('数据未改动！')
              }
            },
            async vaildEvent () {
              const $table = this.$refs.xTable
              const errMap = await $table.validate().catch(errMap => errMap)
              if (errMap) {
                this.$XModal.message({ status: 'error', message: '校验不通过！' })
              } else {
                this.$XModal.message({ status: 'success', message: '校验成功！' })
              }
            },
            dropdownMenuEvent (name) {
              switch (name) {
                case 'remove': {
                  let selectRecords = this.$refs.xTable.getCheckboxRecords()
                  if (selectRecords.length) {
                    this.$refs.xTable.removeCheckboxRow()
                  } else {
                    this.$alert('请至少选择一条数据！')
                  }
                  break
                }
                case 'export': {
                  this.$refs.xTable.exportData()
                  break
                }
              }
            },
            searchEvent () {
              this.tablePage.currentPage = 1
              this.findList()
            },
            handleSizeChange (pageSize) {
              this.tablePage.pageSize = pageSize
              this.searchEvent()
            },
            handleCurrentChange (currentPage) {
              this.tablePage.currentPage = currentPage
              this.findList()
            },
            visibleMethod ({ data }) {
              return data.flag1 === 'Y'
            },
            roleFetchSuggestions (queryString, cb) {
              var restaurants = this.restaurants
              var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
              clearTimeout(this.timeout)
              this.timeout = setTimeout(() => {
                cb(results)
              }, 3000 * Math.random())
            },
            createStateFilter (queryString) {
              return (state) => {
                return (state.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
              }
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.stateList = this.states.map(item => {
      return { value: `value:${item}`, label: `label:${item}` }
    })
    this.findList()
  },
  methods: {
    findList () {
      this.loading = true
      setTimeout(() => {
        this.tableData = [
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
        this.tablePage.totalResult = 140
        this.loading = false
        this.updateStateList()
      }, 300)
    },
    remoteStateMethod (query) {
      if (query !== '') {
        this.stateloading = true
        setTimeout(() => {
          this.stateloading = false
          this.stateOptions = this.stateList.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1
          })
        }, 200)
      } else {
        this.stateOptions = []
      }
    },
    // 模拟后台查当前页出远程下拉值
    updateStateList () {
      setTimeout(() => {
        const defaultStateList = []
        this.tableData.forEach(row => {
          if (row.state && !defaultStateList.some(item => item.value === row.state)) {
            defaultStateList.push({
              label: row.state.replace('value', 'label'),
              value: row.state
            })
          }
        })
        this._defaultStateList = defaultStateList
        this.stateOptions = defaultStateList
      }, 100)
    },
    editActivedEvent ({ row }) {
      // 当激活编辑时，重新更新远程下拉值
      if (row.state) {
        if (row._stateOptions) {
          this.stateOptions = row._stateOptions
        } else {
          // 如果是第一次点击则使用默认的列表
          this.stateOptions = this._defaultStateList
        }
      } else {
        this.stateOptions = []
      }
    },
    editClosedEvent ({ row }) {
      // 当激活编辑时，记录当前远程下拉值
      row._stateOptions = this.stateOptions
    },
    insertEvent () {
      const record = {
        role: '',
        age: 18,
        region: [],
        flag: false,
        rate: 2
      }
      this.$refs.xTable.insert(record).then(({ row }) => this.$refs.xTable.setActiveRow(row))
    },
    saveEvent () {
      const { insertRecords, removeRecords, updateRecords } = this.$refs.xTable.getRecordset()
      if (insertRecords.length || removeRecords.length || updateRecords.length) {
        this.$alert('保存成功！')
        this.searchEvent()
      } else {
        this.$alert('数据未改动！')
      }
    },
    async vaildEvent () {
      const $table = this.$refs.xTable
      const errMap = await $table.validate().catch(errMap => errMap)
      if (errMap) {
        this.$XModal.message({ status: 'error', message: '校验不通过！' })
      } else {
        this.$XModal.message({ status: 'success', message: '校验成功！' })
      }
    },
    dropdownMenuEvent (name) {
      switch (name) {
        case 'remove': {
          const selectRecords = this.$refs.xTable.getCheckboxRecords()
          if (selectRecords.length) {
            this.$refs.xTable.removeCheckboxRow()
          } else {
            this.$alert('请至少选择一条数据！')
          }
          break
        }
        case 'export': {
          this.$refs.xTable.exportData()
          break
        }
      }
    },
    searchEvent () {
      this.tablePage.currentPage = 1
      this.findList()
    },
    handleSizeChange (pageSize) {
      this.tablePage.pageSize = pageSize
      this.searchEvent()
    },
    handleCurrentChange (currentPage) {
      this.tablePage.currentPage = currentPage
      this.findList()
    },
    visibleMethod ({ data }) {
      return data.flag1 === 'Y'
    },
    roleFetchSuggestions (queryString, cb) {
      const restaurants = this.restaurants
      const results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilter (queryString) {
      return (state) => {
        return (state.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    }
  }
}
</script>
