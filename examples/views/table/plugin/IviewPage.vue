<template>
  <div>
    <p>与 <a class="link" href="https://www.npmjs.com/package/iview">iview</a> 组合渲染 + 使用分页</p>

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

    <vxe-toolbar setting>
      <template v-slot:buttons>
        <Button @click="insertEvent">新增</Button>
        <Button @click="saveEvent">保存</Button>
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
      show-all-overflow
      ref="xTable"
      class="vxe-table-iview"
      height="460"
      :loading="loading"
      :data.sync="tableData"
      :edit-config="{key: 'id', trigger: 'click', mode: 'row'}">
      <vxe-table-column type="selection" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column type="index" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column prop="name" label="Input" min-width="140" :edit-render="{name: 'Input'}"></vxe-table-column>
      <vxe-table-column prop="role" label="AutoComplete" min-width="160" :edit-render="{name: 'AutoComplete', props: {data: restaurants, filterMethod: roleFilterMethod}}"></vxe-table-column>
      <vxe-table-column prop="age" label="InputNumber" width="140" :edit-render="{name: 'InputNumber', props: {max: 35, min: 18}}"></vxe-table-column>
      <vxe-table-column prop="sex" label="Select" width="140" :edit-render="{name: 'Select', options: sexList}"></vxe-table-column>
      <vxe-table-column prop="region" label="Cascader" width="200" :edit-render="{name: 'Cascader', props: {data: regionList}}"> </vxe-table-column>
      <vxe-table-column prop="date" label="DatePicker" width="200" :edit-render="{name: 'DatePicker', props: {type: 'date', format: 'yyyy/MM/dd'}}"></vxe-table-column>
      <vxe-table-column prop="date6" label="TimePicker" width="200" :edit-render="{name: 'TimePicker', props: {type: 'time'}}"></vxe-table-column>
      <vxe-table-column prop="flag" label="iSwitch" width="100" :edit-render="{name: 'iSwitch', type: 'visible'}"></vxe-table-column>
      <vxe-table-column prop="rate" label="Rate" width="200" fixed="right" :edit-render="{name: 'Rate', type: 'visible'}"></vxe-table-column>
    </vxe-table>

    <Page
      show-sizer
      show-total
      show-elevator
      prev-text="Previous"
      next-text="Next"
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
      sexList: [],
      regionList: [],
      restaurants: ['前端', '后端'],
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

        <vxe-toolbar setting>
          <template v-slot:buttons>
            <Button @click="insertEvent">新增</Button>
            <Button @click="saveEvent">保存</Button>
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
          show-all-overflow
          ref="xTable"
          class="vxe-table-iview"
          height="460"
          size="small"
          :loading="loading"
          :data.sync="tableData"
          :edit-config="{key: 'id', trigger: 'click', mode: 'row'}">
          <vxe-table-column type="selection" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column type="index" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column prop="name" label="Input" min-width="140" :edit-render="{name: 'Input'}"></vxe-table-column>
          <vxe-table-column prop="role" label="AutoComplete" min-width="160" :edit-render="{name: 'AutoComplete', props: {data: restaurants, filterMethod: roleFilterMethod}}"></vxe-table-column>
          <vxe-table-column prop="age" label="InputNumber" width="140" :edit-render="{name: 'InputNumber', props: {max: 35, min: 18}}"></vxe-table-column>
          <vxe-table-column prop="sex" label="Select" width="140" :edit-render="{name: 'Select', options: sexList}"></vxe-table-column>
          <vxe-table-column prop="region" label="Cascader" width="200" :edit-render="{name: 'Cascader', props: {data: regionList}}"> </vxe-table-column>
          <vxe-table-column prop="date" label="DatePicker" width="200" :edit-render="{name: 'DatePicker', props: {type: 'date', format: 'yyyy/MM/dd'}}"></vxe-table-column>
          <vxe-table-column prop="date6" label="TimePicker" width="200" :edit-render="{name: 'TimePicker', props: {type: 'time'}}"></vxe-table-column>
          <vxe-table-column prop="flag" label="iSwitch" width="100" :edit-render="{name: 'iSwitch', type: 'visible'}"></vxe-table-column>
          <vxe-table-column prop="rate" label="Rate" width="200" fixed="right" :edit-render="{name: 'Rate', type: 'visible'}"></vxe-table-column>
        </vxe-table>

        <Page
          show-sizer
          show-total
          show-elevator
          prev-text="Previous"
          next-text="Next"
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
              sexList: [],
              regionList: [],
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
            this.findList()
            this.findSexList()
            this.findRegionList()
          },
          methods: {
            findList () {
              // 模拟后台数据
              this.loading = true
              XEAjax.doGet(\`/api/user/page/list/\${this.tablePage.pageSize}/\${this.tablePage.currentPage}\`, this.formData).then(response => {
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
              let { insertRecords, removeRecords, updateRecords } = this.$refs.xTable.getAllRecords()
              if (insertRecords.length || removeRecords.length || updateRecords.length) {
                this.$Message.success('保存成功！')
                this.searchEvent()
              } else {
                this.$Message.info('数据未改动！')
              }
            },
            dropdownMenuEvent (name) {
              switch (name) {
                case 'remove': {
                  let selectRecords = this.$refs.xTable.getSelectRecords()
                  if (selectRecords.length) {
                    this.$refs.xTable.removeSelecteds()
                  } else {
                    this.$Message.info('请至少选择一条数据！')
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
      XEAjax.doGet(`/api/user/page/list/${this.tablePage.pageSize}/${this.tablePage.currentPage}`, this.formData).then(response => {
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
      let { insertRecords, removeRecords, updateRecords } = this.$refs.xTable.getAllRecords()
      if (insertRecords.length || removeRecords.length || updateRecords.length) {
        this.$Message.success('保存成功！')
        this.searchEvent()
      } else {
        this.$Message.info('数据未改动！')
      }
    },
    dropdownMenuEvent (name) {
      switch (name) {
        case 'remove': {
          let selectRecords = this.$refs.xTable.getSelectRecords()
          if (selectRecords.length) {
            this.$refs.xTable.removeSelecteds()
          } else {
            this.$Message.info('请至少选择一条数据！')
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
