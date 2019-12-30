<template>
  <div>
    <p class="tip">与 <a class="link" href="https://www.npmjs.com/package/iview">iview</a> 组合渲染 + 使用分页</p>

    <Form ref="tableform" :model="formData" inline>
      <FormItem prop="name">
        <Input type="text" v-model="formData.name" placeholder="Username"/>
      </FormItem>
      <FormItem prop="password">
        <Select v-model="formData.sex" placeholder="性别">
          <Option v-for="item in sexList" :key="item.value" :label="item.label" :value="item.value"></Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="searchEvent">查询</Button>
        <Button @click="$refs.tableform.resetFields()">重置</Button>
      </FormItem>
    </Form>

    <vxe-toolbar export custom>
      <template v-slot:buttons>
        <Button @click="insertEvent">新增</Button>
        <Button @click="saveEvent">保存</Button>
        <Button @click="vaildEvent">校验</Button>
        <Dropdown @on-click="dropdownMenuEvent">
          <Button>
            操作<Icon type="ios-arrow-down"></Icon>
          </Button >
          <DropdownMenu slot="list">
            <DropdownItem name="remove">删除选中</DropdownItem>
            <DropdownItem name="export">导出数据</DropdownItem>
          </DropdownMenu>
      </Dropdown>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      resizable
      show-overflow
      highlight-hover-row
      ref="xTable"
      class="vxe-table-iview"
      height="460"
      :loading="loading"
      :data="tableData"
      :edit-rules="validRules"
      :edit-config="{trigger: 'click', mode: 'row'}"
      @edit-actived="editActivedEvent"
      @edit-closed="editClosedEvent">
      <vxe-table-column type="checkbox" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column type="seq" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column field="name" title="Input" min-width="140" fixed="left" :edit-render="{name: 'Input'}"></vxe-table-column>
      <vxe-table-column field="role" title="AutoComplete" min-width="160" :edit-render="{name: 'AutoComplete', props: {data: restaurants, filterMethod: roleFilterMethod}}"></vxe-table-column>
      <vxe-table-column field="age" title="InputNumber" width="140" :edit-render="{name: 'InputNumber', props: {max: 35, min: 18}}"></vxe-table-column>
      <vxe-table-column field="sex" title="Select" width="140" :edit-render="{name: 'Select', options: sexList}"></vxe-table-column>
      <vxe-table-column field="state" title="Select" width="140" :edit-render="{name: 'Select', options: stateOptions, props: {remote: true, filterable: true, loading: stateloading, remoteMethod: remoteStateMethod}}"></vxe-table-column>
      <vxe-table-column field="region" title="Cascader" width="200" :edit-render="{name: 'Cascader', props: {data: regionList}}"> </vxe-table-column>
      <vxe-table-column field="date" title="DatePicker" width="200" :edit-render="{name: 'DatePicker', props: {type: 'date', format: 'yyyy/MM/dd'}}"></vxe-table-column>
      <vxe-table-column field="date6" title="TimePicker" width="200" :edit-render="{name: 'TimePicker', props: {type: 'time'}}"></vxe-table-column>
      <vxe-table-column field="flag" title="iSwitch" width="100" :edit-render="{name: 'iSwitch', type: 'visible'}"></vxe-table-column>
      <vxe-table-column field="rate" title="Rate" width="200" fixed="right" :edit-render="{name: 'Rate', type: 'visible'}"></vxe-table-column>
    </vxe-table>

    <Page
      show-sizer
      show-total
      show-elevator
      prev-text="Previous"
      next-text="Next"
      :page-size-opts="[5, 10, 15, 20, 50, 100, 150, 200]"
      :total="tablePage.totalResult"
      :current.sync="tablePage.currentPage"
      @on-page-size-change="handleSizeChange"
      @on-change="handleCurrentChange"/>

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
      restaurants: ['前端', '后端', '开发', '测试'],
      tablePage: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0
      },
      formData: {
        name: null,
        sex: null
      },
      demoCodes: [
        `
        <Form ref="tableform" :model="formData" inline>
          <FormItem prop="name">
            <Input type="text" v-model="formData.name" placeholder="Username"/>
          </FormItem>
          <FormItem prop="password">
            <Select v-model="formData.sex" placeholder="性别">
              <Option v-for="item in sexList" :key="item.value" :label="item.label" :value="item.value"></Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="searchEvent">查询</Button>
            <Button @click="$refs.tableform.resetFields()">重置</Button>
          </FormItem>
        </Form>

        <vxe-toolbar export custom>
          <template v-slot:buttons>
            <Button @click="insertEvent">新增</Button>
            <Button @click="saveEvent">保存</Button>
            <Button @click="vaildEvent">校验</Button>
            <Dropdown @on-click="dropdownMenuEvent">
              <Button>
                操作<Icon type="ios-arrow-down"></Icon>
              </Button >
              <DropdownMenu slot="list">
                <DropdownItem name="remove">删除选中</DropdownItem>
                <DropdownItem name="export">导出数据</DropdownItem>
              </DropdownMenu>
          </Dropdown>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          resizable
          show-overflow
          highlight-hover-row
          ref="xTable"
          class="vxe-table-iview"
          height="460"
          :loading="loading"
          :data="tableData"
          :edit-rules="validRules"
          :edit-config="{trigger: 'click', mode: 'row'}"
          @edit-actived="editActivedEvent"
          @edit-closed="editClosedEvent">
          <vxe-table-column type="checkbox" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column type="seq" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column field="name" title="Input" min-width="140" fixed="left" :edit-render="{name: 'Input'}"></vxe-table-column>
          <vxe-table-column field="role" title="AutoComplete" min-width="160" :edit-render="{name: 'AutoComplete', props: {data: restaurants, filterMethod: roleFilterMethod}}"></vxe-table-column>
          <vxe-table-column field="age" title="InputNumber" width="140" :edit-render="{name: 'InputNumber', props: {max: 35, min: 18}}"></vxe-table-column>
          <vxe-table-column field="sex" title="Select" width="140" :edit-render="{name: 'Select', options: sexList}"></vxe-table-column>
          <vxe-table-column field="state" title="Select" width="140" :edit-render="{name: 'Select', options: stateOptions, props: {remote: true, filterable: true, loading: stateloading, remoteMethod: remoteStateMethod}}"></vxe-table-column>
          <vxe-table-column field="region" title="Cascader" width="200" :edit-render="{name: 'Cascader', props: {data: regionList}}"> </vxe-table-column>
          <vxe-table-column field="date" title="DatePicker" width="200" :edit-render="{name: 'DatePicker', props: {type: 'date', format: 'yyyy/MM/dd'}}"></vxe-table-column>
          <vxe-table-column field="date6" title="TimePicker" width="200" :edit-render="{name: 'TimePicker', props: {type: 'time'}}"></vxe-table-column>
          <vxe-table-column field="flag" title="iSwitch" width="100" :edit-render="{name: 'iSwitch', type: 'visible'}"></vxe-table-column>
          <vxe-table-column field="rate" title="Rate" width="200" fixed="right" :edit-render="{name: 'Rate', type: 'visible'}"></vxe-table-column>
        </vxe-table>

        <Page
          show-sizer
          show-total
          show-elevator
          prev-text="Previous"
          next-text="Next"
          :page-size-opts="[5, 10, 15, 20, 50, 100, 150, 200]"
          :total="tablePage.totalResult"
          :current.sync="tablePage.currentPage"
          @on-page-size-change="handleSizeChange"
          @on-change="handleCurrentChange"/>
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
              restaurants: ['前端', '后端', '开发', '测试'],
              tablePage: {
                currentPage: 1,
                pageSize: 10,
                totalResult: 0
              },
              formData: {
                name: null,
                sex: null
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
              // 模拟后台数据
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
                this.$Message.success('保存成功！')
                this.searchEvent()
              } else {
                this.$Message.info('数据未改动！')
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
                    this.$refs.xTable.removeSelecteds()
                  } else {
                    this.$Message.info('请至少选择一条数据！')
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
            roleFilterMethod  (value, option) {
              return option.toUpperCase().indexOf(value.toUpperCase()) !== -1
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
        this.$Message.success('保存成功！')
        this.searchEvent()
      } else {
        this.$Message.info('数据未改动！')
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
            this.$refs.xTable.removeSelecteds()
          } else {
            this.$Message.info('请至少选择一条数据！')
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
    roleFilterMethod  (value, option) {
      return option.toUpperCase().indexOf(value.toUpperCase()) !== -1
    }
  }
}
</script>
