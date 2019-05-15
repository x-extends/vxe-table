<template>
  <div>
    <p>设置 edit-config={trigger: 'manual', mode: 'row'} 启用行编辑的功能</p>

    <vxe-table
      ref="xTable"
      border
      :data.sync="tableData"
      :edit-config="{trigger: 'manual', mode: 'row'}">
      <vxe-table-column type="index" width="60"></vxe-table-column>
      <vxe-table-column prop="name" label="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column prop="sex" label="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column prop="date" label="Date" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column prop="address" label="Address" show-overflow-tooltip :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column label="操作">
        <template v-slot="{ row }">
          <template v-if="$refs.xTable.hasActiveRow(row)">
            <button class="btn">保存</button>
            <button class="btn">取消</button>
          </template>
          <template v-else>
            <button class="btn" @click="$refs.xTable.setActiveRow(row)">编辑</button>
          </template>
        </template>
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
          ref="xTable"
          border
          :data.sync="tableData"
          :edit-config="{trigger: 'manual', mode: 'row'}">
          <vxe-table-column type="index" width="60"></vxe-table-column>
          <vxe-table-column prop="name" label="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column prop="sex" label="Sex" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column prop="date" label="Date" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column prop="address" label="Address" show-overflow-tooltip :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column label="操作">
            <template v-slot="{ row }">
              <template v-if="$refs.xTable.hasActiveRow(row)">
                <button class="btn">保存</button>
                <button class="btn">取消</button>
              </template>
              <template v-else>
                <button class="btn" @click="$refs.xTable.setActiveRow(row)">编辑</button>
              </template>
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
