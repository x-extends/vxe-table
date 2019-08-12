"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// import XEUtils from 'xe-utils'
// import zhCNLocat from '../lib/locale/lang/zh-CN'
var GlobalConfig = {
  // showOverflow: null,
  // showHeaderOverflow: null,
  // resizeInterval: 250,
  // size: null,
  // validConfig: {
  //   message: 'default'
  // },
  // resizable: false,
  // stripe: false,
  // border: false,
  fit: true,
  showHeader: true,
  emptyCell: '　',
  rowId: '_XID',
  // 行数据的唯一主键字段名
  version: 0,
  // 版本号，对于某些带数据缓存的功能有用到，上升版本号可以用于重置数据
  optimization: {
    animat: true,
    scrollX: {
      gt: 500,
      oSize: 6,
      rSize: 18,
      vSize: 0
    },
    scrollY: {
      gt: 500,
      oSize: 30,
      rSize: 100,
      vSize: 0,
      rHeight: 0
    }
  },
  icon: {
    sortAsc: 'vxe-icon--caret-top',
    sortDesc: 'vxe-icon--caret-bottom',
    filter: 'vxe-icon--funnel',
    edit: 'vxe-icon--edit-outline',
    tree: 'vxe-icon--caret-right',
    refresh: 'vxe-icon--refresh',
    custom: 'vxe-icon--menu',
    jumpPrev: 'vxe-icon--d-arrow-left',
    jumpNext: 'vxe-icon--d-arrow-right',
    prevPage: 'vxe-icon--arrow-left',
    nextPage: 'vxe-icon--arrow-right',
    msgClose: 'vxe-icon--close',
    msgInfo: 'vxe-icon--info',
    msgSuccess: 'vxe-icon--success',
    msgWarning: 'vxe-icon--warning',
    msgError: 'vxe-icon--error',
    msgQuestion: 'vxe-icon--question',
    msgLoading: 'vxe-icon--refresh roll'
  },
  grid: {},
  menu: {},
  tooltip: {
    // zIndex: 3000,
    trigger: 'hover',
    theme: 'dark'
  },
  pager: {// pageSize: 10,
    // pagerCount: 7,
    // pageSizes: [10, 15, 20, 50, 100],
    // layouts: ['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total']
  },
  toolbar: {// resizable: {
    //   storage: false
    // },
    // setting: {
    //   storage: false
    // },
    // buttons: []
  },
  message: {
    // zIndex: 999,
    lockView: true,
    lockScroll: true,
    mask: true,
    duration: 3000,
    animat: true
  },
  i18n: function i18n(key) {
    return key;
  },
  _tip: 0 // 是否按需加载了 tooltip

};
var _default = GlobalConfig;
exports.default = _default;