import VXETable from '../../../../packages/v-x-e-table'

// 创建一个简单的表单-输入框渲染
VXETable.renderer.add('FormItemInput', {
  // 项内容模板
  renderItemContent (h, renderOpts, params) {
    const { data, property } = params
    const { props } = renderOpts
    return [
      <vxe-input v-model={ data[property] } { ...{ props } }></vxe-input>
    ]
  }
})

// 创建一个简单的表单-按钮组渲染
VXETable.renderer.add('FormItemButtonGroup', {
  // 项内容模板
  renderItemContent () {
    return [
      <vxe-button type="submit" status="primary">查询</vxe-button>,
      <vxe-button type="reset">重置</vxe-button>
    ]
  }
})
