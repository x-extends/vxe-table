<template>
  <div>
    <p>ant-design-vue 使用分页</p>

    <a-form :form="form" layout="inline" @submit="searchEvent">
      <a-form-item label="名字">
        <a-input v-decorator="['name']" placeholder="名字"></a-input>
      </a-form-item>
      <a-form-item label="性别">
        <a-select v-decorator="['sex']" placeholder="性别">
          <a-select-option v-for="item in sexList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">查询</a-button>
        <a-button @click="form.resetFields()">重置</a-button>
      </a-form-item>
    </a-form>

    <vxe-toolbar :customs="customColumns" setting>
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
      show-all-overflow
      class="vxe-table-antd"
      height="460"
      :loading="loading"
      :customs.sync="customColumns"
      :data.sync="tableData"
      :edit-config="{key: 'id', trigger: 'click', mode: 'cell'}">
      <vxe-table-column type="selection" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column type="index" label="Number" width="80" fixed="left"></vxe-table-column>
      <vxe-table-column prop="name" label="AInput" min-width="140" :edit-render="{name: 'AInput'}"></vxe-table-column>
      <vxe-table-column prop="role" label="AAutoComplete" width="160" :edit-render="{name: 'AAutoComplete', props: {dataSource}, events: {search: roleSearchEvent}}"></vxe-table-column>
      <vxe-table-column prop="age" label="AInputNumber" width="160" :edit-render="{name: 'AInputNumber', props: {max: 35, min: 18}}"></vxe-table-column>
      <vxe-table-column prop="sex" label="ASelect" width="140" :edit-render="{name: 'ASelect', options: sexList}"></vxe-table-column>
      <vxe-table-column prop="region" label="ACascader" width="200" :edit-render="{name: 'ACascader', props: {options: regionList}}"></vxe-table-column>
      <vxe-table-column prop="date7" label="ADatePicker" width="200" :edit-render="{name: 'ADatePicker', props: {type: 'date', format: 'YYYY/MM/DD'}}"></vxe-table-column>
      <vxe-table-column prop="flag" label="ASwitch" width="100" :edit-render="{name: 'ASwitch', type: 'visible'}"></vxe-table-column>
      <vxe-table-column prop="rate" label="ARate" width="200" fixed="right" :edit-render="{name: 'ARate', type: 'visible'}"></vxe-table-column>
    </vxe-table>

    <a-pagination
      @showSizeChange="handleSizeChange"
      @change="handleCurrentChange"
      v-model="pageVO.currentPage"
      :page-size-options="['5', '10', '15', '20', '50', '100', '150', '200']"
      :page-size="pageVO.pageSize"
      :total="pageVO.totalResult"
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
      dataSource: [],
      customColumns: [],
      sexList: [],
      regionList: [],
      restaurants: [
        { value: '前端', name: '前端' },
        { value: '后端', name: '后端' }
      ],
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
      pageVO: {
        currentPage: 1,
        pageSize: 10,
        totalResult: 0
      },
      form: this.$form.createForm(this),
      demoCodes: [
        `
          <a-form :form="form" layout="inline" @submit="searchEvent">
            <a-form-item label="名字">
              <a-input v-decorator="['name']" placeholder="名字"></a-input>
            </a-form-item>
            <a-form-item label="性别">
              <a-select v-decorator="['sex']" placeholder="性别">
                <a-select-option v-for="item in sexList" :key="item.value" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit">查询</a-button>
              <a-button @click="form.resetFields()">重置</a-button>
            </a-form-item>
          </a-form>

          <vxe-toolbar :customs="customColumns" setting>
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
            show-all-overflow
            class="vxe-table-antd"
            height="460"
            :loading="loading"
            :customs.sync="customColumns"
            :data.sync="tableData"
            :edit-config="{key: 'id', trigger: 'click', mode: 'cell'}">
            <vxe-table-column type="selection" width="60" fixed="left"></vxe-table-column>
            <vxe-table-column type="index" label="Number" width="80" fixed="left"></vxe-table-column>
            <vxe-table-column prop="name" label="AInput" min-width="140" :edit-render="{name: 'AInput'}"></vxe-table-column>
            <vxe-table-column prop="role" label="AAutoComplete" width="160" :edit-render="{name: 'AAutoComplete', props: {dataSource}, events: {search: roleSearchEvent}}"></vxe-table-column>
            <vxe-table-column prop="age" label="AInputNumber" width="160" :edit-render="{name: 'AInputNumber', props: {max: 35, min: 18}}"></vxe-table-column>
            <vxe-table-column prop="sex" label="ASelect" width="140" :edit-render="{name: 'ASelect', options: sexList}"></vxe-table-column>
            <vxe-table-column prop="sex1" label="ASelect" width="160" :edit-render="{name: 'ASelect', options: sexList, props: {mode: 'multiple'}}"></vxe-table-column>
            <vxe-table-column prop="sex2" label="ASelect" width="140" :edit-render="{name: 'ASelect', optionGroups: sexGroupList}"></vxe-table-column>
            <vxe-table-column prop="region" label="ACascader" width="200" :edit-render="{name: 'ACascader', props: {options: regionList}}"></vxe-table-column>
            <vxe-table-column prop="date7" label="ADatePicker" width="200" :edit-render="{name: 'ADatePicker', props: {type: 'date', format: 'YYYY/MM/DD'}}"></vxe-table-column>
            <vxe-table-column prop="flag" label="ASwitch" width="100" :edit-render="{name: 'ASwitch', type: 'visible'}"></vxe-table-column>
            <vxe-table-column prop="rate" label="ARate" width="200" fixed="right" :edit-render="{name: 'ARate', type: 'visible'}"></vxe-table-column>
          </vxe-table>

          <a-pagination
            @showSizeChange="handleSizeChange"
            @change="handleCurrentChange"
            v-model="pageVO.currentPage"
            :page-size-options="['5', '10', '15', '20', '50', '100', '150', '200']"
            :page-size="pageVO.pageSize"
            :total="pageVO.totalResult"
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
              dataSource: [],
              customColumns: [],
              sexList: [],
              regionList: [],
              restaurants: [
                { value: '前端', name: '前端' },
                { value: '后端', name: '后端' }
              ],
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
              pageVO: {
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
              XEAjax.doGet(\`/api/user/page/list/\${this.pageVO.pageSize}/\${this.pageVO.currentPage}\`).then(response => {
                let { page, result } = response.data
                this.tableData = result
                this.pageVO.totalResult = page.totalResult
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
              let { insertRecords, removeRecords, updateRecords } = this.$refs.xTable.getAllRecords()
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
              this.pageVO.currentPage = 1
              this.findList()
            },
            handleSizeChange (current, size) {
              this.pageVO.pageSize = size
              this.searchEvent()
            },
            handleCurrentChange (page, pageSize) {
              this.pageVO.currentPage = page
              this.findList()
            },
            roleSearchEvent ({ row }, value) {
              this.dataSource = !value ? [] : [
                value,
                value + value,
                value + value + value
              ]
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
      XEAjax.doGet(`/api/user/page/list/${this.pageVO.pageSize}/${this.pageVO.currentPage}`, this.form.getFieldsValue()).then(response => {
        let { page, result } = response.data
        this.tableData = result
        this.pageVO.totalResult = page.totalResult
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
      let { insertRecords, removeRecords, updateRecords } = this.$refs.xTable.getAllRecords()
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
      this.pageVO.currentPage = 1
      this.findList()
    },
    handleSizeChange (current, size) {
      this.pageVO.pageSize = size
      this.searchEvent()
    },
    handleCurrentChange (page, pageSize) {
      this.pageVO.currentPage = page
      this.findList()
    },
    roleSearchEvent ({ row }, value) {
      this.dataSource = !value ? [] : [
        value,
        value + value,
        value + value + value
      ]
    },
    createStateFilter (queryString) {
      return (state) => {
        return (state.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    }
  }
}
</script>
