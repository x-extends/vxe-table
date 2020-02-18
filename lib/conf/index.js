"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var GlobalConfig = {
  // keepSource: false,
  // showOverflow: null,
  // showHeaderOverflow: null,
  // resizeInterval: 250,
  // size: null,
  // resizable: false,
  // stripe: false,
  // border: false,
  // radioConfig: {
  //   trigger: 'default'
  // },
  // checkboxConfig: {
  //   trigger: 'default'
  // },
  // sortConfig: {
  //   remote: false,
  //   trigger: 'default'
  // },
  // filterConfig: {
  //   remote: false
  // },
  // expandConfig: {
  //   trigger: 'default'
  // },
  // treeConfig: {
  //   children: 'children',
  //   hasChild: 'hasChild',
  //   indent: 20
  // },
  // tooltipConfig: {
  //   theme: 'dark'
  // },
  // validConfig: {
  //   message: 'default'
  // },
  // editConfig: {
  //   mode: 'cell'
  // },
  // contextMenu: {
  //   visibleMethod () {}
  // },
  fit: true,
  emptyCell: '　',
  showHeader: true,
  zIndex: 100,
  rowId: '_XID',
  // 行数据的唯一主键字段名
  version: 0,
  // 版本号，对于某些带数据缓存的功能有用到，上升版本号可以用于重置数据
  optimization: {
    animat: true,
    delayHover: 250,
    // rHeights: {
    //   default: 48,
    //   medium: 44,
    //   small: 40,
    //   mini: 36
    // },
    scrollX: {
      gt: 60 // oSize: 0,
      // rSize: 0
      // vSize: 0

    },
    scrollY: {
      gt: 100 // oSize: 0,
      // rSize: 0
      // vSize: 0,
      // rHeight: 0

    }
  },
  icon: {
    sortAsc: 'vxe-icon--caret-top',
    sortDesc: 'vxe-icon--caret-bottom',
    filterNone: 'vxe-icon--funnel',
    filterMatch: 'vxe-icon--funnel',
    edit: 'vxe-icon--edit-outline',
    treeLoaded: 'vxe-icon--refresh roll',
    treeOpen: 'vxe-icon--caret-right rotate90',
    treeClose: 'vxe-icon--caret-right',
    expandLoaded: 'vxe-icon--refresh roll',
    expandOpen: 'vxe-icon--arrow-right rotate90',
    expandClose: 'vxe-icon--arrow-right',
    refresh: 'vxe-icon--refresh',
    refreshLoading: 'vxe-icon--refresh roll',
    formPrefix: 'vxe-icon--question',
    formSuffix: 'vxe-icon--question',
    formFolding: 'vxe-icon--arrow-top rotate180',
    formUnfolding: 'vxe-icon--arrow-top',
    import: 'vxe-icon--upload',
    importRemove: 'vxe-icon--close',
    export: 'vxe-icon--download',
    zoomIn: 'vxe-icon--zoomin',
    zoomOut: 'vxe-icon--zoomout',
    custom: 'vxe-icon--menu',
    jumpPrev: 'vxe-icon--d-arrow-left',
    jumpNext: 'vxe-icon--d-arrow-right',
    prevPage: 'vxe-icon--arrow-left',
    nextPage: 'vxe-icon--arrow-right',
    jumpMore: 'vxe-icon--more',
    modalZoomIn: 'vxe-icon--square',
    modalZoomOut: 'vxe-icon--zoomout',
    modalClose: 'vxe-icon--close',
    modalInfo: 'vxe-icon--info',
    modalSuccess: 'vxe-icon--success',
    modalWarning: 'vxe-icon--warning',
    modalError: 'vxe-icon--error',
    modalQuestion: 'vxe-icon--question',
    modalLoading: 'vxe-icon--refresh roll',
    caretBottom: 'vxe-icon--caret-bottom',
    dropdownBottom: 'vxe-icon--arrow-bottom',
    btnLoading: 'vxe-icon--refresh roll'
  },
  grid: {
    proxyConfig: {
      autoLoad: true,
      message: true,
      props: {
        list: null,
        result: 'result',
        total: 'page.total'
      } // beforeItem: null,
      // beforeColumn: null,
      // beforeQuery: null,
      // beforeDelete: null,
      // afterDelete: null,
      // beforeSave: null,
      // afterSave: null

    }
  },
  tooltip: {
    trigger: 'hover',
    theme: 'dark',
    leaveDelay: 300
  },
  pager: {// perfect: true,
    // pageSize: 10,
    // pagerCount: 7,
    // pageSizes: [10, 15, 20, 50, 100],
    // layouts: ['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total']
  },
  form: {// colon: false
  },
  toolbar: {// import: {
    //   mode: 'covering'
    // },
    // export: {
    //   types: ['csv', 'html', 'xml', 'txt']
    // },
    // resizable: {
    //   storage: false
    // },
    // custom: {
    //   storage: false,
    //   isFooter: true
    // },
    // buttons: []
  },
  modal: {
    minWidth: 340,
    minHeight: 200,
    lockView: true,
    mask: true,
    duration: 3000,
    marginSize: 8,
    dblclickZoom: true,
    showTitleOverflow: true,
    animat: true,
    storage: false,
    storageKey: 'VXE_MODAL_POSITION'
  },
  i18n: function i18n(key) {
    return key;
  }
};
var _default = GlobalConfig;
exports.default = _default;