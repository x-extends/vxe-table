<template>
  <div>
    <p>具体兼容请查看 <a class="link" href="https://www.npmjs.com/package/vxe-table-plugin-antd" target="_blank">vxe-table-plugin-antd</a> 适配插件的 API</p>

    <vxe-table
      border
      show-overflow
      class="vxe-table-antd"
      height="460"
      :loading="loading"
      :data.sync="tableData"
      :edit-config="{key: 'id', trigger: 'click', mode: 'cell'}">
      <vxe-table-column type="selection" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column type="index" label="Number" width="80" fixed="left"></vxe-table-column>
      <vxe-table-column prop="name" label="AInput" min-width="140" :edit-render="{name: 'AInput', events: {change: nameChangeEvent}}"></vxe-table-column>
      <vxe-table-column prop="role" label="AAutoComplete" width="160" :edit-render="{name: 'AAutoComplete', props: ACProps, events: {search: roleSearchEvent}}"></vxe-table-column>
      <vxe-table-column prop="age" label="AInputNumber" width="160" :edit-render="{name: 'AInputNumber', props: {max: 35, min: 18}}"></vxe-table-column>
      <vxe-table-column prop="sex" label="ASelect" width="140" :edit-render="{name: 'ASelect', options: sexList}"></vxe-table-column>
      <vxe-table-column prop="sex1" label="ASelect" width="160" :edit-render="{name: 'ASelect', options: sexList, props: {mode: 'multiple'}}"></vxe-table-column>
      <vxe-table-column prop="sex2" label="ASelect" width="140" :edit-render="{name: 'ASelect', optionGroups: sexGroupList}"></vxe-table-column>
      <vxe-table-column prop="region" label="ACascader" width="200" :edit-render="{name: 'ACascader', props: {options: regionList}, events: {change: regionChangeEvent}}"></vxe-table-column>
      <vxe-table-column prop="date7" label="ADatePicker" width="140" :edit-render="{name: 'ADatePicker', props: {type: 'date', format: 'YYYY/MM/DD'}}"></vxe-table-column>
      <vxe-table-column prop="date8" label="AMonthPicker" width="140" :edit-render="{name: 'AMonthPicker'}"></vxe-table-column>
      <vxe-table-column prop="date9" label="AWeekPicker" width="140" :edit-render="{name: 'AWeekPicker'}"></vxe-table-column>
      <vxe-table-column prop="date11" label="ARangePicker" width="240" :edit-render="{name: 'ARangePicker'}"></vxe-table-column>
      <vxe-table-column prop="date10" label="ATimePicker" width="140" :edit-render="{name: 'ATimePicker'}"></vxe-table-column>
      <vxe-table-column prop="attr1" label="ATreeSelect" width="140" :edit-render="{name: 'ATreeSelect', props: {treeData}}"></vxe-table-column>
      <vxe-table-column prop="attr2" label="ATreeSelect" width="140" :edit-render="{name: 'ATreeSelect', props: {treeData, treeCheckable: true}}"></vxe-table-column>
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
      restaurants: ['前端', '后端', '开发', '测试'],
      ACProps: {
        dataSource: []
      },
      sexList: [],
      regionList: [],
      treeData: [{
        title: 'Node1',
        value: '0-0',
        key: '0-0',
        children: [{
          title: 'Child Node1',
          value: '0-0-0',
          key: '0-0-0'
        }]
      }, {
        title: 'Node2',
        value: '0-1',
        key: '0-1',
        children: [{
          title: 'Child Node3',
          value: '0-1-0',
          key: '0-1-0',
          disabled: true
        }, {
          title: 'Child Node4',
          value: '0-1-1',
          key: '0-1-1'
        }, {
          title: 'Child Node5',
          value: '0-1-2',
          key: '0-1-2'
        }]
      }],
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
          show-overflow
          class="vxe-table-antd"
          height="460"
          :loading="loading"
          :data.sync="tableData"
          :edit-config="{key: 'id', trigger: 'click', mode: 'cell'}">
          <vxe-table-column type="selection" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column type="index" label="Number" width="80" fixed="left"></vxe-table-column>
          <vxe-table-column prop="name" label="AInput" min-width="140" :edit-render="{name: 'AInput', events: {change: nameChangeEvent}}"></vxe-table-column>
          <vxe-table-column prop="role" label="AAutoComplete" width="160" :edit-render="{name: 'AAutoComplete', props: ACProps, events: {search: roleSearchEvent}}"></vxe-table-column>
          <vxe-table-column prop="age" label="AInputNumber" width="160" :edit-render="{name: 'AInputNumber', props: {max: 35, min: 18}}"></vxe-table-column>
          <vxe-table-column prop="sex" label="ASelect" width="140" :edit-render="{name: 'ASelect', options: sexList}"></vxe-table-column>
          <vxe-table-column prop="sex1" label="ASelect" width="160" :edit-render="{name: 'ASelect', options: sexList, props: {mode: 'multiple'}}"></vxe-table-column>
          <vxe-table-column prop="sex2" label="ASelect" width="140" :edit-render="{name: 'ASelect', optionGroups: sexGroupList}"></vxe-table-column>
          <vxe-table-column prop="region" label="ACascader" width="200" :edit-render="{name: 'ACascader', props: {options: regionList}, events: {change: regionChangeEvent}}"></vxe-table-column>
          <vxe-table-column prop="date7" label="ADatePicker" width="140" :edit-render="{name: 'ADatePicker', props: {type: 'date', format: 'YYYY/MM/DD'}}"></vxe-table-column>
          <vxe-table-column prop="date8" label="AMonthPicker" width="140" :edit-render="{name: 'AMonthPicker'}"></vxe-table-column>
          <vxe-table-column prop="date9" label="AWeekPicker" width="140" :edit-render="{name: 'AWeekPicker'}"></vxe-table-column>
          <vxe-table-column prop="date11" label="ARangePicker" width="240" :edit-render="{name: 'ARangePicker'}"></vxe-table-column>
          <vxe-table-column prop="date10" label="ATimePicker" width="140" :edit-render="{name: 'ATimePicker'}"></vxe-table-column>
          <vxe-table-column prop="attr1" label="ATreeSelect" width="140" :edit-render="{name: 'ATreeSelect', props: {treeData}}"></vxe-table-column>
          <vxe-table-column prop="attr2" label="ATreeSelect" width="140" :edit-render="{name: 'ATreeSelect', props: {treeData, treeCheckable: true}}"></vxe-table-column>
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
              this.ACProps.dataSource = this.restaurants.filter(option => option.toUpperCase().indexOf((value || '').toUpperCase()) !== -1)
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
      this.ACProps.dataSource = this.restaurants.filter(option => option.toUpperCase().indexOf((value || '').toUpperCase()) !== -1)
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
