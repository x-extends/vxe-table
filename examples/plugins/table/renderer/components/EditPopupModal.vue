<template>
  <div class="edit-popup-modal">
    <vxe-input class="edit-popup-input" v-model="demo1.row[demo1.column.property]" placeholder="请选择"></vxe-input>
    <vxe-button class="edit-popup-button" icon="fa fa-list" type="text" @click="popupEvent"></vxe-button>
    <vxe-modal
      show-footer
      class="vxe-table--ignore-clear edit-popup-box"
      width="800"
      height="400"
      v-model="demo1.modalVisible"
      @confirm="confirmEvent">
      <template #default>
        <vxe-grid ref="xGrid" v-bind="gridOptions" @page-change="pageChangeEvent"></vxe-grid>
      </template>
    </vxe-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, ref } from 'vue'
import { VxeGridInstance, VxeGridProps, VxePagerEvents, VxeGlobalRendererHandles } from '../../../../../types/index'

export default defineComponent({
  name: 'EditPopupModal',
  props: {
    params: Object as PropType<VxeGlobalRendererHandles.RenderEditParams>
  },
  setup (props) {
    const demo1 = reactive({
      row: null as any,
      column: null as any,
      modalVisible: false
    })

    const xGrid = ref({} as VxeGridInstance)

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

    const popupEvent = () => {
      demo1.modalVisible = true
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

    const confirmEvent = () => {
      const { row, column } = demo1
      if (column) {
        const $grid = xGrid.value
        const selectRecords = $grid.getCheckboxRecords()
        row[column.property] = `${selectRecords.length}条`
      }
    }

    load()

    return {
      demo1,
      gridOptions,
      xGrid,
      popupEvent,
      pageChangeEvent,
      confirmEvent
    }
  }
})
</script>

<style lang="scss" scoped>
.edit-popup-modal {
  display: flex;
  align-items: center;
}
.edit-popup-input {
  width: auto;
  flex-grow: 1;
}
.edit-popup-button {
  flex-shrink: 0;
}
</style>
