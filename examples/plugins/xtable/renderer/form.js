import VXETable from '../../../../packages/v-x-e-table'

// 创建一个表单-输入框渲染器
VXETable.renderer.add('FormItemInput', {
  // 项显示模板
  renderItem (h, renderOpts, params) {
    const { data, property } = params
    const { props } = renderOpts
    return [
      <vxe-input v-model={ data[property] } { ...{ props } }></vxe-input>
    ]
  }
})

// 创建一个表单-按钮组渲染器
VXETable.renderer.add('FormItemButtonGroup', {
  // 项显示模板
  renderItem () {
    return [
      <vxe-button type="submit" status="primary">查询</vxe-button>,
      <vxe-button type="reset">重置</vxe-button>
    ]
  }
})
