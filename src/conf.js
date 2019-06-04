import XEUtils from 'xe-utils'
import zhCNLocat from '../lib/locale/lang/zh-CN'

const GlobalConfig = {
  // size: null,
  // showAllOverflow: null,
  // showHeaderAllOverflow: null,
  // contextMenu: null,
  // resizeInterval: 250,
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
    sortAsc: 'vxe-icon--caret-top',
    sortDesc: 'vxe-icon--caret-bottom',
    filter: 'vxe-icon--funnel',
    edit: 'vxe-icon--edit-outline',
    tree: 'vxe-icon--caret-right',
    jumpPrev: 'vxe-icon--d-arrow-left',
    jumpNext: 'vxe-icon--d-arrow-right',
    prevPage: 'vxe-icon--arrow-left',
    nextPage: 'vxe-icon--arrow-right'
  },
  pager: {
    // pageSize: 10,
    // pagerCount: 7,
    // pageSizes: [10, 15, 20, 50, 100],
    // layouts: ['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total']
  },
  i18n: (key, value) => XEUtils.get(zhCNLocat, key)
}

export default GlobalConfig
