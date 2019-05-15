<template>
  <div>
    <p>使用 edit slot 自定义渲染任意 Vue 组件</p>

    <vxe-table
      border
      :data.sync="tableData"
      :edit-config="{trigger: 'click', mode: 'cell'}">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" :edit-render="{name: 'input'}">
        <template v-slot:edit="{ row }">
          <input type="text" v-model="row.name" class="custom-input">
        </template>
      </vxe-table-column>
      <vxe-table-column prop="age" label="Age" :edit-render="{autofocus: '.custom-input'}">
        <template v-slot:edit="{ row }">
          <input type="number" v-model="row.age" class="custom-input">
        </template>
      </vxe-table-column>
      <vxe-table-column prop="date3" label="Date" :edit-render="{name: 'input'}">
        <template v-slot:edit="{ row }">
          <input type="date" v-model="row.date3" class="custom-input">
        </template>
        <template v-slot="{ row }">选中日期：{{ row.date3 }}</template>
      </vxe-table-column>
    </vxe-table>

    <p>调用代码</p>

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
          :data.sync="tableData"
          :edit-config="{trigger: 'click', mode: 'cell'}">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column prop="name" label="Name" :edit-render="{name: 'input'}">
            <template v-slot:edit="{ row }">
              <input type="text" v-model="row.name" class="custom-input">
            </template>
          </vxe-table-column>
          <vxe-table-column prop="age" label="Age" :edit-render="{autofocus: '.custom-input'}">
            <template v-slot:edit="{ row }">
              <input type="number" v-model="row.age" class="custom-input">
            </template>
          </vxe-table-column>
          <vxe-table-column prop="date3" label="Date" :edit-render="{name: 'input'}">
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
