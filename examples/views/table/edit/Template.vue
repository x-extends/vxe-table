<template>
  <div>
    <p>使用 edit <table-column-api-link prop="slot"/> 自定义渲染任意 Vue 组件</p>

    <vxe-table
      border
      show-overflow
      :data.sync="tableData"
      :edit-config="{trigger: 'click', mode: 'cell'}">
      <vxe-table-column type="index" width="60"></vxe-table-column>
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
          :data.sync="tableData"
          :edit-config="{trigger: 'click', mode: 'cell'}">
          <vxe-table-column type="index" width="60"></vxe-table-column>
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
