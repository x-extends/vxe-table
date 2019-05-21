<template>
  <div>
    <p>iview 使用首页</p>

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

    <vxe-table
      border
      show-all-overflow
      class="vxe-table-iview"
      height="460"
      size="small"
      :loading="loading"
      :data.sync="tableData"
      :edit-config="{trigger: 'click', mode: 'row'}">
      <vxe-table-column type="selection" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column type="index" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column prop="name" label="Input" min-width="140" :edit-render="{name: 'Input'}"></vxe-table-column>
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
      :total="pageVO.totalResult"
      :current.sync="pageVO.currentPage"
      @on-page-size-change="handleSizeChange"
      @on-change="handleCurrentChange"/>

    <p class="demo-code">显示代码</p>

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

        <vxe-table
          border
          show-all-overflow
          class="vxe-table-iview"
          height="460"
          size="small"
          :loading="loading"
          :data.sync="tableData"
          :edit-config="{trigger: 'click', mode: 'row'}">
          <vxe-table-column type="selection" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column type="index" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column prop="name" label="Input" min-width="140" :edit-render="{name: 'Input'}"></vxe-table-column>
          <vxe-table-column prop="age" label="InputNumber" width="140" :edit-render="{name: 'InputNumber', props: {max: 35, min: 18}}"></vxe-table-column>
          <vxe-table-column prop="sex" label="Select" width="140" :edit-render="{name: 'Select', options: sexList}"></vxe-table-column>
          <vxe-table-column prop="region" label="Cascader" width="200" :edit-render="{name: 'Cascader', props: {data: regionList}}"> </vxe-table-column>
          <vxe-table-column prop="date" label="DatePicker" width="200" :edit-render="{name: 'DatePicker', props: {type: 'date', format: 'yyyy/MM/dd'}}"></vxe-table-column>
          <vxe-table-column prop="date2" label="TimePicker" width="200" :edit-render="{name: 'TimePicker', props: {type: 'time'}}"></vxe-table-column>
          <vxe-table-column prop="flag" label="iSwitch" width="100" :edit-render="{name: 'iSwitch', type: 'visible'}"></vxe-table-column>
          <vxe-table-column prop="rate" label="Rate" width="200" fixed="right" :edit-render="{name: 'Rate', type: 'visible'}"></vxe-table-column>
        </vxe-table>

        <Page
          show-sizer
          show-total
          show-elevator
          prev-text="Previous"
          next-text="Next"
          :total="pageVO.totalResult"
          :current.sync="pageVO.currentPage"
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
      this.pendingRemoveList = []
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
    }
  }
}
</script>
