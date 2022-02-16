<template>
  <div>
    <p class="tip">
      可编辑树表格的懒加载
    </p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      show-overflow
      resizable
      keep-source
      ref="xTree1"
      :row-config="{keyField: 'id'}"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      :tree-config="demo1.tableTree"
      :data="demo1.tableData">
      <vxe-column field="name" title="Name" width="260" tree-node :edit-render="{name: 'input'}"></vxe-column>
      <vxe-column field="size" title="Size" :edit-render="{name: 'input'}"></vxe-column>
      <vxe-column field="type" title="Type" :edit-render="{name: 'input'}"></vxe-column>
      <vxe-column field="date" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { VXETable } from '../../../../packages/all'
import { VxeTableInstance, VxeTablePropTypes } from '../../../../types/index'

export default defineComponent({
  setup () {
    const demo1 = reactive({
      tableTree: {
        lazy: true,
        transform: true,
        hasChild: 'hasChild',
        loadMethod ({ row }) {
          // 异步加载子节点
          return new Promise(resolve => {
            setTimeout(() => {
              const childs = [
                { id: row.id + 100000, parentId: row.id, name: row.name + 'Test45', type: 'mp4', size: null, date: '2021-10-03', hasChild: true },
                { id: row.id + 150000, parentId: row.id, name: row.name + 'Test56', type: 'mp3', size: null, date: '2021-07-09', hasChild: false }
              ]
              resolve(childs)
            }, 500)
          })
        }
      } as VxeTablePropTypes.TreeConfig,
      tableData: [
        { id: 10000, parentId: null, name: 'test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
        { id: 10050, parentId: null, name: 'Test2', type: 'mp4', size: null, date: '2021-04-01', hasChild: true },
        { id: 23666, parentId: null, name: 'Test23', type: 'mp4', size: null, date: '2021-01-02', hasChild: true },
        { id: 24555, parentId: null, name: 'test abc9', type: 'avi', size: 224, date: '2020-10-01' }
      ] as any[]
    })

    const xTree1 = ref({} as VxeTableInstance)

    const getUpdateEvent = () => {
      const $table = xTree1.value
      const updateRecords = $table.getUpdateRecords()
      VXETable.modal.alert(updateRecords.length)
    }

    return {
      xTree1,
      demo1,
      getUpdateEvent,
      demoCodes: [
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-button @click="getUpdateEvent">获取修改</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          show-overflow
          resizable
          keep-source
          ref="xTree1"
          row-id="id"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          :tree-config="demo1.tableTree"
          :data="demo1.tableData">
          <vxe-column field="name" title="Name" width="260" tree-node :edit-render="{name: 'input'}"></vxe-column>
          <vxe-column field="size" title="Size" :edit-render="{name: 'input'}"></vxe-column>
          <vxe-column field="type" title="Type" :edit-render="{name: 'input'}"></vxe-column>
          <vxe-column field="date" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VXETable, VxeTableInstance, VxeTablePropTypes } from 'vxe-table'

        export default defineComponent({
          setup () {
            const demo1 = reactive({
              tableTree: {
                lazy: true,
                transform: true,
                hasChild: 'hasChild',
                loadMethod ({ row }) {
                  // 异步加载子节点
                  return new Promise(resolve => {
                    setTimeout(() => {
                      const childs = [
                        { id: row.id + 100000, parentId: row.id, name: row.name + 'Test45', type: 'mp4', size: null, date: '2021-10-03', hasChild: true },
                        { id: row.id + 150000, parentId: row.id, name: row.name + 'Test56', type: 'mp3', size: null, date: '2021-07-09', hasChild: false }
                      ]
                      resolve(childs)
                    }, 500)
                  })
                }
              } as VxeTablePropTypes.TreeConfig,
              tableData: [
                { id: 10000, parentId: null, name: 'test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
                { id: 10050, parentId: null, name: 'Test2', type: 'mp4', size: null, date: '2021-04-01', hasChild: true },
                { id: 23666, parentId: null, name: 'Test23', type: 'mp4', size: null, date: '2021-01-02', hasChild: true },
                { id: 24555, parentId: null, name: 'test abc9', type: 'avi', size: 224, date: '2020-10-01' }
              ] as any[]
            })

            const xTree1 = ref({} as VxeTableInstance)

            const getUpdateEvent = () => {
              const $table = xTree1.value
              const updateRecords = $table.getUpdateRecords()
              VXETable.modal.alert(updateRecords.length)
            }

            return {
              xTree1,
              demo1,
              getUpdateEvent
            }
          }
        })
        `
      ]
    }
  }
})
</script>
