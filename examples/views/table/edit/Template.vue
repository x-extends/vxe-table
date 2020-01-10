<template>
  <div>
    <p class="tip">
      使用 edit <table-column-api-link prop="slot"/> 自定义渲染任意 Vue 组件<br>
      <span class="red">（注：自定义渲染虽然可以支持任意的 vue 组件，但是并不是所有组件都能直接使用的，所有跨组件之间会存在冲突问题，如果不处理好冲突的情况下是大部分组件是无法使用的；
      可以通过 <router-link class="link" :to="{name: 'InterceptorAPI'}">事件拦截器</router-link> 来处理冲突）</span>
    </p>

    <vxe-table
      border
      show-overflow
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'cell'}">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}">
        <template v-slot:edit="{ row }">
          <input type="text" v-model="row.name" class="custom-input">
        </template>
      </vxe-table-column>
      <vxe-table-column field="age" title="Age" :edit-render="{autofocus: '.custom-input'}">
        <template v-slot:edit="{ row }">
          <input type="number" v-model="row.age" class="custom-input">
        </template>
      </vxe-table-column>
      <vxe-table-column field="date3" title="Date" :edit-render="{name: 'input'}">
        <template v-slot:edit="{ row }">
          <input type="date" v-model="row.date3" class="custom-input">
        </template>
        <template v-slot="{ row }">选中日期：{{ row.date3 }}</template>
      </vxe-table-column>
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
      tableData: [],
      demoCodes: [
        `
        <vxe-table
          border
          show-overflow
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'cell'}">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}">
            <template v-slot:edit="{ row }">
              <input type="text" v-model="row.name" class="custom-input">
            </template>
          </vxe-table-column>
          <vxe-table-column field="age" title="Age" :edit-render="{autofocus: '.custom-input'}">
            <template v-slot:edit="{ row }">
              <input type="number" v-model="row.age" class="custom-input">
            </template>
          </vxe-table-column>
          <vxe-table-column field="date3" title="Date" :edit-render="{name: 'input'}">
            <template v-slot:edit="{ row }">
              <input type="date" v-model="row.date3" class="custom-input">
            </template>
            <template v-slot="{ row }">选中日期：{{ row.date3 }}</template>
          </vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: []
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
    let list = window.MOCK_DATA_LIST.slice(0, 6)
    this.tableData = list
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
