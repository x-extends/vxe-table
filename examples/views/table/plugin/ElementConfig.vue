<template>
  <div>
    <p class="tip">具体兼容请查看 <a class="link" href="https://www.npmjs.com/package/vxe-table-plugin-element" target="_blank">vxe-table-plugin-element</a> 插件的 API</p>

    <vxe-grid
      border
      show-overflow
      class="vxe-table-element"
      height="460"
      :loading="loading"
      :data="tableData"
      :columns="tableColumn"
      :edit-config="{trigger: 'click', mode: 'row'}"></vxe-grid>

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
      tableColumn: [
        { type: 'checkbox', width: 60 },
        { type: 'index', title: 'Number', width: 80 },
        { field: 'name', title: 'ElInput', minWidth: 140, editRender: { name: 'ElInput' } },
        { field: 'role', title: 'ElAutocomplete', width: 160, editRender: { name: 'ElAutocomplete', props: { fetchSuggestions: this.roleFetchSuggestions } } },
        { field: 'age', title: 'ElInputNumber', width: 160, editRender: { name: 'ElInputNumber', props: { max: 35, min: 18 } } },
        { field: 'sex', title: 'ElSelect', width: 140, editRender: { name: 'ElSelect', options: [] } },
        { field: 'sex1', title: 'ElSelect', width: 160, editRender: { name: 'ElSelect', options: [], props: { multiple: true, clearable: true } } },
        { field: 'sex2', title: 'ElSelect', width: 140, editRender: { name: 'ElSelect', optionGroups: [], props: { clearable: true } } },
        { field: 'region', title: 'ElCascader', width: 200, editRender: { name: 'ElCascader', props: { options: [] } } },
        { field: 'date', title: 'ElDatePicker', width: 200, editRender: { name: 'ElDatePicker', props: { type: 'date', format: 'yyyy/MM/dd' } } },
        { field: 'date1', title: 'DateTimePicker', width: 220, editRender: { name: 'ElDatePicker', props: { type: 'datetime', format: 'yyyy-MM-dd HH:mm:ss' } } },
        { field: 'date5', title: 'ElTimeSelect', width: 200, editRender: { name: 'ElTimeSelect', props: { pickerOptions: { start: '08:30', step: '00:15', end: '18:30' } } } },
        { field: 'flag', title: 'ElSwitch', width: 100, editRender: { name: 'ElSwitch', type: 'visible' } },
        { field: 'rate', title: 'ElRate', width: 200, editRender: { name: 'ElRate', type: 'visible' } }
      ],
      restaurants: [
        { value: '前端', name: '前端' },
        { value: '后端', name: '后端' },
        { value: '开发', name: '开发' },
        { value: '测试', name: '测试' }
      ],
      demoCodes: [
        `
        <vxe-grid
          border
          show-overflow
          class="vxe-table-element"
          height="460"
          :loading="loading"
          :data="tableData"
          :columns="tableColumn"
          :edit-config="{trigger: 'click', mode: 'row'}"></vxe-grid>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tableData: [],
              tableColumn: [
                { type: 'checkbox', width: 60 },
                { type: 'index', title: 'Number', width: 80 },
                { field: 'name', title: 'ElInput', minWidth: 140, editRender: { name: 'ElInput' } },
                { field: 'role', title: 'ElAutocomplete', width: 160, editRender: { name: 'ElAutocomplete', props: { fetchSuggestions: this.roleFetchSuggestions } } },
                { field: 'age', title: 'ElInputNumber', width: 160, editRender: { name: 'ElInputNumber', props: { max: 35, min: 18 } } },
                { field: 'sex', title: 'ElSelect', width: 140, editRender: { name: 'ElSelect', options: [] } },
                { field: 'sex1', title: 'ElSelect', width: 160, editRender: { name: 'ElSelect', options: [], props: { multiple: true, clearable: true } } },
                { field: 'sex2', title: 'ElSelect', width: 140, editRender: { name: 'ElSelect', optionGroups: [], props: { clearable: true } } },
                { field: 'region', title: 'ElCascader', width: 200, editRender: { name: 'ElCascader', props: { options: [] } } },
                { field: 'date', title: 'ElDatePicker', width: 200, editRender: { name: 'ElDatePicker', props: { type: 'date', format: 'yyyy/MM/dd' } } },
                { field: 'date1', title: 'DateTimePicker', width: 220, editRender: { name: 'ElDatePicker', props: { type: 'datetime', format: 'yyyy-MM-dd HH:mm:ss' } } },
                { field: 'date5', title: 'ElTimeSelect', width: 200, editRender: { name: 'ElTimeSelect', props: { pickerOptions: { start: '08:30', step: '00:15', end: '18:30' } } } },
                { field: 'flag', title: 'ElSwitch', width: 100, editRender: { name: 'ElSwitch', type: 'visible' } },
                { field: 'rate', title: 'ElRate', width: 200, editRender: { name: 'ElRate', type: 'visible' } }
              ],
              restaurants: [
                { value: '前端', name: '前端' },
                { value: '后端', name: '后端' },
                { value: '开发', name: '开发' },
                { value: '测试', name: '测试' }
              ]
            }
          },
          created () {
            this.loading = true
            setTimeout(() => {
              this.tableData = window.MOCK_DATA_LIST.slice(0, 10)
              this.loading = false
            }, 500)
            this.findSexList()
            this.findRegionList()
            this.findSexGroupList()
          },
          methods: {
            findSexList () {
              return XEAjax.doGet('/api/conf/sex/list').then(({ data }) => {
                this.tableColumn[5].editRender.options = data
                this.tableColumn[6].editRender.options = data
              })
            },
            findRegionList () {
              return XEAjax.doGet('/api/conf/region/list').then(({ data }) => {
                this.tableColumn[8].editRender.props.options = data
              })
            },
            findSexGroupList () {
              let sexGroupList = [
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
              this.tableColumn[7].editRender.optionGroups = sexGroupList
            },
            roleFetchSuggestions (queryString, cb) {
              var restaurants = this.restaurants
              var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
              clearTimeout(this.timeout)
              this.timeout = setTimeout(() => {
                cb(results)
              }, 1000 * Math.random())
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
    this.loading = true
    setTimeout(() => {
      this.tableData = window.MOCK_DATA_LIST.slice(0, 10)
      this.loading = false
    }, 500)
    this.findSexList()
    this.findRegionList()
    this.findSexGroupList()
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    findSexList () {
      return XEAjax.doGet('/api/conf/sex/list').then(({ data }) => {
        this.tableColumn[5].editRender.options = data
        this.tableColumn[6].editRender.options = data
      })
    },
    findRegionList () {
      return XEAjax.doGet('/api/conf/region/list').then(({ data }) => {
        this.tableColumn[8].editRender.props.options = data
      })
    },
    findSexGroupList () {
      let sexGroupList = [
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
      this.tableColumn[7].editRender.optionGroups = sexGroupList
    },
    roleFetchSuggestions (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 1000 * Math.random())
    },
    createStateFilter (queryString) {
      return (state) => {
        return (state.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    }
  }
}
</script>
