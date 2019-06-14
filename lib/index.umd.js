(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("xe-utils"));
	else if(typeof define === 'function' && define.amd)
		define(["xe-utils"], factory);
	else if(typeof exports === 'object')
		exports["VXETable"] = factory(require("xe-utils"));
	else
		root["VXETable"] = factory(root["XEUtils"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE_f0af__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "1a97":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "f0af":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_f0af__;

/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: external {"root":"XEUtils","commonjs":"xe-utils","commonjs2":"xe-utils","amd":"xe-utils"}
var external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_ = __webpack_require__("f0af");
var external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default = /*#__PURE__*/__webpack_require__.n(external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_);

// CONCATENATED MODULE: ./packages/conf/index.js
// import XEUtils from 'xe-utils'
// import zhCNLocat from '../lib/locale/lang/zh-CN'
const GlobalConfig = {
  // size: null,
  // showAllOverflow: null,
  // showHeaderAllOverflow: null,
  // contextMenu: null,
  // resizeInterval: 250,
  version: 0,
  // 版本号，对于某些带数据缓存的功能有用到，上升版本号可以用于重置数据
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
    // zIndex: 99,
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
  pager: {// pageSize: 10,
    // pagerCount: 7,
    // pageSizes: [10, 15, 20, 50, 100],
    // layouts: ['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total']
  },
  toolbar: {// storageKey: 'VXE_TABLE_CUSTOM_HIDDEN',
    // setting: false,
    // buttons: []
  },
  i18n: key => key
};
/* harmony default export */ var conf = (GlobalConfig);
// CONCATENATED MODULE: ./packages/table/src/resize.js


const eventStore = [];
const defaultInterval = 250;
var resizeTimeout = null;

function addListener() {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(ResizeEvent.handle, conf.resizeInterval || defaultInterval);
}

const ResizeEvent = {
  on(comp, target, cb) {
    if (!eventStore.length) {
      addListener();
    }

    if (!eventStore.some(item => item.comp === comp && item.target === target)) {
      eventStore.push({
        comp,
        target,
        cb,
        width: target.clientWidth,
        heighe: target.clientWidth
      });
    }
  },

  off(comp, target) {
    external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.remove(eventStore, item => item.comp === comp && item.target === target);
  },

  handle() {
    if (eventStore.length) {
      eventStore.forEach(item => {
        let {
          comp,
          target,
          cb,
          width,
          heighe
        } = item;
        let clientWidth = target.clientWidth;
        let clientHeight = target.clientHeight;
        let rWidth = clientWidth && width !== clientWidth;
        let rHeight = clientHeight && heighe !== clientHeight;

        if (rWidth || rHeight) {
          item.width = clientWidth;
          item.heighe = clientHeight;
          cb.call(comp, {
            type: 'resize',
            target,
            rWidth,
            rHeight,
            currentTarget: target
          });
        }
      });
      resizeTimeout = setTimeout(ResizeEvent.handle, conf.resizeInterval || defaultInterval);
    }
  }

};
/* harmony default export */ var resize = (ResizeEvent);
// CONCATENATED MODULE: ./packages/table/src/props.js

/**
 * 所有参数
 */

/* harmony default export */ var src_props = ({
  /** 基本属性 */
  // 数据
  data: Array,
  // 初始化绑定动态列
  customs: Array,
  // 表格的高度
  height: [Number, String],
  // 表格的最大高度
  maxHeight: [Number, String],
  // 所有列是否允许拖动列宽调整大小
  resizable: Boolean,
  // 是否带有斑马纹
  stripe: Boolean,
  // 是否带有纵向边框
  border: Boolean,
  // 表格的尺寸
  size: {
    type: String,
    default: () => conf.size
  },
  // 列的宽度是否自撑开
  fit: {
    type: Boolean,
    default: true
  },
  // 表格是否加载中
  loading: Boolean,
  // 是否显示表头
  showHeader: {
    type: Boolean,
    default: true
  },
  // 只对 type=index 时有效，自定义序号的起始值
  startIndex: {
    type: Number,
    default: 0
  },
  // 是否要高亮当前选中行
  highlightCurrentRow: Boolean,
  // 鼠标移到行是否要高亮显示
  highlightHoverRow: Boolean,
  // 是否显示表尾合计
  showFooter: Boolean,
  // 表尾合计的计算方法
  footerMethod: Function,
  // 给行附加 className
  rowClassName: [String, Function],
  // 给单元格附加 className
  cellClassName: [String, Function],
  // 给表头的行附加 className
  headerRowClassName: [String, Function],
  // 给表头的单元格附加 className
  headerCellClassName: [String, Function],
  // 给表尾的行附加 className
  footerRowClassName: [String, Function],
  // 给表尾的单元格附加 className
  footerCellClassName: [String, Function],
  // 合并行或列
  spanMethod: Function,
  // 设置所有内容过长时显示为省略号
  showAllOverflow: {
    type: [Boolean, String],
    default: () => conf.showAllOverflow
  },
  // 设置表头所有内容过长时显示为省略号
  showHeaderAllOverflow: {
    type: [Boolean, String],
    default: () => conf.showHeaderAllOverflow
  },

  /** 高级属性 */
  // 行数据的 Key
  rowKey: [String, Number],
  // 是否自动根据父容器响应式调整表格宽高
  autoResize: Boolean,
  // 单选配置
  radioConfig: Object,
  // 多选配置项
  selectConfig: Object,
  // tooltip 配置项
  tooltipConfig: Object,
  // 展开行配置项
  expandConfig: Object,
  // 树形结构配置项
  treeConfig: Object,
  // 快捷菜单配置项
  contextMenu: {
    type: Object,
    default: () => conf.contextMenu
  },
  // 鼠标配置项
  mouseConfig: Object,
  // 按键配置项
  keyboardConfig: Object,
  // 编辑配置项
  editConfig: Object,
  // 校验规则配置项
  editRules: Object,
  // 优化配置项
  optimization: Object
});
// CONCATENATED MODULE: ./packages/v-x-e-table/src/interceptor.js

const _storeMap = {
  // 清除激活单元格之前触发拦截（当渲染其他组件时，存在事件冲突时，可以通过该拦截器阻止单元格被自动关闭问题）
  'event.clear_actived': []
};
const Interceptor = {
  get(type) {
    return _storeMap[type] || [];
  },

  add(type, callback) {
    let eList = _storeMap[type];

    if (eList && callback && eList.indexOf(callback) === -1) {
      eList.push(callback);
    }
  },

  delete(type, callback) {
    let eList = _storeMap[type];

    if (eList) {
      external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.remove(eList, cb => cb === callback);
    }
  }

};
/* harmony default export */ var interceptor = (Interceptor);
// CONCATENATED MODULE: ./packages/tools/src/utils.js

var columnUniqueId = 0;
const UtilTools = {
  getSize({
    size,
    $parent
  }) {
    return size || ($parent && ['medium', 'small', 'mini'].indexOf($parent.size) > -1 ? $parent.size : null);
  },

  getRowKey($table) {
    let {
      rowKey,
      selectConfig = {},
      treeConfig = {},
      expandConfig = {},
      editConfig = {}
    } = $table;

    if (!rowKey) {
      rowKey = selectConfig.key || treeConfig.key || expandConfig.key || editConfig.key;
    }

    return rowKey;
  },

  getRowId($table, row, rowIndex) {
    let rowKey = UtilTools.getRowKey($table);
    return `${encodeURIComponent(rowKey ? external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, rowKey) : rowIndex)}`;
  },

  // 触发事件
  emitEvent(_vm, type, args) {
    if (_vm.$listeners[type]) {
      _vm.$emit.apply(_vm, [type].concat(args));
    }
  },

  // 获取所有的列，排除分组
  getColumnList(columns) {
    let result = [];
    columns.forEach(column => {
      if (column.children && column.children.length) {
        result.push.apply(result, UtilTools.getColumnList(column.children));
      } else {
        result.push(column);
      }
    });
    return result;
  },

  formatText(value) {
    return '' + (value === null || value === void 0 ? '' : value);
  },

  getCellValue(row, column) {
    return external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, column.property);
  },

  getCellLabel(row, column, params) {
    let cellValue = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, column.property);
    return params && column.formatter ? column.formatter(Object.assign({
      cellValue
    }, params)) : cellValue;
  },

  setCellValue(row, column, value) {
    return external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.set(row, column.property, value);
  },

  getColumnConfig(_vm, {
    renderHeader,
    renderCell,
    renderData
  } = {}) {
    return {
      // 基本属性
      id: `col--${++columnUniqueId}`,
      type: _vm.type,
      property: _vm.prop,
      label: _vm.label,
      width: _vm.width,
      minWidth: _vm.minWidth,
      resizable: _vm.resizable,
      fixed: _vm.fixed,
      align: _vm.align,
      headerAlign: _vm.headerAlign,
      showOverflow: _vm.showOverflow,
      showHeaderOverflow: _vm.showHeaderOverflow,
      indexMethod: _vm.indexMethod,
      formatter: _vm.formatter,
      sortable: _vm.sortable,
      sortBy: _vm.sortBy,
      remoteSort: _vm.remoteSort,
      filters: (_vm.filters || []).map(({
        label,
        value
      }) => ({
        label,
        value,
        checked: false
      })),
      filterMultiple: _vm.filterMultiple,
      filterMethod: _vm.filterMethod,
      remoteFilter: _vm.remoteFilter,
      treeNode: _vm.treeNode,
      columnKey: _vm.columnKey,
      editRender: _vm.editRender,
      // 渲染属性
      visible: true,
      level: 1,
      rowSpan: 1,
      colSpan: 1,
      order: null,
      renderWidth: 0,
      renderHeight: 0,
      resizeWidth: 0,
      renderLeft: 0,
      renderHeader: renderHeader || _vm.renderHeader,
      renderCell: renderCell || _vm.renderCell,
      renderData: renderData,
      // 单元格插槽，只对 grid 有效
      slots: _vm.slots,
      origin: _vm
    };
  },

  // 组装列配置
  assemColumn(_vm) {
    let {
      $table,
      $parent,
      columnConfig
    } = _vm;
    let parentColumnConfig = $parent.columnConfig;
    columnConfig.slots = _vm.$scopedSlots;

    if (parentColumnConfig && $parent.$children.length > 0) {
      if (!parentColumnConfig.children) {
        parentColumnConfig.children = [];
      }

      parentColumnConfig.children.splice([].indexOf.call($parent.$el.children, _vm.$el), 0, columnConfig);
    } else {
      $table.collectColumn.splice([].indexOf.call($table.$refs.hideColumn.children, _vm.$el), 0, columnConfig);
    }
  },

  // 销毁列
  destroyColumn(_vm) {
    let {
      $table,
      columnConfig
    } = _vm;
    let matchObj = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.findTree($table.collectColumn, column => column === columnConfig);

    if (matchObj) {
      matchObj.items.splice(matchObj.index, 1);
    }
  },

  hasChildrenList(item) {
    return item && item.children && item.children.length > 0;
  }

};
/* harmony default export */ var utils = (UtilTools);
// CONCATENATED MODULE: ./packages/tools/src/dom.js


const browse = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.browse();
const htmlElem = document.querySelector('html');
const dom_bodyElem = document.body;
const DomTools = {
  browse,

  isPx(val) {
    return val && /^\d+(px)?$/.test(val);
  },

  isScale(val) {
    return val && /^\d+%$/.test(val);
  },

  hasClass(elem, cls) {
    return elem && elem.className && elem.className.split && elem.className.split(' ').indexOf(cls) > -1;
  },

  getDomNode() {
    return {
      scrollTop: document.documentElement.scrollTop || document.body.scrollTop,
      scrollLeft: document.documentElement.scrollLeft || document.body.scrollLeft,
      visibleHeight: document.documentElement.clientHeight || document.body.clientHeight,
      visibleWidth: document.documentElement.clientWidth || document.body.clientWidth
    };
  },

  /**
   * 检查触发源是否属于目标节点
   */
  getEventTargetNode(evnt, container, queryCls) {
    let targetElem;
    let target = evnt.target;

    while (target && target.nodeType && target !== document) {
      if (queryCls && DomTools.hasClass(target, queryCls)) {
        targetElem = target;
      } else if (target === container) {
        return {
          flag: queryCls ? !!targetElem : true,
          container,
          targetElem: targetElem
        };
      }

      target = target.parentNode;
    }

    return {
      flag: false
    };
  },

  /**
   * 获取元素相对于 document 的位置
   */
  getOffsetPos(elem, container) {
    return getNodeOffset(elem, container, {
      left: 0,
      top: 0
    });
  },

  getCellIndexs(cell) {
    let trElem = cell.parentNode;
    let columnIndex = [].indexOf.call(trElem.children, cell);
    let rowIndex = [].indexOf.call(trElem.parentNode.children, trElem);
    return {
      rowIndex,
      columnIndex
    };
  },

  getCell($table, {
    row,
    rowIndex,
    column
  }) {
    let rowId = utils.getRowId($table, row, rowIndex);
    return $table.$refs.tableBody.$el.querySelector(`.vxe-body--row[data-rowkey="${rowId}"] .${column.id}`);
  },

  getCursorPosition(textarea) {
    let rangeData = {
      text: '',
      start: 0,
      end: 0
    };

    if (textarea.setSelectionRange) {
      rangeData.start = textarea.selectionStart;
      rangeData.end = textarea.selectionEnd;
      rangeData.text = rangeData.start !== rangeData.end ? textarea.value.substring(rangeData.start, rangeData.end) : '';
    } else if (document.selection) {
      let index = 0;
      let range = document.selection.createRange();
      let textRange = document.body.createTextRange();
      textRange.moveToElementText(textarea);
      rangeData.text = range.text;
      rangeData.bookmark = range.getBookmark();

      for (; textRange.compareEndPoints('StartToStart', range) < 0 && range.moveStart('character', -1) !== 0; index++) {
        if (textarea.value.charAt(index) === '\n') {
          index++;
        }
      }

      rangeData.start = index;
      rangeData.end = rangeData.text.length + rangeData.start;
    }

    return rangeData;
  },

  setCursorPosition(textarea, rangeData) {
    if (textarea.setSelectionRange) {
      textarea.focus();
      textarea.setSelectionRange(rangeData.start, rangeData.end);
    } else if (textarea.createTextRange) {
      let textRange = textarea.createTextRange();

      if (textarea.value.length === rangeData.start) {
        textRange.collapse(false);
        textRange.select();
      } else {
        textRange.moveToBookmark(rangeData.bookmark);
        textRange.select();
      }
    }
  }

};

function getNodeOffset(elem, container, rest) {
  if (elem) {
    let parentElem = elem.parentNode;
    rest.top += elem.offsetTop;
    rest.left += elem.offsetLeft;

    if (parentElem && parentElem !== htmlElem && parentElem !== dom_bodyElem) {
      rest.top -= parentElem.scrollTop;
      rest.left -= parentElem.scrollLeft;
    }

    if (container && (elem === container || elem.offsetParent === container) ? 0 : elem.offsetParent) {
      return getNodeOffset(elem.offsetParent, container, rest);
    }
  }

  return rest;
}

/* harmony default export */ var dom = (DomTools);
// CONCATENATED MODULE: ./packages/tools/src/export.js


const ExportTools = {
  getCsvContent(opts, oData, oColumns, tableElem) {
    let isOriginal = opts.original;
    let {
      columns,
      datas
    } = getCsvData(opts, oData, oColumns, tableElem);
    let content = '\ufeff';

    if (opts.isHeader) {
      content += columns.map(column => column.label).join(',') + '\n';
    }

    datas.forEach((record, rowIndex) => {
      if (isOriginal) {
        content += columns.map(column => {
          if (column.type === 'index') {
            return `"${column.indexMethod ? column.indexMethod(rowIndex) : rowIndex + 1}"`;
          }

          return `"${utils.getCellValue(record, column) || ''}"`;
        }).join(',') + '\n';
      } else {
        content += columns.map(column => `"${record[column.id]}"`).join(',') + '\n';
      }
    });
    return content;
  },

  downloadCsc(opts, content) {
    if (!opts.download) {
      return Promise.resolve(content);
    }

    if (navigator.msSaveBlob && window.Blob) {
      navigator.msSaveBlob(new Blob([content], {
        type: 'text/csv'
      }), opts.filename);
    } else if (dom.browse['-ms']) {
      var win = window.top.open('about:blank', '_blank');
      win.document.charset = 'utf-8';
      win.document.write(content);
      win.document.close();
      win.document.execCommand('SaveAs', opts.filename);
      win.close();
    } else {
      var linkElem = document.createElement('a');
      linkElem.target = '_blank';
      linkElem.download = opts.filename;
      linkElem.href = getCsvUrl(opts, content);
      document.body.appendChild(linkElem);
      linkElem.click();
      document.body.removeChild(linkElem);
    }
  }

};

function getCsvLabelData(columns, oData, tableElem) {
  let trElemList = tableElem.querySelectorAll('.vxe-table--body-wrapper.body--wrapper .vxe-body--row');
  return Array.from(trElemList).map(trElem => {
    let item = {};
    columns.forEach(column => {
      let cell = trElem.querySelector(`.${column.id}`);
      item[column.id] = cell ? cell.innerText.trim() : '';
    });
    return item;
  });
}

function getCsvData(opts, oData, oColumns, tableElem) {
  let isOriginal = opts.original;
  let columns = opts.columns ? opts.columns : oColumns;

  if (opts.columnFilterMethod) {
    columns = columns.filter(opts.columnFilterMethod);
  }

  let datas = opts.data ? opts.data : isOriginal ? oData : getCsvLabelData(columns, oData, tableElem);

  if (opts.dataFilterMethod) {
    datas = datas.filter(opts.dataFilterMethod);
  }

  return {
    columns,
    datas
  };
}

function getCsvUrl(opts, content) {
  if (window.Blob && window.URL && window.URL.createObjectURL && !dom.browse.safari) {
    return URL.createObjectURL(new Blob([content], {
      type: 'text/csv'
    }));
  }

  return `data:attachment/csv;charset=utf-8,${encodeURIComponent(content)}`;
}

/* harmony default export */ var src_export = (ExportTools);
// CONCATENATED MODULE: ./packages/tools/src/event.js
 // 监听全局事件

const wheelName = /Firefox/i.test(navigator.userAgent) ? 'DOMMouseScroll' : 'mousewheel';
const event_eventStore = [];
const GlobalEvent = {
  on(comp, type, cb) {
    event_eventStore.push({
      comp,
      type,
      cb
    });
  },

  off(comp, type) {
    external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.remove(event_eventStore, item => item.comp === comp && item.type === type);
  },

  trigger(evnt) {
    event_eventStore.forEach(({
      comp,
      type,
      cb
    }) => {
      if (type === evnt.type || type === 'mousewheel' && evnt.type === wheelName) {
        cb.call(comp, evnt);
      }
    });
  }

};
document.addEventListener('keydown', GlobalEvent.trigger, false);
document.addEventListener('contextmenu', GlobalEvent.trigger, false);
window.addEventListener('mousedown', GlobalEvent.trigger, false);
window.addEventListener('blur', GlobalEvent.trigger, false);
window.addEventListener('resize', GlobalEvent.trigger, false);
window.addEventListener(wheelName, GlobalEvent.trigger, false);
/* harmony default export */ var src_event = (GlobalEvent);
// CONCATENATED MODULE: ./packages/tools/index.js








/* harmony default export */ var tools = ({
  UtilTools: utils,
  DomTools: dom,
  ExportTools: src_export,
  GlobalEvent: src_event
});
// CONCATENATED MODULE: ./packages/v-x-e-table/src/renderer.js


/**
 * 内置渲染器
 * 只支持 input 和 textarea
 */

function defaultRenderer(h, attrs, editRender, params) {
  let {
    $table,
    row,
    column
  } = params;
  let {
    name
  } = editRender;
  return [h('div', {
    class: 'vxe-input--wrapper'
  }, [h(name, {
    class: `vxe-${name}`,
    attrs,
    domProps: {
      value: UtilTools.getCellValue(row, column)
    },
    on: {
      input(evnt) {
        UtilTools.setCellValue(row, column, evnt.target.value);
        $table.updateStatus(params);
      }

    }
  })])];
}

const rowHeight = 24;
const renderer_storeMap = {
  input: {
    autofocus: '.vxe-input',

    renderEdit(h, editRender, params) {
      return defaultRenderer(h, {
        type: 'text'
      }, editRender, params);
    }

  },
  textarea: {
    autofocus: '.vxe-textarea',

    renderEdit(h, editRender, params) {
      return defaultRenderer(h, null, editRender, params);
    }

  },
  cell: {
    autofocus: '.vxe-textarea',

    renderEdit(h, editRender, params, {
      $excel
    }) {
      let {
        excelStore
      } = $excel;
      let {
        uploadRows
      } = excelStore;
      let {
        row,
        column
      } = params;
      return [h('div', {
        class: 'vxe-input--wrapper vxe-excel-cell',
        style: {
          height: `${column.renderHeight - 1}px`
        }
      }, [h('textarea', {
        class: 'vxe-textarea',
        style: {
          width: `${column.renderWidth}px`
        },
        domProps: {
          value: UtilTools.getCellValue(row, column)
        },
        on: {
          input(evnt) {
            let inpElem = evnt.target;
            UtilTools.setCellValue(row, column, evnt.target.value);

            if (inpElem.scrollHeight > inpElem.offsetHeight) {
              if (uploadRows.indexOf(row) === -1) {
                inpElem.style.width = `${inpElem.offsetWidth + 20}px`;
              } else {
                inpElem.style.height = `${inpElem.scrollHeight}px`;
              }
            }
          },

          change() {
            if (uploadRows.indexOf(row) === -1) {
              uploadRows.push(row);
            }
          },

          keydown(evnt) {
            let inpElem = evnt.target;

            if (evnt.altKey && evnt.keyCode === 13) {
              evnt.preventDefault();
              evnt.stopPropagation();
              let value = inpElem.value;
              let rangeData = DomTools.getCursorPosition(inpElem);
              let pos = rangeData.end;
              UtilTools.setCellValue(row, column, `${value.slice(0, pos)}\n${value.slice(pos, value.length)}`);
              inpElem.style.height = `${(Math.floor(inpElem.offsetHeight / rowHeight) + 1) * rowHeight}px`;
              setTimeout(() => {
                rangeData.start = rangeData.end = ++pos;
                DomTools.setCursorPosition(inpElem, rangeData);
              });
            }
          }

        }
      })])];
    },

    renderCell(h, editRender, params) {
      let {
        row,
        column
      } = params;
      return [h('span', {
        domProps: {
          innerHTML: external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.escape(UtilTools.getCellValue(row, column)).replace(/\n/g, '<br>')
        }
      })];
    }

  }
  /**
   * 全局渲染器
   */

};
const Renderer = {
  mixin(map) {
    Object.assign(renderer_storeMap, map);
    return Renderer;
  },

  get(name) {
    return renderer_storeMap[name] || null;
  },

  add(name, options) {
    if (name && options) {
      renderer_storeMap[name] = options;
    }

    return Renderer;
  },

  delete(name) {
    delete renderer_storeMap[name];
    return Renderer;
  }

};
/* harmony default export */ var renderer = (Renderer);
// CONCATENATED MODULE: ./packages/v-x-e-table/src/setup.js

/**
 * 全局参数设置
 */

function setup(options = {}) {
  let {
    iconMap
  } = conf;

  if (options.iconMap) {
    Object.assign(iconMap, options.iconMap);
  }

  Object.assign(conf, options, {
    iconMap
  });
}

/* harmony default export */ var src_setup = (setup);
// CONCATENATED MODULE: ./packages/v-x-e-table/src/use.js



const installedPlugins = [];

function use(Plugin, options) {
  if (Plugin && Plugin.install) {
    if (installedPlugins.indexOf(Plugin) === -1) {
      Plugin.install({
        setup: src_setup,
        interceptor: interceptor,
        renderer: renderer
      }, options);
      installedPlugins.push(Plugin);
    }
  }
}

/* harmony default export */ var src_use = (use);
// CONCATENATED MODULE: ./packages/v-x-e-table/index.js





const VXETable = {
  t: external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get,
  use: src_use,
  setup: src_setup,
  interceptor: interceptor,
  renderer: renderer
};


/* harmony default export */ var v_x_e_table = (VXETable);
// CONCATENATED MODULE: ./packages/table-column/src/cell.js




