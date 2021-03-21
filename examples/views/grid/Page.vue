<template>
  <div>
    <p class="tip">
      分页<br>
      响应结果默认必须是数组，非数组情况下可以通过 <grid-api-link prop="props"/> 修改
    </p>

    <vxe-grid  v-bind="gridOptions">
      <template #pager>
        <vxe-pager
          :layouts="['Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump', 'Total']"
          v-model:current-page="tablePage.currentPage"
          v-model:page-size="tablePage.pageSize"
          :total="tablePage.total"
          @page-change="handlePageChange">
        </vxe-pager>
      </template>
    </vxe-grid>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { VxeGridProps, VxePagerEvents } from '../../../types/index'

export default defineComponent({
  setup () {
    const tablePage = reactive({
      total: 0,
      currentPage: 1,
      pageSize: 10
    })

    const gridOptions = reactive({
      border: true,
      resizable: true,
      height: 530,
      loading: false,
      data: [],
      columns: [
        { type: 'seq', width: 60 },
        { type: 'checkbox', width: 50 },
        { field: 'name', title: 'Name' },
        { field: 'nickname', title: 'Nickname' },
        { field: 'role', title: 'Role' },
        { field: 'address', title: 'Address', showOverflow: true }
      ]
    } as VxeGridProps)

    const findList = () => {
      gridOptions.loading = true
      setTimeout(() => {
        gridOptions.loading = false
        tablePage.total = 10
        gridOptions.data = [
          { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '1', age: 28, address: 'Shenzhen' },
          { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: '0', age: 22, address: 'Guangzhou' },
          { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: '1', age: 32, address: 'Shanghai' },
          { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '0', age: 23, address: 'Shenzhen' },
          { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: '0', age: 30, address: 'Shanghai' },
          { id: 10006, name: 'Test6', nickname: 'T6', role: 'Develop', sex: '0', age: 27, address: 'Shanghai' },
          { id: 10007, name: 'Test7', nickname: 'T7', role: 'Develop', sex: '1', age: 29, address: 'Shenzhen' },
          { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '0', age: 32, address: 'Shanghai' },
          { id: 10009, name: 'Test9', nickname: 'T9', role: 'Develop', sex: '1', age: 30, address: 'Shenzhen' },
          { id: 10010, name: 'Test10', nickname: 'T10', role: 'Develop', sex: '0', age: 34, address: 'Shanghai' }
        ]
      }, 300)
    }

    const searchEvent = () => {
      tablePage.currentPage = 1
      findList()
    }

    const handlePageChange: VxePagerEvents.PageChange = ({ currentPage, pageSize }) => {
      tablePage.currentPage = currentPage
      tablePage.pageSize = pageSize
      findList()
    }

    findList()

    return {
      tablePage,
      gridOptions,
      searchEvent,
      handlePageChange,
      demoCodes: [
        `
        <vxe-grid  v-bind="gridOptions">
          <template #pager>
            <vxe-pager
              :layouts="['Sizes', 'PrevJump', 'PrevPage', 'Number', 'NextPage', 'NextJump', 'FullJump', 'Total']"
              v-model:current-page="tablePage.currentPage"
              v-model:page-size="tablePage.pageSize"
              :total="tablePage.total"
              @page-change="handlePageChange">
            </vxe-pager>
          </template>
        </vxe-grid>
        `,
        `
        import { defineComponent, reactive } from 'vue'
        import { VxeGridProps, VxePagerEvents } from 'vxe-table'

        export default defineComponent({
          setup () {
            const tablePage = reactive({
              total: 0,
              currentPage: 1,
              pageSize: 10
            })

            const gridOptions = reactive({
              border: true,
              resizable: true,
              height: 530,
              loading: false,
              data: [],
              columns: [
                { type: 'seq', width: 60 },
                { type: 'checkbox', width: 50 },
                { field: 'name', title: 'Name' },
                { field: 'nickname', title: 'Nickname' },
                { field: 'role', title: 'Role' },
                { field: 'address', title: 'Address', showOverflow: true }
              ]
            } as VxeGridProps)

            const findList = () => {
              gridOptions.loading = true
              setTimeout(() => {
                gridOptions.loading = false
                tablePage.total = 10
                gridOptions.data = [
                  { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: '1', age: 28, address: 'Shenzhen' },
                  { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: '0', age: 22, address: 'Guangzhou' },
                  { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: '1', age: 32, address: 'Shanghai' },
                  { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: '0', age: 23, address: 'Shenzhen' },
                  { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: '0', age: 30, address: 'Shanghai' },
                  { id: 10006, name: 'Test6', nickname: 'T6', role: 'Develop', sex: '0', age: 27, address: 'Shanghai' },
                  { id: 10007, name: 'Test7', nickname: 'T7', role: 'Develop', sex: '1', age: 29, address: 'Shenzhen' },
                  { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: '0', age: 32, address: 'Shanghai' },
                  { id: 10009, name: 'Test9', nickname: 'T9', role: 'Develop', sex: '1', age: 30, address: 'Shenzhen' },
                  { id: 10010, name: 'Test10', nickname: 'T10', role: 'Develop', sex: '0', age: 34, address: 'Shanghai' }
                ]
              }, 300)
            }

            const searchEvent = () => {
              tablePage.currentPage = 1
              findList()
            }

            const handlePageChange: VxePagerEvents.PageChange = ({ currentPage, pageSize }) => {
              tablePage.currentPage = currentPage
              tablePage.pageSize = pageSize
              findList()
            }

            findList()

            return {
              tablePage,
              gridOptions,
              searchEvent,
              handlePageChange
            }
          }
        })
        `
      ]
    }
  }
})
</script>
