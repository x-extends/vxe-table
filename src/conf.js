import XEUtils from 'xe-utils'
import zhCNLocat from '../lib/locale/lang/zh-CN'

const GlobalConfig = {
  // size: null,
  // showAllOverflow: null,
  // showHeaderAllOverflow: null,
  // contextMenu: null,
  optimization: {
    animat: true,
    scrollX: {
      gt: 60,
      oSize: 6,
      rSize: 18,
      vSize: 0
    },
    scrollY: {
      gt: 500,
      oSize: 30,
      rSize: 80,
      vSize: 0,
      rHeight: 0
    }
  },
  tooltipConfig: {
    theme: 'dark'
  },
  iconMap: {
    sortAsc: 'vxe-sort--asc-icon',
    sortDesc: 'vxe-sort--desc-icon',
    filter: 'vxe-filter--icon',
    edit: 'vxe-edit--icon',
    tree: 'vxe-tree--node-icon'
  },
  pagination: {
    // pageSize: 10,
    // pagerCount: 7,
    // pageSizes: [10, 15, 20, 50, 100],
    // layouts: ['PrevPage', 'NextPage', 'Jump', 'Sizes', 'Total']
  },
  i18n: (key, value) => XEUtils.get(zhCNLocat, key)
}

export default GlobalConfig
