
import { PropType } from 'vue'
import { VxeUI } from '../../ui'
import { tableProps } from '../../table/src/props'

import type { VxeGridPropTypes } from '../../../types'

const { getConfig } = VxeUI

export const gridProps = {
  ...tableProps,
  layouts: Array as PropType<VxeGridPropTypes.Layouts>,
  columns: Array as PropType<VxeGridPropTypes.Columns<any>>,
  pagerConfig: Object as PropType<VxeGridPropTypes.PagerConfig>,
  proxyConfig: Object as PropType<VxeGridPropTypes.ProxyConfig<any>>,
  toolbarConfig: Object as PropType<VxeGridPropTypes.ToolbarConfig>,
  formConfig: Object as PropType<VxeGridPropTypes.FormConfig>,
  zoomConfig: Object as PropType<VxeGridPropTypes.ZoomConfig>,
  size: {
    type: String as PropType<VxeGridPropTypes.Size>,
    default: () => getConfig().grid.size || getConfig().size
  }
}
