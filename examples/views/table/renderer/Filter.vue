<template>
  <div>
    <p class="tip">
      筛选渲染器 <table-column-api-link prop="filter-render"/><br>
      默认支持原生的：input、textarea、select<br>
      配置参数：<br>
      className 自定义容器的 className<br>
      isFooter 是否显示底部按钮<br>
      renderFilter (h, filterRender, { column, columnIndex, $columnIndex }, context) 渲染函数<br>
      filterMethod ({ option, row, column }) 筛选函数<br>
      <span class="red">（注：实际开发中应该将业务封装成一个组件，不要把复杂的渲染逻辑写在渲染器中）</span>
    </p>

    <vxe-table border :data="tableData">
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
        :filter-render="{name: 'select', options: sexList}"></vxe-table-column>
      <vxe-table-column
        field="age"
        title="Age"
        :filters="[{data: null}]"
        :filter-render="{name: 'MyFilter'}"></vxe-table-column>
      <vxe-table-column
        field="name"
        title="实现复杂的筛选"
        :filters="[{data: {type: 'has', isCase: true, name: ''}}]"
        :filter-render="{name: 'MyComplexFilter'}"></vxe-table-column>
      <vxe-table-column
        field="role"
        title="仿Excel复杂筛选"
        :filters="[{data: {vals: [], sVal: '', f1Type:'', f1Val: '', fMode: 'and', f2Type: '', f2Val: ''}}]"
        :filter-render="{name: 'MyExcelFilter'}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="javascript">{{ demoCodes[0] }}</code>
      <code class="xml">{{ demoCodes[1] }}</code>
      <code class="javascript">{{ demoCodes[2] }}</code>
      <code class="CSS">{{ demoCodes[3] }}</code>
      <code class="javascript">{{ demoCodes[4] }}</code>
      <code class="CSS">{{ demoCodes[5] }}</code>
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
        <vxe-table border :data="tableData">
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
        // 创建一个模仿 Excel 的渲染器（仅用于简单示例，实际开发中应该封装成一个组件，不应该把复杂的渲染逻辑写在渲染器中）
        VXETable.renderer.add('MyExcelFilter', {
          className: 'myexcel-filter-render',
          // 不显示底部按钮，使用自定义的按钮
          isFooter: false,
          // 筛选模板
          renderFilter (h, filterRender, params, context) {
            const { $table, column } = params
            const { fullData } = $table.getTableData()
            const colValues = Object.keys(XEUtils.groupBy(fullData, column.property))
            const caseGroups = [
              [
                { value: 'equal', label: '等于' },
                { value: 'ne', label: '不等于' }
              ],
              [
                { value: 'greater', label: '大于' },
                { value: 'ge', label: '大于或等于' },
                { value: 'less', label: '小于' },
                { value: 'le', label: '小于或等于' },
                { value: 'between', label: '介于' }
              ],
              [
                { value: 'top10', label: '前 10 项' },
                { value: 'gt_mean', label: '高于平均值' },
                { value: 'lt_mean', label: '低于平均值' },
                { value: 'custom', label: '自定义筛选' }
              ]
            ]
            const allCaseList = [
              { value: '', label: '' },
              { value: '1', label: '等于' },
              { value: '2', label: '不等于' },
              { value: '3', label: '大于' },
              { value: '4', label: '大于或等于' },
              { value: '5', label: '小于' },
              { value: '6', label: '小于或等于' },
              { value: '8', label: '开头是' },
              { value: '9', label: '开头不是' },
              { value: '10', label: '结尾是' },
              { value: '11', label: '结尾不是' },
              { value: '12', label: '包含' },
              { value: '13', label: '不包含' }
            ]
            return column.filters.map((item, index) => {
              const { data } = item
              const sValues = data.sVal ? colValues.filter(val => val.indexOf(data.sVal) > -1) : colValues
              const isAll = sValues.every(val => data.vals.indexOf(val) > -1)
              return <div class="myexcel-filter">
                <div class="me-list">
                  <ul class="me-group">
                    <li class="me-menu">
                      <i class="fa fa-sort-alpha-asc me-menu-left-icon"></i>
                      <span>升序</span>
                    </li>
                    <li class="me-menu">
                      <i class="fa fa-sort-alpha-desc me-menu-left-icon"></i>
                      <span>降序</span>
                    </li>
                  </ul>
                  <ul class="me-group">
                    <li class="me-menu" onClick={ e => { context.resetFilter() } }>
                      <span>清除筛选</span>
                    </li>
                    <li class="me-menu">
                      <i class="fa fa-filter me-menu-left-icon"></i>
                      <span>筛选条件</span>
                      <i class="fa fa-caret-right me-menu-right-icon"></i>
                      <div class="me-child-list">
                        {
                          caseGroups.map(cList => {
                            return <ul class="me-child-group">
                              {
                                cList.map(cItem => {
                                  return <li class="me-child-menu" onClick={ e => {
                                    data.fMode = 'and'
                                    data.f1Val = ''
                                    data.f2Val = ''
                                    switch (cItem.value) {
                                      case 'equal':
                                        data.f1Type = '1'
                                        data.f2Type = ''
                                        break
                                      case 'ne':
                                        data.f1Type = '2'
                                        data.f2Type = ''
                                        break
                                      case 'greater':
                                        data.f1Type = '3'
                                        data.f2Type = ''
                                        break
                                      case 'ge':
                                        data.f1Type = '4'
                                        data.f2Type = ''
                                        break
                                      case 'less':
                                        data.f1Type = '5'
                                        data.f2Type = ''
                                        break
                                      case 'le':
                                        data.f1Type = '6'
                                        data.f2Type = ''
                                        break
                                      case 'between':
                                        data.f1Type = '4'
                                        data.f2Type = '6'
                                        break
                                      default:
                                        return
                                    }
                                    $table.closeFilter()
                                    $table.$XModal({
                                      title: '自定义自动筛选方式',
                                      width: 600,
                                      slots: {
                                        default: ({ $modal }, h) => {
                                          return [
                                            <div class="me-popup">
                                              <div class="me-popup-title">显示行</div>
                                              <div class="me-popup-filter me-popup-f1">
                                                <select v-model={ data.f1Type }>
                                                  {
                                                    allCaseList.map(cItem => {
                                                      return <option value={ cItem.value }>{ cItem.label }</option>
                                                    })
                                                  }
                                                </select>
                                                <input v-model={ data.f1Val }/>
                                              </div>
                                              <div class="me-popup-concat">
                                                <vxe-radio v-model={ data.fMode } label="and" name="fmode">与</vxe-radio>
                                                <vxe-radio v-model={ data.fMode } label="or" name="fmode">或</vxe-radio>
                                              </div>
                                              <div class="me-popup-filter me-popup-f2">
                                                <select v-model={ data.f2Type }>
                                                  {
                                                    allCaseList.map(cItem => {
                                                      return <option value={ cItem.value }>{ cItem.label }</option>
                                                    })
                                                  }
                                                </select>
                                                <input v-model={ data.f2Val }/>
                                              </div>
                                              <div class="me-popup-describe">
                                                <span>可用 ? 代表单个字符<br/>用 * 代表任意多个字符</span>
                                              </div>
                                              <div class="me-popup-footer">
                                                <button onClick={ e => {
                                                  item.checked = true
                                                  $modal.close()
                                                  context.confirmFilter()
                                                } }>确认</button>
                                                <button onClick={ e => { $modal.close() } }>取消</button>
                                              </div>
                                            </div>
                                          ]
                                        }
                                      }
                                    })
                                  } }>{ cItem.label }</li>
                                })
                              }
                            </ul>
                          })
                        }
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="me-search">
                  <div class="header">
                    <input v-model={ data.sVal } placeholder="搜索"/>
                    <i class="fa fa-search me-search-icon"></i>
                  </div>
                  {
                    sValues.length
                      ? <ul class="body">
                        <li class="me-val-item" onClick={ e => {
                          if (isAll) {
                            data.vals.splice(0, data.vals.length)
                          } else {
                            data.vals = sValues
                          }
                        } }>
                          <i class={ isAll ? 'fa fa-check-square-o me-val-icon' : 'fa fa-square-o me-val-icon' } ></i>
                          <span>(全选)</span>
                        </li>
                        {
                          sValues.map(val => {
                            return <li class="me-val-item" onClick={ e => {
                              let vIndex = data.vals.indexOf(val)
                              if (vIndex === -1) {
                                data.vals.push(val)
                              } else {
                                data.vals.splice(vIndex, 1)
                              }
                            } }>
                              <i class={ data.vals.indexOf(val) === -1 ? 'fa fa-square-o me-val-icon' : 'fa fa-check-square-o me-val-icon' } ></i>
                              <span>{ val }</span>
                            </li>
                          })
                        }
                      </ul>
                      : <div class="body">
                        <div class="me-search-empty">无匹配项</div>
                      </div>
                  }
                </div>
                <div class="me-footer">
                  <button onClick={ e => {
                    data.f1 = ''
                    data.f2 = ''
                    item.checked = true
                    context.confirmFilter()
                  } }>确认</button>
                  <button onClick={ e => { context.resetFilter() } }>重置</button>
                </div>
              </div>
            })
          },
          // 筛选方法
          filterMethod ({ option, row, column }) {
            let cellValue = XEUtils.get(row, column.property)
            let { vals, f1Type, f1Val, fMode, f2Type, f2Val } = option.data
            if (cellValue) {
              if (f1Type || f2Type) {
                // 筛选条件
                let f1Rest = true
                let f2Rest = true
                switch (f1Type) {
                  case '1':
                    f1Rest = cellValue == f1Val
                    break
                  case '2':
                    f1Rest = cellValue != f1Val
                    break
                }
                switch (f2Type) {
                  case '1':
                    f2Rest = cellValue == f2Val
                    break
                  case '2':
                    f2Rest = cellValue != f2Val
                    break
                }
                if (fMode === 'and') {
                  return f1Rest && f2Rest
                }
                return f1Rest || f2Rest
              } else if (vals.length) {
                // 确定
                return vals.includes(cellValue)
              }
            }
            return false
          }
        })
        `,
        `
        .vxe-table--filter-wrapper.myexcel-filter-render .vxe-table--filter-body {
          overflow: initial;
          max-height: initial;
          padding: 0;
        }
        .myexcel-filter {
          user-select: none;
        }
        .myexcel-filter .me-list .me-group {
          position: relative;
          margin: 0;
          padding: 0;
        }
        .myexcel-filter .me-list .me-group:after {
          content: "";
          position: absolute;
          width: 190px;
          right: 0;
          bottom: 0;
          border-bottom: 1px solid #E2E4E7;
        }
        .myexcel-filter .me-list .me-group .me-menu {
          position: relative;
          padding: 4px 20px 4px 30px;
          cursor: pointer;
        }
        .myexcel-filter .me-list .me-group .me-menu:hover {
          background-color: #C5C5C5;
        }
        .myexcel-filter .me-list .me-group .me-menu-left-icon {
          position: absolute;
          left: 10px;
          top: 6px;
        }
        .myexcel-filter .me-list .me-group .me-menu-right-icon {
          position: absolute;
          right: 10px;
          top: 6px;
        }
        .myexcel-filter .me-list .me-group .me-menu:hover .me-child-list {
          display: block;
        }
        .myexcel-filter .me-list .me-group .me-menu .me-child-list {
          display: none;
          position: absolute;
          top: 0;
          right: -120px;
          width: 120px;
          background-color: #fff;
          border: 1px solid #DADCE0;
          box-shadow: 3px 3px 4px -2px rgba(0, 0, 0, 0.6);
        }
        .myexcel-filter .me-list .me-group .me-menu .me-child-group {
          position: relative;
        }
        .myexcel-filter .me-list .me-group .me-menu .me-child-group:after {
          content: "";
          position: absolute;
          width: 90px;
          right: 0;
          bottom: 0;
          border-bottom: 1px solid #E2E4E7;
        }
        .myexcel-filter .me-list .me-group .me-menu .me-child-group > .me-child-menu {
          padding: 4px 20px 4px 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .myexcel-filter .me-list .me-group .me-menu .me-child-group > .me-child-menu:hover {
          background-color: #C5C5C5;
        }
        .myexcel-filter .me-search {
          padding: 0 10px 0 30px;
        }
        .myexcel-filter .me-search .header {
          position: relative;
          padding: 5px 0;
        }
        .myexcel-filter .me-search .header > input {
          border: 1px solid #ABABAB;
          padding: 0 20px 0 2px;
          width: 200px;
          height: 22px;
          line-height: 22px;
        }
        .myexcel-filter .me-search .header > .me-search-icon {
          position: absolute;
          right: 5px;
          top: 10px;
        }
        .myexcel-filter .me-search .body {
          margin: 0;
          border: 1px solid #E2E4E7;
          padding: 2px 10px;
          overflow: auto;
          height: 140px;
        }
        .myexcel-filter .me-search .body .me-search-empty {
          text-align: center;
          padding-top: 20px;
        }
        .myexcel-filter .me-search .body .me-val-item {
          cursor: pointer;
          padding: 2px 0;
        }
        .myexcel-filter .me-search .body .me-val-item .me-val-icon {
          width: 16px;
        }
        .myexcel-filter .me-footer {
          text-align: right;
          padding: 10px 10px 10px 0;
        }
        .myexcel-filter .me-footer button {
          padding: 0 15px;
          margin-left: 15px;
        }
        .me-popup .me-popup-filter {
          padding-left: 30px;
        }
        .me-popup .me-popup-filter > select {
          height: 22px;
          line-height: 22px;
          width: 100px;
        }
        .me-popup .me-popup-filter > input {
          height: 22px;
          line-height: 22px;
          margin-left: 10px;
          width: 400px;
        }
        .me-popup .me-popup-describe {
          padding: 20px 0 10px 0;
        }
        .me-popup .me-popup-concat {
          padding-left: 50px;
        }
        .me-popup .me-popup-footer {
          text-align: right;
        }
        .me-popup .me-popup-footer button {
          padding: 0 15px;
          margin-left: 15px;
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
