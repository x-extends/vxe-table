<template>
  <div>
    <p class="tip">
      通过设置 <table-api-link prop="expand-config"/> 属性和 type=<table-api-link prop="expand"/> 与 <table-column-api-link prop="slot"/> 可以开启展开行功能<br>
      <span class="red">（注：展开行不能用于虚拟滚动，该示例仅供参考）</span>
    </p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="toggleSeqFixed">切换第一固定列</vxe-button>
        <vxe-button @click="toggleExpandFixed">切换第二固定列</vxe-button>
        <vxe-button @click="toggleAgeFixed">切换第五固定列</vxe-button>
        <vxe-button @click="$refs.xTable1.toggleRowExpand(demo1.tableData[1])">切换第二行展开</vxe-button>
        <vxe-button @click="$refs.xTable1.setRowExpand([demo1.tableData[2], demo1.tableData[3]], true)">设置第三、四行展开</vxe-button>
        <vxe-button @click="$refs.xTable1.setAllRowExpand(true)">设置所有行展开</vxe-button>
        <vxe-button @click="$refs.xTable1.clearRowExpand()">关闭所有行展开</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      ref="xTable1"
      border
      auto-resize
      :data="demo1.tableData"
      @toggle-row-expand="toggleExpandChangeEvent">
      <vxe-column type="seq" width="60" :fixed="demo1.seqFixed"></vxe-column>
      <vxe-column type="expand" width="80" :fixed="demo1.expandFixed">
        <template #content="{ row, rowIndex }">
          <div v-if="rowIndex === 1" class="expand-wrapper">
            <vxe-table
              border
              :data="demo1.otherList">
              <vxe-column field="role" title="Role"></vxe-column>
              <vxe-column field="address" title="Address"></vxe-column>
            </vxe-table>
          </div>
          <div v-else class="expand-wrapper">
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
                <span>{{ row.age }}</span>
              </li>
              <li>
                <span>CreateTime：</span>
                <span>{{ row.address }}</span>
              </li>
            </ul>
          </div>
        </template>
      </vxe-column>
      <vxe-column field="name" title="Name" width="400"></vxe-column>
      <vxe-column field="sex" title="Sex" width="400"></vxe-column>
      <vxe-column field="age" title="Age" width="400" :fixed="demo1.ageFixed"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
      <pre-code class="css">{{ demoCodes[2] }}</pre-code>
    </pre>

    <p class="tip">默认展开指定行，通过 <table-api-link prop="expandRowKeys"/> 参数设置默认展开行，指定默认值需要有 <table-api-link prop="row-id"/></p>

    <vxe-table
      border
      :row-config="{keyField: 'id'}"
      :expand-config="{expandRowKeys: [10004]}"
      :data="demo2.tableData">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column type="expand" width="60">
        <template #content="{ row, rowIndex }">
          <div v-if="rowIndex === 1" class="expand-wrapper">
            <vxe-table
              border
              :data="demo2.tableData">
              <vxe-column field="role" title="Role"></vxe-column>
              <vxe-column field="age" title="Age"></vxe-column>
            </vxe-table>
          </div>
          <div v-else class="expand-wrapper">
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
                <span>{{ row.age }}</span>
              </li>
              <li>
                <span>CreateTime：</span>
                <span>{{ row.address }}</span>
              </li>
            </ul>
          </div>
        </template>
      </vxe-column>
      <vxe-column field="name" title="Name"></vxe-column>
      <vxe-column field="sex" title="Sex"></vxe-column>
      <vxe-column field="age" title="Age"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[3] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[4] }}</pre-code>
      <pre-code class="css">{{ demoCodes[5] }}</pre-code>
    </pre>

    <p class="tip">
      默认展开所有行，通过 <table-api-link prop="expandAll"/> 参数设置默认展开所有行<br>
      还可以配置 <table-api-link prop="labelField"/> 列显示属性
    </p>

    <vxe-table
      border
      :data="demo3.tableData"
      :expand-config="{labelField: 'name', expandAll: true}">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column type="expand" title="Name">
        <template #content="{ row }">
          <ul class="expand-wrapper">
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
              <span>{{ row.age }}</span>
            </li>
            <li>
              <span>CreateTime：</span>
              <span>{{ row.address }}</span>
            </li>
          </ul>
        </template>
      </vxe-column>
      <vxe-column field="sex" title="Sex"></vxe-column>
      <vxe-column field="age" title="Age"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[6] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[7] }}</pre-code>
      <pre-code class="css">{{ demoCodes[8] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, nextTick } from 'vue'
import { VxeTableInstance, VxeTableEvents, VxeColumnPropTypes } from '../../../../types/index'

export default defineComponent({
  setup () {
    const xTable1 = ref({} as VxeTableInstance)

    const demo1 = reactive({
      seqFixed: null as VxeColumnPropTypes.Fixed,
      expandFixed: null as VxeColumnPropTypes.Fixed,
      ageFixed: null as VxeColumnPropTypes.Fixed,
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc test abc test abc test abc test abc test abc test abc test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 36, address: 'Guangzhou test abc test abc test abc test abc test abc test abc test abc' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 24, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Man', age: 34, address: 'test abc' }
      ],
      otherList: [
        { id: 50001, name: 'Test5001', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 50002, name: 'Test5002', role: 'Test', sex: 'Women', age: 22, address: 'test abc test abc test abc test abc test abc' }
      ]
    })

    const toggleSeqFixed = () => {
      demo1.seqFixed = demo1.seqFixed ? null : 'left'
      nextTick(() => {
        const $table = xTable1.value
        $table.refreshColumn()
      })
    }

    const toggleExpandFixed = () => {
      demo1.expandFixed = demo1.expandFixed ? null : 'left'
      nextTick(() => {
        const $table = xTable1.value
        $table.refreshColumn()
      })
    }

    const toggleAgeFixed = () => {
      demo1.ageFixed = demo1.ageFixed ? null : 'right'
      nextTick(() => {
        const $table = xTable1.value
        $table.refreshColumn()
      })
    }

    const toggleExpandChangeEvent: VxeTableEvents.ToggleRowExpand = ({ expanded }) => {
      console.log('行展开事件' + expanded)
    }

    const demo2 = reactive({
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 36, address: 'Guangzhou' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 24, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Man', age: 34, address: 'test abc' }
      ]
    })

    const demo3 = reactive({
      tableData: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 36, address: 'Guangzhou' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 24, address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Man', age: 34, address: 'test abc' }
      ]
    })

    return {
      xTable1,
      demo1,
      toggleSeqFixed,
      toggleExpandFixed,
      toggleAgeFixed,
      toggleExpandChangeEvent,
      demo2,
      demo3,
      demoCodes: [
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-button @click="toggleSeqFixed">切换第一固定列</vxe-button>
            <vxe-button @click="toggleExpandFixed">切换第二固定列</vxe-button>
            <vxe-button @click="toggleAgeFixed">切换第五固定列</vxe-button>
            <vxe-button @click="$refs.xTable1.toggleRowExpand(demo1.tableData[1])">切换第二行展开</vxe-button>
            <vxe-button @click="$refs.xTable1.setRowExpand([demo1.tableData[2], demo1.tableData[3]], true)">设置第三、四行展开</vxe-button>
            <vxe-button @click="$refs.xTable1.setAllRowExpand(true)">设置所有行展开</vxe-button>
            <vxe-button @click="$refs.xTable1.clearRowExpand()">关闭所有行展开</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          ref="xTable1"
          border
          auto-resize
          :data="demo1.tableData"
          @toggle-row-expand="toggleExpandChangeEvent">
          <vxe-column type="seq" width="60" :fixed="demo1.seqFixed"></vxe-column>
          <vxe-column type="expand" width="80" :fixed="demo1.expandFixed">
            <template #content="{ row, rowIndex }">
              <div v-if="rowIndex === 1" class="expand-wrapper">
                <vxe-table
                  border
                  :data="demo1.otherList">
                  <vxe-column field="role" title="Role"></vxe-column>
                  <vxe-column field="address" title="Address"></vxe-column>
                </vxe-table>
              </div>
              <div v-else class="expand-wrapper">
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
                    <span>{{ row.age }}</span>
                  </li>
                  <li>
                    <span>CreateTime：</span>
                    <span>{{ row.address }}</span>
                  </li>
                </ul>
              </div>
            </template>
          </vxe-column>
          <vxe-column field="name" title="Name" width="400"></vxe-column>
          <vxe-column field="sex" title="Sex" width="400"></vxe-column>
          <vxe-column field="age" title="Age" width="400" :fixed="demo1.ageFixed"></vxe-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref, nextTick } from 'vue'
        import { VxeTableInstance, VxeTableEvents, VxeColumnPropTypes } from 'vxe-table'

        export default defineComponent({
          setup () {
            const xTable1 = ref({} as VxeTableInstance)

            const demo1 = reactive({
              seqFixed: null as VxeColumnPropTypes.Fixed,
              expandFixed: null as VxeColumnPropTypes.Fixed,
              ageFixed: null as VxeColumnPropTypes.Fixed,
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc test abc test abc test abc test abc test abc test abc test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 36, address: 'Guangzhou test abc test abc test abc test abc test abc test abc test abc' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 24, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Man', age: 34, address: 'test abc' }
              ],
              otherList: [
                { id: 50001, name: 'Test5001', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
                { id: 50002, name: 'Test5002', role: 'Test', sex: 'Women', age: 22, address: 'test abc test abc test abc test abc test abc' }
              ]
            })

            const toggleSeqFixed = () => {
              demo1.seqFixed = demo1.seqFixed ? null : 'left'
              nextTick(() => {
                const $table = xTable1.value
                $table.refreshColumn()
              })
            }

            const toggleExpandFixed = () => {
              demo1.expandFixed = demo1.expandFixed ? null : 'left'
              nextTick(() => {
                const $table = xTable1.value
                $table.refreshColumn()
              })
            }

            const toggleAgeFixed = () => {
              demo1.ageFixed = demo1.ageFixed ? null : 'right'
              nextTick(() => {
                const $table = xTable1.value
                $table.refreshColumn()
              })
            }

            const toggleExpandChangeEvent: VxeTableEvents.ToggleRowExpand = ({ expanded }) => {
              console.log('行展开事件' + expanded)
            }

            return {
              demo1,
              toggleSeqFixed,
              toggleExpandFixed,
              toggleAgeFixed,
              toggleExpandChangeEvent
            }
          }
        })
        `,
        `
        .expand-wrapper {
          padding: 20px;
        }
        `,
        `
        <vxe-table
          border
          row-id="id"
          :expand-config="{expandRowKeys: [10004]}"
          :data="demo2.tableData">
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column type="expand" width="60">
            <template #content="{ row, rowIndex }">
              <div v-if="rowIndex === 1" class="expand-wrapper">
                <vxe-table
                  border
                  :data="demo2.tableData">
                  <vxe-column field="role" title="Role"></vxe-column>
                  <vxe-column field="age" title="Age"></vxe-column>
                </vxe-table>
              </div>
              <div v-else class="expand-wrapper">
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
                    <span>{{ row.age }}</span>
                  </li>
                  <li>
                    <span>CreateTime：</span>
                    <span>{{ row.address }}</span>
                  </li>
                </ul>
              </div>
            </template>
          </vxe-column>
          <vxe-column field="name" title="Name"></vxe-column>
          <vxe-column field="sex" title="Sex"></vxe-column>
          <vxe-column field="age" title="Age"></vxe-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive } from 'vue'
        import { VxeTableEvents } from 'vxe-table'

        export default defineComponent({
          setup () {
            const demo2 = reactive({
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 36, address: 'Guangzhou' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 24, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Man', age: 34, address: 'test abc' }
              ]
            })

            return {
              demo2
            }
          }
        })
        `,
        `
        .expand-wrapper {
          padding: 20px;
        }
        `,
        `
        <vxe-table
          border
          :data="demo3.tableData"
          :expand-config="{labelField: 'name', expandAll: true}">
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column type="expand" title="Name">
            <template #content="{ row }">
              <ul class="expand-wrapper">
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
                  <span>{{ row.age }}</span>
                </li>
                <li>
                  <span>CreateTime：</span>
                  <span>{{ row.address }}</span>
                </li>
              </ul>
            </template>
          </vxe-column>
          <vxe-column field="sex" title="Sex"></vxe-column>
          <vxe-column field="age" title="Age"></vxe-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive } from 'vue'
        import { VxeTableEvents } from 'vxe-table'

        export default defineComponent({
          setup () {
            const demo1 = reactive({
              tableData: [
                { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
                { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
                { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
                { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 36, address: 'Guangzhou' },
                { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 24, address: 'Shanghai' },
                { id: 10006, name: 'Test6', role: 'Designer', sex: 'Man', age: 34, address: 'test abc' }
              ],
              otherList: [
                { id: 50001, name: 'Test5001', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
                { id: 50002, name: 'Test5002', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' }
              ]
            })

            return {
              demo3
            }
          }
        })
        `,
        `
        .expand-wrapper {
          padding: 20px;
        }
        `
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
.expand-wrapper {
  padding: 20px;
}
</style>