const CellMethods = {
  createColumn($table, _vm) {
    let {
      type,
      sortable,
      remoteSort,
      filters,
      editRender,
      treeNode
    } = _vm;
    let {
      selectConfig,
      treeConfig
    } = $table;
    let isTreeNode = treeConfig && treeNode;
    let renMaps = {
      renderHeader: this.renderHeader,
      renderCell: isTreeNode ? this.renderTreeCell : this.renderCell
    };

    switch (type) {
      case 'index':
        renMaps.renderHeader = this.renderIndexHeader;
        renMaps.renderCell = isTreeNode ? this.renderTreeIndexCell : this.renderIndexCell;
        break;

      case 'radio':
        renMaps.renderHeader = this.renderRadioHeader;
        renMaps.renderCell = isTreeNode ? this.renderTreeRadioCell : this.renderRadioCell;
        break;

      case 'selection':
        renMaps.renderHeader = this.renderSelectionHeader;
        renMaps.renderCell = selectConfig && selectConfig.checkProp ? isTreeNode ? this.renderTreeSelectionCellByProp : this.renderSelectionCellByProp : isTreeNode ? this.renderTreeSelectionCell : this.renderSelectionCell;
        break;

      case 'expand':
        renMaps.renderCell = this.renderExpandCell;
        renMaps.renderData = this.renderExpandData;
        break;

      default:
        if (editRender) {
          renMaps.renderHeader = this.renderEditHeader;
          renMaps.renderCell = $table.editConfig && $table.editConfig.mode === 'cell' ? isTreeNode ? this.renderTreeCellEdit : this.renderCellEdit : isTreeNode ? this.renderTreeRadioCell : this.renderRowEdit;
        } else if (filters && filters.length && (sortable || remoteSort)) {
          renMaps.renderHeader = this.renderSortAndFilterHeader;
        } else if (sortable || remoteSort) {
          renMaps.renderHeader = this.renderSortHeader;
        } else if (filters && filters.length) {
          renMaps.renderHeader = this.renderFilterHeader;
        }

    }

    return UtilTools.getColumnConfig(_vm, renMaps);
  },

  /**
   * 单元格
   */
  renderHeader(h, params) {
    let {
      column
    } = params;
    let {
      slots
    } = column;

    if (slots && slots.header) {
      return slots.header(params);
    }

    return [UtilTools.formatText(params.column.origin.label)];
  },

  renderCell(h, params) {
    let cellValue;
    let {
      row,
      rowIndex,
      column,
      columnIndex
    } = params;
    let {
      slots,
      formatter
    } = column;

    if (slots && slots.default) {
      return slots.default(params);
    }

    cellValue = UtilTools.getCellValue(row, column);

    if (formatter) {
      cellValue = formatter({
        cellValue,
        row,
        rowIndex,
        column,
        columnIndex
      });
    }

    return [UtilTools.formatText(cellValue)];
  },

  renderTreeCell(h, params) {
    return CellMethods.renderTreeIcon(h, params).concat(CellMethods.renderCell(h, params));
  },

  /**
   * 树节点
   */
  renderTreeIcon(h, params) {
    let {
      iconMap
    } = conf;
    let {
      $table
    } = params;
    let {
      treeConfig,
      treeExpandeds
    } = $table;
    let {
      row,
      level
    } = params;
    let {
      children,
      indent,
      trigger
    } = treeConfig;
    let rowChildren = row[children];
    let on = {};

    if (!trigger || trigger === 'default') {
      on.click = evnt => $table.triggerTreeExpandEvent(evnt, params);
    }

    return [h('span', {
      class: 'vxe-tree--indent',
      style: {
        width: `${level * (indent || 16)}px`
      }
    }), h('span', {
      class: ['vxe-tree-wrapper', {
        'is--active': treeExpandeds.indexOf(row) > -1
      }],
      on
    }, rowChildren && rowChildren.length ? [h('i', {
      class: ['vxe-tree--node-btn', iconMap.tree]
    })] : [])];
  },

  /**
   * 索引
   */
  renderIndexHeader(h, params) {
    let {
      column
    } = params;
    let {
      slots
    } = column;

    if (slots && slots.header) {
      return slots.header(params);
    }

    return [UtilTools.formatText(params.column.origin.label || '#')];
  },

  renderIndexCell(h, params) {
    let {
      $table,
      column
    } = params;
    let {
      startIndex
    } = $table;
    let {
      slots,
      indexMethod
    } = column;

    if (slots && slots.default) {
      return slots.default(params);
    }

    let {
      seq,
      level
    } = params;
    return [UtilTools.formatText(indexMethod ? indexMethod(params) : level ? `${level}.${seq}` : startIndex + seq)];
  },

  renderTreeIndexCell(h, params) {
    return CellMethods.renderTreeIcon(h, params).concat(CellMethods.renderIndexCell(h, params));
  },

  /**
   * 单选
   */
  renderRadioHeader(h, params) {
    return [UtilTools.formatText(params.column.origin.label)];
  },

  renderRadioCell(h, params) {
    let {
      $table,
      column
    } = params;
    let {
      radioConfig = {}
    } = $table;
    let {
      slots
    } = column;
    let {
      labelProp
    } = radioConfig;

    if (slots && slots.header) {
      return slots.header(params);
    }

    let {
      selectRow
    } = $table;
    let {
      row
    } = params;
    let options = {
      attrs: {
        type: 'radio',
        name: `vxe-radio--${$table.id}`
      }
    };

    if (!params.isHidden) {
      options.domProps = {
        checked: row === selectRow
      };
      options.on = {
        change(evnt) {
          $table.triggerRowEvent(evnt, params);
        }

      };
    }

    return [h('label', {
      class: ['vxe-radio']
    }, [h('input', options), h('span', {
      class: ['radio--icon']
    }), labelProp ? h('span', {
      class: 'radio--label'
    }, external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, labelProp)) : null])];
  },

  renderTreeRadioCell(h, params) {
    return CellMethods.renderTreeIcon(h, params).concat(CellMethods.renderRadioCell(h, params));
  },

  /**
   * 多选
   */
  renderSelectionHeader(h, params) {
    let {
      $table,
      column
    } = params;
    let {
      slots
    } = column;

    if (slots && slots.header) {
      return slots.header(params);
    }

    let {
      isHidden
    } = params;
    let options = {
      attrs: {
        type: 'checkbox'
      }
    };

    if (!isHidden) {
      options.domProps = {
        checked: $table.isAllSelected
      };
      options.on = {
        change(evnt) {
          $table.triggerCheckAllEvent(evnt, evnt.target.checked);
        }

      };
    }

    return [h('label', {
      class: ['vxe-checkbox', {
        'is--indeterminate': $table.isIndeterminate
      }]
    }, [h('input', options), h('span', {
      class: ['checkbox--icon']
    }), column.origin.label ? h('span', {
      class: 'checkbox--label'
    }, column.origin.label) : null])];
  },

  renderSelectionCell(h, params) {
    let {
      $table
    } = params;
    let {
      selectConfig = {},
      treeConfig,
      treeIndeterminates
    } = $table;
    let {
      labelProp,
      checkMethod
    } = selectConfig;
    let {
      row,
      isHidden
    } = params;
    let indeterminate = false;
    let isDisabled = !!checkMethod;
    let options = {
      attrs: {
        type: 'checkbox'
      }
    };

    if (!isHidden) {
      if (checkMethod) {
        isDisabled = !checkMethod(params);
        options.attrs.disabled = isDisabled;
      }

      if (treeConfig) {
        indeterminate = treeIndeterminates.indexOf(row) > -1;
      }

      options.domProps = {
        checked: $table.selection.indexOf(row) > -1
      };
      options.on = {
        change(evnt) {
          $table.triggerCheckRowEvent(evnt, params, evnt.target.checked);
        }

      };
    }

    return [h('label', {
      class: ['vxe-checkbox', {
        'is--indeterminate': indeterminate,
        'is--disabled': isDisabled
      }]
    }, [h('input', options), h('span', {
      class: ['checkbox--icon']
    }), labelProp ? h('span', {
      class: 'checkbox--label'
    }, external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, labelProp)) : null])];
  },

  renderTreeSelectionCell(h, params) {
    return CellMethods.renderTreeIcon(h, params).concat(CellMethods.renderSelectionCell(h, params));
  },

  renderSelectionCellByProp(h, params) {
    let {
      $table
    } = params;
    let {
      selectConfig = {},
      treeConfig,
      treeIndeterminates
    } = $table;
    let {
      labelProp,
      checkProp: property,
      checkMethod
    } = selectConfig;
    let {
      row,
      isHidden
    } = params;
    let indeterminate = false;
    let isDisabled = !!checkMethod;
    let options = {
      attrs: {
        type: 'checkbox'
      }
    };

    if (!isHidden) {
      if (checkMethod) {
        isDisabled = !checkMethod(params);
        options.attrs.disabled = isDisabled;
      }

      if (treeConfig) {
        indeterminate = treeIndeterminates.indexOf(row) > -1;
      }

      options.domProps = {
        checked: external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, property)
      };
      options.on = {
        change(evnt) {
          $table.triggerCheckRowEvent(evnt, params, evnt.target.checked);
        }

      };
    }

    return [h('label', {
      class: ['vxe-checkbox', {
        'is--indeterminate': indeterminate,
        'is--disabled': isDisabled
      }]
    }, [h('input', options), h('span', {
      class: ['checkbox--icon']
    }), labelProp ? h('span', {
      class: 'checkbox--label'
    }, external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, labelProp)) : null])];
  },

  renderTreeSelectionCellByProp(h, params) {
    return CellMethods.renderTreeIcon(h, params).concat(CellMethods.renderSelectionCellByProp(h, params));
  },

  /**
   * 展开行
   */
  renderExpandCell(h, params) {
    let {
      $table,
      isHidden
    } = params;
    let expandActive = false;

    if (!isHidden) {
      expandActive = $table.expandeds.indexOf(params.row) > -1;
    }

    return [h('span', {
      class: ['vxe-table--expanded', {
        'expand--active': expandActive
      }],
      on: {
        click(evnt) {
          $table.triggerRowExpandEvent(evnt, params);
        }

      }
    }, [h('i', {
      class: ['vxe-table--expand-icon']
    })])];
  },

  renderExpandData(h, params) {
    let {
      column
    } = params;
    let {
      slots
    } = column;

    if (slots && slots.default) {
      return slots.default(params);
    }

    return [];
  },

  /**
   * 排序和筛选
   */
  renderSortAndFilterHeader(h, params) {
    return CellMethods.renderHeader(h, params).concat(CellMethods.renderSortIcon(h, params)).concat(CellMethods.renderFilterIcon(h, params));
  },

  /**
   * 排序
   */
  renderSortHeader(h, params) {
    return CellMethods.renderHeader(h, params).concat(CellMethods.renderSortIcon(h, params));
  },

  renderSortIcon(h, params) {
    let {
      iconMap
    } = conf;
    let {
      $table,
      column
    } = params;
    return [h('span', {
      class: ['vxe-sort-wrapper']
    }, [h('i', {
      class: ['vxe-sort--asc-btn', iconMap.sortAsc, {
        'sort--active': column.order === 'asc'
      }],
      on: {
        click(evnt) {
          $table.triggerSortEvent(evnt, column, params, 'asc');
        }

      }
    }), h('i', {
      class: ['vxe-sort--desc-btn', iconMap.sortDesc, {
        'sort--active': column.order === 'desc'
      }],
      on: {
        click(evnt) {
          $table.triggerSortEvent(evnt, column, params, 'desc');
        }

      }
    })])];
  },

  /**
   * 筛选
   */
  renderFilterHeader(h, params) {
    return CellMethods.renderHeader(h, params).concat(CellMethods.renderFilterIcon(h, params));
  },

  renderFilterIcon(h, params) {
    let {
      iconMap
    } = conf;
    let {
      $table,
      column
    } = params;
    let {
      filterStore
    } = $table;
    return [h('span', {
      class: ['vxe-filter-wrapper', {
        'is--active': filterStore.visible && filterStore.column === column
      }]
    }, [h('i', {
      class: ['vxe-filter--btn', iconMap.filter],
      on: {
        click(evnt) {
          $table.triggerFilterEvent(evnt, params.column, params);
        }

      }
    })])];
  },

  /**
   * 可编辑
   */
  renderEditHeader(h, params) {
    let {
      iconMap
    } = conf;
    let {
      $table,
      column
    } = params;
    let {
      editRules,
      editConfig
    } = $table;
    let {
      sortable,
      remoteSort,
      filters
    } = column;
    let isRequired;

    if (editRules) {
      let columnRules = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(editRules, params.column.property);

      if (columnRules) {
        isRequired = columnRules.some(rule => rule.required);
      }
    }

    return [isRequired ? h('i', {
      class: 'vxe-required-icon'
    }) : null, editConfig && editConfig.showIcon === false ? null : h('i', {
      class: ['vxe-edit-icon', iconMap.edit]
    })].concat(CellMethods.renderHeader(h, params)).concat(sortable || remoteSort ? CellMethods.renderSortIcon(h, params) : []).concat(filters && filters.length ? CellMethods.renderFilterIcon(h, params) : []);
  },

  // 行格编辑模式
  renderRowEdit(h, params) {
    let {
      $table
    } = params;
    let {
      actived
    } = $table.editStore;
    return CellMethods.runRenderer(h, params, this, actived && actived.row === params.row);
  },

  renderTreeRowEdit(h, params) {
    return CellMethods.renderTreeIcon(h, params).concat(CellMethods.renderRowEdit(h, params));
  },

  // 单元格编辑模式
  renderCellEdit(h, params) {
    let {
      $table
    } = params;
    let {
      actived
    } = $table.editStore;
    return CellMethods.runRenderer(h, params, this, actived && actived.row === params.row && actived.column === params.column);
  },

  renderTreeCellEdit(h, params) {
    return CellMethods.renderTreeIcon(h, params).concat(CellMethods.renderCellEdit(h, params));
  },

  runRenderer(h, params, _vm, isEdit) {
    let {
      $table,
      column
    } = params;
    let {
      slots
    } = column;
    let editRender = _vm ? _vm.editRender : column.editRender;
    let compConf = Renderer.get(editRender.name);
    let context = {
      $excel: $table.$parent,
      $table,
      $column: column
    };

    if (editRender.type === 'visible' || isEdit) {
      if (slots && slots.edit) {
        return slots.edit(params);
      }

      return compConf && compConf.renderEdit ? compConf.renderEdit(h, editRender, params, context) : [];
    }

    return compConf && compConf.renderCell ? compConf.renderCell(h, editRender, params, context) : CellMethods.renderCell(h, params);
  }

};
/* harmony default export */ var src_cell = (CellMethods);
// CONCATENATED MODULE: ./packages/table/src/table.js







var rowUniqueId = 0;
/**
 * 渲染浮固定列
 */

function renderFixed(h, $table, fixedType) {
  let {
    tableData,
    tableColumn,
    visibleColumn,
    collectColumn,
    isGroup,
    height,
    containerHeight,
    vSize,
    headerHeight,
    footerHeight,
    showHeader,
    showFooter,
    tableHeight,
    scrollYWidth,
    scrollXHeight,
    scrollRightToLeft,
    scrollLeftToRight,
    columnStore,
    footerData
  } = $table;
  let customHeight = height === 'auto' ? containerHeight : external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.toNumber(height);
  let isRightFixed = fixedType === 'right';
  let fixedColumn = columnStore[`${fixedType}List`];
  let style = {
    height: `${(customHeight > 0 ? customHeight - headerHeight - footerHeight : tableHeight) + headerHeight + footerHeight - scrollXHeight * (showFooter ? 2 : 1)}px`,
    width: `${fixedColumn.reduce((previous, column) => previous + column.renderWidth, isRightFixed ? scrollYWidth : 0)}px`
  };
  return h('div', {
    class: [`vxe-table--fixed-${fixedType}-wrapper`, {
      'scrolling--middle': isRightFixed ? scrollRightToLeft : scrollLeftToRight
    }],
    style,
    ref: `fixedTable`
  }, [showHeader ? h('vxe-table-header', {
    props: {
      fixedType,
      tableData,
      tableColumn,
      visibleColumn,
      collectColumn,
      size: vSize,
      fixedColumn,
      isGroup
    },
    ref: `${fixedType}Header`
  }) : null, h('vxe-table-body', {
    style: {
      top: `${headerHeight}px`
    },
    props: {
      fixedType,
      tableData,
      tableColumn,
      visibleColumn,
      collectColumn,
      fixedColumn,
      size: vSize,
      isGroup
    },
    ref: `${fixedType}Body`
  }), showFooter ? h('vxe-table-footer', {
    style: {
      top: `${customHeight ? customHeight - footerHeight : tableHeight}px`
    },
    props: {
      fixedType,
      footerData,
      tableColumn,
      visibleColumn,
      size: vSize,
      fixedColumn
    },
    ref: `${fixedType}Footer`
  }) : null]);
}

