<template>
  <div>
    <p class="tip">
      将全表的单元格渲染成可编辑<span class="red">（注：该方式将无法兼容 v3）</span><br>
      <span class="red">由于不符合 vxe-table 单行编辑的设计原则，使用这个方式的所有逻辑都应该自行处理</span>
    </p>

    <vxe-table
      border
      resizable
      show-overflow
      :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :cell-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :cell-render="{name: 'select', options: sexList}"></vxe-table-column>
      <vxe-table-column field="age" title="Age" :cell-render="{name: 'input', attrs: {type: 'number'}}"></vxe-table-column>
      <vxe-table-column field="role" title="Role">
        <template v-slot="{ row }">
          <input type="text" v-model="row.role">
        </template>
      </vxe-table-column>
      <vxe-table-column field="date3" title="Date">
        <template v-slot="{ row }">
          <input type="date" v-model="row.date3">
        </template>
      </vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>

    <p class="tip">
      将全表的可单元格设为可视类型<span class="red">（注：该方式将无法兼容 v3）</span><br>
      <span class="red">由于不符合 vxe-table 单行编辑的设计原则，使用这个方式的所有逻辑都应该自行处理</span>
    </p>

    <vxe-table
      border
      resizable
      show-overflow
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'row'}">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', type: 'visible', attrs: {type: 'text'}}"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'select', type: 'visible', options: sexList}"></vxe-table-column>
      <vxe-table-column field="age" title="Age" :edit-render="{name: 'input', type: 'visible', attrs: {type: 'number'}}"></vxe-table-column>
      <vxe-table-column field="role" title="Role" :edit-render="{name: 'input', type: 'visible', attrs: {type: 'text'}}"></vxe-table-column>
      <vxe-table-column field="date3" title="Date" :edit-render="{name: 'input', type: 'visible', attrs: {type: 'date'}}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[2] }}</code>
      <code class="javascript">{{ demoCodes[3] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data () {
    return {
      tableData: [],
      sexList: [
        {
          value: '',
          label: '请选择'
        },
        {
          value: '0',
          label: '女'
        },
        {
          value: '1',
          label: '男'
        }
      ],
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          show-overflow
          :data="tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :cell-render="{name: 'input', attrs: {type: 'text'}}"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :cell-render="{name: 'select', options: sexList}"></vxe-table-column>
          <vxe-table-column field="age" title="Age" :cell-render="{name: 'input', attrs: {type: 'number'}}"></vxe-table-column>
          <vxe-table-column field="role" title="Role">
            <template v-slot="{ row }">
              <input type="text" v-model="row.role">
            </template>
          </vxe-table-column>
          <vxe-table-column field="date3" title="Date">
            <template v-slot="{ row }">
              <input type="date" v-model="row.date3">
            </template>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 5)
          }
        }
        `,
        `
        <vxe-table
          border
          resizable
          show-overflow
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'row'}">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input', type: 'visible', attrs: {type: 'text'}}"></vxe-table-column>
          <vxe-table-column field="sex" title="Sex" :edit-render="{name: 'select', type: 'visible', options: sexList}"></vxe-table-column>
          <vxe-table-column field="age" title="Age" :edit-render="{name: 'input', type: 'visible', attrs: {type: 'number'}}"></vxe-table-column>
          <vxe-table-column field="role" title="Role" :edit-render="{name: 'input', type: 'visible', attrs: {type: 'text'}}"></vxe-table-column>
          <vxe-table-column field="date3" title="Date" :edit-render="{name: 'input', type: 'visible', attrs: {type: 'date'}}"></vxe-table-column>
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
            this.tableData = window.MOCK_DATA_LIST.slice(0, 5)
          }
        }
        `
      ]
    }
  },
  created () {
    this.tableData = window.MOCK_DATA_LIST.slice(0, 5)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    editActivedEvent ({ column }) {
      console.log(`打开 ${column.title} 列编辑`)
    },
    editClosedEvent ({ column }) {
      console.log(`关闭 ${column.title} 列编辑`)
    }
  }
}
</script>
