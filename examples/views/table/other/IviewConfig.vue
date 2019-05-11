<template>
  <div>
    <p>使用 vxe-table-plugin-iview 配置式的插件，并加上 class=vxe-table-iview 或者自行实现样式调整</p>

    <pre>
      <code class="javascript">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p>配置如下</p>

    <vxe-table
      border
      class="vxe-table-iview"
      height="600"
      :loading="loading"
      :data.sync="tableData"
      :edit-config="{trigger: 'click', mode: 'cell'}">
      <vxe-table-column type="selection" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column type="index" width="60" fixed="left"></vxe-table-column>
      <vxe-table-column prop="name" label="Input" min-width="140" :edit-render="{name: 'Input'}"></vxe-table-column>
      <vxe-table-column prop="age" label="InputNumber" width="140" :edit-render="{name: 'InputNumber', props: {max: 35, min: 18}}"></vxe-table-column>
      <vxe-table-column prop="sex" label="Select" width="140" :edit-render="{name: 'Select', options: sexList}"></vxe-table-column>
      <vxe-table-column prop="region" label="Cascader" width="200" :edit-render="{name: 'Cascader', props: {data: regionList}}"> </vxe-table-column>
      <vxe-table-column prop="date" label="DatePicker" width="200" :edit-render="{name: 'DatePicker', props: {type: 'date', format: 'yyyy/MM/dd'}}"></vxe-table-column>
      <vxe-table-column prop="date2" label="TimePicker" width="200" :edit-render="{name: 'TimePicker', props: {type: 'time'}}"></vxe-table-column>
      <vxe-table-column prop="rate" label="Rate" width="200" :edit-render="{name: 'Rate', type: 'visible'}"></vxe-table-column>
      <vxe-table-column prop="flag" label="iSwitch" width="100" fixed="right" :edit-render="{name: 'iSwitch', type: 'visible'}"></vxe-table-column>
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
      demoCodes: [
        `
        npm install vxe-table-plugin-element
        `,
        `
        import VXETable from 'vxe-table'
        import VXETablePluginIView from 'vxe-table-plugin-iview'
        import 'vxe-table-plugin-iview/dist/style.css'

        VXETable.setup(VXETablePluginIView)
        `,
        `
        <vxe-table
          border
          show-footer
          class="vxe-table-iview"
          height="600"
          :loading="loading"
          :data.sync="tableData"
          :footer-method="footerMethod"
          :edit-config="{trigger: 'click', mode: 'cell'}">
          <vxe-table-column type="selection" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column type="index" width="60" fixed="left"></vxe-table-column>
          <vxe-table-column prop="name" label="Input"  min-width="140" :edit-render="{name: 'Input'}"></vxe-table-column>
          <vxe-table-column prop="age" label="InputNumber"  width="140" :edit-render="{name: 'InputNumber', props: {max: 35, min: 18}}"></vxe-table-column>
          <vxe-table-column prop="sex" label="Select"  width="140" :edit-render="{name: 'Select', options: sexList}"></vxe-table-column>
          <vxe-table-column prop="region" label="Cascader"  width="200" :edit-render="{name: 'Cascader', props: {data: regionList}}"> </vxe-table-column>
          <vxe-table-column prop="date" label="DatePicker"  width="200" :edit-render="{name: 'DatePicker', props: {type: 'date', format: 'yyyy/MM/dd'}}"></vxe-table-column>
          <vxe-table-column prop="date2" label="TimePicker"  width="200" :edit-render="{name: 'TimePicker', props: {type: 'time'}}"></vxe-table-column>
          <vxe-table-column prop="rate" label="Rate" width="200" :edit-render="{name: 'Rate', type: 'visible'}"></vxe-table-column>
          <vxe-table-column prop="flag" label="iSwitch" width="100" fixed="right" :edit-render="{name: 'iSwitch', type: 'visible'}"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tableData: [],
              sexList: [],
              regionList: []
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 100)
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
    this.$el.querySelectorAll('pre code').forEach((block) => {
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
    }
  }
}
</script>