/* harmony default export */ var table = ({
  name: 'VxeTable',
  props: src_props,

  provide() {
    return {
      $table: this
    };
  },

  data() {
    return {
      id: external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.uniqueId(),
      // 表头子列属性
      headerProps: {
        children: 'children'
      },
      // 列分组配置
      collectColumn: [],
      // 完整所有列
      tableFullColumn: [],
      // 渲染的列
      tableColumn: [],
      // 完整数据
      // tableFullData: [],
      // afterFullData: [],
      // 渲染中的数据
      tableData: [],
      // 表格父容器的高度
      containerHeight: 0,
      // 表格宽度
      tableWidth: 0,
      // 表格高度
      tableHeight: 0,
      // 表头高度
      headerHeight: 0,
      // 表尾高度
      footerHeight: 0,
      // 是否启用了横向 X 可视渲染方式加载
      scrollXLoad: false,
      // 是否启用了纵向 Y 可视渲染方式加载
      scrollYLoad: false,
      // 是否存在纵向滚动条
      overflowY: true,
      // 是否存在横向滚动条
      overflowX: false,
      // 纵向滚动条的宽度
      scrollYWidth: 0,
      // 横向滚动条的高度
      scrollXHeight: 0,
      // 左侧固定列是否向右滚动了
      scrollLeftToRight: false,
      // 右侧固定列是否向左滚动了
      scrollRightToLeft: false,
      // 是否全选
      isAllSelected: false,
      // 多选属性，有选中且非全选状态
      isIndeterminate: false,
      // 多选属性，已选中的列
      selection: [],
      // 单选属性
      selectRow: null,
      // 已展开的行
      expandeds: [],
      // 已展开树节点
      treeExpandeds: [],
      // 树节点不确定状态的列表
      treeIndeterminates: [],
      // 当前 hover 行
      hoverRow: null,
      // 当前选中的筛选列
      filterStore: {
        isAllSelected: false,
        isIndeterminate: false,
        style: null,
        options: [],
        column: null,
        multiple: false,
        visible: false
      },
      // 存放列相关的信息
      columnStore: {
        leftList: [],
        centerList: [],
        rightList: [],
        resizeList: [],
        pxList: [],
        pxMinList: [],
        scaleList: [],
        scaleMinList: [],
        autoList: []
      },
      // 存放快捷菜单的信息
      ctxMenuStore: {
        selected: null,
        visible: false,
        showChild: false,
        selectChild: null,
        list: [],
        style: null
      },
      // 存放横向 X 可视渲染相关的信息
      scrollXStore: {
        renderSize: 0,
        visibleSize: 0,
        offsetSize: 0,
        rowHeight: 0,
        startIndex: 0,
        visibleIndex: 0,
        leftSpaceWidth: 0,
        rightSpaceWidth: 0
      },
      // 存放纵向 Y 可视渲染相关的信息
      scrollYStore: {
        renderSize: 0,
        visibleSize: 0,
        offsetSize: 0,
        rowHeight: 0,
        startIndex: 0,
        visibleIndex: 0,
        topSpaceHeight: 0,
        bottomSpaceHeight: 0
      },
      // 存放 tooltip 相关信息
      tooltipStore: {
        visible: false,
        row: null,
        column: null,
        content: null,
        style: null,
        arrowStyle: null,
        placement: null
      },
      // 存放可编辑相关信息
      editStore: {
        // 所有选中
        checked: {
          rows: [],
          columns: [],
          tRows: [],
          tColumns: []
        },
        // 选中源
        selected: {
          row: null,
          column: null
        },
        // 已复制源
        copyed: {
          cut: false,
          rows: [],
          columns: []
        },
        // 激活
        actived: {
          row: null,
          column: null
        },
        insertList: [],
        removeList: []
      },
      // 存放数据校验相关信息
      validStore: {
        visible: false,
        row: null,
        column: null,
        rule: null,
        style: null,
        placement: null
      }
    };
  },

  computed: {
    vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },

    // 优化的参数
    optimizeOpts() {
      return Object.assign({}, conf.optimization, this.optimization);
    },

    tooltipOpts() {
      return Object.assign({}, conf.tooltipConfig, this.tooltipConfig);
    },

    // 是否使用了分组表头
    isGroup() {
      return this.collectColumn.some(column => UtilTools.hasChildrenList(column));
    },

    visibleColumn() {
      return this.tableFullColumn ? this.tableFullColumn.filter(column => column.visible) : [];
    },

    isResizable() {
      return this.resizable || this.tableFullColumn.some(column => column.resizable);
    },

    isFilter() {
      return this.tableColumn.some(column => column.filters && column.filters.length);
    },

    headerCtxMenu() {
      return this.ctxMenuConfig.header && this.ctxMenuConfig.header.options ? this.ctxMenuConfig.header.options : [];
    },

    bodyCtxMenu() {
      return this.ctxMenuConfig.body && this.ctxMenuConfig.body.options ? this.ctxMenuConfig.body.options : [];
    },

    isCtxMenu() {
      return this.headerCtxMenu.length || this.bodyCtxMenu.length;
    },

    ctxMenuConfig() {
      return Object.assign({}, this.contextMenu);
    },

    ctxMenuList() {
      let rest = [];
      this.ctxMenuStore.list.forEach(list => {
        list.forEach(item => {
          rest.push(item);
        });
      });
      return rest;
    },

    footerData() {
      let {
        showFooter,
        visibleColumn,
        tableFullData,
        data,
        footerMethod
      } = this;
      return showFooter && footerMethod && (visibleColumn.length || data) ? footerMethod({
        columns: visibleColumn,
        data: tableFullData
      }) : ['-'];
    }

  },
  watch: {
    data(value) {
      if (!this.isUpdateData) {
        this.loadData(value, true).then(this.handleDefaultExpand);
      }

      this.isUpdateData = false;
    },

    customs(value) {
      if (!this.isUpdateCustoms) {
        this.mergeCustomColumn(value);
      }

      this.isUpdateCustoms = false;
    },

    collectColumn(value) {
      let tableFullColumn = UtilTools.getColumnList(value);
      this.tableFullColumn = tableFullColumn;
      this.updateCacheMap(tableFullColumn, 'fullColumn');
    },

    tableColumn() {
      this.analyColumnWidth();
    },

    height() {
      this.$nextTick(this.recalculate);
    }

  },

  created() {
    let {
      scrollYStore,
      optimizeOpts,
      selectConfig,
      treeConfig,
      editConfig
    } = this;
    let {
      scrollY
    } = optimizeOpts;

    if (scrollY) {
      Object.assign(scrollYStore, {
        startIndex: 0,
        visibleIndex: 0,
        renderSize: scrollY.rSize,
        offsetSize: scrollY.oSize
      });
    }

    this.afterFullData = [];
    this.fullDataIndexMap = new Map();
    this.fullDataKeyMap = new Map();
    this.fullColumnIndexMap = new Map();
    this.loadData(this.data, true).then(() => {
      let rowKey = UtilTools.getRowKey(this);

      if (selectConfig && selectConfig.reserve && !rowKey) {
        throw new Error('[vxe-table] Checkbox status reserve must have a unique primary key.');
      } else if (treeConfig && !rowKey) {
        throw new Error('[vxe-table] Tree table must have a unique primary key.');
      } else if (editConfig && !rowKey) {
        throw new Error('[vxe-table] Editable must have a unique primary key.');
      }

      this.tableFullColumn = UtilTools.getColumnList(this.collectColumn);

      if (this.customs) {
        this.mergeCustomColumn(this.customs);
      }

      this.refreshColumn();
      this.handleDefaultExpand();
    });
    GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent);
    GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent);
    GlobalEvent.on(this, 'contextmenu', this.handleGlobalContextmenuEvent);
    GlobalEvent.on(this, 'mousewheel', this.handleGlobalMousewheelEvent);
    GlobalEvent.on(this, 'keydown', this.handleGlobalKeydownEvent);
    GlobalEvent.on(this, 'resize', this.handleGlobalResizeEvent);
  },

  mounted() {
    if (this.autoResize) {
      resize.on(this, this.$el.parentNode, this.recalculate);
    }

    document.body.appendChild(this.$refs.tableWrapper);
  },

  beforeDestroy() {
    let tableWrapper = this.$refs.tableWrapper;

    if (tableWrapper && tableWrapper.parentNode) {
      tableWrapper.parentNode.removeChild(tableWrapper);
    }

    this.afterFullData.length = 0;
    this.fullDataIndexMap.clear();
    this.fullColumnIndexMap.clear();
    this.closeFilter();
    this.closeContextMenu();
    resize.off(this, this.$el.parentNode);
  },

  destroyed() {
    GlobalEvent.off(this, 'mousedown');
    GlobalEvent.off(this, 'blur');
    GlobalEvent.off(this, 'contextmenu');
    GlobalEvent.off(this, 'mousewheel');
    GlobalEvent.off(this, 'keydown');
    GlobalEvent.off(this, 'resize');
  },

  render(h) {
    let {
      _e,
      id,
      tableData,
      tableColumn,
      visibleColumn,
      collectColumn,
      isGroup,
      isFilter,
      isResizable,
      isCtxMenu,
      loading,
      showHeader,
      border,
      stripe,
      highlightHoverRow,
      vSize,
      tooltipOpts,
      editConfig,
      showFooter,
      footerMethod,
      overflowX,
      overflowY,
      scrollXHeight,
      optimizeOpts,
      columnStore,
      filterStore,
      ctxMenuStore,
      tooltipStore,
      validStore,
      footerData
    } = this;
    let {
      leftList,
      rightList
    } = columnStore;
    return h('div', {
      class: ['vxe-table', vSize ? `size--${vSize}` : '', {
        'vxe-editable': editConfig,
        'show--head': showHeader,
        'show--foot': showFooter,
        'scroll--y': overflowY,
        'scroll--x': overflowX,
        'fixed--left': leftList.length,
        'fixed--right': rightList.length,
        't--animat': optimizeOpts.animat,
        't--stripe': stripe,
        't--border': border,
        't--highlight': highlightHoverRow
      }]
    }, [
    /**
     * 隐藏列
     */
    h('div', {
      class: ['vxe-table-hidden-column'],
      ref: 'hideColumn'
    }, this.$slots.default),
    /**
     * 主头部
     */
    showHeader ? h('vxe-table-header', {
      ref: 'tableHeader',
      props: {
        tableData,
        tableColumn,
        visibleColumn,
        collectColumn,
        size: vSize,
        isGroup
      }
    }) : _e(),
    /**
     * 主内容
     */
    h('vxe-table-body', {
      ref: 'tableBody',
      props: {
        tableData,
        tableColumn,
        visibleColumn,
        collectColumn,
        size: vSize,
        isGroup
      }
    }),
    /**
     * 底部汇总
     */
    showFooter ? h('vxe-table-footer', {
      props: {
        footerData,
        footerMethod,
        tableColumn,
        visibleColumn,
        size: vSize
      },
      ref: 'tableFooter'
    }) : _e(),
    /**
     * 左侧固定列
     */
    leftList && leftList.length && overflowX ? renderFixed(h, this, 'left') : _e(),
    /**
     * 右侧固定列
     */
    rightList && rightList.length && overflowX ? renderFixed(h, this, 'right') : _e(),
    /**
     * 列宽线
     */
    isResizable ? h('div', {
      class: ['vxe-table--resizable-bar'],
      style: overflowX ? {
        'padding-bottom': `${scrollXHeight}px`
      } : null,
      ref: 'resizeBar'
    }) : _e(),
    /**
     * 加载中
     */
    h('div', {
      class: ['vxe-table--loading'],
      style: {
        display: loading ? 'block' : 'none'
      }
    }, [h('div', {
      class: 'vxe-table--spinner'
    })]), h('div', {
      class: [`vxe-table${id}-wrapper`],
      ref: 'tableWrapper'
    }, [
    /**
     * 筛选
     */
    isFilter ? h('vxe-table-filter', {
      props: {
        optimizeOpts,
        filterStore
      },
      ref: 'filterWrapper'
    }) : null,
    /**
     * 快捷菜单
     */
    isCtxMenu ? h('vxe-table-context-menu', {
      props: {
        ctxMenuStore
      },
      ref: 'ctxWrapper'
    }) : null,
    /**
     * tooltip
     */
    tooltipStore.visible ? h('div', {
      class: ['vxe-table--tooltip-wrapper', `theme--${tooltipOpts.theme}`, `placement--${tooltipStore.placement}`],
      style: tooltipStore.style,
      ref: 'tipWrapper'
    }, [h('div', {
      class: ['vxe-table--tooltip-content']
    }, UtilTools.formatText(tooltipStore.content)), h('div', {
      class: ['vxe-table--tooltip-arrow'],
      style: tooltipStore.arrowStyle
    })]) : null,
    /**
     * valid error
     */
    validStore.visible ? h('div', {
      class: ['vxe-table--valid-error-wrapper', `placement--${validStore.placement}`],
      style: validStore.style,
      ref: 'validWrapper'
    }, [h('div', {
      class: ['vxe-table--valid-error-content']
    }, UtilTools.formatText(validStore.rule.message)), h('div', {
      class: ['vxe-table--valid-error-arrow']
    })]) : null])]);
  },

  methods: {
    clearSort() {
      this.tableFullColumn.forEach(column => {
        column.order = null;
      });
      this.tableFullData = this.data || [];
      this.tableData = this.getTableData(true).tableData;
      return this.$nextTick();
    },

    clearFilter(force) {
      Object.assign(this.filterStore, {
        isAllSelected: false,
        isIndeterminate: false,
        style: null,
        options: [],
        column: null,
        multiple: false,
        visible: false
      });
      return this.$nextTick();
    },

    clearAll() {
      this.clearScroll();
      this.clearSort();
      this.clearFilter();
      this.clearCurrentRow();
      this.clearSelection();
      this.clearRowExpand();
      this.clearTreeExpand();
    },

    loadData(datas, notRefresh) {
      let {
        height,
        maxHeight,
        editStore,
        optimizeOpts,
        recalculate
      } = this;
      let {
        scrollY
      } = optimizeOpts;
      let tableFullData = datas || [];
      let scrollYLoad = scrollY && scrollY.gt && scrollY.gt < tableFullData.length;
      editStore.insertList = [];
      editStore.removeList = []; // 原始数据

      this.tableSourceData = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.clone(tableFullData, true); // 全量数据

      this.tableFullData = tableFullData;
      this.scrollYLoad = scrollYLoad;

      if (scrollYLoad && !(height || maxHeight)) {
        throw new Error('[vxe-table] The height/max-height must be set for the scroll load.');
      }

      this.tableData = this.getTableData(true).tableData;
      this.updateCacheMap(tableFullData, 'fullData');
      this.reserveCheckSelection();
      this.checkSelectionStatus();
      let rest = this.$nextTick();

      if (!notRefresh) {
        rest = rest.then(recalculate);
      }

      return rest;
    },

    reloadData(datas) {
      this.clearAll();
      return this.loadData(datas).then(this.handleDefaultExpand);
    },

    loadColumn(columns) {
      let collectColumn = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.mapTree(columns, column => src_cell.createColumn(this, column), this.headerProps);
      this.collectColumn = collectColumn;
      this.tableFullColumn = UtilTools.getColumnList(collectColumn);

      if (this.customs) {
        this.mergeCustomColumn(this.customs);
      }

      this.updateCacheMap(columns, 'fullColumn');
      this.refreshColumn();
      return this.$nextTick();
    },

    reloadColumn(columns) {
      this.clearAll();
      return this.loadColumn(columns);
    },

    // 更新数据真实的索引 Map
    updateCacheMap(datas, key) {
      let indexMap = this[`${key}IndexMap`];
      let keyMap = this[`${key}KeyMap`];
      let rowKey = UtilTools.getRowKey(this);
      indexMap.clear();

      if (keyMap && rowKey) {
        keyMap.clear();
        datas.forEach((row, index) => {
          keyMap.set(external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, rowKey), {
            rowKey,
            row,
            index
          });
          indexMap.set(row, {
            row,
            index
          });
        });
      } else {
        datas.forEach((row, index) => indexMap.set(row, {
          row,
          index
        }));
      }
    },

    getRowMapIndex(row) {
      return this.fullDataIndexMap.has(row) ? this.fullDataIndexMap.get(row).index : -1;
    },

    getRowIndex(row) {
      let {
        tableFullData,
        treeConfig
      } = this;
      return treeConfig ? external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.findTree(tableFullData, item => item === row, treeConfig) : this.getRowMapIndex(row);
    },

    getColumnMapIndex(column) {
      return this.fullColumnIndexMap.has(column) ? this.fullColumnIndexMap.get(column).index : -1;
    },

    getColumnIndex(column) {
      return this.getColumnMapIndex(column);
    },

    insert(records) {
      return this.insertAt(records);
    },

    /**
     * 从指定行插入数据
     */
    insertAt(records, row) {
      let {
        tableData,
        editStore,
        defineProperty
      } = this;

      if (!external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isArray(records)) {
        records = [records];
      }

      let newRecords = records.map(record => defineProperty(record));

      if (arguments.length === 1) {
        tableData.unshift.apply(tableData, newRecords);
      } else {
        if (row === -1) {
          tableData.push.apply(tableData, newRecords);
        } else {
          let rowIndex = tableData.indexOf(row);
          tableData.splice.apply(tableData, [rowIndex, 0].concat(newRecords));
        }
      }

      [].unshift.apply(editStore.insertList, newRecords);
      this.checkSelectionStatus();
      return this.$nextTick().then(() => {
        this.recalculate();
        return {
          row: newRecords.length ? newRecords[newRecords.length - 1] : null,
          rows: newRecords
        };
      });
    },

    defineProperty(record) {
      let recordItem = Object.assign({}, record);
      let rowKey = UtilTools.getRowKey(this);
      this.visibleColumn.forEach(column => {
        if (column.property && !external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.has(recordItem, column.property)) {
          external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.set(recordItem, column.property, null);
        } // 如果设置了 Key 就必须要唯一，可以自行设置；如果为空，则默认生成一个随机数


        if (rowKey && !external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(recordItem, rowKey)) {
          external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.set(recordItem, rowKey, ++rowUniqueId + Date.now());
        }
      });
      return recordItem;
    },

    /**
     * 删除指定行数据
     * 如果传 row 则删除一行
     * 如果传 rows 则删除多行
     */
    remove(rows) {
      let {
        tableData,
        tableFullData,
        editStore,
        treeConfig,
        selectConfig = {},
        selection,
        hasRowInsert
      } = this;
      let {
        removeList,
        insertList
      } = editStore;
      let {
        checkProp: property
      } = selectConfig;
      let rest = [];
      this.isUpdateData = true;

      if (rows) {
        if (!external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isArray(rows)) {
          rows = [rows];
        }

        if (treeConfig) {
          rows.forEach(row => {
            let matchObj = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.findTree(tableFullData, item => item === row, treeConfig);

            if (matchObj) {
              let {
                item,
                items,
                index
              } = matchObj; // 如果是新增，则保存记录

              if (!hasRowInsert(item)) {
                removeList.push(item);
              } // 从树节点中移除


              let restRow = items.splice(index, 1)[0]; // 如果绑定了多选属性，则更新状态

              if (!property) {
                external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.remove(selection, row => rows.indexOf(row) > -1);
              }

              rest.push(restRow);
            }
          });
        } else {
          // 如果是新增，则保存记录
          rows.forEach(row => {
            if (!hasRowInsert(row)) {
              removeList.push(row);
            }
          }); // 从数据源中移除

          rest = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.remove(tableFullData, row => rows.indexOf(row) > -1); // 如果绑定了多选属性，则更新状态

          if (!property) {
            external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.remove(selection, row => rows.indexOf(row) > -1);
          } // 从列表中移除


          external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.remove(tableData, row => rows.indexOf(row) > -1);
        }

        external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.remove(insertList, row => rows.indexOf(row) > -1);
      }

      this.checkSelectionStatus();
      return this.$nextTick().then(() => {
        this.recalculate();
        return {
          row: rows && rows.length ? rows[rows.length - 1] : null,
          rows: rest
        };
      });
    },

    /**
     * 删除选中数据
     */
    removeSelecteds() {
      return this.remove(this.getSelectRecords()).then(params => {
        this.clearSelection();
        return params;
      });
    },

    /**
     * 还原数据
     * 如果不传任何参数，则还原整个表格
     * 如果传 row 则还原一行
     * 如果传 rows 则还原多行
     * 如果还额外传了 prop 则还原指定单元格
     */
    revert(rows, prop) {
      let {
        tableSourceData,
        tableFullData
      } = this;

      if (arguments.length) {
        if (rows && !external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isArray(rows)) {
          rows = [rows];
        }

        rows.forEach(row => {
          let rowIndex = tableFullData.indexOf(row);
          let oRow = tableSourceData[rowIndex];

          if (oRow && row) {
            if (prop) {
              external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.set(row, prop, external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(oRow, prop));
            } else {
              external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.destructuring(row, oRow);
            }
          }
        });
        return this.$nextTick();
      }

      return this.reloadData(tableSourceData);
    },

    /**
     * 清空单元格内容
     * 如果不创参数，则清空整个表格内容
     * 如果传 row 则清空一行内容
     * 如果传 rows 则清空多行内容
     * 如果还额外传了 prop 则清空指定单元格内容
     */
    clearData(rows, prop) {
      let {
        tableSourceData,
        visibleColumn
      } = this;

      if (!arguments.length) {
        rows = tableSourceData;
      } else if (rows && !external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isArray(rows)) {
        rows = [rows];
      }

      if (prop) {
        rows.forEach(row => external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.set(row, prop, null));
      } else {
        rows.forEach(row => {
          visibleColumn.forEach(column => {
            if (column.property) {
              UtilTools.setCellValue(row, column, null);
            }
          });
        });
      }

      return this.$nextTick();
    },

    hasRowInsert(row) {
      let {
        treeConfig,
        tableSourceData
      } = this;

      if (treeConfig) {
        return external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.findTree(tableSourceData, item => item === row, treeConfig);
      }

      return this.getRowMapIndex(row) === -1;
    },

    hasRowChange(row, prop) {
      let {
        tableSourceData,
        treeConfig
      } = this;
      let rowKey = UtilTools.getRowKey(this);
      let oRow;

      if (rowKey || treeConfig) {
        let rowId = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, rowKey);

        if (treeConfig) {
          let children = treeConfig.children;
          let matchObj = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.findTree(tableSourceData, row => rowId === external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, rowKey), treeConfig);
          row = Object.assign({}, row, {
            [children]: null
          });

          if (matchObj) {
            oRow = Object.assign({}, matchObj.item, {
              [children]: null
            });
          }
        } else {
          oRow = tableSourceData.find(row => rowId === external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, rowKey));
        }
      } else {
        let oRowIndex = this.getRowMapIndex(row);
        oRow = tableSourceData[oRowIndex];
      }

      if (arguments.length > 1) {
        return oRow && !external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isEqual(external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(oRow, prop), external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, prop));
      }

      return oRow && !external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isEqual(oRow, row);
    },

    /**
     * 获取表格所有列
     */
    getColumns(columnIndex) {
      let columns = this.visibleColumn;
      return arguments.length ? columns[columnIndex] : columns;
    },

    /**
     * 获取表格所有数据
     */
    getRecords(rowIndex) {
      let list = this.tableFullData;
      return arguments.length ? list[rowIndex] : list;
    },

    /**
     * 获取表格数据集合
     */
    getAllRecords() {
      return {
        insertRecords: this.getInsertRecords(),
        removeRecords: this.getRemoveRecords(),
        updateRecords: this.getUpdateRecords()
      };
    },

    /**
     * 获取新增数据
     */
    getInsertRecords() {
      return this.editStore.insertList;
    },

    /**
     * 获取删除数据
     */
    getRemoveRecords() {
      return this.editStore.removeList;
    },

    /**
     * 获取选中数据
     */
    getSelectRecords() {
      let {
        tableFullData,
        editStore,
        treeConfig,
        selectConfig = {},
        selection
      } = this;
      let {
        checkProp: property
      } = selectConfig;
      let rowList = [];
      let insList = [];

      if (property) {
        if (treeConfig) {
          rowList = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.filterTree(tableFullData, row => external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, property), treeConfig);
        } else {
          rowList = tableFullData.filter(row => external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, property));
        }

        insList = editStore.insertList.filter(row => external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, property));
      } else {
        if (treeConfig) {
          rowList = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.filterTree(tableFullData, row => selection.indexOf(row) > -1, treeConfig);
        } else {
          rowList = tableFullData.filter(row => selection.indexOf(row) > -1);
        }

        insList = editStore.insertList.filter(row => selection.indexOf(row) > -1);
      }

      return rowList.concat(insList);
    },

    /**
     * 获取更新数据
     * 只精准匹配 row 的更改
     * 如果是树表格，子节点更改状态不会影响父节点的更新状态
     */
    getUpdateRecords() {
      let {
        tableFullData,
        hasRowChange,
        treeConfig
      } = this;

      if (treeConfig) {
        return external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.filterTree(tableFullData, row => hasRowChange(row));
      }

      return tableFullData.filter(row => hasRowChange(row));
    },

    /**
     * 获取处理后全量的表格数据
     * 如果存在筛选条件，继续处理
     */
    updateAfterFullData() {
      let {
        visibleColumn,
        tableFullData
      } = this;
      let column = this.visibleColumn.find(column => column.order);
      let tableData = tableFullData;
      let filterColumn = visibleColumn.filter(({
        filters
      }) => filters && filters.length);
      tableData = tableData.filter(row => {
        return filterColumn.every(column => {
          let {
            property,
            filters,
            filterMethod,
            remoteFilter
          } = column;

          if (filters && filters.length) {
            let valueList = [];
            filters.forEach(item => {
              if (item.checked) {
                valueList.push(item.value);
              }
            });

            if (valueList.length && !remoteFilter) {
              return filterMethod ? valueList.some(value => filterMethod({
                value,
                row,
                column
              })) : valueList.indexOf(external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, property)) > -1;
            }
          }

          return true;
        });
      });

      if (column && column.order) {
        let rest = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.sortBy(tableData, column.property);
        tableData = column.order === 'desc' ? rest.reverse() : rest;
      }

      this.afterFullData = tableData;
      return tableData;
    },

    /**
     * 获取处理后的表格数据
     * 如果存在筛选条件，继续处理
     * 如果存在排序，继续处理
     */
    getTableData(force) {
      let {
        scrollYLoad,
        scrollYStore
      } = this;
      let fullData = force ? this.updateAfterFullData() : this.afterFullData;
      return {
        fullData,
        tableData: scrollYLoad ? fullData.slice(scrollYStore.startIndex, scrollYStore.startIndex + scrollYStore.renderSize) : fullData.slice(0)
      };
    },

    handleDefaultExpand() {
      if (this.selectConfig) {
        this.handleDefaultRowChecked();
      }

      if (this.expandConfig) {
        this.handleDefaultRowExpand();
      }

      if (this.treeConfig) {
        this.handleDefaultTreeExpand();
      }

      this.$nextTick(this.recalculate);
    },

    /**
     * 动态列处理
     */
    mergeCustomColumn(customColumns) {
      this.isUpdateCustoms = true;
      this.tableFullColumn.forEach(column => {
        let item = customColumns.find(item => column.property && item.prop === column.property);
        column.visible = item ? !!item.visible : true;
      });
      this.$emit('update:customs', this.tableFullColumn);
    },

    /**
     * 初始化加载动态列
     */
    reloadCustoms(customColumns) {
      return this.$nextTick().then(() => {
        this.mergeCustomColumn(customColumns);
        return this.refreshColumn().then(() => this.tableFullColumn);
      });
    },

    /**
     * 刷新列信息
     * 将固定的列左边、右边分别靠边
     * 如果使用了分组表头，固定列必须在左侧或者右侧
     */
    refreshColumn() {
      let isColspan;
      let letIndex = 0;
      let leftList = [];
      let rightIndex = 0;
      let centerList = [];
      let rightList = [];
      let {
        headerProps,
        collectColumn,
        tableFullColumn,
        isGroup,
        columnStore,
        scrollXStore,
        optimizeOpts
      } = this;
      let {
        scrollX
      } = optimizeOpts; // 如果是分组表头，如果子列全部被隐藏，则根列也隐藏

      if (isGroup) {
        external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.eachTree(collectColumn, column => {
          if (column.children && column.children.length) {
            column.visible = !!external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.findTree(column.children, subColumn => subColumn.children && subColumn.children.length ? 0 : subColumn.visible, headerProps);
          }
        }, headerProps);
      } // 重新分配列


      tableFullColumn.filter(column => column.visible).forEach((column, columnIndex) => {
        if (column.fixed === 'left') {
          if (!isColspan) {
            if (columnIndex - letIndex !== 0) {
              isColspan = true;
            } else {
              letIndex++;
            }
          }

          leftList.push(column);
        } else if (column.fixed === 'right') {
          if (!isColspan) {
            if (!rightIndex) {
              rightIndex = columnIndex;
            }

            if (columnIndex - rightIndex !== 0) {
              isColspan = true;
            } else {
              rightIndex++;
            }
          }

          rightList.push(column);
        } else {
          centerList.push(column);
        }
      });
      let visibleColumn = leftList.concat(centerList).concat(rightList);
      let scrollXLoad = scrollX && scrollX.gt && scrollX.gt < tableFullColumn.length;
      Object.assign(columnStore, {
        leftList,
        centerList,
        rightList
      });

      if (isColspan && isGroup || rightIndex && rightIndex !== visibleColumn.length) {
        throw new Error('[vxe-table] Fixed column must to the left and right sides.');
      }

      if (scrollXLoad) {
        Object.assign(scrollXStore, {
          startIndex: 0,
          visibleIndex: 0,
          renderSize: scrollX.rSize,
          offsetSize: scrollX.oSize
        });
        visibleColumn = visibleColumn.slice(scrollXStore.startIndex, scrollXStore.startIndex + scrollXStore.renderSize);
      }

      this.scrollXLoad = scrollXLoad;
      this.tableColumn = visibleColumn; // 需要计算两次，解决隐藏列首次被显示无宽度造成闪动问题

      return this.$nextTick().then(this.recalculate).then(this.recalculate);
    },

    /**
     * 指定列宽的列进行拆分
     */
    analyColumnWidth() {
      let resizeList = [];
      let pxList = [];
      let pxMinList = [];
      let scaleList = [];
      let scaleMinList = [];
      let autoList = [];
      this.tableFullColumn.forEach(column => {
        if (column.visible) {
          if (column.resizeWidth) {
            resizeList.push(column);
          } else if (DomTools.isPx(column.width)) {
            pxList.push(column);
          } else if (DomTools.isScale(column.width)) {
            scaleList.push(column);
          } else if (DomTools.isPx(column.minWidth)) {
            pxMinList.push(column);
          } else if (DomTools.isScale(column.minWidth)) {
            scaleMinList.push(column);
          } else {
            autoList.push(column);
          }
        }
      });
      Object.assign(this.columnStore, {
        resizeList,
        pxList,
        pxMinList,
        scaleList,
        scaleMinList,
        autoList
      });
    },

    /**
     * 计算单元格列宽，动态分配可用剩余空间
     * 支持 width=? width=?px width=?% min-width=? min-width=?px min-width=?%
     */
    recalculate(refull) {
      let {
        tableBody,
        tableHeader,
        tableFooter
      } = this.$refs;
      let bodyElem = tableBody ? tableBody.$el : null;
      let headerElem = tableHeader ? tableHeader.$el : null;
      let footerElem = tableFooter ? tableFooter.$el : null;

      if (bodyElem) {
        let bodyWidth = bodyElem.clientWidth;
        let tableWidth = this.autoCellWidth(headerElem, bodyElem, footerElem, bodyWidth);

        if (refull === true) {
          // 初始化时需要在列计算之后再执行优化运算，达到最优显示效果
          return this.$nextTick().then(() => {
            bodyWidth = bodyElem.clientWidth;

            if (bodyWidth !== tableWidth) {
              this.autoCellWidth(headerElem, bodyElem, footerElem, bodyWidth);
            }

            this.computeScrollLoad();
          });
        }
      }

      return this.$nextTick().then(this.computeScrollLoad);
    },

    // 列宽计算
    autoCellWidth(headerElem, bodyElem, footerElem, bodyWidth) {
      let meanWidth;
      let tableWidth = 0;
      let minCellWidth = 40; // 列宽最少限制 40px

      let remainWidth = bodyWidth;
      let {
        $el,
        fit,
        columnStore
      } = this;
      let {
        resizeList,
        pxMinList,
        pxList,
        scaleList,
        scaleMinList,
        autoList
      } = columnStore; // 最小宽

      pxMinList.forEach(column => {
        let minWidth = parseInt(column.minWidth);
        tableWidth += minWidth;
        column.renderWidth = minWidth;
      }); // 最小百分比

      meanWidth = remainWidth / 100;
      scaleMinList.forEach(column => {
        let scaleWidth = Math.floor(parseInt(column.minWidth) * meanWidth);
        tableWidth += scaleWidth;
        column.renderWidth = scaleWidth;
      }); // 固定百分比

      scaleList.forEach(column => {
        let scaleWidth = Math.floor(parseInt(column.width) * meanWidth);
        tableWidth += scaleWidth;
        column.renderWidth = scaleWidth;
      }); // 固定宽

      pxList.forEach(column => {
        let width = parseInt(column.width);
        tableWidth += width;
        column.renderWidth = width;
      }); // 调整了列宽

      resizeList.forEach(column => {
        let width = parseInt(column.resizeWidth);
        tableWidth += width;
        column.renderWidth = width;
      });
      remainWidth -= tableWidth;
      meanWidth = remainWidth > 0 ? Math.max(Math.floor(remainWidth / (scaleMinList.length + pxMinList.length + autoList.length)), minCellWidth) : minCellWidth;

      if (fit) {
        if (remainWidth > 0) {
          scaleMinList.concat(pxMinList).forEach(column => {
            tableWidth += meanWidth;
            column.renderWidth += meanWidth;
          });
        }
      } else {
        meanWidth = minCellWidth;
      } // 自适应


      autoList.forEach((column, index) => {
        column.renderWidth = meanWidth;
        tableWidth += meanWidth;

        if (fit && index === autoList.length - 1) {
          // 如果所有列足够放的情况下，修补列之间的误差
          let odiffer = bodyWidth - tableWidth;

          if (odiffer > 0) {
            column.renderWidth += odiffer;
            tableWidth = bodyWidth;
          }
        }
      });
      let tableHeight = bodyElem.offsetHeight;
      let scrollYWidth = bodyElem.offsetWidth - bodyWidth;
      this.scrollYWidth = scrollYWidth;
      this.overflowY = scrollYWidth > 0;
      this.tableWidth = tableWidth;
      this.tableHeight = tableHeight;
      this.containerHeight = $el.parentNode.clientHeight;

      if (headerElem) {
        this.headerHeight = headerElem.offsetHeight;
      }

      if (footerElem) {
        let footerHeight = footerElem.offsetHeight;
        this.scrollXHeight = Math.max(footerHeight - footerElem.clientHeight, 0);
        this.overflowX = tableWidth > footerElem.clientWidth;
        this.footerHeight = footerHeight;
      } else {
        this.scrollXHeight = Math.max(tableHeight - bodyElem.clientHeight, 0);
        this.overflowX = tableWidth > bodyWidth;
      }

      if (this.overflowX) {
        this.checkScrolling();
      }

      return tableWidth;
    },

    /**
     * 处理固定列的显示状态
     */
    checkScrolling() {
      let {
        tableBody,
        leftBody,
        rightBody
      } = this.$refs;
      let bodyElem = tableBody ? tableBody.$el : null;

      if (bodyElem) {
        if (leftBody) {
          this.scrollLeftToRight = bodyElem.scrollLeft > 0;
        }

        if (rightBody) {
          this.scrollRightToLeft = bodyElem.clientWidth < bodyElem.scrollWidth - bodyElem.scrollLeft;
        }
      }
    },

    /**
     * 全局按下事件处理
     */
    handleGlobalMousedownEvent(evnt) {
      let {
        editStore,
        ctxMenuStore,
        editConfig = {}
      } = this;
      let {
        actived
      } = editStore;

      if (this.$refs.filterWrapper) {
        if (DomTools.getEventTargetNode(evnt, this.$el, 'vxe-filter-wrapper').flag) {// 如果点击了筛选按钮
        } else if (DomTools.getEventTargetNode(evnt, this.$refs.filterWrapper.$el).flag) {// 如果点击筛选容器
        } else {
          this.closeFilter();
        }
      } // 如果已激活了编辑状态


      if (actived.row) {
        if (!(editConfig.autoClear === false)) {
          // 如果手动调用了激活单元格，避免触发源被移除后导致重复关闭
          if (!this.lastCallTime || this.lastCallTime + 50 < Date.now()) {
            let evntList = Interceptor.get('event.clear_actived');

            if (!evntList.some(func => func(actived.args, evnt) === false)) {
              let isClear;
              let isReadonlyCol = !DomTools.getEventTargetNode(evnt, this.$el, 'col--edit').flag; // row 方式

              if (editConfig.mode === 'row') {
                let rowNode = DomTools.getEventTargetNode(evnt, this.$el, 'vxe-body--row');
                let isOtherRow = rowNode.flag ? rowNode.targetElem !== actived.args.cell.parentNode : 0;

                if (editConfig.trigger === 'manual') {
                  // manual 触发，如果点击了不同行
                  isClear = isOtherRow;
                } else {
                  // click,dblclick 触发，如果点击了不同行的非编辑列
                  isClear = isOtherRow && isReadonlyCol;
                }
              } else {
                // cell 方式，如果是非编辑列
                isClear = isReadonlyCol;
              }

              if (isClear || // 如果点击了当前表格之外
              !DomTools.getEventTargetNode(evnt, this.$el).flag) {
                // this.triggerValidate('blur').then(a => {
                this.clearValidate();
                this.clearActived(evnt); // }).catch(e => e)
              }
            }
          }
        }
      } // 如果配置了快捷菜单且，点击了其他地方则关闭


      if (ctxMenuStore.visible && this.$refs.ctxWrapper && !DomTools.getEventTargetNode(evnt, this.$refs.ctxWrapper.$el).flag) {
        this.closeContextMenu();
      }
    },

    /**
     * 窗口失焦事件处理
     */
    handleGlobalBlurEvent(evnt) {
      this.closeFilter();
      this.closeContextMenu();
    },

    /**
     * 全局滚动事件
     */
    handleGlobalMousewheelEvent(evnt) {
      this.clostTooltip();
      this.closeContextMenu();
    },

    /**
     * 全局键盘事件
     */
    handleGlobalKeydownEvent(evnt) {
      let params;
      let {
        isCtxMenu,
        ctxMenuStore,
        editStore,
        mouseConfig = {},
        keyboardConfig = {}
      } = this;
      let {
        selected,
        actived
      } = editStore;
      let keyCode = evnt.keyCode;
      let isBack = keyCode === 8;
      let isTab = keyCode === 9;
      let isEnter = keyCode === 13;
      let isEsc = keyCode === 27;
      let isSpacebar = keyCode === 32;
      let isLeftArrow = keyCode === 37;
      let isUpArrow = keyCode === 38;
      let isRightArrow = keyCode === 39;
      let isDwArrow = keyCode === 40;
      let isDel = keyCode === 46;
      let isC = keyCode === 67;
      let isV = keyCode === 86;
      let isX = keyCode === 88;
      let isF2 = keyCode === 113;
      let isCtrlKey = evnt.ctrlKey;
      let operArrow = isLeftArrow || isUpArrow || isRightArrow || isDwArrow;
      let operCtxMenu = isCtxMenu && ctxMenuStore.visible && (isEnter || isSpacebar || operArrow);

      if (isEsc) {
        // 如果按下了 Esc 键，关闭快捷菜单、筛选
        this.closeContextMenu();
        this.closeFilter(); // 如果是激活编辑状态，则取消编辑

        if (actived.row) {
          params = actived.args;
          this.clearActived(evnt); // 如果配置了选中功能，则为选中状态

          if (mouseConfig.selected) {
            this.handleSelected(params, evnt);
          }
        }
      } else if (isEnter && (selected.row || actived.row)) {
        // 如果是激活状态，退则出到下一行
        this.moveSelected(selected.row ? selected.args : actived.args, isLeftArrow, isUpArrow, isRightArrow, true, evnt);
      } else if (operCtxMenu) {
        // 如果配置了右键菜单; 支持方向键操作、回车
        evnt.preventDefault();

        if (ctxMenuStore.showChild && UtilTools.hasChildrenList(ctxMenuStore.selected)) {
          this.moveCtxMenu(evnt, keyCode, ctxMenuStore, 'selectChild', 37, false, ctxMenuStore.selected.children);
        } else {
          this.moveCtxMenu(evnt, keyCode, ctxMenuStore, 'selected', 39, true, this.ctxMenuList);
        }
      } else if (isF2) {
        // 如果按下了 F2 键
        if (selected.row && selected.column) {
          this.handleActived(selected.args, evnt);
        }
      } else if (operArrow && keyboardConfig.isArrow) {
        // 如果按下了方向键
        if (selected.row && selected.column) {
          evnt.preventDefault();
          this.moveSelected(selected.args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow, evnt);
        }
      } else if (isTab && keyboardConfig.isTab) {
        // 如果按下了 Tab 键切换
        if (selected.row || selected.column) {
          evnt.preventDefault();
          this.moveTabSelected(selected.args, evnt);
        } else if (actived.row || actived.column) {
          evnt.preventDefault();
          this.moveTabSelected(actived.args, evnt);
        }
      } else if (isDel || isBack) {
        // 如果是删除键
        if (keyboardConfig.isDel && (selected.row || selected.column)) {
          UtilTools.setCellValue(selected.row, selected.column, null);

          if (isBack) {
            this.handleActived(selected.args, evnt);
          }
        }
      } else if (keyboardConfig.isCut && isCtrlKey && (isX || isC || isV)) {
        // 如果开启复制功能
        if (isX || isC) {
          this.handleCopyed(isX, evnt);
        } else {
          this.handlePaste(evnt);
        }
      } else if (keyboardConfig.isEdit && !isCtrlKey && (keyCode >= 48 && keyCode <= 57 || keyCode >= 65 && keyCode <= 90 || keyCode >= 96 && keyCode <= 111 || keyCode >= 186 && keyCode <= 192 || keyCode >= 219 && keyCode <= 222 || keyCode === 32)) {
        // 如果是按下非功能键之外允许直接编辑
        if (selected.row || selected.column) {
          if (!keyboardConfig.editMethod || !(keyboardConfig.editMethod(selected.args, evnt) === false)) {
            UtilTools.setCellValue(selected.row, selected.column, null);
            this.handleActived(selected.args, evnt);
          }
        }
      }
    },

    // 处理 Tab 键移动
    moveTabSelected(args, evnt) {
      let {
        tableData,
        visibleColumn,
        editConfig
      } = this;
      let nextRow;
      let nextRowIndex;
      let nextColumn;
      let nextColumnIndex;
      let params = Object.assign({}, args);
      let rowIndex = tableData.indexOf(params.row);
      let columnIndex = visibleColumn.indexOf(params.column);

      for (let index = columnIndex + 1; index < visibleColumn.length; index++) {
        if (visibleColumn[index].editRender) {
          nextColumnIndex = index;
          nextColumn = visibleColumn[index];
          break;
        }
      }

      if (!nextColumn && rowIndex < tableData.length - 1) {
        // 如果找不到从下一行开始找，如果一行都找不到就不需要继续找了，可能不存在可编辑的列
        nextRowIndex = rowIndex + 1;
        nextRow = tableData[nextRowIndex];

        for (let index = 0; index < visibleColumn.length; index++) {
          if (visibleColumn[index].editRender) {
            nextColumnIndex = index;
            nextColumn = visibleColumn[index];
            break;
          }
        }
      }

      if (nextColumn) {
        if (nextRow) {
          params.rowIndex = nextRowIndex;
          params.row = nextRow;
        } else {
          params.rowIndex = rowIndex;
        }

        params.columnIndex = nextColumnIndex;
        params.column = nextColumn;
        params.cell = DomTools.getCell(this, params);

        if (editConfig) {
          if (editConfig.trigger === 'click') {
            this.handleActived(params, evnt);
          } else if (editConfig.trigger === 'dblclick') {
            this.handleSelected(params, evnt);
          }
        }
      }
    },

    // 处理方向键移动
    moveSelected(args, isLeftArrow, isUpArrow, isRightArrow, isDwArrow, evnt) {
      let {
        tableData,
        visibleColumn,
        handleSelected
      } = this;
      let params = Object.assign({}, args);

      if (isUpArrow && params.rowIndex) {
        params.rowIndex -= 1;
        params.row = tableData[params.rowIndex];
      } else if (isDwArrow && params.rowIndex < tableData.length - 1) {
        params.rowIndex += 1;
        params.row = tableData[params.rowIndex];
      } else if (isLeftArrow && params.columnIndex) {
        for (let len = params.columnIndex - 1; len >= 0; len--) {
          if (visibleColumn[len].editRender) {
            params.columnIndex = len;
            params.column = visibleColumn[len];
            break;
          }
        }
      } else if (isRightArrow && params.columnIndex) {
        for (let index = params.columnIndex + 1; index < visibleColumn.length; index++) {
          if (visibleColumn[index].editRender) {
            params.columnIndex = index;
            params.column = visibleColumn[index];
            break;
          }
        }
      }

      params.cell = DomTools.getCell(this, params);
      handleSelected(params, evnt);
    },

    // 处理菜单的移动
    moveCtxMenu(evnt, keyCode, ctxMenuStore, key, operKey, operRest, menuList) {
      let selectIndex = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.findIndexOf(menuList, item => ctxMenuStore[key] === item);

      if (keyCode === operKey) {
        if (operRest && UtilTools.hasChildrenList(ctxMenuStore.selected)) {
          ctxMenuStore.showChild = true;
        } else {
          ctxMenuStore.showChild = false;
          ctxMenuStore.selectChild = null;
        }
      } else if (keyCode === 38) {
        ctxMenuStore[key] = menuList[selectIndex - 1] || menuList[menuList.length - 1];
      } else if (keyCode === 40) {
        ctxMenuStore[key] = menuList[selectIndex + 1] || menuList[0];
      } else if (ctxMenuStore[key] && (keyCode === 13 || keyCode === 32)) {
        this.ctxMenuLinkEvent(evnt, ctxMenuStore[key]);
      }
    },

    handleGlobalResizeEvent() {
      this.recalculate();
    },

    /**
     * 快捷菜单事件处理
     */
    handleGlobalContextmenuEvent(evnt) {
      let {
        isCtxMenu
      } = this;

      if (isCtxMenu) {
        // 右键头部
        let headeWrapperNode = DomTools.getEventTargetNode(evnt, this.$el, 'vxe-table--header-wrapper');

        if (headeWrapperNode.flag) {
          this.openContextMenu(evnt, 'header', {});
          return;
        } // 右键内容


        let bodyWrapperNode = DomTools.getEventTargetNode(evnt, this.$el, 'vxe-table--body-wrapper');

        if (bodyWrapperNode.flag) {
          this.openContextMenu(evnt, 'body', {});
          return;
        } // 右键表尾


        let footerWrapperNode = DomTools.getEventTargetNode(evnt, this.$el, 'vxe-table--footer-wrapper');

        if (footerWrapperNode.flag) {
          this.openContextMenu(evnt, 'footer', {});
          return;
        }
      }

      this.closeContextMenu();
      this.closeFilter();
    },

    /**
     * 显示快捷菜单
     */
    openContextMenu(evnt, type, params) {
      let {
        tableData,
        visibleColumn,
        ctxMenuStore,
        ctxMenuConfig
      } = this;
      let config = ctxMenuConfig[type];

      if (config) {
        let {
          options,
          visibleMethod,
          disabled
        } = config;

        if (disabled) {
          evnt.preventDefault();
        } else if (options && options.length) {
          if (!visibleMethod || visibleMethod(params, evnt)) {
            evnt.preventDefault();
            let {
              scrollTop,
              scrollLeft,
              visibleHeight,
              visibleWidth
            } = DomTools.getDomNode();
            let {
              targetElem
            } = DomTools.getEventTargetNode(evnt, this.$el, `vxe-${type}--column`);
            let {
              rowIndex,
              columnIndex
            } = DomTools.getCellIndexs(targetElem);
            let row = tableData[rowIndex];
            let column = visibleColumn[columnIndex];
            let top = evnt.clientY + scrollTop;
            let left = evnt.clientX + scrollLeft;
            Object.assign(ctxMenuStore, {
              args: {
                type,
                row,
                rowIndex,
                column,
                columnIndex,
                cell: targetElem,
                $table: this
              },
              visible: true,
              list: options,
              selected: null,
              selectChild: null,
              showChild: false,
              style: {
                top: `${top}px`,
                left: `${left}px`
              }
            });
            this.$nextTick(() => {
              let ctxElem = this.$refs.ctxWrapper.$el;
              let clientHeight = ctxElem.clientHeight;
              let clientWidth = ctxElem.clientWidth;
              let offsetTop = evnt.clientY + clientHeight - visibleHeight;
              let offsetLeft = evnt.clientX + clientWidth - visibleWidth;

              if (offsetTop > -10) {
                ctxMenuStore.style.top = `${top - clientHeight}px`;
              }

              if (offsetLeft > -10) {
                ctxMenuStore.style.left = `${left - clientWidth}px`;
              }
            });
          } else {
            this.closeContextMenu();
          }
        }
      }

      this.closeFilter();
    },

    /**
     * 关闭快捷菜单
     */
    closeContextMenu() {
      Object.assign(this.ctxMenuStore, {
        list: [],
        visible: false,
        selected: null,
        selectChild: null,
        showChild: false
      });
      return this.$nextTick();
    },

    ctxMenuMouseoverEvent(evnt, item, child) {
      let ctxMenuStore = this.ctxMenuStore;
      evnt.preventDefault();
      evnt.stopPropagation();
      ctxMenuStore.selected = item;
      ctxMenuStore.selectChild = child;

      if (!child) {
        ctxMenuStore.showChild = UtilTools.hasChildrenList(item);
      }
    },

    ctxMenuMouseoutEvent(evnt, item, child) {
      let ctxMenuStore = this.ctxMenuStore;

      if (!item.children) {
        ctxMenuStore.selected = null;
      }

      ctxMenuStore.selectChild = null;
    },

    /**
     * 快捷菜单点击事件
     */
    ctxMenuLinkEvent(evnt, menu) {
      if (!menu.disabled && (!menu.children || !menu.children.length)) {
        UtilTools.emitEvent(this, 'context-menu-click', [Object.assign({
          menu
        }, this.ctxMenuStore.args), evnt]);
        this.closeContextMenu();
      }
    },

    /**
     * 触发表头 tooltip 事件
     */
    triggerHeaderTooltipEvent(evnt, {
      column
    }) {
      let {
        tooltipStore
      } = this;

      if (tooltipStore.column !== column || !tooltipStore.visible) {
        this.showTooltip(evnt, column.origin.label, column);
      }
    },

    /**
     * 触发 tooltip 事件
     */
    triggerTooltipEvent(evnt, params) {
      let {
        editConfig,
        editStore,
        tooltipStore
      } = this;
      let {
        actived
      } = editStore;
      let {
        row,
        column
      } = params;

      if (editConfig) {
        if (editConfig.mode === 'row' && actived.row === row || actived.row === row && actived.column === column) {
          return;
        }
      }

      if (tooltipStore.column !== column || tooltipStore.row !== row || !tooltipStore.visible) {
        this.showTooltip(evnt, UtilTools.getCellLabel(row, column, params), column, row);
      }
    },

    // 显示 tooltip
    showTooltip(evnt, content, column, row) {
      let cell = evnt.currentTarget;
      let wrapperElem = cell.children[0];

      if (content && wrapperElem.scrollWidth > wrapperElem.clientWidth) {
        let {
          tooltipStore,
          tooltipOpts,
          $refs
        } = this;
        let {
          top,
          left
        } = DomTools.getOffsetPos(cell);
        let {
          scrollTop,
          scrollLeft,
          visibleWidth
        } = DomTools.getDomNode();
        let tipLeft = left;
        Object.assign(tooltipStore, {
          row,
          column,
          content,
          visible: true,
          placement: 'top',
          arrowStyle: {
            left: '50%'
          }
        });
        return this.$nextTick().then(() => {
          let tipWrapperElem = $refs.tipWrapper;

          if (tipWrapperElem) {
            tipLeft = left + Math.floor((cell.offsetWidth - tipWrapperElem.offsetWidth) / 2);
            tooltipStore.style = {
              zIndex: tooltipOpts.zIndex,
              width: `${tipWrapperElem.offsetWidth + 2}px`,
              top: `${top - tipWrapperElem.offsetHeight - 6}px`,
              left: `${tipLeft}px`
            };
            return this.$nextTick();
          }
        }).then(() => {
          let tipWrapperElem = $refs.tipWrapper;

          if (tipWrapperElem) {
            let offsetHeight = tipWrapperElem.offsetHeight;
            let offsetWidth = tipWrapperElem.offsetWidth;

            if (top - offsetHeight < scrollTop) {
              tooltipStore.placement = 'bottom';
              tooltipStore.style.top = `${top + cell.offsetHeight + 6}px`;
            }

            if (tipLeft < scrollLeft + 6) {
              // 超出左边界
              tipLeft = scrollLeft + 6;
              tooltipStore.arrowStyle.left = `${left > tipLeft + 16 ? left - tipLeft + 16 : 16}px`;
              tooltipStore.style.left = `${tipLeft}px`;
            } else if (left + offsetWidth > scrollLeft + visibleWidth) {
              // 超出右边界
              tipLeft = scrollLeft + visibleWidth - offsetWidth - 6;
              tooltipStore.arrowStyle.left = `${offsetWidth - Math.max(Math.floor((tipLeft + offsetWidth - left) / 2), 22)}px`;
              tooltipStore.style.left = `${tipLeft}px`;
            }
          }
        });
      }

      return this.$nextTick();
    },

    // 关闭 tooltip
    clostTooltip() {
      Object.assign(this.tooltipStore, {
        row: null,
        column: null,
        content: null,
        style: null,
        visible: false,
        placement: null
      });
      return this.$nextTick();
    },

    /**
     * 处理默认勾选
     */
    handleDefaultRowChecked() {
      let {
        selectConfig = {},
        tableFullData
      } = this;
      let {
        checkAll,
        checkRowKeys
      } = selectConfig;
      let rowKey = UtilTools.getRowKey(this);

      if (checkAll) {
        this.setAllSelection(true);
      } else if (checkRowKeys) {
        let property = rowKey;

        if (!property) {
          throw new Error('[vxe-table] Checked rows must have a unique primary key.');
        }

        this.setSelection(checkRowKeys.map(checkKey => tableFullData.find(item => checkKey === item[property])), true);
      }
    },

    setSelection(rows, value) {
      if (rows && !external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isArray(rows)) {
        rows = [rows];
      }

      rows.forEach(row => this.triggerCheckRowEvent({}, {
        row
      }, !!value));
      return this.$nextTick();
    },

    /**
     * 多选，行选中事件
     * value 选中true 不选false 不确定-1
     */
    triggerCheckRowEvent(evnt, {
      row
    }, value) {
      let {
        selection,
        tableFullData,
        selectConfig = {},
        treeConfig,
        treeIndeterminates
      } = this;
      let {
        checkProp: property,
        checkMethod
      } = selectConfig;

      if (!checkMethod || checkMethod({
        row,
        rowIndex: tableFullData.indexOf(row)
      })) {
        if (property) {
          if (treeConfig) {
            if (value === -1) {
              treeIndeterminates.push(row);
              external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.set(row, property, false);
            } else {
              // 更新子节点状态
              external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.eachTree([row], item => external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.set(item, property, value), treeConfig);
              external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.remove(treeIndeterminates, item => item === row);
            } // 如果存在父节点，更新父节点状态


            let matchObj = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.findTree(tableFullData, item => item === row, treeConfig);

            if (matchObj && matchObj.parent) {
              let selectItems = matchObj.items.filter(item => external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(item, property));
              return this.triggerCheckRowEvent(evnt, {
                row: matchObj.parent
              }, selectItems.length === matchObj.items.length ? true : selectItems.length || value === -1 ? -1 : false);
            }
          } else {
            external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.set(row, property, value);
          }
        } else {
          if (treeConfig) {
            if (value === -1) {
              treeIndeterminates.push(row);
              external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.remove(selection, item => item === row);
            } else {
              // 更新子节点状态
              external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.eachTree([row], item => {
                if (value) {
                  if (selection.indexOf(item) === -1) {
                    selection.push(item);
                  }
                } else {
                  external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.remove(selection, select => select === item);
                }
              }, treeConfig);
              external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.remove(treeIndeterminates, item => item === row);
            } // 如果存在父节点，更新父节点状态


            let matchObj = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.findTree(tableFullData, item => item === row, treeConfig);

            if (matchObj && matchObj.parent) {
              let selectItems = matchObj.items.filter(item => selection.indexOf(item) > -1);
              return this.triggerCheckRowEvent(evnt, {
                row: matchObj.parent
              }, selectItems.length === matchObj.items.length ? true : selectItems.length || value === -1 ? -1 : false);
            }
          } else {
            if (value) {
              if (selection.indexOf(row) === -1) {
                selection.push(row);
              }
            } else {
              external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.remove(selection, item => item === row);
            }
          }
        }

        this.checkSelectionStatus();
        UtilTools.emitEvent(this, 'select-change', [{
          row,
          selection: this.getSelectRecords(),
          checked: value
        }, evnt]);
      }
    },

    checkSelectionStatus() {
      let {
        tableFullData,
        editStore,
        selectConfig = {},
        selection,
        treeIndeterminates
      } = this;
      let {
        checkProp: property,
        checkMethod
      } = selectConfig;
      let {
        insertList
      } = editStore; // 包含新增的数据

      if (insertList.length) {
        tableFullData = tableFullData.concat(insertList);
      }

      if (property) {
        this.isAllSelected = tableFullData.length && tableFullData.every(checkMethod ? (row, rowIndex) => !checkMethod({
          row,
          rowIndex
        }) || external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, property) : row => external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, property));
        this.isIndeterminate = !this.isAllSelected && tableFullData.some(row => external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, property) || treeIndeterminates.indexOf(row) > -1);
      } else {
        this.isAllSelected = tableFullData.length && tableFullData.every(checkMethod ? (row, rowIndex) => !checkMethod({
          row,
          rowIndex
        }) || selection.indexOf(row) > -1 : row => selection.indexOf(row) > -1);
        this.isIndeterminate = !this.isAllSelected && tableFullData.some(row => treeIndeterminates.indexOf(row) > -1 || selection.indexOf(row) > -1);
      }
    },

    // 保留选中状态
    reserveCheckSelection() {
      let {
        selectConfig = {},
        selection,
        fullDataKeyMap
      } = this;
      let {
        reserve
      } = selectConfig;
      let rowKey = UtilTools.getRowKey(this);

      if (reserve && selection.length) {
        this.selection = selection.map(row => {
          let rowId = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, rowKey);
          return fullDataKeyMap.has(rowId) ? fullDataKeyMap.get(rowId).row : row;
        });
      }
    },

    /**
     * 多选，切换某一行的选中状态
     */
    toggleRowSelection(row) {
      let {
        selectConfig = {},
        selection
      } = this;
      let {
        checkProp: property
      } = selectConfig;
      this.triggerCheckRowEvent(null, {
        row
      }, property ? !external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, property) : selection.indexOf(row) === -1);
      return this.$nextTick();
    },

    setAllSelection(value) {
      let {
        tableFullData,
        editStore,
        selectConfig = {},
        treeConfig,
        selection
      } = this;
      let {
        checkProp: property,
        reserve,
        checkMethod
      } = selectConfig;
      let {
        insertList
      } = editStore;
      let selectRows = []; // 包含新增的数据

      if (insertList.length) {
        tableFullData = tableFullData.concat(insertList);
      }

      if (property) {
        let updateValue = (row, rowIndex) => {
          if (!checkMethod || checkMethod({
            row,
            rowIndex
          })) {
            external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.set(row, property, value);
          }
        };

        if (treeConfig) {
          external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.eachTree(tableFullData, updateValue, treeConfig);
        } else {
          tableFullData.forEach(updateValue);
        }
      } else {
        if (value) {
          if (treeConfig) {
            external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.eachTree(tableFullData, (row, rowIndex) => {
              if (!checkMethod || checkMethod({
                row,
                rowIndex
              })) {
                selectRows.push(row);
              }
            }, treeConfig);
          } else {
            if (checkMethod) {
              selectRows = tableFullData.filter((row, rowIndex) => checkMethod({
                row,
                rowIndex
              }));
            } else {
              selectRows = tableFullData.slice(0);
            }
          }
        }
      }

      this.selection = value && reserve ? selection.concat(selectRows.filter(row => selection.indexOf(row) === -1)) : selectRows;
      this.isAllSelected = value;
      this.isIndeterminate = false;
      this.treeIndeterminates = [];
    },

    /**
     * 多选，选中所有事件
     */
    triggerCheckAllEvent(evnt, value) {
      this.setAllSelection(value);
      UtilTools.emitEvent(this, 'select-all', [{
        selection: this.getSelectRecords(),
        checked: value
      }, evnt]);
    },

    /**
     * 多选，切换所有行的选中状态
     */
    toggleAllSelection() {
      this.triggerCheckAllEvent(null, !this.isAllSelected);
      return this.$nextTick();
    },

    clearSelection() {
      let {
        tableFullData,
        selectConfig = {},
        treeConfig
      } = this;
      let {
        checkProp: property
      } = selectConfig;

      if (property) {
        if (treeConfig) {
          external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.eachTree(tableFullData, item => external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.set(item, property, false), treeConfig);
        } else {
          tableFullData.forEach(item => external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.set(item, property, false));
        }
      }

      this.isAllSelected = false;
      this.isIndeterminate = false;
      this.selection = [];
      this.treeIndeterminates = [];
      return this.$nextTick();
    },

    /**
     * 单选，行选中事件
     */
    triggerRowEvent(evnt, {
      row
    }) {
      this.selectRow = row;
      UtilTools.emitEvent(this, 'select-change', [{
        row
      }, evnt]);
      return this.$nextTick();
    },

    /**
     * 单选，设置某一行为选中状态，如果调不加参数，则会取消目前高亮行的选中状态
     */
    setCurrentRow(row) {
      this.selectRow = row;
      return this.$nextTick();
    },

    clearCurrentRow() {
      this.selectRow = null;
      this.hoverRow = null;
      return this.$nextTick();
    },

    /**
     * 行 hover 事件
     */
    triggerHoverEvent(evnt, {
      row
    }) {
      this.hoverRow = row;
    },

    /**
     * 选中事件
     */
    triggerCellMousedownEvent(evnt, params) {
      let {
        $el,
        tableData,
        visibleColumn,
        editStore,
        editConfig,
        handleSelected,
        handleChecked
      } = this;
      let {
        checked,
        actived
      } = editStore;
      let {
        row,
        column,
        cell
      } = params;
      let {
        button
      } = evnt;
      let isLeftBtn = button === 0;
      let isRightBtn = button === 2;

      if (isLeftBtn || isRightBtn) {
        if (editConfig && editConfig.trigger === 'dblclick') {
          if (editConfig.mode === 'row' && actived.row === row || actived.row === row && actived.column === column) {// 如果已经是激活状态
          } else {
            if (isLeftBtn) {
              evnt.preventDefault();
              evnt.stopPropagation();
              this.handleSelected(params, evnt);
              let domMousemove = document.onmousemove;
              let domMouseup = document.onmouseup;
              let start = DomTools.getCellIndexs(cell);
              let updateEvent = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.throttle(function (evnt) {
                evnt.preventDefault();
                let {
                  flag,
                  targetElem
                } = DomTools.getEventTargetNode(evnt, $el, 'vxe-body--column');

                if (flag) {
                  handleChecked(start, DomTools.getCellIndexs(targetElem), evnt);
                }
              }, DomTools.browse.msie ? 80 : 40, {
                leading: true,
                trailing: true
              });
              document.onmousemove = updateEvent;

              document.onmouseup = function (evnt) {
                document.onmousemove = domMousemove;
                document.onmouseup = domMouseup;
              };

              this.closeFilter();
              this.closeContextMenu();
            } else {
              // 如果不在所有选中的范围之内则重新选中
              let select = DomTools.getCellIndexs(cell);

              if (checked.rows.indexOf(tableData[select.rowIndex]) === -1 || checked.columns.indexOf(visibleColumn[select.columnIndex]) === -1) {
                handleSelected(params, evnt);
              }
            }
          }
        }
      }
    },

    /**
     * 边角事件
     */
    triggerCornerMousedownEvent(params, evnt) {
      evnt.preventDefault();
      evnt.stopPropagation();
      let {
        $el,
        tableData,
        visibleColumn,
        editStore,
        editConfig,
        handleTempChecked
      } = this;
      let {
        checked
      } = editStore;
      let {
        button
      } = evnt;
      let isLeftBtn = button === 0;
      let isRightBtn = button === 2;

      if (isLeftBtn || isRightBtn) {
        if (editConfig && checked.rows.length && editConfig.trigger === 'dblclick') {
          let domMousemove = document.onmousemove;
          let domMouseup = document.onmouseup;
          let start = {
            rowIndex: tableData.indexOf(checked.rows[0]),
            columnIndex: visibleColumn.indexOf(checked.columns[0])
          };
          let updateEvent = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.throttle(function (evnt) {
            evnt.preventDefault();
            let {
              flag,
              targetElem
            } = DomTools.getEventTargetNode(evnt, $el, 'vxe-body--column');

            if (flag) {
              handleTempChecked(start, DomTools.getCellIndexs(targetElem), evnt);
            }
          }, DomTools.browse.msie ? 80 : 40, {
            leading: true,
            trailing: true
          });
          document.onmousemove = updateEvent;

          document.onmouseup = function (evnt) {
            document.onmousemove = domMousemove;
            document.onmouseup = domMouseup;
            checked.rows = checked.tRows;
            checked.columns = checked.tColumns;
          };
        }
      }
    },

    /**
     * 列点击事件
     * 如果是单击模式，则激活为编辑状态
     * 如果是双击模式，则单击后选中状态
     */
    triggerCellClickEvent(evnt, params) {
      let {
        $el,
        highlightCurrentRow,
        editStore,
        treeConfig,
        editConfig
      } = this;
      let {
        actived
      } = editStore;
      let {
        column,
        columnIndex
      } = params;

      if (highlightCurrentRow) {
        if (!DomTools.getEventTargetNode(evnt, $el, 'vxe-tree-wrapper').flag) {
          this.selectRow = params.row;
        }
      } // 如果是树形表格


      if (treeConfig && (treeConfig.trigger === 'row' || column.treeNode && treeConfig.trigger === 'cell')) {
        this.triggerTreeExpandEvent(evnt, params);
      }

      if (editConfig) {
        if (editConfig.trigger === 'click') {
          if (!actived.args || evnt.currentTarget !== actived.args.cell) {
            // if (editRules) {
            //   this.handleActived(params, evnt)
            // } else {
            // this.triggerValidate('change').then(() => {
            //   this.handleActived(params, evnt)
            // }).catch(e => e)
            // }
            if (editConfig.mode === 'row') {
              // if (validStore.visible && validStore.row === params.row && validStore.column === params.column) {
              //   this.handleActived(params, evnt)
              // } else {
              this.triggerValidate('blur').then(() => {}).catch(e => e).then(() => {
                this.handleActived(params, evnt).then(() => this.triggerValidate('change')).catch(e => e);
              }); // }
            } else if (editConfig.mode === 'cell') {
              this.handleActived(params, evnt).then(() => this.triggerValidate('change')).catch(e => e);
            }
          }
        } else {
          if (actived.row) {
            actived.args.column = column;
            actived.args.columnIndex = columnIndex;
          }
        }
      }

      UtilTools.emitEvent(this, 'cell-click', [params, evnt]);
    },

    /**
     * 列双击点击事件
     * 如果是双击模式，则激活为编辑状态
     */
    triggerCellDBLClickEvent(evnt, params) {
      let {
        editStore,
        editConfig
      } = this;
      let {
        actived
      } = editStore;

      if (editConfig) {
        if (editConfig.trigger === 'dblclick') {
          if (!actived.args || evnt.currentTarget !== actived.args.cell) {
            // this.triggerValidate().then(() => {
            this.handleActived(params, evnt); // }).catch(e => e)
          }
        }
      }

      UtilTools.emitEvent(this, 'cell-dblclick', [params, evnt]);
    },

    /**
     * 处理激活编辑
     */
    handleActived(params, evnt) {
      let {
        editStore,
        editConfig
      } = this;
      let {
        activeMethod
      } = editConfig;
      let {
        actived
      } = editStore;
      let {
        row,
        column,
        cell
      } = params;
      let {
        editRender
      } = column;

      if (editRender) {
        if (editConfig.mode === 'row' ? actived.row !== row : actived.row !== row || actived.column !== column) {
          // 判断是否禁用编辑
          if (!activeMethod || activeMethod(params)) {
            this.clostTooltip();
            this.clearValidate();
            this.clearCopyed(evnt);
            this.clearChecked(evnt);
            this.clearSelected(evnt);
            this.clearActived(evnt);
            column.renderHeight = cell.offsetHeight;
            actived.args = params;
            actived.row = row;
            actived.column = column;
            this.$nextTick(() => {
              this.handleFocus(params, evnt);
            });
            UtilTools.emitEvent(this, 'edit-actived', [params, evnt]);
          } else {
            UtilTools.emitEvent(this, 'edit-disabled', [params, evnt]);
          }
        } else {
          column.renderHeight = cell.offsetHeight;
          actived.args = params;
          setTimeout(() => {
            this.handleFocus(params, evnt);
          });
        }
      }

      return this.$nextTick();
    },

    /**
     * 清除激活的编辑
     */
    clearActived(evnt) {
      let {
        editStore
      } = this;
      let {
        actived
      } = editStore;

      if (actived.row || actived.column) {
        UtilTools.emitEvent(this, 'edit-closed', [actived.args, evnt]);
      }

      actived.args = null;
      actived.row = null;
      actived.column = null;
      return this.$nextTick();
    },

    hasActiveRow(row) {
      let {
        editStore
      } = this;
      let {
        actived
      } = editStore;
      return actived.row === row;
    },

    /**
     * 清除所选中源状态
     */
    clearSelected(evnt) {
      let {
        editStore
      } = this;
      let {
        selected
      } = editStore;
      selected.row = null;
      selected.column = null;
      return this.$nextTick();
    },

    /**
     * 处理选中源
     */
    handleSelected(params, evnt) {
      let {
        mouseConfig = {},
        editStore
      } = this;
      let {
        selected
      } = editStore;
      let {
        row,
        column
      } = params;

      let selectMethod = () => {
        if (selected.row !== row || selected.column !== column) {
          this.clearChecked(evnt);
          this.clearActived(evnt);
          selected.args = params;
          selected.row = row;
          selected.column = column;
        } // 如果配置了批量选中功能，则为批量选中状态


        if (mouseConfig.checked) {
          let select = DomTools.getCellIndexs(params.cell);
          this.handleChecked(select, select, evnt);
        }

        return this.$nextTick();
      }; // return editRules ? this.triggerValidate('blur').then(selectMethod).catch(e => e) : selectMethod()


      return selectMethod();
    },

    /**
     * 清除所有选中状态
     */
    clearChecked(evnt) {
      let {
        editStore
      } = this;
      let {
        checked
      } = editStore;
      checked.rows = [];
      checked.columns = [];
      checked.tRows = [];
      checked.tColumns = [];
      return this.$nextTick();
    },

    /**
     * 处理所有选中
     */
    handleChecked(start, end, evnt) {
      let {
        tableData,
        visibleColumn,
        editStore
      } = this;
      let {
        checked
      } = editStore;
      let {
        rowIndex: sRowIndex,
        columnIndex: sColumnIndex
      } = start;
      let {
        rowIndex: eRowIndex,
        columnIndex: eColumnIndex
      } = end;
      checked.tRows = [];
      checked.tColumns = [];

      if (sRowIndex < eRowIndex) {
        // 向下
        checked.rows = tableData.slice(sRowIndex, eRowIndex + 1);
      } else {
        // 向上
        checked.rows = tableData.slice(eRowIndex, sRowIndex + 1);
      }

      if (sColumnIndex < eColumnIndex) {
        // 向右
        checked.columns = visibleColumn.slice(Math.max(sColumnIndex, 1), eColumnIndex + 1);
      } else {
        // 向左
        checked.columns = visibleColumn.slice(Math.max(eColumnIndex, 1), sColumnIndex + 1);
      }
    },

    /**
     * 处理所有选中的临时选中
     */
    handleTempChecked(start, end, evnt) {
      let {
        tableData,
        visibleColumn,
        editStore
      } = this;
      let {
        checked
      } = editStore;
      let {
        rows,
        tRows,
        columns,
        tColumns
      } = checked;
      let {
        rowIndex: sRowIndex,
        columnIndex: sColumnIndex
      } = start;
      let {
        rowIndex: eRowIndex,
        columnIndex: eColumnIndex
      } = end;

      if (tRows.length > rows.length) {
        eColumnIndex = visibleColumn.indexOf(columns[columns.length - 1]);
      } else if (tColumns.length > columns.length) {
        eRowIndex = tableData.indexOf(rows[rows.length - 1]);
      }

      if (sRowIndex < eRowIndex) {
        // 向下
        checked.tRows = tableData.slice(sRowIndex, eRowIndex + 1);
      } else {
        // 向上
        sRowIndex += rows.length;
        checked.tRows = tableData.slice(eRowIndex, sRowIndex);
      }

      if (sColumnIndex < eColumnIndex) {
        // 向右
        checked.tColumns = visibleColumn.slice(Math.max(sColumnIndex, 1), eColumnIndex + 1);
      } else {
        // 向左
        sColumnIndex += columns.length;
        checked.tColumns = visibleColumn.slice(Math.max(eColumnIndex, 1), sColumnIndex);
      }
    },

    /**
     * 清空已复制的内容
     */
    clearCopyed() {
      let {
        editStore
      } = this;
      let {
        copyed
      } = editStore;
      copyed.cut = false;
      copyed.rows = [];
      copyed.columns = [];
      return this.$nextTick();
    },

    /**
     * 处理复制
     */
    handleCopyed(cut, evnt) {
      let {
        editStore
      } = this;
      let {
        copyed,
        checked
      } = editStore;
      copyed.cut = cut;
      copyed.rows = checked.rows;
      copyed.columns = checked.columns;
    },

    /**
     * 处理粘贴
     */
    handlePaste(evnt) {
      let {
        tableData,
        visibleColumn,
        editStore
      } = this;
      let {
        copyed,
        selected
      } = editStore;
      let {
        cut,
        rows,
        columns
      } = copyed;

      if (rows.length && columns.length && selected.row && selected.column) {
        let {
          rowIndex,
          columnIndex
        } = selected.args;
        let start = {
          rowIndex,
          columnIndex
        };
        let end = {
          rowIndex: rowIndex + rows.length - 1,
          columnIndex: columnIndex + columns.length - 1
        };
        rows.forEach((row, rIndex) => {
          let offsetRow = tableData[rowIndex + rIndex];

          if (offsetRow) {
            columns.forEach((column, cIndex) => {
              let offsetColumn = visibleColumn[columnIndex + cIndex];

              if (offsetColumn) {
                UtilTools.setCellValue(offsetRow, offsetColumn, UtilTools.getCellValue(row, column));
              }

              if (cut) {
                UtilTools.setCellValue(row, column, null);
              }
            });
          }
        });

        if (cut) {
          this.clearCopyed();
        }

        this.handleChecked(start, end, evnt);
      }
    },

    /**
     * 处理聚焦
     */
    handleFocus(params, evnt) {
      let {
        column,
        cell
      } = params;
      let {
        editRender
      } = column;

      if (editRender) {
        let compRender = Renderer.get(editRender.name);
        let inputElem; // 如果指定了聚焦 class

        if (editRender.autofocus) {
          inputElem = cell.querySelector(editRender.autofocus);
        } // 渲染器的聚焦处理


        if (!inputElem && compRender && compRender.autofocus) {
          inputElem = cell.querySelector(compRender.autofocus);
        }

        if (inputElem) {
          inputElem.focus();
        }
      }
    },

    /**
     * 激活行编辑
     */
    setActiveRow(row) {
      return this.setActiveCell(row, this.visibleColumn.find(column => column.editRender).property);
    },

    /**
     * 激活单元格编辑
     */
    setActiveCell(row, prop) {
      let {
        tableData,
        visibleColumn,
        handleActived
      } = this;

      if (row && prop) {
        let rowIndex = tableData.indexOf(row);

        if (rowIndex > -1) {
          let column = visibleColumn.find(column => column.property === prop);
          let cell = DomTools.getCell(this, {
            row,
            rowIndex,
            column
          });
          handleActived({
            row,
            column,
            cell
          });
          this.lastCallTime = Date.now();
        }
      }

      return this.$nextTick();
    },

    /**
     * 只对 trigger=dblclick 有效，选中单元格
     */
    setSelectCell(row, prop) {
      let {
        tableData,
        editConfig,
        visibleColumn
      } = this;

      if (row && prop && editConfig.trigger !== 'manual') {
        let column = visibleColumn.find(column => column.property === prop);
        let rowIndex = tableData.indexOf(row);

        if (rowIndex > -1 && column) {
          let cell = DomTools.getCell(this, {
            row,
            rowIndex,
            column
          });
          let params = {
            row,
            rowIndex,
            column,
            columnIndex: visibleColumn.indexOf(column),
            cell
          };
          this.handleSelected(params, {});
        }
      }

      return this.$nextTick();
    },

    /**
     * 点击排序事件
     */
    triggerSortEvent(evnt, column, params, order) {
      this.sort(column.property, order);
    },

    sort(prop, order) {
      let {
        visibleColumn,
        tableFullColumn
      } = this;
      let column = visibleColumn.find(item => item.property === prop);

      if (order && column.order !== order) {
        tableFullColumn.forEach(column => {
          column.order = null;
        });
        column.order = order; // 如果是服务端排序，则跳过本地排序处理

        if (!column.remoteSort) {
          this.tableData = this.getTableData(true).tableData;
        }

        UtilTools.emitEvent(this, 'sort-change', [{
          column,
          prop,
          order
        }]);
      }

      return this.$nextTick();
    },

    /**
     * 点击筛选事件
     */
    triggerFilterEvent(evnt, column, params) {
      let {
        $refs,
        filterStore,
        overflowX
      } = this;

      if (filterStore.column === column && filterStore.visible) {
        filterStore.visible = false;
      } else {
        let targetElem = evnt.target;
        let bodyElem = $refs.tableBody.$el;
        let filterWrapperElem = $refs.filterWrapper;
        let {
          top,
          left
        } = DomTools.getOffsetPos(targetElem);

        if (overflowX) {
          left -= bodyElem.scrollLeft;
        }

        Object.assign(filterStore, {
          multiple: column.filterMultiple,
          options: column.filters,
          column: column,
          style: {
            top: `${top + targetElem.clientHeight + 6}px`,
            left: `${left}px`
          },
          visible: true
        });
        filterStore.isAllSelected = filterStore.options.every(item => item.checked);
        filterStore.isIndeterminate = !this.isAllSelected && filterStore.options.some(item => item.checked);
        this.$nextTick(() => {
          filterStore.style = {
            top: `${top + targetElem.clientHeight + 6}px`,
            left: `${left - filterWrapperElem.$el.clientWidth / 2 + 10}px`
          };
        });
      }
    },

    // 确认筛选
    confirmFilterEvent(evnt) {
      let {
        filterStore,
        scrollXLoad,
        scrollYLoad
      } = this;
      let {
        column
      } = filterStore;
      let valueList = [];
      column.filters.forEach(item => {
        if (item.checked) {
          valueList.push(item.value);
        }
      });
      filterStore.visible = false;

      if (scrollXLoad || scrollYLoad) {
        this.clearScroll();
      } else {
        // 如果是服务端筛选，则跳过本地筛选处理
        if (!column.remoteFilter) {
          this.tableData = this.getTableData(true).tableData;
        }

        UtilTools.emitEvent(this, 'filter-change', [{
          column,
          prop: column.property,
          values: valueList
        }]);
      }

      this.closeFilter();
      this.$nextTick(this.recalculate);
    },

    // 关闭筛选
    closeFilter(evnt) {
      Object.assign(this.filterStore, {
        isAllSelected: false,
        isIndeterminate: false,
        options: [],
        visible: false
      });
      return this.$nextTick();
    },

    // 重置筛选
    resetFilterEvent(evnt) {
      this.filterStore.options.forEach(item => {
        item.checked = false;
      });
      this.confirmFilterEvent(evnt);
    },

    /**
     * 展开行事件
     */
    triggerRowExpandEvent(evnt, {
      row
    }) {
      let rest = this.toggleRowExpansion(row);
      UtilTools.emitEvent(this, 'toggle-expand-change', [{
        row,
        rowIndex: this.getRowMapIndex(row),
        $table: this
      }, evnt]);
      return rest;
    },

    /**
     * 切换展开行
     */
    toggleRowExpansion(row) {
      return this.setRowExpansion(row);
    },

    /**
     * 处理默认展开行
     */
    handleDefaultRowExpand() {
      let {
        expandConfig = {},
        tableFullData
      } = this;
      let {
        expandAll,
        expandRowKeys
      } = expandConfig;
      let rowKey = UtilTools.getRowKey(this);

      if (expandAll) {
        this.expandeds = tableFullData.slice(0);
      } else if (expandRowKeys) {
        let property = rowKey;

        if (!property) {
          throw new Error('[vxe-table] Expand rows must have a unique primary key.');
        }

        this.expandeds = expandRowKeys.map(expandKey => tableFullData.find(item => expandKey === item[property]));
      }
    },

    setAllRowExpansion(expanded) {
      this.expandeds = expanded ? this.tableFullData.slice(0) : [];
      return this.$nextTick();
    },

    /**
     * 设置展开行，二个参数设置这一行展开与否
     * 支持单行
     * 支持多行
     */
    setRowExpansion(rows, expanded) {
      let {
        expandeds,
        expandConfig = {}
      } = this;
      let isToggle = arguments.length === 1;

      if (rows) {
        if (!external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isArray(rows)) {
          rows = [rows];
        }

        if (expandConfig.accordion) {
          // 只能同时展开一个
          expandeds.length = 0;
          rows = rows.slice(rows.length - 1, rows.length);
        }

        rows.forEach(row => {
          let index = expandeds.indexOf(row);

          if (index > -1) {
            if (isToggle || !expanded) {
              expandeds.splice(index, 1);
            }
          } else {
            if (isToggle || expanded) {
              expandeds.push(row);
            }
          }
        });
      }

      return this.$nextTick();
    },

    clearRowExpand() {
      this.expandeds = [];
      return this.$nextTick();
    },

    /**
     * 展开树节点事件
     */
    triggerTreeExpandEvent(evnt, {
      row
    }) {
      let rest = this.toggleTreeExpansion(row);
      UtilTools.emitEvent(this, 'toggle-tree-change', [{
        row,
        rowIndex: this.getRowMapIndex(row),
        $table: this
      }, evnt]);
      return rest;
    },

    /**
     * 切换/展开树节点
     */
    toggleTreeExpansion(row) {
      return this.setTreeExpansion(row);
    },

    /**
     * 处理默认展开树节点
     */
    handleDefaultTreeExpand() {
      let {
        rowKey,
        treeConfig,
        tableFullData
      } = this;

      if (treeConfig) {
        let {
          key,
          expandAll,
          expandRowKeys
        } = treeConfig;
        let {
          children
        } = treeConfig;
        let property = rowKey || key;
        let treeExpandeds = [];

        if (expandAll) {
          external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.filterTree(tableFullData, row => {
            let rowChildren = row[children];

            if (rowChildren && rowChildren.length) {
              treeExpandeds.push(row);
            }
          }, treeConfig);
          this.treeExpandeds = treeExpandeds;
        } else if (expandRowKeys) {
          expandRowKeys.forEach(rowKey => {
            let matchObj = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.findTree(tableFullData, item => rowKey === item[property], treeConfig);
            let rowChildren = matchObj ? matchObj.item[children] : 0;

            if (rowChildren && rowChildren.length) {
              treeExpandeds.push(matchObj.item);
            }
          });
          this.treeExpandeds = treeExpandeds;
        }
      }
    },

    setAllTreeExpansion(expanded) {
      let {
        tableFullData,
        treeConfig
      } = this;
      let {
        children
      } = treeConfig;
      let treeExpandeds = [];

      if (expanded) {
        external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.eachTree(tableFullData, row => {
          let rowChildren = row[children];

          if (rowChildren && rowChildren.length) {
            treeExpandeds.push(row);
          }
        }, treeConfig);
      }

      this.treeExpandeds = treeExpandeds;
      return this.$nextTick();
    },

    /**
     * 设置展开树形节点，二个参数设置这一行展开与否
     * 支持单行
     * 支持多行
     */
    setTreeExpansion(rows, expanded) {
      let {
        tableFullData,
        treeExpandeds,
        treeConfig
      } = this;
      let {
        children
      } = treeConfig;
      let isToggle = arguments.length === 1;

      if (rows) {
        if (!external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isArray(rows)) {
          rows = [rows];
        }

        if (treeConfig.accordion) {
          rows = rows.slice(rows.length - 1, rows.length);
        }

        rows.forEach(row => {
          let rowChildren = row[children];

          if (rowChildren && rowChildren.length) {
            let index = treeExpandeds.indexOf(row);

            if (treeConfig.accordion) {
              // 同一级只能展开一个
              let matchObj = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.findTree(tableFullData, item => item === row, treeConfig);
              external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.remove(treeExpandeds, item => matchObj.items.indexOf(item) > -1);
            }

            if (index > -1) {
              if (isToggle || !expanded) {
                treeExpandeds.splice(index, 1);
              }
            } else {
              if (isToggle || expanded) {
                treeExpandeds.push(row);
              }
            }
          }
        });
      }

      return this.$nextTick();
    },

    clearTreeExpand() {
      this.treeExpandeds = [];
      return this.$nextTick();
    },

    /**
     * 是否启用了横向 X 可视渲染
     */
    isScrollXLoad() {
      return this.scrollXLoad;
    },

    /**
     * 是否启用了纵向 Y 可视渲染
     */
    isScrollYLoad() {
      return this.scrollYLoad;
    },

    /**
     * 横向 Y 可视渲染事件处理
     */
    triggerScrollXEvent(evnt) {
      let {
        $refs,
        visibleColumn,
        scrollXStore
      } = this;
      let {
        startIndex,
        renderSize,
        offsetSize,
        visibleSize
      } = scrollXStore;
      let scrollBodyElem = $refs.tableBody.$el;
      let scrollLeft = scrollBodyElem.scrollLeft;
      let toVisibleIndex = 0;
      let width = 0;

      for (let index = 0; index < visibleColumn.length; index++) {
        width += visibleColumn[index].renderWidth;

        if (scrollLeft < width) {
          toVisibleIndex = index;
          break;
        }
      }

      if (scrollXStore.visibleIndex !== toVisibleIndex) {
        let isReload;
        let preloadSize = 0;
        let isLeft = scrollXStore.visibleIndex > toVisibleIndex; // 如果渲染数量不充足

        let isTooLow = renderSize < visibleSize * 3; // 除去可视条数剩余数量

        let residueSize = renderSize - visibleSize;

        if (isLeft) {
          preloadSize = residueSize - (isTooLow ? Math.floor(residueSize / 2) : Math.floor(renderSize > visibleSize * 6 ? visibleSize * 3 : visibleSize * 1.5));
          isReload = toVisibleIndex - offsetSize <= startIndex;
        } else {
          preloadSize = isTooLow ? Math.floor(residueSize / 2) : Math.floor(renderSize > visibleSize * 6 ? visibleSize * 3 : visibleSize * 1.5);
          isReload = toVisibleIndex + visibleSize + offsetSize >= startIndex + renderSize;
        }

        if (isReload) {
          scrollXStore.visibleIndex = toVisibleIndex;
          scrollXStore.startIndex = Math.min(Math.max(toVisibleIndex - preloadSize, 0), visibleColumn.length - renderSize);
          this.updateScrollXSpace();
          this.$nextTick(() => {
            scrollBodyElem.scrollLeft = scrollLeft;
          });
        }
      }

      this.clostTooltip();
    },

    /**
     * 纵向 Y 可视渲染事件处理
     */
    triggerScrollYEvent: external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.debounce(function (evnt) {
      let {
        tableFullData,
        scrollYStore
      } = this;
      let {
        startIndex,
        renderSize,
        offsetSize,
        visibleSize,
        rowHeight
      } = scrollYStore;
      let scrollBodyElem = evnt.target;
      let scrollTop = scrollBodyElem.scrollTop;
      let toVisibleIndex = Math.ceil(scrollTop / rowHeight);

      if (scrollYStore.visibleIndex !== toVisibleIndex) {
        let isReload;
        let preloadSize = 0;
        let isTop = scrollYStore.visibleIndex > toVisibleIndex; // 如果渲染数量不充足

        let isTooLow = renderSize < visibleSize * 3; // 除去可视条数剩余数量

        let residueSize = renderSize - visibleSize;

        if (isTop) {
          preloadSize = residueSize - (isTooLow ? Math.floor(residueSize / 2) : Math.floor(renderSize > visibleSize * 6 ? visibleSize * 3 : visibleSize * 1.5));
          isReload = toVisibleIndex - offsetSize <= startIndex;
        } else {
          preloadSize = isTooLow ? Math.floor(residueSize / 2) : Math.floor(renderSize > visibleSize * 6 ? visibleSize * 3 : visibleSize * 1.5);
          isReload = toVisibleIndex + visibleSize + offsetSize >= startIndex + renderSize;
        }

        if (isReload) {
          scrollYStore.visibleIndex = toVisibleIndex;
          scrollYStore.startIndex = Math.min(Math.max(toVisibleIndex - preloadSize, 0), tableFullData.length - renderSize);
          this.updateScrollYSpace();
          this.$nextTick(() => {
            scrollBodyElem.scrollTop = scrollTop;
          });
        }
      }
    }, DomTools.browse.msie ? 40 : 20, {
      leading: false,
      trailing: true
    }),

    // 计算可视渲染相关数据
    computeScrollLoad() {
      let {
        scrollXLoad,
        scrollYLoad,
        scrollYStore,
        scrollXStore,
        visibleColumn,
        optimizeOpts
      } = this;
      let {
        scrollX,
        scrollY
      } = optimizeOpts;
      let tableBody = this.$refs.tableBody;
      let tableBodyElem = tableBody ? tableBody.$el : null;
      let tableHeader = this.$refs.tableHeader;

      if (tableBodyElem) {
        // 计算 X 逻辑
        if (scrollXLoad) {
          // 无法预知，默认取前 10 条平均宽度进行运算
          scrollXStore.visibleSize = scrollX.vSize || Math.ceil(tableBodyElem.clientWidth / (visibleColumn.slice(0, 10).reduce((previous, column) => previous + column.renderWidth, 0) / 10));
          this.updateScrollXSpace();
        } // 计算 Y 逻辑


        if (scrollYLoad) {
          if (scrollY.rHeight) {
            scrollYStore.rowHeight = scrollY.rHeight;
          } else {
            let firstTrElem = tableBodyElem.querySelector('tbody>tr');

            if (!firstTrElem && tableHeader) {
              firstTrElem = tableHeader.$el.querySelector('thead>tr');
            }

            if (firstTrElem) {
              scrollYStore.rowHeight = firstTrElem.clientHeight;
            }
          }

          scrollYStore.visibleSize = scrollY.vSize || Math.ceil(tableBodyElem.clientHeight / scrollYStore.rowHeight);
          this.updateScrollYSpace();
        }
      }
    },

    // 更新横向 X 可视渲染上下剩余空间大小
    updateScrollXSpace() {
      let {
        visibleColumn,
        scrollXStore
      } = this;
      this.tableColumn = visibleColumn.slice(scrollXStore.startIndex, scrollXStore.startIndex + scrollXStore.renderSize);
      scrollXStore.leftSpaceWidth = visibleColumn.slice(0, scrollXStore.startIndex).reduce((previous, column) => previous + column.renderWidth, 0);
      scrollXStore.rightSpaceWidth = visibleColumn.slice(scrollXStore.startIndex + scrollXStore.renderSize, visibleColumn.length).reduce((previous, column) => previous + column.renderWidth, 0);
    },

    // 更新纵向 Y 可视渲染上下剩余空间大小
    updateScrollYSpace() {
      let {
        scrollYStore
      } = this;
      let {
        fullData,
        tableData
      } = this.getTableData();
      this.tableData = tableData;
      scrollYStore.topSpaceHeight = Math.max(scrollYStore.startIndex * scrollYStore.rowHeight, 0);
      scrollYStore.bottomSpaceHeight = Math.max((fullData.length - (scrollYStore.startIndex + scrollYStore.renderSize)) * scrollYStore.rowHeight, 0);
    },

    clearScroll() {
      Object.assign(this.scrollXStore, {
        visibleSize: 0,
        startIndex: 0,
        leftSpaceWidth: 0,
        rightSpaceWidth: 0
      });
      Object.assign(this.scrollYStore, {
        visibleSize: 0,
        startIndex: 0,
        topSpaceHeight: 0,
        bottomSpaceHeight: 0
      });
      this.$nextTick(() => {
        let tableBody = this.$refs.tableBody;
        let tableBodyElem = tableBody ? tableBody.$el : null;
        let tableFooter = this.$refs.tableFooter;
        let tableFooterElem = tableFooter ? tableFooter.$el : null;

        if (tableBodyElem) {
          tableBodyElem.scrollTop = 0;
          tableBodyElem.scrollLeft = 0;
        }

        if (tableFooterElem) {
          tableFooterElem.scrollLeft = 0;
        }
      });
      return this.$nextTick();
    },

    /**
     * 更新列状态
     * 如果组件值 v-model 发生 change 时，调用改函数用于更新某一列编辑状态
     * 如果单元格配置了校验规则，则会进行校验
     */
    updateStatus(scope) {
      return this.$nextTick().then(() => {
        let {
          $refs,
          tableData,
          editRules
        } = this;

        if (scope && $refs.tableBody && !external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isEmpty(editRules)) {
          let {
            row,
            column
          } = scope;
          let type = 'change';

          if (this.hasCellRules(type, row, column)) {
            let rowIndex = tableData.indexOf(row);
            let cell = DomTools.getCell(this, {
              row,
              rowIndex,
              column
            });

            if (cell) {
              return this.validCellRules(type, row, column).then(() => this.clearValidate()).catch(rule => this.openValidTooltip({
                rule,
                row,
                column,
                cell
              }));
            }
          }
        }
      });
    },

    triggerValidate(type) {
      let {
        editConfig,
        editStore,
        editRules,
        validStore
      } = this;
      let {
        actived
      } = editStore; // let type = validStore.visible ? 'all' : 'blur'
      // this.clearValidate()

      if (actived.row && editRules) {
        let {
          row,
          column,
          cell
        } = actived.args; // if (editConfig.mode === 'row') {
        //   return this.validRowRules(type, row)
        //     .catch(params => {
        //       this.handleValidError(params)
        //       return Promise.reject(params)
        //     })
        // } else {

        if (this.hasCellRules(type, row, column)) {
          return this.validCellRules(type, row, column).then(() => {
            if (editConfig.mode === 'row') {
              if (validStore.visible && validStore.row === row && validStore.column === column) {
                this.clearValidate();
              }
            }
          }).catch(rule => {
            // 如果校验不通过与触发方式一致，则聚焦提示错误，否则跳过并不作任何处理
            if (!rule.trigger || type === rule.trigger) {
              let rest = {
                rule,
                row,
                column,
                cell
              };
              this.openValidTooltip(rest);
              return Promise.reject(rest);
            }

            return Promise.resolve();
          });
        } // }

      }

      return Promise.resolve();
    },

    /**
     * 对表格数据进行校验
     * 如果传 row 指定行记录，则只验证传入的行
     * 如果传 rows 为多行记录，则只验证传入的行
     * 如果只传 callback 否则默认验证整个表格数据
     * 返回 Promise 对象，或者使用回调方式
     */
    validate(rows, cb) {
      let {
        editRules,
        tableData
      } = this;
      let vaildDatas = tableData;

      if (rows && arguments.length) {
        if (external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isFunction(rows)) {
          cb = rows;
        } else {
          vaildDatas = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isArray(rows) ? rows : [rows];
        }
      }

      let validPromise = Promise.resolve(true);
      this.lastCallTime = Date.now();
      this.clearValidate();

      if (!external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isEmpty(editRules)) {
        let columns = this.getColumns();
        vaildDatas.forEach(row => {
          let rowIndex = tableData.indexOf(row);
          columns.forEach((column, columnIndex) => {
            if (external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.has(editRules, column.property)) {
              validPromise = validPromise.then(() => new Promise((resolve, reject) => {
                this.validCellRules('all', row, column).then(resolve).catch(rule => {
                  let rest = {
                    rule,
                    rowIndex,
                    row,
                    columnIndex,
                    column,
                    cell: DomTools.getCell(this, {
                      row,
                      rowIndex,
                      column
                    })
                  };
                  return reject(rest);
                });
              }));
            }
          });
        });
        return validPromise.then(() => {
          let valid = true;

          if (cb) {
            cb(valid);
          }

          return true;
        }).catch(params => {
          let valid = false;
          let {
            rule,
            column
          } = params;
          this.handleValidError(params);

          if (cb) {
            cb(valid, {
              [column.property]: [new Error(rule.message)]
            });
          }

          return cb ? Promise.resolve(valid) : Promise.reject(valid);
        });
      } else {
        let valid = true;

        if (cb) {
          cb(valid);
        }
      }

      return validPromise;
    },

    // validRowRules (type, row) {
    //   let { tableData, editRules } = this
    //   let rowIndex = tableData.indexOf(row)
    //   let validPromise = Promise.resolve()
    //   if (!XEUtils.isEmpty(editRules)) {
    //     this.getColumns().forEach(column => {
    //       if (XEUtils.has(editRules, column.property)) {
    //         validPromise = validPromise.then(() => new Promise((resolve, reject) => {
    //           this.validCellRules('all', row, column)
    //             .then(resolve)
    //             .catch(rule => {
    //               let rest = { rule, row, column, cell: DomTools.getCell(this, { row, rowIndex, column }) }
    //               return reject(rest)
    //             })
    //         }))
    //       }
    //     })
    //   }
    //   return validPromise
    // },
    hasCellRules(type, row, column) {
      let {
        editRules
      } = this;
      let {
        property
      } = column;

      if (property && !external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isEmpty(editRules)) {
        let rules = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(editRules, property);
        return rules && rules.find(rule => type === 'all' || !rule.trigger || type === rule.trigger);
      }

      return false;
    },

    /**
     * 校验数据
     * 按表格行、列顺序依次校验（同步或异步）
     * 校验规则根据索引顺序依次校验，如果是异步则会等待校验完成才会继续校验下一列
     * 如果校验失败则，触发回调或者Promise，结果返回一个 Boolean 值
     * 如果是传回调方式这返回一个 Boolean 值和校验不通过列的错误消息
     *
     * rule 配置：
     *  required=Boolean 是否必填
     *  min=Number 最小长度
     *  max=Number 最大长度
     *  validator=Function(rule, value, callback, {rules, row, column, rowIndex, columnIndex}) 自定义校验
     *  trigger=blur|change 触发方式（除非特殊场景，否则默认为空就行）
     */
    validCellRules(type, row, column) {
      let {
        editRules
      } = this;
      let {
        property
      } = column;
      let validPromise = Promise.resolve();

      if (property && !external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isEmpty(editRules)) {
        let rules = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(editRules, property);
        let value = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(row, property);

        if (rules) {
          for (let rIndex = 0; rIndex < rules.length; rIndex++) {
            validPromise = validPromise.then(() => new Promise((resolve, reject) => {
              let rule = rules[rIndex];
              let isRequired = rule.required === true;

              if ((type === 'all' || !rule.trigger || type === rule.trigger) && (isRequired || value || rule.validator)) {
                if (external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isFunction(rule.validator)) {
                  rule.validator(rule, value, e => {
                    if (external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isError(e)) {
                      let cusRule = {
                        type: 'custom',
                        trigger: rule.trigger,
                        message: e.message,
                        rule
                      };
                      return reject(cusRule);
                    }

                    return resolve();
                  }, {
                    rules,
                    row,
                    column,
                    rowIndex: this.getRowMapIndex(row),
                    columnIndex: this.getColumnMapIndex(column)
                  });
                } else {
                  let restVal;
                  let isNumber = rule.type === 'number';
                  let isEmpty = value === null || value === undefined || value === '';

                  if (isNumber) {
                    restVal = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.toNumber(value);
                  } else {
                    restVal = isEmpty ? '' : '' + value;
                  }

                  if (isRequired && isEmpty) {
                    reject(rule);
                  } else if (value && (isNumber && isNaN(value) || external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isRegExp(rule.pattern) && !rule.pattern.test(value) || external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isNumber(rule.min) && (isNumber ? restVal < rule.min : restVal.length < rule.min) || external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isNumber(rule.max) && (isNumber ? restVal > rule.max : restVal.length > rule.max))) {
                    reject(rule);
                  } else {
                    resolve();
                  }
                }
              } else {
                resolve();
              }
            }));
          }
        }
      }

      return validPromise;
    },

    clearValidate() {
      Object.assign(this.validStore, {
        visible: false,
        row: null,
        column: null,
        rule: null,
        style: null,
        placement: null
      });
      return this.$nextTick();
    },

    /**
     * 聚焦到校验通过的单元格并弹出校验错误提示
     */
    handleValidError(params) {
      this.handleActived(params, {
        type: 'valid-error',
        trigger: 'call'
      }).then(() => this.openValidTooltip(params));
    },

    /**
     * 弹出校验错误提示
     */
    openValidTooltip(params) {
      let {
        $refs,
        tooltipOpts,
        validStore
      } = this;
      let {
        rule,
        row,
        column,
        cell
      } = params;
      this.$nextTick(() => {
        let {
          top,
          left
        } = DomTools.getOffsetPos(cell);
        let {
          scrollTop,
          scrollLeft,
          visibleWidth,
          visibleHeight
        } = DomTools.getDomNode();
        Object.assign(validStore, {
          row,
          column,
          rule,
          visible: true,
          placement: 'bottom'
        });
        this.$nextTick().then(() => {
          let validWrapperElem = $refs.validWrapper;

          if (validWrapperElem) {
            validStore.style = {
              zIndex: tooltipOpts.zIndex,
              top: `${top + cell.offsetHeight}px`,
              left: `${left + Math.floor((cell.offsetWidth - validWrapperElem.offsetWidth) / 2)}px`
            };
            return this.$nextTick();
          }
        }).then(() => {
          let validWrapperElem = $refs.validWrapper;

          if (validWrapperElem) {
            let offsetHeight = validWrapperElem.offsetHeight;
            let offsetWidth = validWrapperElem.offsetWidth;

            if (top + cell.offsetHeight + offsetHeight > scrollTop + visibleHeight) {
              validStore.placement = 'top';
              validStore.style.top = `${top - offsetHeight}px`;
            }

            if (left + offsetWidth > scrollLeft + visibleWidth) {
              validStore.style.left = `${scrollLeft + visibleWidth - offsetWidth - 6}px`;
            }
          }
        });
        UtilTools.emitEvent(this, 'valid-error', [params]);
      });
    },

    /**
     * 导出 csv 文件
     * 如果是树表格，则默认是导出所有节点
     * 如果是启用了可视渲染，则只能导出数据源，可以配合 dataFilterMethod 函数自行转换数据
     */
    exportCsv(options) {
      let {
        visibleColumn,
        scrollXLoad,
        scrollYLoad,
        treeConfig
      } = this;
      let opts = Object.assign({
        filename: 'table.csv',
        original: !!treeConfig,
        isHeader: true,
        download: true,
        data: null,
        columns: null,
        columnFilterMethod: column => ['index', 'selection', 'radio'].indexOf(column.type) === -1 && column.property,
        dataFilterMethod: null
      }, options);

      if (opts.filename.indexOf('.csv') === -1) {
        opts.filename += '.csv';
      }

      if (scrollXLoad || scrollYLoad) {
        opts.original = true;
      }

      let columns = visibleColumn;
      let oData = this.getTableData().fullData;

      if (treeConfig) {
        oData = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.toTreeArray(oData, treeConfig);
      }

      return ExportTools.downloadCsc(opts, ExportTools.getCsvContent(opts, oData, columns, this.$el));
    }

  }
});
// CONCATENATED MODULE: ./packages/table/index.js


