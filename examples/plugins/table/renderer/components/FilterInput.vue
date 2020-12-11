<template>
  <div class="my-filter-input">
    <vxe-input type="text" v-model="demo1.option.data" placeholder="支持回车筛选" @keyup="keyupEvent" @input="changeOptionEvent"></vxe-input>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue'
import { VxeInputEvents, VxeGlobalRendererHandles } from '../../../../../types/vxe-table'

export default defineComponent({
  name: 'FilterInput',
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
        const checked = !!option.data
        $panel.changeOption(null, checked, option)
      }
    }

    const keyupEvent: VxeInputEvents.Keyup = ({ $event }) => {
      const { params } = props
      if (params) {
        const { $panel } = params
        if ($event.keyCode === 13) {
          $panel.confirmFilter($event)
        }
      }
    }

    load()

    return {
      demo1,
      changeOptionEvent,
      keyupEvent
    }
  }
})
</script>

<style scoped>
.my-filter-input {
  padding: 10px;
}
</style>
