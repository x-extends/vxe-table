"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DomTools = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var browse = _xeUtils.default.browse();

var htmlElem = document.querySelector('html');
var bodyElem = document.body;

function rClass(cls) {
  return new RegExp("(?:^|\\s)".concat(cls, "(?!\\S)"), 'g');
} // function rClassList (clss) {
//   return new RegExp(clss.map(cls => `(?:^|\\s)${cls}(?!\\S)`).join('|'), 'g')
// }


var rClsMap = {};
var preClss = ['row--hover', 'row--current', 'col--current', 'col--selected', 'col--actived', 'scrolling--middle']; // const preClsMap = {
//   'col--checked': [
//     'col--checked-top',
//     'col--checked-bottom',
//     'col--checked-left',
//     'col--checked-right'
//   ]
// }

preClss.forEach(function (cls) {
  rClsMap[cls] = rClass(cls);
}); // XEUtils.each(preClsMap, (clss, cls) => {
//   rClsMap[cls] = rClassList([cls].concat(clss))
// })

var DomTools = {
  browse: browse,
  isPx: function isPx(val) {
    return val && /^\d+(px)?$/.test(val);
  },
  isScale: function isScale(val) {
    return val && /^\d+%$/.test(val);
  },
  hasClass: function hasClass(elem, cls) {
    if (elem) {
      var className = elem.className;
      return (preClss[cls] || rClass(cls)).test(className);
    }

    return false;
  },
  removeClass: function removeClass(elem, cls) {
    if (DomTools.hasClass(elem, cls)) {
      elem.className = elem.className.replace(rClsMap[cls] || rClass(cls), '');
    }
  },
  addClass: function addClass(elem, cls) {
    if (!DomTools.hasClass(elem, cls)) {
      DomTools.removeClass(elem, cls);
      elem.className = "".concat(elem.className, " ").concat(cls);
    }
  },
  getDomNode: function getDomNode() {
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
  getEventTargetNode: function getEventTargetNode(evnt, container, queryCls) {
    var targetElem;
    var target = evnt.target;

    while (target && target.nodeType && target !== document) {
      if (queryCls && DomTools.hasClass(target, queryCls)) {
        targetElem = target;
      } else if (target === container) {
        return {
          flag: queryCls ? !!targetElem : true,
          container: container,
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
  getOffsetPos: function getOffsetPos(elem, container) {
    return getNodeOffset(elem, container, {
      left: 0,
      top: 0
    });
  },
  getAbsolutePos: function getAbsolutePos(elem) {
    var bounding = elem.getBoundingClientRect();

    var _DomTools$getDomNode = DomTools.getDomNode(),
        scrollTop = _DomTools$getDomNode.scrollTop,
        scrollLeft = _DomTools$getDomNode.scrollLeft;

    return {
      top: scrollTop + bounding.top,
      left: scrollLeft + bounding.left
    };
  },

  /**
   * 获取单元格节点索引
   */
  getCellNodeIndex: function getCellNodeIndex(cell) {
    var trElem = cell.parentNode;

    var columnIndex = _xeUtils.default.arrayIndexOf(trElem.children, cell);

    var rowIndex = _xeUtils.default.arrayIndexOf(trElem.parentNode.children, trElem);

    return {
      columnIndex: columnIndex,
      rowIndex: rowIndex
    };
  },

  /**
   * 获取选中单元格矩阵范围
   */
  getRowNodes: function getRowNodes(trList, cellNode, targetCellNode) {
    var startColIndex = cellNode.columnIndex;
    var startRowIndex = cellNode.rowIndex;
    var targetColIndex = targetCellNode.columnIndex;
    var targetRowIndex = targetCellNode.rowIndex;
    var rows = [];

    for (var rowIndex = Math.min(startRowIndex, targetRowIndex), rowLen = Math.max(startRowIndex, targetRowIndex); rowIndex <= rowLen; rowIndex++) {
      var cells = [];
      var trElem = trList[rowIndex];

      for (var colIndex = Math.min(startColIndex, targetColIndex), colLen = Math.max(startColIndex, targetColIndex); colIndex <= colLen; colIndex++) {
        var tdElem = trElem.children[colIndex];
        cells.push(tdElem);
      }

      rows.push(cells);
    }

    return rows;
  },
  getCellIndexs: function getCellIndexs(cell) {
    var trElem = cell.parentNode;
    var colIndex = cell.getAttribute('data-index');
    var rowId = trElem.getAttribute('data-rowid');
    var columnIndex = [].indexOf.call(trElem.children, cell);
    var rowIndex = [].indexOf.call(trElem.parentNode.children, trElem);
    return {
      rowId: rowId,
      rowIndex: rowIndex,
      colIndex: colIndex ? parseInt(colIndex) : colIndex,
      columnIndex: columnIndex
    };
  },
  getCell: function getCell($table, _ref) {
    var row = _ref.row,
        rowIndex = _ref.rowIndex,
        column = _ref.column;

    var rowId = _utils.default.getRowId($table, row, rowIndex);

    return $table.$refs.tableBody.$el.querySelector(".vxe-body--row[data-rowid=\"".concat(rowId, "\"] .").concat(column.id));
  },
  getCursorPosition: function getCursorPosition(textarea) {
    var rangeData = {
      text: '',
      start: 0,
      end: 0
    };

    if (textarea.setSelectionRange) {
      rangeData.start = textarea.selectionStart;
      rangeData.end = textarea.selectionEnd;
      rangeData.text = rangeData.start !== rangeData.end ? textarea.value.substring(rangeData.start, rangeData.end) : '';
    } else if (document.selection) {
      var index = 0;
      var range = document.selection.createRange();
      var textRange = document.body.createTextRange();
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
  setCursorPosition: function setCursorPosition(textarea, rangeData) {
    if (textarea.setSelectionRange) {
      textarea.focus();
      textarea.setSelectionRange(rangeData.start, rangeData.end);
    } else if (textarea.createTextRange) {
      var textRange = textarea.createTextRange();

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
exports.DomTools = DomTools;

function getNodeOffset(elem, container, rest) {
  if (elem) {
    var parentElem = elem.parentNode;
    rest.top += elem.offsetTop;
    rest.left += elem.offsetLeft;

    if (parentElem && parentElem !== htmlElem && parentElem !== bodyElem) {
      rest.top -= parentElem.scrollTop;
      rest.left -= parentElem.scrollLeft;
    }

    if (container && (elem === container || elem.offsetParent === container) ? 0 : elem.offsetParent) {
      return getNodeOffset(elem.offsetParent, container, rest);
    }
  }

  return rest;
}

var _default = DomTools;
exports.default = _default;