table.install = function (Vue) {
  Vue.component(table.name, table);
};

const Table = table;
/* harmony default export */ var packages_table = (table);
// CONCATENATED MODULE: ./packages/table-column/src/column.js


/* harmony default export */ var src_column = ({
  name: 'VxeTableColumn',
  props: {
    // 渲染类型 index,radio,selection,expand
    type: String,
    // 列属性
    prop: String,
    // 列标题
    label: String,
    // 列宽度
    width: [Number, String],
    // 列最小宽度，把剩余宽度按比例分配
    minWidth: [Number, String],
    // 是否允许拖动列宽调整大小
    resizable: {
      type: Boolean,
      default: null
    },
    // 将列固定在左侧或者右侧
    fixed: String,
    // 列对其方式
    align: String,
    // 表头对齐方式
    headerAlign: String,
    // 当内容过长时显示为省略号
    showOverflow: [Boolean, String],
    // 当表头内容过长时显示为省略号
    showHeaderOverflow: [Boolean, String],
    // 格式化显示内容
    formatter: Function,
    // 自定义索引方法
    indexMethod: Function,
    // 是否允许排序
    sortable: Boolean,
    // 是否服务端排序
    remoteSort: Boolean,
    // 自定义排序的属性
    sortBy: [String, Array],
    // 配置筛选条件数组
    filters: Array,
    // 筛选是否允许多选
    filterMultiple: {
      type: Boolean,
      default: true
    },
    // 自定义筛选方法
    filterMethod: Function,
    // 是否服务端筛选
    remoteFilter: Boolean,
    // 指定为树节点
    treeNode: Boolean,
    // 列的 key
    columnKey: [String, Number],
    // 列编辑配置项
    editRender: Object
  },
  inject: ['$table'],

  created() {
    this.columnConfig = this.createColumn(this.$table, this);
  },

  mounted() {
    UtilTools.assemColumn(this);
  },

  destroyed() {
    UtilTools.destroyColumn(this);
  },

  render(h) {
    return h('div', this.$slots.default);
  },

  methods: src_cell
});
// CONCATENATED MODULE: ./packages/table-column/index.js


