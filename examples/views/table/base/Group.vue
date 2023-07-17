<template>
  <div>
    <p class="tip">当数据结构比较复杂的时候，可以使用多级表头来更加直观的显示数据</p>

    <vxe-table
      border
      height="400"
      :data="tableData1">
      <vxe-colgroup title="基本信息">
        <vxe-column type="seq" width="60"></vxe-column>
        <vxe-column field="name" title="Name"></vxe-column>
      </vxe-colgroup>
      <vxe-colgroup title="更多信息">
        <vxe-column field="role" title="Role"></vxe-column>
        <vxe-colgroup title="详细信息">
          <vxe-column field="sex" title="Sex"></vxe-column>
          <vxe-column field="age" title="Age"></vxe-column>
        </vxe-colgroup>
      </vxe-colgroup>
      <vxe-colgroup title="分类信息">
        <vxe-column field="date3" title="Date"></vxe-column>
      </vxe-colgroup>
      <vxe-column field="address" title="Address" show-overflow></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">分组表头与固定列</p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="toggleFixedColumn('group0', 'left')">切换第一列固定</vxe-button>
        <vxe-button @click="toggleFixedColumn('group1', 'left')">切换第二列固定</vxe-button>
        <vxe-button @click="toggleFixedColumn('group3', 'right')">切换第四列固定</vxe-button>
        <vxe-button @click="toggleFixedColumn('group4', 'right')">切换第五列固定</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      ref="xTable2"
      height="400"
      :data="tableData2">
      <vxe-colgroup field="group0" title="基本信息">
        <vxe-column type="seq" width="60"></vxe-column>
        <vxe-column field="name" title="Name" width="180"></vxe-column>
      </vxe-colgroup>
      <vxe-colgroup field="group1" title="分类信息1">
        <vxe-column field="age" title="Age1" width="120"></vxe-column>
      </vxe-colgroup>
      <vxe-colgroup field="group2" title="更多信息">
        <vxe-column field="role" title="Role" width="300"></vxe-column>
        <vxe-column field="attr1" title="Attr1" width="200"></vxe-column>
        <vxe-colgroup title="详细信息">
          <vxe-column field="sex" title="Sex" width="200"></vxe-column>
          <vxe-column field="num" title="Num" width="200"></vxe-column>
        </vxe-colgroup>
      </vxe-colgroup>
      <vxe-colgroup field="group3" title="分类信息2">
        <vxe-column field="attr6" title="Attr6" width="120"></vxe-column>
      </vxe-colgroup>
      <vxe-colgroup field="group4" title="额外信息">
        <vxe-column field="date3" title="Date" width="140"></vxe-column>
        <vxe-column field="address" title="Address" width="200"></vxe-column>
      </vxe-colgroup>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[3] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { VxeTableInstance, VxeColumnPropTypes } from '../../../../types/index'
import XEUtils from 'xe-utils'

