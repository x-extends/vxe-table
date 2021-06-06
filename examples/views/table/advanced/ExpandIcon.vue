<template>
  <div>
    <p class="tip">
      改变图标，通过设置 <table-api-link prop="expand-config"/>={<table-api-link prop="iconOpen"/>, <table-api-link prop="iconClose"/>} 局部替换默认的图标<br>
      也可以通过 <table-column-api-link prop="slot"/> 自定义内容模板，还可以使用 <router-link class="link" :to="{name: 'RendererExpand'}">渲染器</router-link> 创建可复用的展开行内容模板
    </p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="$refs.xTable.toggleRowExpand(demo1.tableData[1])">切换第二行展开</vxe-button>
        <vxe-button @click="$refs.xTable.setRowExpand([demo1.tableData[2], demo1.tableData[3]], true)">设置第三、四行展开</vxe-button>
        <vxe-button @click="$refs.xTable.setAllRowExpand(true)">设置所有行展开</vxe-button>
        <vxe-button @click="$refs.xTable.clearRowExpand()">关闭所有行展开</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      ref="xTable"
      border
      :expand-config="{iconOpen: 'fa fa-minus-square', iconClose: 'fa fa-plus-square'}"
      :data="demo1.tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column type="expand" title="Name">
        <template #default="{ row }">
          <span>{{ row.name }}</span>
        </template>
        <template #content="{ row, rowIndex }">
          <template v-if="rowIndex === 1">
            <vxe-table
              border
              :data="demo1.tableData">
              <vxe-table-column field="role" title="Role"></vxe-table-column>
              <vxe-table-column field="age" title="Age"></vxe-table-column>
            </vxe-table>
          </template>
          <template v-else>
            <ul>
              <li>
                <span>ID：</span>
                <span>{{ row.id }}</span>
              </li>
              <li>
                <span>Name：</span>
                <span>{{ row.name }}</span>
              </li>
              <li>
                <span>UpdateTime：</span>
                <span>{{ row.updateTime }}</span>
              </li>
              <li>
                <span>CreateTime：</span>
                <span>{{ row.createTime }}</span>
              </li>
            </ul>
          </template>
        </template>
      </vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">还可以通过 <table-api-link prop="expand-config"/>={<table-api-link prop="toggleMethod"/>} 方法实现展开与关闭的细节处理，返回值用来决定是否允许继续执行</p>

    <vxe-table
      border
      :expand-config="demo2.expandConfig"
      :data="demo2.tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column type="expand" title="Name">
        <template #default="{ row }">
          <span>{{ row.name }}</span>
        </template>
        <template #content="{ row, rowIndex }">
          <template v-if="rowIndex === 1">
            <vxe-table
              border
              :data="demo2.tableData">
              <vxe-table-column field="role" title="Role"></vxe-table-column>
              <vxe-table-column field="age" title="Age"></vxe-table-column>
            </vxe-table>
          </template>
          <template v-else>
            <ul>
              <li>
                <span>ID：</span>
                <span>{{ row.id }}</span>
              </li>
              <li>
                <span>Name：</span>
                <span>{{ row.name }}</span>
              </li>
              <li>
                <span>UpdateTime：</span>
                <span>{{ row.updateTime }}</span>
              </li>
              <li>
                <span>CreateTime：</span>
                <span>{{ row.createTime }}</span>
              </li>
            </ul>
          </template>
        </template>
      </vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[3] }}</pre-code>
    </pre>

    <p class="tip">还可以通过 <table-api-link prop="expand-config"/>={<table-api-link prop="visibleMethod"/>} 方法实现权限控制，返回值用来决定是否显示展开按钮</p>

    <vxe-table
      border
      :expand-config="demo3.expandConfig"
      :data="demo3.tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column type="expand" title="Name">
        <template #default="{ row }">
          <span>{{ row.name }}</span>
        </template>
        <template #content="{ row, rowIndex }">
          <template v-if="rowIndex === 1">
            <vxe-table
              border
              :data="demo3.tableData">
              <vxe-table-column field="role" title="Role"></vxe-table-column>
              <vxe-table-column field="age" title="Age"></vxe-table-column>
            </vxe-table>
          </template>
          <template v-else>
            <ul>
              <li>
                <span>ID：</span>
                <span>{{ row.id }}</span>
              </li>
              <li>
                <span>Name：</span>
                <span>{{ row.name }}</span>
              </li>
              <li>
                <span>UpdateTime：</span>
                <span>{{ row.updateTime }}</span>
              </li>
              <li>
                <span>CreateTime：</span>
                <span>{{ row.createTime }}</span>
              </li>
            </ul>
          </template>
        </template>
      </vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[4] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[5] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { VXETable } from '../../../../packages/all'
import { VxeTablePropTypes } from '../../../../types/index'

