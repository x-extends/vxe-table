<template>
  <div>
    <p>具体查看 <a class="link" href="https://www.npmjs.com/package/vxe-table-plugin-antd" target="_blank">vxe-table-plugin-antd</a> 适配插件</p>

    <vxe-table
      border
      show-all-overflow
      class="vxe-table-antd"
      height="600"
      :loading="loading"
      :data.sync="tableData"
      :edit-config="{key: 'id', trigger: 'click', mode: 'cell'}">
      <vxe-table-column type="selection" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column type="index" label="Number" width="80" fixed="left"></vxe-table-column>
      <vxe-table-column prop="name" label="AInput" min-width="140" :edit-render="{name: 'AInput', events: {change: nameChangeEvent}}"></vxe-table-column>
      <vxe-table-column prop="role" label="AAutoComplete" width="160" :edit-render="{name: 'AAutoComplete', props: {dataSource}, events: {search: roleSearchEvent}}"></vxe-table-column>
      <vxe-table-column prop="age" label="AInputNumber" width="160" :edit-render="{name: 'AInputNumber', props: {max: 35, min: 18}}"></vxe-table-column>
      <vxe-table-column prop="sex" label="ASelect" width="140" :edit-render="{name: 'ASelect', options: sexList}"></vxe-table-column>
      <vxe-table-column prop="sex1" label="ASelect" width="160" :edit-render="{name: 'ASelect', options: sexList, props: {mode: 'multiple'}}"></vxe-table-column>
      <vxe-table-column prop="sex2" label="ASelect" width="140" :edit-render="{name: 'ASelect', optionGroups: sexGroupList}"></vxe-table-column>
      <vxe-table-column prop="region" label="ACascader" width="200" :edit-render="{name: 'ACascader', props: {options: regionList}, events: {change: regionChangeEvent}}"></vxe-table-column>
      <vxe-table-column prop="date7" label="ADatePicker" width="200" :edit-render="{name: 'ADatePicker', props: {type: 'date', format: 'YYYY/MM/DD'}}"></vxe-table-column>
      <vxe-table-column prop="flag" label="ASwitch" width="100" :edit-render="{name: 'ASwitch', type: 'visible'}"></vxe-table-column>
      <vxe-table-column prop="rate" label="ARate" width="200" fixed="right" :edit-render="{name: 'ARate', type: 'visible'}"></vxe-table-column>
    </vxe-table>

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
      demoCodes: [
        `
        <vxe-table
          border
          show-all-overflow
          class="vxe-table-antd"
          height="600"
          :loading="loading"
          :data.sync="tableData"
          :edit-config="{key: 'id', trigger: 'click', mode: 'cell'}">
          <vxe-table-column type="selection" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column type="index" label="Number" width="80" fixed="left"></vxe-table-column>
          <vxe-table-column prop="name" label="AInput" min-width="140" :edit-render="{name: 'AInput', events: {change: nameChangeEvent}}"></vxe-table-column>
          <vxe-table-column prop="role" label="AAutoComplete" width="160" :edit-render="{name: 'AAutoComplete', props: {dataSource}, events: {search: roleSearchEvent}}"></vxe-table-column>
          <vxe-table-column prop="age" label="AInputNumber" width="160" :edit-render="{name: 'AInputNumber', props: {max: 35, min: 18}}"></vxe-table-column>
          <vxe-table-column prop="sex" label="ASelect" width="140" :edit-render="{name: 'ASelect', options: sexList}"></vxe-table-column>
          <vxe-table-column prop="sex1" label="ASelect" width="160" :edit-render="{name: 'ASelect', options: sexList, props: {mode: 'multiple'}}"></vxe-table-column>
          <vxe-table-column prop="sex2" label="ASelect" width="140" :edit-render="{name: 'ASelect', optionGroups: sexGroupList}"></vxe-table-column>
          <vxe-table-column prop="region" label="ACascader" width="200" :edit-render="{name: 'ACascader', props: {options: regionList}, events: {change: regionChangeEvent}}"></vxe-table-column>
          <vxe-table-column prop="date7" label="ADatePicker" width="200" :edit-render="{name: 'ADatePicker', props: {type: 'date', format: 'YYYY/MM/DD'}}"></vxe-table-column>
          <vxe-table-column prop="flag" label="ASwitch" width="100" :edit-render="{name: 'ASwitch', type: 'visible'}"></vxe-table-column>
          <vxe-table-column prop="rate" label="ARate" width="200" fixed="right" :edit-render="{name: 'ARate', type: 'visible'}"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tableData: [],
              dataSource: [],
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
              ]
            }
          },
          created () {
            this.loading = true
            setTimeout(() => {
              this.tableData = window.MOCK_DATA_LIST.slice(0, 100)
              this.loading = false
            }, 500)
            this.findSexList()
            this.findRegionList()
          },
          methods: {
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
            },
            nameChangeEvent ({ row }, value) {
              console.log(value)
            },
            regionChangeEvent ({ row }, value) {
              console.log(value)
            }
          }
        }
        `
      ]
    }
  },
  created () {
    this.loading = true
    setTimeout(() => {
      this.tableData = window.MOCK_DATA_LIST.slice(0, 100)
      this.loading = false
    }, 500)
    this.findSexList()
    this.findRegionList()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
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
    },
    nameChangeEvent ({ row }, value) {
      console.log(value)
    },
    regionChangeEvent ({ row }, value) {
      console.log(value)
    }
  }
}
</script>
