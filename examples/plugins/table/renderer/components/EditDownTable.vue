<template>
  <div class="edit-down-table">
    <vxe-pulldown class="edit-down-pulldown" ref="xDown" transfer>
      <template #default>
        <vxe-input class="edit-down-input" v-model="demo1.row[demo1.column.property]" suffix-icon="fa fa-caret-down" @keyup="keyupEvent" @click="clickEvent" @suffix-click="suffixClick"></vxe-input>
      </template>
      <template #dropdown>
        <div class="edit-down-wrapper">
          <vxe-grid
            highlight-hover-row
            auto-resize
            height="auto"
            :loading="demo1.loading"
            :pager-config="demo1.tablePage"
            :data="demo1.tableData"
            :columns="demo1.tableColumn"
            @cell-click="selectEvent"
            @page-change="pageChangeEvent">
          </vxe-grid>
        </div>
      </template>
    </vxe-pulldown>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref, Ref } from 'vue'
import { VxePulldownInstance, VxeTableEvents, VxeColumnOptions, VxePagerEvents, VxeGlobalRendererHandles } from '../../../../../types/vxe-table'

export default defineComponent({
  name: 'EditDownTable',
  props: {
    params: Object as PropType<VxeGlobalRendererHandles.RenderEditParams>
  },
  setup (props) {
    const demo1 = reactive({
      row: null as any,
      column: null as any,
      loading: false,
      tableData: [] as any[],
      tableColumn: [
        { type: 'seq' },
        { field: 'name', title: 'Name' },
        { field: 'role', title: 'Role' },
        { field: 'sex', title: 'Sex' }
      ] as VxeColumnOptions[],
      tablePage: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      }
    })

    const xDown = ref() as Ref<VxePulldownInstance>

    const getData = (): Promise<any[]> => {
      return new Promise(resolve => {
        setTimeout(() => {
          const list = [
            { name: 'Test1', role: '前端', sex: '男' },
            { name: 'Test2', role: '后端', sex: '男' },
            { name: 'Test3', role: '测试', sex: '男' },
            { name: 'Test4', role: '设计师', sex: '女' },
            { name: 'Test5', role: '前端', sex: '男' },
            { name: 'Test6', role: '前端', sex: '男' },
            { name: 'Test7', role: '前端', sex: '男' }
          ]
          resolve(list)
        }, 100)
      })
    }

    const load = () => {
      const { params } = props
      if (params) {
        const { row, column } = params
        demo1.row = row
        demo1.column = column
        getData().then((data) => {
          demo1.tableData = data
        })
      }
    }

    const clickEvent = () => {
      const $pulldown = xDown.value
      $pulldown.showPanel()
    }

    const keyupEvent = () => {
      const { row, column } = demo1
      if (column) {
        const cellValue = row[column.property]
        demo1.loading = true
        getData().then((data) => {
          demo1.loading = false
          if (cellValue) {
            demo1.tableData = data.filter((item) => item.name.indexOf(cellValue) > -1)
          } else {
            demo1.tableData = data
          }
        })
      }
    }

    const suffixClick = () => {
      const $pulldown = xDown.value
      $pulldown.togglePanel()
    }

    const pageChangeEvent: VxePagerEvents.PageChange = ({ currentPage, pageSize }) => {
      demo1.tablePage.currentPage = currentPage
      demo1.tablePage.pageSize = pageSize
      demo1.loading = true
      getData().then((data) => {
        demo1.loading = false
        demo1.tableData = data
      })
    }

    const selectEvent: VxeTableEvents.CellClick = (params) => {
      const { row, column } = demo1
      if (column) {
        const $pulldown = xDown.value
        row[column.property] = params.row.name
        $pulldown.hidePanel()
      }
    }

    load()

    return {
      demo1,
      xDown,
      clickEvent,
      keyupEvent,
      suffixClick,
      pageChangeEvent,
      selectEvent
    }
  }
})
</script>

<style lang="scss" scoped>
.edit-down-pulldown {
  width: 100%;
}
.edit-down-wrapper {
  width: 600px;
  height: 300px;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.1);
}
</style>