export default defineComponent({
  setup () {
    const demo1 = reactive({
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'vxe-table 从入门到放弃' }
      ]
    })

    const demo2 = reactive({
      expandConfig: {
        toggleMethod ({ expanded, row }) {
          if (expanded) {
            if (row.sex === '1') {
              VXETable.modal.message({ id: 'openErr', content: '不允许展开', status: 'error' })
              return false
            }
          } else {
            if (row.sex === '0') {
              VXETable.modal.message({ id: 'closeErr', content: '不允许关闭', status: 'error' })
              return false
            }
          }
          return true
        }
      } as VxeTablePropTypes.ExpandConfig,
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'vxe-table 从入门到放弃' }
      ]
    })

    const demo3 = reactive({
      expandConfig: {
        visibleMethod ({ row }) {
          if (row.sex === '1') {
            return false
          }
          return true
        }
      } as VxeTablePropTypes.ExpandConfig,
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'vxe-table 从入门到放弃' },
        { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'vxe-table 从入门到放弃' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'vxe-table 从入门到放弃' }
      ]
    })

    return {
      demo1,
      demo2,
      demo3,
      demoCodes: [
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-button @click="$refs.xTable.toggleRowExpand(demo1.tableData[1])">切换第二行展开</vxe-button>
            <vxe-button @click="$refs.xTable.setRowExpand([demo1.tableData[2], demo1.tableData[3]], true)">设置第三、四行展开</vxe-button>
            <vxe-button @click="$refs.xTable.setAllRowExpand(true)">设置所有行展开</vxe-button>
            <vxe-button @click="$refs.xTable.clearRowExpand()">关闭所有行展开</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          ref="xTable"
          border
          :expand-config="{iconOpen: 'fa fa-minus-square', iconClose: 'fa fa-plus-square'}"
          :data="demo1.tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column type="expand" title="Name">
            <template #default="{ row }">
              <span>{{ row.name }}</span>
            </template>
            <template #content="{ row, rowIndex }">
              <template v-if="rowIndex === 1">
                <vxe-table
                  border
                  :data="demo1.tableData">
                  <vxe-table-column field="role" title="Role"></vxe-table-column>
                  <vxe-table-column field="age" title="Age"></vxe-table-column>
                </vxe-table>
              </template>
              <template v-else>
                <ul>
                  <li>
                    <span>ID：</span>
                    <span>{{ row.id }}</span>
                  </li>
                  <li>
                    <span>Name：</span>
                    <span>{{ row.name }}</span>
                  </li>
                  <li>
                    <span>UpdateTime：</span>
                    <span>{{ row.updateTime }}</span>
                  </li>
                  <li>
                    <span>CreateTime：</span>
                    <span>{{ row.createTime }}</span>
                  </li>
                </ul>
              </template>
            </template>
          </vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive } from 'vue'

        export default defineComponent({
          setup () {
            const demo1 = reactive({
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'vxe-table 从入门到放弃' }
              ]
            })
          
            return {
              demo1
            }
          }
        })
        `,
        `
        <vxe-table
          border
          :expand-config="demo2.expandConfig"
          :data="demo2.tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column type="expand" title="Name">
            <template #default="{ row }">
              <span>{{ row.name }}</span>
            </template>
            <template #content="{ row, rowIndex }">
              <template v-if="rowIndex === 1">
                <vxe-table
                  border
                  :data="demo2.tableData">
                  <vxe-table-column field="role" title="Role"></vxe-table-column>
                  <vxe-table-column field="age" title="Age"></vxe-table-column>
                </vxe-table>
              </template>
              <template v-else>
                <ul>
                  <li>
                    <span>ID：</span>
                    <span>{{ row.id }}</span>
                  </li>
                  <li>
                    <span>Name：</span>
                    <span>{{ row.name }}</span>
                  </li>
                  <li>
                    <span>UpdateTime：</span>
                    <span>{{ row.updateTime }}</span>
                  </li>
                  <li>
                    <span>CreateTime：</span>
                    <span>{{ row.createTime }}</span>
                  </li>
                </ul>
              </template>
            </template>
          </vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive } from 'vue'
        import { VXETable, VxeTablePropTypes } from 'vxe-table'

        export default defineComponent({
          setup () {
            const demo2 = reactive({
              expandConfig: {
                toggleMethod ({ expanded, row }) {
                  if (expanded) {
                    if (row.sex === '1') {
                      VXETable.modal.message({ id: 'openErr', content: '不允许展开', status: 'error' })
                      return false
                    }
                  } else {
                    if (row.sex === '0') {
                      VXETable.modal.message({ id: 'closeErr', content: '不允许关闭', status: 'error' })
                      return false
                    }
                  }
                  return true
                }
              } as VxeTablePropTypes.ExpandConfig,
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'vxe-table 从入门到放弃' }
              ]
            })

            return {
              demo2
            }
          }
        })
        `,
        `
        <vxe-table
          border
          :expand-config="demo3.expandConfig"
          :data="demo3.tableData">
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column type="expand" title="Name">
            <template #default="{ row }">
              <span>{{ row.name }}</span>
            </template>
            <template #content="{ row, rowIndex }">
              <template v-if="rowIndex === 1">
                <vxe-table
                  border
                  :data="demo3.tableData">
                  <vxe-table-column field="role" title="Role"></vxe-table-column>
                  <vxe-table-column field="age" title="Age"></vxe-table-column>
                </vxe-table>
              </template>
              <template v-else>
                <ul>
                  <li>
                    <span>ID：</span>
                    <span>{{ row.id }}</span>
                  </li>
                  <li>
                    <span>Name：</span>
                    <span>{{ row.name }}</span>
                  </li>
                  <li>
                    <span>UpdateTime：</span>
                    <span>{{ row.updateTime }}</span>
                  </li>
                  <li>
                    <span>CreateTime：</span>
                    <span>{{ row.createTime }}</span>
                  </li>
                </ul>
              </template>
            </template>
          </vxe-table-column>
          <vxe-table-column field="sex" title="Sex"></vxe-table-column>
          <vxe-table-column field="age" title="Age"></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive } from 'vue'
        import { VxeTablePropTypes } from 'vxe-table'

        export default defineComponent({
          setup () {
            const demo3 = reactive({
              expandConfig: {
                visibleMethod ({ row }) {
                  if (row.sex === '1') {
                    return false
                  }
                  return true
                }
              } as VxeTablePropTypes.ExpandConfig,
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, address: 'vxe-table 从入门到放弃' },
                { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, address: 'vxe-table 从入门到放弃' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, address: 'vxe-table 从入门到放弃' }
              ]
            })

            return {
              demo3
            }
          }
        })
        `
      ]
    }
  }
})
</script>
