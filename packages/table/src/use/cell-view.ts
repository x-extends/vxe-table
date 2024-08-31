import { computed } from 'vue'
import XEUtils from 'xe-utils'

import type { VxeTableDefines, VxeGlobalRendererHandles } from '../../../../types'

export function useCellView <D = any, P = Record<string, any>> (props: {
  renderOpts: VxeGlobalRendererHandles.RenderTableCellOptions | VxeGlobalRendererHandles.RenderTableEditOptions
  renderParams: VxeGlobalRendererHandles.RenderTableCellParams | VxeGlobalRendererHandles.RenderTableEditParams
}) {
  const currColumn = computed<VxeTableDefines.ColumnInfo<D>>(() => {
    const { renderParams } = props
    return renderParams.column
  })

  const currRow = computed<D>(() => {
    const { renderParams } = props
    return renderParams.row
  })

  const cellOptions = computed<P>(() => {
    const { renderOpts } = props
    return renderOpts.props as any || {}
  })

  const cellModel = computed({
    get () {
      const { renderParams } = props
      const { row, column } = renderParams
      return XEUtils.get(row, column.field)
    },
    set (value) {
      const { renderParams } = props
      const { row, column } = renderParams
      return XEUtils.set(row, column.field, value)
    }
  })

  return {
    currColumn,
    currRow,
    cellModel,
    cellOptions
  }
}
