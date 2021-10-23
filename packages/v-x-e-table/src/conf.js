const iconPrefix = 'vxe-icon--'

export default {
  size: null, // 全局尺寸
  zIndex: 999, // 全局 zIndex 起始值，如果项目的的 z-index 样式值过大时就需要跟随设置更大，避免被遮挡
  version: 0, // 版本号，对于某些带数据缓存的功能有用到，上升版本号可以用于重置数据
  // resizeInterval: 500,
  emptyCell: '　',
  table: {
    fit: true,
    showHeader: true,
    delayHover: 250,
    // keepSource: false,
    // showOverflow: null,
    // showHeaderOverflow: null,
    // showFooterOverflow: null,
    // resizeInterval: 500,
    // size: null,
    // zIndex: null,
    // resizable: false,
    // autoResize: false,
    // stripe: false,
    // border: false,
    // round: false,
    // emptyText: '暂无数据',
    // emptyRender: {
    //   name: ''
    // },
    radioConfig: {
      // trigger: 'default'
      strict: true
    },
    checkboxConfig: {
      // trigger: 'default',
      strict: true
    },
    // tooltipConfig: {
    //   theme: 'dark',
    //   enterable: false
    // },
    validConfig: {
      showMessage: true,
      message: 'default'
    },
    // menuConfig: {
    //   visibleMethod () {}
    // },
    // customConfig: {
    //  storage: false,
    //  checkMethod () {}
    // },
    // rowId: '_XID', // 行数据的唯一主键字段名
    sortConfig: {
      // remote: false,
      // trigger: 'default',
      // orders: ['asc', 'desc', null],
      // sortMethod: null,
      showIcon: true
    },
    filterConfig: {
      // remote: false,
      // filterMethod: null,
      showIcon: true
    },
    treeConfig: {
      rowtKey: 'id',
      parentKey: 'parentId',
      children: 'children',
      hasChild: 'hasChild',
      indent: 20,
      showIcon: true
    },
    expandConfig: {
      // trigger: 'default',
      showIcon: true
    },
    editConfig: {
      // mode: 'cell',
      showIcon: true,
      showAsterisk: true
    },
    importConfig: {
      modes: ['insert', 'covering']
    },
    exportConfig: {
      modes: ['current', 'selected']
    },
    printConfig: {
      modes: ['current', 'selected']
    },
    mouseConfig: {
      extension: true
    },
    areaConfig: {
      selectCellByHeader: true
    },
    clipConfig: {
      isCopy: true,
      isCut: true,
      isPaste: true
    },
    fnrConfig: {
      isFind: true,
      isReplace: true
    },
    scrollX: {
      enabled: true,
      gt: 60
      // oSize: 0
    },
    scrollY: {
      enabled: true,
      gt: 100
      // oSize: 0
    }
  },
  export: {
    types: {}
  },
  icon: {
    // table
    TABLE_SORT_ASC: iconPrefix + 'caret-top',
    TABLE_SORT_DESC: iconPrefix + 'caret-bottom',
    TABLE_FILTER_NONE: iconPrefix + 'funnel',
    TABLE_FILTER_MATCH: iconPrefix + 'funnel',
    TABLE_EDIT: iconPrefix + 'edit-outline',
    TABLE_HELP: iconPrefix + 'question',
    TABLE_TREE_LOADED: iconPrefix + 'refresh roll',
    TABLE_TREE_OPEN: iconPrefix + 'caret-right rotate90',
    TABLE_TREE_CLOSE: iconPrefix + 'caret-right',
    TABLE_EXPAND_LOADED: iconPrefix + 'refresh roll',
    TABLE_EXPAND_OPEN: iconPrefix + 'arrow-right rotate90',
    TABLE_EXPAND_CLOSE: iconPrefix + 'arrow-right',

    // button
    BUTTON_DROPDOWN: iconPrefix + 'arrow-bottom',
    BUTTON_LOADING: iconPrefix + 'refresh roll',

    // select
    SELECT_LOADED: iconPrefix + 'refresh roll',
    SELECT_OPEN: iconPrefix + 'caret-bottom rotate180',
    SELECT_CLOSE: iconPrefix + 'caret-bottom',

    // pager
    PAGER_JUMP_PREV: iconPrefix + 'd-arrow-left',
    PAGER_JUMP_NEXT: iconPrefix + 'd-arrow-right',
    PAGER_PREV_PAGE: iconPrefix + 'arrow-left',
    PAGER_NEXT_PAGE: iconPrefix + 'arrow-right',
    PAGER_JUMP_MORE: iconPrefix + 'more',

    // input
    INPUT_CLEAR: iconPrefix + 'close',
    INPUT_PWD: iconPrefix + 'eye-slash',
    INPUT_SHOW_PWD: iconPrefix + 'eye',
    INPUT_PREV_NUM: iconPrefix + 'caret-top',
    INPUT_NEXT_NUM: iconPrefix + 'caret-bottom',
    INPUT_DATE: iconPrefix + 'calendar',
    INPUT_SEARCH: iconPrefix + 'search',

    // modal
    MODAL_ZOOM_IN: iconPrefix + 'square',
    MODAL_ZOOM_OUT: iconPrefix + 'zoomout',
    MODAL_CLOSE: iconPrefix + 'close',
    MODAL_INFO: iconPrefix + 'info',
    MODAL_SUCCESS: iconPrefix + 'success',
    MODAL_WARNING: iconPrefix + 'warning',
    MODAL_ERROR: iconPrefix + 'error',
    MODAL_QUESTION: iconPrefix + 'question',
    MODAL_LOADING: iconPrefix + 'refresh roll',

    // toolbar
    TOOLBAR_TOOLS_REFRESH: iconPrefix + 'refresh',
    TOOLBAR_TOOLS_REFRESH_LOADING: iconPrefix + 'refresh roll',
    TOOLBAR_TOOLS_IMPORT: iconPrefix + 'upload',
    TOOLBAR_TOOLS_EXPORT: iconPrefix + 'download',
    TOOLBAR_TOOLS_PRINT: iconPrefix + 'print',
    TOOLBAR_TOOLS_ZOOM_IN: iconPrefix + 'zoomin',
    TOOLBAR_TOOLS_ZOOM_OUT: iconPrefix + 'zoomout',
    TOOLBAR_TOOLS_CUSTOM: iconPrefix + 'menu',

    // form
    FORM_PREFIX: iconPrefix + 'question',
    FORM_SUFFIX: iconPrefix + 'question',
    FORM_FOLDING: iconPrefix + 'arrow-top rotate180',
    FORM_UNFOLDING: iconPrefix + 'arrow-top'
  },
  grid: {
    // size: null,
    // zoomConfig: {
    //   escRestore: true
    // },
    formConfig: {
      enabled: true
    },
    pagerConfig: {
      enabled: true
      // perfect: false
    },
    toolbarConfig: {
      enabled: true
      // perfect: false
    },
    proxyConfig: {
      enabled: true,
      autoLoad: true,
      message: true,
      props: {
        list: null,
        result: 'result',
        total: 'page.total',
        message: 'message'
      }
      // beforeItem: null,
      // beforeColumn: null,
      // beforeQuery: null,
      // afterQuery: null,
      // beforeDelete: null,
      // afterDelete: null,
      // beforeSave: null,
      // afterSave: null
    }
  },
  tooltip: {
    // size: null,
    trigger: 'hover',
    theme: 'dark',
    leaveDelay: 300
  },
  pager: {
    // size: null,
    // autoHidden: false,
    // perfect: true,
    // pageSize: 10,
    // pagerCount: 7,
    // pageSizes: [10, 15, 20, 50, 100],
    // layouts: ['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total']
  },
  form: {
    // preventSubmit: false,
    validConfig: {
      showMessage: true,
      autoPos: true
    },
    // size: null,
    // colon: false,
    titleAsterisk: true
  },
  input: {
    // size: null,
    // transfer: false
    // parseFormat: 'yyyy-MM-dd HH:mm:ss.SSS',
    // labelFormat: '',
    // valueFormat: '',
    minDate: new Date(1900, 0, 1),
    maxDate: new Date(2100, 0, 1),
    startDay: 1,
    selectDay: 1,
    digits: 2,
    controls: true
  },
  textarea: {
    // size: null,
    // autosize: {
    //   minRows: 1,
    //   maxRows: 10
    // }
  },
  select: {
    // size: null,
    // transfer: false,
    multiCharOverflow: 8
  },
  toolbar: {
    // size: null,
    // import: {
    //   mode: 'covering'
    // },
    // export: {
    //   types: ['csv', 'html', 'xml', 'txt']
    // },
    // custom: {
    //   isFooter: true
    // },
    // buttons: []
  },
  button: {
    // size: null,
    // transfer: false
  },
  radio: {
    // size: null
  },
  checkbox: {
    // size: null
  },
  switch: {
    // size: null
  },
  modal: {
    // size: null,
    top: 15,
    showHeader: true,
    minWidth: 340,
    minHeight: 140,
    lockView: true,
    mask: true,
    duration: 3000,
    marginSize: 0,
    dblclickZoom: true,
    showTitleOverflow: true,
    animat: true,
    showClose: true,
    draggable: true,
    // storage: false,
    storageKey: 'VXE_MODAL_POSITION'
  },
  list: {
    // size: null,
    scrollY: {
      enabled: true,
      gt: 100
      // oSize: 0
    }
  },
  i18n: key => key
}
