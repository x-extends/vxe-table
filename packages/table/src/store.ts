import { reactive } from 'vue'

interface CrossTableDragRowObj {
  row: any
}

// 跨表拖拽
export const crossTableDragRowInfo: CrossTableDragRowObj = reactive({
  row: null
})

export function getCrossTableDragRowInfo () {
  return crossTableDragRowInfo
}
