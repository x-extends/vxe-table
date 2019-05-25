<template>
  <div>
    <p>使用 template 自定义模板；可以实现自定义任意内容及 html 元素</p>
    <p>相关参数 {seq: 序号, rowIndex: 获取 data 中的行索引, row: 获取 data 中行数据, column: 列, columnIndex: 列索引}</p>

    <vxe-table
      border
      :data.sync="tableData">
      <vxe-table-column type="index" width="80">
        <template v-slot="{ seq }">
          <span>seq= {{ seq }}</span>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="name" label="Name" sortable>
        <template v-slot="{ rowIndex, columnIndex }">
          <span>rowIndex= {{ rowIndex }}</span>
          <span>columnIndex= {{ columnIndex }}</span>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="sex" label="Sex">
        <template v-slot:header="{ column }">
          <span style="color: red;">我要自定义头</span>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="time" label="Time">
        <template v-slot:header="{ column }">
          <input type="text" placeholder="这样也行">
        </template>
        <template v-slot="{ row }">
          <span>{{ formatDate(row.time) }}</span>
        </template>
      </vxe-table-column>
      <vxe-table-column prop="address" label="Address" show-overflow>
        <template v-slot="{ row, rowIndex }">
          <select v-if="rowIndex === 1">
            <option value="1">还可以这样</option>
          </select>
          <a href="https://github.com/xuliangzhan/vxe-table">{{ row.name }}</a>
        </template>
      </vxe-table-column>
    </vxe-table>

    <p class="demo-code">显示代码</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      tableData: [],
      demoCodes: [
        `
        <vxe-table
          border
          :data.sync="tableData">
          <vxe-table-column type="index" width="80">
            <template v-slot="{ seq }">
              <span>seq= {{ seq }}</span>
            </template>
          </vxe-table-column>
          <vxe-table-column prop="name" label="Name" sortable>
            <template v-slot="{ rowIndex, columnIndex }">
              <span>rowIndex= {{ rowIndex }}</span>
              <span>columnIndex= {{ columnIndex }}</span>
            </template>
          </vxe-table-column>
          <vxe-table-column prop="sex" label="Sex">
            <template v-slot:header="{ column }">
              <span style="color: red;">我要自定义头</span>
            </template>
          </vxe-table-column>
          <vxe-table-column prop="time" label="Time">
            <template v-slot:header="{ column }">
              <input type="text" placeholder="这样也行">
            </template>
            <template v-slot="{ row }">
              <span>{{ formatDate(row.time) }}</span>
            </template>
          </vxe-table-column>
          <vxe-table-column prop="address" label="Address" show-overflow>
            <template v-slot="{ row, rowIndex }">
              <select v-if="rowIndex === 1">
                <option value="1">还可以这样</option>
              </select>
              <a href="https://github.com/xuliangzhan/vxe-table">{{ row.name }}</a>
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
          },
          methods: {
            formatDate (value) {
              return XEUtils.toDateString(value, 'yyyy-MM-dd HH:mm:ss.S')
            }
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
  },
  methods: {
    formatDate (value) {
      return XEUtils.toDateString(value, 'yyyy-MM-dd HH:mm:ss.S')
    }
  }
}
</script>
