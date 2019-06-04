<template>
  <div>
    <p>element-ui 使用分页</p>

    <el-form ref="tableform" :model="formData" inline>
      <el-form-item label="名字" prop="name">
        <el-input v-model="formData.name" placeholder="名字"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="formData.sex" placeholder="性别">
          <el-option v-for="item in sexList" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchEvent">查询</el-button>
        <el-button @click="$refs.tableform.resetFields()">重置</el-button>
      </el-form-item>
    </el-form>

    <vxe-toolbar :customs="customColumns" setting>
      <template v-slot:buttons>
        <el-button @click="insertEvent">新增</el-button>
        <el-button @click="saveEvent">保存</el-button>
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
      show-all-overflow
      ref="xTable"
      class="vxe-table-element"
      height="460"
      :loading="loading"
      :data.sync="tableData"
      :customs.sync="customColumns"
      :edit-config="{key: 'id', trigger: 'click', mode: 'row'}">
      <vxe-table-column type="selection" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column type="index" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column prop="name" label="ElInput" min-width="140" :edit-render="{name: 'ElInput'}"></vxe-table-column>
      <vxe-table-column prop="role" label="ElAutocomplete" width="160" :edit-render="{name: 'ElAutocomplete', props: {fetchSuggestions: roleFetchSuggestions}}"></vxe-table-column>
      <vxe-table-column prop="age" label="ElInputNumber" width="160" :edit-render="{name: 'ElInputNumber', props: {max: 35, min: 18}}"></vxe-table-column>
      <vxe-table-column prop="sex" label="ElSelect" width="140" :edit-render="{name: 'ElSelect', options: sexList}"></vxe-table-column>
      <vxe-table-column prop="region" label="ElCascader" width="200" :edit-render="{name: 'ElCascader', props: {options: regionList}}"></vxe-table-column>
      <vxe-table-column prop="date" label="ElDatePicker" width="200" :edit-render="{name: 'ElDatePicker', props: {type: 'date', format: 'yyyy/MM/dd'}}"></vxe-table-column>
      <vxe-table-column prop="date1" label="DateTimePicker" width="220" :edit-render="{name: 'ElDatePicker', props: {type: 'datetime', format: 'yyyy-MM-dd HH:mm:ss'}}"></vxe-table-column>
      <vxe-table-column prop="date5" label="ElTimeSelect" width="200" :edit-render="{name: 'ElTimeSelect', props: {pickerOptions: {start: '08:30', step: '00:15', end: '18:30'}}}"></vxe-table-column>
      <vxe-table-column prop="flag" label="ElSwitch" width="100" :edit-render="{name: 'ElSwitch', type: 'visible'}"></vxe-table-column>
      <vxe-table-column prop="rate" label="ElRate" width="200" fixed="right" :edit-render="{name: 'ElRate', type: 'visible'}"></vxe-table-column>
    </vxe-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageVO.currentPage"
      :page-sizes="[5, 10, 15, 20, 50, 100, 150, 200]"
      :page-size="pageVO.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageVO.totalResult">
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
      customColumns: [],
      sexList: [],
      regionList: [],
      restaurants: [
        { value: '前端', name: '前端' },
        { value: '后端', name: '后端' }
      ],
      pageVO: {
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
          <el-form ref="tableform" class="click-table2-form" size="mini" :inline="true" :model="formData">
            <el-form-item label="名字" prop="name">
              <el-input v-model="formData.name" placeholder="名字"></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="role">
              <el-input v-model="formData.role" placeholder="请输入角色"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="searchEvent">查询</el-button>
              <el-button @click="$refs.tableform.resetFields()">重置</el-button>
            </el-form-item>
          </el-form>

          <vxe-toolbar :customs="customColumns" setting>
            <template v-slot:buttons>
              <el-button @click="insertEvent">新增</el-button>
              <el-button @click="saveEvent">保存</el-button>
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
            show-all-overflow
            ref="xTable"
            class="vxe-table-element"
            height="460"
            size="small"
            :loading="loading"
            :data.sync="tableData"
            :customs.sync="customColumns"
            :edit-config="{key: 'id', trigger: 'click', mode: 'row'}">
            <vxe-table-column type="selection" width="60" fixed="left"></vxe-table-column>
            <vxe-table-column type="index" width="60" fixed="left"></vxe-table-column>
            <vxe-table-column prop="name" label="ElInput" min-width="140" :edit-render="{name: 'ElInput'}"></vxe-table-column>
            <vxe-table-column prop="role" label="ElAutocomplete" width="160" :edit-render="{name: 'ElAutocomplete', props: {fetchSuggestions: roleFetchSuggestions}}"></vxe-table-column>
            <vxe-table-column prop="age" label="ElInputNumber" width="160" :edit-render="{name: 'ElInputNumber', props: {max: 35, min: 18}}"></vxe-table-column>
            <vxe-table-column prop="sex" label="ElSelect" width="140" :edit-render="{name: 'ElSelect', options: sexList}"></vxe-table-column>
            <vxe-table-column prop="region" label="ElCascader" width="200" :edit-render="{name: 'ElCascader', props: {options: regionList}}"></vxe-table-column>
            <vxe-table-column prop="date" label="ElDatePicker" width="200" :edit-render="{name: 'ElDatePicker', props: {type: 'date', format: 'yyyy/MM/dd'}}"></vxe-table-column>
            <vxe-table-column prop="date1" label="DateTimePicker" width="220" :edit-render="{name: 'ElDatePicker', props: {type: 'datetime', format: 'yyyy-MM-dd HH:mm:ss'}}"></vxe-table-column>
            <vxe-table-column prop="date5" label="ElTimeSelect" width="200" :edit-render="{name: 'ElTimeSelect', props: {pickerOptions: {start: '08:30', step: '00:15', end: '18:30'}}}"></vxe-table-column>
            <vxe-table-column prop="flag" label="ElSwitch" width="100" :edit-render="{name: 'ElSwitch', type: 'visible'}"></vxe-table-column>
            <vxe-table-column prop="rate" label="ElRate" width="200" fixed="right" :edit-render="{name: 'ElRate', type: 'visible'}"></vxe-table-column>
          </vxe-table>

          <el-pager
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageVO.currentPage"
            :page-sizes="[5, 10, 15, 20, 50, 100, 150, 200]"
            :page-size="pageVO.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageVO.totalResult">
          </el-pager>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tableData: [],
              customColumns: [],
              sexList: [],
              regionList: [],
              restaurants: [
                { value: '前端', name: '前端' },
                { value: '后端', name: '后端' }
              ],
              pageVO: {
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
            this.findList()
            this.findSexList()
            this.findRegionList()
          },
          methods: {
            findList () {
              // 模拟后台数据
              this.loading = true
              XEAjax.doGet(\`/api/user/page/list/\${this.pageVO.pageSize}/\${this.pageVO.currentPage}\`, this.formData).then(response => {
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
                this.$message({ message: '保存成功！', type: 'success' })
                this.searchEvent()
              } else {
                this.$message({ message: '数据未改动！' })
              }
            },
            dropdownMenuEvent (name) {
              switch (name) {
                case 'remove': {
                  let selectRecords = this.$refs.xTable.getSelectRecords()
                  if (selectRecords.length) {
                    this.$refs.xTable.removeSelecteds()
                  } else {
                    this.$message({ message: '请至少选择一条数据！' })
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
            handleSizeChange (pageSize) {
              this.pageVO.pageSize = pageSize
              this.searchEvent()
            },
            handleCurrentChange (currentPage) {
              this.pageVO.currentPage = currentPage
              this.findList()
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
      XEAjax.doGet(`/api/user/page/list/${this.pageVO.pageSize}/${this.pageVO.currentPage}`, this.formData).then(response => {
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
        this.$message({ message: '保存成功！', type: 'success' })
        this.searchEvent()
      } else {
        this.$message({ message: '数据未改动！' })
      }
    },
    dropdownMenuEvent (name) {
      switch (name) {
        case 'remove': {
          let selectRecords = this.$refs.xTable.getSelectRecords()
          if (selectRecords.length) {
            this.$refs.xTable.removeSelecteds()
          } else {
            this.$message({ message: '请至少选择一条数据！' })
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
    handleSizeChange (pageSize) {
      this.pageVO.pageSize = pageSize
      this.searchEvent()
    },
    handleCurrentChange (currentPage) {
      this.pageVO.currentPage = currentPage
      this.findList()
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
</script>
