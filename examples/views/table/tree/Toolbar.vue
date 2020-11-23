<template>
  <div>
    <p class="tip">
      增删改查、工具栏<br>
      <span class="red">（注：内置的 CRUD 管理器是不支持插入子节点的，如果要往子节点插入或删除节点数据，可以直接操作数据源）</span>
    </p>

    <vxe-toolbar ref="xToolbar" :refresh="{query: searchMethod}" export print custom>
      <template #buttons>
        <vxe-button @click="insertEvent">{{ $t('app.body.button.insert') }}</vxe-button>
        <vxe-button @click="saveEvent">保存</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      resizable
      show-overflow
      keep-source
      ref="xTree"
      row-id="id"
      :print-config="{}"
      :export-config="{}"
      :loading="demo1.loading"
      :tree-config="demo1.treeConfig"
      :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
      :data="demo1.tableData">
      <vxe-table-column type="checkbox" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name" tree-node></vxe-table-column>
      <vxe-table-column field="size" title="Size" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="type" title="Type" :edit-render="{name: 'input'}"></vxe-table-column>
      <vxe-table-column field="date" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, nextTick } from 'vue'
import { VXETable } from '../../../../packages/vxe-table'
import { VxeTableInstance, VxeToolbarInstance } from '../../../../types/vxe-table'
import XEUtils from 'xe-utils'

export default defineComponent({
  setup () {
    const demo1 = reactive({
      loading: false,
      tableData: [] as any[],
      treeConfig: {
        children: 'children'
      }
    })

    const xTree = ref({} as VxeTableInstance)
    const xToolbar = ref({} as VxeToolbarInstance)

    const findList = () => {
      demo1.loading = true
      return new Promise(resolve => {
        setTimeout(() => {
          demo1.tableData = [
            { id: 1000, name: 'vxe-table 从入门到放弃1', type: 'mp3', size: 1024, date: '2020-08-01' },
            {
              id: 1005,
              name: 'Test2',
              type: 'mp4',
              size: null,
              date: '2021-04-01',
              children: [
                { id: 24300, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
                { id: 20045, name: 'vxe-table 从入门到放弃4', type: 'html', size: 600, date: '2021-04-01' },
                {
                  id: 10053,
                  name: 'vxe-table 从入门到放弃96',
                  type: 'avi',
                  size: null,
                  date: '2021-04-01',
                  children: [
                    { id: 24330, name: 'vxe-table 从入门到放弃5', type: 'txt', size: 25, date: '2021-10-01' },
                    { id: 21011, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
                    { id: 22200, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' }
                  ]
                }
              ]
            },
            { id: 23666, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
            { id: 24555, name: 'vxe-table 从入门到放弃9', type: 'avi', size: 224, date: '2020-10-01' }
          ]
          demo1.loading = false
          resolve()
        }, 300)
      })
    }

    const insertEvent = async () => {
      const $table = xTree.value
      const record = {
        name: '新数据',
        date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd')
      }
      const { row: newRow } = await $table.insert(record)
      await $table.setActiveRow(newRow)
    }

    const searchMethod = () => {
      const $table = xTree.value
      // 清除所有状态
      $table.clearAll()
      return findList()
    }

    const saveEvent = () => {
      const $table = xTree.value
      const { insertRecords, updateRecords } = $table.getRecordset()
      VXETable.modal.alert(`insertRecords=${insertRecords.length} updateRecords=${updateRecords.length}`)
    }

    nextTick(() => {
      // 将表格和工具栏进行关联
      const $table = xTree.value
      const $toolbar = xToolbar.value
      $table.connect($toolbar)
      findList()
    })

    return {
      xTree,
      xToolbar,
      demo1,
      insertEvent,
      searchMethod,
      saveEvent,
      demoCodes: [
        `
        <vxe-toolbar ref="xToolbar" :refresh="{query: searchMethod}" export print custom>
          <template #buttons>
            <vxe-button @click="insertEvent">{{ $t('app.body.button.insert') }}</vxe-button>
            <vxe-button @click="saveEvent">保存</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          resizable
          show-overflow
          keep-source
          ref="xTree"
          row-id="id"
          :print-config="{}"
          :export-config="{}"
          :loading="demo1.loading"
          :tree-config="demo1.treeConfig"
          :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
          :data="demo1.tableData">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="Name" tree-node></vxe-table-column>
          <vxe-table-column field="size" title="Size" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="type" title="Type" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="date" title="Date" :edit-render="{name: '$input', props: {type: 'date'}}"></vxe-table-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref, nextTick } from 'vue'
        import { VXETable, VxeTableInstance, VxeToolbarInstance } from 'vxe-table'
        import XEUtils from 'xe-utils'

        export default defineComponent({
          setup () {
            const demo1 = reactive({
              loading: false,
              tableData: [],
              treeConfig: {
                children: 'children'
              }
            })

            const xTree = ref({} as VxeTableInstance)
            const xToolbar = ref({} as VxeToolbarInstance)

            const findList = () => {
              demo1.loading = true
              return new Promise(resolve => {
                setTimeout(() => {
                  demo1.tableData = [
                    { id: 1000, name: 'vxe-table 从入门到放弃1', type: 'mp3', size: 1024, date: '2020-08-01' },
                    {
                      id: 1005,
                      name: 'Test2',
                      type: 'mp4',
                      size: null,
                      date: '2021-04-01',
                      children: [
                        { id: 24300, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
                        { id: 20045, name: 'vxe-table 从入门到放弃4', type: 'html', size: 600, date: '2021-04-01' },
                        {
                          id: 10053,
                          name: 'vxe-table 从入门到放弃96',
                          type: 'avi',
                          size: null,
                          date: '2021-04-01',
                          children: [
                            { id: 24330, name: 'vxe-table 从入门到放弃5', type: 'txt', size: 25, date: '2021-10-01' },
                            { id: 21011, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
                            { id: 22200, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' }
                          ]
                        }
                      ]
                    },
                    { id: 23666, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
                    { id: 24555, name: 'vxe-table 从入门到放弃9', type: 'avi', size: 224, date: '2020-10-01' }
                  ]
                  demo1.loading = false
                  resolve()
                }, 300)
              })
            }

            const insertEvent = async () => {
              const $table = xTree.value
              const record = {
                name: '新数据',
                date: XEUtils.toDateString(new Date(), 'yyyy-MM-dd')
              }
              const { row: newRow } = await $table.insert(record)
              await $table.setActiveRow(newRow)
            }

            const searchMethod = () => {
              const $table = xTree.value
              // 清除所有状态
              $table.clearAll()
              return findList()
            }

            const saveEvent = () => {
              const $table = xTree.value
              const { insertRecords, updateRecords } = $table.getRecordset()
              VXETable.modal.alert(\`insertRecords=\${insertRecords.length} updateRecords=\${updateRecords.length}\`)
            }

            nextTick(() => {
              // 将表格和工具栏进行关联
              const $table = xTree.value
              const $toolbar = xToolbar.value
              $table.connect($toolbar)
              findList()
            })

            return {
              xTree,
              xToolbar,
              demo1,
              insertEvent,
              searchMethod,
              saveEvent
            }
          }
        })
        `
      ]
    }
  }
})
</script>
