<template>
  <div class="my-filter-complex">
    <div class="my-fc-type">
      <vxe-radio v-model="demo1.option.data.type" name="fType" label="has">包含</vxe-radio>
      <vxe-radio v-model="demo1.option.data.type" name="fType" label="eq">等于</vxe-radio>
    </div>
    <div class="my-fc-name">
      <vxe-input v-model="demo1.option.data.name" type="text" placeholder="请输入名称" @input="changeOptionEvent()"></vxe-input>
    </div>
    <div class="my-fc-footer">
      <vxe-button status="primary" @click="confirmEvent">确认</vxe-button>
      <vxe-button @click="resetEvent">重置</vxe-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue'
import { VxeGlobalRendererHandles } from '../../../../../types/vxe-table'

export default defineComponent({
  name: 'FilterComplex',
  props: {
    params: Object as PropType<VxeGlobalRendererHandles.RenderFilterParams>
  },
  setup (props) {
    const demo1 = reactive({
      option: null as any
    })

    const load = () => {
      const { params } = props
      if (params) {
        const { column } = params
        const option = column.filters[0]
        demo1.option = option
      }
    }

    const changeOptionEvent = () => {
      const { params } = props
      const { option } = demo1
      if (params && option) {
        const { $panel } = params
        const checked = !!option.data.name
        $panel.changeOption(null, checked, option)
      }
    }

    const confirmEvent = () => {
      const { params } = props
      if (params) {
        const { $panel } = params
        $panel.confirmFilter()
      }
    }

    const resetEvent = () => {
      const { params } = props
      if (params) {
        const { $panel } = params
        $panel.resetFilter()
      }
    }

    load()

    return {
      demo1,
      changeOptionEvent,
      confirmEvent,
      resetEvent
    }
  }
})
</script>

<style scoped>
.my-filter-complex {
  width: 260px;
  padding: 5px 15px 10px 15px;
}
.my-filter-complex .my-fc-type {
  padding: 8px 0;
}
.my-filter-complex .my-fc-footer {
  text-align: center;
}
</style>
