import VXETable from '../../../../packages/v-x-e-table'
import XEUtils from 'xe-utils'

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
            <li class="me-menu">
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
                            data.fType = 'and'
                            switch (cItem.value) {
                              case 'equal':
                                data.f1 = '1'
                                data.f2 = ''
                                break
                              case 'ne':
                                data.f1 = '2'
                                data.f2 = ''
                                break
                              case 'greater':
                                data.f1 = '3'
                                data.f2 = ''
                                break
                              case 'ge':
                                data.f1 = '4'
                                data.f2 = ''
                                break
                              case 'less':
                                data.f1 = '5'
                                data.f2 = ''
                                break
                              case 'le':
                                data.f1 = '6'
                                data.f2 = ''
                                break
                              case 'between':
                                data.f1 = '4'
                                data.f2 = '6'
                                break
                              default:
                                return
                            }
                            $table.$XModal({
                              title: '自定义自动筛选方式',
                              width: 600,
                              slots: {
                                default: ({ $modal }, h) => {
                                  return [
                                    <div class="me-popup">
                                      <div class="me-popup-title">显示行</div>
                                      <div class="me-popup-filter me-popup-f1">
                                        <select v-model={ data.f1 }>
                                          {
                                            allCaseList.map(cItem => {
                                              return <option value={ cItem.value }>{ cItem.label }</option>
                                            })
                                          }
                                        </select>
                                        <input />
                                      </div>
                                      <div class="me-popup-concat">
                                        <vxe-radio v-model={ data.fType } label="and" name="ftype">与</vxe-radio>
                                        <vxe-radio v-model={ data.fType } label="or" name="ftype">或</vxe-radio>
                                      </div>
                                      <div class="me-popup-filter me-popup-f2">
                                        <select v-model={ data.f2 }>
                                          {
                                            allCaseList.map(cItem => {
                                              return <option value={ cItem.value }>{ cItem.label }</option>
                                            })
                                          }
                                        </select>
                                        <input />
                                      </div>
                                      <div class="me-popup-describe">
                                        <span>可用 ? 代表单个字符<br/>用 * 代表任意多个字符</span>
                                      </div>
                                      <div class="me-popup-footer">
                                        <button onClick={ e => { $modal.close() } }>确认</button>
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
                  <i class={ `${isAll ? 'fa fa-check-square-o me-val-icon' : 'fa fa-square-o me-val-icon'}` } ></i>
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
                      <i class={ `${data.vals.indexOf(val) === -1 ? 'fa fa-square-o me-val-icon' : 'fa fa-check-square-o me-val-icon'}` } ></i>
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
          <button onClick={ e => { context.confirmFilter() } }>确认</button>
          <button onClick={ e => { context.resetFilter() } }>重置</button>
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
