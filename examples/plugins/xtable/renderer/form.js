import VXETable from '../../../../packages/v-x-e-table'

// 创建一个表单-项渲染器
VXETable.renderer.add('FormItemInput', {
  // 项显示模板
  renderItem (h, renderOpts, params, context) {
    const { data, property } = params
    const { props } = renderOpts
    return [
      <vxe-input v-model={ data[property] } { ...{ props } }></vxe-input>
    ]
  }
})