src_column.install = function (Vue) {
  Vue.component(src_column.name, src_column);
};

const TableColumn = src_column;
/* harmony default export */ var table_column = (src_column);
// CONCATENATED MODULE: ./packages/table-header/src/header.js



const getAllColumns = columns => {
  const result = [];
  columns.forEach(column => {
    if (column.visible) {
      if (column.children && column.children.length && column.children.some(column => column.visible)) {
        result.push(column);
        result.push.apply(result, getAllColumns(column.children));
      } else {
        result.push(column);
      }
    }
  });
  return result;
};

const convertToRows = originColumns => {
  let maxLevel = 1;

  const traverse = (column, parent) => {
    if (parent) {
      column.level = parent.level + 1;

      if (maxLevel < column.level) {
        maxLevel = column.level;
      }
    }

    if (column.children && column.children.length && column.children.some(column => column.visible)) {
      let colSpan = 0;
      column.children.forEach(subColumn => {
        if (subColumn.visible) {
          traverse(subColumn, column);
          colSpan += subColumn.colSpan;
        }
      });
      column.colSpan = colSpan;
    } else {
      column.colSpan = 1;
    }
  };

  originColumns.forEach(column => {
    column.level = 1;
    traverse(column);
  });
  const rows = [];

  for (let i = 0; i < maxLevel; i++) {
    rows.push([]);
  }

  const allColumns = getAllColumns(originColumns);
  allColumns.forEach(column => {
    if (column.children && column.children.length && column.children.some(column => column.visible)) {
      column.rowSpan = 1;
    } else {
      column.rowSpan = maxLevel - column.level + 1;
    }

    rows[column.level - 1].push(column);
  });
  return rows;
};

