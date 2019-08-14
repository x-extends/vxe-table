<template>
  <div>
    <p class="tip">与 <a class="link" href="https://www.npmjs.com/package/ant-design-vue">ant-design-vue</a> 组合渲染 + 使用分页</p>

    <a-form :form="form" layout="inline" @submit="searchEvent">
      <a-form-item title="名字">
        <a-input v-decorator="['name']" placeholder="名字"></a-input>
      </a-form-item>
      <a-form-item title="性别">
        <a-select v-decorator="['sex']" placeholder="性别">
          <a-select-option v-for="item in sexList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">查询</a-button>
        <a-button @click="form.resetFields()">重置</a-button>
      </a-form-item>
    </a-form>

    <vxe-toolbar setting>
      <template v-slot:buttons>
        <a-button @click="insertEvent">新增</a-button>
        <a-button @click="saveEvent">保存</a-button>
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
      ref="xTable"
      border
      resizable
      show-overflow
      highlight-hover-row
      class="vxe-table-antd"
      height="460"
      :loading="loading"
      :data.sync="tableData"
      :edit-rules="validRules"
      :edit-config="{trigger: 'click', mode: 'row'}">
      <vxe-table-column type="selection" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column type="index" title="Number" width="80" fixed="left"></vxe-table-column>
      <vxe-table-column field="name" title="AInput" min-width="140" :edit-render="{name: 'AInput'}"></vxe-table-column>
      <vxe-table-column field="role" title="AAutoComplete" width="160" :edit-render="{name: 'AAutoComplete', props: ACProps, events: {search: roleSearchEvent}}"></vxe-table-column>
      <vxe-table-column field="age" title="AInputNumber" width="160" :edit-render="{name: 'AInputNumber', props: {max: 35, min: 18}}"></vxe-table-column>
      <vxe-table-column field="sex" title="ASelect" width="140" :edit-render="{name: 'ASelect', options: sexList}"></vxe-table-column>
      <vxe-table-column field="region" title="ACascader" width="200" :edit-render="{name: 'ACascader', props: {options: regionList}}"></vxe-table-column>
      <vxe-table-column field="date7" title="ADatePicker" width="200" :edit-render="{name: 'ADatePicker', props: {type: 'date', format: 'YYYY/MM/DD'}}"></vxe-table-column>
      <vxe-table-column field="flag" title="ASwitch" width="100" :edit-render="{name: 'ASwitch', type: 'visible'}"></vxe-table-column>
      <vxe-table-column field="rate" title="ARate" width="200" fixed="right" :edit-render="{name: 'ARate', type: 'visible'}"></vxe-table-column>
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
          { required: true, message: '名称必须填写' },
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
      form: this.$form.createForm(this),
      demoCodes: [
        `
          <a-form :form="form" layout="inline" @submit="searchEvent">
            <a-form-item title="名字">
              <a-input v-decorator="['name']" placeholder="名字"></a-input>
            </a-form-item>
            <a-form-item title="性别">
              <a-select v-decorator="['sex']" placeholder="性别">
                <a-select-option v-for="item in sexList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit">查询</a-button>
              <a-button @click="form.resetFields()">重置</a-button>
            </a-form-item>
          </a-form>

          <vxe-toolbar setting>
            <template v-slot:buttons>
              <a-button @click="insertEvent">新增</a-button>
              <a-button @click="saveEvent">保存</a-button>
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
            ref="xTable"
            border
            resizable
            show-overflow
            highlight-hover-row
            class="vxe-table-antd"
            height="460"
            :loading="loading"
            :data.sync="tableData"
            :edit-rules="validRules"
            :edit-config="{trigger: 'click', mode: 'row'}">
            <vxe-table-column type="selection" width="60" fixed="left"></vxe-table-column>
            <vxe-table-column type="index" title="Number" width="80" fixed="left"></vxe-table-column>
            <vxe-table-column field="name" title="AInput" min-width="140" :edit-render="{name: 'AInput'}"></vxe-table-column>
            <vxe-table-column field="role" title="AAutoComplete" width="160" :edit-render="{name: 'AAutoComplete', props: ACProps, events: {search: roleSearchEvent}}"></vxe-table-column>
            <vxe-table-column field="age" title="AInputNumber" width="160" :edit-render="{name: 'AInputNumber', props: {max: 35, min: 18}}"></vxe-table-column>
            <vxe-table-column field="sex" title="ASelect" width="140" :edit-render="{name: 'ASelect', options: sexList}"></vxe-table-column>
            <vxe-table-column field="region" title="ACascader" width="200" :edit-render="{name: 'ACascader', props: {options: regionList}}"></vxe-table-column>
            <vxe-table-column field="date7" title="ADatePicker" width="200" :edit-render="{name: 'ADatePicker', props: {type: 'date', format: 'YYYY/MM/DD'}}"></vxe-table-column>
            <vxe-table-column field="flag" title="ASwitch" width="100" :edit-render="{name: 'ASwitch', type: 'visible'}"></vxe-table-column>
            <vxe-table-column field="rate" title="ARate" width="200" fixed="right" :edit-render="{name: 'ARate', type: 'visible'}"></vxe-table-column>
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
                  { required: true, message: '名称必须填写' },
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
              form: this.$form.createForm(this)
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
              XEAjax.doGet(\`/api/user/page/list/\${this.tablePage.pageSize}/\${this.tablePage.currentPage}\`, this.form.getFieldsValue()).then(response => {
                let { page, result } = response.data
                this.tableData = result
                this.tablePage.totalResult = page.totalResult
                this.loading = false
              }).catch(e => {
                this.loading = false
              })
            },
            findSexList () {
              return XEAjax.doGet('/api/conf/sex/list').then(({ data }) => {
                this.sexList = data
                return data
              })
            },
            findRegionList () {
              return XEAjax.doGet('/api/conf/region/list').then(({ data }) => {
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
            dropdownMenuEvent (name) {
              switch (name) {
                case 'remove': {
                  let selectRecords = this.$refs.xTable.getSelectRecords()
                  if (selectRecords.length) {
                    this.$refs.xTable.removeSelecteds()
                  } else {
                    this.$message.warning('请至少选择一条数据！')
                  }
                  break
                }
                case 'export': {
                  this.$refs.xTable.exportCsv()
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
      XEAjax.doGet(`/api/user/page/list/${this.tablePage.pageSize}/${this.tablePage.currentPage}`, this.form.getFieldsValue()).then(response => {
        let { page, result } = response.data
        this.tableData = result
        this.tablePage.totalResult = page.totalResult
        this.loading = false
      }).catch(e => {
        this.loading = false
      })
    },
    findSexList () {
      return XEAjax.doGet('/api/conf/sex/list').then(({ data }) => {
        this.sexList = data
        return data
      })
    },
    findRegionList () {
      return XEAjax.doGet('/api/conf/region/list').then(({ data }) => {
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
    dropdownMenuEvent (name) {
      switch (name) {
        case 'remove': {
          let selectRecords = this.$refs.xTable.getSelectRecords()
          if (selectRecords.length) {
            this.$refs.xTable.removeSelecteds()
          } else {
            this.$message.warning('请至少选择一条数据！')
          }
          break
        }
        case 'export': {
          this.$refs.xTable.exportCsv()
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
    roleSearchEvent ({ row }, value) {
      this.ACProps.dataSource = this.restaurants.filter(option => option.toUpperCase().indexOf((value || '').toUpperCase()) !== -1)
    }
  }
}
</script>
