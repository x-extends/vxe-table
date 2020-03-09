<template>
  <div>
    <p class="tip">与 <a class="link" href="https://www.npmjs.com/package/element-ui">element-ui</a> 组合渲染 + 使用分页</p>

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
      <vxe-form-item span="24" align="center" collapse-node :item-render="{name: 'ElButtons', children: [{ props: {type: 'primary', nativeType: 'submit', content: '查询'} }, { props: {nativeType: 'reset', content: '重置'} }]}"></vxe-form-item>
    </vxe-form>

    <vxe-toolbar export custom>
      <template v-slot:buttons>
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
      highlight-hover-row
      export-config
      ref="xTable"
      height="460"
      :loading="loading"
      :data="tableData"
      :edit-rules="validRules"
      :edit-config="{trigger: 'click', mode: 'row'}"
      @edit-actived="editActivedEvent"
      @edit-closed="editClosedEvent">
      <vxe-table-column type="checkbox" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column type="seq" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column field="name" title="ElInput" min-width="140" fixed="left" :edit-render="{name: 'ElInput'}"></vxe-table-column>
      <vxe-table-column field="role" title="ElAutocomplete" width="160" :edit-render="{name: 'ElAutocomplete', props: {fetchSuggestions: roleFetchSuggestions}}"></vxe-table-column>
      <vxe-table-column field="age" title="ElInputNumber" width="160" :edit-render="{name: 'ElInputNumber', props: {max: 35, min: 18}}"></vxe-table-column>
      <vxe-table-column field="sex" title="ElSelect" width="140" :edit-render="{name: 'ElSelect', options: sexList}"></vxe-table-column>
      <vxe-table-column field="sexList" title="ElSelect multiple" width="180" :edit-render="{name: 'ElSelect', options: sexList, props: {multiple: true}}"></vxe-table-column>
      <vxe-table-column field="state" title="ElSelect remote" width="140" :edit-render="{name: 'ElSelect', options: stateOptions, props: {remote: true, filterable: true, loading: stateloading, remoteMethod: remoteStateMethod}}"></vxe-table-column>
      <vxe-table-column field="region" title="ElCascader" width="200" :edit-render="{name: 'ElCascader', props: {options: regionList}}"></vxe-table-column>
      <vxe-table-column field="date" title="ElDatePicker" width="200" :edit-render="{name: 'ElDatePicker', props: {type: 'date', format: 'yyyy/MM/dd'}}"></vxe-table-column>
      <vxe-table-column field="date1" title="ElDatePicker" width="220" :edit-render="{name: 'ElDatePicker', props: {type: 'datetime', format: 'yyyy-MM-dd HH:mm:ss'}}"></vxe-table-column>
      <vxe-table-column field="date5" title="ElTimeSelect" width="200" :edit-render="{name: 'ElTimeSelect', props: {pickerOptions: {start: '08:30', step: '00:15', end: '18:30'}}}"></vxe-table-column>
      <vxe-table-column field="flag" title="ElSwitch" width="100" :edit-render="{name: 'ElSwitch', type: 'visible'}"></vxe-table-column>
      <vxe-table-column field="slider" title="ElSlider" width="200" :edit-render="{name: 'ElSlider', type: 'visible'}"></vxe-table-column>
      <vxe-table-column field="rate" title="ElRate" width="200" fixed="right" :edit-render="{name: 'ElRate', type: 'visible'}"></vxe-table-column>
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
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import XEAjax from 'xe-ajax'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      loading: false,
      tableData: [],
      validRules: {
        name: [
          { required: true, message: '名称必须填写' },
          { min: 3, max: 50, message: '名称长度在 3 到 50 个字符' }
        ],
        sex: [
          { required: true, message: '性别必须填写' }
        ]
      },
      sexList: [],
      regionList: [],
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
          <vxe-form-item span="24" align="center" collapse-node :item-render="{name: 'ElButtons', children: [{ props: {type: 'primary', nativeType: 'submit', content: '查询'} }, { props: {nativeType: 'reset', content: '重置'} }]}"></vxe-form-item>
        </vxe-form>

        <vxe-toolbar export custom>
          <template v-slot:buttons>
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
          highlight-hover-row
          export-config
          ref="xTable"
          height="460"
          :loading="loading"
          :data="tableData"
          :edit-rules="validRules"
          :edit-config="{trigger: 'click', mode: 'row'}"
          @edit-actived="editActivedEvent"
          @edit-closed="editClosedEvent">
          <vxe-table-column type="checkbox" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column type="seq" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column field="name" title="ElInput" min-width="140" fixed="left" :edit-render="{name: 'ElInput'}"></vxe-table-column>
          <vxe-table-column field="role" title="ElAutocomplete" width="160" :edit-render="{name: 'ElAutocomplete', props: {fetchSuggestions: roleFetchSuggestions}}"></vxe-table-column>
          <vxe-table-column field="age" title="ElInputNumber" width="160" :edit-render="{name: 'ElInputNumber', props: {max: 35, min: 18}}"></vxe-table-column>
          <vxe-table-column field="sex" title="ElSelect" width="140" :edit-render="{name: 'ElSelect', options: sexList}"></vxe-table-column>
          <vxe-table-column field="sexList" title="ElSelect multiple" width="180" :edit-render="{name: 'ElSelect', options: sexList, props: {multiple: true}}"></vxe-table-column>
          <vxe-table-column field="state" title="ElSelect remote" width="140" :edit-render="{name: 'ElSelect', options: stateOptions, props: {remote: true, filterable: true, loading: stateloading, remoteMethod: remoteStateMethod}}"></vxe-table-column>
          <vxe-table-column field="region" title="ElCascader" width="200" :edit-render="{name: 'ElCascader', props: {options: regionList}}"></vxe-table-column>
          <vxe-table-column field="date" title="ElDatePicker" width="200" :edit-render="{name: 'ElDatePicker', props: {type: 'date', format: 'yyyy/MM/dd'}}"></vxe-table-column>
          <vxe-table-column field="date1" title="ElDatePicker" width="220" :edit-render="{name: 'ElDatePicker', props: {type: 'datetime', format: 'yyyy-MM-dd HH:mm:ss'}}"></vxe-table-column>
          <vxe-table-column field="date5" title="ElTimeSelect" width="200" :edit-render="{name: 'ElTimeSelect', props: {pickerOptions: {start: '08:30', step: '00:15', end: '18:30'}}}"></vxe-table-column>
          <vxe-table-column field="flag" title="ElSwitch" width="100" :edit-render="{name: 'ElSwitch', type: 'visible'}"></vxe-table-column>
          <vxe-table-column field="slider" title="ElSlider" width="200" :edit-render="{name: 'ElSlider', type: 'visible'}"></vxe-table-column>
          <vxe-table-column field="rate" title="ElRate" width="200" fixed="right" :edit-render="{name: 'ElRate', type: 'visible'}"></vxe-table-column>
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
                  { required: true, message: '名称必须填写' },
                  { min: 3, max: 50, message: '名称长度在 3 到 50 个字符' }
                ],
                sex: [
                  { required: true, message: '性别必须填写' }
                ]
              },
              sexList: [],
              regionList: [],
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
            this.findSexList()
            this.findRegionList()
          },
          methods: {
            findList () {
              this.loading = true
              XEAjax.get(\`/api/user/page/list/\${this.tablePage.pageSize}/\${this.tablePage.currentPage}\`, this.formData).then(({ page, result }) => {
                this.tableData = result
                this.tablePage.totalResult = page.totalResult
                this.loading = false
                this.updateStateList()
              }).catch(e => {
                this.loading = false
              })
            },
            findSexList () {
              return XEAjax.get('/api/conf/sex/list').then(data => {
                this.sexList = data
                return data
              })
            },
            findRegionList () {
              return XEAjax.get('/api/conf/region/list').then(data => {
                this.regionList = data
                return data
              })
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
            vaildEvent () {
              this.$refs.xTable.validate(valid => {
                if (valid) {
                  this.$XModal.message({ status: 'success', message: '校验成功！' })
                } else {
                  this.$XModal.message({ status: 'error', message: '校验不通过！' })
                }
              })
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
    this.findSexList()
    this.findRegionList()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    findList () {
      this.loading = true
      XEAjax.get(`/api/user/page/list/${this.tablePage.pageSize}/${this.tablePage.currentPage}`, this.formData).then(({ page, result }) => {
        this.tableData = result
        this.tablePage.totalResult = page.totalResult
        this.loading = false
        this.updateStateList()
      }).catch(() => {
        this.loading = false
      })
    },
    findSexList () {
      return XEAjax.get('/api/conf/sex/list').then(data => {
        this.sexList = data
        return data
      })
    },
    findRegionList () {
      return XEAjax.get('/api/conf/region/list').then(data => {
        this.regionList = data
        return data
      })
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
    vaildEvent () {
      this.$refs.xTable.validate(valid => {
        if (valid) {
          this.$XModal.message({ status: 'success', message: '校验成功！' })
        } else {
          this.$XModal.message({ status: 'error', message: '校验不通过！' })
        }
      })
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
