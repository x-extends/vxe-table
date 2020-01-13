import Vue from 'vue'
import VXETable from '../../../../packages/v-x-e-table'

import FormSimple from './components/FormSimple.vue'

Vue.component(FormSimple.name, FormSimple)

// 创建一个表单（仅用于简单示例，实际开发中应该封装成一个组件，不应该把复杂的渲染逻辑写在渲染器中）
VXETable.renderer.add('FormSimple', {
  renderForm (h, renderOpts, params, context) {
    return [
      <form-simple params={ params } context={ context }></form-simple>
    ]
  }
})
