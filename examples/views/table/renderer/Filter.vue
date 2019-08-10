<template>
  <div>
    <p>筛选渲染器 <table-column-api-link prop="filter-render"/></p>
    <h3>默认支持原生的：input、textarea、select</h3>
    <h3>配置参数：</h3>
    <p class="green">renderFilter (h, filterRender, { column, columnIndex, $columnIndex }, context) 渲染函数</p>
    <p class="green">filterMethod ({ option, row, column }) 筛选函数</p>

    <vxe-table
      border
      :data.sync="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :filters="[{data: null}]" :filter-render="{name: 'input', attrs: {placeholder: '请输入名字'}}"></vxe-table-column>
      <vxe-table-column field="sex" title="sex" :filters="[{data: null}]" :filter-render="{name: 'select', options: sexList}"></vxe-table-column>
      <vxe-table-column field="age" title="Age" :filters="[{data: null}]" :filter-render="{name: 'MyFilter'}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="javascript">{{ demoCodes[0] }}</code>
      <code class="xml">{{ demoCodes[1] }}</code>
      <code class="javascript">{{ demoCodes[2] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'
import '@/plugins/xtable/renderer/filter'

export default {
  data  () {
    return {
      tableData: [],
      sexList: [
        {
          label: '全部',
          value: ''
        },
        {
          label: '男',
          value: '1'
        },
        {
          label: '女',
          value: '0'
        }
      ],
      demoCodes: [
        `
        // 创建一个支持输入的筛选器
        VXETable.renderer.add('MyFilter', {
          // 筛选模板
          renderFilter (h, filterRender, params, context) {
            let { column } = params
            return column.filters.map(item => {
              return h('input', {
                attrs: {
                  type: 'text'
                },
                domProps: {
                  value: item.data
                },
                on: {
                  input (evnt) {
                    item.data = evnt.target.value
                    let checked = !!item.data
                    context.changeOption(evnt, checked, item)
                  }
                }
              })
            })
          },
          // 筛选方法
          filterMethod ({ option, row, column }) {
            let { data } = option
            let cellValue = XEUtils.get(row, column.property)
            return cellValue == data
          }
        })
        `,
        `
        <vxe-table
          border
          :data.sync="tableData">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :filters="[{data: null}]" :filter-render="{name: 'input', attrs: {placeholder: '请输入名字'}}"></vxe-table-column>
          <vxe-table-column field="sex" title="sex" :filters="[{data: null}]" :filter-render="{name: 'select', options: sexList}"></vxe-table-column>
          <vxe-table-column field="age" title="Age" :filters="[{data: null}]" :filter-render="{name: 'MyFilter'}"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [],
              sexList: [
                {
                  label: '全部',
                  value: ''
                },
                {
                  label: '男',
                  value: '1'
                },
                {
                  label: '女',
                  value: '0'
                }
              ]
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 6)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
