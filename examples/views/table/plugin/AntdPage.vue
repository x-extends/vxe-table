<template>
  <div>
    <p class="tip">
      与 <a class="link" href="https://github.com/x-extends/ant-design-vue">ant-design-vue</a> 组合渲染 + 使用分页<br>
      <span class="red">（注：该示例仅供参考，具体逻辑请自行实现）</span>
    </p>

    <vxe-form :data="formData" title-width="120" title-align="right" @submit="searchEvent" @reset="searchEvent">
      <vxe-form-item field="name" title="AInput" span="8" :title-prefix="{ message: '帮助信息！！！', icon: 'fa fa-exclamation-circle' }" :item-render="{name: 'AInput'}"></vxe-form-item>
      <vxe-form-item field="role" title="AAutoComplete" span="8" :item-render="{name: 'AAutoComplete', props: ACProps, events: {search: roleSearchEvent}}"></vxe-form-item>
      <vxe-form-item field="age" title="AInputNumber" span="8" :item-render="{name: 'AInputNumber'}"></vxe-form-item>
      <vxe-form-item field="sex" title="ASelect" span="8" :item-render="{name: 'ASelect', options: sexList}"></vxe-form-item>
      <vxe-form-item field="region" title="ACascader" span="8" :item-render="{name: 'ACascader', props: {options: regionList}}"></vxe-form-item>
      <vxe-form-item field="date" title="ADatePicker" span="8" :item-render="{name: 'ADatePicker', props: {type: 'date', format: 'YYYY/MM/DD'}}"></vxe-form-item>
      <vxe-form-item field="flag" title="ASwitch" span="8" folding :item-render="{name: 'ASwitch'}"></vxe-form-item>
      <vxe-form-item field="rate" title="ARate" span="8" folding :item-render="{name: 'ARate'}"></vxe-form-item>
      <vxe-form-item field="flag1" title="ARadio" span="8" folding :item-render="{name: 'ARadio', options: [{label: '是', value: 'Y'}, {label: '否', value: 'N'}]}"></vxe-form-item>
      <vxe-form-item field="checkedList" title="ACheckbox" span="8" folding :item-render="{name: 'ACheckbox', options: [{label: '北京', value: 'beijing'}, {label: '深圳', value: 'shenzhen'}, {label: '上海', value: 'shanghai'}]}" :visible-method="visibleMethod"></vxe-form-item>
      <vxe-form-item span="24" align="center" collapse-node :item-render="{name: 'AButtons', children: [{ content: '查询', props: {type: 'primary', htmlType: 'submit'} }, { content: '重置', props: {htmlType: 'reset'} }]}"></vxe-form-item>
    </vxe-form>

    <vxe-toolbar export print custom>
      <template v-slot:buttons>
        <a-button @click="insertEvent">新增</a-button>
        <a-button @click="saveEvent">保存</a-button>
        <a-button @click="vaildEvent">校验</a-button>
        <a-dropdown :trigger="['click']">
          <a-button>操作<a-icon type="down" /></a-button>
          <a-menu slot="overlay">
            <a-menu-item key="0">
              <a @click="dropdownMenuEvent('remove')">删除选中</a>
            </a-menu-item>
            <a-menu-item key="1">
              <a @click="dropdownMenuEvent('export')">导出数据</a>
            </a-menu-item>
            <a-menu-divider />
          </a-menu>
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
      :loading="loading"
      :data="tableData"
      :edit-rules="validRules"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
      <vxe-table-column type="checkbox" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column type="seq" title="Number" width="80" fixed="left"></vxe-table-column>
      <vxe-table-column field="name" title="AInput" min-width="140" fixed="left" :edit-render="{name: 'AInput'}"></vxe-table-column>
      <vxe-table-column field="role" title="AAutoComplete" width="160" :edit-render="{name: 'AAutoComplete', props: ACProps, events: {search: roleSearchEvent}}"></vxe-table-column>
      <vxe-table-column field="age" title="AInputNumber" width="160" :edit-render="{name: 'AInputNumber', props: {max: 35, min: 18}}"></vxe-table-column>
      <vxe-table-column field="sex" title="ASelect" width="140" :edit-render="{name: 'ASelect', options: sexList}"></vxe-table-column>
      <vxe-table-column field="sexList" title="ASelect multiple" width="180" :edit-render="{name: 'ASelect', options: sexList, props: {mode: 'multiple'}}"></vxe-table-column>
      <vxe-table-column field="region" title="ACascader" width="200" :edit-render="{name: 'ACascader', props: {options: regionList}}"></vxe-table-column>
      <vxe-table-column field="date1" title="ADatePicker" width="200" :edit-render="{name: 'ADatePicker', props: {type: 'date', format: 'YYYY/MM/DD'}}"></vxe-table-column>
      <vxe-table-column field="flag" title="ASwitch" width="100" :cell-render="{name: 'ASwitch'}"></vxe-table-column>
      <vxe-table-column field="rate" title="ARate" width="200" fixed="right" :cell-render="{name: 'ARate'}"></vxe-table-column>
    </vxe-table>

    <a-pagination
      @showSizeChange="handleSizeChange"
      @change="handleCurrentChange"
      v-model="tablePage.currentPage"
      :page-size-options="['5', '10', '15', '20', '50', '100', '150', '200']"
      :page-size="tablePage.pageSize"
      :total="tablePage.totalResult"
      showSizeChanger
      showQuickJumper>
    </a-pagination>

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
          { required: true, message: 'app.body.valid.rName' },
          { min: 3, max: 50, message: '名称长度在 3 到 50 个字符' }
        ],
        sex: [
          { required: true, message: '性别必须填写' }
        ]
      },
      restaurants: ['前端', '后端', '开发', '测试'],
      ACProps: {
        dataSource: []
      },
      sexList: [],
      regionList: [],
      sexGroupList: [
        {
          label: '分组1',
          options: [
            {
              label: '男',
              value: '1'
            }
          ]
        },
        {
          label: '分组2',
          options: [
            {
              label: '女',
              value: '0'
            }
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
      },
      demoCodes: [
        `
          <vxe-form :data="formData" title-width="120" title-align="right" @submit="searchEvent" @reset="searchEvent">
            <vxe-form-item field="name" title="AInput" span="8" :title-prefix="{ message: '帮助信息！！！', icon: 'fa fa-exclamation-circle' }" :item-render="{name: 'AInput'}"></vxe-form-item>
            <vxe-form-item field="role" title="AAutoComplete" span="8" :item-render="{name: 'AAutoComplete', props: ACProps, events: {search: roleSearchEvent}}"></vxe-form-item>
            <vxe-form-item field="age" title="AInputNumber" span="8" :item-render="{name: 'AInputNumber'}"></vxe-form-item>
            <vxe-form-item field="sex" title="ASelect" span="8" :item-render="{name: 'ASelect', options: sexList}"></vxe-form-item>
            <vxe-form-item field="region" title="ACascader" span="8" :item-render="{name: 'ACascader', props: {options: regionList}}"></vxe-form-item>
            <vxe-form-item field="date" title="ADatePicker" span="8" :item-render="{name: 'ADatePicker', props: {type: 'date', format: 'YYYY/MM/DD'}}"></vxe-form-item>
            <vxe-form-item field="flag" title="ASwitch" span="8" folding :item-render="{name: 'ASwitch'}"></vxe-form-item>
            <vxe-form-item field="rate" title="ARate" span="8" folding :item-render="{name: 'ARate'}"></vxe-form-item>
            <vxe-form-item field="flag1" title="ARadio" span="8" folding :item-render="{name: 'ARadio', options: [{label: '是', value: 'Y'}, {label: '否', value: 'N'}]}"></vxe-form-item>
            <vxe-form-item field="checkedList" title="ACheckbox" span="8" folding :item-render="{name: 'ACheckbox', options: [{label: '北京', value: 'beijing'}, {label: '深圳', value: 'shenzhen'}, {label: '上海', value: 'shanghai'}]}" :visible-method="visibleMethod"></vxe-form-item>
            <vxe-form-item span="24" align="center" collapse-node :item-render="{name: 'AButtons', children: [{ content: '查询', props: {type: 'primary', htmlType: 'submit'} }, { content: '重置', props: {htmlType: 'reset'} }]}"></vxe-form-item>
          </vxe-form>

          <vxe-toolbar export print custom>
            <template v-slot:buttons>
              <a-button @click="insertEvent">新增</a-button>
              <a-button @click="saveEvent">保存</a-button>
              <a-button @click="vaildEvent">校验</a-button>
              <a-dropdown :trigger="['click']">
                <a-button>操作<a-icon type="down" /></a-button>
                <a-menu slot="overlay">
                  <a-menu-item key="0">
                    <a @click="dropdownMenuEvent('remove')">删除选中</a>
                  </a-menu-item>
                  <a-menu-item key="1">
                    <a @click="dropdownMenuEvent('export')">导出数据</a>
                  </a-menu-item>
                  <a-menu-divider />
                </a-menu>
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
            :loading="loading"
            :data="tableData"
            :edit-rules="validRules"
            :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
            <vxe-table-column type="checkbox" width="60" fixed="left"></vxe-table-column>
            <vxe-table-column type="seq" title="Number" width="80" fixed="left"></vxe-table-column>
            <vxe-table-column field="name" title="AInput" min-width="140" :edit-render="{name: 'AInput'}"></vxe-table-column>
            <vxe-table-column field="role" title="AAutoComplete" width="160" :edit-render="{name: 'AAutoComplete', props: ACProps, events: {search: roleSearchEvent}}"></vxe-table-column>
            <vxe-table-column field="age" title="AInputNumber" width="160" :edit-render="{name: 'AInputNumber', props: {max: 35, min: 18}}"></vxe-table-column>
            <vxe-table-column field="sex" title="ASelect" width="140" :edit-render="{name: 'ASelect', options: sexList}"></vxe-table-column>
            <vxe-table-column field="region" title="ACascader" width="200" :edit-render="{name: 'ACascader', props: {options: regionList}}"></vxe-table-column>
            <vxe-table-column field="date1" title="ADatePicker" width="200" :edit-render="{name: 'ADatePicker', props: {type: 'date', format: 'YYYY/MM/DD'}}"></vxe-table-column>
            <vxe-table-column field="flag" title="ASwitch" width="100" :cell-render="{name: 'ASwitch'}"></vxe-table-column>
            <vxe-table-column field="rate" title="ARate" width="200" fixed="right" :cell-render="{name: 'ARate'}"></vxe-table-column>
          </vxe-table>

          <a-pagination
            @showSizeChange="handleSizeChange"
            @change="handleCurrentChange"
            v-model="tablePage.currentPage"
            :page-size-options="['5', '10', '15', '20', '50', '100', '150', '200']"
            :page-size="tablePage.pageSize"
            :total="tablePage.totalResult"
            showSizeChanger
            showQuickJumper>
          </a-pagination>
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
              restaurants: ['前端', '后端', '开发', '测试'],
              ACProps: {
                dataSource: []
              },
              sexList: [],
              regionList: [],
              sexGroupList: [
                {
                  label: '分组1',
                  options: [
                    {
                      label: '男',
                      value: '1'
                    }
                  ]
                },
                {
                  label: '分组2',
                  options: [
                    {
                      label: '女',
                      value: '0'
                    }
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
            }
          },
          created () {
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
                this.$message.success('保存成功！')
                this.searchEvent()
              } else {
                this.$message.warning('数据未改动！')
              }
            },
            vaildEvent () {
              this.$refs.xTable.validate((errMap) => {
                if (errMap) {
                  this.$XModal.message({ status: 'error', message: '校验不通过！' })
                } else {
                  this.$XModal.message({ status: 'success', message: '校验成功！' })
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
                    this.$message.warning('请至少选择一条数据！')
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
            handleSizeChange (current, size) {
              this.tablePage.pageSize = size
              this.searchEvent()
            },
            handleCurrentChange (page, pageSize) {
              this.tablePage.currentPage = page
              this.findList()
            },
            visibleMethod ({ data }) {
              return data.flag1 === 'Y'
            },
            roleSearchEvent ({ row }, value) {
              this.ACProps.dataSource = this.restaurants.filter(option => option.toUpperCase().indexOf((value || '').toUpperCase()) !== -1)
            }
          }
        }
        `
      ]
    }
  },
  created () {
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
        this.$message.success('保存成功！')
        this.searchEvent()
      } else {
        this.$message.warning('数据未改动！')
      }
    },
    vaildEvent () {
      this.$refs.xTable.validate((errMap) => {
        if (errMap) {
          this.$XModal.message({ status: 'error', message: '校验不通过！' })
        } else {
          this.$XModal.message({ status: 'success', message: '校验成功！' })
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
            this.$message.warning('请至少选择一条数据！')
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
    handleSizeChange (current, size) {
      this.tablePage.pageSize = size
      this.searchEvent()
    },
    handleCurrentChange (currentPage) {
      this.tablePage.currentPage = currentPage
      this.findList()
    },
    visibleMethod ({ data }) {
      return data.flag1 === 'Y'
    },
    roleSearchEvent (params, value) {
      this.ACProps.dataSource = this.restaurants.filter(option => option.toUpperCase().indexOf((value || '').toUpperCase()) !== -1)
    }
  }
}
</script>
