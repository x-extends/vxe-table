<template>
  <div>
    <p class="tip">
      筛选渲染器 <table-column-api-link prop="filter-render"/>，查看 <a class="link" href="https://github.com/xuliangzhan/vxe-table/tree/master/examples/plugins/xtable/renderer">示例的源码</a><br>
      配置参数：<br>
      className 自定义容器的 className<br>
      isFooter 是否显示底部按钮<br>
      renderFilter (h, renderOpts, <vxe-tooltip content="{ column, $panel }" enterable><i class="fa fa-question-circle"></i></vxe-tooltip>params) 内容<br>
      filterMethod (<vxe-tooltip content="{ option, row, column }" enterable><i class="fa fa-question-circle"></i></vxe-tooltip>params) 筛选函数<br>
    </p>

    <vxe-table border height="400" :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column
        field="nickname"
        title="Nickname"
        :filters="[{data: null}]"
        :filter-render="{name: 'input', attrs: {placeholder: '请输入名字'}}"></vxe-table-column>
      <vxe-table-column
        field="sex"
        title="sex"
        :filters="[{data: null}]"
        :filter-render="{name: '$select', options: sexList}"></vxe-table-column>
        <vxe-table-column
        field="name"
        title="实现条件的筛选"
        :filters="[{data: {type: 'has', isCase: true, name: ''}}]"
        :filter-render="{name: 'FilterComplex'}"></vxe-table-column>
      <vxe-table-column
        field="age"
        title="实现内容的筛选"
        :filters="[{data: {vals: [], sVal: ''}}]"
        :filter-render="{name: 'FilterContent'}"></vxe-table-column>
      <vxe-table-column
        field="role"
        title="实现Excel复杂的筛选"
        sortable
        :filters="[{data: {vals: [], sVal: '', fMenu: '', f1Type:'', f1Val: '', fMode: 'and', f2Type: '', f2Val: ''}}]"
        :filter-render="{name: 'FilterExcel'}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="javascript">{{ demoCodes[0] }}</code>
      <code class="xml">{{ demoCodes[1] }}</code>
      <code class="css">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
      <code class="xml">{{ demoCodes[4] }}</code>
      <code class="javascript">{{ demoCodes[5] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

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
        // 创建一个复杂的渲染器（仅用于简单示例，实际开发中应该封装成一个组件，不应该把复杂的渲染逻辑写在渲染器中）
        VXETable.renderer.add('FilterComplex', {
          // 不显示底部按钮，使用自定义的按钮
          isFooter: false,
          // 筛选模板
          renderFilter (h, renderOpts, params) {
            return [
              <filter-complex params={ params }></filter-complex>
            ]
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
        <div>
          <div class="cmplex-filter">
            <div class="f-type">
              <vxe-radio v-model="option.data.type" name="fType" label="has">包含</vxe-radio>
              <vxe-radio v-model="option.data.type" name="fType" label="eq">等于</vxe-radio>
              <vxe-radio v-model="option.data.type" name="fType" label="gt">大于</vxe-radio>
              <vxe-radio v-model="option.data.type" name="fType" label="lt">小于</vxe-radio>
            </div>
            <div class="f-name">
              <vxe-input v-model="option.data.name" type="text" placeholder="请输入名称" @input="changeOptionEvent()"></vxe-input>
            </div>
            <div class="f-iscase">
              <vxe-checkbox v-model="option.data.isCase">不区分大小写</vxe-checkbox>
            </div>
            <div class="f-footer">
              <vxe-button status="primary" @click="confirmEvent">确认</vxe-button>
              <vxe-button @click="resetEvent">重置</vxe-button>
            </div>
          </div>
        </div>
        `,
        `
        .cmplex-filter {
          width: 260px;
          padding: 0 8px;
        }
        .cmplex-filter .f-type {
          padding: 8px 0;
        }
        .cmplex-filter .f-iscase {
          padding: 12px 0;
        }
        .cmplex-filter .f-footer {
          text-align: center;
        }
        `,
        `
        export default {
          name: 'FilterInput',
          props: {
            params: Object,
            context: Object
          },
          data () {
            return {
              column: null,
              option: null
            }
          },
          created () {
            // filters 可以配置多个，实际只用一个就可以满足需求了
            const { column } = this.params
            const option = column.filters[0]
            this.column = column
            this.option = option
          },
          methods: {
            changeOptionEvent () {
              const { params, option } = this
              const { $panel } = params
              const checked = !!option.data
              $panel.changeOption(null, checked, option)
            }
          }
        }
        `,
        `
        <vxe-table border height="400" :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column
            field="nickname"
            title="Nickname"
            :filters="[{data: null}]"
            :filter-render="{name: 'input', attrs: {placeholder: '请输入名字'}}"></vxe-table-column>
          <vxe-table-column
            field="sex"
            title="sex"
            :filters="[{data: null}]"
            :filter-render="{name: '$select', options: sexList}"></vxe-table-column>
          <vxe-table-column
            field="age"
            title="Age"
            :filters="[{data: null}]"
            :filter-render="{name: 'FilterInput'}"></vxe-table-column>
          <vxe-table-column
            field="name"
            title="实现复杂的筛选"
            :filters="[{data: {type: 'has', isCase: true, name: ''}}]"
            :filter-render="{name: 'FilterComplex'}"></vxe-table-column>
          <vxe-table-column
            field="role"
            title="实现Excel复杂的筛选"
            sortable
            :filters="[{data: {vals: [], sVal: '', fMenu: '', f1Type:'', f1Val: '', fMode: 'and', f2Type: '', f2Val: ''}}]"
            :filter-render="{name: 'FilterExcel'}"></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 15)
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 15)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