export default defineComponent({
  setup () {
    const tableData1 = ref([
      { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abctest abc test abc test abc test abc test abc' },
      { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
      { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
      { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
      { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
      { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
      { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
      { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc test abc test abc test abc test test abcabc' }
    ])

    const xTable2 = ref({} as VxeTableInstance)
    const tableData2 = ref([
      { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
      { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
      { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
      { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc test abc test abc test abc test abc test abc' },
      { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
      { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
      { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
      { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
    ])

    const toggleFixedColumn = (field: string, type: VxeColumnPropTypes.Fixed) => {
      const $table = xTable2.value
      const column = $table.getColumnByField(field)
      if (column) {
        const groupFixed = column.fixed ? null : type
        // 将分组整体设置固定列
        XEUtils.eachTree([column], column => {
          column.fixed = groupFixed
        })
        // 刷新列
        $table.refreshColumn()
      }
    }

    return {
      tableData1,
      xTable2,
      tableData2,
      toggleFixedColumn,
      demoCodes: [
        `
        <vxe-table
          border
          height="400"
          :data="tableData1">
          <vxe-colgroup title="基本信息">
            <vxe-column type="seq" width="60"></vxe-column>
            <vxe-column field="name" title="Name"></vxe-column>
          </vxe-colgroup>
          <vxe-colgroup title="更多信息">
            <vxe-column field="role" title="Role"></vxe-column>
            <vxe-colgroup title="详细信息">
              <vxe-column field="sex" title="Sex"></vxe-column>
              <vxe-column field="age" title="Age"></vxe-column>
            </vxe-colgroup>
          </vxe-colgroup>
          <vxe-colgroup title="分类信息">
            <vxe-column field="date3" title="Date"></vxe-column>
          </vxe-colgroup>
          <vxe-column field="address" title="Address" show-overflow></vxe-column>
        </vxe-table>
        `,
        `
        import { defineComponent, ref } from 'vue'

        export default defineComponent({
          setup () {
            const tableData1 = ref([
              { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
              { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
              { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
              { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
              { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
              { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
              { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
              { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
            ])

            return {
              tableData1
            }
          }
        }
        `,
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-button @click="toggleFixedColumn('group0', 'left')">切换第一列固定</vxe-button>
            <vxe-button @click="toggleFixedColumn('group1', 'left')">切换第二列固定</vxe-button>
            <vxe-button @click="toggleFixedColumn('group3', 'right')">切换第四列固定</vxe-button>
            <vxe-button @click="toggleFixedColumn('group4', 'right')">切换第五列固定</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          ref="xTable2"
          height="400"
          :data="tableData2">
          <vxe-colgroup field="group0" title="基本信息">
            <vxe-column type="seq" width="60"></vxe-column>
            <vxe-column field="name" title="Name" width="180"></vxe-column>
          </vxe-colgroup>
          <vxe-colgroup field="group1" title="分类信息1">
            <vxe-column field="age" title="Age1" width="120"></vxe-column>
          </vxe-colgroup>
          <vxe-colgroup field="group2" title="更多信息">
            <vxe-column field="role" title="Role" width="300"></vxe-column>
            <vxe-column field="attr1" title="Attr1" width="200"></vxe-column>
            <vxe-colgroup title="详细信息">
              <vxe-column field="sex" title="Sex" width="200"></vxe-column>
              <vxe-column field="num" title="Num" width="200"></vxe-column>
            </vxe-colgroup>
          </vxe-colgroup>
          <vxe-colgroup field="group3" title="分类信息2">
            <vxe-column field="attr6" title="Attr6" width="120"></vxe-column>
          </vxe-colgroup>
          <vxe-colgroup field="group4" title="额外信息">
            <vxe-column field="date3" title="Date" width="140"></vxe-column>
            <vxe-column field="address" title="Address" width="200" show-overflow></vxe-column>
          </vxe-colgroup>
        </vxe-table>
        `,
        `
        import { defineComponent, ref } from 'vue'
        import { VxeTableInstance, VxeColumnPropTypes } from 'vxe-table'
        import XEUtils from 'xe-utils'

        export default defineComponent({
          setup () {
            const xTable2 = ref({} as VxeTableInstance)

            const tableData2 = ref([
              { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
              { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
              { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
              { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
              { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' },
              { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: 21, address: 'test abc' },
              { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: 29, address: 'test abc' },
              { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: 35, address: 'test abc' }
            ])

            const toggleFixedColumn = (field: string, type: VxeColumnPropTypes.Fixed) => {
              const $table = xTable2.value
              const column = $table.getColumnByField(field)
              if (column) {
                const groupFixed = column.fixed ? null : type
                // 将分组整体设置固定列
                XEUtils.eachTree([column], column => {
                  column.fixed = groupFixed
                })
                // 刷新列
                $table.refreshColumn()
              }
            }

            return {
              xTable2,
              tableData2,
              toggleFixedColumn
            }
          }
        }
        `
      ]
    }
  }
})
</script>
