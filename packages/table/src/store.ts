import type { VxeTableConstructor, VxeTablePrivateMethods } from '../../../types'

interface CrossTableDragRowObj {
  row: any
}

// 跨表拖拽
export const crossTableDragRowGlobal: CrossTableDragRowObj = {
  row: null
}

export function getCrossTableDragRowInfo ($xeTable: VxeTableConstructor & VxeTablePrivateMethods) {
  const crossTableDragRowInfo = ($xeTable as any).crossTableDragRowInfo as CrossTableDragRowObj
  return crossTableDragRowInfo
}