/* harmony default export */ var header = ({
  name: 'VxeTableHeader',
  props: {
    tableData: Array,
    tableColumn: Array,
    visibleColumn: Array,
    collectColumn: Array,
    fixedColumn: Array,
    size: String,
    fixedType: String,
    isGroup: Boolean
  },

  data() {
    return {
      headerColumn: []
    };
  },

  watch: {
    tableColumn() {
      this.uploadColumn();
    }

  },

  created() {
    this.uploadColumn();
  },

  render(h) {
    let {
      $parent: $table,
      fixedType,
      headerColumn,
      tableColumn,
      resizeMousedown,
      fixedColumn
    } = this;
    let {
      $listeners: tableListeners,
      resizable,
      border,
      headerRowClassName,
      headerCellClassName,
      showHeaderAllOverflow,
      tableWidth,
      scrollXLoad,
      scrollXStore,
      scrollYWidth,
      getColumnMapIndex
    } = $table; // 横向滚动渲染

    if (scrollXLoad) {
      if (fixedType) {
        tableColumn = fixedColumn;
      }

      tableWidth = tableColumn.reduce((previous, column) => previous + column.renderWidth, 0);
    }

    return h('div', {
      class: ['vxe-table--header-wrapper', fixedType ? `fixed--${fixedType}-wrapper` : 'body--wrapper']
    }, [!fixedType && scrollXLoad ? h('div', {
      class: ['vxe-body--x-space'],
      style: {
        width: `${$table.tableWidth + scrollYWidth}px`
      }
    }) : null, h('table', {
      attrs: {
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      },
      style: {
        width: tableWidth === null ? tableWidth : `${tableWidth + scrollYWidth}px`,
        'margin-left': fixedType ? null : `${scrollXStore.leftSpaceWidth}px`
      }
    }, [
    /**
     * 列宽
     */
    h('colgroup', tableColumn.map((column, columnIndex) => {
      return h('col', {
        attrs: {
          name: column.id,
          width: column.renderWidth
        },
        key: columnIndex
      });
    }).concat([h('col', {
      attrs: {
        width: scrollYWidth
      }
    })])),
    /**
     * 头部
     */
    h('thead', headerColumn.map((cols, rowIndex) => {
      return h('tr', {
        class: ['vxe-header--row', headerRowClassName ? external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isFunction(headerRowClassName) ? headerRowClassName({
          $table,
          $rowIndex: rowIndex,
          fixed: fixedType
        }) : headerRowClassName : '']
      }, cols.map((column, $columnIndex) => {
        let {
          columnKey,
          showHeaderOverflow,
          headerAlign,
          renderWidth
        } = column;
        let isGroup = column.children && column.children.length;
        let fixedHiddenColumn = fixedType && column.fixed !== fixedType && !isGroup;
        let showEllipsis = (showHeaderOverflow || showHeaderAllOverflow) === 'ellipsis';
        let showTitle = (showHeaderOverflow || showHeaderAllOverflow) === 'title';
        let showTooltip = showHeaderOverflow === true || showHeaderOverflow === 'tooltip' || showHeaderAllOverflow === true || showHeaderAllOverflow === 'tooltip';
        let thOns = {}; // 确保任何情况下 columnIndex 都精准指向真实列索引

        let columnIndex = getColumnMapIndex(column);

        if (showTooltip) {
          thOns.mouseover = evnt => {
            $table.triggerHeaderTooltipEvent(evnt, {
              $table,
              column,
              columnIndex,
              fixed: fixedType
            });
          };

          thOns.mouseout = $table.clostTooltip;
        }

        if (tableListeners['header-cell-click']) {
          thOns.click = evnt => {
            UtilTools.emitEvent($table, 'header-cell-click', [{
              $table,
              $rowIndex: rowIndex,
              column,
              columnIndex,
              $columnIndex,
              fixed: fixedType,
              cell: evnt.currentTarget
            }, evnt]);
          };
        }

        if (tableListeners['header-cell-dblclick']) {
          thOns.dblclick = evnt => {
            UtilTools.emitEvent($table, 'header-cell-dblclick', [{
              $table,
              $rowIndex: rowIndex,
              column,
              columnIndex,
              $columnIndex,
              fixed: fixedType,
              cell: evnt.currentTarget
            }, evnt]);
          };
        }

        return h('th', {
          class: ['vxe-header--column', column.id, {
            [`col--${headerAlign}`]: headerAlign,
            'fixed--hidden': fixedHiddenColumn,
            'filter--active': column.filters.some(item => item.checked)
          }, headerCellClassName ? external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isFunction(headerCellClassName) ? headerCellClassName({
            $table,
            $rowIndex: rowIndex,
            column,
            columnIndex,
            $columnIndex,
            fixed: fixedType
          }) : headerCellClassName : ''],
          attrs: {
            colspan: column.colSpan,
            rowspan: column.rowSpan
          },
          on: thOns,
          key: columnKey || (isGroup ? column.id : columnIndex)
        }, [h('div', {
          class: ['vxe-cell', {
            'c--title': showTitle,
            'c--tooltip': showTooltip,
            'c--ellipsis': showEllipsis
          }],
          attrs: {
            title: showTitle ? column.origin.label : null
          },
          style: {
            width: showTitle || showTooltip || showEllipsis ? `${border ? renderWidth - 1 : renderWidth}px` : null
          }
        }, column.renderHeader(h, {
          $table,
          column,
          columnIndex,
          fixed: fixedType,
          isHidden: fixedHiddenColumn
        })), border && (external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isBoolean(column.resizable) ? column.resizable : resizable) && !fixedType && !isGroup ? h('div', {
          class: ['vxe-resizable'],
          on: {
            mousedown: evnt => {
              resizeMousedown(evnt, column);
            }
          }
        }) : null]);
      }).concat(scrollYWidth ? [h('th', {
        class: ['col--gutter'],
        style: {
          width: `${scrollYWidth}px`
        }
      })] : []));
    }))]),
    /**
     * 其他
     */
    h('div', {
      class: ['vxe-table--repair'],
      style: {
        width: tableWidth === null ? tableWidth : `${tableWidth}px`
      }
    })]);
  },

  methods: {
    uploadColumn() {
      this.headerColumn = this.isGroup ? convertToRows(this.collectColumn) : [this.$parent.scrollXLoad && this.fixedType ? this.fixedColumn : this.tableColumn];
    },

    resizeMousedown(evnt, column) {
      let {
        $parent: $table,
        $el
      } = this;
      let targetElem = evnt.target;
      let dragLeft = 0;
      let tableBodyElem = $table.$refs.tableBody.$el;
      let resizeBarElem = $table.$refs.resizeBar;
      let pos = DomTools.getOffsetPos(targetElem, $el);
      let dragMinLeft = pos.left - targetElem.parentNode.clientWidth + targetElem.clientWidth + 36;
      let dragPosLeft = pos.left + 6;
      let dragClientX = evnt.clientX;
      let domMousemove = document.onmousemove;
      let domMouseup = document.onmouseup;

      let updateEvent = function (evnt) {
        evnt.preventDefault();
        let offsetX = evnt.clientX - dragClientX;
        let left = dragPosLeft + offsetX;
        dragLeft = left < dragMinLeft ? dragMinLeft : left;
        resizeBarElem.style.left = `${dragLeft - tableBodyElem.scrollLeft}px`;
      };

      resizeBarElem.style.display = 'block';
      document.onmousemove = updateEvent;

      document.onmouseup = function (evnt) {
        document.onmousemove = domMousemove;
        document.onmouseup = domMouseup;
        column.resizeWidth = column.renderWidth - (dragPosLeft - dragLeft);
        resizeBarElem.style.display = 'none';
        $table.analyColumnWidth();
        $table.recalculate();
      };

      updateEvent(evnt);
    }

  }
});
// CONCATENATED MODULE: ./packages/table-header/index.js


header.install = function (Vue) {
  Vue.component(header.name, header);
};

const TableHeader = header;
/* harmony default export */ var table_header = (header);
// CONCATENATED MODULE: ./packages/table-body/src/body.js


 // 处理选中位置

function handleLocation(obj, rows, columns, row, column) {
  let rowIndex = rows.indexOf(row);
  let columnIndex = columns.indexOf(column);
  obj.active = rowIndex > -1 && columnIndex > -1;
  obj.top = rowIndex === 0 && columnIndex > -1;
  obj.bottom = rowIndex === rows.length - 1 && columnIndex > -1;
  obj.left = rowIndex > -1 && columnIndex === 0;
  obj.right = rowIndex > -1 && columnIndex === columns.length - 1;
}
/**
 * 渲染列
 */


function renderColumn(h, _vm, $table, seq, fixedType, rowLevel, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex) {
  let {
    $listeners: tableListeners,
    tableData,
    overflowX,
    scrollXLoad,
    scrollYLoad,
    border,
    highlightCurrentRow,
    showAllOverflow,
    cellClassName,
    spanMethod,
    keyboardConfig,
    treeConfig,
    mouseConfig,
    editConfig,
    editStore,
    validStore
  } = $table;
  let {
    editRender,
    align,
    showOverflow,
    renderWidth,
    columnKey
  } = column;
  let {
    checked,
    selected,
    actived,
    copyed
  } = editStore;
  let isMouseSelected = mouseConfig && mouseConfig.selected;
  let isMouseChecked = mouseConfig && mouseConfig.checked;
  let isKeyboardCut = keyboardConfig && keyboardConfig.isCut;
  let fixedHiddenColumn = fixedType ? column.fixed !== fixedType : column.fixed && overflowX;
  let showEllipsis = (showOverflow || showAllOverflow) === 'ellipsis';
  let showTitle = (showOverflow || showAllOverflow) === 'title';
  let showTooltip = showOverflow === true || showOverflow === 'tooltip' || showAllOverflow === true || showAllOverflow === 'tooltip';
  let hasEllipsis = showTitle || showTooltip || showEllipsis;
  let attrs, isDirty;
  let tdOns = {};
  let checkedLocat = {};
  let checkedTLocat = {};
  let copyedLocat = {};
  let triggerDblclick = editRender && editConfig && editConfig.trigger === 'dblclick';
  let params = {
    $table,
    seq,
    row,
    rowIndex,
    $rowIndex,
    column,
    columnIndex,
    $columnIndex,
    fixed: fixedType,
    level: rowLevel,
    isHidden: fixedHiddenColumn,
    data: tableData // 滚动的渲染不支持动态行高

  };

  if ((scrollXLoad || scrollYLoad) && !hasEllipsis) {
    showEllipsis = hasEllipsis = true;
  } // hover 进入事件


  if (showTooltip || tableListeners['cell-mouseenter']) {
    tdOns.mouseenter = evnt => {
      let evntParams = {
        $table,
        seq,
        row,
        rowIndex,
        $rowIndex,
        column,
        columnIndex,
        $columnIndex,
        fixed: fixedType,
        level: rowLevel,
        cell: evnt.currentTarget // 如果配置了显示 tooltip

      };

      if (showTooltip) {
        $table.triggerTooltipEvent(evnt, evntParams);
      }

      UtilTools.emitEvent($table, 'cell-mouseenter', [evntParams, evnt]);
    };
  } // hover 退出事件


  if (showTooltip || tableListeners['cell-mouseleave']) {
    tdOns.mouseleave = evnt => {
      $table.clostTooltip();
      UtilTools.emitEvent($table, 'cell-mouseleave', [{
        $table,
        seq,
        row,
        rowIndex,
        $rowIndex,
        column,
        columnIndex,
        $columnIndex,
        fixed: fixedType,
        level: rowLevel,
        cell: evnt.currentTarget
      }, evnt]);
    };
  } // 按下事件处理


  tdOns.mousedown = evnt => {
    $table.triggerCellMousedownEvent(evnt, {
      $table,
      seq,
      row,
      rowIndex,
      $rowIndex,
      column,
      columnIndex,
      $columnIndex,
      fixed: fixedType,
      level: rowLevel,
      cell: evnt.currentTarget
    });
  }; // 点击事件处理


  if (highlightCurrentRow || tableListeners['cell-click'] || editRender && editConfig || treeConfig && (treeConfig.trigger === 'row' || column.treeNode && treeConfig.trigger === 'cell')) {
    tdOns.click = evnt => {
      $table.triggerCellClickEvent(evnt, {
        $table,
        row,
        rowIndex,
        $rowIndex,
        column,
        columnIndex,
        $columnIndex,
        fixed: fixedType,
        level: rowLevel,
        cell: evnt.currentTarget
      });
    };
  } // 双击事件处理


  if (triggerDblclick || tableListeners['cell-dblclick']) {
    tdOns.dblclick = evnt => {
      $table.triggerCellDBLClickEvent(evnt, {
        $table,
        seq,
        row,
        rowIndex,
        $rowIndex,
        column,
        columnIndex,
        $columnIndex,
        fixed: fixedType,
        level: rowLevel,
        cell: evnt.currentTarget
      });
    };
  } // 合并行或列


  if (spanMethod) {
    let {
      rowspan = 1,
      colspan = 1
    } = spanMethod(params) || {};

    if (!rowspan || !colspan) {
      return null;
    }

    attrs = {
      rowspan,
      colspan
    };
  } // 如果显示状态


  if (!fixedHiddenColumn && editConfig && editConfig.showStatus) {
    isDirty = $table.hasRowChange(row, column.property);
  } // 批量选中处理


  if (!fixedHiddenColumn && !fixedType) {
    if (isMouseChecked) {
      handleLocation(checkedLocat, checked.rows, checked.columns, row, column);
      handleLocation(checkedTLocat, checked.tRows, checked.tColumns, row, column);
    }

    if (isKeyboardCut) {
      handleLocation(copyedLocat, copyed.rows, copyed.columns, row, column);
    }
  }

  return h('td', {
    class: ['vxe-body--column', column.id, {
      [`col--${align}`]: align,
      'col--edit': editRender,
      'col--checked': checkedLocat.active,
      'col--checked-top': checkedLocat.top,
      'col--checked-bottom': checkedLocat.bottom,
      'col--checked-left': checkedLocat.left,
      'col--checked-right': checkedLocat.right,
      'col--checked-temp': checkedTLocat.active,
      'col--checked-temp-top': checkedTLocat.top,
      'col--checked-temp-bottom': checkedTLocat.bottom,
      'col--checked-temp-left': checkedTLocat.left,
      'col--checked-temp-right': checkedTLocat.right,
      'col--selected': isMouseSelected && editRender && selected.row === row && selected.column === column,
      'col--copyed': copyedLocat.active,
      'col--copyed-top': copyedLocat.top,
      'col--copyed-bottom': copyedLocat.bottom,
      'col--copyed-left': copyedLocat.left,
      'col--copyed-right': copyedLocat.right,
      'col--actived': editRender && actived.row === row && actived.column === column,
      'col--dirty': isDirty,
      'col--valid-error': validStore.row === row && validStore.column === column,
      'edit--visible': editRender && editRender.type === 'visible',
      'fixed--hidden': fixedHiddenColumn
    }, cellClassName ? external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isFunction(cellClassName) ? cellClassName(params) : cellClassName : ''],
    key: columnKey || columnIndex,
    attrs,
    on: tdOns
  }, showAllOverflow && fixedHiddenColumn ? [] : [h('div', {
    class: ['vxe-cell', {
      'c--title': showTitle,
      'c--tooltip': showTooltip,
      'c--ellipsis': showEllipsis
    }],
    attrs: {
      title: showTitle ? UtilTools.getCellLabel(row, column, params) : null
    },
    style: {
      width: hasEllipsis ? `${border ? renderWidth - 1 : renderWidth}px` : null
    }
  }, column.renderCell(h, params)), isMouseChecked && !fixedType ? h('span', {
    class: 'vxe-body--column-checked-lt'
  }) : null, isMouseChecked && !fixedType ? h('span', {
    class: 'vxe-body--column-checked-rb'
  }) : null, isKeyboardCut && !fixedType ? h('span', {
    class: 'vxe-body--column-copyed-lt'
  }) : null, isKeyboardCut && !fixedType ? h('span', {
    class: 'vxe-body--column-copyed-rb'
  }) : null, checkedLocat.bottom && checkedLocat.right ? h('span', {
    class: 'vxe-body--column-checked-corner',
    on: {
      mousedown(evnt) {
        $table.triggerCornerMousedownEvent({
          $table,
          seq,
          row,
          rowIndex,
          $rowIndex,
          column,
          columnIndex,
          $columnIndex,
          fixed: fixedType,
          level: rowLevel,
          cell: evnt.target.parentNode
        }, evnt);
      }

    }
  }) : null]);
}

function renderRows(h, _vm, $table, rowLevel, fixedType, tableData, tableColumn) {
  let {
    highlightHoverRow,
    rowClassName,
    selectRow,
    hoverRow,
    treeConfig,
    treeExpandeds,
    scrollYLoad,
    overflowX,
    columnStore,
    scrollYStore,
    editStore,
    expandeds,
    getRowMapIndex,
    getColumnMapIndex
  } = $table;
  let {
    leftList,
    rightList
  } = columnStore;
  let rows = [];
  tableData.forEach((row, $rowIndex) => {
    let trOn = {};
    let rowIndex = $rowIndex;
    let seq = rowIndex + 1;

    if (scrollYLoad) {
      seq += scrollYStore.startIndex;
    } // 确保任何情况下 rowIndex 都精准指向真实 data 索引


    rowIndex = getRowMapIndex(row); // 事件绑定

    if (highlightHoverRow && (leftList.length || rightList.length) && overflowX) {
      trOn.mouseenter = evnt => {
        if (row !== hoverRow) {
          $table.triggerHoverEvent(evnt, {
            row,
            rowIndex
          });
        }
      };
    }

    let rowId = UtilTools.getRowId($table, row, rowIndex);
    rows.push(h('tr', {
      class: ['vxe-body--row', {
        [`row--level-${rowLevel}`]: treeConfig,
        'row--selected': row === selectRow,
        'row--hover': row === hoverRow,
        'row--new': editStore.insertList.indexOf(row) > -1
      }, rowClassName ? external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isFunction(rowClassName) ? rowClassName({
        $table,
        seq,
        row,
        rowIndex
      }) : rowClassName : ''],
      attrs: {
        'data-rowkey': rowId
      },
      key: rowId,
      on: trOn
    }, tableColumn.map((column, $columnIndex) => {
      let columnIndex = getColumnMapIndex(column);
      return renderColumn(h, _vm, $table, seq, fixedType, rowLevel, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex);
    })));

    if (treeConfig && treeExpandeds.length) {
      // 如果是树形表格
      let rowChildren = row[treeConfig.children];

      if (rowChildren && rowChildren.length && treeExpandeds.indexOf(row) > -1) {
        rows.push.apply(rows, renderRows(h, _vm, $table, rowLevel + 1, fixedType, rowChildren, tableColumn));
      }
    } else if (expandeds.length) {
      // 如果行被展开了
      if (expandeds.indexOf(row) > -1) {
        let column = tableColumn.find(column => column.type === 'expand');
        let columnIndex = getColumnMapIndex(column);

        if (column) {
          rows.push(h('tr', {
            class: ['vxe-body--expanded-row'],
            key: `expand_${rowIndex}`,
            on: trOn
          }, [h('td', {
            class: ['vxe-body--expanded-column'],
            attrs: {
              colspan: tableColumn.length
            }
          }, [h('div', {
            class: ['vxe-body--expanded-cell']
          }, [column.renderData(h, {
            $table,
            seq,
            row,
            rowIndex,
            column,
            columnIndex,
            fixed: fixedType,
            level: rowLevel
          })])])]));
        }
      }
    }
  });
  return rows;
}
/**
 * 同步滚动条
 * scroll 方式：可以使固定列与内容保持一致的滚动效果，处理相对麻烦
 * mousewheel 方式：对于同步滚动效果就略差了，左右滚动，内容跟随即可
 */


var scrollProcessTimeout;
var updateLeftScrollingTimeput;

function syncBodyScroll(scrollTop, elem1, elem2) {
  if (elem1 || elem2) {
    if (elem1) {
      elem1.onscroll = null;
      elem1.scrollTop = scrollTop;
    }

    if (elem2) {
      elem2.onscroll = null;
      elem2.scrollTop = scrollTop;
    }

    clearTimeout(scrollProcessTimeout);
    scrollProcessTimeout = setTimeout(function () {
      if (elem1) {
        elem1.onscroll = elem1._onscroll;
      }

      if (elem2) {
        elem2.onscroll = elem2._onscroll;
      }
    }, 100);
  }
}

/* harmony default export */ var src_body = ({
  name: 'VxeTableBody',
  props: {
    tableData: Array,
    tableColumn: Array,
    visibleColumn: Array,
    collectColumn: Array,
    fixedColumn: Array,
    size: String,
    fixedType: String,
    isGroup: Boolean
  },

  mounted() {
    this.$el.onscroll = this.scrollEvent;
    this.$el._onscroll = this.scrollEvent;
  },

  beforeDestroy() {
    this.$el._onscroll = null;
    this.$el.onscroll = null;
  },

  render(h) {
    let {
      $parent: $table,
      fixedColumn,
      fixedType
    } = this;
    let {
      maxHeight,
      height,
      containerHeight,
      loading,
      tableData,
      tableColumn,
      headerHeight,
      showFooter,
      showAllOverflow,
      footerHeight,
      tableHeight,
      tableWidth,
      scrollXStore,
      scrollXLoad,
      scrollYStore,
      scrollYLoad,
      scrollXHeight
    } = $table;
    let customHeight = height === 'auto' ? containerHeight : external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.toNumber(height);
    let style = {};

    if (customHeight > 0) {
      style.height = `${fixedType ? (customHeight > 0 ? customHeight - headerHeight - footerHeight : tableHeight) - (showFooter ? 0 : scrollXHeight) : customHeight - headerHeight - footerHeight}px`;
    } else if (maxHeight) {
      maxHeight = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.toNumber(maxHeight);
      style['max-height'] = `${fixedType ? maxHeight - headerHeight - (showFooter ? 0 : scrollXHeight) : maxHeight - headerHeight}px`;
    } // 如果是固定列与设置了超出隐藏


    if (fixedType && showAllOverflow) {
      tableColumn = fixedColumn;
      tableWidth = tableColumn.reduce((previous, column) => previous + column.renderWidth, 0);
    } else if (scrollXLoad) {
      if (fixedType) {
        tableColumn = fixedColumn;
      }

      tableWidth = tableColumn.reduce((previous, column) => previous + column.renderWidth, 0);
    }

    return h('div', {
      class: ['vxe-table--body-wrapper', fixedType ? `fixed--${fixedType}-wrapper` : 'body--wrapper'],
      attrs: {
        fixed: fixedType
      },
      style
    }, [scrollYLoad ? h('div', {
      class: ['vxe-body--top-space'],
      style: {
        height: `${scrollYStore.topSpaceHeight}px`
      }
    }) : null, !fixedType && scrollXLoad ? h('div', {
      class: ['vxe-body--x-space'],
      style: {
        width: `${$table.tableWidth}px`
      }
    }) : null, h('table', {
      class: ['vxe-table--body'],
      attrs: {
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      },
      style: {
        width: tableWidth === null ? tableWidth : `${tableWidth}px`,
        'margin-left': fixedType ? null : `${scrollXStore.leftSpaceWidth}px`
      }
    }, [
    /**
     * 列宽
     */
    h('colgroup', tableColumn.map((column, columnIndex) => {
      return h('col', {
        attrs: {
          name: column.id,
          width: column.renderWidth
        },
        key: columnIndex
      });
    })),
    /**
     * 内容
     */
    h('tbody', renderRows(h, this, $table, 0, fixedType, tableData, tableColumn))]), !fixedType && !loading && !tableData.length ? h('div', {
      class: 'vxe-table--empty-block'
    }, [h('span', {
      class: 'vxe-table--empty-text'
    }, $table.$slots.empty || conf.i18n('vxe.table.emptyText'))]) : null, scrollYLoad ? h('div', {
      class: ['vxe-body--bottom-space'],
      style: {
        height: `${scrollYStore.bottomSpaceHeight}px`
      }
    }) : null]);
  },

  methods: {
    /**
     * 滚动处理
     * 如果存在列固定左侧，同步更新滚动状态
     * 如果存在列固定右侧，同步更新滚动状态
     */
    scrollEvent(evnt) {
      let {
        $parent: $table,
        fixedType
      } = this;
      let {
        $refs,
        scrollXLoad,
        scrollYLoad,
        triggerScrollXEvent,
        triggerScrollYEvent
      } = $table;
      let {
        tableHeader,
        tableBody,
        leftBody,
        rightBody
      } = $refs;
      let headerElem = tableHeader ? tableHeader.$el : null;
      let bodyElem = tableBody.$el;
      let leftElem = leftBody ? leftBody.$el : null;
      let rightElem = rightBody ? rightBody.$el : null;
      let scrollTop = bodyElem.scrollTop;
      let scrollLeft = bodyElem.scrollLeft;

      if (leftElem && fixedType === 'left') {
        scrollTop = leftElem.scrollTop;
        syncBodyScroll(scrollTop, bodyElem, rightElem);
      } else if (rightElem && fixedType === 'right') {
        scrollTop = rightElem.scrollTop;
        syncBodyScroll(scrollTop, bodyElem, leftElem);
      } else {
        if (headerElem) {
          headerElem.scrollLeft = bodyElem.scrollLeft;
        } // 缓解 IE 卡顿


        if (leftElem || rightElem) {
          clearTimeout(updateLeftScrollingTimeput);
          updateLeftScrollingTimeput = setTimeout($table.checkScrolling, DomTools.browse.msie ? 200 : 20);
          syncBodyScroll(scrollTop, leftElem, rightElem);
        }
      }

      if (scrollXLoad) {
        triggerScrollXEvent(evnt);
      }

      if (scrollYLoad) {
        triggerScrollYEvent(evnt);
      }

      UtilTools.emitEvent($table, 'body-scroll', [{
        fixed: fixedType,
        scrollTop,
        scrollLeft
      }, evnt]);
    }

  }
});
// CONCATENATED MODULE: ./packages/table-body/index.js


src_body.install = function (Vue) {
  Vue.component(src_body.name, src_body);
};

const TableBody = src_body;
/* harmony default export */ var table_body = (src_body);
// CONCATENATED MODULE: ./packages/table-footer/src/footer.js


/* harmony default export */ var footer = ({
  name: 'VxeTableFooter',
  props: {
    footerData: Array,
    tableColumn: Array,
    visibleColumn: Array,
    fixedColumn: Array,
    size: String,
    fixedType: String
  },

  render(h) {
    let {
      $parent: $table,
      fixedType,
      fixedColumn,
      tableColumn,
      footerData
    } = this;
    let {
      $listeners: tableListeners,
      footerRowClassName,
      footerCellClassName,
      tableWidth,
      scrollYWidth,
      scrollXHeight,
      scrollXLoad,
      scrollXStore,
      optimizeOpts,
      getColumnMapIndex
    } = $table;
    let {
      overflow
    } = optimizeOpts; // 如果是使用优化模式

    if (fixedType && overflow) {
      tableColumn = fixedColumn;
      tableWidth = tableColumn.reduce((previous, column) => previous + column.renderWidth, 0);
    } else if (scrollXLoad) {
      if (fixedType) {
        tableColumn = fixedColumn;
      }

      tableWidth = tableColumn.reduce((previous, column) => previous + column.renderWidth, 0);
    }

    return h('div', {
      class: ['vxe-table--footer-wrapper', fixedType ? `fixed--${fixedType}-wrapper` : 'footer--wrapper'],
      style: {
        'margin-top': `${-scrollXHeight - 1}px`
      },
      on: {
        scroll: this.scrollEvent
      }
    }, [!fixedType && scrollXLoad ? h('div', {
      class: ['vxe-body--x-space'],
      style: {
        width: `${$table.tableWidth}px`
      }
    }) : null, h('table', {
      attrs: {
        cellspacing: 0,
        cellpadding: 0,
        border: 0
      },
      style: {
        width: tableWidth === null ? tableWidth : `${tableWidth + scrollYWidth}px`,
        'margin-left': fixedType ? null : `${scrollXStore.leftSpaceWidth}px`
      }
    }, [
    /**
     * 列宽
     */
    h('colgroup', tableColumn.map((column, columnIndex) => {
      return h('col', {
        attrs: {
          name: column.id,
          width: column.renderWidth
        }
      });
    }).concat([h('col', {
      attrs: {
        width: scrollYWidth
      }
    })])),
    /**
     * 底部
     */
    h('tfoot', footerData.map((list, rowIndex) => {
      return h('tr', {
        class: ['vxe-footer--row', footerRowClassName ? external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isFunction(footerRowClassName) ? footerRowClassName({
          $rowIndex: rowIndex,
          fixed: fixedType
        }) : footerRowClassName : '']
      }, tableColumn.map((column, $columnIndex) => {
        let isGroup = column.children && column.children.length;
        let fixedHiddenColumn = fixedType && column.fixed !== fixedType && !isGroup;
        let tfOns = {}; // 确保任何情况下 columnIndex 都精准指向真实列索引

        let columnIndex = getColumnMapIndex(column);

        if (tableListeners['header-cell-click']) {
          tfOns.click = evnt => {
            UtilTools.emitEvent($table, 'header-cell-click', [{
              $table,
              $rowIndex: rowIndex,
              column,
              columnIndex,
              $columnIndex,
              fixed: fixedType,
              cell: evnt.currentTarget
            }, evnt]);
          };
        }

        if (tableListeners['header-cell-dblclick']) {
          tfOns.dblclick = evnt => {
            UtilTools.emitEvent($table, 'header-cell-dblclick', [{
              $table,
              $rowIndex: rowIndex,
              column,
              columnIndex,
              $columnIndex,
              fixed: fixedType,
              cell: evnt.currentTarget
            }, evnt]);
          };
        }

        return h('td', {
          class: ['vxe-footer--column', column.id, {
            [`col--${column.headerAlign}`]: column.headerAlign,
            'fixed--hidden': fixedHiddenColumn,
            'filter--active': column.filters.some(item => item.checked)
          }, footerCellClassName ? external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isFunction(footerCellClassName) ? footerCellClassName({
            $rowIndex: rowIndex,
            column,
            columnIndex,
            $columnIndex,
            fixed: fixedType
          }) : footerCellClassName : ''],
          on: tfOns,
          key: columnIndex
        }, [h('div', {
          class: ['vxe-cell']
        }, list[fixedType === 'right' ? list.length - tableColumn.length + columnIndex : columnIndex])]);
      }).concat([h('td', {
        class: ['col--gutter'],
        style: {
          width: `${scrollYWidth}px`
        }
      })]));
    }))])]);
  },

  methods: {
    /**
     * 滚动处理
     * 如果存在列固定左侧，同步更新滚动状态
     * 如果存在列固定右侧，同步更新滚动状态
     */
    scrollEvent(evnt) {
      let {
        $parent: $table,
        fixedType
      } = this;
      let {
        $refs,
        scrollXLoad,
        triggerScrollXEvent
      } = $table;
      let tableHeader = $refs.tableHeader;
      let headerElem = tableHeader ? tableHeader.$el : null;
      let bodyElem = $refs.tableBody.$el;
      let footerElem = $refs.tableFooter.$el;
      let scrollLeft = footerElem.scrollLeft;

      if (headerElem) {
        headerElem.scrollLeft = scrollLeft;
      }

      if (bodyElem) {
        bodyElem.scrollLeft = scrollLeft;
      }

      if (scrollXLoad) {
        triggerScrollXEvent(evnt);
      }

      UtilTools.emitEvent($table, 'footer-scroll', [{
        fixed: fixedType,
        scrollLeft
      }, evnt]);
    }

  }
});
// CONCATENATED MODULE: ./packages/table-footer/index.js


