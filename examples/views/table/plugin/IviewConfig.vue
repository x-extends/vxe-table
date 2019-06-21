<template>
  <div>
    <p>具体兼容请查看 <a class="link" href="https://www.npmjs.com/package/vxe-table-plugin-iview" target="_blank">vxe-table-plugin-iview</a> 适配插件的 API</p>

    <vxe-table
      border
      show-overflow
      class="vxe-table-iview"
      height="600"
      :loading="loading"
      :data.sync="tableData"
      :edit-config="{key: 'id', trigger: 'click', mode: 'cell'}">
      <vxe-table-column type="selection" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column type="index" label="Number" width="80" fixed="left"></vxe-table-column>
      <vxe-table-column prop="name" label="Input" min-width="140" :edit-render="{name: 'Input', events: {'on-change': nameChangeEvent}}"></vxe-table-column>
      <vxe-table-column prop="role" label="AutoComplete" min-width="160" :edit-render="{name: 'AutoComplete', props: {data: restaurants, filterMethod: roleFilterMethod}}"></vxe-table-column>
      <vxe-table-column prop="age" label="InputNumber" width="140" :edit-render="{name: 'InputNumber', props: {max: 35, min: 18}}"></vxe-table-column>
      <vxe-table-column prop="sex" label="Select" width="140" :edit-render="{name: 'Select', options: sexList}"></vxe-table-column>
      <vxe-table-column prop="sex1" label="Select" width="140" :edit-render="{name: 'Select', options: sexList, props: {multiple: true, clearable: true}}"></vxe-table-column>
      <vxe-table-column prop="sex2" label="Select" width="140" :edit-render="{name: 'Select', options: sexList, optionGroups: sexGroupList, props: {clearable: true}}"></vxe-table-column>
      <vxe-table-column prop="region" label="Cascader" width="200" :edit-render="{name: 'Cascader', props: {data: regionList}, events: {'on-change': regionChangeEvent}}"> </vxe-table-column>
      <vxe-table-column prop="date" label="DatePicker" width="200" :edit-render="{name: 'DatePicker', props: {type: 'date', format: 'yyyy/MM/dd'}}"></vxe-table-column>
      <vxe-table-column prop="date2" label="TimePicker" width="200" :edit-render="{name: 'TimePicker', props: {type: 'time'}}"></vxe-table-column>
      <vxe-table-column prop="flag" label="iSwitch" width="100" :edit-render="{name: 'iSwitch', type: 'visible'}"></vxe-table-column>
      <vxe-table-column prop="rate" label="Rate" width="200" fixed="right" :edit-render="{name: 'Rate', type: 'visible'}"></vxe-table-column>
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
      sexList: [],
      regionList: [],
      restaurants: ['前端', '后端', '开发', '测试'],
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
          class="vxe-table-iview"
          height="600"
          :loading="loading"
          :data.sync="tableData"
          :edit-config="{key: 'id', trigger: 'click', mode: 'cell'}">
          <vxe-table-column type="selection" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column type="index" label="Number" width="80" fixed="left"></vxe-table-column>
          <vxe-table-column prop="name" label="Input" min-width="140" :edit-render="{name: 'Input', events: {'on-change': nameChangeEvent}}"></vxe-table-column>
          <vxe-table-column prop="role" label="AutoComplete" min-width="160" :edit-render="{name: 'AutoComplete', props: {data: restaurants, filterMethod: roleFilterMethod}}"></vxe-table-column>
          <vxe-table-column prop="age" label="InputNumber" width="140" :edit-render="{name: 'InputNumber', props: {max: 35, min: 18}}"></vxe-table-column>
          <vxe-table-column prop="sex" label="Select" width="140" :edit-render="{name: 'Select', options: sexList}"></vxe-table-column>
          <vxe-table-column prop="sex1" label="Select" width="140" :edit-render="{name: 'Select', options: sexList, props: {multiple: true, clearable: true}}"></vxe-table-column>
          <vxe-table-column prop="sex2" label="Select" width="140" :edit-render="{name: 'Select', options: sexList, optionGroups: sexGroupList, props: {clearable: true}}"></vxe-table-column>
          <vxe-table-column prop="region" label="Cascader" width="200" :edit-render="{name: 'Cascader', props: {data: regionList}, events: {'on-change': regionChangeEvent}}"> </vxe-table-column>
          <vxe-table-column prop="date" label="DatePicker" width="200" :edit-render="{name: 'DatePicker', props: {type: 'date', format: 'yyyy/MM/dd'}}"></vxe-table-column>
          <vxe-table-column prop="date2" label="TimePicker" width="200" :edit-render="{name: 'TimePicker', props: {type: 'time'}}"></vxe-table-column>
          <vxe-table-column prop="flag" label="iSwitch" width="100" :edit-render="{name: 'iSwitch', type: 'visible'}"></vxe-table-column>
          <vxe-table-column prop="rate" label="Rate" width="200" fixed="right" :edit-render="{name: 'Rate', type: 'visible'}"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tableData: [],
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 100)
          },
          methods: {
            nameChangeEvent ({ row }, event) {
              console.log(event)
            },
            regionChangeEvent ({ row }, value, selectedData) {
              console.log(value)
            },
            roleFilterMethod  (value, option) {
              return option.toUpperCase().indexOf((value || '').toUpperCase()) !== -1
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
      let list = window.MOCK_DATA_LIST.slice(0, 100)
      this.tableData = list
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
    roleFilterMethod  (value, option) {
      return option.toUpperCase().indexOf((value || '').toUpperCase()) !== -1
    },
    nameChangeEvent ({ row }, event) {
      console.log(event)
    },
    regionChangeEvent ({ row }, value, selectedData) {
      console.log(value)
    }
  }
}
</script>
