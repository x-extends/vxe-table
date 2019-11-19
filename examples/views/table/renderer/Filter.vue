<template>
  <div>
    <p class="tip">
      筛选渲染器 <table-column-api-link prop="filter-render"/><br>
      默认支持原生的：input、textarea、select<br>
      配置参数：<br>
      isFooter 是否显示底部按钮<br>
      renderFilter (h, filterRender, { column, columnIndex, $columnIndex }, context) 渲染函数<br>
      filterMethod ({ option, row, column }) 筛选函数<br>
      <span class="red">（注：实际开发中应该将业务封装成一个组件，不要把复杂的渲染逻辑写在渲染器中）</span>
    </p>

    <vxe-table border :data="tableData">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column
        field="nickname"
        title="Nickname"
        :filters="[{data: null}]"
        :filter-render="{name: 'input', attrs: {placeholder: '请输入名字'}}"></vxe-table-column>
      <vxe-table-column
        field="sex"
        title="sex"
        :filters="[{data: null}]"
        :filter-render="{name: 'select', options: sexList}"></vxe-table-column>
      <vxe-table-column
        field="age"
        title="Age"
        :filters="[{data: null}]"
        :filter-render="{name: 'MyFilter'}"></vxe-table-column>
      <vxe-table-column
        field="name"
        title="高级筛选（实现复杂的筛选）"
        :filters="[{data: {type: 'has', isCase: true, name: ''}}]"
        :filter-render="{name: 'MyComplexFilter'}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="javascript">{{ demoCodes[0] }}</code>
      <code class="xml">{{ demoCodes[1] }}</code>
      <code class="javascript">{{ demoCodes[2] }}</code>
      <code class="CSS">{{ demoCodes[3] }}</code>
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
        // 创建一个支持输入的筛选器（仅用于简单示例，实际开发中应该封装成一个组件，不应该把复杂的渲染逻辑写在渲染器中）
        VXETable.renderer.add('MyFilter', {
          // 筛选模板
          renderFilter (h, filterRender, params, context) {
            let { column } = params
            return column.filters.map(item => {
              return <input
                type="text"
                value={ item.data }
                onInput={ evnt => {
                  item.data = evnt.target.value
                  let checked = !!item.data
                  context.changeOption(evnt, checked, item)
                } }/>
            })
          },
          // 筛选方法
          filterMethod ({ option, row, column }) {
            let { data } = option
            let cellValue = XEUtils.get(row, column.property)
            /* eslint-disable eqeqeq */
            return cellValue == data
          }
        })

        // 创建一个复杂的渲染器（仅用于简单示例，实际开发中应该封装成一个组件，不应该把复杂的渲染逻辑写在渲染器中）
        VXETable.renderer.add('MyComplexFilter', {
          // 不显示底部按钮，使用自定义的按钮
          isFooter: false,
          // 筛选模板
          renderFilter (h, filterRender, params, context) {
            const { column } = params
            return column.filters.map((item, index) => {
              const { data } = item
              return <div class="cmplex-filter">
                <div class="f-type">
                  <vxe-radio v-model={ data.type } name="fType" label="has">包含</vxe-radio>
                  <vxe-radio v-model={ data.type } name="fType" label="eq">等于</vxe-radio>
                  <vxe-radio v-model={ data.type } name="fType" label="gt">大于</vxe-radio>
                  <vxe-radio v-model={ data.type } name="fType" label="lt">小于</vxe-radio>
                </div>
                <div class="f-name">
                  <vxe-input v-model={ data.name } type="text" placeholder="请输入名称" onInput={ e => { context.changeOption(e, !!data.name, item) } }></vxe-input>
                </div>
                <div class="f-iscase">
                  <vxe-checkbox v-model={ data.isCase }>不区分大小写</vxe-checkbox>
                </div>
                <div class="f-footer">
                  <vxe-button type="primary" onClick={ e => { context.confirmFilter() } }>确认</vxe-button>
                  <vxe-button onClick={ e => { context.resetFilter() } }>重置</vxe-button>
                </div>
              </div>
            })
          },
          // 筛选方法
          filterMethod ({ option, row, column }) {
            let cellValue = XEUtils.get(row, column.property)
            let { type, name, isCase } = option.data
            if (cellValue) {
              if (isCase) {
                cellValue = cellValue.toLowerCase()
                name = name.toLowerCase()
              }
              switch (type) {
                case 'has':
                  return cellValue.indexOf(name) > -1
                case 'eq':
                  /* eslint-disable eqeqeq */
                  return cellValue == name
                case 'gt':
                  return cellValue > name
                case 'lt':
                  return cellValue < name
              }
            }
            return false
          }
        })
        `,
        `
        <<vxe-table border :data="tableData">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column
            field="nickname"
            title="Nickname"
            :filters="[{data: null}]"
            :filter-render="{name: 'input', attrs: {placeholder: '请输入名字'}}"></vxe-table-column>
          <vxe-table-column
            field="sex"
            title="sex"
            :filters="[{data: null}]"
            :filter-render="{name: 'select', options: sexList}"></vxe-table-column>
          <vxe-table-column
            field="age"
            title="Age"
            :filters="[{data: null}]"
            :filter-render="{name: 'MyFilter'}"></vxe-table-column>
          <vxe-table-column
            field="name"
            title="高级筛选（实现复杂的筛选）"
            :filters="[{data: {type: 'has', isCase: true, name: ''}}]"
            :filter-render="{name: 'MyComplexFilter'}"></vxe-table-column>
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
        `,
        `
        .cmplex-filter .f-type {
          padding: 8px 8px 12px 2px;
        }
        .cmplex-filter .f-iscase {
          padding: 12px 8px 6px 2px;
        }
        .cmplex-filter .f-footer {
          text-align: center;
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

<style>
.cmplex-filter .f-type {
  padding: 8px 8px 12px 2px;
}
.cmplex-filter .f-iscase {
  padding: 12px 8px 6px 2px;
}
.cmplex-filter .f-footer {
  text-align: center;
}
</style>
