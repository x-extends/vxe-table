<template>
  <div class="edit-down-table">
    <vxe-pulldown class="edit-down-pulldown" ref="xDown" transfer>
      <template #default>
        <vxe-input class="edit-down-input" v-model="demo1.row[demo1.column.property]" suffix-icon="fa fa-caret-down" @keyup="keyupEvent" @click="clickEvent" @suffix-click="suffixClick"></vxe-input>
      </template>
      <template #dropdown>
        <div class="edit-down-wrapper">
          <vxe-grid v-bind="gridOptions" @cell-click="selectEvent" @page-change="pageChangeEvent"></vxe-grid>
        </div>
      </template>
    </vxe-pulldown>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref } from 'vue'
import { VxePulldownInstance, VxeTableEvents, VxeGridProps, VxePagerEvents, VxeGlobalRendererHandles } from '../../../../../types/index'

export default defineComponent({
  name: 'EditDownTable',
  props: {
    params: Object as PropType<VxeGlobalRendererHandles.RenderEditParams>
  },
  setup (props) {
    const demo1 = reactive({
      row: null as any,
      column: null as any
    })

    const xDown = ref({} as VxePulldownInstance)

    const gridOptions = reactive({
      highlightHoverRow: true,
      autoResize: true,
      height: 'auto',
      loading: false,
      pagerConfig: {
        total: 0,
        currentPage: 1,
        pageSize: 10
      },
      columns: [
        { type: 'seq' },
        { field: 'name', title: 'Name' },
        { field: 'role', title: 'Role' },
        { field: 'sex', title: 'Sex' }
      ],
      data: []
    } as VxeGridProps)

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
          gridOptions.data = data
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
        gridOptions.loading = true
        getData().then((data) => {
          gridOptions.loading = false
          if (cellValue) {
            gridOptions.data = data.filter((item) => item.name.indexOf(cellValue) > -1)
          } else {
            gridOptions.data = data
          }
        })
      }
    }

    const suffixClick = () => {
      const $pulldown = xDown.value
      $pulldown.togglePanel()
    }

    const pageChangeEvent: VxePagerEvents.PageChange = ({ currentPage, pageSize }) => {
      const { pagerConfig } = gridOptions
      if (pagerConfig) {
        pagerConfig.currentPage = currentPage
        pagerConfig.pageSize = pageSize
      }
      gridOptions.loading = true
      getData().then((data) => {
        gridOptions.loading = false
        gridOptions.data = data
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
      gridOptions,
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
