<template>
  <div>
    <p class="tip">完整示例</p>

    <vxe-table
      border
      stripe
      resizable
      highlight-hover-row
      height="500"
      :loading="loading"
      :checkbox-config="{labelField: 'id', highlight: true, range: true}"
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column type="checkbox" title="ID" width="140"></vxe-table-column>
      <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :filters="sexList" :filter-multiple="false" :formatter="formatterSex"></vxe-table-column>
      <vxe-table-column
        field="age"
        title="Age"
        sortable
        :filters="[{label: '大于16岁', value: 16}, {label: '大于26岁', value: 26}, {label: '大于30岁', value: 30}]"
        :filter-method="filterAgeMethod"></vxe-table-column>
      <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      loading: false,
      tableData: [],
      sexList: [
        {
          label: '女',
          value: '0'
        },
        {
          label: '男',
          value: '1'
        }
      ],
      demoCodes: [
        `
        <vxe-table
          border
          stripe
          resizable
          highlight-hover-row
          height="500"
          :loading="loading"
          :checkbox-config="{labelField: 'id', highlight: true, range: true}"
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column type="checkbox" title="ID" width="140"></vxe-table-column>
          <vxe-table-column field="name" title="Name" sortable></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :filters="sexList" :filter-multiple="false" :formatter="formatterSex"></vxe-table-column>
          <vxe-table-column
            field="age"
            title="Age"
            sortable
            :filters="[{label: '大于16岁', value: 16}, {label: '大于26岁', value: 26}, {label: '大于30岁', value: 30}]"
            :filter-method="filterAgeMethod"></vxe-table-column>
          <vxe-table-column field="address" title="Address" show-overflow></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              loading: false,
              tableData: [],
              sexList: [
                {
                  label: '女',
                  value: '0'
                },
                {
                  label: '男',
                  value: '1'
                }
              ]
            }
          },
          created () {
            this.loading = true
            setTimeout(() => {
              this.tableData = window.MOCK_DATA_LIST.slice(0, 15)
              this.loading = false
            }, 500)
          },
          methods: {
            formatterSex ({ cellValue }) {
              let item = this.sexList.find(item => item.value === cellValue)
              return item ? item.label : ''
            },
            filterAgeMethod ({ value, row, column }) {
              return row.age >= value
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
      this.tableData = window.MOCK_DATA_LIST.slice(0, 15)
      this.loading = false
    }, 500)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    formatterSex ({ cellValue }) {
      const item = this.sexList.find(item => item.value === cellValue)
      return item ? item.label : ''
    },
    filterAgeMethod ({ value, row }) {
      return row.age >= value
    }
  }
}
</script>