footer.install = function (Vue) {
  Vue.component(footer.name, footer);
};

const TableFooter = footer;
/* harmony default export */ var table_footer = (footer);
// CONCATENATED MODULE: ./packages/table-filter/src/filter.js

/* harmony default export */ var filter = ({
  name: 'VxeTableFilter',
  props: {
    filterStore: Object,
    optimizeOpts: Object
  },

  render(h) {
    let $table = this.$parent;
    let {
      filterStore,
      optimizeOpts,
      filterCheckAllEvent,
      filterOptionRadioEvent,
      filterOptionCheckEvent
    } = this;
    let {
      multiple
    } = filterStore;
    let filterRens = [h('li', {
      class: ['vxe-table--filter-option', {
        'is--active': !filterStore.options.some(item => item.checked)
      }]
    }, [multiple ? h('label', {
      class: ['vxe-checkbox', {
        'is--indeterminate': filterStore.isIndeterminate
      }]
    }, [h('input', {
      attrs: {
        type: 'checkbox'
      },
      domProps: {
        checked: filterStore.isAllSelected
      },
      on: {
        change(evnt) {
          filterCheckAllEvent(evnt, evnt.target.checked);
        }

      }
    }), h('span', {
      class: ['checkbox--icon']
    }), h('span', {
      class: ['checkbox--label']
    }, conf.i18n('vxe.table.allFilter'))]) : h('span', {
      class: 'vxe-table--filter-label',
      on: {
        click: $table.resetFilterEvent
      }
    }, conf.i18n('vxe.table.allFilter'))])];
    filterStore.options.forEach((item, index) => {
      filterRens.push(h('li', {
        class: ['vxe-table--filter-option', {
          'is--active': item.checked
        }],
        key: index
      }, [multiple ? h('label', {
        class: 'vxe-checkbox'
      }, [h('input', {
        attrs: {
          type: 'checkbox'
        },
        domProps: {
          checked: item.checked
        },
        on: {
          change(evnt) {
            filterOptionCheckEvent(evnt, evnt.target.checked, item);
          }

        }
      }), h('span', {
        class: ['checkbox--icon']
      }), h('span', {
        class: ['checkbox--label']
      }, item.label)]) : h('span', {
        class: 'vxe-table--filter-label',
        on: {
          click(evnt) {
            filterOptionRadioEvent(evnt, !item.checked, item);
          }

        }
      }, item.label)]));
    });
    return h('div', {
      class: ['vxe-table--filter-wrapper', {
        't--animat': optimizeOpts.animat,
        'filter--active': filterStore.visible
      }],
      style: filterStore.style
    }, filterStore.visible ? [h('ul', {
      class: ['vxe-table--filter-body']
    }, filterRens), multiple ? h('div', {
      class: ['vxe-table--filter-footer']
    }, [h('button', {
      class: {
        'is--disabled': !filterStore.isAllSelected && !filterStore.isIndeterminate
      },
      attrs: {
        disabled: !filterStore.isAllSelected && !filterStore.isIndeterminate
      },
      on: {
        click: $table.confirmFilterEvent
      }
    }, conf.i18n('vxe.table.confirmFilter')), h('button', {
      on: {
        click: $table.resetFilterEvent
      }
    }, conf.i18n('vxe.table.resetFilter'))]) : null] : []);
  },

  methods: {
    // 全部筛选事件
    filterCheckAllEvent(evnt, value) {
      let filterStore = this.filterStore;
      filterStore.options.forEach(item => {
        item.checked = value;
      });
      filterStore.isAllSelected = value;
      filterStore.isIndeterminate = false;
    },

    // 筛选选项勾选事件
    filterOptionCheckEvent(evnt, value, item) {
      item.checked = value;
      this.checkOptions();
    },

    // 筛选选项单选事件
    filterOptionRadioEvent(evnt, value, item) {
      this.filterStore.options.forEach(item => {
        item.checked = false;
      });
      item.checked = value;
      this.checkOptions();
      this.$parent.confirmFilterEvent();
    },

    checkOptions() {
      let {
        filterStore
      } = this;
      filterStore.isAllSelected = filterStore.options.every(item => item.checked);
      filterStore.isIndeterminate = !filterStore.isAllSelected && filterStore.options.some(item => item.checked);
    }

  }
});
// CONCATENATED MODULE: ./packages/table-filter/index.js


filter.install = function (Vue) {
  Vue.component(filter.name, filter);
};

const TableFilter = filter;
/* harmony default export */ var table_filter = (filter);
// CONCATENATED MODULE: ./packages/table/src/func.js
/**
 * 所有方法
 */
/* harmony default export */ var func = (['loadData', 'reloadData', 'loadColumn', 'reloadColumn', 'reloadCustoms', 'reload', 'insert', 'insertAt', 'revert', 'remove', 'removeSelecteds', 'getRecords', 'getRowIndex', 'getColumns', 'getColumnIndex', 'getAllRecords', 'getInsertRecords', 'getRemoveRecords', 'getUpdateRecords', 'getSelectRecords', 'hasRowChange', 'setActiveRow', 'setActiveCell', 'setSelectCell', 'setRowExpansion', 'setAllRowExpansion', 'setTreeExpansion', 'setAllTreeExpansion', 'setCurrentRow', 'setSelection', 'setAllSelection', 'toggleRowSelection', 'toggleAllSelection', 'toggleRowExpansion', 'toggleTreeExpansion', 'clearCurrentRow', 'clearSelection', 'clearRowExpand', 'clearTreeExpand', 'clearSort', 'clearFilter', 'clearChecked', 'clearSelected', 'clearActivedd', 'clearCopyed', 'clearData', 'clearScroll', 'clearAll', 'closeFilter', 'clostTooltip', 'closeContextMenu', 'recalculate', 'refreshColumn', 'updateStatus', 'isScrollXLoad', 'isScrollYLoad', 'sort', 'validate', 'exportCsv']);
// CONCATENATED MODULE: ./packages/grid/src/grid.js





const methods = {};
const propKeys = Object.keys(src_props);
func.forEach(name => {
  methods[name] = function () {
    return this.$refs.xTable[name].apply(this.$refs.xTable[name], arguments);
  };
});
/* harmony default export */ var grid = ({
  name: 'VxeGrid',
  props: {
    columns: Array,
    pagerConfig: Object,
    proxyConfig: Object,
    toolbar: Object,
    ...src_props
  },

  provide() {
    return {
      $grid: this
    };
  },

  data() {
    return {
      tableLoading: false,
      tableData: [],
      tableCustoms: [],
      pendingRecords: [],
      filterData: {},
      sortData: {
        prop: '',
        order: ''
      },
      tablePage: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    };
  },

  computed: {
    vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },

    isAlert() {
      return this.proxyConfig && this.proxyConfig.message !== false;
    },

    tableProps() {
      let rest = {};
      propKeys.forEach(key => {
        rest[key] = this[key];
      });
      return rest;
    }

  },
  watch: {
    columns(value) {
      this.loadColumn(value);
    }

  },

  created() {
    let {
      customs,
      pagerConfig
    } = this;

    if (customs) {
      this.tableCustoms = customs;
    }

    if (pagerConfig && pagerConfig.pageSize) {
      this.tablePage.pageSize = pagerConfig.pageSize;
    }
  },

  mounted() {
    let {
      columns,
      proxyConfig
    } = this;

    if (columns && columns.length) {
      this.loadColumn(this.columns);
    }

    if (proxyConfig && proxyConfig.autoLoad !== false) {
      this.commitProxy('query');
    }
  },

  render(h) {
    let {
      $slots,
      $listeners,
      pagerConfig,
      vSize,
      loading,
      toolbar,
      editConfig,
      proxyConfig,
      tableProps,
      tableLoading,
      tablePage,
      tableData,
      tableCustoms,
      optimization
    } = this;
    let props = Object.assign({}, tableProps, {
      optimization: Object.assign({}, conf.optimization, optimization)
    });
    let tableOns = Object.assign({}, $listeners);

    if (proxyConfig) {
      Object.assign(props, {
        loading: loading || tableLoading,
        data: tableData,
        rowClassName: this.handleRowClassName
      });

      if (proxyConfig.index && pagerConfig) {
        props.startIndex = (tablePage.currentPage - 1) * tablePage.pageSize;
      }

      if (proxyConfig.sort) {
        tableOns['sort-change'] = this.sortChangeEvent;
      }

      if (proxyConfig.filter) {
        tableOns['filter-change'] = this.filterChangeEvent;
      }
    }

    if (toolbar) {
      if (!(toolbar.setting && toolbar.setting.storage)) {
        props.customs = tableCustoms;
      }

      tableOns['update:customs'] = value => {
        this.tableCustoms = value;
      };
    }

    if (editConfig) {
      props.editConfig = Object.assign({}, editConfig, {
        activeMethod: this.handleActiveMethod
      });
    }

    return h('div', {
      class: ['vxe-grid', {
        [`size--${vSize}`]: vSize,
        't--animat': props.optimization.animat
      }]
    }, [toolbar ? h('vxe-toolbar', {
      ref: 'toolbar',
      props: toolbar
    }) : null, h('vxe-table', {
      props,
      on: tableOns,
      ref: 'xTable'
    }, $slots.default), pagerConfig ? h('vxe-pager', {
      props: Object.assign({
        size: vSize,
        loading: loading || tableLoading
      }, pagerConfig, proxyConfig ? tablePage : {}),
      on: {
        'current-change': this.currentChangeEvent,
        'size-change': this.sizeChangeEvent
      }
    }) : null]);
  },

  methods: { ...methods,

    handleRowClassName({
      row
    }) {
      if (this.pendingRecords.some(item => item === row)) {
        return 'row--pending';
      }

      return '';
    },

    handleActiveMethod({
      row
    }) {
      return this.pendingRecords.indexOf(row) === -1;
    },

    commitProxy(code) {
      let {
        proxyConfig = {},
        tablePage,
        pagerConfig,
        sortData,
        filterData,
        isAlert
      } = this;
      let {
        ajax,
        props = {}
      } = proxyConfig;

      if (ajax) {
        switch (code) {
          case 'reload':
          case 'query':
            {
              if (ajax.query) {
                let params = {
                  sort: sortData,
                  filter: filterData
                };
                this.tableLoading = true;

                if (pagerConfig) {
                  params.page = tablePage;
                }

                if (code === 'reload') {
                  if (pagerConfig) {
                    tablePage.currentPage = 1;
                  }

                  this.pendingRecords = [];
                }

                return ajax.query(params).then(result => {
                  if (result) {
                    if (pagerConfig) {
                      tablePage.total = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(result, props.total || 'page.total');
                      this.tableData = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(result, props.data || 'result');
                    } else {
                      this.tableData = props.data ? external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(result, props.data) : result;
                    }
                  } else {
                    this.tableData = [];
                  }

                  this.tableLoading = false;
                }).catch(e => {
                  this.tableLoading = false;
                });
              }

              break;
            }

          case 'delete':
            {
              if (ajax.delete) {
                let selectRecords = this.getSelectRecords();
                this.remove(selectRecords).then(() => {
                  let removeRecords = this.getRemoveRecords();
                  let body = {
                    removeRecords
                  };

                  if (removeRecords.length) {
                    this.tableLoading = true;
                    return ajax.delete({
                      body
                    }).then(result => {
                      this.tableLoading = false;
                    }).catch(e => {
                      this.tableLoading = false;
                    }).then(() => this.commitProxy('reload'));
                  } else {
                    if (isAlert && !selectRecords.length) {
                      this.$XMsg.alert(conf.i18n('vxe.grid.selectOneRecord')).catch(e => e);
                    }
                  }
                });
              }

              break;
            }

          case 'save':
            {
              if (ajax.save) {
                let body = Object.assign({
                  pendingRecords: this.pendingRecords
                }, this.getAllRecords());
                let {
                  insertRecords,
                  removeRecords,
                  updateRecords,
                  pendingRecords
                } = body; // 排除掉新增且标记为删除的数据

                if (insertRecords.length) {
                  body.pendingRecords = pendingRecords.filter(row => insertRecords.indexOf(row) === -1);
                } // 排除已标记为删除的数据


                if (pendingRecords.length) {
                  body.insertRecords = insertRecords.filter(row => pendingRecords.indexOf(row) === -1);
                } // 只校验新增和修改的数据


                return new Promise(resolve => {
                  this.validate(body.insertRecords.concat(updateRecords), vaild => {
                    if (vaild) {
                      if (body.insertRecords.length || removeRecords.length || updateRecords.length || body.pendingRecords.length) {
                        this.tableLoading = true;
                        resolve(ajax.save({
                          body
                        }).then(() => {
                          this.tableLoading = false;
                        }).catch(e => {
                          this.tableLoading = false;
                        }).then(() => this.commitProxy('reload')));
                      } else {
                        if (isAlert) {
                          // 直接移除未保存且标记为删除的数据
                          if (pendingRecords.length) {
                            this.remove(pendingRecords);
                          } else {
                            this.$XMsg.alert(conf.i18n('vxe.grid.dataUnchanged')).catch(e => e);
                          }
                        }

                        resolve();
                      }
                    } else {
                      resolve(vaild);
                    }
                  });
                });
              }

              break;
            }
        }
      }

      return this.$nextTick();
    },

    getPendingRecords() {
      return this.pendingRecords;
    },

    triggerPendingEvent(evnt) {
      let {
        pendingRecords,
        isAlert
      } = this;
      let selectRecords = this.getSelectRecords();

      if (selectRecords.length) {
        let plus = [];
        let minus = [];
        selectRecords.forEach(data => {
          if (pendingRecords.some(item => data === item)) {
            minus.push(data);
          } else {
            plus.push(data);
          }
        });

        if (minus.length) {
          this.pendingRecords = pendingRecords.filter(item => minus.indexOf(item) === -1).concat(plus);
        } else if (plus.length) {
          this.pendingRecords = pendingRecords.concat(plus);
        }

        this.clearSelection();
      } else {
        if (isAlert) {
          this.$XMsg.alert(conf.i18n('vxe.grid.selectOneRecord')).catch(e => e);
        }
      }
    },

    currentChangeEvent(currentPage) {
      this.tablePage.currentPage = currentPage;
      this.commitProxy('query');
      UtilTools.emitEvent(this, 'current-page-change', [currentPage]);
    },

    sizeChangeEvent(pageSize) {
      this.tablePage.currentPage = 1;
      this.tablePage.pageSize = pageSize;
      this.commitProxy('reload');
      UtilTools.emitEvent(this, 'page-size-change', [pageSize]);
    },

    sortChangeEvent({
      column,
      prop,
      order
    }) {
      let {
        sortData
      } = this; // 如果是服务端排序

      if (column.remoteSort) {
        sortData.prop = prop;
        sortData.order = order;
        this.commitProxy('query');
      } else {
        UtilTools.emitEvent(this, 'sort-change', [column, prop, order]);
      }
    },

    filterChangeEvent({
      column,
      prop,
      values
    }) {
      // 如果是服务端过滤
      if (column.remoteFilter) {
        this.filterData[prop] = values;
        this.commitProxy('reload');
      } else {
        UtilTools.emitEvent(this, 'filter-change', [column, prop, values]);
      }
    }

  }
});
// CONCATENATED MODULE: ./packages/grid/index.js


grid.install = function (Vue) {
  Vue.component(grid.name, grid);
};

const Grid = grid;
/* harmony default export */ var packages_grid = (grid);
// CONCATENATED MODULE: ./packages/excel/src/excel.js


const excelContextMenu = {
  header: {
    options: [[{
      code: 'exportAll',
      name: '隐藏列'
    }, {
      code: 'exportAll',
      name: '取消所有隐藏'
    }]]
  },
  body: {
    options: [[{
      code: 'clip',
      name: '剪贴'
    }, {
      code: 'copy',
      name: '复制'
    }, {
      code: 'paste',
      name: '粘贴'
    }], [{
      code: 'insert',
      name: '插入'
    }, {
      code: 'remove',
      name: '删除'
    }, {
      code: 'clearData',
      name: '清除内容'
    }], [// {
    //   code: 'filter',
    //   name: '筛选',
    //   children: [
    //     {
    //       code: 'clearFilter',
    //       name: '清除筛选'
    //     },
    //     {
    //       code: 'filterSelect',
    //       name: '按所选单元格的值筛选'
    //     }
    //   ]
    // },
    {
      code: 'sort',
      name: '排序',
      children: [{
        code: 'clearSort',
        name: '清除排序'
      }, {
        code: 'sortAsc',
        name: '升序'
      }, {
        code: 'sortDesc',
        name: '倒序'
      }]
    }], [{
      code: 'exportAll',
      name: '导出数据.csv'
    }]]
  }
};
const excel_methods = {};
const excelEditConfig = {
  trigger: 'dblclick',
  mode: 'cell',
  showIcon: false,
  showStatus: false
};

function buildColumns(h, columns) {
  return columns ? columns.map(props => h('vxe-table-column', {
    props
  }, buildColumns(h, props.children))) : [];
}

function buildProps(h, _vm, props = {}) {
  let {
    editConfig,
    contextMenu
  } = props;
  return Object.assign({}, props, {
    border: true,
    resizable: true,
    showAllOverflow: null,
    headerCellClassName: _vm.handleHeaderCellClassName,
    cellClassName: _vm.handleCellClassName,
    contextMenu: Object.assign({}, contextMenu, excelContextMenu),
    mouseConfig: {
      selected: true,
      checked: true
    },
    keyboardConfig: {
      isArrow: true,
      isDel: true,
      isTab: true,
      isCut: true,
      isEdit: true
    },
    editConfig: editConfig ? Object.assign({}, excelEditConfig, editConfig) : excelEditConfig
  });
}

func.forEach(name => {
  excel_methods[name] = function () {
    return this.$refs.xTable[name].apply(this.$refs.xTable[name], arguments);
  };
});
/* harmony default export */ var excel = ({
  name: 'VxeExcel',
  props: {
    columns: Array,
    ...src_props
  },

  data() {
    return {
      excelStore: {
        uploadRows: []
      }
    };
  },

  render(h) {
    return h('vxe-table', {
      class: 'vxe-excel',
      props: buildProps(h, this, this.$props),
      on: { ...this.$listeners,
        'cell-click': this.cellClickEvent,
        'header-cell-click': this.headerCellClickEvent,
        'context-menu-click': this.contextMenuClickEvent
      },
      ref: 'xTable'
    }, buildColumns(h, this.columns));
  },

  methods: { ...excel_methods,

    handleHeaderCellClassName({
      column,
      columnIndex,
      $table
    }) {
      let {
        editStore
      } = $table;
      let {
        selected,
        actived
      } = editStore;

      if (columnIndex > 0) {
        if (selected.column === column || actived.column === column) {
          return 'vxe-excel--column-selected';
        }
      }
    },

    handleCellClassName({
      row,
      column,
      columnIndex,
      $table
    }) {
      let {
        editStore
      } = $table;
      let {
        selected,
        actived
      } = editStore;

      if (columnIndex === 0) {
        if (selected.row === row || actived.row === row) {
          return 'vxe-excel--index-selected';
        }
      }
    },

    cellClickEvent({
      row,
      rowIndex,
      columnIndex,
      $table
    }, evnt) {
      let {
        $refs,
        visibleColumn,
        handleSelected,
        handleChecked
      } = $table;

      if (columnIndex === 0) {
        columnIndex += 1;
        let tableBodyElem = $refs.tableBody.$el;
        let column = visibleColumn[columnIndex];
        let trElemList = tableBodyElem.querySelectorAll('.vxe-body--row');
        let trElem = trElemList[rowIndex];
        let cell = trElem.querySelector(`.${column.id}`);
        handleSelected({
          row,
          rowIndex,
          column,
          columnIndex,
          cell,
          $table
        }, evnt).then(() => {
          handleChecked({
            rowIndex,
            columnIndex
          }, {
            rowIndex,
            columnIndex: visibleColumn.length - 1
          }, evnt);
        });
      }
    },

    headerCellClickEvent({
      column,
      columnIndex,
      $table
    }, evnt) {
      let {
        $refs,
        tableData,
        handleSelected,
        handleChecked
      } = $table;

      if (tableData.length) {
        let tableBodyElem = $refs.tableBody.$el;
        let rowIndex = 0;
        let row = tableData[rowIndex];
        let trElemList = tableBodyElem.querySelectorAll('.vxe-body--row');
        let trElem = trElemList[rowIndex];
        let cell = trElem.querySelector(`.${column.id}`);
        handleSelected({
          row,
          rowIndex,
          column,
          columnIndex,
          cell,
          $table
        }, evnt).then(() => {
          handleChecked({
            rowIndex,
            columnIndex
          }, {
            rowIndex: tableData.length - 1,
            columnIndex
          }, evnt);
        });
      }
    },

    contextMenuClickEvent({
      menu,
      row,
      column
    }, evnt) {
      let $table = this.$refs.xTable;
      let {
        property
      } = column;

      switch (menu.code) {
        case 'clip':
          $table.handleCopyed(true, evnt);
          break;

        case 'copy':
          $table.handleCopyed(false, evnt);
          break;

        case 'paste':
          $table.handlePaste(evnt);
          break;

        case 'insert':
          $table.insertAt({}, row);
          break;

        case 'remove':
          $table.remove(row);
          break;

        case 'clearData':
          $table.clearData(row, property);
          break;

        case 'clearFilter':
          $table.clearFilter();
          break;

        case 'clearSort':
          $table.clearSort();
          break;

        case 'sortAsc':
          $table.sort(property, 'asc');
          break;

        case 'sortDesc':
          $table.sort(property, 'desc');
          break;

        case 'exportAll':
          $table.exportCsv({
            isHeader: false
          });
          break;
      }
    }

  }
});
// CONCATENATED MODULE: ./packages/excel/index.js


excel.install = function (Vue) {
  Vue.component(excel.name, excel);
};

const Excel = excel;
/* harmony default export */ var packages_excel = (excel);
// CONCATENATED MODULE: ./packages/context-menu/src/menu.js
/* harmony default export */ var src_menu = ({
  name: 'VxeTableContextMenu',
  props: {
    ctxMenuStore: Object
  },

  render(h) {
    let $table = this.$parent;
    let {
      _e,
      ctxMenuStore
    } = this;
    return h('div', {
      class: ['vxe-table--ctxmenu-wrapper', {
        show: ctxMenuStore.visible
      }],
      style: ctxMenuStore.style
    }, ctxMenuStore.list.map((options, gIndex) => {
      return h('ul', {
        class: ['vxe-ctxmenu--option-wrapper'],
        key: gIndex
      }, options.map((item, index) => {
        let hasChild = item.children && item.children.length;
        return h('li', {
          class: [{
            'link--disabled': item.disabled,
            'link--active': item === ctxMenuStore.selected
          }],
          key: `${gIndex}_${index}`
        }, [h('a', {
          class: ['vxe-ctxmenu--link'],
          on: {
            click(evnt) {
              $table.ctxMenuLinkEvent(evnt, item);
            },

            mouseover(evnt) {
              $table.ctxMenuMouseoverEvent(evnt, item);
            },

            mouseout(evnt) {
              $table.ctxMenuMouseoutEvent(evnt, item);
            }

          }
        }, [h('i', {
          class: ['vxe-ctxmenu--link-prefix', item.prefixIcon]
        }), h('span', {
          class: ['vxe-ctxmenu--link-content']
        }, item.name), h('i', {
          class: ['vxe-ctxmenu--link-suffix', hasChild ? item.suffixIcon || 'suffix--haschild' : item.suffixIcon]
        })]), hasChild ? h('ul', {
          class: ['vxe-table--ctxmenu-clild-wrapper', {
            show: item === ctxMenuStore.selected && ctxMenuStore.showChild
          }]
        }, item.children.map((child, cIndex) => {
          return h('li', {
            class: [{
              'link--disabled': child.disabled,
              'link--active': child === ctxMenuStore.selectChild
            }],
            key: `${gIndex}_${index}_${cIndex}`
          }, [h('a', {
            class: ['vxe-ctxmenu--link'],
            on: {
              click(evnt) {
                $table.ctxMenuLinkEvent(evnt, child);
              },

              mouseover(evnt) {
                $table.ctxMenuMouseoverEvent(evnt, item, child);
              },

              mouseout(evnt) {
                $table.ctxMenuMouseoutEvent(evnt, item, child);
              }

            }
          }, [h('i', {
            class: ['vxe-ctxmenu--link-prefix', child.prefixIcon]
          }), h('span', {
            class: ['vxe-ctxmenu--link-content']
          }, child.name)])]);
        })) : _e()]);
      }));
    }));
  }

});
// CONCATENATED MODULE: ./packages/context-menu/index.js


src_menu.install = function (Vue) {
  Vue.component(src_menu.name, src_menu);
};

const TableContextMenu = src_menu;
/* harmony default export */ var context_menu = (src_menu);
// CONCATENATED MODULE: ./packages/toolbar/src/toolbar.js



/* harmony default export */ var src_toolbar = ({
  name: 'VxeToolbar',
  props: {
    id: String,
    setting: {
      type: [Boolean, Object],
      default: () => conf.toolbar.setting
    },
    buttons: {
      type: Array,
      default: () => conf.toolbar.buttons
    },
    size: String,
    data: Array,
    customs: Array
  },
  inject: {
    $grid: {
      default: null
    }
  },

  data() {
    return {
      tableCustoms: [],
      settingStore: {
        visible: false
      }
    };
  },

  computed: {
    $table() {
      let {
        $parent,
        data
      } = this;
      let {
        $children
      } = $parent;
      let selfIndex = $children.indexOf(this);
      return $children.find((comp, index) => comp && comp.refreshColumn && index > selfIndex && (data ? comp.data === data : comp.$vnode.componentOptions.tag === 'vxe-table'));
    },

    vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },

    isStorage() {
      return this.setting && this.setting.storage;
    },

    storageKey() {
      return conf.toolbar.storageKey || 'VXE_TABLE_CUSTOM_HIDDEN';
    }

  },

  created() {
    let {
      isStorage,
      id,
      customs,
      setting
    } = this;

    if (customs) {
      this.tableCustoms = customs;
    }

    if (isStorage && !id) {
      throw new Error('[vxe-table] Toolbar must have a unique primary id.');
    }

    if (setting) {
      this.$nextTick(() => this.loadStorage());
    }

    GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent);
    GlobalEvent.on(this, 'blur', this.handleGlobalBlurEvent);
  },

  destroyed() {
    GlobalEvent.off(this, 'mousedown');
    GlobalEvent.off(this, 'blur');
  },

  render(h) {
    let {
      $slots,
      settingStore,
      setting,
      buttons = [],
      vSize,
      tableCustoms
    } = this;
    let customBtnOns = {};
    let customWrapperOns = {};

    if (setting) {
      if (setting.trigger === 'manual') {// 手动触发
      } else if (setting.trigger === 'hover') {
        // hover 触发
        customBtnOns.mouseenter = this.handleMouseenterSettingEvent;
        customBtnOns.mouseleave = this.handleMouseleaveSettingEvent;
        customWrapperOns.mouseenter = this.handleWrapperMouseenterEvent;
        customWrapperOns.mouseleave = this.handleWrapperMouseleaveEvent;
      } else {
        // 点击触发
        customBtnOns.click = this.handleClickSettingEvent;
      }
    }

    return h('div', {
      class: ['vxe-toolbar', {
        [`size--${vSize}`]: vSize
      }]
    }, [h('div', {
      class: 'vxe-button--wrapper'
    }, $slots.buttons ? $slots.buttons : buttons.map(item => {
      return h('vxe-button', {
        on: {
          click: evnt => this.btnEvent(item, evnt)
        }
      }, external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isFunction(item.name) ? item.name() : item.name);
    })), setting ? h('div', {
      class: ['vxe-custom--wrapper', {
        'is--active': settingStore.visible
      }],
      ref: 'customWrapper'
    }, [h('div', {
      class: 'vxe-custom--setting-btn',
      on: customBtnOns
    }, [h('i', {
      class: 'vxe-icon--menu'
    })]), h('div', {
      class: 'vxe-custom--option-wrapper'
    }, [h('div', {
      class: 'vxe-custom--option',
      on: customWrapperOns
    }, tableCustoms.map(column => {
      return column.property && column.label ? h('vxe-checkbox', {
        props: {
          value: column.visible
        },
        on: {
          change: value => {
            column.visible = value;

            if (setting && setting.immediate) {
              this.updateSetting();
            }
          }
        }
      }, column.label) : null;
    }))])]) : null]);
  },

  methods: {
    openSetting() {
      this.settingStore.visible = true;
    },

    closeSetting() {
      let {
        setting,
        settingStore
      } = this;

      if (settingStore.visible) {
        settingStore.visible = false;

        if (setting && !setting.immediate) {
          this.updateSetting();
        }
      }
    },

    loadStorage() {
      if (this.isStorage) {
        let customStorageMap = this.getStorageMap();
        let customStorage = customStorageMap[this.id];

        if (customStorage) {
          this.updateCustoms(customStorage.split(',').map(prop => ({
            prop,
            visible: false
          })));
        } else {
          this.updateCustoms(this.tableCustoms);
        }
      } else {
        this.updateCustoms(this.tableCustoms);
      }
    },

    updateCustoms(customs) {
      let {
        $grid,
        $table
      } = this;
      let comp = $grid || $table;

      if (comp) {
        comp.reloadCustoms(customs).then(customs => {
          this.tableCustoms = customs;
        });
      }
    },

    getStorageMap() {
      let version = conf.version;
      let rest = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.toStringJSON(localStorage.getItem(this.storageKey));
      return rest && rest._v === version ? rest : {
        _v: version
      };
    },

    saveStorageMap() {
      let {
        id,
        tableCustoms,
        isStorage,
        storageKey
      } = this;

      if (isStorage) {
        let customStorageMap = this.getStorageMap();
        customStorageMap[id] = tableCustoms.filter(column => !column.visible).map(column => column.property).join(',') || undefined;
        localStorage.setItem(storageKey, external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.toJSONString(customStorageMap));
      }
    },

    updateSetting() {
      let {
        $grid,
        $table
      } = this;

      if ($grid) {
        $grid.refreshColumn();
        this.saveStorageMap();
      } else {
        if ($table) {
          $table.refreshColumn();
          this.saveStorageMap();
        } else {
          console.error('[vxe-toolbar] Not found vxe-table.');
        }
      }
    },

    handleGlobalMousedownEvent(evnt) {
      if (!DomTools.getEventTargetNode(evnt, this.$refs.customWrapper).flag) {
        this.closeSetting();
      }
    },

    handleGlobalBlurEvent(evnt) {
      this.closeSetting();
    },

    handleClickSettingEvent(evnt) {
      let {
        settingStore
      } = this;
      settingStore.visible = !settingStore.visible;
    },

    handleMouseenterSettingEvent(evnt) {
      this.settingStore.activeBtn = true;
      this.openSetting();
    },

    handleMouseleaveSettingEvent(evnt) {
      let {
        settingStore
      } = this;
      settingStore.activeBtn = false;
      setTimeout(() => {
        if (!settingStore.activeBtn && !settingStore.activeWrapper) {
          this.closeSetting();
        }
      }, 300);
    },

    handleWrapperMouseenterEvent(evnt) {
      this.settingStore.activeWrapper = true;
      this.openSetting();
    },

    handleWrapperMouseleaveEvent(evnt) {
      let {
        settingStore
      } = this;
      settingStore.activeWrapper = false;
      setTimeout(() => {
        if (!settingStore.activeBtn && !settingStore.activeWrapper) {
          this.closeSetting();
        }
      }, 300);
    },

    btnEvent(item, evnt) {
      let {
        $grid
      } = this; // 只对 gird 环境中有效

      if ($grid) {
        switch (item.code) {
          case 'insert':
            $grid.insert();
            break;

          case 'insert_actived':
            $grid.insert().then(({
              row
            }) => $grid.setActiveRow(row));
            break;

          case 'mark_cancel':
            $grid.triggerPendingEvent(evnt);
            break;

          case 'delete_selection':
            {
              this.handleDeleteRow($grid, 'vxe.grid.deleteSelectRecord', () => $grid.commitProxy('delete'));
              break;
            }

          case 'remove_selection':
            {
              this.handleDeleteRow($grid, 'vxe.grid.removeSelectRecord', () => $grid.removeSelecteds());
              break;
            }

          case 'save':
            $grid.commitProxy('save');
            break;

          case 'reload':
            $grid.commitProxy('reload');
            break;

          case 'export':
            $grid.exportCsv();
            break;
        }

        UtilTools.emitEvent($grid, 'toolbar-button-click', [{
          button: item,
          $grid
        }, evnt]);
      }
    },

    handleDeleteRow($grid, alertKey, callback) {
      let selectRecords = $grid.getSelectRecords();

      if ($grid.isAlert) {
        if (selectRecords.length) {
          this.$XMsg.confirm(conf.i18n(alertKey)).then(callback).catch(e => e);
        } else {
          this.$XMsg.alert(conf.i18n('vxe.grid.selectOneRecord')).catch(e => e);
        }
      } else {
        if (selectRecords.length) {
          callback();
        }
      }
    }

  }
});
// CONCATENATED MODULE: ./packages/toolbar/index.js


