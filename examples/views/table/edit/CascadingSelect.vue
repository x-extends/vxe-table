<template>
  <div>
    <p class="tip">实现简单的级联下拉选项列表<span class="red">（具体请自行实现，该示例仅供参考）</span></p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-button @click="insertEvent()">新增</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      resizable
      show-overflow
      ref="xTable"
      max-height="400"
      :data="tableData"
      :edit-config="{trigger: 'click', mode: 'row'}"
      @edit-actived="editActivedEvent">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="attr3" title="Project type" :edit-render="{name: '$select', options: ptypeList, props: {clearable: true}, events: {change: ptypeChangeEvent}}"></vxe-table-column>
      <vxe-table-column field="attr4" title="Project name" :formatter="formatPanmeLabel" :edit-render="{name: '$select', options: pnameList, props: {clearable: true}}"></vxe-table-column>
      <vxe-table-column field="date12" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>

  </div>
</template>

<script>
import XEUtils from 'xe-utils'

export default {
  data () {
    return {
      tableData: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', attr3: '', attr4: '', age: 28, address: 'Shenzhen', date12: '', date13: '' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', attr3: '', attr4: '', age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' }
      ],
      ptypeList: [
        {
          label: '项目1',
          value: '1'
        },
        {
          label: '项目2',
          value: '2'
        },
        {
          label: '项目3',
          value: '3'
        }
      ],
      pnameList: [],
      cachePnameList: [],
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-button @click="insertEvent()">新增</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          resizable
          show-overflow
          ref="xTable"
          max-height="400"
          :data="tableData"
          :edit-config="{trigger: 'click', mode: 'row'}"
          @edit-actived="editActivedEvent">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="attr3" title="Project type" :edit-render="{name: '$select', options: ptypeList, props: {clearable: true}, events: {change: ptypeChangeEvent}}"></vxe-table-column>
          <vxe-table-column field="attr4" title="Project name" :formatter="formatPanmeLabel" :edit-render="{name: '$select', options: pnameList, props: {clearable: true}}"></vxe-table-column>
          <vxe-table-column field="date12" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              tableData: [
                { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', attr3: '', attr4: '', age: 28, address: 'Shenzhen', date12: '', date13: '' },
                { id: 10002, name: 'Test2', nickname: 'T2', role: 'Designer', attr3: '', attr4: '', age: 22, address: 'Guangzhou', date12: '', date13: '2020-08-20' }
              ],
              ptypeList: [
                {
                  label: '项目1',
                  value: '1'
                },
                {
                  label: '项目2',
                  value: '2'
                },
                {
                  label: '项目3',
                  value: '3'
                }
              ],
              pnameList: [],
              cachePnameList: []
            }
          },
          methods: {
            insertEvent () {
              let record = {}
              this.$refs.xTable.insert(record)
            },
            // 格式化显示名称
            formatPanmeLabel ({ cellValue, row }) {
              let ptype = row.attr3
              let ptypeItem = this.cachePnameList.find(item => item.ptype === ptype)
              if (ptypeItem && ptypeItem.pnameList) {
                let pnameItem = ptypeItem.pnameList.find(item => item.value === cellValue)
                if (pnameItem) {
                  return pnameItem.label
                }
              }
              return ''
            },
            // 更新级联选项列表
            updatePnameList (row) {
              let ptype = row.attr3
              let pnameList = []
              if (ptype) {
                let item = this.cachePnameList.find(item => item.ptype === ptype)
                if (item) {
                  pnameList = item.pnameList
                } else {
                  // 模拟后台数据
                  Array.from(new Array(XEUtils.random(3, 8))).forEach((item, index) => {
                    pnameList.push({
                      label: \`\${ptype}-名称\${index}\`,
                      value: \`\${ptype}_\${index}\`
                    })
                  })
                  this.cachePnameList.push({ ptype, pnameList })
                }
              }
              this.pnameList = pnameList
            },
            ptypeChangeEvent ({ row }) {
              // 类型切换时更新级联的下拉数据
              row.attr4 = ''
              this.updatePnameList(row)
            },
            editActivedEvent ({ row }) {
              this.updatePnameList(row)
            }
          }
        }
        `
      ]
    }
  },
  methods: {
    insertEvent () {
      const record = {}
      this.$refs.xTable.insert(record)
    },
    // 格式化显示名称
    formatPanmeLabel ({ cellValue, row }) {
      const ptype = row.attr3
      const ptypeItem = this.cachePnameList.find(item => item.ptype === ptype)
      if (ptypeItem && ptypeItem.pnameList) {
        const pnameItem = ptypeItem.pnameList.find(item => item.value === cellValue)
        if (pnameItem) {
          return pnameItem.label
        }
      }
      return ''
    },
    // 更新级联选项列表
    updatePnameList (row) {
      const ptype = row.attr3
      let pnameList = []
      if (ptype) {
        const item = this.cachePnameList.find(item => item.ptype === ptype)
        if (item) {
          pnameList = item.pnameList
        } else {
          // 模拟后台数据
          Array.from(new Array(XEUtils.random(3, 8))).forEach((item, index) => {
            pnameList.push({
              label: `${ptype}-名称${index}`,
              value: `${ptype}_${index}`
            })
          })
          this.cachePnameList.push({ ptype, pnameList })
        }
      }
      this.pnameList = pnameList
    },
    ptypeChangeEvent ({ row }) {
      // 类型切换时更新级联的下拉数据
      row.attr4 = ''
      this.updatePnameList(row)
    },
    editActivedEvent ({ row }) {
      this.updatePnameList(row)
    }
  }
}
</script>
