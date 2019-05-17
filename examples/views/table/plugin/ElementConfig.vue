<template>
  <div>
    <p>使用 vxe-table-plugin-element 配置式的插件，并加上 class=vxe-table-element 或者自行实现样式调整</p>

    <pre>
      <code class="javascript">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p>配置如下</p>

    <vxe-table
      border
      class="vxe-table-element"
      height="600"
      :loading="loading"
      :data.sync="tableData"
      :edit-config="{trigger: 'click', mode: 'cell'}">
      <vxe-table-column type="selection" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column type="index" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column prop="name" label="ElInput" min-width="140" :edit-render="{name: 'ElInput', events: {change: nameChangeEvent}}"></vxe-table-column>
      <vxe-table-column prop="age" label="ElInputNumber" width="160" :edit-render="{name: 'ElInputNumber', props: {max: 35, min: 18}}"></vxe-table-column>
      <vxe-table-column prop="sex" label="ElSelect" width="140" :edit-render="{name: 'ElSelect', options: sexList}"></vxe-table-column>
      <vxe-table-column prop="sex1" label="ElSelect" width="140" :edit-render="{name: 'ElSelect', options: sexList, props: {multiple: true, clearable: true}}"></vxe-table-column>
      <vxe-table-column prop="sex2" label="ElSelect" width="140" :edit-render="{name: 'ElSelect', optionGroups: sexGroupList, props: {clearable: true}}"></vxe-table-column>
      <vxe-table-column prop="region" label="ElCascader" width="200" :edit-render="{name: 'ElCascader', props: {options: regionList}, events: {change: regionChangeEvent}}"></vxe-table-column>
      <vxe-table-column prop="date" label="ElDatePicker" width="200" :edit-render="{name: 'ElDatePicker', props: {type: 'date', format: 'yyyy/MM/dd'}}"></vxe-table-column>
      <vxe-table-column prop="date1" label="DateTimePicker" width="220" :edit-render="{name: 'ElDatePicker', props: {type: 'datetime', format: 'yyyy-MM-dd HH:mm:ss'}}"></vxe-table-column>
      <vxe-table-column prop="date5" label="ElTimeSelect" width="200" :edit-render="{name: 'ElTimeSelect', props: {pickerOptions: {start: '08:30', step: '00:15', end: '18:30'}}}"></vxe-table-column>
      <vxe-table-column prop="flag" label="ElSwitch" width="100" :edit-render="{name: 'ElSwitch', type: 'visible'}"></vxe-table-column>
      <vxe-table-column prop="rate" label="ElRate" width="200" fixed="right" :edit-render="{name: 'ElRate', type: 'visible'}"></vxe-table-column>
    </vxe-table>

    <p>调用代码</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
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
        npm install vxe-table-plugin-element
        `,
        `
        import Vue from 'vue'
        import VXETable from 'vxe-table'
        import VXETablePluginElement from 'vxe-table-plugin-element'
        import 'vxe-table-plugin-element/dist/style.css'

        Vue.use(VXETable, VXETablePluginElement)
        `,
        `
        <vxe-table
          border
          class="vxe-table-element"
          height="600"
          :loading="loading"
          :data.sync="tableData"
          :edit-config="{trigger: 'click', mode: 'cell'}">
          <vxe-table-column type="selection" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column type="index" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column prop="name" label="ElInput" min-width="140" :edit-render="{name: 'ElInput', events: {change: nameChangeEvent}}"></vxe-table-column>
          <vxe-table-column prop="age" label="ElInputNumber" width="160" :edit-render="{name: 'ElInputNumber', props: {max: 35, min: 18}}"></vxe-table-column>
          <vxe-table-column prop="sex" label="ElSelect" width="140" :edit-render="{name: 'ElSelect', options: sexList}"></vxe-table-column>
          <vxe-table-column prop="sex1" label="ElSelect" width="140" :edit-render="{name: 'ElSelect', options: sexList, props: {multiple: true, clearable: true}}"></vxe-table-column>
          <vxe-table-column prop="sex2" label="ElSelect" width="140" :edit-render="{name: 'ElSelect', optionGroups: sexGroupList, props: {clearable: true}}"></vxe-table-column>
          <vxe-table-column prop="region" label="ElCascader" width="200" :edit-render="{name: 'ElCascader', props: {options: regionList}, events: {change: regionChangeEvent}}"></vxe-table-column>
          <vxe-table-column prop="date" label="ElDatePicker" width="200" :edit-render="{name: 'ElDatePicker', props: {type: 'date', format: 'yyyy/MM/dd'}}"></vxe-table-column>
          <vxe-table-column prop="date1" label="DateTimePicker" width="220" :edit-render="{name: 'ElDatePicker', props: {type: 'datetime', format: 'yyyy-MM-dd HH:mm:ss'}}"></vxe-table-column>
          <vxe-table-column prop="date2" label="ElTimeSelect" width="200" :edit-render="{name: 'ElTimeSelect', props: {pickerOptions: {start: '08:30', step: '00:15', end: '18:30'}}}"></vxe-table-column>
          <vxe-table-column prop="flag" label="ElSwitch" width="100" :edit-render="{name: 'ElSwitch', type: 'visible'}"></vxe-table-column>
          <vxe-table-column prop="rate" label="ElRate" width="200" fixed="right" :edit-render="{name: 'ElRate', type: 'visible'}"></vxe-table-column>
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
    nameChangeEvent ({ row }, value) {
      console.log(value)
    },
    regionChangeEvent ({ row }, value) {
      console.log(value)
    }
  }
}
</script>