src_toolbar.install = function (Vue) {
  Vue.component(src_toolbar.name, src_toolbar);
};

const Toolbar = src_toolbar;
/* harmony default export */ var packages_toolbar = (src_toolbar);
// CONCATENATED MODULE: ./packages/pager/src/pager.js



/* harmony default export */ var pager = ({
  name: 'VxePager',
  props: {
    size: String,
    // 自定义布局
    layouts: {
      type: Array,
      default: () => conf.pager.layouts || ['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total']
    },
    // 当前页
    currentPage: {
      type: Number,
      default: 1
    },
    // 加载中
    loading: Boolean,
    // 每页大小
    pageSize: {
      type: Number,
      default: () => conf.pager.pageSize || 10
    },
    // 总条数
    total: {
      type: Number,
      default: 0
    },
    // 显示页码按钮的数量
    pagerCount: {
      type: Number,
      default: () => conf.pager.pagerCount || 7
    },
    // 每页大小选项列表
    pageSizes: {
      type: Array,
      default: () => conf.pager.pageSizes || [10, 15, 20, 50, 100]
    },
    // 带背景颜色
    background: Boolean
  },
  inject: {
    $grid: {
      default: null
    }
  },

  data() {
    return {
      showSizes: false,
      panelStyle: null
    };
  },

  computed: {
    vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },

    isSizes() {
      return this.layouts.some(name => name === 'Sizes');
    },

    pageCount() {
      return Math.max(Math.ceil(this.total / this.pageSize), 1);
    },

    numList() {
      return Array.from(new Array(this.pageCount > this.pagerCount ? this.pagerCount - 2 : this.pagerCount));
    },

    offsetNumber() {
      return Math.floor((this.pagerCount - 2) / 2);
    }

  },

  created() {
    GlobalEvent.on(this, 'mousedown', this.handleGlobalMousedownEvent);
  },

  mounted() {
    let sizePanel = this.$refs.sizePanel;

    if (sizePanel) {
      document.body.appendChild(this.$refs.sizePanel);
    }
  },

  beforeDestroy() {
    let sizePanel = this.$refs.sizePanel;

    if (sizePanel && sizePanel.parentNode) {
      sizePanel.parentNode.removeChild(sizePanel);
    }
  },

  destroyed() {
    GlobalEvent.off(this, 'mousedown');
  },

  render(h) {
    let {
      layouts,
      isSizes,
      loading,
      vSize,
      background
    } = this;
    return h('div', {
      class: ['vxe-pager', {
        [`size--${vSize}`]: vSize,
        'p--background': background,
        'is--loading': loading
      }]
    }, layouts.map(name => this[`render${name}`](h)).concat(isSizes ? this.renderSizePanel(h) : []));
  },

  methods: {
    // prevPage
    renderPrevPage(h) {
      let {
        currentPage
      } = this;
      return h('span', {
        class: ['vxe-pager--prev-btn', {
          'is--disabled': currentPage <= 1
        }],
        on: {
          click: this.prevPageEvent
        }
      }, [h('i', {
        class: ['vxe-icon--page-icon', conf.iconMap.prevPage]
      })]);
    },

    // prevJump
    renderPrevJump(h, tagName) {
      let {
        numList,
        currentPage
      } = this;
      return h(tagName || 'span', {
        class: ['vxe-pager--jump-prev', {
          'is--fixed': !tagName,
          'is--disabled': currentPage <= 1
        }],
        on: {
          click: () => this.jumpPageEvent(Math.max(currentPage - numList.length, 1))
        }
      }, [tagName ? h('i', {
        class: 'vxe-pager--jump-more vxe-icon--more'
      }) : null, h('i', {
        class: ['vxe-pager--jump-icon', conf.iconMap.jumpPrev]
      })]);
    },

    // number
    renderNumber(h) {
      return h('ul', {
        class: 'vxe-pager--btn-wrapper'
      }, this.renderPageBtn(h));
    },

    // jumpNumber
    renderJumpNumber(h) {
      return h('ul', {
        class: 'vxe-pager--btn-wrapper'
      }, this.renderPageBtn(h, true));
    },

    // nextJump
    renderNextJump(h, tagName) {
      let {
        numList,
        currentPage,
        pageCount
      } = this;
      return h(tagName || 'span', {
        class: ['vxe-pager--jump-next', {
          'is--fixed': !tagName,
          'is--disabled': currentPage >= pageCount
        }],
        on: {
          click: () => this.jumpPageEvent(Math.min(currentPage + numList.length, pageCount))
        }
      }, [tagName ? h('i', {
        class: 'vxe-pager--jump-more vxe-icon--more'
      }) : null, h('i', {
        class: ['vxe-pager--jump-icon', conf.iconMap.jumpNext]
      })]);
    },

    // nextPage
    renderNextPage(h) {
      let {
        currentPage,
        pageCount
      } = this;
      return h('span', {
        class: ['vxe-pager--next-btn', {
          'is--disabled': currentPage >= pageCount
        }],
        on: {
          click: this.nextPageEvent
        }
      }, [h('i', {
        class: ['vxe-icon--page-icon', conf.iconMap.nextPage]
      })]);
    },

    // sizes
    renderSizes(h) {
      let {
        pageSize
      } = this;
      return h('span', {
        class: ['vxe-pager--sizes', {
          'is--active': this.showSizes
        }],
        on: {
          click: this.toggleSizePanel
        },
        ref: 'sizeBtn'
      }, [h('i', {
        class: 'vxe-pager--sizes-arrow vxe-icon--caret-bottom'
      }), h('span', {
        class: 'size--content'
      }, `${pageSize}${conf.i18n('vxe.pager.pagesize')}`)]);
    },

    // 分页面板
    renderSizePanel(h) {
      let {
        panelStyle,
        pageSize,
        pageSizes,
        showSizes
      } = this;
      return h('ul', {
        class: ['vxe-pager-size--select', {
          'is--show': showSizes
        }],
        style: panelStyle,
        ref: 'sizePanel'
      }, pageSizes.map(num => {
        return h('li', {
          class: ['size--option', {
            'is--active': num === pageSize
          }],
          on: {
            click: () => this.sizeChangeEvent(num)
          }
        }, `${num}${conf.i18n('vxe.pager.pagesize')}`);
      }));
    },

    // FullJump
    renderFullJump(h) {
      return this.renderJump(h, true);
    },

    // Jump
    renderJump(h, isFull) {
      let {
        currentPage,
        pageCount
      } = this;
      return h('span', {
        class: 'vxe-pager--jump'
      }, [isFull ? h('span', {
        class: 'vxe-pager--goto-text'
      }, conf.i18n('vxe.pager.goto')) : null, h('input', {
        class: 'vxe-pager--goto',
        domProps: {
          value: currentPage
        },
        attrs: {
          type: 'text',
          autocomplete: 'off'
        },
        on: {
          keydown: evnt => {
            if (evnt.keyCode === 13) {
              let value = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.toNumber(evnt.target.value);
              let current = value <= 0 ? 1 : value >= pageCount ? pageCount : value;
              evnt.target.value = current;
              this.jumpPageEvent(current);
            } else if (evnt.keyCode === 38) {
              evnt.preventDefault();
              this.nextPageEvent(evnt);
            } else if (evnt.keyCode === 40) {
              evnt.preventDefault();
              this.prevPageEvent(evnt);
            }
          }
        }
      }), isFull ? h('span', {
        class: 'vxe-pager--classifier-text'
      }, conf.i18n('vxe.pager.pageClassifier')) : null]);
    },

    // PageCount
    renderPageCount(h) {
      let {
        pageCount
      } = this;
      return h('span', {
        class: 'vxe-pager--count'
      }, [h('span', {
        class: 'vxe-pager--separator'
      }, '/'), h('span', pageCount)]);
    },

    // total
    renderTotal(h) {
      let {
        total
      } = this;
      return h('span', {
        class: 'vxe-pager--total'
      }, external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.template(conf.i18n('vxe.pager.total'), {
        total
      }));
    },

    // number
    renderPageBtn(h, showJump) {
      let {
        numList,
        currentPage,
        pageCount,
        pagerCount,
        offsetNumber
      } = this;
      let nums = [];
      let isOv = pageCount > pagerCount;
      let isLt = isOv && currentPage > offsetNumber + 1;
      let isGt = isOv && currentPage < pageCount - offsetNumber;
      let startNumber = 1;

      if (isOv) {
        if (currentPage >= pageCount - offsetNumber) {
          startNumber = Math.max(pageCount - numList.length + 1, 1);
        } else {
          startNumber = Math.max(currentPage - offsetNumber, 1);
        }
      }

      if (showJump && isLt) {
        nums.push(h('li', {
          class: 'vxe-pager--num-btn',
          on: {
            click: () => this.jumpPageEvent(1)
          }
        }, 1), this.renderPrevJump(h, 'li'));
      }

      numList.forEach((item, index) => {
        let number = startNumber + index;

        if (number <= pageCount) {
          nums.push(h('li', {
            class: ['vxe-pager--num-btn', {
              'is--active': currentPage === number
            }],
            on: {
              click: () => this.jumpPageEvent(number)
            },
            key: number
          }, number));
        }
      });

      if (showJump && isGt) {
        nums.push(this.renderNextJump(h, 'li'), h('li', {
          class: 'vxe-pager--num-btn',
          on: {
            click: () => this.jumpPageEvent(pageCount)
          }
        }, pageCount));
      }

      return nums;
    },

    handleGlobalMousedownEvent(evnt) {
      if (this.showSizes && !(DomTools.getEventTargetNode(evnt, this.$refs.sizeBtn).flag || DomTools.getEventTargetNode(evnt, this.$refs.sizePanel).flag)) {
        this.hideSizePanel();
      }
    },

    prevPageEvent() {
      let {
        currentPage
      } = this;

      if (currentPage > 1) {
        this.jumpPageEvent(Math.max(currentPage - 1, 1));
      }
    },

    nextPageEvent() {
      let {
        currentPage,
        pageCount
      } = this;

      if (currentPage < pageCount) {
        this.jumpPageEvent(Math.min(currentPage + 1, pageCount));
      }
    },

    jumpPageEvent(currentPage) {
      if (currentPage !== this.currentPage) {
        this.$emit('update:currentPage', currentPage);
        UtilTools.emitEvent(this, 'current-change', [currentPage]);
      }
    },

    sizeChangeEvent(pageSize) {
      if (pageSize !== this.pageSize) {
        this.$emit('update:pageSize', pageSize);
        UtilTools.emitEvent(this, 'size-change', [pageSize]);
      }

      this.hideSizePanel();
    },

    toggleSizePanel() {
      if (this.showSizes) {
        this.hideSizePanel();
      } else {
        this.showSizePanel();
      }
    },

    hideSizePanel() {
      this.showSizes = false;
    },

    showSizePanel() {
      let {
        $refs
      } = this;
      let sizeBtnElem = $refs.sizeBtn;
      let {
        left,
        top
      } = DomTools.getOffsetPos(sizeBtnElem);
      let {
        scrollTop,
        scrollLeft,
        visibleWidth,
        visibleHeight
      } = DomTools.getDomNode();
      this.panelStyle = {
        left: `${left}px`,
        top: `${top + sizeBtnElem.offsetHeight + 6}px`
      };
      this.showSizes = true;
      this.$nextTick().then(() => {
        let sizePanelElem = $refs.sizePanel;

        if (sizePanelElem) {
          this.panelStyle = {
            top: `${top + sizeBtnElem.offsetHeight + 6}px`,
            left: `${left + Math.floor((sizeBtnElem.offsetWidth - sizePanelElem.offsetWidth) / 2)}px`
          };
          return this.$nextTick();
        }
      }).then(() => {
        let sizePanelElem = $refs.sizePanel;

        if (sizePanelElem) {
          let offsetHeight = sizePanelElem.offsetHeight;
          let offsetWidth = sizePanelElem.offsetWidth;

          if (top + sizeBtnElem.offsetHeight + offsetHeight > scrollTop + visibleHeight) {
            this.panelStyle.top = `${top - offsetHeight - 6}px`;
          }

          if (left + offsetWidth > scrollLeft + visibleWidth) {
            this.panelStyle.left = `${scrollLeft + visibleWidth - offsetWidth - 6}px`;
          }
        }
      });
    }

  }
});
// CONCATENATED MODULE: ./packages/pager/index.js


pager.install = function (Vue) {
  Vue.component(pager.name, pager);
};

const Pager = pager;
/* harmony default export */ var packages_pager = (pager);
// CONCATENATED MODULE: ./packages/checkbox/src/checkbox.js
/* harmony default export */ var src_checkbox = ({
  name: 'VxeCheckbox',
  props: {
    value: Boolean,
    indeterminate: Boolean,
    disabled: Boolean,
    name: String,
    size: String
  },
  computed: {
    vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    }

  },

  render(h) {
    let {
      disabled,
      vSize,
      indeterminate,
      value
    } = this;
    return h('label', {
      class: ['vxe-checkbox', {
        [`size--${vSize}`]: vSize,
        'is--indeterminate': indeterminate,
        'is--disabled': disabled
      }]
    }, [h('input', {
      attrs: {
        type: 'checkbox',
        disabled
      },
      domProps: {
        checked: value
      },
      on: {
        change: evnt => {
          if (!this.disabled) {
            let checked = evnt.target.checked;
            this.$emit('input', checked);
            this.$emit('change', checked, evnt);
          }
        }
      }
    }), h('span', {
      class: ['checkbox--icon']
    }), this.$slots.default ? h('span', {
      class: 'checkbox--label'
    }, this.$slots.default) : null]);
  }

});
// CONCATENATED MODULE: ./packages/checkbox/index.js


src_checkbox.install = function (Vue) {
  Vue.component(src_checkbox.name, src_checkbox);
};

const Checkbox = src_checkbox;
/* harmony default export */ var packages_checkbox = (src_checkbox);
// CONCATENATED MODULE: ./packages/radio/src/radio.js
/* harmony default export */ var src_radio = ({
  name: 'VxeRadio',
  props: {
    value: [String, Number],
    label: [String, Number],
    disabled: Boolean,
    name: String,
    size: String
  },
  computed: {
    vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    }

  },

  render(h) {
    let {
      $slots,
      disabled,
      vSize,
      value,
      label,
      name
    } = this;
    return h('label', {
      class: ['vxe-radio', {
        [`size--${vSize}`]: vSize,
        'is--disabled': disabled
      }]
    }, [h('input', {
      attrs: {
        type: 'radio',
        name,
        disabled
      },
      domProps: {
        checked: value === label
      },
      on: {
        change: evnt => {
          if (!disabled) {
            this.$emit('input', label);
            this.$emit('change', label, evnt);
          }
        }
      }
    }), h('span', {
      class: ['radio--icon']
    }), $slots.default ? h('span', {
      class: ['radio--label']
    }, $slots.default) : null]);
  }

});
// CONCATENATED MODULE: ./packages/radio/index.js


src_radio.install = function (Vue) {
  Vue.component(src_radio.name, src_radio);
};

const Radio = src_radio;
/* harmony default export */ var packages_radio = (src_radio);
// CONCATENATED MODULE: ./packages/input/src/input.js
/* harmony default export */ var input = ({
  name: 'VxeInput',
  props: {
    value: [String, Number],
    type: {
      type: String,
      default: 'text'
    },
    disabled: Boolean,
    placeholder: String,
    size: String
  },
  computed: {
    vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    }

  },

  render(h) {
    let {
      $listeners,
      value,
      type,
      vSize,
      placeholder,
      disabled
    } = this;
    let on = {
      input: evnt => this.$emit('input', evnt.target.value)
    };

    if ($listeners.change) {
      on.change = evnt => this.$emit('change', evnt.target.value, evnt);
    }

    return h('div', {
      class: ['vxe-input--wrapper', {
        [`size--${vSize}`]: vSize,
        'is--disabled': this.disabled
      }]
    }, [h('input', {
      class: `vxe-input`,
      domProps: {
        value
      },
      attrs: {
        type,
        placeholder,
        disabled
      },
      on
    })]);
  }

});
// CONCATENATED MODULE: ./packages/input/index.js


input.install = function (Vue) {
  Vue.component(input.name, input);
};

const Input = input;
/* harmony default export */ var packages_input = (input);
// CONCATENATED MODULE: ./packages/button/src/button.js

/* harmony default export */ var src_button = ({
  name: 'VxeButton',
  props: {
    type: String,
    size: String
  },
  computed: {
    vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    }

  },

  render(h) {
    let {
      $listeners,
      type,
      vSize
    } = this;
    let on = null;

    if ($listeners) {
      on = external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.objectMap($listeners, (cb, type) => evnt => this.$emit(type, evnt));
    }

    return h(type === 'text' ? 'a' : 'button', {
      class: ['vxe-button', {
        [`size--${vSize}`]: vSize,
        [`type--${type}`]: type
      }],
      on
    }, this.$slots.default);
  }

});
// CONCATENATED MODULE: ./packages/button/index.js


src_button.install = function (Vue) {
  Vue.component(src_button.name, src_button);
};

const Button = src_button;
/* harmony default export */ var packages_button = (src_button);
// CONCATENATED MODULE: ./packages/message-box/src/message.js

/* harmony default export */ var src_message = ({
  name: 'VxeMessageBox',
  props: {
    value: Boolean,
    type: String,
    title: {
      type: String,
      default: () => conf.i18n('vxe.alert.title')
    },
    message: String,
    lockView: {
      type: Boolean,
      default: true
    },
    lockScroll: {
      type: Boolean,
      default: true
    },
    mask: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: false
    },
    animat: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      visible: false,
      contentVisible: false,
      beforeLockStyle: null
    };
  },

  computed: {
    vSize() {
      return this.size || this.$parent && (this.$parent.size || this.$parent.vSize);
    }

  },
  watch: {
    value(visible) {
      this[visible ? 'open' : 'close']();
    }

  },

  created() {
    if (this.value) {
      this.open();
    }
  },

  mounted() {
    document.body.appendChild(this.$el);
  },

  beforeDestroy() {
    this.$el.parentNode.removeChild(this.$el);
  },

  render(h) {
    let {
      vSize,
      type,
      animat,
      contentVisible,
      visible,
      title,
      message,
      lockView,
      mask
    } = this;
    return h('div', {
      class: ['vxe-alert--wrapper', {
        [`size--${vSize}`]: vSize,
        'is--animat': animat,
        'lock--view': lockView,
        'is--mask': mask,
        'is--visible': contentVisible,
        active: visible
      }],
      on: {
        click: this.selfClickEvent
      }
    }, [h('div', {
      class: 'vxe-alert--box'
    }, [h('div', {
      class: 'vxe-alert--header'
    }, [h('span', {
      class: 'vxe-alert--title'
    }, title), h('i', {
      class: 'vxe-alert--close-icon',
      on: {
        click: this.closeEvent
      }
    })]), h('div', {
      class: 'vxe-alert--body'
    }, [h('span', {
      class: 'vxe-alert--content'
    }, this.$slots.default || message)]), h('div', {
      class: 'vxe-alert--footer'
    }, [type === 'confirm' ? h('vxe-button', {
      on: {
        click: this.cancelEvent
      }
    }, conf.i18n('vxe.button.cancel')) : null, h('vxe-button', {
      props: {
        type: 'primary'
      },
      on: {
        click: this.confirmEvent
      }
    }, conf.i18n('vxe.button.confirm'))])])]);
  },

  methods: {
    selfClickEvent(evnt) {
      if (this.maskClosable && evnt.target === this.$el) {
        let type = 'mask';
        this.close(type);
      }
    },

    closeEvent(evnt) {
      let type = 'close';
      this.$emit(type, evnt);
      this.close(type);
    },

    confirmEvent(evnt) {
      let type = 'confirm';
      this.$emit(type, evnt);
      this.close(type);
    },

    cancelEvent(evnt) {
      let type = 'cancel';
      this.$emit(type, evnt);
      this.close(type);
    },

    open() {
      if (!this.visible) {
        this.visible = true;
        this.contentVisible = false;
        setTimeout(() => {
          this.contentVisible = true;
        }, 10);

        if (this.lockScroll) {
          let bodyElem = document.body;
          this.beforeLockStyle = {
            paddingRight: bodyElem.style.paddingRight,
            overflow: bodyElem.style.overflow
          };
          bodyElem.style.paddingRight = `${window.innerWidth - (document.documentElement.clientWidth || document.body.clientWidth)}px`;
          bodyElem.style.overflow = 'hidden';
        }

        if (!this._handleCustom) {
          this.$emit('input', true);
          this.$emit('show');
        }
      }
    },

    close(type) {
      let {
        visible,
        lockScroll,
        beforeLockStyle
      } = this;

      if (visible) {
        this.contentVisible = false;
        setTimeout(() => {
          this.visible = false;

          if (lockScroll) {
            Object.assign(document.body.style, beforeLockStyle);
          }

          if (this._handleCustom) {
            this._handleCustom(type);
          } else {
            this.$emit('input', false);
            this.$emit('hide', type);
          }
        }, 200);
      }
    }

  }
});
// CONCATENATED MODULE: ./packages/message-box/index.js

var AlertController = null;
function MessageBox(options) {
  return new Promise((resolve, reject) => {
    let $alert = new AlertController({
      el: document.createElement('div'),
      propsData: options
    });

    $alert._handleCustom = function (type) {
      $alert.$destroy();

      if (type === 'confirm') {
        resolve(type);
      } else {
        reject(type);
      }
    };

    setTimeout(() => $alert.open());
  });
}
['alert', 'confirm'].forEach(type => {
  MessageBox[type] = function (message, title, options) {
    let opts = {
      message,
      type
    };

    if (typeof message === 'string') {
      if (title) {
        opts.title = title;
      }
    } else {
      opts = message;
    }

    return MessageBox(Object.assign({}, opts, options));
  };
});

MessageBox.install = function (Vue) {
  AlertController = Vue.extend(src_message);
  Vue.prototype.$XMsg = MessageBox;
};

/* harmony default export */ var message_box = (MessageBox);
// CONCATENATED MODULE: ./packages/tooltip/src/tooltip.js
/* harmony default export */ var tooltip = ({
  name: 'VxeTooltip'
});
// CONCATENATED MODULE: ./packages/tooltip/index.js


tooltip.install = function (Vue) {
  Vue.component(tooltip.name, tooltip);
};

const Tooltip = tooltip;
/* harmony default export */ var packages_tooltip = (tooltip);
// CONCATENATED MODULE: ./locale/lang/zh-CN.js
/* harmony default export */ var zh_CN = ({
  vxe: {
    table: {
      emptyText: '暂无数据',
      confirmFilter: '筛选',
      resetFilter: '重置',
      allFilter: '全部'
    },
    grid: {
      selectOneRecord: '请至少选择一条记录！',
      deleteSelectRecord: '您确定要删除所选记录吗？',
      removeSelectRecord: '您确定要移除所选记录吗？',
      dataUnchanged: '数据未改动！ '
    },
    pager: {
      goto: '前往',
      pagesize: '条/页',
      total: '共 {{total}} 条记录',
      pageClassifier: '页'
    },
    alert: {
      title: '消息提示'
    },
    button: {
      confirm: '确认',
      cancel: '取消'
    }
  }
});
// EXTERNAL MODULE: ./styles/index.scss
var styles = __webpack_require__("1a97");

// CONCATENATED MODULE: ./index.js



















 // 默认主题

 // 按需加载的组件

const components = [packages_table, table_column, table_header, table_body, table_footer, table_filter, packages_grid, packages_excel, context_menu, packages_toolbar, packages_pager, packages_checkbox, packages_radio, packages_input, packages_button, message_box, packages_tooltip]; // 默认安装

function install(Vue, options) {
  if (external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.isPlainObject(options)) {
    v_x_e_table.setup(options);
  }

  components.map(component => Vue.use(component));
} // UMD 默认中文


v_x_e_table.setup({
  i18n: (key, value) => external_root_XEUtils_commonjs_xe_utils_commonjs2_xe_utils_amd_xe_utils_default.a.get(zh_CN, key)
});

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

v_x_e_table.install = install;

















/* harmony default export */ var index_0 = (v_x_e_table);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js
/* concated harmony reexport components */__webpack_require__.d(__webpack_exports__, "components", function() { return components; });
/* concated harmony reexport Table */__webpack_require__.d(__webpack_exports__, "Table", function() { return Table; });
/* concated harmony reexport TableColumn */__webpack_require__.d(__webpack_exports__, "TableColumn", function() { return TableColumn; });
/* concated harmony reexport TableHeader */__webpack_require__.d(__webpack_exports__, "TableHeader", function() { return TableHeader; });
/* concated harmony reexport TableBody */__webpack_require__.d(__webpack_exports__, "TableBody", function() { return TableBody; });
/* concated harmony reexport TableFooter */__webpack_require__.d(__webpack_exports__, "TableFooter", function() { return TableFooter; });
/* concated harmony reexport TableFilter */__webpack_require__.d(__webpack_exports__, "TableFilter", function() { return TableFilter; });
/* concated harmony reexport Grid */__webpack_require__.d(__webpack_exports__, "Grid", function() { return Grid; });
/* concated harmony reexport Excel */__webpack_require__.d(__webpack_exports__, "Excel", function() { return Excel; });
/* concated harmony reexport TableContextMenu */__webpack_require__.d(__webpack_exports__, "TableContextMenu", function() { return TableContextMenu; });
/* concated harmony reexport Toolbar */__webpack_require__.d(__webpack_exports__, "Toolbar", function() { return Toolbar; });
/* concated harmony reexport Pager */__webpack_require__.d(__webpack_exports__, "Pager", function() { return Pager; });
/* concated harmony reexport Checkbox */__webpack_require__.d(__webpack_exports__, "Checkbox", function() { return Checkbox; });
/* concated harmony reexport Radio */__webpack_require__.d(__webpack_exports__, "Radio", function() { return Radio; });
/* concated harmony reexport Input */__webpack_require__.d(__webpack_exports__, "Input", function() { return Input; });
/* concated harmony reexport Button */__webpack_require__.d(__webpack_exports__, "Button", function() { return Button; });
/* concated harmony reexport MessageBox */__webpack_require__.d(__webpack_exports__, "MessageBox", function() { return MessageBox; });
/* concated harmony reexport Tooltip */__webpack_require__.d(__webpack_exports__, "Tooltip", function() { return Tooltip; });


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (index_0);



/***/ })

/******/ })["default"];
});